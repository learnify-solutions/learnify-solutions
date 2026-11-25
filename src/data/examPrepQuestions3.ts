import { PracticeQuestion } from '../types';
import {
  AZURE_AZ_900_QUESTIONS_EXT,
  AWS_CLF_C02_QUESTIONS_EXT,
  CISCO_CCNA_200_301_QUESTIONS_EXT,
} from './examPrepQuestionsExt3';
import {
  MICROSOFT_SC_900_QUESTIONS_EXT,
  ISC2_CISSP_QUESTIONS_EXT,
} from './examPrepQuestionsExt4';
import {
  KUBERNETES_CKA_QUESTIONS_EXT,
  TERRAFORM_ASSOC_QUESTIONS_EXT,
} from './examPrepQuestionsExt5';
import {
  GCP_ACE_QUESTIONS_EXT,
  LINUX_PLUS_QUESTIONS_EXT,
} from './examPrepQuestionsExt6';

export const AZURE_AZ_900_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'az900-1',
    domain: 'Describe cloud concepts',
    prompt:
      'A financial startup wants to avoid buying physical servers upfront and instead pay only for compute and storage consumed per hour while retaining full control over OS patching. Which cloud concept and service model match this requirement?',
    options: [
      'CapEx model using Software as a Service (SaaS)',
      'OpEx consumption-based model using Infrastructure as a Service (IaaS)',
      'Fixed-capacity CapEx model using Platform as a Service (PaaS)',
      'On-premises virtualization with Serverless compute',
    ],
    correctIndex: 1,
    explanation:
      'Moving from hardware purchase (CapEx) to pay-as-you-go cloud usage is an Operational Expenditure (OpEx) consumption model. Retaining OS patching responsibility while renting virtualized compute indicates Infrastructure as a Service (IaaS), such as Azure Virtual Machines.',
  },
  {
    id: 'az900-2',
    domain: 'Describe cloud concepts',
    prompt:
      'Under the Azure Shared Responsibility Model, which element ALWAYS remains the customer’s responsibility regardless of whether you deploy IaaS, PaaS, or SaaS?',
    options: [
      'Physical datacenter perimeter security and biometric locks',
      'Hypervisor host firmware patching',
      'Information, data classification, accounts, and access governance',
      'Top-of-rack physical switch redundancy',
    ],
    correctIndex: 2,
    explanation:
      'Across IaaS, PaaS, and SaaS, Microsoft secures the physical datacenter and hardware infrastructure, while the customer always retains ownership and responsibility for their data classification, endpoints, and user/account access policies.',
  },
  {
    id: 'az900-3',
    domain: 'Describe Azure architecture and services',
    prompt:
      'An engineering team must protect a mission-critical Azure SQL workload against the complete failure of a single datacenter building inside a city without crossing national borders. Which Azure feature should they configure?',
    options: [
      'Azure Availability Zones within the same Azure Region',
      'Azure Cost Management Budgets',
      'A single Locally Redundant Storage (LRS) volume',
      'Azure Resource Locks set to ReadOnly',
    ],
    correctIndex: 0,
    explanation:
      'Availability Zones are physically separated datacenters within a single Azure Region, each with independent power, cooling, and networking—delivering resiliency against single-building failures while keeping data inside the national boundary.',
  },
  {
    id: 'az900-4',
    domain: 'Describe Azure architecture and services',
    prompt:
      'You need to organize 18 Azure subscriptions belonging to Finance, HR, and Engineering so that security policies and RBAC permissions cascade down automatically by department. Which Azure hierarchy scope sits directly above Subscriptions?',
    options: [
      'Resource Groups',
      'Azure Management Groups',
      'Availability Sets',
      'Virtual Network Peerings',
    ],
    correctIndex: 1,
    explanation:
      'Azure Management Groups provide a governance hierarchy level above Subscriptions, allowing enterprise administrators to apply Azure Policy and RBAC role assignments across multiple subscriptions uniformly.',
  },
  {
    id: 'az900-5',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A developer needs to run event-driven Python code whenever a customer uploads a PDF receipt to Blob Storage, paying strictly for milliseconds of execution without provisioning servers. Which Azure compute service fits best?',
    options: [
      'Azure Virtual Machine Scale Sets',
      'Azure Functions',
      'Azure Dedicated Host',
      'Azure Bastion',
    ],
    correctIndex: 1,
    explanation:
      'Azure Functions is a serverless compute service optimized for short-lived, event-triggered code execution with consumption-based billing.',
  },
  {
    id: 'az900-6',
    domain: 'Describe Azure architecture and services',
    prompt:
      'An operations team wants encrypted RDP and SSH access to Linux and Windows VMs directly from the Azure Portal browser without assigning public IP addresses to any VM. Which service provides this capability?',
    options: [
      'Azure ExpressRoute',
      'Azure Bastion',
      'Azure Application Gateway',
      'Azure DNS Private Resolver',
    ],
    correctIndex: 1,
    explanation:
      'Azure Bastion is deployed inside a VNet subnet (`AzureBastionSubnet`) and provides TLS-encrypted browser-based RDP/SSH access over port 443 without exposing VM public IP addresses.',
  },
  {
    id: 'az900-7',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A compliance archive holds medical imaging files that are rarely accessed after 30 days, must remain retained for 7 years, and require the lowest possible per-GB Azure Blob storage cost (retrieval latency of a few hours is acceptable). Which access tier should you select?',
    options: [
      'Hot tier',
      'Cool tier',
      'Archive tier',
      'Premium Page Blob tier',
    ],
    correctIndex: 2,
    explanation:
      'Azure Blob Archive tier offers the lowest storage cost for long-term rarely read data where rehydration latency of hours is acceptable before retrieval.',
  },
  {
    id: 'az900-8',
    domain: 'Describe Azure architecture and services',
    prompt:
      'Which Microsoft Entra ID capability evaluates sign-in risk, user location, and device compliance before granting or blocking access to cloud applications?',
    options: [
      'Azure Network Watcher',
      'Conditional Access',
      'Azure Service Health',
      'Azure Advisor',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Entra Conditional Access acts as an automated Zero Trust policy engine that inspects identity signals (MFA state, compliant device, IP risk) before permitting resource access.',
  },
  {
    id: 'az900-9',
    domain: 'Describe Azure management and governance',
    prompt:
      'A production Resource Group containing a virtual network was accidentally deleted by a contributor. What Azure feature prevents deletion even by users holding Subscription Owner permissions unless explicitly removed first?',
    options: [
      'Azure Tags',
      'CanNotDelete Resource Lock',
      'Azure Cost Alerts',
      'Azure Monitor Log Analytics',
    ],
    correctIndex: 1,
    explanation:
      'Resource Locks (`CanNotDelete` or `ReadOnly`) override RBAC permissions including Owner; an administrator must explicitly remove the lock before deleting the protected resource.',
  },
  {
    id: 'az900-10',
    domain: 'Describe Azure management and governance',
    prompt:
      'Your CFO asks for a tool to estimate the 3-year financial savings of migrating 40 on-premises VMware servers (electricity, cooling, hardware refresh) into Microsoft Azure. Which tool generates this report?',
    options: [
      'Azure Total Cost of Ownership (TCO) Calculator',
      'Azure Service Health',
      'Azure Activity Log',
      'Azure Resource Graph Explorer',
    ],
    correctIndex: 0,
    explanation:
      'The Azure TCO Calculator compares on-premises datacenter costs (power, facilities, IT labor, server hardware) against projected Azure cloud costs, whereas the Azure Pricing Calculator estimates specific Azure SKUs.',
  },
  {
    id: 'az900-11',
    domain: 'Describe Azure management and governance',
    prompt:
      'An organization requires every newly created Azure resource to carry a `CostCenter` tag and restricts VM deployments only to `UK South` and `West Europe` regions. Which service enforces these rules proactively?',
    options: [
      'Azure Policy',
      'Azure Bastion',
      'Azure Key Vault',
      'Azure Migrate',
    ],
    correctIndex: 0,
    explanation:
      'Azure Policy enforces organizational compliance standards at resource creation and evaluates existing resources for allowed locations, SKUs, and mandatory tags.',
  },
  {
    id: 'az900-12',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A multinational company wants a dedicated, private fiber connection from its Frankfurt datacenter directly into Microsoft Azure that does NOT traverse the public internet. Which networking service provides this?',
    options: [
      'Azure VPN Gateway (Site-to-Site)',
      'Azure ExpressRoute',
      'Azure Public Load Balancer',
      'Azure Traffic Manager',
    ],
    correctIndex: 1,
    explanation:
      'Azure ExpressRoute establishes private, dedicated Layer 3 connectivity through a connectivity provider between on-premises datacenters and Microsoft cloud edges without traversing the public internet.',
  },
  {
    id: 'az900-13',
    domain: 'Describe Azure management and governance',
    prompt:
      'Which Azure tool analyzes your running cloud workloads and generates actionable recommendations across five pillars: Cost, Security, Reliability, Operational Excellence, and Performance?',
    options: [
      'Azure Advisor',
      'Azure Blueprints',
      'Azure App Configuration',
      'Microsoft Entra Connect',
    ],
    correctIndex: 0,
    explanation:
      'Azure Advisor acts as a personalized cloud consultant, inspecting live resource telemetry and recommending cost reductions (like idle VMs), high-availability improvements, and security fixes.',
  },
  {
    id: 'az900-14',
    domain: 'Describe Azure architecture and services',
    prompt:
      'Which Azure security service protects both IaaS VMs and PaaS databases while generating a numerical Secure Score across hybrid and multi-cloud environments?',
    options: [
      'Microsoft Defender for Cloud',
      'Azure CDN',
      'Azure Queue Storage',
      'Azure Data Factory',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Defender for Cloud delivers Cloud Security Posture Management (CSPM) via Secure Score and workload threat protection across Azure, AWS, GCP, and on-premises servers.',
  },
  {
    id: 'az900-15',
    domain: 'Describe Azure management and governance',
    prompt:
      'Where does Microsoft publish transparent compliance reports, ISO/IEC 27001 audit certificates, SOC 2 Type II attestations, and GDPR documentation for auditors?',
    options: [
      'Azure Pricing Calculator',
      'Microsoft Service Trust Portal',
      'Azure VM Serial Console',
      'Azure Private Link Center',
    ],
    correctIndex: 1,
    explanation:
      'The Microsoft Service Trust Portal hosts official third-party audit reports, ISO/SOC/PCI-DSS attestations, and compliance guidance for enterprise risk and procurement teams.',
  },
  ...AZURE_AZ_900_QUESTIONS_EXT,
];

export const AWS_CLF_C02_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'clf-1',
    domain: 'Cloud Concepts',
    prompt:
      'Under the AWS Well-Architected Framework, which pillar emphasizes running workloads at the lowest price point while measuring business value delivered per dollar spent?',
    options: [
      'Operational Excellence',
      'Cost Optimization',
      'Reliability',
      'Sustainability',
    ],
    correctIndex: 1,
    explanation:
      'The Cost Optimization pillar focuses on avoiding unnecessary costs, analyzing expenditure over time, choosing appropriate pricing models, and scaling resources to match business demand.',
  },
  {
    id: 'clf-2',
    domain: 'Security and Compliance',
    prompt:
      'In the AWS Shared Responsibility Model, which task is owned by AWS rather than the customer when running applications on Amazon EC2?',
    options: [
      'Configuring EC2 guest operating system firewall rules and security patches',
      'Securing physical facilities, environmental controls, and virtualization host hardware',
      'Managing IAM user access keys and MFA enforcement',
      'Setting S3 bucket ACLs and KMS key policies',
    ],
    correctIndex: 1,
    explanation:
      'AWS handles "Security OF the Cloud" (physical datacenters, power, network hardware, and hypervisor host layer), whereas the customer manages "Security IN the Cloud" (guest OS patches, IAM, firewall rules, and data encryption).',
  },
  {
    id: 'clf-3',
    domain: 'Cloud Technology and Services',
    prompt:
      'A company wants to deploy global static assets and video streams with millisecond latency to users across Europe, UAE, and South Africa by caching content at edge locations. Which AWS service should they deploy?',
    options: [
      'AWS Direct Connect',
      'Amazon CloudFront',
      'AWS Transit Gateway',
      'Amazon EFS',
    ],
    correctIndex: 1,
    explanation:
      'Amazon CloudFront is AWS’s global Content Delivery Network (CDN), caching static and dynamic content across worldwide Edge Locations to minimize end-user latency.',
  },
  {
    id: 'clf-4',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'A fintech enterprise commits to a consistent dollar-per-hour compute spend for 3 years across EC2, AWS Fargate, and AWS Lambda, even if they change instance families or regions. Which pricing plan provides maximum flexibility and discount?',
    options: [
      'On-Demand Instances',
      'Compute Savings Plans',
      'Spot Instances',
      'Dedicated Hosts',
    ],
    correctIndex: 1,
    explanation:
      'Compute Savings Plans automatically apply discounted pricing (up to ~66%) across EC2 (any instance family/OS/region), Fargate, and Lambda in exchange for a 1- or 3-year hourly spend commitment.',
  },
  {
    id: 'clf-5',
    domain: 'Cloud Technology and Services',
    prompt:
      'A batch image-rendering workload can tolerate interruptions and restart cleanly if AWS reclaims capacity with a 2-minute notice, saving up to 90% over On-Demand prices. Which EC2 purchasing option fits best?',
    options: [
      'Standard Reserved Instances',
      'EC2 Spot Instances',
      'EC2 Dedicated Instances',
      'Capacity Reservations',
    ],
    correctIndex: 1,
    explanation:
      'Spot Instances allow workloads that are stateless, fault-tolerant, or checkpointed (CI/CD workers, batch ML rendering) to leverage spare AWS capacity at steep discounts (up to 90% off).',
  },
  {
    id: 'clf-6',
    domain: 'Security and Compliance',
    prompt:
      'Which AWS service continuously monitors CloudTrail management events, VPC Flow Logs, and DNS logs using machine learning to alert teams of compromised IAM credentials or crypto-mining EC2 hosts?',
    options: [
      'Amazon GuardDuty',
      'AWS Artifact',
      'Amazon Route 53',
      'AWS Config',
    ],
    correctIndex: 0,
    explanation:
      'Amazon GuardDuty is a managed threat detection service analyzing CloudTrail, VPC Flow Logs, and DNS query telemetry for malicious behavior without requiring agents.',
  },
  {
    id: 'clf-7',
    domain: 'Security and Compliance',
    prompt:
      'An external auditor requests AWS’s latest ISO 27001, PCI-DSS, and SOC 2 compliance reports for due diligence. Where can your team download these documents in self-service?',
    options: [
      'AWS Trusted Advisor',
      'AWS Artifact',
      'AWS CloudFormation',
      'Amazon Inspector',
    ],
    correctIndex: 1,
    explanation:
      'AWS Artifact is the self-service portal for on-demand access to AWS’s security and compliance audit reports and select online agreements (BAA, NDA).',
  },
  {
    id: 'clf-8',
    domain: 'Cloud Technology and Services',
    prompt:
      'Which AWS database service is fully managed, serverless-friendly, and delivers consistent single-digit millisecond latency for high-scale key-value and document workloads?',
    options: [
      'Amazon RDS for PostgreSQL',
      'Amazon DynamoDB',
      'Amazon Redshift',
      'Amazon Aurora',
    ],
    correctIndex: 1,
    explanation:
      'Amazon DynamoDB is a fully managed NoSQL key-value and document database designed for single-digit millisecond latency at virtually any scale.',
  },
  {
    id: 'clf-9',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'Your enterprise production account requires 24/7 phone/chat access to Cloud Support Engineers with under 15-minute response SLA for business-critical outages plus a dedicated Technical Account Manager (TAM). Which AWS Support plan is the minimum required?',
    options: [
      'Developer Support',
      'Business Support',
      'Enterprise On-Ramp or Enterprise Support',
      'Basic Support',
    ],
    correctIndex: 2,
    explanation:
      'Enterprise Support provides a dedicated Technical Account Manager (TAM) and <15-minute response SLA for business-critical system down events (Enterprise On-Ramp offers pooled TAM guidance with <30-minute SLA). Business Support has <1-hour SLA and no TAM.',
  },
  {
    id: 'clf-10',
    domain: 'Cloud Concepts',
    prompt:
      'During a cloud migration, a team moves an existing ERP application to EC2 with minimal code changes ("lift-and-shift"). Which of the 7 Rs migration strategies does this describe?',
    options: [
      'Replatform',
      'Rehost',
      'Refactor / Re-architect',
      'Retire',
    ],
    correctIndex: 1,
    explanation:
      'Rehosting ("lift-and-shift") migrates applications directly onto cloud IaaS instances without modifying core architecture, enabling fast datacenter exit.',
  },
  {
    id: 'clf-11',
    domain: 'Security and Compliance',
    prompt:
      'Which AWS service protects public web applications behind CloudFront or an Application Load Balancer against SQL injection, cross-site scripting (XSS), and malicious HTTP bots?',
    options: [
      'AWS WAF (Web Application Firewall)',
      'AWS Shield Standard',
      'AWS KMS',
      'AWS Secrets Manager',
    ],
    correctIndex: 0,
    explanation:
      'AWS WAF operates at Layer 7 (HTTP/HTTPS) to inspect requests for SQLi, XSS, rate-limiting violations, and OWASP threats, whereas AWS Shield focuses on Layer 3/4/7 DDoS defense.',
  },
  {
    id: 'clf-12',
    domain: 'Cloud Technology and Services',
    prompt:
      'An operations engineer wants to write infrastructure (VPCs, subnets, ALB, RDS) in declarative YAML/JSON templates so identical environments can be recreated reliably across dev and prod. Which native AWS service handles this?',
    options: [
      'AWS CloudFormation',
      'AWS CloudTrail',
      'AWS Systems Manager Session Manager',
      'Amazon Athena',
    ],
    correctIndex: 0,
    explanation:
      'AWS CloudFormation is AWS’s native Infrastructure as Code (IaC) engine for provisioning and updating stacks of resources consistently from JSON or YAML templates.',
  },
  {
    id: 'clf-13',
    domain: 'Cloud Technology and Services',
    prompt:
      'Which AWS service lets analysts run standard SQL queries directly against petabytes of CSV/Parquet files stored in Amazon S3 without loading data into a traditional database cluster?',
    options: [
      'Amazon Athena',
      'Amazon ElastiCache',
      'AWS Glue DataBrew only',
      'Amazon EBS',
    ],
    correctIndex: 0,
    explanation:
      'Amazon Athena is a serverless interactive query service that lets you analyze data directly in Amazon S3 using standard SQL, paying strictly per terabyte scanned.',
  },
  {
    id: 'clf-14',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'You manage 12 AWS accounts under AWS Organizations and notice unused Elastic IPs, idle EBS volumes, and over-provisioned EC2 instances. Which service provides real-time cost optimization checks and security posture warnings?',
    options: [
      'AWS Trusted Advisor',
      'AWS Budgets only',
      'Amazon CloudWatch Logs',
      'AWS CodePipeline',
    ],
    correctIndex: 0,
    explanation:
      'AWS Trusted Advisor inspects your AWS environment across Cost Optimization, Performance, Security, Fault Tolerance, and Service Quotas to highlight idle resources and open security groups.',
  },
  {
    id: 'clf-15',
    domain: 'Cloud Concepts',
    prompt:
      'Designing workloads so failure of one Availability Zone automatically redirects traffic to healthy instances in another AZ demonstrates which cloud benefit?',
    options: [
      'Elasticity',
      'High Availability & Fault Tolerance',
      'Global CapEx Amortization',
      'Vendor Lock-In',
    ],
    correctIndex: 1,
    explanation:
      'Multi-AZ deployment ensures High Availability and Fault Tolerance so an isolated datacenter facility disruption causes zero downtime.',
  },
  ...AWS_CLF_C02_QUESTIONS_EXT,
];

export const CISCO_CCNA_200_301_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'ccna-1',
    domain: 'Network Fundamentals',
    prompt:
      'A branch office needs a single IPv4 subnet from `192.168.40.0/24` that supports at least 28 usable host IP addresses with minimum wasted addresses. Which subnet mask and CIDR prefix should you assign?',
    options: [
      '/28 (`255.255.255.240`)',
      '/27 (`255.255.255.224`)',
      '/26 (`255.255.255.192`)',
      '/29 (`255.255.255.248`)',
    ],
    correctIndex: 1,
    explanation:
      'A `/27` leaves 5 host bits: $2^5 - 2 = 30$ usable host addresses (`255.255.255.224`), neatly covering 28 hosts without wasting the 62 hosts of a `/26`. A `/28` provides only 14 usable hosts.',
  },
  {
    id: 'ccna-2',
    domain: 'Network Access',
    prompt:
      'An engineer inspects `show interfaces trunk` between Switch1 and Switch2 and notices native VLAN mismatch syslog alerts (`%CDP-4-NATIVE_VLAN_MISMATCH`). What happens to untagged frames if Switch1 uses Native VLAN 10 and Switch2 uses Native VLAN 99?',
    options: [
      'Frames are dropped immediately at the ingress physical layer',
      'Frames sent untagged by Switch1 from VLAN 10 are accepted into VLAN 99 on Switch2, causing cross-VLAN traffic leaks',
      'Both switches automatically negotiate VLAN 1 as fallback',
      'STP puts both ports into `err-disabled` permanently',
    ],
    correctIndex: 1,
    explanation:
      '802.1Q trunking sends native VLAN frames untagged. A mismatch causes untagged frames from Switch1’s VLAN 10 to be placed into Switch2’s VLAN 99—a major security and reachability defect.',
  },
  {
    id: 'ccna-3',
    domain: 'IP Connectivity',
    prompt:
      'A Cisco router has learned routes to `10.50.0.0/16` simultaneously from OSPF (AD 110, metric 20), EIGRP Internal (AD 90, metric 25600), and a Static Route (AD 1). Which route is installed in the routing table?',
    options: [
      'OSPF because metric 20 is numerically lowest',
      'EIGRP Internal because it is a Cisco proprietary protocol',
      'The Static Route because Administrative Distance 1 is lower than 90 and 110',
      'Both OSPF and EIGRP via equal-cost load balancing',
    ],
    correctIndex: 2,
    explanation:
      'Routers compare Administrative Distance (AD) across different routing sources before considering metrics when prefix lengths match. Static routes have default AD 1, beating EIGRP (90) and OSPF (110).',
  },
  {
    id: 'ccna-4',
    domain: 'IP Connectivity',
    prompt:
      'Wait—what if Router1 has `/24` (`10.50.1.0/24`) via OSPF and `/16` (`10.50.0.0/16`) via a Static Route, and receives a packet destined for `10.50.1.55`?',
    options: [
      'The router uses the `/16` Static Route because Static AD 1 beats OSPF AD 110',
      'The router uses the `/24` OSPF route because longest prefix match always takes precedence over Administrative Distance',
      'The router drops the packet as an ambiguous route conflict',
      'The router load-balances 50/50 between OSPF and Static',
    ],
    correctIndex: 1,
    explanation:
      'When forwarding packets, routers ALWAYS apply Longest Prefix Match (`/24` beats `/16`) before anything else. AD only resolves tie-breaks for identical prefix lengths.',
  },
  {
    id: 'ccna-5',
    domain: 'Network Access',
    prompt:
      'Two Cisco Catalyst switches are configured with `channel-group 1 mode active` on Switch A and `channel-group 1 mode on` on Switch B. What happens to the EtherChannel bundle?',
    options: [
      'LACP forms a working 2-link Port-Channel cleanly',
      'PAgP negotiates an active bundle',
      'The EtherChannel fails to bundle (`active` uses LACP negotiation, whereas `mode on` disables negotiation)',
      'Both switches fall back to single-link CDP tunneling',
    ],
    correctIndex: 2,
    explanation:
      '`mode active` speaks LACP (IEEE 802.3ad) and must pair with `active` or `passive`. `mode on` statically forces bundling without negotiation and is incompatible with LACP (`active`/`passive`) or PAgP (`desirable`/`auto`).',
  },
  {
    id: 'ccna-6',
    domain: 'Security Fundamentals',
    prompt:
      'How should a network engineer mitigate rogue DHCP servers handing out malicious default gateways on access switch ports?',
    options: [
      'Enable DHCP Snooping globally, trust only the uplink port to the legitimate DHCP server, and leave access ports untrusted',
      'Disable ARP across all VLANs',
      'Change switch ports from `access` to `dynamic desirable`',
      'Enable PortFast on trunk links to routers',
    ],
    correctIndex: 0,
    explanation:
      'DHCP Snooping marks client-facing ports as untrusted by default—dropping `DHCPOFFER`/`DHCPACK` server replies originating from untrusted ports while allowing them on the trusted uplink port.',
  },
  {
    id: 'ccna-7',
    domain: 'IP Services',
    prompt:
      'On an edge router configured for PAT (NAT Overload) with command `ip nat inside source list 1 interface Gi0/1 overload`, what happens when inside hosts `10.1.1.10` and `10.1.1.11` open HTTPS connections simultaneously?',
    options: [
      'Only the first host connects until its NAT timeout expires',
      'Both inside local IPs share `Gi0/1`’s single public IP, distinguished by unique translated source TCP/UDP port numbers',
      'Two separate public IP addresses must be assigned from an IP pool',
      'Packets bypass NAT using IPv6 Teredo',
    ],
    correctIndex: 1,
    explanation:
      'Port Address Translation (PAT / NAT Overload) maps thousands of private inside local addresses onto a single public outside global IP by assigning unique source port numbers in the translation table.',
  },
  {
    id: 'ccna-8',
    domain: 'IP Connectivity',
    prompt:
      'In single-area OSPF (`area 0`) on a shared Ethernet LAN segment, two routers have identical OSPF priority (`1`). Router A has highest Loopback0 IP `192.168.100.1`, while Router B has higher physical interface IP `10.0.0.254`. Which router wins DR election (assuming both boot simultaneously)?',
    options: [
      'Router B because physical interface IP is higher',
      'Router A because OSPF prioritizes active Loopback IPs over physical interface IPs when determining Router ID',
      'Neither; both enter 2-Way state permanently',
      'Whichever router has the lowest MAC address',
    ],
    correctIndex: 1,
    explanation:
      'When Priority ties (default 1), OSPF selects the Designated Router (DR) by highest OSPF Router ID. Unless manually configured via `router-id`, OSPF picks the highest active Loopback IP before checking physical interface IPs.',
  },
  {
    id: 'ccna-9',
    domain: 'Network Access',
    prompt:
      'Which Rapid PVST+ (`RSTP`) port role serves as a pre-computed alternate path toward the Root Bridge and can transition immediately to Forwarding without waiting for the 30-second Forward Delay?',
    options: [
      'Designated Port',
      'Alternate Port',
      'Disabled Port',
      'Edge Blocking Port',
    ],
    correctIndex: 1,
    explanation:
      'In RSTP (802.1w), the Alternate Port receives a superior BPDU from a neighbor switch and acts as an instant hot-standby backup for the Root Port.',
  },
  {
    id: 'ccna-10',
    domain: 'Security Fundamentals',
    prompt:
      'You must apply an extended ACL permitting HTTPS (`TCP 443`) from subnet `172.16.8.0/22` to web server `10.10.20.5` only, blocking all other traffic. Where should extended ACLs generally be applied and which wildcard mask matches `/22`?',
    options: [
      'Closest to destination; wildcard `0.0.1.255`',
      'Closest to source; wildcard `0.0.3.255`',
      'Closest to source; wildcard `0.0.7.255`',
      'Closest to destination; wildcard `255.255.252.0`',
    ],
    correctIndex: 1,
    explanation:
      'Extended ACLs filter on source, destination, protocol, and port, so placing them closest to the source drops unwanted traffic immediately. Mask `/22` is `255.255.252.0`, whose inverse wildcard mask is `0.0.3.255`.',
  },
  {
    id: 'ccna-11',
    domain: 'IP Connectivity',
    prompt:
      'What IPv6 address type begins with `FE80::/10` and is automatically generated on every IPv6-enabled interface for neighbor discovery (NDP) and routing protocol next-hops without leaving the local link?',
    options: [
      'Global Unicast Address (GUA)',
      'Unique Local Address (ULA)',
      'Link-Local Unicast Address',
      'Solicited-Node Multicast Address',
    ],
    correctIndex: 2,
    explanation:
      '`FE80::/10` identifies IPv6 Link-Local addresses, which are mandatory for NDP, SLAAC default gateways, and OSPFv3/EIGRPv6 neighbor adjacencies, and are never routed beyond the local subnet.',
  },
  {
    id: 'ccna-12',
    domain: 'IP Services',
    prompt:
      'Which First Hop Redundancy Protocol (FHRP) is an open IEEE/IETF standard (RFC 5798) supporting multi-vendor routers with virtual IP failover and uses multicast `224.0.0.18`?',
    options: [
      'HSRP (Hot Standby Router Protocol)',
      'VRRP (Virtual Router Redundancy Protocol)',
      'GLBP (Gateway Load Balancing Protocol)',
      'OSPF Hello Group',
    ],
    correctIndex: 1,
    explanation:
      'VRRP is the open-standard FHRP (multicast `224.0.0.18`, IP protocol 112), whereas HSRP and GLBP are Cisco-proprietary.',
  },
  {
    id: 'ccna-13',
    domain: 'Automation and Programmability',
    prompt:
      'Compare Cisco DNA Center / Catalyst Center REST API north-bound automation with legacy CLI scraping: what standard data serialization format is primarily exchanged over HTTPS REST APIs?',
    options: [
      'Binary SNMPv1 MIB blobs',
      'JSON (JavaScript Object Notation)',
      'Raw Telnet ASCII streams',
      'TFTP binary images',
    ],
    correctIndex: 1,
    explanation:
      'Modern RESTful controller APIs (Catalyst Center, SD-WAN, Meraki) exchange structured JSON payloads over HTTPS using standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).',
  },
  {
    id: 'ccna-14',
    domain: 'Network Access',
    prompt:
      'In a Cisco Catalyst wireless architecture using FlexConnect or Local mode Lightweight APs, which protocol creates an encrypted control and data tunnel between the Access Point and Wireless LAN Controller (WLC)?',
    options: [
      'CAPWAP (Control and Provisioning of Wireless Access Points)',
      'GRE without encryption',
      'RIPv2',
      'STP BPDUs',
    ],
    correctIndex: 0,
    explanation:
      'CAPWAP (UDP ports 5246 control / 5247 data) tunnels management and client wireless traffic between Lightweight APs and the WLC.',
  },
  {
    id: 'ccna-15',
    domain: 'Security Fundamentals',
    prompt:
      'Switchport `Gi0/2` connects to a conference-room wall jack configured with `switchport port-security maximum 2`, `mac-address sticky`, and `violation restrict`. A 3rd unknown laptop plugs in. What happens?',
    options: [
      'The port shuts down (`err-disabled`) immediately and requires admin recovery',
      'The port stays `up/up`, drops frames from the unauthorized 3rd MAC address, logs a syslog/SNMP trap, and increments the security violation counter',
      'The oldest sticky MAC address is automatically overwritten',
      'The switch reboots the entire VLAN',
    ],
    correctIndex: 1,
    explanation:
      'In Port Security, `shutdown` puts the port into `err-disabled`; `protect` drops silently; `restrict` keeps the port up, drops unauthorized frames, sends syslog/SNMP notifications, and increments the violation counter.',
  },
  ...CISCO_CCNA_200_301_QUESTIONS_EXT,
];

export const MICROSOFT_SC_900_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'sc900-1',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'Which three foundational principles define Microsoft’s Zero Trust security model across identities, devices, apps, and networks?',
    options: [
      'Trust inside corporate VPN, block external clouds, rotate passwords annually',
      'Verify explicitly, Use least-privilege access, Assume breach',
      'Perimeter firewalling, Legacy NTLM auth, Single-factor tokens',
      'Air-gapped servers only, Public DNS filtering, Manual log checks',
    ],
    correctIndex: 1,
    explanation:
      'Zero Trust centers on three pillars: Verify explicitly (always authenticate/authorize using all signals), Use least-privilege access (JIT/JEA + RBAC), and Assume breach (micro-segmentation and end-to-end encryption).',
  },
  {
    id: 'sc900-2',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'A multinational organization allows contractors to access SharePoint from unmanaged personal laptops ONLY after MFA completion and blocks legacy IMAP/POP3 basic authentication. Which Entra ID capability enforces this?',
    options: [
      'Microsoft Entra Conditional Access',
      'Azure Bastion',
      'Azure DDoS Protection Standard',
      'Microsoft Purview eDiscovery',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Entra Conditional Access enforces automated if/then access policies—requiring MFA for unmanaged endpoints and blocking legacy authentication protocols lacking modern token protection.',
  },
  {
    id: 'sc900-3',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'An administrator holds Subscription Global Administrator privileges year-round, creating high lateral-movement risk. Which Microsoft Entra feature enforces Just-in-Time (JIT) time-bound role activation with mandatory approval?',
    options: [
      'Entra Privileged Identity Management (PIM)',
      'Entra Self-Service Password Reset (SSPR)',
      'Azure Resource Locks',
      'Microsoft Defender for Storage',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Entra PIM eliminates standing administrative privileges by making privileged roles "eligible" rather than permanently active, requiring MFA, justification, and optional peer approval for time-limited elevation.',
  },
  {
    id: 'sc900-4',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Your SOC team needs a cloud-native SIEM + SOAR platform that ingests logs from Azure, AWS CloudTrail, Palo Alto firewalls, and Microsoft 365 to run automated incident playbooks. Which Microsoft service fits?',
    options: [
      'Microsoft Sentinel',
      'Microsoft Defender for Cloud',
      'Microsoft Intune',
      'Azure Firewall Manager',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Sentinel is Microsoft’s cloud-native SIEM (log aggregation/correlation) and SOAR (Logic Apps automated playbooks) spanning multi-cloud and third-party security appliances.',
  },
  {
    id: 'sc900-5',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'Finance analysts must NOT be able to email Excel workbooks containing customer credit card numbers to external domains, and sensitive documents must retain watermark + encryption even when downloaded to USB drives. Which Microsoft Purview feature enforces persistent protection?',
    options: [
      'Sensitivity Labels paired with Data Loss Prevention (DLP)',
      'Azure Network Security Groups',
      'Azure Key Vault Certificates',
      'Entra B2B Guest Collaboration',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Purview Sensitivity Labels embed persistent encryption and visual markings into the file itself, while Purview DLP policies detect credit card numbers and block external sharing across Exchange, Teams, and endpoints.',
  },
  {
    id: 'sc900-6',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Which security posture metric inside Microsoft Defender for Cloud measures how effectively your Azure, AWS, and GCP subscriptions adhere to recommended security controls (MFA, disk encryption, closed management ports)?',
    options: [
      'Secure Score',
      'Compliance SLA Index',
      'TCO Savings Ratio',
      'Availability Zone Weight',
    ],
    correctIndex: 0,
    explanation:
      'Defender for Cloud Secure Score quantifies cloud security posture as a percentage and prioritizes remediation actions that give the biggest risk reduction per fix.',
  },
  {
    id: 'sc900-7',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'Which Entra external identity capability enables your B2B partner engineers to collaborate inside your Microsoft Teams channels using their own corporate Google or Microsoft credentials without creating duplicate local passwords?',
    options: [
      'Microsoft Entra External ID (B2B Collaboration)',
      'Entra Domain Services (NTLM)',
      'Azure Private Link',
      'BitLocker To Go',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Entra External ID B2B collaboration invites external partners as guest users authenticating against their home identity provider under your Conditional Access rules.',
  },
  {
    id: 'sc900-8',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'In modern federated authentication, which standard issues JSON Web Tokens (JWT) alongside OAuth 2.0 authorization to sign users into mobile and single-page web applications cleanly?',
    options: [
      'OpenID Connect (OIDC)',
      'RADIUS PAP',
      'SNMPv2c',
      'Telnet Auth',
    ],
    correctIndex: 0,
    explanation:
      'OpenID Connect (OIDC) layers an identity authentication layer over OAuth 2.0 using JSON ID tokens, ideal for modern SaaS, SPAs, and mobile apps (whereas SAML 2.0 relies on XML assertions).',
  },
  {
    id: 'sc900-9',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'What does Microsoft Defender XDR coordinate across Microsoft Defender for Endpoint, Office 365, Identity, and Cloud Apps?',
    options: [
      'Correlates cross-domain signals into unified attack stories and triggers automatic attack disruption (isolating compromised devices or disabling hijacked accounts)',
      'Replaces VNet peering in Azure',
      'Manages Azure billing invoices across currencies',
      'Encrypts physical fiber circuits between datacenters',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Defender XDR fuses telemetry across endpoints, email, identities, and SaaS apps into single multi-stage incidents with automated attack disruption.',
  },
  {
    id: 'sc900-10',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'A departing senior developer begins bulk-downloading proprietary source code repositories before handing in notice. Which Microsoft Purview solution surfaces these risky behavioral patterns while preserving employee privacy via pseudonymization?',
    options: [
      'Microsoft Purview Insider Risk Management',
      'Azure DDoS Protection Basic',
      'Azure Policy Guest Configuration',
      'Windows Hello for Business',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Purview Insider Risk Management correlates HR resignation indicators, SharePoint/endpoint exfiltration sequences, and Git downloads with anonymized usernames until escalated.',
  },
  {
    id: 'sc900-11',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Your enterprise needs to store database connection strings, API keys, and TLS certificates in FIPS 140-2/3 validated hardware security modules (HSMs) with RBAC access auditing. Which Azure service handles secrets?',
    options: [
      'Azure Key Vault',
      'Azure Files',
      'Azure Advisor',
      'Azure Traffic Manager',
    ],
    correctIndex: 0,
    explanation:
      'Azure Key Vault centrally secures cryptographic keys, secrets, and TLS/SSL certificates with Managed Identity authentication and full audit logging.',
  },
  {
    id: 'sc900-12',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'An organization prepares for EU NIS2, DORA, and GDPR audits by tracking real-time regulatory assessments and improvement actions across Microsoft 365. Which tool inside Microsoft Purview computes a readiness score against regulatory templates?',
    options: [
      'Microsoft Purview Compliance Manager',
      'Azure Migrate',
      'Azure Resource Graph',
      'Entra Password Protection',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Purview Compliance Manager provides 300+ out-of-the-box regulatory assessment templates (GDPR, ISO 27001, NIS2, HIPAA) and tracks customer vs Microsoft control actions.',
  },
  {
    id: 'sc900-13',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'Why does Microsoft recommend FIDO2 security keys or Microsoft Authenticator Passkeys over SMS one-time passcodes (OTP)?',
    options: [
      'SMS OTPs are cheaper to provision globally',
      'FIDO2 / Passkeys are phishing-resistant because cryptographic challenge responses are bound strictly to the genuine origin domain',
      'SMS OTP works only inside Azure VNets',
      'FIDO2 disables Conditional Access evaluation',
    ],
    correctIndex: 1,
    explanation:
      'SMS codes and even push notifications without number-matching can be intercepted via SIM-swapping or AiTM phishing proxies. FIDO2/Passkeys verify origin domain cryptography, blocking adversary-in-the-middle phishing.',
  },
  {
    id: 'sc900-14',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Which Azure native network security service inspects Layer 3–Layer 7 outbound and east-west traffic across Azure VNets using threat intelligence feeds, TLS inspection, and FQDN filtering?',
    options: [
      'Azure Firewall',
      'Basic Network Security Group (NSG) alone',
      'Azure Front Door DNS',
      'Azure Storage Account Firewall',
    ],
    correctIndex: 0,
    explanation:
      'Unlike basic Layer 4 NSGs, Azure Firewall is a stateful managed PaaS firewall delivering FQDN application filtering, TLS inspection, IDPS, and threat-intelligence blocking.',
  },
  {
    id: 'sc900-15',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'During ongoing litigation, Legal Counsel needs to preserve all Teams messages and Exchange emails of 5 custodians so they cannot be permanently purged even by the users themselves. Which Microsoft Purview capability enforces this?',
    options: [
      'Legal Hold inside Microsoft Purview eDiscovery',
      'Entra Self-Service Group Management',
      'Azure Advisor Cost Recommendations',
      'Defender for DNS',
    ],
    correctIndex: 0,
    explanation:
      'Purview eDiscovery Legal Hold places an immutable preservation hold on specified mailboxes, OneDrive accounts, and Teams chats for regulatory investigations or litigation.',
  },
  ...MICROSOFT_SC_900_QUESTIONS_EXT,
];

export const ISC2_CISSP_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'cissp-1',
    domain: 'Security and Risk Management',
    prompt:
      'A corporate database server valued at $400,000 faces a ransomware risk with an Exposure Factor (EF) of 35% and an Annualized Rate of Occurrence (ARO) of 0.25 (once every 4 years). What is the Annualized Loss Expectancy (ALE), and should you buy a $45,000/year mitigation control that reduces ARO to zero?',
    options: [
      'ALE = $140,000; YES, buy the control',
      'ALE = $35,000; NO, the annual control cost ($45,000) exceeds the expected annual loss ($35,000)',
      'ALE = $100,000; YES, buy the control',
      'ALE = $8,750; NO, reject the control',
    ],
    correctIndex: 1,
    explanation:
      'SLE = Asset Value × EF = $400,000 × 0.35 = $140,000. ALE = SLE × ARO = $140,000 × 0.25 = $35,000/year. Spending $45,000/year to prevent a $35,000 annualized risk is financially negative ROI unless non-financial regulatory mandates override.',
  },
  {
    id: 'cissp-2',
    domain: 'Security Architecture and Engineering',
    prompt:
      'In a classified military intelligence environment where preventing unauthorized disclosure (Confidentiality) is the overriding mandate—even at the cost of usability—which formal security model enforces "No Read Up, No Write Down"?',
    options: [
      'Biba Integrity Model',
      'Bell-LaPadula Confidentiality Model',
      'Clark-Wilson Separation Model',
      'Brewer and Nash (Chinese Wall) Model',
    ],
    correctIndex: 1,
    explanation:
      'Bell-LaPadula protects Confidentiality: Simple Security Property ("No Read Up") and *-Property ("No Write Down" so Top Secret data cannot leak into Unclassified files). Biba ("No Read Down, No Write Up") protects Integrity.',
  },
  {
    id: 'cissp-3',
    domain: 'Security and Risk Management',
    prompt:
      'When performing a Business Impact Analysis (BIA) for an enterprise payment platform, which metric defines the maximum tolerable duration a business process can remain offline before irreversible existential damage occurs?',
    options: [
      'Recovery Point Objective (RPO)',
      'Maximum Tolerable Downtime (MTD)',
      'Work Recovery Time (WRT)',
      'Mean Time Between Failures (MTBF)',
    ],
    correctIndex: 1,
    explanation:
      'Maximum Tolerable Downtime (MTD) sets the outer survival boundary; Recovery Time Objective (RTO) + Work Recovery Time (WRT) must always remain strictly less than MTD, while RPO measures acceptable data loss window.',
  },
  {
    id: 'cissp-4',
    domain: 'Asset Security',
    prompt:
      'Under enterprise data governance roles, who is a senior executive accountable for deciding data classification levels (Confidential vs Public) and retention policies—distinct from the IT engineer who implements backups and ACLs?',
    options: [
      'Data Custodian',
      'Data Owner',
      'Data Processor',
      'Change Advisory Board Chair',
    ],
    correctIndex: 1,
    explanation:
      'On CISSP exams, the Data Owner (typically a senior business unit leader) holds accountability for classification and access approvals, while the Data Custodian (IT/Cloud admin) executes technical backups, encryption, and ACL enforcement.',
  },
  {
    id: 'cissp-5',
    domain: 'Identity and Access Management',
    prompt:
      'During Kerberos authentication in an enterprise Active Directory domain, which component grants the encrypted session ticket (`TGS` service ticket) once a user already holds a valid Ticket Granting Ticket (TGT)?',
    options: [
      'Ticket Granting Service (TGS) inside the KDC',
      'RADIUS Proxy Server',
      'OAuth Authorization Endpoint',
      'OCSP Responder',
    ],
    correctIndex: 0,
    explanation:
      'In Kerberos, the Authentication Service (AS) issues the initial TGT, and the Ticket Granting Service (TGS)—both inside the Key Distribution Center (KDC)—validates the TGT to mint a Service Ticket for the target resource.',
  },
  {
    id: 'cissp-6',
    domain: 'Security Architecture and Engineering',
    prompt:
      'Why is Perfect Forward Secrecy (PFS) via Ephemeral Diffie-Hellman (ECDHE) mandatory in modern TLS 1.3 enterprise deployments?',
    options: [
      'It eliminates all certificate authorities permanently',
      'Even if an attacker steals the server’s long-term RSA/ECDSA private key years later, previously captured encrypted TLS traffic cannot be decrypted because each session generated unique ephemeral keys',
      'It compresses payloads 10x faster than AES-GCM',
      'It enables cleartext inspection without TLS termination',
    ],
    correctIndex: 1,
    explanation:
      'PFS negotiates unique, short-lived ephemeral session keys per connection that are never written to disk; compromising the server’s static signing certificate private key cannot retroactively decrypt recorded traffic.',
  },
  {
    id: 'cissp-7',
    domain: 'Communication and Network Security',
    prompt:
      'When configuring IPsec VPN tunnels between two corporate gateways behind Network Address Translation (NAT) routers, which protocol and mode encapsulate the entire original IP packet inside an outer IP header while traversing NAT cleanly?',
    options: [
      'AH Transport Mode',
      'ESP Tunnel Mode with NAT-T (UDP 4500)',
      'AH Tunnel Mode without UDP encapsulation',
      'Telnet over GRE',
    ],
    correctIndex: 1,
    explanation:
      'AH hashes the outer IP header, breaking whenever NAT modifies source/destination IPs. ESP Tunnel Mode encrypts the inner packet and pairs with NAT-Traversal (UDP port 4500) to cross NAT boundaries safely.',
  },
  {
    id: 'cissp-8',
    domain: 'Security Operations',
    prompt:
      'During forensic evidence seizure of a compromised Linux production server suspected of active in-memory malware, which order of volatility should first responders follow?',
    options: [
      'Archive backups first, then power off immediately before dumping RAM',
      'Capture CPU registers/cache and live RAM memory dump first, followed by network connections, running processes, and finally non-volatile disk images',
      'Run OS package updates to clean binaries, then image disks',
      'Copy `/var/log` over unhashed USB before checking memory',
    ],
    correctIndex: 1,
    explanation:
      'Per RFC 3227 Order of Volatility, collect the most transient evidence first (CPU cache -> live RAM -> network state/running processes -> disk/swap -> remote logs/backups) and hash everything immediately.',
  },
  {
    id: 'cissp-9',
    domain: 'Software Development Security',
    prompt:
      'What architectural pattern defeats Server-Side Request Forgery (SSRF) vulnerabilities targeting cloud instance metadata endpoints (`169.254.169.254`)?',
    options: [
      'Relying strictly on client-side JavaScript URL regex checks',
      'Enforcing IMDSv2 session-token headers combined with strict egress allowlists and network-layer blocking of link-local metadata ranges from application containers',
      'Storing IAM credentials in URL query parameters',
      'Disabling TLS certificate validation on internal proxies',
    ],
    correctIndex: 1,
    explanation:
      'IMDSv2 requires PUT session-token generation (defeating simple GET SSRF probes), while application URL allowlisting and host firewall egress blocks prevent reaching internal metadata/admin ranges.',
  },
  {
    id: 'cissp-10',
    domain: 'Security Assessment and Testing',
    prompt:
      'Before releasing a new banking microservice, your security team compares Static Application Security Testing (SAST) vs Dynamic Application Security Testing (DAST). What core blind spot does SAST miss that DAST catches?',
    options: [
      'SAST cannot detect hardcoded passwords inside source files',
      'SAST inspects source/bytecode offline without running the app, missing runtime configuration flaws, server header bugs, and live authentication state vulnerabilities caught by DAST',
      'DAST automatically rewrites source code lines',
      'SAST requires live production traffic to operate',
    ],
    correctIndex: 1,
    explanation:
      'SAST (white-box) inspects code at rest, catching code-level flaws early; DAST (black-box) probes the running staging application via HTTP, uncovering runtime environment, auth session, and WAF/header misconfigurations.',
  },
  {
    id: 'cissp-11',
    domain: 'Security and Risk Management',
    prompt:
      'In a SOC 2 Type II audit engagement vs SOC 2 Type I, why do enterprise healthcare and SaaS procurement teams insist on a Type II report?',
    options: [
      'Type I validates control design at a single point in time, whereas Type II audits continuous operating effectiveness of controls over a 6-to-12-month observation window',
      'Type II omits Security and Availability criteria',
      'Type I is strictly for financial statement balance sheets (covered by SOC 1)',
      'Type II is self-certified by internal company managers',
    ],
    correctIndex: 0,
    explanation:
      'SOC 2 Type I confirms controls were appropriately designed on a specific date; SOC 2 Type II verifies those controls actually functioned consistently over an audit period (typically 6–12 months).',
  },
  {
    id: 'cissp-12',
    domain: 'Asset Security',
    prompt:
      'A multinational payment firm retires decommissioned NVMe SSD drives containing encrypted European customer records and plans to donate the drives externally. Which NIST SP 800-88 sanitization method balances cryptographic erasure and media reuse safely?',
    options: [
      'Quick OS format (`format /q`)',
      'NIST Purge via Cryptographic Erase (destroying the Hardware Encryption Key) or Physical Destruction if SSD wear-leveling prevents verified block overwrite',
      'Deleting database tables inside SQL only',
      'Renaming partitions via `fdisk`',
    ],
    correctIndex: 1,
    explanation:
      'Standard disk overwrites (Clear) on SSDs miss wear-leveled spare blocks; NIST SP 800-88 recommends Cryptographic Erase (Purge) or physical shredding (Destroy) for retired SSD media.',
  },
  {
    id: 'cissp-13',
    domain: 'Identity and Access Management',
    prompt:
      'In an Attribute-Based Access Control (ABAC) deployment for global engineering teams, how does authorization differ from standard RBAC?',
    options: [
      'ABAC eliminates authentication completely',
      'ABAC evaluates dynamic environmental, subject, and object attributes at runtime (e.g., User Clearance + Country IP + Time of Day + Data Tag) rather than static role memberships alone',
      'RBAC supports fine-grained contextual time rules better than ABAC',
      'ABAC requires modifying OS kernel drivers on client laptops',
    ],
    correctIndex: 1,
    explanation:
      'ABAC enables fine-grained, policy-driven authorization evaluating user attributes, resource labels, and environmental context (geo-location, device health, business hours) in real time.',
  },
  {
    id: 'cissp-14',
    domain: 'Security Operations',
    prompt:
      'To enforce Separation of Duties (SoD) and Dual Control in production cloud deployments, which workflow satisfies CISSP governance best practices?',
    options: [
      'Allowing the lead developer who wrote a Terraform PR to self-approve and merge directly into production',
      'Requiring code changes to be authored by Engineer A, peer-reviewed and approved by Engineer B, and deployed via an automated CI/CD pipeline with immutable audit logs',
      'Sharing a single root break-glass password among all 4 SREs',
      'Storing production secrets in README files',
    ],
    correctIndex: 1,
    explanation:
      'Separation of Duties prevents any single individual from both introducing and approving unauthorized/malicious production changes without independent peer oversight and immutable pipeline logs.',
  },
  {
    id: 'cissp-15',
    domain: 'Physical Security (Architecture)',
    prompt:
      'What critical failure mode must data center designers verify when specifying fail-safe vs fail-secure electronic mantrap doors alongside fire alarm integration?',
    options: [
      'Fail-safe locks unlock automatically on power loss/fire alarm so human life safety evacuation is never trapped, while secondary guard monitoring prevents tailgating',
      'Fail-secure locks unlock automatically during power loss for faster evacuation',
      'Magnetic locks should never integrate with building fire panels',
      'Mantraps eliminate the need for fire suppression systems',
    ],
    correctIndex: 0,
    explanation:
      'CISSP life-safety principle always supersedes asset protection: personnel doors must operate fail-safe (unlocking upon fire alarm activation or power loss) so staff can evacuate safely.',
  },
  ...ISC2_CISSP_QUESTIONS_EXT,
];

export const KUBERNETES_CKA_QUESTIONS: PracticeQuestion[] = [
  ...KUBERNETES_CKA_QUESTIONS_EXT,
];

export const TERRAFORM_ASSOC_QUESTIONS: PracticeQuestion[] = [
  ...TERRAFORM_ASSOC_QUESTIONS_EXT,
];

export const GCP_ACE_QUESTIONS: PracticeQuestion[] = [
  ...GCP_ACE_QUESTIONS_EXT,
];

export const LINUX_PLUS_QUESTIONS: PracticeQuestion[] = [
  ...LINUX_PLUS_QUESTIONS_EXT,
];
