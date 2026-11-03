
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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

      if (reduceMotion) {
        drawNetwork();
      }
    };

    const drawNetwork = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
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

        // Mouse interaction
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

      // Draw glowing particles
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

      // Subtle cursor glow
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

        // Wrap particles around screen edges
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

/* ─── Project Data ─── */
const projectData = [
  {
    id: 1,
    title: "Encryptor / Decryptor Tool",
    description:
      "A browser-based file encryptor and decryptor using HTML, CSS, and JavaScript.",
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
    tech: ["HTML5", "CSS3", "JavaScript", "Frontend UI"],
    image: "/project3.png",
    github: "https://github.com/GxAniket/music-player",
    live: "https://gxaniket.github.io/music-player/",
  },
  {
    id: 4,
    title: "Weather App (Next.js)",
    description:
      "Modern weather application built with Next.js and OpenWeatherMap API featuring real-time weather updates, temperature, humidity, wind speed, and responsive UI.",
    tech: ["Next.js", "OpenWeatherMap API", "React"],
    image: "/project4.png",
    github: "https://github.com/GxAniket/weather-app-nextjs",
    live: "https://github.com/GxAniket/weather-app-nextjs",
  },
  {
    id: 5,
    title: "Multi-Disease Prediction System",
    description:
      "Machine learning-based web application built with Flask that predicts disease risk using trained ML models.",
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
    tech: ["React", "Java", "Spring Boot", "PostgreSQL", "JWT", "REST API"],
    image: "/project7.png",
    github:
      "https://github.com/GxAniket/Integrated-Logistics-Intelligence-Platform",
    live:
      "https://integrated-logistics-intelligence-p.vercel.app/",
  },
  {
    id: 8,
    title: "Todo App",
    description:
      "A modern personal productivity and task management application built with React.js.",
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
    tech: ["Unity", "C#", "3D Game Development", "Game Design"],
    image: "/project9.png",
    github: "https://github.com/GxAniket/Uit-Campus-Fighters",
    live: "https://github.com/GxAniket/Uit-Campus-Fighters",
  },
];

/* ─── Projects Page ─── */
export default function Projects() {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let isNavigating = false;

    const handleWheel = (event) => {
      if (isNavigating) return;

      const isAtTop = container.scrollTop <= 5;

      const isAtBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5;

      if (event.deltaY > 0 && isAtBottom) {
        isNavigating = true;
        router.push("/contact");

        setTimeout(() => {
          isNavigating = false;
        }, 1000);
      }

      if (event.deltaY < 0 && isAtTop) {
        isNavigating = true;
        router.push("/about");

        setTimeout(() => {
          isNavigating = false;
        }, 1000);
      }
    };

    container.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  return (
    <motion.div
      className="relative isolate h-full w-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* BACKGROUND — SAME NEURAL NETWORK */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <NeuralNetworkBackground />
      </div>

      {/* PROJECT CONTENT */}
      <div
        ref={containerRef}
        className="relative z-10 h-full w-full overflow-y-auto p-8 pb-24 md:p-20 scrollbar-hide"
      >
        <div className="mt-10 flex flex-col items-center justify-center text-white lg:mt-0">
          <h1 className="mb-12 text-center text-4xl font-bold md:text-6xl">
            Featured <span className="text-cyan-400">Projects</span>
          </h1>

          <div className="grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {projectData.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/30 bg-black/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-cyan-400/40"
              >
                <div className="relative h-48 w-full border-b border-cyan-500/20 bg-gray-900 md:h-56">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.id <= 3}
                  />
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <h2 className="mb-3 text-2xl font-bold text-white">
                    {project.title}
                  </h2>

                  <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-300 md:text-base">
                    {project.description}
                  </p>

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

                  <div className="mt-auto flex gap-4">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                    >
                      GitHub
                    </Link>

                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 rounded-lg bg-cyan-600 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
                    >
                      Live Demo
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
