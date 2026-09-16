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
import CertificatesDemo from './components/CertificatesDemo';
import { GridPulse } from './components/ui/grid-pulse';

// ─── HIGH-CONTRAST CYBER COLOR PALETTE ────────────────────────────────────────
const PASTEL = {
  lavender:   '#ffffff',
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
  text:       '#111827',
  textSoft:   '#4b5563',
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
      <span className="font-bold px-2.5 py-1.5 rounded text-cyan-800 bg-cyan-100 border border-cyan-800/40 font-mono-tech shadow-[0_0_15px_rgba(6,182,212,0.15)]">Generative AI</span>,{' '}
      <span className="font-bold px-2.5 py-1.5 rounded text-purple-800 bg-purple-100 border border-purple-800/40 font-mono-tech shadow-[0_0_15px_rgba(168,85,247,0.15)]">Deep Learning</span>,{' '}
      <span className="font-bold px-2.5 py-1.5 rounded text-pink-800 bg-pink-100 border border-pink-800/40 font-mono-tech shadow-[0_0_15px_rgba(236,72,153,0.15)]">Computer Vision</span>, and{' '}
      <span className="font-bold px-2.5 py-1.5 rounded text-emerald-800 bg-emerald-100 border border-emerald-800/40 font-mono-tech shadow-[0_0_15px_rgba(16,185,129,0.15)]">Bayesian Modeling</span>.
    </>
  ),
  badges: [
    { text: 'AI Engineer', icon: <Bot size={16} />, className: 'absolute top-8 -left-4 sm:-left-8 md:-left-12 pastel-card px-4 py-2 rounded-xl flex items-center gap-2 z-20 animate-bobble border-cyan-500/30', style: { boxShadow: '0 8px 24px rgba(0,240,255,0.2)' }, colorClass: 'text-cyan-800 font-mono-tech' },
    { text: 'Gen AI', icon: <BrainCircuit size={16} />, className: 'absolute bottom-8 -right-4 sm:-right-6 md:-right-10 pastel-card px-4 py-2 rounded-xl flex items-center gap-2 z-20 animate-float3d-delay border-purple-500/30', style: { boxShadow: '0 8px 24px rgba(189,0,255,0.2)' }, colorClass: 'text-purple-800 font-mono-tech' }
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
    bg: '#ffffff', bar: 'linear-gradient(90deg,#bd00ff,#00f0ff)',
    items: [
      { name:'Python',     pct:90, icon:'🐍' },
      { name:'C/C++',      pct:75, icon:'⚡' },
      { name:'SQL',        pct:85, icon:'🗄️' },
      { name:'PostgreSQL', pct:80, icon:'🐘' },
    ],
  },
  {
    category: 'Frameworks & Tools', icon: <Briefcase size={24} />,
    bg: '#ffffff', bar: 'linear-gradient(90deg,#00abff,#00f0ff)',
    items: [
      { name:'LangChain', pct:85, icon:'🔗' },
      { name:'Power BI',  pct:80, icon:<BarChart size={40} /> },
      { name:'Docker',    pct:75, icon:'🐳' },
      { name:'Django',    pct:70, icon:'🌿' },
    ],
  },
  {
    category: 'ML & Deep Learning', icon: <BrainCircuit size={20} />,
    bg: '#ffffff', bar: 'linear-gradient(90deg,#ff007f,#bd00ff)',
    items: [
      { name:'TensorFlow',  pct:85, icon:'🧠' },
      { name:'PyTorch',     pct:80, icon:'🔥' },
      { name:'Scikit-Learn',pct:90, icon:'📈' },
      { name:'OpenCV',      pct:85, icon:<Eye size={40} /> },
    ],
  },
  {
    category: 'Generative AI', icon: <Sparkles size={20} />,
    bg: '#ffffff', bar: 'linear-gradient(90deg,#ff9900,#ffff00)',
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
  { title:'ADetectPro (FYP)',     desc:"Early Alzheimer's detection using Bayesian Graph Neural Networks (GNNs) with uncertainty quantification.", icon:<Hospital size={40} />, bg: '#ffffff', accent:'#ea580c', tags:['Gen AI','Bayesian GNN','Deep Learning','Python'], link:'https://github.com/Shirmeen/fyp' },
  { title:'Generative AI Models', desc:'Comprehensive suite of GANs, Autoencoders & VAEs for generative modeling and latent space representation.', icon:<Sparkles size={40} />, bg: '#ffffff', accent:'#c026d3', tags:['Gen AI','GANs','VAEs','Deep Learning'], link:'https://github.com/Shirmeen/Generative-Adversarial-Networks-GANs-Autoencoders-AE-Variational-Autoencoders-VAEs-' },
  { title:'EmoNet',               desc:'Facial expression emotion recognition engine leveraging CNNs, Support Vector Machines (SVM), and Random Forests.', icon:<Eye size={40} />, bg: '#ffffff', accent:'#2563eb', tags:['CNN','SVM','Deep Learning'], link:'https://github.com/Shirmeen/EmoNet' },
  { title:'Smart Gaming Picks',   desc:'Machine learning recommendation & success prediction system analyzing gaming data trends with NLP.', icon:<Gamepad2 size={40} />, bg: '#ffffff', accent:'#16a34a', tags:['ML','NLP','Web Scraping'], link:'https://github.com/Shirmeen/smart-gaming-picks' },
  { title:'Chatbot',              desc:'Interactive conversational agent utilizing NLP heuristics, intent classification, and Python pipelines.', icon:<MessageSquare size={40} />, bg: '#ffffff', accent:'#7c3aed', tags:['Gen AI','NLP','Python','Jupyter'], link:'https://github.com/Shirmeen/Chatbot' },
  { title:'AI Workshop',          desc:'Interactive AI toolkit application exploring cutting-edge generative tools and hands-on AI workflows.', icon:<Bot size={40} />, bg: '#ffffff', accent:'#f59e0b', tags:['Gen AI','Interactive AI','Web','JavaScript'], link:'https://github.com/Shirmeen/ai-workshop', live:'https://shirmeen.github.io/ai-workshop/' },
  { title:'Diabetes Prediction',  desc:'Predictive healthcare diagnostic model using concept hierarchies, data mining, and unsupervised clustering.', icon:<BarChart size={40} />, bg: '#ffffff', accent:'#e11d48', tags:['Clustering','Data Mining','ML'], link:'https://github.com/Shirmeen/Diabetes-Prediction-Using-Concept-Hierarchies-and-Clustering' },
  { title:'Thermal Comfort',      desc:'Predicts environmental thermal comfort indices using comparative machine learning regression models.', icon:<Thermometer size={40} />, bg: '#ffffff', accent:'#ca8a04', tags:['ML','Regression'], link:'https://github.com/Shirmeen/Thermal-Comfort-Prediction-Using-Machine-Learning-Models' },
  { title:"Weaver's Den",         desc:'Full-stack web platform connecting textile buyers directly with verified manufacturers.', icon:<Factory size={40} />, bg: '#ffffff', accent:'#0284c7', tags:['JavaScript','Full Stack','Web Application'], link:'https://github.com/Shirmeen/Weaver-s-Den' },
  { title:'Pacman Game',          desc:'Object-oriented classic Pacman arcade game built in C++ with custom rendering and game physics.', icon:<Ghost size={40} />, bg: '#ffffff', accent:'#d97706', tags:['C++','OOP','Graphics'], link:'https://github.com/Shirmeen/Pacman-Game-Implementation-in-C-' },
  { title:'Music Playlist Manager', desc:'High-efficiency C++ playlist management system implemented with double-ended linked list data structures.', icon:<Music size={40} />, bg: '#ffffff', accent:'#a21caf', tags:['C++','Data Structures'], link:'https://github.com/Shirmeen/Music-Playlist-Manager' },
  { title:'Connect-N Game',       desc:'Scalable multi-player Connect-N board game developed in C++ using advanced OOP design patterns.', icon:<Dices size={40} />, bg: '#ffffff', accent:'#1d4ed8', tags:['C++','OOP'], link:'https://github.com/Shirmeen/Connect-N-Gam' },
  { title:'Tic-Tac-Toe',         desc:'Low-level bare-metal Tic-Tac-Toe game programmed in pure x86 Assembly language.', icon:<Circle size={40} />, bg: '#ffffff', accent:'#475569', tags:['x86 Assembly'], link:'https://github.com/Shirmeen/Tic-Tac-Toe-in-Assembly-Language' },
  { title:'2D Doubly Linked Notepad', desc:'Text editor with custom cursor navigation implemented via a 2D doubly linked list in C++.', icon:<Database size={40} />, bg: '#ffffff', accent:'#22c55e', tags:['Data Structures','Linked Lists','C++'], link:'https://github.com/Shirmeen/Project-Implement-a-Notepad-using-a-Two-Dimensional-Doubly-Linkedlist' },
  { title:'Moot 2.0',             desc:'Modern web application featuring responsive animations, clean components, and deployed on Vercel.', icon:<Globe size={40} />, bg: '#ffffff', accent:'#8b5cf6', tags:['HTML','Web Application','Vercel'], link:'https://github.com/Shirmeen/moot2.0', live:'https://moot2-0.vercel.app' },
  { title:'NOTETAKE5R',           desc:'SvelteKit note-taking system featuring Google Calendar OAuth 2.0 integration and real-time syncing.', icon:<Keyboard size={40} />, bg: '#ffffff', accent:'#0d9488', tags:['SvelteKit','Full Stack','Web Application'], link:'https://github.com/Shirmeen/NOTETAKE5R-' },
  { title:'React Vite App',       desc:'Ultra-fast React + TypeScript single-page application built on Vite with HMR and Tailwind.', icon:<Rocket size={40} />, bg: '#ffffff', accent:'#4f46e5', tags:['React','TypeScript','Vite'], link:'https://github.com/Shirmeen/app', live:'https://shirmeen.github.io/app/' },
  { title:'CEO Dashboard',        desc:'Executive analytics dashboard with interactive metrics visualization and data telemetry.', icon:<BarChart size={40} />, bg: '#ffffff', accent:'#bd00ff', tags:['HTML','CSS','Web Application'], link:'https://github.com/Shirmeen/ceo-appp' },
  { title:'Academic Department',  desc:'Departmental web structure and layout designed for higher educational institutions.', icon:<GraduationCap size={40} />, bg: '#ffffff', accent:'#00abff', tags:['HTML','CSS','Web'], link:'https://github.com/Shirmeen/department-of-acadamics' },
];

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Projects',       value: `${PROJECTS.length}+`, icon: <Puzzle size={24} />, bg: '#ffffff', accent: '#bd00ff' },
  { label: 'Certifications', value: '6',                   icon: <Award size={24} />, bg: '#ffffff', accent: '#ff007f' },
  { label: 'Years Exp.',     value: '1+',                  icon: <Briefcase size={24} />, bg: '#ffffff', accent: '#00f0ff' },
  { label: 'Skills',         value: '16+',                 icon: <Laptop size={24} />, bg: '#ffffff', accent: '#39ff14' },
];

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
const CERTS = [
  { name: 'Intro to Programming', platform: 'Kaggle', icon: <BarChart size={20} />, bg: '#ffffff', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-programming', year: '2023' },
  { name: 'Intro to SQL', platform: 'Kaggle', icon: <Database size={20} />, bg: '#ffffff', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-sql', year: '2023' },
  { name: 'Data Visualization', platform: 'Kaggle', icon: <LineChart size={20} />, bg: '#ffffff', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/data-visualization', year: '2023' },
  { name: 'Intro to Deep Learning', platform: 'Kaggle', icon: <BrainCircuit size={20} />, bg: '#ffffff', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-deep-learning', year: '2024' },
  { name: 'Multi AI Agent Systems', platform: 'DeepLearning.AI', icon: <Bot size={32} />, bg: '#ffffff', accent: '#c026d3', link: 'https://learn.deeplearning.ai/accomplishments/b60fc0e8-55fb-4aca-bcbf-5929472d5c89', year: '2024' },
  { name: '10Pearls University', platform: '10Pearls', icon: <GraduationCap size={32} />, bg: '#ffffff', accent: '#4f46e5', link: 'https://10pearlsuniversity.org/view-certificate/?cid=10PUC-6efc0be387dc98490e8a7165e27cedd46c33724bea620f84195311403', year: '2024' },
];

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const DrawnArrow = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" className="drawn-arrow absolute" style={{ zIndex: 10 }}>
    <path d="M10,10 Q40,60 80,40" />
    <path d="M70,30 L80,40 L70,50" />
  </svg>
);

const Smiley = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 mb-1">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

// ─── MAIN PORTFOLIO COMPONENT ─────────────────────────────────────────────────
export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const SECTIONS_LIST = ['about', 'work', 'services', 'contact'];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-[#111827]" style={{ backgroundColor: '#e8e6e1' }}>
      
      {/* ── TOP NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-[#e8e6e1]/90 backdrop-blur-sm border-b-2 border-[#111827]">
        <div className="text-xl font-bold font-mono tracking-tighter cursor-pointer" onClick={() => scrollToSection('about')}>
          SA
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm">
          {SECTIONS_LIST.map((s) => (
            <a 
              key={s} 
              href={`#${s}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection(s); }} 
              className={`nav-link ${activeSection === s ? 'underline underline-offset-4 decoration-2' : ''}`}
            >
              {s.toUpperCase()}
            </a>
          ))}
          <a 
            href={`${process.env.PUBLIC_URL}/resume.pdf`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-[#111827] px-4 py-1.5 font-bold hover:bg-[#111827] hover:text-[#e8e6e1] transition-colors"
          >
            RESUME
          </a>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#111827]">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <main className="pt-28 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        
        {/* ── HERO SECTION ── */}
        <section id="about" className="min-h-[85vh] py-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Titles */}
            <div className="relative pt-12 md:pt-24 z-10">
              <div className="mb-12 font-mono text-sm font-bold leading-tight">
                AI ENGINEER / <br/> DATA SCIENTIST
              </div>
              
              <div className="relative inline-block mb-16 mt-4">
                <div className="scrapbook-box tilt-left text-3xl md:text-5xl lg:text-6xl text-[#111827]">
                  <Smiley /> SHIRMEEN
                </div>
                {/* Arrow pointing to image */}
                <div className="absolute -bottom-16 -right-12 rotate-12 hidden md:block">
                  <DrawnArrow />
                </div>
              </div>
            </div>

            {/* Right Column: Image & Surname */}
            <div className="relative flex justify-center md:justify-end pr-0 md:pr-12 pt-8">
              <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px]">
                <img 
                  src={profileImage} 
                  alt="Shirmeen Aamir" 
                  className="w-full h-full object-cover border-2 border-[#111827]"
                />
                <div className="absolute -bottom-8 -left-12">
                  <div className="scrapbook-box tilt-right text-3xl md:text-5xl lg:text-6xl text-[#111827] bg-[#e8e6e1]">
                    AAMIR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MY WORK SECTION ── */}
        <section id="work" className="py-20 border-t-2 border-[#111827]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Image (using profile as placeholder for keyboard) */}
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] bg-gray-300 border-2 border-[#111827] overflow-hidden flex items-center justify-center">
                 {/* Re-using profile img as placeholder for now, or user can replace */}
                 <img src={profileImage} alt="Work" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-7 pl-0 md:pl-8">
              <div className="mb-10">
                <div className="scrapbook-box tilt-left text-2xl md:text-4xl text-[#111827]">
                  MY WORK <Smiley />
                </div>
              </div>
              
              <p className="text-lg md:text-xl font-medium mb-12 max-w-xl leading-relaxed">
                {HERO_DATA.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Highlighted Project 1 */}
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="asterisk-divider mt-1">*</span>
                    <h3 className="font-bold text-sm tracking-widest uppercase font-mono">{PROJECTS[0]?.title || 'FEATURED PROJECT'}</h3>
                  </div>
                  <p className="text-sm pl-8 text-gray-700">
                    {PROJECTS[0]?.desc}
                  </p>
                </div>
                {/* Highlighted Project 2 */}
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="asterisk-divider mt-1">*</span>
                    <h3 className="font-bold text-sm tracking-widest uppercase font-mono">{PROJECTS[1]?.title || 'LATEST PROJECT'}</h3>
                  </div>
                  <p className="text-sm pl-8 text-gray-700">
                    {PROJECTS[1]?.desc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── SERVICES I OFFER ── */}
        <section id="services" className="py-20 border-t-2 border-[#111827] flex flex-col items-center">
          <div className="mb-16">
            <div className="border-2 border-[#111827] px-8 py-3 bg-[#e8e6e1] text-2xl md:text-4xl font-mono font-bold tracking-widest">
              SERVICES <span className="font-sans font-light">I OFFER</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-12 w-full max-w-4xl">
            {/* Service 1 */}
            <div className="flex items-start gap-6">
              <Laptop size={48} strokeWidth={1.5} className="mt-1" />
              <div>
                <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
                  {SKILLS[0]?.category || 'AI Development'}
                </h3>
                <p className="text-sm text-gray-700">
                  Specialized in building and deploying LLMs, LangChain architectures, and generative AI pipelines.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex items-start gap-6">
              <BrainCircuit size={48} strokeWidth={1.5} className="mt-1" />
              <div>
                <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
                  {SKILLS[2]?.category || 'Deep Learning'}
                </h3>
                <p className="text-sm text-gray-700">
                  Designing and training custom neural networks, computer vision models, and predictive analytics.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex items-start gap-6">
              <Database size={48} strokeWidth={1.5} className="mt-1" />
              <div>
                <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
                  Data Science
                </h3>
                <p className="text-sm text-gray-700">
                  targeted to improve data structuring, analysis, and visualization dashboards for enterprise solutions.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex items-start gap-6">
              <Globe size={48} strokeWidth={1.5} className="mt-1" />
              <div>
                <h3 className="font-bold border-b-2 border-[#111827] inline-block mb-2 font-mono uppercase tracking-wider text-sm">
                  {SKILLS[1]?.category || 'Web Dev'}
                </h3>
                <p className="text-sm text-gray-700">
                  Full stack integration of AI models into modern web applications using React and Django.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      

        {/* ── EXPERIENCE SECTION ── */}
        <section id="experience" className="py-20 border-t-2 border-[#111827]">
          <div className="mb-16 text-center">
            <div className="border-2 border-[#111827] px-8 py-3 bg-[#e8e6e1] text-2xl md:text-4xl font-mono font-bold tracking-widest inline-block">
              EXPERIENCE
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="border-2 border-[#111827] bg-[#ffffff] p-8 relative">
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

        {/* ── MORE PROJECTS SECTION ── */}
        <section id="projects" className="py-20 border-t-2 border-[#111827]">
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-mono tracking-widest uppercase mb-2">More Projects <Smiley /></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.slice(2).map((proj, idx) => (
              <a key={idx} href={proj.link} target="_blank" rel="noreferrer" className="border-2 border-[#111827] p-5 block hover:bg-[#ffffff] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#111827]">{proj.icon}</span>
                </div>
                <h3 className="font-bold font-mono text-lg mb-2">{proj.title}</h3>
                <p className="text-sm text-gray-700 mb-4">{proj.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono border border-[#111827] px-2 py-1">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS SECTION ── */}
        <section id="certifications" className="py-20 border-t-2 border-[#111827]">
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-mono tracking-widest uppercase mb-2">Certifications</h2>
          </div>
          <CertificatesDemo />
        </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 border-t-2 border-[#111827] bg-[#e8e6e1] overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[400px] px-8 gap-12">
          
          {/* Tilted Sticker */}
          <div className="flex-1 flex justify-center md:justify-start z-10 pointer-events-none mb-12 md:mb-0">
            <div className="border-2 border-[#111827] rotate-[-4deg] text-3xl md:text-5xl lg:text-6xl text-[#111827] bg-[#e8e6e1] px-8 py-6 font-mono font-bold whitespace-nowrap shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
              CONNECT WITH ME
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex-1 flex flex-col items-center md:items-start space-y-8 font-mono text-base md:text-lg lg:text-xl font-bold tracking-widest text-[#111827] z-0">
            <a href="mailto:shirmeenaamir112@gmail.com" className="hover:underline uppercase decoration-2 underline-offset-4 break-all">
              SHIRMEENAAMIR112@GMAIL.COM
            </a>
            <a href="https://github.com/Shirmeen" target="_blank" rel="noreferrer" className="hover:underline uppercase decoration-2 underline-offset-4">
              @SHIRMEEN (GITHUB)
            </a>
            <a href="https://linkedin.com/in/shirmeen-amir-35ab81264" target="_blank" rel="noreferrer" className="hover:underline uppercase decoration-2 underline-offset-4">
              @SHIRMEEN-AMIR (LINKEDIN)
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#111827] text-[#e8e6e1] text-center">
        <p className="text-xs font-mono font-bold tracking-widest uppercase">© 2026 SHIRMEEN AAMIR. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}
