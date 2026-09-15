import React, { useState, useEffect, Suspense, lazy } from 'react';
import { initialCmsData, sampleCourses } from './data/defaultCmsData';
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
import { PerformanceSection } from './components/PerformanceSection';
import { WhoWeAreSection } from './components/WhoWeAreSection';
import { LearningOptionsSection } from './components/LearningOptionsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TechDomainsSection } from './components/TechDomainsSection';
import { PathwaySection } from './components/PathwaySection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { LoadingFallback } from './components/LoadingFallback';
import { Settings, Database } from 'lucide-react';

// Code Splitting / Lazy Loading for optimum bundle size and performance
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
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
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
      if (path === '/corporate-training' || hash === '#corporate-training') {
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeNavId, setActiveNavId] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
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
      if (path === '/corporate-training' || hash === '#corporate-training') {
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

  // Dynamic SEO Configuration for Top Google Ranking across every section & course
  const isAdminAuthenticated = localStorage.getItem('learnify_admin_authenticated') === 'true';

  const seoConfig = React.useMemo(() => {
    switch (activePage) {
      case 'about':
        return {
          title: 'About Us | Learnify Solutions - Enterprise IT Training Ecosystem',
          description:
            'Discover Learnify Solutions’ mission, leadership, and ISO-certified training frameworks empowering global enterprise tech workforces.',
          keywords:
            'about Learnify Solutions, enterprise IT training organization, tech upskilling leadership, corporate training partner',
          canonicalUrl: 'https://learnify-solutions.com/#about',
        };
      case 'cisco_training':
        return {
          title: 'Cisco Certification Training Courses & Bootcamps | Learnify Solutions',
          description:
            'Authorized Cisco training: CCNA (200-301), CCNP Enterprise (ENCOR, ENARSI), SD-WAN, CCNP Security (SCOR, ISE), Data Center & DevNet with hands-on lab pods.',
          keywords:
            'Cisco training, Cisco certifications, CCNA 200-301, CCNP ENCOR 350-401, CCNP ENARSI 300-410, Cisco SD-WAN course, CCNP Security SCOR, Cisco lab training, Learnify Solutions',
          canonicalUrl: 'https://learnify-solutions.com/#cisco-training',
        };
      case 'courses':
        return {
          title: 'IT & Cloud Certification Courses Catalog | Learnify Solutions',
          description: isCiscoAuthorized
            ? 'Browse official certification courses in AWS, Microsoft Azure, Google Cloud, Cisco, DevOps, Kubernetes, and Cybersecurity.'
            : 'Browse official certification courses in AWS, Microsoft Azure, Google Cloud, DevOps, Kubernetes, CompTIA, and Cybersecurity.',
          keywords: isCiscoAuthorized
            ? 'IT courses catalog, AWS certifications, Azure training, DevOps courses, CISSP bootcamp, Cisco CCNA, tech certifications'
            : 'IT courses catalog, AWS certifications, Azure training, DevOps courses, CISSP bootcamp, CompTIA Security+, tech certifications',
          canonicalUrl: 'https://learnify-solutions.com/#courses',
        };
      case 'course_detail':
        return selectedCourse
          ? {
              title: `${selectedCourse.title} Certification Training | Learnify Solutions`,
              description: `${selectedCourse.summary} Official ${selectedCourse.domain} course with live instructor labs and certification readiness.`,
              keywords: `${selectedCourse.title}, ${selectedCourse.domain} training, ${selectedCourse.certificationVendor || 'IT'} certification, ${selectedCourse.skillLevel} bootcamp`,
              canonicalUrl: `https://learnify-solutions.com/#course-${selectedCourse.id}`,
            }
          : {
              title: 'Course Details | Learnify Solutions',
              description: 'Comprehensive IT training course overview and curriculum syllabus.',
              canonicalUrl: 'https://learnify-solutions.com/#courses',
            };
      case 'corporate_training':
        return {
          title: 'Corporate IT Training & Team Upskilling Solutions | Learnify Solutions',
          description:
            'Scalable enterprise learning solutions designed for enterprise engineering teams. Custom syllabus, private cloud sandboxes, 98% completion rate.',
          keywords:
            'corporate IT training, enterprise tech training, B2B workforce upskilling, cloud migration training, corporate DevOps bootcamp',
          canonicalUrl: 'https://learnify-solutions.com/#corporate',
        };
      case 'contact':
        return {
          title: 'Contact Us | Learnify Solutions - Schedule a Consultation',
          description:
            'Connect with our senior enterprise advisors for custom curriculum quotes, live batch schedules, and learning consultations.',
          keywords:
            'contact Learnify Solutions, corporate training quote, educational advisor, IT training inquiry',
          canonicalUrl: 'https://learnify-solutions.com/#contact',
        };
      default:
        return {
          title: 'Learnify Solutions | Enterprise IT Training, AI, Cloud & Cybersecurity',
          description:
            'Empowering individuals and organizations with industry-recognized IT training, AI, Cloud Computing, DevOps, and Cybersecurity certifications.',
          keywords: isCiscoAuthorized
            ? 'IT training, corporate IT training, AWS certification training, Microsoft Azure training, DevOps training, Kubernetes bootcamps, Cybersecurity training, CISSP certification, Cisco CCNA, Artificial Intelligence courses, Enterprise workforce upskilling, Learnify Solutions'
            : 'IT training, corporate IT training, AWS certification training, Microsoft Azure training, DevOps training, Kubernetes bootcamps, Cybersecurity training, CISSP certification, CompTIA, Artificial Intelligence courses, Enterprise workforce upskilling, Learnify Solutions',
          canonicalUrl: 'https://learnify-solutions.com/',
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

    // Preload key course and section images into memory cache so fast scrolling renders instantly
    const preloadAssets = () => {
      const imagesToPreload = [
        '/images/delivered_traning_1.webp',
        '/images/delivered_traning_2.webp',
        '/images/cisco_network_map_1787771488810.webp',
        '/images/pc_hardware_workbench_1788294359055.webp',
        '/images/comptia_security_soc_1787771516564.webp',
        '/images/comptia_cloud_multicloud_1788294616227.webp',
        '/images/cloud_essentials_business_1788294640468.webp',
        '/images/linux_datacenter_admin_1788294344630.webp',
        '/images/ethical_hacking_pentest_1788294329039.webp',
        '/images/azure_cloud_infra_1787771504293.webp',
        '/images/copilot_genai_workspace_1788294313357.webp',
        '/images/powerbi_data_analytics_1788294280157.webp',
        '/images/aws_architecture_diagram_1787771528914.webp',
        '/images/kubernetes_devops_cluster_1788294296039.webp',
        '/images/learnify_hero_workstation_1787768560565.webp',
      ];

      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
      });

      // Warm up lazy-loaded views
      import('./components/CoursesView');
      import('./components/CorporateTrainingView');
      import('./components/AboutView');
      import('./components/CourseDetailView');
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadAssets);
    } else {
      setTimeout(preloadAssets, 150);
    }

    // Check if user navigates directly to secret admin route or cisco client url
    const checkAdminAndCiscoRoutes = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);

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

  // Sync course catalog whenever Cisco authorization changes
  useEffect(() => {
    fetchCourses(undefined, undefined, isCiscoAuthorized).then((coursesRes) => {
      if (coursesRes && coursesRes.length > 0) {
        setCourses(coursesRes);
      }
    });
  }, [isCiscoAuthorized]);

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

  const loadAllData = async () => {
    try {
      const [cmsRes, coursesRes, leadsRes, spStatus] = await Promise.all([
        fetchCmsData(),
        fetchCourses(undefined, undefined, isCiscoAuthorized),
        fetchLeads(),
        getSupabaseStatus(),
      ]);

      if (cmsRes) setCmsData(cmsRes);
      if (coursesRes && coursesRes.length > 0) {
        setCourses(coursesRes);
        setSelectedCourse((prev) => {
          if (!prev) return null;
          return coursesRes.find((c) => c.id === prev.id) || prev;
        });
      }
      if (leadsRes) setLeads(leadsRes);
      if (spStatus) setSupabaseStatus(spStatus);
    } catch (err) {
      console.warn('Initial data load warning:', err);
    }
  };

  const handleOpenAdvisorModal = (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info' = 'advisor',
    domain: string = 'General'
  ) => {
    setAdvisorInquiryType(type);
    setSelectedDomainForAdvisor(domain);
    setIsAdvisorModalOpen(true);
  };

  const handleOpenCoursesModal = (domain: string = 'all') => {
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.id === 'nav-home' || link.href === '#home' || link.label === 'Home') {
      setActivePage('home');
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
      setActivePage('cisco_training');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.href === '#courses' || link.id === 'nav-courses' || link.label === 'Courses') {
      setActivePage('courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      link.href === '#corporate' ||
      link.id === 'nav-corporate' ||
      link.label === 'Corporate Training'
    ) {
      setActivePage('corporate_training');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.href === '#contact' || link.id === 'nav-contact' || link.label === 'Contact Us') {
      setActivePage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // For any section links if currently on another page, switch to Home first
    if (activePage !== 'home') {
      setActivePage('home');
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    handleOpenCoursesModal(domain.name);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActivePage('course_detail');
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
          links={cmsData.navigation.links}
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
