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
        {/* <Image
          src="/bg-cover-top.png"
          alt="grey gradient background"
          width={1675}
          height={653}
          className="bg-cover bg-center"
        ></Image> */}
        <Image
          src="/background.png"
          alt="KIDATA"
          width={764}
          height={503}
          className="pb-20"
        />
        <h1 className="pb-80 font-bold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h1>
      </div>
      <div className="flex justify-between items-center pb-10">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex flex-col items-center">
        <ViewAllGamesButton />
      </div>
    </>
  );
}
