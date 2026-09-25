import { Course } from '../types';
import { ciscoCourses } from './ciscoCoursesData';

export const sampleCourses: Course[] = [
  // ===================== 1. CISCO NETWORKING TRACKS (Associate & Professional) =====================
  ...ciscoCourses,

  // ===================== 2. COMPTIA, MICROSOFT, AWS & CLOUD NATIVE TRACKS =====================
  {
    "id": "course-comptia-a-plus",
    "title": "CompTIA A+ (Core 1: 220-1101 & Core 2: 220-1102)",
    "domain": "IT Support & Operations",
    "certificationVendor": "CompTIA",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.9,
    "enrolled": 5410,
    "imageUrl": "/images/pc_hardware_workbench_1788294359055.webp",
    "imageAlt": "CompTIA A+ hardware, workstation and troubleshooting workbench",
    "summary": "The industry baseline credential for IT careers, validating foundational hardware, mobile devices, networking, operating systems, security, and operational troubleshooting.",
    "curriculum": [
      "Module 1: PC Hardware Architecture, Motherboards, RAM, Storage & Power Supplies",
      "Module 2: Network Topologies, TCP/UDP Ports, Wi-Fi Protocols & Cable Testing",
      "Module 3: Virtualization, Cloud Concepts, Mobile Devices & Print Subsystems",
      "Module 4: Windows, macOS & Linux OS Installation, Command Line & Registry Tuning",
      "Module 5: Malware Remediation, Data Security Best Practices & Customer Support"
    ],
    "overview": "CompTIA A+ is the industry standard for launching IT support and infrastructure careers. This comprehensive course prepares candidates for both Core 1 (220-1101: Hardware, Mobile Devices, Networking, Virtualization) and Core 2 (220-1102: Operating Systems, Security, Software Troubleshooting, Operational Procedures).\n\nIdeal for entry-level IT technicians, field service specialists, help desk technicians, and desktop support analysts.",
    "learningObjectives": [
      "Assemble, configure, and troubleshoot personal computer components, storage, and peripheral hardware",
      "Configure and maintain client operating systems including Windows 10/11, macOS, Linux, and ChromeOS",
      "Support basic enterprise networking and client-side virtualization",
      "Identify and remediate security threats, malware infections, and privacy vulnerabilities",
      "Follow professional operational procedures including safety, documentation, ticketing, and communication"
    ],
    "prerequisites": [
      "Basic familiarity with personal computers and operating system navigation",
      "No prior formal IT certifications required"
    ],
    "outline": [
      {
        "title": "1. Mobile Devices & Hardware Fundamentals (Core 1: 15%)",
        "items": [
          "Laptop hardware components: display types (OLED, LED), inverter, digitizer, webcam, antennas, RAM SO-DIMMs, and SSD replacement",
          "Mobile device accessories & ports: USB-C, Lightning, Micro-USB, docking stations, port replicators, and wireless charging standards",
          "Mobile connectivity: Cellular (5G/LTE), Wi-Fi, Bluetooth pairing, NFC contactless, hotspot configuration, and tethering",
          "Mobile synchronization: Mail apps, cloud storage sync (iCloud, Google Drive, OneDrive), and enterprise mobility management (EMM/MDM)"
        ]
      },
      {
        "title": "2. Networking & Network Protocols (Core 1: 20%)",
        "items": [
          "TCP/IP protocols & ports: HTTP (80), HTTPS (443), DNS (53), DHCP (67/68), SSH (22), RDP (3389), SMB (445), and SNMP (161)",
          "Network hardware: Managed vs unmanaged switches, routers, access points, patch panels, PoE injectors (802.3af/at/bt), and Ethernet termination",
          "Wireless network standards: 802.11a/b/g/n/ac/ax (Wi-Fi 6/6E), 2.4 GHz vs 5 GHz frequencies, channels, and encryption (WPA2/WPA3)",
          "IP addressing configuration: IPv4 public/private ranges (RFC 1918), subnet masks, default gateways, and IPv6 stateless autoconfiguration"
        ]
      },
      {
        "title": "3. Hardware & Peripherals (Core 1: 25%)",
        "items": [
          "Motherboards & CPUs: Form factors (ATX, micro-ATX, mini-ITX), CPU sockets (LGA, AM4/AM5), BIOS/UEFI settings, and TPM 2.0",
          "RAM & Power Supplies: DDR4 vs DDR5 speeds, multi-channel architecture, ECC vs non-ECC, wattage calculation, and modular PSU rails",
          "Storage technologies: M.2 NVMe PCIe SSDs, SATA SSDs, mechanical HDDs, optical drives, and hardware RAID levels (0, 1, 5, 10)",
          "Peripheral devices & printers: Laser, inkjet, thermal, impact printers, maintenance kits, imaging drums, and print spooler queues"
        ]
      },
      {
        "title": "4. Operating Systems & Software Troubleshooting (Core 2: 31%)",
        "items": [
          "Windows OS administration: Windows 10/11 editions, Task Manager, Event Viewer, Disk Management, Device Manager, and Services console",
          "Command-Line tools: chkdsk, sfc /scannow, DISM, ipconfig, ping, tracert, gpupdate, bootrec, and PowerShell administrative scripts",
          "macOS & Linux fundamentals: Terminal navigation, package managers (apt, dnf), sudo privileges, file permissions (chmod), and Time Machine",
          "Software troubleshooting: Resolving BSOD stop errors, DLL corruptions, malware removal workflows, boot loops, and profile repairs"
        ]
      },
      {
        "title": "5. Security & Operational Procedures (Core 2: 25%)",
        "items": [
          "Physical & Logical Security: Access badges, biometric locks, MFA tokens, BitLocker drive encryption, and NTFS vs share permissions",
          "Social engineering & Malware defense: Phishing, spear phishing, ransomware, trojans, rootkits, and antivirus quarantine protocols",
          "Operational procedures: ESD safety, documentation of changes, toxic waste disposal, incident reporting, and professional ticketing etiquette"
        ]
      }
    ],
    "examCode": "220-1101 & 220-1102"
  },
  {
    "id": "course-comptia-network-plus",
    "title": "CompTIA Network+ (N10-008 / N10-009)",
    "domain": "IT Support & Operations",
    "certificationVendor": "CompTIA",
    "skillLevel": "Intermediate",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.8,
    "enrolled": 3890,
    "imageUrl": "/images/cisco_network_map_1787771488810.webp",
    "imageAlt": "CompTIA Network+ enterprise network infrastructure training",
    "summary": "Master vendor-neutral networking concepts including network architecture, IP subnets, routing protocols, wireless standards, network operations, and security.",
    "curriculum": [
      "Module 1: Networking Fundamentals, OSI Model, Encapsulation & Subnetting Math",
      "Module 2: Physical Network Infrastructure, Copper, Fiber & Data Center Cabling",
      "Module 3: Routing Concepts, Switching, VLANs & Software-Defined Networking (SDN)",
      "Module 4: Network Security Controls, Firewalls, IDS/IPS & Threat Hardening",
      "Module 5: Network Troubleshooting Methodology, Packet Analysis & Wireshark"
    ],
    "overview": "CompTIA Network+ validates the technical knowledge required to securely establish, maintain, and troubleshoot the essential networks that businesses rely on. The curriculum covers both traditional wired/wireless architectures and modern cloud-integrated software-defined networks.\n\nDesigned for network technicians, network administrators, and systems engineers seeking an industry-wide recognized credential without vendor lock-in.",
    "learningObjectives": [
      "Design and implement functional enterprise networks with proper IP addressing and subnetting",
      "Configure, manage, and maintain essential network devices including switches, routers, and firewalls",
      "Implement network security, standards, and protocols to protect data in transit",
      "Determine network bottlenecks, identify hardware and software issues, and execute the 7-step troubleshooting method",
      "Integrate cloud networking services, SDN controllers, and automation scripts"
    ],
    "prerequisites": [
      "CompTIA A+ certification or equivalent knowledge",
      "Minimum 9–12 months of hands-on networking support or administration experience",
      "Familiarity with basic PC hardware and operating systems"
    ],
    "outline": [
      {
        "title": "1. Networking Fundamentals (24%)",
        "items": [
          "OSI & TCP/IP stack: Encapsulation/decapsulation across 7 layers, PDUs (bits, frames, packets, segments, data), and network topologies",
          "IP Addressing & Subnetting: IPv4 CIDR notation, VLSM calculations, broadcast domains, APIPA (169.254.x.x), and IPv6 address types",
          "Core Network Services: DNS record types (A, AAAA, CNAME, MX, PTR, TXT, SOA), DHCP lease process (DORA), and NTP synchronization",
          "Common Ports & Protocols: SSH, Telnet, FTP/SFTP, TFTP, SMTP, POP3/IMAP, SNMP, LDAP/LDAPS, and BGP/OSPF dynamic routing"
        ]
      },
      {
        "title": "2. Network Implementations (19%)",
        "items": [
          "Switching & Layer 2 Technologies: VLAN segmentation, 802.1Q trunking, Spanning Tree (STP/RSTP), port aggregation (LACP), and LLDP",
          "Wireless Technologies: Wi-Fi 6 (802.11ax), Wi-Fi 6E (6 GHz), antenna polarization (omnidirectional vs directional), and MIMO/MU-MIMO",
          "Routing Technologies: Routing tables, longest prefix match, administrative distance, static vs dynamic routing, and default routes",
          "Physical Media & Cabling: Cat 5e/6/6a/7, single-mode vs multimode fiber (OS2 vs OM3/OM4), transceivers (SFP, SFP+, QSFP), and punch-down blocks"
        ]
      },
      {
        "title": "3. Network Operations (16%)",
        "items": [
          "Network Monitoring & Observability: SNMP monitoring (v2c vs v3), NetFlow/sFlow traffic profiling, syslog levels, and packet flow analyzers",
          "Network Documentation: Physical & logical network diagrams, rack elevation schematics, IP address management (IPAM), and baselines",
          "High Availability & Disaster Recovery: First Hop Redundancy (HSRP/VRRP), dual homing, link aggregation, UPS power sizing, and SLA metrics"
        ]
      },
      {
        "title": "4. Network Security (19%)",
        "items": [
          "Defense-in-Depth & Zero Trust: Network micro-segmentation, DMZ architectures, stateful firewalls, and next-gen deep packet inspection",
          "Authentication & Access Control: 802.1X port security, RADIUS, TACACS+, captive portals, MAC filtering, and multi-factor authentication",
          "Threat Detection & Mitigation: Detecting ARP poisoning, rogue DHCP servers, evil twins, DNS poisoning, and SYN flood DDoS attacks",
          "Secure Remote Access: Site-to-site IPsec VPNs (IKEv2), client-to-site SSL/TLS VPNs, WireGuard, and bastion host jump boxes"
        ]
      },
      {
        "title": "5. Network Troubleshooting (22%)",
        "items": [
          "Troubleshooting Methodology: The CompTIA 7-step troubleshooting model from problem identification to establishing theories and documenting",
          "Hardware & Cable Diagnostics: Cable testers, tone generators, time-domain reflectometers (TDR/OTDR), and optical light meters",
          "Command-Line Software Utilities: ping, traceroute/tracert, mtr, nslookup/dig, netstat/ss, arp, route, ipconfig/ifconfig, and Wireshark",
          "Common Network Issue Resolution: Attenuation, crosstalk, duplex/speed mismatch, IP conflicts, MTU black holes, and DNS resolution failures"
        ]
      }
    ],
    "examCode": "N10-008 / N10-009"
  },
  {
    "id": "course-comptia-security-plus",
    "title": "CompTIA Security+ South Africa (SY0-701 Training & Certification)",
    "domain": "Cybersecurity",
    "certificationVendor": "CompTIA",
    "skillLevel": "Intermediate",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.9,
    "enrolled": 6150,
    "imageUrl": "/images/comptia_security_soc_1787771516564.webp",
    "imageAlt": "CompTIA Security+ South Africa cybersecurity training bootcamp",
    "summary": "Premier CompTIA Security+ (SY0-701) training and certification bootcamp in South Africa, Johannesburg, Pretoria & Cape Town. Master threat vectors, zero trust architecture, and incident response.",
    "curriculum": [
      "Module 1: General Security Concepts, CIA Triad, Zero Trust & Cryptography",
      "Module 2: Threat Vectors, Vulnerabilities, Social Engineering & Malware Types",
      "Module 3: Security Architecture, Network Segmentation, Firewalls & Cloud Controls",
      "Module 4: Security Operations, SIEM/SOAR Monitoring, Incident Response & Forensics",
      "Module 5: Governance, Risk Management, Compliance (ISO/NIST) & Mock Exam"
    ],
    "overview": "CompTIA Security+ (SY0-701) is the global benchmark for foundational cybersecurity skills, validating baseline competence in identifying security threats, designing resilient architectures, and implementing incident response protocols. The updated SY0-701 exam addresses the current threat landscape, focusing on Zero Trust, IoT/OT environments, cloud deployments, and compliance frameworks.\n\nThis course is engineered for cybersecurity analysts, network administrators, and IT professionals seeking DoD 8140/8570 compliance and essential cybersecurity credentials.",
    "learningObjectives": [
      "Assess the security posture of enterprise environments and recommend solutions",
      "Monitor and secure hybrid environments including cloud, mobile, IoT, and operational technology (OT)",
      "Operate with an awareness of applicable laws and policies, including governance, risk, and compliance (GRC)",
      "Identify, analyze, and respond to security events and incidents using modern SIEM and SOAR tools",
      "Implement identity, access, and cryptographic controls aligned with Zero Trust principles"
    ],
    "prerequisites": [
      "CompTIA Network+ certification or equivalent networking knowledge",
      "At least two years of experience in personal computer or network administration",
      "Familiarity with basic security concepts, networking protocols, and operating systems"
    ],
    "outline": [
      {
        "title": "1. General Security Concepts (12%)",
        "items": [
          "Security Controls: Technical, administrative, physical, preventive, detective, corrective, compensating, and directive controls",
          "Fundamental Security Principles: Confidentiality, integrity, availability (CIA triad), non-repudiation, and zero trust architecture",
          "Change & Asset Management: Secure baselines, change advisory boards (CAB), rollback strategies, and hardware/software inventories",
          "Cryptographic Concepts: Symmetric ciphers (AES-256), asymmetric algorithms (RSA, ECC), hashing (SHA-2/3), HMAC, and PKI certificate lifecycle"
        ]
      },
      {
        "title": "2. Threats, Vulnerabilities & Mitigations (22%)",
        "items": [
          "Threat Actors & Vectors: Nation-state APTs, hacktivists, organized cybercrime, malicious insiders, supply chain attacks, and Shadow IT",
          "Social Engineering & Deception: Phishing, spear phishing, whaling, vishing, business email compromise (BEC), and pretexting",
          "Vulnerability Classification: CVE tracking, CVSS v3.1 scoring, zero-day vulnerabilities, buffer overflows, injection attacks, and misconfigurations",
          "Attack Mitigation Strategies: Automated patch management, application allowlisting, segmentation, and endpoint detection & response (EDR)"
        ]
      },
      {
        "title": "3. Security Architecture (18%)",
        "items": [
          "Security Models & Topologies: Zero Trust architecture, Secure Access Service Edge (SASE), Software-Defined Perimeter (SDP), and air-gapped networks",
          "Infrastructure Resilience: Cloud vs hybrid architectures, container security (Docker/Kubernetes), microservices, and serverless protections",
          "Data Protection & Privacy: Data loss prevention (DLP), data classification (public, internal, confidential, restricted), tokenization, and DRM",
          "High Availability & Recovery: Disaster recovery planning, hot/warm/cold sites, geographic redundancy, RTO/RPO metrics, and RAID arrays"
        ]
      },
      {
        "title": "4. Security Operations (28%)",
        "items": [
          "System Hardening: Operating system baselines, disabling unneeded services/ports, local account policies, and Group Policy Objects (GPO)",
          "Identity & Access Management: Multi-factor authentication (FIDO2/WebAuthn), SAML, OAuth 2.0, OpenID Connect, and Privileged Access Management (PAM)",
          "Security Monitoring & SIEM/SOAR: Centralized log aggregation, SIEM correlation rules, SOAR automated playbooks, and user behavior analytics (UEBA)",
          "Incident Response Lifecycle: Preparation, detection and analysis, containment, eradication, recovery, and post-incident lessons learned"
        ]
      },
      {
        "title": "5. Security Program Management & Oversight (20%)",
        "items": [
          "Governance Frameworks: NIST Cybersecurity Framework (CSF), ISO/IEC 27001, CIS Critical Security Controls, and SOC 2 Type II audits",
          "Regulatory Compliance: GDPR, HIPAA, PCI DSS, SOX, and cross-border data transfer compliance obligations",
          "Risk Assessment & Management: Qualitative vs quantitative risk calculation (SLE, ARO, ALE), risk tolerance, and third-party vendor risk audits",
          "Security Awareness & Training: Phishing simulations, data handling procedures, insider threat identification, and role-based training"
        ]
      }
    ],
    "examCode": "SY0-701"
  },
  {
    "id": "course-comptia-cloud-plus",
    "title": "CompTIA Cloud+ (CV0-004)",
    "domain": "Cloud Computing",
    "certificationVendor": "CompTIA",
    "skillLevel": "Intermediate",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.8,
    "enrolled": 2450,
    "imageUrl": "/images/comptia_cloud_multicloud_1788294616227.webp",
    "imageAlt": "CompTIA Cloud+ multi-cloud enterprise infrastructure training",
    "summary": "Deploy, secure, automate, and optimize enterprise cloud infrastructure across AWS, Azure, and Google Cloud environments.",
    "curriculum": [
      "Module 1: Cloud Architecture, High Availability Design & Storage Provisioning",
      "Module 2: Virtualization & Compute Deployment (Containers, VMs, Hypervisors)",
      "Module 3: Cloud Security, Zero Trust, Identity Federation & Key Management",
      "Module 4: Cloud Operations, Terraform Automation, CI/CD & Orchestration",
      "Module 5: Multi-Cloud Disaster Recovery, Cost Optimization & Capstone"
    ],
    "overview": "CompTIA Cloud+ (v4) is a vendor-neutral, performance-based certification that validates the technical skills required to deploy, secure, automate, and optimize cloud infrastructure and services. The updated exam (CV0-004) reflects real-world cloud job roles with a stronger emphasis on DevOps, orchestration, containerization, and multi-cloud environments.\n\nThis course is ideal for cloud engineers, systems administrators, and DevOps professionals working in enterprise or hybrid cloud settings.",
    "learningObjectives": [
      "Evaluate and apply the right cloud architecture models (public, private, hybrid, multicloud)",
      "Deploy and manage cloud-based infrastructure using automation and orchestration",
      "Secure cloud environments with IAM, vulnerability management, and compliance standards",
      "Implement DevOps practices like CI/CD pipelines and event-driven architectures",
      "Monitor, optimize, and troubleshoot cloud systems for reliability and cost-efficiency"
    ],
    "prerequisites": [
      "2–3 years of experience in systems administration, networking, or cloud operations",
      "Familiarity with virtualization, scripting, and basic security concepts",
      "CompTIA Network+ or Server+ (recommended but not mandatory)"
    ],
    "outline": [
      {
        "title": "1. Cloud Architecture & Design (13%)",
        "items": [
          "Cloud Deployment Models: Public, private, hybrid, community, and multi-cloud architectures",
          "Cloud Service Models: IaaS, PaaS, SaaS, and serverless Function-as-a-Service (FaaS) abstractions",
          "Scalability & High Availability: Horizontal vs vertical scaling, elasticity, auto-scaling groups, and multi-region failover",
          "Cloud Migration Strategies: The 6 Rs (Rehost, Replatform, Refactor, Repurchase, Retain, Retire) and data transfer mechanisms"
        ]
      },
      {
        "title": "2. Cloud Security & Compliance (19%)",
        "items": [
          "Shared Responsibility Model: Provider vs consumer responsibilities across IaaS, PaaS, and SaaS workloads",
          "Identity & Access Management: Identity federation (SAML/OIDC), role-based access control (RBAC), and privileged access management",
          "Data Protection: Encryption in transit (TLS 1.3), encryption at rest (AES-256), envelope encryption, and cloud HSM key management",
          "Compliance & Audit: SOC 1/2/3, ISO 27017/27018, Cloud Security Alliance (CSA) STAR, and automated compliance auditing"
        ]
      },
      {
        "title": "3. Cloud Deployment & Provisioning (23%)",
        "items": [
          "Compute Provisioning: Virtual machines, bare metal instances, GPU compute, and container runtime orchestration",
          "Storage Provisioning: Block storage (SAN/EBS), file storage (NFS/SMB), object storage (S3/Blob), and IOPS/throughput tiering",
          "Network Provisioning: Software-defined networking (SDN), Virtual Private Clouds (VPC/VNet), subnets, NAT gateways, and peering",
          "Infrastructure as Code (IaC): Declarative templates (Terraform, CloudFormation, ARM/Bicep), GitOps pipelines, and idempotency"
        ]
      },
      {
        "title": "4. Cloud Operations & Support (22%)",
        "items": [
          "Performance Monitoring: System metrics (CPU, memory, disk, network), synthetic transactions, and real-time application APM",
          "Patching & Maintenance: Blue/green deployments, canary releases, rolling updates, and automated OS patching schedules",
          "Backup & Disaster Recovery: Snapshot policies, cross-region replication, backup vault locks, and testing RPO/RTO restoration",
          "FinOps & Cost Optimization: Reserved instances, savings plans, unattached volume cleanup, and budget alert policies"
        ]
      },
      {
        "title": "5. Cloud Troubleshooting (23%)",
        "items": [
          "Compute & OS Diagnostics: CPU throttling, memory leaks, runaway processes, kernel panics, and hypervisor resource contention",
          "Storage & Data Issues: Disk exhaustion, IOPS bottlenecks, permission access denied errors, and replication latency",
          "Network & Connectivity Issues: Misconfigured security groups/firewall rules, routing table black holes, and DNS resolution failures",
          "Security & Access Issues: Expired SSL/TLS certificates, misconfigured IAM policies, CORS errors, and API authentication failures"
        ]
      }
    ],
    "examCode": "CV0-003 / CV0-004"
  },
  {
    "id": "course-comptia-cloud-essentials",
    "title": "CompTIA Cloud Essentials+ (CLO-002)",
    "domain": "Cloud Computing",
    "certificationVendor": "CompTIA",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "duration": "5 Days (30 Hours)",
    "rating": 4.7,
    "enrolled": 1890,
    "imageUrl": "/images/cloud_essentials_business_1788294640468.webp",
    "imageAlt": "CompTIA Cloud Essentials business decision making and governance training",
    "summary": "Empower technical and business leaders to make informed cloud computing decisions, evaluate cloud financial ROI, manage vendor SLAs, and ensure compliance.",
    "curriculum": [
      "Module 1: Principles of Cloud Computing & Deployment Models (Public, Private, Hybrid)",
      "Module 2: Business Drivers, Total Cost of Ownership (TCO) & Cloud Migration ROI",
      "Module 3: Managing Cloud Service Providers, SLAs & Vendor Lock-In Mitigation",
      "Module 4: Cloud Security Frameworks, Shared Responsibility & Data Sovereignty",
      "Module 5: Cloud Financial Governance (FinOps) & Executive Assessment Review"
    ],
    "overview": "CompTIA Cloud Essentials+ (CLO-002) is geared toward business stakeholders, technical team leaders, and IT professionals who need to make informed cloud service decisions. The course bridges the gap between commercial business value and technical cloud operations.\n\nIdeal for business analysts, project managers, technical sales teams, and IT professionals planning enterprise cloud migrations.",
    "learningObjectives": [
      "Analyze the business value, costs, and risks associated with cloud adoption",
      "Compare cloud service (IaaS, PaaS, SaaS) and deployment (public, private, hybrid) models",
      "Formulate cloud migration strategies and business continuity plans",
      "Manage cloud security, governance, regulatory compliance, and vendor relationships"
    ],
    "prerequisites": [
      "Basic business acumen and general familiarity with computer hardware and networking concepts"
    ],
    "outline": [
      {
        "title": "1. Principles of Cloud Computing (17%)",
        "items": [
          "Fundamental Cloud Characteristics: On-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service",
          "Cloud Service & Delivery Models: Differentiating IaaS, PaaS, SaaS, and XaaS business use cases and total cost of ownership (TCO)",
          "Cloud Deployment Architectures: Public, private, hybrid, and multi-cloud strategies for modern digital transformation",
          "Cloud Storage Concepts: Block, file, and object storage use cases, cold vs hot storage tiers, and archival data retention"
        ]
      },
      {
        "title": "2. Cloud Networking & Security Concepts (25%)",
        "items": [
          "Network Connectivity: Virtual private networks (VPN), direct dedicated circuits (Direct Connect/ExpressRoute), and bandwidth sizing",
          "Shared Responsibility: Demarcation points between cloud service provider and customer for data, OS, network, and application layers",
          "Authentication & Access Controls: Single sign-on (SSO), multi-factor authentication (MFA), role-based access control, and least privilege",
          "Security Measures: Web application firewalls (WAF), anti-DDoS protections, data encryption at rest and in transit, and security baselines"
        ]
      },
      {
        "title": "3. Managing Cloud Services & Operations (28%)",
        "items": [
          "Resource Management: Automated provisioning, resource tagging strategies, lifecycle policies, and cloud resource de-provisioning",
          "Monitoring & Reporting: Health dashboards, service-level agreements (SLAs), uptime guarantees, and incident escalation procedures",
          "Business Continuity: Automated backups, disaster recovery strategies, recovery point objective (RPO), and recovery time objective (RTO)",
          "Migration Feasibility: Application dependencies, pilot testing, proof of concept (PoC), and evaluating legacy workload compatibility"
        ]
      },
      {
        "title": "4. Business Aspects of Cloud Computing (30%)",
        "items": [
          "Financial Considerations: Capital expenditures (CapEx) vs operational expenditures (OpEx), cloud consumption models, and chargeback/showback",
          "Vendor Management: Request for proposal (RFP) evaluations, contract negotiation, vendor lock-in mitigation, and exit strategies",
          "Governance, Risk & Compliance: Regulatory compliance (GDPR, HIPAA, PCI DSS), internal audits, data sovereignty, and jurisdiction laws",
          "Strategic Value Realization: Accelerating time to market, global reach, organizational agility, and fostering innovation culture"
        ]
      }
    ],
    "examCode": "CLO-002"
  },
  {
    "id": "course-comptia-server-plus",
    "title": "CompTIA Server+ (SK0-005)",
    "domain": "IT Support & Operations",
    "certificationVendor": "CompTIA",
    "skillLevel": "Intermediate",
    "format": "Live Online",
    "duration": "5 Days (40 Hours)",
    "rating": 4.8,
    "enrolled": 2120,
    "imageUrl": "/images/linux_datacenter_admin_1788294344630.webp",
    "imageAlt": "CompTIA Server+ enterprise datacenter hardware training",
    "summary": "Master enterprise server administration, hardware installation, virtualization, RAID storage architecture, disaster recovery, and data center operations.",
    "curriculum": [
      "Module 1: Server Hardware Installation, Rack Systems, IPMI & Power Redundancy",
      "Module 2: Storage Architectures, Hardware RAID, SAS/NVMe & Fibre Channel SANs",
      "Module 3: Virtualization Hosts (VMware ESXi & Proxmox) & High Availability",
      "Module 4: Server Security Hardening, PKI Certificates, MFA & Physical Security",
      "Module 5: Server Disaster Recovery, Backup Restoration & Hardware Diagnostics"
    ],
    "overview": "CompTIA Server+ (SK0-005) validates the hands-on skills required to build, maintain, and troubleshoot server hardware and software in data centers and cloud hosting facilities.\n\nTargeted at server administrators, data center technicians, storage administrators, and hardware support engineers.",
    "learningObjectives": [
      "Install, configure, and manage high-performance server hardware, storage controllers, and peripherals",
      "Manage server administration, virtualization hypervisors, and storage area networks (SAN/NAS)",
      "Implement enterprise server security, access controls, and environmental hardening",
      "Diagnose and troubleshoot complex hardware, OS, networking, and storage failures"
    ],
    "prerequisites": [
      "CompTIA A+ or equivalent experience with PC hardware and basic networking",
      "18–24 months hands-on experience in server and hardware environments"
    ],
    "outline": [
      {
        "title": "1. Server Hardware Installation & Management (18%)",
        "items": [
          "Server Form Factors & Racks: Rack-mount servers (1U-4U), blade chassis, tower servers, rail kits, cable management arms, and PDU balancing",
          "Central Processing & Memory: Multi-socket server CPUs (Intel Xeon, AMD EPYC), NUMA architecture, DDR4/DDR5 ECC registered RDIMMs/LRDIMMs",
          "Server Storage Architecture: SAS vs SATA vs NVMe interfaces, hardware RAID controllers with battery-backed cache, and RAID levels (0, 1, 5, 6, 10, 50, 60)",
          "Out-of-Band (OOB) Management: Dell iDRAC, HPE iLO, Lenovo XClarity, IPMI, virtual media redirection, and headless server recovery"
        ]
      },
      {
        "title": "2. Server Administration & Virtualization (30%)",
        "items": [
          "Server Operating Systems: Windows Server 2022/2025 installation, Linux server distributions (RHEL, Ubuntu Server), and headless administration",
          "Directory Services & Infrastructure: Active Directory Domain Services (AD DS), DNS, DHCP failover, Group Policy, and LDAP authentication",
          "Hypervisor Virtualization: Type 1 bare-metal hypervisors (VMware ESXi, Microsoft Hyper-V, Proxmox VE), vSwitch configuration, and VM templates",
          "Storage Area Networks (SAN) & NAS: iSCSI target/initiator configuration, Fibre Channel (FC), multipathing (MPIO), and shared cluster storage"
        ]
      },
      {
        "title": "3. Security & Disaster Recovery (24%)",
        "items": [
          "Physical & Hardware Security: Chassis intrusion sensors, Kensington locks, locking server racks, secure boot, and TPM 2.0 cryptoprocessors",
          "Server Hardening: Disabling legacy protocols (SMBv1, TLS 1.0/1.1), firewall rule configuration, CIS security benchmarks, and vulnerability patching",
          "Backup Architecture: Full, incremental, differential backups, 3-2-1 backup rule, immutable backup repositories, and snapshot management",
          "Disaster Recovery Planning: Site-to-site replication, clustering failover nodes, high availability (HA), fault tolerance (FT), and RPO/RTO validation"
        ]
      },
      {
        "title": "4. Server Troubleshooting (28%)",
        "items": [
          "Hardware Diagnostic Procedures: POST beep codes, front-panel error LED codes, hardware diagnostic utilities, and thermal shutdown diagnosis",
          "Storage & RAID Troubleshooting: Rebuilding degraded RAID arrays, replacing predictive failure drives, hot-spare activation, and filesystem repairs",
          "Operating System & Service Diagnostics: Resolving blue screens, kernel panics, failed system services, resource deadlocks, and driver corruption",
          "Network & Performance Bottlenecks: NIC teaming / bonding failures, VLAN tagging mismatch, CPU throttling, and RAM memory leak isolation"
        ]
      }
    ],
    "examCode": "SK0-005"
  },
  {
    "id": "course-comptia-pentest-plus",
    "title": "CompTIA PenTest+ (PT0-002)",
    "domain": "Cybersecurity",
    "certificationVendor": "CompTIA",
    "skillLevel": "Advanced",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.9,
    "enrolled": 2310,
    "imageUrl": "/images/ethical_hacking_pentest_1788294329039.webp",
    "imageAlt": "CompTIA PenTest+ offensive security and ethical hacking laboratory preview",
    "summary": "Conduct end-to-end vulnerability assessments and penetration tests across network, web, cloud, and active directory environments with hands-on ethical hacking tools.",
    "curriculum": [
      "Module 1: Penetration Testing Scoping, Rules of Engagement & Passive Reconnaissance",
      "Module 2: Active Scanning, Vulnerability Identification (Nmap, Nessus) & Enumeration",
      "Module 3: Web App Exploitation (OWASP Top 10), SQL Injection, XSS & API Hacking",
      "Module 4: Network Attacks, Active Directory Privilege Escalation & Lateral Movement",
      "Module 5: Post-Exploitation, Report Writing, Remediation Guidance & Mock Exam"
    ],
    "overview": "CompTIA PenTest+ (PT0-002) is designed for cybersecurity professionals tasked with penetration testing and vulnerability management. It assesses vulnerability scanning, planning, reconnaissance, weaponization, exploitation, and comprehensive post-exploitation reporting.\n\nIdeal for penetration testers, security consultants, vulnerability analysts, and ethical hackers.",
    "learningObjectives": [
      "Plan and scope formal penetration testing engagements following ethical and legal guidelines",
      "Conduct passive and active information gathering using OSINT, Nmap, and vulnerability scanners",
      "Exploit network, host, web application, and cloud vulnerabilities with modern tools",
      "Perform post-exploitation tasks, privilege escalation, lateral movement, and report findings"
    ],
    "prerequisites": [
      "CompTIA Security+ and Network+ or equivalent cybersecurity experience",
      "3–4 years of hands-on information security or technical support experience"
    ],
    "outline": [
      {
        "title": "1. Planning and Scoping (14%)",
        "items": [
          "Regulatory & Legal Frameworks: Rules of Engagement (RoE), Statement of Work (SOW), nondisclosure agreements (NDA), and legal authorization",
          "Scoping Elements: Target IP ranges, domains, APIs, internal vs external boundaries, testing windows, and third-party cloud provider permission",
          "Assessment Methodologies: Black-box, white-box, and gray-box penetration testing approaches, and compliance-driven penetration testing"
        ]
      },
      {
        "title": "2. Information Gathering and Vulnerability Identification (22%)",
        "items": [
          "Open-Source Intelligence (OSINT): Passive reconnaissance using Shodan, Censys, theHarvester, WHOIS, DNS enumeration, and social media mining",
          "Active Scanning & Footprinting: Nmap port scanning techniques (SYN, UDP, ACK, Xmas), service version detection, and OS fingerprinting",
          "Vulnerability Scanning: Nessus, OpenVAS, Qualys, false positive triage, and credentialed vs non-credentialed vulnerability assessments"
        ]
      },
      {
        "title": "3. Attacks and Exploits (30%)",
        "items": [
          "Network Exploitation: Man-in-the-middle attacks, ARP spoofing, pass-the-hash, Kerberoasting, LLMNR/NBT-NS poisoning, and lateral movement",
          "Web Application Attacks: OWASP Top 10 exploits, SQL injection (SQLi), Cross-Site Scripting (XSS), CSRF, SSRF, and broken access control",
          "Wireless & RF Attacks: Deauthentication attacks, WPA2/WPA3 handshake capture, evil twin rogue APs, and WPS brute-forcing",
          "Social Engineering & Physical Attacks: Credential harvesting, phishing campaigns, badge cloning, tailgating, and rubber ducky keystroke injection"
        ]
      },
      {
        "title": "4. Reporting and Communication (18%)",
        "items": [
          "Report Generation: Comprehensive technical findings, executive summaries, risk prioritization using CVSS metrics, and business impact analysis",
          "Remediation Guidance: Actionable mitigation strategies, hardening baselines, code patches, and secure architecture recommendations",
          "Post-Engagement Activities: Secure evidence destruction, restoring modified configurations, removing test accounts/backdoors, and retesting"
        ]
      },
      {
        "title": "5. Tools and Code Analysis (16%)",
        "items": [
          "Penetration Testing Frameworks: Metasploit Framework, Cobalt Strike concepts, Burp Suite Professional, OWASP ZAP, and Hydra",
          "Scripting & Automation: Analyzing and customizing exploit scripts in Python, Bash, and PowerShell for automated payload delivery",
          "Privilege Escalation: Exploiting SUID binaries, misconfigured sudoers, unquoted service paths, Windows token impersonation, and kernel exploits"
        ]
      }
    ],
    "examCode": "PT0-002"
  },
  {
    "id": "course-comptia-linux-plus",
    "title": "CompTIA Linux+ (XK0-005)",
    "domain": "IT Support & Operations",
    "certificationVendor": "CompTIA",
    "skillLevel": "Intermediate",
    "format": "Live Online",
    "duration": "5 Days (40 Hours)",
    "rating": 4.8,
    "enrolled": 2780,
    "imageUrl": "/images/linux_datacenter_admin_1788294344630.webp",
    "imageAlt": "CompTIA Linux+ enterprise systems administration preview",
    "summary": "Master enterprise Linux systems administration, kernel tuning, storage management, security hardening, automated Bash scripting, and container deployment.",
    "curriculum": [
      "Module 1: Linux Architecture, Boot Process (systemd), Kernel Modules & Package Management",
      "Module 2: Storage Configuration (LVM, XFS/EXT4), File Permissions & Quotas",
      "Module 3: Network Configuration, SSH Hardening, Firewalld & SELinux / AppArmor",
      "Module 4: Bash Scripting, Cron Automation, Git Version Control & Docker Containers",
      "Module 5: System Troubleshooting, Log Analysis (journalctl) & Certification Prep"
    ],
    "overview": "CompTIA Linux+ (XK0-005) validates the foundational competencies required to support enterprise Linux distributions that power modern cloud architectures, containers, and data centers.\n\nDesigned for Linux systems administrators, DevOps engineers, cloud support specialists, and platform engineers.",
    "learningObjectives": [
      "Configure Linux kernel modules, storage partitions, logical volumes (LVM), and network interfaces",
      "Manage user accounts, file permissions (POSIX & ACLs), and security policies (SELinux/AppArmor)",
      "Automate system administration tasks using Bash shell scripting, Git, and cron schedulers",
      "Troubleshoot Linux system performance, kernel crashes, service logs, and network connectivity"
    ],
    "prerequisites": [
      "CompTIA A+, Network+, or 12 months hands-on Linux experience"
    ],
    "outline": [
      {
        "title": "1. System Management (32%)",
        "items": [
          "Kernel & Hardware Configuration: Kernel modules (lsmod, modprobe, rmmod), /proc and /sys filesystems, udev rules, and dmesg diagnostics",
          "Storage & Filesystems: Partitioning with fdisk/parted, LVM volume management (PV, VG, LV), ext4/XFS filesystems, and /etc/fstab mounting",
          "Process & Service Control: Systemd unit management (systemctl), journald logging, cron/anacron task scheduling, and process signals (kill, pkill)",
          "Software Package Management: RPM, DNF, YUM, DEB, APT, repository configuration, package verification, and building software from source"
        ]
      },
      {
        "title": "2. Security & Access Control (21%)",
        "items": [
          "File Permissions & Ownership: Standard permissions (rwx), octal notation, SUID, SGID, sticky bit, umask defaults, and chown/chmod",
          "Access Control Lists & Mandatory Access: POSIX ACLs (getfacl, setfacl), SELinux modes/contexts (semanage, restorecon), and AppArmor profiles",
          "Authentication & PAM: Pluggable Authentication Modules (/etc/pam.d), /etc/passwd, /etc/shadow, SSH key-based authentication, and sudo configuration",
          "Host Firewalls & Hardening: Firewalld zones, UFW, nftables, iptables rule sets, fail2ban intrusion prevention, and port auditing with ss"
        ]
      },
      {
        "title": "3. Deployment, Networking & Automation (19%)",
        "items": [
          "Network Configuration: NetworkManager (nmcli), iproute2 suite (ip addr, ip route), hostnamectl, /etc/resolv.conf, and static IP configuration",
          "Shell Scripting: Bash programming, variables, conditional statements (if/case), loops (for/while), exit codes, and regular expressions (grep, sed, awk)",
          "Git Version Control: Git repository initialization, commits, branching, merging, remote synchronization, and basic developer workflows",
          "Infrastructure as Code & Containers: Basic container operations with Docker/Podman, container registries, Dockerfiles, and Ansible playbook execution"
        ]
      },
      {
        "title": "4. Linux Troubleshooting (28%)",
        "items": [
          "Boot Process Troubleshooting: BIOS/UEFI boot flow, GRUB2 bootloader recovery, emergency/rescue target boot, and initramfs repair",
          "Storage & Filesystem Recovery: Resolving disk full conditions, fixing filesystem corruption with fsck, recovering missing LVM volumes, and swap space",
          "Network Diagnostics: Resolving interface flapping, routing table issues, DNS lookup failures, socket exhaustion, and packet capture with tcpdump",
          "Performance & Resource Bottlenecks: Identifying CPU starvation, memory leaks (OOM killer), disk I/O wait (iostat, vmstat), and top/htop analysis"
        ]
      }
    ],
    "examCode": "XK0-005"
  },
  {
    "id": "course-comptia-itf-plus",
    "title": "CompTIA ITF+ (IT Fundamentals FC0-U61)",
    "domain": "IT Support & Operations",
    "certificationVendor": "CompTIA",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "duration": "5 Days (30 Hours)",
    "rating": 4.8,
    "enrolled": 3100,
    "imageUrl": "/images/pc_hardware_workbench_1788294359055.webp",
    "imageAlt": "CompTIA IT Fundamentals beginner training preview",
    "summary": "The ideal introduction to technology, covering core computing devices, infrastructure, software development basics, database concepts, and fundamental cybersecurity.",
    "curriculum": [
      "Module 1: Computing Basics, Internal Components (CPU, RAM, GPU) & Input/Output Devices",
      "Module 2: Infrastructure, Wi-Fi Setup, Internet Services & Basic Networking",
      "Module 3: Applications, Operating Systems, File Management & Software Licensing",
      "Module 4: Software Development Concepts (Variables, Logic) & Relational Databases (SQL)",
      "Module 5: Cybersecurity Best Practices, Password Security & ITF+ Certification Prep"
    ],
    "overview": "CompTIA IT Fundamentals (ITF+ FC0-U61) is the essential launchpad for anyone considering an IT career or looking to establish digital literacy across hardware, software, databases, security, and networking.\n\nIdeal for students, career changers, non-technical managers, and entry-level technology enthusiasts.",
    "learningObjectives": [
      "Understand core computing concepts, hexadecimal/binary notations, and processing speed units",
      "Identify internal computer hardware, peripheral connections, and storage types",
      "Compare common operating systems, mobile platforms, and software application types",
      "Explain basic database concepts, structured vs unstructured data, and cybersecurity hygiene"
    ],
    "prerequisites": [
      "Basic English reading skills and curiosity about modern computing"
    ],
    "outline": [
      {
        "title": "1. IT Concepts and Terminology (17%)",
        "items": [
          "Computing Basics: Notational systems (binary, decimal, hexadecimal), data representations, bits, bytes, kilobytes, gigabytes, and terabytes",
          "Processing & Information Flow: Input, processing, output, and storage cycle across personal computers, mobile devices, and cloud services",
          "Value of Data & Information: Digital assets, intellectual property, importance of schema organization, and business intelligence insights"
        ]
      },
      {
        "title": "2. Infrastructure Fundamentals (22%)",
        "items": [
          "Computer Components & Peripherals: Motherboard architecture, CPU cores, RAM vs storage, expansion slots, cooling systems, and power supplies",
          "Device Interfaces & Connectors: USB standards (USB 2.0, 3.0, Type-C), HDMI, DisplayPort, VGA, DVI, Ethernet RJ-45, and audio jacks",
          "Networking Concepts: Local Area Networks (LAN), WAN, PAN, wireless vs wired connectivity, routers, switches, and broadband modems"
        ]
      },
      {
        "title": "3. Applications and Software (18%)",
        "items": [
          "Operating System Architecture: Purpose and functions of operating systems (Windows, macOS, Linux, ChromeOS, iOS, Android)",
          "Software Types: Productivity software, collaboration tools, business software, web browsers, media players, and system utility tools",
          "Software Installation & Licensing: Single-user, multi-user, open-source vs proprietary licensing, subscription SaaS models, and patch updates"
        ]
      },
      {
        "title": "4. Software Development Fundamentals (12%)",
        "items": [
          "Programming Languages: Compiled vs interpreted languages (C++, Java, Python, JavaScript), scripting languages, and HTML/CSS web markup",
          "Programming Logic & Structure: Variables, data types (integer, float, string, boolean), arrays, conditional branching (if/then/else), and loops"
        ]
      },
      {
        "title": "5. Database Fundamentals (11%)",
        "items": [
          "Database Concepts: Purpose of databases, flat-file vs relational databases, records, fields, tables, primary keys, and foreign keys",
          "Querying & Data Access: Structured Query Language (SQL) basics: SELECT, INSERT, UPDATE, DELETE commands, and relational schema integrity"
        ]
      },
      {
        "title": "6. Security Fundamentals (20%)",
        "items": [
          "Confidentiality, Integrity & Availability: CIA triad fundamentals, data privacy laws, threat actors, and common cyber attack vectors",
          "Device & Account Protection: Strong password policies, multi-factor authentication, device lockouts, anti-malware software, and firewall usage",
          "Business Continuity & Backup: Local backups, cloud backups, backup redundancy, safe browsing practices, and disaster recovery basics"
        ]
      }
    ],
    "examCode": "FC0-U61"
  },
  {
    "id": "course-azure-104",
    "title": "Microsoft Azure Administrator (AZ-104)",
    "domain": "Cloud Computing",
    "certificationVendor": "Microsoft",
    "skillLevel": "Intermediate",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.8,
    "enrolled": 3120,
    "imageUrl": "/images/azure_cloud_infra_1787771504293.webp",
    "imageAlt": "Microsoft Azure Administrator AZ-104 cloud infrastructure training",
    "summary": "Implement, manage, and monitor identity, governance, storage, compute, and virtual networks in an enterprise Microsoft Azure cloud environment.",
    "curriculum": [
      "Module 1: Microsoft Entra ID (Azure AD), Role-Based Access Control (RBAC) & Governance",
      "Module 2: Azure Storage Accounts, Blob Containers, Azure Files & Storage Security",
      "Module 3: Azure Virtual Machines, Virtual Machine Scale Sets & Azure App Services",
      "Module 4: Azure Virtual Networks (VNet), Subnets, Peering, VPN Gateway & Azure Firewall",
      "Module 5: Azure Monitor, Log Analytics, Backup / Site Recovery & Practice Certification"
    ],
    "overview": "The AZ-104: Microsoft Azure Administrator course equips IT professionals with the skills required to implement, manage, and monitor an organization’s Microsoft Azure environment. The curriculum covers identity governance, compute resources, virtual networking, scalable storage, and resource monitoring.\n\nTargeted at systems administrators, cloud architects, and infrastructure engineers responsible for day-to-day enterprise Azure operations.",
    "learningObjectives": [
      "Manage Microsoft Entra ID identities, user governance, and role-based access control (RBAC)",
      "Implement and secure scalable Azure Storage accounts, blob tiers, and file shares",
      "Deploy and configure Azure virtual machines, scale sets, containers, and Azure App Service",
      "Architect and manage virtual networks, subnets, peering, VPN gateways, and load balancers",
      "Monitor Azure infrastructure performance, health, and logs using Azure Monitor and Log Analytics"
    ],
    "prerequisites": [
      "Basic understanding of on-premises virtualization technologies (VMs, vSAN, virtual networking)",
      "Familiarity with TCP/IP, DNS, VPNs, and Active Directory concepts",
      "Microsoft Certified: Azure Fundamentals (AZ-900) recommended"
    ],
    "outline": [
      {
        "title": "1. Manage Azure Identities and Governance (20–25%)",
        "items": [
          "Microsoft Entra ID Administration: Users, security groups, self-service password reset (SSPR), administrative units, and guest user collaboration",
          "Role-Based Access Control (RBAC): Built-in vs custom roles, role assignments, scope inheritance (Management Group > Subscription > RG > Resource)",
          "Governance & Policy: Azure Policy definitions, initiative assignments, remediation tasks, resource locks, and resource tagging strategies",
          "Azure Subscriptions & Costs: Management groups hierarchy, billing scopes, cost analysis, budget alerts, and Microsoft Cost Management"
        ]
      },
      {
        "title": "2. Implement and Manage Storage (15–20%)",
        "items": [
          "Storage Account Configuration: Account types, access tiers (Hot, Cool, Cold, Archive), firewall/virtual network rules, and customer-managed keys",
          "Azure Blob Storage: Lifecycle management rules, object replication, immutability policies, and shared access signatures (SAS tokens)",
          "Azure Files & File Sync: Storage sync service, sync groups, cloud tiering, server endpoints, and SMB/NFS share mounting",
          "Storage Tools & Utilities: AzCopy command-line data transfer, Azure Storage Explorer, and Azure Data Box offline data import"
        ]
      },
      {
        "title": "3. Deploy and Manage Azure Compute Resources (20–25%)",
        "items": [
          "Virtual Machine Deployment: Sizing VM series, Azure Compute Gallery, custom images, cloud-init / post-deployment scripts, and disk encryption",
          "High Availability & Resiliency: Availability Sets (fault/update domains), Availability Zones, and Virtual Machine Scale Sets (VMSS) with auto-scaling",
          "Azure Container Instances & Apps: Deploying container groups, container apps environments, and Azure Kubernetes Service (AKS) cluster creation",
          "Azure App Service: App Service plans, web app configuration, deployment slots with swap validation, custom domains, and SSL certificates"
        ]
      },
      {
        "title": "4. Implement and Manage Virtual Networking (15–20%)",
        "items": [
          "Virtual Networks & Subnetting: VNet provisioning, IP addressing, private/public IP allocation, and service endpoints vs private endpoints",
          "Network Security & Routing: Network Security Groups (NSGs), Application Security Groups (ASGs), User-Defined Routes (UDR), and route tables",
          "Inter-VNet Connectivity: Virtual network peering (same-region and global), VNet-to-VNet VPN gateways, and Azure Virtual WAN",
          "Load Balancing & Traffic Distribution: Azure Public/Internal Load Balancer, Azure Application Gateway (WAF, URL routing), and Azure Bastion"
        ]
      },
      {
        "title": "5. Monitor and Maintain Azure Resources (10–15%)",
        "items": [
          "Azure Monitor & Observability: Metrics, activity logs, diagnostic settings, log analytics workspaces, and Kusto Query Language (KQL)",
          "Alerting & Action Groups: Metric alerts, log search alerts, action groups (email, SMS, webhook, Azure Automation runbook), and ITSM integration",
          "Backup & Disaster Recovery: Azure Backup vaults, Recovery Services vaults, VM backup policies, and Azure Site Recovery (ASR) failover drills",
          "Resource Optimization: Azure Advisor recommendations for cost, performance, high availability, and security posture improvement"
        ]
      }
    ],
    "examCode": "AZ-104"
  },
  {
    "id": "course-ms-ai-102",
    "title": "Designing and Implementing a Microsoft Azure AI Solution (AI-102)",
    "domain": "Artificial Intelligence",
    "certificationVendor": "Microsoft",
    "skillLevel": "Advanced",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.9,
    "enrolled": 2750,
    "imageUrl": "/images/copilot_genai_workspace_1788294313357.webp",
    "imageAlt": "Azure OpenAI and Cognitive Services architecture training",
    "summary": "Build production-ready generative AI, computer vision, natural language processing, knowledge mining, and conversational AI bots using Azure OpenAI & AI Search.",
    "curriculum": [
      "Module 1: Azure AI Services Overview, Security, Key Vault & Azure OpenAI Service Setup",
      "Module 2: Prompt Engineering, Fine-Tuning Models & Retrieval-Augmented Generation (RAG)",
      "Module 3: Azure AI Vision, OCR, Custom Vision Models & Spatial Analysis",
      "Module 4: Azure AI Language, Sentiment Analysis, Text Analytics & Conversational AI",
      "Module 5: Azure AI Search (Knowledge Mining), Document Intelligence & Capstone"
    ],
    "overview": "The AI-102 course prepares software engineers and AI developers to build, manage, and deploy cognitive solutions leveraging Azure AI Services, Azure OpenAI Service, and Azure AI Search. You will master computer vision, natural language processing, speech recognition, and generative AI enterprise integrations.\n\nDesigned for AI engineers, data scientists, and developers modernizing applications with intelligent cloud services.",
    "learningObjectives": [
      "Plan, secure, and deploy Azure AI services within enterprise virtual networks",
      "Implement Computer Vision solutions for image analysis, optical character recognition (OCR), and facial recognition",
      "Build natural language processing solutions with sentiment analysis, entity extraction, and machine translation",
      "Create knowledge mining pipelines using Azure AI Search and Document Intelligence",
      "Develop generative AI conversational bots with Azure OpenAI and prompt engineering"
    ],
    "prerequisites": [
      "Knowledge of Python or C# programming and RESTful API consumption",
      "Azure AI Fundamentals (AI-900) or equivalent baseline AI knowledge",
      "Familiarity with the Azure portal and cloud resource management"
    ],
    "outline": [
      {
        "title": "1. Plan and Manage Azure AI Solutions (15–20%)",
        "items": [
          "Azure AI Services Architecture: Provisioning multi-service vs single-service resources, API keys, endpoints, and regional availability",
          "Security & Authentication: Microsoft Entra ID authentication, managed identities, Key Vault secret references, and private endpoints",
          "Monitoring & Cost Control: Consumption metrics, token-based billing management, diagnostic logging, and Azure Monitor alerts",
          "Responsible AI Framework: Mitigating algorithmic bias, implementing content moderation filters, transparency, and data privacy safeguards"
        ]
      },
      {
        "title": "2. Implement Computer Vision Solutions (20–25%)",
        "items": [
          "Image Analysis: Azure AI Vision, extracting object tags, generating descriptive captions, optical character recognition (OCR), and read API",
          "Custom Vision Models: Training custom image classification and object detection models, tagging strategies, and exporting ONNX models",
          "Face Detection & Spatial Analysis: Face API recognition, liveness detection, and Azure AI Video Indexer face/sentiment extraction"
        ]
      },
      {
        "title": "3. Implement Natural Language Processing (20–25%)",
        "items": [
          "Azure AI Language: Key phrase extraction, sentiment analysis, named entity recognition (NER), and personally identifiable information (PII) redaction",
          "Conversational Language Understanding (CLU): Defining intents, utterances, entities, and training custom language models",
          "Question Answering & Knowledge Bases: Building multi-turn conversational knowledge bases, Chit-chat integration, and synonym dictionaries",
          "Azure AI Speech: Speech-to-text transcription, custom acoustic/language models, text-to-speech neural voices, and speech translation"
        ]
      },
      {
        "title": "4. Implement Knowledge Mining & Document Intelligence (15–20%)",
        "items": [
          "Azure AI Search Architecture: Indexers, data sources, indexes, cognitive skillset pipelines, and semantic search re-ranking",
          "Custom Skillsets & Enrichment: Web API custom skills, entity linking, shaper skills, and projecting metadata into Azure Table/Blob storage",
          "Azure AI Document Intelligence: Prebuilt invoice/receipt models, custom layout extraction, table parsing, and form field mapping"
        ]
      },
      {
        "title": "5. Implement Generative AI Solutions (20–25%)",
        "items": [
          "Azure OpenAI Service: Deploying GPT-4o, GPT-4, and embedding models, token limits, temperature, top_p, and frequency penalty tuning",
          "Prompt Engineering & RAG Architecture: Few-shot prompting, system message configuration, Retrieval-Augmented Generation (RAG) with Azure AI Search",
          "Responsible AI Safety & Guardrails: Azure AI Content Safety, prompt injection detection, hallucination mitigation, and jailbreak defense"
        ]
      }
    ],
    "examCode": "AI-102"
  },
  {
    "id": "course-ms-dp-100",
    "title": "Designing and Implementing a Data Science Solution on Azure (DP-100)",
    "domain": "Artificial Intelligence",
    "certificationVendor": "Microsoft",
    "skillLevel": "Advanced",
    "format": "Live Online",
    "duration": "5 Days (40 Hours)",
    "rating": 4.9,
    "enrolled": 1940,
    "imageUrl": "/images/powerbi_data_analytics_1788294280157.webp",
    "imageAlt": "Azure Machine Learning DP-100 data science training preview",
    "summary": "Train, evaluate, deploy, and monitor scalable machine learning models using Azure Machine Learning Studio, MLflow, Automated ML, and Kubernetes endpoints.",
    "curriculum": [
      "Module 1: Azure Machine Learning Workspace Setup, Compute Clusters & Datasets",
      "Module 2: Experiment Tracking with MLflow, Model Training & Hyperparameter Tuning",
      "Module 3: Automated Machine Learning (AutoML) & Azure ML Designer Pipelines",
      "Module 4: Model Deployment to Managed Online Endpoints & Real-Time Scoring",
      "Module 5: Responsible AI Framework, Model Drift Monitoring & Certification Prep"
    ],
    "overview": "DP-100: Designing and Implementing a Data Science Solution on Azure trains data scientists to use Azure Machine Learning to train, evaluate, deploy, and manage machine learning models at enterprise scale. You will learn automated ML, MLflow model tracking, hyperparameter tuning, and production MLOps deployment.\n\nTargeted at data scientists, ML engineers, and analytics professionals operationalizing predictive models in the cloud.",
    "learningObjectives": [
      "Design and prepare machine learning workspaces, compute instances, and datastores on Azure",
      "Run ML training experiments with the Azure ML Python SDK v2 and MLflow tracking",
      "Optimize hyperparameters and execute automated machine learning (AutoML) jobs",
      "Deploy models to real-time managed online endpoints and batch inference pipelines",
      "Implement responsible AI dashboards, model explainability, and data drift monitoring"
    ],
    "prerequisites": [
      "Proficiency in Python programming and common data science libraries (Pandas, Scikit-Learn, NumPy)",
      "Basic knowledge of machine learning concepts and cloud computing"
    ],
    "outline": [
      {
        "title": "1. Design and Prepare a Machine Learning Solution (20–25%)",
        "items": [
          "Azure Machine Learning Workspaces: Resource dependencies (Storage, Key Vault, Container Registry, App Insights), RBAC, and compute quotas",
          "Compute Targets: Compute Instances, Compute Clusters, Serverless Compute, Kubernetes compute targets, and idle auto-shutdown policies",
          "Data Assets & Datastores: Connecting Azure Blob/Data Lake Gen2, creating URI file/folder data assets, tabular datasets, and versioning",
          "Environments & Dependencies: Curated environments, custom Docker environments, conda dependency specifications, and MLflow integration"
        ]
      },
      {
        "title": "2. Explore Data and Train Models (35–40%)",
        "items": [
          "Automated Machine Learning (AutoML): Configuring task types (classification, regression, time-series forecasting), metrics, and model explanations",
          "Azure Machine Learning Designer: Building visual pipelines, data transformation modules, feature engineering, and model evaluation",
          "Script-Based Training & MLflow: Running training scripts with Job CLI/SDK v2, hyperparameter tuning with Sweep jobs, and MLflow metric tracking",
          "Distributed Training: PyTorch / TensorFlow distributed training across GPU clusters, Horovod, and deep learning optimization"
        ]
      },
      {
        "title": "3. Prepare a Model for Deployment (20–25%)",
        "items": [
          "Model Management & Packaging: Registering models in Azure ML registry, tracking lineage, artifacts, conda dependencies, and model signatures",
          "Model Evaluation & Fairness: Evaluating classification matrices, ROC curves, Fairlearn fairness assessments, and interpretability dashboards",
          "Packaging Models: Preparing scoring scripts (init, run), defining environment requirements, and containerizing models with MLflow"
        ]
      },
      {
        "title": "4. Deploy and Retrain a Model (15–20%)",
        "items": [
          "Managed Online Endpoints: Real-time inference deployment, traffic blue/green splitting, auto-scaling instances, and SSL endpoints",
          "Batch Endpoints: Asynchronous inference pipelines for massive datasets, automated batch scheduling, and parallel compute workers",
          "MLOps & Continuous Integration: GitHub Actions / Azure DevOps CI/CD pipelines for automated model testing, registration, and deployment",
          "Model Monitoring & Data Drift: Monitoring data drift between baseline training and production inference, and automated retraining triggers"
        ]
      }
    ],
    "examCode": "DP-100"
  },
  {
    "id": "course-ms-sc-900",
    "title": "Microsoft Security, Compliance, and Identity Fundamentals (SC-900)",
    "domain": "Cybersecurity",
    "certificationVendor": "Microsoft",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "duration": "5 Days (30 Hours)",
    "rating": 4.8,
    "enrolled": 3420,
    "imageUrl": "/images/comptia_security_soc_1787771516564.webp",
    "imageAlt": "Microsoft SC-900 Security and Compliance fundamentals training",
    "summary": "Understand Microsoft security solutions, Zero Trust principles, Entra ID identity governance, Microsoft Defender XDR, and Microsoft Purview compliance.",
    "curriculum": [
      "Module 1: Core Concepts of Security, Compliance & Identity (Zero Trust & Shared Responsibility)",
      "Module 2: Microsoft Entra ID Capabilities (Conditional Access, MFA, PIM & Identity Protection)",
      "Module 3: Microsoft Security Solutions (Microsoft Defender for Cloud, Endpoint & Office 365)",
      "Module 4: Microsoft Sentinel (Cloud-Native SIEM) & Microsoft Security Copilot",
      "Module 5: Microsoft Purview Compliance, Sensitivity Labels, DLP & SC-900 Exam Drill"
    ],
    "overview": "SC-900 provides foundational knowledge of Microsoft’s end-to-end security, compliance, and identity solutions across cloud and hybrid environments. It explores Zero Trust methodology, Microsoft Entra ID governance, Microsoft Defender XDR threat protection, Microsoft Sentinel SIEM, and Microsoft Purview compliance.\n\nIdeal for business stakeholders, IT professionals, security analysts, and students looking to establish certified competence in Microsoft cloud security.",
    "learningObjectives": [
      "Understand the concepts of security, compliance, and identity (SCI)",
      "Describe Microsoft Entra ID capabilities, Conditional Access, and identity protection",
      "Explain Microsoft Security solutions including Microsoft Defender XDR and Sentinel",
      "Explore Microsoft Purview compliance capabilities, data lifecycle management, and insider risk"
    ],
    "prerequisites": [
      "General understanding of cloud computing and fundamental security concepts",
      "No prior formal certification required"
    ],
    "outline": [
      {
        "title": "1. Concepts of Security, Compliance & Identity (10–15%)",
        "items": [
          "Security Methodologies: Zero Trust principles (Verify explicitly, Use least privilege, Assume breach), defense-in-depth, and CIA triad",
          "Shared Responsibility Model: Customer vs cloud provider security responsibilities across SaaS, PaaS, and IaaS environments",
          "Threat Landscape & Security Pillars: Common attack vectors (phishing, ransomware, brute force, DDoS) and Microsoft security principles"
        ]
      },
      {
        "title": "2. Microsoft Entra ID Capabilities (30–35%)",
        "items": [
          "Entra ID Fundamentals: Cloud identities, hybrid identities with Entra Connect, guest external users, and administrative roles",
          "Access Management: Self-service password reset (SSPR), multi-factor authentication (MFA), passwordless authentication (FIDO2/Windows Hello)",
          "Conditional Access: Signal-based evaluation (user risk, location, device compliance), decision policies (grant/block), and session controls",
          "Identity Governance: Entra Privileged Identity Management (PIM) just-in-time access, entitlement management, and access reviews"
        ]
      },
      {
        "title": "3. Microsoft Security Solutions (35–40%)",
        "items": [
          "Microsoft Defender XDR: Extended Detection and Response covering Defender for Endpoint, Office 365, Identity, and Cloud Apps",
          "Microsoft Sentinel: Cloud-native SIEM and SOAR, data connectors, analytical threat detection rules, incident management, and playbooks",
          "Microsoft Defender for Cloud: Cloud Security Posture Management (CSPM), regulatory compliance dashboards, and Cloud Workload Protection (CWPP)",
          "Azure Network Security: Azure Firewall, Network Security Groups (NSGs), Azure DDoS Protection, and Web Application Firewall (WAF)"
        ]
      },
      {
        "title": "4. Microsoft Compliance Solutions (20–25%)",
        "items": [
          "Microsoft Purview Governance: Unified data governance, data map, data catalog, data lineage, and scanning multi-cloud data assets",
          "Information Protection: Sensitivity labels, content inspection, encryption policies, and Data Loss Prevention (DLP) across endpoints/cloud",
          "Compliance Management: Purview Compliance Manager, compliance score, improvement actions, and pre-built regulatory templates",
          "eDiscovery & Audit: Content search, eDiscovery (Standard & Premium), audit log retention, and insider risk management policies"
        ]
      }
    ],
    "examCode": "SC-900"
  },
  {
    "id": "course-ms-900",
    "title": "Microsoft 365 Fundamentals (MS-900)",
    "domain": "Microsoft Solutions",
    "certificationVendor": "Microsoft",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "duration": "5 Days (30 Hours)",
    "rating": 4.8,
    "enrolled": 2950,
    "imageUrl": "/images/copilot_genai_workspace_1788294313357.webp",
    "imageAlt": "Microsoft 365 Fundamentals MS-900 enterprise training",
    "summary": "Master Microsoft 365 cloud productivity solutions, collaboration apps (Teams, SharePoint, Exchange), endpoint management (Intune), and licensing models.",
    "curriculum": [
      "Module 1: Cloud Concepts & Microsoft 365 Cloud Productivity Solutions Overview",
      "Module 2: Collaboration in Microsoft 365 (Microsoft Teams, SharePoint Online & OneDrive)",
      "Module 3: Endpoint Management & Windows as a Service with Microsoft Intune",
      "Module 4: Security, Compliance, Privacy & Trust in Microsoft 365",
      "Module 5: Microsoft 365 Pricing, Enterprise Licensing Plans & Exam Preparation"
    ],
    "overview": "Microsoft 365 Fundamentals (MS-900) demonstrates foundational knowledge of cloud-based SaaS solutions, specifically productivity, collaboration, security, and cloud licensing across the Microsoft 365 ecosystem.\n\nGeared toward professionals evaluating or adopting Microsoft 365, IT administrators, and sales professionals.",
    "learningObjectives": [
      "Differentiate cloud computing concepts and Microsoft 365 subscription models",
      "Describe core productivity and collaboration capabilities in Teams, Exchange, SharePoint, and OneDrive",
      "Explain security, compliance, privacy, and trust across Microsoft 365",
      "Understand Microsoft 365 licensing, billing, support tiers, and service health"
    ],
    "prerequisites": [
      "Basic knowledge of computing, internet concepts, and productivity software"
    ],
    "outline": [
      {
        "title": "1. Cloud Concepts & Modern Workplace Fundamentals (10–15%)",
        "items": [
          "Cloud Principles: High availability, scalability, elasticity, agility, disaster recovery, CapEx vs OpEx models, and consumption economics",
          "Cloud Service Models: Distinguishing IaaS, PaaS, and SaaS within Microsoft 365 enterprise productivity environments",
          "Modern Workplace Transformation: Hybrid work enablement, centralized endpoint management, and collaborative digital environments"
        ]
      },
      {
        "title": "2. Core Microsoft 365 Services & Capabilities (50–55%)",
        "items": [
          "Productivity & Collaboration: Microsoft Teams channels, chat, meetings, live events, SharePoint Online team sites, and OneDrive for Business",
          "Enterprise Communication: Exchange Online architecture, shared mailboxes, calendar sharing, distribution groups, and mobile Outlook sync",
          "Modern Management & Endpoints: Microsoft Intune mobile device and application management (MDM/MAM), Windows Autopilot, and Windows 365 Cloud PC",
          "Analytics & Employee Experience: Microsoft Viva suites (Insights, Topics, Learning, Connections) and Microsoft 365 admin center dashboards"
        ]
      },
      {
        "title": "3. Security, Compliance, Privacy & Trust in Microsoft 365 (15–20%)",
        "items": [
          "Zero Trust & Identity: Microsoft Entra ID integration, multi-factor authentication, conditional access baseline policies, and passwordless logins",
          "Threat Defense: Microsoft Defender for Office 365 anti-phishing, Safe Links, Safe Attachments, and anti-spam protection policies",
          "Information Protection & Compliance: Microsoft Purview sensitivity labeling, data retention policies, DLP, and the Service Trust Portal"
        ]
      },
      {
        "title": "4. Microsoft 365 Pricing, Licensing & Support (10–15%)",
        "items": [
          "Licensing Models: Microsoft 365 Business (Basic, Standard, Premium), Enterprise plans (E3, E5, F3), and add-on feature licensing",
          "Billing & Cost Management: Billing accounts, license assignment strategies, subscription renewals, and cancellation policies",
          "Service Health & Support: Monitoring Microsoft 365 service health dashboard, creating support tickets, SLA guarantees, and release channels"
        ]
      }
    ],
    "examCode": "MS-900"
  },
  {
    "id": "course-ms-pl-300",
    "title": "Microsoft Power BI Data Analyst (PL-300)",
    "domain": "Microsoft Solutions",
    "certificationVendor": "Microsoft",
    "skillLevel": "Intermediate",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 4.9,
    "enrolled": 4110,
    "imageUrl": "/images/powerbi_data_analytics_1788294280157.webp",
    "imageAlt": "Microsoft Power BI PL-300 data visualization training preview",
    "summary": "Transform raw data into actionable enterprise insights by mastering Power Query data ingestion, DAX calculations, interactive report design, and workspace governance.",
    "curriculum": [
      "Module 1: Power Query ETL, Data Cleansing, Merging & Schema Transformation",
      "Module 2: Data Modeling, Star Schemas, Relationships & Advanced DAX Calculations",
      "Module 3: Visual Analytics, Interactive Dashboards, Drillthrough & Custom Charts",
      "Module 4: Power BI Service, Workspace Roles, Scheduled Refresh & Gateway Configuration",
      "Module 5: Row-Level Security (RLS), Performance Analyzer & PL-300 Practice Drill"
    ],
    "overview": "PL-300: Microsoft Power BI Data Analyst provides the skills needed to transform raw business data into actionable visual insights. You will learn to ingest and clean data with Power Query, model relationships, author DAX calculations, build interactive dashboards, and deploy workspaces.\n\nDesigned for data analysts, business intelligence specialists, and reporting professionals delivering enterprise analytics.",
    "learningObjectives": [
      "Connect to diverse data sources and cleanse datasets using Power Query M-code",
      "Design robust analytical data models with Star Schema principles and DAX measures",
      "Create compelling interactive reports with bookmarks, tooltips, and drill-throughs",
      "Manage and distribute enterprise reports and semantic models via the Power BI Service"
    ],
    "prerequisites": [
      "Basic understanding of core data concepts and experience working with Excel spreadsheets"
    ],
    "outline": [
      {
        "title": "1. Prepare the Data (25–30%)",
        "items": [
          "Data Ingestion & Connectors: Connecting to Excel, CSV, SQL Server, Azure SQL, SharePoint, web APIs, and DirectQuery vs Import mode",
          "Power Query Transformations: Cleaning data, removing nulls, filtering, pivoting/unpivoting, merging, appending, and split columns",
          "Advanced Data Profiling: Column quality, column distribution, column profile, addressing data anomalies, and M code customization",
          "Data Storage Optimization: Choosing between Import, DirectQuery, Dual storage modes, and configuring incremental refresh"
        ]
      },
      {
        "title": "2. Model the Data (30–35%)",
        "items": [
          "Star Schema Design: Fact tables, dimension tables, snowflake vs star schemas, snowflake normalization trade-offs, and primary/foreign keys",
          "Relationships & Cardinality: Configuring 1:Many, 1:1, Many:Many relationships, active vs inactive relationships, and cross-filter direction",
          "DAX Calculations: Calculated columns vs measures, row context vs filter context, and context transition with CALCULATE",
          "Time Intelligence & Advanced DAX: YTD, MTD, SAMEPERIODLASTYEAR, DATEADD, RANKX, SUMX, AVERAGEX, and creating dedicated date tables"
        ]
      },
      {
        "title": "3. Visualize and Analyze the Data (25–30%)",
        "items": [
          "Report Design & Visuals: Selecting bar/line charts, scatter plots, matrix visuals, gauge cards, KPI cards, and custom AppSource visuals",
          "User Interactivity: Slicers, synchronized slicers, drill-down, drill-through pages, bookmarks, selection panes, and tooltips",
          "Accessibility & Navigation: Visual hierarchy, tab order, contrasting color palettes, responsive layouts for mobile devices, and themes",
          "Advanced Analytics: Key influencers visual, decomposition tree, anomaly detection, forecasting, and Q&A natural language queries"
        ]
      },
      {
        "title": "4. Deploy and Maintain Assets (20–25%)",
        "items": [
          "Power BI Service Management: Workspaces, premium per user (PPU) capacity, deployment pipelines (Dev, Test, Prod), and app publishing",
          "Data Refresh & Gateways: On-premises data gateway installation, scheduled refresh configuration, and incremental refresh monitoring",
          "Security & Access Control: Row-Level Security (RLS) role creation, dynamic RLS with USERNAME()/USERPRINCIPALNAME(), and workspace permissions",
          "Governance & Auditing: Endorsement (promoted/certified datasets), sensitivity labels, lineage view, and usage metrics reports"
        ]
      }
    ],
    "examCode": "PL-300"
  },
  {
    "id": "course-ms-pl-900",
    "title": "Microsoft Power Platform Fundamentals (PL-900)",
    "domain": "Microsoft Solutions",
    "certificationVendor": "Microsoft",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "duration": "5 Days (30 Hours)",
    "rating": 4.8,
    "enrolled": 2670,
    "imageUrl": "/images/powerbi_data_analytics_1788294280157.webp",
    "imageAlt": "Microsoft Power Platform PL-900 business automation preview",
    "summary": "Build low-code custom business apps with Power Apps, automate workflows with Power Automate, create portals with Power Pages, and deploy bots with Microsoft Copilot Studio.",
    "curriculum": [
      "Module 1: Power Platform Business Value & Microsoft Dataverse Core Concepts",
      "Module 2: Building Canvas Apps & Model-Driven Apps with Power Apps",
      "Module 3: Automating Business Processes & Approvals with Power Automate Flows",
      "Module 4: Power Pages External Websites & Copilot Studio AI Conversational Bots",
      "Module 5: Power Platform Administration, Data Loss Prevention (DLP) & Exam Drill"
    ],
    "overview": "PL-900: Microsoft Power Platform Fundamentals introduces the business value and product capabilities of Power Apps, Power Automate, Power BI, Power Pages, and Copilot Studio.\n\nDesigned for business users, functional consultants, and developers looking to build modern low-code business solutions.",
    "learningObjectives": [
      "Describe the business value of Microsoft Power Platform and Microsoft Dataverse",
      "Identify core components of Power Apps (Canvas & Model-Driven Apps)",
      "Demonstrate capabilities of Power Automate cloud and desktop flows",
      "Explain Copilot Studio conversational AI and Power Pages external websites"
    ],
    "prerequisites": [
      "Basic familiarity with computers, internet browsers, and enterprise cloud applications"
    ],
    "outline": [
      {
        "title": "1. Power Platform Business Value & Architecture (20–25%)",
        "items": [
          "Platform Overview: Power Apps, Power Automate, Power BI, Copilot Studio, Power Pages, and their business transformation value",
          "Dataverse Architecture: Standard tables, custom tables, columns, data types, relationships (1:N, N:N), and environment security roles",
          "Connectors & Data Integration: Standard connectors, premium connectors, custom connectors, on-premises data gateway, and Dataverse search",
          "Administration & Governance: Power Platform admin center, environments (default, sandbox, production), DLP policies, and capacity management"
        ]
      },
      {
        "title": "2. Power Apps Capabilities (25–30%)",
        "items": [
          "Canvas Apps Development: Building apps from scratch, screen controls, galleries, forms, input fields, and Power Fx formula expressions",
          "Model-Driven Apps: Component-focused design, business process flows, entity forms, views, dashboards, and site maps",
          "User Experience & Responsiveness: Responsive container layouts, mobile vs tablet layouts, error handling, and testing with Power Apps Studio"
        ]
      },
      {
        "title": "3. Power Automate Solutions (25–30%)",
        "items": [
          "Flow Types: Automated cloud flows (event-triggered), instant cloud flows (button/mobile), scheduled flows, and desktop RPA flows",
          "Logic & Actions: Triggers, actions, dynamic content, conditional branching, switch statements, apply to each loops, and approval workflows",
          "Process Mining & Desktop Automation: Power Automate Desktop for legacy UI scraping, task mining, and unattended robotic automation"
        ]
      },
      {
        "title": "4. Copilot Studio, Power Pages & Power BI Integration (15–20%)",
        "items": [
          "Microsoft Copilot Studio: Creating generative AI chatbots, conversational topics, triggers, entities, and publishing to Teams/websites",
          "Power Pages: Low-code external web portal design, templates, styling, Dataverse form permissions, and anonymous vs authenticated access",
          "Power BI Cross-Integration: Embedding Power BI tiles inside Power Apps, and triggering Power Automate flows directly from Power BI reports"
        ]
      }
    ],
    "examCode": "PL-900"
  },
  {
    "id": "course-ms-ai-900",
    "title": "Microsoft Azure AI Fundamentals (AI-900)",
    "domain": "Artificial Intelligence",
    "certificationVendor": "Microsoft",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "duration": "5 Days (30 Hours)",
    "rating": 4.9,
    "enrolled": 3820,
    "imageUrl": "/images/copilot_genai_workspace_1788294313357.webp",
    "imageAlt": "Microsoft Azure AI Fundamentals AI-900 training",
    "summary": "Get started with artificial intelligence concepts, machine learning principles, computer vision, natural language processing, and generative AI workloads on Microsoft Azure.",
    "curriculum": [
      "Module 1: AI & Machine Learning Fundamentals (Regression, Classification & Clustering)",
      "Module 2: Automated Machine Learning in Azure ML Studio & Responsible AI Principles",
      "Module 3: Computer Vision Concepts, Object Detection & Optical Character Recognition",
      "Module 4: Natural Language Processing (NLP), Speech Recognition & Conversational Bots",
      "Module 5: Generative AI on Azure (Azure OpenAI & Copilot) & AI-900 Exam Prep"
    ],
    "overview": "AI-900: Microsoft Azure AI Fundamentals covers fundamental machine learning and artificial intelligence concepts along with their implementation in Azure services. Topics include computer vision, natural language processing, conversational AI, and generative AI.\n\nIdeal for students, business professionals, and engineers seeking an introduction to cloud AI without heavy coding requirements.",
    "learningObjectives": [
      "Describe AI workloads, machine learning concepts, and responsible AI principles",
      "Understand fundamental principles of computer vision on Azure",
      "Explore natural language processing (NLP) features in Azure AI Language",
      "Explain conversational AI and generative AI capabilities on Microsoft Azure"
    ],
    "prerequisites": [
      "Basic computer literacy and general interest in AI capabilities"
    ],
    "outline": [
      {
        "title": "1. AI Workloads and Considerations (15–20%)",
        "items": [
          "Fundamental AI Concepts: Machine learning, computer vision, natural language processing, conversational AI, and knowledge mining",
          "Responsible AI Guiding Principles: Fairness, reliability & safety, privacy & security, inclusiveness, transparency, and accountability",
          "Ethical AI Considerations: Identifying real-world bias in predictive algorithms, model interpretability, and compliance standards"
        ]
      },
      {
        "title": "2. Fundamental Machine Learning Principles on Azure (20–25%)",
        "items": [
          "Machine Learning Paradigms: Supervised learning (regression, classification) vs unsupervised learning (clustering algorithms)",
          "Model Training Lifecycle: Data preparation, feature engineering, model selection, training, hyperparameter tuning, and validation",
          "Azure Machine Learning Studio: Automated ML for non-developers, visual designer drag-and-drop pipelines, and real-time endpoint deployment"
        ]
      },
      {
        "title": "3. Computer Vision Workloads on Azure (15–20%)",
        "items": [
          "Core Vision Capabilities: Image analysis, object detection with bounding boxes, facial detection/recognition, and OCR text extraction",
          "Azure AI Vision Services: Optical character recognition (Read API), smart cropping, adult content moderation, and generating image captions",
          "Custom Vision Solutions: Training custom classification models (multiclass vs multilabel), custom object detection, and model export"
        ]
      },
      {
        "title": "4. Natural Language Processing Workloads on Azure (15–20%)",
        "items": [
          "Language Capabilities: Key phrase extraction, sentiment analysis, named entity recognition (NER), and language detection",
          "Conversational Services: Question Answering knowledge bases, Chit-chat persona integration, and Conversational Language Understanding (CLU)",
          "Azure AI Speech Services: Speech recognition (speech-to-text), speech synthesis (text-to-speech with neural voices), and real-time translation"
        ]
      },
      {
        "title": "5. Generative AI Capabilities on Azure (20–25%)",
        "items": [
          "Generative AI Foundations: Large language models (LLMs), foundational models, tokenization, embeddings, and generative image diffusion",
          "Azure OpenAI Service: Deploying GPT models, DALL-E image generation, completion requests, and temperature/top_p parameter adjustment",
          "Prompt Engineering Fundamentals: System prompts, user prompts, few-shot examples, zero-shot prompting, and grounding with enterprise data"
        ]
      }
    ],
    "examCode": "AI-900"
  },
  {
    "id": "course-ms-dp-900",
    "title": "Microsoft Azure Data Fundamentals (DP-900)",
    "domain": "Microsoft Solutions",
    "certificationVendor": "Microsoft",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "duration": "5 Days (30 Hours)",
    "rating": 4.8,
    "enrolled": 2890,
    "imageUrl": "/images/powerbi_data_analytics_1788294280157.webp",
    "imageAlt": "Microsoft Azure Data Fundamentals DP-900 training preview",
    "summary": "Master foundational data concepts, relational database offerings (Azure SQL Database), non-relational storage (Azure Cosmos DB), and modern analytics architectures (Azure Synapse).",
    "curriculum": [
      "Module 1: Core Data Concepts (Relational vs Non-Relational, Batch vs Streaming)",
      "Module 2: Relational Data on Azure (Azure SQL Database, SQL Managed Instance & PostgreSQL)",
      "Module 3: Non-Relational Data on Azure (Azure Cosmos DB, Table Storage & Blob Tiers)",
      "Module 4: Modern Data Warehousing, Azure Synapse Analytics, Data Factory & Power BI",
      "Module 5: Real-Time Analytics with Azure Stream Analytics & DP-900 Practice Exam"
    ],
    "overview": "DP-900: Microsoft Azure Data Fundamentals teaches the core concepts of relational data, non-relational data, big data processing, and modern data warehousing architectures in Microsoft Azure.\n\nPerfect for data enthusiasts, business analysts, and beginners preparing for advanced Azure data engineering or data science certifications.",
    "learningObjectives": [
      "Identify foundational data concepts, data representations, and ACID transactional properties",
      "Explain relational data offerings in Azure including Azure SQL Database and Azure Database for PostgreSQL",
      "Understand non-relational data storage with Azure Cosmos DB and Azure Blob Storage",
      "Describe analytics services including Azure Synapse Analytics, Azure Databricks, and Microsoft Fabric"
    ],
    "prerequisites": [
      "Basic knowledge of computing and data concepts"
    ],
    "outline": [
      {
        "title": "1. Core Data Concepts (25–30%)",
        "items": [
          "Data Types & Structures: Structured data (relational tables), semi-structured data (JSON, XML, YAML), and unstructured data (media, files)",
          "Workload Characteristics: Online Transaction Processing (OLTP) vs Online Analytical Processing (OLAP) processing paradigms",
          "Core Data Concepts: ACID transactions, relational normalization, data latency, batch processing vs streaming data ingestion"
        ]
      },
      {
        "title": "2. Relational Data on Azure (20–25%)",
        "items": [
          "Azure Relational Offerings: Azure SQL Database, Azure SQL Managed Instance, and SQL Server on Azure Virtual Machines",
          "Open-Source Relational Databases: Azure Database for PostgreSQL and Azure Database for MySQL flexible servers",
          "Relational Management & Security: Provisioning, network firewalls, Microsoft Entra authentication, encryption (TDE), and automatic high availability"
        ]
      },
      {
        "title": "3. Non-Relational Data on Azure (15–20%)",
        "items": [
          "Azure Cosmos DB: Globally distributed multi-model NoSQL database, multi-region replication, and APIs (NoSQL, MongoDB, Cassandra, Gremlin)",
          "Azure Storage Services: Azure Blob Storage (block/append blobs), Azure Files (SMB/NFS shares), Azure Data Lake Storage Gen2, and Table storage",
          "Non-Relational Workloads: Choosing appropriate storage tiers (Hot, Cool, Cold, Archive), redundancy (LRS, ZRS, GRS), and access keys"
        ]
      },
      {
        "title": "4. Large-Scale Analytics & Modern Data Warehousing (25–30%)",
        "items": [
          "Modern Data Warehousing: Azure Synapse Analytics, dedicated SQL pools, serverless SQL queries, and Synapse Studio workspaces",
          "Big Data Engineering: Azure Databricks, Apache Spark on Azure, Delta Lake architecture, and data pipelines with Azure Data Factory",
          "Real-Time Analytics & Microsoft Fabric: Azure Event Hubs, Azure Stream Analytics, and Microsoft Fabric unified analytics lakehouse"
        ]
      }
    ],
    "examCode": "DP-900"
  },
  {
    "id": "course-ms-4018-copilot",
    "title": "Draft, Analyze and Present with Microsoft 365 Copilot (MS-4018)",
    "domain": "Artificial Intelligence",
    "certificationVendor": "Microsoft",
    "skillLevel": "Beginner",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (30 Hours)",
    "rating": 5,
    "enrolled": 3650,
    "imageUrl": "/images/copilot_genai_workspace_1788294313357.webp",
    "imageAlt": "Microsoft 365 Copilot enterprise workplace generative AI training",
    "summary": "Accelerate enterprise workplace productivity by mastering Microsoft 365 Copilot prompt engineering across Word, Excel, PowerPoint, Outlook, and Microsoft Teams.",
    "curriculum": [
      "Module 1: Microsoft 365 Copilot Architecture, Microsoft Graph Data Grounding & Security",
      "Module 2: Drafting & Summarizing Executive Documents in Word with Copilot",
      "Module 3: Data Analysis, Python Scripting & Formula Generation in Excel with Copilot",
      "Module 4: Creating High-Impact Client Presentations in PowerPoint & Email Triage in Outlook",
      "Module 5: Meeting Summaries in Teams & Building Custom Copilots in Copilot Studio"
    ],
    "overview": "MS-4018: Draft, Analyze and Present with Microsoft 365 Copilot teaches business professionals and knowledge workers how to leverage generative AI within Microsoft Word, PowerPoint, Excel, Teams, and Outlook.\n\nIdeal for business professionals, project leaders, executives, and managers looking to drastically accelerate daily work productivity using Copilot AI.",
    "learningObjectives": [
      "Formulate effective prompt engineering strategies for Microsoft 365 Copilot",
      "Draft complex contracts, memos, and executive summaries rapidly in Microsoft Word",
      "Transform documents into presentation decks with custom visuals in PowerPoint",
      "Analyze data, extract insights, and generate formulas with Copilot in Excel",
      "Summarize long email threads in Outlook and catch up on missed Teams meetings in seconds"
    ],
    "prerequisites": [
      "Working knowledge of Microsoft Office applications (Word, Excel, PowerPoint, Outlook, Teams)"
    ],
    "outline": [
      {
        "title": "1. Microsoft 365 Copilot Architecture & Foundations",
        "items": [
          "Architectural Model: How Copilot coordinates Large Language Models (LLMs), Microsoft Graph semantic index, and Microsoft 365 apps",
          "Enterprise Security & Compliance: Data boundary protection, tenant isolation, permissions inheritance, and data governance policies",
          "The GCSE Prompting Framework: Structuring prompts with Goal (task), Context (scenario), Source (files/emails), and Expectation (output format)",
          "Iterative Prompt Refinement: Follow-up prompts, persona constraints, tone tuning, output length adjustment, and error correction"
        ]
      },
      {
        "title": "2. Copilot in Word & Microsoft Outlook",
        "items": [
          "Executive Drafting in Word: Generating complex business proposals from bullet outlines, meeting notes, or existing PowerPoint decks",
          "Document Transformation: Restructuring paragraphs, converting text to comparison tables, adjusting reading tone, and summarizing long drafts",
          "Inbox Management in Outlook: Summarizing lengthy multi-party email threads, identifying key blockers, and sentiment analysis",
          "Contextual Email Drafting: Generating client replies with attached calendar availability, specific tone modulation, and action checklists"
        ]
      },
      {
        "title": "3. Copilot in Microsoft Excel",
        "items": [
          "Data Exploration & Analysis: Prompt-driven formula generation (XLOOKUP, SUMIFS, INDEX/MATCH), identifying trends, and outliers",
          "Advanced Calculations: Generating complex calculation columns without manual formulas, conditional formatting rules, and sorting",
          "Pivot Tables & Visual Insights: Automated pivot table suggestions, key business metric extraction, and interactive KPI chart generation"
        ]
      },
      {
        "title": "4. Copilot in PowerPoint & Microsoft Teams",
        "items": [
          "Presentation Generation: Creating complete multi-slide presentations from Word briefing documents with executive formatting and imagery",
          "Slide Refinement: Adding speaker notes, reorganizing layout hierarchies, simplifying bulleted slides, and applying corporate design templates",
          "Meeting Assistance in Teams: Real-time meeting summaries without recording, asking 'what did I miss?', and sentiment tracking",
          "Action Item Extraction: Identifying owner assignments, deadlines, unanswered questions from chat transcripts, and drafting follow-up emails"
        ]
      }
    ],
    "examCode": "MS-4018"
  },
  {
    "id": "course-aws-solutions",
    "title": "AWS Certified Solutions Architect (SAA-C03)",
    "domain": "Cloud Computing",
    "certificationVendor": "AWS",
    "skillLevel": "Advanced",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 5,
    "enrolled": 6890,
    "imageUrl": "/images/aws_architecture_diagram_1787771528914.webp",
    "imageAlt": "AWS Certified Solutions Architect system blueprint training",
    "summary": "Design resilient, high-performing, secure, and cost-optimized architectures on Amazon Web Services for large scale corporate deployments.",
    "curriculum": [
      "Module 1: AWS Global Infrastructure, IAM Policies, VPC Networking & Subnets",
      "Module 2: Compute Solutions (EC2, ECS, EKS, Lambda) & Auto Scaling / Load Balancing",
      "Module 3: Storage & Databases (S3, EBS, EFS, RDS Multi-AZ, Aurora, DynamoDB)",
      "Module 4: High Availability, Route 53, CloudFront CDN, KMS Encryption & Security",
      "Module 5: Cost Optimization, CloudFormation / Terraform & SAA-C03 Mock Exam"
    ],
    "overview": "AWS Certified Solutions Architect - Associate (SAA-C03) validates the expertise required to design high-availability, cost-effective, fault-tolerant, and scalable distributed systems on Amazon Web Services (AWS).\n\nIdeal for solutions architects, cloud engineers, DevOps practitioners, and systems administrators building enterprise cloud architectures on AWS.",
    "learningObjectives": [
      "Design secure AWS architectures with IAM, VPC networking, security groups, and encryption",
      "Architect resilient and high-performing systems using Auto Scaling, ELB, Route 53, and S3",
      "Select optimal compute, database, and storage solutions based on technical and business requirements",
      "Optimize AWS infrastructures for cost efficiency and operational excellence"
    ],
    "prerequisites": [
      "One year of hands-on experience designing and deploying cloud architecture on AWS (recommended)"
    ],
    "outline": [
      {
        "title": "1. Design Secure Architectures (30%)",
        "items": [
          "Identity & Access Management: AWS IAM policies (JSON), roles, permission boundaries, IAM Identity Center (SSO), and temporary STS credentials",
          "Virtual Private Cloud (VPC) Security: Public/private subnets, Internet Gateways, NAT Gateways, Security Groups (stateful), and NACLs (stateless)",
          "Data Protection & Cryptography: AWS KMS customer-managed keys (CMK), envelope encryption, AWS Secrets Manager, and ACM SSL certificates",
          "Edge Security & Monitoring: AWS WAF rule sets, AWS Shield DDoS protection, VPC Flow Logs analysis, and AWS CloudTrail audit logs"
        ]
      },
      {
        "title": "2. Design Resilient Architectures (26%)",
        "items": [
          "High Availability & Multi-AZ: Multi-AZ database deployments (Amazon RDS, Amazon Aurora), cross-region read replicas, and Route 53 failover",
          "Elastic Scaling & Load Balancing: EC2 Auto Scaling groups (dynamic/predictive), Application Load Balancers (ALB), and Network Load Balancers (NLB)",
          "Decoupled & Event-Driven Systems: Amazon SQS (standard vs FIFO), Amazon SNS pub/sub, Amazon EventBridge event buses, and Step Functions",
          "Disaster Recovery Strategies: Backup & restore, Pilot Light, Warm Standby, and Multi-Site Active/Active strategies with target RPO/RTO"
        ]
      },
      {
        "title": "3. Design High-Performing Architectures (24%)",
        "items": [
          "High-Performance Storage: Amazon S3 storage classes (Standard, Intelligent-Tiering, Glacier), Amazon EBS types (gp3, io2), and Amazon EFS",
          "Scalable Databases: Amazon Aurora Serverless, Amazon DynamoDB single-digit millisecond latency, global tables, and DAX accelerator",
          "Caching & Edge Acceleration: Amazon CloudFront global CDN distribution, Lambda@Edge, and Amazon ElastiCache (Redis / Memcached) clusters",
          "High-Performance Compute: EC2 instance families (compute, memory, storage optimized), AWS Graviton ARM processors, and AWS Batch"
        ]
      },
      {
        "title": "4. Design Cost-Optimized Architectures (20%)",
        "items": [
          "Compute Cost Management: EC2 Savings Plans, Reserved Instances, Spot Instances for fault-tolerant workloads, and right-sizing analysis",
          "Storage Lifecycle Policies: Automated S3 lifecycle transitions to Glacier Flexible/Deep Archive, S3 Object Tagging, and EBS snapshot lifecycle",
          "Cost Governance & Visibility: AWS Cost Explorer, AWS Budgets with automated SNS alerts, Cost Allocation Tags, and AWS Compute Optimizer"
        ]
      }
    ],
    "examCode": "SAA-C03"
  },
  {
    "id": "course-aws-security",
    "title": "AWS Certified Security - Specialty (SCS-C02)",
    "domain": "Cybersecurity",
    "certificationVendor": "AWS",
    "skillLevel": "Advanced",
    "format": "Live Online",
    "duration": "5 Days (40 Hours)",
    "rating": 4.9,
    "enrolled": 1980,
    "imageUrl": "/images/aws_architecture_diagram_1787771528914.webp",
    "imageAlt": "AWS Cloud Security and encryption architecture training",
    "summary": "Validate your expertise in creating and implementing advanced security solutions in the AWS Cloud with GuardDuty, Security Hub, KMS, and IAM governance.",
    "curriculum": [
      "Module 1: Threat Detection, AWS GuardDuty, Security Hub & EventBridge Automation",
      "Module 2: Infrastructure Security, AWS WAF, Shield DDoS & Network Firewall",
      "Module 3: Identity & Access Management (IAM), Organizations SCPs & Permission Boundaries",
      "Module 4: Data Protection, KMS Key Policies, CloudHSM & S3 Bucket Encryption",
      "Module 5: Security Incident Response, CloudTrail Forensics & SCS-C02 Mock Exam"
    ],
    "overview": "AWS Certified Security - Specialty (SCS-C02) demonstrates advanced technical expertise in securing the AWS cloud, covering threat detection, logging, incident response, infrastructure security, and identity governance.\n\nTargeted at security engineers, cloud security architects, and compliance specialists safeguarding enterprise AWS environments.",
    "learningObjectives": [
      "Implement threat detection, automated monitoring, and incident response using AWS native tools",
      "Harden infrastructure with AWS Network Firewall, AWS WAF, and VPC traffic mirroring",
      "Manage complex multi-account permissions using AWS Organizations and Service Control Policies (SCPs)",
      "Enforce data protection, encryption, and automated compliance auditing with AWS Config and Security Hub"
    ],
    "prerequisites": [
      "Minimum two years of hands-on experience securing AWS workloads",
      "AWS Certified Solutions Architect Associate or equivalent experience"
    ],
    "outline": [
      {
        "title": "1. Threat Detection and Incident Response (22%)",
        "items": [
          "Threat Intelligence & Detection: Amazon GuardDuty machine learning threat detection, Amazon Inspector CVE scans, and Amazon Macie PII scans",
          "Centralized Security Posture: AWS Security Hub findings consolidation, CIS AWS Foundations Benchmark audits, and Security Hub compliance standards",
          "Automated Incident Response: EventBridge event rules triggering AWS Lambda automated isolation of compromised EC2 instances or revoked IAM keys"
        ]
      },
      {
        "title": "2. Infrastructure Security (20%)",
        "items": [
          "Edge & Perimeter Protection: AWS WAF rate-limiting rules, bot control, AWS Shield Advanced DDoS mitigation, and AWS Firewall Manager",
          "Network Isolation & Inspection: AWS Network Firewall stateful inspection, Transit Gateway routing, and VPC Gateway/Interface endpoints (PrivateLink)",
          "Host & Endpoint Hardening: AWS Systems Manager Patch Manager, Session Manager for secure bastion-free access, and hardened AMI pipelines"
        ]
      },
      {
        "title": "3. Identity and Access Management (16%)",
        "items": [
          "Advanced IAM Policy Architecture: Attribute-Based Access Control (ABAC), permission boundaries, resource-based policies, and Condition keys",
          "Multi-Account Governance: AWS Organizations hierarchy, Service Control Policies (SCPs) preventing security disablement, and IAM Identity Center",
          "Workload Identity Federation: IAM Roles for Amazon EKS ServiceAccounts (IRSA), cross-account STS AssumeRole, and SAML 2.0 IdP integration"
        ]
      },
      {
        "title": "4. Data Protection and Encryption (22%)",
        "items": [
          "Cryptographic Key Management: AWS KMS customer-managed keys (CMK), multi-region keys, automated key rotation, and CloudHSM clusters",
          "Storage Encryption & Compliance: Amazon S3 default bucket encryption, S3 Object Lock compliance retention mode, and S3 Block Public Access",
          "Data in Transit Security: TLS certificate issuance with ACM, enforcing HTTPS via ALB listener rules, and TLS minimum protocol version policies"
        ]
      },
      {
        "title": "5. Management and Security Governance (20%)",
        "items": [
          "Comprehensive Audit Logging: AWS CloudTrail multi-region organizational trails, log file integrity validation, and CloudWatch log groups retention",
          "Configuration Drift & Compliance: AWS Config conformance packs, custom Config rules in Python, and automated drift remediation",
          "Secrets Lifecycle Management: AWS Secrets Manager automated database credential rotation and SSM Parameter Store secure string management"
        ]
      }
    ],
    "examCode": "SCS-C02"
  },
  {
    "id": "course-kubernetes-cka",
    "title": "Kubernetes & Cloud-Native Platform Engineering (CKA & CKS Prep)",
    "domain": "DevOps",
    "certificationVendor": "Cloud Native",
    "skillLevel": "Advanced",
    "format": "Live Online",
    "fastTrack": true,
    "duration": "5 Days (40 Hours)",
    "rating": 5,
    "enrolled": 3410,
    "imageUrl": "/images/kubernetes_devops_cluster_1788294296039.webp",
    "imageAlt": "Kubernetes CKA and container platform engineering laboratory",
    "summary": "Deploy, configure, secure, and troubleshoot production Kubernetes clusters from scratch. Master pods, services, ingress, storage, RBAC, and Helm deployments.",
    "curriculum": [
      "Module 1: Docker Containers, Kubernetes Architecture & Kubeadm Cluster Bootstrap",
      "Module 2: Pods, Deployments, ReplicaSets, StatefulSets, DaemonSets & Rollbacks",
      "Module 3: Cluster Networking, CoreDNS, ClusterIP, NodePort, LoadBalancer & Ingress",
      "Module 4: Persistent Storage (PV, PVC, StorageClasses), ConfigMaps, Secrets & RBAC",
      "Module 5: Cluster Troubleshooting, ETCD Backup/Restore, CKA/CKS Exam Lab Drills"
    ],
    "overview": "Kubernetes & Cloud-Native Platform Engineering (CKA & CKS Prep) prepares DevOps and platform engineers for the 100% hands-on performance-based Certified Kubernetes Administrator and Security Specialist certifications.\n\nIdeal for DevOps engineers, cloud platform engineers, site reliability engineers (SREs), and infrastructure administrators managing production Kubernetes clusters.",
    "learningObjectives": [
      "Install, configure, and upgrade production-ready multi-node Kubernetes clusters using kubeadm",
      "Deploy and scale resilient workloads with Deployments, StatefulSets, DaemonSets, and Jobs",
      "Configure cluster networking, CNI plugins, Service routing, and Ingress controllers",
      "Harden cluster security using RBAC, NetworkPolicies, pod security standards, and mTLS",
      "Troubleshoot cluster control plane components, worker nodes, and crashing container pods"
    ],
    "prerequisites": [
      "Familiarity with Linux command-line, container fundamentals (Docker/containerd), and basic networking"
    ],
    "outline": [
      {
        "title": "1. Cluster Architecture, Installation & Configuration (25%)",
        "items": [
          "Control Plane Components: kube-apiserver, kube-scheduler, kube-controller-manager, and etcd key-value datastore architecture",
          "High Availability Provisioning: Bootstrapping multi-control-plane clusters using kubeadm, stacked vs external etcd, and version upgrades",
          "etcd Backup & Restoration: Snapshotting etcd datastore with etcdctl, certificate verification, and disaster recovery procedures",
          "Node Management: Cordoning nodes, draining workloads for maintenance, and joining worker nodes with bootstrap tokens"
        ]
      },
      {
        "title": "2. Workloads & Scheduling (15%)",
        "items": [
          "Core Workload Resources: Pods, Deployments, rolling update strategies, rollbacks, StatefulSets, DaemonSets, and CronJobs",
          "Advanced Scheduling: Node selectors, node affinity / anti-affinity, pod affinity / anti-affinity, taints, tolerations, and custom schedulers",
          "Resource Optimization: Defining CPU/Memory requests and limits, LimitRanges, ResourceQuotas, and horizontal pod autoscaling (HPA)"
        ]
      },
      {
        "title": "3. Services & Networking (20%)",
        "items": [
          "Service Routing & Discovery: ClusterIP, NodePort, LoadBalancer services, endpoints, headless services, and CoreDNS resolution",
          "Network Policies: Restricting pod egress and ingress traffic using NetworkPolicy objects with CNI plugins (Calico, Cilium, Flannel)",
          "Ingress Controllers: Configuring Ingress resources, path-based routing, host-based routing, and TLS termination with Cert-Manager"
        ]
      },
      {
        "title": "4. Storage, Security & Hardening (20%)",
        "items": [
          "Storage Architecture: StorageClasses, dynamic volume provisioning, PersistentVolumes (PV), PersistentVolumeClaims (PVC), and access modes",
          "Role-Based Access Control (RBAC): Creating Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, and ServiceAccounts",
          "Security Context & Secrets: PodSecurityStandards (Privileged, Baseline, Restricted), securityContext (runAsUser, readOnlyRootFilesystem), and Secrets",
          "Cluster Hardening (CKS Prep): API server CIS benchmark hardening, admission controllers (Mutating/Validating Webhooks), and image scanning"
        ]
      },
      {
        "title": "5. Troubleshooting & Simulation Drill (20%)",
        "items": [
          "Control Plane Diagnostics: Troubleshooting failed static pods in /etc/kubernetes/manifests, inspecting kubelet systemd logs (journalctl)",
          "Worker Node Troubleshooting: Resolving NotReady node states, container runtime (containerd) crashes, and disk pressure eviction",
          "Workload Debugging: CrashLoopBackOff, ImagePullBackOff, OOMKilled errors, readiness/liveness probe failures, and interactive kubectl exec",
          "Performance Exam Drills: Timed hands-on terminal drills matching the Linux Foundation CKA & CKS official exam environment"
        ]
      }
    ],
    "examCode": "CKA & CKS"
  }
];
