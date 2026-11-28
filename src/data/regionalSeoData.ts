import { Course } from '../types';
import { sampleCourses } from './coursesData';

export const SITE_BASE_URL = 'https://www.learnify-solutions.com';

export type RegionCode =
  | 'ae'
  | 'za'
  | 'uk'
  | 'de'
  | 'nl'
  | 'eu'
  | 'ao'
  | 'sa'
  | 'ng'
  | 'sg'
  | 'in';

export const ALL_REGION_CODES: RegionCode[] = [
  'uk',
  'eu',
  'de',
  'nl',
  'ae',
  'sa',
  'za',
  'ao',
  'ng',
  'sg',
  'in',
];

export interface RegionBatchSchedule {
  name: string;
  timing: string;
  cadence: string;
  format: string;
}

export interface RegionConfig {
  code: RegionCode;
  countryName: string;
  shortName: string;
  switcherLabel: string;
  hreflang: string;
  geoRegionMeta: string;
  phonePlaceholder: string;
  hubPath: string;
  hubTitle: string;
  hubDescription: string;
  hubKeywords: string;
  cities: string[];
  primaryCitiesLabel: string;
  businessDistricts: string;
  timezone: string;
  currency: 'AED' | 'ZAR' | 'GBP' | 'EUR' | 'SAR' | 'SGD' | 'INR' | 'USD';
  complianceContext: string;
  keyIndustries: string[];
  invoicingNote: string;
  examCenterNote: string;
  schedules: RegionBatchSchedule[];
  hubFaqs: Array<{ q: string; a: string }>;
}

export const REGION_CONFIGS: Record<RegionCode, RegionConfig> = {
  uk: {
    code: 'uk',
    countryName: 'United Kingdom',
    shortName: 'United Kingdom',
    switcherLabel: 'UK (London & GBP)',
    hreflang: 'en-GB',
    geoRegionMeta: 'GB',
    phonePlaceholder: '+44...',
    hubPath: '/uk',
    hubTitle: 'CompTIA, Microsoft Azure & AWS Certification Training in London & UK | Learnify Solutions',
    hubDescription:
      'Live instructor-led & corporate CompTIA Security+, A+, ITF+, Microsoft Azure (AZ-104, AI-102, DP-900, PL-300), AWS & Kubernetes bootcamps in London, Manchester, Birmingham, Edinburgh & Leeds. GMT/BST cohorts, GBP VAT POs & 24/7 labs.',
    hubKeywords:
      'IT certification training UK, CompTIA training London, Microsoft Azure AZ-104 UK, CompTIA Security+ training UK, Power BI PL-300 course London, AWS Solutions Architect UK, DP-900 training UK, corporate IT training Manchester Edinburgh, Learnify Solutions UK',
    cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Leeds', 'Bristol', 'Reading', 'Glasgow'],
    primaryCitiesLabel: 'London, Manchester, Birmingham, Edinburgh & Leeds',
    businessDistricts: 'City of London, Canary Wharf, Tech City (Shoreditch), Spinningfields (Manchester), Thames Valley (Reading) & Edinburgh Financial District',
    timezone: 'GMT / BST',
    currency: 'GBP',
    complianceContext: 'UK NCSC Cyber Essentials Plus, UK GDPR, Financial Conduct Authority (FCA) operational resilience & NHS DSPT standards',
    keyIndustries: [
      'Financial Services, FinTech & Insurance (City of London / Canary Wharf)',
      'UK Defence, Aerospace & Public Sector Digital',
      'Healthcare IT & NHS Digital Transformation',
      'Enterprise Cloud Consultancies & Managed Service Providers (MSPs)',
      'Telecoms, Retail & E-Commerce Platforms (Manchester / Thames Valley)',
    ],
    invoicingNote:
      'Supports UK corporate Purchase Orders (POs), BACS / Faster Payments bank transfers, multi-seat enterprise vouchers, and GBP / USD corporate invoicing for British enterprises.',
    examCenterNote:
      'Full readiness for Pearson VUE Authorized Test Centers across London, Manchester, Birmingham, Edinburgh, Leeds & Bristol, plus OnVUE UK online proctored exams.',
    schedules: [
      {
        name: 'UK Weekday Intensive Bootcamp',
        timing: '09:00 AM – 05:00 PM GMT/BST',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Corporate Onsite UK',
      },
      {
        name: 'London Evening Executive Cohort',
        timing: '06:30 PM – 09:30 PM GMT/BST',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'UK Weekend Certification Track',
        timing: '09:30 AM – 02:30 PM GMT/BST',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Are CompTIA, Microsoft Azure, and AWS cohorts scheduled in UK GMT / BST?',
        a: 'Yes. All United Kingdom cohorts operate strictly on GMT / BST with full-day weekday bootcamps for corporate teams and evening/weekend options tailored for working UK IT professionals across London, Manchester, Birmingham, Edinburgh, and Leeds.',
      },
      {
        q: 'Can UK employers pay in GBP via Corporate Purchase Orders?',
        a: 'Yes. Learnify Solutions accepts UK Corporate Purchase Orders (POs), BACS bank transfers, and bulk enterprise seat packages invoiced in GBP (£) or USD ($) for British IT departments.',
      },
      {
        q: 'Do your courses align with UK NCSC Cyber Essentials and FCA resilience expectations?',
        a: 'Yes. Our CompTIA Security+, Microsoft SC-900, and AWS Security labs reinforce UK GDPR governance, Zero Trust identity controls, NCSC Cyber Essentials Plus practices, and FCA operational resilience workflows.',
      },
      {
        q: 'Where can learners sit Pearson VUE exams across the United Kingdom?',
        a: 'Learners can book at Pearson VUE Authorized Test Centers across Central London, Stratford, Manchester, Birmingham, Edinburgh, Bristol, and Leeds, or take proctored exams online via OnVUE.',
      },
    ],
  },
  eu: {
    code: 'eu',
    countryName: 'Europe (EU)',
    shortName: 'Europe',
    switcherLabel: 'Europe Hub (EU & EUR)',
    hreflang: 'en-IE',
    geoRegionMeta: 'EU',
    phonePlaceholder: '+353 / +33...',
    hubPath: '/eu',
    hubTitle: 'CompTIA, Microsoft Azure & AWS Certification Training in Europe | Learnify Solutions',
    hubDescription:
      'Authorized live online CompTIA, Microsoft Azure (AZ-104, AI-102, DP-900, PL-900), AWS & Kubernetes certification bootcamps across Ireland (Dublin), France (Paris), Spain, Italy, Poland & Nordics. CET/WET schedules & EUR corporate POs.',
    hubKeywords:
      'IT certification training Europe, CompTIA training Europe, Microsoft Azure training Dublin Paris, NIS2 DORA cybersecurity training EU, AWS training Europe, Kubernetes CKA training EU, Power BI PL-300 Europe, corporate IT training EUR',
    cities: ['Dublin', 'Paris', 'Madrid', 'Milan', 'Stockholm', 'Warsaw', 'Copenhagen', 'Vienna'],
    primaryCitiesLabel: 'Dublin, Paris, Madrid, Milan, Stockholm & Warsaw',
    businessDistricts: 'Dublin Silicon Docks, Paris La Défense, Madrid AZCA, Milan Porta Nuova, Stockholm Kista & Warsaw Spire',
    timezone: 'CET / WET (UTC+1/+2)',
    currency: 'EUR',
    complianceContext: 'EU NIS2 Directive, EU Digital Operational Resilience Act (DORA), EU AI Act & European GDPR governance standards',
    keyIndustries: [
      'European Banking, Insurance & DORA-Regulated FinTech',
      'EMEA Cloud & SaaS Engineering Hubs (Dublin / Paris / Stockholm)',
      'Enterprise Telecoms, Energy Grids & NIS2 Essential Entities',
      'European Industrial Automation, Pharma & Life Sciences',
      'Global Shared Services & Nearshore Engineering Centers (Poland / Spain)',
    ],
    invoicingNote:
      'Supports EU SEPA wire transfers, EUR corporate Purchase Orders (POs), cross-border B2B enterprise invoicing, and multi-country European team licensing.',
    examCenterNote:
      'Aligned to Pearson VUE Authorized Testing Centers across Dublin, Paris, Madrid, Barcelona, Milan, Rome, Stockholm, Warsaw & Vienna, plus OnVUE online proctoring in English.',
    schedules: [
      {
        name: 'European Weekday Intensive',
        timing: '09:00 AM – 05:00 PM CET/CEST',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Private EU Corporate',
      },
      {
        name: 'EMEA After-Hours Flex Track',
        timing: '06:30 PM – 09:30 PM CET/CEST',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'European Weekend Bootcamp',
        timing: '09:30 AM – 02:30 PM CET/CEST',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Cohort',
      },
    ],
    hubFaqs: [
      {
        q: 'Which European countries are covered in the Learnify Europe CET/WET schedule?',
        a: 'Our European schedule serves IT professionals and multinational teams across Ireland, France, Spain, Italy, Sweden, Denmark, Poland, Austria, Portugal, and neighboring EU member states with convenient CET/CEST & WET timings.',
      },
      {
        q: 'Do you support SEPA bank transfers and EUR corporate invoicing for EU companies?',
        a: 'Yes. European employers can procure team cohorts and certification packages via official Corporate Purchase Orders (POs) and SEPA wire transfers invoiced in EUR (€) or USD ($).',
      },
      {
        q: 'How do your cybersecurity & cloud courses align with EU NIS2 and DORA?',
        a: 'Our CompTIA Security+, PenTest+, Microsoft SC-900, and AWS Security bootcamps focus on Zero Trust access control, third-party cloud risk, incident response governance, and resilience architectures prioritized under EU NIS2 and DORA.',
      },
      {
        q: 'Are European cohorts delivered in English with 24/7 cloud labs?',
        a: 'Yes. Every program is taught in clear international English by senior practitioners and includes 24/7 browser-based cloud sandbox labs and 365-day HD recordings.',
      },
    ],
  },
  de: {
    code: 'de',
    countryName: 'Germany & DACH',
    shortName: 'Germany',
    switcherLabel: 'Germany & DACH (EUR)',
    hreflang: 'en-DE',
    geoRegionMeta: 'DE',
    phonePlaceholder: '+49...',
    hubPath: '/de',
    hubTitle: 'Microsoft Azure, CompTIA & Kubernetes Training Germany (EUR Quote) | Learnify',
    hubDescription:
      'Live English CompTIA, Microsoft Azure (AZ-104, AI-102, Copilot KMU), AWS & Kubernetes bootcamps in Frankfurt, Munich, Berlin & Zurich. Browser cloud sandboxes included (no local VM needed / keine lokale VM), CET cohorts & EUR corporate POs.',
    hubKeywords:
      'IT certification training Germany, CompTIA Security+ Germany, Microsoft Azure AZ-104 Frankfurt Munich, mit welcher machine kurs az 104, AWS training Berlin Germany, enterprise kubernetes cka course Germany, Power BI PL-300 Germany, corporate IT training EUR, BSI C5 cloud compliance training',
    cities: ['Frankfurt', 'Munich', 'Berlin', 'Hamburg', 'Stuttgart', 'Cologne', 'Düsseldorf', 'Zurich'],
    primaryCitiesLabel: 'Frankfurt, Munich, Berlin, Hamburg & Zurich',
    businessDistricts: 'Frankfurt Bankenviertel, Munich Tech Corridor, Berlin Mitte, Hamburg HafenCity, Stuttgart Automotive Belt & Zurich West',
    timezone: 'CET / CEST',
    currency: 'EUR',
    complianceContext: 'German BSI IT-Grundschutz & BSI C5 cloud criteria, EU NIS2, DORA & strict German/Swiss data residency (GDPR)',
    keyIndustries: [
      'Automotive, Manufacturing & Industrial IoT (Munich / Stuttgart)',
      'Banking, Insurance & Capital Markets (Frankfurt / Zurich)',
      'Enterprise Cloud Migration & SAP-on-Azure Teams',
      'Telecommunications, Logistics & Energy Utilities',
      'International SaaS & Cybersecurity Startups (Berlin / Hamburg)',
    ],
    invoicingNote:
      'Supports German and DACH corporate Purchase Orders (POs), EUR / CHF / USD B2B SEPA invoicing, and multi-seat enterprise training vouchers.',
    examCenterNote:
      'Complete exam readiness for Pearson VUE testing centers across Berlin, Munich, Frankfurt, Hamburg, Stuttgart, Cologne & Zurich, as well as OnVUE online proctoring.',
    schedules: [
      {
        name: 'Germany & DACH Weekday Bootcamp',
        timing: '09:00 AM – 05:00 PM CET/CEST',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Private DACH Corporate',
      },
      {
        name: 'Frankfurt / Munich Evening Flex',
        timing: '06:30 PM – 09:30 PM CET/CEST',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'DACH Weekend Certification Cohort',
        timing: '09:30 AM – 02:30 PM CET/CEST',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Are courses delivered in English for multinational engineering teams in Germany & Switzerland?',
        a: 'Yes. All certification courses are taught live in English matching official Microsoft, CompTIA, and AWS exam terminology—ideal for international engineering teams in Frankfurt, Munich, Berlin, Hamburg, and Zurich.',
      },
      {
        q: 'Do you accept German company Purchase Orders and EUR SEPA payments?',
        a: 'Yes. Corporate HR and L&D departments in Germany, Austria, and Switzerland can pay via official Purchase Orders (POs) and SEPA bank transfers in EUR.',
      },
      {
        q: 'Which Microsoft & cloud tracks are most popular among DACH enterprises?',
        a: 'German enterprises prioritize Microsoft Azure Administrator (AZ-104) for Frankfurt (Germany West Central) migrations, Microsoft Copilot for KMU/enterprise teams (MS-4018), Azure AI Engineer (AI-102), Power BI (PL-300), CompTIA Security+, and Enterprise Kubernetes (CKA).',
      },
      {
        q: 'Which machine/laptop specs do learners need—and are browser cloud labs included without local VMs?',
        a: 'Any standard Windows, Mac, or Linux laptop with Chrome or Edge works—zero local VM or high-end PC is required (keine lokale VM erforderlich). Every learner receives pre-provisioned 24/7 browser cloud sandboxes included.',
      },
    ],
  },
  nl: {
    code: 'nl',
    countryName: 'Netherlands & Benelux',
    shortName: 'Netherlands',
    switcherLabel: 'Netherlands & Benelux (EUR)',
    hreflang: 'en-NL',
    geoRegionMeta: 'NL',
    phonePlaceholder: '+31...',
    hubPath: '/nl',
    hubTitle: 'CompTIA, Microsoft Azure & AWS Certification Training in Netherlands & Benelux | Learnify Solutions',
    hubDescription:
      'Authorized live instructor-led CompTIA, Microsoft Azure (AZ-104, AI-102, DP-900, PL-900), AWS & Kubernetes bootcamps across Amsterdam, Rotterdam, Utrecht, Eindhoven, The Hague & Brussels. CET timezones, EUR corporate invoicing & 24/7 cloud labs.',
    hubKeywords:
      'IT certification training Netherlands, CompTIA training Amsterdam, Microsoft Azure AZ-104 Netherlands, CompTIA ITF+ Netherlands, DP-900 training Amsterdam, PL-900 Power Platform Netherlands, Power BI course Rotterdam Utrecht, corporate IT training Benelux EUR',
    cities: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven', 'The Hague', 'Brussels', 'Antwerp', 'Luxembourg'],
    primaryCitiesLabel: 'Amsterdam, Rotterdam, Utrecht, Eindhoven & Brussels',
    businessDistricts: 'Amsterdam Zuidas, High Tech Campus Eindhoven, Rotterdam Port Innovation District, Utrecht Centraal & Brussels EU Quarter',
    timezone: 'CET / CEST',
    currency: 'EUR',
    complianceContext: 'Dutch NCSC security guidelines, EU NIS2 Directive, DORA financial resilience & Netherlands North Azure data residency',
    keyIndustries: [
      'Amsterdam FinTech, Banking & Payments Infrastructure',
      'High-Tech Hardware, Semiconductors & R&D (Eindhoven Brainport)',
      'Port Logistics, Maritime Supply Chain & Smart Infrastructure (Rotterdam)',
      'International Telecoms, SaaS & Managed Security Providers',
      'European Public Sector & Regulatory Agencies (The Hague / Brussels)',
    ],
    invoicingNote:
      'Supports Dutch & Benelux corporate Purchase Orders (POs), EUR SEPA invoices, and team upskilling budgets across Netherlands, Belgium, and Luxembourg.',
    examCenterNote:
      'Tailored preparation for Pearson VUE testing centers across Amsterdam, Rotterdam, Utrecht, Eindhoven, and Brussels, plus OnVUE English online proctoring.',
    schedules: [
      {
        name: 'Benelux Weekday Bootcamp',
        timing: '09:00 AM – 05:00 PM CET/CEST',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Private Corporate',
      },
      {
        name: 'Amsterdam Evening Executive Track',
        timing: '06:30 PM – 09:30 PM CET/CEST',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'Netherlands Weekend Cohort',
        timing: '09:30 AM – 02:30 PM CET/CEST',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Why does Learnify offer dedicated Netherlands & Benelux cohorts?',
        a: 'Because international IT teams in Amsterdam, Eindhoven, Utrecht, Rotterdam, and Brussels rely on English-language vendor certification exams—and need CET/CEST live instructors, 24/7 labs, and EUR corporate PO invoicing.',
      },
      {
        q: 'Are Microsoft Fundamentals (DP-900, PL-900, SC-900) and CompTIA ITF+ available for Benelux teams?',
        a: 'Yes. We run dedicated fast-track cohorts for Microsoft Azure Data Fundamentals (DP-900), Power Platform (PL-900), Security (SC-900), CompTIA ITF+, and senior tracks like AZ-104, AI-102, and Security+.',
      },
      {
        q: 'Can Netherlands companies pay in EUR using a Purchase Order?',
        a: 'Yes. Employers across the Netherlands and Benelux can enroll teams via corporate Purchase Orders and SEPA bank transfers in EUR.',
      },
      {
        q: 'Do you cover Azure Netherlands North / West Europe architecture specifics?',
        a: 'Yes. Our Azure Administrator (AZ-104), AI-102, and Data labs align directly with European GDPR data residency, West Europe / Netherlands North zones, and NIS2 security controls.',
      },
    ],
  },
  ae: {
    code: 'ae',
    countryName: 'United Arab Emirates',
    shortName: 'UAE',
    switcherLabel: 'UAE (Dubai & AED)',
    hreflang: 'en-AE',
    geoRegionMeta: 'AE',
    phonePlaceholder: '+971...',
    hubPath: '/ae',
    hubTitle: 'CompTIA, Microsoft & AWS Certification Training in Dubai & UAE | Learnify Solutions',
    hubDescription:
      'Authorized live online & corporate CompTIA, Microsoft Azure, Power BI, AWS & Kubernetes certification bootcamps in Dubai, Abu Dhabi, Sharjah, Al Ain & Ajman. GST timezones, AED corporate POs & 24/7 cloud labs.',
    hubKeywords:
      'IT certification training Dubai, Cloud computing courses in Dubai, CompTIA training UAE, Microsoft Azure training Dubai, AWS training Dubai, corporate IT training Abu Dhabi, AZ-104 Dubai, Power BI training Dubai, Power BI course in Dubai, CompTIA Security+ UAE, Sharjah IT certification, Learnify Solutions UAE',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Fujairah'],
    primaryCitiesLabel: 'Dubai, Abu Dhabi, Sharjah, Al Ain & Ajman',
    businessDistricts: 'Dubai Internet City, Dubai Knowledge Park, DIFC, Abu Dhabi Global Market (ADGM), Media City & Sharjah Research Park',
    timezone: 'GST (UTC+4)',
    currency: 'AED',
    complianceContext: 'UAE NESA, TDRA, ADHICS & Federal PDPL cybersecurity and cloud governance standards',
    keyIndustries: [
      'Energy & Oil/Gas Infrastructure',
      'Aviation, Ports & Logistics',
      'DIFC & ADGM Banking / FinTech',
      'UAE Smart Government & Healthcare',
      'Enterprise Telecom & Cloud Service Providers',
    ],
    invoicingNote:
      'Supports corporate Purchase Orders (POs), multi-seat enterprise licensing, and VAT-compliant invoicing in AED or USD for UAE organizations.',
    examCenterNote:
      'Full exam readiness for Pearson VUE authorized testing centers in Dubai (Dubai Knowledge Park / DIAC), Abu Dhabi, Sharjah & Al Ain, plus OnVUE online proctored exams.',
    schedules: [
      {
        name: 'UAE Weekday Intensive (Fast-Track)',
        timing: '09:00 AM – 05:00 PM GST',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Corporate Onsite',
      },
      {
        name: 'Dubai Evening Executive Track',
        timing: '07:00 PM – 10:00 PM GST',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'UAE Weekend Cohort',
        timing: '09:30 AM – 02:30 PM GST',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Are CompTIA, Microsoft, and AWS classes scheduled in UAE Gulf Standard Time (GST)?',
        a: 'Yes. All UAE cohorts run on Gulf Standard Time (UTC+4) with morning executive sessions, evening flex tracks after work hours across Dubai, Abu Dhabi, Sharjah, Al Ain & Ajman, and weekend options.',
      },
      {
        q: 'Can UAE companies pay in AED via Corporate Purchase Orders?',
        a: 'Yes. Learnify Solutions supports corporate Purchase Orders (POs), multi-seat enterprise vouchers, and corporate invoicing in AED or USD for teams in Dubai, Abu Dhabi, and across all Emirates.',
      },
      {
        q: 'Do you deliver dedicated onsite corporate training in Dubai and Abu Dhabi?',
        a: 'Yes. For teams of 6 or more engineers, we deploy senior certified instructors either at your office campus (DIFC, Dubai Internet City, ADGM) or in a private virtual cohort tailored to your architecture.',
      },
      {
        q: 'Are 24/7 hands-on labs and exam preparation included?',
        a: 'Every enrollment includes browser-based 24/7 cloud sandbox labs, official syllabus alignment, mock exam simulations, and 365-day access to HD session recordings.',
      },
    ],
  },
  za: {
    code: 'za',
    countryName: 'South Africa',
    shortName: 'South Africa',
    switcherLabel: 'South Africa (ZAR)',
    hreflang: 'en-ZA',
    geoRegionMeta: 'ZA',
    phonePlaceholder: '+27...',
    hubPath: '/za',
    hubTitle: 'CompTIA, Microsoft & AWS Certification Training in South Africa | Learnify Solutions',
    hubDescription:
      'Live instructor-led CompTIA, Microsoft Azure, Power BI, AWS & Kubernetes certification bootcamps across Gauteng (Johannesburg, Sandton, Midrand, Pretoria), Cape Town, Durban & Gqeberha. SAST timezones, ZAR corporate POs & 24/7 cloud labs.',
    hubKeywords:
      'CompTIA training South Africa, where to write CompTIA A+ in Gauteng, Microsoft Azure training Johannesburg, AWS training South Africa, IT certification courses Cape Town, CompTIA Security+ South Africa, AZ-104 Pretoria, DP-900 South Africa, Power BI course South Africa, corporate IT training Sandton Midrand',
    cities: ['Johannesburg', 'Sandton', 'Midrand', 'Pretoria', 'Centurion', 'Cape Town', 'Durban', 'Gqeberha', 'Stellenbosch'],
    primaryCitiesLabel: 'Johannesburg, Pretoria (Gauteng), Cape Town & Durban',
    businessDistricts: 'Sandton, Midrand, Rosebank, Centurion, Menlyn (Pretoria), Century City (Cape Town) & Umhlanga Ridge (Durban)',
    timezone: 'SAST (UTC+2)',
    currency: 'ZAR',
    complianceContext: 'POPIA data protection, FSCA cyber resilience & South African corporate Workplace Skills Plan (WSP) readiness',
    keyIndustries: [
      'Banking, Insurance & FinTech (Sandton / Cape Town)',
      'Telecommunications & ISP Networks',
      'Mining, Manufacturing & Supply Chain',
      'Managed IT Services & BPO Centers',
      'Public Sector & Healthcare IT Systems',
    ],
    invoicingNote:
      'Supports corporate Purchase Orders (POs), bulk team seat packages, and streamlined enterprise invoicing in ZAR or USD for South African businesses.',
    examCenterNote:
      'Structured preparation for where to write your exam at Pearson VUE testing centers across Gauteng (Johannesburg, Sandton, Midrand, Pretoria, Centurion), Cape Town, Durban & Gqeberha, plus flexible OnVUE online proctoring.',
    schedules: [
      {
        name: 'SA Weekday Bootcamp (Full-Time)',
        timing: '08:30 AM – 04:30 PM SAST',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Private Corporate',
      },
      {
        name: 'SA After-Hours Flex Track',
        timing: '06:00 PM – 09:00 PM SAST',
        cadence: 'Tue / Thu / Sat (4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'Weekend Certification Cohort',
        timing: '09:00 AM – 02:00 PM SAST',
        cadence: 'Saturdays & Sundays (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Do live CompTIA, Microsoft, and AWS sessions run in South Africa Standard Time (SAST)?',
        a: 'Yes. All South Africa batches are scheduled in SAST (UTC+2), with daytime corporate bootcamps and evening/weekend options designed for working IT professionals across Gauteng (Johannesburg, Sandton, Midrand, Pretoria), Cape Town, Durban, and Gqeberha.',
      },
      {
        q: 'Can South African companies request corporate quotes and pay in ZAR?',
        a: 'Yes. We provide official corporate proposals, multi-seat team discounts, and enterprise invoicing in ZAR or USD with corporate Purchase Order support.',
      },
      {
        q: 'Do the cloud labs require high bandwidth or expensive local hardware?',
        a: 'No. Our 24/7 virtual sandbox labs run entirely in the cloud through a lightweight browser interface, making them smooth and reliable across fibre or LTE connections anywhere in South Africa.',
      },
      {
        q: 'Are recordings provided in case of schedule conflicts or power/connectivity interruptions?',
        a: 'Yes! Every live session is recorded in HD and uploaded immediately to your portal with 365-day replay access plus dedicated 1-on-1 doubt clearing.',
      },
    ],
  },
  ao: {
    code: 'ao',
    countryName: 'Angola & Southern Africa',
    shortName: 'Angola',
    switcherLabel: 'Angola (Luanda & USD)',
    hreflang: 'en-AO',
    geoRegionMeta: 'AO',
    phonePlaceholder: '+244...',
    hubPath: '/ao',
    hubTitle: 'CompTIA, Microsoft Azure & AWS Online Training in Angola & Luanda | Learnify Solutions',
    hubDescription:
      'Live online & corporate CompTIA (Security+, A+, Network+), Microsoft Azure (AZ-104, AI-102, DP-900, PL-300), AWS & Kubernetes bootcamps in Luanda, Benguela, Lobito & Cabinda. WAT (UTC+1) schedules, browser cloud labs & USD corporate POs.',
    hubKeywords:
      'CompTIA training in Angola, CompTIA online training Luanda, CompTIA Security+ Angola, CompTIA A+ training Angola, Microsoft Azure AZ-104 training Angola, AWS training Luanda Angola, Power BI training Angola, corporate IT training Luanda',
    cities: ['Luanda', 'Benguela', 'Lobito', 'Lubango', 'Cabinda', 'Huambo', 'Soyo'],
    primaryCitiesLabel: 'Luanda, Benguela, Lobito, Cabinda & Lubango',
    businessDistricts: 'Luanda Bay / Baixa de Luanda, Talatona Enterprise Hub, Belas Business Park, Cabinda Energy Zone & Soyo LNG Corridor',
    timezone: 'WAT (UTC+1)',
    currency: 'USD',
    complianceContext: 'Banco Nacional de Angola (BNA) banking IT resilience, Angola Personal Data Protection Law (APD), telecom security & oil-and-gas OT/IT infrastructure controls',
    keyIndustries: [
      'Oil, Gas, LNG & Energy Infrastructure (Luanda / Cabinda / Soyo)',
      'Angolan Commercial Banking & Mobile Payments (Talatona / Baixa)',
      'Telecommunications, Subsea Fiber & ISP Networks',
      'Mining, Port Logistics & Maritime Freight (Lobito / Benguela)',
      'Multinational Engineering & EPC Contractors',
    ],
    invoicingNote:
      'Supports USD international wire transfers, multi-seat corporate Purchase Orders (POs), and group training vouchers for Angolan and multinational companies.',
    examCenterNote:
      'Full exam voucher & readiness support for Pearson VUE Authorized Testing Centers in Luanda and OnVUE proctored online exams from Angola.',
    schedules: [
      {
        name: 'Angola & WAT Weekday Intensive',
        timing: '09:00 AM – 05:00 PM WAT',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Instructor-Led Online / Private Corporate',
      },
      {
        name: 'Luanda Evening Executive Cohort',
        timing: '06:30 PM – 09:30 PM WAT',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'Angola Weekend Certification Track',
        timing: '09:30 AM – 02:30 PM WAT',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Can professionals and corporate teams in Luanda and Angola join CompTIA, Azure, and AWS training live online?',
        a: 'Yes. Learnify delivers live instructor-led online cohorts timed strictly to West Africa Time (WAT / UTC+1) so engineers across Luanda, Talatona, Cabinda, Lobito, and Benguela can attend without travel.',
      },
      {
        q: 'Do you require heavy laptops or local VMs for CompTIA, Azure, and Cloud labs in Angola?',
        a: 'No. All 24/7 cloud sandbox labs run cleanly inside any standard Chrome or Edge browser over standard office or 4G/fibre internet, with zero local virtual machines needed.',
      },
      {
        q: 'Can Angolan energy, banking, and telecom companies book private team batches via Corporate PO?',
        a: 'Yes. We provide official USD pro-forma invoices, corporate Purchase Order (PO) onboarding, multi-seat team discounts, and dedicated technical instructors for private company cohorts in Angola.',
      },
      {
        q: 'Are CompTIA and Microsoft exams aligned to English vendor terminology?',
        a: 'Yes. Training covers the official English exam terminology tested at Pearson VUE Luanda and online OnVUE proctored exams so Angolan engineers pass on their first attempt.',
      },
    ],
  },
  sa: {
    code: 'sa',
    countryName: 'Saudi Arabia & Gulf (GCC)',
    shortName: 'Saudi Arabia',
    switcherLabel: 'Saudi & GCC (SAR)',
    hreflang: 'en-SA',
    geoRegionMeta: 'SA',
    phonePlaceholder: '+966...',
    hubPath: '/sa',
    hubTitle: 'CompTIA, Microsoft Azure, Power BI & AWS Training in Riyadh & Saudi Arabia | Learnify',
    hubDescription:
      'Live online & corporate CompTIA Security+, Microsoft Azure (AZ-104, AI-102, Copilot MS-4018), Power BI (PL-300), AWS & Kubernetes bootcamps in Riyadh, Jeddah, Dammam, Khobar, Doha & Muscat. AST (UTC+3) schedules & SAR corporate POs.',
    hubKeywords:
      'CompTIA Security+ training Riyadh, Microsoft Azure AZ-104 training Saudi Arabia, Power BI training Riyadh Jeddah, AWS training Saudi Arabia, Kubernetes CKA Riyadh, corporate IT training KSA, IT certification Doha Qatar Muscat',
    cities: ['Riyadh', 'Jeddah', 'Dammam', 'Al Khobar', 'NEOM / Tabuk', 'Doha', 'Muscat'],
    primaryCitiesLabel: 'Riyadh, Jeddah, Dammam, Al Khobar & Doha',
    businessDistricts: 'King Abdullah Financial District (KAFD Riyadh), Olaya IT Corridor, Jeddah Gate, Dhahran Techno Valley, Jubail Industrial City & West Bay Doha',
    timezone: 'AST (UTC+3)',
    currency: 'SAR',
    complianceContext: 'Saudi NCA Essential Cybersecurity Controls (ECC), SAMA Cybersecurity Framework, Saudi PDPL & Vision 2030 Cloud-First mandates',
    keyIndustries: [
      'Energy, Aramco Supply Chain & Petrochemicals (Dhahran / Jubail)',
      'Vision 2030 Giga-Projects, Smart Cities & Digital Infrastructure (Riyadh / NEOM)',
      'SAMA-Regulated Banking, FinTech & Insurance (KAFD / Jeddah)',
      'Government Ministries, Healthcare & Telecom Operators',
      'Regional GCC Financial & Enterprise Hubs (Doha / Muscat)',
    ],
    invoicingNote:
      'Supports official Saudi & GCC corporate Purchase Orders (POs), SAR / USD corporate invoicing, and multi-seat enterprise licensing.',
    examCenterNote:
      'Structured readiness for Pearson VUE Authorized Test Centers in Riyadh, Jeddah, Al Khobar, Doha, and Muscat, plus OnVUE online proctored exams.',
    schedules: [
      {
        name: 'KSA & GCC Weekday Intensive',
        timing: '09:00 AM – 05:00 PM AST',
        cadence: 'Sunday to Thursday (5 Days)',
        format: 'Live Virtual / Corporate Onsite KSA',
      },
      {
        name: 'Riyadh Evening Executive Track',
        timing: '07:00 PM – 10:00 PM AST',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'Saudi Weekend Bootcamp',
        timing: '10:00 AM – 03:00 PM AST',
        cadence: 'Friday & Saturday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Do Saudi Arabia & GCC batches follow Sunday–Thursday workweek and AST (UTC+3) timings?',
        a: 'Yes. All Saudi Arabia, Qatar, and Oman cohorts align to AST (UTC+3) with Sunday–Thursday full-day corporate options, Riyadh/Jeddah after-work evening classes, and Friday–Saturday weekend bootcamps.',
      },
      {
        q: 'How do your CompTIA and Microsoft Azure courses align with Saudi NCA ECC and SAMA frameworks?',
        a: 'Our CompTIA Security+, AZ-104, AWS Security, and SC-900 labs focus heavily on Zero Trust identity, encryption key management, SOC log monitoring, and Saudi data residency practices.',
      },
      {
        q: 'Can KSA enterprises pay in SAR or USD via official Corporate Purchase Orders?',
        a: 'Yes. Corporate L&D and procurement teams in Riyadh, Jeddah, Dhahran, and Doha can onboard teams via official Purchase Orders (POs) and commercial bank wire transfers.',
      },
      {
        q: 'Do you offer private team cohorts for Microsoft 365 Copilot and Power BI PL-300 in Riyadh?',
        a: 'Yes. Private enterprise cohorts for Power BI (PL-300), Microsoft 365 Copilot Studio (MS-4018), Azure AI-102, and Kubernetes CKA are among our fastest-growing GCC corporate programs.',
      },
    ],
  },
  ng: {
    code: 'ng',
    countryName: 'Nigeria, Kenya & Africa',
    shortName: 'Nigeria & East Africa',
    switcherLabel: 'Nigeria & Kenya (USD)',
    hreflang: 'en-NG',
    geoRegionMeta: 'NG',
    phonePlaceholder: '+234...',
    hubPath: '/ng',
    hubTitle: 'CompTIA, Microsoft Azure & AWS Online Training in Lagos, Nigeria & Nairobi | Learnify',
    hubDescription:
      'Live online CompTIA Security+, A+, Network+, Microsoft Azure (AZ-104, AI-102, PL-300), AWS & Kubernetes certification bootcamps in Lagos, Abuja, Port Harcourt, Nairobi & Accra. WAT/EAT cohorts & 24/7 cloud labs.',
    hubKeywords:
      'CompTIA training Lagos Nigeria, Microsoft Azure AZ-104 training Nigeria, AWS Solutions Architect course Lagos, CompTIA Security+ Nairobi Kenya, Power BI training Lagos Abuja, corporate IT training Nigeria Ghana',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Nairobi', 'Mombasa', 'Accra', 'Kigali'],
    primaryCitiesLabel: 'Lagos, Abuja, Nairobi & Accra',
    businessDistricts: 'Victoria Island & Ikoyi (Lagos), Central Business District (Abuja), Westlands & Upper Hill (Nairobi) & Airport City (Accra)',
    timezone: 'WAT / EAT (UTC+1/+3)',
    currency: 'USD',
    complianceContext: 'CBN Cybersecurity Risk Guidelines, Nigeria Data Protection Act (NDPA), Kenya Data Protection Act & West/East African FinTech security compliance',
    keyIndustries: [
      'Commercial Banking, FinTech & Digital Payments (Victoria Island / Nairobi)',
      'Telecoms, Towers & Cloud Connectivity Providers',
      'Oil, Gas & Energy Engineering (Port Harcourt / Lagos)',
      'Enterprise Software & Global Outsourcing Hubs (Kenya / Nigeria / Ghana)',
      'Public Sector & Healthcare IT Modernization',
    ],
    invoicingNote:
      'Supports USD corporate invoicing, official company Purchase Orders (POs), and multi-seat team packages for organizations across Nigeria, Kenya, and Ghana.',
    examCenterNote:
      'Complete readiness for Pearson VUE Authorized Testing Centers in Lagos, Abuja, Nairobi, and Accra, plus flexible OnVUE online proctored exams.',
    schedules: [
      {
        name: 'West & East Africa Weekday Intensive',
        timing: '09:00 AM – 05:00 PM WAT',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Corporate Cohort',
      },
      {
        name: 'Lagos & Nairobi Evening Flex Track',
        timing: '06:30 PM – 09:30 PM WAT',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'Africa Weekend Certification Track',
        timing: '09:30 AM – 02:30 PM WAT',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Are CompTIA, AWS, and Microsoft Azure cohorts accessible from Lagos, Abuja, Nairobi, and Accra?',
        a: 'Yes. Live classes run smoothly across WAT (UTC+1) and EAT (UTC+3) with low-bandwidth browser labs and instant HD session recordings included for 365 days.',
      },
      {
        q: 'Can FinTech and banking teams in Nigeria and Kenya request corporate group pricing?',
        a: 'Yes. Engineering and security teams of 5+ engineers qualify for corporate group discounts, private cohorts tailored to FinTech/CBN/NDPA controls, and formal USD PO invoicing.',
      },
      {
        q: 'Which certifications carry the highest hiring demand in Lagos and Nairobi?',
        a: 'CompTIA Security+ (SY0-701), Microsoft Azure Administrator (AZ-104), AWS Solutions Architect (SAA-C03), Power BI (PL-300), and Kubernetes (CKA) are top priorities across banking, telecom, and remote global tech roles.',
      },
      {
        q: 'Do learners get 24/7 cloud lab access without needing an expensive laptop?',
        a: 'Yes. Every program runs 100% inside browser cloud sandboxes—any standard laptop with Chrome or Edge is enough.',
      },
    ],
  },
  sg: {
    code: 'sg',
    countryName: 'Singapore & APAC',
    shortName: 'Singapore',
    switcherLabel: 'Singapore & APAC (SGD)',
    hreflang: 'en-SG',
    geoRegionMeta: 'SG',
    phonePlaceholder: '+65...',
    hubPath: '/sg',
    hubTitle: 'CompTIA, Microsoft Azure, Kubernetes & AWS Training in Singapore | Learnify Solutions',
    hubDescription:
      'Live instructor-led CompTIA Security+, Microsoft Azure (AZ-104, AI-102, Copilot MS-4018), Power BI (PL-300), AWS & Kubernetes (CKA) bootcamps in Singapore, Kuala Lumpur & APAC. SGT (UTC+8) cohorts & SGD corporate invoicing.',
    hubKeywords:
      'CompTIA Security+ training Singapore, Microsoft Azure AZ-104 Singapore, Power BI training Singapore, AWS Solutions Architect course Singapore, Kubernetes CKA training Singapore, corporate IT training Singapore SGD',
    cities: ['Singapore', 'Jurong East', 'Marina Bay', 'Changi Business Park', 'Kuala Lumpur', 'Jakarta', 'Manila'],
    primaryCitiesLabel: 'Singapore, Kuala Lumpur & APAC Tech Hubs',
    businessDistricts: 'Marina Bay Financial Centre, Raffles Place, One-North Tech Hub, Changi Business Park & KL Sentral',
    timezone: 'SGT (UTC+8)',
    currency: 'SGD',
    complianceContext: 'Singapore MAS Technology Risk Management (TRM), Personal Data Protection Act (PDPA), CSA cybersecurity baselines & multi-cloud governance',
    keyIndustries: [
      'Banking, Wealth Management & APAC FinTech (Marina Bay / Raffles Place)',
      'Cloud Hyperscalers, SaaS & Regional HQ Engineering (One-North)',
      'Maritime Logistics, Aviation & Smart Port Operations',
      'Healthcare Tech, Pharma & Telecom Enterprises',
      'Managed Security Service Providers (MSSPs) across ASEAN',
    ],
    invoicingNote:
      'Supports corporate Purchase Orders (POs), SGD / USD enterprise invoicing, and multi-seat regional APAC team packages.',
    examCenterNote:
      'Full readiness for Pearson VUE Authorized Testing Centers across Singapore and Kuala Lumpur, plus OnVUE online proctoring.',
    schedules: [
      {
        name: 'Singapore Weekday Intensive Bootcamp',
        timing: '09:00 AM – 05:00 PM SGT',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Private Corporate',
      },
      {
        name: 'Singapore Evening Executive Cohort',
        timing: '07:00 PM – 10:00 PM SGT',
        cadence: '3 Evenings/Week (3–4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'APAC Weekend Certification Track',
        timing: '09:30 AM – 02:30 PM SGT',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Bootcamp',
      },
    ],
    hubFaqs: [
      {
        q: 'Are Singapore & ASEAN classes scheduled in SGT (UTC+8)?',
        a: 'Yes. All APAC batches run strictly in Singapore Standard Time (UTC+8), covering daytime corporate bootcamps as well as evening and weekend schedules for working professionals.',
      },
      {
        q: 'Can Singapore enterprises procure team cohorts via Corporate Purchase Orders in SGD?',
        a: 'Yes. Corporate HR and IT departments can issue official Purchase Orders (POs) and settle corporate invoices in SGD or USD.',
      },
      {
        q: 'Do your cloud and security labs align with Singapore MAS TRM and PDPA controls?',
        a: 'Yes. AWS Security (SCS-C02), Azure Administrator (AZ-104), and CompTIA Security+ labs emphasize KMS encryption, IAM Zero Trust, audit logging, and ap-southeast-1 cloud resilience.',
      },
      {
        q: 'Are 24/7 browser sandboxes and 365-day replays included for every APAC participant?',
        a: 'Yes. Every seat includes 24/7 cloud sandbox labs, mock exam drills, and 365-day HD session recordings.',
      },
    ],
  },
  in: {
    code: 'in',
    countryName: 'India Corporate & Career Hub',
    shortName: 'India',
    switcherLabel: 'India (INR)',
    hreflang: 'en-IN',
    geoRegionMeta: 'IN',
    phonePlaceholder: '+91...',
    hubPath: '/in',
    hubTitle: 'CompTIA, Microsoft Azure, AWS & Kubernetes Training in India (Bengaluru, Mumbai, NCR) | Learnify',
    hubDescription:
      'Live instructor-led CompTIA Security+, Microsoft Azure (AZ-104, AI-102, DP-100, PL-300), AWS & Kubernetes CKA bootcamps across Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR & Chennai. IST batches, INR corporate GST invoicing & 24/7 cloud labs.',
    hubKeywords:
      'CompTIA Security+ training Bengaluru, Microsoft Azure AZ-104 training India, Power BI PL-300 course Bengaluru Mumbai, AWS Solutions Architect training Hyderabad Pune, Kubernetes CKA bootcamp India, corporate IT training Delhi NCR',
    cities: ['Bengaluru', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi NCR (Gurugram / Noida)', 'Chennai'],
    primaryCitiesLabel: 'Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR & Chennai',
    businessDistricts: 'Bengaluru Outer Ring Road / Whitefield, HITEC City (Hyderabad), Hinjewadi (Pune), BKC (Mumbai), Cyber City (Gurugram) & Tidel Park (Chennai)',
    timezone: 'IST (UTC+5:30)',
    currency: 'INR',
    complianceContext: 'CERT-In cybersecurity directives, RBI IT Governance frameworks, India DPDP Act & global GCC delivery center compliance',
    keyIndustries: [
      'Global Capability Centers (GCCs) & Enterprise IT Services (Bengaluru / Hyderabad)',
      'FinTech, Capital Markets & BFSI Tech Hubs (Mumbai / Gurugram)',
      'Cloud Consultancies, SaaS Product Teams & DevOps Practices (Pune / Bengaluru)',
      'Telecom, E-Commerce & Digital Platforms',
      'Enterprise Cybersecurity & Managed SOC Centers (Chennai / Noida)',
    ],
    invoicingNote:
      'Supports INR corporate invoicing, Purchase Orders (POs), bulk seat pricing for GCC & enterprise teams, and multi-batch annual upskilling contracts.',
    examCenterNote:
      'Full exam voucher & readiness coverage for Pearson VUE Authorized Test Centers in Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR & Chennai, plus OnVUE online exams.',
    schedules: [
      {
        name: 'India Weekday Corporate Bootcamp',
        timing: '09:30 AM – 05:30 PM IST',
        cadence: 'Monday to Friday (5 Days)',
        format: 'Live Virtual / Corporate GCC Cohort',
      },
      {
        name: 'IST Evening Career Track',
        timing: '07:30 PM – 10:00 PM IST',
        cadence: '3 Evenings/Week (4 Weeks)',
        format: 'Live Instructor-Led Online',
      },
      {
        name: 'India Weekend Fast-Track Bootcamp',
        timing: '10:00 AM – 03:00 PM IST',
        cadence: 'Saturday & Sunday (4 Weeks)',
        format: 'Live Interactive Cohort',
      },
    ],
    hubFaqs: [
      {
        q: 'Do you offer IST evening and weekend batches for working engineers in Bengaluru, Hyderabad, Pune, and NCR?',
        a: 'Yes. Our IST cohorts include weekday full-time corporate sessions as well as 7:30 PM IST evening and weekend bootcamps tailored for working IT engineers across India.',
      },
      {
        q: 'Do you support corporate POs and INR invoicing for Indian IT companies and GCCs?',
        a: 'Yes. We offer customized INR corporate group proposals, official Purchase Orders (POs), and bulk enterprise seat licensing for GCCs and product teams across India.',
      },
      {
        q: 'Which tracks are most in demand among Indian GCCs and cloud consulting teams?',
        a: 'Microsoft Azure Administrator (AZ-104), Azure AI Engineer (AI-102), Power BI (PL-300), AWS Solutions Architect (SAA-C03), CompTIA Security+ (SY0-701), and Kubernetes (CKA & CKS).',
      },
      {
        q: 'Are browser cloud sandboxes and mock exam simulators included without needing high-spec laptops?',
        a: 'Yes. All hands-on labs run directly inside 24/7 browser-based cloud sandboxes—so any standard Windows, Mac, or Linux laptop works seamlessly.',
      },
    ],
  },
};

export interface RegionalCourseMeta {
  courseId: string;
  shortName: string;
  categoryTag: string;
  aeSlug: string;
  zaSlug: string;
  aeFocusKeyword: string;
  zaFocusKeyword: string;
  aeIndustryAngle: string;
  zaIndustryAngle: string;
  aeRoleDemand: string;
  zaRoleDemand: string;
  ukRoleDemand?: string;
  euRoleDemand?: string;
  deRoleDemand?: string;
  nlRoleDemand?: string;
}

export const TARGET_REGIONAL_COURSES: RegionalCourseMeta[] = [
  // ===================== COMPTIA (9 COURSES) =====================
  {
    courseId: 'course-comptia-security-plus',
    shortName: 'CompTIA Security+',
    categoryTag: 'Cybersecurity',
    aeSlug: 'comptia-security-plus-training-dubai-uae',
    zaSlug: 'comptia-security-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA Security+ Training Dubai & UAE',
    zaFocusKeyword: 'CompTIA Security+ Training South Africa',
    aeIndustryAngle:
      'Aligned to UAE NESA, TDRA, and DIFC financial security controls, preparing defenders for enterprise SOC, Zero Trust, and cloud hardening roles across Dubai and Abu Dhabi.',
    zaIndustryAngle:
      'Built for South Africa’s high-demand cyber defense sector, mapping directly to POPIA data security governance, FSCA cyber resilience standards, and Sandton/Cape Town SOC operations.',
    aeRoleDemand: 'SOC Analyst, Cybersecurity Specialist, Information Security Officer (Dubai / Abu Dhabi)',
    zaRoleDemand: 'Cybersecurity Analyst, SOC Engineer, IT Security Administrator (Johannesburg / Cape Town)',
    ukRoleDemand: 'Cyber Security Analyst, SOC Analyst, Information Security Officer (London / Manchester)',
    euRoleDemand: 'SOC Analyst, NIS2 Security Specialist, Cyber Defence Engineer (Dublin / Paris / Stockholm)',
    deRoleDemand: 'IT Security Specialist, SOC Analyst, InfoSec Engineer (Frankfurt / Munich / Berlin)',
    nlRoleDemand: 'Cybersecurity Specialist, SOC Engineer, Security Governance Analyst (Amsterdam / Utrecht)',
  },
  {
    courseId: 'course-comptia-network-plus',
    shortName: 'CompTIA Network+',
    categoryTag: 'Networking',
    aeSlug: 'comptia-network-plus-training-dubai-uae',
    zaSlug: 'comptia-network-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA Network+ Training UAE',
    zaFocusKeyword: 'CompTIA Network+ Training South Africa',
    aeIndustryAngle:
      'Designed for network engineers supporting multi-campus connectivity, cloud-hybrid routing, and high-availability wireless infrastructure across UAE enterprise hubs.',
    zaIndustryAngle:
      'Equips South African network technicians and ISP specialists with vendor-neutral mastery of routing, VLAN segmentation, fiber/wireless design, and packet diagnostics.',
    aeRoleDemand: 'Network Support Engineer, Systems Administrator, NOC Technician (UAE)',
    zaRoleDemand: 'Network Technician, NOC Engineer, Infrastructure Specialist (South Africa)',
    ukRoleDemand: 'Network Support Engineer, NOC Analyst, Infrastructure Technician (London / Birmingham)',
    euRoleDemand: 'Network Engineer, Cloud Connectivity Specialist, NOC Engineer (Dublin / Madrid / Warsaw)',
    deRoleDemand: 'Netzwerk-Administrator, NOC Engineer, Infrastructure Specialist (Munich / Frankfurt)',
    nlRoleDemand: 'Network Operations Engineer, Connectivity Specialist, Infrastructure Admin (Amsterdam / Rotterdam)',
  },
  {
    courseId: 'course-comptia-a-plus',
    shortName: 'CompTIA A+',
    categoryTag: 'IT Support',
    aeSlug: 'comptia-a-plus-training-dubai-uae',
    zaSlug: 'comptia-a-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA A+ Certification Course Dubai & UAE',
    zaFocusKeyword: 'CompTIA A+ Training South Africa',
    aeIndustryAngle:
      'Launches and formalizes IT support careers across UAE multinational offices, hospitality tech, and enterprise service desks with hands-on Windows, Linux, and endpoint troubleshooting.',
    zaIndustryAngle:
      'South Africa’s most sought-after entry-to-intermediate IT support credential for helpdesk teams, MSP technicians, and corporate desktop engineering units nationwide.',
    aeRoleDemand: 'IT Support Engineer, Service Desk Specialist, Field Technician (Dubai / Abu Dhabi)',
    zaRoleDemand: 'Desktop Support Technician, IT Helpdesk Analyst, MSP Engineer (Johannesburg / Durban / Cape Town)',
    ukRoleDemand: '1st/2nd Line IT Support Engineer, Service Desk Analyst, MSP Technician (London / Leeds)',
    euRoleDemand: 'IT Service Desk Specialist, Workplace Support Engineer, MSP Technician (Dublin / Paris / Warsaw)',
    deRoleDemand: 'IT Support Engineer, Service Desk Specialist, Workplace Technician (Berlin / Munich)',
    nlRoleDemand: 'IT Support Specialist, Workplace Engineer, Helpdesk Analyst (Amsterdam / Eindhoven)',
  },
  {
    courseId: 'course-comptia-cloud-plus',
    shortName: 'CompTIA Cloud+',
    categoryTag: 'Multi-Cloud',
    aeSlug: 'comptia-cloud-plus-training-uae',
    zaSlug: 'comptia-cloud-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA Cloud+ Training UAE',
    zaFocusKeyword: 'CompTIA Cloud+ Certification South Africa',
    aeIndustryAngle:
      'Validates vendor-neutral multi-cloud deployment, security, and automation skills across AWS and Azure regions serving UAE digital transformation initiatives.',
    zaIndustryAngle:
      'Prepares South African systems engineers to architect, secure, and optimize hybrid workloads across Johannesburg Azure/AWS data center regions and on-prem infrastructure.',
    aeRoleDemand: 'Cloud Systems Administrator, Hybrid Cloud Engineer, Infrastructure Lead (UAE)',
    zaRoleDemand: 'Cloud Infrastructure Engineer, Systems Administrator, DevOps Support (South Africa)',
    ukRoleDemand: 'Multi-Cloud Systems Engineer, Hybrid Infrastructure Lead, Cloud Ops (London / Manchester)',
    euRoleDemand: 'Cloud Systems Administrator, Hybrid Cloud Engineer, Platform Ops (Dublin / Paris / Stockholm)',
    deRoleDemand: 'Multi-Cloud Administrator, Hybrid Systems Engineer, Cloud Ops (Frankfurt / Munich)',
    nlRoleDemand: 'Cloud Systems Engineer, Multi-Cloud Operations Specialist (Amsterdam / Rotterdam)',
  },
  {
    courseId: 'course-comptia-cloud-essentials',
    shortName: 'CompTIA Cloud Essentials+',
    categoryTag: 'Cloud Strategy',
    aeSlug: 'comptia-cloud-essentials-training-uae',
    zaSlug: 'comptia-cloud-essentials-training-south-africa',
    aeFocusKeyword: 'CompTIA Cloud Essentials+ Training UAE',
    zaFocusKeyword: 'CompTIA Cloud Essentials+ South Africa',
    aeIndustryAngle:
      'Empowering UAE IT managers, procurement teams, and project leads to evaluate cloud ROI, FinOps budgets, and vendor SLAs with clarity.',
    zaIndustryAngle:
      'Bridges business decision-making and cloud governance for South African project managers, IT service managers, and operations leaders.',
    aeRoleDemand: 'IT Project Manager, Cloud Business Analyst, IT Operations Lead (Dubai / Abu Dhabi)',
    zaRoleDemand: 'IT Service Delivery Manager, Business Analyst, Cloud Governance Lead (South Africa)',
    ukRoleDemand: 'IT Service Manager, Cloud FinOps Analyst, Digital Delivery Lead (London / Edinburgh)',
    euRoleDemand: 'IT Project Manager, Cloud Procurement Analyst, Digital Operations Lead (Dublin / Brussels)',
    deRoleDemand: 'IT Service Manager, Cloud FinOps Coordinator, Technical PM (Munich / Frankfurt)',
    nlRoleDemand: 'Cloud Business Analyst, IT Service Delivery Lead, FinOps Coordinator (Amsterdam / Utrecht)',
  },
  {
    courseId: 'course-comptia-server-plus',
    shortName: 'CompTIA Server+',
    categoryTag: 'Data Center',
    aeSlug: 'comptia-server-plus-training-uae',
    zaSlug: 'comptia-server-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA Server+ Training UAE',
    zaFocusKeyword: 'CompTIA Server+ Certification South Africa',
    aeIndustryAngle:
      'Hands-on server virtualization, RAID storage, and disaster recovery mastery tailored for UAE data center, banking, and enterprise infrastructure operators.',
    zaIndustryAngle:
      'Equips South African data center engineers with practical server hardware, virtualization, backup resilience, and high-availability administration skills.',
    aeRoleDemand: 'Data Center Technician, Server Administrator, Infrastructure Engineer (UAE)',
    zaRoleDemand: 'Server Support Engineer, Data Center Specialist, Systems Engineer (South Africa)',
    ukRoleDemand: 'Data Centre Engineer, Infrastructure & Server Administrator (London / Slough / Manchester)',
    euRoleDemand: 'Data Center Operations Engineer, Virtualization Administrator (Dublin / Paris / Warsaw)',
    deRoleDemand: 'Data Center Engineer, Server & Storage Administrator (Frankfurt / Munich)',
    nlRoleDemand: 'Data Center Technician, Infrastructure Systems Administrator (Amsterdam / Eindhoven)',
  },
  {
    courseId: 'course-comptia-pentest-plus',
    shortName: 'CompTIA PenTest+',
    categoryTag: 'Offensive Security',
    aeSlug: 'comptia-pentest-plus-training-dubai-uae',
    zaSlug: 'comptia-pentest-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA PenTest+ Training Dubai & UAE',
    zaFocusKeyword: 'CompTIA PenTest+ Training South Africa',
    aeIndustryAngle:
      'Trains offensive security specialists across UAE banking, telecom, and government sectors in scoping, vulnerability exploitation, Active Directory testing, and executive reporting.',
    zaIndustryAngle:
      'Builds hands-on penetration testing and vulnerability assessment capabilities for South African red teams, MSSPs, and financial security auditors.',
    aeRoleDemand: 'Penetration Tester, Vulnerability Analyst, Offensive Security Consultant (Dubai / UAE)',
    zaRoleDemand: 'Junior Penetration Tester, Vulnerability Assessment Specialist, Security Auditor (South Africa)',
    ukRoleDemand: 'Penetration Tester, Vulnerability Assessor, CREST-Track Security Consultant (London / UK)',
    euRoleDemand: 'Penetration Tester, Vulnerability Management Specialist, Red Team Analyst (Europe)',
    deRoleDemand: 'Penetration Tester, IT Security Auditor, Offensive Security Specialist (Frankfurt / Berlin)',
    nlRoleDemand: 'Ethical Hacker, Vulnerability Assessor, Offensive Security Analyst (Amsterdam / The Hague)',
  },
  {
    courseId: 'course-comptia-linux-plus',
    shortName: 'CompTIA Linux+',
    categoryTag: 'Linux & DevOps',
    aeSlug: 'comptia-linux-plus-training-uae',
    zaSlug: 'comptia-linux-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA Linux+ Training UAE',
    zaFocusKeyword: 'CompTIA Linux+ Certification South Africa',
    aeIndustryAngle:
      'Essential enterprise Linux administration, security hardening, Bash automation, and container readiness for UAE cloud engineering and telecom operations.',
    zaIndustryAngle:
      'Strengthens Linux server engineering, kernel troubleshooting, and automation skills across South African hosting providers, fintechs, and DevOps teams.',
    aeRoleDemand: 'Linux Systems Administrator, Site Reliability Engineer, DevOps Engineer (UAE)',
    zaRoleDemand: 'Linux Administrator, Infrastructure Engineer, Cloud Support Engineer (South Africa)',
    ukRoleDemand: 'Linux Systems Administrator, Platform Engineer, DevOps Associate (London / Bristol)',
    euRoleDemand: 'Linux Systems Engineer, Cloud Infrastructure Admin, SRE Associate (Dublin / Stockholm)',
    deRoleDemand: 'Linux Systems Administrator, Open Source Infrastructure Engineer (Berlin / Munich)',
    nlRoleDemand: 'Linux Administrator, DevOps Platform Engineer, Hosting Infrastructure Lead (Amsterdam / Rotterdam)',
  },
  {
    courseId: 'course-comptia-itf-plus',
    shortName: 'CompTIA ITF+',
    categoryTag: 'IT Foundations',
    aeSlug: 'comptia-itf-plus-training-uae',
    zaSlug: 'comptia-itf-plus-training-south-africa',
    aeFocusKeyword: 'CompTIA ITF+ Fundamentals Course UAE',
    zaFocusKeyword: 'CompTIA ITF+ Training South Africa',
    aeIndustryAngle:
      'Structured foundation for non-technical staff, career switchers, and corporate graduate programs across Dubai and Abu Dhabi entering IT and digital operations.',
    zaIndustryAngle:
      'Ideal baseline IT literacy and technical readiness certification for South African junior tech cohorts, internships, and business-IT transition tracks.',
    aeRoleDemand: 'IT Trainee, Junior Support Associate, Digital Operations Coordinator (UAE)',
    zaRoleDemand: 'Junior IT Associate, Technical Intern, Systems Support Trainee (South Africa)',
    ukRoleDemand: 'Junior IT Support Apprentice, Career Switcher Trainee, Digital Coordinator (UK)',
    euRoleDemand: 'IT Operations Trainee, Junior Technical Associate, Digital Graduate (Europe)',
    deRoleDemand: 'Junior IT Associate, Tech Operations Trainee, Career Transitioner (Germany / DACH)',
    nlRoleDemand: 'Junior IT Support Trainee, Digital Operations Coordinator (Amsterdam / Eindhoven)',
  },

  // ===================== MICROSOFT (10 COURSES) =====================
  {
    courseId: 'course-azure-104',
    shortName: 'Microsoft Azure Administrator (AZ-104)',
    categoryTag: 'Microsoft Azure',
    aeSlug: 'microsoft-azure-az-104-training-dubai-uae',
    zaSlug: 'microsoft-azure-az-104-training-south-africa',
    aeFocusKeyword: 'Microsoft Azure AZ-104 Training Dubai & UAE',
    zaFocusKeyword: 'Microsoft Azure AZ-104 Training South Africa',
    aeIndustryAngle:
      'Maps directly to Microsoft’s UAE North (Dubai) and UAE Central (Abu Dhabi) cloud regions—covering Entra ID governance, virtual networking, AKS/compute, and enterprise storage.',
    zaIndustryAngle:
      'Tailored for workloads running on South Africa North (Johannesburg) and South Africa West (Cape Town) Azure regions—mastering identity, VNets, backup, and cost governance.',
    aeRoleDemand: 'Azure Cloud Administrator, Cloud Infrastructure Architect, M365/Azure Lead (Dubai / Abu Dhabi)',
    zaRoleDemand: 'Azure Administrator, Cloud Systems Engineer, Enterprise Cloud Specialist (Johannesburg / Cape Town)',
    ukRoleDemand: 'Azure Infrastructure Engineer, Cloud Administrator, Entra ID Specialist (London / Manchester)',
    euRoleDemand: 'Azure Cloud Administrator, Enterprise Cloud Engineer, EU Sovereignty Lead (Dublin / Paris)',
    deRoleDemand: 'Microsoft Azure Administrator, Hybrid Cloud Engineer, SAP-on-Azure Ops (Frankfurt / Munich)',
    nlRoleDemand: 'Azure Cloud Administrator, Cloud Infrastructure Engineer, Entra ID Lead (Amsterdam / Utrecht)',
  },
  {
    courseId: 'course-ms-ai-102',
    shortName: 'Microsoft Azure AI Engineer (AI-102)',
    categoryTag: 'Azure AI & OpenAI',
    aeSlug: 'microsoft-azure-ai-102-training-dubai-uae',
    zaSlug: 'microsoft-azure-ai-102-training-south-africa',
    aeFocusKeyword: 'Microsoft Azure AI-102 Training Dubai & UAE',
    zaFocusKeyword: 'Microsoft Azure AI-102 Training South Africa',
    aeIndustryAngle:
      'Supports the UAE National AI Strategy with production engineering in Azure OpenAI Service, RAG architectures, Azure AI Search, computer vision, and intelligent document pipelines.',
    zaIndustryAngle:
      'Equips South African developers and software architects to build enterprise generative AI, NLP chatbots, and automated document intelligence on Microsoft Azure.',
    aeRoleDemand: 'Azure AI Engineer, Generative AI Architect, Applied AI Developer (Dubai / Abu Dhabi)',
    zaRoleDemand: 'AI Solutions Engineer, Cloud ML Developer, Intelligent Automation Lead (South Africa)',
    ukRoleDemand: 'Azure AI Engineer, Enterprise GenAI Developer, RAG Solutions Architect (London / Edinburgh)',
    euRoleDemand: 'Azure AI Engineer, Applied GenAI Architect, EU AI Act Compliant Developer (Paris / Dublin)',
    deRoleDemand: 'Azure AI Solutions Engineer, Applied GenAI Developer, Document AI Lead (Berlin / Munich)',
    nlRoleDemand: 'Azure AI Engineer, Enterprise LLM Developer, Cognitive Search Architect (Amsterdam / Eindhoven)',
  },
  {
    courseId: 'course-ms-dp-100',
    shortName: 'Azure Data Scientist (DP-100)',
    categoryTag: 'Data Science & MLOps',
    aeSlug: 'microsoft-azure-dp-100-data-science-uae',
    zaSlug: 'microsoft-azure-dp-100-data-science-south-africa',
    aeFocusKeyword: 'Microsoft DP-100 Azure Data Scientist UAE',
    zaFocusKeyword: 'Microsoft DP-100 Training South Africa',
    aeIndustryAngle:
      'Trains UAE enterprise data teams in Azure Machine Learning workspaces, MLflow tracking, Automated ML, and scalable Kubernetes model endpoints.',
    zaIndustryAngle:
      'Prepares South African data scientists in banking, telecoms, and retail to build, govern, and productionize ML models using Azure ML and responsible AI pipelines.',
    aeRoleDemand: 'Azure Data Scientist, MLOps Engineer, Senior Machine Learning Specialist (UAE)',
    zaRoleDemand: 'Data Scientist, ML Platform Engineer, Predictive Analytics Lead (Johannesburg / Cape Town)',
    ukRoleDemand: 'Azure Data Scientist, MLOps Engineer, Quantitative ML Specialist (London / Manchester)',
    euRoleDemand: 'Cloud Data Scientist, MLOps Platform Engineer, Responsible AI Specialist (Europe)',
    deRoleDemand: 'Data Scientist (Azure ML), Industrial MLOps Engineer, AI Platform Lead (Munich / Berlin)',
    nlRoleDemand: 'Azure Data Scientist, MLOps Specialist, Predictive Analytics Engineer (Amsterdam / Eindhoven)',
  },
  {
    courseId: 'course-ms-sc-900',
    shortName: 'Microsoft Security Fundamentals (SC-900)',
    categoryTag: 'Cloud Security',
    aeSlug: 'microsoft-security-sc-900-training-uae',
    zaSlug: 'microsoft-security-sc-900-training-south-africa',
    aeFocusKeyword: 'Microsoft SC-900 Security Training UAE',
    zaFocusKeyword: 'Microsoft SC-900 Training South Africa',
    aeIndustryAngle:
      'Establishes Microsoft Zero Trust, Entra ID, Defender XDR, and Microsoft Purview compliance foundations aligned with UAE enterprise data residency and NESA requirements.',
    zaIndustryAngle:
      'Delivers Microsoft security, identity, and Purview governance literacy tailored for POPIA compliance and enterprise threat protection across South Africa.',
    aeRoleDemand: 'Cloud Security Associate, IT Governance Analyst, M365 Security Coordinator (UAE)',
    zaRoleDemand: 'Security & Compliance Analyst, Identity Administrator, IT Risk Coordinator (South Africa)',
    ukRoleDemand: 'Identity & Compliance Analyst, M365 Security Associate, Cyber Risk Coordinator (UK)',
    euRoleDemand: 'NIS2 & Purview Compliance Analyst, Identity Governance Coordinator (Europe)',
    deRoleDemand: 'IT Compliance & Identity Coordinator, Microsoft Purview & Defender Associate (Frankfurt / Munich)',
    nlRoleDemand: 'Cloud Security & Compliance Associate, Entra ID Governance Analyst (Amsterdam / The Hague)',
  },
  {
    courseId: 'course-ms-900',
    shortName: 'Microsoft 365 Fundamentals (MS-900)',
    categoryTag: 'Microsoft 365',
    aeSlug: 'microsoft-365-ms-900-training-uae',
    zaSlug: 'microsoft-365-ms-900-training-south-africa',
    aeFocusKeyword: 'Microsoft 365 MS-900 Training UAE',
    zaFocusKeyword: 'Microsoft 365 MS-900 Training South Africa',
    aeIndustryAngle:
      'Covers cloud productivity, Teams, SharePoint, Intune endpoint management, and enterprise M365 licensing optimization for UAE corporate IT teams.',
    zaIndustryAngle:
      'Equips South African IT administrators, service desk leads, and licensing specialists with full command of Microsoft 365 cloud deployment and hybrid work governance.',
    aeRoleDemand: 'Microsoft 365 Specialist, Modern Workplace Analyst, IT Procurement Lead (UAE)',
    zaRoleDemand: 'M365 Support Specialist, Modern Workplace Administrator, IT Coordinator (South Africa)',
    ukRoleDemand: 'Modern Workplace Analyst, Microsoft 365 Administrator, Intune Coordinator (London / UK)',
    euRoleDemand: 'Microsoft 365 Specialist, Enterprise Collaboration Lead, Cloud Licensing Analyst (Europe)',
    deRoleDemand: 'Microsoft 365 Specialist, Modern Workplace Coordinator, IT Licensing Lead (Germany / DACH)',
    nlRoleDemand: 'Modern Workplace Administrator, M365 Governance & Adoption Specialist (Netherlands)',
  },
  {
    courseId: 'course-ms-pl-300',
    shortName: 'Microsoft Power BI Data Analyst (PL-300)',
    categoryTag: 'BI & Analytics',
    aeSlug: 'microsoft-power-bi-pl-300-training-dubai-uae',
    zaSlug: 'microsoft-power-bi-pl-300-training-south-africa',
    aeFocusKeyword: 'Power BI Training in Dubai & UAE (PL-300)',
    zaFocusKeyword: 'Power BI Course & PL-300 Training South Africa',
    aeIndustryAngle:
      'Top-rated Power BI course in Dubai & UAE for finance, real estate, aviation, and operations teams—mastering Power Query, DAX modeling, and enterprise BI governance.',
    zaIndustryAngle:
      'Prepares South African data analysts, financial controllers, and BI developers to turn enterprise ERP/SQL data into executive Power BI dashboards and automated reports.',
    aeRoleDemand: 'Power BI Developer, Senior Business Intelligence Analyst, Data Reporting Lead (Dubai / UAE)',
    zaRoleDemand: 'BI Analyst, Power BI Developer, Financial & Data Reporting Specialist (Johannesburg / Cape Town)',
    ukRoleDemand: 'Power BI Data Analyst, Senior BI Developer, FP&A Analytics Specialist (London / Manchester)',
    euRoleDemand: 'Power BI Developer, Enterprise BI Analyst, Data Visualization Lead (Dublin / Paris / Madrid)',
    deRoleDemand: 'Power BI Consultant, Controlling & BI Analyst, Data Reporting Specialist (Munich / Frankfurt)',
    nlRoleDemand: 'Power BI Data Analyst, Business Intelligence Developer, Finance BI Lead (Amsterdam / Rotterdam)',
  },
  {
    courseId: 'course-ms-pl-900',
    shortName: 'Microsoft Power Platform Fundamentals (PL-900)',
    categoryTag: 'Low-Code Automation',
    aeSlug: 'microsoft-power-platform-pl-900-training-uae',
    zaSlug: 'microsoft-power-platform-pl-900-training-south-africa',
    aeFocusKeyword: 'Microsoft Power Platform PL-900 Training UAE',
    zaFocusKeyword: 'Microsoft Power Platform PL-900 South Africa',
    aeIndustryAngle:
      'Accelerates digital workflow transformation across UAE enterprises using Power Apps, Power Automate, Power BI, and Copilot Studio low-code agents.',
    zaIndustryAngle:
      'Enables South African business analysts and IT teams to digitize approvals, build custom internal apps rapidly, and automate legacy processes with Power Platform.',
    aeRoleDemand: 'Power Platform Maker, Digital Transformation Analyst, Process Automation Specialist (UAE)',
    zaRoleDemand: 'Business Process Analyst, Low-Code App Developer, Automation Specialist (South Africa)',
    ukRoleDemand: 'Power Platform Developer, Business Automation Analyst, Digital Change Lead (London / Birmingham)',
    euRoleDemand: 'Low-Code Citizen Developer, Process Automation Analyst, Power Platform Specialist (Europe)',
    deRoleDemand: 'Process Automation Consultant, Power Platform Maker, Business Analyst (Germany / DACH)',
    nlRoleDemand: 'Power Platform Specialist, Low-Code Process Engineer, Business Analyst (Amsterdam / Utrecht)',
  },
  {
    courseId: 'course-ms-ai-900',
    shortName: 'Microsoft Azure AI Fundamentals (AI-900)',
    categoryTag: 'AI Foundations',
    aeSlug: 'microsoft-azure-ai-900-training-uae',
    zaSlug: 'microsoft-azure-ai-900-training-south-africa',
    aeFocusKeyword: 'Microsoft Azure AI-900 Course Dubai & UAE',
    zaFocusKeyword: 'Microsoft Azure AI-900 Training South Africa',
    aeIndustryAngle:
      'Foundational Azure AI, machine learning, computer vision, and generative AI enablement program for UAE corporate teams, managers, and aspiring cloud engineers.',
    zaIndustryAngle:
      'Accessible entry point into artificial intelligence, Azure OpenAI concepts, and responsible AI frameworks for South African technical and business teams.',
    aeRoleDemand: 'AI Product Specialist, Cloud Technical Consultant, Digital Innovation Lead (UAE)',
    zaRoleDemand: 'Junior Cloud & AI Analyst, Technical Consultant, Business Transformation Lead (South Africa)',
    ukRoleDemand: 'AI Product Manager, Junior Cloud & AI Consultant, Digital Transformation Lead (UK)',
    euRoleDemand: 'AI Transformation Lead, Technical Product Specialist, Responsible AI Coordinator (Europe)',
    deRoleDemand: 'AI Project Lead, Cloud Technical Consultant, Digital Innovation Manager (Germany)',
    nlRoleDemand: 'AI Transformation Specialist, Cloud Solutions Consultant, Product Analyst (Netherlands)',
  },
  {
    courseId: 'course-ms-dp-900',
    shortName: 'Microsoft Azure Data Fundamentals (DP-900)',
    categoryTag: 'Cloud Data',
    aeSlug: 'microsoft-azure-dp-900-training-uae',
    zaSlug: 'microsoft-azure-dp-900-training-south-africa',
    aeFocusKeyword: 'Microsoft Azure DP-900 Data Training UAE',
    zaFocusKeyword: 'Microsoft Azure DP-900 Training South Africa',
    aeIndustryAngle:
      'Builds core competence across Azure SQL, Cosmos DB, Azure Synapse Analytics, and modern cloud data warehousing for UAE enterprise IT units.',
    zaIndustryAngle:
      'Equips South African database administrators, analysts, and junior data engineers with foundational cloud relational, NoSQL, and analytics architecture skills.',
    aeRoleDemand: 'Junior Data Engineer, Azure Database Associate, Analytics Consultant (UAE)',
    zaRoleDemand: 'Cloud Data Associate, Junior BI/Data Engineer, Database Support Analyst (South Africa)',
    ukRoleDemand: 'Junior Data Engineer, Azure SQL & Analytics Associate, BI Data Analyst (London / Leeds)',
    euRoleDemand: 'Cloud Data Analyst, Junior Azure Data Engineer, Database Migration Associate (Europe)',
    deRoleDemand: 'Azure Data Associate, Junior Cloud Data Engineer, BI Database Specialist (Germany)',
    nlRoleDemand: 'Azure Data Analyst, Junior Data Platform Engineer, Cloud DBA Associate (Netherlands)',
  },
  {
    courseId: 'course-ms-4018-copilot',
    shortName: 'Microsoft 365 Copilot (MS-4018) & Copilot Studio',
    categoryTag: 'Enterprise GenAI',
    aeSlug: 'microsoft-365-copilot-ms-4018-training-dubai-uae',
    zaSlug: 'microsoft-365-copilot-ms-4018-training-south-africa',
    aeFocusKeyword: 'Copilot Studio & Microsoft 365 Copilot Training Dubai UAE',
    zaFocusKeyword: 'Copilot Studio & Microsoft 365 Copilot Training South Africa',
    aeIndustryAngle:
      'Practical enterprise M365 Copilot & Copilot Studio agent building across Word, Excel, PowerPoint, Outlook, and Teams—helping UAE corporate teams in Dubai & Abu Dhabi deploy governed enterprise AI safely.',
    zaIndustryAngle:
      'Hands-on corporate enablement program for South African knowledge workers and executives adopting Microsoft 365 Copilot & Copilot Studio custom agents with strict POPIA data boundaries.',
    aeRoleDemand: 'Enterprise Workforce, Copilot Studio Champions, Executive Leadership, Finance/HR/Ops Teams (Dubai & Abu Dhabi)',
    zaRoleDemand: 'Corporate Knowledge Workers, Copilot Studio Makers, Operations Managers, FinTech Teams (South Africa)',
    ukRoleDemand: 'Corporate Leadership, Finance/Legal/Ops Teams, Copilot Studio AI Champions (London / UK)',
    euRoleDemand: 'European Corporate Teams, Copilot Studio Builders, Product & Finance Workforces (EU)',
    deRoleDemand: 'Enterprise Business Teams, Copilot Studio Leads, Controlling/HR/Procurement (Germany & DACH)',
    nlRoleDemand: 'Corporate Knowledge Workers, Copilot Studio Specialists, Benelux Enterprise Teams (Netherlands)',
  },

  // ===================== AWS & CLOUD NATIVE (3 COURSES — NO CISCO) =====================
  {
    courseId: 'course-aws-solutions',
    shortName: 'AWS Solutions Architect (SAA-C03)',
    categoryTag: 'AWS Cloud',
    aeSlug: 'aws-solutions-architect-saa-c03-training-dubai-uae',
    zaSlug: 'aws-solutions-architect-saa-c03-training-south-africa',
    aeFocusKeyword: 'AWS Solutions Architect SAA-C03 Training Dubai & UAE',
    zaFocusKeyword: 'AWS Solutions Architect SAA-C03 Training South Africa',
    aeIndustryAngle:
      'Built for cloud teams deploying resilient workloads on the AWS Middle East (UAE) me-central-1 region—mastering Multi-AZ VPC networking, IAM governance, serverless compute, and UAE PDPL/NESA encryption controls.',
    zaIndustryAngle:
      'Engineered for South African cloud architects operating on the AWS Africa (Cape Town) af-south-1 region—covering multi-AZ resilience, POPIA data residency, KMS encryption, and FinOps cost optimization.',
    aeRoleDemand: 'AWS Solutions Architect, Cloud Infrastructure Engineer, Platform Lead (Dubai / Abu Dhabi / Sharjah)',
    zaRoleDemand: 'AWS Cloud Architect, DevOps Engineer, Cloud Systems Specialist (Johannesburg / Cape Town / Pretoria)',
    ukRoleDemand: 'AWS Solutions Architect, Cloud Infrastructure Lead, DevOps Platform Engineer (London / UK)',
    euRoleDemand: 'AWS Cloud Architect, Multi-Region Infrastructure Lead (Dublin eu-west-1 / Paris eu-west-3)',
    deRoleDemand: 'AWS Solutions Architect, Cloud Platform Engineer (Frankfurt eu-central-1 / DACH)',
    nlRoleDemand: 'AWS Cloud Architect, Serverless & FinOps Platform Engineer (Amsterdam / Benelux)',
  },
  {
    courseId: 'course-aws-security',
    shortName: 'AWS Certified Security - Specialty (SCS-C02)',
    categoryTag: 'AWS Security',
    aeSlug: 'aws-security-specialty-scs-c02-training-dubai-uae',
    zaSlug: 'aws-security-specialty-scs-c02-training-south-africa',
    aeFocusKeyword: 'AWS Security Specialty SCS-C02 Training Dubai & UAE',
    zaFocusKeyword: 'AWS Security Specialty SCS-C02 Training South Africa',
    aeIndustryAngle:
      'Equips UAE cloud security specialists in banking (DIFC/ADGM), energy, and smart government with hands-on GuardDuty, Security Hub, AWS KMS CMK encryption, Organizations SCPs, and automated IR pipelines.',
    zaIndustryAngle:
      'Prepares South African security architects in financial services and enterprise MSPs to safeguard AWS af-south-1 workloads using IAM boundaries, CloudTrail forensics, WAF/Shield, and automated compliance auditing.',
    aeRoleDemand: 'AWS Cloud Security Architect, DevSecOps Engineer, Cloud Governance Lead (Dubai / Abu Dhabi)',
    zaRoleDemand: 'Cloud Security Engineer, Senior DevSecOps Specialist, Security Architect (Sandton / Cape Town)',
    ukRoleDemand: 'AWS Security Architect, Senior DevSecOps Engineer, Cloud Risk Lead (London / Canary Wharf)',
    euRoleDemand: 'AWS Cloud Security Engineer, EU Sovereign KMS & Compliance Architect (Europe)',
    deRoleDemand: 'AWS Cloud Security Specialist, DevSecOps Architect, FinTech InfoSec Lead (Frankfurt / Munich)',
    nlRoleDemand: 'AWS Cloud Security Engineer, DevSecOps Architect, Compliance Automation Lead (Amsterdam)',
  },
  {
    courseId: 'course-kubernetes-cka',
    shortName: 'Kubernetes & Cloud-Native (CKA & CKS)',
    categoryTag: 'Kubernetes & DevOps',
    aeSlug: 'kubernetes-cka-cks-training-dubai-uae',
    zaSlug: 'kubernetes-cka-cks-training-south-africa',
    aeFocusKeyword: 'Kubernetes CKA Training Dubai & UAE',
    zaFocusKeyword: 'Kubernetes CKA Training South Africa',
    aeIndustryAngle:
      'Trains UAE platform and SRE teams to bootstrap, network, secure, and troubleshoot production Kubernetes clusters (kubeadm, EKS, AKS) with RBAC, NetworkPolicies, etcd recovery, and CKS hardening.',
    zaIndustryAngle:
      'Delivers 100% performance-based terminal mastery for South African DevOps, fintech, and telecom engineering teams running containerized microservices across hybrid and cloud environments.',
    aeRoleDemand: 'Kubernetes Platform Engineer, Site Reliability Engineer (SRE), Senior DevOps Engineer (UAE)',
    zaRoleDemand: 'DevOps Engineer, Kubernetes Administrator, Cloud Platform Engineer (Johannesburg / Cape Town)',
    ukRoleDemand: 'Kubernetes Platform Engineer, Senior SRE, Cloud-Native DevOps Architect (London / Manchester)',
    euRoleDemand: 'Platform Engineer, Kubernetes SRE, Cloud-Native Architect (Dublin / Berlin / Stockholm)',
    deRoleDemand: 'Kubernetes Platform Engineer, Senior DevOps / SRE, Container Security Lead (Berlin / Munich)',
    nlRoleDemand: 'Kubernetes Administrator, Cloud-Native SRE, DevOps Platform Architect (Amsterdam / Eindhoven)',
  },
];

const REGIONAL_SLUG_SUFFIX: Record<Exclude<RegionCode, 'ae' | 'za'>, string> = {
  uk: 'uk',
  de: 'germany',
  nl: 'netherlands',
  eu: 'europe',
  ao: 'angola',
  sa: 'saudi-arabia',
  ng: 'nigeria',
  sg: 'singapore',
  in: 'india',
};

export function getRegionalCourseSlug(meta: RegionalCourseMeta, regionCode: RegionCode): string {
  if (regionCode === 'ae') return meta.aeSlug;
  if (regionCode === 'za') return meta.zaSlug;
  const stem = meta.aeSlug.replace(/-(dubai-uae|uae)$/, '');
  return `${stem}-${REGIONAL_SLUG_SUFFIX[regionCode]}`;
}

export function getRegionalCourseIndustryAngle(
  meta: RegionalCourseMeta,
  course: Course,
  regionCode: RegionCode
): string {
  if (regionCode === 'ae') return meta.aeIndustryAngle;
  if (regionCode === 'za') return meta.zaIndustryAngle;

  const reg = REGION_CONFIGS[regionCode];
  if (regionCode === 'uk') {
    return `Engineered for UK IT professionals and teams across London, Manchester, Birmingham & Edinburgh—mapping ${meta.shortName} directly to ${reg.complianceContext} and hybrid UK cloud operations.`;
  }
  if (regionCode === 'de') {
    return `Tailored for Germany and DACH engineering teams in Frankfurt, Munich, Berlin & Zurich—connecting ${meta.shortName} practical labs to ${reg.complianceContext} and enterprise production scale.`;
  }
  if (regionCode === 'nl') {
    return `Designed for Netherlands and Benelux organizations across Amsterdam, Rotterdam, Utrecht, Eindhoven & Brussels—aligning ${meta.shortName} execution with ${reg.complianceContext}.`;
  }
  if (regionCode === 'ao') {
    return `Built for Angolan professionals and energy, banking & telecom teams in Luanda, Benguela, Lobito & Cabinda—connecting ${meta.shortName} cloud labs with ${reg.complianceContext} and English vendor exam terminology.`;
  }
  if (regionCode === 'sa') {
    return `Engineered for Saudi Arabia & GCC engineering teams across Riyadh, Jeddah, Dammam, Khobar, Doha & Muscat—mapping ${meta.shortName} directly to ${reg.complianceContext}.`;
  }
  if (regionCode === 'ng') {
    return `Structured for West & East African IT, FinTech & telecom professionals in Lagos, Abuja, Nairobi & Accra—pairing ${meta.shortName} hands-on ${course.certificationVendor} execution with ${reg.complianceContext}.`;
  }
  if (regionCode === 'sg') {
    return `Designed for Singapore & ASEAN engineering teams across Marina Bay, One-North, Changi & Kuala Lumpur—connecting ${meta.shortName} production labs with ${reg.complianceContext}.`;
  }
  if (regionCode === 'in') {
    return `Tailored for India GCCs and cloud professionals in Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR & Chennai—aligning ${meta.shortName} labs directly with ${reg.complianceContext}.`;
  }
  return `Structured for European enterprises across Dublin, Paris, Madrid, Milan, Stockholm & Warsaw—pairing ${meta.shortName} hands-on ${course.certificationVendor} mastery with ${reg.complianceContext}.`;
}

export function getRegionalCourseRoleDemand(meta: RegionalCourseMeta, regionCode: RegionCode): string {
  switch (regionCode) {
    case 'ae':
      return meta.aeRoleDemand;
    case 'za':
      return meta.zaRoleDemand;
    case 'uk':
      return meta.ukRoleDemand || `${meta.categoryTag} Engineer & Specialist (London / Manchester / UK)`;
    case 'de':
      return meta.deRoleDemand || `${meta.categoryTag} Engineer & Specialist (Frankfurt / Munich / Berlin)`;
    case 'nl':
      return meta.nlRoleDemand || `${meta.categoryTag} Engineer & Specialist (Amsterdam / Utrecht / Eindhoven)`;
    case 'ao':
      return `${meta.categoryTag} Engineer, Cloud & Security Specialist (Luanda / Cabinda / Lobito, Angola)`;
    case 'sa':
      return `${meta.categoryTag} Architect, Lead Engineer & Specialist (Riyadh / Jeddah / Khobar / Doha)`;
    case 'ng':
      return `${meta.categoryTag} Engineer, FinTech & Cloud Specialist (Lagos / Abuja / Nairobi / Accra)`;
    case 'sg':
      return `${meta.categoryTag} Architect & Senior Platform Specialist (Singapore / Marina Bay / KL)`;
    case 'in':
      return `${meta.categoryTag} Engineer & GCC Technical Lead (Bengaluru / Hyderabad / Pune / Mumbai / NCR)`;
    case 'eu':
      return meta.euRoleDemand || `${meta.categoryTag} Engineer & Specialist (Dublin / Paris / Europe)`;
  }
}

export type RegionalAlternateUrls = { global: string } & Record<RegionCode, string>;

export interface ResolvedRegionalCoursePage {
  region: RegionConfig;
  meta: RegionalCourseMeta;
  course: Course;
  slug: string;
  canonicalUrl: string;
  alternateUrls: RegionalAlternateUrls;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  h1Title: string;
  industryAngle: string;
  roleDemand: string;
  localizedOverview: string;
  localizedFaqs: Array<{ q: string; a: string }>;
}

export function getHubHreflangAlternates(): Array<{ hreflang: string; href: string }> {
  return [
    { hreflang: 'x-default', href: `${SITE_BASE_URL}/courses` },
    { hreflang: 'en', href: `${SITE_BASE_URL}/courses` },
    ...ALL_REGION_CODES.map((code) => ({
      hreflang: REGION_CONFIGS[code].hreflang,
      href: `${SITE_BASE_URL}${REGION_CONFIGS[code].hubPath}`,
    })),
  ];
}

export function getCourseHreflangAlternates(
  alternates: RegionalAlternateUrls
): Array<{ hreflang: string; href: string }> {
  return [
    { hreflang: 'x-default', href: alternates.global },
    { hreflang: 'en', href: alternates.global },
    ...ALL_REGION_CODES.map((code) => ({
      hreflang: REGION_CONFIGS[code].hreflang,
      href: alternates[code],
    })),
  ];
}

export function buildRegionalCoursePage(
  meta: RegionalCourseMeta,
  regionCode: RegionCode
): ResolvedRegionalCoursePage | null {
  const course = sampleCourses.find((c) => c.id === meta.courseId);
  if (!course) return null;

  const region = REGION_CONFIGS[regionCode];
  const slug = getRegionalCourseSlug(meta, regionCode);
  const canonicalUrl = `${SITE_BASE_URL}/${regionCode}/${slug}`;

  const alternateUrls = {
    global: `${SITE_BASE_URL}/course/${course.id}`,
    ae: `${SITE_BASE_URL}/ae/${getRegionalCourseSlug(meta, 'ae')}`,
    za: `${SITE_BASE_URL}/za/${getRegionalCourseSlug(meta, 'za')}`,
    uk: `${SITE_BASE_URL}/uk/${getRegionalCourseSlug(meta, 'uk')}`,
    de: `${SITE_BASE_URL}/de/${getRegionalCourseSlug(meta, 'de')}`,
    nl: `${SITE_BASE_URL}/nl/${getRegionalCourseSlug(meta, 'nl')}`,
    eu: `${SITE_BASE_URL}/eu/${getRegionalCourseSlug(meta, 'eu')}`,
    ao: `${SITE_BASE_URL}/ao/${getRegionalCourseSlug(meta, 'ao')}`,
    sa: `${SITE_BASE_URL}/sa/${getRegionalCourseSlug(meta, 'sa')}`,
    ng: `${SITE_BASE_URL}/ng/${getRegionalCourseSlug(meta, 'ng')}`,
    sg: `${SITE_BASE_URL}/sg/${getRegionalCourseSlug(meta, 'sg')}`,
    in: `${SITE_BASE_URL}/in/${getRegionalCourseSlug(meta, 'in')}`,
  } as RegionalAlternateUrls;

  const hasExamCodeInShortName = Boolean(
    course.examCode &&
      meta.shortName.toLowerCase().includes(course.examCode.toLowerCase())
  );
  const examCodeText =
    course.examCode && !hasExamCodeInShortName ? ` (${course.examCode})` : '';

  const compactCourseName = `${meta.shortName}${examCodeText}`
    .replace('Microsoft Power BI Data Analyst (PL-300)', 'Power BI (PL-300)')
    .replace('Microsoft Azure Administrator (AZ-104)', 'Microsoft Azure AZ-104')
    .replace('Microsoft Azure AI Engineer (AI-102)', 'Microsoft Azure AI-102')
    .replace('Microsoft Security Fundamentals (SC-900)', 'Microsoft SC-900')
    .replace('Microsoft Power Platform Fundamentals (PL-900)', 'Power Platform PL-900')
    .replace('Microsoft Azure Data Fundamentals (DP-900)', 'Azure Data DP-900')
    .replace('Microsoft Azure AI Fundamentals (AI-900)', 'Azure AI-900')
    .replace('Microsoft 365 Fundamentals (MS-900)', 'Microsoft 365 MS-900')
    .replace('Microsoft 365 Copilot & Copilot Studio (MS-4018)', 'Microsoft Copilot MS-4018')
    .replace('AWS Certified Solutions Architect', 'AWS Solutions Architect')
    .replace('Certified Kubernetes Administrator (CKA)', 'Kubernetes CKA')
    .replace('Certified Ethical Hacker (CEH v12)', 'CEH v12 Ethical Hacker');

  let seoTitle = '';
  let seoDescription = '';
  let seoKeywords = '';
  let h1Title = '';

  if (regionCode === 'ae') {
    seoTitle = `${compactCourseName} Online Training in Dubai & UAE | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} training in Dubai, Abu Dhabi & Sharjah: ${region.timezone} evening batches, browser cloud labs (no local VM needed), AED pricing, corporate PO quote & 98.4% pass rate.`;
    seoKeywords = `${meta.aeFocusKeyword}, ${meta.shortName} online training in Dubai, ${meta.shortName} Abu Dhabi, ${meta.shortName} Sharjah, Power BI certification pricing, ${course.examCode || ''} UAE course, ${course.certificationVendor} training UAE, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Online Training in Dubai & UAE`;
  } else if (regionCode === 'za') {
    seoTitle = `${compactCourseName} Training in Johannesburg, Cape Town & SA | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} training in Johannesburg, Sandton, Cape Town, Pretoria & Durban: ${region.timezone} evening batches, browser cloud labs, ZAR pricing & corporate PO quote.`;
    seoKeywords = `${meta.zaFocusKeyword}, ${meta.shortName} Johannesburg, ${meta.shortName} Cape Town, ${meta.shortName} Pretoria, ${meta.shortName} Durban, ${course.examCode || ''} South Africa, ${course.certificationVendor} training South Africa, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in South Africa`;
  } else if (regionCode === 'uk') {
    if (meta.courseId === 'course-kubernetes-cka') {
      seoTitle = `Enterprise Kubernetes CKA Course London & UK · Pricing & Quote | Learnify`;
      seoDescription = `Live Enterprise Kubernetes CKA & CKS training in London, Manchester, Birmingham & UK: GMT/BST cohorts, 24/7 browser cluster sandboxes, GBP pricing & instant corporate team PO quote.`;
    } else if (meta.courseId === 'course-ms-pl-300') {
      seoTitle = `Power BI (PL-300) Training in London & UK · Pricing & Quote | Learnify`;
      seoDescription = `Live Power BI Data Analyst (PL-300) training in London, Manchester & UK: GMT/BST cohorts, £113 exam fee guidance, 24/7 DAX labs, GBP pricing & instant corporate PO quote.`;
    } else {
      seoTitle = `${compactCourseName} Training in London & UK (2026) | Learnify`;
      seoDescription = `Live ${meta.shortName}${examCodeText} training in London, Manchester, Birmingham & Edinburgh: ${region.timezone} cohorts, browser cloud sandbox labs (no VM needed), GBP PO quote & 98.4% pass rate.`;
    }
    seoKeywords = `${meta.shortName} training UK, ${meta.shortName} course London, ${meta.shortName} Manchester Birmingham Edinburgh, enterprise kubernetes cka course, power bi certification pricing, ${course.examCode || ''} UK certification, corporate IT training GBP, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in London & UK`;
  } else if (regionCode === 'de') {
    if (meta.courseId === 'course-azure-104') {
      seoTitle = `Azure AZ-104 Course Frankfurt, Munich & Germany (No VM Needed) | Learnify`;
      seoDescription = `Live English Azure Administrator (AZ-104) training in Frankfurt, Munich, Berlin & Zurich: browser cloud sandbox included (no local VM required / keine lokale VM nötig), CET schedule & EUR SEPA PO quote.`;
    } else if (meta.courseId === 'course-kubernetes-cka') {
      seoTitle = `Enterprise Kubernetes CKA Course Berlin, Munich & Germany · Quote | Learnify`;
      seoDescription = `Enterprise Kubernetes CKA & CKS training in Berlin, Munich, Frankfurt & Zurich: browser cluster labs (no local VM), CET cohorts, EUR pricing & SEPA corporate PO quote.`;
    } else {
      seoTitle = `${compactCourseName} Training in Frankfurt, Berlin & Germany | Learnify`;
      seoDescription = `Live English ${meta.shortName}${examCodeText} training in Frankfurt, Munich, Berlin & Zurich: browser cloud labs (no local VM needed), CET schedules, EUR SEPA PO quote & BSI C5 readiness.`;
    }
    seoKeywords = `${meta.shortName} training Germany, ${meta.shortName} Frankfurt Munich Berlin Zurich, enterprise kubernetes cka course, mit welcher machine kurs az 104, microsoft azure administrator schulung, ${course.examCode || ''} DACH certification, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in Germany & DACH`;
  } else if (regionCode === 'nl') {
    seoTitle = `${compactCourseName} Training in Amsterdam & Netherlands | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} training in Amsterdam, Rotterdam, Utrecht, Eindhoven & Brussels: ${region.timezone} batches, 24/7 cloud labs (no local VM), EUR pricing & corporate PO quote.`;
    seoKeywords = `${meta.shortName} training Netherlands, ${meta.shortName} Amsterdam Rotterdam Utrecht Eindhoven, ${course.examCode || ''} Benelux course, ${course.certificationVendor} training Netherlands EUR, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in Netherlands & Benelux`;
  } else if (regionCode === 'ao') {
    seoTitle = `${compactCourseName} Online Training in Angola & Luanda | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} online training in Angola (Luanda, Benguela, Lobito & Cabinda): WAT (UTC+1) schedules, 24/7 browser cloud labs (no local VM needed), USD corporate PO quotes & 98.4% pass rate.`;
    seoKeywords = `${meta.shortName} training in Angola, ${meta.shortName} online training Angola, ${meta.shortName} course Luanda, ${course.certificationVendor} training Angola, ${course.examCode || ''} Luanda certification, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Online Training in Angola & Luanda`;
  } else if (regionCode === 'sa') {
    seoTitle = `${compactCourseName} Training in Riyadh, Saudi Arabia & Doha | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} online & corporate training in Riyadh, Jeddah, Dammam, Khobar, Doha & Muscat: AST (UTC+3) cohorts, browser cloud labs, SAR corporate POs & Vision 2030/NCA readiness.`;
    seoKeywords = `${meta.shortName} training Riyadh, ${meta.shortName} Saudi Arabia, ${meta.shortName} Jeddah Khobar Doha, ${course.certificationVendor} training KSA, ${course.examCode || ''} Saudi corporate quote, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in Saudi Arabia & GCC`;
  } else if (regionCode === 'ng') {
    seoTitle = `${compactCourseName} Online Training in Lagos, Nigeria & Nairobi | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} training across Lagos, Abuja, Port Harcourt, Nairobi & Accra: WAT/EAT cohorts, 24/7 browser cloud sandboxes, corporate POs & 98.4% first-attempt pass rate.`;
    seoKeywords = `${meta.shortName} training Nigeria, ${meta.shortName} course Lagos Abuja, ${meta.shortName} training Nairobi Kenya, ${meta.shortName} Accra, ${course.certificationVendor} training West East Africa, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Online Training in Lagos, Nigeria & East Africa`;
  } else if (regionCode === 'sg') {
    seoTitle = `${compactCourseName} Training in Singapore & APAC (SGT) | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} bootcamp in Singapore, Marina Bay, Changi & Kuala Lumpur: SGT (UTC+8) cohorts, 24/7 browser cloud labs, SGD corporate PO quote & MAS TRM alignment.`;
    seoKeywords = `${meta.shortName} training Singapore, ${meta.shortName} course Singapore, ${meta.shortName} Kuala Lumpur APAC, ${course.certificationVendor} bootcamp SGD, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in Singapore & APAC`;
  } else if (regionCode === 'in') {
    seoTitle = `${compactCourseName} Training in Bengaluru, Mumbai & India (IST) | Learnify`;
    seoDescription = `Live ${meta.shortName}${examCodeText} online & corporate training in Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR & Chennai: IST evening/weekend cohorts, 24/7 cloud labs & INR corporate PO quotes.`;
    seoKeywords = `${meta.shortName} training Bengaluru, ${meta.shortName} course India, ${meta.shortName} Hyderabad Pune Mumbai Delhi NCR, ${course.certificationVendor} corporate training India, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in India`;
  } else {
    if (meta.courseId === 'course-kubernetes-cka') {
      seoTitle = `Enterprise Kubernetes CKA Course Europe · Pricing & Quote | Learnify`;
      seoDescription = `Enterprise Kubernetes CKA & CKS training across Dublin, Paris, Madrid, Stockholm & Europe: CET/WET cohorts, browser cluster labs, EUR pricing & corporate PO quote.`;
    } else {
      seoTitle = `${compactCourseName} Training Europe EU (2026) | Learnify`;
      seoDescription = `Live ${meta.shortName}${examCodeText} training across Dublin, Paris, Madrid, Milan, Stockholm & Warsaw: ${region.timezone} cohorts, 24/7 browser cloud labs, EUR SEPA PO quote & 98.4% pass rate.`;
    }
    seoKeywords = `${meta.shortName} training Europe, ${meta.shortName} Dublin Paris Madrid Stockholm Warsaw, enterprise kubernetes cka course, ${course.examCode || ''} EU certification, ${course.certificationVendor} training Europe EUR, Learnify Solutions`;
    h1Title = `${meta.shortName}${examCodeText} Certification Training in Europe`;
  }

  const industryAngle = getRegionalCourseIndustryAngle(meta, course, regionCode);
  const roleDemand = getRegionalCourseRoleDemand(meta, regionCode);

  const localizedOverview = `${course.summary} ${industryAngle} Delivered live in ${region.timezone} with 24/7 browser-based cloud sandboxes (no local VM or specialized PC needed) for professionals and enterprise IT teams across ${region.primaryCitiesLabel}.`;

  const localizedFaqs: Array<{ q: string; a: string }> = [
    {
      q: `How is ${meta.shortName}${examCodeText} delivered in ${region.countryName}?`,
      a: `We run live instructor-led online bootcamps scheduled in ${region.timezone} for individual learners and teams across ${region.cities.join(', ')}. Private onsite or dedicated corporate cohorts are also available for organizations of 6+ participants.`,
    },
    {
      q: `What laptop or machine specs are needed—and are 24/7 browser cloud labs included?`,
      a: `Any standard Windows, macOS, or Linux laptop with Chrome or Edge works—zero local VMs or heavy PC hardware required${regionCode === 'de' ? ' (keine lokale VM erforderlich)' : ''}. Every participant receives 24/7 browser-based cloud sandbox access mapped directly to official ${course.certificationVendor} ${course.examCode || ''} exam objectives.`,
    },
    {
      q: `How do individuals or companies request a ${region.currency} pricing & corporate Purchase Order quote?`,
      a: `${region.invoicingNote} Click Request ${region.shortName} Batch & Fee to get instant transparent individual pricing or a formal multi-seat ${region.currency} corporate quote.`,
    },
    {
      q: `What career roles and industries in ${region.shortName} value ${meta.shortName}?`,
      a: `High-demand roles include ${roleDemand}. Employers across ${region.businessDistricts} prioritize certified engineers who also understand ${region.complianceContext}.`,
    },
    {
      q: `Where can I write the ${meta.shortName}${examCodeText} certification exam in ${region.shortName}?`,
      a: `${region.examCenterNote} Our instructors also guide you step-by-step on exam voucher booking, scheduling, and mock exam readiness.`,
    },
  ];

  return {
    region,
    meta,
    course,
    slug,
    canonicalUrl,
    alternateUrls,
    seoTitle,
    seoDescription,
    seoKeywords,
    h1Title,
    industryAngle,
    roleDemand,
    localizedOverview,
    localizedFaqs,
  };
}

export function getRegionalCoursePages(regionCode: RegionCode): ResolvedRegionalCoursePage[] {
  return TARGET_REGIONAL_COURSES.map((meta) => buildRegionalCoursePage(meta, regionCode)).filter(
    (item): item is ResolvedRegionalCoursePage => item !== null
  );
}

export function getRegionalAlternatesForCourse(courseId: string): RegionalAlternateUrls | null {
  const meta = TARGET_REGIONAL_COURSES.find((c) => c.courseId === courseId);
  if (!meta) return null;
  return {
    global: `${SITE_BASE_URL}/course/${courseId}`,
    ae: `${SITE_BASE_URL}/ae/${getRegionalCourseSlug(meta, 'ae')}`,
    za: `${SITE_BASE_URL}/za/${getRegionalCourseSlug(meta, 'za')}`,
    uk: `${SITE_BASE_URL}/uk/${getRegionalCourseSlug(meta, 'uk')}`,
    de: `${SITE_BASE_URL}/de/${getRegionalCourseSlug(meta, 'de')}`,
    nl: `${SITE_BASE_URL}/nl/${getRegionalCourseSlug(meta, 'nl')}`,
    eu: `${SITE_BASE_URL}/eu/${getRegionalCourseSlug(meta, 'eu')}`,
    ao: `${SITE_BASE_URL}/ao/${getRegionalCourseSlug(meta, 'ao')}`,
    sa: `${SITE_BASE_URL}/sa/${getRegionalCourseSlug(meta, 'sa')}`,
    ng: `${SITE_BASE_URL}/ng/${getRegionalCourseSlug(meta, 'ng')}`,
    sg: `${SITE_BASE_URL}/sg/${getRegionalCourseSlug(meta, 'sg')}`,
    in: `${SITE_BASE_URL}/in/${getRegionalCourseSlug(meta, 'in')}`,
  };
}

export type RegionalRouteMatch =
  | { type: 'hub'; region: RegionConfig }
  | { type: 'course'; region: RegionConfig; page: ResolvedRegionalCoursePage };

export function resolveRegionalRoute(pathname: string): RegionalRouteMatch | null {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase() || '/';

  if (clean === '/ae' || clean === '/uae-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.ae };
  }
  if (clean === '/za' || clean === '/south-africa-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.za };
  }
  if (clean === '/uk' || clean === '/united-kingdom-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.uk };
  }
  if (clean === '/de' || clean === '/germany-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.de };
  }
  if (clean === '/nl' || clean === '/netherlands-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.nl };
  }
  if (clean === '/eu' || clean === '/europe-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.eu };
  }
  if (clean === '/ao' || clean === '/angola-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.ao };
  }
  if (clean === '/sa' || clean === '/saudi-arabia-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.sa };
  }
  if (clean === '/ng' || clean === '/nigeria-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.ng };
  }
  if (clean === '/sg' || clean === '/singapore-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.sg };
  }
  if (clean === '/in' || clean === '/india-it-training') {
    return { type: 'hub', region: REGION_CONFIGS.in };
  }

  for (const code of ALL_REGION_CODES) {
    const prefix = `/${code}/`;
    if (clean.startsWith(prefix)) {
      const slug = clean.slice(prefix.length);
      const meta = TARGET_REGIONAL_COURSES.find(
        (c) => getRegionalCourseSlug(c, code).toLowerCase() === slug
      );
      if (meta) {
        const page = buildRegionalCoursePage(meta, code);
        if (page) return { type: 'course', region: REGION_CONFIGS[code], page };
      }
    }
  }

  return null;
}
