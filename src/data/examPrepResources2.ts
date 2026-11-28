import { CheatSheetSection } from '../types';

export const IPV4_SUBNETTING_CIDR_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'ipv4-cidr-reference-table',
    title: 'IPv4 CIDR & Subnet Mask Quick Reference (/16 to /32)',
    subtitle:
      'Memorize these 17 CIDR boundaries for CompTIA Network+ (N10-009), Cisco CCNA (200-301), Azure VNets, and AWS VPC subnet planning.',
    headers: ['CIDR', 'Subnet Mask', 'Wildcard Mask (ACL/OSPF)', 'Total IPs / Usable Hosts'],
    rows: [
      { cells: ['/16', '255.255.0.0', '0.0.255.255', '65,536 total / 65,534 usable'], copyText: '/16 255.255.0.0 wildcard 0.0.255.255' },
      { cells: ['/20', '255.255.240.0', '0.0.15.255', '4,096 total / 4,094 usable'], copyText: '/20 255.255.240.0 wildcard 0.0.15.255' },
      { cells: ['/21', '255.255.248.0', '0.0.7.255', '2,048 total / 2,046 usable'], copyText: '/21 255.255.248.0 wildcard 0.0.7.255' },
      { cells: ['/22', '255.255.252.0', '0.0.3.255', '1,024 total / 1,022 usable'], copyText: '/22 255.255.252.0 wildcard 0.0.3.255' },
      { cells: ['/23', '255.255.254.0', '0.0.1.255', '512 total / 510 usable'], copyText: '/23 255.255.254.0 wildcard 0.0.1.255' },
      { cells: ['/24', '255.255.255.0', '0.0.0.255', '256 total / 254 usable (251 AWS/Azure)'], copyText: '/24 255.255.255.0 wildcard 0.0.0.255' },
      { cells: ['/25', '255.255.255.128', '0.0.0.127', '128 total / 126 usable'], copyText: '/25 255.255.255.128 wildcard 0.0.0.127' },
      { cells: ['/26', '255.255.255.192', '0.0.0.63', '64 total / 62 usable'], copyText: '/26 255.255.255.192 wildcard 0.0.0.63' },
      { cells: ['/27', '255.255.255.224', '0.0.0.31', '32 total / 30 usable (Azure Firewall/Gateway min)'], copyText: '/27 255.255.255.224 wildcard 0.0.0.31' },
      { cells: ['/28', '255.255.255.240', '0.0.0.15', '16 total / 14 usable (11 AWS/Azure)'], copyText: '/28 255.255.255.240 wildcard 0.0.0.15' },
      { cells: ['/29', '255.255.255.248', '0.0.0.7', '8 total / 6 usable (Small Transit Link)'], copyText: '/29 255.255.255.248 wildcard 0.0.0.7' },
      { cells: ['/30', '255.255.255.252', '0.0.0.3', '4 total / 2 usable (Classic Router P2P)'], copyText: '/30 255.255.255.252 wildcard 0.0.0.3' },
      { cells: ['/31', '255.255.255.254', '0.0.0.1', '2 total / 2 P2P hosts (RFC 3021 Point-to-Point)'], copyText: '/31 255.255.255.254 RFC3021' },
      { cells: ['/32', '255.255.255.255', '0.0.0.0', '1 Host Route (/32 Loopback or Firewall Rule)'], copyText: '/32 255.255.255.255 host route' },
    ],
  },
  {
    id: 'cloud-reserved-ips',
    title: 'Cloud Reserved IPs Rule (Azure vs AWS vs On-Premises)',
    subtitle: 'Why cloud subnet planning differs from Cisco CCNA textbook math.',
    headers: ['Environment', 'Reserved IPs per Subnet', 'Practical Example (`/28` = 16 IPs)'],
    rows: [
      { cells: ['Traditional On-Premises (RFC)', '2 IPs (Network + Broadcast)', '14 usable host IPs'], copyText: 'RFC usable hosts = 2^n - 2' },
      { cells: ['AWS VPC Subnets', '5 IPs (.0 Net, .1 Router, .2 DNS, .3 Future, .255 Bcast)', '11 usable EC2/ENI IPs (min VPC subnet /28)'], copyText: 'AWS VPC reserves 5 IPs per subnet' },
      { cells: ['Microsoft Azure VNet Subnets', '5 IPs (First 4 + Last 1 broadcast)', '11 usable VM/NIC IPs (min practical /29 = 3)'], copyText: 'Azure VNet reserves 5 IPs per subnet' },
    ],
  },
];

export const LINUX_NETWORKING_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'linux-ip-sockets',
    title: 'Interface Inspection, Routing & Live Socket Diagnostics',
    subtitle: 'Modern iproute2 commands tested in CompTIA Linux+, Network+, Kubernetes CKA, and cloud SRE interviews.',
    headers: ['Objective', 'Modern Linux Command', 'Legacy Replacement / Note'],
    rows: [
      { cells: ['List IPv4/IPv6 interface addresses', 'ip -br a', 'Replaces deprecated ifconfig'], copyText: 'ip -br a' },
      { cells: ['Inspect routing table & default gateway', 'ip route show', 'Check src IP & metric priority (replaces route -n)'], copyText: 'ip route show' },
      { cells: ['Check listening TCP/UDP ports + PIDs', 'sudo ss -tulnp', 'Faster replacement for deprecated netstat -tulnp'], copyText: 'sudo ss -tulnp' },
      { cells: ['Inspect local ARP / Neighbor MAC table', 'ip neigh show', 'Verify Layer 2 reachability on local subnet'], copyText: 'ip neigh show' },
      { cells: ['Trace DNS resolution path step-by-step', 'dig +trace learnify-solutions.com', 'Verify authoritative NS & A/AAAA records cleanly'], copyText: 'dig +trace learnify-solutions.com' },
      { cells: ['Test HTTPS TLS handshake & headers', 'curl -Iv https://example.com', 'Inspect HTTP status, TLS version & cert expiry'], copyText: 'curl -Iv https://example.com' },
      { cells: ['Verify open remote TCP port via nc', 'nc -zv 10.0.1.25 5432', 'Tests firewall / NSG reachability cleanly'], copyText: 'nc -zv 10.0.1.25 5432' },
    ],
  },
  {
    id: 'linux-packet-capture-systemd',
    title: 'Packet Capture (tcpdump), Firewalls & Service Logs',
    subtitle: 'Essential root-cause commands for production incident triage.',
    headers: ['Objective', 'Linux CLI Command', 'Operational Tip'],
    rows: [
      { cells: ['Capture port 443 traffic to PCAP file', 'sudo tcpdump -i eth0 port 443 -nn -w capture.pcap', '-nn skips DNS lookup so capture never drops packets'], copyText: 'sudo tcpdump -i eth0 port 443 -nn -w capture.pcap' },
      { cells: ['Combine live packet read on ICMP/DNS', 'sudo tcpdump -i any -nn icmp or port 53', 'Great for verifying asymmetric routing or DNS failures'], copyText: 'sudo tcpdump -i any -nn icmp or port 53' },
      { cells: ['Tail systemd service errors in real time', 'sudo journalctl -u nginx -f --since "15 minutes ago"', 'Instant visibility into crashed daemons'], copyText: 'sudo journalctl -u nginx -f --since "15 minutes ago"' },
      { cells: ['Inspect active firewalld rules', 'sudo firewall-cmd --list-all', 'RHEL / Rocky Linux firewall verification'], copyText: 'sudo firewall-cmd --list-all' },
      { cells: ['Inspect UFW firewall rules on Ubuntu', 'sudo ufw status verbose', 'Verify allowed ingress ports and default policy'], copyText: 'sudo ufw status verbose' },
      { cells: ['Show top memory/CPU consuming processes', 'ps aux --sort=-%mem | head -n 15', 'Quickly isolates OOM candidates before CKA node drains'], copyText: 'ps aux --sort=-%mem | head -n 15' },
    ],
  },
];

export const TERRAFORM_IAC_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'terraform-core-lifecycle',
    title: 'Core Terraform Lifecycle, State & Drift Commands',
    subtitle: 'Standard HashiCorp Terraform CLI commands used across AWS, Azure, GCP, and Kubernetes DevOps pipelines.',
    headers: ['Workflow Stage', 'Terraform CLI Command', 'Exam / Production Caution'],
    rows: [
      { cells: ['Initialize providers & remote backend', 'terraform init -upgrade', 'Run after adding new modules or bumping provider constraints'], copyText: 'terraform init -upgrade' },
      { cells: ['Format HCL files recursively', 'terraform fmt -recursive -check', 'Enforce CI formatting before PR merge'], copyText: 'terraform fmt -recursive -check' },
      { cells: ['Validate HCL syntax without cloud APIs', 'terraform validate', 'Fast pre-commit check after variable edits'], copyText: 'terraform validate' },
      { cells: ['Preview execution plan safely to file', 'terraform plan -out=tfplan', 'Saves deterministic plan so apply executes exact changes'], copyText: 'terraform plan -out=tfplan' },
      { cells: ['Apply saved plan without drift surprises', 'terraform apply tfplan', 'Recommended pattern for CI/CD production gates'], copyText: 'terraform apply tfplan' },
      { cells: ['Destroy only a targeted resource (careful)', 'terraform destroy -target=aws_instance.sandbox', 'Avoid `-target` in daily workflows; reserve for broken resources'], copyText: 'terraform destroy -target=aws_instance.sandbox' },
    ],
  },
  {
    id: 'terraform-state-refactoring',
    title: 'State Inspection, Locking & Zero-Downtime Refactoring',
    subtitle: 'Safely rename resources, import legacy cloud assets, and debug remote state locks.',
    headers: ['Task', 'Terraform Command', 'Production Safety Note'],
    rows: [
      { cells: ['List all tracked resources in state', 'terraform state list', 'Verify exact module addresses before refactoring'], copyText: 'terraform state list' },
      { cells: ['Rename resource in state without destroying', 'terraform state mv aws_s3_bucket.old aws_s3_bucket.new', 'Or use declarative `moved {}` block in HCL (v1.1+)'], copyText: 'terraform state mv aws_s3_bucket.old aws_s3_bucket.new' },
      { cells: ['Import existing cloud resource into state', 'terraform import azurerm_resource_group.rg /subscriptions/.../resourceGroups/prod', 'Or use Terraform 1.5+ declarative `import {}` block'], copyText: 'terraform import azurerm_resource_group.rg /subscriptions/.../resourceGroups/prod' },
      { cells: ['Detect configuration drift without changes', 'terraform plan -refresh-only', 'Reconciles manual portal edits back into state safely'], copyText: 'terraform plan -refresh-only' },
      { cells: ['Switch or isolate env workspaces', 'terraform workspace select prod || terraform workspace new prod', 'Isolates state files per environment cleanly'], copyText: 'terraform workspace select prod || terraform workspace new prod' },
    ],
  },
];

export const POWER_BI_PL_300_DAX_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'pl300-dax-core-time-intelligence',
    title: 'Essential Power BI (PL-300) DAX Context & Time Intelligence Formulas',
    subtitle:
      'Top evaluation-context and date-table DAX expressions tested heavily on Microsoft PL-300 simulations and live analytics interviews.',
    headers: ['Analytics Requirement', 'Copy-Ready DAX Pattern', 'PL-300 Exam Rule'],
    rows: [
      {
        cells: [
          'Modify filter context cleanly',
          'CALCULATE(SUM(Sales[Amount]), Sales[Region] = "EMEA")',
          'Evaluates inner filter predicates before transitioning row context',
        ],
        copyText: 'CALCULATE(SUM(Sales[Amount]), Sales[Region] = "EMEA")',
      },
      {
        cells: [
          'Percent of grand total (ignore page slicers)',
          'DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(Sales)))',
          'Use DIVIDE() to avoid divide-by-zero errors; REMOVEFILTERS clears table filters',
        ],
        copyText: 'DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(Sales)))',
      },
      {
        cells: [
          'Prior-year comparison (YoY)',
          'CALCULATE([Total Sales], SAMEPERIODLASTYEAR(\'Date\'[Date]))',
          'Requires continuous marked Date table with unique daily dates',
        ],
        copyText: "CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))",
      },
      {
        cells: [
          'Year-to-date running revenue',
          'TOTALYTD([Total Sales], \'Date\'[Date], "31-12")',
          'Shortcut for CALCULATE([Total Sales], DATESYTD(\'Date\'[Date]))',
        ],
        copyText: "TOTALYTD([Total Sales], 'Date'[Date])",
      },
      {
        cells: [
          'Activate inactive ShipDate relationship',
          'CALCULATE([Total Sales], USERELATIONSHIP(\'Date\'[Date], Sales[ShipDate]))',
          'Solves role-playing dimension conflicts without duplicating Date tables',
        ],
        copyText: "CALCULATE([Total Sales], USERELATIONSHIP('Date'[Date], Sales[ShipDate]))",
      },
      {
        cells: [
          'Row-by-row iterator aggregation',
          'SUMX(Sales, Sales[Qty] * Sales[NetPrice])',
          'Prefer SUMX over calculated columns to keep VertiPaq RAM size small',
        ],
        copyText: 'SUMX(Sales, Sales[Qty] * Sales[NetPrice])',
      },
      {
        cells: [
          'Dynamic Row-Level Security (RLS)',
          '[EmployeeEmail] = USERPRINCIPALNAME()',
          'Maps logged-in Microsoft Entra ID / Power BI Service UPN dynamically',
        ],
        copyText: '[EmployeeEmail] = USERPRINCIPALNAME()',
      },
    ],
  },
  {
    id: 'pl300-modeling-pricing-2026',
    title: 'PL-300 Data Modeling Rules & 2026 Global Certification Pricing ($165)',
    subtitle:
      'Star schema modeling best practices plus official 2026 Power BI (PL-300) exam fees and corporate training quote benchmarks.',
    headers: ['Topic / Billing Item', 'PL-300 Rule / 2026 Price', 'Optimization / Quote Note'],
    rows: [
      {
        cells: [
          'Star Schema Direction',
          '1-to-Many (Single Direction) Dimension -> Fact',
          'Avoid Many-to-Many or Bi-directional cross-filtering unless strictly modeled',
        ],
        copyText: 'Star Schema: 1-to-Many single-direction Dimension to Fact',
      },
      {
        cells: [
          'Power Query Folding Check',
          'Right-click Step -> View Native Query',
          'Keep filters/joins before custom Python or indexing steps so SQL server folds',
        ],
        copyText: 'Right-click Power Query applied step -> View Native Query',
      },
      {
        cells: [
          'Official PL-300 Exam Fee (US / Global)',
          '$165 USD (Pearson VUE / OnVUE)',
          'Applies to US & standard USD regions; voucher bundles save on retakes',
        ],
        copyText: 'Microsoft PL-300 Official Exam Fee: $165 USD',
      },
      {
        cells: [
          'UK, Europe & UAE PL-300 Exam Pricing',
          '£113 GBP (UK) · €155 EUR (EU/DE) · AED 605 (UAE)',
          'Regional VAT/GST applies at checkout; corporate POs accepted by Learnify',
        ],
        copyText: 'PL-300 Regional Pricing: £113 GBP | €155 EUR | AED 605 | ₹4,800 INR',
      },
      {
        cells: [
          'Live PL-300 Bootcamp & Corporate Quote',
          '$849 Individual / Custom 5+ Seat Corporate PO Rate',
          'Includes 24 hrs instructor-led DAX & Power Query labs + 24/7 sandbox + mock tests',
        ],
        copyText: 'Power BI PL-300 Corporate Training Quote: multi-seat POs in USD, GBP, EUR, AED, ZAR',
      },
    ],
  },
];

export const AZURE_AZ_104_LAB_CLI_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'az104-machine-hardware-requirements',
    title: 'Microsoft AZ-104 Machine & Laptop Requirements (No Local VM Needed)',
    subtitle:
      'Exact PC specs needed to run Azure Administrator (AZ-104) labs — answering both global learners and German queries ("mit welcher Maschine kann man den AZ-104 Kurs durchführen?").',
    headers: ['Requirement Area', 'Minimum Hardware / Browser Spec', 'How Learnify Labs Run'],
    rows: [
      {
        cells: [
          'Operating System & Laptop (Global)',
          'Any Windows 10/11, macOS, Ubuntu Linux, or Chromebook',
          '100% browser-based via Azure Portal & Learnify 24/7 Cloud Sandbox',
        ],
        copyText: 'AZ-104 Laptop Spec: Any Windows 10/11, macOS, or Linux laptop with Chrome/Edge',
      },
      {
        cells: [
          'RAM, CPU & Local Virtual Machines',
          '4–8 GB RAM, Dual-Core CPU, 10 Mbps Internet (ZERO local VMs)',
          'No Hyper-V, VirtualBox, or local Windows Server ISOs required—compute runs in Azure',
        ],
        copyText: 'No local VM needed for AZ-104—all VMs, VNets & AKS run inside Azure Cloud Sandbox',
      },
      {
        cells: [
          'Deutsch / DACH Hinweis (Welche Maschine?)',
          'Jeder Standard-Laptop (Windows/Mac) mit Chrome oder Edge',
          'Keine lokale VM oder starke Hardware nötig — 24/7 Cloud Sandbox & Azure Cloud Shell inklusive',
        ],
        copyText: 'AZ-104 Deutschland Hinweis: Jeder Standard-Laptop reicht, keine lokale VM erforderlich',
      },
      {
        cells: [
          'Azure Terminal & CLI Environment',
          'Built-in Azure Cloud Shell (Bash + PowerShell)',
          'Pre-authenticated az CLI 2.x and Az PowerShell module right inside your browser',
        ],
        copyText: 'Azure Cloud Shell includes az CLI and Az PowerShell in-browser',
      },
    ],
  },
  {
    id: 'az104-cli-powershell-commands',
    title: 'High-Frequency Azure CLI (az) & PowerShell Commands for AZ-104',
    subtitle:
      'Copy-ready commands for Resource Groups, Virtual Networks, VMs, Storage Accounts, RBAC, and Entra ID tested in AZ-104.',
    headers: ['Admin Task', 'Azure CLI / PowerShell Command', 'Exam / Lab Note'],
    rows: [
      {
        cells: [
          'Create Resource Group in Frankfurt / UK',
          'az group create --name rg-prod --location germanywestcentral',
          'Use uksouth, westeurope, or uaenorth depending on data residency',
        ],
        copyText: 'az group create --name rg-prod --location germanywestcentral',
      },
      {
        cells: [
          'Deploy VNet + Subnet cleanly',
          'az network vnet create -g rg-prod -n vnet-core --address-prefix 10.10.0.0/16 --subnet-name snet-app --subnet-prefix 10.10.1.0/24',
          'Azure reserves 5 IPs per subnet automatically',
        ],
        copyText: 'az network vnet create -g rg-prod -n vnet-core --address-prefix 10.10.0.0/16 --subnet-name snet-app --subnet-prefix 10.10.1.0/24',
      },
      {
        cells: [
          'Provision Ubuntu VM with SSH Keys',
          'az vm create -g rg-prod -n vm-web01 --image Ubuntu2204 --size Standard_B2s --generate-ssh-keys',
          'Verify NSG port 22 or Azure Bastion before connecting',
        ],
        copyText: 'az vm create -g rg-prod -n vm-web01 --image Ubuntu2204 --size Standard_B2s --generate-ssh-keys',
      },
      {
        cells: [
          'Assign RBAC Role at Resource Group Scope',
          'az role assignment create --assignee user@domain.com --role "Virtual Machine Contributor" --scope /subscriptions/<SUB_ID>/resourceGroups/rg-prod',
          'Never grant Owner unless user must manage RBAC permissions',
        ],
        copyText: 'az role assignment create --assignee user@domain.com --role "Virtual Machine Contributor" --scope /subscriptions/<SUB_ID>/resourceGroups/rg-prod',
      },
      {
        cells: [
          'Create ZRS/GRS Storage Account (TLS 1.2)',
          'az storage account create -g rg-prod -n stproddata01 -l germanywestcentral --sku Standard_ZRS --min-tls-version TLS1_2',
          'Name must be 3-24 lowercase letters/numbers, globally unique',
        ],
        copyText: 'az storage account create -g rg-prod -n stproddata01 -l germanywestcentral --sku Standard_ZRS --min-tls-version TLS1_2',
      },
      {
        cells: [
          'Deploy Bicep / ARM Template Incrementally',
          'az deployment group create -g rg-prod --template-file main.bicep --mode Incremental',
          'Avoid --mode Complete unless you intend to delete unlisted resources',
        ],
        copyText: 'az deployment group create -g rg-prod --template-file main.bicep --mode Incremental',
      },
      {
        cells: [
          'PowerShell: Create Resource Group + VNet',
          'New-AzResourceGroup -Name "rg-prod" -Location "uksouth"',
          'Exam questions switch freely between az CLI and Az PowerShell syntax',
        ],
        copyText: 'New-AzResourceGroup -Name "rg-prod" -Location "uksouth"',
      },
      {
        cells: [
          'PowerShell: Prevent Accidental Deletion (Lock)',
          'New-AzResourceLock -LockLevel CanNotDelete -LockName "lock-prod" -ResourceGroupName "rg-prod"',
          'CanNotDelete allows config updates/reads while blocking Delete calls',
        ],
        copyText: 'New-AzResourceLock -LockLevel CanNotDelete -LockName "lock-prod" -ResourceGroupName "rg-prod"',
      },
    ],
  },
];

export const ENTERPRISE_ROUTING_SWITCHING_SECURITY_CLI_CHEAT_SHEET: CheatSheetSection[] = [
  {
    id: 'l2-vlan-rstp-cli',
    title: 'Layer 2 Switching, 802.1Q Trunking, EtherChannel & RSTP Verification',
    subtitle:
      'Essential campus switching verification commands for 802.1Q trunks, native VLAN consistency, LACP bundling, and Spanning Tree root inspection.',
    headers: ['Troubleshooting Goal', 'IOS / Enterprise Switch CLI', 'Lab & Exam Verification Note'],
    rows: [
      {
        cells: [
          'Inspect 802.1Q Trunk Allowed VLANs & Native VLAN',
          'show interfaces trunk',
          'Verify Mode (on/desirable), Encapsulation (802.1q), Status (trunking), and Native VLAN match both sides',
        ],
        copyText: 'show interfaces trunk',
      },
      {
        cells: [
          'Check Spanning Tree Root Bridge & Port Roles',
          'show spanning-tree vlan 10',
          'Confirm lowest Bridge ID owns Root; verify Designated vs Root vs Alternate/Blocking port states',
        ],
        copyText: 'show spanning-tree vlan 10',
      },
      {
        cells: [
          'Verify LACP / PAgP Port-Channel Bundle Health',
          'show etherchannel summary',
          'Look for (SU) = Layer 2 In Use and (P) = Bundled in port-channel; (I) indicates standalone mismatch',
        ],
        copyText: 'show etherchannel summary',
      },
      {
        cells: [
          'Inspect Switch MAC Address Table by VLAN',
          'show mac address-table vlan 20',
          'Confirms physical port learning and helps pinpoint asymmetric Layer 2 loops',
        ],
        copyText: 'show mac address-table vlan 20',
      },
    ],
  },
  {
    id: 'l3-ospf-bgp-vrf-sdwan-cli',
    title: 'OSPF, BGP, VRF & SD-WAN Control Plane Verification (CCNA / ENCOR / ENARSI / ENSDWI)',
    subtitle:
      'Fast diagnostic commands for routing tables, OSPF adjacency states, eBGP prefix exchange, VRF isolation, and SD-WAN OMP peering.',
    headers: ['Routing / Overlay Check', 'Verification CLI Command', 'Diagnostic Clues'],
    rows: [
      {
        cells: [
          'Verify Longest Prefix Match & Administrative Distance',
          'show ip route',
          'Remember: longest prefix (/28 beats /24) always wins before Administrative Distance (OSPF 110, eBGP 20)',
        ],
        copyText: 'show ip route',
      },
      {
        cells: [
          'Confirm OSPF Adjacency State (FULL / DR / BDR)',
          'show ip ospf neighbor',
          'Stuck in EXSTART/EXCHANGE usually indicates MTU mismatch; stuck in INIT signals one-way ACL or hello drop',
        ],
        copyText: 'show ip ospf neighbor',
      },
      {
        cells: [
          'Inspect BGP Peer Session & Received Prefix Count',
          'show ip bgp summary',
          'State showing a number = Established + prefixes received; Idle/Active indicates TCP 179 or neighbor IP failure',
        ],
        copyText: 'show ip bgp summary',
      },
      {
        cells: [
          'Inspect Isolated VRF Routing Table',
          'show ip route vrf CORP-WAN',
          'Prevents cross-tenant routing leaks in multi-VRF enterprise and MPLS L3VPN cores',
        ],
        copyText: 'show ip route vrf CORP-WAN',
      },
      {
        cells: [
          'SD-WAN: Verify Control Connections (vSmart / vBond / vManage)',
          'show sdwan control connections',
          'Confirms DTLS/TLS control tunnels across WAN TLOC transports are Up before checking OMP routes',
        ],
        copyText: 'show sdwan control connections',
      },
      {
        cells: [
          'SD-WAN: Inspect OMP Routes & TLOC Next-Hops',
          'show sdwan omp routes',
          'C,R,I status flags confirm Chosen, Resolved, and Installed overlay service paths',
        ],
        copyText: 'show sdwan omp routes',
      },
    ],
  },
  {
    id: 'security-dot1x-ipsec-acl-cli',
    title: 'Network Security, IKEv2 IPsec VPN, NAT & 802.1X NAC Troubleshooting (SCOR / SISE)',
    subtitle:
      'Command-line checks for 802.1X switchport authentication, IKEv2 crypto tunnels, ACL hit counters, and PAT translations.',
    headers: ['Security Domain', 'Verification Command', 'Operational Insight'],
    rows: [
      {
        cells: [
          'Verify 802.1X & MAB Switchport Auth Sessions',
          'show authentication sessions interface Gi1/0/10 details',
          'Confirms EAP-TLS / MAB Authc Success, dACL pushed from RADIUS, and Security Group Tag (SGT)',
        ],
        copyText: 'show authentication sessions interface Gi1/0/10 details',
      },
      {
        cells: [
          'Check IKEv2 Phase 1 & Phase 2 Crypto Tunnels',
          'show crypto ikev2 sa detail && show crypto ipsec sa',
          'Verify READY state plus incrementing #pkts encaps / #pkts decaps counters on both tunnel peers',
        ],
        copyText: 'show crypto ikev2 sa detail',
      },
      {
        cells: [
          'Inspect ACL Permit/Deny Packet Match Counters',
          'show access-lists',
          'Remember implicit deny any at the bottom of every ACL; check match increments live during ping tests',
        ],
        copyText: 'show access-lists',
      },
      {
        cells: [
          'Verify Active NAT / PAT Translations',
          'show ip nat translations',
          'Confirms Inside Local -> Inside Global source translation across enterprise internet edges',
        ],
        copyText: 'show ip nat translations',
      },
    ],
  },
];

export const CISCO_NETWORK_INTERVIEW_QA: import('../types').InterviewQaItem[] = [
  {
    id: 'cisco-int-1',
    category: 'Switching & Layer 2',
    question:
      'Explain the exact difference between 802.1Q Native VLAN mismatches and Trunk Allowed-VLAN mismatches in production.',
    answer:
      'A Native VLAN mismatch sends untagged frames into the wrong broadcast domain across a trunk link (triggering CDP warnings and STP BPDUs landing on mismatched VLANs—a major VLAN-hopping security risk). An Allowed-VLAN mismatch silently drops tagged traffic for any VLAN permitted on Switch A but omitted on Switch B.',
    followUpTip:
      'Always mention running `show interfaces trunk` and assigning an unused dummy Native VLAN (e.g., VLAN 999) rather than keeping VLAN 1.',
  },
  {
    id: 'cisco-int-2',
    category: 'Switching & Layer 2',
    question:
      'How do Root Guard, BPDU Guard, and Loop Guard protect Spanning Tree topologies differently?',
    answer:
      'BPDU Guard shuts down (`err-disabled`) PortFast edge/user ports if ANY BPDU arrives. Root Guard allows BPDUs on distribution-to-access uplinks while blocking superior BPDUs (`root-inconsistent`) so an unauthorized switch cannot hijack Root Bridge status. Loop Guard prevents Alternate/Blocking ports from unexpectedly transitioning to Forwarding if unidirectional fiber failure stops incoming BPDUs.',
    followUpTip:
      'Never enable BPDU Guard on inter-switch trunk links—reserve it for access ports only.',
  },
  {
    id: 'cisco-int-3',
    category: 'OSPF & Routing',
    question:
      'Your OSPF routers are stuck in `EXSTART / EXCHANGE` state cleanly after Initial Hello discovery. What are the top 2 causes?',
    answer:
      'Over 90% of OSPF EXSTART/EXCHANGE stalls are caused by an L3 MTU mismatch between the two router interfaces (one side 1500, the other 9000/1550) preventing Database Description (DBD) packets from exchanging. The second common cause is duplicate OSPF Router IDs or asymmetric Layer 2 unicast packet loss.',
    followUpTip:
      'Confirm MTU on both sides with `show interfaces` (`ip mtu 1500`) rather than masking it with `ip ospf mtu-ignore` unless temporary.',
  },
  {
    id: 'cisco-int-4',
    category: 'OSPF & Routing',
    question:
      'Compare OSPF Type-1, Type-2, Type-3, Type-5, and Type-7 LSAs concisely.',
    answer:
      'Type-1 (Router LSA) and Type-2 (Network LSA for DR segments) flood strictly inside a single area. Type-3 (Summary LSA) is generated by ABRs to summarize prefixes between areas. Type-5 (AS-External LSA) carries redistributed external routes everywhere except Stub/NSSA areas. Type-7 is generated inside an NSSA ASBR and translated into Type-5 by the NSSA ABR.',
    followUpTip:
      'Also cite E1 vs E2 external metrics: E1 adds internal path cost as it traverses the AS, whereas E2 keeps only the fixed external seed cost (default 20).',
  },
  {
    id: 'cisco-int-5',
    category: 'BGP & ISP Peering',
    question:
      'Walk through the top BGP Best Path Selection attributes in exact tie-breaking order.',
    answer:
      'After checking next-hop reachability: (1) Highest Weight (Cisco local), (2) Highest Local Preference (AS-wide outbound), (3) Locally originated route (`network`/`aggregate`/`redistribute`), (4) Shortest AS-Path, (5) Lowest Origin code (`i` < `e` < `?`), (6) Lowest MED (inbound from neighboring AS), (7) eBGP preferred over iBGP, (8) Lowest IGP metric to BGP next-hop.',
    followUpTip:
      'Remember the practical design rule: use Local Preference for outbound AS-wide steering and AS-Path Prepending / MED to influence inbound traffic from ISPs.',
  },
  {
    id: 'cisco-int-6',
    category: 'BGP & ISP Peering',
    question:
      'Why does an eBGP session establish instantly between directly connected interfaces while loopback-to-loopback eBGP fails unless extra commands are added?',
    answer:
      'Standard eBGP sends packets with IP TTL = 1. When peering to a remote router’s Loopback0 (`update-source Loopback0`), routing requires traversing an extra internal hop (`TTL` decrements at the peer interface), dropping the packet unless `ebgp-multihop 2` (or higher) or `disable-connected-check` is configured.',
    followUpTip:
      'Always verify static/IGP reachability to the peer loopback first—otherwise BGP stays stuck in `Active` or `Idle`.',
  },
  {
    id: 'cisco-int-7',
    category: 'Redistribution & ENARSI',
    question:
      'When redistributing routes mutually between OSPF and EIGRP/BGP on two dual-homed distribution routers, how do you prevent routing loops?',
    answer:
      'Tag routes inbound/outbound via `route-map` (`set tag 110` going from OSPF->EIGRP and `deny` tag 110 coming back; `set tag 90` from EIGRP->OSPF and `deny` tag 90 returning). Pair route tagging with explicit prefix-lists and lower AD adjustments where needed so external prefixes never loop back across the redundant ASBR.',
    followUpTip:
      'Run `show ip route <prefix>` on both ASBRs after failovers to prove the next-hop points out toward the true origin domain, not across the second ASBR.',
  },
  {
    id: 'cisco-int-8',
    category: 'SD-WAN (ENSDWI)',
    question:
      'Explain the separate roles of vManage, vSmart, vBond, and WAN Edge in Cisco SD-WAN.',
    answer:
      'vManage is the single-pane management/GUI/API plane for templates and monitoring. vSmart is the centralized control plane running OMP policies over DTLS/TLS without carrying user data. vBond is the orchestration plane authenticating WAN Edges at Zero-Touch onboarding. WAN Edge routers form the data plane building full-mesh IPsec tunnels between TLOCs.',
    followUpTip:
      'Highlight control/data separation: even if vManage and vSmart go offline temporarily, WAN Edges continue forwarding traffic using cached OMP routes until graceful-restart timers expire.',
  },
  {
    id: 'cisco-int-9',
    category: 'SD-WAN (ENSDWI)',
    question:
      'How does SD-WAN Application-Aware Routing (AAR) react faster than traditional OSPF/BGP during ISP brownouts?',
    answer:
      'Traditional routing only fails over when a physical link drops or hello timers expire completely—meaning a 300ms-latency / 5%-packet-loss "brownout" keeps routing calls over a degraded MPLS circuit. SD-WAN measures real-time BFD loss, latency, and jitter inside every TLOC tunnel and shifts critical applications to the healthy broadband/LTE TLOC automatically.',
    followUpTip:
      'Always clarify that if NO transport meets the SLA class, you can choose fallback to default SLA or drop/strict enforcement.',
  },
  {
    id: 'cisco-int-10',
    category: 'Security & ISE (SISE / SCOR)',
    question:
      'Walk through the difference between 802.1X EAP-TLS, PEAP-MSCHAPv2, and MAB in a Cisco ISE campus network.',
    answer:
      'EAP-TLS uses mutual X.509 client + server certificates and is the gold standard for domain-joined corporate endpoints with no password prompts. PEAP-MSCHAPv2 wraps inner AD username/password inside a TLS tunnel (requiring only a server certificate on ISE). MAB sends the endpoint’s MAC address as both username/password fallback for headless printers, IP phones, and cameras.',
    followUpTip:
      'Mention ISE Endpoint Profiling + Security Group Tags (SGTs) so profiled MAB cameras get locked strictly to CCTV server subnets.',
  },
  {
    id: 'cisco-int-11',
    category: 'Security & IPsec VPN',
    question:
      'A site-to-site IKEv2 IPsec tunnel drops traffic silently or fails Phase 2 negotiation. How do you isolate the fault systematically?',
    answer:
      'Verify UDP 500 and UDP 4500 (plus ESP Protocol 50) aren’t blocked upstream, confirm `show crypto ikev2 sa detail` reaches `READY` (checking matching encryption/integrity/DH proposals and PSK/certs), then inspect `show crypto ipsec sa` for matching Proxy IDs/traffic selectors (or Tunnel VTI interface up/up) and incrementing `#pkts encaps` AND `#pkts decaps`.',
    followUpTip:
      'If `#pkts encaps` increases while `#pkts decaps` stays at 0, packets are leaving locally but either asymmetric routing, ISP ESP filtering, or a remote NAT rule is dropping return packets.',
  },
  {
    id: 'cisco-int-12',
    category: 'Next-Gen Firewall & CyberOps',
    question:
      'In a SOC or NGFW incident, how do Snort IPS Inline Mode vs Passive IDS Tap Mode behave when detecting an active exploit?',
    answer:
      'Passive IDS / Tap Mode inspects a mirrored SPAN copy of packets and fires syslog/SIEM alerts AFTER packets have already passed to the server. Inline IPS Mode sits directly in the forwarding path—enabling real-time `Drop and Generate Events` / TCP reset containment to block exploits mid-flight before reaching workloads.',
    followUpTip:
      'Explain Prefilter Fastpath vs Access Control Snort policy ordering on Firepower Threat Defense (FTD).',
  },
  {
    id: 'cisco-int-13',
    category: 'Network Automation (ENAUTO / DevNet)',
    question:
      'Compare NETCONF, RESTCONF, and traditional screen-scraping SSH tools like Netmiko when automating 200+ switches.',
    answer:
      'Netmiko/Paramiko SSH automates unstructured CLI commands reliably on legacy IOS hardware where APIs are absent. NETCONF (SSH TCP 830, XML payloads) and RESTCONF (HTTPS TCP 443, JSON/XML) interact directly with structured YANG data models—delivering atomic transactions, candidate-config validation, rollback on error, and zero brittle regex parsing.',
    followUpTip:
      'Mention `Ansible` / `Nornir` / `Terraform` idempotency so running a playbook twice never duplicates VLAN or ACL lines.',
  },
  {
    id: 'cisco-int-14',
    category: 'Data Center (VXLAN / ACI)',
    question:
      'Why did modern data center networks replace Spanning Tree across 3-tier architectures with Spine-Leaf Clos fabrics running VXLAN EVPN?',
    answer:
      '3-tier STP blocks redundant links, capping east-west bandwidth and creating multi-second broadcast storms. Spine-Leaf interconnects every Leaf to every Spine via equal-cost Layer 3 ECMP, achieving predictable 2-hop east-west latency, while BGP EVPN control planes learn MAC/IP VTEP reachability over VXLAN tunnels without flood-and-learn storms.',
    followUpTip:
      'Note Anycast Gateway: every Leaf switch shares the exact same virtual gateway IP and MAC so VMs/containers migrate seamlessly across racks.',
  },
  {
    id: 'cisco-int-15',
    category: 'QoS & VoIP Troubleshooting',
    question:
      'Users complain of robotic audio and choppy Teams/SIP calls during large cloud backups on a 100 Mbps WAN link. How do you fix this?',
    answer:
      'Classify and trust DSCP `EF (46)` for voice RTP and `AF41 (34)` for interactive video at the campus switch edge, configure a strict Priority Low-Latency Queue (LLQ) capped around 20–30% bandwidth, apply Weighted Fair Queuing (`bandwidth remaining percent`) + WRED for bulk data, and enforce traffic shaping (`shape average 95000000`) below the ISP CIR policer rate so the router queues cleanly instead of the ISP dropping packets randomly.',
    followUpTip:
      'Shaping outbound slightly below ISP policer speed (`95%`) is the #1 real-world WAN QoS fix.',
  },
  {
    id: 'cisco-int-16',
    category: 'Troubleshooting Methodology',
    question:
      'A remote branch reports "no internet and ERP is down" after an unannounced maintenance change. Walk through your 3-minute diagnostic plan.',
    answer:
      'Start structured: (1) Verify physical/L2 link & PoE/SFP status (`show interfaces status`), (2) Test local gateway & ARP (`ping <gateway>`, `show ip arp`), (3) Verify WAN/routing adjacencies (`show ip ospf neighbor`, `show ip bgp summary`, `show sdwan control connections`), (4) Check NAT translations, ACL counters (`show access-lists`), and DNS resolution before escalating—separating physical, routing, NAT/firewall, and application layers cleanly.',
    followUpTip:
      'Never blame DNS or Firewall without testing raw IP reachability via `traceroute` and checking interface CRC/input drop counters first.',
  },
];



