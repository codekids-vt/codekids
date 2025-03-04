import { Dispatch, SetStateAction } from "react";

interface LinkableImageProps {
  props: {
    imageUrl: string;
    linkUrl: string;
    buttonText?: string;
  };
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}

export function LinkableImage({ props, setAllowNext }: LinkableImageProps) {
  const buttonText = props.buttonText;

  const handleClick = () => {
    // Open the link in a new tab
    window.open(props.linkUrl, "_blank");
    setAllowNext(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <img
        src={props.imageUrl}
        className="object-contain max-w-full max-h-80"
      />
      <button
        onClick={handleClick}
        className="bg-primary-green text-white px-6 py-4 text-xl rounded-full 
        hover:brightness-90 transition-all duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
}
