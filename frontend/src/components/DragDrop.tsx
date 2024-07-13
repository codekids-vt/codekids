import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface WordItem {
  id: number;
  text: string;
  correctBox: string;
}

interface DropAreaProps {
  title: string;
  words: WordItem[];
  onDrop: (item: WordItem) => void;
  errorMessage: string | null;
}

const DropArea = ({ title, words, onDrop, errorMessage }: DropAreaProps) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const word = JSON.parse(event.dataTransfer.getData("word"));
    onDrop(word);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="border p-4 m-2 w-1/3 min-h-[200px]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-bold">{title}</h2>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div>
        {words.map((word) => (
          <div key={word.id} className="p-2 m-1 border bg-gray-200">
            {word.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const DraggableWord = ({ word }: { word: WordItem }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("word", JSON.stringify(word));
  };

  return (
    <div
      className="p-2 m-1 border bg-blue-200 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
    >
      {word.text}
    </div>
  );
};

export function DragDrop({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const [strongWords, setStrongWords] = useState<WordItem[]>([]);
  const [weakWords, setWeakWords] = useState<WordItem[]>([]);
  const [wordBank, setWordBank] = useState<WordItem[]>(props.words);
  const [strongErrorMessage, setStrongErrorMessage] = useState<string | null>(null);
  const [weakErrorMessage, setWeakErrorMessage] = useState<string | null>(null);

  const boxNames = props.boxNames || { strong: "Strong", weak: "Weak" };

  useEffect(() => {
    validateWords();
  }, [strongWords, weakWords]);

  const validateWords = () => {
    const allWordsValid = strongWords.every((word) => word.correctBox === boxNames.strong) &&
                          weakWords.every((word) => word.correctBox === boxNames.weak) &&
                          strongWords.length + weakWords.length === props.words.length;
    setAllowNext(allWordsValid);
  };

  const handleDropStrong = (item: WordItem) => {
    if (item.correctBox === boxNames.strong) {
      setStrongWords((prev) => [...prev, item]);
      setWordBank((prev) => prev.filter((word) => word.id !== item.id));
      setStrongErrorMessage(null);
    } else {
      setStrongErrorMessage(`Incorrect`);
    }
  };

  const handleDropWeak = (item: WordItem) => {
    if (item.correctBox === boxNames.weak) {
      setWeakWords((prev) => [...prev, item]);
      setWordBank((prev) => prev.filter((word) => word.id !== item.id));
      setWeakErrorMessage(null);
    } else {
      setWeakErrorMessage(`Incorrect`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4">Drag and Drop the words into the correct categories</h2>
      <div className="flex w-full justify-center">
        <DropArea
          title={boxNames.strong}
          words={strongWords}
          onDrop={handleDropStrong}
          errorMessage={strongErrorMessage}
        />
        <DropArea
          title={boxNames.weak}
          words={weakWords}
          onDrop={handleDropWeak}
          errorMessage={weakErrorMessage}
        />
      </div>
      <div className="mt-4 p-4 border w-full">
        <h3 className="text-lg font-bold">Word Bank</h3>
        <div className="flex flex-wrap">
          {wordBank.map((word) => (
            <DraggableWord key={word.id} word={word} />
          ))}
        </div>
      </div>
    </div>
  );
}
