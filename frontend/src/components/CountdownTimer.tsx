import React, { useState, useEffect } from "react";

export interface ICountdownTimerProps {
  initialTime?: string; // Optional initial time (MM:SS)
  dogImage: string; // Path to the dog image
}

export function CountdownTimer({
  props,
  setAllowNext,
}: {
  props: ICountdownTimerProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { initialTime = "00:10", dogImage } = props; // Default to "00:10"
  const [timeInput, setTimeInput] = useState(initialTime); 
  const [seconds, setSeconds] = useState<number>(0); 
  const [isCounting, setIsCounting] = useState<boolean>(false); 
  const [isValidTime, setIsValidTime] = useState<boolean>(true);
  
  // Parse the input time (MM:SS) into seconds
  const parseTimeToSeconds = (time: string): number | null => {
    const parts = time.split(":");
    if (parts.length !== 2) return null;
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    if (isNaN(minutes) || isNaN(seconds) || seconds >= 60 || seconds < 0) {
      return null;
    }
    return minutes * 60 + seconds;
  };

  // Handle changes in the input field
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(e.target.value);
  };

  // Handle start of the countdown
  const handleStartTimer = () => {
    const totalSeconds = parseTimeToSeconds(timeInput);
    if (totalSeconds !== null) {
      setSeconds(totalSeconds);
      setIsCounting(true);
      setIsValidTime(true);
    } else {
      setIsValidTime(false); 
    }
  };

  // Countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isCounting) {
      setIsCounting(false);
      setAllowNext(true); // Notify the user that the countdown has finished
    }
    return () => clearTimeout(timer);
  }, [isCounting, seconds, setAllowNext]);

  // Format seconds back to MM:SS format
  const formatSecondsToTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="countdown-timer-container flex flex-col justify-center items-center w-full h-full text-center"
      style={{ gap: "20px" }}
    >
      <div className="timer-section flex flex-col items-center mb-4">
        <div className="input-section mb-4">
          <input
            type="text"
            value={timeInput}
            onChange={handleTimeInputChange}
            placeholder="MM:SS"
            className={`border ${
              isValidTime ? "border-gray-300" : "border-red-500"
            } p-2 rounded text-center`}
            disabled={isCounting} // Disable input during countdown
          />
          {!isValidTime && (
            <p className="text-red-500 mt-2">Invalid time format. Use MM:SS.</p>
          )}
        </div>

        <div className="timer-display text-3xl font-bold mb-4">
          {formatSecondsToTime(seconds)}
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleStartTimer}
          disabled={isCounting || !timeInput} // Disable button if no input or countdown active
        >
          Start Timer
        </button>

        {seconds === 0 && !isCounting && (
          <p className="text-green-500 mt-4">Time's up! Well done!</p>
        )}
      </div>

      <div className="dog-image-section flex justify-center">
        <img
          src={dogImage} 
          alt="Dog"
          style={{ width: "150px", height: "150px" }} 
        />
      </div>
    </div>
  );
}
