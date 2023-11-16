import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";

interface PostData {
  image: string,
  postId: string,
  title: string,
  author: string,
  blurb: string,
  link: string,
}

function PostPreview({ postData }: { postData: PostData }) {
  return (
    <Link href={postData.link}>
      <li className="px-2 py-1.5 bg-white border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-2xl transition-shadow flex flex-row items-center">
        <Image src={postData.image} alt={postData.title} width={100} height={100} className="rounded-xl" />
        <div className="flex flex-col gap-1 px-4">
          <h1 className="text-2xl font-semibold">{postData.title}</h1>
          <h2 className="text-sm">{`by ${postData.author}`}</h2>
          <p className="mt-1 text-sm">{postData.blurb}</p>
        </div>
      </li>
    </Link>
  )
}

function getActivitiesHeaders(): PostData[] {
  return fs.readdirSync("public/activities").map((fileName, idx) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = `public/activities/${fileName}`;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      link: `/activity/${idx + 1}`,
      ...(matterResult.data as {
        image: string,
        postId: string,
        title: string,
        author: string,
        blurb: string,
      }),
    };
  });
}

export default function ActivityPostList({ params }: { params: { page: string } }) {
  const allActivitiesHeaders = getActivitiesHeaders();

  const rushHourPostData = {
    image: "/activity-images/rush-hour-preview.png",
    postId: "rush-hour",
    title: "Interactive Rush Hour",
    author: "Namita & Noah",
    blurb: "Rush Hour is a puzzle game where you have to get the red car out of the parking lot.",
    link: "/activity/rush-hour",
  }

  return (
    <>
      <section className="p-2 mx-auto max-w-6xl">
        <ul className="flex flex-col gap-2">
          {allActivitiesHeaders?.length > 0 &&
            (allActivitiesHeaders.map((postData: PostData, i: number) => (
              <PostPreview postData={postData} key={`postData-${i}`} />
            ))
            )}
          <PostPreview postData={rushHourPostData} key={`rushHour`} />
        </ul>
        {allActivitiesHeaders?.length === 0 && (
          <h1 className="text-center text-xl font-medium">
            Looks like there&apos;s nothing here... page {params.page} doesn&apos;t have anything!
          </h1>
        )}
      </section>
    </>
  )
}