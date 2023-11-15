import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";

import MarkdownView from "@/components/MarkdownView";

interface PostData {
  postId: string,
  title: string,
  author: string,
  blurb: string,
  content: string,
}

function ActivityPostDisplay({
  postData, id
}: {
  postData: PostData,
  id: string
}) {
  return (
    <div className="mx-auto max-w-6xl gap-2">
      <section className="px-2 py-1.5 card shadow shadow-transparent hover:shadow-black/20 transition-shadow">
        <Link href={`/activity/${postData.postId}`}>
          <h1 className="text-2xl font-medium">{postData.title}</h1>
          <h2 className="text-sm">{`by ${postData.author}`}</h2>
          <p className="mt-1 text-sm">{postData.blurb}</p>
        </Link>
      </section>

      <section className="p-2 mb-2 card shadow shadow-transparent hover:shadow-black/20 transition-shadow">
        <MarkdownView content={postData.content} />
        <Link href={`/activity-raw/${id}`}>
          <p className="p-2 text-center text-blue-500 underline underline-offset-1">
            View printable format
          </p>
        </Link>
      </section>
    </div>
  );
}

function getActivity(id: string): PostData | undefined {
  let mdFiles = fs.readdirSync("public/activities").map((fileName) => {
    const fileNameId = fileName.replace(/\.md$/, "");
    const fullPath = `public/activities/${fileName}`;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      fileNameId,
      ...(matterResult.data as {
        postId: string,
        title: string,
        author: string,
        blurb: string,
      }),
      content: matterResult.content,
    };
  })

  // double equals because they might be different types
  let postData = mdFiles.find((post) => post.postId == id);
  return postData;
}

export default function ActivityPage({ params }: { params: { id: string } }) {

  const postData = getActivity(params.id);

  return (
    <div className="p-2">
      {postData &&
        <ActivityPostDisplay postData={postData} id={params.id} />
      }
      {!postData && (
        <h1 className="text-center text-lg font-medium">
          We couldn&apos;t find anything for activity {params.id} here!
        </h1>
      )}
    </div>
  )
}
