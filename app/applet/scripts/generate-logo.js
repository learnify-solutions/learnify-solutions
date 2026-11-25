const fs = require('fs');
const path = require('path');

let logoBuf = null;
let logoMime = 'image/jpeg';

const candidates = [
  path.join(__dirname, '../public/logo.jpeg'),
  path.join(__dirname, '../public/images/logo.jpeg'),
  path.join(__dirname, '../public/logo300.png'),
  path.join(__dirname, '../public/images/logo300.png')
];

for (const c of candidates) {
  if (fs.existsSync(c)) {
    logoBuf = fs.readFileSync(c);
    if (c.endsWith('.png')) logoMime = 'image/png';
    console.log('Found logo at:', c);
    break;
  }
}

if (!logoBuf) {
  function findFile(dir, name) {
    let results = [];
    try {
      const list = fs.readdirSync(dir);
      for (let file of list) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          results = results.concat(findFile(full, name));
        } else if (file.toLowerCase().includes(name)) {
          results.push(full);
        }
      }
    } catch(e) {}
    return results;
  }
  const found = findFile(path.join(__dirname, '../public'), 'logo');
  if (found.length > 0) {
    console.log('Found via search:', found[0]);
    logoBuf = fs.readFileSync(found[0]);
    if (found[0].endsWith('.png')) logoMime = 'image/png';
  }
}

let base64Logo = logoBuf ? logoBuf.toString('base64') : '';
console.log('Base64 length:', base64Logo.length);

const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' width='500' height='500'>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&amp;display=swap');
      .bg { fill: #ffffff; }
      .grid { stroke: #f1f5f9; stroke-width: 1.5; }
      .title { font-family: 'Inter', sans-serif; font-weight: 800; fill: #0f172a; font-size: 26px; text-anchor: middle; }
      .subtitle { font-family: 'Inter', sans-serif; font-weight: 700; fill: #ea580c; font-size: 15px; text-anchor: middle; letter-spacing: 2px; }
      .card { fill: #ffffff; filter: drop-shadow(0 10px 25px rgba(15, 23, 42, 0.08)); rx: 24px; ry: 24px; }
    </style>
    <linearGradient id='accentGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
      <stop offset='0%' stop-color='#ea580c' />
      <stop offset='100%' stop-color='#f97316' />
    </linearGradient>
  </defs>

  <!-- Clean Banner-Matching Background -->
  <rect width='500' height='500' class='bg' />
  
  <!-- Subtle Grid Pattern -->
  <g class='grid'>
    <line x1='0' y1='100' x2='500' y2='100' />
    <line x1='0' y1='200' x2='500' y2='200' />
    <line x1='0' y1='300' x2='500' y2='300' />
    <line x1='0' y1='400' x2='500' y2='400' />
    <line x1='100' y1='0' x2='100' y2='500' />
    <line x1='200' y1='0' x2='200' y2='500' />
    <line x1='300' y1='0' x2='300' y2='500' />
    <line x1='400' y1='0' x2='400' y2='500' />
  </g>

  <!-- Orange Top Accent Bar -->
  <rect x='0' y='0' width='500' height='12' fill='url(#accentGrad)' />

  <!-- Center Safe Area Card for LinkedIn Circle / Square Crop -->
  <g transform='translate(60, 50)'>
    <rect x='0' y='0' width='380' height='380' class='card' stroke='#e2e8f0' stroke-width='2' />
    
    <!-- Official Logo Image Base64 Embedded -->
    ${base64Logo ? `<image x='40' y='65' width='300' height='170' preserveAspectRatio='xMidYMid meet' href='data:${logoMime};base64,${base64Logo}' />` : `<text x='190' y='160' class='title'>LEARNIFY</text>`}

    <!-- Brand Subtitle / Badge -->
    <rect x='70' y='275' width='240' height='40' rx='20' ry='20' fill='#fff7ed' stroke='#ffedd5' stroke-width='1.5' />
    <text x='190' y='301' class='subtitle'>PATHWAY TO EXCELLENCE</text>
  </g>
</svg>`;

const targetPath = path.join(__dirname, '../public/design-preview/newLogoLIKEIND.svg');
fs.writeFileSync(targetPath, svgContent);
console.log('Successfully wrote newLogoLIKEIND.svg with base64 embedded logo, size:', svgContent.length);
