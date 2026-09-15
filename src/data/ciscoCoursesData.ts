import { Course } from '../types';

export interface CiscoTrackDefinition {
  id: 'enterprise' | 'security' | 'service_provider' | 'wireless' | 'automation' | 'collaboration' | 'cybersecurity' | 'datacenter';
  name: string;
  shortName: string;
  badge: string;
  iconName: string;
  description: string;
}

export const CISCO_PROFESSIONAL_TRACKS: CiscoTrackDefinition[] = [
  {
    id: 'enterprise',
    name: 'CCNP Enterprise',
    shortName: 'Enterprise',
    badge: 'Enterprise Routing & SD-WAN',
    iconName: 'Network',
    description: 'Enterprise campus, advanced routing (BGP/OSPF), SD-WAN, and enterprise infrastructure automation.',
  },
  {
    id: 'security',
    name: 'CCNP Security',
    shortName: 'Security',
    badge: 'Firepower, ISE & Zero Trust',
    iconName: 'Shield',
    description: 'Next-Gen Firewalls (FTD/FMC), Cisco Identity Services Engine (ISE), VPNs, and security automation.',
  },
  {
    id: 'service_provider',
    name: 'CCNP Service Provider',
    shortName: 'Service Provider',
    badge: 'IOS XR & Segment Routing',
    iconName: 'Radio',
    description: 'Carrier-grade routing, Segment Routing (SR-MPLS/SRv6), BGP architectures, and carrier VPNs.',
  },
  {
    id: 'wireless',
    name: 'CCNP Wireless',
    shortName: 'Wireless',
    badge: 'Catalyst 9800 & Wi-Fi 6/6E',
    iconName: 'Layers',
    description: 'Enterprise wireless RF design, Catalyst 9800 WLC deployment, Wi-Fi 6/6E, and client mobility.',
  },
  {
    id: 'automation',
    name: 'CCNP Automation',
    shortName: 'DevNet Professional',
    badge: 'Python & Network CI/CD',
    iconName: 'Terminal',
    description: 'Software development, model-driven programmability (NETCONF/YANG), REST APIs, and DevOps automation.',
  },
  {
    id: 'collaboration',
    name: 'CCNP Collaboration',
    shortName: 'Collaboration',
    badge: 'CUCM & Webex UC',
    iconName: 'Users',
    description: 'Enterprise VoIP, Cisco Unified Communications Manager (CUCM), SIP call routing, and Webex integration.',
  },
  {
    id: 'cybersecurity',
    name: 'CCNP CyberSecurity',
    shortName: 'CyberOps Professional',
    badge: 'SOC & Digital Forensics',
    iconName: 'ShieldAlert',
    description: 'Security Operations Center (SOC) management, threat hunting, digital forensics, and incident analysis.',
  },
  {
    id: 'datacenter',
    name: 'CCNP Data Center',
    shortName: 'Data Center',
    badge: 'Nexus 9K & Cisco ACI',
    iconName: 'Server',
    description: 'Cisco Nexus switching, Application Centric Infrastructure (ACI), SAN fabrics, and UCS computing.',
  },
];

export const ciscoCourses: Course[] = [
  // =========================================================================
  // 1. ASSOCIATE LEVEL (Screenshot 1)
  // =========================================================================
  {
    id: 'course-cisco-ccna',
    title: 'Implementing and Administering Cisco Solutions (CCNA 200-301)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.95,
    enrolled: 4230,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco CCNA Implementing and Administering Solutions preview',
    summary: 'The industry benchmark for networking careers. Master IP routing, VLAN switching, wireless, security ACLs, and software-defined network automation.',
    ciscoCategory: 'associate',
    examCode: '200-301 CCNA',
    curriculum: [
      'Module 1: Network Fundamentals & IPv4/IPv6 Subnetting Architecture',
      'Module 2: Layer 2 Switching, VLANs, Trunks, EtherChannel & RSTP',
      'Module 3: IP Connectivity, Static Routing & Single-Area OSPFv2/v3',
      'Module 4: IP Services (NAT, DHCP, NTP, SNMP, QoS) & Network Security ACLs',
      'Module 5: Cisco DNA Center, REST APIs, JSON/YAML & Mock Certification Drill'
    ],
    overview: 'The Implementing and Administering Cisco Solutions (CCNA 200-301) course provides a comprehensive foundation for all network engineering careers. Through extensive hands-on virtual lab pods, you will learn how to install, operate, configure, and verify basic IPv4 and IPv6 networks.',
    learningObjectives: [
      'Configure and verify Layer 2 switches with VLANs, trunking, and Spanning Tree Protocol',
      'Implement IPv4 and IPv6 addressing, subnets, and dynamic routing using OSPFv2/v3',
      'Deploy network security controls, standard/extended ACLs, dynamic ARP inspection, and DHCP snooping',
      'Configure essential enterprise services including NAT/PAT, NTP, DNS, and SNMP monitoring',
      'Understand software-defined networking (SDN), Cisco DNA Center controller architecture, and REST APIs'
    ],
    prerequisites: [
      'Basic computer literacy and understanding of binary/IP addressing',
      'Familiarity with standard operating systems and command-line interfaces'
    ],
    outline: [
      { title: 'Module 1: Network Fundamentals & Topology (20%)', description: 'Network roles, OSI & TCP/IP models, physical cabling, IPv4/IPv6 addressing schemes and VLSM calculations.' },
      { title: 'Module 2: Network Access & Layer 2 Protocols (20%)', description: 'VLAN configuration, switchport modes, Spanning Tree (STP/RSTP), Cisco Discovery Protocol (CDP/LLDP), and EtherChannel bonding.' },
      { title: 'Module 3: IP Connectivity & Dynamic Routing (25%)', description: 'Routing tables, administrative distance, static routes, default gateways, and hands-on OSPF configuration.' },
      { title: 'Module 4: IP Services & Security Fundamentals (25%)', description: 'Inside/outside NAT, DHCP relay, access control lists (ACLs), Layer 2 port security, and WPA3 wireless security.' },
      { title: 'Module 5: Automation, Programmability & Exam Capstone (10%)', description: 'REST APIs, JSON payloads, Ansible/Puppet concepts, controller-managed networks, and comprehensive mock exam review.' }
    ]
  },
  {
    id: 'course-cisco-cyberops',
    title: 'Understanding Cisco Cybersecurity Operations Fundamentals (CBROPS 200-201)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.91,
    enrolled: 2150,
    imageUrl: '/images/comptia_security_soc_1787771516564.webp',
    imageAlt: 'Cisco CyberOps Associate preview',
    summary: 'Launch your cybersecurity analyst career with Cisco CyberOps Associate. Master SOC operations, security monitoring, host and network analysis, incident handling, and forensics.',
    ciscoCategory: 'associate',
    examCode: '200-201 CBROPS',
    curriculum: [
      'Module 1: Security Concepts, CIA Triad, Threat Modeling & CVSS Scoring',
      'Module 2: Security Monitoring, SOC Workflows & Incident Classification',
      'Module 3: Host-Based Analysis, Windows/Linux Logs, Processes & Malware Artifacts',
      'Module 4: Network Intrusion Analysis, PCAP Inspection & Snort Rules',
      'Module 5: Incident Response Playbooks, NIST/SANS Frameworks & Digital Forensics'
    ],
    overview: 'Cisco CyberOps Associate certification validates the tactical knowledge and skills that Security Operations Center (SOC) teams need to detect and respond to cybersecurity threats.',
    learningObjectives: [
      'Perform security monitoring and triage alerts in an enterprise SOC environment',
      'Analyze network traffic captures (PCAPs) using Wireshark and Zeek/Bro',
      'Examine Windows Event Logs and Linux system logs for IOCs (Indicators of Compromise)',
      'Execute incident response playbooks according to NIST SP 800-61 standards',
      'Map cyber attacks to the MITRE ATT&CK and Lockheed Martin Cyber Kill Chain frameworks'
    ],
    prerequisites: [
      'Basic familiarity with operating systems and networking concepts'
    ]
  },
  {
    id: 'course-cisco-devasc',
    title: 'Automating Networks Using Cisco Platforms (DevNet Associate DEVASC 200-901)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Intermediate',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.94,
    enrolled: 1890,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco DevNet DEVASC automation preview',
    summary: 'Master network automation, Python scripting, REST APIs, Cisco DNA Center, Meraki, Webex, and modern DevOps CI/CD pipelines on Cisco platforms.',
    ciscoCategory: 'associate',
    examCode: '200-901 DEVASC',
    curriculum: [
      'Module 1: Software Development & Design Basics, Python Data Formats (JSON, XML, YAML)',
      'Module 2: Understanding & Using Cisco REST APIs (DNA Center, Meraki, Webex)',
      'Module 3: Cisco Platforms & Network Automation (IOS XE, NX-OS, Meraki Dashboard APIs)',
      'Module 4: Application Deployment, Docker Containers, Security & CI/CD Pipelines',
      'Module 5: Infrastructure as Code (IaC), Git Workflows, pyATS & Model-Driven Telemetry'
    ],
    overview: 'The DevNet Associate (200-901 DEVASC) training validates your skills in software development and network automation for Cisco environments. Learn Python programming for network engineering and how to interact with modern controller APIs.',
    learningObjectives: [
      'Write robust Python scripts to interact with Cisco DNA Center and Meraki REST APIs',
      'Construct automated network tests using Cisco pyATS and Genie libraries',
      'Containerize applications with Docker and build automated CI/CD deployment pipelines',
      'Configure network devices programmatically using NETCONF and RESTCONF with YANG data models'
    ],
    prerequisites: [
      'Basic programming knowledge in Python and fundamental understanding of networking'
    ]
  },

  // =========================================================================
  // 2. PROFESSIONAL LEVEL (Screenshots 2 & 3: 8 Tracks, Core & Concentration)
  // =========================================================================

  // ------------------------- 1. CCNP ENTERPRISE -------------------------
  {
    id: 'course-cisco-ccnp-encor',
    title: 'Implementing and Operating Cisco Enterprise Network Core Technologies (ENCOR 350-401)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.95,
    enrolled: 3120,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco CCNP Enterprise ENCOR preview',
    summary: 'The flagship core exam for CCNP Enterprise and CCIE Enterprise. Master dual-stack architecture, virtualization (VRF, LISP, VXLAN), advanced routing (OSPF, BGP), SD-Access, SD-WAN, and Python automation.',
    ciscoCategory: 'professional',
    ciscoTrack: 'enterprise',
    ciscoExamType: 'core',
    examCode: '350-401 ENCOR',
    curriculum: [
      'Module 1: Enterprise Network Architecture (SD-WAN, SD-Access, QoS)',
      'Module 2: Virtualization, VRF, LISP, VXLAN & Hypervisor Networking',
      'Module 3: Layer 2/Layer 3 Infrastructure, EIGRP, OSPFv2/v3, and BGP Peering',
      'Module 4: Network Assurance, Telemetry, NetFlow, SPAN, and Cisco DNA Center',
      'Module 5: Security Architecture & Python/RESTCONF/NETCONF Automation'
    ],
    overview: 'The CCNP Enterprise Core (350-401 ENCOR) training gives you the knowledge and skills needed to configure, troubleshoot, and manage enterprise wired and wireless networks. It serves as the qualifying core exam for both CCNP Enterprise and CCIE Enterprise Infrastructure certifications.',
    learningObjectives: [
      'Architect resilient enterprise campus networks with Cisco SD-Access and Cisco SD-WAN',
      'Deploy advanced dynamic routing protocols including multi-area OSPF and external BGP',
      'Configure network virtualization with VRF-lite, GRE tunneling, LISP, and VXLAN',
      'Implement enterprise security controls including 802.1X port authentication and TrustSec',
      'Automate network tasks using Python scripts, REST APIs, YANG data models, and Ansible'
    ],
    prerequisites: ['Understanding of network fundamentals equivalent to Cisco CCNA level']
  },
  {
    id: 'course-cisco-ccnp-enarsi',
    title: 'Implementing Cisco Enterprise Advanced Routing & Services (ENARSI 300-410)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 1820,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco CCNP ENARSI routing preview',
    summary: 'Gain deep expertise in configuring, securing, and troubleshooting advanced enterprise routing protocols (BGP, EIGRP, OSPF), MPLS Layer 3 VPNs, DMVPN, and network telemetry.',
    ciscoCategory: 'professional',
    ciscoTrack: 'enterprise',
    ciscoExamType: 'concentration',
    examCode: '300-410 ENARSI',
    curriculum: [
      'Module 1: Advanced IPv4/IPv6 Routing, Route Redistribution & Route Maps',
      'Module 2: Enterprise Multi-Protocol BGP (eBGP & iBGP) Tuning & Path Selection',
      'Module 3: MPLS Architecture, LDP Labeling & Layer 3 VPN Configuration',
      'Module 4: DMVPN Phase 1/2/3, IPsec Encryption & Control Plane Policing (CoPP)',
      'Module 5: Advanced Infrastructure Troubleshooting, DNA Spaces & Telemetry'
    ],
    overview: 'Implementing Cisco Enterprise Advanced Routing and Services (CCNP ENARSI 300-410) validates professional-level knowledge in installing, configuring, operating, and troubleshooting enterprise networks.',
    learningObjectives: [
      'Configure advanced routing protocols including multi-area OSPFv2/OSPFv3, EIGRP, and external BGP',
      'Implement Layer 3 path control with route maps, prefix lists, and route redistribution',
      'Deploy enterprise VPN technologies including DMVPN, IPsec encryption, and MPLS Layer 3 VPNs'
    ],
    prerequisites: ['Cisco CCNA certification or equivalent enterprise routing experience']
  },
  {
    id: 'course-cisco-sdwan',
    title: 'Implementing Cisco SD-WAN Solutions (ENSDWI 300-415)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.92,
    enrolled: 1450,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco SD-WAN Architecture preview',
    summary: 'Design, deploy, and manage Cisco SD-WAN overlays with vManage, vSmart, vBond controllers, OMP routing, application-aware routing, and Direct Internet Access (DIA) policies.',
    ciscoCategory: 'professional',
    ciscoTrack: 'enterprise',
    ciscoExamType: 'concentration',
    examCode: '300-415 ENSDWI',
    curriculum: [
      'Module 1: Cisco SD-WAN Architecture, Controllers (vManage, vSmart, vBond)',
      'Module 2: WAN Edge Onboarding, Zero-Touch Provisioning (ZTP) & Templates',
      'Module 3: Overlay Management Protocol (OMP) & Data Plane Tunnels (IPsec/GRE)',
      'Module 4: Centralized Control Policies, Traffic Engineering & App-Aware Routing',
      'Module 5: SD-WAN Cloud OnRamp, Security Integration & Troubleshooting'
    ],
    overview: 'This comprehensive 5-day bootcamp prepares engineers to design, deploy, configure, and manage Cisco SD-WAN solution architecture.',
    learningObjectives: [
      'Deploy and operate Cisco SD-WAN controllers in public cloud and on-premise hypervisors',
      'Onboard Cisco Catalyst 8000 and ISR WAN edge routers using automated Zero-Touch Provisioning',
      'Configure feature and device configuration templates via Cisco vManage dashboard'
    ],
    prerequisites: ['CCNA or CCNP ENCOR foundational knowledge']
  },
  {
    id: 'course-cisco-ensld',
    title: 'Designing Cisco Enterprise Networks (ENSLD 300-420)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.88,
    enrolled: 980,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco ENSLD design preview',
    summary: 'Master enterprise network design, campus LAN architecture, WAN connectivity, SD-Access fabrics, QoS design, and IPv6 migration strategies.',
    ciscoCategory: 'professional',
    ciscoTrack: 'enterprise',
    ciscoExamType: 'concentration',
    examCode: '300-420 ENSLD',
    curriculum: [
      'Module 1: Enterprise Campus Network Design & Hierarchical Tiers',
      'Module 2: Enterprise Edge & WAN Design (MPLS, SD-WAN, Internet Edge)',
      'Module 3: Software-Defined Access (SD-Access) Fabric Design',
      'Module 4: Advanced Addressing, Routing Protocol Design & IPv6 Transition',
      'Module 5: End-to-End QoS Design & Enterprise Network Resiliency'
    ],
    overview: 'Learn how to design enterprise wired and wireless campus networks, SD-Access architectures, SD-WAN fabrics, and advanced QoS frameworks for optimal performance.',
    learningObjectives: [
      'Design modular enterprise campus networks for high availability and low latency',
      'Architect SD-Access fabrics with LISP control planes and VXLAN data planes',
      'Develop QoS policies matching mission-critical application requirements'
    ],
    prerequisites: ['ENCOR 350-401 or CCNA with design experience']
  },
  {
    id: 'course-cisco-enauto',
    title: 'Automating Cisco Enterprise Solutions (ENAUTO 300-435)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.93,
    enrolled: 1240,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco ENAUTO automation preview',
    summary: 'Master enterprise network automation using Python, RESTCONF, NETCONF, Cisco DNA Center APIs, Cisco SD-WAN vManage APIs, and Meraki Dashboard APIs.',
    ciscoCategory: 'professional',
    ciscoTrack: 'enterprise',
    ciscoExamType: 'concentration',
    examCode: '300-435 ENAUTO',
    curriculum: [
      'Module 1: Network Programmability Foundations, Git, RESTCONF, NETCONF & YANG',
      'Module 2: Automating Cisco DNA Center with REST APIs & Webhooks',
      'Module 3: Automating Cisco SD-WAN with vManage REST APIs',
      'Module 4: Automating Cisco Meraki Networks with Dashboard APIs',
      'Module 5: Model-Driven Telemetry, pyATS Automated Testing & Ansible Playbooks'
    ],
    overview: 'Prepare for the ENAUTO concentration exam by mastering automated provisioning, configuration management, and telemetry workflows across Cisco enterprise platforms.',
    learningObjectives: [
      'Write Python scripts to automate Cisco DNA Center, SD-WAN, and Meraki networks',
      'Use YANG data models with NETCONF and RESTCONF on IOS XE devices',
      'Automate network testing and state verification with Cisco pyATS'
    ],
    prerequisites: ['CCNP ENCOR or DevNet Associate fundamentals']
  },

  // ------------------------- 2. CCNP SECURITY -------------------------
  {
    id: 'course-cisco-scor',
    title: 'Implementing and Operating Cisco Security Core Technologies (SCOR 350-701)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.94,
    enrolled: 2680,
    imageUrl: '/images/cyber_soc_shield_1788294406797.webp',
    imageAlt: 'Cisco CCNP Security SCOR preview',
    summary: 'The core exam for CCNP Security and CCIE Security. Master cybersecurity infrastructure, Cisco Firepower NGFW, Cisco ISE, Umbrella, Stealthwatch, and Cloud Security.',
    ciscoCategory: 'professional',
    ciscoTrack: 'security',
    ciscoExamType: 'core',
    examCode: '350-701 SCOR',
    curriculum: [
      'Module 1: Cybersecurity Fundamentals, Threat Vectors, Cryptography & PKI',
      'Module 2: Network Security, Cisco Firepower NGFW/NGIPS & Site-to-Site VPNs',
      'Module 3: Secure Network Access, Cisco ISE 802.1X Authentication & TrustSec',
      'Module 4: Cloud & Content Security (Cisco Umbrella, WSA, ESA, Cloudlock)',
      'Module 5: Endpoint Protection (Cisco Secure Endpoint / AMP) & Automation'
    ],
    overview: 'The CCNP Security Core (350-701 SCOR) course equips network security engineers with the skills required to implement and operate core Cisco security solutions.',
    learningObjectives: [
      'Configure Cisco Next-Generation Firewalls (NGFW) and intrusion prevention (NGIPS) rules',
      'Implement identity-based network access control using Cisco Identity Services Engine (ISE)',
      'Deploy secure remote access and site-to-site VPNs using Cisco AnyConnect and IPsec/IKEv2'
    ],
    prerequisites: ['Working knowledge of Cisco networking fundamentals and TCP/IP security concepts']
  },
  {
    id: 'course-cisco-sncf',
    title: 'Securing Networks with Cisco Firepower Next-Generation IPS (SNCF 300-710)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.88,
    enrolled: 1390,
    imageUrl: '/images/cyber_soc_shield_1788294406797.webp',
    imageAlt: 'Cisco Firepower SNCF preview',
    summary: 'Master Cisco Firepower Threat Defense (FTD) and Firepower Management Center (FMC). Configure access control policies, SSL/TLS decryption, Snort IPS rules, and VPNs.',
    ciscoCategory: 'professional',
    ciscoTrack: 'security',
    ciscoExamType: 'concentration',
    examCode: '300-710 SNCF',
    curriculum: [
      'Module 1: Cisco FTD & FMC Deployment Modes, Routing & NAT Configuration',
      'Module 2: Access Control Policies, Prefilter Rules & Application Visibility (AVC)',
      'Module 3: Snort 3 Next-Gen IPS (NGIPS) Tuning, File Policies & AMP for Networks',
      'Module 4: SSL/TLS Decryption, Identity Policies & Realm Directory Sync',
      'Module 5: Site-to-Site & Remote Access VPNs, Clustering & FMC Diagnostics'
    ],
    overview: 'Deploy and manage Cisco Firepower Threat Defense (FTD) systems using Cisco Firepower Management Center (FMC) for advanced threat prevention.',
    learningObjectives: [
      'Deploy Cisco FTD hardware and virtual appliances in routed and transparent modes',
      'Configure deep packet inspection rules with Snort 3 intrusion prevention technology',
      'Implement SSL/TLS forward proxy decryption to inspect encrypted enterprise traffic'
    ],
    prerequisites: ['CCNA Security or SCOR 350-701 foundation']
  },
  {
    id: 'course-cisco-sise',
    title: 'Implementing and Configuring Cisco Identity Services Engine (SISE 300-715)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.93,
    enrolled: 1620,
    imageUrl: '/images/cyber_soc_shield_1788294406797.webp',
    imageAlt: 'Cisco ISE SISE Identity Services Engine preview',
    summary: 'Comprehensive deep dive into Cisco ISE deployment, 802.1X wired and wireless authentication, MAB, guest portal management, BYOD onboarding, and posture compliance.',
    ciscoCategory: 'professional',
    ciscoTrack: 'security',
    ciscoExamType: 'concentration',
    examCode: '300-715 SISE',
    curriculum: [
      'Module 1: Cisco ISE Architecture, Distributed Personas & Node Deployment',
      'Module 2: 802.1X & MAB Wired/Wireless Authentication, Policy Sets & Auth Rules',
      'Module 3: Web Authentication, Sponsored Guest Portals & Self-Service Workflows',
      'Module 4: Cisco ISE Profiling Engine, Device Categorization & TrustSec SGTs',
      'Module 5: BYOD Device Onboarding, Posture Assessment & pxGrid Integrations'
    ],
    overview: 'Master Cisco Identity Services Engine (ISE) to deliver centralized identity, policy, and access control across wired, wireless, and VPN enterprise endpoints.',
    learningObjectives: [
      'Deploy and administer high-availability distributed Cisco ISE appliance clusters',
      'Configure authentication and authorization policy sets for 802.1X and MAC Authentication Bypass',
      'Enforce endpoint posture checks and compliance remediation using Cisco AnyConnect Posture'
    ],
    prerequisites: ['CCNP Security SCOR or CCNA networking foundation']
  },
  {
    id: 'course-cisco-svpn',
    title: 'Implementing Secure Solutions with Virtual Private Networks (SVPN 300-730)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.89,
    enrolled: 1110,
    imageUrl: '/images/cyber_soc_shield_1788294406797.webp',
    imageAlt: 'Cisco SVPN training preview',
    summary: 'Master site-to-site and remote access VPNs, IPsec IKEv2, DMVPN, FlexVPN, Cisco AnyConnect SSL VPNs, and high-availability cryptographic architectures.',
    ciscoCategory: 'professional',
    ciscoTrack: 'security',
    ciscoExamType: 'concentration',
    examCode: '300-730 SVPN',
    curriculum: [
      'Module 1: IPsec & IKEv2 Fundamentals, Cryptographic Algorithms & PKI',
      'Module 2: Site-to-Site IPsec VPNs on Cisco IOS XE & Cisco Secure Firewall',
      'Module 3: Dynamic Multipoint VPN (DMVPN) Phase 1/2/3 with IPsec Encryption',
      'Module 4: Cisco FlexVPN Architecture, Dual-Hub Deployment & AAA Integration',
      'Module 5: Cisco AnyConnect Secure Mobility SSL/IKEv2 Remote Access VPNs'
    ],
    overview: 'Implement secure communications across remote sites and mobile workforces using Cisco VPN technologies including FlexVPN, DMVPN, and AnyConnect.',
    learningObjectives: [
      'Deploy and troubleshoot IKEv2 site-to-site VPN tunnels',
      'Configure resilient FlexVPN topologies with PKI authentication',
      'Implement enterprise remote access VPNs with Cisco AnyConnect'
    ],
    prerequisites: ['CCNP SCOR 350-701 or equivalent network security experience']
  },
  {
    id: 'course-cisco-sauto',
    title: 'Automating and Programming Cisco Security Solutions (SAUTO 300-735)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.91,
    enrolled: 890,
    imageUrl: '/images/cyber_soc_shield_1788294406797.webp',
    imageAlt: 'Cisco SAUTO security automation preview',
    summary: 'Automate security operations with Python, REST APIs for Cisco Firepower FMC, Cisco ISE REST APIs, Cisco Umbrella, and Cisco Threat Response (XDR).',
    ciscoCategory: 'professional',
    ciscoTrack: 'security',
    ciscoExamType: 'concentration',
    examCode: '300-735 SAUTO',
    curriculum: [
      'Module 1: Security Automation Tools, Python, Git, Postman & REST APIs',
      'Module 2: Automating Cisco Firepower Management Center (FMC) via REST APIs',
      'Module 3: Automating Cisco ISE with ERS & pxGrid Python Telemetry',
      'Module 4: Cisco Umbrella & SecureX / XDR Automated Threat Hunting',
      'Module 5: Automated Incident Response Playbooks & Threat Containment'
    ],
    overview: 'Learn how to automate network security and SOC incident response workflows across Cisco Firepower, ISE, Umbrella, and XDR platforms.',
    learningObjectives: [
      'Automate firewall policy updates via FMC REST APIs',
      'Query and isolate infected endpoints through Cisco ISE pxGrid automation',
      'Build automated security triage pipelines with Cisco XDR APIs'
    ],
    prerequisites: ['CCNP SCOR 350-701 or DevNet Associate experience']
  },

  // ------------------------- 3. CCNP SERVICE PROVIDER -------------------------
  {
    id: 'course-cisco-spcor',
    title: 'Implementing and Operating Cisco Service Provider Network Core Technologies (SPCOR 350-501)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.92,
    enrolled: 1120,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco SPCOR preview',
    summary: 'Core exam for CCNP Service Provider. Master Cisco IOS XR, Segment Routing (SR-MPLS, SRv6), IS-IS, BGP, MPLS L3VPN, Carrier Ethernet, and QoS in carrier networks.',
    ciscoCategory: 'professional',
    ciscoTrack: 'service_provider',
    ciscoExamType: 'core',
    examCode: '350-501 SPCOR',
    curriculum: [
      'Module 1: Cisco IOS XR Architecture, Install & Administration',
      'Module 2: Service Provider Core Routing (IS-IS, OSPF, MP-BGP)',
      'Module 3: Segment Routing (SR-MPLS, SRv6) & MPLS Traffic Engineering',
      'Module 4: Carrier Ethernet (EVPN, VPLS, VPWS) & Layer 3 MPLS VPNs',
      'Module 5: Service Provider Security, QoS & Network Programmability'
    ],
    overview: 'Master carrier-grade networking with Cisco IOS XR, Segment Routing, EVPN, and multi-protocol BGP on Cisco ASR 9000 and NCS routers.',
    learningObjectives: [
      'Configure Cisco IOS XR devices with IS-IS and BGP route reflectors',
      'Deploy Segment Routing and MPLS L3VPN carrier architectures',
      'Implement EVPN for multi-tenant Carrier Ethernet services'
    ],
    prerequisites: ['CCNA level knowledge with solid IP routing experience']
  },
  {
    id: 'course-cisco-spri',
    title: 'Implementing Cisco Service Provider Advanced Routing Solutions (SPRI 300-510)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 740,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco SPRI preview',
    summary: 'Master advanced BGP scalability, Segment Routing Path Computation Element (SR-PCE), multi-area IS-IS, and multicast routing in carrier backbones.',
    ciscoCategory: 'professional',
    ciscoTrack: 'service_provider',
    ciscoExamType: 'concentration',
    examCode: '300-510 SPRI',
    curriculum: [
      'Module 1: Advanced BGP Architectures & Fast Convergence in Service Providers',
      'Module 2: Segment Routing Traffic Engineering (SR-TE) & PCE Policies',
      'Module 3: Advanced IS-IS Optimization, Multi-Instance & LFA Fast Reroute',
      'Module 4: Multicast Routing (PIM-SM, SSM, MVPN) in MPLS Networks',
      'Module 5: Troubleshooting Service Provider Routing Fabrics'
    ],
    overview: 'Deep dive into advanced routing optimizations, SR-TE policies, and high-performance carrier backbones.',
    learningObjectives: [
      'Implement SR-TE with automated path computation and SLA enforcement',
      'Deploy scalable BGP architectures with optimal routing and BGP-LU'
    ],
    prerequisites: ['SPCOR 350-501 or equivalent service provider experience']
  },
  {
    id: 'course-cisco-spvi',
    title: 'Implementing Cisco Service Provider VPN Services (SPVI 300-515)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.89,
    enrolled: 690,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco SPVI preview',
    summary: 'Master Carrier Ethernet, EVPN, MPLS Layer 3 VPN Inter-AS (Option A/B/C), and Cisco IOS XR VPN deployments for enterprise business clients.',
    ciscoCategory: 'professional',
    ciscoTrack: 'service_provider',
    ciscoExamType: 'concentration',
    examCode: '300-515 SPVI',
    curriculum: [
      'Module 1: MPLS Layer 3 VPN Architecture & Advanced VRF Routing',
      'Module 2: Inter-AS Layer 3 VPNs (Option A, Option B, Option C, CSC)',
      'Module 3: Layer 2 VPNs, VPWS, VPLS, and EVPN Deployments',
      'Module 4: IPv6 VPN Provider Edge (6PE & 6VPE) Solutions',
      'Module 5: Quality of Service (QoS) for Service Provider VPNs'
    ],
    overview: 'Deliver scalable Layer 2 and Layer 3 VPN solutions over carrier MPLS and Segment Routing networks.',
    learningObjectives: [
      'Deploy Inter-AS MPLS VPNs between global carrier Autonomous Systems',
      'Configure EVPN with multi-homing on Cisco IOS XR routers'
    ],
    prerequisites: ['SPCOR 350-501 foundation']
  },

  // ------------------------- 4. CCNP WIRELESS -------------------------
  {
    id: 'course-cisco-wireless-core',
    title: 'Implementing and Operating Cisco Enterprise Wireless Core (ENCOR 350-401 Wireless)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.93,
    enrolled: 1420,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco Enterprise Wireless Core preview',
    summary: 'Master enterprise wireless infrastructure, Cisco Catalyst 9800 WLCs, Wi-Fi 6/6E RF design, roaming architectures, and Cisco DNA Spaces.',
    ciscoCategory: 'professional',
    ciscoTrack: 'wireless',
    ciscoExamType: 'core',
    examCode: '350-401 ENCOR',
    curriculum: [
      'Module 1: Enterprise Wireless Architecture & Catalyst 9800 WLC Deployment',
      'Module 2: Wi-Fi 6/6E (802.11ax), RF Spectrum Management & RRM',
      'Module 3: Layer 2/Layer 3 Client Roaming, Mobility Groups & FlexConnect',
      'Module 4: Enterprise Wireless Security (802.1X, WPA3-Enterprise, Cisco ISE)',
      'Module 5: Location Services, Cisco DNA Spaces & Wireless Assurance Telemetry'
    ],
    overview: 'Gain enterprise-level mastery over Cisco Catalyst 9800 Wireless Controllers, Wi-Fi 6 access points, and software-defined wireless mobility fabrics.',
    learningObjectives: [
      'Deploy Cisco Catalyst 9800 WLCs in centralized, FlexConnect, and embedded modes',
      'Configure 802.1X enterprise wireless authentication integrated with Cisco ISE'
    ],
    prerequisites: ['CCNA or foundational wireless networking experience']
  },
  {
    id: 'course-cisco-enwlsd',
    title: 'Designing Cisco Enterprise Wireless Networks (ENWLSD 300-425)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.88,
    enrolled: 820,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco ENWLSD Wireless Design preview',
    summary: 'Conduct wireless site surveys, predictive RF modeling (Ekahau), high-density Wi-Fi design, voice/video QoS over wireless, and real-time location services (RTLS).',
    ciscoCategory: 'professional',
    ciscoTrack: 'wireless',
    ciscoExamType: 'concentration',
    examCode: '300-425 ENWLSD',
    curriculum: [
      'Module 1: Wireless Site Survey Methodologies (Predictive, Passive, Active)',
      'Module 2: RF Design for High-Density Stadiums, Hospitals & Auditoriums',
      'Module 3: Designing for Real-Time Voice, Video & BLE Location Services',
      'Module 4: Wireless Mesh & Outdoor Bridging Architecture Design',
      'Module 5: Post-Deployment Validation & Spectrum Heatmap Analysis'
    ],
    overview: 'Learn professional RF design methodologies to engineer high-capacity wireless networks that meet strict voice, video, and location requirements.',
    learningObjectives: [
      'Conduct professional RF site surveys with industry-standard predictive tools',
      'Design high-density Wi-Fi networks resistant to co-channel interference'
    ],
    prerequisites: ['ENCOR 350-401 or CCNA Wireless']
  },
  {
    id: 'course-cisco-enwlsi',
    title: 'Implementing Cisco Enterprise Wireless Networks (ENWLSI 300-430)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.91,
    enrolled: 860,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco ENWLSI Wireless Implementation preview',
    summary: 'Implement and troubleshoot FlexConnect, Cisco CMX / DNA Spaces, TrustSec over wireless, multicast video streams, and client roaming issues.',
    ciscoCategory: 'professional',
    ciscoTrack: 'wireless',
    ciscoExamType: 'concentration',
    examCode: '300-430 ENWLSI',
    curriculum: [
      'Module 1: Advanced Catalyst 9800 Configuration Profiles & Tags',
      'Module 2: FlexConnect Local Switching, Local Auth & Resiliency',
      'Module 3: Cisco DNA Spaces Location Tracking & BLE Integration',
      'Module 4: Wireless Multicast, mDNS Gateway & Fast BSS Transition (802.11r/k/v)',
      'Module 5: Wireless Client Troubleshooting, Radio Packet Captures & Telemetry'
    ],
    overview: 'Implement advanced features on Cisco Catalyst 9800 WLCs including FlexConnect branch architectures, fast roaming, and guest access.',
    learningObjectives: [
      'Configure Catalyst 9800 Policy Profiles, AP Join Profiles, and Tag Mappings',
      'Deploy seamless 802.11r/k/v fast roaming for mobile enterprise endpoints'
    ],
    prerequisites: ['ENCOR 350-401 or CCNA Wireless foundation']
  },

  // ------------------------- 5. CCNP AUTOMATION (DEVNET PROFESSIONAL) -------------------------
  {
    id: 'course-cisco-devcor',
    title: 'Developing Applications and Automating Workflows using Cisco Core Platforms (DevNet DEVCOR 350-901)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.95,
    enrolled: 1890,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco DevNet DEVCOR automation preview',
    summary: 'Core exam for DevNet Professional. Master software design, Python network automation, REST APIs, Cisco DNA Center, Meraki, ACI, and container deployment.',
    ciscoCategory: 'professional',
    ciscoTrack: 'automation',
    ciscoExamType: 'core',
    examCode: '350-901 DEVCOR',
    curriculum: [
      'Module 1: Software Design Patterns, Microservices, CI/CD Pipelines & Docker',
      'Module 2: Using Cisco APIs (DNA Center, Meraki, ACI, SD-WAN, FMC)',
      'Module 3: Network Programmability with NETCONF, RESTCONF, YANG & pyATS',
      'Module 4: Infrastructure as Code (IaC) with Ansible, Terraform & GitOps',
      'Module 5: Application Deployment, Security (OAuth 2.0) & Telemetry Pipelines'
    ],
    overview: 'Prepare for Cisco DevNet Professional certification by mastering software engineering techniques applied to network infrastructure.',
    learningObjectives: [
      'Develop scalable Python applications utilizing REST APIs across all Cisco platforms',
      'Automate network testing and state validation using Cisco pyATS framework',
      'Deploy infrastructure configurations using Terraform and Ansible playbooks'
    ],
    prerequisites: ['Intermediate Python programming and foundational networking knowledge']
  },
  {
    id: 'course-cisco-dev-dcauto',
    title: 'Automating and Programming Cisco Data Center Solutions (DCAUTO 300-635)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.9,
    enrolled: 710,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco DCAUTO Data Center Automation preview',
    summary: 'Automate data center infrastructure using Cisco NX-OS APIs, Cisco ACI Cobra SDK, Intersight REST APIs, Ansible, and Terraform.',
    ciscoCategory: 'professional',
    ciscoTrack: 'automation',
    ciscoExamType: 'concentration',
    examCode: '300-635 DCAUTO',
    curriculum: [
      'Module 1: Cisco NX-OS Programmability (NX-API CLI, RESTCONF, YANG, GuestShell)',
      'Module 2: Automating Cisco ACI with REST APIs, Postman & Python Cobra SDK',
      'Module 3: Cisco Intersight Cloud API & Bare-Metal Server Provisioning',
      'Module 4: Infrastructure as Code with Ansible & Terraform for Data Centers',
      'Module 5: Streaming Telemetry, Nexus Dashboard & Automated Day-2 Ops'
    ],
    overview: 'Automate Cisco Nexus, ACI fabrics, and UCS compute platforms using Python scripts, Ansible playbooks, and Terraform providers.',
    learningObjectives: [
      'Write Python scripts against Cisco ACI APIC REST APIs and Cobra SDK',
      'Automate Cisco Nexus switch configurations using NX-API and Ansible'
    ],
    prerequisites: ['DCCOR 350-601 or DevNet Associate experience']
  },
  {
    id: 'course-cisco-dev-iot',
    title: 'Developing Solutions Using Cisco IoT and Edge Platforms (DEVIOT 300-915)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.87,
    enrolled: 540,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco DEVIOT IoT preview',
    summary: 'Build edge computing applications on Cisco IOx, manage Industrial IoT routers (IR1101), Cisco Cyber Vision APIs, and edge data processing.',
    ciscoCategory: 'professional',
    ciscoTrack: 'automation',
    ciscoExamType: 'concentration',
    examCode: '300-915 DEVIOT',
    curriculum: [
      'Module 1: Cisco IoT Architecture, Edge Computing & Industrial Routers',
      'Module 2: Developing & Packaging Apps for Cisco IOx Containers (Docker/Python)',
      'Module 3: Managing IoT Edge Gateways with Cisco IoT Operations Dashboard',
      'Module 4: Industrial Cybersecurity Automation with Cisco Cyber Vision APIs',
      'Module 5: Edge Data Streaming (MQTT, CoAP, Kafka) & Cloud Ingestion'
    ],
    overview: 'Develop edge computing applications and automate industrial IoT devices on Cisco ruggedized network platforms.',
    learningObjectives: [
      'Package microservices into Docker containers deployed onto Cisco IOx edge routers',
      'Extract operational telemetry from OT networks with Cisco Cyber Vision APIs'
    ],
    prerequisites: ['Python proficiency and foundational DevNet knowledge']
  },

  // ------------------------- 6. CCNP COLLABORATION -------------------------
  {
    id: 'course-cisco-clcor',
    title: 'Implementing and Operating Cisco Collaboration Core Technologies (CLCOR 350-801)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.89,
    enrolled: 980,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco Collaboration CLCOR preview',
    summary: 'Master enterprise voice and video communications with Cisco Unified Communications Manager (CUCM), Cisco Expressway, SIP protocols, Webex, and QoS.',
    ciscoCategory: 'professional',
    ciscoTrack: 'collaboration',
    ciscoExamType: 'core',
    examCode: '350-801 CLCOR',
    curriculum: [
      'Module 1: Cisco Unified Communications Architecture & CUCM Deployment',
      'Module 2: SIP Signaling, Call Routing, Dial Plans & URI Calling',
      'Module 3: Cisco Expressway Mobile and Remote Access (MRA) & B2B Calling',
      'Module 4: Cisco Unity Connection (Voicemail) & Cisco Jabber/Webex App',
      'Module 5: Collaboration QoS, CAC Bandwidth Management & Troubleshooting'
    ],
    overview: 'Prepares engineers for the CCNP Collaboration certification. Covers configuring, troubleshooting, and administering enterprise VoIP and UC architectures.',
    learningObjectives: [
      'Administer Cisco Unified Communications Manager (CUCM) clusters and IP phones',
      'Build robust dial plans, route patterns, SIP trunks, and transformation patterns',
      'Configure Cisco Expressway-C and Expressway-E for secure firewall traversal and MRA'
    ],
    prerequisites: ['Basic networking and voice fundamentals']
  },
  {
    id: 'course-cisco-clica',
    title: 'Implementing Cisco Collaboration Applications (CLICA 300-810)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.88,
    enrolled: 620,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco CLICA Applications preview',
    summary: 'Master Single Sign-On (SSO), Cisco Unity Connection voicemail clustering, Cisco Unified IM and Presence (IM&P), and Cisco Jabber client configurations.',
    ciscoCategory: 'professional',
    ciscoTrack: 'collaboration',
    ciscoExamType: 'concentration',
    examCode: '300-810 CLICA',
    curriculum: [
      'Module 1: Cisco Unified IM & Presence Architecture & Deployment',
      'Module 2: Cisco Unity Connection Advanced Voicemail & Auto-Attendants',
      'Module 3: Enterprise Single Sign-On (SAML 2.0 / IdP) Integration',
      'Module 4: Cisco Jabber Deployment, Custom Configurations & Softphone Client',
      'Module 5: Troubleshooting Collaboration Applications with RTMT & Logs'
    ],
    overview: 'Deploy and integrate Cisco collaboration applications including IM & Presence, Unity Connection, and SAML SSO.',
    learningObjectives: [
      'Configure high-availability Cisco Unity Connection voicemail clusters',
      'Integrate Cisco Unified IM&P with Microsoft Active Directory and CUCM'
    ],
    prerequisites: ['CLCOR 350-801 foundation']
  },
  {
    id: 'course-cisco-claccm',
    title: 'Implementing Cisco Advanced Call Control and Mobility Services (CLACCM 300-815)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.87,
    enrolled: 580,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco CLACCM Call Control preview',
    summary: 'Master Cisco Unified Border Element (CUBE), SIP normalization scripts, Session Recording, Globalization/Localization dial plans, and SRST survivability.',
    ciscoCategory: 'professional',
    ciscoTrack: 'collaboration',
    ciscoExamType: 'concentration',
    examCode: '300-815 CLACCM',
    curriculum: [
      'Module 1: Advanced SIP Call Routing, Dial Plans & E.164 Globalization',
      'Module 2: Cisco Unified Border Element (CUBE) SBC Configuration & SIP Trunks',
      'Module 3: Survivable Remote Site Telephony (SRST) & Call Preservation',
      'Module 4: Cisco Extension Mobility & Mobile Voice Access (MVA)',
      'Module 5: Media Resources, Transcoding, Conferencing & CUBE Media Forking'
    ],
    overview: 'Configure enterprise-scale SIP trunks, session border controllers (CUBE), and advanced mobility features.',
    learningObjectives: [
      'Configure Cisco Unified Border Element (CUBE) session border controllers',
      'Implement globalized E.164 dial plans with localized digit transformations'
    ],
    prerequisites: ['CLCOR 350-801 or senior VoIP experience']
  },

  // ------------------------- 7. CCNP CYBERSECURITY (CYBEROPS PROFESSIONAL) -------------------------
  {
    id: 'course-cisco-cbrcor',
    title: 'Performing CyberOps Using Cisco Security Technologies (CBRCOR 350-201)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.93,
    enrolled: 1350,
    imageUrl: '/images/cyber_soc_shield_1788294406797.webp',
    imageAlt: 'Cisco CyberOps Professional Core preview',
    summary: 'Core exam for Cisco Certified CyberOps Professional. Master advanced threat detection, cloud SOC telemetry, incident response, SIEM/SOAR playbooks, and threat hunting.',
    ciscoCategory: 'professional',
    ciscoTrack: 'cybersecurity',
    ciscoExamType: 'core',
    examCode: '350-201 CBRCOR',
    curriculum: [
      'Module 1: Advanced Threat Intelligence, MITRE ATT&CK & Threat Modeling',
      'Module 2: Cloud Security Telemetry & Multi-Cloud SOC Monitoring',
      'Module 3: Host & Endpoint Digital Forensics (Memory, Disk, Logs)',
      'Module 4: Network Forensics, Full Packet Capture (FPC) & Intrusion Analysis',
      'Module 5: Security Automation, SOAR Incident Response Playbooks & Threat Hunting'
    ],
    overview: 'The core certification exam for senior cybersecurity analysts and SOC tier-2/tier-3 leads operating enterprise security platforms.',
    learningObjectives: [
      'Lead incident response investigations following NIST SP 800-61 and ISO 27035 standards',
      'Perform live endpoint memory forensics and artifact extraction during active breaches',
      'Automate SOC threat hunting workflows using Python and SIEM/SOAR APIs'
    ],
    prerequisites: ['Cisco CyberOps Associate (CBROPS 200-201) or Security+ with SOC experience']
  },
  {
    id: 'course-cisco-cbrfir',
    title: 'Conducting Forensics and Incident Analysis Using Cisco CyberOps Technologies (CBRFIR 300-215)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.91,
    enrolled: 880,
    imageUrl: '/images/cyber_soc_shield_1788294406797.webp',
    imageAlt: 'Cisco CBRFIR Incident Response preview',
    summary: 'Master digital forensics, chain of custody, reverse engineering malware samples, investigating compromised endpoints, and post-incident reporting.',
    ciscoCategory: 'professional',
    ciscoTrack: 'cybersecurity',
    ciscoExamType: 'concentration',
    examCode: '300-215 CBRFIR',
    curriculum: [
      'Module 1: Digital Forensics Principles, Evidence Handling & Chain of Custody',
      'Module 2: Windows & Linux Artifact Analysis (MFT, Registry, Syslog, Prefetch)',
      'Module 3: Static & Dynamic Malware Analysis in Isolated Sandboxes',
      'Module 4: Investigating Cloud Breaches (AWS CloudTrail, Azure Monitor, M365)',
      'Module 5: Root-Cause Analysis, Remediation & Executive Incident Reports'
    ],
    overview: 'Specialized deep-dive into digital forensics, malicious code analysis, and post-breach incident response operations.',
    learningObjectives: [
      'Extract and preserve digital evidence adhering to legal chain-of-custody standards',
      'Analyze malware samples in sandboxed environments to uncover C2 communication channels'
    ],
    prerequisites: ['CBRCOR 350-201 or equivalent incident response experience']
  },

  // ------------------------- 8. CCNP DATA CENTER -------------------------
  {
    id: 'course-cisco-dccor',
    title: 'Implementing and Operating Cisco Data Center Core Technologies (DCCOR 350-601)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.91,
    enrolled: 1540,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco Data Center DCCOR preview',
    summary: 'Core exam for CCNP Data Center. Master Cisco Nexus 9000 switches, Cisco ACI fabric, Storage Area Networks (MDS Fibre Channel), UCS computing, and Intersight.',
    ciscoCategory: 'professional',
    ciscoTrack: 'datacenter',
    ciscoExamType: 'core',
    examCode: '350-601 DCCOR',
    curriculum: [
      'Module 1: Cisco Data Center Network Architecture (Nexus 9K, VXLAN EVPN Fabric)',
      'Module 2: Cisco ACI Concepts, Spine-Leaf Architecture, APIC, Tenants & EPGs',
      'Module 3: Storage Area Networking (SAN), Fibre Channel, FCoE & Cisco MDS Switches',
      'Module 4: Cisco UCS Compute Architecture, Service Profiles & Cisco Intersight',
      'Module 5: Data Center Security, Network Automation (Python, NX-OS APIs, Ansible)'
    ],
    overview: 'Master data center infrastructure operations with Cisco Nexus switches, Cisco Application Centric Infrastructure (ACI), Cisco UCS servers, and SAN storage fabrics.',
    learningObjectives: [
      'Configure Cisco Nexus switches with vPC, VXLAN EVPN, and OSPF/BGP underlays',
      'Deploy Cisco ACI policy model including Tenants, VRFs, Bridge Domains, and Application Profiles'
    ],
    prerequisites: ['Familiarity with data center networking, storage, and server virtualization']
  },
  {
    id: 'course-cisco-dcid',
    title: 'Designing Cisco Data Center Infrastructure (DCID 300-610)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.89,
    enrolled: 820,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco DCID Data Center Design preview',
    summary: 'Design modern data center routing and switching fabrics (VXLAN EVPN), Cisco ACI Multi-Pod/Multi-Site, SAN storage networks, and compute virtualization.',
    ciscoCategory: 'professional',
    ciscoTrack: 'datacenter',
    ciscoExamType: 'concentration',
    examCode: '300-610 DCID',
    curriculum: [
      'Module 1: Data Center Network Architecture Design & VXLAN EVPN Overlays',
      'Module 2: Cisco ACI Multi-Pod, Multi-Site & Cloud ACI Design',
      'Module 3: Storage Area Networking Design (Fibre Channel, NVMe-oF, MDS Fabrics)',
      'Module 4: Cisco UCS Compute & Hyperconverged (HyperFlex / Intersight) Design',
      'Module 5: Data Center Disaster Recovery, Security & Resiliency Frameworks'
    ],
    overview: 'Design resilient data center infrastructures encompassing software-defined networking, multi-cloud connectivity, and high-speed SAN storage fabrics.',
    learningObjectives: [
      'Architect VXLAN BGP EVPN data center spine-and-leaf fabrics',
      'Design Cisco ACI Multi-Site architectures across geographically dispersed data centers'
    ],
    prerequisites: ['DCCOR 350-601 or data center design background']
  },
  {
    id: 'course-cisco-dcacio',
    title: 'Implementing Cisco Application Centric Infrastructure (DCACIO 300-620)',
    domain: 'Cisco Networking',
    certificationVendor: 'Cisco',
    skillLevel: 'Advanced',
    format: 'Live Online',
    fastTrack: true,
    duration: '5 Days (40 Hours)',
    rating: 4.94,
    enrolled: 1190,
    imageUrl: '/images/cisco_network_map_1787771488810.webp',
    imageAlt: 'Cisco DCACIO ACI preview',
    summary: 'Comprehensive hands-on implementation of Cisco ACI. Configure APIC controllers, Spine-Leaf fabrics, Tenants, VRFs, Bridge Domains, EPGs, Contracts, and L4-L7 service graphs.',
    ciscoCategory: 'professional',
    ciscoTrack: 'datacenter',
    ciscoExamType: 'concentration',
    examCode: '300-620 DCACIO',
    curriculum: [
      'Module 1: Cisco ACI Fabric Initialization & APIC Cluster Discovery',
      'Module 2: Logical Model Configuration: Tenants, VRFs, BDs, Application Profiles & EPGs',
      'Module 3: Security Policy Enforcement: Contracts, Subjects, Filters & vzAny',
      'Module 4: External Connectivity: L3Out (BGP/OSPF), L2Out & Hypervisor VMM Integration',
      'Module 5: Layer 4 - Layer 7 Service Insertion & ACI Fabric Troubleshooting'
    ],
    overview: 'Master Cisco Application Centric Infrastructure (ACI) policy configuration, hardware deployment, and external network routing via L3Out.',
    learningObjectives: [
      'Initialize and operate a multi-node Cisco APIC cluster and spine-leaf fabric',
      'Build complete logical tenant segmentation with Bridge Domains and End Point Groups',
      'Integrate external routing protocols (BGP and OSPF) using Cisco ACI L3Out constructs'
    ],
    prerequisites: ['DCCOR 350-601 or strong Layer 2 / Layer 3 networking foundation']
  },
];
