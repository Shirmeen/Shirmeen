import React from 'react';

export default function ContactSection() {
  return (
    <>
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
            <a
              href="mailto:shirmeenaamir112@gmail.com"
              className="hover:underline uppercase decoration-2 underline-offset-4 break-all"
            >
              SHIRMEENAAMIR112@GMAIL.COM
            </a>
            <a
              href="https://github.com/Shirmeen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline uppercase decoration-2 underline-offset-4"
            >
              @SHIRMEEN (GITHUB)
            </a>
            <a
              href="https://linkedin.com/in/shirmeen-amir-35ab81264"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline uppercase decoration-2 underline-offset-4"
            >
              @SHIRMEEN-AMIR (LINKEDIN)
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#111827] text-[#e8e6e1] text-center">
        <p className="text-xs font-mono font-bold tracking-widest uppercase">
          © 2026 SHIRMEEN AAMIR. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </>
  );
}
