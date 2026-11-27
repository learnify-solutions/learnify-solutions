import React, { useState, useEffect, Suspense, lazy } from 'react';
import { initialCmsData } from './data/defaultCmsData';
import type {
  RegionCode,
  ResolvedRegionalCoursePage,
} from './data/regionalSeoData';

type RegionalSeoModule = typeof import('./data/regionalSeoData');
let regionalSeoModulePromise: Promise<RegionalSeoModule> | null = null;
let regionalSeoModuleCache: RegionalSeoModule | null = null;

function loadRegionalSeo(): Promise<RegionalSeoModule> {
  if (regionalSeoModuleCache) return Promise.resolve(regionalSeoModuleCache);
  if (!regionalSeoModulePromise) {
    regionalSeoModulePromise = import('./data/regionalSeoData').then((mod) => {
      regionalSeoModuleCache = mod;
      return mod;
    });
  }
  return regionalSeoModulePromise;
}

async function findCourseByIdLazy(courseId: string, loadedCourses: Course[]): Promise<Course | null> {
  const lower = courseId.toLowerCase();
  const fromState = loadedCourses.find((c) => c.id.toLowerCase() === lower);
  if (fromState) return fromState;
  const mod = await import('./data/coursesData');
  return mod.sampleCourses.find((c) => c.id.toLowerCase() === lower) || null;
}

function detectRegionalPathSync(pathname: string): { type: 'hub' | 'course'; region: RegionCode } | null {
  const clean = (pathname || '').split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase() || '/';
  if (clean === '/ae' || clean === '/uae-it-training') return { type: 'hub', region: 'ae' };
  if (clean === '/za' || clean === '/south-africa-it-training') return { type: 'hub', region: 'za' };
  if (clean === '/uk' || clean === '/united-kingdom-it-training') return { type: 'hub', region: 'uk' };
  if (clean === '/de' || clean === '/germany-it-training') return { type: 'hub', region: 'de' };
  if (clean === '/nl' || clean === '/netherlands-it-training') return { type: 'hub', region: 'nl' };
  if (clean === '/eu' || clean === '/europe-it-training') return { type: 'hub', region: 'eu' };
  const prefixes: RegionCode[] = ['uk', 'eu', 'de', 'nl', 'ae', 'za'];
  for (const code of prefixes) {
    if (clean.startsWith(`/${code}/`) && clean.length > code.length + 2) {
      return { type: 'course', region: code };
    }
  }
  return null;
}
import {
  parseBlogRoutePath,
} from './data/blogsData';
import {
  EXAM_PREP_META,
  getExamPrepMetaBySlug,
  parseExamPrepRoutePath,
} from './data/examPrepMeta';
import { CmsData, Course, TechDomain, LeadSubmission, BlogPost, BlogSummary, ExamPrepResource } from './types';
import {
  fetchCmsData,
  fetchCourses,
  fetchLeads,
  submitLead,
  getSupabaseStatus,
  fetchBlogSummaries,
  fetchBlogDetail,
} from './services/cmsService';
import { useSEO } from './lib/useSEO';
import { buildCourseSeoMeta } from './utils/courseSeo';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { LoadingFallback } from './components/LoadingFallback';
import { Settings, Database } from 'lucide-react';

// Code Splitting / Lazy Loading for optimum bundle size and performance
const TrainingProofSection = lazy(() =>
  import('./components/TrainingProofSection').then((m) => ({ default: m.TrainingProofSection }))
);
const TestimonialsSection = lazy(() =>
  import('./components/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const BlogsHubView = lazy(() =>
  import('./components/BlogsHubView').then((m) => ({ default: m.BlogsHubView }))
);
const BlogDetailView = lazy(() =>
  import('./components/BlogDetailView').then((m) => ({ default: m.BlogDetailView }))
);
const PerformanceSection = lazy(() =>
  import('./components/PerformanceSection').then((m) => ({ default: m.PerformanceSection }))
);
const WhoWeAreSection = lazy(() =>
  import('./components/WhoWeAreSection').then((m) => ({ default: m.WhoWeAreSection }))
);
const LearningOptionsSection = lazy(() =>
  import('./components/LearningOptionsSection').then((m) => ({ default: m.LearningOptionsSection }))
);
const WhyChooseSection = lazy(() =>
  import('./components/WhyChooseSection').then((m) => ({ default: m.WhyChooseSection }))
);
const TechDomainsSection = lazy(() =>
  import('./components/TechDomainsSection').then((m) => ({ default: m.TechDomainsSection }))
);
const PathwaySection = lazy(() =>
  import('./components/PathwaySection').then((m) => ({ default: m.PathwaySection }))
);
const FinalCtaSection = lazy(() =>
  import('./components/FinalCtaSection').then((m) => ({ default: m.FinalCtaSection }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const AboutView = lazy(() =>
  import('./components/AboutView').then((m) => ({ default: m.AboutView }))
);
const CoursesView = lazy(() =>
  import('./components/CoursesView').then((m) => ({ default: m.CoursesView }))
);
const CourseDetailView = lazy(() =>
  import('./components/CourseDetailView').then((m) => ({
    default: m.CourseDetailView,
  }))
);
const CorporateTrainingView = lazy(() =>
  import('./components/CorporateTrainingView').then((m) => ({
    default: m.CorporateTrainingView,
  }))
);
const CiscoTrainingView = lazy(() =>
  import('./components/CiscoTrainingView').then((m) => ({
    default: m.CiscoTrainingView,
  }))
);

const PrivacyPolicyView = lazy(() =>
  import('./components/PrivacyPolicyView').then((m) => ({
    default: m.PrivacyPolicyView,
  }))
);
const ContactView = lazy(() =>
  import('./components/ContactView').then((m) => ({ default: m.ContactView }))
);
const CountryHubView = lazy(() =>
  import('./components/CountryHubView').then((m) => ({ default: m.CountryHubView }))
);
const RegionalCourseView = lazy(() =>
  import('./components/RegionalCourseView').then((m) => ({ default: m.RegionalCourseView }))
);
const BlogSection = lazy(() =>
  import('./components/BlogSection').then((m) => ({ default: m.BlogSection }))
);
const ExamPrepSection = lazy(() =>
  import('./components/ExamPrepSection').then((m) => ({ default: m.ExamPrepSection }))
);
const ExamPrepHubView = lazy(() =>
  import('./components/ExamPrepHubView').then((m) => ({ default: m.ExamPrepHubView }))
);
const ExamPrepDetailView = lazy(() =>
  import('./components/ExamPrepDetailView').then((m) => ({ default: m.ExamPrepDetailView }))
);
const AdvisorModal = lazy(() =>
  import('./components/AdvisorModal').then((m) => ({ default: m.AdvisorModal }))
);
const CoursesModal = lazy(() =>
  import('./components/CoursesModal').then((m) => ({ default: m.CoursesModal }))
);
const SearchModal = lazy(() =>
  import('./components/SearchModal').then((m) => ({ default: m.SearchModal }))
);
const BackendCmsDrawer = lazy(() =>
  import('./components/BackendCmsDrawer').then((m) => ({
    default: m.BackendCmsDrawer,
  }))
);
const AdminLoginModal = lazy(() =>
  import('./components/AdminLoginModal').then((m) => ({
    default: m.AdminLoginModal,
  }))
);

function getHydratedBlogForCurrentPath(): BlogPost | null {
  if (typeof window === 'undefined') return null;
  const initialBlog = (window as any).__INITIAL_BLOG__ as BlogPost | undefined;
  if (!initialBlog || !initialBlog.slug) return null;
  const match = parseBlogRoutePath(window.location.pathname);
  if (match && match.type === 'detail' && initialBlog.slug.toLowerCase() === match.slug.toLowerCase()) {
    return initialBlog;
  }
  return null;
}

function getHydratedBlogSummaries(): BlogSummary[] {
  if (typeof window === 'undefined') return [];
  const raw = (window as any).__INITIAL_BLOG_SUMMARIES__;
  return Array.isArray(raw) ? (raw as BlogSummary[]) : [];
}

function getHydratedExamPrepForCurrentPath(): ExamPrepResource | null {
  if (typeof window === 'undefined') return null;
  const initialPrep = (window as any).__INITIAL_EXAM_PREP__ as ExamPrepResource | undefined;
  if (!initialPrep || !initialPrep.slug) return null;
  const match = parseExamPrepRoutePath(window.location.pathname);
  if (match && match.type === 'detail' && initialPrep.slug.toLowerCase() === match.resource.slug.toLowerCase()) {
    return initialPrep;
  }
  return null;
}

export default function App() {
  const [cmsData, setCmsData] = useState<CmsData>(initialCmsData);
  const [courses, setCourses] = useState<Course[]>([]);
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [supabaseStatus, setSupabaseStatus] = useState({
    configured: false,
    supabaseUrl: null as string | null,
    sqlSchema: '',
  });

  // Helper to detect if current URL has authorized enterprise / Cisco parameters
  function checkIsEnterpriseUrl(): boolean {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const catalog = params.get('catalog');
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      catalog === 'enterprise' ||
      catalog === 'cisco' ||
      path === '/cisco-training' ||
      path === '/cisco-training/' ||
      path === '/cisco' ||
      path === '/cisco/' ||
      hash === '#cisco-training' ||
      hash === '#cisco'
    );
  }

  // Gated Cisco Training Authorization State
  const [isCiscoAuthorized, setIsCiscoAuthorized] = useState<boolean>(() => {
    return checkIsEnterpriseUrl();
  });

  const [activePage, setActivePage] = useState<
    | 'home'
    | 'about'
    | 'courses'
    | 'course_detail'
    | 'corporate_training'
    | 'contact'
    | 'privacy'
    | 'cisco_training'
    | 'country_hub'
    | 'regional_course'
    | 'blogs_hub'
    | 'blog_detail'
    | 'exam_prep_hub'
    | 'exam_prep_detail'
  >(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const catalog = params.get('catalog');

      const examPrepMatch = parseExamPrepRoutePath(path);
      if (examPrepMatch) {
        return examPrepMatch.type === 'hub' ? 'exam_prep_hub' : 'exam_prep_detail';
      }

      const blogMatch = parseBlogRoutePath(path);
      if (blogMatch) {
        return blogMatch.type === 'hub' ? 'blogs_hub' : 'blog_detail';
      }

      const regionalMatch = detectRegionalPathSync(path);
      if (regionalMatch) {
        return regionalMatch.type === 'hub' ? 'country_hub' : 'regional_course';
      }

      if (path.startsWith('/course/') || hash.startsWith('#course-')) {
        return 'course_detail';
      }
      if (
        catalog === 'enterprise' ||
        catalog === 'cisco' ||
        path === '/cisco-training' ||
        path === '/cisco-training/' ||
        path === '/cisco' ||
        path === '/cisco/' ||
        hash === '#cisco-training' ||
        hash === '#cisco'
      ) {
        return 'cisco_training';
      }
      if (path === '/courses' || hash === '#courses') {
        return 'courses';
      }
      if (path === '/about' || hash === '#about') {
        return 'about';
      }
      if (path === '/corporate-training' || hash === '#corporate-training' || path === '/corporate' || hash === '#corporate') {
        return 'corporate_training';
      }
      if (path === '/contact' || hash === '#contact') {
        return 'contact';
      }
      if (path === '/privacy' || hash === '#privacy') {
        return 'privacy';
      }
    }
    return 'home';
  });

  const [regionalSeoMod, setRegionalSeoMod] = useState<RegionalSeoModule | null>(
    () => regionalSeoModuleCache
  );

  const [regionalRegion, setRegionalRegion] = useState<RegionCode>(() => {
    if (typeof window !== 'undefined') {
      const match = detectRegionalPathSync(window.location.pathname);
      if (match) return match.region;
    }
    return 'ae';
  });

  const [selectedRegionalCourse, setSelectedRegionalCourse] = useState<ResolvedRegionalCoursePage | null>(
    null
  );

  const [selectedExamPrep, setSelectedExamPrep] = useState<ExamPrepResource | null>(() => {
    if (typeof window === 'undefined') return null;
    const hydrated = getHydratedExamPrepForCurrentPath();
    if (hydrated) return hydrated;
    const match = parseExamPrepRoutePath(window.location.pathname);
    return match && match.type === 'detail' ? match.resource : null;
  });

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(() =>
    getHydratedBlogForCurrentPath()
  );
  const [blogSummaries, setBlogSummaries] = useState<BlogSummary[]>(() =>
    getHydratedBlogSummaries()
  );
  const [isLoadingBlogs, setIsLoadingBlogs] = useState<boolean>(
    () => getHydratedBlogSummaries().length === 0
  );
  const [isLoadingBlogDetail, setIsLoadingBlogDetail] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const match = parseBlogRoutePath(window.location.pathname);
    return Boolean(match && match.type === 'detail' && !getHydratedBlogForCurrentPath());
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [activeNavId, setActiveNavId] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const catalog = params.get('catalog');

      if (path.startsWith('/course/') || hash.startsWith('#course-')) {
        return 'nav-courses';
      }
      if (
        catalog === 'enterprise' ||
        catalog === 'cisco' ||
        path === '/cisco-training' ||
        path === '/cisco-training/' ||
        path === '/cisco' ||
        path === '/cisco/' ||
        hash === '#cisco-training' ||
        hash === '#cisco'
      ) {
        return 'nav-cisco';
      }
      if (parseExamPrepRoutePath(path)) {
        return 'nav-exam-prep';
      }
      if (parseBlogRoutePath(path)) {
        return 'nav-blogs';
      }
      if (path === '/courses' || hash === '#courses') {
        return 'nav-courses';
      }
      if (path === '/about' || hash === '#about') {
        return 'nav-about';
      }
      if (path === '/corporate-training' || hash === '#corporate-training' || path === '/corporate' || hash === '#corporate') {
        return 'nav-corp-training';
      }
      if (path === '/contact' || hash === '#contact') {
        return 'nav-contact';
      }
    }
    return 'nav-home';
  });
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [advisorInquiryType, setAdvisorInquiryType] = useState<
    'advisor' | 'corporate_quote' | 'demo' | 'course_info'
  >('advisor');
  const [selectedDomainForAdvisor, setSelectedDomainForAdvisor] = useState('General');

  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
  const [filterDomainForCourses, setFilterDomainForCourses] = useState('all');

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCmsDrawerOpen, setIsCmsDrawerOpen] = useState(false);
  const [cmsDrawerInitialTab, setCmsDrawerInitialTab] = useState<'visual' | 'blogs'>('visual');
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Filter courses based on Cisco authorization status
  const displayedCourses = React.useMemo(() => {
    if (isCiscoAuthorized) {
      return courses;
    }
    return courses.filter((c) => {
      const vendor = (c.certificationVendor || '').toLowerCase();
      const domain = (c.domain || '').toLowerCase();
      const id = (c.id || '').toLowerCase();
      const title = (c.title || '').toLowerCase();
      const tags = Array.isArray(c.tags) ? c.tags.map((t) => String(t).toLowerCase()) : [];

      return (
        vendor !== 'cisco' &&
        !vendor.includes('cisco') &&
        domain !== 'cisco networking' &&
        !domain.includes('cisco') &&
        !id.startsWith('course-cisco') &&
        !title.includes('cisco') &&
        !tags.includes('cisco')
      );
    });
  }, [courses, isCiscoAuthorized]);

  // Filter technology domains based on Cisco authorization status
  const displayedDomains = React.useMemo(() => {
    const rawDomains = cmsData.techDomainsSection.domains || [];
    if (isCiscoAuthorized) {
      return rawDomains;
    }
    const withoutCisco = rawDomains.filter(
      (d) =>
        d.id !== 'domain-cisco' &&
        !d.name.toLowerCase().includes('cisco') &&
        d.iconName !== 'cisco'
    );
    // Maintain visually balanced 6-tile grid layout
    if (withoutCisco.length === 5) {
      return [
        ...withoutCisco,
        {
          id: 'domain-it-infrastructure',
          name: 'IT Infrastructure & Linux',
          description: 'Enterprise systems administration, Linux server operations, IT support, and systems engineering.',
          tags: 'CompTIA A+, Linux, Systems Admin',
          iconName: 'database',
          href: '#courses',
        },
      ];
    }
    return withoutCisco;
  }, [cmsData.techDomainsSection.domains, isCiscoAuthorized]);

  // Filter navigation links based on Cisco authorization status & ensure Blogs link is always present
  const displayedNavLinks = React.useMemo(() => {
    const rawLinks = cmsData.navigation?.links || [];
    let filteredLinks = isCiscoAuthorized
      ? rawLinks
      : rawLinks.filter(
          (l) =>
            l.id !== 'nav-cisco' &&
            !l.label.toLowerCase().includes('cisco') &&
            l.href !== '#cisco-training' &&
            l.href !== '#cisco'
        );

    const hasBlogs = filteredLinks.some(
      (l) =>
        l.id === 'nav-blogs' ||
        l.href === '#blogs' ||
        l.href === '/blogs' ||
        l.label.toLowerCase() === 'blogs'
    );
    if (!hasBlogs) {
      const coursesIdx = filteredLinks.findIndex(
        (l) => l.id === 'nav-courses' || l.label.toLowerCase() === 'courses'
      );
      const blogsLink = { id: 'nav-blogs', label: 'Blogs', href: '#blogs' };
      const withBlogs = [...filteredLinks];
      if (coursesIdx >= 0) {
        withBlogs.splice(coursesIdx + 1, 0, blogsLink);
      } else {
        withBlogs.push(blogsLink);
      }
      filteredLinks = withBlogs;
    }

    const hasExamPrep = filteredLinks.some(
      (l) =>
        l.id === 'nav-exam-prep' ||
        l.href === '/exam-prep' ||
        l.href === '#exam-prep' ||
        l.label.toLowerCase() === 'exam prep'
    );
    if (!hasExamPrep) {
      const blogsIdx = filteredLinks.findIndex(
        (l) => l.id === 'nav-blogs' || l.label.toLowerCase() === 'blogs'
      );
      const examPrepLink = { id: 'nav-exam-prep', label: 'Exam Prep', href: '/exam-prep' };
      const withExamPrep = [...filteredLinks];
      if (blogsIdx >= 0) {
        withExamPrep.splice(blogsIdx + 1, 0, examPrepLink);
      } else {
        withExamPrep.push(examPrepLink);
      }
      filteredLinks = withExamPrep;
    }

    if (isCiscoAuthorized) {
      const hasCisco = filteredLinks.some(
        (l) => l.id === 'nav-cisco' || l.label.toLowerCase().includes('cisco')
      );
      if (!hasCisco) {
        const blogsIdx = filteredLinks.findIndex(
          (l) => l.id === 'nav-blogs' || l.label.toLowerCase() === 'blogs'
        );
        const coursesIdx = filteredLinks.findIndex(
          (l) => l.id === 'nav-courses' || l.label.toLowerCase() === 'courses'
        );
        const insertAfter = blogsIdx >= 0 ? blogsIdx : coursesIdx;
        const ciscoLink = { id: 'nav-cisco', label: 'Cisco Training', href: '#cisco-training' };
        if (insertAfter >= 0) {
          const updated = [...filteredLinks];
          updated.splice(insertAfter + 1, 0, ciscoLink);
          return updated;
        }
        return [...filteredLinks, ciscoLink];
      }
    }

    return filteredLinks;
  }, [cmsData.navigation?.links, isCiscoAuthorized]);

  // Dynamic SEO Configuration for Top Google Ranking across every section & course
  const isAdminAuthenticated = localStorage.getItem('learnify_admin_authenticated') === 'true';

  const seoConfig = React.useMemo(() => {
    switch (activePage) {
      case 'about':
        return {
          title: 'About Learnify Solutions | Global Authorized IT Training Academy',
          description:
            'Learn about Learnify Solutions’ ISO-certified training ecosystem, expert instructors, and proven methodology empowering enterprise tech professionals across USA, UK, UAE & India.',
          keywords: 'about Learnify Solutions, enterprise IT training, corporate IT certification, global IT academy',
          canonicalUrl: 'https://www.learnify-solutions.com/about',
          ogUrl: 'https://www.learnify-solutions.com/about',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'About', 'item': 'https://www.learnify-solutions.com/about' }
            ]
          }
        };
      case 'cisco_training':
        return {
          title: 'Cisco Authorized Certification Training (CCNA 200-301, CCNP ENCOR, SD-WAN, DevNet) | Learnify',
          description:
            'Authorized Cisco training partner: CCNA 200-301, CCNP Enterprise ENCOR 350-401, ENARSI 300-410, Security SCOR 350-701, SD-WAN & DevNet with 24/7 lab pods and corporate PO cohorts.',
          keywords: 'Cisco certification training, CCNA 200-301 course, CCNP ENCOR 350-401 bootcamp, ENARSI 300-410, Cisco SD-WAN 300-415, CCNP Security SCOR 350-701, Cisco DevNet training, CCNA training UAE UK South Africa',
          canonicalUrl: 'https://www.learnify-solutions.com/cisco-training',
          ogUrl: 'https://www.learnify-solutions.com/cisco-training',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Cisco Training', 'item': 'https://www.learnify-solutions.com/cisco-training' }
            ]
          }
        };
      case 'courses':
        return {
          title: '50+ Official IT & Cloud Certification Courses (CompTIA, Microsoft Azure, AWS, Kubernetes) | Learnify',
          description: isCiscoAuthorized
            ? 'Browse 50+ vendor-authorized courses in Microsoft Azure (AZ-104, AI-102, DP-900, PL-300, MS-4018 Copilot Studio), Cisco CCNA/CCNP, CompTIA Security+ SY0-701, A+ 220-1201, ITF+, AWS SAA-C03 & Kubernetes CKA.'
            : 'Browse 50+ vendor-authorized certification courses in Microsoft Azure (AZ-104, AI-102, DP-900, PL-300, MS-4018 Copilot), CompTIA Security+ SY0-701, A+ 220-1201, ITF+, AWS SAA-C03 & Kubernetes CKA.',
          keywords: isCiscoAuthorized
            ? 'IT courses catalog, CompTIA Security+ SY0-701, CompTIA A+ 220-1201 220-1101, CompTIA ITF+ FC0-U61, CompTIA Network+ N10-009, Microsoft Azure AZ-104 AZ-900 AZ-305 AI-102, DP-900, PL-900, PL-300, SC-900, MS-4018 Copilot Studio, Cisco CCNA 200-301, AWS SAA-C03, Kubernetes CKA, UK Europe UAE South Africa IT training'
            : 'IT courses catalog, CompTIA Security+ SY0-701, CompTIA A+ 220-1201 220-1101, CompTIA ITF+ FC0-U61, CompTIA Network+ N10-009, Microsoft Azure AZ-104 AZ-900 AZ-305 AI-102, DP-900, PL-900, PL-300, SC-900, MS-4018 Copilot Studio, AWS SAA-C03, Kubernetes CKA, UK Europe UAE South Africa IT training',
          canonicalUrl: 'https://www.learnify-solutions.com/courses',
          ogUrl: 'https://www.learnify-solutions.com/courses',
          hreflangAlternates: regionalSeoMod ? regionalSeoMod.getHubHreflangAlternates() : undefined,
        };
      case 'country_hub': {
        if (!regionalSeoMod) {
          const fallbackCanonical = `https://www.learnify-solutions.com/${regionalRegion}`;
          return {
            title: 'Regional IT Certification Training | Learnify Solutions',
            description:
              'Authorized CompTIA, Microsoft Azure, AWS & Kubernetes live certification bootcamps across UK, Europe (EU), Germany, Netherlands, UAE and South Africa.',
            canonicalUrl: fallbackCanonical,
            ogUrl: fallbackCanonical,
          };
        }
        const region = regionalSeoMod.REGION_CONFIGS[regionalRegion];
        const hubPages = regionalSeoMod.getRegionalCoursePages(regionalRegion);
        return {
          title: region.hubTitle,
          description: region.hubDescription,
          keywords: region.hubKeywords,
          canonicalUrl: `https://www.learnify-solutions.com${region.hubPath}`,
          ogUrl: `https://www.learnify-solutions.com${region.hubPath}`,
          hreflangAlternates: regionalSeoMod.getHubHreflangAlternates(),
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ItemList',
                '@id': `https://www.learnify-solutions.com${region.hubPath}#course-list`,
                'name': `CompTIA, Microsoft & AWS Certification Training in ${region.countryName}`,
                'numberOfItems': hubPages.length,
                'itemListElement': hubPages.map((p, idx) => ({
                  '@type': 'ListItem',
                  'position': idx + 1,
                  'name': p.h1Title,
                  'url': p.canonicalUrl,
                })),
              },
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
                  {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': `${region.shortName} IT Training`,
                    'item': `https://www.learnify-solutions.com${region.hubPath}`,
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                'mainEntity': region.hubFaqs.map((f) => ({
                  '@type': 'Question',
                  'name': f.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
                })),
              },
            ],
          },
        };
      }
      case 'exam_prep_hub': {
        return {
          title: 'IT Certification Practice Tests, Cheat Sheets, Interview Q&A & Salary Tool | Learnify',
          description:
            'Free CompTIA Security+ (SY0-701), Microsoft Azure (AZ-104), AWS (SAA-C03), Power BI (PL-300), Network+ & AI-102 practice simulators, cheat sheets, interview banks & salary ROI calculator.',
          keywords:
            'CompTIA Security+ SY0-701 practice questions, Azure AZ-104 mock test, AWS SAA-C03 sample questions, Network+ port numbers cheat sheet, kubectl commands cheat sheet, IT certification salary calculator 2026',
          canonicalUrl: 'https://www.learnify-solutions.com/exam-prep',
          ogUrl: 'https://www.learnify-solutions.com/exam-prep',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': 'https://www.learnify-solutions.com/exam-prep#collection',
                'name': 'Learnify IT Certification Exam Prep Hub',
                'mainEntity': {
                  '@type': 'ItemList',
                  'numberOfItems': EXAM_PREP_META.length,
                  'itemListElement': EXAM_PREP_META.map((item, idx) => ({
                    '@type': 'ListItem',
                    'position': idx + 1,
                    'name': item.title,
                    'url': `https://www.learnify-solutions.com/exam-prep/${item.slug}`,
                  })),
                },
              },
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Exam Prep', 'item': 'https://www.learnify-solutions.com/exam-prep' },
                ],
              },
            ],
          },
        };
      }
      case 'exam_prep_detail': {
        if (!selectedExamPrep) {
          return {
            title: 'IT Certification Exam Prep & Practice Tests | Learnify Solutions',
            description:
              'Interactive IT certification mock exams, cheat sheets, interview Q&A banks, and regional exam fee calculators.',
            canonicalUrl: 'https://www.learnify-solutions.com/exam-prep',
            ogUrl: 'https://www.learnify-solutions.com/exam-prep',
          };
        }
        const canonical = `https://www.learnify-solutions.com/exam-prep/${selectedExamPrep.slug}`;
        const previewQuestionEntities =
          selectedExamPrep.type === 'practice_test' &&
          Array.isArray(selectedExamPrep.questions) &&
          selectedExamPrep.questions.length > 0
            ? selectedExamPrep.questions
                .slice(0, selectedExamPrep.openPreviewCount || 2)
                .map((q) => ({
                  '@type': 'Question',
                  'name': q.prompt,
                  'eduQuestionType': 'Multiple choice',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': q.options[q.correctIndex] || '',
                  },
                }))
            : undefined;
        const primaryEntity =
          selectedExamPrep.type === 'practice_test'
            ? {
                '@type': 'Quiz',
                '@id': `${canonical}#quiz`,
                'name': selectedExamPrep.title,
                'description': selectedExamPrep.seoDescription,
                'educationalAlignment': {
                  '@type': 'AlignmentObject',
                  'alignmentType': 'assesses',
                  'targetName': selectedExamPrep.examCode,
                },
                ...(previewQuestionEntities ? { 'hasPart': previewQuestionEntities } : {}),
                'provider': {
                  '@type': 'EducationalOrganization',
                  'name': 'Learnify Solutions',
                  'url': 'https://www.learnify-solutions.com',
                },
              }
            : selectedExamPrep.type === 'cost_calculator' || selectedExamPrep.type === 'subnet_calculator'
            ? {
                '@type': 'WebApplication',
                '@id': `${canonical}#webapp`,
                'name': selectedExamPrep.title,
                'description': selectedExamPrep.seoDescription,
                'applicationCategory': 'EducationalApplication',
                'operatingSystem': 'Web',
                'url': canonical,
                'provider': {
                  '@type': 'EducationalOrganization',
                  'name': 'Learnify Solutions',
                  'url': 'https://www.learnify-solutions.com',
                },
              }
            : {
                '@type': 'TechArticle',
                '@id': `${canonical}#article`,
                'headline': selectedExamPrep.title,
                'description': selectedExamPrep.seoDescription,
                'datePublished': selectedExamPrep.publishedIso || '2026-11-22',
                'dateModified': selectedExamPrep.publishedIso || '2026-11-22',
                'inLanguage': 'en',
                'author': {
                  '@type': 'Organization',
                  'name': 'Learnify Solutions',
                  'url': 'https://www.learnify-solutions.com',
                },
                'publisher': {
                  '@type': 'EducationalOrganization',
                  'name': 'Learnify Solutions',
                  'url': 'https://www.learnify-solutions.com',
                },
                'mainEntityOfPage': canonical,
              };

        const graphNodes: Record<string, any>[] = [
          primaryEntity,
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Exam Prep', 'item': 'https://www.learnify-solutions.com/exam-prep' },
              { '@type': 'ListItem', 'position': 3, 'name': selectedExamPrep.shortTitle, 'item': canonical },
            ],
          },
        ];
        if (selectedExamPrep.faqs && selectedExamPrep.faqs.length > 0) {
          graphNodes.push({
            '@type': 'FAQPage',
            'mainEntity': selectedExamPrep.faqs.map((f) => ({
              '@type': 'Question',
              'name': f.q,
              'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
            })),
          });
        }
        return {
          title: selectedExamPrep.seoTitle,
          description: selectedExamPrep.seoDescription,
          keywords: selectedExamPrep.seoKeywords,
          canonicalUrl: canonical,
          ogUrl: canonical,
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': graphNodes,
          },
        };
      }
      case 'blogs_hub': {
        return {
          title: 'IT Certification Blogs, Cloud Strategy & Exam Roadmaps | Learnify Solutions',
          description:
            'Explore cloud architecture comparisons, cybersecurity study blueprints, Power BI & AI analytics workflows, and regional exam center & fee guides from Learnify Solutions.',
          keywords:
            'Learnify blogs, Azure AZ-104 vs AWS SAA-C03, CompTIA Security+ SY0-701 roadmap, Power BI PL-300 guide, IT certification cost, Pearson VUE exam centers',
          canonicalUrl: 'https://www.learnify-solutions.com/blogs',
          ogUrl: 'https://www.learnify-solutions.com/blogs',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': 'https://www.learnify-solutions.com/blogs#collection',
                'name': 'Learnify Solutions IT Certification Blogs & Architecture Guides',
                'mainEntity': {
                  '@type': 'ItemList',
                  'numberOfItems': blogSummaries.length,
                  'itemListElement': blogSummaries.map((g, idx) => ({
                    '@type': 'ListItem',
                    'position': idx + 1,
                    'name': g.title,
                    'url': `https://www.learnify-solutions.com/blogs/${g.slug}`,
                  })),
                },
              },
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Blogs', 'item': 'https://www.learnify-solutions.com/blogs' },
                ],
              },
            ],
          },
        };
      }
      case 'blog_detail': {
        if (!selectedBlog) {
          const fallbackMatch =
            typeof window !== 'undefined' ? parseBlogRoutePath(window.location.pathname) : null;
          const fallbackSlug = fallbackMatch && fallbackMatch.type === 'detail' ? fallbackMatch.slug : '';
          const fallbackCanonical = fallbackSlug
            ? `https://www.learnify-solutions.com/blogs/${fallbackSlug}`
            : 'https://www.learnify-solutions.com/blogs';
          return {
            title: 'IT Certification Blogs & Roadmaps | Learnify Solutions',
            description: 'Cloud architecture comparisons, cybersecurity preparation guides, and exam insights from Learnify Solutions.',
            canonicalUrl: fallbackCanonical,
            ogUrl: fallbackCanonical,
          };
        }
        const canonical = `https://www.learnify-solutions.com/blogs/${selectedBlog.slug}`;
        const blogImageUrl = selectedBlog.coverImage
          ? selectedBlog.coverImage.startsWith('http')
            ? selectedBlog.coverImage
            : `https://www.learnify-solutions.com${selectedBlog.coverImage}`
          : 'https://www.learnify-solutions.com/hero.webp';
        const graphNodes: Record<string, any>[] = [
          {
            '@type': 'BlogPosting',
            '@id': `${canonical}#blogposting`,
            'headline': selectedBlog.title,
            'description': selectedBlog.seoDescription,
            'image': blogImageUrl,
            'datePublished': selectedBlog.publishedIso || '2026-11-17',
            'dateModified': selectedBlog.publishedIso || '2026-11-17',
            'inLanguage': 'en',
            'author': {
              '@type': 'Organization',
              'name': 'Learnify Solutions',
              'url': 'https://www.learnify-solutions.com',
            },
            'publisher': {
              '@type': 'EducationalOrganization',
              'name': 'Learnify Solutions',
              'url': 'https://www.learnify-solutions.com',
            },
            'mainEntityOfPage': canonical,
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Blogs', 'item': 'https://www.learnify-solutions.com/blogs' },
              { '@type': 'ListItem', 'position': 3, 'name': selectedBlog.regionLabel, 'item': canonical },
            ],
          },
        ];
        if (selectedBlog.faqs && selectedBlog.faqs.length > 0) {
          graphNodes.push({
            '@type': 'FAQPage',
            'mainEntity': selectedBlog.faqs.map((f) => ({
              '@type': 'Question',
              'name': f.q,
              'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
            })),
          });
        }
        return {
          title: selectedBlog.seoTitle,
          description: selectedBlog.seoDescription,
          keywords: selectedBlog.seoKeywords,
          canonicalUrl: canonical,
          ogUrl: canonical,
          ogImage: blogImageUrl,
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': graphNodes,
          },
        };
      }
      case 'regional_course': {
        if (!selectedRegionalCourse) {
          const fallbackPath =
            typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : '/courses';
          const fallbackCanonical = `https://www.learnify-solutions.com${fallbackPath || '/courses'}`;
          return {
            title: 'Regional IT Certification Training | Learnify Solutions',
            description: 'Authorized CompTIA, Microsoft Azure, AWS & Kubernetes live certification bootcamps across UK, Europe (EU), Germany, Netherlands, UAE and South Africa.',
            canonicalUrl: fallbackCanonical,
            ogUrl: fallbackCanonical,
          };
        }
        const p = selectedRegionalCourse;
        const imgUrl = p.course.imageUrl?.startsWith('http')
          ? p.course.imageUrl
          : `https://www.learnify-solutions.com${p.course.imageUrl || '/hero.webp'}`;
        return {
          title: p.seoTitle,
          description: p.seoDescription,
          keywords: p.seoKeywords,
          canonicalUrl: p.canonicalUrl,
          ogUrl: p.canonicalUrl,
          ogImage: imgUrl,
          hreflangAlternates: regionalSeoMod
            ? regionalSeoMod.getCourseHreflangAlternates(p.alternateUrls)
            : undefined,
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Course',
                '@id': `${p.canonicalUrl}#course`,
                'name': p.h1Title,
                'courseCode': p.course.examCode || p.course.id,
                'description': p.localizedOverview,
                'inLanguage': 'en',
                'provider': {
                  '@type': 'EducationalOrganization',
                  'name': 'Learnify Solutions',
                  'url': 'https://www.learnify-solutions.com',
                },
                'educationalLevel': p.course.skillLevel || 'Intermediate',
                'educationalCredentialAwarded': `${p.course.title} Official Certification`,
                'courseMode': ['online', 'blended', 'onsite'],
                'hasCourseInstance': {
                  '@type': 'CourseInstance',
                  'courseMode': 'online',
                  'location': {
                    '@type': 'Country',
                    'name': p.region.countryName,
                  },
                },
                'teaches': p.course.learningObjectives || [p.course.title],
                'offers': {
                  '@type': 'Offer',
                  'category': 'Paid',
                  'priceCurrency': p.region.currency,
                  'availability': 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': `${p.canonicalUrl}#breadcrumb`,
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
                  {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': `${p.region.shortName} Training`,
                    'item': `https://www.learnify-solutions.com${p.region.hubPath}`,
                  },
                  { '@type': 'ListItem', 'position': 3, 'name': p.meta.shortName, 'item': p.canonicalUrl },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': `${p.canonicalUrl}#faq`,
                'mainEntity': p.localizedFaqs.map((f) => ({
                  '@type': 'Question',
                  'name': f.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
                })),
              },
            ],
          },
        };
      }
      case 'course_detail': {
        const courseAlternates =
          selectedCourse && regionalSeoMod
            ? regionalSeoMod.getRegionalAlternatesForCourse(selectedCourse.id)
            : null;
        if (!selectedCourse) {
          const fallbackPath =
            typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : '/courses';
          const fallbackCanonical = `https://www.learnify-solutions.com${fallbackPath || '/courses'}`;
          return {
            title: 'IT Certification Courses | Learnify Solutions',
            description: 'Comprehensive IT training course overview, learning objectives, and curriculum syllabus.',
            canonicalUrl: fallbackCanonical,
            ogUrl: fallbackCanonical,
          };
        }
        const seoMeta = buildCourseSeoMeta(selectedCourse);
        return {
          title: seoMeta.title,
          description: seoMeta.description,
          keywords: seoMeta.keywords,
          canonicalUrl: `https://www.learnify-solutions.com/course/${selectedCourse.id}`,
          ogUrl: `https://www.learnify-solutions.com/course/${selectedCourse.id}`,
          ogImage: selectedCourse.imageUrl?.startsWith('http')
            ? selectedCourse.imageUrl
            : `https://www.learnify-solutions.com${selectedCourse.imageUrl || '/hero.webp'}`,
          hreflangAlternates:
            courseAlternates && regionalSeoMod
              ? regionalSeoMod.getCourseHreflangAlternates(courseAlternates)
              : undefined,
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Course',
                '@id': `https://www.learnify-solutions.com/course/${selectedCourse.id}#course`,
                'name': selectedCourse.title,
                'courseCode': selectedCourse.examCode || selectedCourse.id,
                'description': selectedCourse.summary || selectedCourse.overview || '',
                'provider': {
                  '@type': 'EducationalOrganization',
                  'name': 'Learnify Solutions',
                  'url': 'https://www.learnify-solutions.com',
                },
                'educationalLevel': selectedCourse.skillLevel || 'Intermediate',
                'educationalCredentialAwarded': `${selectedCourse.title} Official Certification`,
                'courseMode': ['online', 'blended', 'onsite'],
                'teaches': selectedCourse.learningObjectives || [selectedCourse.title],
                'offers': {
                  '@type': 'Offer',
                  'category': 'Paid',
                  'priceCurrency': 'USD',
                  'price': '999',
                  'availability': 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': `https://www.learnify-solutions.com/course/${selectedCourse.id}#breadcrumb`,
                'itemListElement': [
                  {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://www.learnify-solutions.com/',
                  },
                  {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Courses',
                    'item': 'https://www.learnify-solutions.com/courses',
                  },
                  {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': selectedCourse.title,
                    'item': `https://www.learnify-solutions.com/course/${selectedCourse.id}`,
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': `https://www.learnify-solutions.com/course/${selectedCourse.id}#faq`,
                'mainEntity': seoMeta.faqs.map((f) => ({
                  '@type': 'Question',
                  'name': f.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
                })),
              },
            ],
          },
        };
      }
      case 'corporate_training':
        return {
          title: 'Corporate IT Training Solutions | UK, Europe (NIS2/DORA), UAE & South Africa POs | Learnify',
          description:
            'Enterprise IT bootcamps and corporate workforce upskilling across UK (GBP), Europe (EUR / NIS2 & DORA), UAE (AED / NESA), and South Africa (ZAR / POPIA). Custom syllabi, 24/7 sandboxes & Purchase Orders.',
          keywords: 'corporate IT training, enterprise tech upskilling, bulk IT certification vouchers, corporate Purchase Order PO training GBP EUR AED ZAR, NIS2 DORA compliance training EU, NCSC training UK, NESA UAE IT training, POPIA South Africa cybersecurity, Microsoft Copilot corporate training',
          canonicalUrl: 'https://www.learnify-solutions.com/corporate-training',
          ogUrl: 'https://www.learnify-solutions.com/corporate-training',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Corporate Training', 'item': 'https://www.learnify-solutions.com/corporate-training' }
            ]
          }
        };
      case 'contact':
        return {
          title: 'Contact Admissions & Corporate Training Advisors | Learnify Solutions',
          description:
            'Connect with our senior enterprise advisors for custom corporate training quotes, live batch schedules, and personalized certification guidance.',
          keywords: 'contact Learnify Solutions, corporate training quotes, IT training advisors, certification course inquiry',
          canonicalUrl: 'https://www.learnify-solutions.com/contact',
          ogUrl: 'https://www.learnify-solutions.com/contact',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Contact', 'item': 'https://www.learnify-solutions.com/contact' }
            ]
          }
        };
      case 'privacy':
        return {
          title: 'Privacy Policy & Data Security Standards | Learnify Solutions',
          description:
            'Read Learnify Solutions privacy policy, GDPR data protection standards, and learner confidentiality commitments.',
          keywords: 'privacy policy, Learnify Solutions compliance, GDPR, data protection',
          canonicalUrl: 'https://www.learnify-solutions.com/privacy',
          ogUrl: 'https://www.learnify-solutions.com/privacy',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.learnify-solutions.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Privacy', 'item': 'https://www.learnify-solutions.com/privacy' }
            ]
          }
        };
      default:
        return {
          title: isCiscoAuthorized
            ? 'Learnify Solutions | Authorized Microsoft, CompTIA, AWS & Cisco IT Training'
            : 'Learnify Solutions | Authorized Microsoft, AWS & CompTIA IT Training Partner',
          description:
            'Authorized global IT certification training across UK, Europe, UAE, South Africa & North America. Live 1-on-1 & corporate bootcamps for CompTIA SY0-701, A+ 220-1201, ITF+, Azure AZ-104, AI-102, DP-900, PL-300, MS-4018 Copilot Studio, AWS SAA-C03 & Kubernetes CKA.',
          keywords: isCiscoAuthorized
            ? 'IT training certification courses, corporate IT training, 1-on-1 IT training, CompTIA Security+ SY0-701, CompTIA A+ 220-1201 220-1101, CompTIA ITF+ FC0-U61, CompTIA Network+ N10-009, CompTIA Cloud+ CV0-004, CompTIA Linux+ Server+, Microsoft Azure AZ-104 AZ-900 AZ-305 AI-102, DP-900, DP-100, PL-900, PL-300, SC-900, Microsoft Copilot MS-4018 Copilot Studio, Cisco CCNA 200-301 CCNP ENCOR, AWS Solutions Architect SAA-C03 CLF-C02 SCS-C02, Kubernetes CKA CKS, CEH v12, CISSP, IT training UK London, Europe NIS2 DORA, UAE Dubai AED, South Africa Gauteng ZAR, Learnify Solutions'
            : 'IT training certification courses, corporate IT training, 1-on-1 IT training, CompTIA Security+ SY0-701, CompTIA A+ 220-1201 220-1101, CompTIA ITF+ FC0-U61, CompTIA Network+ N10-009, CompTIA Cloud+ CV0-004, CompTIA Linux+ Server+, Microsoft Azure AZ-104 AZ-900 AZ-305 AI-102, DP-900, DP-100, PL-900, PL-300, SC-900, Microsoft Copilot MS-4018 Copilot Studio, AWS Solutions Architect SAA-C03 CLF-C02 SCS-C02, Kubernetes CKA CKS, CEH v12, CISSP, IT training UK London, Europe NIS2 DORA, UAE Dubai AED, South Africa Gauteng ZAR, Learnify Solutions',
          canonicalUrl: 'https://www.learnify-solutions.com/',
          ogUrl: 'https://www.learnify-solutions.com/',
        };
    }
  }, [activePage, selectedCourse, isCiscoAuthorized, regionalRegion, selectedRegionalCourse, selectedBlog, blogSummaries, selectedExamPrep?.slug, regionalSeoMod]);

  useSEO(seoConfig);

  // Load backend CMS data and check for direct /admin route on mount
  useEffect(() => {
    loadAllData();

    // Ensure initial landing starts at top of page without fighting early user scroll gestures
    let initialScrollDone = false;
    const resetScrollToTop = () => {
      if (!initialScrollDone && (window.scrollY === 0 || document.documentElement.scrollTop === 0)) {
        window.scrollTo(0, 0);
      }
    };

    resetScrollToTop();
    const t1 = setTimeout(resetScrollToTop, 20);
    const t2 = setTimeout(resetScrollToTop, 100);
    const t3 = setTimeout(() => {
      initialScrollDone = true;
    }, 250);

    // Check if user navigates directly to secret admin route or cisco client url
    const checkAdminAndCiscoRoutes = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      const isPathAdmin = pathname === '/admin-secure-portal' || pathname.startsWith('/admin-secure-portal/');
      const isHashAdmin = hash === '#admin-secure-portal';
      
      if (isPathAdmin || isHashAdmin) {
        const isAuth = localStorage.getItem('learnify_admin_authenticated') === 'true';
        if (isAuth) {
          setIsCmsDrawerOpen(true);
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }

      // Check Enterprise / Cisco authorization from URL (No persistent storage)
      const isEnterprise = checkIsEnterpriseUrl();
      setIsCiscoAuthorized(isEnterprise);

      const examPrepMatch = parseExamPrepRoutePath(pathname);
      if (examPrepMatch) {
        if (examPrepMatch.type === 'hub') {
          setSelectedExamPrep(null);
          setActivePage('exam_prep_hub');
        } else if (examPrepMatch.type === 'detail') {
          const hydrated = getHydratedExamPrepForCurrentPath();
          setSelectedExamPrep(hydrated || examPrepMatch.resource);
          setActivePage('exam_prep_detail');
        } else {
          setSelectedExamPrep(null);
          setActivePage('exam_prep_detail');
        }
        setActiveNavId('nav-exam-prep');
        return;
      }

      const blogMatch = parseBlogRoutePath(pathname);
      if (blogMatch) {
        if (blogMatch.isLegacyGuidesRedirect && typeof window !== 'undefined') {
          const newUrl = blogMatch.type === 'hub' ? '/blogs' : `/blogs/${blogMatch.slug}`;
          window.history.replaceState(null, '', newUrl);
        }
        if (blogMatch.type === 'hub') {
          setSelectedBlog(null);
          setActivePage('blogs_hub');
        } else {
          setActivePage('blog_detail');
          const hydrated = getHydratedBlogForCurrentPath();
          if (
            hydrated &&
            hydrated.slug.toLowerCase() === blogMatch.slug.toLowerCase() &&
            !(window as any).__INITIAL_BLOG_CONSUMED__
          ) {
            (window as any).__INITIAL_BLOG_CONSUMED__ = true;
            setSelectedBlog(hydrated);
            setIsLoadingBlogDetail(false);
          } else {
            loadBlogBySlug(blogMatch.slug);
          }
        }
        setActiveNavId('nav-blogs');
        return;
      }

      const regionalSync = detectRegionalPathSync(pathname);
      if (regionalSync) {
        setRegionalRegion(regionalSync.region);
        setActiveNavId('nav-courses');
        if (regionalSync.type === 'hub') {
          setSelectedRegionalCourse(null);
          setActivePage('country_hub');
        } else {
          setActivePage('regional_course');
        }
        loadRegionalSeo()
          .then((mod) => {
            setRegionalSeoMod(mod);
            const regionalMatch = mod.resolveRegionalRoute(pathname);
            if (regionalMatch) {
              setRegionalRegion(regionalMatch.region.code);
              if (regionalMatch.type === 'hub') {
                setSelectedRegionalCourse(null);
                setActivePage('country_hub');
              } else {
                setSelectedRegionalCourse(regionalMatch.page);
                setActivePage('regional_course');
              }
            }
          })
          .catch(() => {});
        return;
      }

      // Synchronize active page and course if user hit back/forward buttons
      if (pathname.startsWith('/course/') || hash.startsWith('#course-')) {
        let courseId = '';
        if (pathname.startsWith('/course/')) {
          courseId = window.location.pathname.replace('/course/', '').replace(/\/$/, '');
        } else if (hash.startsWith('#course-')) {
          courseId = hash.replace('#course-', '');
        }
        if (courseId) {
          setActivePage('course_detail');
          setActiveNavId('nav-courses');
          findCourseByIdLazy(courseId, courses)
            .then((matched) => {
              if (matched) setSelectedCourse(matched);
            })
            .catch(() => {});
          loadRegionalSeo().then(setRegionalSeoMod).catch(() => {});
          return;
        }
      }

      const urlParams = new URLSearchParams(window.location.search);
      const catalogParam = urlParams.get('catalog');

      if (
        catalogParam === 'enterprise' ||
        catalogParam === 'cisco' ||
        pathname === '/cisco-training' ||
        pathname === '/cisco-training/' ||
        pathname === '/cisco' ||
        pathname === '/cisco/' ||
        hash === '#cisco-training' ||
        hash === '#cisco'
      ) {
        setActivePage('cisco_training');
        setActiveNavId('nav-cisco');
      } else if (pathname === '/courses' || hash === '#courses') {
        setActivePage('courses');
        setActiveNavId('nav-courses');
      } else if (pathname === '/about' || hash === '#about') {
        setActivePage('about');
        setActiveNavId('nav-about');
      } else if (pathname === '/corporate-training' || hash === '#corporate-training' || pathname === '/corporate' || hash === '#corporate') {
        setActivePage('corporate_training');
        setActiveNavId('nav-corp-training');
      } else if (pathname === '/contact' || hash === '#contact') {
        setActivePage('contact');
        setActiveNavId('nav-contact');
      } else if (pathname === '/privacy' || hash === '#privacy') {
        setActivePage('privacy');
      } else if (pathname === '/' || pathname === '') {
        setActivePage('home');
        setActiveNavId('nav-home');
      }
    };

    checkAdminAndCiscoRoutes();
    window.addEventListener('popstate', checkAdminAndCiscoRoutes);
    window.addEventListener('hashchange', checkAdminAndCiscoRoutes);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('popstate', checkAdminAndCiscoRoutes);
      window.removeEventListener('hashchange', checkAdminAndCiscoRoutes);
    };
  }, []);

  // Sync course catalog whenever Cisco authorization changes (only when courses are in use)
  useEffect(() => {
    if (courses.length > 0 || activePage === 'courses' || activePage === 'cisco_training' || activePage === 'course_detail') {
      fetchCourses(undefined, undefined, isCiscoAuthorized).then((coursesRes) => {
        if (coursesRes && coursesRes.length > 0) {
          setCourses(coursesRes);
        }
      });
    }
    if (
      !regionalSeoMod &&
      (activePage === 'courses' ||
        activePage === 'country_hub' ||
        activePage === 'regional_course' ||
        activePage === 'course_detail')
    ) {
      loadRegionalSeo().then(setRegionalSeoMod).catch(() => {});
    }
  }, [isCiscoAuthorized, activePage, regionalSeoMod]);

  // Safety guard: allow direct /course/course-cisco-* URLs for SEO/sitemap, only block accidental non-enterprise modal selection
  useEffect(() => {
    if (!isCiscoAuthorized && selectedCourse) {
      const isDirectCiscoUrl =
        typeof window !== 'undefined' &&
        (window.location.pathname.toLowerCase().startsWith('/course/course-cisco') ||
          window.location.hash.toLowerCase().startsWith('#course-course-cisco'));
      if (isDirectCiscoUrl) return;
      const isCisco =
        (selectedCourse.certificationVendor || '').toLowerCase() === 'cisco' ||
        (selectedCourse.domain || '').toLowerCase() === 'cisco networking' ||
        selectedCourse.id.toLowerCase().startsWith('course-cisco');
      if (isCisco) {
        setSelectedCourse(null);
        setActivePage('courses');
      }
    }
  }, [isCiscoAuthorized, selectedCourse]);

  // Global scroll-to-top on route or course change (defeats mobile layout-shift & scroll-anchoring drops)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Secondary frame check for lazy-loaded component stabilization
    const frameId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 60);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [activePage, selectedCourse?.id, selectedRegionalCourse?.slug, regionalRegion, selectedBlog?.slug, selectedExamPrep?.slug]);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoginModalOpen(false);
    setIsCmsDrawerOpen(true);
  };

  const handleCloseCmsDrawer = () => {
    setIsCmsDrawerOpen(false);
    // Reset route URL if currently on admin route
    if (window.location.pathname.includes('/admin-secure-portal') || window.location.hash === '#admin-secure-portal') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleCloseAdminLogin = () => {
    setIsAdminLoginModalOpen(false);
    if (window.location.pathname.includes('/admin-secure-portal') || window.location.hash === '#admin-secure-portal') {
      window.history.pushState(null, '', '/');
    }
  };

  const ensureCoursesLoaded = () => {
    if (courses.length === 0) {
      fetchCourses(undefined, undefined, isCiscoAuthorized).then((coursesRes) => {
        if (coursesRes && coursesRes.length > 0) {
          setCourses(coursesRes);
        }
      }).catch(() => {});
    }
  };

  const loadBlogBySlug = React.useCallback(async (slug: string) => {
    setIsLoadingBlogDetail(true);
    try {
      const detail = await fetchBlogDetail(slug);
      setSelectedBlog(detail);
    } catch (err) {
      console.warn('Blog detail load warning:', err);
      setSelectedBlog(null);
    } finally {
      setIsLoadingBlogDetail(false);
    }
  }, []);

  const loadAllData = async () => {
    try {
      // 1. Non-blocking background CMS sync (page is already rendered with initialCmsData)
      fetchCmsData().then((cmsRes) => {
        if (cmsRes) {
          setCmsData(cmsRes);
        }
      }).catch(() => {});

      // 1b. Lightweight Blog Metadata Index (~2KB, full articles load on-demand)
      if (getHydratedBlogSummaries().length === 0) {
        setIsLoadingBlogs(true);
      }
      fetchBlogSummaries()
        .then((summariesRes) => {
          if (Array.isArray(summariesRes) && summariesRes.length > 0) {
            setBlogSummaries(summariesRes);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoadingBlogs(false));

      // 2. Only fetch admin leads and Supabase status if administrator is authenticated
      const isAdminAuth = typeof window !== 'undefined' && localStorage.getItem('learnify_admin_authenticated') === 'true';
      if (isAdminAuth) {
        fetchLeads().then((leadsRes) => {
          if (leadsRes) setLeads(leadsRes);
        }).catch(() => {});
        getSupabaseStatus().then((spStatus) => {
          if (spStatus) setSupabaseStatus(spStatus);
        }).catch(() => {});
      }

      // 3. If user landed directly on courses or cisco route, load course catalog immediately;
      // otherwise, defer course catalog hydration until browser is completely idle
      const initialPath = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
      const initialHash = typeof window !== 'undefined' ? window.location.hash.toLowerCase() : '';
      const initialParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const initialCatalog = initialParams?.get('catalog');
      const isCourseRoute =
        initialCatalog === 'enterprise' ||
        initialCatalog === 'cisco' ||
        initialPath.includes('course') ||
        initialPath.includes('cisco') ||
        initialHash.includes('course') ||
        initialHash.includes('cisco');

      if (isCourseRoute) {
        fetchCourses(undefined, undefined, isCiscoAuthorized).then((coursesRes) => {
          if (coursesRes && coursesRes.length > 0) {
            setCourses(coursesRes);
            setSelectedCourse((prev) => {
              if (!prev) return null;
              return coursesRes.find((c) => c.id === prev.id) || prev;
            });
          }
        }).catch(() => {});
      } else {
        const loadIdleCourses = () => {
          fetchCourses(undefined, undefined, isCiscoAuthorized).then((coursesRes) => {
            if (coursesRes && coursesRes.length > 0) {
              setCourses(coursesRes);
            }
          }).catch(() => {});
        };

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadIdleCourses, { timeout: 3500 });
        } else {
          setTimeout(loadIdleCourses, 2500);
        }
      }
    } catch (err) {
      console.warn('Initial data load warning:', err);
    }
  };

  const handleOpenAdvisorModal = (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info' = 'advisor',
    domain: string = 'General'
  ) => {
    ensureCoursesLoaded();
    setAdvisorInquiryType(type);
    setSelectedDomainForAdvisor(domain);
    setIsAdvisorModalOpen(true);
  };

  const handleOpenCoursesModal = (domain: string = 'all') => {
    ensureCoursesLoaded();
    if (domain.toLowerCase().includes('cisco')) {
      setActivePage('cisco_training');
      setActiveNavId('nav-cisco');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setFilterDomainForCourses(domain);
    setActivePage('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavLinkClick = (link: { id: string; href: string; label?: string }) => {
    setActiveNavId(link.id);

    if (link.id === 'nav-about' || link.href === '#about' || link.label === 'About') {
      setActivePage('about');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'nav-home' || link.href === '#home' || link.label === 'Home') {
      setActivePage('home');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      link.id === 'nav-cisco' ||
      link.href === '#cisco-training' ||
      link.href === '#cisco' ||
      link.label === 'Cisco Training' ||
      link.label === 'Cisco'
    ) {
      ensureCoursesLoaded();
      setActivePage('cisco_training');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/cisco-training');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.href === '#courses' || link.id === 'nav-courses' || link.label === 'Courses') {
      ensureCoursesLoaded();
      setActivePage('courses');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      link.id === 'nav-blogs' ||
      link.href === '#blogs' ||
      link.href === '/blogs' ||
      link.label === 'Blogs'
    ) {
      navigateToBlogsHub();
      return;
    }

    if (
      link.id === 'nav-exam-prep' ||
      link.href === '/exam-prep' ||
      link.href === '#exam-prep' ||
      link.label === 'Exam Prep'
    ) {
      navigateToExamPrepHub();
      return;
    }

    if (
      link.href === '#corporate' ||
      link.id === 'nav-corporate' ||
      link.label === 'Corporate Training'
    ) {
      setActivePage('corporate_training');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/corporate-training');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.href === '#contact' || link.id === 'nav-contact' || link.label === 'Contact Us') {
      setActivePage('contact');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // For any section links if currently on another page, switch to Home first
    if (activePage !== 'home') {
      setActivePage('home');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
      setTimeout(() => {
        if (link.href.startsWith('#')) {
          const elem = document.querySelector(link.href);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return;
    }

    if (link.href.startsWith('#')) {
      const elem = document.querySelector(link.href);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectDomain = (domain: TechDomain) => {
    if (
      domain.id === 'domain-cisco' ||
      domain.name.toLowerCase().includes('cisco') ||
      domain.iconName === 'cisco'
    ) {
      setActivePage('cisco_training');
      setActiveNavId('nav-cisco');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/cisco-training');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    handleOpenCoursesModal(domain.name);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActivePage('course_detail');
    if (typeof window !== 'undefined') window.history.pushState(null, '', `/course/${course.id}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToRegionalHub = (region: RegionCode) => {
    setRegionalRegion(region);
    setSelectedRegionalCourse(null);
    setActivePage('country_hub');
    setActiveNavId('nav-courses');
    if (typeof window !== 'undefined') window.history.pushState(null, '', `/${region}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    loadRegionalSeo().then(setRegionalSeoMod).catch(() => {});
  };

  const navigateToRegionalCourse = (page: ResolvedRegionalCoursePage) => {
    setRegionalRegion(page.region.code);
    setSelectedRegionalCourse(page);
    setActivePage('regional_course');
    setActiveNavId('nav-courses');
    if (typeof window !== 'undefined') window.history.pushState(null, '', `/${page.region.code}/${page.slug}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    loadRegionalSeo().then(setRegionalSeoMod).catch(() => {});
  };

  const navigateToRegionalPath = (path: string) => {
    loadRegionalSeo()
      .then((mod) => {
        setRegionalSeoMod(mod);
        const match = mod.resolveRegionalRoute(path);
        if (!match) return;
        if (match.type === 'hub') {
          navigateToRegionalHub(match.region.code);
        } else {
          navigateToRegionalCourse(match.page);
        }
      })
      .catch(() => {});
  };

  const navigateToBlogsHub = () => {
    setSelectedBlog(null);
    setActivePage('blogs_hub');
    setActiveNavId('nav-blogs');
    if (blogSummaries.length === 0) {
      setIsLoadingBlogs(true);
      fetchBlogSummaries()
        .then((res) => {
          if (Array.isArray(res) && res.length > 0) setBlogSummaries(res);
        })
        .catch(() => {})
        .finally(() => setIsLoadingBlogs(false));
    }
    if (typeof window !== 'undefined') window.history.pushState(null, '', '/blogs');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToBlogSlug = (slug: string) => {
    setIsLoadingBlogDetail(true);
    setSelectedBlog(null);
    setActivePage('blog_detail');
    setActiveNavId('nav-blogs');
    if (typeof window !== 'undefined') window.history.pushState(null, '', `/blogs/${slug}`);
    loadBlogBySlug(slug);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToExamPrepHub = () => {
    setSelectedExamPrep(null);
    setActivePage('exam_prep_hub');
    setActiveNavId('nav-exam-prep');
    if (typeof window !== 'undefined') window.history.pushState(null, '', '/exam-prep');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToExamPrepSlug = (slug: string) => {
    const matched = getExamPrepMetaBySlug(slug);
    setSelectedExamPrep(matched);
    setActivePage('exam_prep_detail');
    setActiveNavId('nav-exam-prep');
    if (typeof window !== 'undefined') window.history.pushState(null, '', `/exam-prep/${slug}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToInternalHref = (href: string) => {
    const cleanHref = (href || '').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
    if (cleanHref.startsWith('/course/')) {
      const courseId = cleanHref.slice('/course/'.length);
      findCourseByIdLazy(courseId, courses)
        .then((matched) => {
          if (matched) {
            ensureCoursesLoaded();
            handleSelectCourse(matched);
          } else {
            handleOpenCoursesModal('all');
          }
        })
        .catch(() => handleOpenCoursesModal('all'));
      return;
    }
    if (cleanHref === '/courses') {
      ensureCoursesLoaded();
      setActivePage('courses');
      setActiveNavId('nav-courses');
      if (typeof window !== 'undefined') window.history.pushState(null, '', '/courses');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    if (cleanHref === '/exam-prep') {
      navigateToExamPrepHub();
      return;
    }
    if (cleanHref.startsWith('/exam-prep/')) {
      const slug = cleanHref.slice('/exam-prep/'.length);
      if (slug) navigateToExamPrepSlug(slug);
      return;
    }
    if (cleanHref.startsWith('/blogs/')) {
      const slug = cleanHref.slice('/blogs/'.length);
      if (slug) navigateToBlogSlug(slug);
      return;
    }
    if (cleanHref === '/blogs') {
      navigateToBlogsHub();
      return;
    }
    navigateToRegionalPath(cleanHref);
  };

  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-orange-200 selection:text-[#152e4d]">
      <header className="sticky top-0 z-50 flex flex-col w-full shadow-xs">
        {/* 1. Top Contact Bar & Summit Announcement */}
        <TopBanner
          text={cmsData.topBanner.text}
          linkText={cmsData.topBanner.linkText}
          href={cmsData.topBanner.href}
          phoneNumber={cmsData.topBanner.phoneNumber}
          email={cmsData.topBanner.email}
          enabled={cmsData.topBanner.enabled}
          onAction={() => handleOpenAdvisorModal('advisor')}
        />

        {/* 2. Main Navigation Bar */}
        <Navbar
          isAdminAuthenticated={isAdminAuthenticated}
          logoTitle={cmsData.navigation.logoTitle}
          logoSubtitle={cmsData.navigation.logoSubtitle}
          links={displayedNavLinks}
          ctaLabel={cmsData.navigation.ctaButton.label}
          onCtaClick={() => handleOpenAdvisorModal('advisor')}
          onSearchClick={() => setIsSearchModalOpen(true)}
          onOpenCmsAdmin={() => setIsCmsDrawerOpen(true)}
          onNavLinkClick={handleNavLinkClick}
          activeNavId={activePage === 'about' ? 'nav-about' : activeNavId}
        />
      </header>

      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          {activePage === 'about' ? (
            /* Dedicated About Us Page */
            <AboutView
              data={cmsData.aboutPage}
              onRequestQuote={() => handleOpenAdvisorModal('corporate_quote')}
              onExploreCourses={() => handleOpenCoursesModal('all')}
            />
          ) : activePage === 'cisco_training' ? (
            /* Dedicated Cisco Certification Training Page */
            <CiscoTrainingView
              courses={courses}
              onSelectCourse={handleSelectCourse}
              onOpenAdvisorModal={handleOpenAdvisorModal}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : activePage === 'courses' ? (
            /* Dedicated Courses Page */
            <CoursesView
              courses={displayedCourses}
              onSelectCourse={handleSelectCourse}
              onOpenAdvisorModal={handleOpenAdvisorModal}
              onNavigateToCisco={() => {
                setActivePage('cisco_training');
                setActiveNavId('nav-cisco');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isCiscoAuthorized={isCiscoAuthorized}
            />
          ) : activePage === 'country_hub' ? (
            /* Dedicated Regional Country Hub Page (/ae or /za) */
            <CountryHubView
              regionCode={regionalRegion}
              onNavigateRegionalCourse={navigateToRegionalCourse}
              onSwitchRegion={navigateToRegionalHub}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateGuides={navigateToBlogsHub}
              onOpenAdvisorModal={handleOpenAdvisorModal}
            />
          ) : activePage === 'blogs_hub' ? (
            /* Dedicated High-Demand Blogs Hub (/blogs) */
            <BlogsHubView
              summaries={blogSummaries}
              isLoading={isLoadingBlogs}
              isAdminAuthenticated={isAdminAuthenticated}
              onOpenBlogPublisher={() => {
                setCmsDrawerInitialTab('blogs');
                setIsCmsDrawerOpen(true);
              }}
              onSelectBlog={navigateToBlogSlug}
              onNavigateHub={navigateToRegionalHub}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAdvisorModal={handleOpenAdvisorModal}
            />
          ) : activePage === 'blog_detail' ? (
            /* Dedicated Blog Post (/blogs/:slug) */
            <BlogDetailView
              post={selectedBlog}
              isLoading={isLoadingBlogDetail}
              summaries={blogSummaries}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateBlogs={navigateToBlogsHub}
              onSelectBlog={navigateToBlogSlug}
              onNavigateHub={navigateToRegionalHub}
              onNavigateLink={navigateToInternalHref}
              onOpenAdvisorModal={handleOpenAdvisorModal}
            />
          ) : activePage === 'exam_prep_hub' ? (
            /* Dedicated High-Impression Exam Prep Directory (/exam-prep) */
            <ExamPrepHubView
              onSelectResource={navigateToExamPrepSlug}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateLink={navigateToInternalHref}
              onOpenAdvisorModal={handleOpenAdvisorModal}
            />
          ) : activePage === 'exam_prep_detail' ? (
            /* Dedicated Exam Prep Resource (/exam-prep/:slug) */
            <ExamPrepDetailView
              resource={selectedExamPrep}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateHub={navigateToExamPrepHub}
              onSelectResource={navigateToExamPrepSlug}
              onNavigateLink={navigateToInternalHref}
              onLeadSubmitted={() => {
                if (localStorage.getItem('learnify_admin_authenticated') === 'true') {
                  fetchLeads().then((res) => setLeads(res)).catch(() => {});
                }
              }}
              onOpenAdvisorModal={handleOpenAdvisorModal}
            />
          ) : activePage === 'regional_course' ? (
            selectedRegionalCourse ? (
              /* Dedicated Country x Course SEO Page (/ae/:slug or /za/:slug) */
              <RegionalCourseView
                page={selectedRegionalCourse}
                onNavigateHome={() => {
                  setActivePage('home');
                  setActiveNavId('nav-home');
                  if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateHub={navigateToRegionalHub}
                onNavigateGuides={navigateToBlogsHub}
                onNavigateGlobalCourse={(courseId) => {
                  findCourseByIdLazy(courseId, courses).then((matched) => {
                    if (matched) handleSelectCourse(matched);
                  }).catch(() => {});
                }}
                onSwitchCourseRegion={(targetRegion, courseId) => {
                  loadRegionalSeo()
                    .then((mod) => {
                      const meta = mod.TARGET_REGIONAL_COURSES.find((c) => c.courseId === courseId);
                      if (!meta) return;
                      const built = mod.buildRegionalCoursePage(meta, targetRegion);
                      if (built) navigateToRegionalCourse(built);
                    })
                    .catch(() => {});
                }}
                onNavigateRegionalCourse={navigateToRegionalCourse}
                onNavigateLink={navigateToInternalHref}
                onSubmitLead={async (data) => {
                  try {
                    await submitLead(data);
                    const updatedLeads = await fetchLeads();
                    setLeads(updatedLeads);
                  } catch (err) {
                    console.error('Failed to submit lead:', err);
                  }
                }}
              />
            ) : (
              <LoadingFallback />
            )
          ) : activePage === 'course_detail' ? (
            selectedCourse ? (
              /* Dedicated Course Detail Page */
              <CourseDetailView
                course={selectedCourse}
                onBack={() => {
                  setActivePage('courses');
                  if (typeof window !== 'undefined') window.history.pushState(null, '', '/courses');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigate={(page) => {
                  setActivePage(page as any);
                }}
                onNavigateRegionalPath={navigateToRegionalPath}
                onNavigateLink={navigateToInternalHref}
                onSubmitLead={async (data) => {
                  try {
                    await submitLead(data);
                    const updatedLeads = await fetchLeads();
                    setLeads(updatedLeads);
                  } catch (err) {
                    console.error('Failed to submit lead:', err);
                  }
                }}
              />
            ) : (
              <LoadingFallback />
            )
          ) : activePage === 'corporate_training' ? (
            /* Corporate Training Complete Flow */
            <CorporateTrainingView 
              corporateSection={cmsData.corporateTrainingSection}
              onOpenAdvisorModal={handleOpenAdvisorModal} 
              onNavigate={(page) => {
                setActivePage(page as any);
                if (page === 'about') setActiveNavId('nav-about');
                else if (page === 'courses') setActiveNavId('nav-courses');
                else if (page === 'corporate_training') setActiveNavId('nav-corporate');
                else if (page === 'contact') setActiveNavId('nav-contact');
                else if (page === 'home') setActiveNavId('nav-home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : activePage === 'contact' ? (
            /* Contact Us Page */
            <ContactView
              onNavigate={(page) => {
                setActivePage(page as any);
              }}
              onSubmitLead={async (data) => {
                try {
                  await submitLead(data);
                  const updatedLeads = await fetchLeads();
                  setLeads(updatedLeads);
                } catch (err) {
                  console.error('Failed to submit lead:', err);
                }
              }} 
              isCiscoAuthorized={isCiscoAuthorized}
            />
          ) : activePage === 'privacy' ? (
            /* Privacy Policy Page */
            <PrivacyPolicyView 
              onBack={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              onSubmitLead={async (data) => {
                try {
                  await submitLead(data);
                  const updatedLeads = await fetchLeads();
                  setLeads(updatedLeads);
                } catch (err) {
                  console.error('Failed to submit lead:', err);
                }
              }} 
            />
          ) : (
            /* Homepage Complete Flow */
            <>
              {/* 3. Hero Section */}
              <HeroSection
                headline={cmsData.hero.headline}
                description={cmsData.hero.description}
                primaryCtaLabel={cmsData.hero.primaryCta.label}
                secondaryCtaLabel={cmsData.hero.secondaryCta.label}
                onPrimaryCta={() => handleOpenCoursesModal('all')}
                onSecondaryCta={() => handleOpenAdvisorModal('advisor')}
                imageUrl={cmsData.hero.imageUrl}
                imageAlt={cmsData.hero.imageAlt}
              />

              {/* 4. Stats Banner */}
              <StatsBar stats={cmsData.stats} />

              <div className="defer-render">
                {/* 5. Elevate Team's Performance Section */}
                <PerformanceSection
                  title={cmsData.performanceSection.title}
                  description={cmsData.performanceSection.description}
                  ctaLabel={cmsData.performanceSection.ctaButton.label}
                  onCtaClick={() => handleOpenAdvisorModal('corporate_quote')}
                />

                {/* 6. Who We Are Section */}
                <WhoWeAreSection
                  title={cmsData.whoWeAreSection.title}
                  description={cmsData.whoWeAreSection.description}
                  cards={cmsData.whoWeAreSection.cards}
                  ctaLabel={cmsData.whoWeAreSection.ctaButton.label}
                  onCtaClick={() => {
                    setActivePage('about');
                    setActiveNavId('nav-about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Verified Live & Onsite Training Proofs */}
                <TrainingProofSection onOpenAdvisorModal={handleOpenAdvisorModal} />

                {/* What Corporate Teams Say Testimonials */}
                <TestimonialsSection 
                  testimonialsTitle={cmsData.testimonialsTitle} 
                  testimonialsSubtitle={cmsData.testimonialsSubtitle} 
                  testimonials={cmsData.testimonials} 
                />

                {/* 7. Exploring Your Learning Options */}
                <LearningOptionsSection
                  title={cmsData.learningOptionsSection.title}
                  cards={cmsData.learningOptionsSection.cards}
                  onSelectOption={(opt) => handleOpenAdvisorModal('advisor', opt.title)}
                />

                {/* 8. Why Choose Learnify? */}
                <WhyChooseSection
                  title={cmsData.whyChooseSection.title}
                  subtitle={cmsData.whyChooseSection.subtitle}
                  cards={cmsData.whyChooseSection.cards}
                />

                {/* 9. Explore Technology Domains */}
                <TechDomainsSection
                  title={cmsData.techDomainsSection.title}
                  subtitle={cmsData.techDomainsSection.subtitle}
                  viewAllText={cmsData.techDomainsSection.viewAllText}
                  viewAllHref={cmsData.techDomainsSection.viewAllHref}
                  domains={displayedDomains}
                  onSelectDomain={handleSelectDomain}
                  onViewAll={() => handleOpenCoursesModal('all')}
                />

                {/* 10. Pathway to Excellence Progress Bar */}
                <PathwaySection
                  title={cmsData.pathwaySection.title}
                  subtitle={cmsData.pathwaySection.subtitle}
                  steps={cmsData.pathwaySection.steps}
                />

                {/* 10a. Homepage High-Demand Exam Prep & Calculators Section */}
                <ExamPrepSection
                  onSelectResource={navigateToExamPrepSlug}
                  onViewExamPrepHub={navigateToExamPrepHub}
                />

                {/* 10b. Homepage Editorial Certification Blogs Section */}
                <BlogSection
                  summaries={blogSummaries}
                  isLoading={isLoadingBlogs}
                  onSelectBlog={navigateToBlogSlug}
                  onViewAllBlogs={navigateToBlogsHub}
                />

                {/* 11. Final CTA Banner */}
                <FinalCtaSection
                  title={cmsData.finalCtaSection.title}
                  subtitle={cmsData.finalCtaSection.subtitle}
                  primaryCtaLabel={cmsData.finalCtaSection.primaryCta.label}
                  secondaryCtaLabel={cmsData.finalCtaSection.secondaryCta.label}
                  onPrimaryCta={() => handleOpenCoursesModal('all')}
                  onSecondaryCta={() => handleOpenAdvisorModal('demo')}
                />
              </div>
            </>
          )}
        </Suspense>
      </main>

      {/* 12. Footer */}
      <Suspense fallback={null}>
        <Footer
          brandName={cmsData.footer.brandName}
          description={cmsData.footer.description}
          copyright={cmsData.footer.copyright}
          columns={cmsData.footer.columns}
          onLinkClick={(link) => {
            if (link.label === 'About' || link.href === '#about') {
              setActivePage('about');
              setActiveNavId('nav-about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (link.label === 'Home' || link.href === '#home' || link.label === 'Learnify') {
              setActivePage('home');
              setActiveNavId('nav-home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (
              link.label === 'Cisco Training' ||
              link.href === '#cisco-training' ||
              link.href === '#cisco' ||
              link.label === 'Cisco'
            ) {
              setActivePage('cisco_training');
              setActiveNavId('nav-cisco');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (link.href === '#courses' || link.label === 'Courses' || link.label === 'Learning' || link.href === '#solutions') {
              handleOpenCoursesModal('all');
            } else if (link.href === '#contact' || link.label === 'Contact' || link.label === 'Contact Us') {
              setActivePage('contact');
              setActiveNavId('nav-contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (link.href === '#corporate' || link.label === 'Corporate Training') {
              setActivePage('corporate_training');
              setActiveNavId('nav-corporate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (link.href?.startsWith('/') && detectRegionalPathSync(link.href)) {
              navigateToRegionalPath(link.href);
            } else if (link.label === 'UK Training' || link.label === 'UK Hub') {
              navigateToRegionalHub('uk');
            } else if (link.label === 'Europe Training' || link.label === 'Europe Hub') {
              navigateToRegionalHub('eu');
            } else if (link.label === 'Germany Training' || link.label === 'Germany Hub') {
              navigateToRegionalHub('de');
            } else if (link.label === 'Netherlands Training' || link.label === 'Netherlands Hub') {
              navigateToRegionalHub('nl');
            } else if (link.label === 'UAE Training' || link.label === 'UAE Hub') {
              navigateToRegionalHub('ae');
            } else if (link.label === 'South Africa Training' || link.label === 'South Africa Hub') {
              navigateToRegionalHub('za');
            } else if (
              link.href === '/blogs' ||
              link.href === '#blogs' ||
              link.href === '/guides' ||
              link.label === 'Blogs' ||
              link.label === 'Blogs & Exam Centers' ||
              link.label === 'Guides & Exam Centers'
            ) {
              navigateToBlogsHub();
            } else if (
              link.href === '/exam-prep' ||
              link.href === '#exam-prep' ||
              link.label === 'Exam Prep' ||
              link.label === 'Exam Prep Hub'
            ) {
              navigateToExamPrepHub();
            } else if (link.href === '#privacy' || link.label === 'Privacy Policy') {
              setActivePage('privacy');
              setActiveNavId('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          isCiscoAuthorized={isCiscoAuthorized}
        />
      </Suspense>

      {/* Interactive Lazy-loaded Modals */}
      <Suspense fallback={null}>
        {isAdminLoginModalOpen && (
          <AdminLoginModal
            isOpen={isAdminLoginModalOpen}
            onClose={handleCloseAdminLogin}
            onLoginSuccess={handleAdminLoginSuccess}
          />
        )}

        {isAdvisorModalOpen && (
          <AdvisorModal
            isOpen={isAdvisorModalOpen}
            onClose={() => setIsAdvisorModalOpen(false)}
            inquiryType={advisorInquiryType}
            defaultDomain={selectedDomainForAdvisor}
            onLeadSubmitted={() => {
              fetchLeads().then((res) => setLeads(res));
            }}
            isCiscoAuthorized={isCiscoAuthorized}
          />
        )}

        {isCoursesModalOpen && (
          <CoursesModal
            isOpen={isCoursesModalOpen}
            onClose={() => setIsCoursesModalOpen(false)}
            courses={displayedCourses}
            initialDomain={filterDomainForCourses}
            onSelectCourse={handleSelectCourse}
            isCiscoAuthorized={isCiscoAuthorized}
          />
        )}

        {isSearchModalOpen && (
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            courses={displayedCourses}
            domains={displayedDomains}
            onSelectCourse={handleSelectCourse}
            onSelectDomain={handleSelectDomain}
            isCiscoAuthorized={isCiscoAuthorized}
          />
        )}

        {isCmsDrawerOpen && (
          <BackendCmsDrawer
            isOpen={isCmsDrawerOpen}
            onClose={() => {
              setCmsDrawerInitialTab('visual');
              handleCloseCmsDrawer();
            }}
            cmsData={cmsData}
            onCmsUpdated={(newData) => setCmsData(newData)}
            courses={courses}
            onCoursesUpdated={(newCourses) => setCourses(newCourses)}
            leads={leads}
            supabaseStatus={supabaseStatus}
            initialTab={cmsDrawerInitialTab}
            blogSummaries={blogSummaries}
            onBlogsUpdated={(newSummaries) => setBlogSummaries(newSummaries)}
            onRefreshLeads={() => {
              fetchLeads().then((res) => setLeads(res));
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
