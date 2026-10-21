export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface StatItem {
  id: string;
  icon: 'star' | 'users' | 'book' | 'award' | 'globe';
  value: string;
  label: string;
}

export interface InfoCard {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  badge?: string;
}

export interface TechDomain {
  id: string;
  name: string;
  tags: string;
  iconName: 'cloud' | 'shield' | 'ai' | 'devops' | 'microsoft' | 'cisco' | 'database' | 'code';
  isTrending?: boolean;
}

export interface PathwayStep {
  stepNumber: number;
  title: string;
  subtitle?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface AboutPageData {
  hero: {
    badge: string;
    titlePrefix: string;
    titleSuffix: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
    taglineBold: string;
    taglineRest: string;
    imageUrl: string;
    imageAlt: string;
  };
  visionMission: {
    vision: {
      title: string;
      description: string;
    };
    mission: {
      title: string;
      description: string;
    };
  };
  coreValues: {
    title: string;
    values: {
      id: string;
      title: string;
      description: string;
      icon: 'award' | 'shield' | 'users' | 'trending';
    }[];
  };
  performanceCta: {
    title: string;
    description: string;
    buttonLabel: string;
  };
}

export interface CmsData {
  topBanner: {
    enabled: boolean;
    text: string;
    linkText: string;
    href: string;
    phoneNumber?: string;
    email?: string;
    mode?: 'announcement' | 'contact' | 'both';
  };
  navigation: {
    logoTitle: string;
    logoSubtitle: string;
    links: NavigationLink[];
    ctaButton: {
      label: string;
      action: string;
    };
  };
  hero: {
    badgeText?: string;
    headline: string;
    description: string;
    primaryCta: {
      label: string;
      action: string;
    };
    secondaryCta: {
      label: string;
      action: string;
    };
    imageUrl: string;
    imageAlt: string;
  };
  stats: StatItem[];
  performanceSection: {
    title: string;
    description: string;
    ctaButton: {
      label: string;
      action: string;
    };
  };
  whoWeAreSection: {
    title: string;
    description: string;
    cards: InfoCard[];
    ctaButton: {
      label: string;
      action: string;
    };
  };
  learningOptionsSection: {
    title: string;
    description?: string;
    cards: InfoCard[];
  };
  whyChooseSection: {
    title: string;
    subtitle: string;
    cards: {
      id: string;
      title: string;
      description: string;
    }[];
  };
  techDomainsSection: {
    title: string;
    subtitle: string;
    viewAllText: string;
    viewAllHref: string;
    domains: TechDomain[];
  };
  pathwaySection: {
    title: string;
    subtitle: string;
    steps: PathwayStep[];
  };
  finalCtaSection: {
    title: string;
    subtitle: string;
    primaryCta: {
      label: string;
      action: string;
    };
    secondaryCta: {
      label: string;
      action: string;
    };
  };
  aboutPage: AboutPageData;
  corporateTrainingSection: {
    deliverySubtitle: string;
    deliveryTitle: string;
    deliveryDescription: string;
    deliveryStats: {
      score: string;
      upskilled: string;
      labs: string;
    };
    deliveryCards: {
      id: string;
      locationTag: string;
      badgeText: string;
      title: string;
      description: string;
      imageUrl: string;
    }[];
    cohortCards: {
      id: string;
      badgeText: string;
      title: string;
      description: string;
      footerText: string;
      theme: 'light' | 'dark';
      imageUrl?: string;
    }[];
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonials: {
      id: string;
      quote: string;
      authorName: string;
      authorTitle: string;
      authorLocation: string;
      rating: number;
      initials: string;
    }[];
  };
  footer: {
    brandName: string;
    description: string;
    copyright: string;
    columns: FooterColumn[];
  };
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType: 'advisor' | 'corporate_quote' | 'demo' | 'course_info' | 'syllabus_download';
  selectedDomain?: string;
  courseTitle?: string;
  courseId?: string;
  jobRole?: string;
  preferredFormat?: string;
  message?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  domain: string;
  certificationVendor: 'Cisco' | 'Microsoft' | 'CompTIA' | 'AWS' | 'Google Cloud' | 'AI & Tech' | string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  format: 'Live Online' | 'Classroom' | 'Self-Paced';
  fastTrack?: boolean;
  imageUrl: string;
  imageAlt?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Enterprise';
  duration: string;
  rating: number;
  enrolled: number;
  summary: string;
  curriculum: string[];
  
  // Detailed View Fields (added for dynamic course pages)
  overview?: string;
  learningObjectives?: string[];
  prerequisites?: string[];
  outline?: {
    title: string;
    description?: string;
    items?: string[];
  }[];

  // Syllabus Backend-Driven Fields
  syllabusUrl?: string; // Custom uploaded PDF Data URI or hosted URL
  syllabusFileName?: string; // e.g. "CCNA_Official_Syllabus.pdf"
  syllabusFileSize?: string; // e.g. "2.4 MB"
  syllabusUpdatedAt?: string; // timestamp of syllabus upload

  // Cisco Certification Categorization
  ciscoCategory?: 'associate' | 'professional';
  ciscoTrack?: 'enterprise' | 'security' | 'service_provider' | 'wireless' | 'automation' | 'collaboration' | 'cybersecurity' | 'datacenter';
  ciscoExamType?: 'core' | 'concentration';
  examCode?: string;
}
