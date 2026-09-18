"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Animation from "@/components/Animation";
import Social from "@/components/Social";
import Transmission from "@/components/Transmission";

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

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router]);

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 p-20 gap-10">

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
            I’m a B.Tech Computer Science student passionate about building
            modern web applications and AI-based projects. I love solving
            real-world problems using clean and efficient code.
          </p>

          <Social />
          <Transmission />

        </div>
      </div>
    </motion.div>
  );
}