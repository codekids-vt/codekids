import { Book, BookCategory } from "../util/BookData";
import { books } from "../util/books";

function BookPreview({ BookData }: { BookData: Book }) {
  return (
    <div className="h-[325px] w-[275px] relative">
      <a href={`/book/${BookData.BookId}/0`}>
        <div className="h-[325px] w-[275px] hover:shadow-2xl rounded-2xl hover:-translate-y-1">
          <img src={BookData.bookCover} width={275} height={280} alt={`Book Image-Background`} className="absolute" />
          <div className="relative top-12 left-4 w-52 h-64 flex-col flex items-center p-2 text-center">
            <p className="mt-1 mb-2 text-sm text-end text-black">{` Grades: ${BookData.gradeRange}`}</p>
            <img src={BookData.cover ? BookData.cover : BookData.pages[0].image} width={125} height={125} alt={`Book Image-${BookData.title}`} className="rounded-2xl" />
            <h1 className="text-black font-semibold">{BookData.title}</h1>
            <p className="mt-1 text-sm text-black">{BookData.blurb}</p>
          </div>
        </div>
      </a>
    </div>

  )
}

function BookPreviewList({ pageBookData }: { pageBookData: Book[] }) {
  return (
    <ul className="[&>*:not(:last-child)]:mb-2 flex-wrap flex items-center justify-center">
      {
        pageBookData.map((BookData: Book, i: number) => (
          <li key={`BookData-${i}`} className="pl-3">
            <BookPreview BookData={BookData} />
          </li>

        ))
      }
    </ul>
  );
}

export default function ActivityBookList({ category }: { category: BookCategory }) {
  const allBooks: Book[] = books as Book[];
  const filteredBooks: Book[] = allBooks.filter((book: Book) => book.category === category);

  return (
    <>
      <section className="p-2 mx-auto flex flex-wrap">
        <BookPreviewList pageBookData={filteredBooks} />
      </section>
    </>
  )
}
