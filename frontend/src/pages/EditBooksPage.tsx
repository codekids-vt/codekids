import { useEffect, useState } from "react";
import { Book, BookCategory, BooksService } from "../api";
import ActivityBookList from "../components/ActivityBookList";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function EditBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    BooksService.searchBooksBooksGet(BookCategory.BEGINNER)
      .then((response) => {
        setBooks(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Background />
      <Navbar />
      <div className="flex flex-col items-center z-10 min-h-screen">
        <div className="py-14">
          <h1 className="text-2xl font-bold">Edit Books</h1>
        </div>
        <ActivityBookList books={books} linkPrefix={"/edit/"} linkSuffix={""} />
      </div>
      <Footer />
    </>
  );
}
