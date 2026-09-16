"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { Pin } from "lucide-react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
  colorTheme?: "orange" | "blue" | "purple";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Card = ({
  number,
  title,
  description,
  link,
  image,
  colorTheme = "blue",
  className,
  rotate,
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    orange: "bg-[#fff7ed]",
    blue: "bg-[#eff6ff]",
    purple: "bg-[#faf5ff]",
  };
  const defaultAccentColors = {
    orange: "#ea580c",
    blue: "#2563eb",
    purple: "#7c3aed",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const accentColor = defaultAccentColors[colorTheme];

  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={`relative w-full md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className} ${link ? "cursor-pointer block" : ""}`}
    >
      <div className="bg-[#ffffff] p-3 rounded-2xl shadow-[4px_4px_0px_#111827] border-2 border-[#111827]">
        <Pin className="w-6 h-6 text-[#111827] z-20 mb-3 mx-auto" />
        <div
          className={`${bgColor} border-2 border-[#111827] rounded-xl p-4 h-full flex flex-col relative overflow-hidden`}
        >
          <span
            className="text-3xl font-bold font-mono text-[#111827] mb-2"
          >
            {number}
          </span>
          <h3 className="text-lg font-bold font-mono text-[#111827] leading-tight mb-2">
            {title}
          </h3>
          {image && (
            <div className="mb-4 mt-2 overflow-hidden rounded-lg border-2 border-[#111827]">
              <img src={image} alt={title} className="w-full h-32 object-cover hover:scale-105 transition-transform" />
            </div>
          )}
          <p className="text-gray-700 text-xs font-sans leading-relaxed mb-4">
            {description}
          </p>
          {link && (
            <div className="mt-auto pt-2">
              <span className="inline-block border border-[#111827] bg-[#ffffff] px-2.5 py-1 text-xs font-mono font-bold text-[#111827] hover:bg-[#111827] hover:text-[#ffffff] transition-colors shadow-[1px_1px_0px_#111827]">
                View Certificate →
              </span>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export interface Step {
  title: string;
  description: string;
  link?: string;
  image?: string;
  colorTheme?: "orange" | "blue" | "purple";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-3" },
  {
    className: "md:absolute md:top-[120px] md:right-[15%]",
    rotate: "-rotate-3",
  },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-3" },
  {
    className: "md:absolute md:top-[570px] md:right-[10%]",
    rotate: "-rotate-3",
  },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "rotate-3" },
  {
    className: "md:absolute md:top-[970px] md:right-[15%]",
    rotate: "-rotate-3",
  },
];

export default function HowItWorks({
  features,
  className,
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Intro to Programming",
      description: "Completed Kaggle's Intro to Programming course, covering Python fundamentals and essential coding concepts.",
      link: "https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-programming",
      colorTheme: "orange",
    },
    {
      title: "Intro to SQL",
      description: "Learned how to query and manipulate data using SQL through Kaggle's hands-on course.",
      link: "https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-sql",
      colorTheme: "blue",
    },
    {
      title: "Data Visualization",
      description: "Mastered data visualization techniques using Python libraries through Kaggle's certification course.",
      link: "https://www.kaggle.com/learn/certification/shirmeenaamir/data-visualization",
      colorTheme: "purple",
    },
    {
      title: "Intro to Deep Learning",
      description: "Gained foundational deep learning skills including neural networks and model training via Kaggle.",
      link: "https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-deep-learning",
      colorTheme: "orange",
    },
    {
      title: "Multi AI Agent Systems",
      description: "Completed DeepLearning.AI's course on building and orchestrating multi-agent AI systems.",
      link: "http://learn.deeplearning.ai/accomplishments/b60fc0e8-55fb-4aca-bcbf-5929472d5c89",
      colorTheme: "blue",
    },
    {
      title: "10Pearls University Certificate",
      description: "Earned a certificate from 10Pearls University for completing their tech-focused training program.",
      link: "https://10pearlsuniversity.org/view-certificate/?cid=10PUC-6efc0be387dc98490e8a7165e27cedd46c33724bea620f84195311403",
      colorTheme: "purple",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else if (data.length === 5) height = 1130;
  else height = 1400;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`bg-transparent max-md:pt-6 max-md:pb-16 md:py-12 px-4 relative ${className || ""}`}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0)
                      return "M 290 150 C 500 150, 550 270, 710 270"; // 1 -> 2
                    if (index === 1)
                      return acc + " C 850 270, 500 350, 290 450"; // 2 -> 3
                    if (index === 2)
                      return acc + " C 290 600, 550 720, 750 720"; // 3 -> 4
                    if (index === 3)
                      return acc + " C 950 720, 500 800, 290 850"; // 4 -> 5
                    if (index === 4)
                      return acc + " C 290 1000, 550 1120, 750 1120"; // 5 -> 6
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="#111827"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -140,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  link={step.link}
                  image={step.image}
                  colorTheme={step.colorTheme || "blue"}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
