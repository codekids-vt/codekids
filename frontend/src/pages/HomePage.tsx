import { useCallback, useEffect, useState } from "react";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSound from "use-sound";
import { Book, BookCategory, BooksService } from "../api";
import ActivityBookList, {
  BookPreviewUnplugged,
} from "../components/ActivityBookList";
import { unpluggedBooks } from "../util/UnpluggedBooks";

export default function HomePage() {
  const [playSound] = useSound("/sounds/low-click.mp3", { volume: 0.5 });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Tracks which level is selected (BEGINNER, INTERMEDIATE, ADVANCED, etc.)
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | null>(null);

  // Tracks which topic is selected (if any)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // List of all available topics (fetched from API)
  const [topics, setTopics] = useState<string[]>([]);
  const [timerHandle, setTimerHandle] = useState<NodeJS.Timeout | null>(null);

  // UNPLUGGED toggle
  const [isUnplugged, setIsUnplugged] = useState(false);

  useEffect(() => {
    // Fetch the list of unique topics for possible display
    BooksService.getUniqueBookTopicsBookTopicsGet()
      .then((response) => setTopics(response))
      .catch((error) => console.error("Failed to fetch topics:", error));
  }, []);

  useEffect(() => {
    playSound();
  }, [playSound]);

  const loadBookResults = useCallback(
    (category: BookCategory | null, topic: string | null, query: string | null) => {
      setLoading(true);
      BooksService.searchBooksBooksGet(category, topic, null, null, true, query)
        .then((response) => {
          console.log(response);
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

  // Load *all* books on initial mount
  useEffect(() => {
    loadBookResults(null, null, null);
  }, [loadBookResults]);

  return (
    <>
      <Background />
      <Navbar />

      {/* 
        1) Wrap everything in a relative container, so our vertical “navbar”
           can be absolutely placed to the left. 
      */}
      <div className="relative flex flex-col items-center w-full z-10 min-h-screen">

        {/* 
          2) Left-side “navbar” with vertical buttons for 
             Beginner / Intermediate / Advanced / All Topics / UNPLUGGED 
        */}
        <div className="absolute top-24 left-5 bg-transparent backdrop-blur-sm p-3 rounded-md 
                        flex flex-col gap-3 items-start z-50">

          {/* Level Buttons (BEGINNER, INTERMEDIATE, ADVANCED) */}
          {Object.values(BookCategory)
            .filter((category) => category !== BookCategory.UNPLUGGED)
            .map((category) => (
              <button
                key={category}
                onClick={() => {
                  const newSelectedCategory =
                    selectedCategory === category ? null : category;
                  setSelectedCategory(newSelectedCategory);
                  setIsUnplugged(false);
                  setSelectedTopic(null);
                  loadBookResults(newSelectedCategory, null, query);
                }}
                className={`${
                  selectedCategory === category
                    ? "bg-primary-green text-white"
                    : "bg-white text-primary-green"
                } px-4 py-1 rounded-full border-2 border-primary-green
                   hover:bg-hover-green hover:text-white 
                   transition-colors duration-300 ease-in-out 
                   hover:shadow-xl w-40 text-center`}
              >
                {category}
              </button>
            ))}

          {/* “All Topics” as a single button (instead of a dropdown) */}
          <button
            onClick={() => {
              setSelectedCategory(null); 
              setSelectedTopic(null); 
              setIsUnplugged(false);
              loadBookResults(null, null, query);
            }}
            className={`bg-white text-primary-green px-4 py-1 rounded-full border-2 border-primary-green
                        hover:bg-hover-green hover:text-white 
                        transition-colors duration-300 ease-in-out 
                        hover:shadow-xl w-40 text-center`}
          >
            All Topics
          </button>

          {/* UNPLUGGED toggle button */}
          <button
            key="Unplugged"
            onClick={() => {
              setIsUnplugged(!isUnplugged);
              setSelectedCategory(null);
              setSelectedTopic(null);
              loadBookResults(null, null, query);
            }}
            className={`${
              isUnplugged
                ? "bg-primary-green text-white"
                : "bg-white text-primary-green"
            } px-4 py-1 rounded-full border-2 border-primary-green 
               hover:bg-hover-green hover:text-white 
               transition-colors duration-300 ease-in-out 
               hover:shadow-xl w-40 text-center`}
          >
            UNPLUGGED
          </button>
        </div>

        {/* The page’s main content */}
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
              students of all levels. Teachers will find activities that match
              their lesson plans and teaching materials to make coding education
              exciting in the classroom.
            </h1>
          </div>
        </div>

        {/* 
          3) The search bar remains in the center of the page.
             We removed the All Topics <select> so that we only have the search field.
        */}
        <div className="flex flex-col w-full items-center gap-2 mt-4">
          <div className="flex flex-row items-center p-2 bg-gray-200 border-2 border-primary-green 
                          w-1/3 h-12 shadow-xl rounded-full">
            <svg
              className="w-4 h-4 ml-2 text-primary-green"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
                  loadBookResults(selectedCategory, selectedTopic, e.target.value);
                }, 500);
                setTimerHandle(handle);
              }}
              value={query}
              className="w-full px-4 bg-transparent outline-none text-xl"
              type="text"
            />
          </div>
        </div>

        {/* Render books: unplugged vs. standard */}
        <div className="flex flex-wrap justify-center w-full mt-6 gap-4 px-4">
          {isUnplugged ? (
            <BookPreviewUnplugged BookData={unpluggedBooks} />
          ) : (
            <ActivityBookList
              books={results}
              linkPrefix={"/book/"}
              linkSuffix={"/1"}
              loading={loading}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
