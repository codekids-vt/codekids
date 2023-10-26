"use client"
import Link from "next/link";

// import { GET as routeHandler } from "../../../../api/activity/[id]/route";
import { Page } from "@/util/BookData";
import Image from "next/image";
import React, { useState } from "react";
import { ColorPattern } from "@/components/ColorPattern";
import NumericalPattern from "@/components/NumericalPatter";
import { CodeComplete } from "@/components/CodeComplete";
import { Reader } from "@/components/Reader";
import { HokieBirdColoring } from "@/components/HokieBirdColor";
import { HokieBirdMap } from "@/components/HokieBirdMap";
import { HokieBirdIfCondition } from "@/components/HokieBirdIfCondition";
import { books } from "./books"
import Navbar from "@/components/Navbar";
import { PythonTutor } from "@/components/PythonTutor";
import { NumberInputActivity } from "@/components/NumberInputActivity";
import { TableCompletionActivity } from "@/components/TableCompletionActivity";

const numericalProps = {
  pattern: [2, 4, 6, 8, '__', '__', '__'],
  answer: ["10", "12", "14"]
}

function BookImage({ image, page }: { image: string, page: Page }) {

  const [isImage] = useState(image.includes("."));

  return (
    <div className="h-[calc(100vh-14rem)] overflow-y-scroll flex flex-col items-center w-full">
      {isImage && <Image src={image} alt="book image" width={500} height={500} className="object-contain max-w-full max-h-full" />}
      {image === "HokieBirdActivity" && <HokieBirdColoring props={page?.props} />}
      {image === "tutor" && <PythonTutor props={page?.props} />}
      {image === "HokieBirdMazeActivity" && <HokieBirdMap props={page?.props} />}
      {image === "HokieBirdIfConditionActivity" && <HokieBirdIfCondition props={page?.props} />}
    </div>
  );
}

function BookContent({ content, game, props }: { content: string[], game: string | null, props: any }) {
  return (
    <div className="h-[calc(100vh-14rem)] overflow-y-scroll flex flex-col items-center w-full">
      <ul className="flex flex-col p-4 space-y-4">
        {content.map((line, i) => (
          <li className="text-center text-2xl py-3 font-semibold " key={i}>
            <Reader text={line} />
          </li>
        ))
        }
      </ul>
      {game && game === "color" && <ColorPattern />}
      {game && game === "number" && <NumericalPattern pattern={numericalProps.pattern} answer={numericalProps.answer} />}
      {game && game === "code" && <CodeComplete beforeCode="if (" afterCode=") brushTeeth()" answer="teethDirty" choices={["eating", "teethDirty", "playing"]} />}
      {game && game === "NumberInputActivity" && <NumberInputActivity question={props.question} options={props.options} answer={props.answer} showIOLabels={props.showIOLabels} />}
      {game && game === "TableCompletionActivity" && <TableCompletionActivity options={props.options} answer={props.answer} />}    
    </div>
  );
}


export default async function ActivityPage({ params }: { params: { id: string, pagenum: string } }) {

  const bookNum = parseInt(params.id) - 1
  const pageNum = parseInt(params.pagenum)
  const page = books[bookNum].pages[pageNum]

  function getNextPageNum() {
    return pageNum + 1 > books[bookNum].pages.length - 1 ? false : pageNum + 1;
  }

  function getPrevPageNum() {
    return pageNum - 1 >= 0 ? pageNum - 1 : pageNum;
  }

  const backButton = (
    <Link href={`/book/${params.id}/${getPrevPageNum()}`}>
      <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-6 rounded-full text-2xl">
        Back
      </button>
    </Link>
  )

  const forwardButton = (
    getNextPageNum() ?
      <Link href={`/book/${params.id}/${getNextPageNum()}`}>
        <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-6 rounded-full text-2xl">
          Next
        </button>
      </Link>
      :
      <Link href={`/books/1`}>
        <button className="bg-blue-500 hover:bg-hover-blue hover:shadow-2xl text-white font-bold p-6 rounded-full text-2xl">
          Home
        </button>
      </Link>
  )
  return (
    <div>
      <Navbar />
      <div className="mx-auto">
        <div className="md:px-24 py-2 h-[calc(100vh-5rem)] flex">
          {page && (
            <div className="grid grid-cols-2 bg-white rounded-2xl shadow-xl p-2 flex-grow">
              <div className="flex flex-col flex-grow items-center">
                <div className="flex flex-col justify-between flex-grow w-full">
                  <div className="flex flex-col flex-grow items-center justify-center">
                    <BookImage image={page.image} page={page} />
                  </div>
                  <div className="flex flex-row justify-start p-2">{backButton}</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-col items-center justify-center">
                    <BookContent content={page.content} game={page.game} props={page.props} />
                  </div>
                  <div className="flex flex-row justify-end p-2">{forwardButton}</div>
                </div>
              </div>
            </div>
          )
          }
          {!page &&
            <div className="flex flex-col flex-grow items-center justify-center">
              <h1 className="text-center text-lg font-medium">
                We could not find anything for this page.
              </h1 >
            </div>
          }
        </div >
      </div>
    </div>
  )
}
