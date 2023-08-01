import Card from "@/components/Card";
// import ViewAllGamesButton from "@/components/ViewAllGamesButton";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center container mx-auto z-10">
        <div>
          <Image
            src="/background.png"
            alt="KIDATA"
            width={500}
            height={300}
            className="mx-auto"
          />
          <div className="card p-2 mb-2 max-w-lg text-center">
            <h1 className="text-2xl font-bold">
              Welcome to CodeKids!
            </h1>
            <p>
              <strong>Do you want to learn how to code?</strong> CodeKids has you covered, from activities for students 
              and teachers to interactive code block puzzles!
            </p>
            <p>
              Get started by clicking on any of the categories below!
            </p>
          </div>
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
            href="/blockly/name"
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
