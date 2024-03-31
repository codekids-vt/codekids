import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import PostPreview from "../components/PostPreview";

export default function ActivityPostList() {
  const otherPostsData = [
    {
      image: "/lego-sort-example-clumping.png",
      postId: "picture-book",
      title: "Lego I/O",
      author: "John Doe",
      blurb: "An input/output exercise using Legos.",
      link: "/article/lego",
    },
    {
      image:
        "https://www.gstatic.com/images/branding/product/1x/forms_512dp.png",
      postId: "picture-book",
      title: "Codekids Teacher Survey",
      author: "CodeKids Team",
      blurb: "Survey to help us improve our program!",
      link: "https://forms.gle/zBKvsawuamKYZ5b88",
    },
  ];

  return (
    <div>
      <Background />
      <Navbar />
      <div className="flex flex-col items-center container mx-auto z-10 min-h-screen">
        <section className="p-2 mx-auto w-1/2">
          <ul className="flex flex-col gap-2">
            {otherPostsData?.length > 0 &&
              otherPostsData.map((postData, i: number) => (
                <PostPreview postData={postData} key={`postData-${i}`} />
              ))}
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
}
