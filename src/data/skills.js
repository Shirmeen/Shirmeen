import React from 'react';
import { Briefcase, Laptop, BarChart, BrainCircuit, Eye, Sparkles } from 'lucide-react';

export const SKILLS = [
  {
    category: 'Programming & Databases',
    icon: <Laptop size={24} />,
    bg: '#ffffff',
    bar: 'linear-gradient(90deg,#bd00ff,#00f0ff)',
    items: [
      { name: 'Python',     pct: 90, icon: '🐍' },
      { name: 'C/C++',      pct: 75, icon: '⚡' },
      { name: 'SQL',        pct: 85, icon: '🗄️' },
      { name: 'PostgreSQL', pct: 80, icon: '🐘' },
    ],
  },
  {
    category: 'Frameworks & Tools',
    icon: <Briefcase size={24} />,
    bg: '#ffffff',
    bar: 'linear-gradient(90deg,#00abff,#00f0ff)',
    items: [
      { name: 'LangChain', pct: 85, icon: '🔗' },
      { name: 'Power BI',  pct: 80, icon: <BarChart size={40} /> },
      { name: 'Docker',    pct: 75, icon: '🐳' },
      { name: 'Django',    pct: 70, icon: '🌿' },
    ],
  },
  {
    category: 'ML & Deep Learning',
    icon: <BrainCircuit size={20} />,
    bg: '#ffffff',
    bar: 'linear-gradient(90deg,#ff007f,#bd00ff)',
    items: [
      { name: 'TensorFlow',   pct: 85, icon: '🧠' },
      { name: 'PyTorch',      pct: 80, icon: '🔥' },
      { name: 'Scikit-Learn', pct: 90, icon: '📈' },
      { name: 'OpenCV',       pct: 85, icon: <Eye size={40} /> },
    ],
  },
  {
    category: 'Generative AI',
    icon: <Sparkles size={20} />,
    bg: '#ffffff',
    bar: 'linear-gradient(90deg,#ff9900,#ffff00)',
    items: [
      { name: 'GANs',             pct: 85, icon: '🎨' },
      { name: 'VAEs',             pct: 80, icon: '🧊' },
      { name: 'Stable Diffusion', pct: 75, icon: '🖌️' },
      { name: 'CLIP',             pct: 80, icon: '🖼️' },
    ],
  },
];
