import Link from "next/link"
import Image from "next/image"

function ResourceDetails({
  title, blurb, author
}: {
  title: string,
  blurb: string,
  author: string
}) {
  return (
    <div className="mb-2">
      <h1 className="text-2xl font-medium">
        {title}
      </h1>
      <p>{blurb}</p>
      <p className="text-sm">
        {author}
      </p>
    </div>
  )
}

export default async function ResourcesPage() {
  return (
    <div className="container max-w-4xl mx-auto p-2 my-4 card">
      <section className="mb-2">
        <h1 className="text-2xl font-medium">Resources</h1>
        <p>Here&apos;s what else we worked on:</p>
      </section>

      <div className="[&>*:not(:last-child)]:mb-4">
        <section className="w-full">
          <ResourceDetails
            title="CodeKids Picture Book"
            blurb="Entering the world of coding could be the greatest choice of your life. See how embarking on coding adventures changed how Casey and Alex view the world!"
            author="by Merna"
          />

          <div className="flex gap-2 w-full mb-2">
            <div>
              <Image
                src="/book-page1.png"
                alt="Preview Page 1"
                width={1920}
                height={1380}
              />
            </div>
            <div>
              <Image
                src="/book-page8.png"
                alt="Preview Page 8"
                width={1920}
                height={1380}
              />
            </div>
            <div>
              <Image
                src="/book-page9.png"
                alt="Preview Page 9"
                width={1920}
                height={1380}
              />
            </div>
          </div>

          <Link href={"/picture-book.pdf"}>
            <p className="text-blue-500 underline">
              View the entire picture book here!
            </p>
          </Link>
        </section>

        <section>
          <ResourceDetails
            title="Puzzles to Pixels"
            blurb="Learn about the world of Computer Science by watching this video!"
            author="by Anthony"
          />

          <video
            className="rounded-lg"
            src="/anthony-video.mp4"
            controls={true}
          />
        </section>

        <section>
          <ResourceDetails
            title="Sorting Game"
            blurb="Take a look at our in-progress game, where you try to sort squares in ascending order in the smallest amount of steps."
            author="by Yash"
          />

          <video
            className="rounded-lg"
            src="/game-video.mp4"
            controls={true}
          />
        </section>
      </div>
    </div>
  )
}
