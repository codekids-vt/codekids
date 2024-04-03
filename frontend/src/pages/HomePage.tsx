import { useCallback, useEffect, useState } from "react";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSound from "use-sound";
import { Book, BookCategory, BooksService } from "../api";
import ActivityBookList from "../components/ActivityBookList";

export default function HomePage() {
  const [playSound] = useSound("/sounds/low-click.mp3", { volume: 0.5 });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | null>(
    null,
  );
  const [timerHandle, setTimerHandle] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    playSound();
  }, [playSound]);

  const loadBookResults = useCallback(
    (category: BookCategory | null, query: string | null) => {
      setLoading(true);
      BooksService.searchBooksBooksGet(category, null, null, true, query)
        .then((response) => {
          setResults(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    },
    [setResults, setLoading],
  );

  useEffect(() => {
    loadBookResults(null, null);
  }, [loadBookResults]);

  return (
    <>
      <Background />
      <Navbar />
      <div className="flex flex-col items-center container mx-auto z-10 min-h-screen">
        <div>
          <img
            src="/background.png"
            alt="KIDATA"
            width={250}
            height={150}
            className="mx-auto"
          />
          <div className="card p-2 text-center mx-auto max-w-lg">
            <h1 className="text-2xl font-bold">Welcome to CodeKids!</h1>
          </div>
          <div className="card p-2 text-center mx-auto w-1/2">
            <h1 className="text-l">
              CodeKids offers a wide range of engaging coding activities for
              students of all levels, Teachers will find activities that match
              their lesson plans and teaching materials to make coding education
              exciting in the classroom.
            </h1>
          </div>
        </div>
        <div className="flex flex-col w-full 2xl:w-10/12 items-center gap-2">
          <div className="flex flex-row items-center p-2 bg-gray-200 border-2 border-primary-green w-1/3 h-12 shadow-xl rounded-full">
            <svg
              className="w-4 h-4 ml-2 text-primary-green"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              placeholder="Search for a book"
              onChange={(e) => {
                setQuery(e.target.value);
                if (timerHandle) {
                  clearTimeout(timerHandle);
                }
                const handle = setTimeout(() => {
                  loadBookResults(selectedCategory, query);
                }, 500);
                setTimerHandle(handle);
              }}
              value={query}
              className="w-full px-4 bg-transparent outline-none text-xl"
              type="text"
            ></input>
          </div>
          <div className="flex flex-row items-center gap-2">
            {Object.values(BookCategory).map((category) => (
              <button
                key={category}
                onClick={() => {
                  const newSelectedCategory =
                    selectedCategory === category ? null : category;
                  setSelectedCategory(newSelectedCategory);
                  loadBookResults(newSelectedCategory, query);
                }}
                className={`${
                  selectedCategory === category
                    ? "bg-primary-green text-white"
                    : "bg-white text-primary-green"
                } px-4 py-1 rounded-full hover:bg-hover-green border-2 border-primary-green hover:text-white transition-colors duration-300 ease-in-out hover:shadow-xl`}
              >
                {category}
              </button>
            ))}
          </div>
          <ActivityBookList
            books={results}
            linkPrefix={"/book/"}
            linkSuffix={"/1"}
            loading={loading}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
