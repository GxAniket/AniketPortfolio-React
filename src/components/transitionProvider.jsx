
"use client";

import Navbar from "./navbar";

export default function TransitionProvider({ children }) {
  return (
    <>
      <Navbar />
      <div className="
        min-h-screen h-auto
        overflow-x-clip overflow-y-visible
        lg:h-screen
        lg:overflow-hidden
      ">
        {children}
      </div>
    </>
  );
}
