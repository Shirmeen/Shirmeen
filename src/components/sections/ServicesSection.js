import React from 'react';
import { Laptop, BrainCircuit, Database, Globe } from 'lucide-react';
import { SKILLS } from '../../data/skills';

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 border-t-2 border-[#111827] flex flex-col items-center">
      <div className="mb-16">
        <div className="border-2 border-[#111827] px-8 py-3 bg-[#e8e6e1] text-2xl md:text-4xl font-mono font-bold tracking-widest">
          SERVICES <span className="font-sans font-light">I OFFER</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-12 w-full max-w-4xl">

        {/* Service 1 – AI Development */}
        <div className="flex items-start gap-6">
          <Laptop size={48} strokeWidth={1.5} className="mt-1" />
          <div>
            <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
              {SKILLS[0]?.category || 'AI Development'}
            </h3>
            <p className="text-sm text-gray-700">
              Specialized in building and deploying LLMs, LangChain architectures, and generative
              AI pipelines.
            </p>
          </div>
        </div>

        {/* Service 2 – Deep Learning */}
        <div className="flex items-start gap-6">
          <BrainCircuit size={48} strokeWidth={1.5} className="mt-1" />
          <div>
            <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
              {SKILLS[2]?.category || 'Deep Learning'}
            </h3>
            <p className="text-sm text-gray-700">
              Designing and training custom neural networks, computer vision models, and predictive
              analytics.
            </p>
          </div>
        </div>

        {/* Service 3 – Data Science */}
        <div className="flex items-start gap-6">
          <Database size={48} strokeWidth={1.5} className="mt-1" />
          <div>
            <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
              Data Science
            </h3>
            <p className="text-sm text-gray-700">
              Targeted to improve data structuring, analysis, and visualization dashboards for
              enterprise solutions.
            </p>
          </div>
        </div>

        {/* Service 4 – Web Development */}
        <div className="flex items-start gap-6">
          <Globe size={48} strokeWidth={1.5} className="mt-1" />
          <div>
            <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
              {SKILLS[1]?.category || 'Web Dev'}
            </h3>
            <p className="text-sm text-gray-700">
              Full stack integration of AI models into modern web applications using React and
              Django.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
