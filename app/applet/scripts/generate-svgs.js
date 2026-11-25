const fs = require('fs');

// 1. Company Banner SVG (1128 x 191)
const companySvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1128 191' width='1128' height='191'>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&amp;family=Inter:wght@700;800&amp;display=swap');
      .bg { fill: #ffffff; }
      .grid { fill: none; stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 3 3; }
      .title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 32px; fill: #0f172a; letter-spacing: 0.5px; }
      .title-accent { fill: #ea6d24; }
      .subtitle { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 14px; fill: #475569; letter-spacing: 1.5px; text-transform: uppercase; }
      .badge-bg { fill: #fff7ed; stroke: #ffedd5; stroke-width: 2px; rx: 12px; }
      .badge-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 15px; fill: #ea6d24; }
      .badge-sub { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 11px; fill: #64748b; }
      .domain { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 13px; fill: #ffffff; }
    </style>
    <pattern id='dots' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'>
      <circle cx='2' cy='2' r='1.2' fill='#cbd5e1' opacity='0.5'/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width='1128' height='191' class='bg'/>
  <rect width='1128' height='191' fill='url(#dots)' opacity='0.7'/>

  <!-- Left Safe Area Indicator / Gradient Glow -->
  <circle cx='100' cy='95' r='120' fill='#ea6d24' opacity='0.04' filter='blur(40px)'/>

  <!-- Main Content Group (Shifted right for LinkedIn Logo Safe Zone) -->
  <g transform='translate(250, 0)'>
    <!-- Subtitle Tagline -->
    <text x='0' y='52' class='subtitle'>AUTHORIZED IT TRAINING &amp; CLOUD PARTNER</text>
    
    <!-- Main Super Bold Title -->
    <text x='0' y='96' class='title'>EMPOWER YOUR <tspan class='title-accent'>TECH FUTURE</tspan></text>

    <!-- Domain Pill -->
    <rect x='0' y='116' width='210' height='32' rx='16' fill='#0f172a'/>
    <text x='105' y='136' text-anchor='middle' class='domain'>learnify-solutions.com</text>
  </g>

  <!-- Right Side Badge / Feature Box -->
  <g transform='translate(780, 35)'>
    <rect width='310' height='120' rx='12' class='badge-bg'/>
    <text x='25' y='45' class='badge-title'>+ 24/7 CLOUD LABS</text>
    <text x='25' y='72' class='badge-sub'>Real Sandboxed Hardware Environments</text>
    <text x='25' y='94' class='badge-sub'>Enterprise Certification Training</text>
  </g>
</svg>`;

// 2. Profile Banner SVG (1584 x 396)
const profileSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1584 396' width='1584' height='396'>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&amp;family=Inter:wght@700;800&amp;display=swap');
      .bg { fill: #ffffff; }
      .title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 52px; fill: #0f172a; letter-spacing: 0.5px; }
      .title-accent { fill: #ea6d24; }
      .subtitle { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 20px; fill: #475569; letter-spacing: 2px; text-transform: uppercase; }
      .badge-bg { fill: #fff7ed; stroke: #ffedd5; stroke-width: 3px; rx: 16px; }
      .badge-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 22px; fill: #ea6d24; }
      .badge-sub { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 16px; fill: #64748b; }
      .domain { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 18px; fill: #ffffff; }
    </style>
    <pattern id='dots2' x='0' y='0' width='24' height='24' patternUnits='userSpaceOnUse'>
      <circle cx='2' cy='2' r='1.4' fill='#cbd5e1' opacity='0.5'/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width='1584' height='396' class='bg'/>
  <rect width='1584' height='396' fill='url(#dots2)' opacity='0.7'/>

  <!-- Main Content (Shifted right to avoid profile photo overlap) -->
  <g transform='translate(380, 0)'>
    <text x='0' y='130' class='subtitle'>AUTHORIZED IT TRAINING &amp; CLOUD PARTNER</text>
    <text x='0' y='200' class='title'>EMPOWER YOUR <tspan class='title-accent'>TECH FUTURE</tspan></text>

    <!-- Domain Pill -->
    <rect x='0' y='240' width='280' height='48' rx='24' fill='#0f172a'/>
    <text x='140' y='270' text-anchor='middle' class='domain'>learnify-solutions.com</text>
  </g>

  <!-- Right Side Feature Card -->
  <g transform='translate(1100, 78)'>
    <rect width='420' height='240' rx='16' class='badge-bg'/>
    <text x='40' y='80' class='badge-title'>+ 24/7 CLOUD LABS</text>
    <text x='40' y='125' class='badge-sub'>Real Sandboxed Hardware Environments</text>
    <text x='40' y='165' class='badge-sub'>Enterprise Certification Training</text>
    <text x='40' y='200' class='badge-sub' fill='#0f172a' font-weight='800'>Zero Setup • Instant Access</text>
  </g>
</svg>`;

fs.writeFileSync('public/design-preview/learnify-company-banner-1128x191.svg', companySvg);
fs.writeFileSync('public/design-preview/learnify-profile-banner-1584x396.svg', profileSvg);
console.log('SVGs generated successfully!');
