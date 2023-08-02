"use client"

import joinClasses from "@/util/joinClasses";
import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="my-10">
      <div className="mx-auto card p-4 max-w-3xl">
        <div className="mb-2">
          <h1 className="text-xl font-bold">
            See something you did or didn&apos;t like about CodeKids?
          </h1>
          <p>
            Let us know! You can fill out the email form below, or manually send an
            email to us at&nbsp;
            <a href="mailto:shamouda@vt.edu">
              <span className="text-blue-500 underline">
                shamouda@vt.edu
              </span>
            </a>
            .
          </p>
        </div>

        <div>
          <h1 className="text-lg font-medium">What are your thoughts?</h1>
          <textarea 
            className="h-40 max-h-80 card p-2 w-full break-words"
            name="body"
            placeholder="Your Message"
            onChange={(event) => setMessage(event.target.value)}
          />
          <a
            className={`transition-opacity ${message !== "" ? "opacity-100" : "opacity-25"}`}
            href={`mailto:shamouda@vt.edu?subject=CodeKids Feedback&body=${message}`}
          >
            <p className={joinClasses(
              "text-center card px-1.5 py-1 font-medium transition-colors",
              message !== "" ? "hover:bg-blue-200" : undefined
            )}>
              Send Email
            </p>
          </a>
          <p className="text-sm text-center text-neutral-500 mt-2">
            You will be prompted to send an email through an external provider.
          </p>
        </div>
      </div>
    </div>
  );
}
