"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
  const pathName = usePathname();

  return (
    <Link
      href={link.url}
      className={`px-3 py-1 rounded ${
        pathName === link.url
          ? "bg-black text-white"
          : "hover:text-cyan-400"
      }`}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;