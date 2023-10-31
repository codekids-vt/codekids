import Image from "next/image";
import ActivityBookList from "../books/[page]/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center container mx-auto z-10">
        <div>
          <Image
            src="/background.png"
            alt="KIDATA"
            width={250}
            height={150}
            className="mx-auto"
          />
          <div className="card p-2 mb-2 max-w-lg text-center">
            <h1 className="text-2xl font-bold">
              Welcome to CodeKids!
            </h1>
          </div>
        </div>
        <ActivityBookList></ActivityBookList>
      </div>
    </>
  );
}
