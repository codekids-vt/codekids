import { useParams, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Reader } from "../components/Reader";
import {
  Book,
  BooksService,
  InteractionType,
  InteractionsService,
  Page,
  PagesService,
} from "../api";
import { useAuth } from "../context/AuthContext";
import { useSound } from "use-sound";
import { BookImage } from "../components/BookImage";

// Component to display the book content.
function BookContent({ content }: { content: string[] }) {
  return (
    <div className="h-[calc(100vh-9rem)] xl:h-[calc(100vh-13rem)] overflow-y-scroll flex flex-col justify-center gap-1 items-center w-full">
      <ul className="flex flex-col justify-center py-2 md:space-y-1 xl:space-y-4">
        {content.map((line, i) => (
          <li key={i}>
            <Reader text={line} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Existing HelpMeWindow component (if you still need it)
function HelpMeWindow({
  help,
  setHelp,
  page,
  playLowClick,
}: {
  help: boolean;
  setHelp: Dispatch<SetStateAction<boolean>>;
  page: Page;
  playLowClick: () => void;
}) {
  function closeHelp() {
    playLowClick();
    setHelp(!help);
  }
  return (
    <div
      id="help-modal"
      className={`fixed top-0 left-0 right-0 z-40 ${help ? "" : "hidden"} w-full h-full bg-gray-900 bg-opacity-50`}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-lg w-full md:w-1/2">
          <div className="flex items-center justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-medium text-gray-900">Codekids Help</h3>
            <button
              onClick={() => closeHelp()}
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
                    {answer}
                  </li>
                ))}
            </ul>
          </div>
          {page.props.helpImage && (
            <img
              src={page.props.helpImage}
              alt="Help"
              width={750}
              height={250}
            />
          )}
          <div className="flex justify-end p-5 border-t rounded-b">
            <button
              onClick={() => closeHelp()}
              type="button"
              className="bg-red-600 hover:bg-red-800 text-white font-bold px-4 py-2 rounded"
            >
              Close help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define types for the hints data.
export type HintData = {
  statement: string;
  options: string[]; // ✅ Stores both hints from API
  correctOption?: string; // ✅ Stores the correct answer (optional)
};

export type HintsWindowProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hintData: HintData;
  onNextHint: () => void;
  onHintClick: (hint: "option1" | "option2") => void;
  page: Page;
};


// HintsWindow component that shows a non-editable question and two clickable hints.
export function HintsWindow({
  open,
  setOpen,
  allHints,
  currentHintIndex,
  updateCurrentHintIndex,
  page,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  allHints: HintData[]; // Now an array of hints
  currentHintIndex: number;
  updateCurrentHintIndex: (index: number) => void;
  page: Page;
}) {
  const [showFullAnswer, setShowFullAnswer] = useState(false);

  if (!open) return null;

  const currentHint = allHints[currentHintIndex] || {
    statement: "No hints available",
    option1: "",
    option2: "",
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white shadow-xl rounded-lg border border-gray-300">
      {/* <div className="flex items-center justify-center h-full"> */}
        <div className="bg-white rounded-lg shadow-lg w-96 p-4">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            {/* Back button if showing full answer */}
            {showFullAnswer ? (
              <button
                onClick={() => setShowFullAnswer(false)}
                type="button"
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <svg
                className="w-5 h-5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
                Back
              </button>
            ) : (
              <h3 className="text-2xl font-semibold text-gray-900">Hints</h3>
            )}

            {/* Close button */}
            <button
              onClick={() => {
                setOpen(false);
                setShowFullAnswer(false);
              }}
              type="button"
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
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
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {!showFullAnswer ? (
              // Normal hints view
              <>
                <p className="text-lg text-gray-800">{currentHint.statement}</p>
                {currentHint?.options?.length ? (
                currentHint.options.map((hint, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-700 cursor-pointer block w-fit bg-gray-200 rounded-lg px-4 py-2 shadow-sm hover:bg-blue-200"
                >
                  {hint}
                </p>
                ))
              ) : (
                <p className="text-lg text-gray-500">No hints available.</p> // ✅ Fallback when hints are undefined
              )}
              </>
            ) : (
              // Full answer view
              <>
                <ul className="flex flex-col items-center">
                  <h3 className="text-xl font-medium mb-2">
                    The correct answer(s) is:
                  </h3>
                  {page.props?.ans &&
                    page.props?.ans.map((answer: string, index: number) => (
                      <li
                        className="inline-block font-semibold text-gray-900"
                        key={`answerTag-${index}`}
                      >
                        {answer}
                      </li>
                    ))}
                </ul>
                {page.props.helpImage && (
                  <img
                    src={page.props.helpImage}
                    alt="Help"
                    width={750}
                    height={250}
                    className="mt-4"
                  />
                )}
              </>
            )}
          </div>

          <div className="relative min-h-[80px] border-t pt-4">
            {!showFullAnswer && (
              <>
                {/* Full Answer on the bottom-left */}
                {/* <button
                  onClick={() => setShowFullAnswer(true)}
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded absolute bottom-2 left-2"
                >
                  Full Answer
                </button> */}

<div className="relative min-h-[60px] border-t pt-4 flex justify-between items-center px-4">
  {/* Previous Hint Button - Aligned Left (Green) */}
              <button
                onClick={() => updateCurrentHintIndex(currentHintIndex - 1)}
                type="button"
                className={`font-bold px-4 py-2 rounded text-sm ${
                  currentHintIndex === 0 ? "bg-hover-green cursor-not-allowed" : "bg-primary-green hover:bg-hover-green text-white"
                }`}
                disabled={currentHintIndex === 0} // Disable if at the first hint
              >
                Previous
              </button>

              {/* Next Hint Button - Aligned Right (Green) */}
              <button
                onClick={() => updateCurrentHintIndex(currentHintIndex + 1)}
                type="button"
                className={`font-bold px-4 py-2 rounded text-sm ${
                  currentHintIndex >= allHints.length - 1 ? "bg-hover-green cursor-not-allowed" : "bg-primary-green hover:bg-hover-green text-white"
                }`}
                disabled={currentHintIndex >= allHints.length - 1} // Disable if at the last hint
              >
                Next →
              </button>
            </div>


               
              </>
            )}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}


export default function BookPage() {
  let { idString, pageNumParam } = useParams();
  const id = parseInt(idString as string);
  const [playPageFlip] = useSound("/sounds/page-flip.mp3", { volume: 0.5 });
  const [playLowClick] = useSound("/sounds/low-click.mp3", { volume: 0.5 });
  const { user } = useAuth();
  const [help, setHelp] = useState(false);
  const [allowNext, setAllowNext] = useState(true);
  const [hintsOpen, setHintsOpen] = useState<boolean>(false);
  const [hintData, setHintData] = useState<HintData>({
    statement: "To determine the result of an 'and' operation, it's important that all the individual conditions must be true. If one is false, what will be the result?",
    options: ["True", "False"],  // ✅ Two hints from API
    correctOption: "False"
  });
  const [allHints, setAllHints] = useState([]); // Stores all hints from API
  const [currentHintIndex, setCurrentHintIndex] = useState(0); // Tracks current hint
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [pageNum, setPageNum] = useState(pageNumParam ? parseInt(pageNumParam) : 1);
  const startTime = new Date().getTime();
  const navigate = useNavigate();

  useEffect(() => {
    BooksService.getBookBooksBookIdGet(id)
      .then((response) => {
        setBook(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    playPageFlip();
    navigate(`/book/${idString}/${pageNum}`);
    setPageNum(pageNum);
  }, [playPageFlip, pageNum, idString, navigate]);

  if (!book || !book.pages) {
    return (
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-center text-lg font-medium">
          We could not find anything for this book.
        </h1>
      </div>
    );
  }

  const page = book.pages.find((p) => p.pageNumber === pageNum);

  function getNextPageNum(): number | null {
    return book && book.pages && pageNum > book.pages.length - 1 ? null : pageNum + 1;
  }

  function getPrevPageNum(): number | null {
    return pageNum <= 1 ? null : pageNum - 1;
  }

  // function getAllHints() {
  //   console.log("getallhints bantu")
  //   PagesService.pageCreateHints(id, pageNum, page?.content || [], page?.props || {})
  //     .then((data) => {
  //       if (data?.props?.gptHints) {
  //         setAllHints(data.props.gptHints);
  //       } else {
  //         console.warn("No hints returned from API.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching hints:", error);
  //     });
  // }

  function getAllHints() {
    if (!page?.content) {
      console.warn("No page content available to generate hints.");
      return;
    }
    console.log("In getall hints")
    // console.log(page.content)
    // console.log(id)
    // console.log(pageNum)
    // console.log(page.questions)
    // console.log(page.props?.answer)
    // console.log(page.props?.options)
  
    PagesService.createPageWithGptPageCreatehintsPost(id,pageNum)
      .then((data) => {
 
        if (data?.props?.gptHints) {
          const formattedHints = data.props.gptHints.map((hint: any) => ({
            statement: hint.statement,
            options: hint.hints,  //  Store options correctly
            correctOption: hint.correctOption || null,  // Store correct answer
          }));
          setAllHints(formattedHints);
          console.log("Formatted Hints:", formattedHints); // Debugging output
        } else {
          console.warn("No hints returned from API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching hints:", error);
      });
      
  }

  function updateCurrentHintIndex(index: number) {
    setCurrentHintIndex((prevIndex) =>
      index >= 0 && index < allHints.length ? index : prevIndex
    );
  }
  function moveToNextPage() {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.NEXT_PAGE,
      time_since_load: timeSpent,
      user_id: user?.id,
      bookId: id,
      pageId: pageNum,
    }).then(() => {
      setPageNum(pageNum + 1);
    });

  }

  function moveToPrevPage() {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.PREV_PAGE,
      time_since_load: timeSpent,
      user_id: user?.id,
      bookId: id,
      pageId: pageNum,
    }).then(() => {
      setAllowNext(true);
      setPageNum(pageNum - 1);
    });
  }

  function homeClicked() {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.PREV_PAGE,
      time_since_load: timeSpent,
      user_id: user?.id,
      bookId: id,
      pageId: pageNum,
    });
  }

  // Modified helpMeClicked to open the HintsWindow
  function helpMeClicked() {
    console.log("helpme bantu")
    playLowClick();
    getAllHints();
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.HELP_ME,
      time_since_load: timeSpent,
      user_id: user?.id,
      bookId: id,
      pageId: pageNum,
    }).then(() => {
      setHintsOpen(true);
    });
  }

  // Callback when a hint is clicked
  function handleHintClick(hint: "hint1" | "hint2") {
    console.log(`${hint} clicked`);
    // Add additional logic here if needed.
  }

  // Callback when "Next Hint" is clicked.
  function handleNextHint() {
    console.log("Next Hint clicked");
    // Here you could call an API to fetch new hint data.
    // For demonstration, we'll update the hints with new static data.
    setHintData({
      statement: "To determine the result of an 'and' operation, it's important that all the individual conditions must be true. If one is false, what will be the result?",
      options: ["True", "False"],  // ✅ Two hints from API
      correctOption: "False"
    });
  }

  const forwardButton =
    getNextPageNum() !== null ? (
      <button
        onClick={moveToNextPage}
        className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full"
      >
        Next
      </button>
    ) : (
      <a href={`/`}>
        <button
          onClick={() => homeClicked()}
          className="bg-blue-500 hover:bg-hover-blue hover:shadow-2xl text-white font-bold p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full"
        >
          Home
        </button>
      </a>
    );

  const backButton =
    getPrevPageNum() !== null ? (
      <button
        onClick={moveToPrevPage}
        className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full"
      >
        Back
      </button>
    ) : (
      <a href={`/`}>
        <button
          onClick={() => homeClicked()}
          className="bg-blue-500 hover:bg-hover-blue hover:shadow-2xl text-white font-bold p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full"
        >
          Home
        </button>
      </a>
    );

  const helpMeButton = (
    <button
      onClick={helpMeClicked}
      className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold flex flex-row items-center p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full"
    >
      Help me
      <div className="px-2 w-6 xl:w-10">
        <img src={"/help-icon.png"} alt="help icon" width={25} height={25} />
      </div>
    </button>
  );

  return (
    <div className="text-xs xl:text-lg 2xl:text-xl">
      <Navbar />
      <div className="mx-auto h-[calc(100vh-60px)]">
        <div className="px-2 py-2 min-h-full flex">
          {page ? (
            <div className="flex flex-col w-full min-h-full justify-between gap-1">
              {(page?.props?.ans?.length || page?.props?.helpImage) && (
                <HelpMeWindow
                  help={help}
                  setHelp={setHelp}
                  page={page}
                  playLowClick={playLowClick}
                />
              )}

              {/* Render the HintsWindow with the updated props */}
              <HintsWindow
              open={hintsOpen}
              setOpen={setHintsOpen}
              allHints={allHints} // ✅ Correct: Array of hints
              currentHintIndex={currentHintIndex}
              updateCurrentHintIndex={updateCurrentHintIndex}
              page={page}
              />
              <div className="flex flex-row justify-between bg-primary-green shadow-xl p-1 gap-1 rounded-2xl min-h-max flex-grow">
                <div className="flex flex-col flex-grow items-center bg-white rounded-l-2xl h-full">
                  <div className="flex flex-col flex-grow items-center justify-center w-full h-[calc(100vh-9rem)] xl:h-[calc(100vh-13rem)]">
                    <BookImage
                      key={page.pageNumber} // Force re-render when page changes
                      image={page.image}
                      page={page}
                      setAllowNext={setAllowNext}
                    />
                  </div>
                </div>
                {page.content && page.content.length > 0 && (
                  <div className="flex flex-col w-1/3 items-center justify-between bg-gray-100 rounded-r-2xl">
                    <div className="flex flex-col items-center justify-center p-1">
                      <BookContent content={page.content} />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-start items-center p-1 xl:p-2 space-x-2">
                  {backButton}
                  {(page?.props?.ans?.length || page?.props?.helpImage) && helpMeButton}
                </div>
                <div className="flex flex-row items-center">
                  {allowNext && forwardButton}
                  {!allowNext && (
                    <div className="bg-red-400 text-white font-bold p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full">
                      Complete the activity to continue
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-grow items-center justify-center">
              <h1 className="text-center text-lg font-medium">
                We could not find anything for this page.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



