"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Outer Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(34,211,238,0.5)] hidden md:block"
        animate={{
          x: mousePosition.x - 16, // -16 taaki cursor ekdum center me rahe (32/2)
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
      {/* Inner Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[10000] shadow-[0_0_5px_#22d3ee] hidden md:block"
        animate={{
          x: mousePosition.x - 4, // -4 for center (8/2)
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0, // Dot bilkul mouse ke sath chipak kar chalegi
        }}
      />
    </>
  );
}