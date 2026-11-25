const fs = require('fs');

const profileSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1584 396' width='1584' height='396'>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&amp;display=swap');
      .bg { fill: #ffffff; }
    </style>
    <linearGradient id='orangeGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
      <stop offset='0%' stop-color='#ea6d24'/>
      <stop offset='100%' stop-color='#ff9f43'/>
    </linearGradient>
    <linearGradient id='navyCard' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#0f172a'/>
      <stop offset='100%' stop-color='#1e293b'/>
    </linearGradient>
    <pattern id='gridLines' x='0' y='0' width='32' height='32' patternUnits='userSpaceOnUse'>
      <path d='M 32 0 L 0 0 0 32' fill='none' stroke='#f1f5f9' stroke-width='1'/>
    </pattern>
    <radialGradient id='leftGlow' cx='15%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='#ea6d24' stop-opacity='0.06'/>
      <stop offset='100%' stop-color='#ea6d24' stop-opacity='0'/>
    </radialGradient>
    <filter id='cardShadow' x='-5%' y='-5%' width='110%' height='110%'>
      <feDropShadow dx='0' dy='6' stdDeviation='10' flood-color='#0f172a' flood-opacity='0.06'/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width='1584' height='396' fill='#ffffff'/>
  <rect width='1584' height='396' fill='url(#gridLines)'/>
  <rect width='1584' height='396' fill='url(#leftGlow)'/>
  <rect x='0' y='0' width='1584' height='4.5' fill='url(#orangeGrad)'/>

  <!-- Left Safe Zone Tech Motif -->
  <g opacity='0.7'>
    <circle cx='180' cy='240' r='110' fill='none' stroke='#ea6d24' stroke-width='1.5' stroke-dasharray='4,6' opacity='0.22'/>
    <circle cx='180' cy='240' r='140' fill='none' stroke='#0f172a' stroke-width='1' stroke-opacity='0.06'/>
    <line x1='40' y1='240' x2='320' y2='240' stroke='#ea6d24' stroke-opacity='0.12' stroke-width='1'/>
    <line x1='180' y1='100' x2='180' y2='380' stroke='#ea6d24' stroke-opacity='0.12' stroke-width='1'/>
    <path d='M 180 155 L 235 245 L 125 245 Z' fill='none' stroke='#ea6d24' stroke-width='3' stroke-opacity='0.12'/>
    <circle cx='180' cy='215' r='16' fill='#ea6d24' fill-opacity='0.10'/>
  </g>

  <line x1='375' y1='30' x2='375' y2='366' stroke='#e2e8f0' stroke-width='1.5' stroke-dasharray='5,5'/>

  <!-- Main Content (X = 405) -->
  <g transform='translate(405, 36)'>
    <rect width='350' height='28' rx='14' fill='#fffaf5' stroke='#fdba74' stroke-width='1.2'/>
    <circle cx='15' cy='14' r='4' fill='#ea6d24'/>
    <circle cx='15' cy='14' r='7.5' fill='#ea6d24' fill-opacity='0.25'/>
    <text x='30' y='18.5' font-family='Inter' font-size='11.5' font-weight='800' fill='#ea6d24' letter-spacing='0.6'>AUTHORIZED GLOBAL IT TRAINING PARTNER</text>
  </g>

  <g transform='translate(405, 110)'>
    <text font-family='Inter' font-size='48' font-weight='900' letter-spacing='-1.2'>
      <tspan fill='#0f172a'>Empower Your Tech </tspan>
      <tspan fill='#ea6d24'>Future.</tspan>
    </text>
  </g>

  <g transform='translate(405, 150)'>
    <text font-family='Inter' font-size='16' font-weight='700' fill='#334155'>
      Live 1-on-1 Bootcamps  <tspan fill='#ea6d24' font-weight='900'>•</tspan>  Official Exams  <tspan fill='#ea6d24' font-weight='900'>•</tspan>  24/7 Cloud Labs
    </text>
  </g>

  <!-- Domain Pills -->
  <g transform='translate(405, 186)'>
    <g transform='translate(0, 0)'>
      <rect width='166' height='36' rx='8' fill='#ffffff' stroke='#cbd5e1' stroke-width='1.5' filter='url(#cardShadow)'/>
      <rect x='2' y='2' width='5' height='32' rx='2.5' fill='#ea6d24'/>
      <text x='16' y='23' font-family='Inter' font-size='12' font-weight='800' fill='#0f172a'>☁️ Cloud Architecture</text>
    </g>
    <g transform='translate(178, 0)'>
      <rect width='156' height='36' rx='8' fill='#ffffff' stroke='#cbd5e1' stroke-width='1.5' filter='url(#cardShadow)'/>
      <rect x='2' y='2' width='5' height='32' rx='2.5' fill='#2563eb'/>
      <text x='16' y='23' font-family='Inter' font-size='12' font-weight='800' fill='#0f172a'>🛡️ Cyber Defense</text>
    </g>
    <g transform='translate(346, 0)'>
      <rect width='178' height='36' rx='8' fill='#ffffff' stroke='#cbd5e1' stroke-width='1.5' filter='url(#cardShadow)'/>
      <rect x='2' y='2' width='5' height='32' rx='2.5' fill='#8b5cf6'/>
      <text x='16' y='23' font-family='Inter' font-size='12' font-weight='800' fill='#0f172a'>🤖 AI &amp; Data Science</text>
    </g>
    <g transform='translate(536, 0)'>
      <rect width='160' height='36' rx='8' fill='#ffffff' stroke='#cbd5e1' stroke-width='1.5' filter='url(#cardShadow)'/>
      <rect x='2' y='2' width='5' height='32' rx='2.5' fill='#10b981'/>
      <text x='16' y='23' font-family='Inter' font-size='12' font-weight='800' fill='#0f172a'>⚡ DevOps &amp; Infra</text>
    </g>
  </g>

  <!-- Trust Points (Tight Spacing) -->
  <g transform='translate(405, 252)'>
    <g transform='translate(0, 0)'>
      <circle cx='9' cy='7' r='9' fill='#ea6d24' fill-opacity='0.15'/>
      <path d='M 5.5 7 L 8 9.5 L 13 4.5' fill='none' stroke='#ea6d24' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>
      <text x='24' y='11.5' font-family='Inter' font-size='13.5' font-weight='800' fill='#0f172a'>100% Live Instructor-Led</text>
    </g>
    <g transform='translate(230, 0)'>
      <circle cx='9' cy='7' r='9' fill='#2563eb' fill-opacity='0.15'/>
      <path d='M 5.5 7 L 8 9.5 L 13 4.5' fill='none' stroke='#2563eb' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>
      <text x='24' y='11.5' font-family='Inter' font-size='13.5' font-weight='800' fill='#0f172a'>Official Exam Prep &amp; Labs</text>
    </g>
    <g transform='translate(470, 0)'>
      <circle cx='9' cy='7' r='9' fill='#10b981' fill-opacity='0.15'/>
      <path d='M 5.5 7 L 8 9.5 L 13 4.5' fill='none' stroke='#10b981' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>
      <text x='24' y='11.5' font-family='Inter' font-size='13.5' font-weight='800' fill='#0f172a'>Custom Corporate Batches</text>
    </g>
  </g>

  <g transform='translate(405, 292)'>
    <text font-family='Inter' font-size='11.5' font-weight='700' fill='#64748b'>Worldwide Delivery: Available to Enterprise Teams &amp; Professionals Globally</text>
  </g>

  <!-- Right Side Cards -->
  <g transform='translate(1205, 60)'>
    <rect width='335' height='95' rx='14' fill='#ffffff' stroke='#e2e8f0' stroke-width='1.5' filter='url(#cardShadow)'/>
    <g transform='translate(20, 22)'>
      <rect width='44' height='44' rx='10' fill='#fff7ed' stroke='#fdba74' stroke-width='1'/>
      <text x='22' y='29' text-anchor='middle' font-size='22'>🏆</text>
    </g>
    <text x='78' y='46' font-family='Inter' font-size='26' font-weight='900' fill='#ea6d24'>99.4%</text>
    <text x='175' y='42' font-family='Inter' font-size='12' font-weight='900' fill='#0f172a' letter-spacing='0.5'>FIRST-ATTEMPT PASS</text>
    <text x='78' y='67' font-family='Inter' font-size='12' font-weight='700' fill='#64748b'>Official Global Certification Exams</text>
  </g>

  <g transform='translate(1205, 175)'>
    <rect width='335' height='120' rx='14' fill='url(#navyCard)' filter='url(#cardShadow)'/>
    <path d='M 14 0 L 321 0' stroke='url(#orangeGrad)' stroke-width='4' stroke-linecap='round'/>
    <text x='167' y='36' text-anchor='middle' font-family='Inter' font-size='12' font-weight='900' fill='#ea6d24' letter-spacing='1.2'>OFFICIAL TRAINING PORTAL</text>
    <text x='167' y='70' text-anchor='middle' font-family='Inter' font-size='21' font-weight='900' fill='#ffffff'>learnify-solutions.com</text>
    <text x='167' y='96' text-anchor='middle' font-family='Inter' font-size='11.5' font-weight='700' fill='#94a3b8'>Empowering Tomorrow's Enterprise Workforce</text>
  </g>
</svg>`;

fs.writeFileSync('public/design-preview/banner-master-clean.svg', profileSvg);
fs.writeFileSync('public/design-preview/banner.svg', profileSvg);
fs.writeFileSync('public/design-preview/learnify-profile-banner-1584x396.svg', profileSvg);
console.log("Updated SVG files successfully.");
