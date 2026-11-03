
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, {
    stiffness: 150,
    damping: 18,
    mass: 0.5,
  });

  const ringY = useSpring(mouseY, {
    stiffness: 150,
    damping: 18,
    mass: 0.5,
  });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleHover = (e) => {
      const target = e.target.closest(
        "a, button, [role='button'], input, textarea, select"
      );
      setHovering(!!target);
    };

    const handleClick = () => {
      setClicking(true);
      setTimeout(() => setClicking(false), 250);
    };

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Cyber Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
      >
        <div className="relative w-full h-full rounded-full border border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]">
          <div className="absolute inset-1 rounded-full border border-purple-400/40" />
        </div>
      </motion.div>

      {/* Inner Glowing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-300 pointer-events-none z-[10000] hidden md:block shadow-[0_0_12px_#22d3ee]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 2 : 1,
        }}
      />

      {/* Click Pulse */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-400 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 2 : 0,
          opacity: clicking ? 0.8 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
