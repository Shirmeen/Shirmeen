import React from 'react';
import profileImage from '../../profile.png';

const DrawnArrow = () => (
  <svg
    width="160"
    height="90"
    viewBox="0 0 160 90"
    className="drawn-arrow w-36 h-20 md:w-44 md:h-24 pointer-events-none"
    style={{ zIndex: 10 }}
  >
    <path d="M10,12 Q70,82 145,42" />
    <path d="M126,28 L145,42 L130,58" />
  </svg>
);

const Smiley = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block ml-2 mb-1"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

export default function HeroSection() {
  return (
    <section id="about" className="min-h-[85vh] py-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Left Column: Titles */}
        <div className="relative pt-12 md:pt-24 z-10">
          <div className="mb-8 font-mono text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-wider text-[#111827] flex items-center gap-2">
            <span className="inline-block border-b-2 border-[#111827] pb-1">
              AI ENGINEER / DATA SCIENTIST
            </span>
          </div>

          <div className="relative inline-block mb-16 mt-4">
            <div className="scrapbook-box animate-float-hero text-3xl md:text-5xl lg:text-6xl text-[#111827] transition-all duration-300 hover:scale-105 hover:-rotate-6 hover:shadow-[8px_8px_0px_#111827] cursor-pointer">
              <Smiley /> SHIRMEEN
            </div>
            {/* Arrow pointing to image & surname */}
            <div className="absolute -bottom-24 -right-24 md:-right-36 hidden md:block pointer-events-none transition-transform duration-300 hover:scale-110">
              <DrawnArrow />
            </div>
          </div>
        </div>

        {/* Right Column: Image & Surname */}
        <div className="relative flex justify-center md:justify-end pr-0 md:pr-12 pt-8">
          <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] group">
            <img
              src={profileImage}
              alt="Shirmeen Aamir"
              className="w-full h-full object-cover border-2 border-[#111827] shadow-[6px_6px_0px_#111827] group-hover:scale-[1.02] transition-all duration-500"
            />
            <div className="absolute -bottom-8 left-0 sm:-left-6 md:-left-12 z-20">
              <div className="scrapbook-box animate-float-surname text-3xl md:text-5xl lg:text-6xl text-[#111827] bg-[#e8e6e1] transition-all duration-300 hover:scale-105 hover:rotate-6 hover:shadow-[8px_8px_0px_#111827] cursor-pointer">
                AAMIR
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
