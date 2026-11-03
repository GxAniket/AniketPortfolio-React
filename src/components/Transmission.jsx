"use client";
import React from "react";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

function Transmission() {
  return (
    <div className="flex gap-4">
      {/* Download Resume button */}
      <a
        href="/Aniket_Sundriyal_Resume.pdf"
        download="Aniket_Sundriyal_Resume.pdf"
        className="p-4 rounded-full ring-1 ring-white/50 bg-black text-white flex hover:scale-[1.15] transition duration-300"
      >
        Download Resume <FiDownload className="text-2xl ml-2" />
      </a>
      
      {/* Contact Me button */}
      <Link
        href="/contact"
        className="p-4 rounded-full flex bg-white text-black font-semibold hover:bg-gray-200 hover:scale-[1.15] transition duration-300"
      >
        Contact Me <IoIosSend className="text-2xl ml-2" />
      </Link>
    </div>
  );
}

export default Transmission;