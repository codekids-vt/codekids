import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function Article() {
  const { articleNameParam } = useParams();
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    if (articleNameParam && articleNameParam === "lego") {
      fetch("/lego-sort.md")
        .then((response) => response.text())
        .then((text) => {
          setContent(text);
        })
        .catch((error) => {
          console.error("Failed to fetch /lego.md", error);
        });
    }
  }, [articleNameParam]);

  return (
    <div>
      <Background />
      <Navbar />
      <div className="flex flex-col items-center container mx-auto z-10 min-h-screen">
        <div className="flex flex-col items-center bg-white rounded-xl border-2 p-4 border-primary-green w-1/2 mt-16">
          <Markdown className="prose prose-img:mx-auto" children={content} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
