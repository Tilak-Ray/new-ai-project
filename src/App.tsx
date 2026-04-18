import { useEffect } from 'react';
import { useScroll, motion, useSpring } from 'motion/react';
import Lenis from '@studio-freight/lenis';
import RobotScene from './components/RobotScene';
import { Navbar, Hero, Socials, BackgroundGrid } from './components/UI';
import { AboutSection, WorksSection, ExperienceSection, ContactSection } from './components/Sections';

export default function App() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll value for 3D rotation
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scrolling implementation
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash);
      }
    };

    requestAnimationFrame(raf);
    window.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      window.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Decorative Overlays */}
      <div className="grain-overlay" />
      <BackgroundGrid />
      
      {/* 3D Scene - Fixed in background at z-1 */}
      <RobotScene scroll={smoothScroll} />
      
      {/* UI Layers */}
      <Navbar />
      <Socials />
      
      {/* Content Layers */}
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <WorksSection />
        <ContactSection />
      </div>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] z-50" />
      
      {/* Footer */}
      <footer className="relative py-12 px-8 md:px-24 border-t border-white/5 text-center text-[10px] uppercase tracking-[0.5em] text-muted-gray bg-primary-dark">
        &copy; 2026 TILAK RAY KURMI. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
