import { Book } from "../api/models/Book";

export function BookPreview({
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
            src={book.bookCover ? book.bookCover : "/color_2.png"}
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

function LoadingBookPreview() {
  // same as book but gray and pulse tailwind
  return (
    <div className="h-[325px] w-[275px] relative">
      <div className="h-[325px] w-[275px] rounded-2xl animate-pulse">
        <div className="bg-gray-400 w-[275px] h-[280px] rounded-2xl" />
      </div>
    </div>
  );
}

function BookPreviewList({
  pageBookData,
  linkPrefix,
  linkSuffix,
  loading,
  showPublished,
}: {
  pageBookData: Book[];
  linkPrefix: string;
  linkSuffix: string;
  loading: boolean;
  showPublished: boolean;
}) {
  const emptyBookData = Array.from({ length: 6 }, () => ({}));
  return (
    <ul className="flex-wrap gap-2 flex items-center justify-center">
      {!loading
        ? pageBookData.map((BookData: Book, i: number) => (
            <li key={`BookData-${i}`} className="pl-3">
              <BookPreview
                BookData={BookData}
                linkPrefix={linkPrefix}
                linkSuffix={linkSuffix}
              />
              {showPublished && (
                <div
                  className={`${BookData.published ? "text-green-500 border-green-500" : "text-red-500 border-red-500"} bg-white p-1 rounded-full border-2 text-center`}
                >
                  {BookData.published ? "Published" : "Not Published"}
                </div>
              )}
            </li>
          ))
        : emptyBookData.map((_, i) => (
            <li key={`BookData-${i}`} className="pl-3">
              <LoadingBookPreview />
            </li>
          ))}
    </ul>
  );
}

export default function ActivityBookList({
  books,
  linkPrefix,
  linkSuffix,
  loading,
  showPublished,
  isUnplugged,
}: {
  books: Book[];
  linkPrefix: string;
  linkSuffix: string;
  loading?: boolean;
  showPublished?: boolean;
  isUnplugged?: boolean;
}) {
  return (
    <>
      <section className="p-2 mx-auto flex flex-wrap">
        <BookPreviewList
          pageBookData={books}
          linkPrefix={linkPrefix}
          linkSuffix={linkSuffix}
          loading={loading === undefined ? false : loading}
          showPublished={showPublished === undefined ? false : showPublished}
        />
      </section>
    </>
  );
}

export function BookPreviewUnplugged({ BookData }: { BookData: Array<any> }) {
  return (
    <div className="flex flex-wrap gap-4">
      {BookData.map((book, index) => (
        <div key={index} className="h-[325px] w-[275px] relative">
          <a
            href={`${book.link.includes("http") ? book.link : `/${book.link}`}`}
          >
            <div className="h-[325px] w-[275px] hover:shadow-2xl rounded-2xl hover:-translate-y-1">
              <img
                src={book.bookCover ? book.bookCover : "/color_2.png"}
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
      ))}
    </div>
  );
}
