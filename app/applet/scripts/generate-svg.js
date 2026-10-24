const fs = require('fs');
const path = require('path');

// Try finding logo.jpeg or logo300.png
let logoPath = path.join(__dirname, '../public/logo.jpeg');
let mimeType = 'image/jpeg';
if (!fs.existsSync(logoPath)) {
  logoPath = path.join(__dirname, '../public/logo300.png');
  mimeType = 'image/png';
}
if (!fs.existsSync(logoPath)) {
  logoPath = path.join(__dirname, '../public/images/logo.jpeg');
}
if (!fs.existsSync(logoPath)) {
  logoPath = path.join(__dirname, '../public/images/logo300.png');
  mimeType = 'image/png';
}

console.log("Using logo path:", logoPath);

let base64Data = '';
if (fs.existsSync(logoPath)) {
  const bitmap = fs.readFileSync(logoPath);
  base64Data = `data:${mimeType};base64,` + bitmap.toString('base64');
}

const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' width='500' height='500'>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&amp;display=swap');
    </style>
    <linearGradient id='orangeGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
      <stop offset='0%' stop-color='#ea6d24'/>
      <stop offset='100%' stop-color='#ff9f43'/>
    </linearGradient>
    <pattern id='gridLines' x='0' y='0' width='32' height='32' patternUnits='userSpaceOnUse'>
      <path d='M 32 0 L 0 0 0 32' fill='none' stroke='#f1f5f9' stroke-width='1'/>
    </pattern>
    <radialGradient id='centerGlow' cx='50%' cy='50%' r='60%'>
      <stop offset='0%' stop-color='#ea6d24' stop-opacity='0.08'/>
      <stop offset='100%' stop-color='#ea6d24' stop-opacity='0'/>
    </radialGradient>
    <filter id='dropShadow' x='-10%' y='-10%' width='120%' height='120%'>
      <feDropShadow dx='0' dy='8' stdDeviation='16' flood-color='#0f172a' flood-opacity='0.1'/>
    </filter>
  </defs>

  <!-- Background matching the banner design -->
  <rect width='500' height='500' fill='#ffffff'/>
  <rect width='500' height='500' fill='url(#gridLines)'/>
  <rect width='500' height='500' fill='url(#centerGlow)'/>
  
  <!-- Top brand bar matching banner -->
  <rect x='0' y='0' width='500' height='10' fill='url(#orangeGrad)'/>

  <!-- Framed Container for Official Logo -->
  <g transform='translate(50, 50)' filter='url(#dropShadow)'>
    <rect width='400' height='400' rx='28' fill='#ffffff' stroke='#e2e8f0' stroke-width='2'/>
    
    <!-- Embedded Base64 Official Logo -->
    <image href='${base64Data}' x='50' y='50' width='300' height='300' preserveAspectRatio='xMidYMid meet'/>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../public/design-preview/newLogoLIKEIND.svg'), svgContent);
console.log("Successfully generated newLogoLIKEIND.svg with embedded base64 logo!");
