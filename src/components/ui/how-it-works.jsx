import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

const Card = ({
  number,
  title,
  description,
  icon,
  className,
  rotate,
  colors: customColors,
  link
}) => {
  // Use custom provided colors (from CERTS) or default dark styling
  const bgColor = customColors?.bg || "bg-neutral-900/50";
  const textColor = customColors?.text || "text-cyan-400";
  const borderColor = customColors?.border || "border-cyan-500/20";

  return (
    <div
      className={`relative w-full md:w-[300px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div 
        className="p-2 rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-purple-500/20 backdrop-blur-sm"
        style={{ background: 'rgba(10, 6, 21, 0.85)' }}
      >
        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-5 mt-2 ${textColor}`}
             style={{ background: customColors?.bg || 'transparent', border: `1px solid ${borderColor}` }}>
          {icon}
        </div>
        
        <div
          className={`border rounded-[15px] p-[20px] h-full flex flex-col relative overflow-hidden`}
          style={{ background: customColors?.bg || 'rgba(255,255,255,0.02)', borderColor: borderColor }}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`${textColor} text-3xl font-bold opacity-80 font-mono-tech`}
            >
              {number}
            </span>
          </div>
          <h3 className="text-xl font-black text-white leading-tight mb-2">
            {title}
          </h3>
          <p className="text-sm/5 font-bold mb-6 font-mono-tech" style={{ color: textColor }}>
            {description}
          </p>
          
          <div className="mt-auto pt-2">
            <a href={link} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center w-full py-2.5 rounded-xl text-xs font-black text-white transition-all hover:scale-105 font-mono-tech"
               style={{ background:`linear-gradient(135deg, ${textColor}, ${textColor}aa)`, boxShadow:`0 4px 16px ${textColor}44` }}>
               View Certificate ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const DEFAULT_CARD_POSITIONS = [
  { className: "md:absolute md:top-[0px] md:left-[10%]", rotate: "md:rotate-3" },
  { className: "md:absolute md:top-[160px] md:right-[10%]", rotate: "md:-rotate-3" },
  { className: "md:absolute md:top-[500px] md:left-[10%]", rotate: "md:rotate-3" },
  { className: "md:absolute md:top-[660px] md:right-[5%]", rotate: "md:-rotate-3" },
  { className: "md:absolute md:top-[1000px] md:left-[10%]", rotate: "md:rotate-3" },
  { className: "md:absolute md:top-[1160px] md:right-[10%]", rotate: "md:-rotate-3" },
];

export default function HowItWorks({
  features = [],
  className = "",
  stepPositions,
}) {
  const data = features;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1300;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 500;
  else if (data.length === 3) height = 850;
  else if (data.length === 4) height = 1000;
  else if (data.length === 5) height = 1350;
  else if (data.length === 6) height = 1500;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`relative max-w-7xl mx-auto w-full ${className}`}>
        {/* Background Grids inside the component (optional, we keep the main background from Portfolio) */}
        
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <div
            className="relative w-full mx-auto flex flex-col space-y-12 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` }}
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
                      return "M 250 200 C 450 200, 500 320, 750 320"; // 1 -> 2
                    if (index === 1)
                      return acc + " C 900 320, 550 450, 250 550"; // 2 -> 3
                    if (index === 2)
                      return acc + " C 250 700, 500 820, 800 820"; // 3 -> 4
                    if (index === 3)
                      return acc + " C 1000 820, 550 950, 250 1050"; // 4 -> 5
                    if (index === 4)
                      return acc + " C 250 1200, 500 1320, 750 1320"; // 5 -> 6
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      className="text-purple-500/30"
                      strokeWidth="3"
                      strokeDasharray="12 8"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -200, 
                      }}
                      transition={{
                        duration: 4,
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
                  icon={step.icon}
                  link={step.link}
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
