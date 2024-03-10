import { useParams, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { books } from "../util/books";
import { Page } from "../util/BookData";
import Navbar from "../components/Navbar";
import { Reader } from "../components/Reader";
import { ColorPattern } from "../components/ColorPattern";
import NumericalPattern from "../components/NumericalPatter";
import { CodeComplete } from "../components/CodeComplete";
import { HokieBirdColoring } from "../components/HokieBirdColor";
import { HokieBirdMap } from "../components/HokieBirdMap";
import { HokieBirdIfCondition } from "../components/HokieBirdIfCondition";
import { PythonTutor } from "../components/PythonTutor";
import { DataTypesIntro } from "../components/MisconceptionComponents/DataTypesIntro";
import { IntsAndBools } from "../components/MisconceptionComponents/IntsAndBools";
import { VariableAssignment } from "../components/MisconceptionComponents/VariableAssignment";
import { Strings } from "../components/MisconceptionComponents/Strings";
import { Sequencing } from "../components/MisconceptionComponents/Sequencing";
import { IfStatementIntro } from "../components/MisconceptionComponents/IfStatementIntro";
import { ConditionalOperators } from "../components/MisconceptionComponents/ConditionalOperators";
import { LogicalOperators } from "../components/MisconceptionComponents/LogicalOperators";
import { IfStatements } from "../components/MisconceptionComponents/IfStatements";
import { LifeOfMoose } from "../components/MisconceptionComponents/LifeOfMoose/LifeOfMoose";
import { MooseMilestone } from "../components/MisconceptionComponents/LifeOfMoose/MooseMilestone";
import { MooseDr } from "../components/MisconceptionComponents/LifeOfMoose/MooseDr";
import { MooseChallengingYear } from "../components/MisconceptionComponents/LifeOfMoose/MooseChallengingYear";
import { MooseThankYou } from "../components/MisconceptionComponents/LifeOfMoose/MooseThankYou";
import { BuyDonut } from "../components/MisconceptionComponents/FlowchartsBook/BuyDonut";
import { BuyMultiple } from "../components/MisconceptionComponents/FlowchartsBook/BuyMultiple";
import { MultipleConditions } from "../components/MisconceptionComponents/FlowchartsBook/MultipleConditions";
import { ChangingCondition } from "../components/MisconceptionComponents/FlowchartsBook/ChangingCondition";
import { InputActivity } from "../components/InputActivity";
import { TableComponent } from "../components/TableComponent";
import { FoodTruckActivity } from "../components/FoodTruckActivity";
import { InteractionType, InteractionsService } from "../api";
import { useAuth } from "../context/AuthContext";
import { useSound } from "use-sound";
import { SelectImageActivity } from "../components/SelectImage";

function BookImage({
  image,
  page,
  setAllowNext,
}: {
  image: string;
  page: Page;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const isImage = image && image.includes(".");

  return (
    <div className="h-[calc(100vh-9rem)] xl:h-[calc(100vh-13rem)] overflow-y-scroll flex flex-col items-center w-full">
      {isImage && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <img
            src={image}
            alt="book"
            width={600}
            height={600}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      )}
      {image === "HokieBirdActivity" && (
        <HokieBirdColoring props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "tutor" && <PythonTutor props={page?.props} />}
      {image === "HokieBirdMazeActivity" && (
        <HokieBirdMap props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "HokieBirdIfConditionActivity" && (
        <HokieBirdIfCondition props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "DataTypesIntro" && <DataTypesIntro />}
      {image === "IntsAndBools" && (
        <IntsAndBools props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "VariableAssignment" && (
        <VariableAssignment props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "Strings" && (
        <Strings props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "Sequencing" && <Sequencing setAllowNext={setAllowNext} />}
      {image === "IfStatementIntro" && <IfStatementIntro />}
      {image === "ConditionalOperators" && (
        <ConditionalOperators props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "LogicalOperators" && (
        <LogicalOperators props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "IfStatements" && (
        <IfStatements props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "LifeOfMoose" && (
        <LifeOfMoose props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseMilestone" && (
        <MooseMilestone props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseDr" && (
        <MooseDr props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseChallengingYear" && (
        <MooseChallengingYear props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "MooseThankYou" && <MooseThankYou />}
      {image === "BuyDonut" && <BuyDonut setAllowNext={setAllowNext} />}
      {image === "BuyMultiple" && (
        <BuyMultiple props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "MultipleConditions" && (
        <MultipleConditions props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "ChangingCondition" && (
        <ChangingCondition props={page.props} setAllowNext={setAllowNext} />
      )}
      {image === "InputActivity" && (
        <InputActivity props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "FoodTruckActivity" && (
        <FoodTruckActivity props={page?.props} setAllowNext={setAllowNext} />
      )}
      {image === "SelectImageActivity" && (
        <SelectImageActivity props={page?.props} setAllowNext={setAllowNext} />
      )}
    </div>
  );
}

function BookContent({
  content,
  game,
  props,
  setAllowNext,
}: {
  content: string[];
  game: string | undefined;
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const isImage = game && game.includes(".");
  return (
    <div className="h-[calc(100vh-9rem)] xl:h-[calc(100vh-13rem)] overflow-y-scroll flex flex-col justify-center gap-1 items-center w-full">
      <ul className="flex flex-col justify-center py-2 md:space-y-1 xl:space-y-4">
        {content.map((line, i) => (
          <li key={i}>
            <Reader text={line} />
          </li>
        ))}
      </ul>
      {game && game === "color" && <ColorPattern />}
      {game && game === "number" && (
        <NumericalPattern pattern={props.pattern} answer={props.ans[0]} />
      )}
      {game && game === "code" && (
        <CodeComplete
          beforeCode="if ("
          afterCode=") brushTeeth()"
          answer="teethDirty"
          choices={["eating", "teethDirty", "playing"]}
        />
      )}
      {game && game === "TableComponent" && (
        <TableComponent cellContents={props.cellContents} />
      )}

      {isImage && <img src={game} alt="book" width={600} height={600} />}
    </div>
  );
}

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
      className={`fixed top-0 left-0 right-0 z-50 ${
        help ? "" : "hidden"
      } w-full h-full bg-gray-900 bg-opacity-50`}
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
            ></img>
          )}
          <div className="flex justify-end p-5 border-t rounded-b">
            <button
              onClick={() => closeHelp()}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center mr-2"
            >
              Close help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  let { idString, pagenumString } = useParams();
  const id = parseInt(idString as string);
  const [playPageFlip] = useSound("/sounds/page-flip.mp3", { volume: 0.5 });
  const [playLowClick] = useSound("/sounds/low-click.mp3", { volume: 0.5 });
  const pagenum = parseInt(pagenumString as string);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [help, setHelp] = useState(false);
  const [allowNext, setAllowNext] = useState(true);
  const startTime = new Date().getTime();

  const bookNum = id - 1;
  const pageNum = pagenum;
  const book = books.find((book) => book.BookId === bookNum + 1);

  useEffect(() => {
    playPageFlip();
  }, [playPageFlip]);

  if (!book) {
    return (
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-center text-lg font-medium">
          We could not find anything for this book.
        </h1>
      </div>
    );
  }

  const page = book.pages[pageNum];

  function getNextPageNum(): number | null {
    return book && pageNum + 1 > book.pages.length - 1 ? null : pageNum + 1;
  }

  function getPrevPageNum(): number | null {
    return pageNum - 1 < 0 ? null : pageNum - 1;
  }

  function moveToNextPage() {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.NEXT_PAGE,
      time_since_load: timeSpent,
      user_id: user?.id,
    }).then(() => {
      navigate(`/book/${id}/${getNextPageNum()}`);
      navigate(0); // forces react to do a rerender when going from pages with same paths with different params and same component tree
    });
  }

  function moveToPrevPage() {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.PREV_PAGE,
      time_since_load: timeSpent,
      user_id: user?.id,
    }).then(() => {
      navigate(`/book/${id}/${getPrevPageNum()}`);
      navigate(0); // forces react to do a rerender when going from pages with same paths with different params and same component tree
    });
  }

  function helpMeClicked() {
    playLowClick();
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    InteractionsService.createInteractionInteractionsPost({
      interaction_type: InteractionType.HELP_ME,
      time_since_load: timeSpent,
      user_id: user?.id,
    }).then(() => {
      console.log("interaction created");
      setHelp(!help);
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
        <button className="bg-blue-500 hover:bg-hover-blue hover:shadow-2xl text-white font-bold p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full">
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
        <button className="bg-blue-500 hover:bg-hover-blue hover:shadow-2xl text-white font-bold p-1 xl:px-4 xl:py-4 lg:text-lg xl:text-2xl rounded-full">
          Home
        </button>
      </a>
    );

  const helpMeButton = (
    <button
      onClick={() => helpMeClicked()}
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
          {page && (
            <div className="flex flex-col w-full min-h-full justify-between gap-1">
              {(page?.props?.ans?.length || page?.props?.helpImage) && (
                <HelpMeWindow
                  help={help}
                  setHelp={setHelp}
                  page={page}
                  playLowClick={playLowClick}
                />
              )}
              <div className="flex flex-row justify-between bg-primary-green shadow-xl p-1 gap-1 rounded-2xl min-h-max flex-grow">
                <div className="flex flex-col flex-grow items-center bg-white rounded-l-2xl h-full">
                  <div className="flex flex-col flex-grow items-center justify-center w-full">
                    <BookImage
                      image={page.image}
                      page={page}
                      setAllowNext={setAllowNext}
                    />
                  </div>
                </div>
                {page.content && page.content.length > 0 && (
                  <div className="flex flex-col w-1/3 items-center justify-between bg-gray-100 rounded-r-2xl">
                    <div className="flex flex-col items-center justify-center p-1">
                      <BookContent
                        content={page.content}
                        game={page.game}
                        props={page.props}
                        setAllowNext={setAllowNext}
                      />
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
          )}
          {!page && (
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
