"use client"
import Link from "next/link";

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
import { DataTypesIntro } from "@/components/MisconceptionComponents/DataTypesIntro";
import { IntsAndBools } from "@/components/MisconceptionComponents/IntsAndBools";
import { VariableAssignment } from "@/components/MisconceptionComponents/VariableAssignment";
import { Strings } from "@/components/MisconceptionComponents/Strings";
import { Sequencing } from "@/components/MisconceptionComponents/Sequencing";
import { IfStatementIntro } from "@/components/MisconceptionComponents/IfStatementIntro";
import { ConditionalOperators } from "@/components/MisconceptionComponents/ConditionalOperators";
import { LogicalOperators } from "@/components/MisconceptionComponents/LogicalOperators";
import { IfStatements } from "@/components/MisconceptionComponents/IfStatements";
import { LifeOfMoose } from "@/components/MisconceptionComponents/LifeOfMoose";
import { MooseMilestone } from "@/components/MisconceptionComponents/MooseMilestone";
import { MooseDr } from "@/components/MisconceptionComponents/MooseDr";
import { MooseChallengingYear } from "@/components/MisconceptionComponents/MooseChallengingYear";
import { MooseThankYou } from "@/components/MisconceptionComponents/MooseThankYou";

function BookImage({ image, page }: { image: string, page: Page }) {
  const isImage = image && image.includes(".");

  return (
    <div className="h-[calc(100vh-10rem)] xl:h-[calc(100vh-14rem)] overflow-y-scroll flex flex-col items-center w-full">
      {isImage && <Image src={image} alt="book image" width={800} height={800} className="object-contain max-w-full max-h-full" />}
      {image === "HokieBirdActivity" && <HokieBirdColoring props={page?.props} />}
      {image === "tutor" && <PythonTutor props={page?.props} />}
      {image === "HokieBirdMazeActivity" && <HokieBirdMap props={page?.props} />}
      {image === "HokieBirdIfConditionActivity" && <HokieBirdIfCondition props={page?.props} />}   
      {image === "DataTypesIntro" && <DataTypesIntro/>}
      {image === "IntsAndBools" && <IntsAndBools/>}
      {image === "VariableAssignment" && <VariableAssignment/>}
      {image === "Strings" && <Strings props={page?.props}/>}
      {image === "Sequencing" && <Sequencing/>}
      {image === "IfStatementIntro" && <IfStatementIntro/>}
      {image === "ConditionalOperators" && <ConditionalOperators props={page?.props}/>}
      {image === "LogicalOperators" && <LogicalOperators/>}
      {image === "IfStatements" && <IfStatements props={page?.props}/>}
      {image === "LifeOfMoose" && <LifeOfMoose props={page?.props}/>}
      {image === "MooseMilestone" && <MooseMilestone props={page?.props}/>}
      {image === "MooseDr" && <MooseDr props={page.props}/>}
      {image === "MooseChallengingYear" && <MooseChallengingYear props={page.props}/>}
      {image === "MooseThankYou" && <MooseThankYou/>}
      {image === "park_1" && <NumberInputActivity props={page?.props} />} 
    </div>
  );
}

function BookContent({ content, game, props }: { content: string[], game: string | null, props: any }) {
  return (
    <div className="h-[calc(100vh-10rem)] xl:h-[calc(100vh-14rem)] overflow-y-scroll flex flex-col items-center w-full">
      <ul className="flex flex-col p-4 md:space-y-1 xl:space-y-4">
        {content.map((line, i) => (
          <li className="text-center text-xs md:text-md xl:text-2xl xl:py-3 md:font-semibold " key={i}>
            <Reader text={line} />
          </li>
        ))
        }
      </ul>
      {game && game === "color" && <ColorPattern />}
      {game && game === "number" && <NumericalPattern pattern={props.pattern} answer={props.ans[0]} />}
      {game && game === "code" && <CodeComplete beforeCode="if (" afterCode=") brushTeeth()" answer="teethDirty" choices={["eating", "teethDirty", "playing"]} />}
      {game && game === "TableCompletionActivity" && <TableCompletionActivity props={props} />}
      {game && game === "NumberInputActivity" && <NumberInputActivity props={props} />}
    
    </div>
  );
}


export default function ActivityPage({ params }: { params: { id: string, pagenum: string } }) {

  const [help, setHelp] = useState(false);

  const bookNum = parseInt(params.id) - 1
  const pageNum = parseInt(params.pagenum)
  const page = books[bookNum].pages[pageNum]

  function getNextPageNum(): number | null {
    return pageNum + 1 > books[bookNum].pages.length - 1 ? null : pageNum + 1;
  }

  function getPrevPageNum(): number | null {
    return pageNum - 1 < 0 ? null : pageNum - 1;
  }

  const forwardButton = (
    getNextPageNum() !== null ?
      <Link href={`/book/${params.id}/${getNextPageNum()}`}>
        <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-2 xl:p-6 xl:text-2xl rounded-full">
          Next
        </button>
      </Link>
      :
      <Link href={`/books/1`}>
        <button className="bg-blue-500 hover:bg-hover-blue hover:shadow-2xl text-white font-bold p-2 xl:p-6 xl:text-2xl rounded-full">
          Home
        </button>
      </Link>
  )

  const backButton = (
    getPrevPageNum() !== null ?
      <Link href={`/book/${params.id}/${getPrevPageNum()}`}>
        <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-2 xl:p-6 xl:text-2xl rounded-full">
          Back
        </button>
      </Link>
      :
      <Link href={`/books/1`}>
        <button className="bg-blue-500 hover:bg-hover-blue hover:shadow-2xl text-white font-bold p-2 xl:p-6 xl:text-2xl rounded-full">
          Home
        </button>
      </Link>
  )

  return (
    <div>
      <Navbar />
      <div className="mx-auto">
        <div className="px-2 xl:px-24 py-2 h-[calc(100vh-4rem)] flex">
          {page && (
            <div className="flex flex-row bg-white rounded-2xl shadow-xl p-2 flex-grow">
              <div className="basis-4/6 flex flex-col  flex-grow items-center">
                <div className="flex flex-col justify-between flex-grow w-full">
                  <div className="flex flex-col flex-grow items-center justify-center">
                    <BookImage image={page.image} page={page} />
                  </div>
                  <div className="flex flex-row justify-start items-center xl:p-2 space-x-2">
                    {backButton}
                    {page?.props?.ans?.length &&
                      <button onClick={() => setHelp(!help)}
                        className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold flex flex-row items-center p-1 xl:p-6 xl:text-2xl rounded-full">
                        Help me
                        <div className="px-1">
                          <Image src={"/help-icon.png"} alt="help icon" width={25} height={25} />
                        </div>
                      </button>
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between bg-gray-100 rounded-2xl">
                <div className="flex flex-col items-center justify-center">
                  <BookContent content={page.content} game={page.game} props={page.props} />
                </div>
                <div className="flex flex-row w-full justify-end p-2">{forwardButton}</div>
              </div>
              {page?.props?.ans?.length && (
                <div
                  id="help-modal"
                  className={`fixed top-0 left-0 right-0 z-50 ${help ? "" : "hidden"
                    } w-full h-full bg-gray-900 bg-opacity-50`}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="bg-white rounded-lg shadow-lg w-full md:w-1/2">
                      <div className="flex items-center justify-between p-5 border-b rounded-t">
                        <h3 className="text-xl font-medium text-gray-900">
                          Help for {books[bookNum].title}
                        </h3>
                        <button
                          onClick={() => setHelp(!help)}
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                          data-modal-hide="bottom-right-modal"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <div className="p-6 space-y-6">
                        <ul className="flex flex-col items-center">
                          <h3>The correct answer(s) is:</h3>
                          {page.props?.ans &&
                            page.props?.ans.map((answer: string, index: number) => (
                              <li
                                className="inline-block font-semibold text-gray-900"
                                key={`answerTag-${index}`}
                              >
                                {`${index + 1}.  ${answer}`}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="flex justify-end p-5 border-t rounded-b">
                        <button
                          onClick={() => setHelp(!help)}
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center mr-2"
                        >
                          Close help
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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

