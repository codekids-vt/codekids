import { useState, useEffect } from "react";

interface FixPasswordProps {
  props: {
    weakPasswords: string[];
  };
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const isStrongPassword = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

const FixPassword = ({ props, setAllowNext }: FixPasswordProps) => {
  const { weakPasswords } = props;
  const [passwords, setPasswords] = useState(
    Array(weakPasswords.length).fill(""),
  );
  const [isStrong, setIsStrong] = useState(
    Array(weakPasswords.length).fill(false),
  );
  const [showPasswords, setShowPasswords] = useState(
    Array(weakPasswords.length).fill(false),
  );

  useEffect(() => {
    setAllowNext(isStrong.every((strength) => strength));
  }, [isStrong, setAllowNext]);

  const handleChange = (index: number, value: string) => {
    const updatedPasswords = [...passwords];
    updatedPasswords[index] = value;
    setPasswords(updatedPasswords);

    const updatedIsStrong = [...isStrong];
    updatedIsStrong[index] = isStrongPassword(value);
    setIsStrong(updatedIsStrong);
  };

  const toggleShowPassword = (index: number) => {
    const updatedShowPasswords = [...showPasswords];
    updatedShowPasswords[index] = !updatedShowPasswords[index];
    setShowPasswords(updatedShowPasswords);
  };

  return (
    <div className="flex flex-col items-center">
      {weakPasswords.map((weakPassword, index) => (
        <div key={index} className="flex flex-col items-center mb-4">
          <span className="mb-2">{weakPassword}</span>
          <div className="flex items-center">
            <input
              type={showPasswords[index] ? "text" : "password"}
              value={passwords[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border p-2 mr-2"
            />
            <button
              onClick={() => toggleShowPassword(index)}
              className="border p-2 bg-gray-200"
            >
              {showPasswords[index] ? "Hide" : "Show"}
            </button>
            {isStrong[index] && (
              <span className="text-green-500 ml-4">Success!</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FixPassword;
