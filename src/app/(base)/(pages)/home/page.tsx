import Card from "@/components/Card";
// import ViewAllGamesButton from "@/components/ViewAllGamesButton";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <div 
        className="absolute w-full h-full bg-local z-0"
        style={{ 
          backgroundImage: "url(\"/bg-cover-bottom.png\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      <div className="flex flex-col items-center container mx-auto z-10">
        <div className="mt-8">
          <Image
            src="/background.png"
            alt="KIDATA"
            width={500}
            height={300}
            className="mx-auto mb-4"
          />
          <h1 className="pb-8 font-bold text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      {/* <div className="flex flex-col items-center mb-16" id="games">
        <ViewAllGamesButton />
      </div> */}
    </>
  );
}
