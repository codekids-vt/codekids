import React from "react";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  const studentVideos = [
    {
      title: "Puzzles to Pixels",
      image: "/anthony-video-preview.png",
      author: "Anthony",
      blurb:
        "Learn about the world of Computer Science by watching this video!",
      link: "/anthony-video.mp4",
    },
  ];
  return (
    <div>
      <Background />
      <Navbar />
      <div className="flex flex-col gap-2 items-center z-10 min-h-screen w-full">
        <div className="w-1/2 flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold mt-10">About Us</h1>
          <p className="text-lg mt-5">
            Welcome to CodeKids! We are a team of students from Virginia Tech
            working to provide free resources for kids to learn how to code. We
            believe that coding is an essential skill for the future and we want
            to make it accessible to everyone. Our goal is to provide a fun and
            engaging environment for kids to learn how to code. We hope you
            enjoy our resources and have fun learning how to code!
          </p>
          <p className="text-lg mt-5">
            Created by Dr. Sally Hamouda and a group of graduate and
            undergraduate students and staff members at Virginia Tech including
            Noah Provenzano, Namita Shashidar, Amal Alamri, Khoulood Alharthi,
            Heewoon Bae, Thomas Deverin, Janna Helvey, Gabriel Holder, Mahesh
            Maddhuru, Varsha Manickam, Phu Nguyen, Virginia Pettit, Nikhil Ram,
            Labiba Sajjad, Michael Shi, Matthew Soohoo, Apoorva Srivastava,
            Ethan Triggiano, Dhruv Varshney, Zannah Ziew, and Tyler Zhang.
          </p>
          <a
            href="/contact"
            className="bg-primary-green text-white text-2xl font-bold py-2 px-4 rounded-full shadow-xl hover:bg-hover-green hover:shadow-2xl hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Contact Us
          </a>
          <h1 className="text-4xl font-bold mt-10">Featured Student Stories</h1>
          {studentVideos.map((video, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{video.title}</h2>
              <p className="text-lg">{video.blurb}</p>
              <p className="text-lg">Author: {video.author}</p>
              <video
                src={video.link}
                controls
                className="rounded-xl"
                poster={video.image}
              ></video>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
