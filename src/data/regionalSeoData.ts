import { Course } from '../types';
import { sampleCourses } from './coursesData';

export const SITE_BASE_URL = 'https://www.learnify-solutions.com';

export type RegionCode = 'ae' | 'za';

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
  hreflang: string;
  hubPath: string;
  hubTitle: string;
  hubDescription: string;
  hubKeywords: string;
  cities: string[];
  primaryCitiesLabel: string;
  businessDistricts: string;
  timezone: string;
  currency: 'AED' | 'ZAR';
  complianceContext: string;
  keyIndustries: string[];
  invoicingNote: string;
  examCenterNote: string;
  schedules: RegionBatchSchedule[];
  hubFaqs: Array<{ q: string; a: string }>;
}

export const REGION_CONFIGS: Record<RegionCode, RegionConfig> = {
  ae: {
    code: 'ae',
    countryName: 'United Arab Emirates',
    shortName: 'UAE',
    hreflang: 'en-AE',
    hubPath: '/ae',
    hubTitle: 'CompTIA & Microsoft Certification Training in Dubai & UAE | Learnify Solutions',
    hubDescription:
      'Authorized live online & corporate CompTIA and Microsoft Azure certification bootcamps in Dubai, Abu Dhabi & Sharjah. GST timezones, AED corporate invoicing & 24/7 cloud labs.',
    hubKeywords:
      'IT certification training Dubai, CompTIA training UAE, Microsoft Azure training Dubai, corporate IT training Abu Dhabi, AZ-104 Dubai, CompTIA Security+ UAE, Power BI training Dubai, Learnify Solutions UAE',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
    primaryCitiesLabel: 'Dubai, Abu Dhabi & Sharjah',
    businessDistricts: 'Dubai Internet City, DIFC, Abu Dhabi Global Market (ADGM), Media City & Sharjah Research Park',
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
      'Full exam readiness for Pearson VUE authorized testing centers across Dubai, Abu Dhabi & Sharjah as well as OnVUE online proctored exams.',
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
        q: 'Are CompTIA and Microsoft classes scheduled in UAE Gulf Standard Time (GST)?',
        a: 'Yes. All UAE cohorts run on Gulf Standard Time (UTC+4) with morning executive sessions, evening flex tracks after work hours in Dubai and Abu Dhabi, and weekend options.',
      },
      {
        q: 'Can UAE companies pay in AED via Corporate Purchase Orders?',
        a: 'Yes. Learnify Solutions supports corporate Purchase Orders (POs), multi-seat enterprise vouchers, and corporate invoicing in AED or USD for teams in Dubai, Abu Dhabi, and across the Emirates.',
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
    hreflang: 'en-ZA',
    hubPath: '/za',
    hubTitle: 'CompTIA & Microsoft Certification Training in South Africa | Learnify Solutions',
    hubDescription:
      'Live instructor-led CompTIA and Microsoft Azure certification bootcamps in Johannesburg, Cape Town, Pretoria & Durban. SAST timezones, ZAR corporate POs & 24/7 cloud labs.',
    hubKeywords:
      'CompTIA training South Africa, Microsoft Azure training Johannesburg, IT certification courses Cape Town, CompTIA Security+ South Africa, AZ-104 Pretoria, Power BI course South Africa, corporate IT training Sandton',
    cities: ['Johannesburg', 'Cape Town', 'Pretoria', 'Durban', 'Sandton'],
    primaryCitiesLabel: 'Johannesburg, Cape Town, Pretoria & Durban',
    businessDistricts: 'Sandton, Midrand, Rosebank, Century City (Cape Town), Menlyn (Pretoria) & Umhlanga Ridge',
    timezone: 'SAST (UTC+2)',
    currency: 'ZAR',
    complianceContext: 'POPIA data protection, FSCA cyber resilience & South African corporate Workplace Skills Plan (WSP) readiness',
    keyIndustries: [
      'Banking, Insurance & FinTech (Sandton/Cape Town)',
      'Telecommunications & ISP Networks',
      'Mining, Manufacturing & Supply Chain',
      'Managed IT Services & BPO Centers',
      'Public Sector & Healthcare IT Systems',
    ],
    invoicingNote:
      'Supports corporate Purchase Orders (POs), bulk team seat packages, and streamlined enterprise invoicing in ZAR or USD for South African businesses.',
    examCenterNote:
      'Structured preparation for Pearson VUE testing centers across Johannesburg, Pretoria, Cape Town & Durban, plus flexible OnVUE online proctoring.',
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
        q: 'Do live CompTIA and Microsoft sessions run in South Africa Standard Time (SAST)?',
        a: 'Yes. All South Africa batches are scheduled in SAST (UTC+2), with daytime corporate bootcamps and evening/weekend options designed for working IT professionals in Johannesburg, Cape Town, Pretoria, and Durban.',
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
  },
  {
    courseId: 'course-ms-pl-300',
    shortName: 'Microsoft Power BI Data Analyst (PL-300)',
    categoryTag: 'BI & Analytics',
    aeSlug: 'microsoft-power-bi-pl-300-training-dubai-uae',
    zaSlug: 'microsoft-power-bi-pl-300-training-south-africa',
    aeFocusKeyword: 'Microsoft Power BI PL-300 Training Dubai & UAE',
    zaFocusKeyword: 'Microsoft Power BI PL-300 Training South Africa',
    aeIndustryAngle:
      'High-demand executive BI training for Dubai & Abu Dhabi finance, real estate, aviation, and operations teams—mastering Power Query, DAX modeling, and workspace governance.',
    zaIndustryAngle:
      'Prepares South African data analysts, financial controllers, and BI developers to turn enterprise ERP/SQL data into executive Power BI dashboards and automated reports.',
    aeRoleDemand: 'Power BI Developer, Senior Business Intelligence Analyst, Data Reporting Lead (Dubai / UAE)',
    zaRoleDemand: 'BI Analyst, Power BI Developer, Financial & Data Reporting Specialist (Johannesburg / Cape Town)',
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
  },
  {
    courseId: 'course-ms-4018-copilot',
    shortName: 'Microsoft 365 Copilot (MS-4018)',
    categoryTag: 'Enterprise GenAI',
    aeSlug: 'microsoft-365-copilot-ms-4018-training-dubai-uae',
    zaSlug: 'microsoft-365-copilot-ms-4018-training-south-africa',
    aeFocusKeyword: 'Microsoft 365 Copilot Training Dubai & UAE',
    zaFocusKeyword: 'Microsoft 365 Copilot Training South Africa',
    aeIndustryAngle:
      'Practical enterprise Copilot prompt engineering across Word, Excel, PowerPoint, Outlook, and Teams—helping UAE corporate teams unlock immediate productivity ROI safely.',
    zaIndustryAngle:
      'Hands-on corporate enablement program for South African knowledge workers and executives adopting Microsoft 365 Copilot with secure data boundaries.',
    aeRoleDemand: 'Enterprise Workforce, Executive Leadership, Finance/HR/Ops Teams (Dubai & Abu Dhabi)',
    zaRoleDemand: 'Corporate Knowledge Workers, Operations Managers, FinTech & Enterprise Teams (South Africa)',
  },
];

export interface ResolvedRegionalCoursePage {
  region: RegionConfig;
  meta: RegionalCourseMeta;
  course: Course;
  slug: string;
  canonicalUrl: string;
  alternateUrls: {
    global: string;
    ae: string;
    za: string;
  };
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  h1Title: string;
  localizedOverview: string;
  localizedFaqs: Array<{ q: string; a: string }>;
}

export function buildRegionalCoursePage(
  meta: RegionalCourseMeta,
  regionCode: RegionCode
): ResolvedRegionalCoursePage | null {
  const course = sampleCourses.find((c) => c.id === meta.courseId);
  if (!course) return null;

  const region = REGION_CONFIGS[regionCode];
  const slug = regionCode === 'ae' ? meta.aeSlug : meta.zaSlug;
  const canonicalUrl = `${SITE_BASE_URL}/${regionCode}/${slug}`;

  const alternateUrls = {
    global: `${SITE_BASE_URL}/course/${course.id}`,
    ae: `${SITE_BASE_URL}/ae/${meta.aeSlug}`,
    za: `${SITE_BASE_URL}/za/${meta.zaSlug}`,
  };

  const hasExamCodeInShortName = Boolean(
    course.examCode &&
      meta.shortName.toLowerCase().includes(course.examCode.toLowerCase())
  );
  const examCodeText =
    course.examCode && !hasExamCodeInShortName ? ` (${course.examCode})` : '';
  const seoTitle =
    regionCode === 'ae'
      ? `${meta.shortName}${examCodeText} Training in Dubai & UAE | Learnify Solutions`
      : `${meta.shortName}${examCodeText} Training in South Africa | Learnify Solutions`;

  const seoDescription =
    regionCode === 'ae'
      ? `Live instructor-led ${meta.shortName}${examCodeText} certification bootcamp in Dubai, Abu Dhabi & Sharjah. ${region.timezone} schedules, 24/7 cloud labs, AED corporate invoicing & 98.4% pass rate.`
      : `Live instructor-led ${meta.shortName}${examCodeText} certification bootcamp in Johannesburg, Cape Town, Pretoria & Durban. ${region.timezone} batches, 24/7 cloud labs & ZAR corporate POs.`;

  const seoKeywords =
    regionCode === 'ae'
      ? `${meta.aeFocusKeyword}, ${meta.shortName} Dubai, ${meta.shortName} Abu Dhabi, ${course.examCode || ''} UAE course, ${course.certificationVendor} training UAE, corporate IT training Dubai, Learnify Solutions`
      : `${meta.zaFocusKeyword}, ${meta.shortName} Johannesburg, ${meta.shortName} Cape Town, ${meta.shortName} Pretoria, ${course.examCode || ''} South Africa, ${course.certificationVendor} training South Africa, Learnify Solutions`;

  const h1Title =
    regionCode === 'ae'
      ? `${meta.shortName}${examCodeText} Certification Training in Dubai & UAE`
      : `${meta.shortName}${examCodeText} Certification Training in South Africa`;

  const industryAngle = regionCode === 'ae' ? meta.aeIndustryAngle : meta.zaIndustryAngle;
  const roleDemand = regionCode === 'ae' ? meta.aeRoleDemand : meta.zaRoleDemand;

  const localizedOverview = `${course.summary} ${industryAngle} Delivered live in ${region.timezone} for professionals and enterprise IT teams across ${region.primaryCitiesLabel}.`;

  const localizedFaqs: Array<{ q: string; a: string }> = [
    {
      q: `How is ${meta.shortName}${examCodeText} delivered in ${region.countryName}?`,
      a: `We run live instructor-led online bootcamps scheduled in ${region.timezone} for individual learners and teams across ${region.cities.join(', ')}. Private onsite or dedicated corporate cohorts are also available for organizations of 6+ participants.`,
    },
    {
      q: `Are 24/7 hands-on virtual labs included for ${region.shortName} learners?`,
      a: `Yes. Every participant receives browser-based 24/7 cloud sandbox access mapped directly to official ${course.certificationVendor} ${course.examCode || ''} exam objectives, requiring zero local server hardware.`,
    },
    {
      q: `Can our company in ${region.shortName} pay in ${region.currency} using a Purchase Order?`,
      a: region.invoicingNote,
    },
    {
      q: `What career roles and industries in ${region.shortName} value ${meta.shortName}?`,
      a: `High-demand roles include ${roleDemand}. Employers across ${region.businessDistricts} prioritize certified engineers who also understand ${region.complianceContext}.`,
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
    localizedOverview,
    localizedFaqs,
  };
}

export function getRegionalCoursePages(regionCode: RegionCode): ResolvedRegionalCoursePage[] {
  return TARGET_REGIONAL_COURSES.map((meta) => buildRegionalCoursePage(meta, regionCode)).filter(
    (item): item is ResolvedRegionalCoursePage => item !== null
  );
}

export function getRegionalAlternatesForCourse(courseId: string): {
  global: string;
  ae: string;
  za: string;
} | null {
  const meta = TARGET_REGIONAL_COURSES.find((c) => c.courseId === courseId);
  if (!meta) return null;
  return {
    global: `${SITE_BASE_URL}/course/${courseId}`,
    ae: `${SITE_BASE_URL}/ae/${meta.aeSlug}`,
    za: `${SITE_BASE_URL}/za/${meta.zaSlug}`,
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

  if (clean.startsWith('/ae/')) {
    const slug = clean.slice(4);
    const meta = TARGET_REGIONAL_COURSES.find((c) => c.aeSlug.toLowerCase() === slug);
    if (meta) {
      const page = buildRegionalCoursePage(meta, 'ae');
      if (page) return { type: 'course', region: REGION_CONFIGS.ae, page };
    }
  }

  if (clean.startsWith('/za/')) {
    const slug = clean.slice(4);
    const meta = TARGET_REGIONAL_COURSES.find((c) => c.zaSlug.toLowerCase() === slug);
    if (meta) {
      const page = buildRegionalCoursePage(meta, 'za');
      if (page) return { type: 'course', region: REGION_CONFIGS.za, page };
    }
  }

  return null;
}
