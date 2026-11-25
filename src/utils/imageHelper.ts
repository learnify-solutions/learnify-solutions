// Utility to normalize image URLs across development and production environments

const KNOWN_VALID_ASSETS: Record<string, string> = {
  // Aliases & Missing asset remappings
  'cyber_soc_shield': '/images/comptia_security_soc_1787771516564.webp',
  'cyber_soc': '/images/comptia_security_soc_1787771516564.webp',
  'cisco_network': '/images/cisco_network_map_1787771488810.webp',
  'aws_architecture': '/images/aws_architecture_diagram_1787771528914.webp',
  'azure_cloud': '/images/azure_cloud_infra_1787771504293.webp',
  'comptia_cloud': '/images/comptia_cloud_multicloud_1788294616227.webp',
  'ethical_hacking': '/images/ethical_hacking_pentest_1788294329039.webp',
  'kubernetes_devops': '/images/kubernetes_devops_cluster_1788294296039.webp',
  'linux_datacenter': '/images/linux_datacenter_admin_1788294344630.webp',
  'pc_hardware': '/images/pc_hardware_workbench_1788294359055.webp',
  'powerbi_data': '/images/powerbi_data_analytics_1788294280157.webp',
  'copilot_genai': '/images/copilot_genai_workspace_1788294313357.webp',
  'cloud_essentials': '/images/cloud_essentials_business_1788294640468.webp',
};

export function normalizeImageUrl(
  url?: string | null,
  fallbackType: 'course' | 'about' | 'hero' | 'logo' | string = 'course'
): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return getDefaultFallback(fallbackType);
  }

  let trimmed = url.trim();

  // Check alias table first
  for (const [alias, mappedPath] of Object.entries(KNOWN_VALID_ASSETS)) {
    if (trimmed.includes(alias)) {
      return mappedPath;
    }
  }

  // If it's an absolute external URL or data URI, return as-is
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    if (trimmed.includes('images.unsplash.com') && !trimmed.includes('fm=webp')) {
      return `${trimmed}&fm=webp`;
    }
    return trimmed;
  }

  // Normalize /src/assets/images/ to /images/
  if (trimmed.startsWith('/src/assets/images/')) {
    trimmed = trimmed.replace('/src/assets/images/', '/images/');
  }

  if (trimmed.startsWith('src/assets/images/')) {
    trimmed = '/' + trimmed.replace('src/assets/images/', 'images/');
  }

  // If it does not start with a leading slash, add it
  if (!trimmed.startsWith('/')) {
    trimmed = `/${trimmed}`;
  }

  // Automatically serve lightweight .webp versions for known local assets
  if (trimmed.startsWith('/images/')) {
    const webpAssets = [
      'delivered_traning_1',
      'delivered_traning_2',
      'aws_architecture_diagram_1787771528914',
      'azure_cloud_infra_1787771504293',
      'cisco_network_map_1787771488810',
      'cloud_essentials_business_1788294640468',
      'comptia_cloud_multicloud_1788294616227',
      'comptia_security_soc_1787771516564',
      'copilot_genai_workspace_1788294313357',
      'ethical_hacking_pentest_1788294329039',
      'kubernetes_devops_cluster_1788294296039',
      'learnify_about_team_1787770808391',
      'learnify_hero_workstation_1787768560565',
      'linux_datacenter_admin_1788294344630',
      'pc_hardware_workbench_1788294359055',
      'powerbi_data_analytics_1788294280157'
    ];

    for (const name of webpAssets) {
      if (trimmed.includes(name) && !trimmed.endsWith('.webp')) {
        return `/images/${name}.webp`;
      }
    }
  }

  return trimmed;
}

export function getDefaultFallback(fallbackType: 'course' | 'about' | 'hero' | 'logo' | string): string {
  switch (fallbackType) {
    case 'hero':
      return '/hero.webp';
    case 'logo':
      return '/logo.jpeg';
    case 'about':
      return '/images/learnify_about_team_1787770808391.webp';
    case 'cisco':
    case 'cisco networking':
      return '/images/cisco_network_map_1787771488810.webp';
    case 'aws':
      return '/images/aws_architecture_diagram_1787771528914.webp';
    case 'security':
    case 'cybersecurity':
      return '/images/comptia_security_soc_1787771516564.webp';
    case 'devops':
    case 'cloud':
      return '/images/kubernetes_devops_cluster_1788294296039.webp';
    case 'course':
    default:
      return '/images/azure_cloud_infra_1787771504293.webp';
  }
}

/**
 * Returns a high-contrast SVG Data URI fallback for courses if static assets cannot be loaded.
 */
export function getSvgCourseFallback(title?: string, vendor?: string): string {
  const displayTitle = (title || 'Certification Course').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const displayVendor = (vendor || 'Learnify Verified').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f2238" />
      <stop offset="60%" stop-color="#152e4d" />
      <stop offset="100%" stop-color="#0a1828" />
    </linearGradient>
    <linearGradient id="accGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea6d24" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#bgGrad)" />
  <rect width="800" height="450" fill="url(#grid)" />
  
  <circle cx="700" cy="80" r="180" fill="rgba(234, 109, 36, 0.08)" />
  <circle cx="100" cy="380" r="140" fill="rgba(37, 99, 235, 0.1)" />

  <rect x="50" y="50" width="160" height="32" rx="6" fill="url(#accGrad)" />
  <text x="130" y="71" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" text-anchor="middle" letter-spacing="0.5">${displayVendor}</text>

  <text x="50" y="220" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" max-width="700">
    ${displayTitle.length > 36 ? displayTitle.substring(0, 34) + '...' : displayTitle}
  </text>
  <text x="50" y="260" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500">
    Official Certification &amp; Enterprise Lab Bootcamp
  </text>

  <line x1="50" y1="390" x2="750" y2="390" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  <text x="50" y="415" fill="#ea6d24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700">
    LEARNIFY SOLUTIONS
  </text>
  <text x="750" y="415" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" text-anchor="end">
    LIVE LABS &amp; MENTORSHIP
  </text>
</svg>
`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
