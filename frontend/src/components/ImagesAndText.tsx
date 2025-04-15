import React from "react";
import { Reader } from "./Reader";

export interface SectionItem {
  leftText: string;
  leftIsImage: boolean;
  rightText: string;
  rightIsImage: boolean;
  containerClassName?: string;
}

export interface ImagesAndTextProps {
  headerText?: string;
  sections: SectionItem[];
  footerText?: string;
}

interface ImagesAndTextWrapperProps {
  props: ImagesAndTextProps;
  setAllowNext?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ImagesAndText({
  props,
  setAllowNext,
}: ImagesAndTextWrapperProps) {
  const { headerText, sections, footerText } = props;

  // Helper function to render content based on whether it's an image or text.
  const renderItem = (text: string, isImage: boolean) => {
    if (isImage) {
      return <img src={text} alt="" className="object-contain max-w-full" />;
    } else {
      return <Reader text={text} />;
    }
  };

  return (
    <div className="flex flex-col w-full items-center font-semibold text-lg text-center">
      {headerText && (
        <div className="mb-4">
          <Reader text={headerText} />
        </div>
      )}

      {sections.map((section, index) => {
        // Trim the text to ensure we handle whitespace-only values.
        const hasLeft = section.leftText.trim() !== "";
        const hasRight = section.rightText.trim() !== "";

        // Both sides have content.
        if (hasLeft && hasRight) {
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 my-5 ${
                section.containerClassName || ""
              }`}
            >
              <div className="flex-1">
                {renderItem(section.leftText, section.leftIsImage)}
              </div>
              <div className="flex-1">
                {renderItem(section.rightText, section.rightIsImage)}
              </div>
            </div>
          );
        }

        // Only left side has content.
        if (hasLeft) {
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 my-5 ${
                section.containerClassName || ""
              }`}
            >
              <div className="w-full text-center">
                {renderItem(section.leftText, section.leftIsImage)}
              </div>
            </div>
          );
        }

        // Only right side has content.
        if (hasRight) {
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 my-5 ${
                section.containerClassName || ""
              }`}
            >
              <div className="w-full text-center">
                {renderItem(section.rightText, section.rightIsImage)}
              </div>
            </div>
          );
        }

        // If both sides are empty, don't render the section.
        return null;
      })}

      {footerText && (
        <div className="mt-4">
          <Reader text={footerText} />
        </div>
      )}
    </div>
  );
}
