import Link from "next/link";

import { GET as routeHandler } from "../../../../api/activity/preview/[page]/route";

import ActivityTag from "@/components/ActivityTag";

import joinClasses from "@/util/joinClasses";
import PostData from "@/util/PostData";

function PostPreview({ postData }: { postData: PostData }) {
  return (
    <li className={joinClasses(
      "px-2 py-1.5 rounded-md outline outline-1 outline-black/20",
      "shadow shadow-transparent hover:shadow-black/20",
      "transition-shadow"
    )}>
      <Link href={`/activity/${postData.postId}`}>
        <h1 className="text-2xl font-medium">{postData.title}</h1>
        {/* <h2 className="text-sm">{`by ${postData.author}`}</h2> */}

        <ul className="[&>*:not(:last-child)]:mr-1">
          {
            postData.tags.map((tagData: { name: string, color: string | undefined }) => (
              <li className="inline-block">
                <ActivityTag name={tagData.name} color={tagData.color} />
              </li>                        
            ))
          }
        </ul>

        <p className="mt-1 text-sm">{postData.blurb}</p>
      </Link>
    </li>
  )
}

function PostPreviewList({ pagePostData }: { pagePostData: PostData[] }) {
  return (
    <ul className="[&>*:not(:last-child)]:mb-2">
      {
        pagePostData.map((postData: PostData) => (
          <PostPreview postData={postData} />
        ))
      }
    </ul>
  );
}

export default async function ActivityPostList({
  params
}: {
  params: { page: string }
}) {
  const response = await routeHandler(null, { params });
  const pagePostData = await response.json();

  return (
    <>
      <section className="p-2">
        {
          pagePostData?.length > 0
            ? <PostPreviewList pagePostData={pagePostData} />
            : (
              <h1 className="text-center text-xl font-medium">
                Looks like there's nothing here... page {params.page} doesn't have anything!
              </h1>
            )
        }
      </section>
    </>
  )
}
