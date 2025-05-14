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
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarTimeout, setSidebarTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [selectedCategories, setSelectedCategories] = useState<
    BookCategory[] | null
  >(null);
  const [, setTopics] = useState<string[]>([]);
  const [timerHandle, setTimerHandle] = useState<NodeJS.Timeout | null>(null);

  const [isUnplugged, setIsUnplugged] = useState(false);

  const levelCategories = [
    BookCategory.BEGINNER,
    BookCategory.INTERMEDIATE,
    BookCategory.ADVANCED,
    BookCategory.UNPLUGGED,
  ];
  const additionalCategories = [
    BookCategory.ARTIFICIAL_INTELLIGENCE,
    BookCategory.CYBER_SECURITY,
    BookCategory.CODING,
    BookCategory.MISCELLANEOUS,
  ];

  useEffect(() => {
    BooksService.getUniqueBookTopicsBookTopicsGet()
      .then(setTopics)
      .catch((error) => console.error("Failed to fetch topics:", error));
  }, []);

  useEffect(() => {
    playSound();
  }, [playSound]);

  const loadBookResults = useCallback(
    (topic: string | null, query: string | null) => {
      setLoading(true);
      BooksService.searchBooksBooksSearchPost({
        categories: selectedCategories,
        query,
        published: true,
      })
        .then((response) => {
          setResults(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    },
    [selectedCategories],
  );

  // The initial load of all books
  useEffect(() => {
    loadBookResults(null, null);
  }, [loadBookResults]);

  const formatCategoryName = (category: string) =>
    category
      .split("_")
      .map((word) => word[0] + word.slice(1).toLowerCase())
      .join(" ");

  const handleSidebarHover = (visible: boolean) => {
    if (sidebarTimeout) {
      clearTimeout(sidebarTimeout);
      setSidebarTimeout(null);
    }
    if (!visible) {
      const t = setTimeout(() => setSidebarVisible(false), 300);
      setSidebarTimeout(t);
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
            sidebarVisible ? "w-64" : "w-36"
          }`}
          onMouseEnter={() => handleSidebarHover(true)}
          onMouseLeave={() => handleSidebarHover(true)}
        >
          <div className="p-4">
            <h2
              className={`font-bold text-gray-600 mb-4 ${
                sidebarVisible ? "text-lg" : "text-sm text-center"
              }`}
            >
              {sidebarVisible ? "Categories" : "≡"}
            </h2>

            <div className="space-y-4">
              <div>
                <h3
                  className={`font-semibold mb-2 text-gray-600 ${
                    sidebarVisible ? "" : "hidden"
                  }`}
                >
                  Levels
                </h3>
                {levelCategories.map((category) => {
                  const isLevelUnplugged = category === BookCategory.UNPLUGGED;
                  const active = isLevelUnplugged
                    ? isUnplugged
                    : selectedCategories?.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        if (isLevelUnplugged) {
                          setIsUnplugged((u) => !u);
                          // clear any other filters
                          setSelectedCategories(null);
                        } else {
                          // switch off unplugged
                          setIsUnplugged(false);
                          // toggle this level in the array
                          setSelectedCategories((prev) =>
                            prev && prev.includes(category)
                              ? prev.filter((c) => c !== category)
                              : prev
                                ? [...prev, category]
                                : [category],
                          );
                        }
                      }}
                      className={`${
                        active
                          ? "bg-primary-green text-white"
                          : "bg-white hover:bg-gray-200"
                      } w-full mb-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        sidebarVisible ? "" : "w-12 h-12"
                      }`}
                    >
                      {sidebarVisible
                        ? formatCategoryName(category)
                        : category.charAt(0)}
                    </button>
                  );
                })}
              </div>

              <div>
                <h3
                  className={`font-semibold mb-2 text-gray-600 ${
                    sidebarVisible ? "" : "hidden"
                  }`}
                >
                  Topics
                </h3>
                {additionalCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setIsUnplugged(false);
                      setSelectedCategories((prev) =>
                        prev && prev.includes(category)
                          ? prev.filter((cat) => cat !== category)
                          : prev
                            ? [...prev, category]
                            : [category],
                      );
                    }}
                    className={`${
                      selectedCategories?.includes(category)
                        ? "bg-primary-green text-white"
                        : "bg-white hover:bg-gray-200"
                    } w-full mb-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      sidebarVisible ? "" : "w-12 h-12"
                    }`}
                  >
                    {sidebarVisible
                      ? formatCategoryName(category)
                      : category.charAt(0)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarVisible ? "ml-64" : "ml-16"
          }`}
        >
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
                  students of all levels. Teachers will find activities that
                  match their lesson plans and teaching materials to make coding
                  education exciting in the classroom.
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
                      loadBookResults(null, e.target.value);
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
