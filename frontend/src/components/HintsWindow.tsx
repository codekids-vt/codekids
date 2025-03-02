import { useState, Dispatch, SetStateAction } from "react";

type HintsWindowProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: {
    inputText: string;
    option1: string;
    option2: string;
  }) => void;
};

export function HintsWindow({ open, setOpen, onSubmit }: HintsWindowProps) {
  const [inputText, setInputText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  function handleSubmit() {
    onSubmit({ inputText, option1, option2 });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      id="hints-modal"
      className="fixed top-0 left-0 right-0 z-50 w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-lg w-full md:w-1/2">
          <div className="flex items-center justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-medium text-gray-900">Hints Window</h3>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            {/* Text Box */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                rows={3}
                placeholder="Enter your text here"
              ></textarea>
            </div>
            {/* First Multiple Options Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Option 1
              </label>
              <select
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select an option</option>
                <option value="option1a">Option 1A</option>
                <option value="option1b">Option 1B</option>
                <option value="option1c">Option 1C</option>
              </select>
            </div>
            {/* Second Multiple Options Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Option 2
              </label>
              <select
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select an option</option>
                <option value="option2a">Option 2A</option>
                <option value="option2b">Option 2B</option>
                <option value="option2c">Option 2C</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end p-5 border-t rounded-b">
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-primary-green hover:bg-hover-green text-white font-bold px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export {};