import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Car } from "./RushHour/types";
import RushHour from "./RushHour/RushHour";

type Props = {
  initialCars: Car[];
  solveToContinue: boolean;
  exitImage?: string;
};

export default function BookRushHour({
  props,
  setAllowNext,
}: {
  props: Props | any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const { initialCars, solveToContinue, exitImage } = props;
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setAllowNext(!solveToContinue);
  }, [solveToContinue, setAllowNext]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <div className="flex flex-row items-start">
        <RushHour
          initialCars={initialCars}
          onCompletion={() => {
            if (solveToContinue) {
              setAllowNext(true);
              setComplete(true);
            }
          }}
        />
        {exitImage &&
          (exitImage === "Exit" ? (
            <div
              title="Exit, drag the red car to this position to complete"
              className="ml-4 pt-32"
            >
              <div className="bg-red-500 text-white text-center rounded-xl border border-white w-[63px]">
                Exit
              </div>
            </div>
          ) : (
            <img
              src={exitImage}
              alt="Exit"
              height="63"
              width="63"
              className="ml-4 pt-32"
            />
          ))}
      </div>
      {complete && (
        <div className="bg-green-100 border-2 border-green-500 shadow-xl rounded-full flex flex-col items-center">
          <div className="text-md xl:text-2xl text-green-500 p-4">
            Complete! Click next to continue
          </div>
        </div>
      )}
    </div>
  );
}
