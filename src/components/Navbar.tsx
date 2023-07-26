"use client"

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import joinClasses from "@/util/joinClasses";

interface NavLinkRoute {
  text: string;
  href: string;
}

const navbarLinks: readonly NavLinkRoute[] = [
  {
    text: "Home",
    href: "/"
  },
  {
    text: "Games",
    href: "/#games"
  },
  {
    text: "Activities",
    href: "/activities/1"
  },
  {
    text: "Blockly Demo",
    href: "/blockly-demo"
  },
];

function NavButton(route: NavLinkRoute) {
  const { text, href } = route;

  return (
    <Link href={href}>
      <li className={`
        p-2 mx-1 my-2
        transition-colors hover:bg-black/10 hover:text-lime-700
        rounded-md outline-1 outline-neutral-300 hover:outline
      `}>
        {text}
      </li>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full px-2 bg-white shadow-sm shadow-black/20 z-[100]">
      <div className="container mx-auto sm:flex justify-between">
        <div className="flex flex-row items-center justify-between">
          <Image
            src="/kidata.png"
            alt="KIDATA"
            width={1850}
            height={400}
            className="md:mx-2 my-auto w-40"
          />
          <button onClick={() => setOpen(!open)} className={`
            sm:hidden aspect-square w-10 h-auto
            rounded-md outline outline-1 outline-neutral-300
          `}>
            <svg className="h-6 w-6 fill-current mx-auto" viewBox="0 0 24 24">
              {
                open
                  ? <path fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                  : <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
              }
            </svg>
          </button>
        </div>
        <nav className={joinClasses(
          open ? "block" : "hidden", 
          "sm:block my-auto pb-2 sm:pb-0"
        )}>
          <ul className="tablet:container tablet:mx-auto sm:flex sm:items-center text-center text-sm">
            { 
              navbarLinks.map((route, i) => (
                <NavButton {...route} key={`nav-${i}`} />
              )) 
            }
            <Link href="/login">
              <li key="nav-play" className={`
                m-1 px-3 py-2
                rounded-md bg-lime-500 outline outline-1 outline-lime-600/60
                transition-shadow duration-500 shadow-lime-500/20 shadow-md 
                hover:shadow-lime-500/50 hover:shadow-lg
              `}>
                Play now!
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

/*
<li key="nav-play" className={`
  inline-block px-3 py-2 ml-2
  rounded-md bg-lime-500 outline outline-1 outline-lime-600/60
  transition-shadow duration-500 shadow-lime-500/20 shadow-md 
  hover:shadow-lime-500/50 hover:shadow-lg
`}>
  Play now!
</li>

<Link href={href}>
  <li className={`
    inline-block p-2 m-1
    transition-colors hover:bg-black/10 hover:text-lime-700
    rounded-md outline-1 outline-neutral-300 hover:outline
  `}>
    {text}
  </li>
</Link>
*/
