import { BlogRelatedLink, BlogTopicTrack } from '../types';
import { RegionCode } from './regionalSeoData';

export const BLOG_TOPIC_COVERS: Record<BlogTopicTrack, string> = {
  'Cloud & DevOps': '/images/azure_cloud_infra_1787771504293.webp',
  Cybersecurity: '/images/comptia_security_soc_1787771516564.webp',
  'Data & AI': '/images/powerbi_data_analytics_1788294280157.webp',
  'Exam & Fee Guides': '/images/comptia_cloud_multicloud_1788294616227.webp',
};

export function slugifyBlogTitle(title: string): string {
  return (
    String(title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || `blog-${Date.now()}`
  );
}

export type ClientBlogRouteMatch =
  | { type: 'hub'; isLegacyGuidesRedirect?: boolean }
  | { type: 'detail'; slug: string; isLegacyGuidesRedirect?: boolean };

export function parseBlogRoutePath(pathname: string): ClientBlogRouteMatch | null {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase() || '/';

  if (clean === '/blogs') {
    return { type: 'hub' };
  }
  if (clean.startsWith('/blogs/')) {
    const slug = clean.slice(7).trim();
    if (slug) return { type: 'detail', slug };
  }
  if (clean === '/guides') {
    return { type: 'hub', isLegacyGuidesRedirect: true };
  }
  if (clean.startsWith('/guides/')) {
    const slug = clean.slice(8).trim();
    if (slug) return { type: 'detail', slug, isLegacyGuidesRedirect: true };
  }

  return null;
}

export function getDefaultRegionalLinksForRegion(
  region: RegionCode | 'global'
): BlogRelatedLink[] {
  if (region === 'ae') {
    return [
      {
        label: 'CompTIA Security+ (SY0-701) Dubai & UAE',
        href: '/ae/comptia-security-plus-training-dubai-uae',
        subtitle: 'Live GST bootcamps & 24/7 cloud labs across all 7 Emirates',
      },
      {
        label: 'Microsoft Azure AZ-104 Dubai & UAE',
        href: '/ae/microsoft-azure-az-104-training-dubai-uae',
        subtitle: 'Hands-on Azure UAE North/Central infrastructure training',
      },
      {
        label: 'Microsoft Power BI PL-300 Dubai & UAE',
        href: '/ae/microsoft-power-bi-pl-300-training-dubai-uae',
        subtitle: 'Executive BI reporting & DAX modeling in AED/GST',
      },
    ];
  }
  if (region === 'za') {
    return [
      {
        label: 'CompTIA A+ Certification South Africa',
        href: '/za/comptia-a-plus-training-south-africa',
        subtitle: 'Core 1 & Core 2 live SAST cohort across Gauteng & SA',
      },
      {
        label: 'CompTIA Security+ (SY0-701) South Africa',
        href: '/za/comptia-security-plus-training-south-africa',
        subtitle: 'POPIA & FSCA cybersecurity bootcamp in ZAR/SAST',
      },
      {
        label: 'Microsoft Power BI PL-300 South Africa',
        href: '/za/microsoft-power-bi-pl-300-training-south-africa',
        subtitle: 'Enterprise analytics & DAX dashboards in Johannesburg & CPT',
      },
    ];
  }
  if (region === 'uk') {
    return [
      {
        label: 'CompTIA Security+ (SY0-701) London & UK',
        href: '/uk/comptia-security-plus-training-uk',
        subtitle: 'NCSC Cyber Essentials & Zero Trust SOC bootcamp in GMT/BST',
      },
      {
        label: 'Microsoft Azure AZ-104 Training UK',
        href: '/uk/microsoft-azure-az-104-training-uk',
        subtitle: 'Hands-on Azure UK South/West administration in GBP corporate POs',
      },
      {
        label: 'Microsoft Power BI PL-300 London & UK',
        href: '/uk/microsoft-power-bi-pl-300-training-uk',
        subtitle: 'Financial & BI data analytics cohorts across UK hubs',
      },
    ];
  }
  if (region === 'de') {
    return [
      {
        label: 'Microsoft Azure AZ-104 Germany & DACH',
        href: '/de/microsoft-azure-az-104-training-germany',
        subtitle: 'BSI C5 & Frankfurt Germany West Central cloud engineering in CET',
      },
      {
        label: 'CompTIA Security+ (SY0-701) Germany',
        href: '/de/comptia-security-plus-training-germany',
        subtitle: 'NIS2 & DORA aligned SOC defense training with EUR POs',
      },
      {
        label: 'Kubernetes CKA & CKS Training Germany',
        href: '/de/kubernetes-cka-cks-training-germany',
        subtitle: 'Production container platform mastery in Berlin, Munich & Zurich',
      },
    ];
  }
  if (region === 'nl') {
    return [
      {
        label: 'CompTIA ITF+ Training Netherlands & Benelux',
        href: '/nl/comptia-itf-plus-training-netherlands',
        subtitle: 'Fast-track IT foundations in Amsterdam, Eindhoven & CET',
      },
      {
        label: 'Microsoft Azure DP-900 Netherlands',
        href: '/nl/microsoft-azure-dp-900-training-netherlands',
        subtitle: 'Azure SQL, Cosmos DB & data platform fundamentals in EUR',
      },
      {
        label: 'CompTIA Security+ (SY0-701) Netherlands',
        href: '/nl/comptia-security-plus-training-netherlands',
        subtitle: 'EU NIS2 & Dutch NCSC aligned cybersecurity cohorts',
      },
    ];
  }
  if (region === 'eu') {
    return [
      {
        label: 'CompTIA Security+ (SY0-701) Europe (EU)',
        href: '/eu/comptia-security-plus-training-europe',
        subtitle: 'NIS2 & DORA cyber defense bootcamp across Dublin, Paris & EU hubs',
      },
      {
        label: 'Microsoft Azure AZ-104 Training Europe',
        href: '/eu/microsoft-azure-az-104-training-europe',
        subtitle: 'EU GDPR-sovereign cloud infrastructure training in CET/WET',
      },
      {
        label: 'AWS Solutions Architect (SAA-C03) Europe',
        href: '/eu/aws-solutions-architect-saa-c03-training-europe',
        subtitle: 'Multi-region eu-west-1 / eu-central-1 resilient cloud architecture',
      },
    ];
  }
  return [
    {
      label: 'Microsoft Azure Administrator (AZ-104)',
      href: '/course/course-azure-104',
      subtitle: 'Global live instructor-led cohort + 24/7 Azure cloud labs',
    },
    {
      label: 'CompTIA Security+ (SY0-701)',
      href: '/course/course-comptia-security-plus',
      subtitle: 'Zero Trust, SOC defense & PBQ mock exam drills worldwide',
    },
    {
      label: 'AWS Solutions Architect (SAA-C03)',
      href: '/course/course-aws-solutions',
      subtitle: 'Multi-AZ resilient cloud architecture with guided sandboxes',
    },
  ];
}
