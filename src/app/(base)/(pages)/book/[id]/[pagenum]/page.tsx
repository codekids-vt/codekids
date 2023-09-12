import Link from "next/link";

// import { GET as routeHandler } from "../../../../api/activity/[id]/route";

import { Book, Page } from "@/util/BookData";

import Image from "next/image";

function BookImage({ image }: { image: string }) {
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Image src={image} alt="book image" width={300} height={500} />
    </div>
  );
}

function BookContent({ content }: { content: string[] }) {
  return (
    <div className="flex flex-grow items-center justify-center bg-gray-400 rounded-2xl">
      <ul className="flex flex-col">
        {content.map((line: string, i: number) => (
          <li className="text-center" key={`line-${i}`}>
            {line}
          </li>
        ))
        }
      </ul>
    </div>
  );
}


function ActivityBookDisplay({
  page, id
}: {
  page: Page,
  id: string
}) {
  return (
    <div className=" flex flex-row justify-between flex-grow bg-white rounded-xl shadow-xl p-2">
      <BookImage image={page.image} />
      <BookContent content={page.content} />
    </div>
  );
}

export default async function ActivityPage({ params }: { params: { id: string, pagenum: string } }) {
  // const response = await routeHandler(null, { params });
  const book: Book = {
    BookId: 1,
    title: "Book 1 test",
    blurb: "some blurb",
    author: "Dev",
    pages: [
      {
        content: ["This is timmy",
          "This is timmy",
        ],
        image: "/lego-sort-example-clumping.png",
      },
      {
        content: ["This is the Title of page 2",
          "Some content about page 2"],
        image: "/lego-sort-example-clumping.png",
      },
    ],
  }
  const pageNum = parseInt(params.pagenum)
  const page = book.pages[pageNum]

  return (
    <div className="p-2 flex flex-col flex-grow h-[52rem]" >
      {book && <ActivityBookDisplay page={page} id={params.id} />}
      {!book &&
        <h1 className="text-center text-lg font-medium">
          We couldn't find anything for activity {params.id} here!
        </h1 >
      }
      {/* next and back buttons */}
      <div className="p-2">
        <div className="flex flex-row justify-between">
          <Link href={`/book/${params.id}/${pageNum - 1}`}>
            <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold py-2 px-4 rounded-full">
              Back
            </button>
          </Link>
          <p>  {pageNum} </p>
          <Link href={`/book/${params.id}/${pageNum + 1}`}>
            <button className="bg-primary-green hover:bg-hover-green hover:shadow-2xl text-white font-bold py-2 px-4 rounded-full">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div >
  )
}
