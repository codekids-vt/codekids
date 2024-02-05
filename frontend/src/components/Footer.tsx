import Link from "next/link";

function FooterLink({ 
  name, href
}: {
  name: string, 
  href: string
}) {
  return (
    <li className="m-1 p-1 float-right tablet:float-none tablet:inline-block">
      <a href={href}>
        {name}
      </a>
    </li>
  )
}

export default function Footer() {
  return (
    <footer className="flex tablet:flex-col justify-center bottom-0 p-4 bg-white shadow-black shadow z-[100]">
      <span className="flex-1 p-2 tablet:text-center">
        &copy; KiData Project 2023. All Rights Reserved.
      </span>
      <ul className="p-auto my-auto tablet:text-center text-sm">
        {/* 
        <FooterLink name="About" href="/about" />
        <FooterLink name="Contact" href="/contact" />
        <FooterLink name="License" href="/license" /> 
        */}
      </ul>
    </footer>
  );
}
