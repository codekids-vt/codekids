interface PostData {
  image: string;
  postId: string;
  title: string;
  author: string;
  blurb: string;
  link: string;
}

export default function PostPreview({ postData }: { postData: PostData }) {
  return (
    <a href={postData.link}>
      <li className="px-2 py-1.5 bg-white border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-2xl transition-shadow flex flex-row items-center">
        <img
          src={postData.image}
          alt={postData.title}
          width={100}
          height={100}
          className="rounded-xl"
        />
        <div className="flex flex-col gap-1 px-4">
          <h1 className="text-2xl font-semibold">{postData.title}</h1>
          <h2 className="text-sm">{`by ${postData.author}`}</h2>
          <p className="mt-1 text-sm">{postData.blurb}</p>
        </div>
      </li>
    </a>
  );
}
