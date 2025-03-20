import { useCallback, useEffect, useState } from "react";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSound from "use-sound";
import { Book, BookCategory, BooksService } from "../api";
import ActivityBookList, { BookPreviewUnplugged } from "../components/ActivityBookList";
import { unpluggedBooks } from "../util/UnpluggedBooks";

export default function HomePage() {
  const [playSound] = useSound("/sounds/low-click.mp3", { volume: 0.5 });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Tracks which level is selected (BEGINNER, INTERMEDIATE, ADVANCED)
  const [selectedLevel, setSelectedLevel] = useState<BookCategory | null>(null);
  
  // Tracks which additional classification is selected
  const [selectedClassification, setSelectedClassification] = useState<BookCategory | null>(null);

  // Tracks which topic is selected (if any)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // List of all available topics (fetched from API)
  const [topics, setTopics] = useState<string[]>([]);
  const [timerHandle, setTimerHandle] = useState<NodeJS.Timeout | null>(null);

  // UNPLUGGED toggle
  const [isUnplugged, setIsUnplugged] = useState(false);

  const levelCategories = [BookCategory.BEGINNER, BookCategory.INTERMEDIATE, BookCategory.ADVANCED];
  const additionalCategories = [
    BookCategory.ARTIFICIAL_INTELLIGENCE,
    BookCategory.CYBER_SECURITY, 
    BookCategory.CODING,
    BookCategory.MISCELLANEOUS
  ];

  useEffect(() => {
    // Fetch the list of unique topics for possible display
    BooksService.getUniqueBookTopicsBookTopicsGet()
      .then((response) => setTopics(response))
      .catch((error) => console.error("Failed to fetch topics:", error));
  }, []);

  useEffect(() => {
    playSound();
  }, [playSound]);

  const loadBookResults = useCallback((level: BookCategory | null, classification: BookCategory | null, topic: string | null, query: string | null) => {
    setLoading(true);
    // Combine level and classification for filtering
    const category = classification || level;
    BooksService.searchBooksBooksGet(category, topic, null, null, true, query)
      .then((response) => {
        // Filter results based on both level and classification if both are selected
        let filtered = response;
        if (level && classification) {
          filtered = response.filter(book => 
            book.category === level || book.category === classification
          );
        }
        setResults(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [setResults, setLoading]);

  // Load *all* books on initial mount
  useEffect(() => {
    loadBookResults(null, null, null, null);
  }, [loadBookResults]);

  // Helper function to format category names for display
  const formatCategoryName = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <>
      <Background />
      <Navbar />
      <div className="relative flex flex-col items-center w-full z-10 min-h-screen">
        <div className="absolute top-2 w-full flex flex-col items-center gap-4">
          {/* Level Categories (centered) */}
          <div className="flex justify-center gap-2">
            {levelCategories.map((category) => {
              const isSelected = selectedLevel === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    const newLevel = selectedLevel === category ? null : category;
                    setSelectedLevel(newLevel);
                    setIsUnplugged(false);
                    loadBookResults(newLevel, selectedClassification, selectedTopic, query);
                  }}
                  className={`${
                    isSelected ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"
                  } px-4 py-1 rounded-full border-2 border-blue-300
                    hover:bg-hover-green hover:text-white
                    transition-colors duration-300 ease-in-out
                    hover:shadow-xl w-48 text-center text-sm`}
                >
                  {formatCategoryName(category)}
                </button>
              );
            })}
          </div>

          {/* Additional Classifications */}
          <div className="flex flex-wrap justify-center gap-2">
            {additionalCategories.map((category) => {
              const isSelected = selectedClassification === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    const newClassification = selectedClassification === category ? null : category;
                    setSelectedClassification(newClassification);
                    setIsUnplugged(false);
                    loadBookResults(selectedLevel, newClassification, selectedTopic, query);
                  }}
                  className={`${
                    isSelected ? "bg-primary-green text-white" : "bg-white text-primary-green"
                  } px-4 py-1 rounded-full border-2 border-primary-green
                    hover:bg-hover-green hover:text-white
                    transition-colors duration-300 ease-in-out
                    hover:shadow-xl w-48 text-center text-sm`}
                >
                  {formatCategoryName(category)}
                </button>
              );
            })}

            {/* UNPLUGGED toggle button */}
            <button
              onClick={() => {
                setIsUnplugged(!isUnplugged);
                setSelectedLevel(null);
                setSelectedClassification(null);
                setSelectedTopic(null);
                loadBookResults(null, null, null, query);
              }}
              className={`${
                isUnplugged ? "bg-primary-green text-white" : "bg-white text-primary-green"
              } px-4 py-1 rounded-full border-2 border-primary-green
                hover:bg-hover-green hover:text-white
                transition-colors duration-300 ease-in-out
                hover:shadow-xl w-48 text-center text-sm`}
            >
              UNPLUGGED
            </button>

            {/* "All Topics" button */}
            <button
              onClick={() => {
                setSelectedLevel(null);
                setSelectedClassification(null);
                setSelectedTopic(null);
                setIsUnplugged(false);
                loadBookResults(null, null, null, query);
              }}
              className="bg-white text-primary-green px-4 py-1 rounded-full border-2 border-primary-green
                hover:bg-hover-green hover:text-white
                transition-colors duration-300 ease-in-out
                hover:shadow-xl w-48 text-center text-sm"
            >
              All Topics
            </button>
          </div>
        </div>

        <div className="mt-48">
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
                  loadBookResults(selectedLevel, selectedClassification, selectedTopic, e.target.value);
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