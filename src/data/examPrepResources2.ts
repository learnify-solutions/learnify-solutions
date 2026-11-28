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

