"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

export default function Social() {
  return (
    <div className="flex items-center gap-5 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 shadow-lg">

      {/* GitHub */}
      <Link
        href="https://github.com/GxAniket"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <FaGithub className="text-3xl text-white hover:scale-125 hover:text-cyan-400 transition-all duration-300" />
      </Link>

      {/* LinkedIn */}
      <Link
        href="https://www.linkedin.com/in/aniket-sundriyal"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin className="text-3xl text-white hover:scale-125 hover:text-cyan-400 transition-all duration-300" />
      </Link>

      {/* LeetCode */}
      <Link
        href="https://leetcode.com/u/rxyU5V12At/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeetCode"
      >
        <SiLeetcode className="text-3xl text-white hover:scale-125 hover:text-cyan-400 transition-all duration-300" />
      </Link>

      {/* Email */}
      <Link
        href="mailto:sundriyalaniket@gmail.com"
        aria-label="Email"
      >
        <MdEmail className="text-3xl text-white hover:scale-125 hover:text-cyan-400 transition-all duration-300" />
      </Link>

    </div>
  );
}
