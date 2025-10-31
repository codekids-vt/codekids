import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Book, BookCategory, BooksService, Page, PagesService } from "../api";
import { BookImage } from "../components/BookImage";
import { editorDefaults } from "../util/componentEditorDefaults";
import { ErrorBoundary } from "react-error-boundary";
import { BookPreview } from "../components/ActivityBookList";
import Editor from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";
import Split from "react-split";

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
    <div className="p-2 w-full max-w-full overflow-hidden min-w-0">
      <form className="flex flex-col gap-2 w-full max-w-full min-w-0">
        {Object.keys(propsObject).map((key) => {
          if (!objectArrays.includes(key) && !primitiveArrays.includes(key)) {
            return (
              <div
                key={key}
                className="flex flex-col w-full max-w-full min-w-0"
              >
                <label className="font-bold text-lg truncate" htmlFor={key}>
                  {key}
                </label>
                {key === "code" ? (
                  <textarea
                    id={key}
                    value={propsObject[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    onKeyDown={(e) => {
                      // Check if the Tab key is pressed
                      if (e.key === "Tab") {
                        e.preventDefault(); // Prevent default tab behavior (focus switch)

                        // Type assertion to inform TypeScript that e.target is a HTMLTextAreaElement
                        const textarea = e.target as HTMLTextAreaElement;
                        const { selectionStart, selectionEnd, value } =
                          textarea;
                        const newValue =
                          value.substring(0, selectionStart) +
                          "    " +
                          value.substring(selectionEnd);

                        handleInputChange(key, newValue); // Update the value with the added spaces

                        // Move the cursor to the correct position after the inserted spaces
                        setTimeout(() => {
                          textarea.selectionStart = textarea.selectionEnd =
                            selectionStart + 4; // Move cursor after inserted spaces
                        }, 0);
                      }
                    }}
                    rows={10}
                    className="border border-gray-300 rounded p-1 font-mono whitespace-pre w-full max-w-full min-w-0"
                    style={{ resize: "vertical" }}
                  />
                ) : (
                  <input
                    id={key}
                    type="text"
                    value={propsObject[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="border border-gray-300 rounded p-1 w-full max-w-full min-w-0"
                  />
                )}
              </div>
            );
          }
          return null;
        })}

        {/* Object Arrays Section with width constraints */}
        {objectArrays.map((arrayKey) => (
          <div key={arrayKey} className="mt-4 w-full max-w-full min-w-0">
            <h3 className="font-bold text-lg truncate">{arrayKey}</h3>
            {(objectArrayData[arrayKey] || []).map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-2 mb-2 w-full max-w-full"
              >
                {Object.keys(item).map((field) => {
                  const value = item[field];

                  if (
                    typeof value === "object" &&
                    value !== null &&
                    !Array.isArray(value)
                  ) {
                    // Nested object with width constraints
                    return (
                      <div
                        key={field}
                        className="flex flex-col border p-2 rounded mb-2 min-w-0 flex-1"
                      >
                        <h4 className="font-bold text-lg truncate">{field}</h4>
                        {Object.keys(value).map((subField) => (
                          <div key={subField} className="flex flex-col min-w-0">
                            <label
                              className="font-bold text-lg truncate"
                              htmlFor={`${field}-${subField}-${index}`}
                            >
                              {subField}
                            </label>
                            <input
                              id={`${field}-${subField}-${index}`}
                              type="text"
                              value={value[subField]}
                              onChange={(e) => {
                                const updatedArray = [
                                  ...objectArrayData[arrayKey],
                                ];
                                updatedArray[index] = {
                                  ...updatedArray[index],
                                  [field]: {
                                    ...updatedArray[index][field],
                                    [subField]: e.target.value,
                                  },
                                };
                                setObjectArrayData({
                                  ...objectArrayData,
                                  [arrayKey]: updatedArray,
                                });
                                setTempProps(
                                  JSON.stringify(
                                    {
                                      ...propsObject,
                                      [arrayKey]: updatedArray,
                                    },
                                    null,
                                    2,
                                  ),
                                );
                              }}
                              className="border border-gray-300 rounded p-1 w-full max-w-full min-w-0"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }

                  // Primitive fields with width constraints
                  return (
                    <div key={field} className="flex flex-col min-w-0 flex-1">
                      <label
                        className="font-bold text-lg truncate"
                        htmlFor={`${field}-${index}`}
                      >
                        {field}
                      </label>
                      {typeof value === "boolean" ? (
                        <select
                          id={`${field}-${index}`}
                          value={value.toString()}
                          onChange={(e) =>
                            handleOptionChange(
                              arrayKey,
                              index,
                              field,
                              e.target.value,
                            )
                          }
                          className="border border-gray-300 rounded p-1 w-full max-w-full min-w-0"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      ) : (
                        <input
                          id={`${field}-${index}`}
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleOptionChange(
                              arrayKey,
                              index,
                              field,
                              e.target.value,
                            )
                          }
                          className="border border-gray-300 rounded p-1 w-full max-w-full min-w-0"
                        />
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => removeItem(arrayKey, index)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none flex-shrink-0"
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "27px",
                    padding: "5px 10px",
                    fontSize: "0.75rem",
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
              className="bg-blue-500 text-white p-2 rounded mt-2 text-lg"
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
/**Left side of the book editor interface */
function PageNavigator({
  pages,
  pageNum,
  setPageNum,
  addPage,
  deletePage,
  swapPages,
  bookId,
  isCollapsed,
  setIsCollapsed,
}: {
  pages: Page[];
  pageNum: number | undefined;
  setPageNum: (pageNum: number) => void;
  addPage: () => void;
  deletePage: (pageId: number) => void;
  swapPages: (pageNum1: number, pageNum2: number) => void;
  bookId: number;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${isCollapsed ? "w-12" : "w-1/12"} h-full flex flex-col relative overflow-y-auto`}
    >
      {!isCollapsed && (
        <div className="flex flex-col py-2 gap-2 items-center">
          {/* Collapse button at the top when expanded */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-9/12 h-10 bg-primary-green text-white rounded-full flex items-center justify-center hover:bg-green-600"
          >
            ←
          </button>

          <a
            className="w-9/12 h-12 border border-primary-green flex items-center justify-center rounded-xl text-lg hover:bg-primary-green hover:text-white text-center"
            href={`/book/${bookId}/1`}
          >
            Preview Book
          </a>
          <button
            className="w-9/12 h-12 border border-primary-green flex items-center justify-center rounded-xl text-lg hover:bg-primary-green hover:text-white text-center"
            onClick={() => setPageNum(0)}
          >
            Book Details
          </button>
          {pages.map((page, i) => {
            const isSelected = page.pageNumber === pageNum;
            const selectedTw =
              "border-primary-green bg-primary-green text-white";
            const unselectedTw = "border-gray-300";
            return (
              <div
                className="flex flex-row w-9/12 h-12 items-center gap-1"
                key={i}
              >
                <button
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
                  onClick={() =>
                    swapPages(page.pageNumber, page.pageNumber - 1)
                  }
                >
                  ↑
                </button>
                <button
                  onClick={() =>
                    swapPages(page.pageNumber, page.pageNumber + 1)
                  }
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
      )}

      {/* Collapse button in top-right corner when collapsed */}
      {isCollapsed && (
        <>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-2 right-2 w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center hover:bg-green-600 z-10"
          >
            →
          </button>

          <div className="flex flex-col items-center py-12 gap-2">
            <a
              href={`/book/${bookId}/1`}
              className="w-8 h-8 rounded-full text-sm flex items-center justify-center bg-gray-200 hover:bg-gray-300"
              title="Preview Book"
            >
              👁️
            </a>
            <button
              className="w-8 h-8 rounded-full text-sm flex items-center justify-center bg-gray-200 hover:bg-gray-300"
              onClick={() => setPageNum(0)}
              title="Book Details"
            >
              📖
            </button>
            {pages.slice(0, 8).map((page) => (
              <button
                key={page.id}
                className={`w-8 h-8 rounded-full text-sm flex items-center justify-center ${
                  page.pageNumber === pageNum
                    ? "bg-primary-green text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setPageNum(page.pageNumber)}
                title={`Page ${page.pageNumber}`}
              >
                {page.pageNumber}
              </button>
            ))}
            {pages.length > 8 && (
              <div className="text-xs text-gray-500">+{pages.length - 8}</div>
            )}
            <button
              className="w-8 h-8 rounded-full text-lg flex items-center justify-center bg-primary-green text-white hover:bg-green-600"
              onClick={addPage}
              title="Add Page"
            >
              +
            </button>
          </div>
        </>
      )}
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
            className="border border-gray-300 rounded-xl p-1 w-full text-lg h-32"
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

//Editor with Prompts and JSON
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
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setTempProps(JSON.stringify(page.props, null, 2));
  }, [page.props, setTempProps]);

  return (
    <div className="flex flex-col h-full w-full min-w-0 max-w-full overflow-hidden">
      {/* Image Type Selector - Fixed at top */}
      <div className="flex-shrink-0 p-2">
        <ImageTypeEditor
          tempImageType={tempImage}
          setTempImageType={setTempImage}
          setTempProps={setTempProps}
        />
      </div>

      {/* Content area - Takes remaining space */}
      <div className="flex-1 flex flex-col min-h-0 px-2 pb-2">
        {page.image.includes("/") || page.image === "Image" ? (
          <div className="flex flex-col w-full min-w-0">
            <div>image url or path:</div>
            <input
              className="w-full h-15 border-2 p-2 rounded-xl border-primary-green focus:outline-none min-w-0"
              value={tempImage}
              onChange={(e) => setTempImage(e.target.value)}
            />
          </div>
        ) : (
          <>
            {/* Tab Navigation - Fixed */}
            <div className="flex-shrink-0 flex space-x-4 border-b-2 mb-2">
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

            {/* Scrollable content area */}
            <div
              ref={containerRef}
              className="flex-1 rounded-xl overflow-hidden w-full min-w-0 min-h-0 bg-white"
            >
              <div className="w-full h-full min-w-0 bg-white">
                {activeTab === "prompts" ? (
                  <div className="w-full h-full overflow-auto min-w-0">
                    <PropsForm
                      tempProps={tempProps}
                      setTempProps={setTempProps}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full min-w-0">
                    <Editor
                      value={tempProps}
                      onChange={(value) => value && setTempProps(value)}
                      className="w-full h-full"
                      theme="vs-dark"
                      language="json"
                      options={{
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        minimap: { enabled: false },
                        wordWrap: "on",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
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
  isNavigatorCollapsed,
}: {
  page: Page;
  setPage: (page: Page) => void;
  isNavigatorCollapsed: boolean;
}) {
  const [tempImage, setTempImage] = useState(page.image);
  const [tempProps, setTempProps] = useState(
    JSON.stringify(page.props, null, 2),
  );

  useEffect(() => {
    setTempImage(page.image);
    setTempProps(JSON.stringify(page.props, null, 2));
  }, [page]);

  function setContent(content: string[]) {
    setPage({ ...page, content: content });
  }

  const middleSectionClass = "w-7/12";
  const activityEditorClass = "flex-1";

  // Scale mapping based on image type
  const getScaleForImageType = (imageType: string): number => {
    const scaleMap: { [key: string]: number } = {
      Comparison: 0.4,
      FillInTheBlank: 0.55,
      YoutubeEmbed: 0.8,
      WalkThroughCode: 0.9,
      ImagesAndText: 0.75,
    };
    return scaleMap[imageType] || 1.0;
  };

  const bookImageScale = getScaleForImageType(tempImage);

  return (
    <div className="flex w-full h-full">
      <Split
        sizes={[70, 30]}
        minSize={200}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        className="flex w-full h-full"
      >
        <div
          className={`${middleSectionClass} bg-white rounded-lg overflow-hidden`}
        >
          <div className="w-full h-full p-4">
            <div className="h-full w-full shadow-2xl rounded-2xl bg-white border flex">
              <div className="w-8/12 p-4 border-r border-gray-200 flex justify-center items-center overflow-hidden">
                <div className="w-full h-full overflow-hidden rounded-lg flex justify-center items-center">
                  <div
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      transform: `scale(${bookImageScale})`,
                      transformOrigin: "center",
                    }}
                  >
                    <ErrorBoundary
                      fallback={
                        <div className="text-red-500 text-lg">
                          Error, try adjusting the props
                        </div>
                      }
                    >
                      <BookImage
                        key={`${tempImage}-${tempProps}-${page.pageNumber}`}
                        image={tempImage}
                        page={{
                          ...page,
                          image: tempImage,
                          props: JSON.parse(tempProps),
                        }}
                        setAllowNext={() => {}}
                      />
                    </ErrorBoundary>
                  </div>
                </div>
              </div>

              <div className="w-4/12 p-4 overflow-y-auto">
                <div className="h-full overflow-hidden">
                  {page.content && page.content.length > 0 && (
                    <BookContentEditor
                      content={page.content}
                      setContent={setContent}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${activityEditorClass} p-2 transition-all duration-300 ease-in-out min-w-0 max-w-full h-full overflow-hidden`}
        >
          <div className="h-full w-full shadow-2xl rounded-2xl bg-white border overflow-hidden flex flex-col">
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
      </Split>
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
  let listEnumFields = { categories: BookCategory };
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
  };

  const [bookTopics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newTopic, setNewTopic] = useState<string>("");
  useEffect(() => {
    BooksService.getUniqueBookTopicsBookTopicsGet()
      .then((response) => setTopics(response))
      .catch((error) => console.error("Failed to fetch topics:", error));
  }, []);

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

        {Object.entries(listEnumFields).map(([field, enumType], i) => (
          <div
            key={i + textFields.length + listFields.length}
            className="flex flex-col w-full gap-2"
          >
            <div>{field}</div>
            <div className="flex flex-col gap-2">
              <select
                className="w-full h-15 border-2 p-2 shadow-2xl rounded-xl border-primary-green focus:outline-none"
                onChange={(e) => {
                  const currentValues = (book as any)[field] || [];
                  if (
                    !currentValues.includes(e.target.value) &&
                    e.target.value
                  ) {
                    const newValues = [...currentValues, e.target.value];
                    const newBook = { ...book, [field]: newValues };
                    setBook(newBook);
                    saveBook(newBook);
                  }
                }}
              >
                <option value="">Select {field}</option>
                {Object.values(enumType)
                  .filter((v) => typeof v === "string")
                  .map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
              <div className="flex flex-col gap-1">
                {((book as any)[field] || []).map(
                  (value: string, index: number) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="border border-gray-300 rounded-xl p-1 w-full">
                        {value}
                      </div>
                      <button
                        className="w-8 h-8 bg-red-400 text-white rounded-full"
                        onClick={() => {
                          const newValues = ((book as any)[field] || []).filter(
                            (_: string, i: number) => i !== index,
                          );
                          const newBook = { ...book, [field]: newValues };
                          setBook(newBook);
                          saveBook(newBook);
                        }}
                      >
                        X
                      </button>
                    </div>
                  ),
                )}
              </div>
            </div>
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
  const [isNavigatorCollapsed, setIsNavigatorCollapsed] = useState(false);
  const { bookIdParam, pageNumParam } = useParams();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [pageNum, setPageNum] = useState(
    pageNumParam ? parseInt(pageNumParam) : undefined,
  );
  let navigate = useNavigate();
  let bookId = parseInt(bookIdParam as string);
  const { unsavedToggleDarkMode } = useTheme();

  useEffect(() => {
    if (pageNum !== parseInt(pageNumParam as string)) {
      navigate(`/book_editor/${bookId}/${pageNum}`);
    }
  }, [pageNum, navigate, bookId, pageNumParam]);

  useEffect(() => {
    unsavedToggleDarkMode(false);
    BooksService.getBookBooksBookIdGet(bookId)
      .then((response) => {
        setBook(response);
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      unsavedToggleDarkMode(undefined);
    };
  }, [bookId, unsavedToggleDarkMode]);

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
      categories: saveBook.categories,
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
          categories: response.categories,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="text-lg xl:text-lg 2xl:text-lg h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-row p-2 gap-2 min-h-0 overflow-hidden">
        <PageNavigator
          pages={book.pages.sort((a, b) => a.pageNumber - b.pageNumber)}
          pageNum={pageNum}
          setPageNum={setPageNum}
          addPage={addPage}
          deletePage={deletePage}
          swapPages={swapPages}
          bookId={bookId}
          isCollapsed={isNavigatorCollapsed}
          setIsCollapsed={setIsNavigatorCollapsed}
        />
        <div className="flex-1 min-w-0 overflow-hidden">
          {currentPage && (
            <PageEditor
              page={currentPage}
              setPage={setPage}
              isNavigatorCollapsed={isNavigatorCollapsed}
            />
          )}
          {pageNum === 0 && book && (
            <BookDetailsEditor
              book={book}
              setBook={setBook}
              saveBook={saveBook}
            />
          )}
        </div>
      </div>
    </div>
  );
}
