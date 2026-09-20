import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";
import StarsCanvas from "@/components/Star";
import Cursor from "@/components/Cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Cursor />
        <TransitionProvider>
          <div className="fixed inset-0 -z-10">
            <StarsCanvas />
          </div>
          {children}
        </TransitionProvider>
        
      </body>
    </html>
  );
}