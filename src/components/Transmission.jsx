
"use client";

import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

function Transmission() {
  return (
    <div className="flex gap-4">

      {/* DOWNLOAD RESUME — EMERALD HOVER */}
      <a
        href="/Aniket_Sundriyal_Resume.pdf"
        download="Aniket_Sundriyal_Resume.pdf"
        className="group relative isolate flex overflow-hidden rounded-full ring-1 ring-white/50 bg-black p-4 text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.08] hover:ring-emerald-400 hover:shadow-[0_8px_25px_rgba(16,185,129,0.35)] active:translate-y-0 active:scale-95"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />

        <span className="relative z-10 flex items-center">
          Download Resume
          <FiDownload className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-y-1 group-hover:text-emerald-400" />
        </span>
      </a>

      {/* CONTACT ME — CYAN / BLUE HOVER */}
      <Link
        href="/contact"
        className="group relative isolate flex overflow-hidden rounded-full bg-white p-4 font-semibold text-black transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.08] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:shadow-[0_8px_28px_rgba(6,182,212,0.45)] active:translate-y-0 active:scale-95"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />

        <span className="relative z-10 flex items-center">
          Contact Me
          <IoIosSend className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>

    </div>
  );
}

export default Transmission;
