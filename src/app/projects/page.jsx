"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ─── Interactive Neural Network Background ─── */
const NeuralNetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = null;
    let particles = [];
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = { x: -1000, y: -1000 };

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 45 : 95;
    const connectionDistance = isMobile ? 105 : 145;
    const mouseDistance = 180;

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

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.6,
        opacity: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
      }));

      if (reduceMotion) drawNetwork();
    };

    const drawNetwork = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity =
              (1 - distance / connectionDistance) * 0.22;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);

            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const mouseDx = particle.x - mouse.x;
        const mouseDy = particle.y - mouse.y;

        const mouseDist = Math.sqrt(
          mouseDx * mouseDx + mouseDy * mouseDy
        );

        if (mouseDist < mouseDistance) {
          const opacity =
            (1 - mouseDist / mouseDistance) * 0.55;

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);

          ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      particles.forEach((particle) => {
        const glow = 0.7 + Math.sin(particle.phase) * 0.25;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(34, 211, 238, ${
          particle.opacity * glow
        })`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(34, 211, 238, 0.65)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          150
        );

        gradient.addColorStop(
          0,
          "rgba(34, 211, 238, 0.045)"
        );

        gradient.addColorStop(
          1,
          "rgba(34, 211, 238, 0)"
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

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.025;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;

        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;
      });

      drawNetwork();
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

    if (!reduceMotion) animate();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);

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

/* ─── Project Data ─── */
const projectData = [
  {
    id: 1,
    title: "Encryptor / Decryptor Tool",
    description:
      "A browser-based file encryptor and decryptor using HTML, CSS, and JavaScript.",
    year: "Year 1",
    timeline: "Semester 2",
    status: "Completed",
    tech: ["HTML", "CSS", "JavaScript", "WebCrypto"],
    image: "/project1.png",
    github: "https://github.com/GxAniket/encryptor-decryptor-version-1",
    live: "https://gxaniket.github.io/encryptor-decryptor-version-1/",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "Responsive personal portfolio showcasing projects and skills.",
    year: "Year 3",
    timeline: "Semester 5 – 6",
    status: "Completed",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    image: "/project2.png",
    github: "https://github.com/GxAniket/Aniket-Portfolio-01",
    live: "https://aniket-portfolio-react.vercel.app/",
  },
  {
    id: 3,
    title: "Music Player",
    description:
      "Frontend-based music player with interactive UI controls.",
    year: "Year 1",
    timeline: "Semester 2",
    status: "Completed",
    tech: ["HTML5", "CSS3", "JavaScript", "Frontend UI"],
    image: "/project3.png",
    github: "https://github.com/GxAniket/music-player",
    live: "https://gxaniket.github.io/music-player/",
  },
  {
    id: 5,
    title: "Multi-Disease Prediction System",
    description:
      "Machine learning-based web application built with Flask that predicts disease risk using trained ML models.",
    year: "Year 3",
    timeline: "YBI Foundation Internship",
    status: "Completed",
    tech: [
      "Python",
      "Flask",
      "Machine Learning",
      "Scikit-learn",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    image: "/project5.png",
    github: "https://github.com/GxAniket/diabetes-prediction-app",
    live: "https://github.com/GxAniket/diabetes-prediction-app",
  },
  {
    id: 6,
    title: "E-Commerce Web Application",
    description:
      "Full-stack e-commerce platform featuring authentication, product listings, cart management, and order processing.",
    year: "Year 4",
    timeline: "Development Ongoing",
    status: "In Progress",
    tech: ["MongoDB", "Express", "React", "Node.js", "MERN"],
    image: "/profile6.png",
    github: "https://github.com/GxAniket/ecommerce-fullstack-app",
    live: "https://github.com/GxAniket/ecommerce-fullstack-app",
  },
  {
    id: 7,
    title: "Integrated Logistics Intelligence Platform",
    description:
      "Full-stack logistics platform developed during my Infosys Springboard internship for shipment management, live tracking, ETA calculation, and delivery monitoring.",
    year: "2026",
    timeline: "Aug – Nov · Infosys Springboard Internship",
    status: "Completed",
    tech: ["React", "Java", "Spring Boot", "PostgreSQL", "JWT", "REST API"],
    image: "/project7.png",
    github:
      "https://github.com/GxAniket/Integrated-Logistics-Intelligence-Platform",
    live: "https://integrated-logistics-intelligence-p.vercel.app/",
  },
  {
    id: 8,
    title: "Todo App",
    description:
      "A streamlined task manager for organizing daily activities and tracking progress.",
    year: "Year 4",
    timeline: "Semester 7",
    status: "Completed",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Local Storage"],
    image: "/project8.png",
    github: "https://github.com/GxAniket/todo-app",
    live: "https://todo-app-two-sigma-85.vercel.app",
  },
  {
    id: 9,
    title: "UIT Campus Fighters",
    description:
      "A Unity-based 3D college fighting game featuring student characters, combat, combos, enemy AI, and university arenas.",
    year: "Year 4",
    timeline: "Semester 7",
    status: "Planning Phase",
    tech: ["Unity", "C#", "3D Game Development", "Game Design"],
    image: "/project9.png",
    github: "https://github.com/GxAniket/Uit-Campus-Fighters",
    live: "https://github.com/GxAniket/Uit-Campus-Fighters",
  },
];

const orderedProjectData = [...projectData].sort((a, b) => {
  const getYear = (year) => {
    const academicYear = year.match(/^Year (\d+)$/);
    if (academicYear) return Number(academicYear[1]);
    if (/^\d{4}$/.test(year)) return 4.5;
    return Number.POSITIVE_INFINITY;
  };
  const yearDifference = getYear(a.year) - getYear(b.year);
  if (yearDifference !== 0) return yearDifference;

  const getSemester = (timeline) =>
    Number(timeline.match(/Semester (\d+)/)?.[1] ?? Infinity);
  return getSemester(a.timeline) - getSemester(b.timeline);
});

/* ─── Projects Page ─── */
export default function Projects() {
  const containerRef = useRef(null);

  return (
    <motion.div
      className="relative isolate min-h-screen w-full overflow-hidden lg:h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <NeuralNetworkBackground />
      </div>

      {/* PROJECT CONTENT */}
      <div
        ref={containerRef}
        className="
          about-scrollbar
          relative z-10
          w-full
          px-4 pt-28 pb-24
          md:px-20

          lg:absolute
          lg:inset-x-0
          lg:top-28
          lg:bottom-0
          lg:overflow-y-auto
          lg:overflow-x-hidden
          lg:pt-8
          lg:pb-20
        "
      >
        <div className="mt-10 flex flex-col items-center justify-center text-white lg:mt-0">
          <h1 className="mb-12 text-center text-4xl font-bold md:text-6xl">
            Featured <span className="text-cyan-400">Projects</span>
          </h1>

          <div className="grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {orderedProjectData.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/30 bg-black/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-cyan-400/40"
              >
                {/* PROJECT IMAGE */}
                <div className="relative h-48 w-full border-b border-cyan-500/20 bg-gray-900 md:h-56">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="
                      object-contain
                      opacity-80
                      transition-opacity
                      duration-300
                      hover:opacity-100
                    "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.id <= 3}
                  />
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <h2 className="mb-3 text-2xl font-bold text-white">
                    {project.title}
                  </h2>

                  {/* DEVELOPMENT TIMELINE */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>

                      {project.year}
                    </span>

                    <span className="text-xs text-gray-400">
                      {project.timeline}
                    </span>
                  </div>

                  {/* PROJECT STATUS */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                        project.status === "Completed"
                          ? "border-green-400/50 bg-green-500/15 text-green-300 shadow-[0_0_12px_rgba(34,197,94,0.45)]"
                          : project.status === "Planning Phase" ||
                            project.status === "Completed · Issues Remaining"
                          ? "border-red-400/50 bg-red-500/15 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.45)]"
                          : "border-yellow-400/50 bg-yellow-500/15 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.45)]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.9)]"
                            : project.status === "Planning Phase" ||
                              project.status === "Completed · Issues Remaining"
                            ? "bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.9)]"
                            : "bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.9)]"
                        }`}
                      />

                      {project.status}
                    </span>
                  </div>

                  {/* PROJECT DESCRIPTION */}
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-300 md:text-base">
                    {project.description}
                  </p>

                  {/* TECHNOLOGY TAGS */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-purple-500/30 bg-purple-900/40 px-3 py-1 text-xs font-medium text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* PROJECT BUTTONS */}
                  <div className="mt-auto flex gap-4">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative isolate w-1/2 overflow-hidden rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-emerald-400 hover:bg-gray-700 hover:shadow-[0_8px_25px_rgba(16,185,129,0.35)] active:translate-y-0 active:scale-95"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />

                      <span className="relative z-10">GitHub</span>
                    </Link>

                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative isolate w-1/2 overflow-hidden rounded-lg bg-cyan-600 px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-[0_8px_28px_rgba(6,182,212,0.45)] active:translate-y-0 active:scale-95"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />

                      <span className="relative z-10">Live Demo</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* NEXT PAGE BUTTON */}
          <div className="mt-8 flex w-full justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-7 py-3 font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
            >
              Next

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
