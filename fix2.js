const fs = require('fs');
let content = fs.readFileSync('src/Portfolio.js', 'utf8');

// The required icons from lucide-react
if(!content.includes('Heart')) {
    content = content.replace("Sparkles } from 'lucide-react';", "Sparkles, Heart } from 'lucide-react';");
}
content = content.replace(/🚀 Portfolio/g, "<Rocket size={14} className=\"mr-1 inline\" /> Portfolio");
content = content.replace(/Let's Build Something <span className="text-gradient-pastel">Amazing!<\/span> 🚀/g, "Let's Build Something <span className=\"text-gradient-pastel\">Amazing!</span> <Rocket className=\"inline ml-2 text-pink-500\" size={40}/>");
content = content.replace(/❤️/g, "<Heart size={14} className=\"inline text-red-500 mx-1\" fill=\"currentColor\" />");
// remove any straggling ▸ (it is not an emoji but a text character, but I can leave it, user asked for emojis)

// cleanup
fs.writeFileSync('src/Portfolio.js', content, 'utf8');
