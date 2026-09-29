import React from 'react';
import Project3DShowcase from '../Project3DShowcase';
import { PROJECTS } from '../../data/projects';

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

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 border-t-2 border-[#111827]">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="border-2 border-[#111827] px-6 py-2 bg-[#e8e6e1] text-xl md:text-3xl font-mono font-bold tracking-widest inline-block shadow-[4px_4px_0px_#111827] mb-2 uppercase">
            FEATURED PROJECTS <Smiley />
          </div>
          <p className="text-sm text-gray-700 font-mono">
            Explore my real-world Machine Learning, Gen AI &amp; Software Engineering projects
          </p>
        </div>
      </div>

      <Project3DShowcase projects={PROJECTS} />
    </section>
  );
}
