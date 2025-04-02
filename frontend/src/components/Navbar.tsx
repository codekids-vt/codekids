import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AccountType } from "../api";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";

interface NavLinkRoute {
  text: string;
  href: string;
}

const baseLinks: readonly NavLinkRoute[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "About Us",
    href: "/about_us",
  },
  {
    text: "News",
    href: "/news",
  },
];

const teacherLinks: readonly NavLinkRoute[] = [
  ...baseLinks,
  {
    text: "Teacher Resources",
    href: "/teacher_resources",
  },
  {
    text: "Book Editor",
    href: "/edit_books",
  },
];

function NavButton(route: NavLinkRoute) {
  const { text, href } = route;

  return (
    <a href={href}>
      <li
        className="p-2 mx-1 my-2 transition-colors hover:bg-black/10 hover:text-lime-700 rounded-md outline-1 outline-neutral-300/20 hover:outline"
      >
        {text}
      </li>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks =
    user?.type === AccountType.TEACHER ? teacherLinks : baseLinks;

  return (
    <header className="top-0 sticky w-full px-2 z-[100] bg-white">
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
            className="sm:hidden aspect-square w-10 h-auto rounded-md outline outline-1 outline-neutral-300"
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
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        <nav
          className="px-1 bg-stone-800 text-white hidden sm:block my-auto sm:py-0 rounded-b-md font-semibold absolute left-1/2 transform -translate-x-1/2"
        >
          <ul className="tablet:mx-auto sm:flex sm:items-center text-center text-lg">
            {navLinks.map((route, i) => (
              <NavButton {...route} key={`nav-${i}`} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {isHomePage && (
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              {darkMode ? (
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}

          {!user ? (
            <a className="my-auto" href="/login">
              <p
                className="px-3 py-2 text-neutral-100 text-center text-sm bg-primary-green rounded-md transition-shadow duration-200 hover:shadow-black/20 hover:shadow-md"
              >
                Log in
              </p>
            </a>
          ) : (
            <div className="flex flex-row p-4 gap-2 items-center">
              <div className="div text-xl font-semibold">Hi {user.name}!</div>
              <button
                onClick={logout}
                className="px-3 py-2 bg-primary-green text-neutral-100 text-center text-sm rounded-md transition-shadow duration-200 hover:shadow-black/20 hover:shadow-md"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}