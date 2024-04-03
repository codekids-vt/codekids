import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Book, BookCategory, BooksService, Page, PagesService, Question } from "../api";
import { BookImage } from "../components/BookImage";
import Form, { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8'; 
import { editorDefaults } from "../util/componentEditorDefaults";
import ErrorBoundary from '../util/ErrorBoundary';
import { BookPreview } from "../components/ActivityBookList";

function PageNavigator({
  pages,
  pageNum,
  setPageNum,
  addPage,
  deletePage,
  swapPages,
}: {
  pages: Page[];
  pageNum: number | undefined;
  setPageNum: (pageNum: number) => void;
  addPage: () => void;
  deletePage: (pageId: number) => void;
  swapPages: (pageNum1: number, pageNum2: number) => void;
}) {
  return (
    <div className="min-h-full max-h-full overflow-y-scroll w-1/6 bg-gray-200">
      <div className="flex flex-col py-2 gap-2 items-center">
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
    <div className="flex flex-col h-full items-center w-full">
      {tempContents.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 w-full">
          <textarea
            className="border border-gray-300 rounded-xl p-1 m-1 w-full"
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

type JSONSchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array';

interface SchemaProperty {
  type: JSONSchemaType;
  title: string;
  items?: SchemaProperty | SchemaProperty[]; // Add items property for arrays
}

interface SchemaProperties {
  [key: string]: SchemaProperty;
}

function BookImageEditor({
  page,
  setPage,
}: {
  page: Page;
  setPage: (page: Page) => void;
}) {
  const [tempImage, setTempImage] = useState<string>(page.image);
  const [tempProps, setTempProps] = useState<string>(JSON.stringify(page.props || {}));
  const [formData, setFormData] = useState<any>(page.props || {});
  const [schema, setSchema] = useState<any>({});

  const generateSchema = (props: any): { title: string, type: 'object', properties: SchemaProperties } => {
    const schemaProperties: SchemaProperties = {};
  
    Object.keys(props).forEach(key => {
      const value = props[key];
      let propertySchema: SchemaProperty;
  
      if (Array.isArray(value)) {
        // Assuming all elements in the array are of the same type
        const itemType: JSONSchemaType = value.length > 0 ? typeof value[0] as JSONSchemaType : 'string';
        propertySchema = {
          type: 'array',
          title: key,
          items: { type: itemType, title: `${key}_item` } // Define items for array types
        };
      } else if (typeof value === 'object' && value !== null) {
        propertySchema = { type: 'object', title: key };
      } else {
        propertySchema = { type: typeof value as JSONSchemaType, title: key };
      }
  
      schemaProperties[key] = propertySchema;
    });
  
    return {
      title: "Page Properties",
      type: "object",
      properties: schemaProperties,
    };
  };  

  useEffect(() => {
    const newSchema = generateSchema(page.props || {});
    setSchema(newSchema);
    setFormData(page.props || {});
  }, [page]);

  const handleFormChange = (e: IChangeEvent<any>) => {
    setPage({ ...page, props: e.formData });
  };

  return (
    <div className="flex flex-col w-full p-2 h-full">
      <ImageTypeEditor
        tempImageType={tempImage}
        setTempImageType={setTempImage}
        setTempProps={setTempProps}
      />
      <Form
        schema={schema}
        formData={formData}
        onChange={handleFormChange} 
        validator={validator}
      />
      <div className="h-1/2 max-h-80">
        {!console.error && (
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
        {Object.keys(editorDefaults).map((type, i) => (
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
  function setContent(content: string[]) {
    setPage({ ...page, content: content });
  }

  return (
    <div className="flex flex-row justify-between bg-primary-green shadow-xl p-1 gap-1 rounded-2xl min-h-max w-full">
      {/* Left Panel for BookImageEditor */}
      <div className="flex flex-col w-2/3 items-center bg-white rounded-l-2xl h-full">
        <BookImageEditor
          key={page.pageNumber}
          page={page}
          setPage={setPage}
        />
      </div>

      {/* Right Panel for BookContentEditor */}
      {page.content && page.content.length > 0 && (
        <div className="flex flex-col w-1/3 items-center justify-between bg-gray-100 rounded-r-2xl overflow-y-scroll">
          <BookContentEditor content={page.content} setContent={setContent} />
        </div>
      )}
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
  saveBook: () => void;
}) {
  let textFields = ["coverImage", "title", "blurb", "gradeRange"];
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
              onBlur={saveBook}
            />
          </div>
        ))}
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
              onBlur={saveBook}
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
    PagesService.pageSwapPageSwapPageId1PageId2Put(
      book.pages.find((page) => page.pageNumber === pageNum1)?.id as number,
      book.pages.find((page) => page.pageNumber === pageNum2)?.id as number,
    ).then((response) => {
      setBook(response);
      if (pageNum1 === pageNum) {
        setPageNum(pageNum2);
      }
      if (pageNum2 === pageNum) {
        setPageNum(pageNum1);
      }
    });
  }

  function saveBook() {
    if (!book) {
      return;
    }
    BooksService.editBookBooksBookIdPut(book.id, {
      bookCover: book.bookCover,
      coverImage: book.coverImage,
      title: book.title,
      blurb: book.blurb,
      gradeRange: book.gradeRange,
      readyForPublish: book.readyForPublish,
      category: book.category,
    })
      .then((response) => {
        setBook({
          ...book,
          bookCover: response.bookCover,
          coverImage: response.coverImage,
          title: response.title,
          blurb: response.blurb,
          gradeRange: response.gradeRange,
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
      <div className="h-[calc(100vh-60px)] flex flex-row p-2 gap-2">
        <PageNavigator
          pages={book.pages.sort((a, b) => a.pageNumber - b.pageNumber)}
          pageNum={pageNum}
          setPageNum={setPageNum}
          addPage={addPage}
          deletePage={deletePage}
          swapPages={swapPages}
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
