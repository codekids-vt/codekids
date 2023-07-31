import Link from "next/link";

import { GET as routeHandler } from "../../../../api/activity/[id]/route";

import ActivityTag from "@/components/ActivityTag";
import MarkdownView from "@/components/MarkdownView";

import PostData from "@/util/PostData";

function ActivityPostDisplay({
  postData, id
}: {
  postData: PostData,
  id: string
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="card p-2 mb-2">
        <section className="mb-2">
          <h1 className="text-3xl font-medium">{postData.title}</h1>
          <h2 className="text-sm">{`by ${postData.author}`}</h2>
        </section>

        <ul className="[&>*:not(:last-child)]:mr-1">
          {
            postData.tags.map((
              { name, color }: { name: string, color: string | undefined }, 
              i: number
            ) => (
              <li className="inline-block" key={`tag-${i}`}>
                <ActivityTag name={name} color={color} />
              </li>
            ))
          }
        </ul>
      </section>

      <section className="card">
        <MarkdownView content={postData.content} />
        <Link href={`/activity-raw/${id}`}>
          <p className="p-2 text-center text-blue-500 underline underline-offset-1">
            View printable format
          </p>
        </Link>
      </section>

      {/*
      <section className="card px-2 py-1.5">
        <h1 className="text-lg font-medium">{postData.author} provided resources:</h1>

        <ul className="list-disc [&>*]:ml-8">
          <li>
            <Link href="">
              <p className="text-blue-500 underline underline-offset-1">
                Student Packet
              </p>
            </Link>
          </li>
        </ul>
      </section>
      */}
    </div>
  );
}

export default async function ActivityPage({ params }: { params: { id: string } }) {
  const response = await routeHandler(null, { params });
  const postData = await response.json();

  return (
    <div className="p-2">
      {
        postData
          ? <ActivityPostDisplay postData={postData} id={params.id} />
          : (
            <h1 className="text-center text-lg font-medium">
              We couldn&apos;t find anything for activity {params.id} here!
            </h1>
          )
      }
    </div>
  )
}
