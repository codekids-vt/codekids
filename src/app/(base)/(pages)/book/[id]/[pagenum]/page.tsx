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

function BookImage({ image }: { image: string }) {
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Image src={image} alt="book image" width={300} height={500} />
    </div>
  );
}

function BookContent({ content, game }: { content: string[], game: string | null }) {
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-gray-100 rounded-2xl">
      <ul className="flex flex-col p-4">
        {content.map((line, i) => (
          <li className="text-center text-lg" key={i}>
            <Reader text={line} />
          </li>
        ))
        }
      </ul>
      {game && game === "color" && <ColorPattern/>}
      {game && game === "number" && <NumericalPattern pattern={numericalProps.pattern} answer={numericalProps.answer} />}
      {game && game === "code" && <CodeComplete beforeCode="if (" afterCode=") brushTeeth()" answer="teethDirty" choices={["eating", "teethDirty", "playing"]} />}
    </div>
  );
}


function ActivityBookDisplay({
  page, id
}: {
  page: Page,
  id: string
}) {
  return (
    <div className=" flex flex-row justify-between flex-grow bg-white rounded-2xl shadow-xl p-2">
      <BookImage image={page.image} />
      <BookContent content={page.content} game={page.game} />
    </div>
  );
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
    <div className="p-2 flex flex-col flex-grow h-[42rem]" >
      {book && <ActivityBookDisplay page={page} id={params.id} />}
      {!book &&
        <h1 className="text-center text-lg font-medium">
          We couldn't find anything for activity {params.id} here!
        </h1 >
      }
      {/* next and back buttons */}
      <div className="p-2">
        <div className="flex flex-row justify-between">
          <Link href={`/book/${params.id}/${getPrevPageNum()}`}>
            <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold py-2 px-4 rounded-full text-2xl mx-2">
              Back
            </button>
          </Link>
          <p>  {pageNum} </p>
          <Link href={`/book/${params.id}/${getNextPageNum()}`}>
            <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold py-2 px-4 rounded-full text-2xl mx-2">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div >
  )
}
