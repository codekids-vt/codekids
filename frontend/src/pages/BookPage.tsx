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
import { useTheme } from "../context/ThemeContext";

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

// HelpMeWindow component
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
};

// HintsWindow component that shows hints.
// export function HintsWindow({
//   open,
//   setOpen,
//   allHints,
//   currentHintIndex,
//   updateCurrentHintIndex,
//   page,
//   showFullAnswer,
//   setShowFullAnswer,
// }: {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   allHints: HintData[]; // Now an array of hints
//   currentHintIndex: number;
//   updateCurrentHintIndex: (index: number) => void;
//   page: Page;
//   showFullAnswer: boolean;
//   setShowFullAnswer: Dispatch<SetStateAction<boolean>>;
// }) {
//   if (!open) return null;

//   const currentHint = allHints[currentHintIndex] || {
//     statement: "Generating hints....",
//   };

//   return (
//     <div className="fixed bottom-4 right-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-xl rounded-lg border border-gray-300 p-4">
//       <div className="w-full">
//         <div className="flex items-center justify-between border-b pb-3 mb-4">
//           {/* Back button if showing full answer */}
//           {showFullAnswer ? (
//             <button
//               onClick={() => setShowFullAnswer(false)}
//               type="button"
//               className="text-gray-600 hover:text-gray-800 flex items-center"
//             >
//               <svg
//                 className="w-5 h-5 mr-2"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               Back
//             </button>
//           ) : (
//             <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
//               Hints
//             </h3>
//           )}

//           {/* Close button */}
//           <button
//             onClick={() => {
//               setOpen(false);
//               setShowFullAnswer(false);
//             }}
//             type="button"
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//             <span className="sr-only">Close</span>
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {!showFullAnswer ? (
//             //  hints view
//             <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
//               <Reader text={currentHint.statement} />
//             </div>
//           ) : (
//             // Full answer view
//             <>
//               <ul className="flex flex-col items-center">
//                 <h3 className="text-xl font-medium mb-2">
//                   The correct answer(s) is:
//                 </h3>
//                 {page.props?.ans &&
//                   page.props?.ans.map((answer: string, index: number) => (
//                     <li
//                       className="inline-block font-semibold text-gray-900"
//                       key={`answerTag-${index}`}
//                     >
//                       {answer}
//                     </li>
//                   ))}
//               </ul>
//               {page.props.helpImage && (
//                 <img
//                   src={page.props.helpImage}
//                   alt="Help"
//                   width={750}
//                   height={250}
//                   className="mt-4"
//                 />
//               )}
//             </>
//           )}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="relative min-h-[60px] border-t pt-4 flex justify-between items-center px-4">
//           {/* Show Previous only if not at the first hint */}
//           {currentHintIndex > 0 && !showFullAnswer && (
//             <button
//               onClick={() => updateCurrentHintIndex(currentHintIndex - 1)}
//               type="button"
//               className="bg-primary-green hover:bg-hover-green text-white font-bold px-4 py-2 rounded text-sm"
//             >
//               ← Previous
//             </button>
//           )}

//           {currentHintIndex === 0 && <div className="w-24" />}

//           {/* Show Next only if not in full answer */}
//           {!showFullAnswer && (
//             <button
//               onClick={() => updateCurrentHintIndex(currentHintIndex + 1)}
//               type="button"
//               className="bg-primary-green hover:bg-hover-green text-white font-bold px-4 py-2 rounded text-sm"
//             >
//               Next →
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export function HintsWindow({
//   open,
//   setOpen,
//   allHints,
//   currentHintIndex,
//   updateCurrentHintIndex,
//   page,
//   showFullAnswer,
//   setShowFullAnswer,
// }: {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   allHints: HintData[];
//   currentHintIndex: number;
//   updateCurrentHintIndex: (index: number) => void;
//   page: Page;
//   showFullAnswer: boolean;
//   setShowFullAnswer: Dispatch<SetStateAction<boolean>>;
// }) {
//   if (!open) return null;

//   const currentHint = allHints[currentHintIndex] || {
//     statement: "Generating hints....",
//   };

//   return (
//     <div
//       className="
//         fixed bottom-3 right-3 z-[9999]
//         w-[60%] sm:w-[320px] md:w-[400px] lg:w-[460px]
//         max-h-[55vh] sm:max-h-[60vh]
//       "
//     >
//       <div className="bg-white shadow-2xl border border-gray-300 rounded-xl flex flex-col overflow-hidden h-full">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b pb-2 px-3 pt-2">
//           {showFullAnswer ? (
//             <button
//               onClick={() => setShowFullAnswer(false)}
//               type="button"
//               className="text-gray-600 hover:text-gray-800 flex items-center text-xs sm:text-sm"
//             >
//               <svg
//                 className="w-4 h-4 mr-1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               Back
//             </button>
//           ) : (
//             <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
//               Hints
//             </h3>
//           )}

//           {/* Close button (unchanged) */}
//           <button
//             onClick={() => {
//               setOpen(false);
//               setShowFullAnswer(false);
//             }}
//             type="button"
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//             <span className="sr-only">Close</span>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto px-3 py-2 text-gray-800">
//           {!showFullAnswer ? (
//             <div className="text-xs sm:text-sm md:text-base leading-relaxed">
//               <Reader text={currentHint.statement} />
//             </div>
//           ) : (
//             <>
//               <ul className="flex flex-col items-center">
//                 <h3 className="text-sm sm:text-base font-medium mb-2">
//                   The correct answer(s) is:
//                 </h3>
//                 {page.props?.ans &&
//                   page.props?.ans.map((answer: string, index: number) => (
//                     <li
//                       className="inline-block font-semibold text-gray-900 text-xs sm:text-sm"
//                       key={`answerTag-${index}`}
//                     >
//                       {answer}
//                     </li>
//                   ))}
//               </ul>
//               {page.props.helpImage && (
//                 <img
//                   src={page.props.helpImage}
//                   alt="Help"
//                   className="rounded-md w-full h-auto max-h-[35vh] object-contain mt-2"
//                 />
//               )}
//             </>
//           )}
//         </div>

//         {/* Navigation Buttons (kept exactly as before) */}
//         <div className="border-t pt-2 flex justify-between items-center px-3 pb-2">
//           {currentHintIndex > 0 && !showFullAnswer && (
//             <button
//               onClick={() => updateCurrentHintIndex(currentHintIndex - 1)}
//               type="button"
//               className="bg-primary-green hover:bg-hover-green text-white font-bold px-3 py-1 rounded text-xs sm:text-sm"
//             >
//               ← Previous
//             </button>
//           )}

//           {currentHintIndex === 0 && <div className="w-16" />}

//           {!showFullAnswer && (
//             <button
//               onClick={() => updateCurrentHintIndex(currentHintIndex + 1)}
//               type="button"
//               className="bg-primary-green hover:bg-hover-green text-white font-bold px-3 py-1 rounded text-xs sm:text-sm"
//             >
//               Next →
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
export function HintsWindow({
  open,
  setOpen,
  allHints,
  currentHintIndex,
  updateCurrentHintIndex,
  page,
  showFullAnswer,
  setShowFullAnswer,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  allHints: HintData[];
  currentHintIndex: number;
  updateCurrentHintIndex: (index: number) => void;
  page: Page;
  showFullAnswer: boolean;
  setShowFullAnswer: Dispatch<SetStateAction<boolean>>;
}) {
  if (!open) return null;

  const currentHint = allHints[currentHintIndex] || {
    statement: "Generating hints...",
  };

  return (
    <div
      className="
    fixed inset-x-4 bottom-4 sm:inset-auto sm:bottom-3 sm:right-3
    z-[9999]
    w-auto sm:w-[320px] md:w-[400px] lg:w-[460px]
    max-w-[90vw] max-h-[75vh]
    flex justify-center sm:justify-end
  "
    >
      <div className="bg-white shadow-2xl border border-gray-300 rounded-xl flex flex-col h-full overflow-hidden max-h-[75vh] sm:max-h-[70vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 px-3 pt-2 bg-gray-50">
          {showFullAnswer ? (
            <button
              onClick={() => setShowFullAnswer(false)}
              type="button"
              className="text-gray-600 hover:text-gray-800 flex items-center text-xs sm:text-sm"
            >
              <svg
                className="w-4 h-4 mr-1"
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
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              Hints
            </h3>
          )}

          {/* Close Button (unchanged) */}
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

        {/* Scrollable Body */}
        <div
          className={`
    flex-1 overflow-y-auto text-gray-800
    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
    ${
      showFullAnswer
        ? "px-3 py-3" // normal padding for full answer
        : "px-4 py-6 sm:py-8"
    }      // more top/bottom padding for hints
  `}
        >
          {!showFullAnswer ? (
            <div className="text-xs sm:text-sm md:text-base leading-relaxed">
              <Reader text={currentHint.statement} />
            </div>
          ) : (
            <>
              <ul className="flex flex-col items-center">
                <h3 className="text-sm sm:text-base font-medium mb-2">
                  The correct answer(s) is:
                </h3>
                {page.props?.ans &&
                  page.props?.ans.map((answer: string, index: number) => (
                    <li
                      className="inline-block font-semibold text-gray-900 text-xs sm:text-sm"
                      key={`answerTag-${index}`}
                    >
                      {answer}
                    </li>
                  ))}
              </ul>

              {/* Responsive, contained image */}
              {page.props.helpImage && (
                <div className="flex justify-center mt-3">
                  <img
                    src={page.props.helpImage}
                    alt="Help"
                    className="
                      rounded-md
                      w-full sm:w-[90%]
                      h-auto
                      max-h-[40vh]
                      object-contain
                    "
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer (kept same as before) */}
        <div className="border-t pt-2 flex justify-between items-center px-3 pb-2 bg-gray-50">
          {currentHintIndex > 0 && !showFullAnswer && (
            <button
              onClick={() => updateCurrentHintIndex(currentHintIndex - 1)}
              type="button"
              className="bg-primary-green hover:bg-hover-green text-white font-bold px-3 py-1 rounded text-xs sm:text-sm"
            >
              ← Previous
            </button>
          )}

          {currentHintIndex === 0 && <div className="w-16" />}

          {!showFullAnswer && (
            <button
              onClick={() => updateCurrentHintIndex(currentHintIndex + 1)}
              type="button"
              className="bg-primary-green hover:bg-hover-green text-white font-bold px-3 py-1 rounded text-xs sm:text-sm"
            >
              Next →
            </button>
          )}
        </div>
      </div>
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
  const [allHints, setAllHints] = useState([]); // Stores all hints from API
  const [currentHintIndex, setCurrentHintIndex] = useState(0); // Tracks current hint
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const [hintsLoading, setHintsLoading] = useState(false);
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [pageNum, setPageNum] = useState(
    pageNumParam ? parseInt(pageNumParam) : 1,
  );
  const startTime = new Date().getTime();
  const navigate = useNavigate();
  const { unsavedToggleDarkMode } = useTheme();

  useEffect(() => {
    unsavedToggleDarkMode(false);
    BooksService.getBookBooksBookIdGet(id)
      .then((response) => {
        setBook(response);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      unsavedToggleDarkMode(undefined);
    };
  }, [id, unsavedToggleDarkMode]);

  useEffect(() => {
    playPageFlip();
    navigate(`/book/${idString}/${pageNum}`);
    setPageNum(pageNum);
  }, [playPageFlip, pageNum, idString, navigate]);

  useEffect(() => {
    const currentPage = book?.pages?.find((p) => p.pageNumber === pageNum);

    if (currentPage) {
      setHintsOpen(false);
      setShowFullAnswer(false);
      setCurrentHintIndex(0);
      setAllHints([]);
    }
  }, [pageNum, book]);

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
    if (!book || !book.pages) return null;

    const maxPageNum = Math.max(...book.pages.map((p) => p.pageNumber));
    return pageNum < maxPageNum ? pageNum + 1 : null;
  }

  function getPrevPageNum(): number | null {
    return pageNum <= 1 ? null : pageNum - 1;
  }

  function getAllHints() {
    if (!page?.content) {
      console.warn("No page content available to generate hints.");
      return;
    }
    console.log("In getall hints");
    console.log(page?.props);

    // Clear previous hints immediately
    setAllHints([]);
    setCurrentHintIndex(0);
    setShowFullAnswer(false);
    setHintsLoading(true);
    PagesService.createPageWithGptPageCreatehintsPost(id, pageNum)
      .then((data) => {
        if (data?.props) {
          let props;
          try {
            // Convert string to JSON object if necessary
            props =
              typeof data.props === "string"
                ? JSON.parse(data.props)
                : data.props;
          } catch (error) {
            console.error("Error parsing props JSON:", error);
            return;
          }

          if (Array.isArray(props?.gptHints)) {
            const formattedHints = props.gptHints.map((hint: any) => ({
              statement: hint.statement,
            }));

            setAllHints(formattedHints);
            setCurrentHintIndex(0); // ensure reset
            console.log("Formatted Hints:", formattedHints); // Debugging output
          } else {
            console.warn("No hints returned from API.");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching hints:", error);
      })
      .finally(() => {
        setHintsLoading(false); // Set loading to false here
      });
  }

  function updateCurrentHintIndex(index: number) {
    if (index >= allHints.length) {
      setShowFullAnswer(true); // displays the entire answer
      return;
    }
    setCurrentHintIndex(index);
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

  //helpMeClicked to open the HintsWindow
  function helpMeClicked() {
    console.log("In Help Me");
    playLowClick();
    setCurrentHintIndex(0); // Reset index
    setShowFullAnswer(false);
    getAllHints(); // Reset view
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
              {hintsLoading && (
                <div className="fixed bottom-6 right-20 text-sm text-gray-500 animate-pulse">
                  Generating hints...
                </div>
              )}
              <HintsWindow
                open={hintsOpen}
                setOpen={setHintsOpen}
                allHints={allHints} // Array of hints
                currentHintIndex={currentHintIndex}
                updateCurrentHintIndex={updateCurrentHintIndex}
                page={page}
                showFullAnswer={showFullAnswer}
                setShowFullAnswer={setShowFullAnswer}
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
                  {(page?.props?.ans?.length || page?.props?.helpImage) &&
                    helpMeButton}
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
