const fs = require('fs');
let content = fs.readFileSync('src/Portfolio.js', 'utf8');

// The required icons from lucide-react
if(!content.includes('MapPin')) {
    content = content.replace("from 'lucide-react';", ", MapPin, Phone, Download, CheckCircle, Flame, LineChart, Sparkles } from 'lucide-react';");
}
content = content.replace(/icon: '🧠'/g, "icon: <BrainCircuit size={40} />"); // some missed maybe
content = content.replace(/<Rocket size=\{14\} \/> Portfolio/g, "🚀 Portfolio"); // rollback to emoji for a moment to fix later if it broke
content = content.replace(/'📍'/g, "<MapPin size={16} />");
content = content.replace(/'📞'/g, "<Phone size={16} />");
content = content.replace(/📥 Resume/g, "<Download size={18} className=\"mr-2\" /> Resume");
content = content.replace(/��️ Achievements/g, "<Award size={14} className=\"mr-1\" /> Achievements");
content = content.replace(/Get In Touch 📧/g, "Get In Touch <Mail size={20} className=\"ml-2 inline\" />");
content = content.replace(/View GitHub 🐙/g, "View GitHub <Github size={20} className=\"ml-2 inline\" />");
content = content.replace(/👋 Hello/g, "<Hand size={20} className=\"mr-2 inline\" /> Hello");

content = content.replace(/icon: '📊'/g, "icon: <BarChart size={32} />");
content = content.replace(/icon: '🗄️'/g, "icon: <Database size={32} />");
content = content.replace(/icon: '📈'/g, "icon: <LineChart size={32} />");
content = content.replace(/icon: '🧠'/g, "icon: <BrainCircuit size={32} />");
content = content.replace(/icon: '🤖'/g, "icon: <Bot size={32} />");
content = content.replace(/icon: '🎓'/g, "icon: <GraduationCap size={32} />");


// cleanup
fs.writeFileSync('src/Portfolio.js', content, 'utf8');
