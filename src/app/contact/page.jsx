"use client";
import { motion } from "framer-motion";
import MapChart from "@/components/MapChart";
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub, FaTelegram, FaFacebook } from "react-icons/fa"; 
import Link from "next/link";

const ContactPage = () => {
  const text = "Say Hello";

  const socialLinks = [
    {
      title: "Email",
      value: "sundriyalaniket@gmail.com",
      icon: <FaEnvelope className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "", 
      color: "hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10",
    },
    {
      title: "LinkedIn",
      value: "Aniket Sundriyal",
      icon: <FaLinkedin className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://www.linkedin.com/in/aniket-sundriyal", 
      color: "hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-500/10",
    },
    {
      title: "GitHub",
      value: "GxAniket",
      icon: <FaGithub className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://github.com/GxAniket", 
      color: "hover:text-gray-300 hover:border-gray-300/50 hover:bg-gray-500/10",
    },
    {
      title: "Instagram",
      value: "@aniket_sundriyal", 
      icon: <FaInstagram className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://instagram.com/aniket_sundriyal", 
      color: "hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-500/10",
    },
    {
      title: "Telegram",
      value: "@whitehataniket", 
      icon: <FaTelegram className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://t.me/whitehataniket", 
      color: "hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10",
    },
    {
      title: "Facebook",
      value: "Aniket Sundriyal", 
      icon: <FaFacebook className="w-5 h-5 lg:w-6 lg:h-6" />,
      link: "https://www.facebook.com/profile.php?id=100022096712332", 
      color: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-600/10", 
    }
  ];

  return (
    <motion.div
      className="h-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* Laptop view fix: Added items-center and h-full */}
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 py-4 lg:py-0 lg:items-center lg:justify-center lg:gap-8 pt-20 lg:pt-10">
        
        {/* MAP SECTION */}
        <div className="h-[200px] sm:h-[300px] lg:h-[450px] lg:w-1/2 flex items-center justify-center shrink-0">
          <MapChart />
        </div>

        {/* CARDS SECTION - Laptop View Height Controlled */}
        <div className="flex-1 lg:flex-none lg:w-[450px] xl:w-[550px] lg:max-h-[80vh] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col p-5 lg:p-8 shadow-[0_0_30px_rgba(34,211,238,0.1)] overflow-y-auto custom-scrollbar mb-10 lg:mb-0">
          
          <div className="text-center text-2xl lg:text-4xl mb-2 text-white font-bold">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="ml-2">🚀</span>
          </div>

          <p className="text-gray-400 text-center mb-4 lg:mb-6 text-[10px] lg:text-sm px-2">
            Feel free to reach out to me!
          </p>

          {/* Grid optimized to fit in view */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialLinks.map((social, index) => {
              const CardContent = (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center justify-center p-3 lg:p-4 rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 ${social.color} ${social.link ? 'cursor-pointer' : 'cursor-default'}`}
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
                <Link href={social.link} target="_blank" rel="noopener noreferrer" key={index}>
                  {CardContent}
                </Link>
              ) : (
                <div key={index}>{CardContent}</div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;