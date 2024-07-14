import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function PasswordChecker({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  useEffect(() => {
    validatePassword(password, props);
  }, [password, props]);

  const validatePassword = (password: string, requirements: any) => {
    const minLength = password.length >= requirements.minLength;
    const upperCase = requirements.requireUpperCase
      ? /[A-Z]/.test(password)
      : true;
    const lowerCase = requirements.requireLowerCase
      ? /[a-z]/.test(password)
      : true;
    const specialChar = requirements.requireSpecialChar
      ? /[!@#$%^&*(),.?":{}|<>]/.test(password)
      : true;
    const number = requirements.requireNumber ? /\d/.test(password) : true;

    setHasMinLength(minLength);
    setHasUpperCase(upperCase);
    setHasLowerCase(lowerCase);
    setHasSpecialChar(specialChar);
    setHasNumber(number);

    setIsValid(minLength && upperCase && lowerCase && specialChar && number);
  };

  useEffect(() => {
    setAllowNext(isValid);
  }, [isValid, setAllowNext]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p>Type your password below:</p>
      <div className="relative flex items-center mt-2">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border p-2 ${isValid ? "border-green-500" : "border-red-500"} flex-grow`}
        />
        <button
          className="ml-2 px-2 py-1 bg-gray-200 rounded"
          onClick={toggleShowPassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <p className="mt-2">
        Password must meet the following requirements:
        {props.minLength && (
          <span
            className={`${hasMinLength ? "text-green-500" : "text-red-500"}`}
          >
            <br />- Minimum {props.minLength} characters long
          </span>
        )}
        {props.requireUpperCase && (
          <span
            className={`${hasUpperCase ? "text-green-500" : "text-red-500"}`}
          >
            <br />- At least one uppercase letter
          </span>
        )}
        {props.requireLowerCase && (
          <span
            className={`${hasLowerCase ? "text-green-500" : "text-red-500"}`}
          >
            <br />- At least one lowercase letter
          </span>
        )}
        {props.requireSpecialChar && (
          <span
            className={`${hasSpecialChar ? "text-green-500" : "text-red-500"}`}
          >
            <br />- At least one special character
          </span>
        )}
        {props.requireNumber && (
          <span className={`${hasNumber ? "text-green-500" : "text-red-500"}`}>
            <br />- At least one number
          </span>
        )}
      </p>
      {isValid && (
        <p className="text-green-500 mt-2">Password meets all requirements!</p>
      )}
    </div>
  );
}
