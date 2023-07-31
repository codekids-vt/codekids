import Image from "next/image";
import Link from "next/link";

function Card({ 
  title, blurb, href 
}: {
  title: string,
  blurb: string,
  href: string
}) {
    return (
      <Link href={href}>
        <div className="max-w-sm m-2 drop-shadow-md">
          <Image
            src="/GameImage_1.png"
            alt="Game card image"
            width={300}
            height={300}
            className="w-full object-cover rounded-lg"
          />
          <div className="px-4 py-2.5 mx-2 bg-cardGreen rounded-b">
            <h1 className="font-medium text-lg mb-2">
              {title}
            </h1>
            <p className="text-gray-700 text-base">
              {blurb}
            </p>
          </div>
        </div>
      </Link>
    );
  }
  
  export default Card;
  