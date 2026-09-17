import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Play, Pause, Grid, Layers, Sparkles, ArrowUpRight } from 'lucide-react';

export default function Project3DShowcase({ projects }) {
  const [viewMode, setViewMode] = useState('3d'); // 3d circular ring
  const [phase, setPhase] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isHovered, setIsHovered] = useState(false);
  
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Filter categories
  const categories = ['All', 'Gen AI', 'Deep Learning', 'C++', 'Web Application', 'ML'];
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase())));

  const totalCards = filteredProjects.length;
  // 3D Cylinder radius and step
  const radius = 680;
  const step = 360 / Math.max(1, totalCards);

  // Smooth continuous circular rotation loop
  const tick = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
    lastTimeRef.current = timestamp;

    if (isAutoSpinning && !isHovered && viewMode === '3d') {
      setPhase((prev) => (prev - 12 * dt) % 360);
    }

    animRef.current = requestAnimationFrame(tick);
  }, [isAutoSpinning, isHovered, viewMode]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [tick]);

  const handleNext = () => {
    setPhase((prev) => prev - step);
  };

  const handlePrev = () => {
    setPhase((prev) => prev + step);
  };

  return (
    <div className="w-full relative my-4">
      {/* ── CONTROLS & CATEGORY FILTERS ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setPhase(0);
              }}
              className={`px-3 py-1.5 text-xs font-mono font-bold border-2 border-[#111827] transition-all ${
                activeCategory === cat
                  ? 'bg-[#111827] text-white shadow-[2px_2px_0px_#00f0ff]'
                  : 'bg-[#e8e6e1] text-[#111827] hover:bg-white shadow-[2px_2px_0px_#111827]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode Toggle & Auto-spin controls */}
        <div className="flex items-center gap-3">
          {viewMode === '3d' && (
            <button
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#111827] bg-[#ffffff] font-mono text-xs font-bold shadow-[2px_2px_0px_#111827] hover:bg-[#cffafe] transition-colors"
              title="Toggle Auto Spin"
            >
              {isAutoSpinning ? <Pause size={14} /> : <Play size={14} />}
              <span>{isAutoSpinning ? 'SPINNING' : 'PAUSED'}</span>
            </button>
          )}

          <div className="border-2 border-[#111827] bg-[#ffffff] p-1 flex items-center gap-1 shadow-[2px_2px_0px_#111827]">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold transition-all ${
                viewMode === '3d' ? 'bg-[#111827] text-white' : 'text-[#111827] hover:bg-gray-100'
              }`}
            >
              <Layers size={14} />
              <span>3D RING</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold transition-all ${
                viewMode === 'grid' ? 'bg-[#111827] text-white' : 'text-[#111827] hover:bg-gray-100'
              }`}
            >
              <Grid size={14} />
              <span>GRID VIEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 3D CIRCULAR RING SHOWCASE ── */}
      {viewMode === '3d' ? (
        <div 
          className="relative w-full h-[520px] md:h-[580px] overflow-hidden border-2 border-[#111827] bg-[#e8e6e1] rounded-xl flex items-center justify-center shadow-[6px_6px_0px_#111827]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Grid Pattern matching site theme */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#111827_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* 3D Perspective Ring Stage */}
          <div 
            className="w-full h-full flex items-center justify-center relative"
            style={{
              perspective: '891px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {filteredProjects.map((proj, i) => {
                // Angle math per card
                const rawAngle = i * step + phase;
                const angle = ((rawAngle % 360) + 540) % 360 - 180; // signed angle -180..180
                const absAngle = Math.abs(angle);

                // Cull back half cards (> 48 deg) so front cards remain spacious and non-overlapping!
                if (absAngle > 48) return null;

                const rad = (angle * Math.PI) / 180;
                const cos = Math.cos(rad);
                const sin = Math.sin(rad);

                const x = radius * sin;
                const z = radius * (1 - cos);
                const brightness = Math.max(0.65, Math.min(1, 0.85 + 0.4 * (cos - 0.7)));
                const isCentered = absAngle < 12;

                return (
                  <div
                    key={proj.title}
                    style={{
                      position: 'absolute',
                      width: '330px',
                      height: '400px',
                      left: 'calc(50% - 165px)',
                      top: 'calc(50% - 200px)',
                      transform: `translate3d(${x}px, 0px, ${-z}px) rotateY(${-angle}deg)`,
                      filter: `brightness(${brightness})`,
                      zIndex: Math.round(1000 - z),
                      backfaceVisibility: 'hidden',
                      willChange: 'transform',
                    }}
                    className={`border-2 border-[#111827] bg-[#ffffff] p-6 flex flex-col justify-between rounded-xl shadow-[6px_6px_0px_#111827] transition-shadow duration-300 select-none ${
                      isCentered ? 'ring-4 ring-[#111827] shadow-[8px_8px_0px_#111827] scale-[1.02]' : ''
                    }`}
                  >
                    <div>
                      {/* Card Header & Action Buttons */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="p-2.5 border-2 border-[#111827] bg-[#e8e6e1] shadow-[2px_2px_0px_#111827]">
                          {proj.icon}
                        </span>

                        {/* Prominent Repo & Live Links */}
                        <div className="flex gap-2 z-20">
                          {proj.live && (
                            <a
                              href={proj.live}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 px-2.5 py-1 border-2 border-[#111827] bg-[#cffafe] hover:bg-[#38bdf8] text-[#111827] font-mono font-bold text-xs shadow-[2px_2px_0px_#111827] transition-all hover:-translate-y-0.5"
                              title="Live Demo"
                            >
                              <ExternalLink size={13} />
                              <span>DEMO</span>
                            </a>
                          )}
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 px-2.5 py-1 border-2 border-[#111827] bg-[#111827] text-white hover:bg-gray-800 font-mono font-bold text-xs shadow-[2px_2px_0px_#00f0ff] transition-all hover:-translate-y-0.5"
                              title="View GitHub Repository"
                            >
                              <Github size={13} />
                              <span>REPO</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-mono font-bold text-xl text-[#111827] mb-2 leading-snug">
                        {proj.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-sm text-gray-800 leading-relaxed font-sans">
                        {proj.desc}
                      </p>
                    </div>

                    {/* Tech Tags & Bottom Direct Link */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 pt-3 mb-3 border-t-2 border-[#111827]">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono font-bold border border-[#111827] px-2 py-0.5 bg-[#e8e6e1]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Explicit Direct GitHub Button */}
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 border-2 border-[#111827] bg-[#e8e6e1] hover:bg-[#111827] hover:text-white text-[#111827] font-mono font-bold text-xs transition-colors shadow-[2px_2px_0px_#111827]"
                      >
                        <Github size={14} />
                        <span>VIEW REPOSITORY</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 border-2 border-[#111827] bg-[#ffffff] hover:bg-[#cffafe] text-[#111827] shadow-[4px_4px_0px_#111827] transition-all hover:-translate-x-1"
            title="Previous Project"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 border-2 border-[#111827] bg-[#ffffff] hover:bg-[#cffafe] text-[#111827] shadow-[4px_4px_0px_#111827] transition-all hover:translate-x-1"
            title="Next Project"
          >
            <ChevronRight size={28} />
          </button>

          {/* Stage Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-[#111827] text-white font-mono text-xs px-4 py-2 rounded-full border-2 border-[#111827] shadow-[3px_3px_0px_#00f0ff] flex items-center gap-2">
            <Sparkles size={14} className="text-[#00f0ff]" />
            <span>3D Circular Stage • {totalCards} Projects</span>
          </div>
        </div>
      ) : (
        /* ── GRID VIEW MODE ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <div
              key={idx}
              className="border-2 border-[#111827] bg-[#ffffff] p-6 flex flex-col justify-between hover:shadow-[6px_6px_0px_#111827] hover:-translate-y-1 transition-all shadow-[3px_3px_0px_rgba(17,24,39,0.15)] group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 border-2 border-[#111827] bg-[#e8e6e1] shadow-[2px_2px_0px_#111827]">
                    {proj.icon}
                  </span>
                  <div className="flex gap-2">
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 border-2 border-[#111827] bg-[#cffafe] hover:bg-[#38bdf8] text-[#111827] font-mono font-bold text-xs shadow-[2px_2px_0px_#111827] transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink size={13} />
                        <span>DEMO</span>
                      </a>
                    )}
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 border-2 border-[#111827] bg-[#111827] text-white hover:bg-gray-800 font-mono font-bold text-xs shadow-[2px_2px_0px_#00f0ff] transition-all"
                      title="GitHub Repository"
                    >
                      <Github size={13} />
                      <span>REPO</span>
                    </a>
                  </div>
                </div>

                <h3 className="font-mono font-bold text-lg text-[#111827] mb-2">{proj.title}</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed font-sans">{proj.desc}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-3 mb-3 border-t-2 border-[#111827]">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-bold border border-[#111827] px-2 py-1 bg-[#e8e6e1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 border-2 border-[#111827] bg-[#e8e6e1] hover:bg-[#111827] hover:text-white text-[#111827] font-mono font-bold text-xs transition-colors shadow-[2px_2px_0px_#111827]"
                >
                  <Github size={14} />
                  <span>VIEW REPOSITORY</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
