"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { 
  SiJavascript, SiPython, SiHtml5, SiCss3, 
  SiPhp, SiReact, SiCplusplus, SiTelegram, SiGithub 
} from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";

const translations = {
  RU: { role: "Full-stack разработчик", contact: "Связаться со мной" },
  EN: { role: "Full-stack developer", contact: "Contact Me" },
  UA: { role: "Full-stack розробник", contact: "Зв'язатися зі мною" },
};

const languages = [
  { icon: <SiJavascript />, name: "JavaScript", color: "#f7df1e" },
  { icon: <SiPython />, name: "Python", color: "#3776ab" },
  { icon: <SiHtml5 />, name: "HTML5", color: "#e34f26" },
  { icon: <SiCss3 />, name: "CSS3", color: "#1572b6" },
  { icon: <SiPhp />, name: "PHP", color: "#777bb4" },
  { icon: <SiReact />, name: "React", color: "#61dafb" },
  { icon: <SiCplusplus />, name: "C++", color: "#00599c" },
];

export default function ProfileCard() {
  const [lang, setLang] = useState<"RU" | "EN" | "UA">("RU");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const lightX = useSpring(mouseX, springConfig);
  const lightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center overflow-hidden antialiased font-sans">
      

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ x: lightX, y: lightY, translateX: "-50%", translateY: "-50%" }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-full blur-[120px] opacity-40"
        />
        <motion.div 
          style={{ x: lightX, y: lightY, translateX: "10%", translateY: "10%" }}
          animate={{ 
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-cyan-400 to-green-500 rounded-full blur-[100px] opacity-25"
        />
      </div>

      <div className="absolute top-10 left-10 z-50">
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <IoSettingsOutline className={`text-2xl ${isSettingsOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`} />
        </button>

        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-14 left-0 bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 p-2 rounded-xl shadow-2xl flex flex-col gap-1 min-w-[100px]"
            >
              {(["RU", "EN", "UA"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setIsSettingsOpen(false); }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang === l ? 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white' : 'text-gray-400 hover:bg-white/5'}`}
                >
                  {l}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-[360px] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,1)] text-center"
      >
        <div className="relative w-28 h-28 mx-auto mb-6">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full blur-md opacity-70" 
          />
          <div className="relative w-full h-full rounded-full border-2 border-white/20 overflow-hidden bg-black">
            <Image 
              src="/putin.jpg" 
              alt="avatar"
              fill
              priority
              quality={100}
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl font-black text-white mb-1 tracking-tight">ByteXk</h1>
        <p className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent text-lg font-bold mb-8">
          {translations[lang].role}
        </p>

        <div className="grid grid-cols-4 gap-6 mb-10">
          {languages.map((langItem, idx) => (
            <div key={idx} className="group relative flex justify-center">
              <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-white text-black text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-xl z-50 whitespace-nowrap">
                {langItem.name}
              </span>
              
              <motion.div 
                whileHover={{ y: -10, scale: 1.3 }}
                style={{ color: '#666' }}
                whileHover={{ color: langItem.color, filter: `drop-shadow(0 0 15px ${langItem.color}cc)` }}
                className="text-4xl cursor-pointer transition-all duration-300"
              >
                {langItem.icon}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <motion.a
            href="https://t.me/test"
            target="_blank"
            whileHover={{ scale: 1.15, color: "#229ED9", filter: "drop-shadow(0 0 15px #229ED9cc)" }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center text-2xl text-white/60 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <SiTelegram />
          </motion.a>
          <motion.a
            href="https://github.com/ByteXk"
            target="_blank"
            whileHover={{ scale: 1.15, color: "#fff", filter: "drop-shadow(0 0 15px #ffffffcc)" }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center text-2xl text-white/60 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <SiGithub />
          </motion.a>
        </div>

        <motion.a
          href="https://t.me/test"
          target="_blank"
          whileHover={{ scale: 1.05, backgroundColor: "#000", borderColor: "rgba(255,255,255,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white rounded-2xl font-black text-lg transition-all border border-white/20 shadow-lg"
        >
          <SiTelegram className="text-2xl text-white" />
          {translations[lang].contact}
        </motion.a>
      </motion.div>


      <div className="absolute top-0 left-0 w-full h-full opacity-[0.07] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}