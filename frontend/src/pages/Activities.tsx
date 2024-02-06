import { useParams } from "react-router-dom";
import matter from "gray-matter";
import path from 'path';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";

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
    <a href={postData.link}>
      <li className="px-2 py-1.5 bg-white border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-2xl transition-shadow flex flex-row items-center">
        <img src={postData.image} alt={postData.title} width={100} height={100} className="rounded-xl" />
        <div className="flex flex-col gap-1 px-4">
          <h1 className="text-2xl font-semibold">{postData.title}</h1>
          <h2 className="text-sm">{`by ${postData.author}`}</h2>
          <p className="mt-1 text-sm">{postData.blurb}</p>
        </div>
      </li>
    </a>
  )
}

// function getActivitiesHeaders(): PostData[] {
//   console.log(process.cwd())
//   return fs.readdirSync(path.join(process.cwd(), "_activities")).map((fileName, idx) => {
//     const id = fileName.replace(/\.md$/, "");
//     const fullPath = path.join(process.cwd(), "_activities", fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const matterResult = matter(fileContents);

//     return {
//       id,
//       link: `/activity/${idx + 1}`,
//       ...(matterResult.data as {
//         image: string,
//         postId: string,
//         title: string,
//         author: string,
//         blurb: string,
//       }),
//     };
//   });
// }

export default function ActivityPostList() {
  let { pageStr } = useParams();
  // const allActivitiesHeaders = getActivitiesHeaders();

  const otherPostsData = [
    {
      image: "/lego-sort-example-clumping.png",
      postId: "picture-book",
      title: "Lego I/O",
      author: "John Doe",
      blurb: "An input/output exercise using Legos.",
      link: "/lego-sort.md",
    },
    {
      image: "/book-page1.png",
      postId: "picture-book",
      title: "CodeKids Picture Book",
      author: "Merna",
      blurb: "Entering the world of coding could be the greatest choice of your life. See how embarking on coding adventures changed how Casey and Alex view the world!",
      link: "/picture-book.pdf",
    },
    {
      image: "/anthony-video-preview.png",
      postId: "picture-book",
      title: "Puzzles to Pixels",
      author: "Anthony",
      blurb: "Learn about the world of Computer Science by watching this video!",
      link: "/anthony-video.mp4",
    },
    {
      image: "https://www.gstatic.com/images/branding/product/1x/forms_512dp.png",
      postId: "picture-book",
      title: "Codekids Teacher Survey",
      author: "CodeKids Team",
      blurb: "Survey to help us improve our program!",
      link: "/https://forms.gle/zBKvsawuamKYZ5b88",
    },
  ]

  return (
    <div>
      <Navbar />
      <Background />
      <div className="flex flex-col items-center container mx-auto z-10 min-h-screen">
        <section className="p-2 mx-auto max-w-6xl">
          <ul className="flex flex-col gap-2">
            {/* {allActivitiesHeaders?.length > 0 &&
            (allActivitiesHeaders.map((postData: PostData, i: number) => (
              <PostPreview postData={postData} key={`postData-${i}`} />
            ))
            )} */}
            {otherPostsData?.length > 0 &&
              (otherPostsData.map((postData: PostData, i: number) => (
                <PostPreview postData={postData} key={`postData-${i}`} />
              ))
              )}
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  )
}