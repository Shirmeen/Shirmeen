import React, { useState, useEffect, useRef, useCallback } from 'react';
import profileImage from './image.png';
import { Puzzle, Award, Briefcase, Laptop, Database, BarChart, BrainCircuit, LineChart, Eye, Hospital, Sparkles, Gamepad2, MessageSquare, Thermometer, Factory, Ghost, Music, Dices, Circle, Bot, Hand, Github, Linkedin, Mail, GraduationCap, Rocket, Keyboard, Download, MapPin, Phone, Heart, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import InteractiveCanvas from './InteractiveCanvas';

// ─── PASTEL PALETTE ──────────────────────────────────────────────────────────
const PASTEL = {
  lavender: '#120f26',
  purple:   '#bd00ff',
  purpleDark: '#00f0ff',
  blue:     '#00f0ff',
  blueMid:  '#00abff',
  pink:     '#ff007f',
  pinkMid:  '#ff007f',
  mint:     '#39ff14',
  peach:    '#ff9900',
  yellow:   '#ffff00',
  white:    '#ffffff',
  text:     '#ede9f6',
  textSoft: '#9c95b6',
};

// ─── HERO SLIDES DATA ────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    role: 'Generative AI Engineer',
    hello: "Hello, I'm",
    name: 'Shirmeen Aamir',
    highlightedRole: 'Generative AI Engineer',
    description: (
      <>
        AI Engineer with a Data Science background specializing in{' '}
        <span className="font-bold px-2.5 py-1.5 rounded text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 font-mono-tech shadow-[0_0_15px_rgba(6,182,212,0.15)]">Generative AI</span>,{' '}
        <span className="font-bold px-2.5 py-1.5 rounded text-purple-400 bg-purple-950/50 border border-purple-800/40 font-mono-tech shadow-[0_0_15px_rgba(168,85,247,0.15)]">Deep Learning</span>,{' '}
        <span className="font-bold px-2.5 py-1.5 rounded text-pink-400 bg-pink-950/50 border border-pink-800/40 font-mono-tech shadow-[0_0_15px_rgba(236,72,153,0.15)]">Computer Vision</span>, and{' '}
        <span className="font-bold px-2.5 py-1.5 rounded text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 font-mono-tech shadow-[0_0_15px_rgba(16,185,129,0.15)]">Bayesian Modeling</span>.
      </>
    ),
    badges: [
      { text: 'AI Engineer', icon: <Bot size={16} />, className: 'absolute top-8 -left-16 pastel-card px-4 py-2 rounded-xl flex items-center gap-2 z-20 animate-bobble border-cyan-500/30', style: { boxShadow: '0 8px 24px rgba(0,240,255,0.2)' }, colorClass: 'text-cyan-400 font-mono-tech' },
      { text: 'Gen AI', icon: <BrainCircuit size={16} />, className: 'absolute bottom-8 -right-12 pastel-card px-4 py-2 rounded-xl flex items-center gap-2 z-20 animate-float3d-delay border-purple-500/30', style: { boxShadow: '0 8px 24px rgba(189,0,255,0.2)' }, colorClass: 'text-purple-400 font-mono-tech' }
    ],
    buttons: [
      { label: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/Shirmeen', bg: 'linear-gradient(135deg,#0c0919,#1b133a)', color: '#00f0ff' },
      { label: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/shirmeen-amir-35ab81264', bg: 'linear-gradient(135deg,#0a66c2,#0e86d4)', color: '#fff' },
      { label: 'Email', icon: <Mail size={20} />, href: 'mailto:shirmeenaamir112@gmail.com', bg: 'linear-gradient(135deg,#bd00ff,#ff007f)', color: '#fff' }
    ],
    theme: {
      gradient: 'radial-gradient(circle at center, #120c24 0%, #06040b 100%)',
      accent: '#00f0ff',
      textColor: '#00f0ff'
    }
  }
];

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Projects',       value: '17+', icon: <Puzzle size={24} />, bg: '#0e0b1f', accent: '#bd00ff' },
  { label: 'Certifications', value: '6',   icon: <Award size={24} />, bg: '#1c0a1a', accent: '#ff007f' },
  { label: 'Years Exp.',     value: '1+',  icon: <Briefcase size={24} />, bg: '#061324', accent: '#00f0ff' },
  { label: 'Skills',         value: '16+', icon: <Laptop size={24} />, bg: '#07180e', accent: '#39ff14' },
];

const EXPERIENCE = [
  {
    role: 'Activity Coordinator',
    company: 'Crescent Model Higher Secondary School Girls Campus',
    duration: 'February 2026 – Present',
    isCurrent: true,
    description: 'Coordinating events and extracurricular activities to foster student engagement and personal development within the school community.',
    bullets: [
      'Organizing school-wide events and academic competitions.',
      'Facilitating collaboration between students, teachers, and administration.',
      'Developing and implementing engagement programs for students.',
    ],
    color: 'rgba(255, 0, 127, 0.1)', accent: '#ff007f',
  },
  {
    role: 'Associate Generative AI Engineer',
    company: 'BIG IMMERSIVE',
    duration: 'August 2025 – January 2026',
    isCurrent: false,
    description: 'Building generative AI solutions and AI-assisted systems with a focus on prompt engineering, model integration, and end-to-end AI workflows.',
    bullets: [
      'Developing AI-assisted systems using LangChain and Claude.',
      'Implementing prompt engineering strategies for production systems.',
      'Building end-to-end AI workflows with modern frameworks.',
    ],
    color: 'rgba(189, 0, 255, 0.1)', accent: '#bd00ff',
  },
];

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

const PROJECTS = [
  { title:'ADetectPro (FYP)',     desc:"Early Alzheimer's detection using Bayesian GNNs with uncertainty quantification.", icon:<Hospital size={40} />, bg:'#1a0f00', accent:'#ea580c', tags:['Python','Bayesian GNN','Deep Learning'], link:'https://github.com/Shirmeen/fyp' },
  { title:'Generative AI Models', desc:'GANs, Autoencoders & VAEs for anomaly detection and generative modeling.',           icon:<Sparkles size={40} />, bg:'#1a0020', accent:'#c026d3', tags:['GANs','VAEs','Python'], link:'https://github.com/Shirmeen/Generative-Adversarial-Networks-GANs-Autoencoders-AE-Variational-Autoencoders-VAEs-' },
  { title:'EmoNet',               desc:'Emotion analysis via CNN, SVM, and Random Forest for facial expression classification.',icon:<Eye size={40} />,bg:'#000d1a',accent:'#2563eb',tags:['CNN','SVM','Random Forest'],link:'https://github.com/Shirmeen/EmoNet'},
  { title:'Smart Gaming Picks',   desc:'ML-based game recommendation & success prediction engine.', icon:<Gamepad2 size={40} />, bg:'#001a0a', accent:'#16a34a', tags:['ML','NLP','Web Scraping'], link:'https://github.com/Shirmeen/smart-gaming-picks' },
  { title:'Chatbot',              desc:'AI-powered chatbot using NLP techniques.',                   icon:<MessageSquare size={40} />, bg:'#0d0024', accent:'#7c3aed', tags:['NLP','Python','Jupyter'], link:'https://github.com/Shirmeen/Chatbot' },
  { title:'Diabetes Prediction',  desc:'Predicts diabetes using concept hierarchies and clustering.', icon:<BarChart size={40} />, bg:'#1a000a', accent:'#e11d48', tags:['Clustering','Data Mining'], link:'https://github.com/Shirmeen/Diabetes-Prediction-Using-Concept-Hierarchies-and-Clustering' },
  { title:'Thermal Comfort',      desc:'Predicts thermal comfort using ML regression and classification.', icon:<Thermometer size={40} />, bg:'#1a1500', accent:'#ca8a04', tags:['ML','Regression'], link:'https://github.com/Shirmeen/Thermal-Comfort-Prediction-Using-Machine-Learning-Models' },
  { title:"Weaver's Den",         desc:'Full-stack web app connecting users with textile manufacturers.', icon:<Factory size={40} />, bg:'#001524', accent:'#0284c7', tags:['JavaScript','Full Stack'], link:'https://github.com/Shirmeen/Weaver-s-Den' },
  { title:'Pacman Game',          desc:'Classic Pacman in C++ with OOP and graphics.',               icon:<Ghost size={40} />, bg:'#1a1500', accent:'#d97706', tags:['C++','OOP','Graphics'], link:'https://github.com/Shirmeen/Pacman-Game-Implementation-in-C-' },
  { title:'Music Playlist Manager', desc:'C++ playlist manager using doubly linked lists.',           icon:<Music size={40} />, bg:'#1a0020', accent:'#a21caf', tags:['C++','Data Structures'], link:'https://github.com/Shirmeen/Music-Playlist-Manager' },
  { title:'Connect-N Game',       desc:'Multi-player Connect-N in C++ with OOP.',                   icon:<Dices size={40} />, bg:'#000d1a', accent:'#1d4ed8', tags:['C++','OOP'], link:'https://github.com/Shirmeen/Connect-N-Gam' },
  { title:'Tic-Tac-Toe',         desc:'Classic game implemented in x86 Assembly.',                   icon:<Circle size={40} />, bg:'#0a0a10', accent:'#475569', tags:['x86 Assembly'], link:'https://github.com/Shirmeen/Tic-Tac-Toe-in-Assembly-Language' },
  { title:'2D Doubly Linked Notepad', desc:'A notepad built with a two-dimensional doubly linked list.', icon:<Database size={40} />, bg:'#001a0a', accent:'#22c55e', tags:['Data Structures','Linked Lists','C++'], link:'https://github.com/Shirmeen/Project-Implement-a-Notepad-using-a-Two-Dimensional-Doubly-Linkedlist.' },
  { title:'Moot 2.0', desc:'Web application with a sleek and interactive UI.', icon:<Globe size={40} />, bg:'#0d0024', accent:'#8b5cf6', tags:['HTML','Web Application','Vercel'], link:'https://github.com/Shirmeen/moot2.0', live:'https://moot2-0.vercel.app' },
  { title:'AI Workshop', desc:'Interactive AI toolkit website exploring modern AI tools and real-world workflows.', icon:<Bot size={40} />, bg:'#1a0f00', accent:'#f59e0b', tags:['HTML','CSS','JavaScript'], link:'https://github.com/Shirmeen/ai-workshop', live:'https://shirmeen.github.io/ai-workshop/' },
  { title:'NOTETAKE5R', desc:'SvelteKit-powered note-taking app with Google Calendar OAuth integration and real-time sync.', icon:<Keyboard size={40} />, bg:'#001a14', accent:'#0d9488', tags:['SvelteKit','Google OAuth','Full Stack'], link:'https://github.com/Shirmeen/NOTETAKE5R-' },
  { title:'React Vite App', desc:'Modern React + TypeScript + Vite application with HMR and optimized build pipeline.', icon:<Rocket size={40} />, bg:'#060024', accent:'#4f46e5', tags:['React','TypeScript','Vite'], link:'https://github.com/Shirmeen/app', live:'https://shirmeen.github.io/app/' },
  { title:'CEO Dashboard', desc:'Executive dashboard interface for enterprise metrics tracking.', icon:<BarChart size={40} />, bg:'#0e0b1f', accent:'#bd00ff', tags:['HTML','CSS','Web Application'], link:'https://github.com/Shirmeen/ceo-appp' },
  { title:'Academic Department', desc:'Layout and structure platform for academic departments.', icon:<GraduationCap size={40} />, bg:'#061324', accent:'#00abff', tags:['HTML','CSS','Web'], link:'https://github.com/Shirmeen/department-of-acadamics' },
];

const CERTS = [
  { name: 'Intro to Programming', platform: 'Kaggle', icon: <BarChart size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-programming', year: '2023' },
  { name: 'Intro to SQL', platform: 'Kaggle', icon: <Database size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-sql', year: '2023' },
  { name: 'Data Visualization', platform: 'Kaggle', icon: <LineChart size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/data-visualization', year: '2023' },
  { name: 'Intro to Deep Learning', platform: 'Kaggle', icon: <BrainCircuit size={20} />, bg: '#061324', accent: '#0891b2', link: 'https://www.kaggle.com/learn/certification/shirmeenaamir/intro-to-deep-learning', year: '2024' },
  { name: 'Multi AI Agent Systems', platform: 'DeepLearning.AI', icon: <Bot size={32} />, bg: '#1a0020', accent: '#c026d3', link: 'https://learn.deeplearning.ai/accomplishments/b60fc0e8-55fb-4aca-bcbf-5929472d5c89', year: '2024' },
  { name: '10Pearls University', platform: '10Pearls', icon: <GraduationCap size={32} />, bg: '#060024', accent: '#4f46e5', link: 'https://10pearlsuniversity.org/view-certificate/?cid=10PUC-6efc0be387dc98490e8a7165e27cedd46c33724bea620f84195311403', year: '2024' },
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
    el.style.boxShadow = `${-x * 20}px ${-y * 20}px 50px rgba(0,240,255,0.15)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
    el.style.boxShadow = '';
  }, []);
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={className}
      style={{ transition: 'transform 0.2s ease, box-shadow 0.3s ease', ...style }}>
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
          <span className="text-sm font-bold font-mono-tech" style={{ color: PASTEL.text }}>{name}</span>
        </div>
        <span className="text-xs font-black font-mono-tech" style={{ color: PASTEL.purpleDark }}>{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(189,0,255,0.15)' }}>
        <div className="h-full rounded-full" style={{ width: `${w}%`, background: bar, transition: 'width 1.6s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 0 15px rgba(0,240,255,0.4)' }} />
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const FILTERS = ['All', 'AI & ML', 'Generative AI', 'Web Dev', 'Systems'];

export default function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Fullpage slideshow sections
  const [activeSection, setActiveSection] = useState(0);
  const isTransitioning = useRef(false);
  const sectionsList = ['about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
  const scrollProgress = (activeSection / (sectionsList.length - 1)) * 100;

  const SECTION_DIRECTIONS = [
    { enter: 'slide-from-top', exit: 'exit-to-top' },
    { enter: 'slide-from-right', exit: 'exit-to-left' },
    { enter: 'slide-from-left', exit: 'exit-to-top' },
    { enter: 'slide-from-bottom', exit: 'exit-to-right' },
    { enter: 'slide-from-right', exit: 'exit-to-bottom' },
    { enter: 'slide-from-left', exit: 'exit-to-top' }
  ];
  const getSectionClass = (idx) => {
    if (idx === activeSection) return 'active';
    if (idx < activeSection) return SECTION_DIRECTIONS[idx].exit;
    return SECTION_DIRECTIONS[idx].enter;
  };

  const fullText = HERO_SLIDES[currentSlide].role;

  const filteredProjects = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => {
    if (activeFilter === 'AI & ML') return p.tags.some(t => ['CNN','SVM','ML','NLP','Deep Learning','Bayesian GNN','Clustering','Data Mining','Regression','Random Forest','Jupyter'].includes(t));
    if (activeFilter === 'Generative AI') return p.tags.some(t => ['GANs','VAEs','Stable Diffusion','CLIP'].includes(t));
    if (activeFilter === 'Web Dev') return p.tags.some(t => ['JavaScript','Full Stack','HTML','SvelteKit','React','TypeScript','Vite','Vercel','Web Application','CSS'].includes(t));
    if (activeFilter === 'Systems') return p.tags.some(t => ['C++','x86 Assembly','OOP','Data Structures','Linked Lists','Graphics'].includes(t));
    return false;
  });

  const handleScrollToSection = useCallback((index) => {
    if (index < 0 || index >= sectionsList.length) return;
    setActiveSection(index);
  }, []);

  useEffect(() => { setTyped(''); setDeleting(false); setSpeed(100); }, [currentSlide]);

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
  }, [typed, deleting, speed, fullText]);

  // Handle slide transitions via Wheel and Touch events
  useEffect(() => {
    const handleWheel = (e) => {
      const currentSecEl = document.querySelectorAll('.fullpage-section')[activeSection];
      if (currentSecEl) {
        const isScrollable = currentSecEl.scrollHeight > currentSecEl.clientHeight;
        if (isScrollable) {
          const isScrollingDown = e.deltaY > 0;
          const isAtBottom = Math.abs(currentSecEl.scrollHeight - currentSecEl.clientHeight - currentSecEl.scrollTop) < 4;
          const isAtTop = currentSecEl.scrollTop === 0;

          if (isScrollingDown && !isAtBottom) return;
          if (!isScrollingDown && !isAtTop) return;
        }
      }

      e.preventDefault();
      if (isTransitioning.current) return;

      if (e.deltaY > 0) {
        if (activeSection < sectionsList.length - 1) {
          isTransitioning.current = true;
          setActiveSection(prev => prev + 1);
          setTimeout(() => { isTransitioning.current = false; }, 1000);
        }
      } else if (e.deltaY < 0) {
        if (activeSection > 0) {
          isTransitioning.current = true;
          setActiveSection(prev => prev - 1);
          setTimeout(() => { isTransitioning.current = false; }, 1000);
        }
      }
    };

    let touchStart = 0;
    const handleTouchStart = (e) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const currentSecEl = document.querySelectorAll('.fullpage-section')[activeSection];
      if (currentSecEl) {
        const isScrollable = currentSecEl.scrollHeight > currentSecEl.clientHeight;
        if (isScrollable) {
          const touchEnd = e.touches[0].clientY;
          const isSwipeUp = touchStart - touchEnd > 50;
          const isSwipeDown = touchEnd - touchStart > 50;
          const isAtBottom = Math.abs(currentSecEl.scrollHeight - currentSecEl.clientHeight - currentSecEl.scrollTop) < 4;
          const isAtTop = currentSecEl.scrollTop === 0;

          if (isSwipeUp && !isAtBottom) return;
          if (isSwipeDown && !isAtTop) return;
        }
      }
      
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (isTransitioning.current) return;
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart - touchEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          if (activeSection < sectionsList.length - 1) {
            isTransitioning.current = true;
            setActiveSection(prev => prev + 1);
            setTimeout(() => { isTransitioning.current = false; }, 1000);
          }
        } else {
          if (activeSection > 0) {
            isTransitioning.current = true;
            setActiveSection(prev => prev - 1);
            setTimeout(() => { isTransitioning.current = false; }, 1000);
          }
        }
      }
    };

    const container = document.querySelector('.fullpage-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [activeSection, sectionsList.length]);

  return (
    <div className="h-screen overflow-hidden relative bg-[#06040c]">

      {/* Cyberpunk Interactive Canvas Particles Background */}
      <InteractiveCanvas glowColor={HERO_SLIDES[currentSlide].theme.accent} />

      {/* Scroll Progress Bar */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:'3px', zIndex:999, background:'rgba(0,240,255,0.05)' }}>
        <div className="hud-progress" style={{ height:'100%', width:`${scrollProgress}%`, background:`linear-gradient(90deg, #bd00ff, ${HERO_SLIDES[currentSlide].theme.accent})`, transition:'width 0.3s ease-out', borderRadius:'0 2px 2px 0' }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{ background:'rgba(10,6,21,0.7)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(189,0,255,0.15)', boxShadow:'0 4px 30px rgba(0,0,0,0.5)' }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-black text-gradient-pastel cursor-pointer tracking-tight font-mono-tech" onClick={() => handleScrollToSection(0)}>SA</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: PASTEL.textSoft }}>
          {['About','Experience','Skills','Projects','Certifications','Contact'].map((s, idx) => (
            <a key={s} href={`#${s.toLowerCase()}`} onClick={(e) => { e.preventDefault(); handleScrollToSection(idx); }} className={`nav-link hover:opacity-80 ${activeSection === idx ? 'text-cyan-400 font-bold' : ''}`}>{s}</a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95 cyber-btn font-mono-tech"
            style={{ background:`linear-gradient(135deg, #bd00ff, ${HERO_SLIDES[currentSlide].theme.accent})`, boxShadow:'0 4px 20px rgba(0,240,255,0.2)' }}>
            <Download size={18} className="mr-2" /> Resume
          </a>
        </div>
      </nav>

      {/* ── DOTS INDICATOR ── */}
      <div className="section-dots">
        {sectionsList.map((s, idx) => (
          <button
            key={s}
            className={`section-dot ${activeSection === idx ? 'active' : ''}`}
            onClick={() => handleScrollToSection(idx)}
            title={s.charAt(0).toUpperCase() + s.slice(1)}
          />
        ))}
      </div>

      {/* ── FULLPAGE SLIDESHOW CONTAINER ── */}
      <div className="fullpage-container">

          {/* ── HERO / ABOUT ── */}
          <section id="about" className={`fullpage-section relative z-10 flex flex-col pt-28 pb-10 px-6 justify-between ${getSectionClass(0)}`}>
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
              {/* Slide container */}
              <div key={currentSlide} className="flex-1 flex flex-col md:flex-row items-center justify-center gap-16 w-full mt-4 md:mt-0">

                {/* Profile 3D area */}
                <div className="relative flex-shrink-0 p-6 animate-fadein-left" style={{ perspective:'900px' }}>
                  {/* HUD Corner Crosshairs */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: HERO_SLIDES[currentSlide].theme.accent, boxShadow: `0 0 10px ${HERO_SLIDES[currentSlide].theme.accent}` }} />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: HERO_SLIDES[currentSlide].theme.accent, boxShadow: `0 0 10px ${HERO_SLIDES[currentSlide].theme.accent}` }} />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: HERO_SLIDES[currentSlide].theme.accent, boxShadow: `0 0 10px ${HERO_SLIDES[currentSlide].theme.accent}` }} />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: HERO_SLIDES[currentSlide].theme.accent, boxShadow: `0 0 10px ${HERO_SLIDES[currentSlide].theme.accent}` }} />

                  {/* Glowing HUD circular scanner */}
                  <div className="absolute inset-6 rounded-full hud-pulse pointer-events-none" style={{ border: `1px solid ${HERO_SLIDES[currentSlide].theme.accent}33`, boxShadow: `inset 0 0 30px ${HERO_SLIDES[currentSlide].theme.accent}15` }} />

                  {/* Outer spinning ring 1 */}
                  <div className="ring-spin absolute inset-0 rounded-full pointer-events-none" style={{ margin:'4px', border:`1.5px dashed ${HERO_SLIDES[currentSlide].theme.accent}88`, borderRadius:'50%' }} />
                  {/* Outer spinning ring 2 (reverse) */}
                  <div className="ring-spin-r absolute inset-0 rounded-full pointer-events-none" style={{ margin:'-12px', border:'1px dotted rgba(189,0,255,0.4)', borderRadius:'50%' }} />
                  {/* Glow behind */}
                  <div className="absolute inset-6 rounded-full animate-bobble pointer-events-none" style={{ background:`radial-gradient(circle,${HERO_SLIDES[currentSlide].theme.accent}33,transparent 70%)`, filter:'blur(25px)' }} />

                  {/* Image frame */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full z-10 animate-float3d"
                    style={{ background:`linear-gradient(135deg, ${HERO_SLIDES[currentSlide].theme.accent}, #bd00ff, #ff007f)`, padding:'3px', boxShadow:`0 0 50px ${HERO_SLIDES[currentSlide].theme.accent}33, 0 10px 30px rgba(0,0,0,0.8)` }}>
                    <div className="w-full h-full rounded-full overflow-hidden" style={{ background:'#080511', border:'3px solid #080511' }}>
                      <img src={profileImage} alt="Shirmeen Aamir" className="w-full h-full object-cover opacity-90 transition-opacity duration-300 hover:opacity-100" style={{ objectPosition:'center 30%', filter: 'contrast(1.05) brightness(0.95)' }} />
                    </div>
                  </div>

                  {/* Dynamic Badges */}
                  {HERO_SLIDES[currentSlide].badges.map((badge, idx) => (
                    <TiltCard key={idx} className={badge.className} style={badge.style}>
                      <span className="text-lg" style={{ color: HERO_SLIDES[currentSlide].theme.accent }}>{badge.icon}</span>
                      <span className={`text-xs font-black ${badge.colorClass}`}>{badge.text}</span>
                    </TiltCard>
                  ))}
                </div>

                {/* Text */}
                <div className="flex-1 text-center md:text-left animate-fadein-right">
                  <p className="font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center md:justify-start gap-2" style={{ color: HERO_SLIDES[currentSlide].theme.textColor }}>
                    <span style={{ animation:'blink 1s steps(1) infinite', display:'inline-block' }}><Hand size={16} /></span> {HERO_SLIDES[currentSlide].hello}
                  </p>
                  <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight">
                    <span style={{ color: PASTEL.text }}>{HERO_SLIDES[currentSlide].name.split(' ')[0]}</span>{' '}
                    <span className="text-gradient-pastel">{HERO_SLIDES[currentSlide].name.split(' ')[1]}</span>
                  </h1>
                  <div className="text-2xl md:text-3xl font-bold mb-6 h-10 flex items-center justify-center md:justify-start gap-1" style={{ color: HERO_SLIDES[currentSlide].theme.accent }}>
                    <span>{typed}</span>
                    <span className="cursor inline-block w-0.5 h-7 rounded-full" style={{ background: HERO_SLIDES[currentSlide].theme.accent }}>|</span>
                  </div>
                  <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: PASTEL.textSoft }}>
                    {HERO_SLIDES[currentSlide].description}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
                    {[[(<MapPin size={16} />),'Lahore, Pakistan'],[(<Phone size={16} />), '+92 316 6370030']].map(([icon, text]) => (
                      <div key={text} className="pastel-card flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-mono-tech" style={{ color: PASTEL.textSoft }}>
                        {icon} <span className="ml-1">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {HERO_SLIDES[currentSlide].buttons.map(btn => (
                      <a key={btn.label} href={btn.href} target={btn.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="sheen-parent flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 font-mono-tech"
                        style={{ background: btn.bg, color: btn.color, boxShadow:`0 6px 24px ${HERO_SLIDES[currentSlide].theme.accent}33` }}>
                        {btn.icon} {btn.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="w-full mt-6 md:mt-10 mx-auto relative z-30">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {STATS.map((s, i) => (
                    <TiltCard key={s.label} className={`pastel-card rounded-3xl p-7 text-center delay-${i+1} animate-fadein-up`}
                      style={{ borderTop:`3px solid ${s.accent}55` }}>
                      <div className="text-4xl mb-3 flex justify-center text-center mx-auto">{s.icon}</div>
                      <div className="text-3xl font-black mb-1 font-mono-tech" style={{ color: s.accent }}>{s.value}</div>
                      <div className="text-xs uppercase tracking-[0.18em] font-bold font-mono-tech" style={{ color: PASTEL.textSoft }}>{s.label}</div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section id="experience" className={`fullpage-section relative z-10 py-28 px-6 ${getSectionClass(1)}`}>
            <div className="max-w-5xl mx-auto w-full">
              <div className="text-center mb-16">
                <span className="pastel-badge mb-5"><Briefcase size={14} /> Career</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
                  Work <span className="text-gradient-pastel">Experience</span>
                </h2>
              </div>

              <div className="flex flex-col gap-10">
                {EXPERIENCE.map((exp, i) => (
                  <TiltCard key={i} className="pastel-card rounded-[2rem] p-10 md:p-12 relative overflow-hidden"
                    style={{ borderLeft:`5px solid ${exp.accent}` }}>
                    <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]"
                      style={{ background:`linear-gradient(90deg,${exp.accent}88,${exp.accent}22)` }} />

                    <div className="flex flex-col md:flex-row flex-wrap md:items-start justify-between gap-4 mb-6 mt-6 md:mt-0">
                      <div>
                        <h3 className="text-2xl font-black mb-1 flex items-center flex-wrap gap-3" style={{ color: PASTEL.text }}>
                          {exp.role}
                          {exp.isCurrent && (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black inline-flex font-mono-tech"
                              style={{ background:'rgba(57,255,20,0.1)', color:'#39ff14', border:'1px solid rgba(57,255,20,0.3)', boxShadow:'0 0 10px rgba(57,255,20,0.15)' }}>
                              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'#39ff14', boxShadow:'0 0 6px #39ff14' }} />
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="font-bold text-lg font-mono-tech" style={{ color: exp.accent }}>{exp.company}</p>
                      </div>
                      <div className="pastel-card px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 font-mono-tech" style={{ color: PASTEL.textSoft }}>
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
              </div>
            </div>
          </section>

          {/* ── SKILLS ── */}
          <section id="skills" className={`fullpage-section relative z-10 py-28 px-6 ${getSectionClass(2)}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-16">
                <span className="pastel-badge mb-5"><Keyboard size={14} /> Technical Expertise</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
                  Skills & <span className="text-gradient-pastel">Technologies</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {SKILLS.map((cat, i) => (
                  <TiltCard key={i} className={`pastel-card rounded-[2rem] p-9 relative overflow-hidden delay-${i+1} animate-fadein-up`}>
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
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section id="projects" className={`fullpage-section relative z-10 py-28 px-6 ${getSectionClass(3)}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-10 md:mb-16">
                <span className="pastel-badge mb-5"><Rocket size={14} className="mr-1 inline" /> Portfolio</span>
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
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all focus:outline-none font-mono-tech ${activeFilter === f ? 'scale-105' : 'hover:scale-105'}`}
                    style={{
                      background: activeFilter === f ? 'linear-gradient(135deg,#bd00ff,#00f0ff)' : 'rgba(10,6,21,0.7)',
                      color: activeFilter === f ? '#fff' : PASTEL.textSoft,
                      border: `1px solid ${activeFilter === f ? 'rgba(0,240,255,0.5)' : 'rgba(189,0,255,0.2)'}`,
                      boxShadow: activeFilter === f ? '0 0 20px rgba(0,240,255,0.2)' : 'none'
                    }}>
                    {f}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7" style={{ perspective:'1400px' }}>
                {filteredProjects.map((p, i) => (
                  <TiltCard key={i} className={`pastel-card rounded-[2rem] overflow-hidden flex flex-col group delay-${Math.min(i % 4 + 1,4)} animate-fadein-up`}
                    style={{ transformOrigin:'center center' }}>
                    <div className="flex flex-col flex-1 h-full">
                      <div className="h-36 flex items-center justify-center relative overflow-hidden sheen-parent"
                        style={{ background:`linear-gradient(135deg,${p.bg},#0a0615)` }}>
                        <div className="absolute inset-0 opacity-40" style={{ background:`radial-gradient(circle at 30% 40%,${p.accent}40,transparent 65%)` }} />
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full opacity-20 blur-lg" style={{ background: p.accent }} />
                        <span className="text-5xl z-10 group-hover:scale-125 transition-transform duration-500 group-hover:-translate-y-1">{p.icon}</span>
                      </div>
                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-black uppercase text-sm tracking-tight leading-snug" style={{ color: PASTEL.text }}>{p.title}</h3>
                        </div>
                        <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: PASTEL.textSoft }}>{p.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {p.tags.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all group-hover:scale-105 font-mono-tech"
                              style={{ background: 'rgba(189,0,255,0.1)', color: '#00f0ff', border:'1px solid rgba(0,240,255,0.3)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-auto pt-5">
                          <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 font-mono-tech" style={{ background: 'rgba(189,0,255,0.1)', color: '#fff', border: '1px solid rgba(189,0,255,0.3)' }}>Code ↗</a>
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 text-white font-mono-tech" style={{ background: 'linear-gradient(135deg,#bd00ff,#00f0ff)', boxShadow: '0 4px 12px rgba(0,240,255,0.3)' }}>Live Site ↗</a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── CERTIFICATIONS ── */}
          <section id="certifications" className={`fullpage-section relative z-10 py-28 px-6 ${getSectionClass(4)}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-16">
                <span className="pastel-badge mb-5">🎖️ Achievements</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4" style={{ color: PASTEL.text }}>
                  My <span className="text-gradient-pastel">Certifications</span>
                </h2>
                <p className="mt-3 font-medium" style={{ color: PASTEL.textSoft }}>Verified credentials from leading AI and tech platforms</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {CERTS.map((cert, i) => (
                  <TiltCard key={i} className={`pastel-card rounded-[2rem] overflow-hidden flex flex-col group delay-${Math.min(i % 3 + 1, 4)} animate-fadein-up`}>
                    <div className="h-1.5 w-full" style={{ background:`linear-gradient(90deg,${cert.accent}88,${cert.accent}22)` }} />
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl sheen-parent"
                          style={{ background: cert.bg, border:`1px solid ${cert.accent}30` }}>
                          {cert.icon}
                        </div>
                        <span className="text-xs font-black px-3 py-1 rounded-full font-mono-tech"
                          style={{ background:`${cert.accent}15`, color: cert.accent, border:`1px solid ${cert.accent}30` }}>
                          {cert.year}
                        </span>
                      </div>
                      <h3 className="text-base font-black mb-1 leading-snug" style={{ color: PASTEL.text }}>{cert.name}</h3>
                      <p className="text-xs font-bold mb-6 font-mono-tech" style={{ color: cert.accent }}>{cert.platform}</p>
                      <div className="mt-auto">
                        <a href={cert.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 font-mono-tech"
                          style={{ background:`linear-gradient(135deg,${cert.accent},${cert.accent}aa)`, boxShadow:`0 4px 16px ${cert.accent}44` }}>
                          View Certificate ↗
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact" className={`fullpage-section relative z-10 py-28 px-6 flex flex-col justify-between ${getSectionClass(5)}`}>
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
              <TiltCard className="pastel-card rounded-[3rem] p-14 md:p-20 text-center relative overflow-hidden"
                style={{ boxShadow:'0 30px 80px rgba(0,240,255,0.1)' }}>
                <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-20 -mt-20 -ml-20 animate-float3d"
                  style={{ background:'radial-gradient(circle,#bd00ff44,transparent)' }} />
                <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 -mb-20 -mr-20 animate-float3d-delay"
                  style={{ background:'radial-gradient(circle,#00f0ff33,transparent)' }} />
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
                      className="sheen-parent px-10 py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 cyber-btn font-mono-tech"
                      style={{ background:'linear-gradient(135deg,#bd00ff,#00f0ff)', boxShadow:'0 8px 30px rgba(0,240,255,0.3)' }}>
                      Get In Touch <Mail size={20} className="ml-2 inline" />
                    </a>
                    <a href="https://github.com/Shirmeen" target="_blank" rel="noopener noreferrer"
                      className="sheen-parent pastel-card px-10 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 font-mono-tech"
                      style={{ color: PASTEL.purpleDark }}>
                      View GitHub <Github size={20} className="ml-2 inline" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
            
            {/* ── FOOTER ── */}
            <footer className="relative z-10 py-10 text-center w-full mt-auto" style={{ borderTop:'1px solid rgba(189,0,255,0.2)' }}>
              <div className="text-2xl font-black text-gradient-pastel mb-3">SA</div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1 font-mono-tech" style={{ color: PASTEL.textSoft }}>
                Data Scientist • ML Engineer • AI Enthusiast
              </p>
              <p className="text-xs font-mono-tech" style={{ color:'#6b5f8a' }}>
                © {new Date().getFullYear()} Shirmeen Aamir — Built with <Heart size={14} className="inline text-red-500 mx-1" fill="currentColor" /> & React
              </p>
            </footer>
          </section>

      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}