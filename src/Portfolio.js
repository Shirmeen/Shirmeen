import React, { useState, useEffect, useRef, useCallback } from 'react';
import profileImage from './image.png';
import { Puzzle, Award, Briefcase, Laptop, Database, BarChart, BrainCircuit, LineChart, Eye, Hospital, Sparkles, Gamepad2, MessageSquare, Thermometer, Factory, Ghost, Music, Dices, Circle, Bot, Hand, Github, Linkedin, Mail, GraduationCap, Rocket, Keyboard, Download, MapPin, Phone, Heart, Globe } from 'lucide-react';


// ─── PASTEL PALETTE ──────────────────────────────────────────────────────────
const PASTEL = {
  lavender: '#ede9fe',
  purple:   '#c084fc',
  purpleDark: '#9333ea',
  blue:     '#bae6fd',
  blueMid:  '#7dd3fc',
  pink:     '#fbcfe8',
  pinkMid:  '#f9a8d4',
  mint:     '#bbf7d0',
  peach:    '#fed7aa',
  yellow:   '#fef08a',
  white:    '#ffffff',
  text:     '#4b3875',
  textSoft: '#7c6fa0',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Projects',       value: '13+', icon: <Puzzle size={24} />, bg: '#ede9fe', accent: '#9333ea' },
  { label: 'Certifications', value: '6',   icon: <Award size={24} />, bg: '#fce7f3', accent: '#db2777' },
  { label: 'Years Exp.',     value: '1+',  icon: <Briefcase size={24} />, bg: '#dbeafe', accent: '#2563eb' },
  { label: 'Skills',         value: '16+', icon: <Laptop size={24} />, bg: '#dcfce7', accent: '#16a34a' },
];

const EXPERIENCE = [
  {
    role: 'Associate Generative AI Engineer',
    company: 'BIG IMMERSIVE',
    duration: 'August 2024 – Present',
    isCurrent: true,
    description: 'Building generative AI solutions and AI-assisted systems with a focus on prompt engineering, model integration, and end-to-end AI workflows.',
    bullets: [
      'Developing AI-assisted systems using LangChain and Claude.',
      'Implementing prompt engineering strategies for production systems.',
      'Building end-to-end AI workflows with modern frameworks.',
    ],
    color: '#ede9fe', accent: '#9333ea',
  },
];

const SKILLS = [
  {
    category: 'Programming & Databases', icon: <Laptop size={24} />,
    bg: '#ede9fe', bar: 'linear-gradient(90deg,#c084fc,#818cf8)',
    items: [
      { name:'Python',     pct:90, icon:'🐍' },
      { name:'C/C++',      pct:75, icon:'⚡' },
      { name:'SQL',        pct:85, icon:'🗄️' },
      { name:'PostgreSQL', pct:80, icon:'🐘' },
    ],
  },
  {
    category: 'Frameworks & Tools', icon: <Briefcase size={24} />,
    bg: '#dbeafe', bar: 'linear-gradient(90deg,#7dd3fc,#60a5fa)',
    items: [
      { name:'LangChain', pct:85, icon:'🔗' },
      { name:'Power BI',  pct:80, icon:<BarChart size={40} /> },
      { name:'Docker',    pct:75, icon:'🐳' },
      { name:'Django',    pct:70, icon:'🌿' },
    ],
  },
  {
    category: 'ML & Deep Learning', icon: <BrainCircuit size={20} />,
    bg: '#fce7f3', bar: 'linear-gradient(90deg,#f9a8d4,#f472b6)',
    items: [
      { name:'TensorFlow',  pct:85, icon:'🧠' },
      { name:'PyTorch',     pct:80, icon:'🔥' },
      { name:'Scikit-Learn',pct:90, icon:'📈' },
      { name:'OpenCV',      pct:85, icon:<Eye size={40} /> },
    ],
  },
  {
    category: 'Generative AI', icon: <Sparkles size={20} />,
    bg: '#fefce8', bar: 'linear-gradient(90deg,#fde68a,#fb923c)',
    items: [
      { name:'GANs',            pct:85, icon:'🎨' },
      { name:'VAEs',            pct:80, icon:'🧊' },
      { name:'Stable Diffusion',pct:75, icon:'🖌️' },
      { name:'CLIP',            pct:80, icon:'🖼️' },
    ],
  },
];

const PROJECTS = [
  { title:'ADetectPro (FYP)',     desc:"Early Alzheimer's detection using Bayesian GNNs with uncertainty quantification.", icon:<Hospital size={40} />, bg:'#fff7ed', accent:'#ea580c', tags:['Python','Bayesian GNN','Deep Learning'], link:'https://github.com/Shirmeen/fyp' },
  { title:'Generative AI Models', desc:'GANs, Autoencoders & VAEs for anomaly detection and generative modeling.',           icon:<Sparkles size={40} />, bg:'#fdf4ff', accent:'#c026d3', tags:['GANs','VAEs','Python'], link:'https://github.com/Shirmeen/Generative-Adversarial-Networks-GANs-Autoencoders-AE-Variational-Autoencoders-VAEs-' },
  { title:'EmoNet',               desc:'Emotion analysis via CNN, SVM, and Random Forest for facial expression classification.',icon:<Eye size={40} />,bg:'#eff6ff',accent:'#2563eb',tags:['CNN','SVM','Random Forest'],link:'https://github.com/Shirmeen/EmoNet'},
  { title:'Smart Gaming Picks',   desc:'ML-based game recommendation & success prediction engine.', icon:<Gamepad2 size={40} />, bg:'#f0fdf4', accent:'#16a34a', tags:['ML','NLP','Web Scraping'], link:'https://github.com/Shirmeen/smart-gaming-picks' },
  { title:'Chatbot',              desc:'AI-powered chatbot using NLP techniques.',                   icon:<MessageSquare size={40} />, bg:'#f5f3ff', accent:'#7c3aed', tags:['NLP','Python','Jupyter'], link:'https://github.com/Shirmeen/Chatbot' },
  { title:'Diabetes Prediction',  desc:'Predicts diabetes using concept hierarchies and clustering.', icon:<BarChart size={40} />, bg:'#fff1f2', accent:'#e11d48', tags:['Clustering','Data Mining'], link:'https://github.com/Shirmeen/Diabetes-Prediction-Using-Concept-Hierarchies-and-Clustering' },
  { title:'Thermal Comfort',      desc:'Predicts thermal comfort using ML regression and classification.', icon:<Thermometer size={40} />, bg:'#fefce8', accent:'#ca8a04', tags:['ML','Regression'], link:'https://github.com/Shirmeen/Thermal-Comfort-Prediction-Using-Machine-Learning-Models' },
  { title:"Weaver's Den",         desc:'Full-stack web app connecting users with textile manufacturers.', icon:<Factory size={40} />, bg:'#f0f9ff', accent:'#0284c7', tags:['JavaScript','Full Stack'], link:'https://github.com/Shirmeen/Weaver-s-Den' },
  { title:'Pacman Game',          desc:'Classic Pacman in C++ with OOP and graphics.',               icon:<Ghost size={40} />, bg:'#fefce8', accent:'#d97706', tags:['C++','OOP','Graphics'], link:'https://github.com/Shirmeen/Pacman-Game-Implementation-in-C-' },
  { title:'Music Playlist Manager', desc:'C++ playlist manager using doubly linked lists.',           icon:<Music size={40} />, bg:'#fdf4ff', accent:'#a21caf', tags:['C++','Data Structures'], link:'https://github.com/Shirmeen/Music-Playlist-Manager' },
  { title:'Connect-N Game',       desc:'Multi-player Connect-N in C++ with OOP.',                   icon:<Dices size={40} />, bg:'#eff6ff', accent:'#1d4ed8', tags:['C++','OOP'], link:'https://github.com/Shirmeen/Connect-N-Gam' },
  { title:'Tic-Tac-Toe',         desc:'Classic game implemented in x86 Assembly.',                   icon:<Circle size={40} />, bg:'#f8fafc', accent:'#475569', tags:['x86 Assembly'], link:'https://github.com/Shirmeen/Tic-Tac-Toe-in-Assembly-Language' },
  { title:'2D Doubly Linked Notepad', desc:'A notepad built with a two-dimensional doubly linked list.', icon:<Database size={40} />, bg:'#f0fdf4', accent:'#22c55e', tags:['Data Structures','Linked Lists','C++'], link:'https://github.com/Shirmeen/Project-Implement-a-Notepad-using-a-Two-Dimensional-Doubly-Linkedlist.' },
  { title:'Moot 2.0', desc:'Web application with a sleek and interactive UI.', icon:<Globe size={40} />, bg:'#ede9fe', accent:'#8b5cf6', tags:['HTML','Web Application','Vercel'], link:'https://github.com/Shirmeen/moot2.0' },
];

const CERTS = [
  {
    name: 'Intro to Programming',
    platform: 'Kaggle',
    icon: <BarChart size={20} />,
    bg: '#e0f7fa',
    accent: '#0891b2',
    link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-programming',
    year: '2023',
  },
  {
    name: 'Intro to SQL',
    platform: 'Kaggle',
    icon: <Database size={20} />,
    bg: '#e0f7fa',
    accent: '#0891b2',
    link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-sql',
    year: '2023',
  },
  {
    name: 'Data Visualization',
    platform: 'Kaggle',
    icon: <LineChart size={20} />,
    bg: '#e0f7fa',
    accent: '#0891b2',
    link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/data-visualization',
    year: '2023',
  },
  {
    name: 'Intro to Deep Learning',
    platform: 'Kaggle',
    icon: <BrainCircuit size={20} />,
    bg: '#e0f7fa',
    accent: '#0891b2',
    link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-deep-learning',
    year: '2024',
  },
  {
    name: 'Multi AI Agent Systems',
    platform: 'DeepLearning.AI',
    icon: <Bot size={32} />,
    bg: '#fdf4ff',
    accent: '#c026d3',
    link: 'https://learn.deeplearning.ai/accomplishments/b60fc0e8-55fb-4aca-bcbf-5929472d5c89',
    year: '2024',
  },
  {
    name: '10Pearls University',
    platform: '10Pearls',
    icon: <GraduationCap size={32} />,
    bg: '#eff6ff',
    accent: '#4f46e5',
    link: 'https://10pearlsuniversity.org/view-certificate/?cid=10PUC-6efc0be387dc98490e8a7165e27cedd46c33724bea620f84195311403',
    year: '2024',
  },
];

// ─── 3D TILT CARD ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = '', style = {} }) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 14}deg) translateZ(20px) scale(1.02)`;
    el.style.boxShadow = `${-x * 20}px ${-y * 20}px 50px rgba(160,110,230,0.25)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
    el.style.boxShadow = '';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: 'transform 0.2s ease, box-shadow 0.3s ease', ...style }}
    >
      {children}
    </div>
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({ name, pct, icon, bar }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(pct); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="mb-5 group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base group-hover:scale-125 transition-transform duration-300">{icon}</span>
          <span className="text-sm font-bold" style={{ color: PASTEL.text }}>{name}</span>
        </div>
        <span className="text-xs font-black" style={{ color: PASTEL.purpleDark }}>{pct}%</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${w}%`,
            background: bar,
            transition: 'width 1.6s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: `0 2px 10px rgba(192,132,252,0.6)`,
          }}
        />
      </div>
    </div>
  );
}

// ─── FLOATING ORBS ────────────────────────────────────────────────────────────
const Orbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="orb animate-float3d"        style={{ width:600, height:600, top:'-15%',  left:'-10%', background:'radial-gradient(circle, #e9d5ff88, transparent 70%)' }} />
    <div className="orb animate-float3d-delay"  style={{ width:500, height:500, bottom:'-12%',right:'-8%', background:'radial-gradient(circle, #bae6fd77, transparent 70%)' }} />
    <div className="orb animate-bobble"         style={{ width:350, height:350, top:'35%',   right:'15%',  background:'radial-gradient(circle, #fbcfe877, transparent 70%)' }} />
    <div className="orb animate-float3d"        style={{ width:250, height:250, bottom:'25%',left:'8%',    background:'radial-gradient(circle, #bbf7d066, transparent 70%)' }} />
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const fullText = 'Generative AI Engineer';

  useEffect(() => {
    const t = setTimeout(() => {
      if (!deleting) {
        const next = fullText.slice(0, typed.length + 1);
        setTyped(next);
        if (next === fullText) { setTimeout(() => setDeleting(true), 2500); setSpeed(70); }
      } else {
        const next = fullText.slice(0, typed.length - 1);
        setTyped(next);
        setSpeed(next === '' ? 130 : 35);
        if (next === '') setDeleting(false);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, speed]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(140deg, #f0ecff 0%, #fce7f3 35%, #e0f2fe 65%, #f0fdf4 100%)' }}>

      <Orbs />

      {/* ── NAV ── */}
      <nav style={{ background:'rgba(255,255,255,0.55)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(200,170,255,0.3)', boxShadow:'0 4px 30px rgba(180,140,255,0.1)' }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-black text-gradient-pastel cursor-pointer tracking-tight">SA</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: PASTEL.textSoft }}>
          {['About','Experience','Skills','Projects','Certifications','Contact'].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} className="nav-link hover:opacity-80">{s}</a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95"
            style={{ background:'linear-gradient(135deg,#c084fc,#7dd3fc)', boxShadow:'0 4px 20px rgba(192,132,252,0.4)' }}>
            <Download size={18} className="mr-2" /> Resume
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="relative z-10 min-h-screen flex items-center pt-28 pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 w-full">

          {/* Profile 3D area */}
          <div className="relative flex-shrink-0 animate-fadein-left" style={{ perspective:'900px' }}>
            {/* Outer spinning ring 1 */}
            <div className="ring-spin absolute inset-0 rounded-full" style={{ margin:'-14px', border:'3px dashed rgba(192,132,252,0.4)', borderRadius:'50%' }} />
            {/* Outer spinning ring 2 */}
            <div className="ring-spin-r absolute inset-0 rounded-full" style={{ margin:'-28px', border:'2px dashed rgba(125,211,252,0.35)', borderRadius:'50%' }} />
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-full animate-bobble" style={{ margin:'-30px', background:'radial-gradient(circle,rgba(192,132,252,0.35),transparent 70%)', filter:'blur(20px)' }} />

            {/* Image frame */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full z-10 animate-float3d"
              style={{ background:'linear-gradient(135deg,#ddd6fe,#bae6fd,#fbcfe8)', padding:'4px', boxShadow:'0 30px 70px rgba(167,139,250,0.35), 0 10px 30px rgba(167,139,250,0.2)' }}>
              <div className="w-full h-full rounded-full overflow-hidden" style={{ background:'#fff', border:'3px solid rgba(255,255,255,0.9)' }}>
                <img src={profileImage} alt="Shirmeen Aamir" className="w-full h-full object-cover" style={{ objectPosition:'center 30%' }} />
              </div>
            </div>

            {/* Floating badge — AI Engineer */}
            <TiltCard className="absolute top-8 -left-16 pastel-card px-4 py-2 rounded-2xl flex items-center gap-2 z-20 animate-bobble"
              style={{ boxShadow:'0 8px 24px rgba(192,132,252,0.25)' }}>
              <span className="text-lg"><Bot size={18} /></span>
              <span className="text-xs font-black" style={{ color:PASTEL.purpleDark }}>AI Engineer</span>
            </TiltCard>

            {/* Floating badge — Stars */}
            <TiltCard className="absolute bottom-8 -right-12 pastel-card px-4 py-2 rounded-2xl flex items-center gap-2 z-20 animate-float3d-delay"
              style={{ boxShadow:'0 8px 24px rgba(249,168,212,0.3)' }}>
              <span className="text-lg"><BrainCircuit size={18} /></span>
              <span className="text-xs font-black" style={{ color:'#db2777' }}>Gen AI</span>
            </TiltCard>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left animate-fadein-right">
            <p className="font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center md:justify-start gap-2" style={{ color:PASTEL.purple }}>
              <span style={{ animation:'blink 1s steps(1) infinite', display:'inline-block' }}><Hand size={16} /></span> Hello, I'm
            </p>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight">
              <span style={{ color: PASTEL.text }}>Shirmeen</span>{' '}
              <span className="text-gradient-pastel">Aamir</span>
            </h1>
            <div className="text-2xl md:text-3xl font-bold mb-6 h-10 flex items-center justify-center md:justify-start gap-1" style={{ color: PASTEL.purpleDark }}>
              <span>{typed}</span>
              <span className="cursor inline-block w-0.5 h-7 rounded-full" style={{ background: PASTEL.purple }}>|</span>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: PASTEL.textSoft }}>
              AI Engineer with a Data Science background specializing in{' '}
              <span className="font-bold px-1.5 py-0.5 rounded-lg" style={{ color:'#9333ea', background:'#f3e8ff' }}>Generative AI</span>,{' '}
              <span className="font-bold px-1.5 py-0.5 rounded-lg" style={{ color:'#1d4ed8', background:'#dbeafe' }}>Deep Learning</span>,{' '}
              <span className="font-bold px-1.5 py-0.5 rounded-lg" style={{ color:'#be185d', background:'#fce7f3' }}>Computer Vision</span>, and{' '}
              <span className="font-bold px-1.5 py-0.5 rounded-lg" style={{ color:'#047857', background:'#d1fae5' }}>Bayesian Modeling</span>.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
              {[[(<MapPin size={16} />),'Lahore, Pakistan'],[(<Phone size={16} />), '+92 316 6370030']].map(([icon, text]) => (
                <div key={text} className="pastel-card flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ color: PASTEL.textSoft }}>
                  {icon} <span className="ml-1">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {[
                { label:'GitHub', icon:<Github size={20} />, href:'https://github.com/Shirmeen', bg:'linear-gradient(135deg,#4b3875,#7c6fa0)', color:'#fff' },
                { label:'LinkedIn', icon:<Linkedin size={20} />, href:'https://linkedin.com/in/shirmeen-amir-35ab81264', bg:'linear-gradient(135deg,#0a66c2,#0e86d4)', color:'#fff' },
                { label:'Email', icon:<Mail size={20} />, href:'mailto:shirmeenaamir112@gmail.com', bg:'linear-gradient(135deg,#f9a8d4,#c084fc)', color:'#fff' },
              ].map(btn => (
                <a key={btn.label} href={btn.href} target={btn.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="sheen-parent flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 hover:-translate-y-1 active:scale-95"
                  style={{ background: btn.bg, color: btn.color, boxShadow:'0 6px 24px rgba(192,132,252,0.3)' }}>
                  {btn.icon} {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-10 left-6 right-6 max-w-7xl mx-auto px-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <TiltCard key={s.label} className={`pastel-card rounded-3xl p-7 text-center delay-${i+1} animate-fadein-up`}
                style={{ borderTop:`3px solid ${s.accent}55` }}>
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="text-3xl font-black mb-1" style={{ color: s.accent }}>{s.value}</div>
                <div className="text-xs uppercase tracking-[0.18em] font-bold" style={{ color: PASTEL.textSoft }}>{s.label}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <div className="pastel-divider mx-8" />

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative z-10 py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="pastel-badge mb-5"><Briefcase size={14} /> Career</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
            Work <span className="text-gradient-pastel">Experience</span>
          </h2>
        </div>

        {EXPERIENCE.map((exp, i) => (
          <TiltCard key={i} className="pastel-card rounded-[2rem] p-10 md:p-12 relative overflow-hidden"
            style={{ borderLeft:`5px solid ${exp.accent}` }}>
            {/* top gradient strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]"
              style={{ background:`linear-gradient(90deg,${exp.accent}88,#bae6fd)` }} />

            {exp.isCurrent && (
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black"
                style={{ background:'#dcfce7', color:'#16a34a', border:'1px solid #bbf7d0' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Current
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-black mb-1" style={{ color: PASTEL.text }}>{exp.role}</h3>
                <p className="font-bold text-lg" style={{ color: exp.accent }}>{exp.company}</p>
              </div>
              <div className="pastel-card px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0" style={{ color: PASTEL.textSoft }}>
                {exp.duration}
              </div>
            </div>

            <p className="leading-relaxed mb-8 italic border-l-4 pl-5" style={{ color: PASTEL.textSoft, borderColor: exp.accent + '60' }}>
              {exp.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {exp.bullets.map((b, bi) => (
                <div key={bi} className="flex gap-3 items-start rounded-2xl p-4"
                  style={{ background: exp.color + '80', border:`1px solid ${exp.accent}20` }}>
                  <span style={{ color: exp.accent }} className="mt-0.5 text-lg font-black">▸</span>
                  <span className="text-sm font-semibold" style={{ color: PASTEL.text }}>{b}</span>
                </div>
              ))}
            </div>
          </TiltCard>
        ))}
      </section>

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
        <div className="text-center mb-16">
          <span className="pastel-badge mb-5" style={{ background:'rgba(251,207,232,0.4)', borderColor:'rgba(249,168,212,0.5)', color:'#be185d' }}><Rocket size={14} className="mr-1 inline" /> Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
            Featured <span className="text-gradient-pastel">Projects</span>
          </h2>
          <p className="mt-3 font-medium" style={{ color: PASTEL.textSoft }}>
            Showcasing innovative solutions in generative AI, machine learning & computer vision
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7" style={{ perspective:'1400px' }}>
          {PROJECTS.map((p, i) => (
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
                      <span key={t} className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all group-hover:scale-105"
                        style={{ background: p.bg, color: p.accent, border:`1px solid ${p.accent}40` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </section>

      <div className="pastel-divider mx-8" />

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="pastel-badge mb-5" style={{ background:'rgba(224,242,254,0.6)', borderColor:'rgba(125,211,252,0.5)', color:'#0891b2' }}>🎖️ Achievements</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
            My <span className="text-gradient-pastel">Certifications</span>
          </h2>
          <p className="mt-3 font-medium" style={{ color: PASTEL.textSoft }}>Verified credentials from leading AI and tech platforms</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {CERTS.map((cert, i) => (
            <TiltCard key={i} className={`pastel-card rounded-[2rem] overflow-hidden flex flex-col group delay-${Math.min(i % 3 + 1, 4)} animate-fadein-up`}>
              {/* Top accent strip */}
              <div className="h-1.5 w-full" style={{ background:`linear-gradient(90deg,${cert.accent}88,${cert.accent}22)` }} />

              <div className="p-8 flex flex-col flex-1">
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl sheen-parent"
                    style={{ background: cert.bg, border:`1px solid ${cert.accent}30` }}>
                    {cert.icon}
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full"
                    style={{ background:`${cert.accent}15`, color: cert.accent, border:`1px solid ${cert.accent}30` }}>
                    {cert.year}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-black mb-1 leading-snug" style={{ color: PASTEL.text }}>{cert.name}</h3>
                <p className="text-xs font-bold mb-6" style={{ color: cert.accent }}>{cert.platform}</p>

                {/* Verify button */}
                <div className="mt-auto">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                    style={{ background:`linear-gradient(135deg,${cert.accent},${cert.accent}aa)`, boxShadow:`0 4px 16px ${cert.accent}44` }}>
                    View Certificate ↗
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <div className="pastel-divider mx-8" />

      {/* ── CONTACT CTA ── */}
      <section id="contact" className="relative z-10 py-28 px-6">
        <TiltCard className="max-w-4xl mx-auto pastel-card rounded-[3rem] p-14 md:p-20 text-center relative overflow-hidden"
          style={{ boxShadow:'0 30px 80px rgba(192,132,252,0.2)' }}>
          {/* bg accents */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-30 -mt-20 -ml-20 animate-float3d"
            style={{ background:'radial-gradient(circle,#e9d5ff,transparent)' }} />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-30 -mb-20 -mr-20 animate-float3d-delay"
            style={{ background:'radial-gradient(circle,#bae6fd,transparent)' }} />

          <div className="relative z-10">
            <span className="pastel-badge mb-5"><Mail size={14} /> Get in touch</span>
            <h2 className="text-4xl md:text-5xl font-black my-5" style={{ color: PASTEL.text }}>
              Let's Build Something <span className="text-gradient-pastel">Amazing!</span> <Rocket className="inline ml-2 text-pink-500" size={40}/>
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: PASTEL.textSoft }}>
              I'm always excited to collaborate on innovative projects or discuss opportunities in AI and data science.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="mailto:shirmeenaamir112@gmail.com"
                className="sheen-parent px-10 py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105 hover:-translate-y-1 active:scale-95"
                style={{ background:'linear-gradient(135deg,#c084fc,#7dd3fc)', boxShadow:'0 8px 30px rgba(192,132,252,0.45)' }}>
                Get In Touch <Mail size={20} className="ml-2 inline" />
              </a>
              <a href="https://github.com/Shirmeen" target="_blank" rel="noopener noreferrer"
                className="sheen-parent pastel-card px-10 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:-translate-y-1 active:scale-95"
                style={{ color: PASTEL.purpleDark }}>
                View GitHub <Github size={20} className="ml-2 inline" />
              </a>
            </div>
          </div>
        </TiltCard>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-12 text-center" style={{ borderTop:`1px solid rgba(200,170,255,0.3)` }}>
        <div className="text-2xl font-black text-gradient-pastel mb-3">SA</div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: PASTEL.textSoft }}>
          Data Scientist • ML Engineer • AI Enthusiast
        </p>
        <p className="text-xs" style={{ color:'#bba8d4' }}>
          © {new Date().getFullYear()} Shirmeen Aamir — Built with <Heart size={14} className="inline text-red-500 mx-1" fill="currentColor" /> & React
        </p>
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}