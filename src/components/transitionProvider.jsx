"use client";

import Navbar from "./navbar";

export default function TransitionProvider({ children }) {
  return (
    <>
      <Navbar />
      <div className="h-screen overflow-hidden">{children}</div>
    </>
  );
}