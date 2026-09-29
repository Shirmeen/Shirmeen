import React from 'react';
import { HERO_DATA } from '../../data/heroData';

export default function IntroductionSection() {
  return (
    <section id="introduction" className="py-20 border-t-2 border-[#111827]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">

        {/* Content */}
        <div className="md:col-span-7 pl-0 md:pl-8 space-y-6">
          <div>
            <div className="scrapbook-box tilt-left text-2xl md:text-4xl text-[#111827] mb-6">
              INTRODUCTION
            </div>
          </div>

          <p className="text-lg md:text-xl font-medium max-w-xl leading-relaxed text-[#111827]">
            {HERO_DATA.description}
          </p>

          <p className="text-sm md:text-base text-gray-800 leading-relaxed font-sans">
            Driven by curiosity at the intersection of machine intelligence and practical software
            engineering. I specialize in architecting autonomous multi-agent systems, training
            probabilistic deep learning models with uncertainty quantification, and building
            end-to-end applications that bridge complex AI research with reliable production
            environments.
          </p>

          {/* Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="border-2 border-[#111827] bg-[#ffffff] p-4 shadow-[3px_3px_0px_#111827]">
              <div className="font-mono font-bold text-xs uppercase tracking-wider mb-1">
                Production GenAI
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                LangChain architectures, agentic pipelines, structured prompt engineering, and LLM
                integrations.
              </p>
            </div>

            <div className="border-2 border-[#111827] bg-[#ffffff] p-4 shadow-[3px_3px_0px_#111827]">
              <div className="font-mono font-bold text-xs uppercase tracking-wider mb-1">
                Deep Learning &amp; Research
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Bayesian Graph Neural Networks, GANs, VAEs, and computer vision with uncertainty
                estimation.
              </p>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-mono font-bold border-2 border-[#111827] bg-[#e8e6e1] px-3 py-1 shadow-[2px_2px_0px_#111827]">
              Lahore, Pakistan
            </span>
            <span className="text-xs font-mono font-bold border-2 border-[#111827] bg-[#e8e6e1] px-3 py-1 shadow-[2px_2px_0px_#111827]">
              18+ Projects Completed
            </span>
            <span className="text-xs font-mono font-bold border-2 border-[#111827] bg-[#e8e6e1] px-3 py-1 shadow-[2px_2px_0px_#111827]">
              Open for Opportunities
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
