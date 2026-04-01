const fs = require('fs');
let content = fs.readFileSync('src/Portfolio.js', 'utf8');

// Fix Hero Layout stats overlapping
const badHero = `{/* ── HERO ── */}
      <section id="about" className="relative z-10 min-h-screen flex flex-col pt-28 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 w-full">`;
        
const goodHero = `{/* ── HERO ── */}
      <section id="about" className="relative z-10 min-h-screen flex flex-col pt-28 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-16 w-full mt-4 md:mt-0">`;

content = content.replace(badHero, goodHero);

const badStats = `{/* Stats */}
        <div className="absolute bottom-10 left-6 right-6 max-w-7xl mx-auto px-0">`;

const goodStats = `{/* Stats */}
        <div className="w-full mt-10 md:mt-16 relative z-30">`;

content = content.replace(badStats, goodStats);

const badMapExp = `{EXPERIENCE.map((exp, i) => (
          <TiltCard key={i} className="pastel-card rounded-[2rem] p-10 md:p-12 relative overflow-hidden"`;

const goodMapExp = `<div className="flex flex-col gap-10">
        {EXPERIENCE.map((exp, i) => (
          <TiltCard key={i} className="pastel-card rounded-[2rem] p-10 md:p-12 relative overflow-hidden"`;

content = content.replace(badMapExp, goodMapExp);

const badMapEnd = `</TiltCard>
        ))}
      </section>`;

const goodMapEnd = `</TiltCard>
        ))}
        </div>
      </section>`;

content = content.replace(badMapEnd, goodMapEnd);

fs.writeFileSync('src/Portfolio.js', content, 'utf8');
console.log('Done fixes');
