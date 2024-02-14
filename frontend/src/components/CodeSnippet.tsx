import React from "react";

export function CodeSnippet({
  code,
  backgroundColor = "bg-neutral-300",
}: {
  code: React.JSX.Element;
  backgroundColor?: string;
}) {
  return (
    <div
      className={`text-left w-fit mx-auto px-7 py-2 ${backgroundColor} whitespace-pre-wrap`}
    >
      <p className="font-normal w-fit text-xl">{code}</p>
    </div>
  );
}
