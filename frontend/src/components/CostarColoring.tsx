import React, { Dispatch, SetStateAction, useState } from "react";

interface CostarColorState {
  letter_C: string;
  letter_O: string;
  letter_S: string;
  letter_T: string;
  letter_A: string;
  letter_R: string;

}

const availableColors = ["dark_blue", "medium_blue", "golden_yellow", "light_blue", "darkest_black"];
const availableColorsTailwind: { [key: string]: string } = {
  dark_blue: "bg-blue-600",
  medium_blue: "bg-blue-400",
  golden_yellow: "bg-yellow-500",
  light_blue: "bg-blue-200",
  darkest_black: "bg-black",
  
};
const availableParts = [
  "letter_C",
  "letter_O",
  "letter_S",
  "letter_T",
  "letter_A",
  "letter_R",
];

export function CostarColoring({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const [part, setPart] = useState(["", "", ""]);
  const [colors, setColors] = useState({
    letter_C: "",
    letter_O: "",
    letter_S: "",
    letter_T: "",
    letter_A: "",
    letter_R: "",
  });

  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colorNextPart = (color: string) => {
    if (currentColorIndex < availableParts.length) {
      const partToColor = availableParts[currentColorIndex];
      setColors((prevColors) => ({
        ...prevColors,
        [partToColor]: color,
      }));
      setCurrentAlert({ type: AlertType.SUCCESS, message: "Correct!" });
      setCurrentColorIndex(currentColorIndex + 1);
    }
  };

  enum AlertType {
    NONE,
    SUCCESS,
    FAILURE,
  }

  const [currentAlert, setCurrentAlert] = useState<{
    type: AlertType;
    message: string;
  }>({ type: AlertType.NONE, message: "" });

  React.useEffect(() => {
    setAllowNext(currentAlert.type === AlertType.SUCCESS);
  }, [currentAlert]);

  function HokieBirdColors() {
    const handlePart = (index: number, value: string) => {
      const val = value.toLowerCase();
      if (availableParts.includes(val)) {
        const updatedParts = [...part];
        updatedParts[index] = val;
        setPart(updatedParts);
      } else if (availableColors.includes(val)) {
        setCurrentAlert({
          type: AlertType.FAILURE,
          message: "This value is a color, not a letter!",
        });
      }
    };

    const handleValueOnBlur = (value: string) => {
      if (
        !availableColors.includes(value) &&
        !availableParts.includes(value) &&
        value !== ""
      ) {
        setCurrentAlert({
          type: AlertType.FAILURE,
          message: "That isn't quite one of the options. Try again.",
        });
      }
    };

    const handleColorChange = (part: string, value: string) => {
      const val = value.toLowerCase();
      if (availableParts.includes(val)) {
        setCurrentAlert({
          type: AlertType.FAILURE,
          message: "This value is a color, not a body part!",
        });
      }
      if (value.startsWith('"') && value.endsWith('"')) {
        const strippedValue = val.substring(1, val.length - 1);
        if (availableColors.includes(strippedValue) && part != "") {
          setCurrentAlert({ type: AlertType.SUCCESS, message: "Correct!" });
          setColors((prevColors) => ({
            ...prevColors,
            [part]: strippedValue,
          }));
        } else if (availableParts.includes(strippedValue)) {
          setCurrentAlert({
            type: AlertType.FAILURE,
            message: "This value is a color, not a letter!",
          });
        }
      }
    };

    function handleOnDrop(e: React.DragEvent, part: string) {
      const color = e.dataTransfer.getData("Color") as string;
      const temp = (colors[part as keyof CostarColorState] = color);
      const newColors = {
        ...colors,
        temp,
      };
      setColors(newColors);
      setCurrentAlert({ type: AlertType.SUCCESS, message: "Correct!" });
    }

    function handleDragOver(e: React.DragEvent) {
      e.preventDefault();
    }

    function handleOnDrag(e: React.DragEvent, color: string) {
      e.dataTransfer.setData("Color", color);
    }

    return (
      <div className="flex flex-col p-1 bg-gray-200 rounded-2xl">
        {currentAlert.type !== AlertType.NONE && (
          <div
            className={`bg-${currentAlert.type === AlertType.SUCCESS ? "green" : "red"}-100 border border-${currentAlert.type === AlertType.SUCCESS ? "green" : "red"}-400 text-${currentAlert.type === AlertType.SUCCESS ? "green" : "red"}-700 py-1 rounded-full text-center`}
            role="alert"
          >
            <span className="block sm:inline">{currentAlert.message}</span>
            {currentAlert.type === AlertType.FAILURE && (
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <button
                  onClick={() =>
                    setCurrentAlert({ type: AlertType.NONE, message: "" })
                  }
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
        <h1 className="font-bold text-center xl:p-4">{props.command}</h1>
        <div className="flex flex-row px-2">
          <div className="flex flex-col px-1 space-y-2">
            {availableParts.map((availablePart, index) => (
              <div
                key={`partText${index}`}
                onDrop={(e) => handleOnDrop(e, availablePart)}
                onDragOver={(e) => handleDragOver(e)}
                className="border-2 flex flex-row rounded-sm outline-dotted text-center"
              >
                <label htmlFor={`${part}Text`}>
                  {props?.typeVariable ? (
                    <input
                      key={`${part}Text1`}
                      className={`rounded-sm w-24`}
                      type="text"
                      placeholder="Type a letter"
                      onBlur={(e) => handleValueOnBlur(e.target.value)}
                      onChange={(e) => handlePart(index, e.target.value)}
                      defaultValue={part[index]}
                      disabled={!props.type}
                    />
                  ) : (
                    `${availablePart}`
                  )}
                  {"="}
                  <input
                    key={`${part}Text2`}
                    type="text"
                    className={`rounded-sm w-24`}
                    placeholder={
                      props?.type ? "Type a color here" : "Drag a color here"
                    }
                    onBlur={(e) => handleValueOnBlur(e.target.value)}
                    onChange={(e) =>
                      handleColorChange(
                        props?.typeVariable ? part[index] : availablePart,
                        e.target.value,
                      )
                    }
                    defaultValue={
                      props?.typeVariable
                        ? colors[part[index] as keyof CostarColorState]
                          ? `"${colors[part[index] as keyof CostarColorState]}"`
                          : ""
                        : colors[availablePart as keyof CostarColorState]
                          ? `"${colors[availablePart as keyof CostarColorState]}"`
                          : ""
                    }
                    disabled={!props.type}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col px-2">
            <h1 className="font-bold text-center">Options:</h1>
            <div
              className={`${props?.typeVariable ? "grid-cols-2" : "grid-cols-1"} grid gap-x-4 gap-y-2`}
            >
              {props?.typeVariable && (
                <div className="flex flex-col flex-grow space-y-1">
                  {availableParts.map((part, index) => (
                    <div
                      key={`option${index}`}
                      className="flex place-content-center rounded-2xl bg-gray-300"
                    >
                      {part}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col space-y-1">
                {availableColors.map((color, index) => (
                  <div
                    key={index}
                    draggable={props.draggable}
                    className={`flex ${availableColorsTailwind[color]} px-1 place-content-center rounded-2xl shadow-2xl`}
                    onDragStart={(e) => {
                      handleOnDrag(e, color);
                    }}
                    onClick={() => {
                      if (!props?.type) colorNextPart(color);
                    }}
                  >
                    <q className={`text-white`}>{color}</q>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CostarColor() {
    return (
      <div className="flex flex-col flex-grow justify-center items-center relative">
        <img
          src="/Costar_Logo.png"
          alt="book image"
          className={"center-left w-[200px] xl:w-[500px]"}
          width={500}
          height={500}
        />
        <img
          src="/Costar_Images/Letter_C.png"
          alt="book image"
          className={`absolute center-left img-${colors.letter_C} `}
          width={500}
          height={500}
        />
        <img
          src="/Costar_Images/Letter_O.png"
          alt="book image"
          className={`absolute center-left img-${colors.letter_O} `}
          width={500}
          height={500}
        />
        <img
          src="/Costar_Images/Letter_S.png"
          alt="book image"
          className={`absolute center-left img-${colors.letter_S} `}
          width={500}
          height={500}
        />
        <img
          src="/Costar_Images/Letter_T.png"
          alt="book image"
          className={`absolute center-left img-${colors.letter_T} `}
          width={500}
          height={500}
        />
        <img
          src="/Costar_Images/Letter_A.png"
          alt="book image"
          className={`absolute center-left img-${colors.letter_A} `}
          width={500}
          height={500}
        />
        <img
          src="/Costar_Images/Letter_R.png"
          alt="book image"
          className={`absolute center-left img-${colors.letter_R} `}
          width={500}
          height={500}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-row text-xs xl:text-base">
      <CostarColor></CostarColor>
      <HokieBirdColors></HokieBirdColors>
    </div>
  );
}
