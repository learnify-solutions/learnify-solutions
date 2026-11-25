import { PracticeQuestion } from '../types';

export const MICROSOFT_SC_900_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'sc900-16',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'An organization layers Microsoft Entra MFA, Defender for Endpoint EDR, Azure Network Security Groups, and Purview BitLocker/encryption so no single control failure exposes customer records. Which security principle is illustrated?',
    options: [
      'Security through obscurity',
      'Defense-in-Depth',
      'Single point of trust',
      'Implicit perimeter allowance',
    ],
    correctIndex: 1,
    explanation:
      'Defense-in-Depth applies layered physical, identity, perimeter, network, compute, application, and data controls so a breach in one layer is contained by the next.',
  },
  {
    id: 'sc900-17',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'Under the Cloud Shared Responsibility Model, for which component does the CUSTOMER always retain primary accountability across IaaS, PaaS, AND SaaS?',
    options: [
      'Datacenter physical badge access',
      'Information and data, devices, and accounts/identities',
      'Hypervisor patching and network cabling',
      'Underlying storage array firmware',
    ],
    correctIndex: 1,
    explanation:
      'Across SaaS, PaaS, and IaaS, customers always retain responsibility for their Information/Data classification, endpoint devices, and account/identity governance.',
  },
  {
    id: 'sc900-18',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'How does Authorization differ from Authentication in Microsoft identity architecture?',
    options: [
      'Authentication verifies who a user or workload is; Authorization determines which resources and actions that verified identity is allowed to perform',
      'Authorization verifies passwords while Authentication checks RBAC roles',
      'Both terms refer exclusively to TLS certificate exchange',
      'Authentication occurs only once per year during hiring',
    ],
    correctIndex: 0,
    explanation:
      'Authentication proves identity (AuthN via MFA/FIDO2/passkey), whereas Authorization (AuthZ via RBAC/Conditional Access) defines permitted scopes and actions.',
  },
  {
    id: 'sc900-19',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'A European retail enterprise adopts Zero Trust across all SaaS apps. Why does the Zero Trust "Assume Breach" principle emphasize micro-segmentation and end-to-end encryption?',
    options: [
      'To minimize blast radius and prevent lateral movement if an attacker compromises one endpoint or credential',
      'To eliminate the need for MFA on administrator accounts',
      'To broadcast internal logs unencrypted for faster troubleshooting',
      'To keep all legacy NTLMv1 protocols active forever',
    ],
    correctIndex: 0,
    explanation:
      'Assuming breach drives continuous verification, least-privilege segmentation, end-to-end encryption, and analytics to contain attackers rapidly.',
  },
  {
    id: 'sc900-20',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'Which industry encryption standard protects data-at-rest by default across Azure Storage and Azure SQL Databases using FIPS 140-2/3 validated cryptography?',
    options: [
      'DES 56-bit',
      '256-bit AES encryption',
      'Base64 encoding',
      'MD5 hashing',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft encrypts Azure Storage, managed disks, and SQL databases at rest using strong 256-bit AES encryption, optionally backed by customer-managed keys (CMK) in Key Vault.',
  },
  {
    id: 'sc900-21',
    domain: 'Describe concepts of security, compliance, and identity',
    prompt:
      'What distinguishes federation from simple cloud-only identity provisioning in hybrid environments?',
    options: [
      'Federation establishes trust between an identity provider (such as on-premises AD FS or Ping) and Microsoft Entra ID so tokens are accepted across organizational boundaries',
      'Federation copies plaintext user passwords to every SaaS vendor',
      'Federation prevents users from accessing cloud resources outside office Wi-Fi',
      'Federation removes all MFA requirements automatically',
    ],
    correctIndex: 0,
    explanation:
      'Identity federation establishes SAML/WS-Fed/OIDC trust relationships enabling users to authenticate with a trusted external IdP without duplicating passwords across domains.',
  },
  {
    id: 'sc900-22',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'Employees frequently open IT helpdesk tickets after forgetting passwords while traveling. Which Microsoft Entra feature empowers verified users to reset or unlock their own passwords securely without helpdesk intervention?',
    options: [
      'Microsoft Entra Self-Service Password Reset (SSPR)',
      'Microsoft Entra Connect Cloud Sync only',
      'Azure Bastion',
      'Purview Information Barriers',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Entra SSPR allows users who have registered MFA/verification methods to securely reset forgotten passwords or unlock accounts 24/7.',
  },
  {
    id: 'sc900-23',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'An attacker launches distributed password-spray attacks against valid executive Entra accounts from anonymous IPs. Which Entra control blocks bad actors from locking out legitimate users via unfamiliar IPs while still blocking unknown attacks?',
    options: [
      'Microsoft Entra Smart Lockout',
      'Disabling password expiration policy',
      'Granting Global Reader to Guests',
      'Removing Conditional Access policies',
    ],
    correctIndex: 0,
    explanation:
      'Entra Smart Lockout distinguishes trusted familiar sign-in locations from unfamiliar attacker sources, locking out attackers without denying legitimate user logins.',
  },
  {
    id: 'sc900-24',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'Which Microsoft Entra ID Protection capability continuously analyzes leaked credential feeds and impossible-travel anomalies to classify Risky Users and Risky Sign-Ins automatically?',
    options: [
      'Microsoft Entra ID Protection',
      'Azure Advisor Cost Recommendations',
      'Microsoft Purview Audit Standard',
      'Azure Private DNS Resolver',
    ],
    correctIndex: 0,
    explanation:
      'Entra ID Protection scores real-time sign-in risk and aggregated user risk using Microsoft threat intelligence, triggering automated Conditional Access remediation like MFA or password reset.',
  },
  {
    id: 'sc900-25',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'A security auditor wants department managers to confirm every quarter whether external B2B guests and group members still need access to confidential SharePoint sites—automatically revoking unconfirmed accounts. Which Entra Governance feature automates this?',
    options: [
      'Microsoft Entra Access Reviews',
      'Microsoft Entra Domain Services',
      'Microsoft Defender for IoT',
      'Azure Key Vault Soft Delete',
    ],
    correctIndex: 0,
    explanation:
      'Entra ID Governance Access Reviews automate periodic recertification of group memberships, app assignments, guests, and privileged roles with auto-removal of stale access.',
  },
  {
    id: 'sc900-26',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'Which Microsoft Entra service enables organizations to issue and verify privacy-preserving decentralized digital credentials (such as university diplomas or verified employment badges) using open W3C standards?',
    options: [
      'Microsoft Entra Verified ID',
      'Microsoft Entra Application Proxy',
      'Microsoft Intune MAM',
      'Azure Monitor Agent',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Entra Verified ID uses decentralized identifiers (DIDs) and verifiable credentials so users prove attributes (like age or employment) without storing central PII copies everywhere.',
  },
  {
    id: 'sc900-27',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'A company runs multi-cloud infrastructure across Azure, AWS, and GCP and discovers hundreds of over-permissioned machine/workload identities unused for 90 days. Which Entra product discovers and remediates multi-cloud CIEM permission creep?',
    options: [
      'Microsoft Entra Permissions Management',
      'Microsoft Entra SSPR',
      'Azure DDoS IP Protection',
      'Microsoft Priva Subject Rights',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Entra Permissions Management is a Cloud Infrastructure Entitlement Management (CIEM) solution providing visibility and right-sizing across Azure, AWS, and GCP.',
  },
  {
    id: 'sc900-28',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'Which Microsoft Entra identity type eliminates hardcoded secrets by automatically issuing an Azure-managed identity token to an App Service or VM when authenticating to Azure Key Vault?',
    options: [
      'Managed Identities for Azure resources',
      'B2C Consumer Local Accounts',
      'Static SAS Tokens',
      'Legacy AD FS Service Accounts',
    ],
    correctIndex: 0,
    explanation:
      'System-assigned and user-assigned Managed Identities automatically manage credential rotation inside Entra ID so workloads access Key Vault or SQL without stored secrets.',
  },
  {
    id: 'sc900-29',
    domain: 'Describe capabilities of Microsoft Entra',
    prompt:
      'An organization wants external suppliers to collaborate inside Microsoft Teams using their own Google or corporate Microsoft accounts without creating new internal passwords. Which Entra feature provides this?',
    options: [
      'Microsoft Entra External ID (B2B Collaboration)',
      'Microsoft Entra Private Access for VMs',
      'Local SAM accounts',
      'Azure Resource Locks',
    ],
    correctIndex: 0,
    explanation:
      'Entra External ID B2B Collaboration lets partners authenticate with their existing enterprise or federated social identity while respecting host Conditional Access.',
  },
  {
    id: 'sc900-30',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Which Microsoft Defender XDR service scans inbound emails for malicious attachments in a sandboxed virtual environment ("Safe Attachments") and rewrites URLs at click time ("Safe Links")?',
    options: [
      'Microsoft Defender for Office 365',
      'Microsoft Defender for Endpoint',
      'Microsoft Defender for Storage',
      'Azure Bastion',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Defender for Office 365 protects Exchange, Teams, SharePoint, and OneDrive against phishing, BEC, and zero-day payloads using Safe Links and Safe Attachments.',
  },
  {
    id: 'sc900-31',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Security analysts need to detect Pass-the-Hash, Golden Ticket, and DCSync attacks targeting on-premises Active Directory Domain Controllers before attackers move into cloud services. Which Defender tool monitors AD signals?',
    options: [
      'Microsoft Defender for Identity',
      'Microsoft Defender for Cloud Apps',
      'Azure Web Application Firewall',
      'Microsoft Purview eDiscovery',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Defender for Identity deploys lightweight sensors on Domain Controllers/AD FS/AD CS to detect lateral movement, reconnaissance, and credential theft.',
  },
  {
    id: 'sc900-32',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'A CISO wants a Cloud Access Security Broker (CASB) that discovers unsanctioned Shadow IT SaaS uploads from corporate browsers and blocks risky mass file downloads from Salesforce and Box. Which tool provides this?',
    options: [
      'Microsoft Defender for Cloud Apps',
      'Azure Network Watcher',
      'Microsoft Defender for SQL',
      'Azure Front Door Standard',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Defender for Cloud Apps operates as a full CASB delivering Shadow IT discovery, session controls via Conditional Access App Control, and SaaS posture governance.',
  },
  {
    id: 'sc900-33',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Which Microsoft Defender for Endpoint capability delivers prioritized software remediation lists showing missing OS patches, vulnerable browser extensions, and weak TLS ciphers across corporate laptops without running periodic network scans?',
    options: [
      'Microsoft Defender Vulnerability Management',
      'Azure DDoS Network Protection',
      'Microsoft Sentinel Watchlists',
      'Entra Connect Health',
    ],
    correctIndex: 0,
    explanation:
      'Defender Vulnerability Management uses the built-in endpoint sensor for real-time continuous CVE discovery, risk-based prioritization, and Intune remediation workflows.',
  },
  {
    id: 'sc900-34',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Within Microsoft Sentinel (cloud-native SIEM + SOAR), what is the primary role of a Playbook?',
    options: [
      'Automated incident response workflows built on Azure Logic Apps (e.g., isolate an endpoint or block an IP in Entra ID when a high-severity alert fires)',
      'Graphical KQL dashboards visualizing sign-in trends',
      'Ingesting raw syslog streams from Palo Alto firewalls',
      'Calculating cloud VM cost savings',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Sentinel integrates SOAR capabilities through Azure Logic Apps Playbooks triggered automatically by analytics rules or incidents; Workbooks visualize telemetry, and Data Connectors ingest logs.',
  },
  {
    id: 'sc900-35',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Which Azure network security service protects public-facing HTTP web portals hosted behind Application Gateway or Azure Front Door against OWASP Top 10 exploits like SQL injection and cross-site scripting?',
    options: [
      'Azure Web Application Firewall (WAF)',
      'Azure Bastion',
      'Network Security Group (NSG)',
      'ExpressRoute FastPath',
    ],
    correctIndex: 0,
    explanation:
      'Azure WAF inspects Layer 7 HTTP/HTTPS traffic using OWASP Core Rule Sets (CRS) and custom geo/rate-limiting rules to stop web exploits.',
  },
  {
    id: 'sc900-36',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'Engineers need RDP and SSH administrative sessions into Azure VMs straight from the Azure Portal over TLS port 443 without assigning public IP addresses to any virtual machine. Which service solves this?',
    options: [
      'Azure Bastion',
      'Azure DDoS Protection',
      'Azure Traffic Manager',
      'Microsoft Defender for Containers',
    ],
    correctIndex: 0,
    explanation:
      'Azure Bastion deploys inside a dedicated subnet (`AzureBastionSubnet`) to provide browser-based hardened RDP/SSH access over TLS without exposing VM public IPs.',
  },
  {
    id: 'sc900-37',
    domain: 'Describe capabilities of Microsoft Security solutions',
    prompt:
      'How does Microsoft Defender for Cloud’s Cloud Security Posture Management (CSPM) help multi-cloud teams across Azure, AWS, and GCP?',
    options: [
      'By continuously assessing cloud configurations against CIS/NIST/PCI benchmarks, visualizing attack paths, and computing Secure Score improvements',
      'By acting solely as a replacement for Windows BitLocker',
      'By blocking outbound emails from Exchange Online',
      'By generating SSL VPN clients for macOS',
    ],
    correctIndex: 0,
    explanation:
      'Defender for Cloud CSPM aggregates posture insights, attack-path risk graphs, and regulatory compliance dashboards across Azure, AWS, and GCP.',
  },
  {
    id: 'sc900-38',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'A finance team applies a "Confidential - Finance" label to Word documents and Excel models, automatically embedding a watermark header AND encrypting the file so unauthorized recipients cannot open it even if emailed externally. Which Microsoft Purview feature does this?',
    options: [
      'Microsoft Purview Information Protection Sensitivity Labels',
      'Microsoft Purview Audit Standard',
      'Microsoft Priva Privacy Risk Management',
      'Entra Smart Lockout',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Purview Sensitivity Labels classify content and apply persistent Rights Management encryption, visual headers/footers, and container-level controls.',
  },
  {
    id: 'sc900-39',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'Corporate tax records must be retained immutably for 7 years and then automatically purged for compliance hygiene. Which Microsoft Purview capability enforces item-level preservation and disposition review?',
    options: [
      'Microsoft Purview Data Lifecycle Management (Retention Labels & Policies)',
      'Microsoft Purview Communication Compliance',
      'Azure DDoS Protection',
      'Defender for Identity',
    ],
    correctIndex: 0,
    explanation:
      'Purview Data Lifecycle Management (Retention Policies and Retention Labels) prevents premature deletion during regulatory holds and automates end-of-life disposition.',
  },
  {
    id: 'sc900-40',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'Under SEC/FINRA financial regulations, Investment Banking advisors must NOT communicate directly inside Microsoft Teams or email with Equity Research analysts to prevent insider trading conflicts. Which Purview tool blocks those communications?',
    options: [
      'Microsoft Purview Information Barriers',
      'Microsoft Purview Sensitivity Watermarks',
      'Azure Key Vault',
      'Entra Password Protection',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Purview Information Barriers define ethical walls restricting chat, file sharing, and channel discovery between specified user segments in Teams, SharePoint, and OneDrive.',
  },
  {
    id: 'sc900-41',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'Which Microsoft Purview solution detects regulatory violations, harassment, profanity, or suspicious collusion in employee Teams messages and Exchange emails for compliance reviewer triage?',
    options: [
      'Microsoft Purview Communication Compliance',
      'Microsoft Purview Records Management',
      'Azure Policy Guest Configuration',
      'Defender Vulnerability Management',
    ],
    correctIndex: 0,
    explanation:
      'Purview Communication Compliance applies built-in and custom ML classifiers to detect code-of-conduct and regulatory messaging breaches with anonymized reviewer workflows.',
  },
  {
    id: 'sc900-42',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'After a suspected data breach, investigators must inspect forensic events showing `MailItemsAccessed` (specifically whether an attacker synced or read sensitive Exchange emails) retained for up to 10 years. Which feature provides these forensic events?',
    options: [
      'Microsoft Purview Audit (Premium)',
      'Microsoft Purview Compliance Manager Assessment Templates',
      'Entra B2C User Flows',
      'Azure Service Health',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Purview Audit (Premium) captures high-value forensic investigation events (`MailItemsAccessed`, `Send`, `SearchQueryInitiated`) and supports 1-to-10-year audit retention.',
  },
  {
    id: 'sc900-43',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'A multinational company receives GDPR Data Subject Access Requests (DSARs) requiring them to locate and export all personal data about an EU citizen stored across Microsoft 365 within 30 days. Which product automates discovery and fulfillment?',
    options: [
      'Microsoft Priva (Subject Rights Requests)',
      'Azure Traffic Manager',
      'Microsoft Defender for Storage',
      'Entra Password Protection',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Priva provides automated Privacy Risk Management (detecting overexposed personal data) and streamlined Subject Rights Requests workflows for GDPR/CCPA.',
  },
  {
    id: 'sc900-44',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'Which portal hosts Microsoft’s independent third-party audit reports (ISO 27001, SOC 2 Type II, FedRAMP, PCI DSS) and compliance whitepapers for external auditors?',
    options: [
      'Microsoft Service Trust Portal',
      'Microsoft Entra Admin Center',
      'Azure Pricing Calculator',
      'Microsoft Cost Management',
    ],
    correctIndex: 0,
    explanation:
      'The Microsoft Service Trust Portal (STP) gives customers direct access to Microsoft’s external SOC, ISO, HIPAA, and regional compliance audit artifacts.',
  },
  {
    id: 'sc900-45',
    domain: 'Describe capabilities of Microsoft Compliance solutions',
    prompt:
      'In Microsoft Purview Compliance Manager, how are compliance responsibilities divided when computing your organization’s Compliance Score?',
    options: [
      'Customer-managed improvement actions (weighted by impact) combine with Microsoft-managed foundational controls inherited from the cloud platform',
      'Customers receive 100% automatically simply by purchasing Microsoft 365 E5',
      'Microsoft completes all customer DLP policies automatically',
      'Compliance Score measures purely network latency across Azure regions',
    ],
    correctIndex: 0,
    explanation:
      'Compliance Manager awards inherited points for Microsoft-managed controls and tracks customer-managed improvement actions toward frameworks like GDPR, NIST 800-53, and ISO 27001.',
  },
];

export const ISC2_CISSP_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'cissp-16',
    domain: 'Security and Risk Management',
    prompt:
      'After deploying an IPS/WAF reducing annual breach likelihood, management accepts the small remaining probability of zero-day exploitation. What is this remaining post-control exposure called?',
    options: [
      'Inherent risk',
      'Residual risk',
      'Single Loss Expectancy (SLE)',
      'Control gap risk',
    ],
    correctIndex: 1,
    explanation:
      'Total/Inherent risk minus effective safeguards equals Residual Risk—the level of risk remaining after controls are applied that senior management formally accepts.',
  },
  {
    id: 'cissp-17',
    domain: 'Security and Risk Management',
    prompt:
      'Rank the hierarchy of security governance documentation from mandatory high-level strategic intent down to optional recommended practices.',
    options: [
      'Policies (mandatory strategic) -> Standards (mandatory technical) -> Procedures (step-by-step) -> Guidelines (recommended/optional)',
      'Guidelines -> Procedures -> Standards -> Policies',
      'Baselines -> Guidelines -> Policies -> Standards',
      'Procedures -> Policies -> Guidelines -> Baselines',
    ],
    correctIndex: 0,
    explanation:
      'Policies establish management’s mandatory intent; Standards and Baselines enforce uniform technical compliance; Procedures provide mandatory step-by-step tasks; Guidelines offer non-mandatory best-practice advice.',
  },
  {
    id: 'cissp-18',
    domain: 'Security and Risk Management',
    prompt:
      'During STRIDE threat modeling of a banking REST API, a security architect discovers an endpoint does not verify whether a logged-in user owns the target account ID (`GET /accounts/1092`). Which STRIDE category best matches this flaw?',
    options: [
      'Tampering / Elevation of Privilege (and Information Disclosure via IDOR)',
      'Repudiation solely',
      'Denial of Service via SYN flood',
      'Physical tailgating',
    ],
    correctIndex: 0,
    explanation:
      'Broken Object Level Authorization (IDOR) enables Information Disclosure and Elevation of Privilege/Tampering by allowing an authenticated principal to read or mutate another user’s resources.',
  },
  {
    id: 'cissp-19',
    domain: 'Security and Risk Management',
    prompt:
      'Under EU GDPR, an HR SaaS company collects employee payroll details on behalf of an employer client who decides why and how payroll is processed. What is the HR SaaS vendor’s legal role?',
    options: [
      'Data Controller',
      'Data Processor',
      'Data Protection Supervisory Authority',
      'Data Subject',
    ],
    correctIndex: 1,
    explanation:
      'The employer determining the purpose and means of processing is the Data Controller; the third-party SaaS vendor processing records strictly on instruction is the Data Processor.',
  },
  {
    id: 'cissp-20',
    domain: 'Asset Security',
    prompt:
      'Per NIST SP 800-88 media sanitization guidelines, an agency retires encrypted NVMe SSDs holding Top Secret intelligence prior to disposal. Which sanitization category physically renders data unrecoverable via shredding, incineration, or pulverization?',
    options: [
      'Clearing',
      'Purging',
      'Destruction',
      'Quick Formatting',
    ],
    correctIndex: 2,
    explanation:
      'NIST SP 800-88 defines Clear (logical overwrite against simple recovery), Purge (cryptographic erase/secure erase against laboratory recovery), and Destroy (disintegration, shredding, incineration rendering media unusable).',
  },
  {
    id: 'cissp-21',
    domain: 'Asset Security',
    prompt:
      'In data lifecycle security governance, what is the primary risk of keeping unencrypted customer transaction logs indefinitely beyond legal and business retention periods?',
    options: [
      'Increased liability, discovery exposure in litigation, and unnecessary breach impact under privacy statutes (data minimization principle)',
      'Faster backup verification speeds',
      'Lower cloud storage compliance costs',
      'Stronger protection against ransomware',
    ],
    correctIndex: 0,
    explanation:
      'Retention policies enforce data minimization—preserving records strictly for legal/regulatory duration and securely disposing of expired data to shrink breach liability.',
  },
  {
    id: 'cissp-22',
    domain: 'Asset Security',
    prompt:
      'A Data Custodian receives a formal written ticket from the Data Owner instructing them to classify a new dataset as "Confidential" and restrict backups to KMS-encrypted vaults. Which statement reflects correct accountability?',
    options: [
      'The Data Owner determines classification and access criteria; the Data Custodian implements technical controls, backups, and patching',
      'The Data Custodian sets corporate classification labels unilaterally',
      'End users classify enterprise financial databases independently',
      'Internal Auditors execute daily production database backups',
    ],
    correctIndex: 0,
    explanation:
      'Senior business Data Owners remain accountable for classification and authorization decisions, whereas IT Data Custodians execute day-to-day technical protection and backups.',
  },
  {
    id: 'cissp-23',
    domain: 'Security Architecture and Engineering',
    prompt:
      'Which formal security model enforces integrity using Well-Formed Transactions and Separation of Duties (requiring authorized programs to manipulate Constrained Data Items via Transformation Procedures)?',
    options: [
      'Bell-LaPadula Model',
      'Biba Model',
      'Clark-Wilson Integrity Model',
      'Brewer and Nash (Chinese Wall) Model',
    ],
    correctIndex: 2,
    explanation:
      'Clark-Wilson protects commercial data integrity by restricting subjects to accessing Constrained Data Items (CDIs) exclusively via verified Transformation Procedures (TPs) with separation of duty.',
  },
  {
    id: 'cissp-24',
    domain: 'Security Architecture and Engineering',
    prompt:
      'A hardware security team evaluates a firewall under Common Criteria (ISO/IEC 15408). Which Evaluation Assurance Level represents the first level requiring formal mathematical design verification and testing?',
    options: [
      'EAL 1 (Functionally Tested)',
      'EAL 4 (Methodically Designed, Tested, and Reviewed)',
      'EAL 7 (Formally Verified Design and Tested)',
      'EAL 2 (Structurally Tested)',
    ],
    correctIndex: 2,
    explanation:
      'EAL 4 is typical for commercial OS/firewalls (methodically designed/reviewed); EAL 5–7 apply semi-formal/formal verification, with EAL 7 representing full formal verification and testing.',
  },
  {
    id: 'cissp-25',
    domain: 'Security Architecture and Engineering',
    prompt:
      'Why do modern TLS 1.3 and hybrid messaging protocols combine asymmetric cryptography (ECDHE/RSA) with symmetric AEAD ciphers (AES-256-GCM / ChaCha20-Poly1305)?',
    options: [
      'Asymmetric crypto handles key agreement/authentication cleanly at handshake time, while symmetric AEAD provides high-speed bulk confidentiality and integrity per packet',
      'Symmetric encryption works without shared secret keys',
      'AES-256-GCM supports digital non-repudiation signatures directly',
      'Asymmetric RSA is 1,000x faster than AES in hardware',
    ],
    correctIndex: 0,
    explanation:
      'Hybrid cryptosystems leverage asymmetric math for key exchange and identity signing while executing bulk payload encryption and integrity tags via fast symmetric AEAD ciphers.',
  },
  {
    id: 'cissp-26',
    domain: 'Security Architecture and Engineering',
    prompt:
      'During TLS connections, why is OCSP Stapling preferred over downloading traditional Certificate Revocation Lists (CRLs) or making client-side direct OCSP queries?',
    options: [
      'The web server periodically attaches a CA-signed timestamped OCSP status inside the TLS handshake, eliminating client-to-CA privacy leaks and CRL bandwidth latency',
      'OCSP Stapling disables certificate expiration checks',
      'CRL files refresh every millisecond automatically',
      'OCSP Stapling removes the need for private keys on the server',
    ],
    correctIndex: 0,
    explanation:
      'OCSP Stapling lets the origin server attach a fresh, CA-signed OCSP response directly in the TLS handshake—improving performance, reliability, and user browsing privacy.',
  },
  {
    id: 'cissp-27',
    domain: 'Security Architecture and Engineering',
    prompt:
      'To protect stored user credentials against precomputed Rainbow Table attacks AND brute-force GPU cracking, what is the strongest password storage mechanism?',
    options: [
      'SHA-256 without salting',
      'Unique per-user cryptographic salt combined with a memory-hard key derivation function like Argon2id or bcrypt',
      'AES-128-ECB encryption using a static shared key',
      'Double MD5 hashing with uppercase salt',
    ],
    correctIndex: 1,
    explanation:
      'Per-user random salts defeat rainbow tables, and memory-hard slow KDFs (Argon2id, scrypt, bcrypt) dramatically inflate GPU/ASIC brute-force cracking cost.',
  },
  {
    id: 'cissp-28',
    domain: 'Security Architecture and Engineering',
    prompt:
      'A high-security vault datacenter installs pre-action dry-pipe fire sprinklers alongside clean-agent suppression (such as FM-200 / Inergen). Why is a pre-action sprinkler system used instead of wet-pipe sprinklers?',
    options: [
      'Pre-action pipes stay dry until TWO independent events occur (smoke/heat sensor trigger AND fusible link melt), preventing accidental pipe leaks over live server racks',
      'Pre-action pipes spray conductive saltwater automatically when power drops',
      'Clean-agent gas removes all structural smoke without ventilation',
      'Class D extinguishers are required for server rack electrical fires',
    ],
    correctIndex: 0,
    explanation:
      'Pre-action systems avoid accidental water damage by keeping pipes dry until dual detection triggers the valve, and require sprinkler head thermal activation before discharge.',
  },
  {
    id: 'cissp-29',
    domain: 'Security Architecture and Engineering',
    prompt:
      'What physical security engineering principle applies natural surveillance (sightlines, lighting), access control (bollards, fencing), and territorial reinforcement to deter physical intrusion?',
    options: [
      'CPTED (Crime Prevention Through Environmental Design)',
      'TEMPEST / Faraday shielding',
      'Mantrap interlock logic',
      'Positive HVAC airflow pressure',
    ],
    correctIndex: 0,
    explanation:
      'CPTED uses architectural layout, landscaping, perimeter lighting, and clear natural visibility to deter opportunistic physical trespassers.',
  },
  {
    id: 'cissp-30',
    domain: 'Communication and Network Security',
    prompt:
      'When configuring a site-to-site IPsec VPN between two corporate firewalls across the public internet, which protocol and mode encapsulate and encrypt the ENTIRE original internal IP packet inside a new outer IP header?',
    options: [
      'AH in Transport Mode',
      'ESP (Encapsulating Security Payload) in Tunnel Mode',
      'AH in Tunnel Mode without encryption',
      'L2TP plaintext forwarding',
    ],
    correctIndex: 1,
    explanation:
      'ESP provides confidentiality, integrity, and authentication; Tunnel Mode encrypts the full original IP packet (including private source/destination IPs) under a new outer gateway IP header.',
  },
  {
    id: 'cissp-31',
    domain: 'Communication and Network Security',
    prompt:
      'A network architect inspects an industrial ICS/OT environment and discovers legacy PLCs that cannot run host antivirus or patch frequently. What network architecture pattern provides strongest containment?',
    options: [
      'Flat Layer 2 VLAN bridged directly to corporate office Wi-Fi',
      'Purdue Model micro-segmentation placing OT devices inside isolated air-gapped or DMZ/jump-host zones with strict application-aware egress filtering',
      'Enabling wireless WPA2-PSK access directly on every PLC',
      'Connecting PLCs straight to public IPv4 addresses behind port forwarding',
    ],
    correctIndex: 1,
    explanation:
      'Network micro-segmentation and Purdue-model zoning isolate vulnerable OT/IoT assets behind unidirectional gateways or hardened DMZ jump brokers to block lateral IT-to-OT traversal.',
  },
  {
    id: 'cissp-32',
    domain: 'Communication and Network Security',
    prompt:
      'Which Layer 2 attack abuses double-tagged 802.1Q frames or fake DTP trunk negotiation to inject traffic from an untrusted user VLAN into a restricted management VLAN?',
    options: [
      'BGP route hijacking',
      'VLAN hopping',
      'DNS cache poisoning',
      'SYN flood amplification',
    ],
    correctIndex: 1,
    explanation:
      'VLAN hopping exploits switch spoofing (DTP) or double 802.1Q tagging when Native VLAN matches user access ports; mitigated by disabling DTP, setting access ports, and isolating an unused Native VLAN.',
  },
  {
    id: 'cissp-33',
    domain: 'Identity and Access Management',
    prompt:
      'In SAML 2.0 federated Single Sign-On, when a corporate user logs into an external cloud CRM, which party issues and cryptographically signs the XML identity assertion?',
    options: [
      'Service Provider (SP)',
      'Identity Provider (IdP)',
      'Certificate Revocation Authority',
      'DNS Authoritative Resolver',
    ],
    correctIndex: 1,
    explanation:
      'In SAML 2.0, the Identity Provider (IdP) authenticates the principal and issues a digitally signed SAML assertion consumed by the relying Service Provider (SP).',
  },
  {
    id: 'cissp-34',
    domain: 'Identity and Access Management',
    prompt:
      'Compare Discretionary Access Control (DAC), Mandatory Access Control (MAC), and Role-Based Access Control (RBAC).',
    options: [
      'DAC allows object owners to grant permissions; MAC enforces central system security labels/clearances; RBAC assigns permissions to organizational job roles',
      'MAC lets every employee share files freely via link permissions',
      'DAC is enforced exclusively via military Top Secret sensitivity labels',
      'RBAC ignores job functions and evaluates only source MAC addresses',
    ],
    correctIndex: 0,
    explanation:
      'DAC delegates ACL decisions to resource owners (e.g., NTFS/POSIX file owners), MAC enforces non-discretionary labels (e.g., SELinux/MLS), and RBAC scales enterprise permissions by role.',
  },
  {
    id: 'cissp-35',
    domain: 'Identity and Access Management',
    prompt:
      'An employee holds Top Secret security clearance, yet only works on Project Atlas and does NOT need access to Project Borealis files also marked Top Secret. Which principle denies access to Project Borealis?',
    options: [
      'Need-to-Know (paired with Least Privilege)',
      'Dual Control',
      'Availability priority',
      'Non-repudiation',
    ],
    correctIndex: 0,
    explanation:
      'Formal clearance satisfies classification eligibility, while Need-to-Know (enforcing Least Privilege) restricts access solely to information strictly required for assigned duties.',
  },
  {
    id: 'cissp-36',
    domain: 'Security Assessment and Testing',
    prompt:
      'What is the critical legal and operational prerequisite BEFORE a red team executes an external penetration test against a cloud-hosted application?',
    options: [
      'Signed Rules of Engagement (RoE), written authorization scope, emergency escalation contacts, and cloud provider notification if required',
      'Publishing exploit payloads publicly for bug bounty transparency first',
      'Turning off all production logging so the SOC is surprised',
      'Testing third-party SaaS vendor datacenters without notifying them',
    ],
    correctIndex: 0,
    explanation:
      'Authorized penetration testing requires explicit written executive approval, strictly bounded IP/domain scope in the Rules of Engagement (RoE), and emergency stop procedures.',
  },
  {
    id: 'cissp-37',
    domain: 'Security Assessment and Testing',
    prompt:
      'During software security testing, how does generational (smart) fuzzing improve over random mutation (dumb) fuzzing when testing a complex binary network protocol parser?',
    options: [
      'Generational fuzzing models the valid protocol grammar/structure to construct semi-valid edge payloads reaching deeper state-machine parser code instead of failing early checksum checks',
      'Dumb fuzzing decompiles source code automatically using static analysis',
      'Smart fuzzing runs only inside production customer databases',
      'Generational fuzzing skips boundary value checks',
    ],
    correctIndex: 0,
    explanation:
      'Mutation (dumb) fuzzers bit-flip existing samples and often get rejected at header validation, whereas grammar-aware generational fuzzers reach deep parsing bugs.',
  },
  {
    id: 'cissp-38',
    domain: 'Security Operations',
    prompt:
      'Order the standard NIST SP 800-61 / PICERL Incident Response lifecycle phases correctly.',
    options: [
      'Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity (Lessons Learned)',
      'Eradication -> Containment -> Preparation -> Detection',
      'Recovery -> Lessons Learned -> Preparation -> Containment',
      'Detection -> Public Press Release -> Backup -> Containment',
    ],
    correctIndex: 0,
    explanation:
      'Structured incident response begins with Preparation, followed by Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Lessons Learned.',
  },
  {
    id: 'cissp-39',
    domain: 'Security Operations',
    prompt:
      'A forensic investigator collects a seized suspect laptop hard drive. Which documentation maintains legal admissibility by recording every person, timestamp, seal number, and storage transfer from seizure to courtroom?',
    options: [
      'Chain of Custody',
      'Service Level Agreement (SLA)',
      'Configuration Management Database (CMDB)',
      'Business Impact Analysis (BIA)',
    ],
    correctIndex: 0,
    explanation:
      'A continuous Chain of Custody paired with cryptographic SHA-256 hashes proves seized digital evidence remained unaltered from collection through courtroom presentation.',
  },
  {
    id: 'cissp-40',
    domain: 'Security Operations',
    prompt:
      'Compare Cold, Warm, and Hot Disaster Recovery (DR) sites in terms of recovery speed (RTO) and ongoing operating cost.',
    options: [
      'Hot sites provide near-instant failover with real-time replicated data and highest cost; Warm sites hold pre-installed hardware needing recent backups/config; Cold sites offer empty leased space/power with lowest cost and longest RTO',
      'Cold sites mirror synchronous transactions with sub-minute RTO',
      'Hot sites have no electricity or network circuits until disaster strikes',
      'Warm sites always cost more than active-active multi-region Hot sites',
    ],
    correctIndex: 0,
    explanation:
      'DR site selection balances cost against RTO/RPO: Hot (hours/minutes RTO, highest cost) > Warm (hours/days RTO, moderate cost) > Cold (days/weeks RTO, lowest cost).',
  },
  {
    id: 'cissp-41',
    domain: 'Security Operations',
    prompt:
      'During Change Management, why MUST emergency security patches still pass through expedited Emergency Change Advisory Board (ECAB) logging, peer review, and rollback planning?',
    options: [
      'To preserve operational stability, audit accountability, and rapid backout capability if an emergency patch triggers a production outage',
      'To delay critical zero-day fixes by six months intentionally',
      'To let developers deploy directly to production without version control',
      'To bypass configuration baselines permanently',
    ],
    correctIndex: 0,
    explanation:
      'Formal change management prevents unauthorized or breaking changes, preserves configuration integrity, and ensures verified rollback plans exist even for urgent fixes.',
  },
  {
    id: 'cissp-42',
    domain: 'Software Development Security',
    prompt:
      'An application checks whether a user has sufficient account balance, pauses briefly while processing an external API call, and then deducts funds—allowing concurrent requests to overdraw the account simultaneously. What vulnerability class is this?',
    options: [
      'Time-of-Check to Time-of-Use (TOCTOU) race condition',
      'Integer underflow in static CSS files',
      'Cross-Site Scripting (Stored XSS)',
      'Insecure Deserialization',
    ],
    correctIndex: 0,
    explanation:
      'TOCTOU race conditions occur when application state changes between validation check and resource mutation; solved with atomic database transactions and locks.',
  },
  {
    id: 'cissp-43',
    domain: 'Software Development Security',
    prompt:
      'What is the single most effective architectural code defense against SQL Injection (SQLi) across relational database drivers?',
    options: [
      'Parameterized queries (prepared statements) separating SQL command structure from untrusted input values',
      'Client-side JavaScript regex stripping quotes before form submission',
      'Base64 encoding SQL payloads inside HTTP headers',
      'Renaming database tables to random strings',
    ],
    correctIndex: 0,
    explanation:
      'Parameterized queries/prepared statements bind user inputs strictly as typed data literals so the SQL engine never interprets user text as executable commands.',
  },
  {
    id: 'cissp-44',
    domain: 'Software Development Security',
    prompt:
      'A C/C++ network daemon copies an oversized 2 KB client packet into a fixed 512-byte stack buffer without bounds checking, overwriting the return instruction pointer. Which OS/compiler mitigations counter this attack?',
    options: [
      'Stack Canaries, ASLR (Address Space Layout Randomization), and DEP/NX (non-executable stack)',
      'Enabling Telnet debugging',
      'Disabling HTTP Strict Transport Security',
      'Using MD5 checksums on CSS files',
    ],
    correctIndex: 0,
    explanation:
      'Bounds-safe APIs eliminate buffer overflows at the source; Stack Canaries, DEP/NX (W^X), and ASLR mitigate arbitrary code execution at runtime.',
  },
  {
    id: 'cissp-45',
    domain: 'Software Development Security',
    prompt:
      'To achieve supply-chain integrity inside CI/CD pipelines per NIST SSDF and SLSA principles, which automated artifact and check should every production release generate?',
    options: [
      'A signed Software Bill of Materials (SBOM), cryptographic build provenance attestation, and automated SCA dependency CVE gating',
      'Manually zipped binaries uploaded via anonymous FTP',
      'Hardcoded production database keys stored inside `.env` committed to Git',
      'Disabling container image digest pinning (`:latest` tags only)',
    ],
    correctIndex: 0,
    explanation:
      'Modern DevSecOps enforces Software Composition Analysis (SCA), signed SBOM manifests, immutable pinned artifacts, and verifiable CI/CD build provenance.',
  },
];
