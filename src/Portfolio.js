import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import IntroductionSection from './components/sections/IntroductionSection';
import ServicesSection from './components/sections/ServicesSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CertificationsSection from './components/sections/CertificationsSection';
import ContactSection from './components/sections/ContactSection';

import { SECTIONS_LIST } from './data/heroData';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of SECTIONS_LIST) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative text-[#111827]" style={{ backgroundColor: '#e8e6e1' }}>

      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="pt-28 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        <HeroSection />
        <IntroductionSection />
        <ServicesSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
      </main>

      <ContactSection />

    </div>
  );
}
