import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Github, Grid, Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import OrbitCardStack from './ui/orbit-card-stack';

const FEATURED_PROJECT_TITLES = [
  'ADetectPro (FYP)',
  'Generative AI Models',
  'EmoNet',
  'Smart Gaming Picks',
  'AI Workshop',
];

export default function Project3DShowcase({ projects }) {
  const [viewMode, setViewMode] = useState('orbit'); // 'orbit' | 'grid'
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Filter categories with 'All' first
  const categories = ['All', 'Featured', 'Gen AI', 'Deep Learning', 'C++', 'Web Application', 'ML'];
  
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }
    if (activeCategory === 'Featured') {
      const featured = projects.filter((p) => FEATURED_PROJECT_TITLES.includes(p.title));
      return featured.length ? featured : projects.slice(0, 5);
    }
    return projects.filter((p) =>
      p.tags && p.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }, [projects, activeCategory]);

  // Convert to OrbitStackItem format
  const orbitItems = useMemo(() => {
    return filteredProjects.map((p) => ({
      name: p.title,
      role: p.tags && p.tags.length ? p.tags.slice(0, 2).join(' • ').toUpperCase() : 'PROJECT',
      description: p.desc,
      accent: p.accent || '#00f0ff',
      icon: p.icon,
      link: p.link,
      live: p.live,
      tags: p.tags,
      stat: p.tags && p.tags[0] ? p.tags[0] : 'Featured',
    }));
  }, [filteredProjects]);

  // Reset or clamp index on category change
  useEffect(() => {
    setActiveProjectIndex(0);
  }, [activeCategory]);

  const activeOrbitItem = orbitItems[activeProjectIndex] || orbitItems[0] || null;

  const handleNext = () => {
    if (!orbitItems.length) return;
    setActiveProjectIndex((prev) => (prev + 1) % orbitItems.length);
  };

  const handlePrev = () => {
    if (!orbitItems.length) return;
    setActiveProjectIndex((prev) => (prev - 1 + orbitItems.length) % orbitItems.length);
  };

  return (
    <div className="w-full relative my-4">
      {/* ── CONTROLS & CATEGORY FILTERS ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* View Mode Toggle: Orbit Stack vs Grid View */}
        <div className="border-2 border-[#111827] bg-[#ffffff] p-1 flex items-center gap-1 shadow-[2px_2px_0px_#111827]">
          <button
            onClick={() => setViewMode('orbit')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold transition-all ${
              viewMode === 'orbit' ? 'bg-[#111827] text-white shadow-[2px_2px_0px_#00f0ff]' : 'text-[#111827] hover:bg-gray-100'
            }`}
          >
            <Sparkles size={14} />
            <span>ORBIT STACK</span>
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

      {/* ── 1. ORBIT CARD STACK VIEW (NO BACKGROUND BOX) ── */}
      {viewMode === 'orbit' && (
        <section className="space-y-6">
          {/* Currently Viewing Header */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 font-mono">
                Currently viewing
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold font-mono text-[#111827]">
                {activeOrbitItem ? activeOrbitItem.name : ''}
              </h2>
            </div>

            {/* Quick Actions & Navigation Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Previous / Next Deck Navigator */}
              {orbitItems.length > 1 && (
                <div className="flex items-center border-2 border-[#111827] bg-[#ffffff] shadow-[2px_2px_0px_#111827]">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 hover:bg-gray-100 border-r-2 border-[#111827] transition-colors cursor-pointer"
                    title="Previous Project (Arrow Left)"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="px-3 py-1 font-mono text-xs font-bold text-[#111827] select-none">
                    {activeProjectIndex + 1} / {orbitItems.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1.5 hover:bg-gray-100 border-l-2 border-[#111827] transition-colors cursor-pointer"
                    title="Next Project (Arrow Right)"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {activeOrbitItem && (
                <div className="flex items-center gap-2">
                  {activeOrbitItem.live && (
                    <a
                      href={activeOrbitItem.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#111827] bg-[#cffafe] hover:bg-[#38bdf8] text-[#111827] font-mono font-bold text-xs shadow-[2px_2px_0px_#111827] transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <ExternalLink size={13} />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                  {activeOrbitItem.link && (
                    <a
                      href={activeOrbitItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#111827] bg-[#111827] text-white hover:bg-gray-800 font-mono font-bold text-xs shadow-[2px_2px_0px_#00f0ff] transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Github size={13} />
                      <span>VIEW REPOSITORY</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Clean Floating Orbit Card Stack */}
          <div className="h-[620px] w-full flex items-center justify-center">
            <OrbitCardStack
              items={orbitItems}
              activeIndex={activeProjectIndex}
              spread={150}
              lift={40}
              onActiveChange={(_, idx) => setActiveProjectIndex(idx)}
            />
          </div>
        </section>
      )}

      {/* ── 2. GRID VIEW MODE ── */}
      {viewMode === 'grid' && (
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
