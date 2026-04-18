import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, ChevronRight, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Home', 'About', 'Experience', 'Works', 'Contacts'];
  
  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference">
      <a href="#home" className="text-xl md:text-2xl font-display font-bold tracking-tighter text-soft-white cursor-pointer relative z-50">
        TILAK<span className="text-accent-fire">.</span>
      </a>
      
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-12">
        {navItems.map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] uppercase tracking-[0.3em] text-muted-gray hover:text-soft-white transition-colors duration-300 relative group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-fire transition-all duration-300 group-hover:w-full" />
          </motion.a>
        ))}
      </div>
      
      {/* Mobile Toggle */}
      <button 
        className="md:hidden z-50 text-soft-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-primary-dark/95 z-40 flex flex-col items-center justify-center space-y-8 md:hidden p-8"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-bold tracking-widest text-soft-white uppercase"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="hidden md:flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-[10px] tracking-widest text-muted-gray">
          <span className="text-soft-white font-bold">ENG</span>
          <span className="opacity-30">US</span>
        </div>
        <Grid className="w-5 h-5 text-soft-white cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
      </div>
    </nav>
  );
}

export function Socials() {
  const socials = ['Vk', 'Tw', 'Fb', 'In', 'Be'];
  return (
    <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-8 z-40 hidden sm:flex">
      {socials.map((s, i) => (
        <motion.a
          key={s}
          href="#"
          className="text-[10px] font-medium tracking-widest text-muted-gray hover:text-accent-fire transition-all duration-300 rotate-0 hover:-translate-x-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          {s}
        </motion.a>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <div id="home" className="relative z-10 min-h-screen flex items-center px-6 md:px-24 pt-20">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-6"
        >
          <div className="h-[1px] w-8 md:w-12 bg-accent-fire" />
          <span className="text-[8px] md:text-[10px] font-mono tracking-[0.5em] text-accent-fire uppercase">
            MERN STACK DEVELOPER
          </span>
        </motion.div>

        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-12 top-4 w-16 h-48 bg-accent-fire/30 blur-[6px] hidden md:block"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-[8rem] font-display font-bold tracking-tight leading-[0.9] text-soft-white relative"
          >
            TILAK RAY<br /><span className="text-accent-fire">KURMI.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-muted-gray text-xs sm:text-sm md:text-base max-w-lg leading-relaxed mb-10 md:mb-12"
        >
          A self-taught tech enthusiast with a deep curiosity for how things work behind the screen. Crafting responsive interfaces and debugging the digital future.
        </motion.p>

        <motion.a
          whileHover={{ scale: 1.05, x: 10 }}
          whileTap={{ scale: 0.95 }}
          href="https://tilak-ray-kurmi.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center w-fit space-x-4 border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-full glass hover:bg-accent-fire/10 hover:border-accent-fire/30 transition-all duration-500 mb-20 md:mb-0"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Engage Core</span>
          <ChevronRight className="w-4 h-4 text-accent-fire group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Embedded Info Cards within Hero context */}
      <div className="absolute bottom-12 right-0 hidden lg:flex space-x-6 px-24">
        <InfoCards />
      </div>

      {/* Mobile Info Cards (Stacked) */}
      <div className="absolute bottom-8 left-6 right-6 lg:hidden flex flex-col space-y-4 pt-12">
         {/* Shown for mobile only if space permits or just rely on sections */}
      </div>

      <Annotations />
    </div>
  );
}

export function Annotations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      <div className="absolute top-[30%] right-[25%] md:right-[35%]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="h-[1px] w-12 md:w-24 bg-white/20" />
          <span className="text-[8px] font-mono tracking-widest text-muted-gray uppercase whitespace-nowrap">
            KINETIC VORTEX
          </span>
        </motion.div>
      </div>
      
      <div className="absolute bottom-[35%] right-[35%] md:right-[45%]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="h-[1px] w-12 md:w-16 bg-white/20" />
          <span className="text-[8px] font-mono tracking-widest text-muted-gray uppercase whitespace-nowrap">
            THERMAL ENGINE
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export function InfoCards() {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      <motion.div
        whileHover={{ y: -5 }}
        className="w-full md:w-56 h-36 glass p-5 rounded-xl flex flex-col justify-between"
      >
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">Technology</span>
        <p className="text-[10px] text-muted-gray leading-relaxed">
          Proprietary neural architectures optimized for decentralized cognitive processing.
        </p>
      </motion.div>
      
      <motion.div
        whileHover={{ y: -5 }}
        className="w-full md:w-56 h-36 glass p-5 rounded-xl flex flex-col justify-between"
      >
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">Innovation</span>
        <p className="text-[10px] text-muted-gray leading-relaxed">
          Recursive feedback loops enabling real-time evolution of synthetic behavior patterns.
        </p>
      </motion.div>
    </div>
  );
}

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]">
      <div className="absolute inset-0 grid grid-cols-4 divide-x divide-soft-white h-full" />
      <div className="absolute inset-0 grid grid-rows-4 divide-y divide-soft-white w-full" />
    </div>
  );
}
