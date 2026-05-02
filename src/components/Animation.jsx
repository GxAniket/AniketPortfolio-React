"use client";

import { TypeAnimation } from "react-type-animation";

export default function Animation() {
  return (
    <TypeAnimation
      sequence={[
        "Software Engineer",
        2000,
        "Full Stack Developer",
        2000,
        "Unity Game Developer",
        2000,
      ]}
      speed={50}
      repeat={Infinity}
    />
  );
}