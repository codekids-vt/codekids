import { Dispatch, SetStateAction, useEffect } from "react";
import { Car } from "./RushHour/types";
import RushHour from "./RushHour/RushHour";

type Props = {
  initialCars: Car[];
  solveToContinue: boolean;
};

export default function BookRushHour({
  props,
  setAllowNext,
}: {
  props: Props | any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const { initialCars, solveToContinue } = props;

  useEffect(() => {
    setAllowNext(!solveToContinue);
  }, [solveToContinue, setAllowNext]);

  return (
    <div className="w-full h-full flex flex-column justify-center items-center">
      <RushHour
        initialCars={initialCars}
        onCompletion={() => {
          if (solveToContinue) {
            setAllowNext(true);
          }
        }}
      />
    </div>
  );
}
