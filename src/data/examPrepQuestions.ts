import { PracticeQuestion } from '../types';
import {
  SECURITY_PLUS_SY0_701_QUESTIONS_EXT,
  AZURE_AZ_104_QUESTIONS_EXT,
  AWS_SAA_C03_QUESTIONS_EXT,
} from './examPrepQuestionsExt1';

export const SECURITY_PLUS_SY0_701_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'sec-1',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'A SOC analyst observes outbound DNS queries from an internal workstation containing base64-encoded hostnames toward an uncategorized external domain every 180 seconds. Which attack technique is most likely occurring?',
    options: [
      'DNS poisoning via spoofed local resolver cache',
      'DNS tunneling used for stealth command-and-control or data exfiltration',
      'ARP spoofing across the branch VLAN',
      'BGP route hijacking targeting external ISP peers',
    ],
    correctIndex: 1,
    explanation:
      'Repeated periodic outbound queries with encoded subdomain strings (such as base64) are a textbook indicator of DNS tunneling (C2 or data exfiltration over port 53).',
  },
  {
    id: 'sec-2',
    domain: 'Security Operations',
    prompt:
      'Which technical control prevents an attacker who has compromised a developer laptop from replaying stolen Active Directory NTLM hashes to authenticate to another internal server over SMB?',
    options: [
      'Enabling SMB signing and enforcing Kerberos authentication with Credential Guard',
      'Disabling ICMP echo replies on host firewalls',
      'Enforcing TLS 1.2 on public-facing web load balancers',
      'Deploying a web application firewall in reverse-proxy mode',
    ],
    correctIndex: 0,
    explanation:
      'Pass-the-Hash attacks exploit NTLM lateral movement. Requiring SMB signing, enforcing Kerberos, and isolating secrets with Credential Guard mitigates NTLM relay and hash reuse.',
  },
  {
    id: 'sec-3',
    domain: 'Security Architecture',
    prompt:
      'A European fintech team must enforce Zero Trust micro-segmentation so each Kubernetes microservice only communicates with explicitly verified identities regardless of subnet location. Which architectural component enforces this Policy Enforcement Point?',
    options: [
      'A static perimeter packet filter at the WAN router',
      'Mutual TLS (mTLS) service mesh proxies tied to workload identity certificates',
      'Port-based 802.1X authentication on top-of-rack switches',
      'NAT overload on the outbound internet gateway',
    ],
    correctIndex: 1,
    explanation:
      'A service mesh enforcing mTLS issues short-lived SPIFFE/X.509 workload identities and evaluates layer-7 authorization policies per service-to-service flow, forming an authentic Zero Trust Policy Enforcement Point.',
  },
  {
    id: 'sec-4',
    domain: 'General Security Concepts',
    prompt:
      'During a tabletop exercise, a CISO requires non-repudiation for every API financial transfer signed by a client microservice. Which cryptographic mechanism satisfies non-repudiation?',
    options: [
      'Encrypting the JSON body using AES-256-GCM with a shared key',
      'Signing the payload digest with the sender’s private asymmetric key',
      'Calculating an unsalted SHA-256 hash of the HTTP headers',
      'Encoding the authorization token in Base64 over HTTP',
    ],
    correctIndex: 1,
    explanation:
      'Only a digital signature generated using the sender’s private key binds the signer uniquely to the message and provides non-repudiation, whereas symmetric AES keys are shared.',
  },
  {
    id: 'sec-5',
    domain: 'Security Program Management and Oversight',
    prompt:
      'Before onboarding a critical SaaS ERP vendor that will process EU customer records under GDPR and NIS2, which document formally captures acceptable downtime thresholds and remediation timelines?',
    options: [
      'Non-Disclosure Agreement (NDA)',
      'Service Level Agreement (SLA) paired with a Data Processing Agreement (DPA)',
      'Certificate Signing Request (CSR)',
      'Acceptable Use Policy (AUP) for internal staff',
    ],
    correctIndex: 1,
    explanation:
      'SLAs define availability, Recovery Time Objective (RTO), and response commitments, while DPAs codify GDPR controller/processor breach notification and data handling duties.',
  },
  {
    id: 'sec-6',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'An enterprise helpdesk receives calls from someone spoofing the CFO’s caller ID asking the agent to reset MFA tokens while claiming to be boarding an international flight. Which social engineering vectors are combined?',
    options: [
      'Watering hole and typosquatting',
      'Vishing and urgency/authority intimidation',
      'SQL injection and session fixation',
      'Evil twin and bluesnarfing',
    ],
    correctIndex: 1,
    explanation:
      'Voice phishing (vishing) combined with executive authority impersonation and artificial time pressure is a classic MFA bypass technique targeting service desk personnel.',
  },
  {
    id: 'sec-7',
    domain: 'Security Operations',
    prompt:
      'An organization discovers active ransomware encrypting a file server. After isolating the host from the network, which forensic action preserves volatile encryption keys before powering down the server?',
    options: [
      'Running a full disk defragmentation pass',
      'Capturing a live RAM memory image prior to shutdown',
      'Formatting the swap partition to reclaim disk blocks',
      'Immediately rebooting into Safe Mode with Networking',
    ],
    correctIndex: 1,
    explanation:
      'In RFC 3227 Order of Volatility, CPU registers and RAM are captured before disk storage because symmetric keys and injected malware payloads reside in memory and are lost on reboot.',
  },
  {
    id: 'sec-8',
    domain: 'Security Architecture',
    prompt:
      'To protect sensitive customer payment data stored in a cloud database while still permitting application-layer queries, which combination provides strong confidentiality and key separation?',
    options: [
      'Tokenization or envelope encryption using a hardware-backed KMS outside the database host',
      'Storing plaintext CSV snapshots in a versioned object bucket',
      'Compressing database backups using ZIP passwords stored in an environment variable',
      'Applying RAID-5 striping across NVMe volumes without encryption',
    ],
    correctIndex: 0,
    explanation:
      'Envelope encryption with an HSM-backed KMS isolates key management from raw storage, while tokenization removes sensitive PAN values from the database altogether.',
  },
  {
    id: 'sec-9',
    domain: 'Security Program Management and Oversight',
    prompt:
      'A quantitative risk assessment computes an Asset Value (AV) of $400,000, an Exposure Factor (EF) of 25%, and an Annualized Rate of Occurrence (ARO) of 0.5. What is the Annualized Loss Expectancy (ALE)?',
    options: [
      '$100,000',
      '$50,000',
      '$200,000',
      '$25,000',
    ],
    correctIndex: 1,
    explanation:
      'SLE = AV × EF = $400,000 × 0.25 = $100,000. ALE = SLE × ARO = $100,000 × 0.5 = $50,000 per year.',
  },
  {
    id: 'sec-10',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'Developers discover that a public web form permits attackers to enter `; cat /etc/passwd` after a filename parameter and return system files. Which vulnerability and fix apply?',
    options: [
      'Cross-Site Request Forgery; add SameSite cookies',
      'OS Command Injection; avoid shell invocation and enforce strict allowlist validation',
      'Buffer overflow; enable ASLR in BIOS',
      'Directory traversal; disable TLS session resumption',
    ],
    correctIndex: 1,
    explanation:
      'Command separators (`;`) executing shell utilities indicate OS command injection. Eliminating shell interpreters and using parameterized OS APIs with input allowlisting fixes it.',
  },
  {
    id: 'sec-11',
    domain: 'Security Operations',
    prompt:
      'Which SCAP and automation technology allows a SIEM/SOAR platform to trigger automated endpoint isolation playbooks within seconds of a high-severity EDR alert?',
    options: [
      'Manual monthly vulnerability spreadsheet export',
      'SOAR playbooks invoking EDR quarantine APIs via webhooks',
      'RADIUS accounting packets sent to a Syslog archive',
      'Wireshark packet capture manually emailed to Tier-3',
    ],
    correctIndex: 1,
    explanation:
      'Security Orchestration, Automation, and Response (SOAR) integrates SIEM detections with EDR APIs to contain compromised endpoints rapidly without waiting on manual ticket queues.',
  },
  {
    id: 'sec-12',
    domain: 'Security Architecture',
    prompt:
      'A security architect must grant external contractors access ONLY to three internal web portals without issuing VPN clients that connect their unmanaged laptops to internal corporate subnets. Which design fits best?',
    options: [
      'Split-tunnel L2TP/IPsec VPN terminating on the core switch',
      'Identity-aware Zero Trust reverse proxy (ZTNA / Application Proxy) with device posture checks',
      'Port forwarding TCP 3389 directly to internal jump hosts',
      'Guest Wi-Fi bridged directly into the production server VLAN',
    ],
    correctIndex: 1,
    explanation:
      'Clientless ZTNA / Identity-Aware Proxies broker HTTP/S access strictly per application after MFA and posture verification without exposing underlying L3 corporate subnets.',
  },
  {
    id: 'sec-13',
    domain: 'General Security Concepts',
    prompt:
      'Which physical security control specifically prevents tailgating into a Tier-3 data center server hall?',
    options: [
      'A single-door keycard reader wired to a buzzer',
      'An access control vestibule (mantrap) requiring badge + biometric confirmation per occupant',
      'Chain-link perimeter fencing with warning signage',
      'Motion-activated floodlights above the loading dock',
    ],
    correctIndex: 1,
    explanation:
      'An access control vestibule interlocks two doors so only one authorized individual can pass verification before the inner door unlocks.',
  },
  {
    id: 'sec-14',
    domain: 'Security Operations',
    prompt:
      'While reviewing X.509 web certificate validation, an engineer notices the browser cannot verify revocation status because the responder URL timed out during an outage. Why might soft-fail OCSP allow an untrusted certificate?',
    options: [
      'OCSP stapling always forces offline self-signed certificates',
      'Soft-fail behavior accepts certificates when the CRL or OCSP responder is unreachable',
      'HSTS headers disable TLS certificate expiration checks',
      'Wildcard certificates bypass CA signature chains completely',
    ],
    correctIndex: 1,
    explanation:
      'With soft-fail OCSP checking, connectivity failures to the responder cause clients to proceed anyway unless hard-fail or OCSP Must-Staple is enforced.',
  },
  {
    id: 'sec-15',
    domain: 'Security Program Management and Oversight',
    prompt:
      'An internal audit identifies a legacy payment mainframe that cannot run modern EDR agents and will be decommissioned in 4 months. Which compensating controls reduce risk without halting operations?',
    options: [
      'Ignore the finding until next year’s penetration test',
      'Isolate the mainframe in a dedicated micro-VLAN, restrict jump-host protocols, and stream Syslog to SIEM',
      'Publish the mainframe IP on external DNS for automated SaaS scanning',
      'Share a single root login across operators to speed troubleshooting',
    ],
    correctIndex: 1,
    explanation:
      'Compensating controls—network segmentation, strict bastion access controls, and continuous out-of-band log monitoring—mitigate exposure when primary agent controls cannot be installed.',
  },
  ...SECURITY_PLUS_SY0_701_QUESTIONS_EXT,
];

export const AZURE_AZ_104_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'az-1',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'You deploy two Virtual Networks (`VNet-Hub` and `VNet-Spoke1`) in the same Azure region and configure VNet peering. However, VMs in `VNet-Spoke1` cannot reach an on-premises subnet connected to `VNet-Hub` via an ExpressRoute Virtual Network Gateway. What must you enable on the peering links?',
    options: [
      'Enable BGP route propagation only on the subnet route table without peering changes',
      'Enable "Allow gateway transit" on `VNet-Hub` and "Use remote gateway" on `VNet-Spoke1`',
      'Create an Azure Application Gateway between both virtual networks',
      'Assign public IPv4 addresses to every NIC inside `VNet-Spoke1`',
    ],
    correctIndex: 1,
    explanation:
      'In hub-and-spoke Azure networking, the hub VNet hosting the VPN/ExpressRoute gateway must enable "Allow gateway transit", and spoke VNets must enable "Use the remote virtual network’s gateway".',
  },
  {
    id: 'az-2',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'An Azure administrator creates a Resource Lock (`CanNotDelete`) at the Resource Group level and assigns a user the `Contributor` role on that same Resource Group. The user attempts to delete an Azure Storage Account inside the Resource Group. What happens?',
    options: [
      'The user succeeds because Contributor includes Microsoft.Authorization/*/Delete',
      'The delete fails because Resource Locks override RBAC permissions including Owner and Contributor',
      'The storage account enters soft-delete state for 7 days automatically',
      'Only Azure Policy denies the deletion if diagnostic logging is enabled',
    ],
    correctIndex: 1,
    explanation:
      'Azure Resource Locks apply across all users and roles—even Owner and Contributor must hold `Microsoft.Authorization/locks/*` permissions to remove the lock first before deleting protected resources.',
  },
  {
    id: 'az-3',
    domain: 'Implement and Manage Storage',
    prompt:
      'A regulated healthcare workload stores immutable audit logs in Azure Blob Storage and requires that data be replicated synchronously across three physically separate buildings within a single Azure region, while remaining readable if an entire building loses power. Which redundancy option meets this at lowest cost?',
    options: [
      'Locally Redundant Storage (LRS)',
      'Zone-Redundant Storage (ZRS)',
      'Geo-Redundant Storage (GRS)',
      'Read-Access Geo-Zone-Redundant Storage (RA-GZRS)',
    ],
    correctIndex: 1,
    explanation:
      'Zone-Redundant Storage (ZRS) synchronously copies data across three Azure Availability Zones within one primary region, protecting against a single-zone datacenter failure at lower cost than cross-region GRS/GZRS.',
  },
  {
    id: 'az-4',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'You manage an Azure Virtual Machine Scale Set (`VMSS`) hosting a stateless API behind an Azure Standard Load Balancer. Traffic spikes regularly every morning at 08:30 GMT. How do you ensure instances scale out automatically without over-provisioning?',
    options: [
      'Configure an Autoscale rule triggering +2 instances when Average Percentage CPU > 75% for 10 minutes',
      'Convert the VMSS into a single DS5_v2 standalone VM with Accelerated Networking',
      'Manually run `az vmss scale` via cron on an external workstation',
      'Switch from Standard Load Balancer to Basic Public IP',
    ],
    correctIndex: 0,
    explanation:
      'Metric-based VMSS autoscale rules (CPU, memory, or scheduled recurrence profiles) automatically add or remove VM instances dynamically based on workload thresholds.',
  },
  {
    id: 'az-5',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'A company wants to prevent developers from deploying costly GPU-series VMs across any of 12 subscriptions in the `Engineering` Management Group. Which Azure governance tool enforces this restriction?',
    options: [
      'Azure Role-Based Access Control (RBAC) Reader role',
      'Azure Policy built-in definition "Allowed virtual machine size SKUs" assigned to the Engineering Management Group',
      'Azure Advisor Cost Recommendations alert rule',
      'Microsoft Entra Conditional Access MFA policy',
    ],
    correctIndex: 1,
    explanation:
      'Azure Policy evaluates resource properties (such as VM SKU) at ARM deployment time, whereas RBAC governs *who* can act on resources rather than *which SKUs or regions* are allowed.',
  },
  {
    id: 'az-6',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'An Azure Storage Account stores sensitive HR documents. You want VMs inside `Subnet-App` to reach Azure Blob Storage over the Microsoft Azure backbone instead of traversing the public internet, without paying for dedicated private IP endpoints if simple subnet-level routing is preferred. Which feature do you enable on `Subnet-App`?',
    options: [
      'Service Endpoint for `Microsoft.Storage` combined with Storage Firewall allowing `Subnet-App`',
      'Azure Bastion host in the same resource group',
      'Network Watcher Packet Capture extension',
      'Public IPv6 prefix on the Storage Account',
    ],
    correctIndex: 0,
    explanation:
      'Virtual Network Service Endpoints extend VNet private identity over the Azure backbone to Azure PaaS services like `Microsoft.Storage` at zero additional hourly endpoint cost.',
  },
  {
    id: 'az-7',
    domain: 'Monitor and Maintain Azure Resources',
    prompt:
      'Your operations team needs immediate Slack/Teams notifications and an automated webhook runbook whenever any production VM memory drops below 10% available. Which Azure Monitor combination fulfills this?',
    options: [
      'Azure Activity Log export to Cold Blob Storage',
      'Azure Monitor Metric Alert Rule linked to an Action Group triggering Webhook / Logic App actions',
      'Azure Network Watcher Connection Monitor only',
      'Azure Resource Graph Explorer saved query',
    ],
    correctIndex: 1,
    explanation:
      'Azure Monitor Alert Rules evaluate telemetry metrics on schedule and invoke Action Groups capable of sending SMS/email/webhook payloads to ITSM or Automation Runbooks.',
  },
  {
    id: 'az-8',
    domain: 'Implement and Manage Storage',
    prompt:
      'Users need temporary read-only access to a single private blob PDF for exactly 4 hours without sharing the Storage Account Access Keys or creating Entra ID accounts. What should your application generate?',
    options: [
      'A Stored Access Policy assigned at the subscription level',
      'A User Delegation or Service Shared Access Signature (SAS) token scoped to `r` permission and 4h expiry',
      'Anonymous public container read access toggled on for 4 hours',
      'Azure Files SMB share mapped with the Storage Account key',
    ],
    correctIndex: 1,
    explanation:
      'A scoped SAS token (ideally a User Delegation SAS signed with Microsoft Entra credentials) grants time-bounded granular access (`r` read-only) to a single blob safely.',
  },
  {
    id: 'az-9',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'You need to deploy a containerized Python microservice into Azure without managing Kubernetes control planes or underlying Linux VM OS patching, while supporting HTTP scale-to-zero. Which service fits?',
    options: [
      'Azure Virtual Machines with Docker CE installed manually',
      'Azure Container Apps (or Azure Container Instances for standalone pods)',
      'Azure Dedicated Host',
      'Azure Site Recovery',
    ],
    correctIndex: 1,
    explanation:
      'Azure Container Apps runs serverless KEDA-powered containers with built-in HTTP ingress and scale-to-zero without Kubernetes node administration.',
  },
  {
    id: 'az-10',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'You configure an Azure Load Balancer (Standard SKU) in front of 3 backend VMs, yet incoming TCP 443 health probes keep failing and no traffic reaches the VMs. The VMs respond locally on localhost:443. What is the most common cause?',
    options: [
      'The subnet NSG allows HTTPS from `Internet` but lacks an Inbound rule allowing the `AzureLoadBalancer` service tag on port 443',
      'VMs must be placed inside separate Azure subscriptions',
      'Standard Load Balancer only supports UDP health probes',
      'Accelerated Networking disables TCP 443',
    ],
    correctIndex: 0,
    explanation:
      'Azure Load Balancer health probes originate from IP `168.63.129.16` represented by the `AzureLoadBalancer` NSG service tag. Blocking it in custom NSGs marks all backend nodes unhealthy.',
  },
  {
    id: 'az-11',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'A VM running an ETL application needs to retrieve database secrets from Azure Key Vault without storing any client secret or certificate in config files. Which Entra feature solves this?',
    options: [
      'Creating a shared Break-Glass Global Admin account',
      'Enabling a System-Assigned Managed Identity on the VM and granting it `Key Vault Secrets User` RBAC role',
      'Embedding an SAS token inside the ARM template parameters file',
      'Using Azure AD Connect Password Hash Sync',
    ],
    correctIndex: 1,
    explanation:
      'Managed Identities provide an automatically rotated Microsoft Entra identity to Azure compute resources so code requests tokens from IMDS with zero hardcoded secrets.',
  },
  {
    id: 'az-12',
    domain: 'Implement and Manage Storage',
    prompt:
      'To reduce Azure Blob Storage costs for compliance files rarely read after 30 days and archived after 180 days, what automated feature should you configure?',
    options: [
      'Blob Lifecycle Management policy rules transitioning blobs from Hot -> Cool -> Archive tiers',
      'Enabling Soft Delete for containers',
      'Converting Block Blobs into Page Blobs',
      'Enabling Premium SSD v2 snapshots',
    ],
    correctIndex: 0,
    explanation:
      'Azure Blob Storage Lifecycle Management automatically transitions blobs across Hot, Cool, Cold, and Archive access tiers or deletes expired versions based on age filters.',
  },
  {
    id: 'az-13',
    domain: 'Monitor and Maintain Azure Resources',
    prompt:
      'Which Azure service provides file-level and full-VM application-consistent backup with long-term retention vaults and Immutable WORM protection against ransomware?',
    options: [
      'Azure Recovery Services Vault (Azure Backup)',
      'Azure Traffic Manager',
      'Azure DNS Private Resolver',
      'Azure Service Health',
    ],
    correctIndex: 0,
    explanation:
      'Azure Backup using a Recovery Services Vault delivers scheduled snapshots, soft-delete protection, Multi-User Authorization, and Immutable Vault policies.',
  },
  {
    id: 'az-14',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'A hub VNet runs an Azure Firewall NVA (`10.0.1.4`). How do you force all outbound internet traffic (`0.0.0.0/0`) from `Spoke-App-Subnet` through the firewall for inspection?',
    options: [
      'Create a User-Defined Route (UDR) table with route `0.0.0.0/0 -> VirtualAppliance (10.0.1.4)` and associate it with `Spoke-App-Subnet`',
      'Enable BGP propagation on Azure DNS',
      'Attach an Application Security Group to the Azure Firewall',
      'Enable Public IP NAT Gateway directly on the spoke subnet',
    ],
    correctIndex: 0,
    explanation:
      'UDRs override Azure default system routes so `0.0.0.0/0` traffic is forced via `NextHopType: VirtualAppliance` to Azure Firewall.',
  },
  {
    id: 'az-15',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'When capturing a custom Azure VM image to deploy 25 identical servers across multiple subscriptions cleanly without retaining source machine SIDs/hostnames, what step must run inside the OS before deallocating and generalizing?',
    options: [
      'Windows Sysprep (`sysprep /generalize /oobe /shutdown`) or Linux `waagent -deprovision+user`',
      'Only clearing browser history and restarting `sshd`',
      'Converting the OS disk from Managed to Unmanaged storage',
      'Detaching all NICs while the VM is running',
    ],
    correctIndex: 0,
    explanation:
      'Generalizing the OS strips machine-specific identity/SSH host keys so new VMs provisioned from the Azure Compute Gallery image boot cleanly.',
  },
  ...AZURE_AZ_104_QUESTIONS_EXT,
];

export const AWS_SAA_C03_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'aws-1',
    domain: 'Design Secure Architectures',
    prompt:
      'An application hosted on EC2 instances inside private subnets needs to read and write large parquet files in Amazon S3 without traversing the public internet or incurring NAT Gateway per-GB data processing charges. What should a Solutions Architect configure?',
    options: [
      'Deploy a second NAT Gateway in every Availability Zone',
      'Create a Gateway VPC Endpoint for Amazon S3 and associate it with the private subnet route tables',
      'Attach Elastic IPs directly to the private EC2 instances',
      'Route S3 requests through an AWS Site-to-Site VPN connection',
    ],
    correctIndex: 1,
    explanation:
      'An S3 Gateway VPC Endpoint adds a prefix-list route directly in private subnet route tables over the AWS backbone at zero hourly or per-GB data processing fees, avoiding NAT Gateway costs.',
  },
  {
    id: 'aws-2',
    domain: 'Design Resilient Architectures',
    prompt:
      'A high-traffic e-commerce API receives sudden flash-sale spikes that occasionally overwhelm its backend relational Amazon RDS PostgreSQL database. How can you decouple order writes so no orders are lost during traffic surges?',
    options: [
      'Place an Amazon SQS queue in front of AWS Lambda / ECS worker consumers writing at a controlled rate to RDS (plus RDS Proxy)',
      'Replace Application Load Balancer with Amazon Route 53 latency routing',
      'Disable Multi-AZ on RDS to cut synchronous replication overhead',
      'Store pending orders inside EC2 instance store ephemeral volumes',
    ],
    correctIndex: 0,
    explanation:
      'SQS buffers burst writes reliably while worker consumers + Amazon RDS Proxy pool database connections cleanly without exhausting RDS max_connections.',
  },
  {
    id: 'aws-3',
    domain: 'Design High-Performing Architectures',
    prompt:
      'A global SaaS media platform stores 4K training videos in Amazon S3 in `eu-west-1` and serves users across Europe, UAE, UK, and South Africa. Latency is high for distant viewers and S3 egress costs are rising. Which architecture optimizes both speed and cost?',
    options: [
      'Replicate S3 buckets into 18 separate regions and expose raw S3 URLs',
      'Serve videos via an Amazon CloudFront CDN distribution backed by the S3 origin using Origin Access Control (OAC)',
      'Convert S3 objects into Amazon EFS mounted over NFS to edge servers',
      'Use AWS Global Accelerator pointing directly at an S3 bucket IP',
    ],
    correctIndex: 1,
    explanation:
      'CloudFront caches video chunks at global edge locations near users, cutting latency and lowering AWS S3 outbound data transfer pricing, while OAC keeps the S3 bucket completely private.',
  },
  {
    id: 'aws-4',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'A financial batch analytics workload processes raw logs every night using stateless containerized jobs that can safely resume from S3 checkpoints if interrupted, taking 2 hours total. Which EC2 purchasing option reduces compute cost up to 70–90%?',
    options: [
      'Dedicated Hosts with 3-Year All Upfront reservation',
      'Amazon EC2 Spot Instances managed by AWS Batch or ECS Capacity Providers',
      'On-Demand Instances across three Availability Zones',
      'Dedicated Instances with Provisioned IOPS io2 volumes',
    ],
    correctIndex: 1,
    explanation:
      'Stateless, fault-tolerant, checkpointable batch jobs are the ideal workload for EC2 Spot Instances, yielding massive discounts over On-Demand pricing.',
  },
  {
    id: 'aws-5',
    domain: 'Design Secure Architectures',
    prompt:
      'In a multi-account AWS Organizations structure, security engineers want a hard guardrail ensuring NO member account—not even the root user of a member account—can disable AWS CloudTrail or deploy resources outside EU/UK regions. What enforces this?',
    options: [
      'IAM Permission Boundaries applied per user manually',
      'Service Control Policies (SCPs) attached at the Organizational Unit (OU) level',
      'Security Groups on the default VPC',
      'S3 Bucket ACLs in the management account',
    ],
    correctIndex: 1,
    explanation:
      'AWS Organizations Service Control Policies (SCPs) establish maximum permission boundaries across entire accounts/OUs and restrict even member-account root users.',
  },
  {
    id: 'aws-6',
    domain: 'Design Resilient Architectures',
    prompt:
      'An Amazon Aurora PostgreSQL cluster requires sub-minute automatic failover inside `eu-central-1` plus a separate read replica in `eu-west-1` to serve UK reporting queries with under 1-second replication lag. What configuration meets both requirements?',
    options: [
      'Enable Multi-AZ Aurora Read Replicas in `eu-central-1` AND configure Aurora Global Database spanning `eu-west-1`',
      'Take nightly manual RDS snapshots and copy them to `eu-west-1`',
      'Run MySQL on a single EC2 t3.large instance with EBS snapshots',
      'Use DynamoDB Accelerator (DAX) in front of RDS',
    ],
    correctIndex: 0,
    explanation:
      'Aurora Global Database delivers physical storage-level replication across regions (<1s lag) alongside local AZ failover inside the primary region.',
  },
  {
    id: 'aws-7',
    domain: 'Design High-Performing Architectures',
    prompt:
      'A Linux HPC cluster running on 40 EC2 instances in `us-east-1` requires a shared POSIX-compliant high-throughput parallel file system supporting sub-millisecond latencies and Lustre integration with S3. Which service should be chosen?',
    options: [
      'Amazon EFS Standard-IA',
      'Amazon FSx for Lustre',
      'Amazon EBS gp3 attached via Multi-Attach',
      'AWS Storage Gateway Tape Gateway',
    ],
    correctIndex: 1,
    explanation:
      'Amazon FSx for Lustre provides high-throughput, sub-millisecond shared POSIX storage engineered specifically for HPC, ML training, and native S3 data repository synchronization.',
  },
  {
    id: 'aws-8',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'A team uploads millions of JSON documents into an S3 bucket with unpredictable access patterns—some accessed frequently for weeks, others untouched for months—and wants automatic cost savings without retrieval fees or writing custom lifecycle rules. Which S3 storage class fits?',
    options: [
      'S3 Glacier Deep Archive',
      'S3 Intelligent-Tiering',
      'S3 Standard-IA',
      'S3 One Zone-IA',
    ],
    correctIndex: 1,
    explanation:
      'S3 Intelligent-Tiering monitors object access automatically and shifts objects between Frequent, Infrequent, and Archive Instant Access tiers with zero retrieval fees.',
  },
  {
    id: 'aws-9',
    domain: 'Design Secure Architectures',
    prompt:
      'An AWS Lambda function must connect to an Amazon RDS database using credentials stored securely and rotated automatically every 30 days without code redeployment. Which pattern is recommended?',
    options: [
      'Store DB password in Lambda plaintext environment variables',
      'Store DB credentials in AWS Secrets Manager with automatic rotation enabled and fetch via Lambda IAM role',
      'Store credentials inside an unencrypted S3 object in the deployment bucket',
      'Use EC2 Instance Metadata Service v1',
    ],
    correctIndex: 1,
    explanation:
      'AWS Secrets Manager integrates natively with RDS to rotate credentials automatically and enables Lambda functions to fetch secrets via IAM.',
  },
  {
    id: 'aws-10',
    domain: 'Design Resilient Architectures',
    prompt:
      'Your enterprise connects 18 VPCs across multiple accounts plus an on-premises Direct Connect gateway in a scalable hub topology instead of maintaining an n*(n-1)/2 full-mesh of VPC peering links. Which AWS networking service provides centralized transitive routing?',
    options: [
      'AWS Transit Gateway',
      'AWS ClassicLink',
      'Amazon Route 53 Alias Records',
      'AWS PrivateLink Interface Endpoint only',
    ],
    correctIndex: 0,
    explanation:
      'AWS Transit Gateway acts as a central regional network hub enabling transitive routing across thousands of VPCs, VPNs, and Direct Connect gateways.',
  },
  {
    id: 'aws-11',
    domain: 'Design High-Performing Architectures',
    prompt:
      'An online gaming leaderboard requires single-digit millisecond key-value reads/writes globally with automatic active-active multi-region replication. Which AWS database fits best?',
    options: [
      'Amazon Redshift RA3 Cluster',
      'Amazon DynamoDB Global Tables',
      'Amazon RDS SQL Server Single-AZ',
      'Amazon Athena querying gzip CSV in S3',
    ],
    correctIndex: 1,
    explanation:
      'DynamoDB Global Tables provide active-active multi-region replication with consistent single-digit millisecond latency at massive scale.',
  },
  {
    id: 'aws-12',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'An enterprise has committed to running containerized AWS Fargate, AWS Lambda, and heterogeneous EC2 instances for the next 1 year and may shift between instance families (m6i to c7g Graviton). Which discount plan offers the highest flexibility?',
    options: [
      'Compute Savings Plans (1-year commitment)',
      'Standard EC2 Instance Reserved Instances locked to `us-east-1a` m5.large',
      'EC2 Dedicated Hosts',
      'On-Demand Capacity Reservations',
    ],
    correctIndex: 0,
    explanation:
      'Compute Savings Plans automatically apply discounts across EC2 instance families, sizes, regions, Fargate, and Lambda with zero manual instance exchange overhead.',
  },
  {
    id: 'aws-13',
    domain: 'Design Secure Architectures',
    prompt:
      'To inspect and block SQL injection, cross-site scripting, and bot scraping BEFORE requests reach your Application Load Balancer or CloudFront distribution, what should you attach?',
    options: [
      'Network ACL blocking port 80',
      'AWS WAF (Web Application Firewall) with AWS Managed Rulesets',
      'Amazon Inspector EC2 agent',
      'AWS Artifact compliance reports',
    ],
    correctIndex: 1,
    explanation:
      'AWS WAF integrates directly with CloudFront and ALB to filter L7 web attacks using managed rule groups, rate limiting, and geo-blocking.',
  },
  {
    id: 'aws-14',
    domain: 'Design Resilient Architectures',
    prompt:
      'An architecture uses an Application Load Balancer forwarding requests to an Auto Scaling Group across 3 Availability Zones (`az-a`, `az-b`, `az-c`). You discover sticky sessions via ALB target-group cookies caused uneven CPU saturation on one AZ. What else helps eliminate single-AZ dependency for state?',
    options: [
      'Externalize user session state into Amazon ElastiCache for Redis / Valkey and disable sticky sessions',
      'Reduce the Auto Scaling Group to 1 Availability Zone',
      'Switch from ALB to Route 53 weighted DNS with 1-hour TTL',
      'Increase EBS volume size on existing instances',
    ],
    correctIndex: 0,
    explanation:
      'Storing session tokens in shared multi-AZ ElastiCache makes the web tier truly stateless so ALB distributes requests evenly across all healthy targets.',
  },
  {
    id: 'aws-15',
    domain: 'Design High-Performing Architectures',
    prompt:
      'A company operates a stateful legacy TCP financial protocol that requires static anycast IPv4 addresses whitelisted by partner banks and instant failover between `eu-west-1` and `us-east-1`. Which AWS networking service provides static anycast IPs routing over the AWS global backbone?',
    options: [
      'AWS Global Accelerator',
      'Amazon S3 Transfer Acceleration',
      'NAT Gateway',
      'Amazon API Gateway HTTP API',
    ],
    correctIndex: 0,
    explanation:
      'AWS Global Accelerator provides two static anycast IPv4 addresses entering the AWS edge network and routing TCP/UDP traffic directly to healthy regional endpoints.',
  },
  ...AWS_SAA_C03_QUESTIONS_EXT,
];
