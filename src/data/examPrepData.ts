import { ExamPrepResource } from '../types';
import {
  SECURITY_PLUS_SY0_701_QUESTIONS,
  AZURE_AZ_104_QUESTIONS,
  AWS_SAA_C03_QUESTIONS,
} from './examPrepQuestions';
import {
  POWER_BI_PL_300_QUESTIONS,
  NETWORK_PLUS_N10_009_QUESTIONS,
  AZURE_AI_102_QUESTIONS,
} from './examPrepQuestions2';
import {
  NETWORK_PORTS_CHEAT_SHEET,
  KUBECTL_CKA_CHEAT_SHEET,
  AZURE_VS_AWS_CHEAT_SHEET,
  AZURE_INTERVIEW_QA,
  SECURITY_SOC_INTERVIEW_QA,
  POWER_BI_INTERVIEW_QA,
  AWS_INTERVIEW_QA,
  CALCULATOR_REGIONS,
  CALCULATOR_COURSES,
} from './examPrepResources';
import {
  AZURE_AZ_900_QUESTIONS,
  AWS_CLF_C02_QUESTIONS,
  CISCO_CCNA_200_301_QUESTIONS,
  MICROSOFT_SC_900_QUESTIONS,
  ISC2_CISSP_QUESTIONS,
  KUBERNETES_CKA_QUESTIONS,
  TERRAFORM_ASSOC_QUESTIONS,
  GCP_ACE_QUESTIONS,
  LINUX_PLUS_QUESTIONS,
} from './examPrepQuestions3';
import {
  IPV4_SUBNETTING_CIDR_CHEAT_SHEET,
  LINUX_NETWORKING_CHEAT_SHEET,
  TERRAFORM_IAC_CHEAT_SHEET,
} from './examPrepResources2';

export { CALCULATOR_REGIONS, CALCULATOR_COURSES };

export const EXAM_PREP_RESOURCES: ExamPrepResource[] = [
  {
    slug: 'comptia-security-plus-sy0-701-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cybersecurity',
    examCode: 'SY0-701',
    title: 'CompTIA Security+ (SY0-701) Practice Questions & Exam Simulator 2026',
    shortTitle: 'CompTIA Security+ SY0-701 Practice Test',
    excerpt:
      'Test your SOC, Zero Trust, Cryptography, Threat Mitigation, and Governance readiness with 45 realistic SY0-701 scenario questions, timed pacing, and domain scorecards.',
    seoTitle: 'CompTIA Security+ SY0-701 Practice Questions & Free Mock Test 2026 | Learnify',
    seoDescription:
      'Practice CompTIA Security+ (SY0-701) exam questions covering Threats & Mitigations, Zero Trust Architecture, SOC Operations, and Governance with detailed answer rationales.',
    seoKeywords:
      'CompTIA Security+ SY0-701 practice questions, SY0-701 sample exam 2026, Security+ mock test, Zero Trust CompTIA questions, Learnify Exam Prep',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '83% Target (750/900)',
    relatedCourseId: 'course-comptia-security-plus',
    relatedCourseLabel: 'CompTIA Security+ (SY0-701) Live Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    domainWeights: [
      { name: 'Threats, Vulnerabilities, and Mitigations', weight: '22%' },
      { name: 'Security Architecture', weight: '18%' },
      { name: 'Security Operations', weight: '28%' },
      { name: 'Security Program Management and Oversight', weight: '20%' },
      { name: 'General Security Concepts', weight: '12%' },
    ],
    openPreviewCount: 2,
    questions: SECURITY_PLUS_SY0_701_QUESTIONS,
    faqs: [
      {
        q: 'How closely do these CompTIA Security+ SY0-701 questions match the live Pearson VUE exam?',
        a: 'All 45 scenarios mirror the SY0-701 situational stem format—combining SIEM telemetry, NTLM/Kerberos defense, Zero Trust service mesh design, and NIS2/GDPR governance rather than rote definitions.',
      },
      {
        q: 'What score is needed to pass the official CompTIA Security+ (SY0-701) exam?',
        a: 'CompTIA requires 750 on a 100–900 scaled scoring model (~83%). Consistently hitting 85%+ across our Security Operations and Threats domains indicates strong readiness.',
      },
      {
        q: 'Why do I unlock the full 45-question timed simulator after filling the quick registration form?',
        a: 'Completing the quick form unlocks the interactive timed exam runner, domain-by-domain weak-area breakdown, and optional 1-on-1 study plan review with a senior Learnify cybersecurity mentor.',
      },
    ],
  },
  {
    slug: 'azure-az-104-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cloud & DevOps',
    examCode: 'AZ-104',
    title: 'Microsoft Azure Administrator (AZ-104) Sample Exam Questions 2026',
    shortTitle: 'Microsoft Azure AZ-104 Practice Exam',
    excerpt:
      'Practice AZ-104 VNet peering, Gateway Transit, Managed Identities, Azure Policy, ZRS storage, and Load Balancer probe diagnostics with expert rationales.',
    seoTitle: 'Microsoft Azure AZ-104 Sample Exam Questions & Practice Test 2026 | Learnify',
    seoDescription:
      'Master Microsoft Azure Administrator (AZ-104) exam scenarios: Entra ID RBAC, Azure Policy, ZRS vs GRS, VNet Gateway Transit, UDRs, and Autoscale.',
    seoKeywords:
      'Azure AZ-104 practice questions, AZ-104 sample exam 2026, Microsoft Azure Administrator mock test, AZ-104 study questions',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-azure-104',
    relatedCourseLabel: 'Microsoft Azure Administrator (AZ-104) Live Course',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    domainWeights: [
      { name: 'Configure and Manage Virtual Networking', weight: '20%' },
      { name: 'Manage Azure Identities and Governance', weight: '20%' },
      { name: 'Implement and Manage Storage', weight: '20%' },
      { name: 'Deploy and Manage Azure Compute Resources', weight: '25%' },
      { name: 'Monitor and Maintain Azure Resources', weight: '15%' },
    ],
    openPreviewCount: 2,
    questions: AZURE_AZ_104_QUESTIONS,
    faqs: [
      {
        q: 'Which Azure AZ-104 topics trip up candidates most often on exam day?',
        a: 'Virtual Networking (`Gateway Transit`, `UDRs`, and `AzureLoadBalancer` health probe NSG tags) and governance boundaries (`Azure Policy vs RBAC vs Resource Locks`) account for the majority of missed points.',
      },
      {
        q: 'Are Microsoft Learn docs permitted during the live AZ-104 exam?',
        a: 'Yes, Microsoft Learn reference lookup is available inside the exam window for role-based exams, but running out of time due to slow navigation is a common risk—practicing timed scenarios builds decision speed.',
      },
    ],
  },
  {
    slug: 'aws-saa-c03-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cloud & DevOps',
    examCode: 'SAA-C03',
    title: 'AWS Solutions Architect Associate (SAA-C03) Practice Questions 2026',
    shortTitle: 'AWS Solutions Architect SAA-C03 Practice Test',
    excerpt:
      'Scenario-based AWS architecture questions testing S3 Gateway Endpoints, SQS decoupling, CloudFront OAC, Organizations SCPs, Transit Gateway, and Savings Plans.',
    seoTitle: 'AWS Solutions Architect SAA-C03 Practice Questions & Mock Exam 2026 | Learnify',
    seoDescription:
      'Realistic AWS Certified Solutions Architect Associate (SAA-C03) practice test questions covering Secure, Resilient, High-Performing, and Cost-Optimized VPC & Serverless designs.',
    seoKeywords:
      'AWS SAA-C03 practice questions, AWS Solutions Architect mock exam, AWS SAA-C03 sample questions 2026',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '72% Target (720/1000)',
    relatedCourseId: 'course-aws-solutions',
    relatedCourseLabel: 'AWS Solutions Architect (SAA-C03) Live Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    domainWeights: [
      { name: 'Design Secure Architectures', weight: '30%' },
      { name: 'Design Resilient Architectures', weight: '26%' },
      { name: 'Design High-Performing Architectures', weight: '24%' },
      { name: 'Design Cost-Optimized Architectures', weight: '20%' },
    ],
    openPreviewCount: 2,
    questions: AWS_SAA_C03_QUESTIONS,
    faqs: [
      {
        q: 'How should I eliminate wrong answers fast on AWS SAA-C03 scenario questions?',
        a: 'Read the final sentence carefully for the primary qualifier—"MOST cost-effective", "LEAST operational overhead", or "HIGHEST availability"—then eliminate any option relying on public internet NAT egress when a VPC Endpoint solves it for free.',
      },
      {
        q: 'Can I take Learnify’s live AWS SAA-C03 hands-on labs from UK, Europe, UAE, or South Africa?',
        a: 'Yes! Learnify runs regional GMT/BST, CET, GST, and SAST live cohorts with guided AWS Console & Terraform labs.',
      },
    ],
  },
  {
    slug: 'power-bi-pl-300-practice-questions',
    type: 'practice_test',
    topicTrack: 'Data & AI',
    examCode: 'PL-300',
    title: 'Microsoft Power BI Data Analyst (PL-300) Practice Questions & DAX Mock Test',
    shortTitle: 'Power BI PL-300 Practice Exam',
    excerpt:
      'Validate Star Schema data modeling, Power Query folding, USERELATIONSHIP, Dynamic Row-Level Security (RLS), and DAX Time Intelligence ahead of your PL-300 exam.',
    seoTitle: 'Microsoft Power BI PL-300 Practice Questions & DAX Mock Exam | Learnify',
    seoDescription:
      'Free PL-300 Microsoft Power BI Data Analyst practice questions covering Power Query M transformations, DAX measures, Star Schema cardinality, and Workspace RLS governance.',
    seoKeywords:
      'PL-300 practice questions, Power BI certification mock test, Power BI DAX exam questions, PL-300 study guide',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-ms-pl-300',
    relatedCourseLabel: 'Microsoft Power BI Data Analyst (PL-300) Training',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    domainWeights: [
      { name: 'Prepare the Data', weight: '25%' },
      { name: 'Model the Data', weight: '30%' },
      { name: 'Visualize and Analyze the Data', weight: '25%' },
      { name: 'Manage and Secure Power BI', weight: '20%' },
    ],
    openPreviewCount: 2,
    questions: POWER_BI_PL_300_QUESTIONS,
    faqs: [
      {
        q: 'How much DAX coding appears on Microsoft PL-300?',
        a: 'Around 25–30% of questions require reading or selecting exact DAX expressions (`CALCULATE`, `TOTALYTD`, `USERELATIONSHIP`, `REMOVEFILTERS`), plus knowing Star Schema modeling best practices.',
      },
    ],
  },
  {
    slug: 'comptia-network-plus-n10-009-practice-questions',
    type: 'practice_test',
    topicTrack: 'Networking & Infrastructure',
    examCode: 'N10-009',
    title: 'CompTIA Network+ (N10-009) Practice Test & Troubleshooting Scenarios',
    shortTitle: 'CompTIA Network+ N10-009 Practice Test',
    excerpt:
      'Practice CIDR VLSM subnetting, LACP EtherChannel, 802.1X NAC, fiber optic mismatch diagnostics, SNMPv3 authPriv, and OSI Layer-1/2/3 triage.',
    seoTitle: 'CompTIA Network+ N10-009 Practice Questions & Subnetting Mock Test | Learnify',
    seoDescription:
      'Practice CompTIA Network+ (N10-009) scenarios covering CIDR subnetting, VLAN/DHCP troubleshooting, fiber optics, Wi-Fi channels, and firewall ports.',
    seoKeywords:
      'CompTIA Network+ N10-009 practice test, N10-009 mock questions, Network+ subnetting questions, CompTIA networking quiz',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '80% Target (720/900)',
    relatedCourseId: 'course-comptia-network-plus',
    relatedCourseLabel: 'CompTIA Network+ (N10-009) Certification Training',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    domainWeights: [
      { name: 'Networking Concepts', weight: '23%' },
      { name: 'Network Implementation', weight: '20%' },
      { name: 'Network Operations', weight: '19%' },
      { name: 'Network Security', weight: '14%' },
      { name: 'Network Troubleshooting', weight: '24%' },
    ],
    openPreviewCount: 2,
    questions: NETWORK_PLUS_N10_009_QUESTIONS,
    faqs: [
      {
        q: 'Are port numbers and CIDR subnetting still heavily tested on N10-009?',
        a: 'Yes—subnet sizing (`/25`, `/26`, `/27`, `/28`), common port numbers (`22`, `53`, `123`, `161`, `445`, `636`), and cable/optic troubleshooting are core PBQ pillars.',
      },
    ],
  },
  {
    slug: 'azure-ai-102-practice-questions',
    type: 'practice_test',
    topicTrack: 'Data & AI',
    examCode: 'AI-102',
    title: 'Microsoft Azure AI Engineer (AI-102) Sample Exam Questions 2026',
    shortTitle: 'Microsoft Azure AI-102 Practice Questions',
    excerpt:
      'Test your Azure OpenAI RAG grounding, Azure AI Search Hybrid + Semantic Ranking, Content Safety Prompt Shields, Document Intelligence, and CLU skills.',
    seoTitle: 'Azure AI-102 Practice Questions & Generative AI Mock Exam 2026 | Learnify',
    seoDescription:
      'Master Microsoft Azure AI Engineer (AI-102) exam topics including Azure OpenAI RAG pipelines, AI Search skillsets, Document Intelligence, Speech diarization, and Private Link.',
    seoKeywords:
      'Azure AI-102 practice questions, Microsoft AI-102 mock test 2026, Azure OpenAI certification exam questions',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-ms-ai-102',
    relatedCourseLabel: 'Microsoft Azure AI Engineer (AI-102) Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    domainWeights: [
      { name: 'Implement Generative AI Solutions', weight: '25%' },
      { name: 'Plan and Manage an Azure AI Solution', weight: '20%' },
      { name: 'Implement Knowledge Mining & Document Intelligence', weight: '20%' },
      { name: 'Implement Natural Language Processing', weight: '20%' },
      { name: 'Implement Computer Vision Solutions', weight: '15%' },
    ],
    openPreviewCount: 2,
    questions: AZURE_AI_102_QUESTIONS,
    faqs: [
      {
        q: 'Does the 2026 AI-102 blueprint focus heavily on Azure OpenAI and RAG?',
        a: 'Yes—Generative AI, Hybrid AI Search grounding, Prompt Shields, Groundedness evaluation, and Managed Identity / Private Endpoint hardening are top-weighted skills.',
      },
    ],
  },
  {
    slug: 'comptia-network-plus-port-numbers-cheat-sheet',
    type: 'cheat_sheet',
    topicTrack: 'Networking & Infrastructure',
    examCode: 'N10-009 / SY0-701',
    title: 'CompTIA Network+ & Security+ Port Numbers Cheat Sheet (2026 Reference)',
    shortTitle: 'CompTIA Port Numbers Cheat Sheet',
    excerpt:
      'Complete searchable TCP/UDP port numbers sheet covering SSH, DNS, DHCP, NTP, LDAPS, SNMPv3, Syslog, RADIUS, TACACS+, and SMB with exam security notes.',
    seoTitle: 'CompTIA Network+ & Security+ Port Numbers Cheat Sheet (TCP/UDP) | Learnify',
    seoDescription:
      'Quick-reference searchable TCP and UDP port numbers cheat sheet for CompTIA Network+ N10-009 and Security+ SY0-701 exam preparation.',
    seoKeywords:
      'CompTIA port numbers cheat sheet, Network+ port numbers table, Security+ SY0-701 ports, common TCP UDP ports list',
    durationLabel: 'Quick Reference',
    questionCountLabel: '18 Core Ports',
    passingScoreLabel: 'Searchable + Copy',
    relatedCourseId: 'course-comptia-network-plus',
    relatedCourseLabel: 'CompTIA Network+ (N10-009) Live Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    cheatSheetSections: NETWORK_PORTS_CHEAT_SHEET,
    faqs: [
      {
        q: 'Why do both CompTIA Network+ and Security+ test unencrypted vs encrypted port pairs?',
        a: 'Performance-based questions frequently ask you to harden firewall ACLs by disabling plaintext ports (`21 FTP`, `23 Telnet`, `389 LDAP`, `80 HTTP`) and permitting secure encrypted equivalents (`22 SFTP/SSH`, `636 LDAPS`, `443 HTTPS`).',
      },
    ],
  },
  {
    slug: 'kubernetes-cka-kubectl-commands-cheat-sheet',
    type: 'cheat_sheet',
    topicTrack: 'Cloud & DevOps',
    examCode: 'CKA · CNCF',
    title: 'Kubernetes CKA kubectl Commands Cheat Sheet (Imperative Speed & etcd)',
    shortTitle: 'Kubernetes kubectl Commands Cheat Sheet',
    excerpt:
      'One-click copyable kubectl imperative YAML generators, context switching, node drain/upgrade workflows, RBAC `auth can-i`, and `etcdctl` snapshot backup commands.',
    seoTitle: 'Kubernetes kubectl Commands Cheat Sheet for CKA Exam | Learnify',
    seoDescription:
      'Production-ready Kubernetes CKA kubectl commands cheat sheet covering dry-run YAML generation, etcd snapshots, node drain, RBAC checks, and pod debugging.',
    seoKeywords:
      'Kubernetes kubectl commands cheat sheet, CKA exam cheat sheet, kubectl dry-run yaml, etcdctl backup command',
    durationLabel: 'Quick Reference',
    questionCountLabel: '11 CKA Patterns',
    passingScoreLabel: '1-Click Copy',
    relatedCourseId: 'course-kubernetes-cka',
    relatedCourseLabel: 'Certified Kubernetes Administrator (CKA) Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    cheatSheetSections: KUBECTL_CKA_CHEAT_SHEET,
    faqs: [
      {
        q: 'What single kubectl trick saves the most time on the 2-hour CKA practical exam?',
        a: 'Generating base manifests cleanly with `--dry-run=client -o yaml > file.yaml` instead of typing YAML blocks by hand eliminates indentation errors and saves 20+ minutes across tasks.',
      },
    ],
  },
  {
    slug: 'azure-vs-aws-services-mapping-sheet',
    type: 'cheat_sheet',
    topicTrack: 'Cloud & DevOps',
    examCode: 'AZ-104 vs SAA-C03',
    title: 'Azure vs AWS Services Architecture Mapping Sheet (2026 Multi-Cloud Guide)',
    shortTitle: 'Azure vs AWS Services Mapping Sheet',
    excerpt:
      'Side-by-side translation guide mapping Azure VNet, NSG, Entra ID, AKS, ExpressRoute, and Key Vault directly to AWS VPC, IAM, EKS, Direct Connect, and KMS.',
    seoTitle: 'Azure vs AWS Services Mapping Cheat Sheet (2026 Cloud Guide) | Learnify',
    seoDescription:
      'Complete side-by-side Azure vs AWS services cheat sheet across Compute, Containers, Networking, Storage, Identity, and Enterprise Governance.',
    seoKeywords:
      'Azure vs AWS services mapping, AWS to Azure translation chart, AZ-104 vs SAA-C03 comparison sheet',
    durationLabel: 'Architecture Matrix',
    questionCountLabel: '12 Core Mappings',
    passingScoreLabel: 'Multi-Cloud Ref',
    relatedCourseId: 'course-azure-104',
    relatedCourseLabel: 'Microsoft Azure Administrator (AZ-104) Course',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    cheatSheetSections: AZURE_VS_AWS_CHEAT_SHEET,
    faqs: [
      {
        q: 'What is the biggest conceptual trap when AWS engineers learn Microsoft Azure?',
        a: 'In AWS, a Subnet belongs strictly to one Availability Zone and NACLs are stateless; in Azure, Virtual Networks and NSGs operate across zones automatically and Microsoft Entra ID serves as a unified enterprise identity control plane.',
      },
    ],
  },
  {
    slug: 'azure-administrator-interview-questions',
    type: 'interview_qa',
    topicTrack: 'Cloud & DevOps',
    examCode: 'AZ-104 · Cloud Admin',
    title: 'Microsoft Azure Administrator (AZ-104) Technical Interview Questions & Answers',
    shortTitle: 'Azure Administrator Interview Questions',
    excerpt:
      'Scenario answers hiring managers test in Azure Cloud Engineer interviews: Service vs Private Endpoints, Policy vs RBAC, VNet Peering triage, ZRS vs GRS, and Managed Identities.',
    seoTitle: 'Azure Administrator Interview Questions & Answers (2026) | Learnify',
    seoDescription:
      'Top Microsoft Azure Administrator technical interview questions and senior-level answers covering Private Link, NSGs, UDR routing, Entra Managed Identities, and HA.',
    seoKeywords:
      'Azure administrator interview questions, AZ-104 interview Q&A, Azure cloud engineer technical interview answers',
    durationLabel: '10 Min Read',
    questionCountLabel: '6 Senior Q&As',
    passingScoreLabel: 'Hiring Rubric Tips',
    relatedCourseId: 'course-azure-104',
    relatedCourseLabel: 'Microsoft Azure Administrator (AZ-104) Live Course',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    interviewItems: AZURE_INTERVIEW_QA,
    faqs: [
      {
        q: 'Do Azure hiring managers ask more conceptual definitions or troubleshooting scenarios?',
        a: 'Nearly every mid-to-senior interview focuses on troubleshooting real breaks—such as why VNet peering stops forwarding packets or how Private Endpoints resolve internal DNS.',
      },
    ],
  },
  {
    slug: 'comptia-security-soc-interview-questions',
    type: 'interview_qa',
    topicTrack: 'Cybersecurity',
    examCode: 'SY0-701 · SOC L1/L2',
    title: 'Cybersecurity & SOC Analyst (Security+ SY0-701) Interview Questions & Answers',
    shortTitle: 'Cybersecurity & SOC Interview Questions',
    excerpt:
      'Real-world SOC L1/L2 triage scenarios: impossible travel + encoded PowerShell containment, Kerberoasting remediation, mTLS, CISA KEV/EPSS patching, and NIS2 compliance.',
    seoTitle: 'SOC Analyst & Cybersecurity Interview Questions (SY0-701) | Learnify',
    seoDescription:
      'Prepare for Cybersecurity & SOC Analyst interviews with structured incident response, Kerberoasting defense, mTLS, and risk-based vulnerability prioritization answers.',
    seoKeywords:
      'SOC analyst interview questions, CompTIA Security+ interview Q&A, cybersecurity technical interview answers 2026',
    durationLabel: '10 Min Read',
    questionCountLabel: '6 SOC Scenarios',
    passingScoreLabel: 'NIST 800-61 Aligned',
    relatedCourseId: 'course-comptia-security-plus',
    relatedCourseLabel: 'CompTIA Security+ (SY0-701) Certification Training',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    interviewItems: SECURITY_SOC_INTERVIEW_QA,
    faqs: [
      {
        q: 'What frameworks should I cite in a SOC Analyst interview?',
        a: 'Referencing NIST SP 800-61 incident lifecycle phases cleanly alongside MITRE ATT&CK TTPs and EPSS/CISA KEV prioritization immediately sets you apart from textbook answers.',
      },
    ],
  },
  {
    slug: 'power-bi-data-analyst-interview-questions',
    type: 'interview_qa',
    topicTrack: 'Data & AI',
    examCode: 'PL-300 · BI & DAX',
    title: 'Power BI & DAX Data Analyst (PL-300) Technical Interview Questions 2026',
    shortTitle: 'Power BI & DAX Interview Questions',
    excerpt:
      'Nail BI interviews on Row vs Filter Context transition, Star Schema performance over flat tables, Query Folding verification, Performance Analyzer, and RLS caveats.',
    seoTitle: 'Power BI & DAX Interview Questions and Answers (PL-300) | Learnify',
    seoDescription:
      'Senior Power BI & DAX Data Analyst interview questions covering Context Transition, Query Folding, Star Schema, DAX Studio optimization, and Dynamic RLS.',
    seoKeywords:
      'Power BI interview questions, DAX interview answers, PL-300 data analyst interview questions 2026',
    durationLabel: '8 Min Read',
    questionCountLabel: '5 Technical Q&As',
    passingScoreLabel: 'BI Architect Prep',
    relatedCourseId: 'course-ms-pl-300',
    relatedCourseLabel: 'Microsoft Power BI Data Analyst (PL-300) Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    interviewItems: POWER_BI_INTERVIEW_QA,
    faqs: [
      {
        q: 'What is the #1 Power BI technical interview question candidates miss?',
        a: 'Explaining clearly how `CALCULATE` converts Row Context into Filter Context (Context Transition) and knowing why Workspace Contributors bypass Row-Level Security.',
      },
    ],
  },
  {
    slug: 'aws-solutions-architect-interview-questions',
    type: 'interview_qa',
    topicTrack: 'Cloud & DevOps',
    examCode: 'SAA-C03 · Architect',
    title: 'AWS Solutions Architect (SAA-C03) System Design Interview Questions 2026',
    shortTitle: 'AWS Solutions Architect Interview Questions',
    excerpt:
      'Answer enterprise AWS design prompts cleanly: Gateway vs Interface Endpoints, RDS Multi-AZ vs Read Replicas, IAM Policy evaluation hierarchy, S3 Lifecycle, and Fargate vs Lambda.',
    seoTitle: 'AWS Solutions Architect Interview Questions & System Design Q&A | Learnify',
    seoDescription:
      'High-impact AWS Solutions Architect interview questions covering VPC Endpoints, PrivateLink, Multi-AZ failover, IAM SCP evaluation order, and serverless vs containers.',
    seoKeywords:
      'AWS Solutions Architect interview questions, SAA-C03 system design Q&A, AWS cloud architect technical interview',
    durationLabel: '9 Min Read',
    questionCountLabel: '5 Design Q&As',
    passingScoreLabel: 'Well-Architected',
    relatedCourseId: 'course-aws-solutions',
    relatedCourseLabel: 'AWS Solutions Architect (SAA-C03) Course',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    interviewItems: AWS_INTERVIEW_QA,
    faqs: [
      {
        q: 'How can engineers prove practical AWS readiness beyond holding SAA-C03?',
        a: 'Build multi-AZ VPC + Terraform labs demonstrating PrivateLink, ALB/WAF routing, and IAM least-privilege policies—which Learnify builds interactively during live cohorts.',
      },
    ],
  },
  {
    slug: 'it-certification-exam-cost-salary-calculator',
    type: 'cost_calculator',
    topicTrack: 'Career & Exam ROI',
    examCode: 'GBP · EUR · AED · ZAR · USD · INR',
    title: 'IT Certification Exam Cost, Retake & Salary ROI Calculator 2026 (Global Hubs)',
    shortTitle: 'IT Certification Cost & Salary Calculator',
    excerpt:
      'Calculate official exam voucher pricing, retake protection buffers, training budgets, and certified salary benchmarks across UK (GBP), Europe (EUR), UAE (AED), South Africa (ZAR), USA (USD), and India (INR).',
    seoTitle: 'IT Certification Exam Cost & Salary Calculator 2026 (UK, Europe, UAE, SA) | Learnify',
    seoDescription:
      'Interactive 2026 calculator comparing Microsoft Azure AZ-104, CompTIA Security+, AWS SAA-C03, Power BI PL-300, and Kubernetes CKA exam fees and salary ROI in GBP, EUR, AED, ZAR, USD, and INR.',
    seoKeywords:
      'IT certification cost calculator 2026, Azure AZ-104 exam cost UK Europe UAE, CompTIA Security+ fee South Africa ZAR, certified IT salary ROI',
    durationLabel: 'Interactive Tool',
    questionCountLabel: '8 Certs × 6 Regions',
    passingScoreLabel: 'Live Multi-Currency',
    relatedCourseId: 'course-comptia-security-plus',
    relatedCourseLabel: 'Browse Regional & Corporate Programs',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-22',
    faqs: [
      {
        q: 'Why do CompTIA and Microsoft exam voucher prices vary across UK, Europe, UAE, South Africa, and India?',
        a: 'Vendors like CompTIA and Pearson VUE apply emerging-market regional pricing tiers in South Africa/India alongside local GBP/EUR/AED exchange adjustments and statutory VAT rules.',
      },
      {
        q: 'Does Learnify offer multi-seat corporate bundles combining live training with exam vouchers?',
        a: 'Yes—enterprises and individual learners across UK, Europe, UAE, South Africa, North America, and APAC can request bundled training + Pearson VUE voucher tax invoices.',
      },
    ],
  },
  {
    slug: 'azure-az-900-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cloud & DevOps',
    examCode: 'AZ-900',
    title: 'Microsoft Azure Fundamentals (AZ-900) Practice Questions & Mock Exam 2026',
    shortTitle: 'Microsoft Azure AZ-900 Practice Test',
    excerpt:
      'Practice CapEx vs OpEx, Shared Responsibility Model, Microsoft Entra ID, Azure Policy, Resource Locks, and Region Pairs with 45 realistic AZ-900 questions.',
    seoTitle: 'Microsoft Azure AZ-900 Practice Questions & Free Mock Test 2026 | Learnify',
    seoDescription:
      'Free Microsoft Azure Fundamentals (AZ-900) practice questions testing Cloud Concepts, Azure Architecture & Services, Management & Governance, and Entra ID.',
    seoKeywords:
      'Azure AZ-900 practice questions, AZ-900 mock exam 2026, Microsoft Azure Fundamentals sample questions, free AZ-900 quiz',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-azure-104',
    relatedCourseLabel: 'Microsoft Azure Administration & Cloud Track (AZ-900 -> AZ-104)',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Describe Cloud Concepts', weight: '25–30%' },
      { name: 'Describe Azure Architecture and Services', weight: '35–40%' },
      { name: 'Describe Azure Management and Governance', weight: '30–35%' },
    ],
    openPreviewCount: 2,
    questions: AZURE_AZ_900_QUESTIONS,
    faqs: [
      {
        q: 'Do I need coding or PowerShell skills to pass Microsoft AZ-900?',
        a: 'No coding is required for AZ-900. However, understanding how Management Groups, Azure Policy, Resource Locks, and Entra ID work conceptually is heavily tested.',
      },
      {
        q: 'How should I progress right after passing AZ-900?',
        a: 'Most engineers move straight to Microsoft Azure Administrator (AZ-104) for hands-on VNet/compute roles or Microsoft SC-900 for security & compliance tracks.',
      },
    ],
  },
  {
    slug: 'aws-clf-c02-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cloud & DevOps',
    examCode: 'CLF-C02',
    title: 'AWS Certified Cloud Practitioner (CLF-C02) Practice Questions & Quiz 2026',
    shortTitle: 'AWS Cloud Practitioner CLF-C02 Practice Test',
    excerpt:
      'Validate AWS Well-Architected pillars, IAM least privilege, S3 storage classes, CloudFront, Trusted Advisor, and AWS Support Plans across 45 CLF-C02 scenarios.',
    seoTitle: 'AWS Cloud Practitioner CLF-C02 Practice Questions & Mock Exam 2026 | Learnify',
    seoDescription:
      'Test your AWS Certified Cloud Practitioner (CLF-C02) readiness with 45 timed practice scenarios covering Cloud Concepts, Security & Compliance, Technology, and Billing.',
    seoKeywords:
      'AWS CLF-C02 practice questions, AWS Cloud Practitioner mock test 2026, CLF-C02 sample exam questions, free AWS quiz',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-aws-solutions',
    relatedCourseLabel: 'AWS Cloud & Solutions Architect Track (CLF-C02 -> SAA-C03)',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Cloud Concepts', weight: '24%' },
      { name: 'Security and Compliance', weight: '30%' },
      { name: 'Cloud Technology and Services', weight: '34%' },
      { name: 'Billing, Pricing, and Support', weight: '12%' },
    ],
    openPreviewCount: 2,
    questions: AWS_CLF_C02_QUESTIONS,
    faqs: [
      {
        q: 'What are the highest-yield topics on AWS CLF-C02 in 2026?',
        a: 'Expect multiple questions distinguishing AWS CloudTrail vs CloudWatch vs Trusted Advisor vs Inspector, Shared Responsibility boundaries, S3 Intelligent-Tiering vs Glacier, and AWS Support Plan TAM access.',
      },
    ],
  },
  {
    slug: 'cisco-ccna-200-301-practice-questions',
    type: 'practice_test',
    topicTrack: 'Networking & Infrastructure',
    examCode: '200-301',
    title: 'Cisco CCNA (200-301) Practice Questions & Routing/Switching Exam Simulator',
    shortTitle: 'Cisco CCNA 200-301 Practice Exam',
    excerpt:
      'Drill longest-prefix-match routing, OSPF neighbor/DR election, RSTP port states, 802.1Q trunking, DHCP Snooping, and RESTCONF JSON automation across 45 scenarios.',
    seoTitle: 'Cisco CCNA 200-301 Practice Questions & Free Routing Simulator | Learnify',
    seoDescription:
      'Free Cisco CCNA (200-301) practice test questions covering Network Fundamentals, IP Connectivity (OSPF), IP Services, Security Fundamentals, and Automation.',
    seoKeywords:
      'Cisco CCNA 200-301 practice questions, CCNA sample exam 2026, CCNA OSPF RSTP questions, Cisco CCNA mock test',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '82% Target (~825/1000)',
    relatedCourseId: 'course-comptia-network-plus',
    relatedCourseLabel: 'Networking & Cisco CCNA / Network+ Bootcamp Track',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Network Fundamentals', weight: '20%' },
      { name: 'Network Access', weight: '20%' },
      { name: 'IP Connectivity', weight: '25%' },
      { name: 'IP Services', weight: '10%' },
      { name: 'Security & Automation', weight: '25%' },
    ],
    openPreviewCount: 2,
    questions: CISCO_CCNA_200_301_QUESTIONS,
    faqs: [
      {
        q: 'How fast do I need to solve IPv4 subnetting & routing table lookups on Cisco CCNA 200-301?',
        a: 'Under 45 seconds per question—pair this timed CCNA simulator with Learnify’s live IPv4 CIDR Calculator to master /24–/30 mask boundaries before sitting the exam.',
      },
    ],
  },
  {
    slug: 'microsoft-sc-900-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cybersecurity',
    examCode: 'SC-900',
    title: 'Microsoft SC-900 Security, Compliance & Identity Practice Questions 2026',
    shortTitle: 'Microsoft SC-900 Practice Questions',
    excerpt:
      'Practice Zero Trust pillars, Conditional Access, Microsoft Entra ID Protection, Defender XDR, Microsoft Sentinel SIEM/SOAR, and Purview DLP sensitivity labels.',
    seoTitle: 'Microsoft SC-900 Practice Questions & Zero Trust Mock Test 2026 | Learnify',
    seoDescription:
      'Free Microsoft Security, Compliance, and Identity Fundamentals (SC-900) practice questions with detailed Zero Trust, Entra ID, Sentinel & Purview rationales.',
    seoKeywords:
      'Microsoft SC-900 practice questions, SC-900 sample exam 2026, Microsoft Entra ID SC-900 mock test, Zero Trust quiz',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-ms-sc-900',
    relatedCourseLabel: 'Microsoft Security, Compliance & Identity (SC-900) Live Course',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Security, Compliance & Identity Concepts', weight: '10–15%' },
      { name: 'Microsoft Entra Capabilities', weight: '25–30%' },
      { name: 'Microsoft Security Solutions (Defender & Sentinel)', weight: '35–40%' },
      { name: 'Microsoft Compliance Solutions (Purview)', weight: '20–25%' },
    ],
    openPreviewCount: 2,
    questions: MICROSOFT_SC_900_QUESTIONS,
    faqs: [
      {
        q: 'How does Microsoft SC-900 complement CompTIA Security+ (SY0-701)?',
        a: 'Security+ builds vendor-neutral SOC and cryptography foundations, while SC-900 translates Zero Trust directly into Microsoft Entra ID, Defender XDR, Sentinel, and Purview governance used across M365 enterprises.',
      },
    ],
  },
  {
    slug: 'isc2-cissp-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cybersecurity',
    examCode: 'CISSP · ISC2',
    title: 'ISC2 CISSP Practice Questions & Security Architect Mock Scenarios 2026',
    shortTitle: 'ISC2 CISSP Practice Exam',
    excerpt:
      'Calibrate your "Think Like a Manager" instinct across ALE/SLE quantitative risk, Kerberos/SAML federation, Bell-LaPadula vs Biba, SOC 2 Type II, and SDLC security.',
    seoTitle: 'ISC2 CISSP Practice Questions & Executive Risk Simulator 2026 | Learnify',
    seoDescription:
      'Free ISC2 CISSP practice questions across all 8 CBK Domains including Security & Risk Management, IAM, Security Architecture, Cryptography, and Operations.',
    seoKeywords:
      'CISSP practice questions 2026, ISC2 CISSP sample exam, CISSP manager mindset scenarios, CISSP mock test',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-comptia-security-plus',
    relatedCourseLabel: 'Cybersecurity Leadership Track (Security+ -> CISSP Prep)',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Security and Risk Management', weight: '16%' },
      { name: 'Security Architecture and Engineering', weight: '13%' },
      { name: 'Identity and Access Management (IAM)', weight: '13%' },
      { name: 'Security Operations', weight: '13%' },
      { name: 'Asset, Comm, Assessment & SDLC', weight: '45%' },
    ],
    openPreviewCount: 2,
    questions: ISC2_CISSP_QUESTIONS,
    faqs: [
      {
        q: 'What is the "Think Like a Manager" rule on ISC2 CISSP scenario questions?',
        a: 'When presented with multiple technically valid options, CISSP favors protecting Human Life Safety first, followed by Governance / Risk Assessment / Policy alignment over ad-hoc manual firewall edits.',
      },
    ],
  },
  {
    slug: 'kubernetes-cka-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cloud & DevOps',
    examCode: 'CKA · CNCF',
    title: 'Certified Kubernetes Administrator (CKA) Practice Questions & Exam Simulator 2026',
    shortTitle: 'Certified Kubernetes Administrator CKA Practice Test',
    excerpt:
      'Drill cluster upgrades via kubeadm, etcd backup/restore, RBAC can-i authorization, NetworkPolicies, CSI storage, and worker node draining across 45 scenario questions.',
    seoTitle: 'Certified Kubernetes Administrator (CKA) Practice Questions & Mock Exam 2026 | Learnify',
    seoDescription:
      'Free CNCF Certified Kubernetes Administrator (CKA) practice test questions covering cluster architecture, installation, troubleshooting, workloads, networking, and storage.',
    seoKeywords:
      'CKA practice questions, Certified Kubernetes Administrator mock exam 2026, CKA sample exam questions, kubernetes cka simulator',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '66% Target (66/100)',
    relatedCourseId: 'course-comptia-network-plus',
    relatedCourseLabel: 'DevOps & Kubernetes CKA Certification Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Cluster Architecture, Installation & Configuration', weight: '25%' },
      { name: 'Workloads & Scheduling', weight: '15%' },
      { name: 'Services & Networking', weight: '20%' },
      { name: 'Storage', weight: '10%' },
      { name: 'Troubleshooting & Security', weight: '30%' },
    ],
    openPreviewCount: 2,
    questions: KUBERNETES_CKA_QUESTIONS,
    faqs: [
      {
        q: 'How does the CKA exam differ from multiple-choice cloud exams?',
        a: 'The official CKA exam is a 100% hands-on command-line terminal exam inside live Kubernetes clusters—meaning memorizing imperative generators like `kubectl run --dry-run=client -o yaml` is essential to pass under the 2-hour clock.',
      },
    ],
  },
  {
    slug: 'terraform-associate-003-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cloud & DevOps',
    examCode: 'Terraform 003',
    title: 'HashiCorp Certified Terraform Associate (003) Practice Questions & Exam Simulator',
    shortTitle: 'Terraform Associate (003) Practice Exam',
    excerpt:
      'Validate HCL syntax, state management, `terraform import`, modules, backends, variable precedence, and count vs for_each across 45 scenario questions.',
    seoTitle: 'Terraform Associate (003) Practice Questions & Mock Exam 2026 | Learnify',
    seoDescription:
      'Free HashiCorp Certified Terraform Associate (003) practice questions covering state locking, import, modules, variables, dynamic blocks, and cloud infrastructure automation.',
    seoKeywords:
      'Terraform Associate 003 practice questions, Terraform 003 sample exam 2026, HashiCorp Terraform certification mock test',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-aws-solutions',
    relatedCourseLabel: 'Cloud Automation with Terraform & AWS/Azure Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Understand Infrastructure as Code (IaC) Concepts', weight: '15%' },
      { name: 'Understand Terraform Basics & State Management', weight: '25%' },
      { name: 'Use Terraform Modules & Configuration Language', weight: '30%' },
      { name: 'Interact with Terraform State & Operations', weight: '30%' },
    ],
    openPreviewCount: 2,
    questions: TERRAFORM_ASSOC_QUESTIONS,
    faqs: [
      {
        q: 'What are the highest-yield topics on the Terraform Associate (003) exam?',
        a: 'Expect heavy emphasis on state management (`terraform import`, `state rm`, remote backends with locking), module composition, input variable precedence, and the difference between `count` and `for_each`.',
      },
    ],
  },
  {
    slug: 'gcp-associate-cloud-engineer-practice-questions',
    type: 'practice_test',
    topicTrack: 'Cloud & DevOps',
    examCode: 'GCP ACE',
    title: 'Google Cloud Associate Cloud Engineer (GCP ACE) Practice Questions 2026',
    shortTitle: 'Google Cloud Associate Cloud Engineer Practice Test',
    excerpt:
      'Drill GCP resource hierarchy, IAM least privilege, GKE container logging, Cloud Storage lifecycle, VPC peering, and BigQuery cost optimization across 45 scenario questions.',
    seoTitle: 'Google Cloud Associate Cloud Engineer (GCP ACE) Practice Test & Mock Exam | Learnify',
    seoDescription:
      'Free Google Cloud Associate Cloud Engineer (GCP ACE) practice questions covering GCP project hierarchy, Compute Engine MIGs, IAM roles, Cloud Storage, and GKE.',
    seoKeywords:
      'GCP Associate Cloud Engineer practice questions, GCP ACE sample exam 2026, Google Cloud certification mock test, GCP ACE study guide',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '70% Target (700/1000)',
    relatedCourseId: 'course-aws-solutions',
    relatedCourseLabel: 'Google Cloud & Multi-Cloud Infrastructure Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'Setting up a cloud solution environment', weight: '20%' },
      { name: 'Planning and configuring a cloud solution', weight: '25%' },
      { name: 'Deploying and implementing a cloud solution', weight: '25%' },
      { name: 'Ensuring successful operation of a cloud solution', weight: '15%' },
      { name: 'Configuring access and security', weight: '15%' },
    ],
    openPreviewCount: 2,
    questions: GCP_ACE_QUESTIONS,
    faqs: [
      {
        q: 'How does GCP ACE differ from AWS Solutions Architect Associate?',
        a: 'GCP ACE focuses heavily on hands-on `gcloud` CLI commands, IAM service account impersonation, Shared VPC vs VPC Peering, and Managed Instance Groups (MIGs) rather than purely architectural design choices.',
      },
    ],
  },
  {
    slug: 'comptia-linux-plus-xk0-005-practice-questions',
    type: 'practice_test',
    topicTrack: 'Networking & Infrastructure',
    examCode: 'XK0-005',
    title: 'CompTIA Linux+ (XK0-005) Practice Questions & Troubleshooting Exam Simulator',
    shortTitle: 'CompTIA Linux+ XK0-005 Practice Test',
    excerpt:
      'Master systemd units, LVM volume management, ext4 inodes, `ss`/`netdump` diagnostics, `visudo`, permissions (SetUID/ACLs), and storage troubleshooting across 45 scenarios.',
    seoTitle: 'CompTIA Linux+ (XK0-005) Practice Questions & Mock Test 2026 | Learnify',
    seoDescription:
      'Free CompTIA Linux+ (XK0-005) practice test questions covering system architecture, storage, networking, security, automation, and troubleshooting with detailed rationales.',
    seoKeywords:
      'CompTIA Linux+ XK0-005 practice questions, Linux+ sample exam 2026, CompTIA Linux mock test, Linux troubleshooting quiz',
    durationLabel: '60 Min Timed',
    questionCountLabel: '45 Scenario Qs',
    passingScoreLabel: '78% Target (720/900)',
    relatedCourseId: 'course-comptia-network-plus',
    relatedCourseLabel: 'CompTIA Linux+ & Systems Administration Track',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    domainWeights: [
      { name: 'System Architecture & Processes', weight: '20%' },
      { name: 'Storage & File Management', weight: '20%' },
      { name: 'Networking & Security', weight: '20%' },
      { name: 'Services & Automation', weight: '20%' },
      { name: 'Troubleshooting & Performance', weight: '20%' },
    ],
    openPreviewCount: 2,
    questions: LINUX_PLUS_QUESTIONS,
    faqs: [
      {
        q: 'What are the highest-yield troubleshooting topics on CompTIA Linux+ (XK0-005)?',
        a: 'Expect multiple questions on `df -h` vs `df -i` (inode exhaustion), deleted open file handles holding disk space, `journalctl` systemd log filters, LVM resizing, and `chmod` SetUID permissions.',
      },
    ],
  },
  {
    slug: 'ipv4-subnetting-cidr-cheat-sheet-calculator',
    type: 'subnet_calculator',
    topicTrack: 'Networking & Infrastructure',
    examCode: 'CIDR · /8 to /32',
    title: 'Interactive IPv4 Subnetting Calculator & CIDR Cheat Sheet (AWS, Azure & CCNA)',
    shortTitle: 'IPv4 Subnetting & CIDR Calculator',
    excerpt:
      'Live browser IPv4 subnetting & wildcard calculator supporting /8–/32 prefixes, binary mask breakdown, plus AWS VPC & Azure VNet 5-reserved-IP planning tables.',
    seoTitle: 'IPv4 Subnetting Calculator & CIDR Cheat Sheet (/16 to /32) | Learnify',
    seoDescription:
      'Free interactive IPv4 subnet mask & CIDR calculator with AWS VPC / Azure VNet 5-reserved-IP mode vs standard Cisco CCNA / Network+ RFC math and reference tables.',
    seoKeywords:
      'IPv4 subnet calculator, CIDR cheat sheet /16 to /32, AWS VPC subnet calculator, Azure VNet CIDR planner, Network+ subnetting tool',
    durationLabel: 'Interactive Tool',
    questionCountLabel: 'Live /8–/32 + Tables',
    passingScoreLabel: 'AWS/Azure & RFC Modes',
    relatedCourseId: 'course-comptia-network-plus',
    relatedCourseLabel: 'CompTIA Network+ & Cloud Networking Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    cheatSheetSections: IPV4_SUBNETTING_CIDR_CHEAT_SHEET,
    faqs: [
      {
        q: 'Why do AWS VPC and Microsoft Azure VNet reserve 5 IP addresses in every subnet instead of 2?',
        a: 'Both AWS and Azure reserve the first 4 IPs (.0 network, .1 default gateway/router, .2 DNS services, .3 future platform use) and the last IP (broadcast), leaving 2^n - 5 usable host IPs.',
      },
      {
        q: 'What is the smallest subnet supported inside an AWS VPC or Azure GatewaySubnet?',
        a: 'AWS VPCs enforce a minimum subnet mask of /28 (11 usable IPs). Azure allows /29 in general subnets, while Azure VPN GatewaySubnet / AzureFirewallSubnet require /27 or larger.',
      },
    ],
  },
  {
    slug: 'linux-networking-commands-cheat-sheet',
    type: 'cheat_sheet',
    topicTrack: 'Networking & Infrastructure',
    examCode: 'Linux+ · CKA · SRE',
    title: 'Linux Networking & Troubleshooting Commands Cheat Sheet (ip, ss, tcpdump, dig)',
    shortTitle: 'Linux Networking Commands Cheat Sheet',
    excerpt:
      'Searchable 1-click copy command sheet covering iproute2 (`ip`, `ss`), DNS (`dig`, `resolvectl`), `tcpdump`, `nc`, `curl`, `journalctl`, and `nftables`/`ufw`.',
    seoTitle: 'Linux Networking Commands Cheat Sheet (ip, ss, tcpdump, dig) | Learnify',
    seoDescription:
      'Essential Linux networking & troubleshooting CLI commands cheat sheet for CompTIA Linux+ XK0-005, Network+, Kubernetes CKA, and DevOps SRE interviews.',
    seoKeywords:
      'Linux networking commands cheat sheet, ss tulnp vs netstat, ip route show, tcpdump commands list, Linux+ troubleshooting commands',
    durationLabel: 'Quick Reference',
    questionCountLabel: '14 CLI Patterns',
    passingScoreLabel: '1-Click Copy',
    relatedCourseId: 'course-comptia-linux-plus',
    relatedCourseLabel: 'CompTIA Linux+ (XK0-005) & Server Troubleshooting Bootcamp',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    cheatSheetSections: LINUX_NETWORKING_CHEAT_SHEET,
    faqs: [
      {
        q: 'Why should candidates use `ip` and `ss` instead of `ifconfig` and `netstat` in 2026?',
        a: 'Modern Enterprise Linux distributions (Ubuntu 24.04, RHEL 9) ship `iproute2` by default, where `ss -tulnp` executes significantly faster on busy nodes and displays kernel socket buffers cleanly.',
      },
    ],
  },
  {
    slug: 'terraform-iac-commands-cheat-sheet',
    type: 'cheat_sheet',
    topicTrack: 'Cloud & DevOps',
    examCode: 'Terraform · IaC',
    title: 'Terraform CLI & IaC State Management Cheat Sheet (2026 Cloud Engineers)',
    shortTitle: 'Terraform CLI Commands Cheat Sheet',
    excerpt:
      'Copy-ready Terraform workflow commands (`init`, `plan`, `apply`), safe state refactoring (`moved`, `import`, `state mv`), workspace separation, and CI drift detection flags.',
    seoTitle: 'Terraform CLI & State Commands Cheat Sheet (2026 DevOps Guide) | Learnify',
    seoDescription:
      'Production-safe Terraform CLI cheat sheet for AWS, Azure & Multi-Cloud engineers: plan -out, -replace, state list/mv, workspaces, and CI automation flags.',
    seoKeywords:
      'Terraform commands cheat sheet, Terraform CLI cheat sheet 2026, terraform state mv, terraform plan -replace, DevOps IaC guide',
    durationLabel: 'Quick Reference',
    questionCountLabel: '12 IaC Commands',
    passingScoreLabel: '1-Click Copy',
    relatedCourseId: 'course-kubernetes-cka',
    relatedCourseLabel: 'Cloud Infrastructure, Terraform & Kubernetes DevOps Track',
    updatedDate: 'November 2026',
    publishedIso: '2026-11-23',
    cheatSheetSections: TERRAFORM_IAC_CHEAT_SHEET,
    faqs: [
      {
        q: 'Why is `-replace` preferred over the legacy `terraform taint` command?',
        a: 'Running `terraform apply -replace="resource.name"` previews the exact destroy-and-recreate plan cleanly in a single atomic workflow instead of mutating shared remote state prematurely.',
      },
    ],
  },
];

export function getExamPrepBySlug(slug: string): ExamPrepResource | null {
  const clean = decodeURIComponent(String(slug || '')).trim().toLowerCase();
  return EXAM_PREP_RESOURCES.find((r) => r.slug.toLowerCase() === clean) || null;
}

export function getRelatedExamPrepResources(opts: {
  courseId?: string;
  vendor?: string;
  titleOrDomain?: string;
  limit?: number;
}): ExamPrepResource[] {
  const limit = opts.limit ?? 3;
  const hay = `${opts.courseId || ''} ${opts.vendor || ''} ${opts.titleOrDomain || ''}`.toLowerCase();

  const scored = EXAM_PREP_RESOURCES.map((item) => {
    let score = 0;
    if (opts.courseId && item.relatedCourseId === opts.courseId) score += 100;
    if (hay.includes(item.examCode.toLowerCase().split(' ')[0])) score += 45;
    if (hay.includes('security') || hay.includes('cyber') || hay.includes('ceh') || hay.includes('pentest') || hay.includes('cissp')) {
      if (item.topicTrack === 'Cybersecurity') score += 25;
    }
    if (hay.includes('azure') || hay.includes('az-')) {
      if (item.slug.includes('azure')) score += 30;
    }
    if (hay.includes('aws')) {
      if (item.slug.includes('aws')) score += 30;
    }
    if (hay.includes('network') || hay.includes('cisco') || hay.includes('ccna')) {
      if (item.topicTrack === 'Networking & Infrastructure') score += 28;
    }
    if (hay.includes('power bi') || hay.includes('pl-') || hay.includes('ai-') || hay.includes('dp-') || hay.includes('data')) {
      if (item.topicTrack === 'Data & AI') score += 28;
    }
    if (hay.includes('kubernetes') || hay.includes('cka') || hay.includes('devops') || hay.includes('cloud')) {
      if (item.topicTrack === 'Cloud & DevOps') score += 20;
    }
    if (item.type === 'cost_calculator') score += 8;
    if (item.type === 'practice_test') score += 4;
    return { item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function parseExamPrepRoutePath(
  pathname: string
):
  | { type: 'hub' }
  | { type: 'detail'; resource: ExamPrepResource }
  | { type: 'not_found' }
  | null {
  const clean = (pathname || '/').split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase() || '/';
  if (clean === '/exam-prep') {
    return { type: 'hub' };
  }
  if (clean.startsWith('/exam-prep/')) {
    const slug = clean.slice('/exam-prep/'.length);
    if (!slug) return { type: 'hub' };
    const matched = getExamPrepBySlug(slug);
    return matched ? { type: 'detail', resource: matched } : { type: 'not_found' };
  }
  return null;
}
