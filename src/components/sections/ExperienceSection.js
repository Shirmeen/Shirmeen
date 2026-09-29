import React from 'react';
import { GraduationCap } from 'lucide-react';
import { EXPERIENCE, EDUCATION } from '../../data/experience';

export default function ExperienceSection() {
  return (
    <>
      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-20 border-t-2 border-[#111827]">
        <div className="mb-16 text-center">
          <div className="border-2 border-[#111827] px-8 py-3 bg-[#e8e6e1] text-2xl md:text-4xl font-mono font-bold tracking-widest inline-block">
            EXPERIENCE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="border-2 border-[#111827] bg-[#ffffff] p-8 relative shadow-[4px_4px_0px_rgba(17,24,39,0.1)]"
            >
              <div className="absolute top-0 right-0 border-b-2 border-l-2 border-[#111827] px-3 py-1 font-mono text-xs font-bold bg-[#e8e6e1]">
                {exp.duration}
              </div>
              <h3 className="font-bold text-xl mb-1 font-mono">{exp.role}</h3>
              <h4 className="text-md font-semibold text-gray-700 mb-4">{exp.company}</h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
              <ul className="text-sm space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold">*</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="py-20 border-t-2 border-[#111827]">
        <div className="mb-16 text-center">
          <div className="border-2 border-[#111827] px-8 py-3 bg-[#e8e6e1] text-2xl md:text-4xl font-mono font-bold tracking-widest inline-block shadow-[4px_4px_0px_#111827]">
            EDUCATION
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="border-2 border-[#111827] bg-[#ffffff] p-6 relative shadow-[4px_4px_0px_#111827] hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 border-2 border-[#111827] bg-[#cffafe] shadow-[2px_2px_0px_#111827] inline-block">
                    <GraduationCap size={24} className="text-[#111827]" />
                  </span>
                  {edu.duration && (
                    <span className="border-2 border-[#111827] px-3 py-1 font-mono text-xs font-bold bg-[#e8e6e1] shadow-[2px_2px_0px_#111827]">
                      {edu.duration}
                    </span>
                  )}
                </div>

                {/* Institution Name */}
                <h3 className="font-bold text-xl md:text-2xl text-[#111827] font-mono tracking-tight mb-2 uppercase">
                  {edu.institution}
                </h3>

                {/* Degree */}
                <div className="border-t-2 border-[#111827] pt-3 mt-3">
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 font-sans leading-snug">
                    {edu.degree}
                  </h4>
                </div>
              </div>

              {edu.description && (
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
