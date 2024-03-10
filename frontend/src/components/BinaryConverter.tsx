import { useEffect, useState } from "react";
import useSound from "use-sound";

type Props = {
  correct?: number;
};

export default function BinaryConverter({
  props,
  setAllowNext,
}: {
  props: Props;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });
  const { correct } = props;
  const [binary, setBinary] = useState("");
  useEffect(() => {
    if (correct == undefined) {
      setAllowNext(true);
    } else {
      let isCorrect = binary === correct.toString();
      setAllowNext(isCorrect);
      if (isCorrect) {
        playCorrectSound();
      }
    }
  }, [setAllowNext, correct, binary, playCorrectSound]);

  // if there are any non 0 or 1 characters, make dec undefined
  let dec = undefined;
  if (!binary.match(/[^01]/)) {
    dec = parseInt(binary, 2); // Specify radix 2 for binary
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <label className="py-2">Enter a binary number: </label>
      <input
        type="number"
        value={binary}
        onChange={(e) => setBinary(e.target.value)}
        className="w-1/2 p-2 border-2 border-gray-300 rounded-md"
      ></input>

      <div className="py-2">Your binary number in decimal is: </div>

      <div className="p-2">
        {dec == undefined || isNaN(dec) ? "Invalid" : dec}
      </div>
    </div>
  );
}
