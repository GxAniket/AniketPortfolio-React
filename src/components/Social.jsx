
"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

export default function Social() {
  const iconStyle =
    "relative z-10 text-3xl text-white transition-all duration-300 ease-out group-hover:scale-125 group-hover:text-cyan-300";

  const linkStyle =
    "group relative isolate flex items-center justify-center overflow-hidden rounded-full p-1 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)] active:scale-95";

  return (
    <div className="flex items-center gap-5 rounded-full border border-white/20 bg-white/10 px-6 py-3 shadow-lg backdrop-blur-lg">

      {/* GitHub */}
      <Link
        href="https://github.com/GxAniket"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={linkStyle}
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
        <FaGithub className={`${iconStyle} group-hover:text-emerald-400`} />
      </Link>

      {/* LinkedIn */}
      <Link
        href="https://www.linkedin.com/in/aniket-sundriyal"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={linkStyle}
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-blue-300/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
        <FaLinkedin className={`${iconStyle} group-hover:text-blue-400`} />
      </Link>

      {/* LeetCode */}
      <Link
        href="https://leetcode.com/u/rxyU5V12At/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeetCode"
        className={linkStyle}
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-orange-300/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
        <SiLeetcode className={`${iconStyle} group-hover:text-orange-400`} />
      </Link>

      {/* Email */}
      <Link
        href="mailto:sundriyalaniket@gmail.com"
        aria-label="Email"
        className={linkStyle}
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
        <MdEmail className={`${iconStyle} group-hover:text-cyan-400`} />
      </Link>

    </div>
  );
}
