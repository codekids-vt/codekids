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
  const [selectedCategories, setSelectedCategories] = useState<
    BookCategory[] | null
  >(null);
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
    playSound();
  }, [playSound]);

  const loadBookResults = useCallback(
    (query: string | null) => {
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

  useEffect(() => {
    loadBookResults(null);
  }, [loadBookResults]);

  useEffect(() => {
    if (!isUnplugged) {
      loadBookResults(query || null);
    }
  }, [selectedCategories, isUnplugged, query, loadBookResults]);
  const handleLevelClick = (category: BookCategory) => {
    const isLevelUnplugged = category === BookCategory.UNPLUGGED;
    if (isLevelUnplugged) {
      setIsUnplugged((u) => !u);
      setSelectedCategories(null);
      return;
    }
    setIsUnplugged(false);
    setSelectedCategories((prev) =>
      prev && prev.includes(category)
        ? prev.filter((c) => c !== category)
        : prev
          ? [...prev, category]
          : [category],
    );
  };

  const handleTopicClick = (category: BookCategory) => {
    setIsUnplugged(false);
    setSelectedCategories((prev) =>
      prev && prev.includes(category)
        ? prev.filter((c) => c !== category)
        : prev
          ? [...prev, category]
          : [category],
    );
  };

  const pillClass = (active: boolean) =>
    `${
      active
        ? "bg-primary-green text-white border-primary-green shadow-md"
        : "bg-white/90 text-gray-800 hover:bg-cardGreen/40 border-primary-green/50"
    } border px-4 py-2 rounded-full transition-colors duration-150`;

  const formatCategoryName = (category: string) =>
    category
      .split("_")
      .map((word) => word[0] + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <>
      <Background />
      <Navbar />
      <div className="relative flex flex-col min-h-screen">
        <div className="flex-1">
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
                  students of all levels.
                </h1>
                <h1 className="text-l">
                  Teachers will find activities that match their lesson plans
                  and teaching materials to make coding education exciting in
                  the classroom.
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
                      loadBookResults(e.target.value);
                    }, 500);
                    setTimerHandle(handle);
                  }}
                  value={query}
                  className="w-full px-4 bg-transparent outline-none text-xl"
                  type="text"
                />
              </div>
              <div className="mt-3 w-11/12 md:w-2/3 lg:w-1/2 flex flex-wrap justify-center gap-2">
                {levelCategories.map((category) => {
                  const isLevelUnplugged = category === BookCategory.UNPLUGGED;
                  const active = isLevelUnplugged
                    ? isUnplugged
                    : !!selectedCategories?.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => handleLevelClick(category)}
                      className={pillClass(active)}
                    >
                      {formatCategoryName(category)}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 w-11/12 md:w-2/3 lg:w-1/2 flex flex-wrap justify-center gap-2">
                {additionalCategories.map((category) => {
                  const active = !!selectedCategories?.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => handleTopicClick(category)}
                      className={pillClass(active)}
                    >
                      {formatCategoryName(category)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap justify-center w-full xl:w-4/5 mt-6 gap-4 px-4">
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
