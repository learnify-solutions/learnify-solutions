import React, { useState, useEffect, Suspense, lazy } from 'react';
import { initialCmsData } from './data/defaultCmsData';
import { sampleCourses } from './data/coursesData';
import {
  RegionCode,
  REGION_CONFIGS,
  ResolvedRegionalCoursePage,
  TARGET_REGIONAL_COURSES,
  buildRegionalCoursePage,
  getRegionalAlternatesForCourse,
  getRegionalCoursePages,
  resolveRegionalRoute,
} from './data/regionalSeoData';
import {
  SEO_BLOGS,
  getMergedBlogs,
  resolveBlogRoute,
} from './data/blogsData';
import { CmsData, Course, TechDomain, LeadSubmission, BlogPost } from './types';
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
import { TrainingProofSection } from './components/TrainingProofSection';
import { TestimonialsSection } from './components/TestimonialsSection';
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
const CountryHubView = lazy(() =>
  import('./components/CountryHubView').then((m) => ({ default: m.CountryHubView }))
);
const RegionalCourseView = lazy(() =>
  import('./components/RegionalCourseView').then((m) => ({ default: m.RegionalCourseView }))
);
const BlogSection = lazy(() =>
  import('./components/BlogSection').then((m) => ({ default: m.BlogSection }))
);
const BlogsHubView = lazy(() =>
  import('./components/BlogsHubView').then((m) => ({ default: m.BlogsHubView }))
);
const BlogDetailView = lazy(() =>
  import('./components/BlogDetailView').then((m) => ({ default: m.BlogDetailView }))
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
  >(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const catalog = params.get('catalog');

      const blogMatch = resolveBlogRoute(path);
      if (blogMatch) {
        return blogMatch.type === 'hub' ? 'blogs_hub' : 'blog_detail';
      }

      const regionalMatch = resolveRegionalRoute(path);
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

  const [regionalRegion, setRegionalRegion] = useState<RegionCode>(() => {
    if (typeof window !== 'undefined') {
      const match = resolveRegionalRoute(window.location.pathname);
      if (match) return match.region.code;
    }
    return 'ae';
  });

  const [selectedRegionalCourse, setSelectedRegionalCourse] = useState<ResolvedRegionalCoursePage | null>(() => {
    if (typeof window !== 'undefined') {
      const match = resolveRegionalRoute(window.location.pathname);
      if (match && match.type === 'course') return match.page;
    }
    return null;
  });

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(() => {
    if (typeof window !== 'undefined') {
      const match = resolveBlogRoute(window.location.pathname);
      if (match && match.type === 'detail') return match.post;
    }
    return null;
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
      if (resolveBlogRoute(path)) {
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
          title: 'Cisco Authorized Certification Training (CCNA, CCNP, DevNet) | Learnify Solutions',
          description:
            'Authorized Cisco training partner: CCNA 200-301, CCNP ENCOR, SD-WAN & DevNet with hands-on live lab pods and expert guidance.',
          keywords: 'Cisco certification training, CCNA 200-301 course, CCNP ENCOR bootcamp, Cisco DevNet training',
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
          title: 'IT & Cloud Certification Courses Catalog (Microsoft, Cisco, CompTIA, AWS) | Learnify Solutions',
          description: isCiscoAuthorized
            ? 'Browse 50+ official certification courses in Microsoft Azure, Cisco CCNA/CCNP, CompTIA Security+, AWS Cloud, DevOps, and Cybersecurity. 1-on-1 live mentorship & corporate batches.'
            : 'Browse 50+ official certification courses in Microsoft Azure, CompTIA Security+, AWS Cloud, DevOps, Kubernetes, and Cybersecurity. 1-on-1 live mentorship & corporate batches.',
          keywords: isCiscoAuthorized
            ? 'IT courses catalog, Microsoft certification training, Azure AZ-104, Cisco CCNA 200-301, Cisco CCNP ENCOR, CompTIA Security+ SY0-701, CompTIA A+, AWS Solutions Architect, Kubernetes CKA, CEH v12, IT training Dubai, UK London IT bootcamps, USA IT training'
            : 'IT courses catalog, Microsoft certification training, Azure AZ-104, CompTIA Security+ SY0-701, CompTIA A+, AWS Solutions Architect, Kubernetes CKA, CEH v12, IT training Dubai, UK London IT bootcamps, USA IT training',
          canonicalUrl: 'https://www.learnify-solutions.com/courses',
          ogUrl: 'https://www.learnify-solutions.com/courses',
        };
      case 'country_hub': {
        const region = REGION_CONFIGS[regionalRegion];
        const hubPages = getRegionalCoursePages(regionalRegion);
        return {
          title: region.hubTitle,
          description: region.hubDescription,
          keywords: region.hubKeywords,
          canonicalUrl: `https://www.learnify-solutions.com${region.hubPath}`,
          ogUrl: `https://www.learnify-solutions.com${region.hubPath}`,
          hreflangAlternates: [
            { hreflang: 'x-default', href: 'https://www.learnify-solutions.com/courses' },
            { hreflang: 'en', href: 'https://www.learnify-solutions.com/courses' },
            { hreflang: 'en-AE', href: 'https://www.learnify-solutions.com/ae' },
            { hreflang: 'en-ZA', href: 'https://www.learnify-solutions.com/za' },
          ],
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
      case 'blogs_hub': {
        const allBlogs = getMergedBlogs(cmsData.blogs);
        return {
          title: 'IT Certification Blogs, Exam Centers & Fee Guides (UAE & SA) | Learnify Solutions',
          description:
            'Daily-updated IT certification blogs covering Pearson VUE exam centers in Gauteng (Johannesburg, Sandton, Midrand, Pretoria), Cape Town, Dubai & Abu Dhabi, AED & ZAR course costs, and CompTIA, Microsoft & AWS roadmaps.',
          keywords:
            'Learnify blogs, where to write CompTIA A+ in Gauteng, Pearson VUE Dubai Knowledge Park, Power BI PL-300 cost Dubai, Azure AZ-104 South Africa cost ZAR, cloud computing courses in Dubai',
          canonicalUrl: 'https://www.learnify-solutions.com/blogs',
          ogUrl: 'https://www.learnify-solutions.com/blogs',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': 'https://www.learnify-solutions.com/blogs#collection',
                'name': 'Learnify IT Certification Blogs, Exam Centers & Fee Guides',
                'mainEntity': {
                  '@type': 'ItemList',
                  'numberOfItems': allBlogs.length,
                  'itemListElement': allBlogs.map((g, idx) => ({
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
          return {
            title: 'IT Certification Blogs | Learnify Solutions',
            description: 'Exam center, certification cost, and regional IT career blogs for UAE & South Africa.',
            canonicalUrl: 'https://www.learnify-solutions.com/blogs',
            ogUrl: 'https://www.learnify-solutions.com/blogs',
          };
        }
        const canonical = `https://www.learnify-solutions.com/blogs/${selectedBlog.slug}`;
        const graphNodes: Record<string, any>[] = [
          {
            '@type': 'BlogPosting',
            '@id': `${canonical}#blogposting`,
            'headline': selectedBlog.title,
            'description': selectedBlog.seoDescription,
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
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': graphNodes,
          },
        };
      }
      case 'regional_course': {
        if (!selectedRegionalCourse) {
          return {
            title: 'Regional IT Certification Training | Learnify Solutions',
            description: 'Authorized CompTIA & Microsoft live certification bootcamps across UAE and South Africa.',
            canonicalUrl: 'https://www.learnify-solutions.com/courses',
            ogUrl: 'https://www.learnify-solutions.com/courses',
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
          hreflangAlternates: [
            { hreflang: 'x-default', href: p.alternateUrls.global },
            { hreflang: 'en', href: p.alternateUrls.global },
            { hreflang: 'en-AE', href: p.alternateUrls.ae },
            { hreflang: 'en-ZA', href: p.alternateUrls.za },
          ],
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
        const courseAlternates = selectedCourse ? getRegionalAlternatesForCourse(selectedCourse.id) : null;
        return selectedCourse
          ? {
              title: `${selectedCourse.title} ${selectedCourse.examCode ? '(' + selectedCourse.examCode + ') ' : ''}Certification Training & Bootcamp | Learnify Solutions`,
              description: `${selectedCourse.summary || selectedCourse.overview || 'Master ' + selectedCourse.title + ' with official vendor curriculum, 1-on-1 mentor guidance, and 24/7 hands-on cloud labs.'} Official ${selectedCourse.certificationVendor || 'IT'} certification training with guaranteed batches across USA, UK, UAE, Africa & India.`,
              keywords: `${selectedCourse.title}, ${selectedCourse.examCode || ''}, ${selectedCourse.certificationVendor || 'IT'} training, ${selectedCourse.certificationVendor || 'IT'} certification course, authorized ${selectedCourse.certificationVendor || 'IT'} training partner, ${selectedCourse.domain} bootcamps, online 1-on-1 ${selectedCourse.certificationVendor || 'IT'} training, IT training Dubai, IT certifications London UK, corporate tech upskilling, Learnify Solutions`,
              canonicalUrl: `https://www.learnify-solutions.com/course/${selectedCourse.id}`,
              ogUrl: `https://www.learnify-solutions.com/course/${selectedCourse.id}`,
              ogImage: selectedCourse.imageUrl?.startsWith('http')
                ? selectedCourse.imageUrl
                : `https://www.learnify-solutions.com${selectedCourse.imageUrl || '/hero.webp'}`,
              hreflangAlternates: courseAlternates
                ? [
                    { hreflang: 'x-default', href: courseAlternates.global },
                    { hreflang: 'en', href: courseAlternates.global },
                    { hreflang: 'en-AE', href: courseAlternates.ae },
                    { hreflang: 'en-ZA', href: courseAlternates.za },
                  ]
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
                      'url': 'https://www.learnify-solutions.com'
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
                      'availability': 'https://schema.org/InStock'
                    }
                  },
                  {
                    '@type': 'BreadcrumbList',
                    '@id': `https://www.learnify-solutions.com/course/${selectedCourse.id}#breadcrumb`,
                    'itemListElement': [
                      {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'Home',
                        'item': 'https://www.learnify-solutions.com/'
                      },
                      {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': 'Courses',
                        'item': 'https://www.learnify-solutions.com/courses'
                      },
                      {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': selectedCourse.title,
                        'item': `https://www.learnify-solutions.com/course/${selectedCourse.id}`
                      }
                    ]
                  }
                ]
              }
            }
          : {
              title: 'IT Certification Courses | Learnify Solutions',
              description: 'Comprehensive IT training course overview, learning objectives, and curriculum syllabus.',
              canonicalUrl: 'https://www.learnify-solutions.com/courses',
              ogUrl: 'https://www.learnify-solutions.com/courses',
            };
      }
      case 'corporate_training':
        return {
          title: 'Enterprise & Corporate IT Training Solutions | Learnify Solutions',
          description:
            'Scalable enterprise learning solutions and corporate IT bootcamps for engineering teams worldwide. Custom curriculum, private cloud sandboxes, and 98.4% exam pass rate.',
          keywords: 'corporate IT training, enterprise tech training, B2B workforce upskilling, corporate certification programs',
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
            ? 'Learnify Solutions | Authorized Global IT Training Partner & Corporate Bootcamps'
            : 'Learnify Solutions | Authorized Microsoft & CompTIA Global IT Training Partner',
          description: isCiscoAuthorized
            ? 'Global authorized IT training partner for Microsoft, CompTIA, AWS & Kubernetes. Live instructor-led bootcamps, official certification exams & 24/7 cloud labs across USA, UK, UAE (Dubai), Oman & India.'
            : 'Global authorized IT training partner for Microsoft, CompTIA, AWS & Kubernetes. Live instructor-led bootcamps, official certification exams & 24/7 cloud labs across USA, UK, UAE (Dubai), Oman & India.',
          keywords: isCiscoAuthorized
            ? 'IT training certification courses, corporate IT training, 1-on-1 IT training, vendor authorized training partner, Microsoft certification training, Microsoft Azure AZ-104, Azure AI-102, DP-100, SC-900, PL-300, Microsoft Copilot MS-4018, Cisco CCNA 200-301 training, Cisco CCNP ENCOR 350-401, ENARSI 300-410, Cisco SD-WAN, Cisco SCOR 350-701, Cisco DevNet DEVASC, CompTIA Security+ SY0-701 bootcamp, CompTIA A+ 220-1101, CompTIA Network+ N10-008 N10-009, CompTIA Cloud+ CV0-004, CompTIA PenTest+ PT0-002, CompTIA Linux+, AWS certification courses, AWS Solutions Architect SAA-C03, AWS Security SCS-C02, CEH v12 certification, CISSP training, Kubernetes CKA training, IT bootcamps UK London, IT training UAE Dubai, corporate IT training USA, Koenig Solutions alternative, enterprise IT workforce upskilling, Learnify Solutions'
            : 'IT training certification courses, corporate IT training, 1-on-1 IT training, vendor authorized training partner, Microsoft certification training, Microsoft Azure AZ-104, Azure AI-102, DP-100, SC-900, PL-300, CompTIA Security+ SY0-701 bootcamp, CompTIA A+ 220-1101, CompTIA Network+, CompTIA Cloud+, AWS certification courses, AWS Solutions Architect SAA-C03, CEH v12 certification, CISSP training, Kubernetes CKA training, IT bootcamps UK London, IT training UAE Dubai, corporate IT training USA, Learnify Solutions',
          canonicalUrl: 'https://www.learnify-solutions.com/',
          ogUrl: 'https://www.learnify-solutions.com/',
        };
    }
  }, [activePage, selectedCourse, isCiscoAuthorized, regionalRegion, selectedRegionalCourse, selectedBlog, cmsData.blogs]);

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

      const blogMatch = resolveBlogRoute(pathname, cmsData.blogs);
      if (blogMatch) {
        if (blogMatch.isLegacyGuidesRedirect && typeof window !== 'undefined') {
          const newUrl = blogMatch.type === 'hub' ? '/blogs' : `/blogs/${blogMatch.post.slug}`;
          window.history.replaceState(null, '', newUrl);
        }
        if (blogMatch.type === 'hub') {
          setSelectedBlog(null);
          setActivePage('blogs_hub');
        } else {
          setSelectedBlog(blogMatch.post);
          setActivePage('blog_detail');
        }
        setActiveNavId('nav-blogs');
        return;
      }

      const regionalMatch = resolveRegionalRoute(pathname);
      if (regionalMatch) {
        setRegionalRegion(regionalMatch.region.code);
        if (regionalMatch.type === 'hub') {
          setSelectedRegionalCourse(null);
          setActivePage('country_hub');
          setActiveNavId('nav-courses');
        } else {
          setSelectedRegionalCourse(regionalMatch.page);
          setActivePage('regional_course');
          setActiveNavId('nav-courses');
        }
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
        const matched = sampleCourses.find((c) => c.id.toLowerCase() === courseId.toLowerCase());
        if (matched) {
          setSelectedCourse(matched);
          setActivePage('course_detail');
          setActiveNavId('nav-courses');
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
  }, [activePage, selectedCourse?.id, selectedRegionalCourse?.slug, regionalRegion, selectedBlog?.slug]);

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
        if (cmsRes) {
          setCmsData(cmsRes);
          if (typeof window !== 'undefined' && Array.isArray(cmsRes.blogs) && cmsRes.blogs.length > 0) {
            const blogMatch = resolveBlogRoute(window.location.pathname, cmsRes.blogs);
            if (blogMatch && blogMatch.type === 'detail') {
              setSelectedBlog(blogMatch.post);
              setActivePage('blog_detail');
              setActiveNavId('nav-blogs');
            }
          }
        }
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
  };

  const navigateToRegionalCourse = (page: ResolvedRegionalCoursePage) => {
    setRegionalRegion(page.region.code);
    setSelectedRegionalCourse(page);
    setActivePage('regional_course');
    setActiveNavId('nav-courses');
    if (typeof window !== 'undefined') window.history.pushState(null, '', `/${page.region.code}/${page.slug}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToRegionalPath = (path: string) => {
    const match = resolveRegionalRoute(path);
    if (!match) return;
    if (match.type === 'hub') {
      navigateToRegionalHub(match.region.code);
    } else {
      navigateToRegionalCourse(match.page);
    }
  };

  const navigateToBlogsHub = () => {
    setSelectedBlog(null);
    setActivePage('blogs_hub');
    setActiveNavId('nav-blogs');
    if (typeof window !== 'undefined') window.history.pushState(null, '', '/blogs');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToBlog = (post: BlogPost) => {
    setSelectedBlog(post);
    setActivePage('blog_detail');
    setActiveNavId('nav-blogs');
    if (typeof window !== 'undefined') window.history.pushState(null, '', `/blogs/${post.slug}`);
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
              customBlogs={cmsData.blogs}
              isAdminAuthenticated={isAdminAuthenticated}
              onOpenBlogPublisher={() => {
                setCmsDrawerInitialTab('blogs');
                setIsCmsDrawerOpen(true);
              }}
              onSelectBlog={navigateToBlog}
              onNavigateHub={navigateToRegionalHub}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAdvisorModal={handleOpenAdvisorModal}
            />
          ) : activePage === 'blog_detail' && selectedBlog ? (
            /* Dedicated High-Demand Blog Post (/blogs/:slug) */
            <BlogDetailView
              post={selectedBlog}
              customBlogs={cmsData.blogs}
              onNavigateHome={() => {
                setActivePage('home');
                setActiveNavId('nav-home');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateBlogs={navigateToBlogsHub}
              onSelectBlog={navigateToBlog}
              onNavigateHub={navigateToRegionalHub}
              onNavigateRegionalPath={navigateToRegionalPath}
              onOpenAdvisorModal={handleOpenAdvisorModal}
            />
          ) : activePage === 'regional_course' && selectedRegionalCourse ? (
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
                const matched = sampleCourses.find((c) => c.id === courseId);
                if (matched) handleSelectCourse(matched);
              }}
              onSwitchCourseRegion={(targetRegion, courseId) => {
                const meta = TARGET_REGIONAL_COURSES.find((c) => c.courseId === courseId);
                if (!meta) return;
                const built = buildRegionalCoursePage(meta, targetRegion);
                if (built) navigateToRegionalCourse(built);
              }}
              onNavigateRegionalCourse={navigateToRegionalCourse}
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
              onNavigateRegionalPath={navigateToRegionalPath}
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

              {/* 10b. Homepage High-Demand Certification Blogs Section */}
              <BlogSection
                customBlogs={cmsData.blogs}
                onSelectBlog={navigateToBlog}
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
            } else if (link.href === '/ae' || link.label === 'UAE Training') {
              navigateToRegionalHub('ae');
            } else if (link.href === '/za' || link.label === 'South Africa Training') {
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
            onRefreshLeads={() => {
              fetchLeads().then((res) => setLeads(res));
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
