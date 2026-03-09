import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const [text, setText] = useState('');
  const fullText = "Generative AI Eng";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed]);

  const handleType = () => {
    const updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setTimeout(() => setIsDeleting(true), 1500);
      setTypingSpeed(100);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150);
    } else if (isDeleting) {
      setTypingSpeed(50);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-gray-800 font-sans selection:bg-purple-200">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-200/40 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[15%] w-[25%] h-[25%] bg-pink-100/40 rounded-full blur-[80px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent ml-4 md:ml-12 cursor-pointer hover:scale-105 transition-transform">
          SA
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-600 mr-12">
          {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-600 transition-colors">
              {item}
            </a>
          ))}
          <a href="/public/resume.pdf" target="_blank" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
            <span>Γ¼ç∩╕Å</span> Resume
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          {/* Profile Image Column */}
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full p-1.5 bg-gradient-to-tr from-purple-500 via-blue-400 to-pink-400 shadow-2xl relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white">
                <img 
                  src="/image.png" 
                  alt="Shirmeen Aamir" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Brain Icon */}
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg border border-purple-100 animate-bounce">
                <span className="text-2xl">≡ƒºá</span>
              </div>
              {/* AI Engineer Badge */}
              <div className="absolute top-8 -left-8 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-white/50 text-xs font-bold text-purple-600 uppercase tracking-wider">
                AI Engineer
              </div>
            </div>
            {/* Decorative Glow */}
            <div className="absolute -inset-4 bg-purple-400/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
          </div>

          {/* Intro Text Column */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-purple-600 font-semibold mb-2 tracking-wide">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
              Shirmeen Aamir
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 h-10">
              {text}<span className="animate-blink">|</span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
              AI Engineer with a Data Science background specializing in {' '}
              <span className="text-purple-600 font-semibold bg-purple-50 px-1.5 py-0.5 rounded">Generative AI</span>, {' '}
              <span className="text-pink-500 font-semibold bg-pink-50 px-1.5 py-0.5 rounded">Deep Learning</span>, {' '}
              <span className="text-blue-500 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">Computer Vision</span>, and {' '}
              <span className="text-teal-500 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">Bayesian Modeling</span>. 
              Experienced in building AI-assisted systems and end-to-end ML workflows.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-500 mb-10">
              <div className="flex items-center gap-2">
                <span>≡ƒôì</span> Lahore, Pakistan
              </div>
              <div className="flex items-center gap-2">
                <span>≡ƒô₧</span> +92 316 6370030
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="https://github.com/Shirmeen" target="_blank" className="flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-xl hover:bg-black transition-all shadow-md active:scale-95">
                <span className="text-xl">≡ƒÉÖ</span> GitHub
              </a>
              <a href="https://linkedin.com/in/shirmeen" target="_blank" className="flex items-center gap-2 bg-[#0a66c2] text-white px-6 py-3 rounded-xl hover:bg-[#004182] transition-all shadow-md active:scale-95">
                <span className="text-xl">in</span> LinkedIn
              </a>
              <a href="mailto:shirm@example.com" className="flex items-center gap-2 bg-white text-purple-600 border border-purple-100 px-6 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-sm active:scale-95">
                <span className="text-xl">≡ƒôº</span> Email
              </a>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[
            { label: 'Projects', value: '13+', icon: '≡ƒº⌐', color: 'blue' },
            { label: 'Certifications', value: '6', icon: '≡ƒÄù∩╕Å', color: 'purple' },
            { label: 'Years Experience', value: '1+', icon: '≡ƒÆ╝', color: 'indigo' },
            { label: 'Skills', value: '16+', icon: '≡ƒÆ╗', color: 'teal' }
          ].map((card) => (
            <div key={card.label} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center">
              <div className="text-3xl mb-3">{card.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{card.label}</div>
            </div>
          ))}
        </section>
      </main>

      {/* Custom Styles for Cursor */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
