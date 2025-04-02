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
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarTimeout, setSidebarTimeout] = useState<NodeJS.Timeout | null>(null);

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
    BooksService.searchBooksBooksGet(null, topic, null, null, true, query)
      .then((response) => {
        // Filter results based on both level and classification
        let filtered = response;
        if (level) {
          filtered = filtered.filter(book => book.level === level);
        }
        if (classification) {
          filtered = filtered.filter(book => book.category === classification);
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

  const handleSidebarHover = (visible: boolean) => {
    if (sidebarTimeout) {
      clearTimeout(sidebarTimeout);
      setSidebarTimeout(null);
    }
    
    if (!visible) {
      const timeout = setTimeout(() => {
        setSidebarVisible(false);
      }, 300); // 300ms delay before hiding
      setSidebarTimeout(timeout);
    } else {
      setSidebarVisible(true);
    }
  };

  return (
    <>
      <Background />
      <Navbar />
      <div className="relative flex flex-row min-h-screen">
        {/* Sidebar */}

        <div 
          className={`fixed left-0 h-full bg-gradient-to-br from-[#d0ecd5] to-[#ecbfa3] shadow-lg transition-all duration-300 z-20 ${
            sidebarVisible ? 'w-64' : 'w-36'
          }`}
          onMouseEnter={() => handleSidebarHover(true)}
          onMouseLeave={() => handleSidebarHover(true)}
        >
          <div className="p-4">
            <h2 className={`font-bold mb-4 ${sidebarVisible ? 'text-lg' : 'text-sm text-center'}`}>
              {sidebarVisible ? 'Categories' : '≡'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold mb-2 ${sidebarVisible ? '' : 'hidden'}`}>Levels</h3>
                {levelCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      const newLevel = selectedLevel === category ? null : category;
                      setSelectedLevel(newLevel);
                      setIsUnplugged(false);
                      loadBookResults(newLevel, selectedClassification, selectedTopic, query);
                    }}
                    className={`${
                      selectedLevel === category 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    } w-full mb-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      sidebarVisible ? '' : 'w-12 h-12'
                    }`}
                  >
                    {sidebarVisible ? formatCategoryName(category) : category.charAt(0)}
                  </button>
                ))}
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${sidebarVisible ? '' : 'hidden'}`}>Topics</h3>
                {additionalCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      const newClassification = selectedClassification === category ? null : category;
                      setSelectedClassification(newClassification);
                      setIsUnplugged(false);
                      loadBookResults(selectedLevel, newClassification, selectedTopic, query);
                    }}
                    className={`${
                      selectedClassification === category 
                        ? 'bg-primary-green text-white' 
                        : 'bg-white hover:bg-gray-200'
                    } w-full mb-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      sidebarVisible ? '' : 'w-12 h-12'
                    }`}
                  >
                    {sidebarVisible ? formatCategoryName(category) : category.charAt(0)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? 'ml-64' : 'ml-16'}`}>
          <div className="flex flex-col items-center w-full z-10">
            <div className="mt-8">
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
              <div className="card p-2 text-center mx-auto w-11/12">
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
        </div>
      </div>
      <Footer />
    </>
  );
}