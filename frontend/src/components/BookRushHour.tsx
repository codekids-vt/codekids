import { Dispatch, SetStateAction, useEffect } from "react";
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

  useEffect(() => {
    setAllowNext(!solveToContinue);
  }, [solveToContinue, setAllowNext]);

  return (
    <div className="w-full h-full flex flex-column justify-center items-center">
      <div className="flex flex-row items-start">
        <RushHour
          initialCars={initialCars}
          onCompletion={() => {
            if (solveToContinue) {
              setAllowNext(true);
            }
          }}
        />
        {exitImage &&
          (exitImage == "Exit" ? (
            <div className="ml-4 pt-32">
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
    </div>
  );
}
