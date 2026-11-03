
"use client";

import { TypeAnimation } from "react-type-animation";

export default function Animation() {
  return (
    <TypeAnimation
      sequence={[
        "Final-Year CSE Student",
        2000,
        "Software Developer",
        2000,
        "Java Full Stack Developer",
        2000,
      ]}
      speed={50}
      repeat={Infinity}
    />
  );
}
