import codecs

with codecs.open('src/Portfolio.js', 'r', 'utf-8') as f:
    lines = f.read().split('\n')

# 1. Drop bad lines 242-246 (0-indexed 241 to 245)
idx_style = -1
for i, line in enumerate(lines):
    if 'boxShadow: `0 2px 10px rgba(192,132,252,0.6)`,' in line:
        idx_style = i
        break

if idx_style != -1:
    end_idx = idx_style + 2
    while end_idx < len(lines) and '/>' not in lines[end_idx]:
        end_idx += 1
    
    if end_idx < len(lines) and '/>' in lines[end_idx]: # Double check
        if 'animate-bobble' in lines[idx_style+2] or '<div' in lines[idx_style+2]:
            del lines[idx_style+2 : end_idx]

# 2. Fix the missing Skills and Projects header section.
idx_exp_end = -1
for i in range(len(lines)):
    if 'style={{ background: p.bg, color: p.accent, border:`1px solid ${p.accent}40` }}>' in lines[i]:
        idx_exp_end = i
        break

if idx_exp_end != -1:
    insert_idx = idx_exp_end

    missing_code = """      </section>

      <div className="pastel-divider mx-8" />

      {/* ── SKILLS ── */}
      <section id="skills" className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="pastel-badge mb-5" style={{ background:'rgba(186,230,253,0.3)', borderColor:'rgba(125,211,252,0.5)', color:'#1d4ed8' }}><Keyboard size={14} /> Technical Expertise</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
            Skills & <span className="text-gradient-pastel">Technologies</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILLS.map((cat, i) => (
            <TiltCard key={i} className={`pastel-card rounded-[2rem] p-9 relative overflow-hidden delay-${i+1} animate-fadein-up`}>
              {/* top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]" style={{ background: cat.bar }} />
              {/* bg accent */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-30 -mr-10 -mt-10 blur-2xl"
                style={{ background: cat.bg }} />

              <h3 className="text-lg font-black mb-8 flex items-center gap-3" style={{ color: PASTEL.text }}>
                <span className="text-2xl">{cat.icon}</span> {cat.category}
              </h3>

              {cat.items.map((s) => (
                <SkillBar key={s.name} {...s} bar={cat.bar} />
              ))}
            </TiltCard>
          ))}
        </div>
      </section>

      <div className="pastel-divider mx-8" />

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="pastel-badge mb-5" style={{ background:'rgba(251,207,232,0.4)', borderColor:'rgba(249,168,212,0.5)', color:'#be185d' }}><Rocket size={14} className="mr-1 inline" /> Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
            Featured <span className="text-gradient-pastel">Projects</span>
          </h2>
          <p className="mt-3 font-medium" style={{ color: PASTEL.textSoft }}>
            Showcasing innovative solutions in generative AI, machine learning & computer vision
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all focus:outline-none ${activeFilter === f ? 'scale-105 shadow-md' : 'hover:bg-white/50 hover:scale-105'}`}
              style={{
                background: activeFilter === f ? 'linear-gradient(135deg,#c084fc,#f9a8d4)' : 'rgba(255,255,255,0.4)',
                color: activeFilter === f ? '#fff' : PASTEL.textSoft,
                border: `1px solid ${activeFilter === f ? 'transparent' : 'rgba(200,170,255,0.3)'}`
              }}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7" style={{ perspective:'1400px' }}>
          {filteredProjects.map((p, i) => (
            <TiltCard key={i} className={`pastel-card rounded-[2rem] overflow-hidden flex flex-col group delay-${Math.min(i % 4 + 1,4)} animate-fadein-up`}
              style={{ transformOrigin:'center center' }}>
              <a href={p.link} target={p.link !== '#' ? "_blank" : undefined} rel={p.link !== '#' ? "noopener noreferrer" : undefined} className="flex flex-col flex-1 h-full cursor-pointer">
                {/* Icon header with 3D depth */}
                <div className="h-36 flex items-center justify-center relative overflow-hidden sheen-parent"
                  style={{ background:`linear-gradient(135deg,${p.bg},white)` }}>
                  <div className="absolute inset-0 opacity-40" style={{ background:`radial-gradient(circle at 30% 40%,${p.accent}40,transparent 65%)` }} />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full opacity-20 blur-lg" style={{ background: p.accent }} />
                  <span className="text-5xl z-10 group-hover:scale-125 transition-transform duration-500 group-hover:-translate-y-1">{p.icon}</span>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-black uppercase text-sm tracking-tight leading-snug" style={{ color: PASTEL.text }}>{p.title}</h3>
                    <span className="text-sm font-black ml-2 flex-shrink-0 transition-all group-hover:scale-125 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: p.accent }}>↗</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: PASTEL.textSoft }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all group-hover:scale-105" """
    
    # We remove the trailing `"` from `105"` to match cleanly and stitch correctly since React string template literals were broken over multiple lines?
    # No, we just insert the block right before `<span key={t} className=... >`
    
    # Actually wait. `Portfolio.js` had `transition-all group-hover:scale-105"` on the previous line. Let me just insert `missing_code` exactly before the `style={ ... }` line.
    lines.insert(insert_idx, missing_code)

with codecs.open('src/Portfolio.js', 'w', 'utf-8') as f:
    f.write('\\n'.join(lines))
