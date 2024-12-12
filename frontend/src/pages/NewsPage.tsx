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

          <div className="flex space-x-4">
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Fall 2023
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Application UI code in Tailwind CSS
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  The unplugged rush hour game was developed to help aid
                  students thinking in a logical programmatic fashion while
                  being able to physically interact with an activity. The game
                  works by arranging the cars in a start position and having a
                  camera process the state of the board based on the colors of
                  the cars. Using a weighted graph analysis and hashing we
                  determine how close or far a student is from the desired board
                  position, and display this on the front-end of the
                  application. In Fall 2023 Noah P. and Namita S. Demoed
                  unplugged Rush Hour game for gradeschool and university
                  students.
                </p>
                <a
                  href="https://codekids.cs.vt.edu/book/45/1"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Virtual Game{" "}
                  <svg
                    className="w-3 h-3 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/codekids-vt/rush-hour"
                  className="inline-flex items-center px-4 py-2 m-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  GitHub Repo{" "}
                  <svg
                    className="w-3 h-3 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </li>
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Spring 2024
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  The Association for Women in Computing is a student-run,
                  non-profit organization at Virginia Tech. For over 20 years,
                  they have worked to promote the recruitment and retention of
                  women in technology- and computer-oriented professions. The
                  Association for Women in Computing hosts an outreach event
                  every Spring semester in order to introduce girls (6th and 7th
                  grade) to the world of computing. The event is called Women in
                  Computing Day. In the Spring 2024 we demoed CodeKids
                  activities for the annual Women in Computing Day.
                </p>
              </li>
              <li className="ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Fall 2024
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  E-Commerce UI code in Tailwind CSS
                </h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Hokie for a Day offers fifth grade students a unique
                  opportunity to experience college life. The visit includes a
                  discussion of college majors, a conversation about how to get
                  to college, an expo with hands-on academic experiences from
                  Virginia Tech faculty and students, and more. As part of this
                  Expo our students demoed CodeKids activities for the students.
                </p>
                <a
                  href="https://news.vt.edu/content/news_vt_edu/en/videos/k/2024/10/1_udlbdosv.html"
                  className="inline-flex items-center px-4 py-2 m-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  CodeKids - Hokie For a Day{" "}
                  <svg
                    className="w-3 h-3 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
                {/* <video className="h-full w-full rounded-lg" controls>
                  <source
                    src="https://news.vt.edu/content/news_vt_edu/en/videos/k/2024/10/1_udlbdosv.html"
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </video> */}
              </li>
            </ol>
            <a
              href="https://website.cs.vt.edu/About/News/cs-VTURCS-winners-2024.html"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-96"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy Accolades
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                In the 2024 Virginia Tech Undergraduate Research in Computer
                Science exhibition and competition our team won a first place
                tie for People's choice category.
              </p>
            </a>

            <a
              href="https://www.linkedin.com/company/codekids-virginia-tech/"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-64"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                LinkedIn
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Follow us on LinkedIn for the latest updates on our project.
              </p>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
