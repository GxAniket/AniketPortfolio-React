"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
      "https://github.com/GxAniket/Integrated-Logistics-Intelligence-Platform",
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

    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  return (
    <motion.div
      ref={containerRef}
      className="h-full w-full overflow-y-auto p-8 pb-24 md:p-20 scrollbar-hide"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
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
    </motion.div>
  );
}