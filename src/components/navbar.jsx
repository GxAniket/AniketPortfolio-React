"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/portfolio", title: "Projects" },
  { url: "/contact", title: "Contact" },
];

export default function Navbar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  // Hamburger lines animation variants
  const topVariants = {
    closed: { rotate: 0 },
    opened: { rotate: 45, backgroundColor: "rgb(255,255,255)" },
  };
  const centerVariants = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const bottomVariants = {
    closed: { rotate: 0 },
    opened: { rotate: -45, backgroundColor: "rgb(255,255,255)" },
  };

  // Mobile menu slide animation
  const listVariants = {
    closed: { x: "100vw" },
    opened: {
      x: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  return (
    <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 sm:px-8 py-4 text-white">
      
      {/* LOGO */}
      <Link 
        href="/" 
        className="text-2xl font-bold z-50 relative group"
      >
        <div className="relative inline-block pb-1 overflow-hidden">
          <span className="text-white">ANIKET</span>{" "}
          <span className="text-cyan-400">SUNDRIYAL</span>
          
          <span className="absolute left-0 bottom-0 w-full h-[3px] bg-cyan-400 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"></span>
        </div>
      </Link>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden md:flex gap-4 lg:gap-6 text-sm md:text-base items-center">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
              pathName === link.url
                ? "bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
                : "text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden z-50 relative">
        <button
          className="w-10 h-8 flex flex-col justify-between items-center"
          onClick={() => setOpen(!open)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-white rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-white rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-white rounded origin-left"
          ></motion.div>
        </button>
      </div>

      {/* MOBILE FULL-SCREEN MENU LIST */}
      {open && (
        <motion.div
          variants={listVariants}
          initial="closed"
          animate="opened"
          className="fixed top-0 left-0 w-screen h-screen bg-black/95 backdrop-blur-lg text-white flex flex-col items-center justify-center gap-10 text-4xl z-40"
        >
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              onClick={() => setOpen(false)}
              className={`transition-all duration-300 px-6 py-2 rounded-2xl ${
                pathName === link.url 
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.5)]" 
                : "hover:text-cyan-300"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}