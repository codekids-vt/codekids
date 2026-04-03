import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import PostPreview from "../components/PostPreview";
import { useCallback, useEffect, useState } from "react";
import { Book, BooksService } from "../api";
import ActivityBookList from "../components/ActivityBookList";

export default function ActivityPostList() {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookResults = useCallback(
    (topic: string | null, query: string | null) => {
      setLoading(true);
      BooksService.searchBooksBooksSearchPost({
        categories: null,
        query,
        published: true,
      })
        .then((response) => {
          setResults(
            response.filter((book) => book.tags.includes("teacher_resource")),
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    },
    [],
  );

  // The initial load of all books
  useEffect(() => {
    loadBookResults(null, null);
  }, [loadBookResults]);
  const otherPostsData = [
    {
      image: "/lego-sort-example-clumping.png",
      postId: "picture-book",
      title: "Lego I/O",
      author: "John Doe",
      blurb: "An input/output exercise using Legos.",
      link: "/article/lego",
    },
    {
      image:
        "https://www.gstatic.com/images/branding/product/1x/forms_512dp.png",
      postId: "picture-book",
      title: "Codekids Teacher Survey",
      author: "CodeKids Team",
      blurb: "Survey to help us improve our program!",
      link: "https://forms.gle/zBKvsawuamKYZ5b88",
    },
  ];

  return (
    <div>
      <Background />
      <Navbar />
      <div className="flex flex-col items-center container mx-auto z-10 min-h-screen">
        <section className="p-2 mx-auto w-1/2">
          <ul className="flex flex-col gap-2">
            {otherPostsData?.length > 0 &&
              otherPostsData.map((postData, i: number) => (
                <PostPreview postData={postData} key={`postData-${i}`} />
              ))}
          </ul>
        </section>
        <section className="w-full p-2 mt-2">
          <h2 className="text-2xl">Books for Teachers</h2>
          <ActivityBookList
            books={results}
            linkPrefix="/book/"
            linkSuffix="/1"
            loading={loading}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
