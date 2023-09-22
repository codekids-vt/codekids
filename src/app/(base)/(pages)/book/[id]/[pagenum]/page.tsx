import Link from "next/link";

// import { GET as routeHandler } from "../../../../api/activity/[id]/route";
import { Book, Page } from "@/util/BookData";
import Image from "next/image";
import React from "react";
import { ColorPattern } from "@/components/ColorPattern";
import NumericalPattern from "@/components/NumericalPatter";
import { CodeComplete } from "@/components/CodeComplete";
import { Reader } from "@/components/Reader";

const numericalProps = {
  pattern: [2, 4, 6, 8, '__', '__', '__'],
  answer: ["10", "12", "14"]
}

export default async function ActivityPage({ params }: { params: { id: string, pagenum: string } }) {
  // const response = await routeHandler(null, { params });
  const book: Book = {
    BookId: 1,
    title: "Book 1 test",
    blurb: "some blurb",
    author: "Dev",
    pages: [
      {
        content: ["In this activity well go over different patterns and how to identify them.",
          "What is a pattern?",
          "Patterns and functions can be represented in many ways and described using words, tables, graphs, and symbols."
        ],
        image: "/lego-sort-example-clumping.png",
        game: null
      },
      {
        content: ["This is the first activity",
          "Lets try creating the pattern: Red, Red, Blue, Blue"],
        image: "/lego-sort-example-clumping.png",
        game: "color"
      },
      {
        content: ["Ok that wasn't too bad lets see how we do with numerical patterns.",
          "Lets try completing the pattern now!"],
        image: "/lego-sort-example-clumping.png",
        game: "number"
      },
      {
        content: ["Try completing this code snippet!"],
        image: "/lego-sort-example-clumping.png",
        game: "code"
      },
    ],
  }
  const pageNum = parseInt(params.pagenum)
  const page = book.pages[pageNum]

  function getNextPageNum() {
    return pageNum + 1 > book.pages.length - 1 ? pageNum : pageNum + 1;
  }

  function getPrevPageNum() {
    return pageNum - 1 >= 0 ? pageNum - 1 : pageNum;
  }

  return (
    // height of screen minus header and footer 
    <div className="md:px-48 py-2 h-[calc(100vh-9rem)] flex">
      {page && <div className=" grid grid-cols-2 bg-white rounded-2xl shadow-xl p-2 flex-grow">
        <div className="flex flex-col flex-grow items-center justify-center">
          <div className="flex flex-col justify-between flex-grow w-full">
            <div className="flex flex-col flex-grow items-center justify-center">
              <Image src={page.image} alt="book image" width={300} height={500} />
            </div>
            <div className="flex flex-row justify-start p-2">
              <Link href={`/book/${params.id}/${getPrevPageNum()}`}>
                <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-6 rounded-full text-2xl">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center bg-gray-100 rounded-2xl">
          <div className="flex flex-col justify-between flex-grow w-full">
            <div className="flex flex-col flex-grow items-center justify-center">
              <ul className="flex flex-col p-4">
                {page.content.map((line, i) => (
                  <li className="text-center text-lg" key={i}>
                    <Reader text={line} />
                  </li>
                ))
                }
              </ul>
              {page.game && page.game === "color" && <ColorPattern />}
              {page.game && page.game === "number" && <NumericalPattern pattern={numericalProps.pattern} answer={numericalProps.answer} />}
              {page.game && page.game === "code" && <CodeComplete beforeCode="if (" afterCode={') \n brushTeeth()'} answer="teethDirty" choices={["eating", "teethDirty", "playing"]} />}
            </div>
            <div className="flex flex-row justify-end p-2">
              <Link href={`/book/${params.id}/${getNextPageNum()}`}>
                <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-6 rounded-full text-2xl">
                  Next
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      }
      {!page &&
        <div className="flex flex-col flex-grow items-center justify-center">
          <h1 className="text-center text-lg font-medium">
            We couldn't find anything for this page.
          </h1 >
        </div>
      }
    </div >
  )
}
