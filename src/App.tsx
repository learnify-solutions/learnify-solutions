import React, { useState, useEffect, Suspense, lazy } from 'react';
import { initialCmsData } from './data/defaultCmsData';
import { sampleCourses } from './data/coursesData';
import { CmsData, Course, TechDomain, LeadSubmission } from './types';
import {
  fetchCmsData,
  fetchCourses,
  fetchLeads,
  submitLead,
  getSupabaseStatus,
} from './services/cmsService';
import { useSEO } from './lib/useSEO';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { LoadingFallback } from './components/LoadingFallback';
import { Settings, Database } from 'lucide-react';

// Code Splitting / Lazy Loading for optimum bundle size and performance
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
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    const catalog = searchParams.get('catalog')?.toLowerCase();
    const tier = searchParams.get('tier')?.toLowerCase();
    const access = searchParams.get('access')?.toLowerCase();
    const view = searchParams.get('view')?.toLowerCase();
    const track = searchParams.get('track')?.toLowerCase();
    const ref = searchParams.get('ref')?.toLowerCase();
    const partner = searchParams.get('partner')?.toLowerCase();

    const isEnterpriseParam =
      catalog === 'enterprise' ||
      catalog === 'full' ||
      catalog === 'all' ||
      catalog === 'corporate' ||
      catalog === 'cisco' ||
      tier === 'enterprise' ||
      tier === 'corporate' ||
      access === 'corporate' ||
      access === 'enterprise' ||
      access === 'full' ||
      view === 'enterprise' ||
      view === 'extended' ||
      view === 'full' ||
      view === 'cisco' ||
      track === 'networking' ||
      track === 'infrastructure' ||
      track === 'cisco' ||
      ref === 'corporate' ||
      ref === 'enterprise' ||
      ref === 'partner' ||
      partner === 'cisco';

    const isEnterprisePath =
      path === '/enterprise-catalog' ||
      path === '/enterprise-catalog/' ||
      path === '/networking-catalog' ||
      path === '/cisco' ||
      path === '/cisco/' ||
      path === '/cisco-training' ||
      path === '/cisco-training/' ||
      path === '/cisco-catalog' ||
      path === '/cisco-catalog/' ||
      path.startsWith('/cisco/');

    const isEnterpriseHash =
      hash === '#enterprise-catalog' ||
      hash === '#networking' ||
      hash === '#enterprise' ||
      hash === '#all-courses' ||
      hash === '#infrastructure' ||
      hash === '#cisco' ||
      hash === '#cisco-training' ||
      hash === '#cisco-catalog';

    return Boolean(isEnterpriseParam || isEnterprisePath || isEnterpriseHash);
  } catch {
    return false;
  }
}

  // Gated Cisco Training Authorization State (Pure URL / In-Memory - Zero SessionStorage)
  const [isCiscoAuthorized, setIsCiscoAuthorized] = useState<boolean>(() => {
    // Force purge any legacy session or local storage keys left over from previous browser sessions/tabs
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('learnify_show_cisco');
        localStorage.removeItem('learnify_show_cisco');
      } catch {}
    }
    return checkIsEnterpriseUrl();
  });

  const [activePage, setActivePage] = useState<
    'home' | 'about' | 'courses' | 'course_detail' | 'corporate_training' | 'contact' | 'privacy' | 'cisco_training'
  >(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/course/') || hash.startsWith('#course-')) {
        return 'course_detail';
      }
      if (
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

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      let courseId = '';
      if (path.startsWith('/course/')) {
        courseId = path.replace('/course/', '').replace(/\/$/, '');
      } else if (hash.startsWith('#course-')) {
        courseId = hash.replace('#course-', '');
      }
      if (courseId) {
        return sampleCourses.find((c) => c.id.toLowerCase() === courseId.toLowerCase()) || null;
      }
    }
    return null;
  });

  const [activeNavId, setActiveNavId] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/course/') || hash.startsWith('#course-')) {
        return 'nav-courses';
      }
      if (
        path === '/cisco-training' ||
        path === '/cisco-training/' ||
        path === '/cisco' ||
        path === '/cisco/' ||
        hash === '#cisco-training' ||
        hash === '#cisco'
      ) {
        return 'nav-cisco';
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

  // Filter navigation links based on Cisco authorization status
  const displayedNavLinks = React.useMemo(() => {
    const rawLinks = cmsData.navigation?.links || [];
    if (isCiscoAuthorized) {
      const hasCisco = rawLinks.some(
        (l) => l.id === 'nav-cisco' || l.label.toLowerCase().includes('cisco')
      );
      if (!hasCisco) {
        const coursesIdx = rawLinks.findIndex(
          (l) => l.id === 'nav-courses' || l.label.toLowerCase() === 'courses'
        );
        const ciscoLink = { id: 'nav-cisco', label: 'Cisco Training', href: '#cisco-training' };
        if (coursesIdx >= 0) {
          const updated = [...rawLinks];
          updated.splice(coursesIdx + 1, 0, ciscoLink);
          return updated;
        }
        return [...rawLinks, ciscoLink];
      }
      return rawLinks;
    }

    // Gated: on normal URLs, never show Cisco link in navigation
    return rawLinks.filter(
      (l) =>
        l.id !== 'nav-cisco' &&
        !l.label.toLowerCase().includes('cisco') &&
        l.href !== '#cisco-training' &&
        l.href !== '#cisco'
    );
  }, [cmsData.navigation?.links, isCiscoAuthorized]);

  // Dynamic SEO Configuration for Top Google Ranking across every section & course
  const isAdminAuthenticated = localStorage.getItem('learnify_admin_authenticated') === 'true';

  const seoConfig = React.useMemo(() => {
    switch (activePage) {
      case 'about':
        return {
          title: 'About Us | Learnify Solutions - Authorized Global IT Training Ecosystem',
          description:
            'Discover Learnify Solutions’ mission, leadership, and ISO-certified training frameworks empowering global enterprise tech workforces across USA, UK, UAE, Africa & India.',
          keywords:
            'about Learnify Solutions, enterprise IT training organization, tech upskilling leadership, corporate training partner, global IT academy',
          canonicalUrl: 'https://learnify-solutions.com/about',
          ogUrl: 'https://learnify-solutions.com/about',
        };
      case 'cisco_training':
        return {
          title: 'Cisco Authorized Certification Training (CCNA, CCNP, DevNet, Security) | Learnify Solutions',
          description:
            'Authorized Cisco training: CCNA (200-301), CCNP Enterprise (ENCOR, ENARSI), SD-WAN, CCNP Security (SCOR, ISE), Data Center & DevNet with hands-on lab pods.',
          keywords:
            'Cisco training partner, Cisco certifications, CCNA 200-301, CCNP ENCOR 350-401, CCNP ENARSI 300-410, Cisco SD-WAN course, CCNP Security SCOR, Cisco lab training Dubai, Learnify Solutions',
          canonicalUrl: 'https://learnify-solutions.com/cisco-training',
          ogUrl: 'https://learnify-solutions.com/cisco-training',
        };
      case 'courses':
        return {
          title: 'IT & Cloud Certification Courses Catalog (Microsoft, Cisco, CompTIA, AWS) | Learnify Solutions',
          description: isCiscoAuthorized
            ? 'Browse 50+ official certification courses in Microsoft Azure, Cisco CCNA/CCNP, CompTIA Security+, AWS Cloud, DevOps, and Cybersecurity. 1-on-1 live mentorship & corporate batches.'
            : 'Browse 50+ official certification courses in Microsoft Azure, CompTIA Security+, AWS Cloud, DevOps, Kubernetes, and Cybersecurity. 1-on-1 live mentorship & corporate batches.',
          keywords: isCiscoAuthorized
            ? 'IT courses catalog, Microsoft certification training, Azure AZ-104, Cisco CCNA 200-301, Cisco CCNP ENCOR, CompTIA Security+ SY0-701, CompTIA A+, AWS Solutions Architect, Kubernetes CKA, CEH v12, IT training Dubai, UK London IT bootcamps, USA IT training'
            : 'IT courses catalog, Microsoft certification training, Azure AZ-104, CompTIA Security+ SY0-701, CompTIA A+, AWS Solutions Architect, Kubernetes CKA, CEH v12, IT training Dubai, UK London IT bootcamps, USA IT training',
          canonicalUrl: 'https://learnify-solutions.com/courses',
          ogUrl: 'https://learnify-solutions.com/courses',
        };
      case 'course_detail':
        return selectedCourse
          ? {
              title: `${selectedCourse.title} ${selectedCourse.examCode ? '(' + selectedCourse.examCode + ') ' : ''}Certification Training & Bootcamp | Learnify Solutions`,
              description: `${selectedCourse.summary || selectedCourse.overview || 'Master ' + selectedCourse.title + ' with official vendor curriculum, 1-on-1 mentor guidance, and 24/7 hands-on cloud labs.'} Official ${selectedCourse.certificationVendor || 'IT'} certification training with guaranteed batches across USA, UK, UAE, Africa & India.`,
              keywords: `${selectedCourse.title}, ${selectedCourse.examCode || ''}, ${selectedCourse.certificationVendor || 'IT'} training, ${selectedCourse.certificationVendor || 'IT'} certification course, authorized ${selectedCourse.certificationVendor || 'IT'} training partner, ${selectedCourse.domain} bootcamps, online 1-on-1 ${selectedCourse.certificationVendor || 'IT'} training, IT training Dubai, IT certifications London UK, corporate tech upskilling, Learnify Solutions`,
              canonicalUrl: `https://learnify-solutions.com/course/${selectedCourse.id}`,
              ogUrl: `https://learnify-solutions.com/course/${selectedCourse.id}`,
              ogImage: selectedCourse.imageUrl?.startsWith('http')
                ? selectedCourse.imageUrl
                : `https://learnify-solutions.com${selectedCourse.imageUrl || '/hero.webp'}`,
              jsonLd: {
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Course',
                    '@id': `https://learnify-solutions.com/course/${selectedCourse.id}#course`,
                    'name': selectedCourse.title,
                    'courseCode': selectedCourse.examCode || selectedCourse.id,
                    'description': selectedCourse.summary || selectedCourse.overview || '',
                    'provider': {
                      '@type': 'EducationalOrganization',
                      'name': 'Learnify Solutions',
                      'url': 'https://learnify-solutions.com'
                    },
                    'educationalLevel': selectedCourse.skillLevel || 'Intermediate',
                    'educationalCredentialAwarded': `${selectedCourse.title} Official Certification`,
                    'courseMode': ['online', 'blended', 'onsite'],
                    'teaches': selectedCourse.learningObjectives || [selectedCourse.title],
                    'aggregateRating': {
                      '@type': 'AggregateRating',
                      'ratingValue': String(selectedCourse.rating || '4.95'),
                      'reviewCount': String(selectedCourse.enrolled || '420'),
                      'bestRating': '5'
                    },
                    'offers': {
                      '@type': 'Offer',
                      'category': 'Paid',
                      'priceCurrency': 'USD',
                      'price': '999',
                      'availability': 'https://schema.org/InStock'
                    }
                  },
                  {
                    '@type': 'BreadcrumbList',
                    '@id': `https://learnify-solutions.com/course/${selectedCourse.id}#breadcrumb`,
                    'itemListElement': [
                      {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'Home',
                        'item': 'https://learnify-solutions.com/'
                      },
                      {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': 'Courses',
                        'item': 'https://learnify-solutions.com/courses'
                      },
                      {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': selectedCourse.title,
                        'item': `https://learnify-solutions.com/course/${selectedCourse.id}`
                      }
                    ]
                  }
                ]
              }
            }
          : {
              title: 'IT Certification Courses | Learnify Solutions',
              description: 'Comprehensive IT training course overview, learning objectives, and curriculum syllabus.',
              canonicalUrl: 'https://learnify-solutions.com/courses',
              ogUrl: 'https://learnify-solutions.com/courses',
            };
      case 'corporate_training':
        return {
          title: 'Corporate IT Training & Workforce Upskilling Solutions | Learnify Solutions',
          description:
            'Scalable enterprise learning solutions designed for enterprise engineering teams worldwide. Custom syllabus, private cloud sandboxes, 98.4% first-time pass rate.',
          keywords:
            'corporate IT training, enterprise tech training, B2B workforce upskilling, cloud migration training, corporate DevOps bootcamp, team certification programs',
          canonicalUrl: 'https://learnify-solutions.com/corporate-training',
          ogUrl: 'https://learnify-solutions.com/corporate-training',
        };
      case 'contact':
        return {
          title: 'Contact Admissions & Corporate Sales | Learnify Solutions',
          description:
            'Connect with our senior enterprise advisors for custom curriculum quotes, live batch schedules, corporate discounts, and personalized learning consultations.',
          keywords:
            'contact Learnify Solutions, corporate training quote, educational advisor, IT training inquiry, batch schedule, course fee inquiry',
          canonicalUrl: 'https://learnify-solutions.com/contact',
          ogUrl: 'https://learnify-solutions.com/contact',
        };
      case 'privacy':
        return {
          title: 'Privacy Policy & Data Compliance | Learnify Solutions',
          description:
            'Learnify Solutions privacy policy, GDPR compliance, data security standards, and learner privacy commitments.',
          keywords: 'privacy policy, Learnify Solutions compliance, GDPR, data protection',
          canonicalUrl: 'https://learnify-solutions.com/privacy',
          ogUrl: 'https://learnify-solutions.com/privacy',
        };
      default:
        return {
          title: 'Learnify Solutions | Authorized Global IT Training Partner (Microsoft, Cisco, CompTIA, AWS, CEH & Kubernetes)',
          description:
            'Global authorized IT training partner for Microsoft, Cisco, CompTIA, AWS, EC-Council & Kubernetes. Live 1-on-1 instructor bootcamps, official exams & 24/7 cloud labs across USA, UK, UAE (Dubai), Africa & India.',
          keywords: isCiscoAuthorized
            ? 'IT training certification courses, corporate IT training, 1-on-1 IT training, vendor authorized training partner, Microsoft certification training, Microsoft Azure AZ-104, Azure AI-102, DP-100, SC-900, PL-300, Microsoft Copilot MS-4018, Cisco CCNA 200-301 training, Cisco CCNP ENCOR 350-401, ENARSI 300-410, Cisco SD-WAN, Cisco SCOR 350-701, Cisco DevNet DEVASC, CompTIA Security+ SY0-701 bootcamp, CompTIA A+ 220-1101, CompTIA Network+ N10-008 N10-009, CompTIA Cloud+ CV0-004, CompTIA PenTest+ PT0-002, CompTIA Linux+, AWS certification courses, AWS Solutions Architect SAA-C03, AWS Security SCS-C02, CEH v12 certification, CISSP training, Kubernetes CKA training, IT bootcamps UK London, IT training UAE Dubai, corporate IT training USA, Koenig Solutions alternative, enterprise IT workforce upskilling, Learnify Solutions'
            : 'IT training certification courses, corporate IT training, 1-on-1 IT training, vendor authorized training partner, Microsoft certification training, Microsoft Azure AZ-104, Azure AI-102, DP-100, SC-900, PL-300, CompTIA Security+ SY0-701 bootcamp, CompTIA A+ 220-1101, CompTIA Network+, CompTIA Cloud+, AWS certification courses, AWS Solutions Architect SAA-C03, CEH v12 certification, CISSP training, Kubernetes CKA training, IT bootcamps UK London, IT training UAE Dubai, corporate IT training USA, Learnify Solutions',
          canonicalUrl: 'https://learnify-solutions.com/',
          ogUrl: 'https://learnify-solutions.com/',
        };
    }
  }, [activePage, selectedCourse, isCiscoAuthorized]);

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

      // Synchronize active page and course if user hit back/forward buttons
      if (pathname.startsWith('/course/') || hash.startsWith('#course-')) {
        let courseId = '';
        if (pathname.startsWith('/course/')) {
          courseId = window.location.pathname.replace('/course/', '').replace(/\/$/, '');
        } else if (hash.startsWith('#course-')) {
          courseId = hash.replace('#course-', '');
        }
        const matched = sampleCourses.find((c) => c.id.toLowerCase() === courseId.toLowerCase());
        if (matched) {
          setSelectedCourse(matched);
          setActivePage('course_detail');
          setActiveNavId('nav-courses');
          return;
        }
      }

      if (
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
  }, [isCiscoAuthorized, activePage]);

  // Safety guard: if user is not Cisco authorized, prevent viewing Cisco course detail directly
  useEffect(() => {
    if (!isCiscoAuthorized && selectedCourse) {
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
  }, [activePage, selectedCourse?.id]);

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

  const loadAllData = async () => {
    try {
      // 1. Non-blocking background CMS sync (page is already rendered with initialCmsData)
      fetchCmsData().then((cmsRes) => {
        if (cmsRes) setCmsData(cmsRes);
      }).catch(() => {});

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
      const isCourseRoute =
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
          ) : activePage === 'course_detail' && selectedCourse ? (
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

              {/* 11. Final CTA Banner */}
              <FinalCtaSection
                title={cmsData.finalCtaSection.title}
                subtitle={cmsData.finalCtaSection.subtitle}
                primaryCtaLabel={cmsData.finalCtaSection.primaryCta.label}
                secondaryCtaLabel={cmsData.finalCtaSection.secondaryCta.label}
                onPrimaryCta={() => handleOpenCoursesModal('all')}
                onSecondaryCta={() => handleOpenAdvisorModal('demo')}
              />
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
            onClose={handleCloseCmsDrawer}
            cmsData={cmsData}
            onCmsUpdated={(newData) => setCmsData(newData)}
            courses={courses}
            onCoursesUpdated={(newCourses) => setCourses(newCourses)}
            leads={leads}
            supabaseStatus={supabaseStatus}
            onRefreshLeads={() => {
              fetchLeads().then((res) => setLeads(res));
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
