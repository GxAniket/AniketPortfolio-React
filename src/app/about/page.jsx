"use client";
import Brain from "@/components/Brain";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/* ─── Section title helper ─── */
const SectionTitle = ({ children }) => (
  <h1 className="font-bold text-2xl uppercase tracking-[0.18em] text-cyan-400 flex items-center gap-3">
    <span className="block w-8 h-[2px] bg-cyan-400 rounded-full flex-shrink-0" />
    {children}
  </h1>
);

/* ─── Data ─── */
const skills = [
  "MERN Stack", "MongoDB", "Express.js", "React", "Node.js",
  "Java", "DSA", "Spring Boot", "Python", "Machine Learning",
  "HTML", "CSS", "JavaScript", "Tailwind CSS",
  "Unity (C#)", "Linux", "MySQL", "Git", "GitHub", "Postman",
];

const experiences = [
  {
    title: "Freelance Software Engineer",
    company: "Freelancer.com",
    type: "Freelance · Remote",
    period: "Jan 2026 – Present",
    accent: "#22d3ee",
    points: [
      "Developed full-stack web applications using MERN stack and Flask",
      "Built secure file encryption tool using JavaScript (AES-based)",
      "Delivered responsive UIs and impactful digital solutions",
    ],
  },
  {
    title: "AI & Generative AI Intern",
    company: "YBI Foundation",
    type: "Internship · Remote",
    period: "Jul 2025 · 1 mo",
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
    period: "Jun 2024 – Jul 2024",
    accent: "#22d3ee",
    points: [
      "Completed industrial training focused on Python and Object-Oriented Programming (OOP)",
      "Developed an understanding of core Python modules and practical logic",
    ],
  },
];

const education = [
  {
    school: "Uttaranchal University",
    degree: "B.Tech – Computer Science & Engineering",
    period: "Aug 2023 – Aug 2027",
    grade: "7.61 CGPA",
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

const AboutPage = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="h-full overflow-y-scroll overflow-x-hidden lg:flex"
        ref={containerRef}
      >
        {/* ════════ LEFT CONTENT COLUMN ════════ */}
        <div className="w-full lg:w-[50%] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20
                        pt-28 sm:pt-36 pb-40
                        flex flex-col gap-16 text-white z-20 relative">

          {/* ── BIOGRAPHY ── */}
          <section className="flex flex-col gap-6">
            <SectionTitle>Biography</SectionTitle>

            <div className="flex items-center gap-5 sm:gap-6 p-4 rounded-xl
                            bg-white/[0.03] border border-white/[0.08]">
              <div className="relative flex-shrink-0 w-20 h-20 sm:w-[88px] sm:h-[88px]
                              rounded-full overflow-hidden
                              ring-2 ring-cyan-400/70 ring-offset-2 ring-offset-black
                              shadow-[0_0_24px_rgba(34,211,238,0.3)]">
                <Image
                  src="/profile.jpg"
                  alt="Aniket Sundriyal"
                  fill
                  sizes="88px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="text-xl font-bold text-white">Aniket Sundriyal</p>
                <p className="text-cyan-400 text-sm font-medium">B.Tech CSE student</p>
                <p className="text-gray-400 text-sm">Uttaranchal University</p>
              </div>
            </div>

            <div className="text-[15px] text-gray-300 leading-relaxed max-w-xl flex flex-col gap-4">
              <p>
                I am Aniket Sundriyal, a B.Tech Computer Science student at Uttaranchal University with a strong interest in Software Engineering and Full-Stack Development.
              </p>
              <p>
                I enjoy building practical and impactful projects that solve real-world problems. My experience includes developing full-stack web applications, AI-based prediction systems, and exploring game development using Unity.
              </p>
              <p>
                Currently, I am strengthening my skills in React, Node.js, Spring Boot, and Data Structures & Algorithms in Java. I also have hands-on experience building projects such as an AI-based healthcare assistant and a file encryption/decryption tool. Additionally, I have developed small games using Unity, including an open-world car simulation project.
              </p>
              <p className="italic text-cyan-300 font-medium">
                I am actively seeking internship opportunities where I can contribute, learn, and grow as a software developer. Let’s connect and collaborate!
              </p>
            </div>
          </section>

          {/* ── TECHNICAL SKILLS ── */}
          <section className="flex flex-col gap-5">
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="flex gap-2 flex-wrap">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-md px-3 py-1.5 text-xs font-medium tracking-wide
                             bg-white/[0.04] text-cyan-100
                             border border-white/[0.08]
                             hover:bg-cyan-500/20 hover:border-cyan-400/50
                             hover:text-white transition-all duration-200 cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section className="flex flex-col gap-5">
            <SectionTitle>Experience</SectionTitle>
            <div className="flex flex-col gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp.title}
                  className="relative bg-white/[0.03] rounded-xl p-5 border border-white/[0.07]"
                  style={{ borderLeftColor: exp.accent, borderLeftWidth: "3px" }}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h2 className="text-[15px] font-bold text-white">{exp.title}</h2>
                      <p className="text-gray-400 text-sm mt-0.5">{exp.company} · {exp.type}</p>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.points.map((pt) => (
                      <li key={pt} className="text-gray-400 text-sm flex gap-2.5 items-start">
                        <span className="mt-[6px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-cyan-400" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── EDUCATION ── */}
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
                      <h2 className="text-[15px] font-bold text-white">{edu.school}</h2>
                      <p className="text-gray-300 text-sm mt-0.5">{edu.degree}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{edu.period}</p>
                      {edu.grade && <p className="text-cyan-400 text-xs font-bold">{edu.grade}</p>}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-500 text-[11px]">{edu.note}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ════════ RIGHT — BRAIN (LARGE FIX) ════════ */}
        <div className="hidden lg:flex lg:w-[50%] sticky top-0 h-screen z-10 pointer-events-none items-center justify-center">
          <div className="w-full h-full flex items-center justify-center 
                          scale-[0.8] xl:scale-[0.9] 2xl:scale-[1.0] 
                          translate-x-10 translate-y-4 opacity-90">
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;