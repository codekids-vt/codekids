import Link from "next/link";
import Image from "next/image";
import { Book } from "@/util/BookData";
import { books } from "../../../../book/[id]/[pagenum]/books";

function BookPreview({ BookData }: { BookData: Book }) {
  return (
    <div className="h-[400px] w-[350px] relative">
      <Link href={`/book/${BookData.BookId}/0`}>
        <div className="h-[380px] w-[325px] shadow-md hover:shadow-2xl rounded-2xl hover:-translate-y-1">
          <Image src={BookData.bookCover} width={325} height={300} alt={`Book Image-Background`} className="absolute" />
          <div className="relative top-24 left-8 w-60 h-72 flex-col flex items-center p-2 text-center">
            <Image src={BookData.cover ? BookData.cover : BookData.pages[0].image} width={125} height={125} alt={`Book Image-${BookData.title}`} className="rounded-2xl" />
            <h1 className="text-2xl text-black font-semibold">{BookData.title}</h1>
            <p className="mt-1 text-sm text-black">{BookData.blurb}</p>
          </div>
        </div>
      </Link>
    </div>

  )
}

function BookPreviewList({ pageBookData }: { pageBookData: Book[] }) {
  return (
    <ul className="[&>*:not(:last-child)]:mb-2 flex-wrap flex items-center justify-center">
      {
        pageBookData.map((BookData: Book, i: number) => (
          <BookPreview BookData={BookData} key={`BookData-${i}`} />
        ))
      }
    </ul>
  );
}

export default async function ActivityBookList() {
  const allBooks: Book[] = books as Book[];

  return (
    <>
      <section className="p-2 mx-auto flex flex-wrap">
        <BookPreviewList pageBookData={allBooks} />
      </section>
    </>
  )
}
