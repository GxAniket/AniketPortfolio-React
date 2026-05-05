"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projectData = [
  {
    id: 1,
    title: "Encryptor / Decryptor Tool",
    description: "A browser-based file encryptor and decryptor using HTML, CSS, and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript", "WebCrypto"],
    image: "/project1.png",
    github: "https://github.com/GxAniket/encryptor-decryptor-version-1",
    live: "https://gxaniket.github.io/encryptor-decryptor-version-1/",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Responsive personal portfolio showcasing projects and skills.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    image: "/project2.png",
    github: "https://github.com/GxAniket/Aniket-Portfolio-01",
    live: "https://aniket-portfolio-react.vercel.app/",
  },
  {
    id: 3,
    title: "Music Player",
    description: "Frontend-based music player with interactive UI controls.",
    tech: ["HTML5", "CSS3", "JavaScript", "Frontend UI"],
    image: "/project3.png",
    github: "https://github.com/GxAniket/music-player",
    live: "https://gxaniket.github.io/music-player/",
  },
  {
    id: 4,
    title: "My College Life — AI Simulation",
    description: "Unity-based college simulation featuring AI-driven NPCs.",
    tech: ["Unity Engine", "C#", "AI Simulation"],
    image: "/project4.png",
    github: "https://github.com/GxAniket/My-College-Life",
    live: "https://gxaniket.github.io/My-College-Life/",
  },
  {
    id: 5,
    title: "Multi-Disease Prediction System",
    description: "Machine learning-based web application built with Flask that predicts disease risk using trained ML models.",
    tech: ["Python", "Flask", "Machine Learning", "Scikit-learn"],
    image: "/project5.png",
    github: "https://github.com/GxAniket/diabetes-prediction-app",
    live: "https://github.com/GxAniket/diabetes-prediction-app",
  },
  {
    id: 6,
    title: "E-Commerce Web Application",
    description: "Full-stack e-commerce platform featuring authentication, product listings, cart management, and order processing.",
    tech: ["MongoDB", "Express", "React", "Node.js", "MERN"],
    image: "/profile6.png",
    github: "https://github.com/GxAniket/ecommerce-fullstack-app",
    live: "https://github.com/GxAniket/ecommerce-fullstack-app",
  }
];

export default function Projects() {
  return (
    <motion.div
      className="h-full w-full p-8 md:p-20 overflow-y-auto scrollbar-hide pb-24"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col items-center justify-center text-white mt-10 lg:mt-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          Featured <span className="text-cyan-400">Projects</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full max-w-7xl">
          {projectData.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.03 }}
              className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative w-full h-48 md:h-56 bg-gray-900 border-b border-cyan-500/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={project.id <= 3} // Increased to 3 for better UX
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-3 text-white">{project.title}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs font-medium bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              
                <div className="flex gap-4 mt-auto">
                  <Link href={project.github} target="_blank" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors border border-gray-600 w-1/2 text-center">
                    GitHub
                  </Link>
                  <Link href={project.live} target="_blank" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-colors w-1/2 text-center">
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