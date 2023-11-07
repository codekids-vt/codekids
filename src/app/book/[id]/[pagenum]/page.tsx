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
import { TableCompletionActivityTrees } from "@/components/TableCompletionActivityTrees";
import { FlowerInputActivity } from "@/components/FlowerInputActivity";

const numericalProps = {
  pattern: [2, 4, 6, 8, '__', '__', '__'],
  answer: ["10", "12", "14"]
}

function BookImage({ image, page }: { image: string, page: Page }) {
  const isImage = image && image.includes(".");

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
// {image === "park_1" && <NumberInputActivity question={page?.props.question} options={props.options} answer={props.answer} showIOLabels={props.showIOLabels} imageUrl={page?.props.imageUrl}/>}

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
      {game && game === "FlowerInputActivity" && <FlowerInputActivity question={props.question} options={props.options} answer={props.ans[0]} showIOLabels={props.showIOLabels} />}
      {game && game === "TableCompletionActivity" && <TableCompletionActivity options={props.options} answer={props.ans[0]} />}
      {game && game === "TableCompletionActivityTrees" && <TableCompletionActivityTrees options={props.options} answer={props.ans[0]} />}
      {game && game === "NumberInputActivity" && <NumberInputActivity question={props.question} options={props.options} answer={props.ans[0]} showIOLabels={props.showIOLabels} />}
    </div>
  );
}


export default function ActivityPage({ params }: { params: { id: string, pagenum: string } }) {

  const [help, setHelp] = useState(false);

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

  function handleHelp() {
    console.log(help)
    setHelp(help ? false : true)
  }

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
                  {page?.showHelp &&
                    <button onClick={() => setHelp(!help)} className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Help me
                    </button>}

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
              {page?.showHelp &&
                <div id="help-modal" className={`fixed top-0 left-0 right-0 z-50 ${help ? '' : 'hidden'} w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                  <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                          Help for {books[bookNum].title}
                        </h3>
                        <button onClick={() => setHelp(!help)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="bottom-right-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <div className="p-6 space-y-6">
                        <ul className="flex flex-col items-center">
                        {
                          page.props?.ans &&
                          page.props?.ans.map((answer: string, index: number) => (
                            <li className="inline-block font-semibold text-white " key={`answerTag-${index}`}>
                              {` ${index+1}. The Correct answer is:  ${answer}`}
                            </li>
                          ))
                        }
                        </ul>
                      </div>
                      <div>
                        <button onClick={() => setHelp(!help)} type="button" className="text-white bg-red-600 hover:bg-red-800 dark:focus:ring-red-800 font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center mr-2">
                          Close help
                        </button>                     
                         </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          )}
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
