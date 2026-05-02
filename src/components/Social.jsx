"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

export default function Social() {
  return (
    <div className="flex gap-4 bg-white/10 backdrop-blur-lg px-5 py-3 rounded-full border border-white/20 shadow-lg">

      <Link href="https://github.com/GxAniket" target="_blank">
        <FaGithub className="text-3xl text-white hover:scale-125 transition" />
      </Link>

      <Link href="https://www.linkedin.com/in/aniket-sundriyal" target="_blank">
        <FaLinkedin className="text-3xl text-white hover:scale-125 transition" />
      </Link>

      {/* Ye raha aapka naya LeetCode button */}
      <Link href="https://leetcode.com/u/rxyU5V12At/" target="_blank">
        <SiLeetcode className="text-3xl text-white hover:scale-125 transition" />
      </Link>

    </div>
  );
}