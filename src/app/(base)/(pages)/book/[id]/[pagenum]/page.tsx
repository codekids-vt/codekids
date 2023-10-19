"use client"
import Link from "next/link";

// import { GET as routeHandler } from "../../../../api/activity/[id]/route";
import { Book, Page } from "@/util/BookData";
import Image from "next/image";
import React, { useState } from "react";
import { ColorPattern } from "@/components/ColorPattern";
import NumericalPattern from "@/components/NumericalPatter";
import { CodeComplete } from "@/components/CodeComplete";
import { Reader } from "@/components/Reader";
import { HokieBirdColoring } from "@/components/HokieBirdColor";
import { HokieBirdMap } from "@/components/HokieBirdMap";


const numericalProps = {
  pattern: [2, 4, 6, 8, '__', '__', '__'],
  answer: ["10", "12", "14"]
}

function BookImage({ image, page }: { image: string, page: Page }) {

  const [isImage] = useState(image.includes("."));

  return (
    <div>
      {isImage &&
        // give the image max size it can fit
        <Image src={image} alt="book image" width={500} height={500}
          className="object-contain max-w-full max-h-full"
        />
      }
      {image === "HokieBirdActivity" &&
        <HokieBirdColoring props={page?.props}></HokieBirdColoring>
      }
      {image === "HokieBirdMazeActivity" &&
        <HokieBirdMap props={page?.props}></HokieBirdMap>
      }
    </div>
  );
}

function BookContent({ content, game }: { content: string[], game: string | null }) {

  return (
    <div>
      <ul className="flex flex-col p-4">
        {content.map((line, i) => (
          <li className="text-center text-lg" key={i}>
            <Reader text={line} />
          </li>
        ))
        }
      </ul>
      {game && game === "color" && <ColorPattern />}
      {game && game === "number" && <NumericalPattern pattern={numericalProps.pattern} answer={numericalProps.answer} />}
      {game && game === "code" && <CodeComplete beforeCode="if (" afterCode=") brushTeeth()" answer="teethDirty" choices={["eating", "teethDirty", "playing"]} />}
    </div>
  );
}


export default async function ActivityPage({ params }: { params: { id: string, pagenum: string } }) {
  const books: Book[] = [
    {
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
    },
    {
      BookId: 2,
      title: "Variables With Coloring",
      blurb: "Learn about different variables types, coloring the Hokie Bird!",
      author: "Dev",
      pages: [
        {
          content: ["In this book we will discover how to drag and drop different colors into variables",
            "We will also learn how to manually complete vairables!",
          ],
          image: "/HokieBird.png",
        },
        {
          content: ["Here you are able to drag and drop the different colors into the three differnt parts of the Hokie Bird.",
            "The Hokie Bird is split into three parts; a head, a body, and the legs.",
            "Try dragging different colors and see the changes happen live!",
            "Notice how the value on the right hand side changes when a color is dropped, this is the assignment of a variable"
          ],
          image: "HokieBirdActivity",
          props: {
            draggable: true,
            command: "Drag the Colors over these boxes",
          }
        },
        {
          content: ["Now that you assigned variables by dragging values over them, lets try typing in the colors!",
            "Click on the part of the Hokie Bird you would like to color and type in any of the listed colors",
            "After pressing enter the values should update the color of the bird"
          ],
          image: "HokieBirdActivity",
          props: {
            type: true,
            command: "Type the Colors over these boxes test 2",
          }
        },
        {
          content: ["now, you know how to set color for each part, you can type body part with corresponding color"
          ],
          image: "HokieBirdActivity",
          props: {
            type: true,
            typeVariable: true,
            command: "Type the Body Part and Colors over these boxes 3",
          }
        },
      ],
    },
    {
      BookId: 3,
      title: "If-condition and For-loop with HokieBird Maze",
      blurb: "Learn about if-condition and for-loop with the Hokie Bird Maze!",
      author: "Dev",
      pages: [
        {
          content: ["There will be a football game at Virginia Tech this afternoon,",
            "and HokieBird is one of the participants.",
            "Unfortunately, HokieBird does not know where Lane Stadium is",
            "If you would like to help HokieBird, please click the Next button.",
            "Go to the next page and enter the game.",
          ],
          image: "/SadHokieBird.png",
        },
        {
          content: ["The game is about to start, and HokieBird is very worried when he got lost. ",
            "We will use If conditions to help the Hokie bird make it to Lane Stadium",
            "If Conditions have two outcomes, they are either true or false",
            "If a value is true the 'code' that immediatley follows is taken.",
            "If the value is false then the 'code' that follows is ignored",
            "For the next few examples we will use the commands hokieBird.move() to move the bird forward",
            "To make the Hokiebird turn right or left we will use hokeBird.turnRight() or hokieBird.turnLeft()"
          ],
          image: "/HokieBirdMaze.png",
        },
        {
          content: ["Since we now know how to move the hokeiBird around, we need to determine what actions we should do.",
            "This is where the If statement comes in, we know that if there is a square infront of the bird then we can move",
            "We also know that if the road turns right or left we can move the hokie bird",
            "We will check multiple conditions",
            "The first condition will be hokieBirdCanMove(), this is used to move the bird forward",
            "Turning left and right is similar with the functions canHokieBirdTurnLeft() and canHokieBirdTurnRight()",
            "Placing any of these commands in the if statement will either make it true or false",
            "If the condition is false then the statement in the else block will be used instead"
          ],
          image: "/HokieBirdMaze.png",
        },
        {
          content: ["Lets try moving the Hokie Bird forward!",
            "The Statements are in red and conditions are in blue",
            "When you are ready to test, click the Run button"
          ],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze1.png",
            pageNum: 2,
            bookID: 3,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work! Now we need to turn the hokieBird", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze2.png",
            pageNum: 3,
            bookID: 3,
            ans: {
              condition: "canHokieBirdTurnRight()",
              statement: "hokieBird.turnRight()"
            }
          }
        },
        {
          content: ["Nicely done! Keep Going!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze3.png",
            pageNum: 4,
            bookID: 3,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work! Now we need to turn the HokieBird", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze4.png",
            pageNum: 5,
            bookID: 3,
            ans: {
              condition: "canHokieBirdTurnLeft()",
              statement: "hokieBird.turnLeft()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze5.png",
            pageNum: 6,
            bookID: 3,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze6.png",
            pageNum: 7,
            bookID: 3,
            ans: {
              condition: "canHokieBirdTurnLeft()",
              statement: "hokieBird.turnLeft()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze7.png",
            pageNum: 8,
            bookID: 3,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze8.png",
            pageNum: 9,
            bookID: 3,
            ans: {
              condition: "canHokieBirdTurnRight()",
              statement: "hokieBird.turnRight()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze9.png",
            pageNum: 10,
            bookID: 3,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze10.png",
            pageNum: 11,
            bookID: 3,
            ans: {
              condition: "canHokieBirdTurnRight()",
              statement: "hokieBird.turnRight()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze11.png",
            pageNum: 12,
            bookID: 3,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze12.png",
            pageNum: 13,
            bookID: 3,
            ans: {
              condition: "canHokieBirdTurnLeft()",
              statement: "hokieBird.turnLeft()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: true,
            image: "Maze13.png",
            pageNum: 14,
            bookID: 3,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Awesome, the Hokie Bird made it to Lane Stadium"],
          image: "HokieBirdMazeActivity",
          props: {
            draggable: false,
            image: "Maze14.png",
            pageNum: 15,
            bookID: 3,
            finished: true
          }
        },
      ]
    },
    {
      BookId: 4,
      title: "If-condition and For-loop with HokieBird Maze Code Completion",
      blurb: "some blurb",
      author: "Dev",
      pages: [
        {
          content: ["The game is about to start, and HokieBird is very worried when he got lost. ",
            "We will use If conditions to help the Hokie bird make it to Lane Stadium",
            "If Conditions have two outcomes, they are either true or false",
            "If a value is true the 'code' that immediatley follows is taken.",
            "If the value is false then the 'code' that follows is ignored",
            "For the next few examples we will use the commands hokieBird.move() to move the bird forward",
            "To make the Hokiebird turn right or left we will use hokeBird.turnRight() or hokieBird.turnLeft()"
          ],
          image: "/HokieBirdMaze.png",
        },
        {
          content: ["Since we now know how to move the hokeiBird around, we need to determine what actions we should do.",
            "This is where the If statement comes in, we know that if there is a square infront of the bird then we can move",
            "We also know that if the road turns right or left we can move the hokie bird",
            "We will check multiple conditions",
            "The first condition will be hokieBirdCanMove(), this is used to move the bird forward",
            "Turning left and right is similar with the functions canHokieBirdTurnLeft() and canHokieBirdTurnRight()",
            "Placing any of these commands in the if statement will either make it true or false",
            "If the condition is false then the statement in the else block will be used instead"
          ],
          image: "/HokieBirdMaze.png",
        },
        {
          content: ["Lets try moving the Hokie Bird forward!",
            "The Statements are in red and conditions are in blue",
            "When you are ready to test, click the Run button"
          ],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze1.png",
            pageNum: 2,
            bookID: 4,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work! Now we need to turn the hokieBird", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze2.png",
            pageNum: 3,
            bookID: 4,
            ans: {
              condition: "canHokieBirdTurnRight()",
              statement: "hokieBird.turnRight()"
            }
          }
        },
        {
          content: ["Nicely done! Keep Going!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze3.png",
            pageNum: 4,
            bookID: 4,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work! Now we need to turn the HokieBird", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze4.png",
            pageNum: 5,
            bookID: 4,
            ans: {
              condition: "canHokieBirdTurnLeft()",
              statement: "hokieBird.turnLeft()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze5.png",
            pageNum: 6,
            bookID: 4,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze6.png",
            pageNum: 7,
            bookID: 4,
            ans: {
              condition: "canHokieBirdTurnLeft()",
              statement: "hokieBird.turnLeft()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze7.png",
            pageNum: 8,
            bookID: 4,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze8.png",
            pageNum: 9,
            bookID: 4,
            ans: {
              condition: "canHokieBirdTurnRight()",
              statement: "hokieBird.turnRight()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze9.png",
            pageNum: 10,
            bookID: 4,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze10.png",
            pageNum: 11,
            bookID: 4,
            ans: {
              condition: "canHokieBirdTurnRight()",
              statement: "hokieBird.turnRight()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze11.png",
            pageNum: 12,
            bookID: 4,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze12.png",
            pageNum: 13,
            bookID: 4,
            ans: {
              condition: "canHokieBirdTurnLeft()",
              statement: "hokieBird.turnLeft()"
            }
          }
        },
        {
          content: ["Good Work!", "The Statements are in red and conditions are in blue"],
          image: "HokieBirdMazeActivity",
          props: {
            type: true,
            image: "Maze13.png",
            pageNum: 14,
            bookID: 4,
            ans: {
              condition: "hokieBirdCanMove()",
              statement: "hokieBird.move()"
            }
          }
        },
        {
          content: ["Awesome, the Hokie Bird made it to Lane Stadium"],
          image: "HokieBirdMazeActivity",
          props: {
            type: false,
            image: "Maze14.png",
            pageNum: 15,
            bookID: 4,
            finished: true
          }
        }
      ]
    },
    {
      BookId: 4,
      title: "If-condition and For-loop with HokieBird Maze",
      blurb: "some blurb",
      author: "Dev",
      pages: [
        {
          content: ["Come to Hand-in-Hand Park in Blacksburg, Virginia.",
            "You'll find swings to play on, make new friends, and enjoy the shade of big trees.",
            "It's a fun and friendly place for everyone.",
            "Take a break from the hustle and bustle and unwind in this peaceful oasis."],
          image: "/io_book/park.png",
        },
        {
          content: ["Welcome to Hand-in-Hand Park!",
            "This is a place where you can play with your friends and have fun.",
            "You can also learn about the different types of trees that grow here.",
            "Let's get started!"],
          image: "/io_book/intro.png"


        },
      ]
    }
  ] as Book[]

  const bookNum = parseInt(params.id) - 1
  const pageNum = parseInt(params.pagenum)
  const page = books[bookNum].pages[pageNum]

  function getNextPageNum() {
    return pageNum + 1 > books[bookNum].pages.length - 1 ? pageNum : pageNum + 1;
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

  return (
    <div className="md:px-48 py-2 h-[calc(100vh-9rem)] flex">
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
          <div className="flex flex-grow flex-col items-center justify-center bg-gray-100 rounded-2xl">
            <div className="flex flex-col justify-between flex-grow w-full">
              <div className="flex flex-col flex-grow items-center justify-center">
                <BookContent content={page.content} game={page.game} />
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
  )
}
