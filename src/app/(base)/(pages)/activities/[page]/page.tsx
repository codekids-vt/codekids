import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";

interface PostData {
  postId: string,
  title: string,
  author: string,
  blurb: string,
}

function PostPreview({ postData }: { postData: PostData }) {
  return (
    <li className="px-2 py-1.5 card shadow shadow-transparent hover:shadow-black/20 transition-shadow">
      <Link href={`/activity/${postData.postId}`}>
        <h1 className="text-2xl font-medium">{postData.title}</h1>
        <h2 className="text-sm">{`by ${postData.author}`}</h2>
        <p className="mt-1 text-sm">{postData.blurb}</p>
      </Link>
    </li>    
  )
}

function PostPreviewList({ postData }: { postData: PostData[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {postData.map((postData: PostData, i: number) => (
        <PostPreview postData={postData} key={`postData-${i}`} />
      ))}
    </ul>
  );
}

function getActivitiesHeaders(): PostData[] {
  return fs.readdirSync("public/activities").map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = `public/activities/${fileName}`;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as {
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
  return (
    <>
      <section className="p-2 mx-auto max-w-6xl">
        {allActivitiesHeaders?.length > 0 &&
          <PostPreviewList postData={allActivitiesHeaders} />
        }
        {allActivitiesHeaders?.length === 0 && (
          <h1 className="text-center text-xl font-medium">
            Looks like there&apos;s nothing here... page {params.page} doesn&apos;t have anything!
          </h1>
        )}
      </section>
    </>
  )
}