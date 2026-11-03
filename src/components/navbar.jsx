
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

  // Lock background scrolling while the mobile menu is open.
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

  // Close menu after navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: { duration: 0.28, ease: "easeInOut" },
    },
    opened: {
      x: 0,
      transition: { duration: 0.32, ease: "easeOut" },
    },
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-5 sm:px-8 py-4 text-white">

      {/* LOGO */}
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="text-xl sm:text-2xl font-bold z-[60] relative group"
      >
        <span className="text-white">ANIKET</span>{" "}
        <span className="text-cyan-400">SUNDRIYAL</span>

        <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-cyan-400 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
      </Link>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden md:flex gap-4 lg:gap-6 text-sm md:text-base items-center">
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

      {/* MOBILE FULL-SCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 z-50 md:hidden min-h-[100dvh] bg-black overflow-hidden flex flex-col items-center justify-center px-6 pt-24 pb-12"
          >

            {/* ANIMATED BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

              {/* CYAN GLOW */}
              <motion.div
                animate={{
                  x: [0, 70, -40, 0],
                  y: [0, -60, 40, 0],
                  scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[15%] left-[-100px] w-[280px] h-[280px] rounded-full bg-cyan-500/10 blur-[100px]"
              />

              {/* PURPLE GLOW */}
              <motion.div
                animate={{
                  x: [0, -60, 50, 0],
                  y: [0, 50, -40, 0],
                  scale: [1, 0.9, 1.2, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[10%] right-[-100px] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[110px]"
              />

              {/* CENTER AMBIENT GLOW */}
              <motion.div
                animate={{
                  opacity: [0.15, 0.4, 0.15],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-cyan-400/10 blur-[100px]"
              />

              {/* SUBTLE LIGHT SPOT */}
              <motion.div
                animate={{
                  opacity: [0.02, 0.08, 0.02],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[25%] right-[15%] w-[180px] h-[180px] rounded-full bg-blue-400/10 blur-[90px]"
              />

            </div>

            {/* NAVIGATION LINKS */}
            <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm">
              {links.map((link, index) => {
                const isActive = pathName === link.url;

                return (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.07,
                      duration: 0.3,
                    }}
                    className="w-full flex justify-center"
                  >
                    <Link
                      href={link.url}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`w-full max-w-[280px] text-center text-2xl sm:text-3xl font-medium tracking-wide py-3 px-6 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/40 shadow-[0_0_18px_rgba(34,211,238,0.2)]"
                          : "text-gray-200 border-transparent hover:text-cyan-300 hover:bg-white/5"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* FOOTER */}
            <p className="absolute bottom-8 z-10 text-xs tracking-[0.25em] text-gray-500 uppercase">
              Aniket Sundriyal
            </p>

          </motion.nav>
        )}
      </AnimatePresence>

    </header>
  );
}
