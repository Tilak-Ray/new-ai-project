import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Zap, Globe, Phone, Mail, MapPin } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-32 px-8 md:px-24 flex flex-col justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-mono tracking-[0.5em] text-accent-fire uppercase">01 // About Me</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-medium tracking-tighter">
            THE <span className="text-accent-fire italic">JOURNEY.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 pt-12"
        >
          <p className="text-muted-gray text-xl leading-relaxed max-w-lg">
            Hey, I'm <strong className="text-soft-white">Tilak Ray Kurmi</strong> — a self-taught tech enthusiast. After completing my 12th, I immersed myself in the world of programming, learning HTML, CSS, JavaScript, and the MERN stack, along with foundational languages like C and C++.
          </p>
          <p className="text-muted-gray text-lg leading-relaxed max-w-lg">
            I enjoy crafting responsive interfaces, debugging tricky layouts, and experimenting with animations to bring ideas to life. This portfolio is a glimpse into that journey — raw, evolving, and fueled by passion.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-3xl font-display font-bold">MERN</span>
              <p className="text-[10px] uppercase tracking-widest text-muted-gray">Core Stack</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-display font-bold">2025</span>
              <p className="text-[10px] uppercase tracking-widest text-muted-gray">Present Node</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WorksSection() {
  const works = [
    { title: 'E-commerce Store UI', category: 'Product Design', image: 'https://picsum.photos/seed/shop/800/600' },
    { title: 'Blog Platform Layout', category: 'CMS Architecture', image: 'https://picsum.photos/seed/blog/800/600' },
    { title: 'Admin Dashboard', category: 'Data Visualization', image: 'https://picsum.photos/seed/dash/800/600' },
    { title: 'Real-time Chat App', category: 'Socket Engine', image: 'https://picsum.photos/seed/chat/800/600' },
  ];

  return (
    <section id="works" className="min-h-screen py-32 px-8 md:px-24">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.5em] text-accent-fire uppercase">02 // Selected Works</span>
          <h2 className="text-6xl font-display font-medium tracking-tighter">PORTFOLIO</h2>
        </div>
        <button className="text-[10px] uppercase tracking-[0.3em] flex items-center space-x-2 text-muted-gray hover:text-soft-white transition-colors">
          <span>View All Synapses</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {works.map((work, i) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative cursor-pointer"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl glass mb-6">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[8px] uppercase tracking-widest text-accent-fire">{work.category}</p>
              <h3 className="text-xl font-display font-medium">{work.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const experience = [
    { title: 'Full MERN Stack Journey', period: '2025-Present', desc: 'Developing full-stack web applications and participating in hackathons like HACK 2 INNOVATE and HACK 4 IMPACT.' },
    { title: 'Modern Web Development', period: '2024-2025', desc: 'JavaScript, Tailwind & React focus. Built multipage modern websites with responsive design.' },
    { title: 'Frontend Development', period: '2023-2024', desc: 'Foundations of HTML & CSS. Started building personal projects and experimental layouts.' },
  ];

  return (
    <section id="experience" className="min-h-screen py-20 md:py-32 px-6 md:px-24 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.5em] text-accent-fire uppercase">03 // Timeline</span>
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter">EXPERIENCE</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {experience.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 glass rounded-3xl flex flex-col md:flex-row md:items-center justify-between group hover:border-accent-fire/30 transition-all"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-accent-fire tracking-widest">{item.period}</span>
                <h3 className="text-2xl md:text-3xl font-display font-medium uppercase">{item.title}</h3>
                <p className="text-muted-gray text-xs md:text-sm leading-relaxed max-w-lg">{item.desc}</p>
              </div>
              <div className="mt-8 md:mt-0 opacity-20 group-hover:opacity-100 transition-opacity hidden md:block">
                <Zap className="w-12 h-12 text-accent-fire" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contacts" className="min-h-screen py-20 md:py-32 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.5em] text-accent-fire uppercase">04 // Connect</span>
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter">GET IN TOUCH.</h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-accent-fire">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-gray">Direct Node</p>
                <p className="text-base md:text-lg">tilakray0102@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-accent-fire">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-gray">Availability</p>
                <p className="text-base md:text-lg">Open for Opportunities</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-accent-fire">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-gray">Location</p>
                <p className="text-base md:text-lg">Synthetic Node // Global</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 md:p-12 rounded-[2rem] space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted-gray">Identity</label>
              <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:outline-none focus:border-accent-fire transition-colors" placeholder="NAME" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted-gray">Neural Mesh</label>
              <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:outline-none focus:border-accent-fire transition-colors" placeholder="EMAIL" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-gray">Message Burst</label>
            <textarea className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 focus:outline-none focus:border-accent-fire transition-colors h-32" placeholder="THE SYNC IS..." />
          </div>
          <button className="w-full py-4 md:py-6 bg-accent-fire text-primary-dark font-bold tracking-[0.5em] uppercase hover:bg-accent-fire/80 transition-all text-xs md:text-base">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}
