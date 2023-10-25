import Link from "next/link";

import { GET as routeHandler } from "../../../../api/activity/preview/[page]/route";

import ActivityTag from "@/components/ActivityTag";

import joinClasses from "@/util/joinClasses";

import { Book } from "@/util/BookData";
import { books } from "@/app/book/[id]/[pagenum]/books";

function BookPreview({ BookData }: { BookData: Book }) {
  return (
    <li className={joinClasses(
      "px-2 py-1.5 card",
      "shadow shadow-transparent hover:shadow-black/20",
      "transition-shadow"
    )}>
      <Link href={`/book/${BookData.BookId}/0`}>
        <h1 className="text-2xl font-medium">{BookData.title}</h1>
        <p className="mt-1 text-sm">{BookData.blurb}</p>
      </Link>
    </li>
  )
}

function BookPreviewList({ pageBookData }: { pageBookData: Book[] }) {
  return (
    <ul className="[&>*:not(:last-child)]:mb-2">
      {
        pageBookData.map((BookData: Book, i: number) => (
          <BookPreview BookData={BookData} key={`BookData-${i}`} />
        ))
      }
    </ul>
  );
}

export default async function ActivityBookList({
  params
}: {
  params: { page: string }
}) {
  const allBooks: Book[] = books as Book[];

  return (
    <>
      <section className="p-2 mx-auto max-w-6xl">
        {
          allBooks?.length > 0
            ? <BookPreviewList pageBookData={allBooks} />
            : (
              <h1 className="text-center text-xl font-medium">
                Looks like there&apos;s nothing here... page {params.page} doesn&apos;t have anything!
              </h1>
            )
        }
      </section>
    </>
  )
}
