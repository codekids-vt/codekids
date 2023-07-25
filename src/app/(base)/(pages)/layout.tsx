import Navbar from "@/components/Navbar";
import React from "react";

export default function BasePageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {children}
      </div>
    </>
  );
}
