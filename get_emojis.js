const fs = require('fs');
let c = fs.readFileSync('src/Portfolio.js', 'utf8');
const rx = /[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1FA00}-\u{1FAFF}\u{2B50}\u{2B55}]/gu;
const m = c.match(rx);
if(m) console.log(Array.from(new Set(m)).join(' ')); 
