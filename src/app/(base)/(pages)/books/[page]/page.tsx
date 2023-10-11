import Link from "next/link";

import { GET as routeHandler } from "../../../../api/activity/preview/[page]/route";

import ActivityTag from "@/components/ActivityTag";

import joinClasses from "@/util/joinClasses";

import { Book } from "@/util/BookData";

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
  const books: Book[] = [
    {
      BookId: 1,
      title: "Book 1 test",
      blurb: "some blurb",
      author: "Dev",
      pages: [
        {
          content: ["This is timmy",
            "This is timmy",
          ],
          image: "page_1.png",
        },
        {
          content: ["This is the Title of page 2",
            "Some content about page 2"],
          image: "page_2.png",
        },
      ],
    },
    {
      BookId: 2,
      title: "Variables With Coloring",
      blurb: "Learn about different variables types, coloring the Hokie Bird!",
      author: "Dev",
      pages: [
        {
          content: ["In this book we will discover how to drag and drop different colors into variables",
            "We will also learn how to manually complete vairables!",
          ],
          image: "HokieBird.png",
        },
        {
          content: ["Here you are able to drag and drop the different colors into the three differnt parts of the Hokie Bird.",
            "The Hokie Bird is split into three parts; a head, a body, and the legs.",
            "Try dragging different colors and see the changes happen live!"
          ],
          image: "HokieBirdActivity",
        },
      ],
    },
    {
      BookId: 3,
      title: "If-condition and For-loop with HokieBird Maze",
      blurb: "Drap and drop exercise",
      author: "Dev",
      pages: [
        {
          content: ["In this book we will discover how to drag and drop different colors into variables",
          "We will also learn how to manually complete vairables!",
        ],
        image: "/LostHokieBird.png",
        }
      ]
    },
    {
      BookId: 4,
      title: "If-condition and For-loop with HokieBird Maze",
      blurb: "Code Completion",
      author: "Dev",
      pages: [
        {
          content: ["In this book we will discover how to drag and drop different colors into variables",
            "We will also learn how to manually complete vairables!",
          ],
          image: "/LostHokieBird.png",
        }
      ]
    },
    {
      BookId: 4,
      title: "IO Hand and Hand Park",
      blurb: "Learning about IO and how to use it in a program",
      author: "Prapti",
      pages: [
      ]
    }
  ] as Book[]

  // const pageBookData = [bookData]

  return (
    <>
      <section className="p-2 mx-auto max-w-6xl">
        {
          books?.length > 0
            ? <BookPreviewList pageBookData={books} />
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
