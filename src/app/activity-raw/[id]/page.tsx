import { GET as routeHandler } from "../../api/activity/[id]/route";
import MarkdownView from "@/components/MarkdownView";

export default async function ActivityPage({ params }: { params: { id: string } }) {
  const response = await routeHandler(null, { params });
  const postData = await response.json();

  return (
    <div className="markdown-viewer">
      {/*
      <section>
        <h1>{postData.title}</h1>
        <div>
          {postData.author}
        </div>
      </section>
      */}
      <MarkdownView content={postData.content} />
    </div>
  )
}
