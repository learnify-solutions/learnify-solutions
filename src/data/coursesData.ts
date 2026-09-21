import { Course } from '../types';
import { ciscoCourses } from './ciscoCoursesData';

export const sampleCourses: Course[] = [
  // ===================== 1. CISCO NETWORKING TRACKS (Associate & Professional) =====================
  ...ciscoCourses,

  // ===================== 2. COMPTIA OFFICIAL CERTIFICATIONS =====================
  {
    id: 'course-comptia-a-plus',
    title: 'CompTIA A+ (Core 1: 220-1101 & Core 2: 220-1102)',
    domain: 'IT Support & Operations',
    certificationVendor: 'CompTIA',
    skillLevel: 'Beginner',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 5410,
    imageUrl: '/images/pc_hardware_workbench_1788294359055.webp',
    imageAlt: 'CompTIA A+ hardware, workstation and troubleshooting workbench',
    summary: 'The industry baseline credential for IT careers, validating foundational hardware, mobile devices, networking, operating systems, security, and operational troubleshooting.',
    curriculum: [
      'Module 1: PC Hardware Architecture, Motherboards, RAM, Storage & Power Supplies',
      'Module 2: Network Topologies, TCP/UDP Ports, Wi-Fi Protocols & Cable Testing',
      'Module 3: Virtualization, Cloud Concepts, Mobile Devices & Print Subsystems',
      'Module 4: Windows, macOS & Linux OS Installation, Command Line & Registry Tuning',
      'Module 5: Malware Remediation, Data Security Best Practices & Customer Support'
    ],
    overview: `CompTIA A+ is the industry standard for launching IT support and infrastructure careers. This comprehensive course prepares candidates for both Core 1 (220-1101: Hardware, Mobile Devices, Networking, Virtualization) and Core 2 (220-1102: Operating Systems, Security, Software Troubleshooting, Operational Procedures).

Ideal for entry-level IT technicians, field service specialists, help desk technicians, and desktop support analysts.`,
    learningObjectives: [
      "Assemble, configure, and troubleshoot personal computer components, storage, and peripheral hardware",
      "Configure and maintain client operating systems including Windows 10/11, macOS, Linux, and ChromeOS",
      "Support basic enterprise networking and client-side virtualization",
      "Identify and remediate security threats, malware infections, and privacy vulnerabilities",
      "Follow professional operational procedures including safety, documentation, ticketing, and communication"
],
    prerequisites: [
      "Basic familiarity with personal computers and operating system navigation",
      "No prior formal IT certifications required"
],
    outline: [
      {
            "title": "1. Core 1: Mobile Devices & Hardware (34%)",
            "items": [
                  "Laptops & Portables: Replacing display assemblies, batteries, keyboards, and memory modules",
                  "Mobile Hardware: Smartphones, tablets, wearable tech, and USB-C/Lightning accessories",
                  "System Components: Motherboard form factors, CPU sockets, RAM generations (DDR4/DDR5), and PCIe slots",
                  "Power & Cooling: PSU wattage calculations, liquid cooling systems, heat pipes, and thermal paste application",
                  "Storage Drives: NVMe M.2 SSDs, SATA drives, RAID configurations (0, 1, 5, 10), and external storage"
            ]
      },
      {
            "title": "2. Core 1: Networking & Virtualization (26%)",
            "items": [
                  "Network Connectors: RJ-45 crimping, fiber connectors (LC/SC), coaxial, and patch panels",
                  "SOHO Configuration: Router setup, port forwarding, SSID broadcast, and WPA3 wireless security",
                  "Client Virtualization: Hypervisor Type 1 vs Type 2, resource allocation, and sandbox environments",
                  "Cloud Computing: SaaS, IaaS, PaaS delivery models and client-side cloud synchronization"
            ]
      },
      {
            "title": "3. Core 1: Hardware & Network Troubleshooting (28%)",
            "items": [
                  "Motherboard & CPU Symptoms: POST beep codes, blue screens, spontaneous shutdowns, and overheating",
                  "Storage Troubleshooting: SMART error analysis, drive not recognized, read/write slowdowns",
                  "Display Issues: Artifacting, dead pixels, refresh rate flickering, and native resolution mismatches",
                  "Mobile Troubleshooting: Battery swelling, touchscreen unresponsiveness, ghost touch, and overheating"
            ]
      },
      {
            "title": "4. Core 2: Operating Systems & Software (31%)",
            "items": [
                  "Windows Installation: Clean installs, in-place upgrades, boot media creation, and disk partitioning (GPT vs MBR)",
                  "Command-Line Tools: SFC, DISM, CHKDSK, Tasklist, Taskkill, GPUpdate, and Robocopy",
                  "macOS & Linux Features: Terminal commands, Time Machine backups, sudo rights, and disk utilities",
                  "Application Troubleshooting: Service crashes, DLL errors, safe mode boot, and registry repairs"
            ]
      },
      {
            "title": "5. Core 2: Security & Operational Procedures (31%)",
            "items": [
                  "Physical & Logical Security: Access badges, biometric locks, bitlocker drive encryption, and secure boot",
                  "Malware Removal: 7-step malware remediation process, quarantine procedures, and system restore",
                  "Operational Standards: Incident response ticketing, ESD prevention, hazardous material disposal, and licensing"
            ]
      }
],
  },
  {
    id: 'course-comptia-network-plus',
    title: 'CompTIA Network+ (N10-008 / N10-009)',
    domain: 'IT Support & Operations',
    certificationVendor: 'CompTIA',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.8,
    enrolled: 3890,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'CompTIA Network+ enterprise network infrastructure training',
    summary: 'Master vendor-neutral networking concepts including network architecture, IP subnets, routing protocols, wireless standards, network operations, and security.',
    curriculum: [
      'Module 1: Networking Fundamentals, OSI Model, Encapsulation & Subnetting Math',
      'Module 2: Physical Network Infrastructure, Copper, Fiber & Data Center Cabling',
      'Module 3: Routing Concepts, Switching, VLANs & Software-Defined Networking (SDN)',
      'Module 4: Network Security Controls, Firewalls, IDS/IPS & Threat Hardening',
      'Module 5: Network Troubleshooting Methodology, Packet Analysis & Wireshark'
    ],
    overview: `CompTIA Network+ validates the technical knowledge required to securely establish, maintain, and troubleshoot the essential networks that businesses rely on. The curriculum covers both traditional wired/wireless architectures and modern cloud-integrated software-defined networks.

Designed for network technicians, network administrators, and systems engineers seeking an industry-wide recognized credential without vendor lock-in.`,
    learningObjectives: [
      "Design and implement functional enterprise networks with proper IP addressing and subnetting",
      "Configure, manage, and maintain essential network devices including switches, routers, and firewalls",
      "Implement network security, standards, and protocols to protect data in transit",
      "Determine network bottlenecks, identify hardware and software issues, and execute the 7-step troubleshooting method",
      "Integrate cloud networking services, SDN controllers, and automation scripts"
],
    prerequisites: [
      "CompTIA A+ certification or equivalent knowledge",
      "Minimum 9–12 months of hands-on networking support or administration experience",
      "Familiarity with basic PC hardware and operating systems"
],
    outline: [
      {
            "title": "1. Networking Concepts (24%)",
            "items": [
                  "OSI & TCP/IP Models: Layer functions, packet encapsulation, and protocol mapping",
                  "IP Addressing & Subnetting: IPv4 VLSM, classless routing, IPv6 addressing types, and SLAAC",
                  "Routing Technologies: Static routing, dynamic routing (OSPF, BGP, RIP), and metric calculations",
                  "Network Services: DHCP scopes, DNS record types (A, AAAA, MX, CNAME, PTR), and NTP synchronization"
            ]
      },
      {
            "title": "2. Network Implementation (19%)",
            "items": [
                  "Enterprise Switching: VLAN trunking (802.1Q), Spanning Tree Protocol (STP), and link aggregation (LACP)",
                  "Physical Infrastructure: Cat6/6A/8 copper cabling, single-mode/multimode fiber optics, transceivers",
                  "Wireless Standards: Wi-Fi 6/6E/7 (802.11ax/be), channel bonding, antenna types, and mesh deployments",
                  "Cloud & Virtual Networking: Virtual switches, VPC peering, direct connect, and transit gateways"
            ]
      },
      {
            "title": "3. Network Operations (16%)",
            "items": [
                  "Monitoring & Metrics: SNMP polling, NetFlow/sFlow collectors, syslog servers, and bandwidth utilization",
                  "Documentation & Policies: Network topology diagrams, rack layouts, IP asset management, and change logs",
                  "High Availability & DR: FHRP (HSRP/VRRP), redundant power supplies, failover links, and MTBF/MTTR"
            ]
      },
      {
            "title": "4. Network Security (19%)",
            "items": [
                  "Defense-in-Depth: Network segmentation, DMZ zones, firewalls, and next-gen deep packet inspection",
                  "Authentication & Access: 802.1X, RADIUS, TACACS+, captive portals, and ACL filtering",
                  "Threat Mitigation: Detecting ARP poisoning, rogue DHCP servers, DDoS floods, and evil twin hotspots",
                  "Remote Access: IPsec site-to-site VPNs, SSL/TLS client VPNs, and wireguard configurations"
            ]
      },
      {
            "title": "5. Network Troubleshooting (22%)",
            "items": [
                  "Troubleshooting Methodology: The 7-step CompTIA framework from problem identification to documentation",
                  "Diagnostic Tools: Cable testers, tone generators, OTDR, loopback plugs, and spectrum analyzers",
                  "Software Utilities: Ping, traceroute, nslookup/dig, netstat, arp, ip route, and Wireshark packet capture",
                  "Common Scenario Resolution: Attenuation, crosstalk, duplex mismatch, IP conflicts, and DNS resolution failures"
            ]
      }
],
  },
  {
    id: 'course-comptia-security-plus',
    title: 'CompTIA Security+ (SY0-701)',
    domain: 'Cybersecurity',
    certificationVendor: 'CompTIA',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 6150,
    imageUrl: '/images/comptia_security_soc_1787771516564.webp',
    imageAlt: 'CompTIA Security+ cybersecurity operations preview',
    summary: 'The world’s leading baseline cybersecurity certification, establishing core knowledge in threat vectors, zero trust architecture, risk management, and incident response.',
    curriculum: [
      'Module 1: General Security Concepts, CIA Triad, Zero Trust & Cryptography',
      'Module 2: Threat Vectors, Vulnerabilities, Social Engineering & Malware Types',
      'Module 3: Security Architecture, Network Segmentation, Firewalls & Cloud Controls',
      'Module 4: Security Operations, SIEM/SOAR Monitoring, Incident Response & Forensics',
      'Module 5: Governance, Risk Management, Compliance (ISO/NIST) & Mock Exam'
    ],
    overview: `CompTIA Security+ (SY0-701) is the global benchmark for foundational cybersecurity skills, validating baseline competence in identifying security threats, designing resilient architectures, and implementing incident response protocols. The updated SY0-701 exam addresses the current threat landscape, focusing on Zero Trust, IoT/OT environments, cloud deployments, and compliance frameworks.

This course is engineered for cybersecurity analysts, network administrators, and IT professionals seeking DoD 8140/8570 compliance and essential cybersecurity credentials.`,
    learningObjectives: [
      "Assess the security posture of enterprise environments and recommend solutions",
      "Monitor and secure hybrid environments including cloud, mobile, IoT, and operational technology (OT)",
      "Operate with an awareness of applicable laws and policies, including governance, risk, and compliance (GRC)",
      "Identify, analyze, and respond to security events and incidents using modern SIEM and SOAR tools",
      "Implement identity, access, and cryptographic controls aligned with Zero Trust principles"
],
    prerequisites: [
      "CompTIA Network+ certification or equivalent networking knowledge",
      "At least two years of experience in personal computer or network administration",
      "Familiarity with basic security concepts, networking protocols, and operating systems"
],
    outline: [
      {
            "title": "1. General Security Concepts (12%)",
            "items": [
                  "Security Controls: Preventive, detective, corrective, physical, and technical controls",
                  "Fundamental Principles: Confidentiality, integrity, availability (CIA triad), and non-repudiation",
                  "Change Management: Secure baselines, approval processes, rollback plans, and documentation",
                  "Cryptographic Solutions: PKI, asymmetric/symmetric ciphers, digital signatures, and key lifecycle management"
            ]
      },
      {
            "title": "2. Threats, Vulnerabilities & Mitigations (22%)",
            "items": [
                  "Threat Actors & Motivations: Nation-state, hacktivists, insider threats, organized cybercrime, and APTs",
                  "Attack Vectors & Tactics: Phishing, social engineering, supply chain attacks, and ransomware",
                  "Vulnerabilities & Exposures: Zero-day exploits, memory buffer overflows, and API security flaws",
                  "Mitigation Strategies: Automated vulnerability patching, segmentation, and endpoint detection and response (EDR)"
            ]
      },
      {
            "title": "3. Security Architecture (18%)",
            "items": [
                  "Security Architecture Models: Zero Trust, secure access service edge (SASE), and defense-in-depth",
                  "Enterprise Infrastructure: Cloud vs on-premises, virtualization, containers, and microservices security",
                  "Data Protection: Data classification, data loss prevention (DLP), masking, and encryption at rest",
                  "High Availability & Resilience: Disaster recovery, RAID, load balancing, and multi-region site backups"
            ]
      },
      {
            "title": "4. Security Operations (28%)",
            "items": [
                  "Security Baseline Implementation: Hardening Windows/Linux servers, workstations, and mobile devices",
                  "Identity & Access Management: MFA, federated identity, SAML, OAuth, and privileged access management (PAM)",
                  "Vulnerability Management: Automated vulnerability scans, CVSS scoring, and remediation workflows",
                  "Incident Response Playbooks: Preparation, detection, containment, eradication, and post-incident review"
            ]
      },
      {
            "title": "5. Security Program Management & Oversight (20%)",
            "items": [
                  "Security Governance: Policies, procedures, frameworks (NIST CSF, ISO 27001), and CIS benchmark standards",
                  "Risk Management: Qualitative and quantitative risk assessment, risk appetite, and business impact analysis (BIA)",
                  "Third-Party Risk: Vendor management, service level agreements (SLAs), and supply chain scrutiny",
                  "Compliance & Auditing: GDPR, HIPAA, PCI DSS, SOC 2 reporting, and internal/external audit preparation"
            ]
      }
],
  },
  {
    id: 'course-comptia-cloud-plus',
    title: 'CompTIA Cloud+ (CV0-004)',
    domain: 'Cloud Computing',
    certificationVendor: 'CompTIA',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.8,
    enrolled: 2450,
    imageUrl: '/images/comptia_cloud_multicloud_1788294616227.webp',
    imageAlt: 'CompTIA Cloud+ multi-cloud enterprise infrastructure training',
    summary: 'Deploy, secure, automate, and optimize enterprise cloud infrastructure across AWS, Azure, and Google Cloud environments.',
    curriculum: [
      'Module 1: Cloud Architecture, High Availability Design & Storage Provisioning',
      'Module 2: Virtualization & Compute Deployment (Containers, VMs, Hypervisors)',
      'Module 3: Cloud Security, Zero Trust, Identity Federation & Key Management',
      'Module 4: Cloud Operations, Terraform Automation, CI/CD & Orchestration',
      'Module 5: Multi-Cloud Disaster Recovery, Cost Optimization & Capstone'
    ],
    overview: `CompTIA Cloud+ (v4) is a vendor-neutral, performance-based certification that validates the technical skills required to deploy, secure, automate, and optimize cloud infrastructure and services. The updated exam (CV0-004) reflects real-world cloud job roles with a stronger emphasis on DevOps, orchestration, containerization, and multi-cloud environments.

This course is ideal for cloud engineers, systems administrators, and DevOps professionals working in enterprise or hybrid cloud settings.`,
    learningObjectives: [
      "Evaluate and apply the right cloud architecture models (public, private, hybrid, multicloud)",
      "Deploy and manage cloud-based infrastructure using automation and orchestration",
      "Secure cloud environments with IAM, vulnerability management, and compliance standards",
      "Implement DevOps practices like CI/CD pipelines and event-driven architectures",
      "Monitor, optimize, and troubleshoot cloud systems for reliability and cost-efficiency"
],
    prerequisites: [
      "2–3 years of experience in systems administration, networking, or cloud operations",
      "Familiarity with virtualization, scripting, and basic security concepts",
      "CompTIA Network+ or Server+ (recommended but not mandatory)"
],
    outline: [
      {
            "title": "1. Cloud Architecture (23%)",
            "items": [
                  "Cloud Models: Public, private, hybrid, and multi-cloud strategies",
                  "Virtualization: Hypervisors, virtual machines, and their cloud integrations",
                  "Networking: VPNs, virtual switches, and virtual private clouds (VPCs)",
                  "Containerization & Orchestration: Docker, container security, and orchestration using Kubernetes",
                  "Database Fundamentals: Understanding databases in cloud deployments",
                  "Resource Optimization: Performance and cost efficiency planning",
                  "Billing Management: Usage metering and forecasting costs"
            ]
      },
      {
            "title": "2. Deployment (19%)",
            "items": [
                  "System Requirements: Assessing workloads for cloud readiness",
                  "Infrastructure as Code (IaC): Tools and scripting for automated provisioning",
                  "Workload Migrations: Planning and executing lift-and-shift or replatform strategies",
                  "Resource Provisioning: Automated deployment of VMs, storage, and networking"
            ]
      },
      {
            "title": "3. Operations (17%)",
            "items": [
                  "Lifecycle Management: Scaling, updates, and patching across cloud resources",
                  "Backup & Recovery: Data integrity and redundancy strategies",
                  "Observability: Monitoring, metrics, and performance analysis tools"
            ]
      },
      {
            "title": "4. Security (19%)",
            "items": [
                  "Vulnerability Management: Scanning, risk analysis, and remediation",
                  "IAM: Role-based access controls, identity federation, and MFA",
                  "Container Security: Best practices for securing containerized applications",
                  "Compliance Standards: PCI DSS, SOC 2, ISO 27001",
                  "Security Controls: Encryption, firewalls, WAFs, and security groups"
            ]
      },
      {
            "title": "5. DevOps Fundamentals (10%)",
            "items": [
                  "Automation: Task orchestration with Ansible, Terraform, etc.",
                  "Source Control: Versioning and collaboration using Git",
                  "CI/CD Pipelines: Jenkins, GitLab CI, and pipeline stages",
                  "System Integration: APIs, webhooks, and service chaining",
                  "Event-Driven Architectures: Serverless models, event triggers, and queueing"
            ]
      },
      {
            "title": "6. Troubleshooting (12%)",
            "items": [
                  "Deployment Issues: Rollbacks, configuration errors",
                  "Network Connectivity: DNS, DHCP, NTP, latency, and packet loss",
                  "Security Incidents: Leaked keys, privilege escalation, access breaches",
                  "Service Disruptions: High availability, failover mechanisms",
                  "Misconfigurations: Audit and resolution of cloud setting conflicts"
            ]
      }
],
  },
  {
    id: 'course-comptia-cloud-essentials',
    title: 'CompTIA Cloud Essentials+ (CLO-002)',
    domain: 'Cloud Computing',
    certificationVendor: 'CompTIA',
    skillLevel: 'Beginner',
    format: 'Live Online',
    duration: '5 Days (30 Hours)',
    rating: 4.7,
    enrolled: 1890,
    imageUrl: '/images/cloud_essentials_business_1788294640468.webp',
    imageAlt: 'CompTIA Cloud Essentials business decision making and governance training',
    summary: 'Empower technical and business leaders to make informed cloud computing decisions, evaluate cloud financial ROI, manage vendor SLAs, and ensure compliance.',
    curriculum: [
      'Module 1: Principles of Cloud Computing & Deployment Models (Public, Private, Hybrid)',
      'Module 2: Business Drivers, Total Cost of Ownership (TCO) & Cloud Migration ROI',
      'Module 3: Managing Cloud Service Providers, SLAs & Vendor Lock-In Mitigation',
      'Module 4: Cloud Security Frameworks, Shared Responsibility & Data Sovereignty',
      'Module 5: Cloud Financial Governance (FinOps) & Executive Assessment Review'
    ],
    overview: `CompTIA Cloud Essentials+ (CLO-002) is geared toward business stakeholders, technical team leaders, and IT professionals who need to make informed cloud service decisions. The course bridges the gap between commercial business value and technical cloud operations.

Ideal for business analysts, project managers, technical sales teams, and IT professionals planning enterprise cloud migrations.`,
    learningObjectives: [
      "Analyze the business value, costs, and risks associated with cloud adoption",
      "Compare cloud service (IaaS, PaaS, SaaS) and deployment (public, private, hybrid) models",
      "Formulate cloud migration strategies and business continuity plans",
      "Manage cloud security, governance, regulatory compliance, and vendor relationships"
],
    prerequisites: [
      "Basic business acumen and general familiarity with computer hardware and networking concepts"
],
    outline: [
      {
            "title": "1. Cloud Concepts (24%)",
            "items": [
                  "Cloud Computing Principles: Elasticity, on-demand self-service, broad network access, and resource pooling",
                  "Service & Delivery Models: IaaS, PaaS, SaaS, serverless, and containerized microservices",
                  "Deployment Models: Public, private, hybrid, and multi-cloud trade-offs"
            ]
      },
      {
            "title": "2. Business Principles of Cloud Environments (28%)",
            "items": [
                  "Financial Aspects: Capital Expenditure (CapEx) vs Operational Expenditure (OpEx) and TCO analysis",
                  "Billing Management: Chargeback models, reserve instances, spot pricing, and cost monitoring tools",
                  "Vendor Selection: Cloud provider assessment, vendor lock-in prevention, and service-level agreements (SLAs)"
            ]
      },
      {
            "title": "3. Management and Technical Operations (26%)",
            "items": [
                  "Migration Strategies: Rehost (lift-and-shift), refactor, replatform, repurchase, retain, and retire (6 Rs)",
                  "Cloud Operations: Automation, orchestration, scaling policies, and systems monitoring",
                  "Disaster Recovery: RTO/RPO targets, high availability design, and cross-region replication"
            ]
      },
      {
            "title": "4. Governance, Risk, Compliance and Security (22%)",
            "items": [
                  "Risk Management: Risk identification, assessment, and risk mitigation in shared responsibility models",
                  "Regulatory Compliance: GDPR, HIPAA, SOC 2, ISO certifications, and data sovereignty",
                  "Security Baselines: IAM, encryption in flight and at rest, and audit logging"
            ]
      }
],
  },
  {
    id: 'course-comptia-server-plus',
    title: 'CompTIA Server+ (SK0-005)',
    domain: 'IT Support & Operations',
    certificationVendor: 'CompTIA',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    duration: '5 Days (40 Hours)',
    rating: 4.8,
    enrolled: 2120,
    imageUrl: '/images/linux_datacenter_admin_1788294344630.webp',
    imageAlt: 'CompTIA Server+ enterprise datacenter hardware training',
    summary: 'Master enterprise server administration, hardware installation, virtualization, RAID storage architecture, disaster recovery, and data center operations.',
    curriculum: [
      'Module 1: Server Hardware Installation, Rack Systems, IPMI & Power Redundancy',
      'Module 2: Storage Architectures, Hardware RAID, SAS/NVMe & Fibre Channel SANs',
      'Module 3: Virtualization Hosts (VMware ESXi & Proxmox) & High Availability',
      'Module 4: Server Security Hardening, PKI Certificates, MFA & Physical Security',
      'Module 5: Server Disaster Recovery, Backup Restoration & Hardware Diagnostics'
    ],
    overview: `CompTIA Server+ (SK0-005) validates the hands-on skills required to build, maintain, and troubleshoot server hardware and software in data centers and cloud hosting facilities.

Targeted at server administrators, data center technicians, storage administrators, and hardware support engineers.`,
    learningObjectives: [
      "Install, configure, and manage high-performance server hardware, storage controllers, and peripherals",
      "Manage server administration, virtualization hypervisors, and storage area networks (SAN/NAS)",
      "Implement enterprise server security, access controls, and environmental hardening",
      "Diagnose and troubleshoot complex hardware, OS, networking, and storage failures"
],
    prerequisites: [
      "CompTIA A+ or equivalent experience with PC hardware and basic networking",
      "18–24 months hands-on experience in server and hardware environments"
],
    outline: [
      {
            "title": "1. Server Hardware Installation & Management (18%)",
            "items": [
                  "Form Factors: Rack-mounted servers, blade chassis, tower servers, and modular backplanes",
                  "Processors & Memory: Multi-socket CPUs, ECC memory, RDIMM vs LRDIMM, and thermal management",
                  "Power & Out-of-Band: Redundant PSUs, UPS systems, iLO, iDRAC, and remote KVM consoles"
            ]
      },
      {
            "title": "2. Server Administration (30%)",
            "items": [
                  "Operating Systems: Windows Server and Linux enterprise installation, headless setup, and role configuration",
                  "Server Virtualization: Hypervisor deployment, resource over-allocation, and VM migration",
                  "Storage Architecture: Hardware RAID, software RAID, NVMe arrays, Fibre Channel SAN, and iSCSI targets"
            ]
      },
      {
            "title": "3. Security & Disaster Recovery (24%)",
            "items": [
                  "Physical Hardening: Data center rack locks, biometric access, chassis intrusion sensors, and CCTV",
                  "Data Protection: Full, differential, and incremental backups; immutable snapshots and offsite vaults",
                  "High Availability: Clustering, load balancing, fault tolerance, and cold/warm/hot DR sites"
            ]
      },
      {
            "title": "4. Troubleshooting (28%)",
            "items": [
                  "Hardware Failures: POST diagnostics, memory dump analysis, fan failures, and controller errors",
                  "Storage Issues: Degraded RAID volumes, rebuild failures, bad blocks, and filesystem corruption",
                  "Network & OS Issues: NIC teaming failures, DNS issues, service hangs, and kernel panics"
            ]
      }
],
  },
  {
    id: 'course-comptia-pentest-plus',
    title: 'CompTIA PenTest+ (PT0-002)',
    domain: 'Cybersecurity',
    certificationVendor: 'CompTIA',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 2310,
    imageUrl: '/images/ethical_hacking_pentest_1788294329039.webp',
    imageAlt: 'CompTIA PenTest+ offensive security and ethical hacking laboratory preview',
    summary: 'Conduct end-to-end vulnerability assessments and penetration tests across network, web, cloud, and active directory environments with hands-on ethical hacking tools.',
    curriculum: [
      'Module 1: Penetration Testing Scoping, Rules of Engagement & Passive Reconnaissance',
      'Module 2: Active Scanning, Vulnerability Identification (Nmap, Nessus) & Enumeration',
      'Module 3: Web App Exploitation (OWASP Top 10), SQL Injection, XSS & API Hacking',
      'Module 4: Network Attacks, Active Directory Privilege Escalation & Lateral Movement',
      'Module 5: Post-Exploitation, Report Writing, Remediation Guidance & Mock Exam'
    ],
    overview: `CompTIA PenTest+ (PT0-002) is designed for cybersecurity professionals tasked with penetration testing and vulnerability management. It assesses vulnerability scanning, planning, reconnaissance, weaponization, exploitation, and comprehensive post-exploitation reporting.

Ideal for penetration testers, security consultants, vulnerability analysts, and ethical hackers.`,
    learningObjectives: [
      "Plan and scope formal penetration testing engagements following ethical and legal guidelines",
      "Conduct passive and active information gathering using OSINT, Nmap, and vulnerability scanners",
      "Exploit network, host, web application, and cloud vulnerabilities with modern tools",
      "Perform post-exploitation tasks, privilege escalation, lateral movement, and report findings"
],
    prerequisites: [
      "CompTIA Security+ and Network+ or equivalent cybersecurity experience",
      "3–4 years of hands-on information security or technical support experience"
],
    outline: [
      {
            "title": "1. Planning and Scoping (14%)",
            "items": [
                  "Engagement Governance: Rules of Engagement (RoE), Scope of Work (SOW), and non-disclosure agreements (NDAs)",
                  "Legal & Compliance: Regulatory compliance testing (PCI DSS, HIPAA), authorization letters, and disclaimer waivers"
            ]
      },
      {
            "title": "2. Information Gathering and Vulnerability Identification (22%)",
            "items": [
                  "Open-Source Intelligence (OSINT): Shodan, theHarvester, WHOIS, DNS reconnaissance, and social media harvesting",
                  "Scanning & Enumeration: Nmap port scanning, NSE scripting, masscan, and SMB/SNMP enumeration",
                  "Vulnerability Scanning: Nessus, OpenVAS, and credentialed vs uncredentialed scans"
            ]
      },
      {
            "title": "3. Attacks and Exploits (30%)",
            "items": [
                  "Network Exploitation: Man-in-the-middle (MitM), pass-the-hash, Kerberoasting, and rogue APs",
                  "Web App Testing: OWASP Top 10, SQL injection, XSS, CSRF, SSRF, and directory traversal",
                  "Cloud & Container Exploits: Misconfigured S3 buckets, IAM privilege escalation, and Docker escapes",
                  "Social Engineering: Pretexting, spear phishing, badge cloning, and USB drops"
            ]
      },
      {
            "title": "4. Reporting and Communication (18%)",
            "items": [
                  "Written Deliverables: Executive summary, risk rating (CVSS), methodology, and detailed remediation guidance",
                  "Post-Engagement: Cleaning artifacts, removing planted backdoors, and executive debrief presentations"
            ]
      },
      {
            "title": "5. Tools and Code Analysis (16%)",
            "items": [
                  "Scripting Languages: Analyzing and modifying Python, Bash, and PowerShell exploit scripts",
                  "Frameworks: Metasploit, Burp Suite Professional, Mimikatz, Wireshark, and Hashcat"
            ]
      }
],
  },
  {
    id: 'course-comptia-linux-plus',
    title: 'CompTIA Linux+ (XK0-005)',
    domain: 'IT Support & Operations',
    certificationVendor: 'CompTIA',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    duration: '5 Days (40 Hours)',
    rating: 4.8,
    enrolled: 2780,
    imageUrl: '/images/linux_datacenter_admin_1788294344630.webp',
    imageAlt: 'CompTIA Linux+ enterprise systems administration preview',
    summary: 'Master enterprise Linux systems administration, kernel tuning, storage management, security hardening, automated Bash scripting, and container deployment.',
    curriculum: [
      'Module 1: Linux Architecture, Boot Process (systemd), Kernel Modules & Package Management',
      'Module 2: Storage Configuration (LVM, XFS/EXT4), File Permissions & Quotas',
      'Module 3: Network Configuration, SSH Hardening, Firewalld & SELinux / AppArmor',
      'Module 4: Bash Scripting, Cron Automation, Git Version Control & Docker Containers',
      'Module 5: System Troubleshooting, Log Analysis (journalctl) & Certification Prep'
    ],
    overview: `CompTIA Linux+ (XK0-005) validates the foundational competencies required to support enterprise Linux distributions that power modern cloud architectures, containers, and data centers.

Designed for Linux systems administrators, DevOps engineers, cloud support specialists, and platform engineers.`,
    learningObjectives: [
      "Configure Linux kernel modules, storage partitions, logical volumes (LVM), and network interfaces",
      "Manage user accounts, file permissions (POSIX & ACLs), and security policies (SELinux/AppArmor)",
      "Automate system administration tasks using Bash shell scripting, Git, and cron schedulers",
      "Troubleshoot Linux system performance, kernel crashes, service logs, and network connectivity"
],
    prerequisites: [
      "CompTIA A+, Network+, or 12 months hands-on Linux experience"
],
    outline: [
      {
            "title": "1. System Management (32%)",
            "items": [
                  "Linux Boot Process: GRUB2 configuration, initramfs, systemd targets, and unit management",
                  "Storage & Filesystems: Partitioning with fdisk/parted, ext4/XFS filesystems, and LVM volumes",
                  "Package Management: RPM/DNF/YUM for Red Hat and APT/DPKG for Debian, plus Flatpak and Snap packages"
            ]
      },
      {
            "title": "2. Security (21%)",
            "items": [
                  "Access Controls: File permissions (chmod/chown), SUID/SGID, sticky bit, and ACLs (setfacl)",
                  "Mandatory Access Control: SELinux modes, context labeling, booleans, and AppArmor profiles",
                  "Authentication & Firewall: Pluggable Authentication Modules (PAM), SSH key pairs, and firewalld/iptables"
            ]
      },
      {
            "title": "3. Scripting, Containers and Automation (19%)",
            "items": [
                  "Bash Shell Scripting: Variables, loops, conditional tests, exit codes, and regular expressions (grep/sed/awk)",
                  "Container Fundamentals: Docker/Podman container lifecycle, Dockerfiles, and container networking",
                  "Version Control & CI/CD: Git clone, commit, branch, and merge fundamentals"
            ]
      },
      {
            "title": "4. Troubleshooting (28%)",
            "items": [
                  "Resource Monitoring: CPU and memory diagnostics (top, htop, vmstat, iostat, sar)",
                  "System Logging: Journalctl, rsyslog, /var/log analysis, and logrotate",
                  "Network Troubleshooting: ip, ss, netstat, tcpdump, traceroute, and dig commands"
            ]
      }
],
  },
  {
    id: 'course-comptia-itf-plus',
    title: 'CompTIA ITF+ (IT Fundamentals FC0-U61)',
    domain: 'IT Support & Operations',
    certificationVendor: 'CompTIA',
    skillLevel: 'Beginner',
    format: 'Live Online',
    duration: '5 Days (30 Hours)',
    rating: 4.8,
    enrolled: 3100,
    imageUrl: '/images/pc_hardware_workbench_1788294359055.webp',
    imageAlt: 'CompTIA IT Fundamentals beginner training preview',
    summary: 'The ideal introduction to technology, covering core computing devices, infrastructure, software development basics, database concepts, and fundamental cybersecurity.',
    curriculum: [
      'Module 1: Computing Basics, Internal Components (CPU, RAM, GPU) & Input/Output Devices',
      'Module 2: Infrastructure, Wi-Fi Setup, Internet Services & Basic Networking',
      'Module 3: Applications, Operating Systems, File Management & Software Licensing',
      'Module 4: Software Development Concepts (Variables, Logic) & Relational Databases (SQL)',
      'Module 5: Cybersecurity Best Practices, Password Security & ITF+ Certification Prep'
    ],
    overview: `CompTIA IT Fundamentals (ITF+ FC0-U61) is the essential launchpad for anyone considering an IT career or looking to establish digital literacy across hardware, software, databases, security, and networking.

Ideal for students, career changers, non-technical managers, and entry-level technology enthusiasts.`,
    learningObjectives: [
      "Understand core computing concepts, hexadecimal/binary notations, and processing speed units",
      "Identify internal computer hardware, peripheral connections, and storage types",
      "Compare common operating systems, mobile platforms, and software application types",
      "Explain basic database concepts, structured vs unstructured data, and cybersecurity hygiene"
],
    prerequisites: [
      "Basic English reading skills and curiosity about modern computing"
],
    outline: [
      {
            "title": "1. IT Concepts and Terminology (17%)",
            "items": [
                  "Data Representations: Binary, decimal, hexadecimal, and ASCII/Unicode encoding",
                  "Throughput & Storage: Megabytes, Gigabytes, Terabytes, and processing hertz"
            ]
      },
      {
            "title": "2. Infrastructure (22%)",
            "items": [
                  "Input/Output Hardware: Keyboards, mice, touchscreens, webcams, and external monitors",
                  "Internal Components: CPUs, motherboards, RAM, storage drives, and thermal management",
                  "Networking Basics: Wi-Fi, Ethernet, Bluetooth, and internet routers"
            ]
      },
      {
            "title": "3. Applications and Software (18%)",
            "items": [
                  "Operating Systems: Windows, macOS, Linux, ChromeOS, iOS, and Android comparison",
                  "Software Architecture: Native desktop applications, web apps, mobile apps, and browser extensions"
            ]
      },
      {
            "title": "4. Software Development (12%)",
            "items": [
                  "Programming Concepts: Variables, functions, loops, conditional logic, and interpreted vs compiled code"
            ]
      },
      {
            "title": "5. Database Fundamentals (11%)",
            "items": [
                  "Data Organization: Tables, records, fields, relational keys, and basic SQL query structure"
            ]
      },
      {
            "title": "6. Security (20%)",
            "items": [
                  "Cybersecurity Hygiene: Password complexity, MFA, phishing awareness, and safe browsing habits",
                  "Device Protection: Antivirus software, firewalls, operating system updates, and backups"
            ]
      }
],
  },

  // ===================== 3. MICROSOFT AZURE & CLOUD PORTFOLIO =====================
  {
    id: 'course-azure-104',
    title: 'Microsoft Azure Administrator (AZ-104)',
    domain: 'Cloud Computing',
    certificationVendor: 'Microsoft',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.8,
    enrolled: 3120,
    imageUrl: '/images/azure_cloud_infra_1787771504293.webp',
    imageAlt: 'Microsoft Azure Administrator AZ-104 cloud infrastructure training',
    summary: 'Implement, manage, and monitor identity, governance, storage, compute, and virtual networks in an enterprise Microsoft Azure cloud environment.',
    curriculum: [
      'Module 1: Microsoft Entra ID (Azure AD), Role-Based Access Control (RBAC) & Governance',
      'Module 2: Azure Storage Accounts, Blob Containers, Azure Files & Storage Security',
      'Module 3: Azure Virtual Machines, Virtual Machine Scale Sets & Azure App Services',
      'Module 4: Azure Virtual Networks (VNet), Subnets, Peering, VPN Gateway & Azure Firewall',
      'Module 5: Azure Monitor, Log Analytics, Backup / Site Recovery & Practice Certification'
    ],
    overview: `The AZ-104: Microsoft Azure Administrator course equips IT professionals with the skills required to implement, manage, and monitor an organization’s Microsoft Azure environment. The curriculum covers identity governance, compute resources, virtual networking, scalable storage, and resource monitoring.

Targeted at systems administrators, cloud architects, and infrastructure engineers responsible for day-to-day enterprise Azure operations.`,
    learningObjectives: [
      "Manage Microsoft Entra ID identities, user governance, and role-based access control (RBAC)",
      "Implement and secure scalable Azure Storage accounts, blob tiers, and file shares",
      "Deploy and configure Azure virtual machines, scale sets, containers, and Azure App Service",
      "Architect and manage virtual networks, subnets, peering, VPN gateways, and load balancers",
      "Monitor Azure infrastructure performance, health, and logs using Azure Monitor and Log Analytics"
],
    prerequisites: [
      "Basic understanding of on-premises virtualization technologies (VMs, vSAN, virtual networking)",
      "Familiarity with TCP/IP, DNS, VPNs, and Active Directory concepts",
      "Microsoft Certified: Azure Fundamentals (AZ-900) recommended"
],
    outline: [
      {
            "title": "1. Manage Azure Identities and Governance (15–20%)",
            "items": [
                  "Microsoft Entra ID: User and group management, enterprise application registrations, and guest accounts",
                  "Access Control: Role-based access control (RBAC), custom roles, and access reviews",
                  "Subscription & Governance: Azure Policy definition, policy assignments, resource tags, and Azure Blueprints",
                  "Cost Management: Budget thresholds, cost analysis dashboards, and resource locks"
            ]
      },
      {
            "title": "2. Implement and Manage Storage (15–20%)",
            "items": [
                  "Storage Accounts: Redundancy models (LRS, GRS, ZRS), access tiers (Hot, Cool, Cold, Archive)",
                  "Storage Security: Shared Access Signatures (SAS), storage firewalls, and customer-managed keys (CMK)",
                  "Azure Files: Azure File shares, Azure File Sync service, and SMB multi-channel configuration",
                  "Data Transfer: AzCopy CLI, Azure Storage Explorer, and Azure Data Box migration"
            ]
      },
      {
            "title": "3. Deploy and Manage Azure Compute Resources (20–25%)",
            "items": [
                  "Virtual Machines: High availability (Availability Zones & Availability Sets), disk caching, and resizing",
                  "Infrastructure Automation: ARM and Bicep templates, cloud-init scripts, and Azure VM extensions",
                  "Containers & Serverless: Azure Container Instances (ACI), Azure Container Apps, and App Service plans"
            ]
      },
      {
            "title": "4. Configure and Manage Virtual Networking (20–25%)",
            "items": [
                  "Virtual Networks: Subnetting, IP addressing, Network Security Groups (NSGs), and Application Security Groups (ASGs)",
                  "Network Connectivity: VNet peering, Azure Bastion host, VPN Gateway site-to-site tunnels, and ExpressRoute",
                  "Traffic Routing: User-defined routes (UDR), Azure Load Balancer, Azure Application Gateway, and NAT Gateway",
                  "Private Access: Azure Private Link, Private Endpoints, and Service Endpoints"
            ]
      },
      {
            "title": "5. Monitor and Maintain Azure Resources (10–15%)",
            "items": [
                  "Azure Monitor: Metrics, log queries with Kusto (KQL), application insights, and alert action groups",
                  "Backup & Disaster Recovery: Recovery Services vault, Azure Backup policies, and Azure Site Recovery (ASR)"
            ]
      }
],
  },
  {
    id: 'course-ms-ai-102',
    title: 'Designing and Implementing a Microsoft Azure AI Solution (AI-102)',
    domain: 'Artificial Intelligence',
    certificationVendor: 'Microsoft',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 2750,
    imageUrl: '/images/copilot_genai_workspace_1788294313357.webp',
    imageAlt: 'Azure OpenAI and Cognitive Services architecture training',
    summary: 'Build production-ready generative AI, computer vision, natural language processing, knowledge mining, and conversational AI bots using Azure OpenAI & AI Search.',
    curriculum: [
      'Module 1: Azure AI Services Overview, Security, Key Vault & Azure OpenAI Service Setup',
      'Module 2: Prompt Engineering, Fine-Tuning Models & Retrieval-Augmented Generation (RAG)',
      'Module 3: Azure AI Vision, OCR, Custom Vision Models & Spatial Analysis',
      'Module 4: Azure AI Language, Sentiment Analysis, Text Analytics & Conversational AI',
      'Module 5: Azure AI Search (Knowledge Mining), Document Intelligence & Capstone'
    ],
    overview: `The AI-102 course prepares software engineers and AI developers to build, manage, and deploy cognitive solutions leveraging Azure AI Services, Azure OpenAI Service, and Azure AI Search. You will master computer vision, natural language processing, speech recognition, and generative AI enterprise integrations.

Designed for AI engineers, data scientists, and developers modernizing applications with intelligent cloud services.`,
    learningObjectives: [
      "Plan, secure, and deploy Azure AI services within enterprise virtual networks",
      "Implement Computer Vision solutions for image analysis, optical character recognition (OCR), and facial recognition",
      "Build natural language processing solutions with sentiment analysis, entity extraction, and machine translation",
      "Create knowledge mining pipelines using Azure AI Search and Document Intelligence",
      "Develop generative AI conversational bots with Azure OpenAI and prompt engineering"
],
    prerequisites: [
      "Knowledge of Python or C# programming and RESTful API consumption",
      "Azure AI Fundamentals (AI-900) or equivalent baseline AI knowledge",
      "Familiarity with the Azure portal and cloud resource management"
],
    outline: [
      {
            "title": "1. Plan and Manage Azure AI Solutions (15–20%)",
            "items": [
                  "Service Provisioning: Multi-service vs single-service Azure AI resources",
                  "Security & Governance: Customer-managed keys, private endpoints, managed identities, and content filtering",
                  "Monitoring: Diagnostic logging, rate limits, consumption tracking, and alert triggers",
                  "Responsible AI: Enforcing ethical standards, fairness, transparency, and data privacy"
            ]
      },
      {
            "title": "2. Implement Computer Vision Solutions (20–25%)",
            "items": [
                  "Image Analysis: Tagging, visual descriptions, smart cropping, and adult content detection",
                  "Optical Character Recognition (OCR): Azure AI Vision Read API, handwriting recognition, and receipts",
                  "Custom Vision: Image classification and object detection custom model training and evaluation",
                  "Video Indexer: Facial tracking, brand detection, emotion detection, and speech transcription"
            ]
      },
      {
            "title": "3. Implement Natural Language Processing (20–25%)",
            "items": [
                  "Azure AI Language: Named Entity Recognition (NER), key phrase extraction, and sentiment scoring",
                  "Question Answering: Conversational knowledge bases, chit-chat personality, and multi-turn dialogs",
                  "Azure AI Speech: Speech-to-text, text-to-speech with neural voices, and speech translation",
                  "Language Translation: Document translation, custom terminology glossaries, and profanity filtering"
            ]
      },
      {
            "title": "4. Implement Knowledge Mining & Document Intelligence (15–20%)",
            "items": [
                  "Azure AI Search: Search index creation, skillsets, cognitive enrichments, and semantic ranking",
                  "Vector Search: Text embeddings, hybrid search queries, and RAG architectures",
                  "Document Intelligence: Prebuilt models (invoices, receipts, tax forms) and custom layout extractors"
            ]
      },
      {
            "title": "5. Implement Generative AI Solutions (20–25%)",
            "items": [
                  "Azure OpenAI: Model deployment (GPT-4o, Embeddings), token optimization, and system instructions",
                  "Prompt Engineering: Few-shot prompting, chain-of-thought, temperature tuning, and hallucination reduction",
                  "Azure AI Studio: Building enterprise Copilots, playground evaluation, and safe playground deployment"
            ]
      }
],
  },
  {
    id: 'course-ms-dp-100',
    title: 'Designing and Implementing a Data Science Solution on Azure (DP-100)',
    domain: 'Artificial Intelligence',
    certificationVendor: 'Microsoft',
    skillLevel: 'Advanced',
    format: 'Live Online',
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 1940,
    imageUrl: '/images/powerbi_data_analytics_1788294280157.webp',
    imageAlt: 'Azure Machine Learning DP-100 data science training preview',
    summary: 'Train, evaluate, deploy, and monitor scalable machine learning models using Azure Machine Learning Studio, MLflow, Automated ML, and Kubernetes endpoints.',
    curriculum: [
      'Module 1: Azure Machine Learning Workspace Setup, Compute Clusters & Datasets',
      'Module 2: Experiment Tracking with MLflow, Model Training & Hyperparameter Tuning',
      'Module 3: Automated Machine Learning (AutoML) & Azure ML Designer Pipelines',
      'Module 4: Model Deployment to Managed Online Endpoints & Real-Time Scoring',
      'Module 5: Responsible AI Framework, Model Drift Monitoring & Certification Prep'
    ],
    overview: `DP-100: Designing and Implementing a Data Science Solution on Azure trains data scientists to use Azure Machine Learning to train, evaluate, deploy, and manage machine learning models at enterprise scale. You will learn automated ML, MLflow model tracking, hyperparameter tuning, and production MLOps deployment.

Targeted at data scientists, ML engineers, and analytics professionals operationalizing predictive models in the cloud.`,
    learningObjectives: [
      "Design and prepare machine learning workspaces, compute instances, and datastores on Azure",
      "Run ML training experiments with the Azure ML Python SDK v2 and MLflow tracking",
      "Optimize hyperparameters and execute automated machine learning (AutoML) jobs",
      "Deploy models to real-time managed online endpoints and batch inference pipelines",
      "Implement responsible AI dashboards, model explainability, and data drift monitoring"
],
    prerequisites: [
      "Proficiency in Python programming and common data science libraries (Pandas, Scikit-Learn, NumPy)",
      "Basic knowledge of machine learning concepts and cloud computing"
],
    outline: [
      {
            "title": "1. Design and Prepare a Machine Learning Solution (20–25%)",
            "items": [
                  "Workspace Management: Azure ML workspaces, compute targets, and secure virtual networks",
                  "Data Architecture: Datastores, data assets (URI file, URI folder, MLTable), and versioning"
            ]
      },
      {
            "title": "2. Explore Data and Train Models (35–40%)",
            "items": [
                  "Experiment Tracking: MLflow integration, parameter logging, metrics, and artifact storage",
                  "Model Training: Custom scripts, automated ML (AutoML), and distributed training across GPU clusters",
                  "Hyperparameter Tuning: Sweep jobs, sampling methods (Bayesian, Grid, Random), and early termination policies"
            ]
      },
      {
            "title": "3. Prepare a Model for Deployment (20–25%)",
            "items": [
                  "Model Registry: Registering MLflow models, environment specifications, and container packaging",
                  "Responsible AI: Feature importance, fairlearn fairness analysis, error analysis, and counterfactuals"
            ]
      },
      {
            "title": "4. Deploy and Retrain a Model (15–20%)",
            "items": [
                  "Endpoint Deployment: Managed online endpoints for real-time scoring and batch endpoints",
                  "Production Operations: Blue/green traffic routing, continuous retraining pipelines, and data drift alerts"
            ]
      }
],
  },
  {
    id: 'course-ms-sc-900',
    title: 'Microsoft Security, Compliance, and Identity Fundamentals (SC-900)',
    domain: 'Cybersecurity',
    certificationVendor: 'Microsoft',
    skillLevel: 'Beginner',
    format: 'Live Online',
    duration: '5 Days (30 Hours)',
    rating: 4.8,
    enrolled: 3420,
    imageUrl: '/images/comptia_security_soc_1787771516564.webp',
    imageAlt: 'Microsoft SC-900 Security and Compliance fundamentals training',
    summary: 'Understand Microsoft security solutions, Zero Trust principles, Entra ID identity governance, Microsoft Defender XDR, and Microsoft Purview compliance.',
    curriculum: [
      'Module 1: Core Concepts of Security, Compliance & Identity (Zero Trust & Shared Responsibility)',
      'Module 2: Microsoft Entra ID Capabilities (Conditional Access, MFA, PIM & Identity Protection)',
      'Module 3: Microsoft Security Solutions (Microsoft Defender for Cloud, Endpoint & Office 365)',
      'Module 4: Microsoft Sentinel (Cloud-Native SIEM) & Microsoft Security Copilot',
      'Module 5: Microsoft Purview Compliance, Sensitivity Labels, DLP & SC-900 Exam Drill'
    ],
    overview: `SC-900 provides foundational knowledge of Microsoft’s end-to-end security, compliance, and identity solutions across cloud and hybrid environments. It explores Zero Trust methodology, Microsoft Entra ID governance, Microsoft Defender XDR threat protection, Microsoft Sentinel SIEM, and Microsoft Purview compliance.

Ideal for business stakeholders, IT professionals, security analysts, and students looking to establish certified competence in Microsoft cloud security.`,
    learningObjectives: [
      "Understand the concepts of security, compliance, and identity (SCI)",
      "Describe Microsoft Entra ID capabilities, Conditional Access, and identity protection",
      "Explain Microsoft Security solutions including Microsoft Defender XDR and Sentinel",
      "Explore Microsoft Purview compliance capabilities, data lifecycle management, and insider risk"
],
    prerequisites: [
      "General understanding of cloud computing and fundamental security concepts",
      "No prior formal certification required"
],
    outline: [
      {
            "title": "1. Concepts of Security, Compliance & Identity (10–15%)",
            "items": [
                  "Zero Trust Principles: Verify explicitly, use least privileged access, assume breach",
                  "Shared Responsibility Model: Customer vs cloud provider security duties across IaaS, PaaS, and SaaS",
                  "Defense-in-Depth: Multi-layered defense covering data, applications, compute, network, and perimeter",
                  "Core Cryptography: Symmetric vs asymmetric encryption, hashing, and TLS standards"
            ]
      },
      {
            "title": "2. Microsoft Entra ID Capabilities (30–35%)",
            "items": [
                  "Identity Fundamentals: Cloud identities, hybrid identities, and Entra Connect synchronization",
                  "Authentication Methods: Multi-Factor Authentication (MFA), passwordless sign-in, and SSPR",
                  "Access Governance: Conditional Access policies, Entra ID Protection risk signals, and PIM"
            ]
      },
      {
            "title": "3. Microsoft Security Solutions (35–40%)",
            "items": [
                  "Microsoft Defender XDR: Unified protection across endpoints, identities, emails, and SaaS apps",
                  "Defender for Cloud: Cloud Security Posture Management (CSPM), regulatory benchmarks, and Secure Score",
                  "Microsoft Sentinel: Cloud-native SIEM and SOAR, data connectors, analytical rules, and automated playbooks",
                  "Security Copilot: Generative AI incident investigation and prompt-driven threat response"
            ]
      },
      {
            "title": "4. Microsoft Compliance Solutions (20–25%)",
            "items": [
                  "Microsoft Purview: Unified data governance, data map, and compliance manager score",
                  "Information Protection: Sensitivity labels, data loss prevention (DLP), and message encryption",
                  "Data Governance: Retention labels, record management, eDiscovery, and audit log search"
            ]
      }
],
  },
  {
    id: 'course-ms-900',
    title: 'Microsoft 365 Fundamentals (MS-900)',
    domain: 'Microsoft Solutions',
    certificationVendor: 'Microsoft',
    skillLevel: 'Beginner',
    format: 'Live Online',
    duration: '5 Days (30 Hours)',
    rating: 4.8,
    enrolled: 2950,
    imageUrl: '/images/copilot_genai_workspace_1788294313357.webp',
    imageAlt: 'Microsoft 365 Fundamentals MS-900 enterprise training',
    summary: 'Master Microsoft 365 cloud productivity solutions, collaboration apps (Teams, SharePoint, Exchange), endpoint management (Intune), and licensing models.',
    curriculum: [
      'Module 1: Cloud Concepts & Microsoft 365 Cloud Productivity Solutions Overview',
      'Module 2: Collaboration in Microsoft 365 (Microsoft Teams, SharePoint Online & OneDrive)',
      'Module 3: Endpoint Management & Windows as a Service with Microsoft Intune',
      'Module 4: Security, Compliance, Privacy & Trust in Microsoft 365',
      'Module 5: Microsoft 365 Pricing, Enterprise Licensing Plans & Exam Preparation'
    ],
    overview: `Microsoft 365 Fundamentals (MS-900) demonstrates foundational knowledge of cloud-based SaaS solutions, specifically productivity, collaboration, security, and cloud licensing across the Microsoft 365 ecosystem.

Geared toward professionals evaluating or adopting Microsoft 365, IT administrators, and sales professionals.`,
    learningObjectives: [
      "Differentiate cloud computing concepts and Microsoft 365 subscription models",
      "Describe core productivity and collaboration capabilities in Teams, Exchange, SharePoint, and OneDrive",
      "Explain security, compliance, privacy, and trust across Microsoft 365",
      "Understand Microsoft 365 licensing, billing, support tiers, and service health"
],
    prerequisites: [
      "Basic knowledge of computing, internet concepts, and productivity software"
],
    outline: [
      {
            "title": "1. Cloud Concepts (10–15%)",
            "items": [
                  "Cloud Services: IaaS, PaaS, SaaS differences, public/private/hybrid deployments, and cloud benefits"
            ]
      },
      {
            "title": "2. Core Microsoft 365 Services and Concepts (50–55%)",
            "items": [
                  "Productivity Solutions: Microsoft Word, Excel, PowerPoint, Outlook, and OneNote collaborative features",
                  "Collaboration: Microsoft Teams channels, chat, meetings, webinars, and Microsoft Viva employee experience",
                  "Endpoint Management: Microsoft Intune, Windows 365 Cloud PC, and Azure Virtual Desktop comparison"
            ]
      },
      {
            "title": "3. Security, Compliance, Privacy, and Trust (15–20%)",
            "items": [
                  "Threat Defense: Defender for Office 365, safe attachments, safe links, and anti-phishing policies",
                  "Compliance & Privacy: Microsoft Purview compliance portal, audit logs, and data residency transparency"
            ]
      },
      {
            "title": "4. Microsoft 365 Pricing and Support (10–15%)",
            "items": [
                  "Licensing Models: Business vs Enterprise suites (E3/E5, F3), add-on licenses, and billing cycles",
                  "Support & Health: Service health dashboard, support ticket workflows, and SLA uptime commitments"
            ]
      }
],
  },
  {
    id: 'course-ms-pl-300',
    title: 'Microsoft Power BI Data Analyst (PL-300)',
    domain: 'Microsoft Solutions',
    certificationVendor: 'Microsoft',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 4110,
    imageUrl: '/images/powerbi_data_analytics_1788294280157.webp',
    imageAlt: 'Microsoft Power BI PL-300 data visualization training preview',
    summary: 'Transform raw data into actionable enterprise insights by mastering Power Query data ingestion, DAX calculations, interactive report design, and workspace governance.',
    curriculum: [
      'Module 1: Power Query ETL, Data Cleansing, Merging & Schema Transformation',
      'Module 2: Data Modeling, Star Schemas, Relationships & Advanced DAX Calculations',
      'Module 3: Visual Analytics, Interactive Dashboards, Drillthrough & Custom Charts',
      'Module 4: Power BI Service, Workspace Roles, Scheduled Refresh & Gateway Configuration',
      'Module 5: Row-Level Security (RLS), Performance Analyzer & PL-300 Practice Drill'
    ],
    overview: `PL-300: Microsoft Power BI Data Analyst provides the skills needed to transform raw business data into actionable visual insights. You will learn to ingest and clean data with Power Query, model relationships, author DAX calculations, build interactive dashboards, and deploy workspaces.

Designed for data analysts, business intelligence specialists, and reporting professionals delivering enterprise analytics.`,
    learningObjectives: [
      "Connect to diverse data sources and cleanse datasets using Power Query M-code",
      "Design robust analytical data models with Star Schema principles and DAX measures",
      "Create compelling interactive reports with bookmarks, tooltips, and drill-throughs",
      "Manage and distribute enterprise reports and semantic models via the Power BI Service"
],
    prerequisites: [
      "Basic understanding of core data concepts and experience working with Excel spreadsheets"
],
    outline: [
      {
            "title": "1. Prepare the Data (25–30%)",
            "items": [
                  "Data Ingestion: Connecting to SQL databases, Excel, SharePoint, REST APIs, and Big Data platforms",
                  "Data Transformation: Cleaning columns, pivot/unpivot, merging/appending queries, and handling errors"
            ]
      },
      {
            "title": "2. Model the Data (30–35%)",
            "items": [
                  "Data Modeling: Star schemas, active/inactive relationships, cardinality (1:*, *:1), and cross-filtering",
                  "DAX Calculations: Calculated tables, calculated columns, and scalar measures using CALCULATE, FILTER, and Time Intelligence"
            ]
      },
      {
            "title": "3. Visualize and Analyze the Data (25–30%)",
            "items": [
                  "Visual Design: Selecting charts, formatting themes, conditional formatting, and accessibility features",
                  "Interactive Storytelling: Bookmarks, custom tooltips, drill-through pages, and Q&A natural language visuals"
            ]
      },
      {
            "title": "4. Deploy and Maintain Assets (20–25%)",
            "items": [
                  "Power BI Service: Workspaces, deployment pipelines, app publishing, and scheduled data refreshes",
                  "Security Governance: Row-Level Security (RLS), object-level security, and on-premises data gateway management"
            ]
      }
],
  },
  {
    id: 'course-ms-pl-900',
    title: 'Microsoft Power Platform Fundamentals (PL-900)',
    domain: 'Microsoft Solutions',
    certificationVendor: 'Microsoft',
    skillLevel: 'Beginner',
    format: 'Live Online',
    duration: '5 Days (30 Hours)',
    rating: 4.8,
    enrolled: 2670,
    imageUrl: '/images/powerbi_data_analytics_1788294280157.webp',
    imageAlt: 'Microsoft Power Platform PL-900 business automation preview',
    summary: 'Build low-code custom business apps with Power Apps, automate workflows with Power Automate, create portals with Power Pages, and deploy bots with Microsoft Copilot Studio.',
    curriculum: [
      'Module 1: Power Platform Business Value & Microsoft Dataverse Core Concepts',
      'Module 2: Building Canvas Apps & Model-Driven Apps with Power Apps',
      'Module 3: Automating Business Processes & Approvals with Power Automate Flows',
      'Module 4: Power Pages External Websites & Copilot Studio AI Conversational Bots',
      'Module 5: Power Platform Administration, Data Loss Prevention (DLP) & Exam Drill'
    ],
    overview: `PL-900: Microsoft Power Platform Fundamentals introduces the business value and product capabilities of Power Apps, Power Automate, Power BI, Power Pages, and Copilot Studio.

Designed for business users, functional consultants, and developers looking to build modern low-code business solutions.`,
    learningObjectives: [
      "Describe the business value of Microsoft Power Platform and Microsoft Dataverse",
      "Identify core components of Power Apps (Canvas & Model-Driven Apps)",
      "Demonstrate capabilities of Power Automate cloud and desktop flows",
      "Explain Copilot Studio conversational AI and Power Pages external websites"
],
    prerequisites: [
      "Basic familiarity with computers, internet browsers, and enterprise cloud applications"
],
    outline: [
      {
            "title": "1. Power Platform Business Value (20–25%)",
            "items": [
                  "Ecosystem Overview: Business digital transformation, Dataverse tables, connectors, and AI Builder",
                  "Administration: Power Platform admin center, environments, data policies, and licensing"
            ]
      },
      {
            "title": "2. Power Apps (25–30%)",
            "items": [
                  "Canvas Apps: Drag-and-drop UI design, Power Fx formulas, and data source binding",
                  "Model-Driven Apps: Dataverse schema integration, business process flows, views, and dashboards"
            ]
      },
      {
            "title": "3. Power Automate (25–30%)",
            "items": [
                  "Flow Types: Automated trigger flows, instant button flows, scheduled flows, and desktop RPA flows",
                  "Business Approvals: Multi-stage approvals, notifications, and conditional branching"
            ]
      },
      {
            "title": "4. Copilot Studio and Power Pages (15–20%)",
            "items": [
                  "Copilot Studio: Building custom generative AI conversational chatbots connected to corporate knowledge",
                  "Power Pages: Creating secure, external-facing responsive corporate web portals"
            ]
      }
],
  },
  {
    id: 'course-ms-ai-900',
    title: 'Microsoft Azure AI Fundamentals (AI-900)',
    domain: 'Artificial Intelligence',
    certificationVendor: 'Microsoft',
    skillLevel: 'Beginner',
    format: 'Live Online',
    duration: '5 Days (30 Hours)',
    rating: 4.9,
    enrolled: 3820,
    imageUrl: '/images/copilot_genai_workspace_1788294313357.webp',
    imageAlt: 'Microsoft Azure AI Fundamentals AI-900 training',
    summary: 'Get started with artificial intelligence concepts, machine learning principles, computer vision, natural language processing, and generative AI workloads on Microsoft Azure.',
    curriculum: [
      'Module 1: AI & Machine Learning Fundamentals (Regression, Classification & Clustering)',
      'Module 2: Automated Machine Learning in Azure ML Studio & Responsible AI Principles',
      'Module 3: Computer Vision Concepts, Object Detection & Optical Character Recognition',
      'Module 4: Natural Language Processing (NLP), Speech Recognition & Conversational Bots',
      'Module 5: Generative AI on Azure (Azure OpenAI & Copilot) & AI-900 Exam Prep'
    ],
    overview: `AI-900: Microsoft Azure AI Fundamentals covers fundamental machine learning and artificial intelligence concepts along with their implementation in Azure services. Topics include computer vision, natural language processing, conversational AI, and generative AI.

Ideal for students, business professionals, and engineers seeking an introduction to cloud AI without heavy coding requirements.`,
    learningObjectives: [
      "Describe AI workloads, machine learning concepts, and responsible AI principles",
      "Understand fundamental principles of computer vision on Azure",
      "Explore natural language processing (NLP) features in Azure AI Language",
      "Explain conversational AI and generative AI capabilities on Microsoft Azure"
],
    prerequisites: [
      "Basic computer literacy and general interest in AI capabilities"
],
    outline: [
      {
            "title": "1. AI Workloads and Considerations (15–20%)",
            "items": [
                  "Core AI Capabilities: Machine learning, computer vision, NLP, and conversational agents",
                  "Responsible AI: Fairness, reliability & safety, privacy & security, inclusiveness, transparency, and accountability"
            ]
      },
      {
            "title": "2. Fundamental Machine Learning Principles (20–25%)",
            "items": [
                  "ML Concepts: Supervised vs unsupervised learning, regression, classification, and clustering algorithms",
                  "Azure Machine Learning: Automated ML studio, visual designer pipelines, and model evaluation"
            ]
      },
      {
            "title": "3. Computer Vision Workloads (15–20%)",
            "items": [
                  "Vision Capabilities: Image classification, object detection, optical character recognition (OCR), and facial analysis"
            ]
      },
      {
            "title": "4. Natural Language Processing Workloads (15–20%)",
            "items": [
                  "Language Features: Key phrase extraction, sentiment analysis, entity recognition, speech synthesis, and translation"
            ]
      },
      {
            "title": "5. Generative AI Capabilities (20–25%)",
            "items": [
                  "Generative AI: Large language models (LLMs), prompt engineering basics, and Azure OpenAI Service applications"
            ]
      }
],
  },
  {
    id: 'course-ms-dp-900',
    title: 'Microsoft Azure Data Fundamentals (DP-900)',
    domain: 'Microsoft Solutions',
    certificationVendor: 'Microsoft',
    skillLevel: 'Beginner',
    format: 'Live Online',
    duration: '5 Days (30 Hours)',
    rating: 4.8,
    enrolled: 2890,
    imageUrl: '/images/powerbi_data_analytics_1788294280157.webp',
    imageAlt: 'Microsoft Azure Data Fundamentals DP-900 training preview',
    summary: 'Master foundational data concepts, relational database offerings (Azure SQL Database), non-relational storage (Azure Cosmos DB), and modern analytics architectures (Azure Synapse).',
    curriculum: [
      'Module 1: Core Data Concepts (Relational vs Non-Relational, Batch vs Streaming)',
      'Module 2: Relational Data on Azure (Azure SQL Database, SQL Managed Instance & PostgreSQL)',
      'Module 3: Non-Relational Data on Azure (Azure Cosmos DB, Table Storage & Blob Tiers)',
      'Module 4: Modern Data Warehousing, Azure Synapse Analytics, Data Factory & Power BI',
      'Module 5: Real-Time Analytics with Azure Stream Analytics & DP-900 Practice Exam'
    ],
    overview: `DP-900: Microsoft Azure Data Fundamentals teaches the core concepts of relational data, non-relational data, big data processing, and modern data warehousing architectures in Microsoft Azure.

Perfect for data enthusiasts, business analysts, and beginners preparing for advanced Azure data engineering or data science certifications.`,
    learningObjectives: [
      "Identify foundational data concepts, data representations, and ACID transactional properties",
      "Explain relational data offerings in Azure including Azure SQL Database and Azure Database for PostgreSQL",
      "Understand non-relational data storage with Azure Cosmos DB and Azure Blob Storage",
      "Describe analytics services including Azure Synapse Analytics, Azure Databricks, and Microsoft Fabric"
],
    prerequisites: [
      "Basic knowledge of computing and data concepts"
],
    outline: [
      {
            "title": "1. Core Data Concepts (25–30%)",
            "items": [
                  "Data Structures: Structured, semi-structured (JSON/XML), and unstructured data files",
                  "Workload Types: Online Transaction Processing (OLTP) vs Online Analytical Processing (OLAP)"
            ]
      },
      {
            "title": "2. Relational Data on Azure (20–25%)",
            "items": [
                  "Relational Services: Azure SQL Database, Azure SQL Managed Instance, and open-source database engines on Azure",
                  "Database Management: Querying with SQL, provisioning, firewall security, and automatic high availability"
            ]
      },
      {
            "title": "3. Non-Relational Data on Azure (15–20%)",
            "items": [
                  "NoSQL Services: Azure Cosmos DB multi-model APIs (Core SQL, MongoDB, Cassandra), partitioning, and consistency levels",
                  "Storage Services: Azure Blob Storage, Azure Files, and Azure Table storage"
            ]
      },
      {
            "title": "4. Large-Scale Analytics on Azure (25–30%)",
            "items": [
                  "Modern Data Warehousing: Azure Synapse Analytics, dedicated SQL pools, and serverless queries",
                  "Big Data Processing: Azure Databricks, Apache Spark on Azure, and Microsoft Fabric Lakehouse concepts"
            ]
      }
],
  },
  {
    id: 'course-ms-4018-copilot',
    title: 'Draft, Analyze and Present with Microsoft 365 Copilot (MS-4018)',
    domain: 'Artificial Intelligence',
    certificationVendor: 'Microsoft',
    skillLevel: 'Beginner',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (30 Hours)',
    rating: 5.0,
    enrolled: 3650,
    imageUrl: '/images/copilot_genai_workspace_1788294313357.webp',
    imageAlt: 'Microsoft 365 Copilot enterprise workplace generative AI training',
    summary: 'Accelerate enterprise workplace productivity by mastering Microsoft 365 Copilot prompt engineering across Word, Excel, PowerPoint, Outlook, and Microsoft Teams.',
    curriculum: [
      'Module 1: Microsoft 365 Copilot Architecture, Microsoft Graph Data Grounding & Security',
      'Module 2: Drafting & Summarizing Executive Documents in Word with Copilot',
      'Module 3: Data Analysis, Python Scripting & Formula Generation in Excel with Copilot',
      'Module 4: Creating High-Impact Client Presentations in PowerPoint & Email Triage in Outlook',
      'Module 5: Meeting Summaries in Teams & Building Custom Copilots in Copilot Studio'
    ],
    overview: `MS-4018: Draft, Analyze and Present with Microsoft 365 Copilot teaches business professionals and knowledge workers how to leverage generative AI within Microsoft Word, PowerPoint, Excel, Teams, and Outlook.

Ideal for business professionals, project leaders, executives, and managers looking to drastically accelerate daily work productivity using Copilot AI.`,
    learningObjectives: [
      "Formulate effective prompt engineering strategies for Microsoft 365 Copilot",
      "Draft complex contracts, memos, and executive summaries rapidly in Microsoft Word",
      "Transform documents into presentation decks with custom visuals in PowerPoint",
      "Analyze data, extract insights, and generate formulas with Copilot in Excel",
      "Summarize long email threads in Outlook and catch up on missed Teams meetings in seconds"
],
    prerequisites: [
      "Working knowledge of Microsoft Office applications (Word, Excel, PowerPoint, Outlook, Teams)"
],
    outline: [
      {
            "title": "1. Microsoft 365 Copilot Foundations",
            "items": [
                  "Copilot Architecture: Large Language Models (LLMs), Microsoft Graph semantic index, and enterprise data privacy",
                  "Prompt Crafting Principles: Goal, Context, Source, and Expectation (GCSE) prompt structure"
            ]
      },
      {
            "title": "2. Copilot in Word & Outlook",
            "items": [
                  "Word Productivity: Drafting proposals from bullet notes, restructuring documents, and tone adjustment",
                  "Outlook Efficiency: Summarizing lengthy email chains, drafting replies with personalized context, and scheduling"
            ]
      },
      {
            "title": "3. Copilot in Excel",
            "items": [
                  "Data Exploration: Prompt-driven formula generation, conditional formatting rules, and trend analysis",
                  "Visual Charts: Generating pivot recommendations, key influencer charts, and summary KPI cards"
            ]
      },
      {
            "title": "4. Copilot in PowerPoint & Teams",
            "items": [
                  "Presentation Creation: Turning Word documents into fully structured slide decks with consistent styles",
                  "Teams Collaboration: Real-time meeting summaries, action item extraction, and chat query assistance"
            ]
      }
],
  },

  // ===================== 4. CLOUD & DEVOPS PLATFORMS =====================
  {
    id: 'course-aws-solutions',
    title: 'AWS Certified Solutions Architect (SAA-C03)',
    domain: 'Cloud Computing',
    certificationVendor: 'AWS',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 5.0,
    enrolled: 6890,
    imageUrl: '/images/aws_architecture_diagram_1787771528914.webp',
    imageAlt: 'AWS Certified Solutions Architect system blueprint training',
    summary: 'Design resilient, high-performing, secure, and cost-optimized architectures on Amazon Web Services for large scale corporate deployments.',
    curriculum: [
      'Module 1: AWS Global Infrastructure, IAM Policies, VPC Networking & Subnets',
      'Module 2: Compute Solutions (EC2, ECS, EKS, Lambda) & Auto Scaling / Load Balancing',
      'Module 3: Storage & Databases (S3, EBS, EFS, RDS Multi-AZ, Aurora, DynamoDB)',
      'Module 4: High Availability, Route 53, CloudFront CDN, KMS Encryption & Security',
      'Module 5: Cost Optimization, CloudFormation / Terraform & SAA-C03 Mock Exam'
    ],
    overview: `AWS Certified Solutions Architect - Associate (SAA-C03) validates the expertise required to design high-availability, cost-effective, fault-tolerant, and scalable distributed systems on Amazon Web Services (AWS).

Ideal for solutions architects, cloud engineers, DevOps practitioners, and systems administrators building enterprise cloud architectures on AWS.`,
    learningObjectives: [
      "Design secure AWS architectures with IAM, VPC networking, security groups, and encryption",
      "Architect resilient and high-performing systems using Auto Scaling, ELB, Route 53, and S3",
      "Select optimal compute, database, and storage solutions based on technical and business requirements",
      "Optimize AWS infrastructures for cost efficiency and operational excellence"
],
    prerequisites: [
      "One year of hands-on experience designing and deploying cloud architecture on AWS (recommended)"
],
    outline: [
      {
            "title": "1. Design Secure Architectures (30%)",
            "items": [
                  "Identity Management: AWS IAM policies, roles, federation with AWS IAM Identity Center (SSO), and session tokens",
                  "Network Security: VPC design, public/private subnets, NAT gateways, security groups, NACLs, and AWS WAF",
                  "Data Protection: AWS KMS envelope encryption, AWS Secrets Manager, and AWS Certificate Manager (ACM)"
            ]
      },
      {
            "title": "2. Design Resilient Architectures (26%)",
            "items": [
                  "High Availability: Multi-AZ deployments, cross-region replication, and Amazon Route 53 routing policies",
                  "Elastic Compute: Amazon EC2 Auto Scaling groups, Application Load Balancers (ALB), and Network Load Balancers (NLB)",
                  "Decoupled Architectures: Amazon SQS queues, Amazon SNS notifications, and Amazon EventBridge event buses"
            ]
      },
      {
            "title": "3. Design High-Performing Architectures (24%)",
            "items": [
                  "Scalable Storage: Amazon S3 storage classes, Amazon EBS volume types (gp3/io2), and Amazon EFS shared filesystems",
                  "Managed Databases: Amazon RDS multi-AZ, Amazon Aurora global databases, and Amazon DynamoDB global tables",
                  "Caching & Edge: Amazon CloudFront CDN distributions and Amazon ElastiCache (Redis/Memcached) layers"
            ]
      },
      {
            "title": "4. Design Cost-Optimized Architectures (20%)",
            "items": [
                  "Compute Optimization: EC2 Savings Plans, Reserved Instances, Spot Instances, and AWS Graviton processors",
                  "Storage Tiering: S3 Intelligent-Tiering, S3 Glacier Flexible/Deep Archive, and lifecycle management policies"
            ]
      }
],
  },
  {
    id: 'course-aws-security',
    title: 'AWS Certified Security - Specialty (SCS-C02)',
    domain: 'Cybersecurity',
    certificationVendor: 'AWS',
    skillLevel: 'Advanced',
    format: 'Live Online',
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 1980,
    imageUrl: '/images/aws_architecture_diagram_1787771528914.webp',
    imageAlt: 'AWS Cloud Security and encryption architecture training',
    summary: 'Validate your expertise in creating and implementing advanced security solutions in the AWS Cloud with GuardDuty, Security Hub, KMS, and IAM governance.',
    curriculum: [
      'Module 1: Threat Detection, AWS GuardDuty, Security Hub & EventBridge Automation',
      'Module 2: Infrastructure Security, AWS WAF, Shield DDoS & Network Firewall',
      'Module 3: Identity & Access Management (IAM), Organizations SCPs & Permission Boundaries',
      'Module 4: Data Protection, KMS Key Policies, CloudHSM & S3 Bucket Encryption',
      'Module 5: Security Incident Response, CloudTrail Forensics & SCS-C02 Mock Exam'
    ],
    overview: `AWS Certified Security - Specialty (SCS-C02) demonstrates advanced technical expertise in securing the AWS cloud, covering threat detection, logging, incident response, infrastructure security, and identity governance.

Targeted at security engineers, cloud security architects, and compliance specialists safeguarding enterprise AWS environments.`,
    learningObjectives: [
      "Implement threat detection, automated monitoring, and incident response using AWS native tools",
      "Harden infrastructure with AWS Network Firewall, AWS WAF, and VPC traffic mirroring",
      "Manage complex multi-account permissions using AWS Organizations and Service Control Policies (SCPs)",
      "Enforce data protection, encryption, and automated compliance auditing with AWS Config and Security Hub"
],
    prerequisites: [
      "Minimum two years of hands-on experience securing AWS workloads",
      "AWS Certified Solutions Architect Associate or equivalent experience"
],
    outline: [
      {
            "title": "1. Threat Detection and Incident Response (22%)",
            "items": [
                  "Continuous Monitoring: Amazon GuardDuty threat intelligence, Amazon Inspector vulnerability assessments, and Amazon Macie",
                  "Incident Triage: AWS Security Hub centralized findings, automated remediation with EventBridge and Lambda functions"
            ]
      },
      {
            "title": "2. Infrastructure Security (20%)",
            "items": [
                  "Perimeter Defense: AWS WAF rate-limiting rules, AWS Shield Advanced DDoS protection, and AWS Firewall Manager",
                  "Network Isolation: AWS Network Firewall, VPC endpoints (Interface & Gateway), and VPC Flow Logs analysis"
            ]
      },
      {
            "title": "3. Identity and Access Management (16%)",
            "items": [
                  "Policy Evaluation: IAM permission boundaries, resource-based policies, and Service Control Policies (SCPs)",
                  "Workload Identities: IAM Roles for Amazon EKS ServiceAccounts, and cross-account STS AssumeRole workflows"
            ]
      },
      {
            "title": "4. Data Protection and Encryption (22%)",
            "items": [
                  "Key Management: AWS KMS customer-managed keys (CMK), multi-region keys, key rotation, and CloudHSM",
                  "Storage Hardening: S3 Object Lock compliance retention, default encryption, and S3 Block Public Access enforcement"
            ]
      },
      {
            "title": "5. Management and Security Governance (20%)",
            "items": [
                  "Audit Compliance: AWS CloudTrail multi-region organizational trails, log file validation, and CloudWatch Logs retention",
                  "Configuration Governance: AWS Config conformance packs, automatic drift remediation, and AWS Systems Manager Patch Manager"
            ]
      }
],
  },
  {
    id: 'course-kubernetes-cka',
    title: 'Kubernetes & Cloud-Native Platform Engineering (CKA & CKS Prep)',
    domain: 'DevOps',
    certificationVendor: 'Cloud Native',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 5.0,
    enrolled: 3410,
    imageUrl: '/images/kubernetes_devops_cluster_1788294296039.webp',
    imageAlt: 'Kubernetes CKA and container platform engineering laboratory',
    summary: 'Deploy, configure, secure, and troubleshoot production Kubernetes clusters from scratch. Master pods, services, ingress, storage, RBAC, and Helm deployments.',
    curriculum: [
      'Module 1: Docker Containers, Kubernetes Architecture & Kubeadm Cluster Bootstrap',
      'Module 2: Pods, Deployments, ReplicaSets, StatefulSets, DaemonSets & Rollbacks',
      'Module 3: Cluster Networking, CoreDNS, ClusterIP, NodePort, LoadBalancer & Ingress',
      'Module 4: Persistent Storage (PV, PVC, StorageClasses), ConfigMaps, Secrets & RBAC',
      'Module 5: Cluster Troubleshooting, ETCD Backup/Restore, CKA/CKS Exam Lab Drills'
    ],
    overview: `Kubernetes & Cloud-Native Platform Engineering (CKA & CKS Prep) prepares DevOps and platform engineers for the 100% hands-on performance-based Certified Kubernetes Administrator and Security Specialist certifications.

Ideal for DevOps engineers, cloud platform engineers, site reliability engineers (SREs), and infrastructure administrators managing production Kubernetes clusters.`,
    learningObjectives: [
      "Install, configure, and upgrade production-ready multi-node Kubernetes clusters using kubeadm",
      "Deploy and scale resilient workloads with Deployments, StatefulSets, DaemonSets, and Jobs",
      "Configure cluster networking, CNI plugins, Service routing, and Ingress controllers",
      "Harden cluster security using RBAC, NetworkPolicies, pod security standards, and mTLS",
      "Troubleshoot cluster control plane components, worker nodes, and crashing container pods"
],
    prerequisites: [
      "Familiarity with Linux command-line, container fundamentals (Docker/containerd), and basic networking"
],
    outline: [
      {
            "title": "1. Cluster Architecture, Installation & Configuration (25%)",
            "items": [
                  "Control Plane Internals: kube-apiserver, kube-scheduler, kube-controller-manager, and etcd high-availability backups",
                  "Cluster Provisioning: Multi-master kubeadm setup, version upgrades, and certificate rotation"
            ]
      },
      {
            "title": "2. Workloads & Scheduling (15%)",
            "items": [
                  "Workload Objects: Deployments, rolling updates, rollbacks, StatefulSets, and DaemonSets",
                  "Scheduling Control: Node selectors, node affinity/anti-affinity, taints, tolerations, and resource limits"
            ]
      },
      {
            "title": "3. Services & Networking (20%)",
            "items": [
                  "Service Routing: ClusterIP, NodePort, LoadBalancer, and CoreDNS internal service discovery",
                  "Network Policy: Pod-to-pod firewalling with CNI plugins (Calico/Cilium) and Ingress controllers (Nginx/Traefik)"
            ]
      },
      {
            "title": "4. Storage & Security (20%)",
            "items": [
                  "Persistent Storage: StorageClasses, dynamic volume provisioning, PersistentVolumes (PV), and PVC bindings",
                  "Cluster Hardening: Role-Based Access Control (RBAC), ServiceAccounts, Secrets management, and admission controllers"
            ]
      },
      {
            "title": "5. Troubleshooting & Simulator Drill (20%)",
            "items": [
                  "Cluster Diagnostics: Kubelet logs, journalctl, container runtime crashes, and node draining maintenance",
                  "Hands-On Simulation: Timed scenarios matching the official Linux Foundation CKA/CKS performance exam"
            ]
      }
],
  }
];
