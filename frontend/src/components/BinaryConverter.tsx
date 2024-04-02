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
  const [conversionSteps, setConversionSteps] = useState("");

  useEffect(() => {
    if (correct === undefined) {
      setAllowNext(true);
    } else {
      let isCorrect = binary === correct.toString(2);
      setAllowNext(isCorrect);
      if (isCorrect) {
        playCorrectSound();
      }
    }

    // Calculate the binary conversion steps and sum
    if (binary.match(/^[01]+$/)) {
      const steps = binary.split('').reverse().map((digit, index) => digit === "1" ? Math.pow(2, index) : null).filter((n): n is number => n !== null);
      const sum = steps.reduce((acc, val) => acc + val, 0);
      setConversionSteps(`${steps.join(" + ")} = ${sum}`);
    } else {
      setConversionSteps("");
    }
  }, [binary, correct, playCorrectSound, setAllowNext]);

  let dec = undefined;
  if (binary.match(/^[01]+$/)) {
    dec = parseInt(binary, 2);
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <label className="py-2">Enter a binary number:</label>
      <input
        type="text"
        value={binary}
        onChange={(e) => setBinary(e.target.value)}
        className="w-1/2 p-2 border-2 border-gray-300 rounded-md"
      />

    <div className="py-2">Your binary number in decimal is: </div>
        <div className="p-2">
            {dec === undefined || isNaN(dec) ? "Invalid" : dec}
        </div>
      <div className="p-2">
        {dec !== undefined && !isNaN(dec) && conversionSteps ? `Conversion: ${conversionSteps}` : ""}
      </div>
    </div>
  );
}