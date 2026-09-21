import { CmsData, Course } from '../types';

export const initialCmsData: CmsData = {
  topBanner: {
    enabled: true,
    text: '',
    linkText: '',
    href: '#register',
    phoneNumber: '+91 881 025 5422 (Chat Only)',
    email: 'info@learnify-solutions.com',
    mode: 'both',
  },
  navigation: {
    logoTitle: 'Learnify',
    logoSubtitle: 'Solutions',
    links: [
      { id: 'nav-home', label: 'Home', href: '#home', active: true },
      { id: 'nav-courses', label: 'Courses', href: '#courses' },
      { id: 'nav-corporate', label: 'Corporate Training', href: '#corporate' },
      { id: 'nav-about', label: 'About', href: '#about' },
      { id: 'nav-contact', label: 'Contact Us', href: '#contact' },
    ],
    ctaButton: {
      label: 'Talk to an Advisor',
      action: 'open_advisor_modal',
    },
  },
  hero: {
    headline: 'Skilled for the Future.',
    description:
      'Empower your career with industry-leading technical education. We deliver flexible online, hybrid, and immersive classroom training designed for the modern enterprise ecosystem.',
    primaryCta: {
      label: 'Explore Courses',
      action: 'open_courses_modal',
    },
    secondaryCta: {
      label: 'Talk to a Learning Advisor',
      action: 'open_advisor_modal',
    },
    imageUrl: '/hero.webp',
    imageAlt: 'Professional businesswoman analyzing cloud systems on multi-monitor workstation',
  },
  stats: [
    {
      id: 'stat-rating',
      icon: 'star',
      value: '4.8/5',
      label: 'AVERAGE RATING',
    },
    {
      id: 'stat-learners',
      icon: 'users',
      value: '3,000+',
      label: 'ACTIVE LEARNERS',
    },
    {
      id: 'stat-courses',
      icon: 'book',
      value: '300+',
      label: 'ENTERPRISE COURSES',
    },
  ],
  performanceSection: {
    title: "Elevate Your Team's Performance With Results–Driven Skills",
    description:
      "Transform your workforce with Learnify' globally recognized IT training and certifications, designed to empower your teams with the knowledge and expertise they need to thrive. Our adaptable corporate learning solutions are tailored to upskill, upgrade, and modernize your workforce in a variety of IT technologies, including information security, cloud security, data privacy, security testing, and more.",
    ctaButton: {
      label: 'Raise a Request Now',
      action: 'open_request_modal',
    },
  },
  whoWeAreSection: {
    title: 'Who We Are',
    description:
      'Learnify Solutions is a professional training company focused on delivering high-quality, flexible, and result-driven learning experiences. We empower both individuals and organizations to enhance capabilities, drive performance, and stay future-ready.',
    cards: [
      {
        id: 'card-1',
        title: 'Customised Corporate Training',
        description:
          'Programs aligned with business objectives and workforce needs for measurable outcomes.',
        iconName: 'briefcase',
      },
      {
        id: 'card-2',
        title: 'Flexible Delivery',
        description:
          'Learn Online, onsite or in hybrid formats — built to suit your preferences and schedules.',
        iconName: 'clock',
      },
      {
        id: 'card-3',
        title: 'Industry-Expert Trainers',
        description:
          'Real-world professionals bring hands-on insights, practical tips and career guidance.',
        iconName: 'user-check',
      },
      {
        id: 'card-4',
        title: 'Excellent Training Feedback',
        description:
          'Trusted by clients and learners alike for consistently high-quality and impactful training.',
        iconName: 'thumbs-up',
      },
    ],
    ctaButton: {
      label: 'Read More',
      action: 'open_about_modal',
    },
  },
  learningOptionsSection: {
    title: 'Exploring Your Learning Options',
    cards: [
      {
        id: 'opt-1',
        title: 'Live Online Classes',
        description:
          'Live online training leverages technology to bring the classroom experience directly to participants wherever they are, eliminating the need for physical attendance.',
        iconName: 'monitor',
      },
      {
        id: 'opt-2',
        title: 'Classroom Training',
        description:
          'Instructor-led training fosters face-to-face direct interaction between instructors and peers.',
        iconName: 'users',
      },
      {
        id: 'opt-3',
        title: 'Onsite',
        description:
          'Flexible on-site training brings the learning experience directly to your preferred workspace or destination venue.',
        iconName: 'building',
      },
    ],
  },
  whyChooseSection: {
    title: 'Why Choose Learnify?',
    subtitle: "We don't just train — we enable transformation, performance, and long-term success.",
    cards: [
      {
        id: 'why-1',
        title: 'Outcome-Focused Learning',
        description: 'that aligns with real business challenges and goals',
      },
      {
        id: 'why-2',
        title: 'Agile Approach',
        description: 'to adapt quickly to your schedules, teams, and training formats',
      },
      {
        id: 'why-3',
        title: 'High Engagement',
        description: 'through interactive sessions, real-world scenarios, and hands-on practice',
      },
      {
        id: 'why-4',
        title: 'Trusted by Clients',
        description: 'across industries for consistent delivery and measurable results',
      },
    ],
  },
  techDomainsSection: {
    title: 'Explore Technology Domains',
    subtitle: 'Master the tools defining the modern technological landscape.',
    viewAllText: 'View All Domains',
    viewAllHref: '#domains',
    domains: [
      {
        id: 'domain-cloud',
        name: 'Cloud Computing',
        tags: 'AWS, Azure, Google Cloud',
        iconName: 'cloud',
      },
      {
        id: 'domain-cyber',
        name: 'Cybersecurity',
        tags: 'CompTIA, CISSP, Ethical Hacking',
        iconName: 'shield',
      },
      {
        id: 'domain-ai',
        name: 'Artificial Intelligence',
        tags: 'Machine Learning, Generative AI',
        iconName: 'ai',
        isTrending: true,
      },
      {
        id: 'domain-devops',
        name: 'DevOps',
        tags: 'Docker, Kubernetes, CI/CD',
        iconName: 'devops',
      },
      {
        id: 'domain-ms',
        name: 'Microsoft Solutions',
        tags: 'M365, Server, Infrastructure',
        iconName: 'microsoft',
      },
      {
        id: 'domain-cisco',
        name: 'Cisco Networking',
        tags: 'CCNA, CCNP, Enterprise Net',
        iconName: 'cisco',
      },
    ],
  },
  pathwaySection: {
    title: 'Pathway to Excellence',
    subtitle:
      'A structured methodology ensuring you progress from foundational knowledge to certified mastery.',
    steps: [
      { stepNumber: 1, title: 'Assess & Plan' },
      { stepNumber: 2, title: 'Foundational Setup' },
      { stepNumber: 3, title: 'Immersive Training' },
      { stepNumber: 4, title: 'Hands-on Labs' },
      { stepNumber: 5, title: 'Exam Prep' },
      { stepNumber: 6, title: 'Certification' },
    ],
  },
  finalCtaSection: {
    title: 'Ready for your next skill?',
    subtitle:
      'Join thousands of professionals scaling their technical capabilities with Learnify Solutions.',
    primaryCta: {
      label: 'Browse Full Catalog',
      action: 'open_courses_modal',
    },
    secondaryCta: {
      label: 'Request Enterprise Demo',
      action: 'open_demo_modal',
    },
  },
  aboutPage: {
    hero: {
      badge: 'About Us',
      titlePrefix: 'Learnify Solutions:',
      titleSuffix: 'Experience The Future Of Learning',
      paragraph1:
        'Learnify Solutions is a trusted name in professional training, committed to empowering individuals and organizations through high-impact learning. Founded with a vision to bridge the skills gap in today’s dynamic tech landscape, we deliver expert-led, industry-recognized training programs across domains such as Networking, (AI), Cloud Computing, DevOps, and more.',
      paragraph2:
        'With a focus on quality, flexibility, and real-world application, our training solutions are designed to equip learners with the practical skills they need to succeed—whether they’re stepping into a new role or aiming for leadership. From instructor-led virtual classrooms to customized corporate training, Learnify Solutions adapts to meet every learning need.',
      quote: '“At Learnify, we don’t just teach—we enable transformation.”',
      taglineBold: 'Join us to learn, grow,',
      taglineRest: 'and lead with confidence',
      imageUrl: '/images/learnify_about_team_1787770808391.webp',
      imageAlt: 'Learnify Solutions team and corporate learners in a collaborative tech training session',
    },
    visionMission: {
      vision: {
        title: 'Our Vision',
        description:
          'To empower individuals and organizations to reach their full potential through transformative, high-impact learning experiences. At Learnify Solutions, we envision a future where continuous, skills-based training drives personal growth, organizational excellence, and industry innovation. Our commitment is to create confident, capable, and future-ready professionals who lead change and make a meaningful difference in their fields.',
      },
      mission: {
        title: 'Our Mission',
        description:
          'Our mission is to revolutionize corporate learning by delivering dynamic, results-driven training solutions. We aim to provide organizations with customizable, high-impact programs that enhance employee skills, boost productivity, and contribute to the overall success of businesses in a rapidly evolving global landscape.',
      },
    },
    coreValues: {
      title: 'Our Core Values',
      values: [
        {
          id: 'val-excellence',
          title: 'Excellence',
          icon: 'award',
          description:
            'We are committed to delivering excellence in everything we do, striving for the highest standards of quality, professionalism, and innovation in our training solutions.',
        },
        {
          id: 'val-integrity',
          title: 'Integrity',
          icon: 'shield',
          description:
            'We conduct ourselves with honesty, transparency, and ethical integrity in all our interactions, building trust with our clients, partners, and stakeholders.',
        },
        {
          id: 'val-customer-centric',
          title: 'Customer Centric',
          icon: 'users',
          description:
            'We are dedicated to understanding and exceeding the needs and expectations of our clients, providing them with personalized attention, exceptional service, and value-added solutions.',
        },
        {
          id: 'val-result-oriented',
          title: 'Result Oriented',
          icon: 'trending',
          description:
            'We are dedicated to the success and satisfaction of our clients, going above and beyond to ensure that their goals and objectives are met with our training solutions.',
        },
      ],
    },
    performanceCta: {
      title: "Elevate Your Team's Performance With Results–Driven Skills",
      description:
        "Transform your workforce with Learnify' globally recognized IT training and certifications, designed to empower your teams with the knowledge and expertise they need to thrive. Our adaptable corporate learning solutions are tailored to upskill, upgrade, and modernize your workforce in a variety of IT technologies, including information security, cloud security, data privacy, security testing, and more.",
      buttonLabel: 'Raise a Request Now',
    },
  },
  corporateTrainingSection: {
    deliverySubtitle: 'Global Delivery in Action',
    deliveryTitle: 'Real-World Corporate Training Delivery',
    deliveryDescription: 'From government ministries to global tech enterprises, our field-tested instructors deliver tailored technical programs onsite across the Middle East, Europe, Africa, and Asia.',
    deliveryStats: {
      score: '4.8/5',
      upskilled: '70,000+',
      labs: '100%'
    },
    deliveryCards: [
      {
        id: 'del-1',
        locationTag: 'Muscat, Oman',
        badgeText: 'Executive Engagement',
        title: 'Customized Enterprise Immersion',
        description: 'Dedicated onsite engagement delivered for enterprise engineering leadership with live...',
        imageUrl: '/images/delivered_traning_1.webp',
      },
      {
        id: 'del-2',
        locationTag: 'Dedicated Client Facility',
        badgeText: 'Onsite Delivery',
        title: 'Corporate Training Delegation',
        description: '2-Week intensive program focusing on enterprise systems governance and production readiness...',
        imageUrl: '/images/delivered_traning_2.webp',
      },
      {
        id: 'del-3',
        locationTag: 'Riyadh, KSA',
        badgeText: 'Hybrid Workshop',
        title: 'Advanced Cloud Architecture',
        description: 'Comprehensive AWS and Azure migration strategies for cross-functional teams...',
        imageUrl: '/images/comptia_security_soc_1787771516564.webp',
      },
      {
        id: 'del-4',
        locationTag: 'Bengaluru, India',
        badgeText: 'Technical Bootcamp',
        title: 'DevOps & Kubernetes Masterclass',
        description: 'Intensive hands-on labs focusing on CI/CD pipelines and cluster management...',
        imageUrl: '/images/linux_datacenter_admin_1788294344630.webp',
      },
    ],
    cohortCards: [],
    testimonialsTitle: 'What Corporate Teams Say',
    testimonialsSubtitle: 'Swipe or scroll to view verified client reviews across global enterprise cohorts.',
    testimonials: [
      {
        id: 'test-1',
        quote: "The instructor's real-time problem-solving scenarios and deep domain authority made our cloud transition frictionless. One of the best corporate programs our tech unit has completed.",
        authorName: 'Saleem Mohd',
        authorTitle: 'Enterprise IT Specialist',
        authorLocation: 'UAE',
        rating: 5,
        initials: 'SM'
      },
      {
        id: 'test-2',
        quote: "100% practical lab exercises directly mapped to our production environments. The custom tailored curriculum saved us months of trial-and-error migration risks.",
        authorName: 'Vineet Tomar',
        authorTitle: 'DevOps Tech Lead',
        authorLocation: 'India',
        rating: 5,
        initials: 'VT'
      },
      {
        id: 'test-3',
        quote: "The trainer walked through defensive architecture and threat mitigation using real enterprise attack simulations. Outstanding quality and interactive delivery.",
        authorName: 'Jyoti Negi',
        authorTitle: 'Security Operations',
        authorLocation: 'Europe Cohort',
        rating: 5,
        initials: 'JN'
      },
      {
        id: 'test-4',
        quote: "The hybrid structure gave our distributed team identical quality, collaborative lab sandboxes, and personalized guidance from certified senior mentors.",
        authorName: 'Sachith Sharma',
        authorTitle: 'Solutions Architect',
        authorLocation: 'APAC',
        rating: 5,
        initials: 'SS'
      },
      {
        id: 'test-5',
        quote: "The personalized learning paths and continuous assessments helped our entire engineering department align on modern DevOps practices within just a few weeks.",
        authorName: 'David O.',
        authorTitle: 'Head of Engineering',
        authorLocation: 'UK',
        rating: 5,
        initials: 'DO'
      },
      {
        id: 'test-6',
        quote: "A phenomenal learning experience. The focus on real-world application meant our team could immediately implement the newly acquired cloud security protocols.",
        authorName: 'Aisha K.',
        authorTitle: 'CISO',
        authorLocation: 'KSA',
        rating: 5,
        initials: 'AK'
      },
      {
        id: 'test-7',
        quote: "We required a highly specialized syllabus for our legacy system migration, and Learnify delivered beyond our expectations with a top-tier expert instructor.",
        authorName: 'Raj Patel',
        authorTitle: 'VP of Technology',
        authorLocation: 'Singapore',
        rating: 5,
        initials: 'RP'
      },
      {
        id: 'test-8',
        quote: "Our data analytics team doubled their efficiency after the intensive PowerBI and advanced SQL masterclass. Highly recommend their corporate training.",
        authorName: 'Maria G.',
        authorTitle: 'Data Analytics Lead',
        authorLocation: 'Spain',
        rating: 5,
        initials: 'MG'
      }
    ],
  },
  footer: {
    brandName: 'Learnify Solutions',
    description:
      'Empowering the modern workforce through premium technical education and structured pathways.',
    copyright: '© 2024 Learnify Solutions. All rights reserved.',
    columns: [
      {
        title: 'Platform',
        links: [
          { label: 'Learnify', href: '#' },
          { label: 'Courses', href: '#courses' },
          { label: 'Learning', href: '#solutions' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Contact', href: '#contact' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '#privacy' },
        ],
      },
    ],
  },
};

