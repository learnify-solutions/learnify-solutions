import { CheatSheetSection, InterviewQaItem } from '../types';

export const NETWORK_PORTS_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'core-infrastructure-ports',
    title: 'Core Infrastructure, Remote Access & File Transfer Ports',
    subtitle: 'Must-memorize TCP/UDP port numbers tested heavily on CompTIA Network+ (N10-009) and Security+ (SY0-701).',
    headers: ['Port & Transport', 'Protocol', 'Security Status', 'Exam Tip / Architecture Note'],
    rows: [
      { cells: ['20 / 21 (TCP)', 'FTP (Data / Control)', 'Unencrypted', 'Legacy cleartext file transfer; replace with SFTP (22) or FTPS (990)'], copyText: '20/21 TCP FTP' },
      { cells: ['22 (TCP)', 'SSH / SCP / SFTP', 'Encrypted (Asymmetric + AES)', 'Key-based auth beats passwords; blocks sniffing vs Telnet/FTP'], copyText: '22 TCP SSH SFTP' },
      { cells: ['23 (TCP)', 'Telnet', 'Cleartext (Legacy)', 'Never use in production; switch remote CLI to SSH port 22'], copyText: '23 TCP Telnet' },
      { cells: ['53 (UDP / TCP)', 'DNS', 'Cleartext (UDP) · DoT 853', 'UDP 53 for standard lookups; TCP 53 for Zone Transfers (AXFR) & large replies'], copyText: '53 UDP/TCP DNS' },
      { cells: ['67 / 68 (UDP)', 'DHCP', 'Unauthenticated Broadcast', 'Port 67 Server / Port 68 Client (DORA handshake); mitigate rogues via DHCP Snooping'], copyText: '67/68 UDP DHCP' },
      { cells: ['69 (UDP)', 'TFTP', 'Unencrypted', 'Minimal overhead; PXE boot images and router config staging'], copyText: '69 UDP TFTP' },
      { cells: ['80 / 443 (TCP)', 'HTTP / HTTPS (TLS)', 'HTTPS Encrypted (443)', 'QUIC/HTTP3 adds UDP 443; enforce HSTS + TLS 1.3'], copyText: '80/443 TCP HTTPS' },
      { cells: ['123 (UDP)', 'NTP', 'Authenticated optional (NTS)', 'Prevents Kerberos clock-skew failures and keeps SIEM logs correlated'], copyText: '123 UDP NTP' },
      { cells: ['161 / 162 (UDP)', 'SNMP / SNMP Trap', 'SNMPv3 authPriv Encrypted', '161 Manager polling; 162 Agent asynchronous trap alerts'], copyText: '161/162 UDP SNMP' },
      { cells: ['445 (TCP)', 'SMB / CIFS', 'SMB 3.x Signed/Encrypted', 'Windows file sharing; primary ransomware lateral-movement vector (block at WAN)'], copyText: '445 TCP SMB' },
      { cells: ['3389 (TCP / UDP)', 'RDP', 'TLS / NLA Protected', 'Never expose directly to WAN; restrict behind Azure Bastion / VPN + MFA'], copyText: '3389 TCP RDP' },
    ],
  },
  {
    id: 'identity-directory-mail-ports',
    title: 'Identity, Directory, Email & SIEM Logging Ports',
    subtitle: 'Enterprise Active Directory, encrypted messaging, and security telemetry ports.',
    headers: ['Port & Transport', 'Protocol', 'Security Mode', 'Key Operational Detail'],
    rows: [
      { cells: ['25 (TCP)', 'SMTP', 'Opportunistic TLS', 'Server-to-server mail relay; 587 for authenticated client submission'], copyText: '25/587 TCP SMTP' },
      { cells: ['88 (TCP / UDP)', 'Kerberos', 'Ticket-based (AES)', 'Active Directory SSO authentication; sensitive to NTP drift >5 mins'], copyText: '88 TCP/UDP Kerberos' },
      { cells: ['143 / 993 (TCP)', 'IMAP / IMAPS', 'TLS on TCP 993', 'Synchronizes mail folders across multiple devices securely on 993'], copyText: '993 TCP IMAPS' },
      { cells: ['389 / 636 (TCP)', 'LDAP / LDAPS', 'TLS on TCP 636', '636 prevents plaintext Active Directory bind credential exposure'], copyText: '636 TCP LDAPS' },
      { cells: ['514 (UDP) / 6514 (TCP)', 'Syslog / Secure Syslog', 'TLS on TCP 6514', 'Forwards firewall, switch, and Linux host logs to enterprise SIEM'], copyText: '514/6514 Syslog' },
      { cells: ['1812 / 1813 (UDP)', 'RADIUS Auth / Acct', 'Shared Secret / RadSec', 'UDP-based 802.1X wireless & VPN AAA; TACACS+ uses TCP 49'], copyText: '1812/1813 UDP RADIUS' },
      { cells: ['49 (TCP)', 'TACACS+', 'Full Payload Encrypted', 'Cisco/network device CLI AAA separating Auth, Authz, and Accounting'], copyText: '49 TCP TACACS+' },
    ],
  },
];

export const KUBECTL_CKA_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'imperative-generators',
    title: 'Fast Imperative YAML Generators (Exam Speed)',
    subtitle: 'Generate clean YAML skeletons in 2 seconds on CKA instead of hand-writing indentation from scratch.',
    headers: ['Task Objective', 'kubectl Command', 'Exam Speed Note'],
    rows: [
      {
        cells: ['Generate Pod YAML Skeleton', 'kubectl run web --image=nginx --port=80 --dry-run=client -o yaml > pod.yaml', 'Zero YAML typos under 2-hour CKA clock'],
        copyText: 'kubectl run web --image=nginx --port=80 --dry-run=client -o yaml > pod.yaml',
      },
      {
        cells: ['Generate Deployment w/ 3 Replicas', 'kubectl create deployment api --image=nginx:1.27 --replicas=3 --dry-run=client -o yaml > deploy.yaml', 'Edit strategy/env cleanly before applying'],
        copyText: 'kubectl create deployment api --image=nginx:1.27 --replicas=3 --dry-run=client -o yaml > deploy.yaml',
      },
      {
        cells: ['Expose Deployment as ClusterIP/NodePort', 'kubectl expose deployment api --port=80 --target-port=8080 --type=NodePort', 'Matches deployment labels automatically'],
        copyText: 'kubectl expose deployment api --port=80 --target-port=8080 --type=NodePort',
      },
      {
        cells: ['Create ConfigMap from Env Key/Value', 'kubectl create configmap app-cfg --from-literal=ENV=prod --from-literal=LOG=info', 'Verify with kubectl describe cm app-cfg'],
        copyText: 'kubectl create configmap app-cfg --from-literal=ENV=prod --from-literal=LOG=info',
      },
      {
        cells: ['Create Secret TLS Certificate', 'kubectl create secret tls web-tls --cert=tls.crt --key=tls.key', 'Bind inside Ingress spec.tls block'],
        copyText: 'kubectl create secret tls web-tls --cert=tls.crt --key=tls.key',
      },
    ],
  },
  {
    id: 'cluster-admin-troubleshooting',
    title: 'Cluster Upgrade, etcd Backup & Triage Commands',
    subtitle: 'High-weight CKA Domain commands covering etcdctl snapshot, node drainage, and RBAC validation.',
    headers: ['Operation', 'Command Pattern', 'Critical Verification'],
    rows: [
      {
        cells: ['Switch Cluster Context Safely', 'kubectl config use-context k8s-prod', 'Always run at start of EVERY CKA question'],
        copyText: 'kubectl config use-context k8s-prod',
      },
      {
        cells: ['Verify RBAC User Permission', 'kubectl auth can-i create deployments --as=dev-user -n payments', 'Returns exact yes/no authorization answer'],
        copyText: 'kubectl auth can-i create deployments --as=dev-user -n payments',
      },
      {
        cells: ['Safely Drain Worker Node for Maintenance', 'kubectl drain node-02 --ignore-daemonsets --delete-emptydir-data', 'Always follow with kubectl uncordon post-upgrade'],
        copyText: 'kubectl drain node-02 --ignore-daemonsets --delete-emptydir-data',
      },
      {
        cells: ['Snapshot etcd Control Plane State', 'ETCDCTL_API=3 etcdctl snapshot save /opt/etcd-backup.db --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key', 'Confirm with etcdctl snapshot status /opt/etcd-backup.db'],
        copyText: 'ETCDCTL_API=3 etcdctl snapshot save /opt/etcd-backup.db --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key',
      },
      {
        cells: ['Inspect Failing Pod & InitContainer Logs', 'kubectl logs my-pod -c app --previous && kubectl describe pod my-pod', 'Reveals CrashLoopBackOff exit codes & OOMKilled'],
        copyText: 'kubectl logs my-pod -c app --previous && kubectl describe pod my-pod',
      },
      {
        cells: ['Sort Nodes / Pods by Resource Usage', 'kubectl top nodes --sort-by=cpu && kubectl top pods -A --sort-by=memory', 'Requires Metrics Server installed in cluster'],
        copyText: 'kubectl top nodes --sort-by=cpu && kubectl top pods -A --sort-by=memory',
      },
    ],
  },
];

export const AZURE_VS_AWS_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'compute-containers-networking',
    title: 'Compute, Containers & Networking Equivalents',
    subtitle: 'Cross-cloud translation matrix bridging AZ-104 (Azure Administrator) and SAA-C03 (AWS Solutions Architect).',
    headers: ['Architecture Layer', 'Microsoft Azure', 'Amazon AWS', 'Key Operational Difference'],
    rows: [
      { cells: ['Virtual Machines & Autoscaling', 'Azure VMs + VM Scale Sets (VMSS)', 'Amazon EC2 + Auto Scaling Groups', 'AWS ties ASG closely to Launch Templates; Azure integrates VMSS profiles in ARM/Bicep'], copyText: 'Azure VMSS <-> AWS EC2 Auto Scaling' },
      { cells: ['Serverless Functions', 'Azure Functions', 'AWS Lambda', 'Azure adds Durable Functions orchestration; AWS leads cold-start tuning w/ SnapStart'], copyText: 'Azure Functions <-> AWS Lambda' },
      { cells: ['Managed Kubernetes', 'Azure Kubernetes Service (AKS)', 'Amazon EKS', 'AKS offers free standard control plane tier vs $0.10/hr base control plane on EKS'], copyText: 'Azure AKS <-> AWS EKS' },
      { cells: ['Virtual Private Network Core', 'Azure Virtual Network (VNet)', 'Amazon VPC', 'Azure VNets span a region natively; AWS Subnets map 1:1 to a single Availability Zone'], copyText: 'Azure VNet <-> AWS VPC' },
      { cells: ['Stateful Traffic Filtering', 'Network Security Group (NSG)', 'Security Group (SG)', 'Both are stateful; AWS NACLs are stateless subnet-level filters unlike NSGs'], copyText: 'Azure NSG <-> AWS Security Group' },
      { cells: ['Private Dedicated WAN', 'Azure ExpressRoute', 'AWS Direct Connect', 'Both bypass public internet via Layer-2/3 telco cross-connects into cloud PoPs'], copyText: 'ExpressRoute <-> Direct Connect' },
      { cells: ['L7 HTTP Load Balancer & WAF', 'Azure Application Gateway', 'AWS Application Load Balancer + WAF', 'App Gateway bundles Azure WAF natively into one resource'], copyText: 'App Gateway <-> AWS ALB + WAF' },
    ],
  },
  {
    id: 'storage-identity-governance',
    title: 'Storage, Databases, Identity & Enterprise Governance',
    subtitle: 'Side-by-side mapping used in multi-cloud enterprise migrations and certification interviews.',
    headers: ['Capability', 'Microsoft Azure', 'Amazon AWS', 'Interview Takeaway'],
    rows: [
      { cells: ['Object / Blob Storage', 'Azure Blob Storage (Hot/Cool/Archive)', 'Amazon S3 (Standard/IA/Glacier)', 'Azure organizes inside Storage Account > Containers; AWS uses globally unique Bucket names'], copyText: 'Azure Blob <-> Amazon S3' },
      { cells: ['Shared Managed File System', 'Azure Files (SMB / NFS)', 'Amazon EFS (Linux NFS) / FSx', 'Azure Files excels for lift-and-shift Windows AD-joined SMB shares'], copyText: 'Azure Files <-> Amazon EFS/FSx' },
      { cells: ['Identity & Enterprise SSO', 'Microsoft Entra ID (Azure AD)', 'AWS IAM + IAM Identity Center', 'Entra ID acts as full corporate IdP + cloud RBAC; AWS IAM is primarily account-scoped'], copyText: 'Entra ID <-> AWS IAM' },
      { cells: ['Multi-Account Guardrails', 'Management Groups + Azure Policy', 'AWS Organizations + SCPs', 'Both enforce preventative compliance guardrails at the top organizational hierarchy'], copyText: 'Azure Policy <-> AWS Organizations SCP' },
      { cells: ['Secrets & Key Management', 'Azure Key Vault', 'AWS Secrets Manager + AWS KMS', 'Key Vault stores keys, certs, and secrets under one plane; AWS splits KMS and Secrets Manager'], copyText: 'Key Vault <-> AWS KMS + Secrets Manager' },
    ],
  },
];

export const AZURE_INTERVIEW_QA: InterviewQaItem[] = [
  {
    id: 'az-int-1',
    category: 'Networking',
    question: 'Explain the exact difference between an Azure Service Endpoint and an Azure Private Endpoint.',
    answer:
      'A Service Endpoint keeps the PaaS service on its public IP address while restricting firewall access strictly to traffic arriving from your VNet subnet over the Azure backbone. A Private Endpoint assigns an actual private IP address from inside your VNet subnet NIC via Private Link—allowing even on-premises VPN/ExpressRoute hosts to reach Azure Storage or SQL privately with zero public exposure.',
    followUpTip: 'Mention Private DNS Zones (`privatelink.blob.core.windows.net`) required for Private Endpoint name resolution.',
  },
  {
    id: 'az-int-2',
    category: 'Governance & Identity',
    question: 'If an engineer has Owner RBAC on a Resource Group, why might they still be blocked from deploying a VM?',
    answer:
      'RBAC grants action authorization ("what API calls the identity may attempt"), whereas Azure Policy enforces resource-state guardrails at the ARM layer. If an Azure Policy denies specific VM SKUs, regions, or missing tags, ARM rejects the deployment regardless of Owner RBAC permissions—and a CanNotDelete Resource Lock similarly blocks deletions until removed.',
    followUpTip: 'Contrast RBAC (Who/Actions) vs Policy (Compliance Rules) vs Locks (Accidental Change Prevention).',
  },
  {
    id: 'az-int-3',
    category: 'Networking',
    question: 'How do you troubleshoot when two peered Azure VNets cannot pass traffic between VMs?',
    answer:
      'First verify both sides of the peering show Status = Connected (peering is two-way). Next verify non-overlapping CIDR address spaces, inspect effective NSG rules on both NIC and Subnet level, inspect custom User-Defined Routes (UDRs) forwarding packets to an NVA/Firewall, and verify IP Forwarding is enabled on any intermediate firewall NIC.',
    followUpTip: 'Use Network Watcher IP Flow Verify and Next Hop tools to pinpoint the exact rule dropping packets.',
  },
  {
    id: 'az-int-4',
    category: 'Storage & DR',
    question: 'When would you recommend ZRS instead of GRS for an enterprise workload?',
    answer:
      'ZRS replicates synchronously across three Availability Zones inside a single region with zero RPO on a single-datacenter outage and fits strict data-residency laws (such as GDPR in Germany or Netherlands) where data cannot cross regional borders. GRS adds asynchronous cross-region replication for catastrophic regional disasters but introduces potential RPO lag during failover.',
    followUpTip: 'Also cite GZRS when both cross-zone zero-RPO HA and cross-region disaster protection are mandated.',
  },
  {
    id: 'az-int-5',
    category: 'Identity & Security',
    question: 'How do Managed Identities eliminate credential rotation incidents in Azure?',
    answer:
      'With a System-Assigned or User-Assigned Managed Identity, Azure issues a short-lived Entra ID token dynamically via the local IMDS endpoint (`169.254.169.254`). Developers never store client secrets or storage keys inside appsettings or GitHub repos, and the underlying certificate credential rotates transparently in the platform.',
    followUpTip: 'Explain the lifecycle distinction: System-Assigned deletes automatically with the VM/App, while User-Assigned outlives resources and shares across clusters.',
  },
  {
    id: 'az-int-6',
    category: 'Compute & Scalability',
    question: 'What is the architectural difference between Azure Load Balancer and Azure Application Gateway?',
    answer:
      'Azure Load Balancer operates at Layer 4 (TCP/UDP) with ultra-low latency based on IP/Port 5-tuple hashing. Application Gateway operates at Layer 7 (HTTP/HTTPS), enabling URL path routing (`/api` vs `/images`), SSL offloading, cookie affinity, and integrated OWASP Web Application Firewall inspection.',
    followUpTip: 'Note how multi-region global routing layers Azure Front Door or Traffic Manager above regional gateways.',
  },
];

export const SECURITY_SOC_INTERVIEW_QA: InterviewQaItem[] = [
  {
    id: 'sec-int-1',
    category: 'SOC Triage & Detection',
    question: 'Walk me through your exact investigation steps if a SIEM triggers an alert for impossible travel login followed by PowerShell encoded commands.',
    answer:
      'First verify scope and rule out benign VPN/split-tunnel false positives by comparing IP ASN, user-agent, MFA claims, and sign-in risk telemetry. Simultaneously isolate the endpoint via EDR to preserve RAM/process trees while preventing lateral C2, revoke active Entra/Okta refresh tokens and force password reset for the user, decode the `-EncodedCommand` Base64 string safely in an offline sandbox, and check proxy/DNS/child processes for persistence or data staging.',
    followUpTip: 'Follow NIST SP 800-61 phases clearly: Containment -> Eradication -> Recovery -> Lessons Learned.',
  },
  {
    id: 'sec-int-2',
    category: 'Identity & Auth',
    question: 'Explain why Kerberoasting succeeds on standard Active Directory accounts and how you remediate it.',
    answer:
      'Any authenticated domain user can request a Kerberos TGS service ticket for accounts carrying a Service Principal Name (SPN). Because TGS tickets are encrypted with the service account’s NTLM hash, attackers export the ticket and crack weak passwords offline silently. Remediation uses Group Managed Service Accounts (gMSA) with automated 120-character random passwords, AES-256 Kerberos enforcement, and removing unneeded SPNs.',
    followUpTip: 'Contrast Pass-the-Hash (NTLM lateral movement) vs Golden Ticket (krbtgt TGT forgery).',
  },
  {
    id: 'sec-int-3',
    category: 'Network & Zero Trust',
    question: 'How does Mutual TLS (mTLS) strengthen API security compared to standard one-way TLS?',
    answer:
      'Standard TLS only verifies the server’s X.509 certificate so the client trusts the destination. Mutual TLS forces BOTH client and server to present cryptographically signed certificates before the TLS session establishes—blocking stolen API keys or spoofed clients at the transport handshake level.',
    followUpTip: 'Link mTLS to Zero Trust workload identity in Kubernetes service meshes and B2B banking APIs.',
  },
  {
    id: 'sec-int-4',
    category: 'Vulnerability Management',
    question: 'A vulnerability scanner flags 400 Critical CVEs across production servers. How do you prioritize remediation when engineering only has capacity to patch 25 this sprint?',
    answer:
      'Relying purely on CVSS base score creates noise. Prioritize using Threat Exposure context: combine CISA KEV (actively exploited in the wild), EPSS exploit probability, asset criticality (internet-facing vs isolated), and presence of unmitigated exploit paths—applying temporary WAF virtual patching or network segmentation while scheduling maintenance windows.',
    followUpTip: 'Mention CVSS vs EPSS vs CISA KEV—hiring managers love seeing risk-based prioritization over blind scanner sorting.',
  },
  {
    id: 'sec-int-5',
    category: 'Cloud Security',
    question: 'What are the highest-priority logging sources you onboard first into a cloud SIEM (Sentinel / Splunk)?',
    answer:
      'Priority Tier 1: Cloud Identity & Control Plane logs (Entra ID Sign-In/Audit, AWS CloudTrail, Azure Activity Logs) plus DNS query logs and EDR process telemetry. Next ingest firewall/flow logs, WAF blocks, and Kubernetes audit events so credential compromise and C2 beacons remain correlated end-to-end.',
    followUpTip: 'Mention MITRE ATT&CK mapping so SOC detections track attacker TTPs rather than brittle static IPs.',
  },
  {
    id: 'sec-int-6',
    category: 'GRC & Compliance',
    question: 'How does Europe’s NIS2 Directive affect enterprise security operations teams compared to GDPR?',
    answer:
      'While GDPR centers on personal data privacy (72-hour breach reporting), NIS2 expands mandatory cybersecurity governance across critical sectors (cloud, energy, finance, logistics) with a 24-hour early-warning incident notice, 72-hour assessment, mandatory supply-chain risk audits, and personal board-level accountability.',
    followUpTip: 'Highlight immutable backups, MFA everywhere, and documented incident playbooks as key NIS2 evidence.',
  },
];

export const POWER_BI_INTERVIEW_QA: InterviewQaItem[] = [
  {
    id: 'pl-int-1',
    category: 'DAX Engine',
    question: 'Explain the exact difference between Row Context and Filter Context in DAX, and why CALCULATE triggers Context Transition.',
    answer:
      'Row Context means DAX iterates row by row (like inside calculated columns or `SUMX`), giving awareness of current row column values without filtering related tables automatically. Filter Context is the set of active filters applied by slicers, visuals, and `CALCULATE`. When `CALCULATE` runs inside a Row Context, Context Transition converts every column value of the current row into an equivalent active Filter Context.',
    followUpTip: 'Demonstrate with `SUMX(DimProduct, [Total Sales])` vs referencing a bare column directly.',
  },
  {
    id: 'pl-int-2',
    category: 'Data Modeling',
    question: 'Why should Star Schema always be preferred over a single flat table or bidirectional snowflaking in Power BI?',
    answer:
      'The VertiPaq columnar engine optimizes compression and relationship bitmap joins on clean `1 -> *` Star Schemas. Flattened wide tables balloon dictionary sizes with repeated descriptive strings, while pervasive bidirectional filtering introduces ambiguous filter paths and severe DAX query degradation.',
    followUpTip: 'Only enable bidirectional filtering intentionally for specific bridge tables, or prefer `CROSSFILTER()` inside explicit measures.',
  },
  {
    id: 'pl-int-3',
    category: 'Power Query',
    question: 'What is Query Folding in Power Query and how do you verify if it broke?',
    answer:
      'Query Folding translates Power Query UI steps (`Filter Rows`, `Remove Columns`, `Merge`) directly into native SQL pushed down to the source database rather than pulling raw millions of rows into Power BI’s M engine memory. You verify folding by right-clicking the last step: if "View Native Query" is clickable, folding is active.',
    followUpTip: 'Always put filters, joins, and column drops at the top of Applied Steps before local M text/split functions.',
  },
  {
    id: 'pl-int-4',
    category: 'Governance & Performance',
    question: 'A stakeholder complains a Power BI report takes 14 seconds to load visuals. How do you diagnose whether the bottleneck is DAX, model bloat, or visuals?',
    answer:
      'Run Performance Analyzer inside Power BI Desktop first to split timings cleanly between DAX Query, Visual Display, and Other. Next copy slow queries into DAX Studio Server Timings to inspect Formula Engine vs Storage Engine scans, reduce high-visual page density, enable Incremental Refresh on large fact tables, and strip high-cardinality GUID columns.',
    followUpTip: 'Target fewer than 6–8 visuals per canvas page and replace slow nested `FILTER(ALL(FactTable), ...)` with `KEEPFILTERS` or dimension filters.',
  },
  {
    id: 'pl-int-5',
    category: 'Security',
    question: 'How do you verify Dynamic Row-Level Security works before publishing to executives, and why might a workspace colleague see all rows?',
    answer:
      'In Power BI Desktop, use Modeling -> "View as Roles" combined with "Other user" to enter a regional manager’s UPN email and inspect filtered totals. After publishing, if a user holds Admin, Member, or Contributor permission in that workspace, RLS is bypassed automatically—users subject to RLS must be assigned strictly as Workspace Viewers or consume via an App.',
    followUpTip: 'Great real-world catch—Workspace Contributor bypassing RLS trips up teams frequently.',
  },
];

export const AWS_INTERVIEW_QA: InterviewQaItem[] = [
  {
    id: 'aws-int-1',
    category: 'Networking & VPC',
    question: 'When should you choose an AWS Gateway VPC Endpoint vs an Interface VPC Endpoint (PrivateLink)?',
    answer:
      'Gateway Endpoints add route-table targets solely for Amazon S3 and DynamoDB at zero hourly or per-GB charge. Interface Endpoints (AWS PrivateLink) provision elastic network interfaces with private IPs inside your subnet for 100+ other AWS services (Secrets Manager, SQS, ECR, KMS) or private SaaS services, incurring per-hour ENI + per-GB charges.',
    followUpTip: 'Mention that S3 now also supports Interface Endpoints when on-premises VPN/Direct Connect hosts need private S3 IP reachability across peers.',
  },
  {
    id: 'aws-int-2',
    category: 'Resilience & HA',
    question: 'Explain the architectural difference between Amazon RDS Multi-AZ and RDS Read Replicas.',
    answer:
      'RDS Multi-AZ runs synchronous block-level replication to a passive standby instance in another Availability Zone strictly for automatic High Availability failover (~60s) with the same endpoint—it cannot serve read traffic (except Multi-AZ DB Cluster 2-reader mode). Read Replicas use asynchronous replication to offload heavy read queries horizontally and can operate cross-region for disaster recovery or global read locality.',
    followUpTip: 'Discuss RDS Proxy to stabilize thousands of short-lived AWS Lambda DB connections safely.',
  },
  {
    id: 'aws-int-3',
    category: 'Security & IAM',
    question: 'How does AWS evaluate whether an API request is Allowed or Denied when IAM Identity Policies, S3 Bucket Policies, and Organizations SCPs all exist?',
    answer:
      'Evaluation starts with implicit deny. Any explicit `Deny` anywhere (SCP, Resource Policy, Permission Boundary, Identity Policy) terminates evaluation immediately as Deny. Next, for cross-boundary actions, BOTH the Organizations SCP, Permissions Boundary (if present), AND an Allow in either the Identity Policy or Resource-based Policy (within the same account) must permit the call—with cross-account access requiring explicit Allow on BOTH identity and resource sides.',
    followUpTip: 'Clear policy evaluation flow separates senior Solutions Architects cleanly.',
  },
  {
    id: 'aws-int-4',
    category: 'Cost & Storage',
    question: 'An application reads 80% of uploaded S3 objects heavily for 14 days, rarely touches them for 90 days, and must keep compliance archives for 7 years at lowest cost. What Lifecycle rules design do you implement?',
    answer:
      'Store uploads in S3 Standard -> Lifecycle transition to S3 Standard-IA (or Intelligent-Tiering) at Day 30 -> S3 Glacier Instant/Flexible Retrieval at Day 90 -> S3 Glacier Deep Archive at Day 365 with S3 Object Lock (Governance or Compliance mode) to prevent premature deletion during the 7-year audit retention window.',
    followUpTip: 'Verify minimum object size (128 KB) and minimum storage duration (30/90/180 days) before transitioning tiny files.',
  },
  {
    id: 'aws-int-5',
    category: 'Serverless & Containers',
    question: 'When would you recommend AWS Fargate (ECS) over AWS Lambda for a new microservice?',
    answer:
      'Choose AWS Lambda for event-driven bursts, short executions under 15 minutes, and zero-traffic scale-to-zero. Choose ECS on AWS Fargate for steady 24/7 HTTP workloads, persistent WebSockets, long batch processing >15 minutes, custom OS packages, or workloads exceeding Lambda’s 10 GB memory limit without provisioning EC2 nodes.',
    followUpTip: 'Point out Compute Savings Plans cover both Fargate and Lambda seamlessly.',
  },
];

export interface RegionCurrencySpec {
  code: 'uk' | 'eu' | 'ae' | 'za' | 'us' | 'in';
  label: string;
  currency: string;
  symbol: string;
  fxFromUsd: number;
  salaryMultiplier: number;
  vatNote: string;
  hubHref: string;
}

export const CALCULATOR_REGIONS: RegionCurrencySpec[] = [
  {
    code: 'uk',
    label: 'United Kingdom (London / Manchester)',
    currency: 'GBP',
    symbol: '£',
    fxFromUsd: 0.79,
    salaryMultiplier: 0.72,
    vatNote: 'Excludes standard UK VAT (20% reclaimable on corporate B2B POs)',
    hubHref: '/uk',
  },
  {
    code: 'eu',
    label: 'Europe (Germany / Netherlands / EU)',
    currency: 'EUR',
    symbol: '€',
    fxFromUsd: 0.93,
    salaryMultiplier: 0.76,
    vatNote: 'EUR SEPA invoicing with EU VAT reverse-charge support',
    hubHref: '/eu',
  },
  {
    code: 'ae',
    label: 'UAE & Middle East (Dubai / Abu Dhabi)',
    currency: 'AED',
    symbol: 'AED ',
    fxFromUsd: 3.67,
    salaryMultiplier: 2.55,
    vatNote: 'Official UAE VAT 5% compliant corporate tax invoicing',
    hubHref: '/ae',
  },
  {
    code: 'za',
    label: 'South Africa (Johannesburg / Cape Town)',
    currency: 'ZAR',
    symbol: 'R',
    fxFromUsd: 18.2,
    salaryMultiplier: 7.4,
    vatNote: 'Local ZAR corporate billing aligned to SAST cohorts',
    hubHref: '/za',
  },
  {
    code: 'us',
    label: 'United States & Canada (EST / PST)',
    currency: 'USD',
    symbol: '$',
    fxFromUsd: 1.0,
    salaryMultiplier: 1.0,
    vatNote: 'Tax-exempt educational voucher bundles available for teams',
    hubHref: '/courses',
  },
  {
    code: 'in',
    label: 'India & APAC (Bengaluru / Mumbai)',
    currency: 'INR',
    symbol: '₹',
    fxFromUsd: 84.0,
    salaryMultiplier: 18.5,
    vatNote: 'GST tax invoicing & emerging-market Pearson VUE exam pricing',
    hubHref: '/courses',
  },
];

export interface CalculatorCourseSpec {
  id: string;
  name: string;
  examCode: string;
  vendor: string;
  voucherUsd: number;
  retakeBundleUsd: number;
  trainingUsd: number;
  baseSalaryMinUsd: number;
  baseSalaryMaxUsd: number;
  avgSalaryUpliftPct: number;
  courseHref: string;
}

export const CALCULATOR_COURSES: CalculatorCourseSpec[] = [
  {
    id: 'security-plus',
    name: 'CompTIA Security+ Certification',
    examCode: 'SY0-701',
    vendor: 'CompTIA',
    voucherUsd: 404,
    retakeBundleUsd: 569,
    trainingUsd: 899,
    baseSalaryMinUsd: 78000,
    baseSalaryMaxUsd: 112000,
    avgSalaryUpliftPct: 24,
    courseHref: '/course/course-comptia-security-plus',
  },
  {
    id: 'azure-104',
    name: 'Microsoft Azure Administrator',
    examCode: 'AZ-104',
    vendor: 'Microsoft',
    voucherUsd: 165,
    retakeBundleUsd: 264,
    trainingUsd: 949,
    baseSalaryMinUsd: 94000,
    baseSalaryMaxUsd: 134000,
    avgSalaryUpliftPct: 28,
    courseHref: '/course/course-azure-104',
  },
  {
    id: 'aws-saa',
    name: 'AWS Solutions Architect Associate',
    examCode: 'SAA-C03',
    vendor: 'AWS',
    voucherUsd: 150,
    retakeBundleUsd: 240,
    trainingUsd: 999,
    baseSalaryMinUsd: 105000,
    baseSalaryMaxUsd: 148000,
    avgSalaryUpliftPct: 31,
    courseHref: '/course/course-aws-solutions',
  },
  {
    id: 'pl-300',
    name: 'Microsoft Power BI Data Analyst',
    examCode: 'PL-300',
    vendor: 'Microsoft',
    voucherUsd: 165,
    retakeBundleUsd: 264,
    trainingUsd: 849,
    baseSalaryMinUsd: 82000,
    baseSalaryMaxUsd: 118000,
    avgSalaryUpliftPct: 23,
    courseHref: '/course/course-ms-pl-300',
  },
  {
    id: 'network-plus',
    name: 'CompTIA Network+ Certification',
    examCode: 'N10-009',
    vendor: 'CompTIA',
    voucherUsd: 369,
    retakeBundleUsd: 525,
    trainingUsd: 799,
    baseSalaryMinUsd: 68000,
    baseSalaryMaxUsd: 96000,
    avgSalaryUpliftPct: 21,
    courseHref: '/course/course-comptia-network-plus',
  },
  {
    id: 'cka',
    name: 'Certified Kubernetes Administrator',
    examCode: 'CKA',
    vendor: 'CNCF / Linux',
    voucherUsd: 395,
    retakeBundleUsd: 395,
    trainingUsd: 1099,
    baseSalaryMinUsd: 118000,
    baseSalaryMaxUsd: 162000,
    avgSalaryUpliftPct: 34,
    courseHref: '/course/course-kubernetes-cka',
  },
  {
    id: 'ai-102',
    name: 'Azure AI Engineer Associate',
    examCode: 'AI-102',
    vendor: 'Microsoft',
    voucherUsd: 165,
    retakeBundleUsd: 264,
    trainingUsd: 999,
    baseSalaryMinUsd: 115000,
    baseSalaryMaxUsd: 158000,
    avgSalaryUpliftPct: 36,
    courseHref: '/course/course-ms-ai-102',
  },
  {
    id: 'a-plus',
    name: 'CompTIA A+ Core 1 & Core 2 (2 Exams)',
    examCode: '220-1201/1202',
    vendor: 'CompTIA',
    voucherUsd: 506,
    retakeBundleUsd: 720,
    trainingUsd: 749,
    baseSalaryMinUsd: 55000,
    baseSalaryMaxUsd: 78000,
    avgSalaryUpliftPct: 19,
    courseHref: '/course/course-comptia-a-plus',
  },
];
