
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/projects", title: "Projects" },
  { url: "/contact", title: "Contact" },
];

export default function Navbar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    opened: {
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 text-white">

      {/* NAVBAR */}
      <div className="relative flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4">

        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-xl sm:text-2xl font-bold relative z-[60] group"
        >
          <span className="text-white">ANIKET</span>{" "}
          <span className="text-cyan-400">SUNDRIYAL</span>

          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 rounded-full border border-white/[0.10] bg-white/[0.04] backdrop-blur-xl px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          {links.map((link) => {
            const isActive = pathName === link.url;

            return (
              <Link
                key={link.title}
                href={link.url}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-5 lg:px-6 py-2.5 rounded-full text-sm lg:text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "text-cyan-400 bg-white/[0.10] border border-white/[0.08]"
                    : "text-gray-300 border border-transparent hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {link.title}

                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((previous) => !previous)}
          className="md:hidden relative z-[60] w-10 h-10 flex flex-col justify-center items-center gap-[7px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <motion.span
            animate={
              open
                ? { rotate: 45, y: 9, width: 34 }
                : { rotate: 0, y: 0, width: 34 }
            }
            transition={{ duration: 0.25 }}
            className="h-[4px] bg-white rounded-full"
          />

          <motion.span
            animate={{ opacity: open ? 0 : 1, x: open ? 10 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-[34px] h-[4px] bg-white rounded-full"
          />

          <motion.span
            animate={
              open
                ? { rotate: -45, y: -9, width: 34 }
                : { rotate: 0, y: 0, width: 34 }
            }
            transition={{ duration: 0.25 }}
            className="h-[4px] bg-white rounded-full"
          />
        </button>
      </div>

      {/* NAVBAR DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 z-50 md:hidden h-[100dvh] bg-[#030405] overflow-hidden flex flex-col px-6 pt-28 pb-8"
          >
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[15%] left-[-130px] w-[280px] h-[280px] rounded-full bg-cyan-500/[0.09] blur-[110px]" />

              <div className="absolute bottom-[12%] right-[-120px] w-[300px] h-[300px] rounded-full bg-purple-500/[0.10] blur-[110px]" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400/[0.04] blur-[110px]" />

              <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* MENU HEADING */}
            <div className="relative z-10 mb-10">
              <p className="text-xs tracking-[0.35em] uppercase text-gray-500">
                Navigation
              </p>

              <div className="mt-3 h-px w-full bg-gradient-to-r from-cyan-400/50 via-white/10 to-transparent" />
            </div>

            {/* NAVIGATION LINKS */}
            <div className="relative z-10 flex flex-col w-full max-w-lg mx-auto">
              {links.map((link, index) => {
                const isActive = pathName === link.url;

                return (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + index * 0.08,
                      duration: 0.35,
                    }}
                  >
                    <Link
                      href={link.url}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative flex items-center justify-between py-5 border-b transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400/40"
                          : "border-white/[0.09] hover:border-cyan-400/30"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <span
                          className={`text-xs tracking-widest transition-colors ${
                            isActive
                              ? "text-cyan-400"
                              : "text-gray-600 group-hover:text-cyan-400"
                          }`}
                        >
                          0{index + 1}
                        </span>

                        <span
                          className={`text-[32px] sm:text-4xl font-semibold tracking-tight transition-all duration-300 ${
                            isActive
                              ? "text-cyan-400 translate-x-1"
                              : "text-gray-200 group-hover:text-white group-hover:translate-x-1"
                          }`}
                        >
                          {link.title}
                        </span>
                      </div>

                      <motion.span
                        animate={{
                          x: isActive ? 0 : -5,
                          opacity: isActive ? 1 : 0,
                        }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-cyan-400 text-2xl"
                      >
                        ↗
                      </motion.span>

                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-link"
                          className="absolute left-0 bottom-0 h-[2px] w-16 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* PROFESSIONAL FOOTER */}
            <div className="relative z-10 mt-auto pt-8">
              <div className="border-t border-white/10 pt-6 text-center">
                <p className="text-sm font-medium tracking-[0.18em] text-gray-300">
                  ANIKET SUNDRIYAL
                </p>

                <p className="mt-3 text-[11px] tracking-wider text-gray-500">
                  © 2025–2026. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
