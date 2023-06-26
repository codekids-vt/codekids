import Image from "next/image";
import Link from "next/link";

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
    text: "Lessons",
    href: "/#lessons"
  },
];

function NavButton(route: NavLinkRoute) {
  const { text, href } = route;

  return (
    <Link href={href}>
      <li className={`
        inline-block p-2 m-1
        transition-colors hover:bg-black/10 hover:text-lime-700
        rounded-md outline-1 outline-neutral-300 hover:outline
      `}>
        {text}
      </li>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full p-2 bg-white shadow-sm shadow-black/20">
      <div className="container mx-auto flex flex-row">
        <div className="mx-6 my-auto w-40">
          <Image
            src="/kidata.png"
            width={1850}
            height={400}
            alt="KIDATA"
          />
        </div>

        <div className="flex-grow my-auto">
          <ul className="text-sm text-right">
            { navbarLinks.map((route) => <NavButton {...route} />) }
            <Link href="/login">
              <li className={`
                inline-block px-3 py-2 ml-2
                rounded-md bg-lime-500 outline outline-1 outline-lime-600/60
                transition-shadow duration-500 shadow-lime-500/20 shadow-md 
                hover:shadow-lime-500/50 hover:shadow-lg
              `}>
                Play now!
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
