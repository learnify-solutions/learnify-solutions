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
    ],
    outline: [
      {
        title: '1. Security Concepts & Threat Intelligence (20%)',
        items: [
          'Security Models: Confidentiality, integrity, availability (CIA triad), defense-in-depth, and zero trust architecture',
          'Threat Landscape: APTs, ransomware, zero-day vulnerabilities, phishing vectors, and insider threats',
          'Threat Intelligence Frameworks: MITRE ATT&CK framework, Lockheed Martin Cyber Kill Chain, and Diamond Model of Intrusion',
          'Vulnerability Metrics: Common Vulnerabilities and Exposures (CVE), and CVSS v3.1 scoring vector calculation'
        ]
      },
      {
        title: '2. Security Monitoring & SOC Workflows (25%)',
        items: [
          'SOC Operational Architecture: Tier 1 triage, Tier 2 escalation, Tier 3 hunting, and SIEM event correlation',
          'Network Security Monitoring (NSM): Full packet capture, session data, transaction data, alert data, and statistical data',
          'Telemetry Technologies: NetFlow/IPFIX collection, syslog forwarding, DNS logging, and TLS session inspection',
          'Incident Classification: Severity assessment, scoping impact, and security event verification vs false positives'
        ]
      },
      {
        title: '3. Host-Based Security Analysis (20%)',
        items: [
          'Windows Endpoint Analysis: Windows Event Viewer logs (Security, System, App), Sysmon, and PowerShell audit logs',
          'Linux Endpoint Analysis: /var/log/audit/audit.log, auth.log, syslog, systemd journal, and process inspection',
          'Malware Artifacts: File hashes (SHA-256), registry persistence keys, scheduled tasks, and memory injection indicators',
          'Host Containment: Endpoint Isolation, host-based firewalls, and EDR automated remediation policies'
        ]
      },
      {
        title: '4. Network Intrusion & Packet Analysis (20%)',
        items: [
          'Protocol Inspection: Wireshark packet decoding, TCP handshake analysis, DNS tunneling detection, and HTTP/HTTPS headers',
          'Intrusion Detection Systems: Snort and Suricata signature rules, alert syntax, and traffic anomaly classification',
          'Encrypted Traffic Analysis: Cisco ETA, JA3/JA3S TLS fingerprinting, and certificate validation',
          'Network Attack Signatures: ARP spoofing, SYN flood DoS attacks, SQL injection payloads, and command-and-control beacons'
        ]
      },
      {
        title: '5. Incident Response & Digital Forensics (15%)',
        items: [
          'Incident Handling Lifecycle: NIST SP 800-61 r2 (Preparation, Detection & Analysis, Containment/Eradication, Post-Incident)',
          'Digital Evidence Integrity: Chain of custody forms, order of volatility, bit-stream disk imaging, and forensic write-blockers',
          'Post-Incident Remediation: Root cause analysis, eradication verification, defensive posture improvement, and executive briefings'
        ]
      }
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
    ],
    outline: [
      {
        title: '1. Software Development & Design Basics (15%)',
        items: [
          'Data Serialization Formats: Parsing and generating structured JSON, XML, and YAML data structures',
          'Python Programming: Python 3 data types, list comprehensions, object-oriented concepts, virtual environments, and exceptions',
          'Version Control: Git branching workflows, commits, pull requests, merge conflict resolution, and GitHub repositories',
          'Software Design Patterns: MVC pattern, observer pattern, microservices architectures, and monolithic vs distributed systems'
        ]
      },
      {
        title: '2. Understanding & Using APIs (20%)',
        items: [
          'REST API Architecture: CRUD verbs (GET, POST, PUT, DELETE, PATCH), HTTP status codes, headers, and pagination',
          'API Authentication & Security: API keys, Basic Auth, Bearer tokens, and OAuth 2.0 grant types',
          'API Tooling & Testing: Constructing requests with Postman, cURL, and Python requests library',
          'API Rate Limiting & Webhooks: Rate limits, handling 429 Too Many Requests, exponential backoff, and webhook listeners'
        ]
      },
      {
        title: '3. Cisco Platforms & Development (15%)',
        items: [
          'Cisco DNA Center APIs: Device discovery, network health, site topology, and command runner automation',
          'Cisco Meraki Dashboard APIs: Provisioning organizations, networks, SSIDs, and monitoring client devices',
          'Cisco IOS XE & NX-OS APIs: CLI programmability, GuestShell, on-box Python scripting, and telemetry subscriptions',
          'Collaboration & Security APIs: Cisco Webex REST APIs, adaptive cards, bots, and Cisco Firepower Management Center APIs'
        ]
      },
      {
        title: '4. Application Deployment and Security (15%)',
        items: [
          'Docker Containerization: Dockerfiles, image building, docker-compose, container networking, and volumes',
          'CI/CD Pipelines: Continuous Integration / Continuous Deployment workflows, automated testing, and GitHub Actions',
          'Application Security: OWASP Top 10 vulnerabilities, secure credential management, environment variables, and code auditing'
        ]
      },
      {
        title: '5. Infrastructure and Automation (20%)',
        items: [
          'Model-Driven Programmability: YANG data modeling (RFC 6020), native vs OpenConfig models, and pyang validation',
          'Device Management Protocols: NETCONF over SSH (RFC 6241), RESTCONF over HTTPS (RFC 8040), and Postman testing',
          'Automated Network Testing: Cisco pyATS framework, Genie testbed YAML files, and test harness execution',
          'Infrastructure as Code (IaC): Ansible playbooks for Cisco networking and declarative configuration management'
        ]
      },
      {
        title: '6. Network Fundamentals for Developers (15%)',
        items: [
          'Networking Components: Routers, switches, firewalls, load balancers, and wireless controllers in modern architectures',
          'TCP/IP Protocols: IPv4/IPv6 addressing, subnet calculations, DNS resolution, DHCP allocation, and routing tables',
          'Network Topologies & SDN: Spine-and-leaf fabrics, SDN controller architectures, and overlay vs underlay networks'
        ]
      }
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
    prerequisites: ['Understanding of network fundamentals equivalent to Cisco CCNA level'],
    outline: [
      {
            "title": "1. Architecture & Design Principles (15%)",
            "items": [
                  "Enterprise Campus Design: Two-tier vs three-tier campus designs, high availability (FHRP, SSO), and fabric architectures",
                  "Software-Defined Architecture: Cisco SD-Access fabric (Control, Data, Policy planes), Cisco SD-WAN controllers, and Cisco DNA Spaces",
                  "Quality of Service (QoS): DiffServ architecture, classification, marking (DSCP/CoS), queuing (LLQ, CBWFQ), and policing/shaping",
                  "Hardware Architecture: Hardware switching tables (CAM, TCAM), process switching vs CEF (Cisco Express Forwarding)"
            ]
      },
      {
            "title": "2. Virtualization Technologies (10%)",
            "items": [
                  "Server & Network Virtualization: Hypervisors Type 1 & 2, Virtual Machines, and Docker container networking",
                  "Virtual Routing & Forwarding: VRF-lite configuration, route leaking between VRFs, and isolated routing tables",
                  "Overlay Protocols: Generic Routing Encapsulation (GRE) tunneling, LISP control plane, and VXLAN data encapsulation"
            ]
      },
      {
            "title": "3. Infrastructure & Routing Protocols (30%)",
            "items": [
                  "Layer 2 Protocols: VLANs, 802.1Q trunking, Dynamic Trunking Protocol, Rapid Spanning Tree (RSTP), MST, and EtherChannel (LACP)",
                  "Layer 3 Dynamic Routing: Multi-area OSPFv2 and OSPFv3 path selection, neighbor states, LSA types, and summarization",
                  "Border Gateway Protocol: eBGP and iBGP peering, BGP path attributes (Weight, Local Preference, AS-Path, MED), and route reflectors",
                  "Wireless Infrastructure: Cisco Catalyst 9800 WLC deployment, AP join process (CAPWAP), and Wi-Fi 6/6E (802.11ax) standards"
            ]
      },
      {
            "title": "4. Network Assurance & Observability (10%)",
            "items": [
                  "Diagnostics & Telemetry: NetFlow/IPFIX traffic profiling, SPAN, RSPAN, ERSPAN session captures, and streaming telemetry",
                  "Monitoring & Management: SNMPv2c/SNMPv3 security, syslog servers, Cisco DNA Center Assurance, and Network Time Protocol (NTP)",
                  "Troubleshooting Tools: IP SLA probes, traceroute, ping with packet size/DF bit, and Cisco IOS XE debug commands"
            ]
      },
      {
            "title": "5. Enterprise Security Architecture (20%)",
            "items": [
                  "Device & Access Security: Local AAA with TACACS+ and RADIUS, Control Plane Policing (CoPP), and password hardening",
                  "Infrastructure Security: Standard and extended ACLs, Dynamic ARP Inspection (DAI), DHCP Snooping, and IP Source Guard",
                  "Network Access Control: 802.1X port-based authentication, MAC Authentication Bypass (MAB), and Cisco TrustSec SGTs"
            ]
      },
      {
            "title": "6. Network Automation & Programmability (15%)",
            "items": [
                  "Data Models & Encoding: YANG data models, JSON payload formatting, and XML structures",
                  "Programmable Interfaces: NETCONF RPC operations over SSH, RESTCONF CRUD operations, and Cisco DNA Center REST APIs",
                  "Scripting & Automation: Python scripting for network tasks, Cisco pyATS automated verification, and Ansible playbooks"
            ]
      }
],
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
    prerequisites: ['Cisco CCNA certification or equivalent enterprise routing experience'],
    outline: [
      {
            "title": "1. Layer 3 Technologies & Routing Optimization (35%)",
            "items": [
                  "Advanced Routing Redistribution: Bi-directional route redistribution between OSPF, EIGRP, and BGP with route tagging and loop avoidance",
                  "Route Filtering & Path Control: Route-maps, IP prefix-lists, distribute-lists, administrative distance tuning, and metric modification",
                  "Multi-Area OSPF: OSPF stub, totally stubby, NSSA, totally NSSA areas, virtual links, and summarization (ABR/ASBR)",
                  "EIGRP Named Mode: Wide metrics, fast convergence, stub routing, route summarization, and EIGRP for IPv6"
            ]
      },
      {
            "title": "2. Enterprise BGP Architecture (35%)",
            "items": [
                  "BGP Peering & Neighbor Adjacency: Internal BGP (iBGP) mesh, External BGP (eBGP), BGP multi-hop, and loopback peering",
                  "BGP Path Selection Policy: Controlling incoming and outgoing routing using Weight, Local Preference, AS-Path prepending, and MED",
                  "BGP Scalability: Route Reflectors (RR), cluster IDs, BGP confederations, peer groups, and community attributes",
                  "BGP Address Families: Multiprotocol BGP (MP-BGP) for IPv4/IPv6 unicast routing and route convergence optimization (BFD)"
            ]
      },
      {
            "title": "3. VPN Technologies & MPLS (20%)",
            "items": [
                  "MPLS Architecture: Label Distribution Protocol (LDP), Label Information Base (LIB), and Label Forwarding Information Base (LFIB)",
                  "MPLS Layer 3 VPNs: VRF definitions, Route Distinguishers (RD), Route Targets (RT), MP-BGP VPNv4 peering, and PE-CE routing",
                  "Dynamic Multipoint VPN: DMVPN Phase 1, Phase 2, and Phase 3 architectures, Next Hop Resolution Protocol (NHRP), and mGRE",
                  "IPsec Protection: Protecting DMVPN overlays with IPsec profiles, IKEv2 proposals, crypto transform sets, and Dead Peer Detection"
            ]
      },
      {
            "title": "4. Infrastructure Security & Services (10%)",
            "items": [
                  "Control Plane Protection: Control Plane Policing (CoPP) using MQC, and Control Plane Protection (CPPr)",
                  "Device & Protocol Security: Routing protocol authentication (MD5/SHA), Unicast Reverse Path Forwarding (uRPF), and ACL logging",
                  "Advanced Troubleshooting: Embedded Event Manager (EEM) applets, IP SLA tracking, and conditional debugging with debug ip routing"
            ]
      }
],
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
    prerequisites: ['CCNA or CCNP ENCOR foundational knowledge'],
    outline: [
      {
            "title": "1. Cisco SD-WAN Architecture & Controller Plane (20%)",
            "items": [
                  "SD-WAN Architecture: Management plane (vManage), Control plane (vSmart), Orchestration plane (vBond), and Data plane (WAN Edge)",
                  "Cloud vs On-Prem Deployment: Deploying controllers in AWS/Azure vs VMware ESXi, certificate authorization, and whitelist management",
                  "Multi-Tenant & High Availability: Controller cluster scaling, database disaster recovery, and multi-tenant segmentation"
            ]
      },
      {
            "title": "2. WAN Edge Router Deployment & Onboarding (20%)",
            "items": [
                  "WAN Edge Platforms: Cisco Catalyst 8000 series, ISR 4000/1000, and Cisco vEdge cloud/hardware appliances",
                  "Zero Touch Provisioning (ZTP): Automated onboarding, Plug-and-Play (PnP) portal, bootstrap configuration, and root CA trust",
                  "Configuration Templates: Feature templates (system, logging, AAA, VPN 0/512), device templates, and CLI add-on templates"
            ]
      },
      {
            "title": "3. Routing & Overlay Management Protocol (OMP) (25%)",
            "items": [
                  "OMP Protocol Architecture: OMP routes (vRoutes), TLOC routes (Transport Locators), and service routes distribution",
                  "Data Plane Tunnels: BFD (Bidirectional Forwarding Detection) link probing, IPsec encryption, and GRE tunnel encapsulation",
                  "Service Side Routing: OSPF, BGP, and static routing integration inside service VPNs (VPN 1 to 511) and VRF segmentation"
            ]
      },
      {
            "title": "4. Policies, Traffic Engineering & Application-Aware Routing (20%)",
            "items": [
                  "Centralized Control Policies: Modifying topology (hub-and-spoke, full mesh, custom), route filtering, and service chaining",
                  "Centralized Data Policies: Traffic redirection, Direct Internet Access (DIA), and QoS packet shaping/policing",
                  "Application-Aware Routing (AAR): SLA classes (jitter, latency, loss), DPI application matching, and dynamic tunnel failover"
            ]
      },
      {
            "title": "5. Security, Cloud OnRamp & Operations (15%)",
            "items": [
                  "Integrated Security: Enterprise firewall, Snort IPS, URL filtering, Advanced Malware Protection (AMP), and Cisco Umbrella DNS",
                  "Cloud OnRamp: Cloud OnRamp for SaaS (Microsoft 365, Salesforce) and Cloud OnRamp for IaaS (AWS Transit Gateway, Azure vWAN)",
                  "Operations & Troubleshooting: Real-time telemetry, packet capture on WAN edges, ping/traceroute utilities, and speed tests"
            ]
      }
],
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
    prerequisites: ['ENCOR 350-401 or CCNA with design experience'],
    outline: [
      {
            "title": "1. Advanced Addressing & Routing Solutions (25%)",
            "items": [
                  "IPv4 & IPv6 Addressing Architecture: Structured hierarchy, summarization points, IPv6 allocation, and migration planning",
                  "Enterprise Routing Design: Scalable multi-area OSPF design, fast convergence with BFD, EIGRP named mode, and enterprise BGP",
                  "Route Filtering & Redistribution Design: Preventing routing loops, route tag strategies, and two-way redistribution points"
            ]
      },
      {
            "title": "2. Advanced Enterprise Campus Networks (25%)",
            "items": [
                  "Campus Hierarchy: Access, distribution, and core layer design, collapsed core models, and campus building blocks",
                  "High Availability Design: Hardware redundancy, SSO with Nonstop Forwarding (NSF), and FHRP failover convergence",
                  "Layer 2 vs Layer 3 Campus: Routed access vs traditional switched access, Spanning Tree design, and Virtual Switching System/StackWise Virtual"
            ]
      },
      {
            "title": "3. WAN & Edge Architecture (20%)",
            "items": [
                  "WAN Transport Options: MPLS Layer 3 VPN, Metro Ethernet, point-to-point dark fiber, and Internet broadband circuits",
                  "Enterprise Edge & Branch Design: Dual-homed branch connectivity, active/active path selection, and Direct Internet Access (DIA)",
                  "SD-WAN Architecture Design: Controller placement, bandwidth sizing, overlay policy hierarchy, and migration phases"
            ]
      },
      {
            "title": "4. Software-Defined Access (SD-Access) Design (15%)",
            "items": [
                  "Fabric Architecture: Control plane nodes (LISP), Border nodes (internal/external), and Fabric Edge nodes",
                  "Virtual Networks & Segmentation: Macro-segmentation using Virtual Networks (VRFs), and micro-segmentation using Cisco TrustSec Scalable Group Tags (SGTs)",
                  "Wireless Integration: Fabric wireless with Catalyst 9800 vs Over-the-Top (OTT) centralized wireless design"
            ]
      },
      {
            "title": "5. Quality of Service & Network Services (15%)",
            "items": [
                  "End-to-End QoS Design: Campus, WAN, and data center QoS models, RFC 4594 marking guidelines, and low latency queue sizing",
                  "Network Management & Security Design: Out-of-band management networks, NTP synchronization hierarchy, and AAA design"
            ]
      }
],
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
    prerequisites: ['CCNP ENCOR or DevNet Associate fundamentals'],
    outline: [
      {
            "title": "1. Network Programmability & Tooling (15%)",
            "items": [
                  "Version Control & CI/CD: Git branching strategies, automated linting, test runners, and automated deployment pipelines",
                  "Data Models & APIs: YANG data modeling, NETCONF XML operations, RESTCONF JSON endpoints, and Swagger/OpenAPI documentation",
                  "Python Automation Libraries: ncclient for NETCONF, requests for REST, netmiko for SSH, and jinja2 for config templating"
            ]
      },
      {
            "title": "2. Cisco DNA Center Automation (25%)",
            "items": [
                  "DNA Center REST APIs: Authentication tokens, device inventory retrieval, site topology mapping, and command runner",
                  "Automated Provisioning: Creating network sites, assigning devices to sites, and pushing device configuration templates",
                  "Event Handling & Webhooks: Configuring webhook notifications, real-time alert parsing, and ITSM ServiceNow integration"
            ]
      },
      {
            "title": "3. Cisco SD-WAN Automation (20%)",
            "items": [
                  "vManage REST APIs: Session authentication, querying device state, interface counters, and BFD link status",
                  "Template & Policy Management: Fetching and modifying feature templates, device template attachment, and policy activation",
                  "Automated Monitoring & Alerts: Webhook notification subscriptions and streaming telemetry ingestion"
            ]
      },
      {
            "title": "4. Cisco Meraki Dashboard Automation (20%)",
            "items": [
                  "Meraki Dashboard API: API key authentication, organizations, networks, devices, SSIDs, and switchport configurations",
                  "Automated Branch Provisioning: Bulk network creation, claiming hardware serials, and template-based cloning",
                  "Meraki Webhooks & Location APIs: Scanning API for BLE/Wi-Fi client positioning and alert webhooks"
            ]
      },
      {
            "title": "5. pyATS & Model-Driven Telemetry (20%)",
            "items": [
                  "Cisco pyATS & Genie: Creating testbed YAML files, learning device state, running health checks, and diffing network states",
                  "Automated Verification Scripts: Building pre/post maintenance test jobs to ensure zero packet drop or routing degradation",
                  "Streaming Telemetry: Dial-in vs dial-out model-driven telemetry, gRPC protocol, and pipeline collection to Prometheus/Grafana"
            ]
      }
],
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
    prerequisites: ['Working knowledge of Cisco networking fundamentals and TCP/IP security concepts'],
    outline: [
      {
            "title": "1. Security Concepts & Threat Defense (25%)",
            "items": [
                  "Common Threat Vectors: Exploit kits, ransomware, phishing, man-in-the-middle attacks, and advanced persistent threats (APTs)",
                  "Cryptographic Solutions: PKI certificate lifecycle, asymmetric/symmetric ciphers, hashing (SHA-2/3), and IPsec cryptographic suites",
                  "Zero Trust Architecture: NIST 800-207 Zero Trust principles, continuous verification, least privilege, and micro-segmentation"
            ]
      },
      {
            "title": "2. Network Security & Cisco Firepower (20%)",
            "items": [
                  "Cisco Secure Firewall (FTD): Routed vs transparent mode, interface zones, Network Address Translation (NAT), and routing",
                  "Firepower Management Center (FMC): Access Control Policies (ACP), Security Intelligence feeds, and SSL/TLS forward proxy decryption",
                  "Next-Gen IPS: Snort 3 rule sets, file policies, and network-based Advanced Malware Protection (AMP)"
            ]
      },
      {
            "title": "3. Secure Network Access & Cisco ISE (20%)",
            "items": [
                  "Identity Services Engine (ISE): Distributed personas (PAN, MnT, PSN), Active Directory integration, and internal identity stores",
                  "802.1X & MAB Authentication: EAP-TLS, PEAP-MSCHAPv2, Authentication and Authorization Policy Sets, and dACL enforcement",
                  "Cisco TrustSec: Security Group Tags (SGT), Security Group Access Control Lists (SGACL), and SXP protocol"
            ]
      },
      {
            "title": "4. Cloud & Content Security (15%)",
            "items": [
                  "Cisco Umbrella: DNS-layer security, Cloud-Delivered Firewall (CDFW), Secure Web Gateway (SWG), and cloud app visibility",
                  "Email & Web Security: Cisco Secure Email (ESA) spam/virus defense, Cisco Secure Web Appliance (WSA) proxy policies",
                  "Cloud Workload Protection: Cisco Cloudlock CASB and Cisco Secure Workload (Tetration) micro-segmentation"
            ]
      },
      {
            "title": "5. Endpoint Protection & Security Automation (20%)",
            "items": [
                  "Cisco Secure Endpoint (AMP for Endpoints): File trajectory, device trajectory, behavioral analysis, and threat hunting with Orbital",
                  "Cisco Secure Client (AnyConnect): SSL and IKEv2 remote access VPN, posture assessment module, and Network Visibility Module (NVM)",
                  "Security Automation: Cisco SecureX / XDR automated threat investigation, API integration, and incident orchestration playbooks"
            ]
      }
],
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
    prerequisites: ['CCNA Security or SCOR 350-701 foundation'],
    outline: [
      {
            "title": "1. Deployment & Device Configuration (25%)",
            "items": [
                  "FTD Appliance Deployment: Hardware platforms (Firepower 1000/2100/3100/4100 series) and virtual FTDv on ESXi/KVM/AWS",
                  "Management Architecture: Firepower Device Manager (FDM) vs centralized Firepower Management Center (FMC) registration",
                  "Network Configuration: Routed mode, transparent (bridge) mode, inline pair, and passive monitor interfaces",
                  "Routing & High Availability: OSPF, BGP, policy-based routing, stateful active/standby failover, and FTD clustering"
            ]
      },
      {
            "title": "2. Policy Configuration & Traffic Control (30%)",
            "items": [
                  "Access Control Hierarchy: Prefilter policies, Security Intelligence IP/URL/DNS blocking, and ACP rule evaluation order",
                  "Application Visibility & Control (AVC): Matching custom and recognized application signatures, safe search enforcement, and QoS rate limiting",
                  "URL Filtering & Reputation: Category and reputation filtering, custom URL lists, and HTTP response page customization",
                  "SSL/TLS Decryption Policy: Internal CA setup, SSL forward proxy inspection, known key decryption, and cipher suite exclusions"
            ]
      },
      {
            "title": "3. Snort 3 NGIPS & Malware Defense (25%)",
            "items": [
                  "Snort 3 Engine: Thread architecture, multi-tenant inspectors, custom Snort rule authoring, and rule variable tuning",
                  "Intrusion Policies: Balanced Security and Connectivity, Connectivity over Security, and custom tuned inspection policies",
                  "File Policies & AMP: File type detection, malware cloud lookup, file analysis sandboxing (Threat Grid), and retrospective detection"
            ]
      },
      {
            "title": "4. Integration, VPN & Operations (20%)",
            "items": [
                  "Identity Policies: Realm configuration with Active Directory LDAP/Kerberos, Cisco ISE pxGrid integration, and passive user identity",
                  "VPN Deployments: Site-to-site route-based and policy-based IPsec VPNs, remote access AnyConnect SSL/IKEv2 VPN on FTD",
                  "Troubleshooting & Analytics: FMC Event Viewer, connection events, packet tracer tool, capture with trace, and CLI diagnostics"
            ]
      }
],
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
    prerequisites: ['CCNP Security SCOR or CCNA networking foundation'],
    outline: [
      {
            "title": "1. Cisco ISE Architecture & Deployment (15%)",
            "items": [
                  "ISE Node Personas: Policy Administration Node (PAN), Monitoring & Troubleshooting (MnT), and Policy Service Node (PSN)",
                  "Deployment Models: Standalone, small hybrid, and large-scale distributed deployments with high availability and node redundancy",
                  "Certificate Management: System certificates, trusted CA store, Wildcard certificates, and Internal ISE Certificate Authority"
            ]
      },
      {
            "title": "2. Policy Enforcement & Authentication (30%)",
            "items": [
                  "Authentication Methods: 802.1X with EAP-TLS and PEAP-MSCHAPv2, MAC Authentication Bypass (MAB), and Web Authentication (WebAuth)",
                  "Identity Stores: Microsoft Active Directory integration, Kerberos realm join, multi-forest domains, and LDAP identity sources",
                  "Policy Sets Architecture: Modular policy sets, authentication rules, authorization conditions, dACLs, and downloadable VLANs"
            ]
      },
      {
            "title": "3. Web Authentication & Guest Access (15%)",
            "items": [
                  "Guest Access Portals: Hotspot guest access, self-service sponsored guest, credentialed guest access, and sponsor portals",
                  "Central Web Authentication (CWA): Redirect ACLs on Catalyst switches, RADIUS CoA (Change of Authorization), and portal customization",
                  "BYOD Onboarding: Single-SSO dual-SSID onboarding, Certificate provisioning via SCEP/EST, and Apple/Windows/Android supplicant configuration"
            ]
      },
      {
            "title": "4. Profiling, Posture & Compliance (20%)",
            "items": [
                  "Endpoint Profiling: Profiling probes (DHCP, RADIUS, SNMP, HTTP user-agent, NetFlow, NMAP), profiling policies, and logical profiles",
                  "Posture Assessment: AnyConnect Posture module deployment, posture requirements (antivirus, OS patch, disk encryption), and remediation",
                  "Client Provisioning: Provisioning agent packages, resource profiles, compliance modules, and redirect workflows"
            ]
      },
      {
            "title": "5. TrustSec & Ecosystem Integration (20%)",
            "items": [
                  "Cisco TrustSec Architecture: Security Group Tag (SGT) assignment, SGT Exchange Protocol (SXP), and SGACL enforcement matrix",
                  "Cisco pxGrid: Platform Exchange Grid architecture, bidirectional context sharing with Cisco Firepower, Stealthwatch, and SIEM tools",
                  "Troubleshooting & Operations: RADIUS Live Logs, TCP dump packet captures, endpoint debug logging, and TACACS+ device administration"
            ]
      }
],
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
    prerequisites: ['CCNP SCOR 350-701 or equivalent network security experience'],
    outline: [
      {
            "title": "1. Site-to-Site IPsec VPN Solutions (25%)",
            "items": [
                  "IKEv2 Protocols: IKEv2 Phase 1 negotiation, proposals, policies, Phase 2 IPsec transform sets, and Dead Peer Detection (DPD)",
                  "VTI Topologies: Static Virtual Tunnel Interfaces (SVTI) and Dynamic Virtual Tunnel Interfaces (DVTI) with IPv4/IPv6 payload",
                  "Cisco Secure Firewall IPsec: Site-to-site IPsec tunnels on Cisco FTD managed by FMC, policy-based vs route-based VPNs"
            ]
      },
      {
            "title": "2. Dynamic Multipoint VPN (DMVPN) (25%)",
            "items": [
                  "DMVPN Architecture: Multipoint GRE (mGRE) interfaces, Next Hop Resolution Protocol (NHRP) registration, and NHRP resolution",
                  "DMVPN Phases: Phase 1 (hub-and-spoke routing), Phase 2 (spoke-to-spoke direct data tunnels), and Phase 3 (hierarchical NHRP shortcuts)",
                  "Routing Protocols over DMVPN: Multi-area OSPF, EIGRP summary routing, and BGP peering across encrypted DMVPN tunnels"
            ]
      },
      {
            "title": "3. Cisco FlexVPN Architecture (20%)",
            "items": [
                  "FlexVPN Components: IKEv2 smart profiles, client profiles, authorization policies, and local AAA user authentication",
                  "Hub-and-Spoke Topologies: Dynamic spoke-to-spoke tunnels using NHRP over FlexVPN and dual-hub redundancy with BFD",
                  "Public Key Infrastructure (PKI): SCEP certificate enrollment, certificate trustpoints, and digital signature authentication"
            ]
      },
      {
            "title": "4. Remote Access VPN Solutions (30%)",
            "items": [
                  "Cisco AnyConnect Deployment: SSL/TLS and IKEv2 AnyConnect tunnels, profile deployment via FMC/ASA, and XML client profiles",
                  "Authentication & Split Tunneling: Multi-factor authentication (MFA with Duo/SAML), split-include vs split-exclude tunneling policies",
                  "High Availability & Troubleshooting: AnyConnect load balancing, backup server lists, debug crypto ikev2, and packet tracer"
            ]
      }
],
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
    prerequisites: ['CCNP SCOR 350-701 or DevNet Associate experience'],
    outline: [
      {
            "title": "1. Security Automation Foundations (20%)",
            "items": [
                  "Programmability Stack: Python 3 scripts, Git version control, Postman collections, and REST API authentication methods",
                  "Data Formats: Parsing and manipulating JSON payloads, XML structures, and structured telemetry feeds"
            ]
      },
      {
            "title": "2. Automating Cisco Secure Firewall (FMC) (25%)",
            "items": [
                  "FMC REST APIs: API token generation, CRUD operations on network objects, port objects, and URL objects",
                  "Access Policy Automation: Automated bulk rule insertion, policy assignment, and deploying changes to FTD devices",
                  "Threat Data Extraction: Extracting intrusion events, malware detections, and connection logs for external SIEM feeding"
            ]
      },
      {
            "title": "3. Automating Cisco ISE (20%)",
            "items": [
                  "External RESTful Services (ERS): Managing network devices (NADs), endpoint identity groups, and MAC addresses via ERS APIs",
                  "Cisco pxGrid Python Client: Subscribing to endpoint session events, ANC (Adaptive Network Control) quarantine triggers, and IP-SGT mappings",
                  "Automated Quarantining: Triggering rapid endpoint containment following compromised host detection in SOC"
            ]
      },
      {
            "title": "4. Automating Cisco Umbrella & Cloud Security (15%)",
            "items": [
                  "Umbrella Management API: Managing destination lists, domain whitelists/blacklists, and querying DNS activity logs",
                  "Enforcement API: Pushing malicious domain indicators from threat feeds to Umbrella for immediate global DNS blocking"
            ]
      },
      {
            "title": "5. Cisco XDR & Orchestration (20%)",
            "items": [
                  "Cisco XDR Threat Response APIs: Investigating observables (IP, URL, hash, domain), relationship graphs, and threat hunting modules",
                  "Automated Incident Playbooks: Building multi-system response workflows that quarantine host in ISE, block IP on FTD, and notify SecOps"
            ]
      }
],
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
    prerequisites: ['CCNA level knowledge with solid IP routing experience'],
    outline: [
      {
            "title": "1. Core Architecture & Cisco IOS XR (20%)",
            "items": [
                  "Cisco IOS XR Architecture: Microkernel design, process restartability, system administration plane, and modular packages (RPM)",
                  "System Installation: Installing packages, rollbacks, commit models, and configuration checkpoints on Cisco ASR 9000 & NCS 5500",
                  "High Availability: Nonstop Forwarding (NSF), Stateful Switchover (SSO), and Bidirectional Forwarding Detection (BFD)"
            ]
      },
      {
            "title": "2. Service Provider Core Routing (25%)",
            "items": [
                  "IS-IS Routing: Level 1 and Level 2 adjacencies, narrow vs wide metrics, multi-topology IS-IS, and loop-free alternate (LFA) fast reroute",
                  "Multiprotocol BGP: MP-BGP neighbor relationships, Route Reflectors, optimal route reflection, BGP-LU (Labeled Unicast), and communities",
                  "Traffic Engineering: MPLS-TE tunnels, RSVP-TE signaling, CSPF calculation, and auto-bandwidth adjustment"
            ]
      },
      {
            "title": "3. Segment Routing (SR) Architecture (25%)",
            "items": [
                  "Segment Routing Fundamentals: Source routing paradigm, Prefix-SIDs, Adjacency-SIDs, and Node-SIDs across SR-MPLS backbones",
                  "Segment Routing over IPv6 (SRv6): SRv6 network programming, Locator definitions, SID functions (End, End.X, End.DT4/DT6)",
                  "Segment Routing Traffic Engineering: SR-TE policies, Path Computation Element (SR-PCE), and flexible algorithms (Flex-Algo)"
            ]
      },
      {
            "title": "4. Carrier Ethernet & MPLS VPN Services (20%)",
            "items": [
                  "MPLS Layer 3 VPNs: VRF definition, Route Distinguishers, Route Targets, MP-BGP VPNv4/VPNv6, and Inter-AS Option A, B, and C",
                  "Ethernet VPN (EVPN): EVPN BGP route types (Type 1-5), EVPN VPWS, and EVPN for multi-homed Layer 2 gateway access",
                  "Traditional Carrier L2VPN: Virtual Private LAN Service (VPLS) and Virtual Private Wire Service (VPWS) using pseudowires"
            ]
      },
      {
            "title": "5. Service Provider Security & Telemetry (10%)",
            "items": [
                  "Infrastructure Security: BGP Flowspec (RFC 5575) for DDoS mitigation, uRPF, and Control Plane Policing on IOS XR",
                  "Telemetry & Automation: Model-driven telemetry over gRPC, NETCONF/YANG automation, and Cisco Network Services Orchestrator (NSO)"
            ]
      }
],
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
    prerequisites: ['SPCOR 350-501 or equivalent service provider experience'],
    outline: [
      {
            "title": "1. Advanced BGP Architectures (35%)",
            "items": [
                  "BGP Scaling in Service Providers: BGP Route Reflector optimal topologies, BGP confederations, and Next-Hop resolution optimization",
                  "BGP Path Selection Tuning: Multipath eBGP/iBGP, BGP add-path feature, and local policy tuning using routing policy language (RPL)",
                  "BGP Convergence: BGP PIC (Prefix Independent Convergence) Core and Edge, and BGP fast convergence with BFD"
            ]
      },
      {
            "title": "2. Segment Routing Traffic Engineering (35%)",
            "items": [
                  "SR-TE Policy Provisioning: Static vs dynamic SR-TE policies, path constraints (latency, hop-count, affinity), and binding SIDs",
                  "PCE Architecture: Path Computation Element Protocol (PCEP), centralized PCE stateful path computation, and disjoint path computation",
                  "Topology Independent LFA (TI-LFA): Sub-50ms link and node protection across Segment Routing networks"
            ]
      },
      {
            "title": "3. Advanced IS-IS Optimization (20%)",
            "items": [
                  "IS-IS Tuning: Fast convergence timers (LSP generation, SPF throttle), multi-instance IS-IS, and prefix summarization",
                  "Multi-Topology & Migration: Migrating from traditional OSPF/LDP backbones to pure IS-IS Segment Routing infrastructures"
            ]
      },
      {
            "title": "4. Multicast Routing in Service Providers (10%)",
            "items": [
                  "Multicast Protocols: PIM Sparse Mode, Source-Specific Multicast (SSM), and Multipoint LDP (mLDP) distribution",
                  "Multicast VPN: Next-generation mL3VPN with BGP signaling and MVPN provider tunnels"
            ]
      }
],
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
    prerequisites: ['SPCOR 350-501 foundation'],
    outline: [
      {
            "title": "1. MPLS Layer 3 VPN Services (30%)",
            "items": [
                  "L3VPN Implementation: VRF tables, Route Distinguishers, Route Targets, MP-BGP peering, and PE-CE routing protocols (BGP, OSPF)",
                  "Inter-AS L3VPN Architectures: Inter-AS Option A (back-to-back VRF), Option B (MP-eBGP VPNv4), and Option C (multihop MP-eBGP with BGP-LU)",
                  "Shared Services & Internet Access: Centralized Internet access in VRFs, route leaking between VRFs, and multicast in L3VPN"
            ]
      },
      {
            "title": "2. Ethernet VPN (EVPN) Solutions (35%)",
            "items": [
                  "EVPN Architecture: EVPN NLRI route types (Auto-discovery, MAC/IP advertisement, Inclusive Multicast, Ethernet Segment, IP Prefix)",
                  "Multi-Homing Capabilities: All-active and single-active multi-homing, Ethernet Segment Identifier (ESI), and split-horizon filtering",
                  "EVPN Integrated Routing & Bridging (IRB): Symmetric and asymmetric IRB configurations for multi-tenant data center interconnections"
            ]
      },
      {
            "title": "3. Traditional Layer 2 VPNs (20%)",
            "items": [
                  "VPWS Pseudowires: Targeted LDP signaling, pseudowire redundancy, and Ethernet over MPLS (EoMPLS)",
                  "VPLS Deployments: BGP-signaled vs LDP-signaled VPLS, MAC address learning, split horizon, and hierarchical VPLS (H-VPLS)"
            ]
      },
      {
            "title": "4. Carrier Supporting Carrier (CSC) & Operations (15%)",
            "items": [
                  "CSC Architecture: Carrier customer provides IP or MPLS service over provider backbone, and label exchange protocols",
                  "Troubleshooting VPNs: MPLS traceroute, ping mpls ipv4, verifying LFIB entries, and BGP VPNv4 table inspection"
            ]
      }
],
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
    prerequisites: ['CCNA or foundational wireless networking experience'],
    outline: [
      {
            "title": "1. RF Fundamentals & Wireless Architecture (20%)",
            "items": [
                  "Radio Frequency Theory: Signal propagation, attenuation, dBm/dBi calculations, SNR, RSSI, and 2.4 GHz vs 5 GHz vs 6 GHz spectrum",
                  "Wi-Fi Standards: 802.11ac Wave 2, 802.11ax (Wi-Fi 6/6E), OFDMA, MU-MIMO, Target Wake Time (TWT), and 6 GHz AFC operation",
                  "Cisco WLC Deployment Models: Centralized local mode, FlexConnect branch mode, Embedded Wireless Controller, and Mesh"
            ]
      },
      {
            "title": "2. Catalyst 9800 WLC Architecture (25%)",
            "items": [
                  "Catalyst 9800 Configuration Model: Modular Profiles (WLAN Profile, Policy Profile, AP Join Profile, RF Profile)",
                  "Tag-Based Architecture: Policy Tag (maps WLAN to policy), Site Tag (maps AP to join profile/FlexConnect), and RF Tag",
                  "High Availability: SSO (Stateful Switchover) pairing, active/standby heartbeat, and N+1 controller redundancy"
            ]
      },
      {
            "title": "3. Wireless Security & Client Onboarding (25%)",
            "items": [
                  "Authentication Protocols: WPA2/WPA3 Personal (SAE), WPA2/WPA3 Enterprise (802.1X EAP-TLS, PEAP), and Protected Management Frames (PMF)",
                  "Cisco ISE Integration: Central Web Authentication (CWA) for guest access, profiling wireless devices, and RADIUS Change of Authorization",
                  "Client Roaming: Layer 2 roaming, Layer 3 mobility tunneling, and 802.11r/k/v fast BSS transition protocols"
            ]
      },
      {
            "title": "4. Radio Resource Management & Mobility (15%)",
            "items": [
                  "RRM Algorithms: Dynamic Channel Assignment (DCA), Transmit Power Control (TPC), Coverage Hole Detection, and Flexible Radio Assignment (FRA)",
                  "CleanAir Technology: Spectrum analysis, interference detection (Bluetooth, microwave, radar), and automated channel switching"
            ]
      },
      {
            "title": "5. Wireless Troubleshooting & Telemetry (15%)",
            "items": [
                  "Troubleshooting Tools: Radioactive tracing on Catalyst 9800, AP packet capture, and client connectivity debugs",
                  "Cisco DNA Spaces & Assurance: Real-time client analytics, wireless onboarding telemetry, and Cisco DNA Center wireless sensor audits"
            ]
      }
],
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
    prerequisites: ['ENCOR 350-401 or CCNA Wireless'],
    outline: [
      {
            "title": "1. Wireless Site Surveys & Requirements (25%)",
            "items": [
                  "Survey Methodologies: Predictive modeling, pre-deployment AP-on-a-Stick (APoS), and post-deployment validation surveys",
                  "Capacity & Coverage Planning: Calculating client density, voice/video data rate requirements, cell overlap, and secondary coverage",
                  "Spectrum & Environment: Identifying attenuation factors (drywall, concrete, glass), antenna radiation patterns, and azimuth/elevation planes"
            ]
      },
      {
            "title": "2. Enterprise Campus Wireless Design (30%)",
            "items": [
                  "High-Density Design: Auditoriums, stadiums, conference halls, 5 GHz/6 GHz band steering, and micro-cell architectures",
                  "Branch & Remote Design: Cisco FlexConnect branch architecture, local vs central switching, and WAN resiliency",
                  "Cisco Catalyst 9800 Sizing: Throughput sizing, AP capacity limits, licensing tiers, and physical vs virtual WLC placement"
            ]
      },
      {
            "title": "3. Mobility & Security Design (25%)",
            "items": [
                  "Seamless Roaming Design: Cisco Mobility Groups, inter-controller roaming, anchoring guest traffic to DMZ anchor WLCs",
                  "Network Segmentation: Mapping SSIDs to VLANs/VRFs, 802.1X policy design, and integration with Cisco TrustSec SGTs"
            ]
      },
      {
            "title": "4. Location Services & IoT Design (20%)",
            "items": [
                  "Location Tracking Architecture: RSSI trilateration vs Hyperlocation angle of arrival (AoA), BLE beaconing, and RFID tracking",
                  "Cisco DNA Spaces Design: Cloud connector deployment, partner apps integration, and facility occupancy tracking"
            ]
      }
],
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
    prerequisites: ['ENCOR 350-401 or CCNA Wireless foundation'],
    outline: [
      {
            "title": "1. FlexConnect & Branch Implementations (25%)",
            "items": [
                  "FlexConnect Architecture: FlexConnect Groups, local switching vs central switching, local authentication, and VLAN mapping",
                  "Branch Resiliency: FlexConnect standalone mode, local EAP authenticator, backup RADIUS servers, and WAN link failure behavior",
                  "FlexConnect ACLs & Central Web Auth: Configuring web-redirection ACLs and guest workflows in distributed branches"
            ]
      },
      {
            "title": "2. Advanced Client Roaming & Services (25%)",
            "items": [
                  "Fast Transition Roaming: Configuring 802.11r Over-the-Air and Over-the-DS, 802.11k neighbor lists, and 802.11v BSS transition",
                  "Multicast over Wireless: Multicast-to-unicast conversion, mDNS gateway configuration, and AirPlay/Chromecast filtering across subnets",
                  "QoS Deployment: Mapping WMM (Voice, Video, Best Effort, Background) to DSCP markings, and Call Admission Control (CAC)"
            ]
      },
      {
            "title": "3. Cisco DNA Spaces & IoT Integration (25%)",
            "items": [
                  "DNA Spaces Onboarding: Pairing Catalyst 9800 WLC with Cisco DNA Spaces cloud via direct connection and DNA Spaces Connector",
                  "Location & Analytics: Floor map import, access point positioning, BLE management, and asset location tracking",
                  "Captive Portal Customization: Building branded guest onboarding portals and social login integrations"
            ]
      },
      {
            "title": "4. Troubleshooting & Operational Diagnostics (25%)",
            "items": [
                  "Catalyst 9800 Diagnostics: Radioactive trace generation by client MAC address, system logs, and crash analysis",
                  "Packet Capture Analysis: Embedded packet capture on WLC interfaces, over-the-air sniffer mode AP packet captures in Wireshark",
                  "Radio Resource Optimization: Remediation of co-channel interference (CCI), hidden node collisions, and sticky client issues"
            ]
      }
],
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
    prerequisites: ['Intermediate Python programming and foundational networking knowledge'],
    outline: [
      {
            "title": "1. Software Design & Distributed Architectures (20%)",
            "items": [
                  "Software Architecture Patterns: Microservices, event-driven architectures, domain-driven design, and twelve-factor app methodology",
                  "Container Orchestration: Docker multi-stage builds, container security, Docker swarm vs Kubernetes concepts",
                  "Resiliency & Performance: Circuit breaker pattern, retry backoff algorithms, rate limiting, and caching with Redis"
            ]
      },
      {
            "title": "2. Cisco Platform APIs & Programmability (25%)",
            "items": [
                  "Cisco DNA Center APIs: Advanced device provisioning, network discovery, PnP templates, and webhook subscription feeds",
                  "Cisco SD-WAN vManage APIs: Programmatic policy updates, real-time device status, and automated maintenance workflows",
                  "Cisco ACI & Data Center APIs: Cisco ACI Cobra SDK, Arya code generator, and APIC REST API automation in Python",
                  "Security & Collaboration APIs: Cisco Firepower FMC REST API, Cisco Umbrella, and Cisco Webex bot integrations"
            ]
      },
      {
            "title": "3. Infrastructure as Code (IaC) & Cloud (20%)",
            "items": [
                  "Declarative Configuration Management: Developing custom Ansible modules and Terraform providers for network platforms",
                  "GitOps Workflows: Infrastructure versioning in Git, automated validation pipelines, and automated merge promotions",
                  "Serverless & Cloud Automation: Deploying AWS Lambda / Azure Functions triggered by Cisco network events"
            ]
      },
      {
            "title": "4. Network Testing & State Verification (20%)",
            "items": [
                  "pyATS Framework Deep Dive: Complex testbed setups, developing custom pyATS test cases, and Genie parser development",
                  "Automated Continuous Testing: Running automated regression test suites on virtual testbeds before enterprise changes",
                  "State Validation: Parsing show commands into structured Python dictionaries and diffing running vs target configurations"
            ]
      },
      {
            "title": "5. Application Security & Telemetry (15%)",
            "items": [
                  "Security Best Practices: Secure secret management (HashiCorp Vault), OAuth 2.0 PKCE flow, and API gateway architectures",
                  "Streaming Telemetry Pipelines: Ingesting gRPC model-driven telemetry into Elasticsearch and building real-time Grafana dashboards"
            ]
      }
],
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
    prerequisites: ['DCCOR 350-601 or DevNet Associate experience'],
    outline: [
      {
            "title": "1. Cisco NX-OS Programmability (30%)",
            "items": [
                  "NX-API Architecture: NX-API CLI (JSON and XML response formatting), NX-API REST, and authentication tokens",
                  "On-Box Scripting: Linux GuestShell environment, on-box Python 3 scripts, and Cisco Embedded Event Manager (EEM)",
                  "Model-Driven Programmability: Configuring Cisco Nexus switches via NETCONF and RESTCONF using OpenConfig YANG models"
            ]
      },
      {
            "title": "2. Cisco ACI Automation & Cobra SDK (35%)",
            "items": [
                  "APIC REST API: Management Information Tree (MIT) navigation, class and distinguished name (DN) queries, and JSON filters",
                  "Cobra SDK Programming: Constructing ACI objects in Python, managing Tenants, VRFs, Application Profiles, and EPGs",
                  "Arya Code Generator: Converting XML/JSON configurations into equivalent Python Cobra SDK and REST API code"
            ]
      },
      {
            "title": "3. Cisco Intersight & Cloud Compute Automation (20%)",
            "items": [
                  "Intersight REST APIs: API key signature generation, server profile deployment, and firmware orchestration",
                  "Infrastructure as Code for Data Centers: Ansible playbooks for Cisco ACI and Nexus, and Terraform ACI provider modules"
            ]
      },
      {
            "title": "4. Day-2 Operations & Telemetry (15%)",
            "items": [
                  "Streaming Telemetry: Dial-in and dial-out streaming telemetry on NX-OS, cadence vs on-change subscriptions, and gNMI",
                  "Nexus Dashboard & Automation: Automating fabric compliance audits and alert forwarding to ticketing systems"
            ]
      }
],
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
    prerequisites: ['Python proficiency and foundational DevNet knowledge'],
    outline: [
      {
            "title": "1. Cisco IoT Architecture & Edge Computing (25%)",
            "items": [
                  "Industrial Networking Hardware: Cisco Catalyst Industrial Routers (IR1101, IR1800), IE3400 switches, and IoT gateways",
                  "Cisco IOx Architecture: IOx application framework, container hosting on Cisco IOS XE, and hypervisor resource allocation",
                  "Industrial Network Protocols: Modbus, PROFINET, OPC-UA, MQTT, and CoAP communication patterns"
            ]
      },
      {
            "title": "2. Cisco IOx Application Development (30%)",
            "items": [
                  "Packaging Applications: Creating package.yaml descriptors, building Docker container images, and ioxclient command-line tool",
                  "Developing Edge Logic: Writing Python microservices to read serial/Ethernet sensor data and filter data locally at the edge",
                  "Application Lifecycle: Installing, activating, starting, and monitoring containerized applications on industrial routers"
            ]
      },
      {
            "title": "3. Cisco IoT Operations Dashboard & Edge Management (25%)",
            "items": [
                  "Cloud Management: Cisco IoT Operations Dashboard, secure zero-touch onboarding of industrial routers, and remote access",
                  "Bulk App Deployment: Deploying IOx container apps across hundreds of geographically dispersed industrial gateways"
            ]
      },
      {
            "title": "4. Industrial Cybersecurity & Cyber Vision APIs (20%)",
            "items": [
                  "Cisco Cyber Vision: OT asset discovery, industrial protocol deep packet inspection, and vulnerability baseline monitoring",
                  "Cyber Vision APIs: Querying industrial asset inventory, extracting network component flows, and feeding SIEM platforms"
            ]
      }
],
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
    prerequisites: ['Basic networking and voice fundamentals'],
    outline: [
      {
            "title": "1. Infrastructure and Design (15%)",
            "items": [
                  "CUCM Cluster Architecture: Publisher/Subscriber database replication, TFTP redundancy, and service activation",
                  "IP Phone Registration: SCCP vs SIP registration processes, DHCP Option 150/66, and TFTP configuration files",
                  "Certificate & Security Infrastructure: CUCM Mixed Mode, CAPF phone security profiles, and TLS/SRTP signaling",
                  "Time & Network Synchronization: NTP server hierarchies, DNS SRV records for Cisco Collaboration, and PoE provisioning"
            ]
      },
      {
            "title": "2. Protocols, Codecs and Endpoints (10%)",
            "items": [
                  "SIP Protocol Deep Dive: SIP message methods (INVITE, ACK, BYE, CANCEL, OPTIONS), response codes, and SDP offer/answer",
                  "Audio & Video Codecs: G.711, G.729, G.722, Opus, iLBC, and H.264/H.265 bandwidth requirements and payload sizing",
                  "DTMF Signaling Methods: In-band audio (RTP payload), out-of-band (RFC 2833 / RFC 4733), SIP INFO, and KPML conversion",
                  "Cisco Collaboration Endpoints: Cisco IP Phone 8800/7800 series, Cisco Webex Room Kit series, and firmware management"
            ]
      },
      {
            "title": "3. Cisco IOS XE Voice Gateways & Media Resources (15%)",
            "items": [
                  "Voice Gateway Configuration: Cisco IOS XE SIP voice gateways, ISDN PRI T1/E1 circuits, and FXS/FXO analog ports",
                  "Cisco Unified Border Element (CUBE): Dial peers, voice translation rules, voice translation profiles, and SIP-to-SIP routing",
                  "Media Resources: Software and hardware DSP transcoding (PVDM), conference bridges, media termination points (MTP), and Annunciator",
                  "Music On Hold (MOH): Unicast vs multicast MOH streaming, audio codec formatting, and audio source configuration"
            ]
      },
      {
            "title": "4. Advanced Call Control & Dial Plan Architecture (30%)",
            "items": [
                  "Call Routing Architecture: Route Patterns, Route Groups, Route Lists, Local Route Groups, and Hunting Architecture",
                  "E.164 Dial Plan Globalization: +E.164 formatting, Calling Search Spaces (CSS), Partitions (PT), and digit transformations",
                  "SIP Trunk Integration: CUCM SIP trunks to CUBE, third-party PBXs, and Microsoft Teams Direct Routing",
                  "Toll Fraud Prevention: Strict Calling Search Space segmentation, time-of-day routing, and destination blocking"
            ]
      },
      {
            "title": "5. Quality of Service (QoS) & Bandwidth Management (10%)",
            "items": [
                  "QoS Classification & Marking: DSCP EF (Expedited Forwarding - 46) for voice, AF41 for video, and CS3 for signaling",
                  "Congestion Management: Low Latency Queuing (LLQ), Priority Queuing with CBWFQ on Cisco IOS XE WAN edge routers",
                  "Call Admission Control (CAC): Location-based CAC, RSVP agent deployment, and automated alternate routing (AAR)",
                  "Voice Quality Metrics: Jitter, packet loss, latency thresholds, and Mean Opinion Score (MOS) calculation"
            ]
      },
      {
            "title": "6. Collaboration Applications & Cloud Hybrid Services (20%)",
            "items": [
                  "Cisco Expressway Architecture: Expressway-C and Expressway-E traversal zones, STUN/TURN/ICE, and Mobile & Remote Access (MRA)",
                  "Cisco Unity Connection: High-availability cluster pairs, voice messaging mailboxes, call routing rules, and auto-attendants",
                  "Cisco Unified IM & Presence: Client/Server architecture, XMPP federation, and Cisco Jabber client desktop/mobile deployment",
                  "Cisco Webex Hybrid Services: Webex Edge for Calling, Webex Cloud-Connected Audio (CCA), and Microsoft 365 calendar integration"
            ]
      }
],
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
    prerequisites: ['CLCOR 350-801 foundation'],
    outline: [
      {
            "title": "1. Cisco Unified IM & Presence Architecture (25%)",
            "items": [
                  "IM&P Deployment: IM&P cluster architecture, database publisher and subscriber nodes, and integration with CUCM",
                  "SIP and XMPP Protocols: Presence engine operation, XMPP federation, SIP proxy, and message flow analysis",
                  "Cisco Jabber Deployment: Jabber client configuration files (jabber-config.xml), service discovery (DNS SRV), and softphone mode"
            ]
      },
      {
            "title": "2. Cisco Unity Connection (CUC) Administration (30%)",
            "items": [
                  "Cluster Architecture: Active/Active high availability pair, database replication, and message store synchronization",
                  "User & Call Management: User templates, voicemail mailboxes, distribution lists, message waiting indicators (MWI), and PIN policies",
                  "Call Handlers & Auto-Attendants: System call handlers, directory handlers, interview handlers, and automated attendant menu routing",
                  "Unified Messaging: Single Inbox integration with Microsoft Exchange / Office 365 via OAuth and IMAP synchronization"
            ]
      },
      {
            "title": "3. Enterprise Single Sign-On (SSO) (20%)",
            "items": [
                  "SAML 2.0 Integration: Identity Provider (IdP) metadata exchange, Service Provider (SP) metadata, and SAML token assertion",
                  "Supported IdPs: Microsoft Entra ID (Azure AD), Okta, and PingFederate integration for CUCM, Unity Connection, and IM&P"
            ]
      },
      {
            "title": "4. Troubleshooting Collaboration Applications (25%)",
            "items": [
                  "Diagnostic Utilities: Cisco Real-Time Monitoring Tool (RTMT) counters, trace collection, and port usage inspection",
                  "Log Analysis: Unity Connection port logs, IM&P presence engine logs, and Jabber client Problem Reporting Tool (PRT) reviews"
            ]
      }
],
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
    prerequisites: ['CLCOR 350-801 or senior VoIP experience'],
    outline: [
      {
            "title": "1. Signaling and Media Protocols (10%)",
            "items": [
                  "Advanced SIP Signaling Analysis: Early offer vs Delayed offer, Early Media, PRACK (RFC 3262), and mid-call re-INVITEs",
                  "Session Timers & Reliability: Session expiration, Min-SE negotiation, UPDATE transactions, and transaction state timers",
                  "Media Optimization & NAT Traversal: STUN (Session Traversal Utilities for NAT), TURN relays, and ICE (Interactive Connectivity Establishment)",
                  "Troubleshooting SIP Protocol: Wireshark packet capture inspection, Cisco RTMT traces, and debug ccsip messages analysis"
            ]
      },
      {
            "title": "2. Session Border Controller (CUBE) Technologies (30%)",
            "items": [
                  "CUBE Dial Plan Architecture: Inbound/outbound dial-peer matching, voice translation rules, profiles, and codec preference lists",
                  "SIP Header Normalization: Manipulating SIP and SDP headers using Cisco IOS XE command-line SIP profiles and Lua scripting",
                  "Media Flow Architecture: Media flow-through vs media flow-around, signaling IP address binding, and media IP binding",
                  "Security & High Availability: CUBE toll fraud prevention, IP trust lists, CUBE box-to-box redundancy with HSRP, and session preservation",
                  "Call Recording & Media Forking: Network-based gateway recording with SIPREC protocol and CUBE media forking to compliance recorders"
            ]
      },
      {
            "title": "3. Advanced Call Control & Globalized Routing (25%)",
            "items": [
                  "E.164 Globalization & Localization: Translation patterns, calling and called party transformation patterns, and Local Route Groups (LRG)",
                  "CUCM Advanced Routing Logic: Partitions, Calling Search Spaces (CSS), route filters, urgent priority, and time-of-day schedules",
                  "Global Dial Plan Replication (GDPR): Intercluster Lookup Service (ILS), URI sync, and alternate number routing across multi-cluster enterprises",
                  "Hunt Groups & Call Queuing: Line groups, hunt lists, hunt pilots, call queuing with native MOH announcement, and broadcast distribution"
            ]
      },
      {
            "title": "4. Voice Gateway Survivability & SRST (15%)",
            "items": [
                  "Survivable Remote Site Telephony: Enhanced SRST (E-SRST) and SIP SRST gateway provisioning on Cisco IOS XE routers",
                  "Failover & Fallback Mechanism: WAN link failure detection, keepalive timers, phone fallback registration, and dial plan execution",
                  "Call Preservation Protocols: Preserving active RTP voice streams during WAN link flaps and graceful call tear-down",
                  "Cisco Unified CME Integration: Configuring Cisco Unified Communications Manager Express for local site standalone operation"
            ]
      },
      {
            "title": "5. Mobility & Supplementary Services (20%)",
            "items": [
                  "Cisco Extension Mobility (EM): Extension mobility service URL configuration, device profiles, and logout profiles",
                  "Device Mobility: Dynamic IP subnet detection, device mobility groups, device mobility pools, and location-aware dial plan adaptation",
                  "Mobile Connect / Single Number Reach (SNR): Remote destinations, remote destination profiles, and Access Lists for selective ringing",
                  "Mobile Voice Access (MVA): Interactive Voice Response (IVR) dial-in, Enterprise Feature Access (EFA), and two-stage dialing"
            ]
      }
],
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
    prerequisites: ['Cisco CyberOps Associate (CBROPS 200-201) or Security+ with SOC experience'],
    outline: [
      {
            "title": "1. Advanced Threat Hunting & Intelligence (25%)",
            "items": [
                  "Threat Intelligence Operations: Diamond Model of Intrusion, MITRE ATT&CK framework mapping, and STIX/TAXII threat feeds",
                  "Threat Modeling: STRIDE and PASTA methodologies, attack surface mapping, and assessing adversary tactics, techniques, and procedures (TTPs)"
            ]
      },
      {
            "title": "2. Cloud Security & Telemetry (20%)",
            "items": [
                  "Multi-Cloud Monitoring: AWS CloudTrail, VPC Flow Logs, Azure Activity Logs, and Microsoft 365 Unified Audit Logs",
                  "Cloud Attack Vectors: IAM misconfigurations, privilege escalation in cloud environments, and container breakout detection"
            ]
      },
      {
            "title": "3. Host & Endpoint Forensics (25%)",
            "items": [
                  "Volatile Memory Analysis: RAM dumps, extracting process trees, identifying injected DLLs, and finding hidden malware artifacts",
                  "Disk Forensics: Master File Table (MFT) parsing, Windows Registry timeline analysis, shellbags, and Linux auth log forensic reconstruction"
            ]
      },
      {
            "title": "4. Network Forensics & Deep Packet Analysis (15%)",
            "items": [
                  "Full Packet Capture (FPC): Wireshark and Zeek (Bro) scripting for protocol anomaly detection and detecting covert C2 channels",
                  "Snort & Suricata Advanced Rules: Custom rule authoring to detect sophisticated exploit kits and buffer overflow payloads"
            ]
      },
      {
            "title": "5. Incident Response & SOAR Playbooks (15%)",
            "items": [
                  "Incident Containment & Remediation: NIST SP 800-61 incident response phases, containment strategies, and evidence handling",
                  "SOAR Automation: Automated alert enrichment, dynamic response playbooks, and automated host isolation via EDR/SIEM"
            ]
      }
],
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
    prerequisites: ['CBRCOR 350-201 or equivalent incident response experience'],
    outline: [
      {
            "title": "1. Forensic Principles & Evidence Collection (25%)",
            "items": [
                  "Chain of Custody: Legal considerations, forensic documentation, tamper-evident evidence storage, and forensic integrity hashing",
                  "Evidence Acquisition: Live vs dead acquisition, memory dumping tools, write-blocking hardware, and bit-stream disk cloning"
            ]
      },
      {
            "title": "2. Operating System Artifact Analysis (30%)",
            "items": [
                  "Windows Artifacts: Prefetch files, Amcache, Shimcache, UserAssist, Event Logs, and Volume Shadow Copy analysis",
                  "Linux & macOS Artifacts: Systemd journals, bash histories, cron jobs, persistence plists, and kernel auditing records"
            ]
      },
      {
            "title": "3. Malicious Code & Sandbox Analysis (25%)",
            "items": [
                  "Static Malware Analysis: PE header inspection, strings extraction, import address table (IAT) analysis, and obfuscation detection",
                  "Dynamic Analysis: Detonating samples in isolated sandboxes (Cisco Threat Grid), observing file, network, and registry mutations"
            ]
      },
      {
            "title": "4. Post-Incident Root Cause Analysis & Reporting (20%)",
            "items": [
                  "Timeline Construction: Super-timeline creation using log2timeline/Plaso and identifying point of initial compromise",
                  "Executive Reporting: Writing comprehensive technical incident reports, root cause documentation, and strategic security recommendations"
            ]
      }
],
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
    prerequisites: ['Familiarity with data center networking, storage, and server virtualization'],
    outline: [
      {
            "title": "1. Data Center Network Architecture (25%)",
            "items": [
                  "Nexus Switch Platforms: Cisco Nexus 9000, 7000, and 3000 series, hardware architecture, and NX-OS operating system features",
                  "Layer 2 & Layer 3 Technologies: Virtual Port Channels (vPC), OSPFv2/v3, BGP routing, and Bidirectional Forwarding Detection (BFD)",
                  "VXLAN EVPN Fabrics: Underlay multicast/unicast, BGP EVPN control plane, VTEP flood-and-learn vs EVPN, and symmetric routing"
            ]
      },
      {
            "title": "2. Cisco Application Centric Infrastructure (ACI) (25%)",
            "items": [
                  "ACI Architecture: Spine-and-Leaf fabric topology, APIC cluster initialization, and out-of-band management",
                  "ACI Policy Model: Tenant hierarchy, VRFs, Bridge Domains (BD), Application Network Profiles (ANP), and End Point Groups (EPGs)",
                  "Security Policies: Contracts, Subjects, Filters, vzAny, and micro-segmentation with uEPGs"
            ]
      },
      {
            "title": "3. Storage Area Networking (SAN) (20%)",
            "items": [
                  "Fibre Channel Protocol: FC architecture, FLOGI/PLOGI login process, VSANs, and hard/soft zoning on Cisco MDS 9000 switches",
                  "FCoE & NVMe-oF: Fibre Channel over Ethernet (FCoE) encapsulation, FCoE Initiation Protocol (FIP), and NVMe over Fabrics"
            ]
      },
      {
            "title": "4. Cisco UCS Compute Infrastructure (15%)",
            "items": [
                  "UCS Hardware: UCS B-Series blade servers, C-Series rack servers, Fabric Interconnects 6400/6500, and I/O modules",
                  "Service Profiles: Service profile templates, identity pools (MAC, WWPN, UUID), and stateless compute provisioning",
                  "Cisco Intersight: Cloud-based systems management, server profiles, firmware maintenance, and automated policy compliance"
            ]
      },
      {
            "title": "5. Data Center Security & Automation (15%)",
            "items": [
                  "Security Controls: AAA, TACACS+/RADIUS, Control Plane Policing (CoPP), and port security on Nexus switches",
                  "Automation: Cisco NX-API, Python scripting, Ansible modules for Nexus/ACI, and model-driven telemetry"
            ]
      }
],
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
    prerequisites: ['DCCOR 350-601 or data center design background'],
    outline: [
      {
            "title": "1. Data Center Network Infrastructure Design (35%)",
            "items": [
                  "Spine-and-Leaf Topology Design: Oversubscription ratios, east-west traffic optimization, and Nexus 9000 fabric scaling",
                  "VXLAN EVPN Overlay Design: Route Reflector design, multi-tenant segmentation, Distributed Anycast Gateway, and DCI solutions",
                  "Data Center Interconnect (DCI): OTV, VXLAN EVPN Multi-Site, MPLS, and dark fiber transport comparisons"
            ]
      },
      {
            "title": "2. Cisco ACI Architecture Design (25%)",
            "items": [
                  "ACI Fabric Topologies: Single-Pod, Multi-Pod with Inter-Pod Network (IPN), and Multi-Site with Inter-Site Network (ISN)",
                  "External Connectivity Design: L3Out design (BGP, OSPF), L2Out integration, and shared service tenant design",
                  "L4-L7 Service Insertion: Service graph design for next-gen firewalls, ADC load balancers, and policy-based redirect (PBR)"
            ]
      },
      {
            "title": "3. Storage Networking Design (20%)",
            "items": [
                  "SAN Fabric Design: Redundant dual-fabric topologies, VSAN design, Inter-VSAN Routing (IVR), and port channel trunking",
                  "High-Performance Storage: Sizing Fibre Channel fabrics for NVMe-oF flash arrays, and SAN congestion management (DIRL/FEC)"
            ]
      },
      {
            "title": "4. UCS Compute & Management Design (20%)",
            "items": [
                  "UCS Compute Sizing: Blade vs rack form factors, VIC adapter placement, and converged network adapter oversubscription",
                  "Management Architecture: Cisco Intersight Managed Mode (IMM) design, centralized policy repositories, and disaster recovery"
            ]
      }
],
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
    prerequisites: ['DCCOR 350-601 or strong Layer 2 / Layer 3 networking foundation'],
    outline: [
      {
            "title": "1. ACI Fabric Initialization & Hardware Discovery (20%)",
            "items": [
                  "APIC Cluster Setup: Console initialization wizard, out-of-band management IP, and cluster formation quorum verification",
                  "Fabric Node Discovery: Spine and Leaf auto-discovery via LLDP, fabric node registration, and TEP IP pool assignment",
                  "Fabric Firmware & Maintenance: Upgrading APIC cluster firmware, leaf/spine switch firmware groups, and maintenance policies"
            ]
      },
      {
            "title": "2. Logical Tenant & Network Configuration (30%)",
            "items": [
                  "Tenant Constructs: Common, Infra, and Management tenants, creating custom customer tenants and VRFs",
                  "Bridge Domains & Subnets: Unicast routing, ARP flooding controls, IP subnet assignment, and hardware proxy settings",
                  "End Point Groups (EPGs): Application Profiles, physical domain association, AAEP (Attachable Access Entity Profiles), and VLAN pools"
            ]
      },
      {
            "title": "3. Contracts, Security & Micro-Segmentation (20%)",
            "items": [
                  "Contract Architecture: Providers and Consumers, Subjects, Filters, bidirectional rules, and Default/Permit contracts",
                  "Micro-Segmentation: Creating micro-EPGs (uEPG) based on IP, MAC, VM tags, and operating system attributes",
                  "Contract Optimization: vzAny provider/consumer usage and contract inheritance for large-scale multi-tier applications"
            ]
      },
      {
            "title": "4. External Routing & L3Out Integration (15%)",
            "items": [
                  "L3Out Architecture: Routing protocols (BGP and OSPF), border leaf nodes, routed interfaces, and sub-interfaces",
                  "External EPGs: Subnet classification (0.0.0.0/0), Route Control enforcement, and contract binding to external networks",
                  "Shared L3Out: Leaking external routes between User Tenants and Common Tenant via Global Route Targets"
            ]
      },
      {
            "title": "5. Layer 4 - Layer 7 Services & Troubleshooting (15%)",
            "items": [
                  "Service Graphs: Unmanaged vs managed service graphs, firewall insertion, ADC load balancers, and Policy-Based Redirect (PBR)",
                  "ACI Fabric Diagnostics: Fault codes, health scores, event logs, Endpoint Tracker, and APIC CLI diagnostics (acidiag)"
            ]
      }
],
  },
];
