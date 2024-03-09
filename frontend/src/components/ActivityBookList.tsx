import { Book } from "../api/models/Book";

function BookPreview({
  BookData: book,
  linkPrefix,
  linkSuffix,
}: {
  BookData: Book;
  linkPrefix: string;
  linkSuffix: string;
}) {
  return (
    <div className="h-[325px] w-[275px] relative">
      <a href={`${linkPrefix}${book.id}${linkSuffix}`}>
        <div className="h-[325px] w-[275px] hover:shadow-2xl rounded-2xl hover:-translate-y-1">
          <img
            src={book.bookCover}
            width={275}
            height={280}
            alt="Book Background"
            className="absolute"
          />
          <div className="relative top-16 left-4 w-52 h-64 flex-col flex items-center p-2 text-center">
            {book.coverImage && (
              <img
                src={book.coverImage}
                width={125}
                height={125}
                alt={`Book ${book.title}`}
                className="rounded-2xl"
              />
            )}
            <h1 className="text-black font-semibold">{book.title}</h1>
            <p className="mt-1 text-sm text-black">{book.blurb}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

function BookPreviewList({
  pageBookData,
  linkPrefix,
  linkSuffix,
}: {
  pageBookData: Book[];

  linkPrefix: string;
  linkSuffix: string;
}) {
  return (
    <ul className="[&>*:not(:last-child)]:mb-2 flex-wrap flex items-center justify-center">
      {pageBookData.map((BookData: Book, i: number) => (
        <li key={`BookData-${i}`} className="pl-3">
          <BookPreview
            BookData={BookData}
            linkPrefix={linkPrefix}
            linkSuffix={linkSuffix}
          />
        </li>
      ))}
    </ul>
  );
}

export default function ActivityBookList({
  books,
  linkPrefix,
  linkSuffix,
}: {
  books: Book[];
  linkPrefix: string;
  linkSuffix: string;
}) {
  return (
    <>
      <section className="p-2 mx-auto flex flex-wrap">
        <BookPreviewList
          pageBookData={books}
          linkPrefix={linkPrefix}
          linkSuffix={linkSuffix}
        />
      </section>
    </>
  );
}
