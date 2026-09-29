import React from 'react';
import Certificates from '../Certificates';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 border-t-2 border-[#111827]">
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-mono tracking-widest uppercase mb-2">
          Certifications
        </h2>
      </div>
      <Certificates />
    </section>
  );
}
