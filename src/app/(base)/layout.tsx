import React from "react"

import Navbar from "@/components/Navbar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
