const fs = require('fs');
let content = fs.readFileSync('src/Portfolio.js', 'utf8');

// Fix Stats absolute positioning bottom-10
content = content.replace(/<div className="absolute bottom-10 left-6 right-6 max-w-7xl mx-auto px-0">/g, '<div className="w-full mt-10 md:mt-16 mx-auto relative z-30">');

// Add gap to Experience map
content = content.replace(/\{EXPERIENCE\.map\(\(exp, i\) => \(\s*<TiltCard/g, '<div className="flex flex-col gap-10">\n        {EXPERIENCE.map((exp, i) => (\n          <TiltCard');

// Find end of experience list
content = content.replace(/<\/TiltCard>\s*\)\)\}\s*<\/section>/g, '</TiltCard>\n          ))}\n        </div>\n      </section>');

fs.writeFileSync('src/Portfolio.js', content, 'utf8');
