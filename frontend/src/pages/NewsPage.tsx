import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NewsPage() {
  const newsArticles = [
    {
      title: "Exciting Updates from CodeKids!",
      content:
        "We are thrilled to announce the launch of our new AI Books for kids to learn new Artificial Intelligence topics!" +
        " Browse the new books on our homepage.",
      date: "September 1, 2024",
    },
    {
      title: "CodeKids Participates in Hokie for a Day",
      content: (
        <>
          CodeKids attended Virginia Tech's Hokie for a Day program. See more at
          this{" "}
          <a
            href="https://news.vt.edu/videos/k/2024/10/1_udlbdosv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-green underline hover:text-hover-green"
          >
            link
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen w-full">
        <div className="w-2/3 mt-10">
          <h1 className="text-4xl font-bold mb-5">Latest News</h1>
          {newsArticles.map((article, index) => (
            <div key={index} className="mb-5">
              <h2 className="text-2xl font-bold">{article.title}</h2>
              <p className="text-gray-600">{article.date}</p>
              <p className="text-lg mt-2">{article.content}</p>
              <hr className="my-4" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
