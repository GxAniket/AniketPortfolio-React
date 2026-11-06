"use client";

import Brain from "@/components/Brain";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

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

/* ─── Section Title ─── */
const SectionTitle = ({ children }) => (
  <h1 className="font-bold text-2xl uppercase tracking-[0.18em] text-cyan-400 flex items-center gap-3">
    <span className="block w-8 h-[2px] bg-cyan-400 rounded-full flex-shrink-0" />
    {children}
  </h1>
);

/* ─── Skills ─── */
const skills = [
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "Spring Boot",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "DSA",
  "Machine Learning",
  "Unity Engine",
  "Git",
  "GitHub",
  "Postman",
  "Linux",
  "MERN Stack",
];

/* ─── Experience ─── */
const experiences = [
  {
    title: "Java Full Stack Developer Intern",
    company: "Infosys Springboard",
    type: "Internship · Remote, India",
    period: "August 2026 – November 2026",
    accent: "#22d3ee",
    points: [
      "Gaining hands-on experience in Java full-stack development, including backend development, REST APIs, databases, and web technologies.",
      "Developing and integrating scalable applications while strengthening Java, Spring Boot, PostgreSQL, and API integration skills.",
    ],
  },
  {
    title: "Java Developer Intern",
    company: "Oasis Infobyte",
    type: "Internship · Remote",
    period: "June 2026 – July 2026",
    accent: "#22d3ee",
    points: [
      "Worked on Java-based development projects using OOP.",
      "Solved practical coding and problem-solving tasks.",
      "Built efficient Java applications using best practices.",
    ],
  },
  {
    title: "AI & Generative AI Intern",
    company: "YBI Foundation",
    type: "Internship · Remote",
    period: "July 2025 - August 2025",
    accent: "#22d3ee",
    points: [
      "Worked on Artificial Intelligence and Generative AI implementations",
      "Built predictive models using Machine Learning basics",
      "Tools: Python, Scikit-learn, Generative AI frameworks",
    ],
  },
  {
    title: "Industrial Training in Python",
    company: "ThinkNEXT Technologies Pvt. Ltd.",
    type: "Internship · Hybrid, Mohali",
    period: "June 2024 – July 2024",
    accent: "#22d3ee",
    points: [
      "Completed industrial training focused on Python and Object-Oriented Programming (OOP)",
      "Developed an understanding of core Python modules and practical logic",
    ],
  },
];

/* ─── Education ─── */
const education = [
  {
    school: "Uttaranchal University",
    degree: "B.Tech – Computer Science & Engineering",
    period: "Aug 2023 – Aug 2027",
    grade: "7.67 CGPA",
    accent: "#22d3ee",
    note: "Focus on Software Engineering and Full-Stack Development",
  },
  {
    school: "SGRR Public School (Race Course)",
    degree: "Senior Secondary (Class XII) – Science (PCM + CS)",
    period: "Apr 2021 – May 2023",
    accent: "#22d3ee",
    note: "CBSE · Physics · Chemistry · Mathematics · Computer Science",
  },
  {
    school: "SGRR Public School (Race Course)",
    degree: "Secondary (Class X) – General Studies",
    period: "Apr 2019 – May 2021",
    accent: "#22d3ee",
    note: "CBSE · Mathematics · Science · Social Science · IT",
  },
];

/* ─── About Page ─── */
const AboutPage = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <motion.div
      className="relative isolate h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <NeuralNetworkBackground />
      </div>

      {/* TOP SCROLL OVERLAY */}
      <div
        className="
          absolute top-0 left-0 right-0
          h-32
          z-30
          pointer-events-none
          bg-gradient-to-b
          from-black via-black/95 to-transparent
        "
      />

      <div
        ref={containerRef}
        className="relative z-10 h-full overflow-y-scroll overflow-x-hidden lg:flex"
      >
        {/* LEFT CONTENT */}
        <div
          className="
            w-full lg:w-[50%]
            px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20
            pt-28 sm:pt-36 pb-8 lg:pb-40
            flex flex-col gap-16
            text-white z-20 relative
          "
        >
          {/* BIOGRAPHY */}
          <section className="flex flex-col gap-6">
            <SectionTitle>Biography</SectionTitle>

            <div className="flex items-center gap-5 sm:gap-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div
                className="
                  relative flex-shrink-0
                  w-20 h-20 sm:w-[88px] sm:h-[88px]
                  rounded-full overflow-hidden
                  ring-2 ring-cyan-400/70
                  ring-offset-2 ring-offset-black
                  shadow-[0_0_24px_rgba(34,211,238,0.3)]
                "
              >
                <Image
                  src="/Aniket_Sundriyal.jpeg"
                  alt="Aniket Sundriyal"
                  fill
                  sizes="88px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="text-xl font-bold text-white">
                  Aniket Sundriyal
                </p>

                <p className="text-cyan-400 text-sm font-medium">
                  B.Tech CSE student
                </p>

                <p className="text-gray-400 text-sm">
                  Uttaranchal University
                </p>
              </div>
            </div>

            <div className="text-[15px] text-gray-300 leading-relaxed max-w-xl flex flex-col gap-4">
              <p>
                I'm Aniket Sundriyal, a final-year B.Tech CSE student at
                Uttaranchal University. I'm interested in software development
                and enjoy learning new technologies by building projects.
              </p>

              <p>
                I have experience working with Java, Spring Boot, React,
                Node.js, Python, and SQL. I've also completed the Java Full
                Stack Development internship at Infosys Springboard.
              </p>

              <p>
                I regularly practice Data Structures and Algorithms using Java
                and work on projects to improve my development skills.
              </p>

              <p className="italic text-cyan-300 font-medium">
                Some of my projects include an AI-based healthcare assistant,
                an encryption and decryption tool, a diabetes prediction
                application, a MERN e-commerce platform, and a logistics
                management system.
              </p>
            </div>
          </section>

          {/* SKILLS */}
          <section className="flex flex-col gap-5">
            <SectionTitle>Technical Skills</SectionTitle>

            <div className="flex gap-2 flex-wrap">
              {skills.map((skill, index) => {
                const skillColors = [
                  "border-cyan-400/30 text-cyan-300 bg-cyan-400/[0.07] hover:bg-cyan-400/15 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]",
                  "border-purple-400/30 text-purple-300 bg-purple-400/[0.07] hover:bg-purple-400/15 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]",
                  "border-pink-400/30 text-pink-300 bg-pink-400/[0.07] hover:bg-pink-400/15 hover:shadow-[0_0_15px_rgba(244,114,182,0.25)]",
                  "border-blue-400/30 text-blue-300 bg-blue-400/[0.07] hover:bg-blue-400/15 hover:shadow-[0_0_15px_rgba(96,165,250,0.25)]",
                  "border-emerald-400/30 text-emerald-300 bg-emerald-400/[0.07] hover:bg-emerald-400/15 hover:shadow-[0_0_15px_rgba(52,211,153,0.25)]",
                  "border-amber-400/30 text-amber-300 bg-amber-400/[0.07] hover:bg-amber-400/15 hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]",
                ];

                return (
                  <div
                    key={skill}
                    className={`
                      rounded-md px-3 py-1.5
                      text-xs font-semibold tracking-wide
                      border
                      transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:scale-105
                      cursor-default
                      ${skillColors[index % skillColors.length]}
                    `}
                  >
                    {skill}
                  </div>
                );
              })}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="flex flex-col gap-5">
            <SectionTitle>Experience</SectionTitle>

            <div className="flex flex-col gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp.title}
                  className="relative bg-white/[0.03] rounded-xl p-5 border border-white/[0.07]"
                  style={{
                    borderLeftColor: exp.accent,
                    borderLeftWidth: "3px",
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-3">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[15px] font-bold text-white">
                        {exp.title}
                      </h2>

                      <p className="text-gray-400 text-sm mt-0.5">
                        {exp.company} · {exp.type}
                      </p>
                    </div>

                    <span className="self-start lg:self-auto shrink-0 whitespace-nowrap text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {exp.points.map((pt) => (
                      <li
                        key={pt}
                        className="text-gray-400 text-sm flex gap-2.5 items-start"
                      >
                        <span className="mt-[6px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-cyan-400" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="flex flex-col gap-5">
            <SectionTitle>Education</SectionTitle>

            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div
                  key={edu.school + edu.degree}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 border-l-4 border-l-cyan-400"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h2 className="text-[15px] font-bold text-white">
                        {edu.school}
                      </h2>

                      <p className="text-gray-300 text-sm mt-0.5">
                        {edu.degree}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {edu.period}
                      </p>

                      {edu.grade && (
                        <p className="text-cyan-400 text-xs font-bold">
                          {edu.grade}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-gray-500 text-[11px]">
                    {edu.note}
                  </p>
                </div>
              ))}
            </div>

            {/* NEXT BUTTON */}
            <div className="flex w-full justify-center mt-0 lg:relative lg:left-[45vw] lg:w-screen lg:-translate-x-1/2">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-7 py-3 font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
              >
                Next
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* SMALL BOTTOM SPACE */}
            <div
              className="h-6 w-full shrink-0"
              aria-hidden="true"
            />
          </section>
        </div>

        {/* RIGHT — BRAIN ANIMATION */}
        <div className="hidden lg:flex lg:w-[50%] sticky top-0 h-screen z-10 pointer-events-none items-center justify-center">
          <div
            className="
              w-full h-full
              flex items-center justify-center
              scale-[0.8]
              xl:scale-[0.9]
              2xl:scale-[1.0]
              translate-x-10
              translate-y-15
              opacity-90
            "
          >
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;