import { useEffect, useState } from "react";
import { Book, BooksService } from "../api";
import ActivityBookList from "../components/ActivityBookList";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EditBooksPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (user) {
      BooksService.searchBooksBooksSearchPost({
        owner_id: user.id,
        published: false,
      })
        .then((response) => {
          setBooks(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, setBooks]);

  const navigate = useNavigate();

  return (
    <>
      <Background />
      <Navbar />
      <div className="flex flex-col items-center z-10 min-h-screen gap-4">
        <div className="py-14">
          <h1 className="text-2xl font-bold">Edit Books</h1>
        </div>
        <ActivityBookList
          books={books}
          linkPrefix={"/book_editor/"}
          linkSuffix={"/1"}
          showPublished
        />
        <button
          className="bg-primary-green text-white px-6 py-4 text-xl rounded-full"
          onClick={() => {
            BooksService.createBookBooksPost({
              title: "New Book",
            }).then((response) => {
              navigate(`/book_editor/${response.id}/1`);
            });
          }}
        >
          + Add a new book
        </button>
      </div>
      <Footer />
    </>
  );
}
