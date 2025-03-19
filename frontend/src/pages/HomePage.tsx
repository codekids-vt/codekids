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
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | null>(
    null,
  );

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
    (
      category: BookCategory | null,
      topic: string | null,
      query: string | null,
    ) => {
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

  // Helper function to format category names for display
  const formatCategoryName = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Determine container styling based on the selected category
  const containerClass =
    selectedCategory === BookCategory.BEGINNER ||
    selectedCategory === BookCategory.INTERMEDIATE ||
    selectedCategory === BookCategory.ADVANCED
      ? "absolute top-2 left-1/2 transform -translate-x-1/2 bg-transparent p-3 rounded-md flex flex-col flex-wrap gap-3 items-center z-50"
      : "absolute top-2 left-5 bg-transparent p-3 rounded-md flex flex-col flex-wrap gap-3 items-start z-50";

  return (
    <>
      <Background />
      <Navbar />
      <div className="relative flex flex-col items-center w-full z-10 min-h-screen">
        <div className={containerClass}>
          {/* Level Buttons (All categories except UNPLUGGED) */}
          {Object.values(BookCategory)
            .filter((category) => category !== BookCategory.UNPLUGGED)
            .map((category) => {
              const isSelected = selectedCategory === category;
              const isLevelCategory = [
                BookCategory.BEGINNER,
                BookCategory.INTERMEDIATE,
                BookCategory.ADVANCED,
              ].includes(category);

              const buttonClasses = isLevelCategory
                ? isSelected
                  ? "bg-blue-500 text-white border-blue-700" // Selected LEVEL category styling (dummy)
                  : "bg-blue-100 text-blue-500 border-blue-300" // Unselected LEVEL category styling (dummy)
                : isSelected
                  ? "bg-primary-green text-white"
                  : "bg-white text-primary-green";

              return (
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
                  className={`${buttonClasses} px-4 py-1 rounded-full border-2
                              hover:bg-hover-green hover:text-white
                              transition-colors duration-300 ease-in-out
                              hover:shadow-xl w-48 text-center text-sm`}
                >
                  {formatCategoryName(category)}
                </button>
              );
            })}

          {/* "All Topics" button */}
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedTopic(null);
              setIsUnplugged(false);
              loadBookResults(null, null, query);
            }}
            className="bg-white text-primary-green px-4 py-1 rounded-full border-2 border-primary-green
                        hover:bg-hover-green hover:text-white
                        transition-colors duration-300 ease-in-out
                        hover:shadow-xl w-48 text-center"
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
               hover:shadow-xl w-48 text-center`}
          >
            UNPLUGGED
          </button>
        </div>

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

        <div className="flex flex-col w-full items-center gap-2 mt-4">
          <div
            className="flex flex-row items-center p-2 bg-gray-200 border-2 border-primary-green 
                          w-1/3 h-12 shadow-xl rounded-full"
          >
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
                  loadBookResults(
                    selectedCategory,
                    selectedTopic,
                    e.target.value,
                  );
                }, 500);
                setTimerHandle(handle);
              }}
              value={query}
              className="w-full px-4 bg-transparent outline-none text-xl"
              type="text"
            />
          </div>
        </div>

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
