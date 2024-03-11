import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Book, BooksService, Page } from "../api";

function PageNavigator({
  pages,
  pageNum,
  setPageNum,
}: {
  pages: Page[];
  pageNum: number;
  setPageNum: (pageNum: number) => void;
}) {
  return (
    <div className="min-h-full overflow-y-scroll w-1/12 bg-gray-200">
      <div className="flex flex-col py-2 gap-2 items-center">
        {pages.map((page, i) => {
          const isSelected = page.pageNumber === pageNum;
          const selectedTw = "border-primary-green bg-primary-green text-white";
          const unselectedTw = "border-gray-300";
          return (
            <button
              key={i}
              className={`w-9/12 h-12 border border-primary-green flex flex-col items-center justify-center rounded-xl text-xl ${isSelected ? selectedTw : unselectedTw}`}
              onClick={() => setPageNum(page.pageNumber)}
            >
              {page.pageNumber}
            </button>
          );
        })}
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
    <div className="flex flex-col items-center justify-center w-full">
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
    <div className="flex flex-row justify-between bg-primary-green shadow-xl p-1 gap-1 rounded-2xl min-h-max flex-grow">
      <div className="flex flex-col flex-grow items-center bg-white rounded-l-2xl h-full">
        <div className="flex flex-col flex-grow items-center justify-center w-full">
          {/* <BookImage
              key={page.pageNumber} // This is to force a re-render when the page changes
              image={page.image}
              page={page}
              setAllowNext={setAllowNext}
            /> */}
          {page.pageNumber}
        </div>
      </div>
      {page.content && page.content.length > 0 && (
        <div className="flex flex-col w-1/3 items-center justify-between bg-gray-100 rounded-r-2xl">
          <div className="flex flex-col items-center justify-center p-1 w-full">
            <BookContentEditor content={page.content} setContent={setContent} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookEditor() {
  const { bookIdParam, pageNumParam } = useParams();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [pageNum, setPageNum] = useState(
    pageNumParam ? parseInt(pageNumParam) : 1,
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
  if (!currentPage) {
    setPageNum(1);
  }

  function setPage(page: Page) {
    if (!book || !book.pages) {
      return;
    }
    let newPages = book.pages?.slice() ?? [];
    newPages[pageNum - 1] = page;
    setBook({ ...book, pages: newPages ?? [] });
  }

  return (
    <div className="text-xs xl:text-lg 2xl:text-xl">
      <Navbar />
      <div className="h-[calc(100vh-60px)] flex flex-row p-2 gap-2">
        <PageNavigator
          pages={book.pages}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
        {currentPage && <PageEditor page={currentPage} setPage={setPage} />}
      </div>
    </div>
  );
}
