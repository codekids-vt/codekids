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
        {children}
      </div>
      <Footer />
    </>
  );
}
