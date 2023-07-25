import joinClasses from "@/util/joinClasses"
import React from "react"

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={joinClasses(
      "mx-auto my-auto w-full py-12 bg-gray-100 drop-shadow-lg",
      "transition duration-100 ease-out"
    )}>
      {children}
    </div>
  );
}
