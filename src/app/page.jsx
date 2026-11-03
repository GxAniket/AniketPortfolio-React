
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Animation from "@/components/Animation";
import Social from "@/components/Social";
import Transmission from "@/components/Transmission";

/* ─── Interactive Starfield Background ─── */
const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = null;
    let stars = [];
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = { x: -1000, y: -1000 };

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 65 : 130;
    const mouseDistance = 200;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.25 + 0.08,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        color: Math.random() > 0.5 ? "cyan" : "purple",
        opacity: Math.random() * 0.5 + 0.3,
      }));

      if (reduceMotion) {
        drawStars();
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        const twinkle = reduceMotion
          ? 1
          : 0.65 + Math.sin(star.phase) * 0.35;

        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Subtle mouse parallax
        let offsetX = 0;
        let offsetY = 0;

        if (distance < mouseDistance) {
          const strength = (1 - distance / mouseDistance) * 5;
          offsetX = (dx / (distance || 1)) * strength;
          offsetY = (dy / (distance || 1)) * strength;
        }

        const x = star.x + offsetX;
        const y = star.y + offsetY;

        const color =
          star.color === "cyan"
            ? "34, 211, 238"
            : "168, 85, 247";

        const opacity = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${color}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Mouse radial glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180
        );

        gradient.addColorStop(
          0,
          "rgba(34, 211, 238, 0.07)"
        );

        gradient.addColorStop(
          0.5,
          "rgba(168, 85, 247, 0.025)"
        );

        gradient.addColorStop(
          1,
          "rgba(0, 0, 0, 0)"
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const animate = () => {
      if (!isVisible) {
        animationFrame = null;
        return;
      }

      stars.forEach((star) => {
        star.y -= star.speed;
        star.phase += star.twinkleSpeed;

        // Reset stars when they leave the screen
        if (star.y < -5) {
          star.y = height + 5;
          star.x = Math.random() * width;
        }
      });

      drawStars();

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible && !reduceMotion && !animationFrame) {
        animate();
      } else if (!isVisible && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    });

    observer.observe(canvas);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();

    if (!reduceMotion) {
      animate();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      observer.disconnect();

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    />
  );
};

/* ─── Home Page ─── */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let isNavigating = false;

    const handleWheel = (e) => {
      if (isNavigating) return;

      if (e.deltaY > 0) {
        isNavigating = true;
        router.push("/about");

        setTimeout(() => {
          isNavigating = false;
        }, 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  return (
    <motion.div
      className="relative isolate h-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* BACKGROUND — INTERACTIVE STARFIELD */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <StarfieldBackground />
      </div>

      {/* EXISTING HOME CONTENT */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 p-20 gap-10">

        {/* LEFT SIDE */}
        <div className="h-1/2 lg:h-full lg:w-5/12 flex justify-center items-center">
          <div className="deneme"></div>
        </div>

        {/* RIGHT SIDE */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-8 items-center lg:items-start justify-center text-white text-center lg:text-left">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Hi, I'm Aniket Sundriyal <br />

            <span className="text-3xl md:text-4xl lg:text-5xl text-purple-400 mt-2 block">
              <Animation />
            </span>
          </h1>

          <p className="md:text-xl text-gray-300">
            I'm a final-year B.Tech CSE student at Uttaranchal University with experience in Java, Spring Boot, React, Node.js, Python, and SQL. I've completed a Java Full Stack Development internship at Infosys Springboard and enjoy building practical software projects.
          </p>

          <Social />

          <Transmission />

        </div>
      </div>
    </motion.div>
  );
}
