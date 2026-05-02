import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";
import StarsCanvas from "@/components/Star";
import Cursor from "@/components/Cursor"; // <-- 1. Ye Cursor import add kiya hai

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {/* 2. Cursor component ko yahan add kiya hai */}
        <Cursor />

        {/* TransitionProvider handles the page animations and navigation */}
        <TransitionProvider>
          {/* Ensure the stars canvas is fixed behind the content */}
          <div className="fixed inset-0 -z-10">
            <StarsCanvas />
          </div>
          {children}
        </TransitionProvider>
        
      </body>
    </html>
  );
}