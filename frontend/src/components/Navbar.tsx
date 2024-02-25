import { useState } from "react";

interface NavLinkRoute {
  text: string;
  href: string;
}

const navbarLinks: readonly NavLinkRoute[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Activities",
    href: "/activities/1",
  },
];

function NavButton(route: NavLinkRoute) {
  const { text, href } = route;

  return (
    <a href={href}>
      <li
        className={`
        p-2 mx-1 my-2
        transition-colors hover:bg-black/10 hover:text-lime-700
        rounded-md outline-1 outline-neutral-300/20 hover:outline
      `}
      >
        {text}
      </li>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`top-0 sticky w-full px-2 z-[100]`}>
      <div className="flex flex-row justify-between relative h-[60px]">
        <div className="flex flex-row items-center justify-between py-1 sm:py-0">
          <a href="/">
            <img
              src="/kidata.png"
              alt="KIDATA"
              width={1850}
              height={400}
              className="md:mx-2 my-auto w-40"
            />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className={`
            sm:hidden aspect-square w-10 h-auto
            rounded-md outline outline-1 outline-neutral-300
          `}
          >
            <svg className="h-6 w-6 fill-current mx-auto" viewBox="0 0 24 24">
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        <nav
          className={`
          px-1
          bg-stone-800 text-white
          ${open ? "block" : "hidden"}
          sm:block my-auto  sm:py-0
          rounded-b-md font-semibold
          absolute left-1/2 transform -translate-x-1/2
        `}
        >
          <ul className="tablet:mx-auto sm:flex sm:items-center text-center text-lg">
            {navbarLinks.map((route, i) => (
              <NavButton {...route} key={`nav-${i}`} />
            ))}
          </ul>
        </nav>

        <a className="my-auto" href="/login">
          <p
            className={`
            px-3 py-2
            text-neutral-100 text-center text-sm bg-primary-green rounded-md
            transition-shadow duration-200 shadow-black/40 shadow-none
            hover:shadow-black/20 hover:shadow-md
          `}
          >
            Log in
          </p>
        </a>
      </div>
    </header>
  );
}
