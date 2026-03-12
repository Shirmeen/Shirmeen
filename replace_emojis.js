const fs = require('fs');
let content = fs.readFileSync('src/Portfolio.js', 'utf8');

// The required icons from lucide-react
const importStr = "import { Puzzle, Award, Briefcase, Laptop, Code, Zap, Database, Link, BarChart, Box, Leaf, BrainCircuit, Flame, LineChart, Eye, Palette, Brush, Image as ImageIcon, Hospital, Sparkles, Gamepad2, MessageSquare, Thermometer, Factory, Ghost, Music, Dices, Circle, Bot, Hand, Github, Linkedin, Mail, GraduationCap, Rocket, Keyboard } from 'lucide-react';\n";

if(!content.includes('lucide-react')) {
    content = content.replace("import profileImage from './image.png';", "import profileImage from './image.png';\n" + importStr);
}

// 1. STATS
content = content.replace(/icon: '🧩'/g, "icon: <Puzzle size={24} />");
content = content.replace(/icon: '🎖️'/g, "icon: <Award size={24} />");
content = content.replace(/icon: '💼'/g, "icon: <Briefcase size={24} />");
content = content.replace(/icon: '💻'/g, "icon: <Laptop size={24} />");

// 2. SKILLS
content = content.replace(/icon: '🐍'/g, "icon: <Code size={20} />");
content = content.replace(/icon: '⚡'/g, "icon: <Zap size={20} />");
content = content.replace(/icon: '🗄️'/g, "icon: <Database size={20} />");
content = content.replace(/icon: '��'/g, "icon: <Database size={20} />");

content = content.replace(/icon: '🛠️'/g, "icon: <Briefcase size={24} />");
content = content.replace(/icon: '🔗'/g, "icon: <Link size={20} />");
content = content.replace(/icon: '📊'/g, "icon: <BarChart size={20} />");
content = content.replace(/icon: '🐳'/g, "icon: <Box size={20} />");
content = content.replace(/icon: '🌿'/g, "icon: <Leaf size={20} />");

content = content.replace(/icon: '🧠'/g, "icon: <BrainCircuit size={20} />");
content = content.replace(/icon: '🔥'/g, "icon: <Flame size={20} />");
content = content.replace(/icon: '📈'/g, "icon: <LineChart size={20} />");
content = content.replace(/icon: '👁️'/g, "icon: <Eye size={20} />");

content = content.replace(/icon: '✨'/g, "icon: <Sparkles size={20} />");
content = content.replace(/icon: '🎨'/g, "icon: <Palette size={20} />");
content = content.replace(/icon: '🧊'/g, "icon: <Box size={20} />");
content = content.replace(/icon: '🖌️'/g, "icon: <Brush size={20} />");
content = content.replace(/icon: '🖼️'/g, "icon: <ImageIcon size={20} />");

// 3. PROJECTS
content = content.replace(/icon:'🏥'/g, "icon:<Hospital size={40} />");
content = content.replace(/icon:'✨'/g, "icon:<Sparkles size={40} />");
content = content.replace(/icon:'👁️'/g, "icon:<Eye size={40} />");
content = content.replace(/icon:'🎮'/g, "icon:<Gamepad2 size={40} />");
content = content.replace(/icon:'💬'/g, "icon:<MessageSquare size={40} />");
content = content.replace(/icon:'📊'/g, "icon:<BarChart size={40} />");
content = content.replace(/icon:'🌡️'/g, "icon:<Thermometer size={40} />");
content = content.replace(/icon:'🏭'/g, "icon:<Factory size={40} />");
content = content.replace(/icon:'👻'/g, "icon:<Ghost size={40} />");
content = content.replace(/icon:'🎵'/g, "icon:<Music size={40} />");
content = content.replace(/icon:'🎲'/g, "icon:<Dices size={40} />");
content = content.replace(/icon:'⭕'/g, "icon:<Circle size={40} />");

// 4. CERTS
content = content.replace(/icon: '🧠'/g, "icon: <BrainCircuit size={32} />");
content = content.replace(/icon: '🤖'/g, "icon: <Bot size={32} />");
content = content.replace(/icon: '🎓'/g, "icon: <GraduationCap size={32} />");

// 5. Hero / Inline emojis
content = content.replace(/>🤖</g, "><Bot size={18} /><");
content = content.replace(/>🧠</g, "><BrainCircuit size={18} /><");
content = content.replace(/>👋</g, "><Hand size={16} /><");

content = content.replace(/{icon} {text}/g, "{icon} <span className=\"ml-1\">{text}</span>");
content = content.replace(/\['📍','Lahore, Pakistan'\],\['📞','\+92 316 6370030'\]/g, "[(<MapPin size={16} />),'Lahore, Pakistan'],[(<Phone size={16} />), '+92 316 6370030']");

content = content.replace(/icon:'🐙'/g, "icon:<Github size={20} />");
content = content.replace(/icon:'💼'/g, "icon:<Linkedin size={20} />");
content = content.replace(/icon:'📧'/g, "icon:<Mail size={20} />");

// badges section headers
content = content.replace(/>💼 Career</g, "><Briefcase size={14} /> Career<");
content = content.replace(/>⌨️ Technical Expertise</g, "><Keyboard size={14} /> Technical Expertise<");
content = content.replace(/>🚀 Portfolio</g, "><Rocket size={14} /> Portfolio<");
content = content.replace(/>✉️ Get in touch</g, "><Mail size={14} /> Get in touch<");
content = content.replace(/>Let's Build Something <span className="text-gradient-pastel">Amazing!<\/span> 🚀</g, ">Let's Build Something <span className=\"text-gradient-pastel\">Amazing!</span> <Rocket className=\"inline ml-2 text-pink-500\" size={40}/><");


fs.writeFileSync('src/Portfolio.js', content, 'utf8');
console.log('Done');
