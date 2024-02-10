# Specify the base image
FROM python:3.12

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the source code into the container
COPY . .
# Expose the port on which the application will run
EXPOSE 8080

RUN prisma generate

# Define the command to run the application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]



