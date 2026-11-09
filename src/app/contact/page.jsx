
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MapChart from "@/components/MapChart";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa";
import Link from "next/link";

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

/* ─── Contact Page ─── */
const ContactPage = () => {
  const text = "Say Hello";

  const socialLinks = [
    {
      title: "Email",
      value: "sundriyalaniket@gmail.com",
      icon: <FaEnvelope className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=sundriyalaniket%40gmail.com",
      color:
        "hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10",
    },
    {
      title: "LinkedIn",
      value: "Aniket Sundriyal",
      icon: <FaLinkedin className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://www.linkedin.com/in/aniket-sundriyal",
      color:
        "hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-500/10",
    },
    {
      title: "GitHub",
      value: "GxAniket",
      icon: <FaGithub className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://github.com/GxAniket",
      color:
        "hover:text-gray-300 hover:border-gray-300/50 hover:bg-gray-500/10",
    },
    {
      title: "Instagram",
      value: "@aniket_sundriyal",
      icon: <FaInstagram className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://instagram.com/whitehat_aniket",
      color:
        "hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-500/10",
    },
    {
      title: "Telegram",
      value: "@whitehataniket",
      icon: <FaTelegram className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://t.me/whitehataniket",
      color:
        "hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10",
    },
    {
      title: "Facebook",
      value: "Aniket Sundriyal",
      icon: <FaFacebook className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://www.facebook.com/profile.php?id=100022096712332",
      color:
        "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-600/10",
    },
  ];

  return (
    <motion.div
      className="relative isolate h-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* BACKGROUND — SAME NEURAL NETWORK AS ABOUT */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <NeuralNetworkBackground />
      </div>

      <div className="relative z-10 h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 py-4 lg:py-0 lg:items-center lg:justify-center lg:gap-8 pt-20 lg:pt-10">

        {/* MAP */}
        <div className="h-[200px] sm:h-[300px] lg:h-[450px] lg:w-1/2 flex items-center justify-center shrink-0">
          <MapChart />
        </div>

        {/* CONTACT CARDS */}
        <div
          className="
            flex-1
            lg:flex-none
            lg:w-[450px]
            xl:w-[550px]
            lg:max-h-[80vh]
            bg-white/5
            backdrop-blur-md
            border border-white/10
            rounded-3xl
            flex flex-col
            p-5 lg:p-8
            shadow-[0_0_30px_rgba(34,211,238,0.1)]
            overflow-y-auto
            custom-scrollbar
            mb-10 lg:mb-0
          "
        >
          {/* TITLE */}
          <div className="text-center text-2xl lg:text-4xl mb-2 text-white font-bold">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}

            <span className="ml-2">🚀</span>
          </div>

          <p className="text-gray-400 text-center mb-4 lg:mb-6 text-[10px] lg:text-sm px-2">
            Feel free to reach out to me!
          </p>

          {/* SOCIAL LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialLinks.map((social, index) => {
              const CardContent = (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex flex-col
                    items-center
                    justify-center
                    p-3 lg:p-4
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-gray-300
                    transition-all duration-300
                    ${social.color}
                    ${
                      social.link
                        ? "cursor-pointer"
                        : "cursor-default"
                    }
                  `}
                >
                  <div className="mb-2">
                    {social.icon}
                  </div>

                  <span className="text-[10px] lg:text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    {social.title}
                  </span>

                  <span className="font-medium text-[11px] lg:text-[12px] text-center break-all leading-tight">
                    {social.value}
                  </span>
                </motion.div>
              );

              return social.link ? (
                <Link
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                >
                  {CardContent}
                </Link>
              ) : (
                <div key={index}>
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* COMPACT FOOTER */}
      <footer className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/40 px-4 py-2 text-center backdrop-blur-sm">
        <p className="text-[10px] tracking-[0.12em] text-slate-500 sm:text-xs">
          © 2025 - 2026 Aniket Sundriyal. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default ContactPage;
