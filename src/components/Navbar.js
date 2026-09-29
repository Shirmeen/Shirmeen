import React from 'react';
import { Menu, X } from 'lucide-react';
import { SECTIONS_LIST } from '../data/heroData';

export default function Navbar({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-[#e8e6e1]/90 backdrop-blur-sm border-b-2 border-[#111827]">
      <div
        className="text-xl font-bold font-mono tracking-tighter cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        SA
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-10 text-sm">
        {SECTIONS_LIST.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            onClick={(e) => { e.preventDefault(); scrollToSection(s); }}
            className={`nav-link ${activeSection === s ? 'underline underline-offset-4 decoration-2' : ''}`}
          >
            {s.toUpperCase()}
          </a>
        ))}
        <a
          href={`${process.env.PUBLIC_URL}/resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-[#111827] px-4 py-1.5 font-bold hover:bg-[#111827] hover:text-[#e8e6e1] transition-colors"
        >
          RESUME
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-[#111827]"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#e8e6e1] border-b-2 border-[#111827] flex flex-col px-6 py-4 gap-4 md:hidden">
          {SECTIONS_LIST.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(s); }}
              className={`font-mono font-bold text-sm uppercase tracking-widest ${activeSection === s ? 'underline underline-offset-4 decoration-2' : ''}`}
            >
              {s.toUpperCase()}
            </a>
          ))}
          <a
            href={`${process.env.PUBLIC_URL}/resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#111827] px-4 py-1.5 font-bold text-center hover:bg-[#111827] hover:text-[#e8e6e1] transition-colors"
          >
            RESUME
          </a>
        </div>
      )}
    </nav>
  );
}
