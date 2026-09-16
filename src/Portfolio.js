import React, { useState, useEffect, useRef, useCallback } from 'react';
import profileImage from './profile.png';
import { 
  Puzzle, Award, Briefcase, Laptop, Database, BarChart, BrainCircuit, 
  LineChart, Eye, Hospital, Sparkles, Gamepad2, MessageSquare, Thermometer, 
  Factory, Ghost, Music, Dices, Circle, Bot, Hand, Github, Linkedin, 
  Mail, GraduationCap, Rocket, Keyboard, Download, MapPin, Phone, Heart, 
  Globe, Menu, X, Check, Copy, Search, ChevronDown, RefreshCw 
} from 'lucide-react';
import InteractiveCanvas from './InteractiveCanvas';
import HowItWorks from './components/ui/how-it-works';

// ─── HIGH-CONTRAST CYBER COLOR PALETTE ────────────────────────────────────────
const PASTEL = {
  lavender:   '#120f26',
  purple:     '#bd00ff',
  purpleDark: '#00f0ff',
  blue:       '#00f0ff',
  blueMid:    '#00abff',
  pink:       '#ff007f',
  pinkMid:    '#ff007f',
  mint:       '#39ff14',
  peach:      '#ff9900',
  yellow:     '#ffff00',
  white:      '#ffffff',
  text:       '#f1edfa',
  textSoft:   '#b8b0d4',
};

// ─── ROLES FOR TYPEWRITER ─────────────────────────────────────────────────────
const ROLES = [
  'Generative AI Engineer',
  'Data Scientist',
  'Deep Learning Specialist',
  'Multi-Agent Systems Builder',
];

// ─── TECH TICKER ITEMS ───────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { label: 'Python', emoji: '🐍' },
  { label: 'LangChain', emoji: '🔗' },
  { label: 'PyTorch', emoji: '🔥' },
  { label: 'TensorFlow', emoji: '🧠' },
  { label: 'OpenCV', emoji: '👁️' },
  { label: 'Scikit-Learn', emoji: '📈' },
  { label: 'Claude API', emoji: '🤖' },
  { label: 'GANs', emoji: '🎨' },
  { label: 'C++', emoji: '⚡' },
  { label: 'Docker', emoji: '🐳' },
  { label: 'Django', emoji: '🌿' },
  { label: 'SvelteKit', emoji: '🔶' },
  { label: 'React', emoji: '⚛️' },
  { label: 'SQL', emoji: '🗄️' },
  { label: 'Power BI', emoji: '📊' },
  { label: 'Stable Diffusion', emoji: '🖌️' },
  { label: 'VAEs', emoji: '🧊' },
  { label: 'CLIP', emoji: '🖼️' },
  { label: 'NLP', emoji: '💬' },
  { label: 'Bayesian GNN', emoji: '🔮' },
];

// ─── HERO DATA ────────────────────────────────────────────────────────────────
const HERO_DATA = {
  hello: "Hello, I'm",
  name: 'Shirmeen Aamir',
  description: (
    <>
      AI Engineer with a Data Science background specializing in{' '}
      <span className="font-bold px-2.5 py-1.5 rounded text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 font-mono-tech shadow-[0_0_15px_rgba(6,182,212,0.15)]">Generative AI</span>,{' '}
      <span className="font-bold px-2.5 py-1.5 rounded text-purple-400 bg-purple-950/60 border border-purple-800/40 font-mono-tech shadow-[0_0_15px_rgba(168,85,247,0.15)]">Deep Learning</span>,{' '}
      <span className="font-bold px-2.5 py-1.5 rounded text-pink-400 bg-pink-950/60 border border-pink-800/40 font-mono-tech shadow-[0_0_15px_rgba(236,72,153,0.15)]">Computer Vision</span>, and{' '}
      <span className="font-bold px-2.5 py-1.5 rounded text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 font-mono-tech shadow-[0_0_15px_rgba(16,185,129,0.15)]">Bayesian Modeling</span>.
    </>
  ),
  badges: [
    { text: 'AI Engineer', icon: <Bot size={16} />, className: 'absolute top-8 -left-4 sm:-left-8 md:-left-12 pastel-card px-4 py-2 rounded-xl flex items-center gap-2 z-20 animate-bobble border-cyan-500/30', style: { boxShadow: '0 8px 24px rgba(0,240,255,0.2)' }, colorClass: 'text-cyan-400 font-mono-tech' },
    { text: 'Gen AI', icon: <BrainCircuit size={16} />, className: 'absolute bottom-8 -right-4 sm:-right-6 md:-right-10 pastel-card px-4 py-2 rounded-xl flex items-center gap-2 z-20 animate-float3d-delay border-purple-500/30', style: { boxShadow: '0 8px 24px rgba(189,0,255,0.2)' }, colorClass: 'text-purple-400 font-mono-tech' }
  ],
  buttons: [
    { label: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/Shirmeen', bg: 'linear-gradient(135deg,#0c0919,#1b133a)', color: '#00f0ff' },
    { label: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/shirmeen-amir-35ab81264', bg: 'linear-gradient(135deg,#0a66c2,#0e86d4)', color: '#fff' },
    { label: 'Email', icon: <Mail size={20} />, href: 'mailto:shirmeenaamir112@gmail.com', bg: 'linear-gradient(135deg,#bd00ff,#ff007f)', color: '#fff' }
  ],
  theme: {
    accent: '#00f0ff',
    textColor: '#00f0ff'
  }
};

// ─── WORK EXPERIENCE ─────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    role: 'Associate Generative AI Engineer',
    company: 'BIG IMMERSIVE',
    category: 'Engineering & Production AI',
    duration: 'August 2025 – January 2026',
    isCurrent: false,
    badgeText: 'Technical Work',
    badgeColor: '#00f0ff',
    badgeBg: 'rgba(0, 240, 255, 0.1)',
    description: 'Spearheaded production-ready generative AI workflows, LLM orchestration with LangChain & Claude, and structured prompt engineering pipelines.',
    bullets: [
      'Engineered enterprise AI-assisted systems leveraging LangChain and Claude API architectures.',
      'Designed and evaluated rigorous prompt engineering strategies to eliminate hallucinations in production.',
      'Architected end-to-end model integration pipelines bridging modern generative frameworks with core backend services.',
      'Explored agentic workflows, function calling, and structured output parsing for autonomous tasks.'
    ],
    color: 'rgba(0, 240, 255, 0.08)', accent: '#00f0ff',
  },
  {
    role: 'Activity Coordinator',
    company: 'Crescent Model Higher Secondary School Girls Campus',
    category: 'Leadership & Student Engagement',
    duration: 'February 2026 – Present',
    isCurrent: true,
    badgeText: 'Leadership',
    badgeColor: '#ff007f',
    badgeBg: 'rgba(255, 0, 127, 0.1)',
    description: 'Leading institutional events, cross-departmental operations, and extracurricular programs to develop personal and academic growth in the student community.',
    bullets: [
      'Organizing campus-wide academic showcases, technical competitions, and collaborative workshops.',
      'Facilitating clear communication channels between student teams, academic faculty, and administration.',
      'Structuring youth engagement programs to cultivate public speaking, leadership, and analytical thinking.',
    ],
    color: 'rgba(255, 0, 127, 0.08)', accent: '#ff007f',
  },
];

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: 'Programming & Databases', icon: <Laptop size={24} />,
    bg: '#0e0b1f', bar: 'linear-gradient(90deg,#bd00ff,#00f0ff)',
    items: [
      { name:'Python',     pct:90, icon:'🐍' },
      { name:'C/C++',      pct:75, icon:'⚡' },
      { name:'SQL',        pct:85, icon:'🗄️' },
      { name:'PostgreSQL', pct:80, icon:'🐘' },
    ],
  },
  {
    category: 'Frameworks & Tools', icon: <Briefcase size={24} />,
    bg: '#061324', bar: 'linear-gradient(90deg,#00abff,#00f0ff)',
    items: [
      { name:'LangChain', pct:85, icon:'🔗' },
      { name:'Power BI',  pct:80, icon:<BarChart size={40} /> },
      { name:'Docker',    pct:75, icon:'🐳' },
      { name:'Django',    pct:70, icon:'🌿' },
    ],
  },
  {
    category: 'ML & Deep Learning', icon: <BrainCircuit size={20} />,
    bg: '#1c0a1a', bar: 'linear-gradient(90deg,#ff007f,#bd00ff)',
    items: [
      { name:'TensorFlow',  pct:85, icon:'🧠' },
      { name:'PyTorch',     pct:80, icon:'🔥' },
      { name:'Scikit-Learn',pct:90, icon:'📈' },
      { name:'OpenCV',      pct:85, icon:<Eye size={40} /> },
    ],
  },
  {
    category: 'Generative AI', icon: <Sparkles size={20} />,
    bg: '#18130a', bar: 'linear-gradient(90deg,#ff9900,#ffff00)',
    items: [
      { name:'GANs',            pct:85, icon:'🎨' },
      { name:'VAEs',            pct:80, icon:'🧊' },
      { name:'Stable Diffusion',pct:75, icon:'🖌️' },
      { name:'CLIP',            pct:80, icon:'🖼️' },
    ],
  },
];

// ─── PROJECTS DATA ────────────────────────────────────────────────────────────
const PROJECTS = [
  { title:'ADetectPro (FYP)',     desc:"Early Alzheimer's detection using Bayesian Graph Neural Networks (GNNs) with uncertainty quantification.", icon:<Hospital size={40} />, bg:'#1a0f00', accent:'#ea580c', tags:['Gen AI','Bayesian GNN','Deep Learning','Python'], link:'https://github.com/Shirmeen/fyp' },
  { title:'Generative AI Models', desc:'Comprehensive suite of GANs, Autoencoders & VAEs for generative modeling and latent space representation.', icon:<Sparkles size={40} />, bg:'#1a0020', accent:'#c026d3', tags:['Gen AI','GANs','VAEs','Deep Learning'], link:'https://github.com/Shirmeen/Generative-Adversarial-Networks-GANs-Autoencoders-AE-Variational-Autoencoders-VAEs-' },
  { title:'EmoNet',               desc:'Facial expression emotion recognition engine leveraging CNNs, Support Vector Machines (SVM), and Random Forests.', icon:<Eye size={40} />, bg:'#000d1a', accent:'#2563eb', tags:['CNN','SVM','Deep Learning'], link:'https://github.com/Shirmeen/EmoNet' },
  { title:'Smart Gaming Picks',   desc:'Machine learning recommendation & success prediction system analyzing gaming data trends with NLP.', icon:<Gamepad2 size={40} />, bg:'#001a0a', accent:'#16a34a', tags:['ML','NLP','Web Scraping'], link:'https://github.com/Shirmeen/smart-gaming-picks' },
  { title:'Chatbot',              desc:'Interactive conversational agent utilizing NLP heuristics, intent classification, and Python pipelines.', icon:<MessageSquare size={40} />, bg:'#0d0024', accent:'#7c3aed', tags:['Gen AI','NLP','Python','Jupyter'], link:'https://github.com/Shirmeen/Chatbot' },
  { title:'AI Workshop',          desc:'Interactive AI toolkit application exploring cutting-edge generative tools and hands-on AI workflows.', icon:<Bot size={40} />, bg:'#1a0f00', accent:'#f59e0b', tags:['Gen AI','Interactive AI','Web','JavaScript'], link:'https://github.com/Shirmeen/ai-workshop', live:'https://shirmeen.github.io/ai-workshop/' },
  { title:'Diabetes Prediction',  desc:'Predictive healthcare diagnostic model using concept hierarchies, data mining, and unsupervised clustering.', icon:<BarChart size={40} />, bg:'#1a000a', accent:'#e11d48', tags:['Clustering','Data Mining','ML'], link:'https://github.com/Shirmeen/Diabetes-Prediction-Using-Concept-Hierarchies-and-Clustering' },
  { title:'Thermal Comfort',      desc:'Predicts environmental thermal comfort indices using comparative machine learning regression models.', icon:<Thermometer size={40} />, bg:'#1a1500', accent:'#ca8a04', tags:['ML','Regression'], link:'https://github.com/Shirmeen/Thermal-Comfort-Prediction-Using-Machine-Learning-Models' },
  { title:"Weaver's Den",         desc:'Full-stack web platform connecting textile buyers directly with verified manufacturers.', icon:<Factory size={40} />, bg:'#001524', accent:'#0284c7', tags:['JavaScript','Full Stack','Web Application'], link:'https://github.com/Shirmeen/Weaver-s-Den' },
  { title:'Pacman Game',          desc:'Object-oriented classic Pacman arcade game built in C++ with custom rendering and game physics.', icon:<Ghost size={40} />, bg:'#1a1500', accent:'#d97706', tags:['C++','OOP','Graphics'], link:'https://github.com/Shirmeen/Pacman-Game-Implementation-in-C-' },
  { title:'Music Playlist Manager', desc:'High-efficiency C++ playlist management system implemented with double-ended linked list data structures.', icon:<Music size={40} />, bg:'#1a0020', accent:'#a21caf', tags:['C++','Data Structures'], link:'https://github.com/Shirmeen/Music-Playlist-Manager' },
  { title:'Connect-N Game',       desc:'Scalable multi-player Connect-N board game developed in C++ using advanced OOP design patterns.', icon:<Dices size={40} />, bg:'#000d1a', accent:'#1d4ed8', tags:['C++','OOP'], link:'https://github.com/Shirmeen/Connect-N-Gam' },
  { title:'Tic-Tac-Toe',         desc:'Low-level bare-metal Tic-Tac-Toe game programmed in pure x86 Assembly language.', icon:<Circle size={40} />, bg:'#0a0a10', accent:'#475569', tags:['x86 Assembly'], link:'https://github.com/Shirmeen/Tic-Tac-Toe-in-Assembly-Language' },
  { title:'2D Doubly Linked Notepad', desc:'Text editor with custom cursor navigation implemented via a 2D doubly linked list in C++.', icon:<Database size={40} />, bg:'#001a0a', accent:'#22c55e', tags:['Data Structures','Linked Lists','C++'], link:'https://github.com/Shirmeen/Project-Implement-a-Notepad-using-a-Two-Dimensional-Doubly-Linkedlist' },
  { title:'Moot 2.0',             desc:'Modern web application featuring responsive animations, clean components, and deployed on Vercel.', icon:<Globe size={40} />, bg:'#0d0024', accent:'#8b5cf6', tags:['HTML','Web Application','Vercel'], link:'https://github.com/Shirmeen/moot2.0', live:'https://moot2-0.vercel.app' },
  { title:'NOTETAKE5R',           desc:'SvelteKit note-taking system featuring Google Calendar OAuth 2.0 integration and real-time syncing.', icon:<Keyboard size={40} />, bg:'#001a14', accent:'#0d9488', tags:['SvelteKit','Full Stack','Web Application'], link:'https://github.com/Shirmeen/NOTETAKE5R-' },
  { title:'React Vite App',       desc:'Ultra-fast React + TypeScript single-page application built on Vite with HMR and Tailwind.', icon:<Rocket size={40} />, bg:'#060024', accent:'#4f46e5', tags:['React','TypeScript','Vite'], link:'https://github.com/Shirmeen/app', live:'https://shirmeen.github.io/app/' },
  { title:'CEO Dashboard',        desc:'Executive analytics dashboard with interactive metrics visualization and data telemetry.', icon:<BarChart size={40} />, bg:'#0e0b1f', accent:'#bd00ff', tags:['HTML','CSS','Web Application'], link:'https://github.com/Shirmeen/ceo-appp' },
  { title:'Academic Department',  desc:'Departmental web structure and layout designed for higher educational institutions.', icon:<GraduationCap size={40} />, bg:'#061324', accent:'#00abff', tags:['HTML','CSS','Web'], link:'https://github.com/Shirmeen/department-of-acadamics' },
];

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Projects',       value: `${PROJECTS.length}+`, icon: <Puzzle size={24} />, bg: '#0e0b1f', accent: '#bd00ff' },
  { label: 'Certifications', value: '6',                   icon: <Award size={24} />, bg: '#1c0a1a', accent: '#ff007f' },
  { label: 'Years Exp.',     value: '1+',                  icon: <Briefcase size={24} />, bg: '#061324', accent: '#00f0ff' },
  { label: 'Skills',         value: '16+',                 icon: <Laptop size={24} />, bg: '#07180e', accent: '#39ff14' },
];

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
const CERTS = [
  { name: 'Intro to Programming', platform: 'Kaggle', icon: <BarChart size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-programming', year: '2023' },
  { name: 'Intro to SQL', platform: 'Kaggle', icon: <Database size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-sql', year: '2023' },
  { name: 'Data Visualization', platform: 'Kaggle', icon: <LineChart size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/data-visualization', year: '2023' },
  { name: 'Intro to Deep Learning', platform: 'Kaggle', icon: <BrainCircuit size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-deep-learning', year: '2024' },
  { name: 'Multi AI Agent Systems', platform: 'DeepLearning.AI', icon: <Bot size={32} />, bg: '#1a0020', accent: '#c026d3', link: 'https://learn.deeplearning.ai/accomplishments/b60fc0e8-55fb-4aca-bcbf-5929472d5c89', year: '2024' },
  { name: '10Pearls University', platform: '10Pearls', icon: <GraduationCap size={32} />, bg: '#060024', accent: '#4f46e5', link: 'https://10pearlsuniversity.org/view-certificate/?cid=10PUC-6efc0be387dc98490e8a7165e27cedd46c33724bea620f84195311403', year: '2024' },
];

// ─── 3D TILT CARD COMPONENT ───────────────────────────────────────────────────
function TiltCard({ children, className = '', style = {} }) {
  const ref = useRef(null);
  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(10px) scale(1.01)`;
    el.style.boxShadow = `${-x * 14}px ${-y * 14}px 35px rgba(0,240,255,0.12)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
    el.style.boxShadow = '';
  }, []);
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={className}
      style={{ transition: 'transform 0.25s ease-out, box-shadow 0.3s ease-out', ...style }}>
      {children}
    </div>
  );
}

// ─── SKILL BAR COMPONENT ──────────────────────────────────────────────────────
function SkillBar({ name, pct, icon, bar }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) setW(pct); 
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="mb-5 group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base group-hover:scale-125 transition-transform duration-300">{icon}</span>
          <span className="text-sm font-bold font-mono-tech" style={{ color: PASTEL.text }}>{name}</span>
        </div>
        <span className="text-xs font-black font-mono-tech" style={{ color: PASTEL.purpleDark }}>{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(189,0,255,0.15)' }}>
        <div className="h-full rounded-full" style={{ width: `${w}%`, background: bar, transition: 'width 1.4s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 0 15px rgba(0,240,255,0.4)' }} />
      </div>
    </div>
  );
}

// ─── DOOR INTRO COMPONENT ─────────────────────────────────────────────────────
function DoorIntro({ onComplete }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Brief pause to show the logo, then open doors
    const openTimer = setTimeout(() => setOpen(true), 500);
    // Unmount after animation completes
    const doneTimer = setTimeout(() => onComplete(), 1700);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={open ? 'door-open' : ''} aria-hidden="true">
      {/* Top panel */}
      <div className="door-panel-top">
        <div style={{
          position: 'absolute',
          bottom: '60%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)',
        }} />
      </div>
      {/* Bottom panel */}
      <div className="door-panel-bottom">
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(189,0,255,0.4), transparent)',
        }} />
      </div>
      {/* Center logo (sits at seam between panels) */}
      <div className="door-logo">SA</div>
    </div>
  );
}

// ─── ANIMATED NAME COMPONENT ─────────────────────────────────────────────────
function AnimatedName({ firstName, lastName }) {
  // Split each name part into individual letter spans with staggered delays
  const renderLetters = (text, baseDelay, isGradient = false) => (
    <span
      className={isGradient ? 'glitch-hover' : ''}
      data-text={isGradient ? text : undefined}
      style={{ display: 'inline-block', perspective: '600px' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="letter-animate"
          style={{ animationDelay: `${baseDelay + i * 0.055}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );

  return (
    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight">
      <span style={{ color: PASTEL.text }}>
        {renderLetters(firstName, 0.8)}
      </span>{' '}
      <span className="text-gradient-pastel">
        {renderLetters(lastName, 0.8 + firstName.length * 0.055 + 0.1, true)}
      </span>
    </h1>
  );
}

// ─── TECH TICKER MARQUEE ─────────────────────────────────────────────────────
function TechTicker() {
  // Double the items for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrapper w-full py-4" style={{
      borderTop: '1px solid rgba(189,0,255,0.1)',
      borderBottom: '1px solid rgba(0,240,255,0.1)',
    }}>
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            <span>{item.emoji}</span>
            <span>{item.label}</span>
            <span className="ticker-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── BACKGROUND ORBS ─────────────────────────────────────────────────────────
function BackgroundOrbs() {
  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </>
  );
}

// ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal-target, .reveal-section, .reveal-left, .reveal-right'
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // Don't unobserve — let CSS handle it; once visible stays visible
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

// ─── FILTER CONSTANTS ─────────────────────────────────────────────────────────
const FILTERS = ['All', 'Generative AI', 'AI & ML', 'Web Dev', 'Systems'];
const SECTIONS_LIST = ['about', 'experience', 'skills', 'projects', 'certifications', 'contact'];

// ─── MAIN PORTFOLIO COMPONENT ─────────────────────────────────────────────────
export default function Portfolio() {
  // Intro
  const [showIntro, setShowIntro] = useState(true);

  // Navigation & Scroll State
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Search & Filter State
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Typewriter State
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Activate scroll reveal after intro
  useScrollReveal();

  // Typewriter Loop
  useEffect(() => {
    const currentRole = ROLES[roleIdx];
    let timer;
    if (!isDeleting) {
      if (typed.length < currentRole.length) {
        timer = setTimeout(() => setTyped(currentRole.slice(0, typed.length + 1)), 75);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (typed.length > 0) {
        timer = setTimeout(() => setTyped(currentRole.slice(0, typed.length - 1)), 35);
      } else {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(timer);
  }, [typed, isDeleting, roleIdx]);

  // ScrollSpy & Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      const scrollPos = window.scrollY + 220;
      for (let i = SECTIONS_LIST.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS_LIST[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS_LIST[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('shirmeenaamir112@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Filter & Search Projects
  const filteredProjects = PROJECTS.filter(p => {
    let matchesCategory = true;
    if (activeFilter === 'Generative AI') {
      matchesCategory = p.tags.some(t => ['Gen AI', 'GANs', 'VAEs', 'Interactive AI'].includes(t));
    } else if (activeFilter === 'AI & ML') {
      matchesCategory = p.tags.some(t => ['Gen AI', 'CNN', 'SVM', 'ML', 'NLP', 'Deep Learning', 'Bayesian GNN', 'Clustering', 'Data Mining', 'Regression', 'Jupyter'].includes(t));
    } else if (activeFilter === 'Web Dev') {
      matchesCategory = p.tags.some(t => ['JavaScript', 'Full Stack', 'HTML', 'SvelteKit', 'React', 'TypeScript', 'Vite', 'Vercel', 'Web Application', 'CSS', 'Web'].includes(t));
    } else if (activeFilter === 'Systems') {
      matchesCategory = p.tags.some(t => ['C++', 'x86 Assembly', 'OOP', 'Data Structures', 'Linked Lists', 'Graphics'].includes(t));
    }
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-screen relative bg-[#06040c] text-[#f1edfa]">

      {/* ── DOOR INTRO ── */}
      {showIntro && <DoorIntro onComplete={() => setShowIntro(false)} />}

      {/* ── BACKGROUND ORBS ── */}
      <BackgroundOrbs />

      {/* Cyberpunk Interactive Canvas Particles Background */}
      <InteractiveCanvas glowColor={HERO_DATA.theme.accent} />

      {/* Scroll Progress Bar */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:'3px', zIndex:999, background:'rgba(0,240,255,0.05)' }}>
        <div className="hud-progress" style={{ height:'100%', width:`${scrollProgress}%`, background:`linear-gradient(90deg, #bd00ff, ${HERO_DATA.theme.accent})`, transition:'width 0.15s ease-out', borderRadius:'0 2px 2px 0' }} />
      </div>

      {/* ── TOP NAVIGATION ── */}
      <nav style={{ background:'rgba(10,6,21,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(189,0,255,0.15)', boxShadow:'0 4px 30px rgba(0,0,0,0.5)' }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-8 py-4">
        
        <div className="text-2xl font-black text-gradient-pastel cursor-pointer tracking-tight font-mono-tech" onClick={() => scrollToSection('about')}>
          SA
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: PASTEL.textSoft }}>
          {SECTIONS_LIST.map((s) => (
            <a 
              key={s} 
              href={`#${s}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection(s); }} 
              className={`nav-link hover:opacity-80 transition-colors ${activeSection === s ? 'text-cyan-400 font-bold' : ''}`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
          <a 
            href={`${process.env.PUBLIC_URL}/resume.pdf`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95 cyber-btn font-mono-tech"
            style={{ background:`linear-gradient(135deg, #bd00ff, ${HERO_DATA.theme.accent})`, boxShadow:'0 4px 20px rgba(0,240,255,0.2)' }}
          >
            <Download size={18} className="mr-1" /> Resume
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-cyan-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-x-0 top-[65px] z-40 p-6 flex flex-col gap-4 md:hidden border-b border-purple-500/20 shadow-2xl backdrop-blur-2xl"
          style={{ background: 'rgba(10, 6, 21, 0.96)' }}
        >
          {SECTIONS_LIST.map((s) => (
            <button
              key={s}
              onClick={() => scrollToSection(s)}
              className={`text-left py-2.5 px-4 rounded-xl text-base font-bold font-mono-tech transition-colors ${
                activeSection === s ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-cyan-300'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <a 
            href={`${process.env.PUBLIC_URL}/resume.pdf`} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl font-bold text-white font-mono-tech"
            style={{ background: 'linear-gradient(135deg, #bd00ff, #00f0ff)', boxShadow: '0 4px 20px rgba(0,240,255,0.2)' }}
          >
            <Download size={18} /> Download Resume
          </a>
          <div className="flex items-center justify-center gap-4 pt-3 border-t border-purple-500/20">
            <a href="https://github.com/Shirmeen" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl pastel-card text-cyan-400 hover:text-white"><Github size={20} /></a>
            <a href="https://linkedin.com/in/shirmeen-amir-35ab81264" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl pastel-card text-cyan-400 hover:text-white"><Linkedin size={20} /></a>
            <a href="mailto:shirmeenaamir112@gmail.com" className="p-2.5 rounded-xl pastel-card text-pink-400 hover:text-white"><Mail size={20} /></a>
          </div>
        </div>
      )}

      {/* Desktop Dots Indicator */}
      <div className="section-dots">
        {SECTIONS_LIST.map((s) => (
          <button
            key={s}
            className={`section-dot ${activeSection === s ? 'active' : ''}`}
            onClick={() => scrollToSection(s)}
            title={s.charAt(0).toUpperCase() + s.slice(1)}
            aria-label={`Scroll to ${s}`}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 w-full">

        {/* ── SECTION 0: HERO / ABOUT ── */}
        <section id="about" className="min-h-screen flex flex-col justify-center pt-28 pb-0 px-6 max-w-7xl mx-auto">
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 w-full">

            {/* Profile with HUD rings — profile-burst animation on load */}
            <div className="relative flex-shrink-0 p-6 reveal-left" style={{ perspective:'900px' }}>
              {/* HUD Corner Crosshairs */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: HERO_DATA.theme.accent, boxShadow: `0 0 10px ${HERO_DATA.theme.accent}` }} />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: HERO_DATA.theme.accent, boxShadow: `0 0 10px ${HERO_DATA.theme.accent}` }} />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: HERO_DATA.theme.accent, boxShadow: `0 0 10px ${HERO_DATA.theme.accent}` }} />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: HERO_DATA.theme.accent, boxShadow: `0 0 10px ${HERO_DATA.theme.accent}` }} />

              <div className="absolute inset-6 rounded-full hud-pulse pointer-events-none" style={{ border: `1px solid ${HERO_DATA.theme.accent}33`, boxShadow: `inset 0 0 30px ${HERO_DATA.theme.accent}15` }} />
              <div className="ring-spin absolute inset-0 rounded-full pointer-events-none" style={{ margin:'4px', border:`1.5px dashed ${HERO_DATA.theme.accent}88`, borderRadius:'50%' }} />
              <div className="ring-spin-r absolute inset-0 rounded-full pointer-events-none" style={{ margin:'-12px', border:'1px dotted rgba(189,0,255,0.4)', borderRadius:'50%' }} />
              <div className="absolute inset-6 rounded-full animate-bobble pointer-events-none" style={{ background:`radial-gradient(circle,${HERO_DATA.theme.accent}33,transparent 70%)`, filter:'blur(25px)' }} />

              {/* Profile Image with burst animation */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full z-10 profile-burst"
                style={{ background:`linear-gradient(135deg, ${HERO_DATA.theme.accent}, #bd00ff, #ff007f)`, padding:'3px', boxShadow:`0 0 50px ${HERO_DATA.theme.accent}33, 0 10px 30px rgba(0,0,0,0.8)` }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{ background:'#080511', border:'3px solid #080511' }}>
                  <img src={profileImage} alt="Shirmeen Aamir" className="w-full h-full object-cover opacity-90 transition-opacity duration-300 hover:opacity-100" style={{ objectPosition:'center 30%', filter: 'contrast(1.05) brightness(0.95)' }} />
                </div>
              </div>

              {/* Dynamic Badges */}
              {HERO_DATA.badges.map((badge, idx) => (
                <TiltCard key={idx} className={badge.className} style={badge.style}>
                  <span className="text-lg" style={{ color: HERO_DATA.theme.accent }}>{badge.icon}</span>
                  <span className={`text-xs font-black ${badge.colorClass}`}>{badge.text}</span>
                </TiltCard>
              ))}
            </div>

            {/* Intro Text */}
            <div className="flex-1 text-center md:text-left reveal-right">
              <p className="font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center md:justify-start gap-2" style={{ color: HERO_DATA.theme.textColor }}>
                <span style={{ animation:'blink 1s steps(1) infinite', display:'inline-block' }}><Hand size={16} /></span> {HERO_DATA.hello}
              </p>

              {/* Animated letter-by-letter name */}
              <AnimatedName firstName="Shirmeen" lastName="Aamir" />

              {/* Typewriter */}
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 h-10 flex items-center justify-center md:justify-start gap-1 font-mono-tech" style={{ color: HERO_DATA.theme.accent }}>
                <span>{typed}</span>
                <span className="cursor inline-block w-0.5 h-7 rounded-full" style={{ background: HERO_DATA.theme.accent }}>|</span>
              </div>

              <p className="text-base sm:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: PASTEL.textSoft }}>
                {HERO_DATA.description}
              </p>

              {/* Contact Pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
                {[
                  [(<MapPin size={16} key="pin" />), 'Lahore, Pakistan'],
                  [(<Phone size={16} key="phone" />), '+92 316 6370030']
                ].map(([icon, text]) => (
                  <div key={text} className="pastel-card flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-mono-tech" style={{ color: PASTEL.textSoft }}>
                    {icon} <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Social CTA Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {HERO_DATA.buttons.map(btn => (
                  <a key={btn.label} href={btn.href} target={btn.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="sheen-parent flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 font-mono-tech"
                    style={{ background: btn.bg, color: btn.color, boxShadow:`0 6px 24px ${HERO_DATA.theme.accent}33` }}>
                    {btn.icon} {btn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── TECH TICKER MARQUEE ── */}
          <div className="w-full mt-14 mb-0">
            <TechTicker />
          </div>

          {/* Quick Stats Grid */}
          <div className="w-full mt-10 mb-0 mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {STATS.map((s) => (
                <TiltCard key={s.label} className="pastel-card rounded-3xl p-6 sm:p-7 text-center reveal-target"
                  style={{ borderTop:`3px solid ${s.accent}55` }}>
                  <div className="text-3xl sm:text-4xl mb-3 flex justify-center text-center mx-auto">{s.icon}</div>
                  <div className="text-2xl sm:text-3xl font-black mb-1 font-mono-tech" style={{ color: s.accent }}>{s.value}</div>
                  <div className="text-xs uppercase tracking-[0.18em] font-bold font-mono-tech" style={{ color: PASTEL.textSoft }}>{s.label}</div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="flex justify-center mt-12 mb-12">
            <button
              onClick={() => scrollToSection('experience')}
              className="flex flex-col items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-cyan-400 hover:text-white transition-colors group cursor-pointer"
              aria-label="Scroll to experience section"
            >
              <span className="opacity-75 group-hover:opacity-100 transition-opacity">Scroll to explore</span>
              <ChevronDown size={18} className="animate-bounce" />
            </button>
          </div>
        </section>

        {/* ── SECTION 1: WORK EXPERIENCE ── */}
        <section id="experience" className="py-24 px-6 max-w-5xl mx-auto w-full">
          <div className="text-center mb-16 reveal-section">
            <span className="pastel-badge mb-4"><Briefcase size={14} /> Career Highlights</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2" style={{ color: PASTEL.text }}>
              Work <span className="text-gradient-pastel">Experience</span>
            </h2>
            <p className="mt-3 font-medium text-sm sm:text-base" style={{ color: PASTEL.textSoft }}>
              Production artificial intelligence engineering and institutional leadership
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, i) => (
              <TiltCard key={exp.role} className={`pastel-card rounded-[2rem] p-8 sm:p-12 relative overflow-hidden ${i === 0 ? 'reveal-left' : 'reveal-right'}`}
                style={{ borderLeft:`5px solid ${exp.accent}`, transitionDelay: `${i * 0.15}s` }}>
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]"
                  style={{ background:`linear-gradient(90deg,${exp.accent}88,${exp.accent}22)` }} />

                <div className="flex flex-col md:flex-row flex-wrap md:items-start justify-between gap-4 mb-6 mt-2 md:mt-0">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono-tech px-3 py-1 rounded-full uppercase tracking-wider font-black"
                        style={{ background: exp.badgeBg, color: exp.badgeColor, border: `1px solid ${exp.badgeColor}40` }}>
                        {exp.badgeText}
                      </span>
                      {exp.isCurrent && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black inline-flex font-mono-tech"
                          style={{ background:'rgba(57,255,20,0.1)', color:'#39ff14', border:'1px solid rgba(57,255,20,0.3)', boxShadow:'0 0 10px rgba(57,255,20,0.15)' }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'#39ff14', boxShadow:'0 0 6px #39ff14' }} />
                          Current Role
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black mb-1" style={{ color: PASTEL.text }}>{exp.role}</h3>
                    <p className="font-bold text-lg font-mono-tech" style={{ color: exp.accent }}>{exp.company}</p>
                  </div>
                  <div className="pastel-card px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 font-mono-tech self-start" style={{ color: PASTEL.textSoft }}>
                    {exp.duration}
                  </div>
                </div>

                <p className="leading-relaxed mb-8 italic border-l-4 pl-5 text-sm sm:text-base" style={{ color: PASTEL.textSoft, borderColor: exp.accent + '60' }}>
                  {exp.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {exp.bullets.map((b, bi) => (
                    <div key={bi} className="flex gap-3 items-start rounded-2xl p-4"
                      style={{ background: exp.color, border:`1px solid ${exp.accent}25` }}>
                      <span style={{ color: exp.accent }} className="mt-0.5 text-lg font-black">▸</span>
                      <span className="text-sm font-semibold" style={{ color: PASTEL.text }}>{b}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: SKILLS ── */}
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16 reveal-section">
            <span className="pastel-badge mb-4"><Keyboard size={14} /> Technical Arsenal</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2" style={{ color: PASTEL.text }}>
              Skills & <span className="text-gradient-pastel">Technologies</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SKILLS.map((cat, i) => (
              <TiltCard key={cat.category} className="pastel-card rounded-[2rem] p-8 sm:p-9 relative overflow-hidden reveal-target">
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]" style={{ background: cat.bar }} />
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 -mr-10 -mt-10 blur-2xl"
                  style={{ background: cat.bg }} />
                <h3 className="text-lg font-black mb-8 flex items-center gap-3 font-mono-tech" style={{ color: PASTEL.text }}>
                  <span className="text-2xl">{cat.icon}</span> {cat.category}
                </h3>
                {cat.items.map((s) => (
                  <SkillBar key={s.name} {...s} bar={cat.bar} />
                ))}
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: PROJECTS ── */}
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center mb-10 reveal-section">
            <span className="pastel-badge mb-4"><Rocket size={14} className="mr-1 inline" /> Built Projects</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2" style={{ color: PASTEL.text }}>
              Featured <span className="text-gradient-pastel">Projects</span>
            </h2>
            <p className="mt-3 font-medium text-sm sm:text-base max-w-2xl mx-auto" style={{ color: PASTEL.textSoft }}>
              Showcasing verified engineering work in Generative AI, machine learning, computer vision, and systems.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto mb-8 relative reveal-section">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects (e.g. LangChain, GNN, C++, Python)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl font-mono-tech text-sm text-white placeholder-gray-400 bg-[#0a0615] border border-purple-500/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills & Results Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 reveal-section">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all focus:outline-none font-mono-tech ${activeFilter === f ? 'scale-105' : 'hover:scale-105'}`}
                  style={{
                    background: activeFilter === f ? 'linear-gradient(135deg,#bd00ff,#00f0ff)' : 'rgba(10,6,21,0.7)',
                    color: activeFilter === f ? '#fff' : PASTEL.textSoft,
                    border: `1px solid ${activeFilter === f ? 'rgba(0,240,255,0.6)' : 'rgba(189,0,255,0.2)'}`,
                    boxShadow: activeFilter === f ? '0 0 20px rgba(0,240,255,0.25)' : 'none'
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300">
                Showing {filteredProjects.length} of {PROJECTS.length}
              </span>
              {(searchQuery || activeFilter !== 'All') && (
                <button
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                  className="text-xs font-mono-tech text-pink-400 hover:text-pink-300 flex items-center gap-1 ml-2 transition-colors"
                >
                  <RefreshCw size={12} /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProjects.map((p) => (
                <TiltCard key={p.title} className="pastel-card rounded-[2rem] overflow-hidden flex flex-col group reveal-target">
                  <div className="flex flex-col flex-1 h-full">
                    <div className="h-36 flex items-center justify-center relative overflow-hidden sheen-parent"
                      style={{ background:`linear-gradient(135deg,${p.bg},#0a0615)` }}>
                      <div className="absolute inset-0 opacity-40" style={{ background:`radial-gradient(circle at 30% 40%,${p.accent}40,transparent 65%)` }} />
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full opacity-20 blur-lg" style={{ background: p.accent }} />
                      <span className="text-5xl z-10 group-hover:scale-125 transition-transform duration-500 group-hover:-translate-y-1">{p.icon}</span>
                    </div>

                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="font-black uppercase text-sm tracking-tight leading-snug mb-2" style={{ color: PASTEL.text }}>
                        {p.title}
                      </h3>
                      <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: PASTEL.textSoft }}>
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {p.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider font-mono-tech"
                            style={{ background: 'rgba(189,0,255,0.12)', color: '#00f0ff', border:'1px solid rgba(0,240,255,0.3)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-auto pt-4 border-t border-purple-500/10">
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 font-mono-tech" style={{ background: 'rgba(189,0,255,0.12)', color: '#fff', border: '1px solid rgba(189,0,255,0.3)' }}>
                          Code ↗
                        </a>
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 text-white font-mono-tech" style={{ background: 'linear-gradient(135deg,#bd00ff,#00f0ff)', boxShadow: '0 4px 12px rgba(0,240,255,0.3)' }}>
                            Live Site ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 pastel-card rounded-3xl p-8 max-w-lg mx-auto">
              <Bot size={48} className="mx-auto text-cyan-400 mb-4 opacity-80" />
              <p className="text-lg font-bold mb-2" style={{ color: PASTEL.text }}>No matching projects found</p>
              <p className="text-sm mb-6" style={{ color: PASTEL.textSoft }}>
                No projects matched "{searchQuery}" under the "{activeFilter}" filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                className="px-6 py-2.5 rounded-xl font-mono-tech text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 transition-transform"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </section>

        {/* ── SECTION 4: CERTIFICATIONS ── */}
        <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16 reveal-section">
            <span className="pastel-badge mb-4">🎖️ Credentials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2" style={{ color: PASTEL.text }}>
              My <span className="text-gradient-pastel">Certifications</span>
            </h2>
            <p className="mt-3 font-medium text-sm sm:text-base" style={{ color: PASTEL.textSoft }}>Verified credentials from leading AI and tech institutions</p>
          </div>

          <div className="reveal-section">
            <HowItWorks features={CERTS.map(cert => ({
              title: cert.name,
              description: cert.platform + ' • ' + cert.year,
              icon: cert.icon,
              link: cert.link,
              colors: { bg: cert.bg, text: cert.accent, border: `${cert.accent}40` }
            }))} />
          </div>
        </section>

        {/* ── SECTION 5: CONTACT & FOOTER ── */}
        <section id="contact" className="pt-24 pb-12 px-6 max-w-4xl mx-auto w-full">
          <TiltCard className="pastel-card rounded-[3rem] p-10 sm:p-14 md:p-18 text-center relative overflow-hidden mb-16 reveal-section"
            style={{ boxShadow:'0 30px 80px rgba(0,240,255,0.1)' }}>
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-20 -mt-20 -ml-20 animate-float3d"
              style={{ background:'radial-gradient(circle,#bd00ff44,transparent)' }} />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 -mb-20 -mr-20 animate-float3d-delay"
              style={{ background:'radial-gradient(circle,#00f0ff33,transparent)' }} />
            
            <div className="relative z-10">
              <span className="pastel-badge mb-4"><Mail size={14} /> Get in Touch</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black my-4" style={{ color: PASTEL.text }}>
                Let's Build Something <span className="text-gradient-pastel">Amazing!</span> <Rocket className="inline ml-2 text-pink-500" size={36}/>
              </h2>
              <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: PASTEL.textSoft }}>
                I'm actively open to exciting opportunities, innovative collaborations, and building transformative AI systems.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4">
                <a href="mailto:shirmeenaamir112@gmail.com"
                  className="sheen-parent px-8 py-4 rounded-2xl font-black text-base sm:text-lg text-white transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 cyber-btn font-mono-tech"
                  style={{ background:'linear-gradient(135deg,#bd00ff,#00f0ff)', boxShadow:'0 8px 30px rgba(0,240,255,0.3)' }}>
                  Email Me <Mail size={18} className="ml-2 inline" />
                </a>

                <button
                  onClick={copyEmail}
                  className="pastel-card px-7 py-4 rounded-2xl font-black text-base sm:text-lg transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 font-mono-tech flex items-center gap-2 cursor-pointer"
                  style={{ color: PASTEL.purpleDark }}
                >
                  {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  {copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}
                </button>

                <a href="https://linkedin.com/in/shirmeen-amir-35ab81264" target="_blank" rel="noopener noreferrer"
                  className="sheen-parent pastel-card px-7 py-4 rounded-2xl font-black text-base sm:text-lg transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 font-mono-tech flex items-center gap-2"
                  style={{ color: '#00f0ff', border: '1px solid rgba(0,240,255,0.3)' }}>
                  LinkedIn <Linkedin size={18} />
                </a>

                <a href="https://github.com/Shirmeen" target="_blank" rel="noopener noreferrer"
                  className="pastel-card px-7 py-4 rounded-2xl font-black text-base sm:text-lg transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 font-mono-tech flex items-center gap-2"
                  style={{ color: PASTEL.purpleDark }}>
                  GitHub <Github size={18} />
                </a>
              </div>
            </div>
          </TiltCard>

          {/* Footer */}
          <footer className="text-center w-full pt-8" style={{ borderTop:'1px solid rgba(189,0,255,0.15)' }}>
            <div className="text-2xl font-black text-gradient-pastel mb-2 font-mono-tech">SA</div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1 font-mono-tech" style={{ color: PASTEL.textSoft }}>
              Generative AI Engineer • Data Scientist • ML Enthusiast
            </p>
            <p className="text-xs font-mono-tech" style={{ color:'#8e84ad' }}>
              © {new Date().getFullYear()} Shirmeen Aamir — Built with <Heart size={14} className="inline text-red-500 mx-1" fill="currentColor" /> & React
            </p>
          </footer>
        </section>

      </main>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}