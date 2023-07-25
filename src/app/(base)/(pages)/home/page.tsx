import Card from "@/components/Card";
import ViewAllGamesButton from "@/components/ViewAllGamesButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        className="flex flex-col items-center bg-local"
        style={{ backgroundImage: `url('/bg-cover-bottom.png')` }}
      >
        <Image
          src="/background.png"
          alt="KIDATA"
          width={500}
          height={300}
          className="pb-20"
        />
        <h1 className="pb-80 font-bold font-press">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h1>
      </div>
      <div className="flex justify-between items-center pt-20 pb-10 px-10">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex flex-col items-center mb-16">
        <ViewAllGamesButton />
      </div>
    </>
  );
}
