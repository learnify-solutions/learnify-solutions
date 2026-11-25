import { PracticeQuestion } from '../types';

export const SECURITY_PLUS_SY0_701_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'sec-16',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'A web application accepts user-supplied SVG profile icons and parses embedded XML entities that read `/etc/passwd` from the host OS. Which vulnerability class is being exploited?',
    options: [
      'Cross-Site Request Forgery (CSRF)',
      'XML External Entity (XXE) injection',
      'Server-Side Template Injection (SSTI)',
      'DOM-based Open Redirect',
    ],
    correctIndex: 1,
    explanation:
      'XXE vulnerabilities occur when XML parsers process external entity declarations inside untrusted XML/SVG uploads, disclosing local files or triggering SSRF.',
  },
  {
    id: 'sec-17',
    domain: 'Security Operations',
    prompt:
      'During post-incident containment, a SOC engineer detects persistence via a scheduled Windows Registry Run key launching PowerShell from `%APPDATA%`. Which MITRE ATT&CK tactic describes this mechanism?',
    options: [
      'Initial Access',
      'Persistence',
      'Exfiltration',
      'Resource Development',
    ],
    correctIndex: 1,
    explanation:
      'Modifying Registry Run keys (`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`) preserves attacker code execution across user logons and reboots (Persistence).',
  },
  {
    id: 'sec-18',
    domain: 'Security Architecture',
    prompt:
      'Which cloud security solution inspects API calls, storage ACLs, and Kubernetes permissions across AWS and Azure to detect misconfigurations before attackers exploit them?',
    options: [
      'Cloud Security Posture Management (CSPM)',
      'Network Access Control (802.1X NAC)',
      'Hardware Security Module (HSM)',
      'Host-based Intrusion Prevention (HIPS)',
    ],
    correctIndex: 0,
    explanation:
      'CSPM continuously audits cloud control planes for misconfigurations such as public S3 buckets, overly permissive IAM roles, and unencrypted databases.',
  },
  {
    id: 'sec-19',
    domain: 'General Security Concepts',
    prompt:
      'An organization replaces static monthly passwords with FIDO2 hardware security keys bound to the browser origin URL. Which threat does FIDO2/WebAuthn resist natively?',
    options: [
      'Local physical theft of an unlocked laptop',
      'Adversary-in-the-Middle (AitM) phishing reverse proxies',
      'Zero-day kernel buffer overflows',
      'Distributed Denial of Service (DDoS) volumetric floods',
    ],
    correctIndex: 1,
    explanation:
      'FIDO2/WebAuthn binds cryptographic challenges strictly to the legitimate TLS origin domain, neutralizing AitM reverse-proxy phishing kits.',
  },
  {
    id: 'sec-20',
    domain: 'Security Program Management and Oversight',
    prompt:
      'While conducting a quantitative risk assessment, a data center valued at $500,000 has a 10% Exposure Factor for flooding occurring once every 5 years (ARO = 0.2). What is the Annualized Loss Expectancy (ALE)?',
    options: [
      '$50,000',
      '$10,000',
      '$100,000',
      '$2,500',
    ],
    correctIndex: 1,
    explanation:
      'SLE = AV * EF = $500,000 * 0.10 = $50,000. ALE = SLE * ARO = $50,000 * 0.20 = $10,000 per year.',
  },
  {
    id: 'sec-21',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'An attacker compromises a legitimate open-source JavaScript package maintainer account and pushes a hidden credential stealer in a minor patch version. What attack type is this?',
    options: [
      'Watering hole attack',
      'Software supply chain compromise',
      'DNS cache poisoning',
      'Session hijacking',
    ],
    correctIndex: 1,
    explanation:
      'Trojanizing an upstream dependency or CI/CD build pipeline compromises downstream organizations via trusted updates, defining a software supply chain attack.',
  },
  {
    id: 'sec-22',
    domain: 'Security Operations',
    prompt:
      'A vulnerability scanner reports CVSS 9.8 on a Linux library inside an offline lab workstation that has zero network connectivity and no sensitive data. Which prioritization framework best balances real exploit risk?',
    options: [
      'EPSS + asset criticality + network exposure triage',
      'Patching purely alphabetically by hostname',
      'Ignoring all CVSS scores below 10.0',
      'Disabling vulnerability scanning during business quarters',
    ],
    correctIndex: 0,
    explanation:
      'Risk-based vulnerability management combines CVSS severity with Exploit Prediction Scoring System (EPSS), CISA KEV status, exposure, and asset criticality.',
  },
  {
    id: 'sec-23',
    domain: 'Security Architecture',
    prompt:
      'To protect corporate laptops against malicious firmware modification before Windows boots, which UEFI hardware chain-of-trust feature validates signed bootloaders?',
    options: [
      'Port Security',
      'Secure Boot paired with TPM 2.0 measured boot',
      'BitLocker network unlock alone',
      'BIOS legacy MBR emulation',
    ],
    correctIndex: 1,
    explanation:
      'UEFI Secure Boot verifies cryptographic signatures on bootloaders and kernel drivers, while TPM 2.0 seals measurements against tampering.',
  },
  {
    id: 'sec-24',
    domain: 'General Security Concepts',
    prompt:
      'Which cryptographic property ensures that two distinct input files cannot feasibly produce the exact same SHA-256 message digest?',
    options: [
      'Key stretching',
      'Collision resistance',
      'Symmetric diffusion',
      'Forward secrecy',
    ],
    correctIndex: 1,
    explanation:
      'Collision resistance guarantees it is computationally infeasible to find two distinct inputs x != y such that H(x) = H(y).',
  },
  {
    id: 'sec-25',
    domain: 'Security Operations',
    prompt:
      'A SOC uses SOAR playbooks to automatically disable an Entra ID user, revoke active refresh tokens, and quarantine the endpoint via EDR within 20 seconds of a confirmed impossible-travel alert. What phase is this?',
    options: [
      'Preparation',
      'Containment',
      'Lessons Learned',
      'Risk Acceptance',
    ],
    correctIndex: 1,
    explanation:
      'Disabling sessions, revoking tokens, and isolating hosts stops attacker lateral spread during the NIST SP 800-61 Containment phase.',
  },
  {
    id: 'sec-26',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'Security logs reveal an employee visited a hacked HR portal that embedded an invisible iframe forcing the browser to submit a bank transfer request while the user remained logged into their banking tab. Which attack occurred?',
    options: [
      'Cross-Site Request Forgery (CSRF)',
      'SQL Injection (SQLi)',
      'Directory Traversal',
      'Clickjacking / UI Redressing only when typing passwords',
    ],
    correctIndex: 0,
    explanation:
      'CSRF tricks an authenticated browser into sending forged state-changing requests because cookies are attached automatically unless SameSite/anti-CSRF tokens block it.',
  },
  {
    id: 'sec-27',
    domain: 'Security Architecture',
    prompt:
      'A manufacturing plant runs legacy PLCs that cannot install antivirus agents or accept security patches. Which compensating control isolates them from corporate office IT users?',
    options: [
      'Placing PLCs on the guest Wi-Fi SSID',
      'Air-gapping or firewalling an OT DMZ with unidirectional/allowlisted jump hosts',
      'Disabling DNS inside the corporate office',
      'Assigning public IPv4 addresses directly to each PLC',
    ],
    correctIndex: 1,
    explanation:
      'OT/ICS segmentation (Purdue Model DMZ, strict allowlisted firewalls, and hardened jump hosts) prevents corporate ransomware from reaching unpatchable PLCs.',
  },
  {
    id: 'sec-28',
    domain: 'Security Program Management and Oversight',
    prompt:
      'Before migrating a healthcare system to a cloud PaaS provider, leadership selects cyber insurance to cover financial losses beyond technical mitigation. Which risk strategy is this?',
    options: [
      'Risk avoidance',
      'Risk transference',
      'Risk acceptance',
      'Risk ignorance',
    ],
    correctIndex: 1,
    explanation:
      'Purchasing cyber liability insurance or outsourcing indemnity shifts financial impact to a third party, known as risk transference.',
  },
  {
    id: 'sec-29',
    domain: 'General Security Concepts',
    prompt:
      'An engineer deploys honeypots and canary database credentials across an internal subnet to trigger high-fidelity alerts the moment an intruder probes east-west. What control category is this?',
    options: [
      'Deception / Detective security control',
      'Preventive physical barrier',
      'Corrective patch control',
      'Compensating encryption control',
    ],
    correctIndex: 0,
    explanation:
      'Honeypots, honeynets, and canary tokens function as deception-based detective controls with near-zero false positives.',
  },
  {
    id: 'sec-30',
    domain: 'Security Operations',
    prompt:
      'Which HTTP response header instructs modern browsers to load JavaScript exclusively from trusted company domains and reject inline injected `<script>` tags?',
    options: [
      'X-Frame-Options: ALLOWALL',
      'Content-Security-Policy (CSP)',
      'Access-Control-Allow-Origin: *',
      'Strict-Transport-Security only',
    ],
    correctIndex: 1,
    explanation:
      'Content-Security-Policy (CSP) restricts executable script origins, blocking reflected and stored XSS payload execution.',
  },
  {
    id: 'sec-31',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'An attacker sits in a café broadcasting a Wi-Fi SSID identical to the target enterprise guest network with stronger signal strength to intercept HTTP login credentials. What attack is this?',
    options: [
      'Evil Twin access point',
      'MAC flooding',
      'RADIUS replay',
      'VLAN hopping',
    ],
    correctIndex: 0,
    explanation:
      'An Evil Twin impersonates a legitimate corporate SSID to lure nearby wireless clients into routing traffic through an attacker-controlled AP.',
  },
  {
    id: 'sec-32',
    domain: 'Security Architecture',
    prompt:
      'Which SASE/SSE capability acts as a policy enforcement proxy between cloud SaaS apps (Salesforce, M365) and remote users to inspect shadow IT uploads and DLP rules?',
    options: [
      'Cloud Access Security Broker (CASB)',
      'Dynamic Host Configuration Protocol (DHCP)',
      'Simple Mail Transfer Protocol (SMTP)',
      'Border Gateway Protocol (BGP)',
    ],
    correctIndex: 0,
    explanation:
      'CASB provides visibility, shadow IT discovery, DLP enforcement, and threat protection across sanctioned and unsanctioned SaaS applications.',
  },
  {
    id: 'sec-33',
    domain: 'General Security Concepts',
    prompt:
      'Why do security engineers configure bcrypt or Argon2id instead of bare SHA-256 when storing user account passwords?',
    options: [
      'Argon2id is reversible by administrators when users forget passwords',
      'Key-stretching algorithms add per-user salts and high memory/CPU work factors to slow offline cracking',
      'SHA-256 outputs plaintext strings',
      'Bcrypt encrypts files faster than AES-256',
    ],
    correctIndex: 1,
    explanation:
      'Argon2id and bcrypt are intentionally slow, salted adaptive password hashing functions designed to defeat GPU/ASIC brute-force attacks.',
  },
  {
    id: 'sec-34',
    domain: 'Security Program Management and Oversight',
    prompt:
      'During disaster recovery planning, finance executives state the payment ledger can lose at most 15 minutes of committed transactions during an outage. What metric was just defined?',
    options: [
      'Mean Time Between Failures (MTBF)',
      'Recovery Point Objective (RPO)',
      'Annualized Rate of Occurrence (ARO)',
      'Mean Time to Detect (MTTD)',
    ],
    correctIndex: 1,
    explanation:
      'RPO defines the maximum tolerable duration of data loss measured backward from an outage (determining backup/replication frequency).',
  },
  {
    id: 'sec-35',
    domain: 'Security Operations',
    prompt:
      'After an email phishing wave, an analyst extracts an unknown attachment SHA-256 hash and queries threat feeds plus detonation sandboxes without triggering the binary on production hosts. Which analysis method is this?',
    options: [
      'Dynamic sandbox analysis & threat intelligence lookup',
      'Live production fuzzing',
      'Disk wiping and reimaging only',
      'Black-box social engineering',
    ],
    correctIndex: 0,
    explanation:
      'Detonating suspicious samples inside an isolated malware sandbox alongside OSINT hash reputation reveals C2 indicators safely.',
  },
  {
    id: 'sec-36',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'Attackers exhaust a firewall state table by flooding half-open TCP SYN packets using spoofed source IP addresses without completing the three-way handshake. Which defense mitigates this?',
    options: [
      'Enabling SYN cookies on the perimeter firewall/load balancer',
      'Turning off TLS 1.3',
      'Increasing DHCP lease durations',
      'Switching from TCP to UDP for HTTPS',
    ],
    correctIndex: 0,
    explanation:
      'SYN cookies encode connection state cryptographically into initial sequence numbers, preventing SYN flood memory exhaustion.',
  },
  {
    id: 'sec-37',
    domain: 'Security Architecture',
    prompt:
      'A company requires third-party contractors to access only one internal web invoicing app without installing a full-tunnel VPN client or seeing the rest of the corporate LAN. What Zero Trust access pattern fits best?',
    options: [
      'Clientless Zero Trust Network Access (ZTNA) reverse application proxy',
      'Site-to-site IPsec GRE tunnel to every contractor home router',
      'Publishing internal RDP TCP 3389 directly to the public internet',
      'Sharing a single local administrator account',
    ],
    correctIndex: 0,
    explanation:
      'ZTNA brokers authenticated per-application HTTPS access based on device posture and identity without granting broad L3 network reachability.',
  },
  {
    id: 'sec-38',
    domain: 'Security Program Management and Oversight',
    prompt:
      'An organization runs unannounced simulated failover drills at a secondary cloud region while production customer requests stay active via DNS health checks. Which resilience exercise is this?',
    options: [
      'Parallel / Live failover testing',
      'Paper checklist walkthrough',
      'Tabletop verbal review',
      'Cold site contract signing',
    ],
    correctIndex: 0,
    explanation:
      'Parallel/live simulation exercises actively shift or mirror workloads to verify real failover telemetry, exceeding tabletop or walkthrough reviews.',
  },
  {
    id: 'sec-39',
    domain: 'Security Operations',
    prompt:
      'Which Linux kernel security module or endpoint capability restricts compromised web server processes from writing outside `/var/www` using mandatory access control (MAC) policies?',
    options: [
      'SELinux or AppArmor profiles',
      'Disabling SSH root password login alone',
      'Increasing `/tmp` partition quota',
      'Installing Wireshark on the web server',
    ],
    correctIndex: 0,
    explanation:
      'SELinux and AppArmor enforce Mandatory Access Control confinement so even hijacked daemon processes cannot touch unauthorized paths.',
  },
  {
    id: 'sec-40',
    domain: 'General Security Concepts',
    prompt:
      'Which PKI certificate extension prevents an unauthorized compromised web server certificate from impersonating a Root Certificate Authority to sign forged domains?',
    options: [
      'Basic Constraints `CA=FALSE` + restricted Key Usage',
      'Subject Alternative Name (SAN) wildcards',
      'Extended validity of 20 years',
      'Using SHA-1 signatures',
    ],
    correctIndex: 0,
    explanation:
      'End-entity leaf certificates carry Basic Constraints `CA=FALSE`, preventing browsers from trusting them to issue sub-certificates.',
  },
  {
    id: 'sec-41',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'A threat actor alters a banking URL parameter from `?invoice=4012` to `?invoice=4013` and views another customer’s private PDF statement because the backend never checks ownership. What flaw is this?',
    options: [
      'Insecure Direct Object Reference (IDOR) / Broken Object Level Authorization',
      'Integer Buffer Underflow',
      'Clickjacking',
      'DNS Zone Transfer',
    ],
    correctIndex: 0,
    explanation:
      'IDOR (OWASP API1 Broken Object Level Authorization) exposes unauthorized records when APIs trust user-supplied IDs without authorization checks.',
  },
  {
    id: 'sec-42',
    domain: 'Security Architecture',
    prompt:
      'Which DLP deployment architecture inspects outbound emails and web uploads at the corporate internet egress before sensitive PII or source code leaves the company?',
    options: [
      'Network-based DLP gateway integrated with proxy/SMTP relay',
      'RAID-10 storage controller mirroring',
      'Endpoint BIOS password lock',
      'NTP stratum-1 clock synchronization',
    ],
    correctIndex: 0,
    explanation:
      'Network DLP inspects traffic in motion across SMTP, HTTP/S proxy, and cloud egress channels to block policy-violating transfers.',
  },
  {
    id: 'sec-43',
    domain: 'Security Program Management and Oversight',
    prompt:
      'A multinational retail chain undergoes an annual payment audit validating cardholder encryption, firewall segmentation, and vulnerability scans. Which standard governs this audit?',
    options: [
      'PCI DSS',
      'HIPAA alone',
      'SOX Section 404 only',
      'FERPA',
    ],
    correctIndex: 0,
    explanation:
      'Payment Card Industry Data Security Standard (PCI DSS) mandates technical and operational controls for storing, processing, or transmitting cardholder data.',
  },
  {
    id: 'sec-44',
    domain: 'Security Operations',
    prompt:
      'When onboarding a new third-party SaaS SSO integration, what logging data should always stream into your central SIEM?',
    options: [
      'Authentication sign-in events, MFA failures, admin role changes, and OAuth consent grants',
      'Only CPU temperature telemetry from user laptops',
      'Plaintext user passwords for correlation',
      'Marketing website public CSS asset downloads',
    ],
    correctIndex: 0,
    explanation:
      'Identity telemetry—sign-ins, MFA prompts, impossible travel, role escalations, and OAuth app grants—provides critical visibility into account takeover.',
  },
  {
    id: 'sec-45',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    prompt:
      'After stealing a valid OAuth bearer session cookie via XSS, an attacker replays it from another country without ever knowing the victim’s password or MFA code. Which mitigation helps break stolen cookie replay?',
    options: [
      'Setting `HttpOnly`, `Secure`, `SameSite` flags, short token TTLs, and Conditional Access IP/device-bound tokens',
      'Disabling HTTPS on internal dashboards',
      'Storing JWTs in `localStorage` indefinitely without expiry',
      'Allowing HTTP GET requests to transfer session keys',
    ],
    correctIndex: 0,
    explanation:
      'Marking session cookies `HttpOnly` blocks JS document.cookie reads, while `Secure`, short lifetimes, and device/token-binding policies defeat off-device replay.',
  },
];

export const AZURE_AZ_104_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'az-16',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'Two Azure Virtual Networks (`VNet-Hub` and `VNet-Spoke`) are peered. You deploy an Azure Firewall (`10.0.1.4`) inside `VNet-Hub`. How do you ensure all outbound internet traffic from `VNet-Spoke` passes through the firewall instead of exiting directly?',
    options: [
      'Associate a Route Table (UDR) with `VNet-Spoke` subnets containing `0.0.0.0/0` -> Next Hop Type `Virtual appliance` (`10.0.1.4`)',
      'Enable DDoS Basic on `VNet-Spoke`',
      'Configure an NSG outbound rule permitting port 443 to `Internet`',
      'Add a Private Endpoint inside `VNet-Spoke`',
    ],
    correctIndex: 0,
    explanation:
      'User-Defined Routes (UDRs) override Azure’s default system route for `0.0.0.0/0`, steering spoke subnet traffic to the hub NVA/Azure Firewall IP.',
  },
  {
    id: 'az-17',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'An Azure Policy with the `Deny` effect is assigned at a Management Group requiring tag `Environment`. A Resource Group Owner attempts to deploy an untagged Storage Account. What happens?',
    options: [
      'The Owner role overrides Azure Policy and deploys successfully',
      'Azure Resource Manager denies the deployment before resource creation',
      'The resource deploys and waits 24 hours before deletion',
      'Azure Policy automatically grants the user Global Administrator',
    ],
    correctIndex: 1,
    explanation:
      'Azure Policy enforces organizational compliance guardrails independently of RBAC—even Subscription Owners cannot bypass an active `Deny` policy.',
  },
  {
    id: 'az-18',
    domain: 'Implement and Manage Storage',
    prompt:
      'A legal archive stores signed contracts in Azure Blob Storage with immutable compliance retention (`WORM`) locked for 7 years so even Subscription Owners cannot delete blobs early. Which feature enforces this?',
    options: [
      'Soft delete for blobs set to 7 days',
      'Locked time-based Immutable Storage policy on the Blob container',
      'Azure File Sync cloud tiering',
      'Moving blobs from Hot to Cool tier',
    ],
    correctIndex: 1,
    explanation:
      'Locked time-based immutable retention policies prevent modification or deletion by all users—including Microsoft support and Subscription Owners—until expiry.',
  },
  {
    id: 'az-19',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'You deploy an Azure App Service Web App (`Standard S1`) and need zero-downtime staging validation before promoting code to production with instant rollback capability. Which feature should you use?',
    options: [
      'Deployment Slots with Swap',
      'Creating a completely separate Azure Subscription per build',
      'Manual FTP file upload to `wwwroot`',
      'Enabling Azure Bastion on the App Service',
    ],
    correctIndex: 0,
    explanation:
      'App Service Deployment Slots warm up new releases in an isolated staging slot and swap virtual IPs instantaneously with zero downtime.',
  },
  {
    id: 'az-20',
    domain: 'Monitor and Maintain Azure Resources',
    prompt:
      'You want an automated alert whenever any production Azure VM experiences CPU utilization above 85% for 10 consecutive minutes, triggering an Action Group webhook to Slack and PagerDuty. Which Azure Monitor rule type fits best?',
    options: [
      'Activity Log Alert on administrative events',
      'Metric Alert rule evaluating VM Percentage CPU with an Action Group',
      'Azure Advisor cost recommendation alert',
      'NSG Flow Logs retention policy',
    ],
    correctIndex: 1,
    explanation:
      'Metric Alerts evaluate near-real-time numeric time-series telemetry such as `Percentage CPU` and invoke Action Groups for notifications or automation.',
  },
  {
    id: 'az-21',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'An Azure VM with a Standard Load Balancer backend pool needs outbound internet access for OS updates, but currently has no public IP attached. Why does outbound connectivity fail by default on a Standard Load Balancer?',
    options: [
      'Standard Load Balancers require explicit outbound rules, a NAT Gateway, or instance-level Public IPs because Standard SKU is secure-by-default',
      'Standard Load Balancers block TCP completely',
      'Azure Linux VMs disable outbound routing on port 443',
      'Standard Load Balancers only support UDP traffic',
    ],
    correctIndex: 0,
    explanation:
      'Unlike Basic Load Balancer, Standard Load Balancer blocks implicit default outbound SNAT unless you attach an Outbound Rule, NAT Gateway, or Public IP.',
  },
  {
    id: 'az-22',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'A contractor needs temporary `Contributor` access on a single Resource Group for 4 hours every Tuesday only after MFA approval and manager sign-off. Which Entra ID feature delivers this?',
    options: [
      'Permanent Subscription Owner assignment',
      'Microsoft Entra Privileged Identity Management (PIM) eligible Azure RBAC assignment',
      'Sharing a Service Principal client secret in Teams',
      'Assigning Global Reader at the root tenant',
    ],
    correctIndex: 1,
    explanation:
      'Entra PIM allows Just-in-Time eligible role activations gated by time limits, MFA enforcement, justification, and optional approval workflows.',
  },
  {
    id: 'az-23',
    domain: 'Implement and Manage Storage',
    prompt:
      'Which Azure Storage replication option copies writes synchronously across three distinct Availability Zones within a single primary region, providing resilience even if an entire datacenter building goes offline?',
    options: [
      'Locally Redundant Storage (LRS)',
      'Zone-Redundant Storage (ZRS)',
      'Read-Access Geo-Redundant Storage (RA-GRS) across a single zone',
      'Standard unmanaged page blobs',
    ],
    correctIndex: 1,
    explanation:
      'ZRS replicates data synchronously across three physically separated Availability Zones inside the primary region.',
  },
  {
    id: 'az-24',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'Your team runs containerized REST APIs on Azure without wanting to manage Kubernetes control planes, worker VM patching, or cluster upgrades, while supporting scale-to-zero KEDA HTTP scaling. Which service fits best?',
    options: [
      'Azure Container Apps',
      'Unmanaged Virtual Machine Scale Set with Docker CE',
      'Azure Dedicated Host',
      'Azure Batch',
    ],
    correctIndex: 0,
    explanation:
      'Azure Container Apps provides a serverless Kubernetes-backed runtime supporting KEDA event scaling, HTTP traffic splitting, and scale-to-zero without managing AKS nodes.',
  },
  {
    id: 'az-25',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'A hybrid enterprise uses Azure Private DNS Zones linked to `VNet-Hub`. Why must on-premises servers connecting via ExpressRoute use Azure DNS Private Resolver (or a conditional forwarder VM) to resolve `*.privatelink.blob.core.windows.net`?',
    options: [
      'On-premises DNS servers cannot query Azure’s virtual recursive resolver `168.63.129.16` directly over ExpressRoute without an inbound endpoint inside Azure',
      'ExpressRoute blocks UDP port 53 completely by default',
      'Private DNS Zones only support IPv6',
      'Azure DNS Private Resolver replaces BGP completely',
    ],
    correctIndex: 0,
    explanation:
      '`168.63.129.16` is link-local to Azure VNets; an Azure DNS Private Resolver inbound endpoint provides a routable private IP inside the VNet for on-premises forwarders.',
  },
  {
    id: 'az-26',
    domain: 'Implement and Manage Storage',
    prompt:
      'An application accesses Azure Files shares over SMB (`port 445`) from remote laptops where corporate ISP routers block TCP 445 outbound. What Azure feature enables encrypted SMB mounting over HTTPS (`port 443`)?',
    options: [
      'Azure Files mounted via Point-to-Site VPN / Azure File Sync / SMB over QUIC (Windows Server)',
      'Switching Azure Files to NFS v3 without a VNet',
      'Using SAS tokens inside `/etc/fstab` over port 80',
      'Enabling Azure Storage Firewall public bypass',
    ],
    correctIndex: 0,
    explanation:
      'ISPs routinely block TCP 445; routing SMB through a P2S VPN/ExpressRoute, SMB over QUIC (UDP 443), or Azure File Sync avoids ISP port 445 drops.',
  },
  {
    id: 'az-27',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'You resize an Azure Linux VM from `Standard_D4s_v5` to `Standard_E8s_v5` to double RAM. What happens to temporary files saved inside `/dev/sdb` (the local temporary resource disk) during resize?',
    options: [
      'Data on the temporary disk may be lost if the VM is reallocated to different physical host hardware',
      'Temporary disk contents automatically migrate into Azure Blob Archive',
      'OS disk C:/root is permanently wiped too',
      'Managed Data Disks lose all partitions',
    ],
    correctIndex: 0,
    explanation:
      'The temporary disk (`D:` or `/mnt`) is non-persistent local NVMe/SSD storage attached to the physical host; resizing often reallocates the VM and wipes temp data.',
  },
  {
    id: 'az-28',
    domain: 'Monitor and Maintain Azure Resources',
    prompt:
      'Where should you route Azure Activity Logs and Entra ID Sign-in Logs if compliance requires retaining searchable audit history for 3 years with KQL queries?',
    options: [
      'Diagnostic Settings -> Log Analytics Workspace (with Data Retention / Archive configured)',
      'VM Local Windows Event Viewer only',
      'Azure Serial Console screen buffer',
      'Azure Cost Management export CSV',
    ],
    correctIndex: 0,
    explanation:
      'Diagnostic Settings forward platform and Entra logs directly to a Log Analytics Workspace for KQL querying and multi-year retention.',
  },
  {
    id: 'az-29',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'A Resource Group carries a `CanNotDelete` Resource Lock. A Subscription Owner tries to delete a VM inside that Resource Group via Azure CLI. What is the result?',
    options: [
      'The deletion fails with `ScopeLocked` until an Owner/User Access Administrator removes the lock first',
      'The VM is deleted because Subscription Owners bypass locks',
      'Only ReadOnly locks prevent deletion',
      'The lock applies only to Storage Accounts',
    ],
    correctIndex: 0,
    explanation:
      'Resource Locks (`CanNotDelete` or `ReadOnly`) block accidental modifications even for Subscription Owners until explicitly deleted.',
  },
  {
    id: 'az-30',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'You configure an Azure Application Gateway (v2) with WAF enabled in front of two regional VMSS web tiers. Which OSI layer and routing capability does Application Gateway provide compared to Azure Load Balancer?',
    options: [
      'Layer 7 HTTP/HTTPS URL-path routing, SSL termination, cookie affinity, and OWASP WAF protection',
      'Layer 2 MAC bridge switching across VNets',
      'Layer 4 raw UDP pass-through only',
      'BGP route reflection between ExpressRoute circuits',
    ],
    correctIndex: 0,
    explanation:
      'Azure Application Gateway operates at Layer 7 (HTTP/HTTPS), supporting URL-path/host routing, TLS offload, and Web Application Firewall rulesets.',
  },
  {
    id: 'az-31',
    domain: 'Implement and Manage Storage',
    prompt:
      'You want an Azure Blob Storage lifecycle policy that automatically moves log blobs to the `Cool` tier 30 days after last modification and `Archive` after 180 days. Why must you verify blob rehydration timing before querying archived blobs?',
    options: [
      'Blobs in the `Archive` tier are offline and cannot be read until rehydrated back to Hot or Cool (taking up to several hours)',
      'Archive blobs are permanently deleted after 24 hours',
      'Lifecycle rules only run on Page Blobs',
      'Cool tier requires manual rehydration before read',
    ],
    correctIndex: 0,
    explanation:
      'Archive is offline cold storage; accessing an archived object requires setting its tier back to Hot/Cool (Standard rehydration up to 15 hours, High priority under 1 hour).',
  },
  {
    id: 'az-32',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'An Azure Kubernetes Service (AKS) cluster pulls private container images from Azure Container Registry (`ACR`). How should you authorize AKS to pull images without storing registry admin passwords in Kubernetes Secrets?',
    options: [
      'Attach `AcrPull` RBAC role to the AKS kubelet Managed Identity (`az aks update --attach-acr`)',
      'Expose ACR anonymously to the public internet',
      'Hardcode ACR username/password inside Dockerfile ENV instructions',
      'Grant Global Administrator to every cluster pod',
    ],
    correctIndex: 0,
    explanation:
      'Attaching ACR assigns the built-in `AcrPull` role directly to the AKS kubelet Managed Identity—eliminating static credentials.',
  },
  {
    id: 'az-33',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'Which Azure Monitor Network Watcher tool tests whether an NSG or effective route table allows TCP port 1433 traffic from VM-App (`10.1.1.5`) to VM-DB (`10.2.1.10`) without needing to capture packets?',
    options: [
      'IP Flow Verify + Next Hop diagnostics',
      'Azure Advisor pricing calculator',
      'Azure Bastion screen recording',
      'Azure Resource Graph cost chart',
    ],
    correctIndex: 0,
    explanation:
      'IP Flow Verify evaluates exact effective NSG rules allowing/denying a 5-tuple packet, while Next Hop identifies the active routing path.',
  },
  {
    id: 'az-34',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'You deploy an ARM/Bicep template in `Complete` mode into an existing Resource Group that already holds two legacy VMs not listed in your template. What happens to those two legacy VMs?',
    options: [
      'They are ignored and remain untouched',
      'ARM deletes any existing resources in that Resource Group not declared in the template',
      'ARM converts them into Storage Accounts',
      'ARM moves them automatically into another Subscription',
    ],
    correctIndex: 1,
    explanation:
      '`Complete` deployment mode deletes resources inside the target Resource Group that are omitted from the template, unlike `Incremental` mode.',
  },
  {
    id: 'az-35',
    domain: 'Monitor and Maintain Azure Resources',
    prompt:
      'How do you centrally govern multi-VM backup policies, soft-delete protection, and cross-region restore across 150 Azure IaaS VMs in `westeurope`?',
    options: [
      'Recovery Services Vault paired with Azure Backup Policy',
      'Manual OS disk snapshots taken by cron scripts',
      'Enabling Azure Bastion idle timeouts',
      'Deploying Azure Traffic Manager DNS profiles',
    ],
    correctIndex: 0,
    explanation:
      'Recovery Services Vaults enforce scheduled application-consistent backups, 14+ day soft delete, and optional Cross-Region Restore (CRR).',
  },
  {
    id: 'az-36',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'Which NSG rule priority evaluates first when both a custom Deny rule (`Priority 200`) and a custom Allow rule (`Priority 150`) target port 22 on the same subnet?',
    options: [
      'Priority 200 because Deny always beats Allow',
      'Priority 150 because lower priority numbers are processed first in Azure NSGs',
      'Both rules merge randomly',
      'Subnet NSG is ignored if NIC NSG is absent',
    ],
    correctIndex: 1,
    explanation:
      'Azure evaluates NSG rules strictly in ascending numeric order (`100` to `4096`); processing stops at the first matching rule (`150` beats `200`).',
  },
  {
    id: 'az-37',
    domain: 'Implement and Manage Storage',
    prompt:
      'An external vendor needs write-only temporary permission for 2 hours to upload a single CSV file into container `vendor-drops` without receiving your Storage Account keys. What should you generate?',
    options: [
      'User Delegation Shared Access Signature (SAS) scoped strictly to that container with `Create/Write` permissions and 2-hour expiry',
      'Share Storage Account Access Key #1 via email',
      'Assign Storage Account Contributor at Subscription scope',
      'Enable anonymous public Blob read/write access',
    ],
    correctIndex: 0,
    explanation:
      'A User Delegation SAS (backed by Entra ID) grants granular, time-bound container/blob access without exposing account keys.',
  },
  {
    id: 'az-38',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'To protect stateful Azure VMs against a full regional outage in UK South by replicating disk changes continuously into UK West with automated failover orchestration, which service do you deploy?',
    options: [
      'Azure Site Recovery (ASR)',
      'Azure Availability Sets inside UK South only',
      'Azure Container Instances',
      'Azure Front Door caching',
    ],
    correctIndex: 0,
    explanation:
      'Azure Site Recovery provides continuous VM replication and orchestrated disaster recovery failover between paired or secondary Azure regions.',
  },
  {
    id: 'az-39',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'Your security team created a Custom RBAC Role JSON file to let Tier 1 engineers restart VMs without deleting them. Which two JSON properties define allowed actions and target scope?',
    options: [
      '`Actions` (e.g. `Microsoft.Compute/virtualMachines/restart/action`) and `AssignableScopes`',
      '`SkuName` and `AccessTier`',
      '`PublicIpAddress` and `SubnetPrefix`',
      '`TriggerSchedule` and `RetentionDays`',
    ],
    correctIndex: 0,
    explanation:
      'Azure Custom RBAC definitions specify `Actions`, `NotActions`, `DataActions`, and `AssignableScopes` (Management Group, Subscription, or Resource Group).',
  },
  {
    id: 'az-40',
    domain: 'Monitor and Maintain Azure Resources',
    prompt:
      'Which Log Analytics table captures Windows/Linux performance counters and VM insights dependency maps when Azure Monitor Agent (AMA) + Data Collection Rules (DCR) are deployed?',
    options: [
      '`Perf` and `VMConnection` / `InsightsMetrics` tables via DCR',
      '`AzureActivity` only',
      '`SigninLogs` only',
      '`AzureDiagnosticsCost`',
    ],
    correctIndex: 0,
    explanation:
      'Azure Monitor Agent uses Data Collection Rules (DCRs) to stream guest OS performance metrics (`Perf`/`InsightsMetrics`) and VM Insights telemetry into Log Analytics.',
  },
  {
    id: 'az-41',
    domain: 'Configure and Manage Virtual Networking',
    prompt:
      'You must connect 45 branch offices via IPsec VPNs and P2S users into a unified global mesh backbone hosted by Microsoft without manually configuring hub UDRs per spoke. Which service simplifies this topology?',
    options: [
      'Azure Virtual WAN (vWAN)',
      'Classic VNet Peering without gateways',
      'Azure Bastion Developer SKU',
      'Single Azure NAT Gateway',
    ],
    correctIndex: 0,
    explanation:
      'Azure Virtual WAN unifies Site-to-Site VPN, Point-to-Site VPN, ExpressRoute, and VNet transit routing inside Microsoft’s global managed hub.',
  },
  {
    id: 'az-42',
    domain: 'Deploy and Manage Azure Compute Resources',
    prompt:
      'Inside a Virtual Machine Scale Set (`VMSS`) configured with Autoscale rules, why should you add a `Cool down` period (e.g., 10 minutes) between scale-out and scale-in actions?',
    options: [
      'To prevent thrashing / flapping while newly provisioned VMs finish booting and warm up metrics stabilize',
      'To force all VMs to reboot simultaneously at midnight',
      'To pause billing during maintenance windows',
      'To convert Spot VMs into Dedicated Hosts',
    ],
    correctIndex: 0,
    explanation:
      'Cooldown periods give newly launched instances time to initialize and start handling load before Autoscale evaluates the next scale decision.',
  },
  {
    id: 'az-43',
    domain: 'Implement and Manage Storage',
    prompt:
      'When configuring Storage Account Networking (`Selected networks`), an Azure Data Factory in the same region gets `AuthorizationFailure` accessing blobs even though it has RBAC permissions. What setting often resolves trusted PaaS access cleanly?',
    options: [
      'Configure a Managed Private Endpoint or check "Allow Azure services on the trusted services list" / Private Endpoint subnet access',
      'Disable TLS 1.2 on the Storage Account',
      'Change SKU from Standard_ZRS to Unmanaged Disk',
      'Remove all Managed Identities from Data Factory',
    ],
    correctIndex: 0,
    explanation:
      'Locked-down Storage Account firewalls block Azure PaaS services unless connected via Private Endpoints or explicitly allowed via the Trusted Azure Services exception.',
  },
  {
    id: 'az-44',
    domain: 'Manage Azure Identities and Governance',
    prompt:
      'An administrator wants external GitHub Actions CI/CD workflows to deploy Azure infrastructure without storing long-lived client secrets or rotating certificates manually. Which authentication method is recommended?',
    options: [
      'Entra Workload Identity Federation (OIDC federated credentials) on a User-Assigned Managed Identity / App Registration',
      'Hardcoding a Global Admin username and password in repository README',
      'Downloading publishSettings XML with 10-year expiry',
      'Enabling anonymous ARM deployment endpoints',
    ],
    correctIndex: 0,
    explanation:
      'Workload Identity Federation uses short-lived OIDC tokens issued by GitHub Actions exchanged directly with Entra ID—removing static secret rotation risks.',
  },
  {
    id: 'az-45',
    domain: 'Monitor and Maintain Azure Resources',
    prompt:
      'Your CFO requires automated budget email alerts when monthly Azure dev/test spend reaches 80% forecast, plus an automated Runbook stopping non-prod VMs at 100%. Which Azure tool handles this?',
    options: [
      'Azure Cost Management + Billing Budgets connected to an Action Group / Automation Runbook',
      'Azure Network Watcher packet capture',
      'Microsoft Entra Connect Sync',
      'Azure Service Health planned maintenance feed',
    ],
    correctIndex: 0,
    explanation:
      'Azure Cost Management Budgets trigger percentage-threshold notifications and can invoke Action Groups executing Azure Automation Runbooks or Logic Apps.',
  },
];

export const AWS_SAA_C03_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'aws-16',
    domain: 'Design Secure Architectures',
    prompt:
      'A web application running on EC2 instances inside private subnets needs to fetch database passwords at startup without storing static secrets in environment variables or AMI disks. Which combination is most secure?',
    options: [
      'Store credentials in AWS Secrets Manager with automatic rotation and grant EC2 access via an IAM Instance Profile Role',
      'Embed secrets inside EC2 User Data bash scripts in plaintext',
      'Store passwords inside a public S3 bucket locked by obscure filename',
      'Commit `.env` production credentials into AWS CodeCommit',
    ],
    correctIndex: 0,
    explanation:
      'Secrets Manager encrypts credentials using KMS, supports zero-downtime RDS password rotation, and authenticates EC2 seamlessly via IAM Instance Profile short-lived credentials.',
  },
  {
    id: 'aws-17',
    domain: 'Design Resilient Architectures',
    prompt:
      'A transactional e-commerce database runs on Amazon RDS PostgreSQL (`Multi-AZ`) in `us-east-1`. Reporting analysts run heavy BI queries that degrade checkout write latency. How should you isolate reporting reads cleanly?',
    options: [
      'Create an Amazon RDS Read Replica and point BI reporting connections to the Read Replica endpoint',
      'Switch RDS Multi-AZ off and scale down storage IOPS',
      'Force BI analysts to query the Multi-AZ standby node directly',
      'Move checkout writes into Amazon Redshift',
    ],
    correctIndex: 0,
    explanation:
      'RDS Multi-AZ standby nodes cannot serve read traffic; asynchronous Read Replicas offload analytical SELECT queries without impacting primary OLTP performance.',
  },
  {
    id: 'aws-18',
    domain: 'Design High-Performing Architectures',
    prompt:
      'A global gaming leaderboard requires single-digit millisecond key-value reads/writes for session scores, automatic shard scaling, and in-memory caching for DynamoDB. Which AWS pair delivers sub-millisecond read latency?',
    options: [
      'Amazon DynamoDB paired with DynamoDB Accelerator (DAX)',
      'Amazon S3 Glacier Deep Archive paired with Athena',
      'Amazon EFS Standard-IA mounted over NFS',
      'AWS Glue batch ETL jobs',
    ],
    correctIndex: 0,
    explanation:
      'DAX provides a fully managed, DynamoDB-compatible in-memory write-through cache reducing eventual-consistent read latency from milliseconds to microseconds.',
  },
  {
    id: 'aws-19',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'An analytics team stores 200 TB of IoT JSON logs in Amazon S3 with unpredictable, shifting access patterns across old and new datasets. Engineering wants automatic storage savings without retrieval fees or manual lifecycle tuning. What storage class fits best?',
    options: [
      'S3 Intelligent-Tiering',
      'S3 Glacier Deep Archive immediately on Day 0',
      'EBS Provisioned IOPS `io2` Block Express',
      'Amazon EFS Provisioned Throughput',
    ],
    correctIndex: 0,
    explanation:
      'S3 Intelligent-Tiering monitors object access automatically, shifting data between Frequent, Infrequent, and Archive Instant Access tiers with zero retrieval fees.',
  },
  {
    id: 'aws-20',
    domain: 'Design Secure Architectures',
    prompt:
      'A company uses AWS Organizations across 40 accounts. Security wants an absolute guardrail preventing any IAM user—including member-account Administrators—from disabling AWS CloudTrail logging. What should you deploy?',
    options: [
      'An AWS Organizations Service Control Policy (SCP) applied at the Root/OU denying `cloudtrail:StopLogging` and `cloudtrail:DeleteTrail`',
      'A local EC2 Security Group rule blocking port 443',
      'Sending an email policy PDF to developers',
      'Using IAM Permission Boundaries only on S3 buckets',
    ],
    correctIndex: 0,
    explanation:
      'SCPs define maximum allowable permissions across Organizations accounts; an explicit Deny blocks even local account `AdministratorAccess` users.',
  },
  {
    id: 'aws-21',
    domain: 'Design Resilient Architectures',
    prompt:
      'An application processes order webhooks asynchronously using Lambda triggered by an SQS standard queue. Occasionally a corrupted JSON message causes Lambda to crash repeatedly until message retention expires. How do you isolate failing messages for debugging?',
    options: [
      'Attach a Dead-Letter Queue (DLQ) with `maxReceiveCount` configured on the SQS source queue',
      'Disable SQS visibility timeouts completely',
      'Increase Lambda memory to 10 GB unconditionally',
      'Switch from SQS to CloudFront edge caching',
    ],
    correctIndex: 0,
    explanation:
      'An SQS Dead-Letter Queue captures poison-pill messages exceeding `maxReceiveCount`, preventing infinite retry loops while preserving messages for inspection.',
  },
  {
    id: 'aws-22',
    domain: 'Design High-Performing Architectures',
    prompt:
      'Fifty Linux EC2 worker instances across three Availability Zones must simultaneously read and write shared CMS media uploads over POSIX file paths with automatic elastic capacity. Which AWS storage service fits best?',
    options: [
      'Amazon Elastic File System (EFS) mounted across AZs',
      'Single Amazon EBS `gp3` volume attached directly to all 50 instances',
      'EC2 Instance Store NVMe ephemeral disk',
      'AWS Snowcone edge device',
    ],
    correctIndex: 0,
    explanation:
      'Amazon EFS provides regional, multi-AZ POSIX-compliant NFS file storage mountable concurrently by thousands of EC2 instances, ECS tasks, and Lambda functions.',
  },
  {
    id: 'aws-23',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'A cloud team runs variable stateless web microservices on AWS Fargate (`ECS`) and AWS Lambda alongside predictable baseline `EC2` compute across multiple regions. Which commitment gives up to 66% savings flexibly across EC2, Fargate, and Lambda?',
    options: [
      'Compute Savings Plans',
      'Standard EC2 Convertible Reserved Instances locked to one instance family only',
      'On-Demand capacity reservations without discount',
      'Dedicated Hosts per AZ',
    ],
    correctIndex: 0,
    explanation:
      'Compute Savings Plans automatically discount EC2 (any family, OS, or region), AWS Fargate, and AWS Lambda usage for 1- or 3-year hourly spend commitments.',
  },
  {
    id: 'aws-24',
    domain: 'Design Secure Architectures',
    prompt:
      'You serve private PDF reports stored in an Amazon S3 bucket exclusively through Amazon CloudFront while blocking direct S3 bucket URLs from the public internet. Which CloudFront feature enforces this?',
    options: [
      'CloudFront Origin Access Control (OAC) paired with an S3 bucket policy allowing only the CloudFront service principal',
      'Enabling S3 Static Website Hosting with public `s3:GetObject` `*`',
      'Attaching a NAT Gateway to the S3 bucket',
      'Deploying AWS Direct Connect to every browser client',
    ],
    correctIndex: 0,
    explanation:
      'Origin Access Control (OAC) signs CloudFront requests with IAM SigV4 credentials so S3 keeps Block Public Access enabled while serving files safely through CloudFront.',
  },
  {
    id: 'aws-25',
    domain: 'Design Resilient Architectures',
    prompt:
      'An enterprise requires active-active disaster recovery routing across `eu-west-1` (Dublin) and `eu-central-1` (Frankfurt) with automated latency-based DNS routing and regional health failover. Which service manages DNS traffic distribution?',
    options: [
      'Amazon Route 53 with Latency Routing Policy and Health Checks',
      'AWS Transit Gateway inside a single region',
      'Amazon VPC Flow Logs',
      'AWS Systems Manager Parameter Store',
    ],
    correctIndex: 0,
    explanation:
      'Route 53 routes global users to the lowest-latency healthy regional ALB/CloudFront endpoint and removes unhealthy regions via active health checks.',
  },
  {
    id: 'aws-26',
    domain: 'Design High-Performing Architectures',
    prompt:
      'A financial trading platform needs two static Anycast IPv4 addresses globally that automatically route client TCP/UDP connections over AWS’s private fiber backbone to the nearest healthy regional ALB—eliminating DNS TTL caching delays during failover. Which service provides this?',
    options: [
      'AWS Global Accelerator',
      'Amazon CloudFront static HTML caching',
      'AWS Site-to-Site VPN',
      'Elastic IP attached to a single NAT Gateway',
    ],
    correctIndex: 0,
    explanation:
      'AWS Global Accelerator advertises two static Anycast IPs at AWS edge locations, proxying TCP/UDP packets over the AWS backbone with near-instant health failover.',
  },
  {
    id: 'aws-27',
    domain: 'Design Secure Architectures',
    prompt:
      'Your enterprise runs 150 EC2 Linux servers in private subnets without SSH port 22 open in Security Groups and no bastion host. How should administrators open audited, IAM-controlled shell sessions?',
    options: [
      'AWS Systems Manager (SSM) Session Manager over an IAM role + SSM VPC Interface Endpoints',
      'Temporarily opening TCP 22 to `0.0.0.0/0` during business hours',
      'Sharing a single root SSH `.pem` private key across Slack',
      'Attaching public Elastic IPs to all 150 instances',
    ],
    correctIndex: 0,
    explanation:
      'SSM Session Manager establishes encrypted browser/CLI shells via outbound HTTPS agent tunnels logged to CloudTrail/S3 without open inbound ports or SSH keys.',
  },
  {
    id: 'aws-28',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'An EC2 instance writes 150 TB/month through an AWS NAT Gateway to call Amazon DynamoDB and S3 APIs, creating huge NAT data processing charges. How can an architect eliminate these NAT Gateway charges with zero code changes?',
    options: [
      'Create free Gateway VPC Endpoints for S3 and DynamoDB in the private subnet route tables',
      'Upgrade the NAT Gateway to a larger EC2 instance',
      'Route S3 traffic over an Internet Gateway directly',
      'Move DynamoDB tables into RDS `db.r6g.8xlarge`',
    ],
    correctIndex: 0,
    explanation:
      'S3 and DynamoDB Gateway VPC Endpoints are completely free—no hourly fee and zero per-GB data processing cost—bypassing the NAT Gateway entirely.',
  },
  {
    id: 'aws-29',
    domain: 'Design Resilient Architectures',
    prompt:
      'A serverless photo pipeline must trigger three completely independent downstream microservices (thumbnail generation, AI moderation, and billing analytics) simultaneously whenever an image lands in S3. Which decoupled pattern scales cleanest?',
    options: [
      'S3 Event Notification -> Amazon SNS topic fan-out -> separate SQS queues per microservice',
      'One Lambda invoking three synchronous HTTP calls sequentially with 15-second timeouts',
      'Cron job polling S3 `ListObjectsV2` every second from a single EC2 instance',
      'Writing image binaries directly inside RDS BLOB columns',
    ],
    correctIndex: 0,
    explanation:
      'SNS-to-SQS fan-out decouples publishers from consumers, buffers traffic spikes independently per service, and supports parallel retries.',
  },
  {
    id: 'aws-30',
    domain: 'Design Secure Architectures',
    prompt:
      'When configuring AWS KMS Customer Managed Keys (CMKs) for regulatory auditability and multi-region failover backups in `eu-west-2` and `eu-west-1`, which KMS key type allows encrypted EBS snapshots and DynamoDB Global Tables to share identical key material?',
    options: [
      'KMS Multi-Region Keys',
      'AWS-owned default keys without key policies',
      'Client-side plaintext Base64 keys',
      'EC2 Instance Store local ephemeral encryption only',
    ],
    correctIndex: 0,
    explanation:
      'AWS KMS Multi-Region Keys share the exact same key ID and cryptographic key material across Regions, enabling seamless cross-region decryption without re-encryption.',
  },
  {
    id: 'aws-31',
    domain: 'Design High-Performing Architectures',
    prompt:
      'An engineering team stores petabytes of Parquet data in Amazon S3 and needs pay-per-query SQL analytics with minimal infrastructure management. Which AWS service answers this directly?',
    options: [
      'Amazon Athena',
      'Amazon Aurora Serverless v2',
      'Amazon ElastiCache for Memcached',
      'AWS Elastic Beanstalk',
    ],
    correctIndex: 0,
    explanation:
      'Amazon Athena is a serverless interactive query service that runs standard Presto/Trino SQL directly on S3 data lakes (`$5/TB scanned`, even less with Parquet compression).',
  },
  {
    id: 'aws-32',
    domain: 'Design Resilient Architectures',
    prompt:
      'Why does an Application Load Balancer (ALB) target group fail health checks on newly launched EC2 instances even when `curl localhost` works locally inside the Linux server?',
    options: [
      'The EC2 Security Group does not allow inbound traffic from the ALB Security Group on the health-check port, or the health-check HTTP path returns 302/404 instead of 200',
      'ALBs only check UDP port 53',
      'Target groups do not support private IP instances',
      'NACLs never allow ephemeral return ports above 1024',
    ],
    correctIndex: 0,
    explanation:
      'Common ALB health-check failures stem from missing Security Group ingress referencing the ALB SG or an unexpected non-200 HTTP redirect/auth response on the health path.',
  },
  {
    id: 'aws-33',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'An Amazon EBS `gp2` volume (500 GB) suffers I/O throttling during burst periods, and storage engineers plan to double its size to 1 TB just for extra IOPS. What more cost-effective change improves performance independently?',
    options: [
      'Migrate from `gp2` to `gp3` and provision higher IOPS/throughput independently at ~20% lower base GB cost',
      'Migrate to `sc1` Cold HDD for database workloads',
      'Attach 4 separate Magnetic `standard` volumes in RAID-0',
      'Disable EBS encryption',
    ],
    correctIndex: 0,
    explanation:
      '`gp3` decouples storage capacity from performance (3,000 baseline IOPS included at any size) and costs roughly 20% less per GB than `gp2`.',
  },
  {
    id: 'aws-34',
    domain: 'Design Secure Architectures',
    prompt:
      'A stateful compliance check monitors whether any Security Group across 30 VPCs gets opened to `0.0.0.0/0` on port 22 and triggers automated Systems Manager remediation immediately. Which AWS service evaluates this rule?',
    options: [
      'AWS Config (`restricted-ssh` managed rule) with Systems Manager Automation remediation',
      'AWS Cost Explorer',
      'Amazon CloudFront Functions',
      'AWS Budgets',
    ],
    correctIndex: 0,
    explanation:
      'AWS Config tracks resource configuration history continuously and triggers Systems Manager Automation documents to remediate non-compliant rules automatically.',
  },
  {
    id: 'aws-35',
    domain: 'Design High-Performing Architectures',
    prompt:
      'An HPC financial simulation running across 16 `c7gn` EC2 nodes requires ultra-low microsecond inter-node network latency on non-blocking 200 Gbps fabrics inside one Availability Zone. Which EC2 placement strategy should you select?',
    options: [
      'Cluster Placement Group',
      'Spread Placement Group across racks',
      'Partition Placement Group across 7 partitions',
      'Multi-region VPC Peering mesh',
    ],
    correctIndex: 0,
    explanation:
      'Cluster Placement Groups pack EC2 instances close together on high-bandwidth, low-latency spine switches within a single AZ for HPC workloads.',
  },
  {
    id: 'aws-36',
    domain: 'Design Resilient Architectures',
    prompt:
      'Your architecture connects 25 internal VPCs to an on-premises AWS Direct Connect gateway plus an inspection firewall VPC. Which networking hub simplifies routing compared to maintaining 300 manual VPC peering links?',
    options: [
      'AWS Transit Gateway',
      'Single Internet Gateway shared across VPCs',
      'ClassicLink bridges',
      'NAT Instance daisy-chaining',
    ],
    correctIndex: 0,
    explanation:
      'AWS Transit Gateway acts as a regional cloud router interconnecting thousands of VPCs, VPNs, and Direct Connect gateways via hub-and-spoke route tables.',
  },
  {
    id: 'aws-37',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'A stateless AWS Batch rendering fleet needs lowest possible compute cost and uses checkpointing in S3 every 5 minutes so nodes can resume work seamlessly if reclaimed with a 2-minute warning. Which EC2 purchasing option fits best?',
    options: [
      'EC2 Spot Instances (up to 90% discount off On-Demand)',
      'Dedicated Hosts',
      'On-Demand Capacity Reservations',
      '1-Year All Upfront Dedicated Instances',
    ],
    correctIndex: 0,
    explanation:
      'Fault-tolerant, checkpointed stateless workloads capture massive savings (up to 90%) using EC2 Spot capacity.',
  },
  {
    id: 'aws-38',
    domain: 'Design Secure Architectures',
    prompt:
      'Which AWS service protects public REST APIs on Amazon API Gateway and CloudFront against Layer 7 SQL injection, XSS bots, and HTTP request rate floods (`rate-based rules`)?',
    options: [
      'AWS WAF',
      'AWS Shield Standard alone without L7 rules',
      'VPC Network ACLs',
      'AWS Snowball Edge',
    ],
    correctIndex: 0,
    explanation:
      'AWS WAF filters HTTP/S payloads using managed OWASP SQLi/XSS signatures, geo-blocking, and IP rate-limiting rules at CloudFront, ALB, and API Gateway.',
  },
  {
    id: 'aws-39',
    domain: 'Design High-Performing Architectures',
    prompt:
      'An AWS Lambda function written in Python experiences 2-second cold-start latency when allocating VPC ENIs and loading ML dependencies, hurting user P99 API SLAs. What feature keeps execution environments pre-initialized and warm?',
    options: [
      'Lambda Provisioned Concurrency',
      'Lowering Lambda memory to 128 MB',
      'Enabling SQS long polling',
      'Attaching an Internet Gateway directly to the Lambda ENI',
    ],
    correctIndex: 0,
    explanation:
      'Provisioned Concurrency keeps a configured number of initialized Lambda runtime environments warm and ready to respond in double-digit milliseconds.',
  },
  {
    id: 'aws-40',
    domain: 'Design Resilient Architectures',
    prompt:
      'An enterprise runs a stateful Kafka/Cassandra distributed cluster on EC2 and must guarantee nodes sit on distinct underlying hardware racks to minimize correlated rack-power failure. Which placement group fits best?',
    options: [
      'Partition Placement Group (or Spread Placement Group for <= 7 instances per AZ)',
      'Cluster Placement Group',
      'Single Auto Scaling Group inside one rack',
      'Placement in a single dedicated host',
    ],
    correctIndex: 0,
    explanation:
      'Partition Placement Groups isolate logical partitions onto completely separate racks with independent power/networking—built explicitly for Kafka, HDFS, and Cassandra.',
  },
  {
    id: 'aws-41',
    domain: 'Design Secure Architectures',
    prompt:
      'Data engineers store PII customer datasets in S3 and must automatically scan buckets using ML pattern matching to discover exposed credit cards, passports, or healthcare IDs. Which AWS service automates S3 PII discovery?',
    options: [
      'Amazon Macie',
      'Amazon Inspector (EC2/ECR OS CVEs)',
      'AWS Glue DataBrew only',
      'Amazon GuardDuty DNS logs',
    ],
    correctIndex: 0,
    explanation:
      'Amazon Macie uses machine learning and pattern matching to continuously discover, classify, and alert on sensitive PII/PHI stored in Amazon S3.',
  },
  {
    id: 'aws-42',
    domain: 'Design Cost-Optimized Architectures',
    prompt:
      'A multi-tenant application generates thousands of small daily EBS snapshots across 400 volumes. An architect wants automated retention, cross-account copy, and deletion of snapshots older than 14 days without writing custom Lambda scripts. Which native tool automates this?',
    options: [
      'Amazon Data Lifecycle Manager (DLM)',
      'Manual EC2 Console cleanup',
      'AWS Budgets action',
      'Amazon CloudWatch Container Insights',
    ],
    correctIndex: 0,
    explanation:
      'Amazon DLM automates creation, retention, cross-region/cross-account copying, and expiry of EBS snapshots and AMIs using resource tags.',
  },
  {
    id: 'aws-43',
    domain: 'Design High-Performing Architectures',
    prompt:
      'An application uploads large 25 GB genomic datasets from global research labs directly into an S3 bucket in `us-west-2`, experiencing slow WAN TCP throughput. What S3 setting speeds up long-haul uploads via AWS Edge Locations?',
    options: [
      'S3 Transfer Acceleration',
      'S3 Standard-IA',
      'S3 Object Lock Compliance Mode',
      'Disabling Multipart Upload',
    ],
    correctIndex: 0,
    explanation:
      'S3 Transfer Acceleration routes uploads to the nearest CloudFront edge location and proxies data across AWS’s optimized backbone to the destination S3 bucket.',
  },
  {
    id: 'aws-44',
    domain: 'Design Resilient Architectures',
    prompt:
      'A microservice needs an ordered, strictly deduplicated financial ledger queue where duplicate payment retry webhooks within 5 minutes are automatically dropped. Which messaging configuration achieves this?',
    options: [
      'Amazon SQS FIFO Queue with Content-Based Deduplication enabled',
      'Amazon SQS Standard Queue',
      'Amazon SNS Standard Topic',
      'Amazon S3 Standard bucket notifications',
    ],
    correctIndex: 0,
    explanation:
      'SQS FIFO queues preserve exact ordering within MessageGroupId and automatically deduplicate identical messages using Deduplication IDs or content SHA-256 hashes.',
  },
  {
    id: 'aws-45',
    domain: 'Design Secure Architectures',
    prompt:
      'During an incident investigation, an auditor verifies whether any external AWS account has read permission onto an internal S3 bucket, KMS key, or IAM role. Which free IAM feature uses automated mathematical reasoning to uncover cross-account exposure?',
    options: [
      'AWS IAM Access Analyzer',
      'AWS Trusted Advisor basic checks only',
      'Amazon EC2 Serial Console',
      'AWS Artifact PDF downloads',
    ],
    correctIndex: 0,
    explanation:
      'IAM Access Analyzer uses formal automated reasoning to flag any resource policies (S3, KMS, IAM roles, SQS, Lambda) accessible from outside your account or Organization zone of trust.',
  },
];
