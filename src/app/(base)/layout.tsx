import React from "react"
import Footer from "@/components/Footer";

import { headers } from "next/headers";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const shouldRenderFooter = !pathname.includes("book");

  return (
    <>
      <div className="flex-grow">
        <div 
          className="absolute w-full h-full bg-local -z-10"
          style={{ 
            backgroundImage: "url(\"/bg-cover-bottom.png\")",
            backgroundSize: "contain",
            backgroundPosition: "center top",
            backgroundRepeat: "repeat-x"
          }}
        />
        {children}
      </div>
      {shouldRenderFooter && <Footer />}
    </>
  );
}
