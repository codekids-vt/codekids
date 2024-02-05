from datetime import date, datetime
from enum import Enum
import secrets
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasicCredentials
import joblib
import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble._forest import RandomForestClassifier  # Importing for type hint
from typing import Annotated, Optional, Type
import uvicorn
from pydantic import BaseModel
import contextlib
import shap
import dotenv
from openai import OpenAI

dotenv.load_dotenv()

client = OpenAI()


from pymongo.database import Database

from auth import get_user
from db import get_mongo_db

MEAN_DATA_VALUES = {
    "AGE": 29.9,
    "SystolicBP": 113,
    "DiastolicBP": 76.5,
    "BS": 8.73,
    "BodyTemp": 98.7,
    "HeartRate": 74.3,
}

# STD_DATA_VALUES = {
#     "AGE": 13.5,
#     "SystolicBP": 18.4,
#     "DiastolicBP": 13.9,
#     "BS": 3.29,
#     "BodyTemp": 1.37,
#     "HeartRate": 8.08,
# }


def load_model() -> Type[RandomForestClassifier]:
    if not (os.path.exists("./models/maternal-health-risk.joblib")):
        raise FileNotFoundError("Model not found")
    return joblib.load("./models/maternal-health-risk.joblib")


@contextlib.asynccontextmanager  # type: ignore
async def lifespan(app: FastAPI) -> None:  # type: ignore
    app.state.model = load_model()
    app.state.explainer = shap.TreeExplainer(app.state.model)
    yield  # type: ignore


app = FastAPI(
    title="Maternal Health Risk Prediction API", lifespan=lifespan, docs_url="/"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DataInput(BaseModel):
    Age: Optional[int] = None
    SystolicBP: int
    DiastolicBP: int
    BS: float
    BodyTemp: float
    HeartRate: int


class InputResultOutcome(str, Enum):
    low = "low"
    high = "high"
    normal = "normal"


class MaternityRecord(BaseModel):
    id: str
    user_id: str
    Age: int
    SystolicBP: int
    DiastolicBP: int
    BS: float
    BodyTemp: float
    HeartRate: int

    res_age: InputResultOutcome
    res_systolic_bp: InputResultOutcome
    res_diastolic_bp: InputResultOutcome
    res_bs: InputResultOutcome
    res_body_temp: InputResultOutcome
    res_heart_rate: InputResultOutcome
    recommendation: str
    date: str
    result: int


@app.post("/predict")
async def predict(
    data: DataInput,
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
) -> MaternityRecord:
    print(data)
    age = date.today().year - datetime.strptime(user["birth_date"], "%Y-%m-%d").year
    data.Age = age
    model = app.state.model
    explainer = app.state.explainer
    result = int(model.predict(pd.DataFrame(data.model_dump(), index=[0]))[0])
    shap_values = explainer.shap_values(pd.DataFrame(data.model_dump(), index=[0]))

    input_vars = []

    for i, (key, input_value) in enumerate(
        zip(MEAN_DATA_VALUES.keys(), data.model_dump().values())
    ):
        if shap_values[result][0][i] > 0:
            if input_value > int(MEAN_DATA_VALUES[key]):
                input_result_outcome = InputResultOutcome.high
            else:
                input_result_outcome = InputResultOutcome.low
        else:
            input_result_outcome = InputResultOutcome.normal
        input_vars.append(input_result_outcome)

    input_vars_mapping = [
        "Age",
        "SystolicBP",
        "DiastolicBP",
        "BS",
        "BodyTemp",
        "HeartRate",
    ]
    important_vars = "\n".join(
        [
            f"{input_vars_mapping[i]}: {input_vars[i]}"
            for i in range(len(input_vars))
            if input_vars[i] != InputResultOutcome.normal and i != 0
        ]
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "Only output the instructions of what the user should do based on the data and results",
            },
            {
                "role": "user",
                "content": f"""Here is my maternity health data:
Maternity Health Predicted Risk: {result} (0: Low, 1: Moderate, 2: High)
{important_vars}""",
            },
        ],
    )
    print(
        f"""Here is my maternity health data:
Maternity Health Predicted Risk: {result} (0: Low, 1: Moderate, 2: High)
{important_vars}"""
    )
    recommendation = str(response.choices[0].message.content)

    record = MaternityRecord(
        id=secrets.token_urlsafe(16),
        user_id=user["id"],
        Age=age,
        SystolicBP=data.SystolicBP,
        DiastolicBP=data.DiastolicBP,
        BS=data.BS,
        BodyTemp=data.BodyTemp,
        HeartRate=data.HeartRate,
        res_age=input_vars[0],
        res_systolic_bp=input_vars[1],
        res_diastolic_bp=input_vars[2],
        res_bs=input_vars[3],
        res_body_temp=input_vars[4],
        res_heart_rate=input_vars[5],
        date=date.today().strftime("%Y-%m-%d"),
        recommendation=recommendation,
        result=result,
    )

    # add to database
    results = db["results"]
    results.insert_one(record.model_dump())
    return record


class SignupRequest(BaseModel):
    email: str
    username: str
    password: str
    birth_date: date


class LoginResponse(BaseModel):
    token: str


class User(BaseModel):
    id: str
    username: str
    birth_date: str
    email: str
    password: str
    token: str
    notification_token: Optional[str] = None


@app.post("/signup")
async def signup(
    signup_data: SignupRequest, db: Annotated[Database, Depends(get_mongo_db)]
) -> LoginResponse:
    users = db["users"]
    user = users.find_one({"username": signup_data.username}, {"_id": 0})
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    else:
        id = secrets.token_urlsafe(16)
        token = secrets.token_urlsafe(16)
        user = User(
            id=id,
            username=signup_data.username,
            birth_date=signup_data.birth_date.strftime("%Y-%m-%d"),
            email=signup_data.email,
            password=signup_data.password,
            token=token,
        )
        users.insert_one(user.model_dump())
        return LoginResponse(token=token)


@app.get("/user/me")
async def get_user_data(
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
) -> User:
    users = db["users"]
    user_data = User.model_validate(users.find_one({"id": user["id"]}, {"_id": 0}))
    return user_data


@app.post("/login")
async def login(
    credentials: HTTPBasicCredentials, db: Annotated[Database, Depends(get_mongo_db)]
) -> LoginResponse:
    users = db["users"]
    user = users.find_one(
        {"username": credentials.username, "password": credentials.password}, {"_id": 0}
    )
    if user:
        return LoginResponse(token=user["token"])
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")


@app.get("/results")
async def get_results(
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
) -> list[MaternityRecord]:
    results = db["results"]
    user_results = results.find({"user_id": user["id"]}, {"_id": 0}).sort("date", -1)
    return list(user_results)


@app.post("/notification_token")
async def add_notification_token(
    token: str,
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
):
    users = db["users"]
    users.update_one({"id": user["id"]}, {"$set": {"notification_token": token}})
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8080, reload=True)
