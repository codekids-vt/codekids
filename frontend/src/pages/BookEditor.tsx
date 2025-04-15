import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Book, BookCategory, BooksService, Page, PagesService } from "../api";
import { BookImage } from "../components/BookImage";
import { editorDefaults } from "../util/componentEditorDefaults";
import { ErrorBoundary } from "react-error-boundary";
import { BookPreview } from "../components/ActivityBookList";
import Editor from "@monaco-editor/react";

interface PropsFormProps {
  tempProps: string;
  setTempProps: (newProps: string) => void;
}

interface Option {
  [key: string]: any;
}

function PropsForm({ tempProps, setTempProps }: PropsFormProps) {
  let propsObject: { [key: string]: any } = {};

  try {
    propsObject = JSON.parse(tempProps);
  } catch (e) {
    console.error("Error parsing tempProps JSON:", e);
  }

  // Compute arrays based on the initial propsObject
  const objectArrays = Object.keys(propsObject).filter(
    (key) =>
      Array.isArray(propsObject[key]) &&
      propsObject[key].every((item: any) => typeof item === "object"),
  );

  const primitiveArrays = Object.keys(propsObject).filter(
    (key) =>
      Array.isArray(propsObject[key]) &&
      propsObject[key].every((item: any) => typeof item !== "object"),
  );

  const [objectArrayData, setObjectArrayData] = useState<{
    [key: string]: Option[];
  }>(() => {
    const initialState: { [key: string]: Option[] } = {};
    objectArrays.forEach((key) => {
      initialState[key] = propsObject[key] || [];
    });
    return initialState;
  });

  const [primitiveArrayData, setPrimitiveArrayData] = useState<{
    [key: string]: any[];
  }>(() => {
    const initialState: { [key: string]: any[] } = {};
    primitiveArrays.forEach((key) => {
      initialState[key] = propsObject[key] || [];
    });
    return initialState;
  });

  // Re-calculate arrays inside useEffect so that dependencies are derived from tempProps only.
  useEffect(() => {
    const newProps = JSON.parse(tempProps);
    const newObjectArrays = Object.keys(newProps).filter(
      (key) =>
        Array.isArray(newProps[key]) &&
        newProps[key].every((item: any) => typeof item === "object"),
    );
    const newPrimitiveArrays = Object.keys(newProps).filter(
      (key) =>
        Array.isArray(newProps[key]) &&
        newProps[key].every((item: any) => typeof item !== "object"),
    );

    const updatedObjectArrayState: { [key: string]: Option[] } = {};
    newObjectArrays.forEach((key) => {
      updatedObjectArrayState[key] = newProps[key] || [];
    });
    setObjectArrayData(updatedObjectArrayState);

    const updatedPrimitiveArrayState: { [key: string]: any[] } = {};
    newPrimitiveArrays.forEach((key) => {
      updatedPrimitiveArrayState[key] = newProps[key] || [];
    });
    setPrimitiveArrayData(updatedPrimitiveArrayState);
  }, [tempProps]);

  const handleInputChange = (key: string, value: string) => {
    const updatedProps = { ...propsObject, [key]: value };
    setTempProps(JSON.stringify(updatedProps, null, 2));
  };

  const handleOptionChange = (
    arrayKey: string,
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedArray = [...objectArrayData[arrayKey]];
    const originalValue = updatedArray[index][field];

    let newValue: any = value;
    if (typeof originalValue === "number") newValue = Number(value);
    if (typeof originalValue === "boolean") newValue = value === "true";

    updatedArray[index] = { ...updatedArray[index], [field]: newValue };

    setObjectArrayData({ ...objectArrayData, [arrayKey]: updatedArray });
    setTempProps(
      JSON.stringify({ ...propsObject, [arrayKey]: updatedArray }, null, 2),
    );
  };

  const addNewItemToPrimitiveArray = (arrayKey: string) => {
    const currentArray = primitiveArrayData[arrayKey];
    const newItem = ""; // Default to an empty string (or 0 for numbers)

    const updatedArray = [...currentArray, newItem];
    setPrimitiveArrayData({ ...primitiveArrayData, [arrayKey]: updatedArray });
    setTempProps(
      JSON.stringify({ ...propsObject, [arrayKey]: updatedArray }, null, 2),
    );
  };

  const removeItemFromPrimitiveArray = (arrayKey: string, index: number) => {
    const updatedArray = primitiveArrayData[arrayKey].filter(
      (_, i) => i !== index,
    );
    setPrimitiveArrayData({ ...primitiveArrayData, [arrayKey]: updatedArray });
    setTempProps(
      JSON.stringify({ ...propsObject, [arrayKey]: updatedArray }, null, 2),
    );
  };

  const addNewItem = (arrayKey: string) => {
    const currentArray = objectArrayData[arrayKey];

    const newItem: Record<string, any> = {};

    if (currentArray.length > 0) {
      Object.keys(currentArray[0]).forEach((key) => {
        const existingType = typeof currentArray[0][key];
        if (existingType === "number") {
          newItem[key] = 0; // Default number value
        } else if (existingType === "boolean") {
          newItem[key] = false; // Default boolean value
        } else {
          newItem[key] = ""; // Default string value
        }
      });
    }

    const updatedArray = [...currentArray, newItem as Option];
    setObjectArrayData({ ...objectArrayData, [arrayKey]: updatedArray });
    setTempProps(
      JSON.stringify({ ...propsObject, [arrayKey]: updatedArray }, null, 2),
    );
  };

  const removeItem = (arrayKey: string, index: number) => {
    const updatedArray = objectArrayData[arrayKey].filter(
      (_, i) => i !== index,
    );
    setObjectArrayData({ ...objectArrayData, [arrayKey]: updatedArray });
    setTempProps(
      JSON.stringify({ ...propsObject, [arrayKey]: updatedArray }, null, 2),
    );
  };

  return (
    <div className="p-2">
      <form className="flex flex-col gap-2">
        {Object.keys(propsObject).map((key) => {
          if (!objectArrays.includes(key) && !primitiveArrays.includes(key)) {
            return (
              <div key={key} className="flex flex-col">
                <label className="font-bold" htmlFor={key}>
                  {key}
                </label>
                <input
                  id={key}
                  type="text"
                  value={propsObject[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              </div>
            );
          }
          return null; // Ensure every iteration returns a value
        })}

        {objectArrays.map((arrayKey) => (
          <div key={arrayKey} className="mt-4">
            <h3 className="font-bold">{arrayKey}</h3>
            {(objectArrayData[arrayKey] || []).map((item, index) => (
              <div key={index} className="flex gap-4 mb-2">
                {Object.keys(item).map((field) => {
                  return (
                    <div key={field} className="flex flex-col">
                      <label
                        className="font-bold"
                        htmlFor={`${field}-${index}`}
                      >
                        {field}
                      </label>
                      {typeof item[field] === "boolean" ? (
                        <select
                          id={`${field}-${index}`}
                          value={item[field].toString()}
                          onChange={(e) =>
                            handleOptionChange(
                              arrayKey,
                              index,
                              field,
                              e.target.value,
                            )
                          }
                          className="border border-gray-300 rounded p-1"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      ) : (
                        <input
                          id={`${field}-${index}`}
                          type="text"
                          value={item[field]}
                          onChange={(e) =>
                            handleOptionChange(
                              arrayKey,
                              index,
                              field,
                              e.target.value,
                            )
                          }
                          className="border border-gray-300 rounded p-1"
                        />
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => removeItem(arrayKey, index)}
                  className="bg-red-500 text-white p-1 rounded mt-2 hover:bg-red-600 focus:outline-none"
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "27px",
                    padding: "5px 10px",
                    fontSize: "0.875rem",
                    width: "auto",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addNewItem(arrayKey)}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Add Item
            </button>
          </div>
        ))}

        {primitiveArrays.map((arrayKey) => (
          <div key={arrayKey} className="mt-4">
            <h3 className="font-bold">{arrayKey}</h3>
            {(primitiveArrayData[arrayKey] || []).map((item, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor={`${arrayKey}-${index}`}>
                    Item {index + 1}
                  </label>
                  <input
                    id={`${arrayKey}-${index}`}
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updatedArray = [...primitiveArrayData[arrayKey]];
                      updatedArray[index] = e.target.value;
                      setPrimitiveArrayData({
                        ...primitiveArrayData,
                        [arrayKey]: updatedArray,
                      });
                      setTempProps(
                        JSON.stringify(
                          { ...propsObject, [arrayKey]: updatedArray },
                          null,
                          2,
                        ),
                      );
                    }}
                    className="border border-gray-300 rounded p-1"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeItemFromPrimitiveArray(arrayKey, index)}
                  className="bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "27px",
                    padding: "5px 10px",
                    fontSize: "0.875rem",
                    width: "auto",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addNewItemToPrimitiveArray(arrayKey)}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Add Item
            </button>
          </div>
        ))}
      </form>
    </div>
  );
}

function PageNavigator({
  pages,
  pageNum,
  setPageNum,
  addPage,
  deletePage,
  swapPages,
  bookId,
}: {
  pages: Page[];
  pageNum: number | undefined;
  setPageNum: (pageNum: number) => void;
  addPage: () => void;
  deletePage: (pageId: number) => void;
  swapPages: (pageNum1: number, pageNum2: number) => void;
  bookId: number;
}) {
  return (
    <div className="min-h-full max-h-full overflow-y-scroll w-1/6 bg-gray-200">
      <div className="flex flex-col py-2 gap-2 items-center">
        <a
          key={0}
          className="w-9/12 h-12 border border-primary-green flex flex-col items-center justify-center rounded-xl text-xl hover:bg-primary-green hover:text-white"
          href={`/book/${bookId}/1`}
        >
          Preview Book
        </a>
        <button
          key={0}
          className="w-9/12 h-12 border border-primary-green flex flex-col items-center justify-center rounded-xl text-xl hover:bg-primary-green hover:text-white"
          onClick={() => setPageNum(0)}
        >
          Book Details
        </button>
        {pages.map((page, i) => {
          const isSelected = page.pageNumber === pageNum;
          const selectedTw = "border-primary-green bg-primary-green text-white";
          const unselectedTw = "border-gray-300";
          return (
            <div
              className="flex flex-row w-9/12 h-12 items-center gap-1"
              key={i}
            >
              <button
                key={i}
                className={`w-full h-full border border-primary-green flex flex-col items-center justify-center rounded-xl text-xl hover:shadow-md ${isSelected ? selectedTw : unselectedTw}`}
                onClick={() => setPageNum(page.pageNumber)}
              >
                {page.pageNumber}
              </button>
              <button
                className="flex flex-col items-center justify-center w-8 h-8 bg-red-400 text-white rounded-full"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you wish to delete this page? This action cannot be undone.",
                    )
                  ) {
                    deletePage(page.id);
                  }
                }}
              >
                X
              </button>
              <button
                onClick={() => swapPages(page.pageNumber, page.pageNumber - 1)}
              >
                ↑
              </button>
              <button
                onClick={() => swapPages(page.pageNumber, page.pageNumber + 1)}
              >
                ↓
              </button>
            </div>
          );
        })}
        <button
          className="w-9/12 h-12 border border-primary-green flex flex-col items-center justify-center rounded-xl text-xl hover:bg-primary-green hover:text-white"
          onClick={addPage}
        >
          +
        </button>
      </div>
    </div>
  );
}

function BookContentEditor({
  content,
  setContent,
}: {
  content: string[];
  setContent: (content: string[]) => void;
}) {
  const [tempContents, setTempContents] = useState<string[]>(content);

  useEffect(() => {
    setTempContents(content);
  }, [content]);

  const handleBlur = (index: number, value: string) => {
    const updatedContents = [...tempContents];
    updatedContents[index] = value;
    setTempContents(updatedContents);
    setContent(updatedContents);
  };

  const handleAdd = () => {
    const newContents = [...tempContents, ""];
    setTempContents(newContents);
    setContent(newContents);
  };

  const handleDelete = (index: number) => {
    const newContents = tempContents.filter((_, idx) => idx !== index);
    setTempContents(newContents);
    setContent(newContents);
  };

  const handleMove = (index: number, direction: number) => {
    if (index + direction < 0 || index + direction >= tempContents.length)
      return;
    const itemToMove = tempContents[index];
    const newContents = [...tempContents];
    newContents.splice(index, 1); // Remove the item from its current position
    newContents.splice(index + direction, 0, itemToMove); // Insert it in the new position
    setTempContents(newContents);
    setContent(newContents);
  };

  return (
    <div className="flex flex-col h-full items-center w-full gap-1 justify-start">
      {tempContents.map((item, index) => (
        <div key={index} className="flex items-center gap-1 w-full">
          <textarea
            className="border border-gray-300 rounded-xl p-1 w-full text-sm h-32"
            value={item}
            onChange={(e) => {
              const newTempContents = [...tempContents];
              newTempContents[index] = e.target.value;
              setTempContents(newTempContents);
            }}
            onBlur={(e) => handleBlur(index, e.target.value)}
          />
          <button
            className="w-8 h-8 bg-red-400 text-white rounded-full text-xl"
            onClick={() => handleDelete(index)}
          >
            X
          </button>
          <button onClick={() => handleMove(index, -1)}>↑</button>
          <button onClick={() => handleMove(index, 1)}>↓</button>
        </div>
      ))}
      <button
        className="w-8 h-8 bg-primary-green text-white rounded-full text-xl"
        onClick={handleAdd}
      >
        +
      </button>
    </div>
  );
}

function BookImageEditor({
  page,
  setPage,
  tempImage,
  setTempImage,
  tempProps,
  setTempProps,
}: {
  page: Page;
  setPage: (page: Page) => void;
  tempImage: string;
  setTempImage: React.Dispatch<React.SetStateAction<string>>;
  tempProps: string;
  setTempProps: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [activeTab, setActiveTab] = useState<"prompts" | "json">("prompts");

  // Update the page every 3 seconds if there has been a change
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (
          tempImage !== page.image ||
          JSON.stringify(JSON.parse(tempProps)) !== JSON.stringify(page.props)
        ) {
          setPage({ ...page, image: tempImage, props: JSON.parse(tempProps) });
        }
      } catch (e) {
        console.error(`Error parsing JSON: ${e} may not have saved changes.`);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [tempImage, tempProps, page, setPage]);

  // Make sure tempProps stays in sync with page.props when page changes
  useEffect(() => {
    setTempProps(JSON.stringify(page.props, null, 2));
  }, [page.props, setTempProps]);

  let error = false;
  try {
    JSON.parse(tempProps);
  } catch (e) {
    error = true;
  }
  console.log("error", error);

  return (
    <div className="flex flex-col w-full p-2 h-full">
      <ImageTypeEditor
        tempImageType={tempImage}
        setTempImageType={setTempImage}
        setTempProps={setTempProps}
      />

      {page.image.includes("/") || page.image === "Image" ? (
        <div className="flex flex-col w-full">
          <div>image url or path:</div>
          <input
            className="w-10/12 h-15 border-2 p-2 rounded-xl border-primary-green focus:outline-none"
            value={tempImage}
            onChange={(e) => setTempImage(e.target.value)}
          />
        </div>
      ) : (
        <>
          {/* Tab Navigation */}
          <div className="flex space-x-4 border-b-2 mb-2">
            <button
              className={`p-2 ${
                activeTab === "prompts"
                  ? "border-b-4 border-primary-green font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab("prompts")}
            >
              Prompts
            </button>
            <button
              className={`p-2 ${
                activeTab === "json"
                  ? "border-b-4 border-primary-green font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab("json")}
            >
              JSON
            </button>
          </div>

          {/* Render Based on Active Tab */}
          {activeTab === "prompts" ? (
            <div className="w-full shadow-2xl rounded-xl">
              <PropsForm tempProps={tempProps} setTempProps={setTempProps} />
            </div>
          ) : (
            <Editor
              height="10000px"
              value={tempProps}
              onChange={(value) => value && setTempProps(value)}
              className="w-full shadow-2xl rounded-xl"
              theme="vs-dark"
              language="json"
            />
          )}
        </>
      )}
    </div>
  );
}

function ImageTypeEditor({
  tempImageType,
  setTempImageType,
  setTempProps,
}: {
  tempImageType: string;
  setTempImageType: (tempImageType: string) => void;
  setTempProps: (tempProps: string) => void;
}) {
  // Define the legacy tools that should be hidden for new pages
  const legacyTools = new Set([
    "LifeOfMoose",
    "MooseMilestone",
    "MooseDr",
    "MooseChallengingYear",
    "MooseThankYou",
    "DragAndDrop",
    "HokieBirdMazeActivity",
    "HokieBirdActivity",
    "HokieBirdIfConditionActivity",
    "tutor",
    "CostarColoring",
    "Computer_IO",
    "DataTypesIntro",
    "IntsAndBools",
    "VariableAssignment",
    "Strings",
    "Sequencing",
    "IfStatementIntro",
    "ConditionalOperators",
    "LogicalOperators",
    "IfStatements",
    "BuyDonut",
    "BuyMultiple",
    "MultipleConditions",
    "ChangingCondition",
    "FoodTruckActivity",
    "ClothingActivity",
    "BookRushHour",
    "CodeStepFlowchart",
    "Comparison",
  ]);

  // Filter options: always show non-legacy tools.
  // For legacy tools, only show them if the current tempImageType is already a legacy tool.
  const availableOptions = Object.keys(editorDefaults).filter((tool) => {
    if (legacyTools.has(tool)) {
      // Only include the legacy tool if it's already set on the current page.
      return tool === tempImageType;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      <select
        className="w-full h-15 border-2 p-2 shadow-2xl rounded-xl border-primary-green focus:outline-none"
        value={tempImageType}
        onChange={(e) => {
          if (
            window.confirm(
              "Are you sure you want to change the image type? All edited properties will be lost.",
            )
          ) {
            setTempImageType(e.target.value);
            if (e.target.value === "Image") {
              setTempProps("{}");
            } else {
              setTempProps(
                JSON.stringify(editorDefaults[e.target.value], null, 2),
              );
            }
          }
        }}
      >
        <option value="Image">Image</option>
        {availableOptions.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

function PageEditor({
  page,
  setPage,
}: {
  page: Page;
  setPage: (page: Page) => void;
}) {
  const [tempImage, setTempImage] = useState(page.image);
  const [tempProps, setTempProps] = useState(
    JSON.stringify(page.props, null, 2),
  );
  // State to control the editor height (x in your calculations)
  const [editorHeight, setEditorHeight] = useState(50); // Default height 50vh
  const [isDragging, setIsDragging] = useState(false);

  // Sync tempImage and tempProps when page changes
  useEffect(() => {
    setTempImage(page.image);
    setTempProps(JSON.stringify(page.props, null, 2));
  }, [page]);

  // Add event listeners for mouse movement when dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Calculate new height based on mouse position
        const windowHeight = window.innerHeight;
        const mousePositionFromTop = e.clientY;
        const newHeightVh = (mousePositionFromTop / windowHeight) * 100;

        // Enforce minimum height of 50vh but no maximum
        const clampedHeight = Math.max(50, newHeightVh);
        setEditorHeight(clampedHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  function setContent(content: string[]) {
    setPage({ ...page, content: content });
  }

  // Calculate derived values based on editorHeight (x)
  const borderHeight = editorHeight + 1; // y = x + 1
  const bookImageTop = editorHeight + 10; // z = x + 10

  return (
    <div className="flex w-full h-screen">
      <div
        className="flex flex-row justify-between bg-primary-green shadow-xl p-1 gap-1 rounded-2xl w-full"
        style={{ height: `calc(${borderHeight}vh - 60px)` }}
      >
        <div
          className="flex flex-col w-full items-center bg-white rounded-l-2xl overflow-y-auto"
          style={{ height: `calc(${editorHeight}vh - 60px)` }}
        >
          <div className="flex flex-col w-full items-center justify-center min-h-[500px] max-h-screen">
            <BookImageEditor
              tempImage={tempImage}
              setTempImage={setTempImage}
              tempProps={tempProps}
              setTempProps={setTempProps}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>

        {/* Right container for BookContentEditor */}
        {page.content && page.content.length > 0 && (
          <div
            className="flex flex-col w-1/3 items-center justify-between bg-gray-100 rounded-r-2xl"
            style={{ height: `calc(${editorHeight}vh - 60px)` }}
          >
            <div className="flex flex-col items-center p-1 w-full min-h-full max-h-full overflow-y-scroll">
              <BookContentEditor
                content={page.content}
                setContent={setContent}
              />
            </div>
          </div>
        )}
      </div>

      {/* Drag handle - positioned at the bottom edge of green border */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-16 h-6 cursor-ns-resize z-10"
        style={{ top: `calc(${borderHeight + 10}vh - 64px)` }}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
      >
        <div className="w-full h-2 bg-gray-400 rounded-full opacity-70 hover:opacity-100 hover:bg-gray-600 transition-all"></div>
      </div>

      {/* BookImage section with exact original positioning */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 top-[calc(60vh-60px)] w-full p-4"
        style={{ top: `calc(${bookImageTop}vh - 60px)` }}
      >
        {!JSON.parse(tempProps) && <div className="text-red-500"></div>}
        <ErrorBoundary
          fallback={
            <div className="text-red-500">Error, try adjusting the props</div>
          }
        >
          <BookImage
            key={`${tempImage}-${tempProps}-${page.pageNumber}`}
            image={tempImage}
            page={{ ...page, image: tempImage, props: JSON.parse(tempProps) }}
            setAllowNext={() => {}}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

function BookDetailsEditor({
  book,
  setBook,
  saveBook,
}: {
  book: Book;
  setBook: (book: Book) => void;
  saveBook: (bookParam?: Book) => void;
}) {
  let textFields = ["coverImage", "title", "blurb"];
  let listFields = ["tags"];
  let enumFields: { [key: string]: { options: any[]; default: any } } = {
    bookCover: {
      options: [
        "/color_1.png",
        "/color_2 2.png",
        "/color_2.png",
        "/color_3 2.png",
        "/color_3.png",
        "/color_4.png",
        "/color_5.png",
        "/color_6.png",
        "/color_7.png",
        "/color_8.png",
      ],
      default: "/color_1.png",
    },
    readyForPublish: { options: [true, false], default: false },
    category: {
      options: Object.values(BookCategory),
      default: BookCategory.BEGINNER,
    },
  };

  const [bookTopics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newTopic, setNewTopic] = useState<string>("");
  useEffect(() => {
    BooksService.getUniqueBookTopicsBookTopicsGet()
      .then((response) => setTopics(response))
      .catch((error) => console.error("Failed to fetch topics:", error));
  }, []);

  console.log(book);
  return (
    <div className="flex flex-row h-full p-2 gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        {textFields.map((field, i) => (
          <div key={i} className="flex flex-col w-full gap-2">
            <div>{field}</div>
            <input
              className="w-full h-15 border-2 p-2 shadow-2xl rounded-xl border-primary-green focus:outline-none"
              value={(book as any)[field] ?? ""}
              onChange={(e) => setBook({ ...book, [field]: e.target.value })}
              onBlur={() => saveBook()}
            />
          </div>
        ))}
        {listFields.map((field, i) => (
          <div
            key={i + textFields.length}
            className="flex flex-col w-full gap-2"
          >
            <div>{field}</div>
            <BookContentEditor
              content={(book as any)[field] ?? []}
              setContent={(values) => {
                let newBook = { ...book, [field]: values };
                setBook(newBook);
                saveBook(newBook);
              }}
            />
          </div>
        ))}

        {/* Topic Selection */}
        <div className="flex flex-col w-full gap-2">
          <div>Topic</div>
          <select
            className="w-full h-15 border-2 p-2 shadow-2xl rounded-xl border-primary-green focus:outline-none"
            value={selectedTopic || ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedTopic(selectedValue);
              if (selectedValue !== "add-new") {
                const updatedBook = { ...book, bookTopic: selectedValue };
                setBook(updatedBook);
              }
            }}
          >
            <option value="">Select Topic</option>
            <option value="add-new">Add New Topic</option>
            {bookTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          {/* Input for new topic if 'Add New Topic' is selected */}
          {selectedTopic === "add-new" && (
            <div className="flex flex-col w-full gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter new topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full h-12 border-2 p-2 shadow-2xl rounded-xl border-primary-green focus:outline-none"
              />
              <button
                onClick={() => {
                  if (newTopic && !bookTopics.includes(newTopic)) {
                    setTopics((prevTopics) => [...prevTopics, newTopic]);
                    setSelectedTopic(newTopic);
                    const updatedBook = { ...book, bookTopic: newTopic };
                    setBook(updatedBook);
                    saveBook(updatedBook);
                    setNewTopic("");
                  }
                }}
                className="mt-2 px-4 py-2 bg-primary-green text-white rounded-full"
              >
                Add Topic
              </button>
            </div>
          )}
        </div>

        {Object.keys(enumFields).map((field, i) => (
          <div
            key={i + textFields.length}
            className="flex flex-col w-full gap-2"
          >
            <div>{field}</div>
            <select
              className="w-full h-15 border-2 p-2 shadow-2xl rounded-xl border-primary-green focus:outline-none"
              value={(book as any)[field] ?? enumFields[field].default}
              onChange={(e) => {
                let value: any = e.target.value;
                if (e.target.value === "true") {
                  value = true;
                }
                if (e.target.value === "false") {
                  value = false;
                }
                console.log(value);
                setBook({ ...book, [field]: value });
              }}
              onBlur={() => saveBook()}
            >
              {enumFields[field].options.map((option, i) => (
                <option key={i} value={option}>
                  {`${option}`}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex flex-col pt-32 items-center">
        <BookPreview BookData={book} linkPrefix="/book/" linkSuffix="/1" />
      </div>
    </div>
  );
}

export default function BookEditor() {
  const { bookIdParam, pageNumParam } = useParams();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [pageNum, setPageNum] = useState(
    pageNumParam ? parseInt(pageNumParam) : undefined,
  );
  let navigate = useNavigate();
  let bookId = parseInt(bookIdParam as string);

  useEffect(() => {
    if (pageNum !== parseInt(pageNumParam as string)) {
      navigate(`/book_editor/${bookId}/${pageNum}`);
    }
  }, [pageNum, navigate, bookId, pageNumParam]);

  useEffect(() => {
    BooksService.getBookBooksBookIdGet(bookId)
      .then((response) => {
        setBook(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId]);

  if (!book || !book.pages || !book.pages.length) {
    return <div>Loading...</div>;
  }
  let currentPage = book.pages.find((page) => page.pageNumber === pageNum);

  function setPage(page: Page) {
    if (!book || !book.pages || !pageNum) {
      return;
    }
    let newPages = book.pages?.slice() ?? [];
    newPages[pageNum - 1] = page;

    PagesService.pageUpdatePagePageIdPut(page.id, {
      content: JSON.stringify(page.content),
      image: page.image,
      props: JSON.stringify(page.props),
    })
      .then((response) => {
        console.log(response);
        setBook({ ...book, pages: newPages ?? [] });
      })
      .catch((error) => {
        console.error(error);
        setBook({ ...book });
      });
  }

  function addPage() {
    PagesService.pageCreatePagePost(bookId).then((response) => {
      if (!book || !book.pages) {
        return;
      }
      let newPage = response;
      let newPages = book.pages.slice();
      newPages.push(newPage);
      setBook({ ...book, pages: newPages });
    });
  }

  function deletePage(pageId: number) {
    PagesService.pageDeletePagePageIdDelete(pageId).then((response) => {
      if (!book || !book.pages || !pageNum) {
        return;
      }
      if (
        pageNum === book.pages.find((page) => page.id === pageId)?.pageNumber
      ) {
        setPageNum(pageNum - 1);
      }
      setBook(response);
    });
  }

  function swapPages(pageNum1: number, pageNum2: number) {
    if (!book || !book.pages) {
      return;
    }

    // Get the first and last page numbers
    const firstPageNum = book.pages[0].pageNumber;
    const lastPageNum = book.pages[book.pages.length - 1].pageNumber;

    // Prevent swapping with a non-existent page
    if (pageNum1 === firstPageNum && pageNum2 < firstPageNum) {
      console.log("Cannot swap with the top page as it's the first page.");
      return;
    }
    if (pageNum2 === lastPageNum && pageNum1 > lastPageNum) {
      console.log("Cannot swap with the bottom page as it's the last page.");
      return;
    }

    PagesService.pageSwapPageSwapPageId1PageId2Put(
      book.pages.find((page) => page.pageNumber === pageNum1)?.id as number,
      book.pages.find((page) => page.pageNumber === pageNum2)?.id as number,
    )
      .then((response) => {
        setBook(response);
        if (pageNum1 === pageNum) {
          setPageNum(pageNum2);
        }
        if (pageNum2 === pageNum) {
          setPageNum(pageNum1);
        }
      })
      .catch((error) => {
        console.error("Error swapping pages:", error);
      });
  }

  function saveBook(bookParam?: Book) {
    let saveBook = bookParam ?? book;
    if (!saveBook || !book) {
      return;
    }
    BooksService.editBookBooksBookIdPut(saveBook.id, {
      bookCover: saveBook.bookCover,
      coverImage: saveBook.coverImage,
      title: saveBook.title,
      blurb: saveBook.blurb,
      tags: saveBook.tags,
      readyForPublish: saveBook.readyForPublish,
      category: saveBook.category,
    })
      .then((response) => {
        setBook({
          ...book,
          bookCover: response.bookCover,
          coverImage: response.coverImage,
          title: response.title,
          blurb: response.blurb,
          tags: response.tags,
          readyForPublish: response.readyForPublish,
          category: response.category,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="text-xs xl:text-lg 2xl:text-xl">
      <Navbar />
      <div className="h-[calc(53vh-60px)] flex flex-row p-2 gap-2 flex-grow w-full">
        <PageNavigator
          pages={book.pages.sort((a, b) => a.pageNumber - b.pageNumber)}
          pageNum={pageNum}
          setPageNum={setPageNum}
          addPage={addPage}
          deletePage={deletePage}
          swapPages={swapPages}
          bookId={bookId}
        />
        {currentPage && <PageEditor page={currentPage} setPage={setPage} />}
        {pageNum === 0 && book && (
          <BookDetailsEditor
            book={book}
            setBook={setBook}
            saveBook={saveBook}
          />
        )}
      </div>
    </div>
  );
}
