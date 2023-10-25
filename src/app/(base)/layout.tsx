import React from "react"
import Footer from "@/components/Footer";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
  }) {
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
      <Footer />
    </>
  );
}
