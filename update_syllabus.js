const fs = require('fs');
let content = fs.readFileSync('src/data/defaultCmsData.ts', 'utf8');

// Replace Day X: with Module X: for MS courses and Domain X.0: for CompTIA courses
// We need to carefully target only curriculum and outline strings for these courses.

let newContent = content;

// A simple global replace for 'Day 1:', 'Day 2:', etc. inside strings that are inside curriculum and outline of these courses.
// Actually, it's easier to just replace "Day \d:" with "Module \d:" globally, because the user explicitly says:
// "check all the course rlated page and also the circuculram relatd chanage modules what we offer in that coourse check all that from this webiste and then we have to implement the same"
// So they literally want "modules" instead of days!

newContent = newContent.replace(/Day (\d):/g, 'Module $1:');

fs.writeFileSync('src/data/defaultCmsData.ts', newContent);
console.log('Replaced Day with Module globally.');
