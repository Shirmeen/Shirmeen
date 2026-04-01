const fs = require('fs');
let content = fs.readFileSync('src/Portfolio.js', 'utf8');

const newExperience = `const EXPERIENCE = [
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
    color: '#fbcfe8', accent: '#db2777',
  },
  {
    role: 'Associate Generative AI Engineer',
    company: 'BIG IMMERSIVE',`;

content = content.replace(/const EXPERIENCE = \[\s*\{\s*role: 'Associate Generative AI Engineer',\s*company: 'BIG IMMERSIVE',/g, newExperience);

const badCardLayout = /\{exp\.isCurrent && \(\s*<div className="absolute top-6 right-6 flex items-center gap-1\.5 px-3 py-1 rounded-full text-xs font-black"\s*style=\{\{ background:'#dcfce7', color:'#16a34a', border:'1px solid #bbf7d0' \}\}>\s*<span className="w-1\.5 h-1\.5 rounded-full bg-green-500 animate-pulse" \/>\s*Current\s*<\/div>\s*\)\}\s*<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">/g;

const goodCardLayout = `<div className="flex flex-col md:flex-row flex-wrap md:items-start justify-between gap-4 mb-6 mt-6 md:mt-0">`;

content = content.replace(badCardLayout, goodCardLayout);

const badRole = /<h3 className="text-2xl font-black mb-1" style=\{\{ color: PASTEL\.text \}\}>\{exp\.role\}<\/h3>/g;
const goodRole = `<h3 className="text-2xl font-black mb-1 flex items-center flex-wrap gap-3" style={{ color: PASTEL.text }}>
                  {exp.role}
                  {exp.isCurrent && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black inline-flex"
                      style={{ background:'#dcfce7', color:'#16a34a', border:'1px solid #bbf7d0' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Current
                    </span>
                  )}
                </h3>`;

content = content.replace(badRole, goodRole);

// fix stats overlapping issue (already attempted but might not have stuck correctly)
content = content.replace(/<div className="text-4xl mb-3 flex justify-center">\{s\.icon\}<\/div>/g, '<div className="text-4xl mb-3 flex justify-center text-center mx-auto">{s.icon}</div>');

fs.writeFileSync('src/Portfolio.js', content, 'utf8');
console.log('Done replacement');
