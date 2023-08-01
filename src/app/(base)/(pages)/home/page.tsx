import Card from "@/components/Card";
// import ViewAllGamesButton from "@/components/ViewAllGamesButton";

import Image from "next/image";

export default function Home() {
  return (
    <>
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
        <div className="w-full flex flex-col sm:flex-row sm:justify-between max-w-7xl">
          <Card 
            title="Activities"
            blurb="Looking for something to do? Check out our activities geared for both kids and teachers alike!"
            href="/activities/1"
          />
          <Card 
            title="Blockly Demo"
            blurb="Ready to test yourself? Try out our block coding exercises!"
            href="/blockly-demo"
          />
          <Card 
            title="Resources"
            blurb="Check out what other cool things we've been making!"
            href="/resources"
          />
        </div>
      </div>
      {/* <div className="flex flex-col items-center mb-16" id="games">
        <ViewAllGamesButton />
      </div> */}
    </>
  );
}
