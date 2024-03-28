import React, { Dispatch, SetStateAction, useState } from "react";

enum AlertType {
  NONE,
  SUCCESS,
  FAILURE,
}

const availableElements = ["mouse", "speakers", "keyboard"];

export function ElementPlacement({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const [placedElements, setPlacedElements] = useState<string[]>([]);
  const [currentAlert, setCurrentAlert] = useState<{
    type: AlertType;
    message: string;
  }>({ type: AlertType.NONE, message: "" });

  React.useEffect(() => {
    setAllowNext(placedElements.length === availableElements.length);
  }, [placedElements, setAllowNext]);

  function handleOnDrop(e: React.DragEvent, element: string) {
    e.preventDefault();
    if (!placedElements.includes(element)) {
      setPlacedElements([...placedElements, element]);
      setCurrentAlert({ type: AlertType.SUCCESS, message: "Element placed!" });
    } else {
      setCurrentAlert({
        type: AlertType.FAILURE,
        message: "This element is already placed!",
      });
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleOnDrag(e: React.DragEvent, element: string) {
    e.dataTransfer.setData("element", element);
  }

  return (
    <div className="flex flex-col p-1 bg-gray-200 rounded-2xl">
      {currentAlert.type !== AlertType.NONE && (
        <div
          className={`bg-${
            currentAlert.type === AlertType.SUCCESS ? "green" : "red"
          }-100 border border-${
            currentAlert.type === AlertType.SUCCESS ? "green" : "red"
          }-400 text-${
            currentAlert.type === AlertType.SUCCESS ? "green" : "red"
          }-700 py-1 rounded-full text-center`}
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
      <h1 className="font-bold text-center xl:p-4">
        Place Elements on Picture
      </h1>
      <div className="flex flex-col px-2">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="font-bold text-lg">Available Elements</h1>
          <div className="flex flex-row space-x-4">
            {availableElements.map((element, index) => (
              <div
                key={index}
                draggable={true}
                className={`px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md shadow-sm cursor-pointer`}
                onDragStart={(e) => {
                  handleOnDrag(e, element);
                }}
              >
                {element}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="flex flex-row items-center justify-center space-x-4"
        onDrop={(e) => handleOnDrop(e, "picture")}
        onDragOver={(e) => handleDragOver(e)}
      >
        <div className="w-[400px] h-[300px] border border-gray-300 rounded-md p-4 my-4">
          <img src="/mouse.jpg" alt="mouse" className="w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="font-bold text-lg">Placed Elements</h1>
        <div className="flex flex-row space-x-4">
          {placedElements.map((element, index) => (
            <div
              key={index}
              className={`px-4 py-2 bg-primary-green text-white border border-primary-green rounded-md shadow-sm cursor-default`}
            >
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
