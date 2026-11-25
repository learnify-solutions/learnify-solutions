import { PracticeQuestion } from '../types';
import {
  POWER_BI_PL_300_QUESTIONS_EXT,
  NETWORK_PLUS_N10_009_QUESTIONS_EXT,
  AZURE_AI_102_QUESTIONS_EXT,
} from './examPrepQuestionsExt2';

export const POWER_BI_PL_300_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pl300-1',
    domain: 'Model the Data',
    prompt:
      'A Power BI semantic model has a 45-million-row `FactSales` table and a `DimDate` table. Report visuals filtering by Calendar Year display incorrect totals and slow cross-filtering. Inspection shows the relationship uses `One-to-One` with `Both` cross-filter direction and Date is stored as Text. How should you fix the data model?',
    options: [
      'Use proper `Date` data types on both keys, configure a `One-to-Many` (DimDate -> FactSales) relationship, and set Single cross-filter direction',
      'Enable Bi-directional cross-filtering across every table in the model',
      'Merge `FactSales` and `DimDate` into a single flat wide table using DAX',
      'Disable Auto Date/Time only without changing the relationship cardinality',
    ],
    correctIndex: 0,
    explanation:
      'Clean star schemas use `One-to-Many` relationships flowing from dimension (`1`) to fact (`*`) with Single direction cross-filtering and native `Date` keys.',
  },
  {
    id: 'pl300-2',
    domain: 'Model the Data',
    prompt:
      'You need a DAX measure computing Year-to-Date Revenue that works reliably when users slice by `FiscalYear` or `Quarter` from your custom `DimDate` table (marked as a Date Table). Which DAX expression is best?',
    options: [
      'Revenue YTD = TOTALYTD(SUM(FactSales[Amount]), DimDate[Date])',
      'Revenue YTD = SUMX(FactSales, FactSales[Amount] + 365)',
      'Revenue YTD = ALL(FactSales[Amount])',
      'Revenue YTD = CALCULATE(COUNTROWS(DimDate))',
    ],
    correctIndex: 0,
    explanation:
      '`TOTALYTD` (or `CALCULATE(..., DATESYTD(DimDate[Date]))`) leverages the marked continuous Date table to accumulate sales within the active year context.',
  },
  {
    id: 'pl300-3',
    domain: 'Prepare the Data',
    prompt:
      'In Power Query Editor, connecting to an Azure SQL Database table of 18 million rows becomes extremely slow during refresh because a custom M column (`Text.Proper` + conditional merge) broke query folding early in Applied Steps. What optimizes refresh speed?',
    options: [
      'Push filtering, column removal, and native SQL-supported transforms BEFORE steps that break query folding, or use native SQL view',
      'Increase Power BI Desktop local RAM cache to 64 GB',
      'Use `Table.Buffer` on step 1 before filtering dates',
      'Replace SQL Server connector with Excel Web export',
    ],
    correctIndex: 0,
    explanation:
      'Keeping query-foldable steps (row filters, removing unused columns, group by) at the top allows the source SQL engine to execute heavy work before M engine local transforms.',
  },
  {
    id: 'pl300-4',
    domain: 'Manage and Secure Power BI',
    prompt:
      'Regional sales managers in UK, Germany, UAE, and South Africa must view the exact same Power BI dashboard, yet each manager may only see rows matching their email (`USERPRINCIPALNAME()`) in `DimManager[Email]`. Which security feature implements this?',
    options: [
      'Dynamic Row-Level Security (RLS) role filter `[Email] = USERPRINCIPALNAME()` in Desktop + Workspace Viewer assignment',
      'Creating four separate workspaces and duplicating PBIX files manually',
      'Assigning every regional manager the Workspace Admin role',
      'Hiding report pages using eye icons in the Fields pane',
    ],
    correctIndex: 0,
    explanation:
      'Dynamic RLS evaluates `USERPRINCIPALNAME()` per logged-in viewer and restricts dataset rows strictly for Workspace Viewers (Admin/Member/Contributor roles bypass RLS unless restricted).',
  },
  {
    id: 'pl300-5',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'A senior finance stakeholder wants to explore what factors most strongly drive customer subscription churn inside a Power BI report without writing Python code. Which built-in AI visual answers this directly?',
    options: [
      'Key Influencers visual',
      'Stacked Area Chart',
      'Gauge visual with static target',
      'Card (Multi-row) visual',
    ],
    correctIndex: 0,
    explanation:
      'The Key Influencers AI visual runs statistical regression/decision-tree ranking natively inside Power BI to highlight which attributes increase or decrease the target metric.',
  },
  {
    id: 'pl300-6',
    domain: 'Model the Data',
    prompt:
      'Which DAX formula pattern returns Sales for the `Electronics` category while ignoring any Category slicer selected on the page, WITHOUT breaking Date or Region filters?',
    options: [
      'CALCULATE([Total Sales], REMOVEFILTERS(DimProduct[Category]), DimProduct[Category] = "Electronics")',
      'CALCULATE([Total Sales], ALL(FactSales))',
      'SUMX(ALL(DimProduct), [Total Sales])',
      'ALLEXCEPT(DimDate, DimDate[Year])',
    ],
    correctIndex: 0,
    explanation:
      '`CALCULATE` with `DimProduct[Category] = "Electronics"` explicitly overwrites any existing filter on `DimProduct[Category]` while preserving Date, Country, and Customer filter context.',
  },
  {
    id: 'pl300-7',
    domain: 'Prepare the Data',
    prompt:
      'In Power Query, a monthly ERP CSV export arrives in a wide matrix with columns `[Product, Jan-2026, Feb-2026, Mar-2026, Apr-2026...]`. To build a clean Power BI Date slicer and sum across time dynamically, which transformation should you apply?',
    options: [
      'Select `[Product]` and choose "Unpivot Other Columns" to produce `[Attribute (Month), Value]` rows',
      'Apply "Pivot Column" on `[Product]`',
      'Select all month columns and choose "Append Queries"',
      'Use "Transpose" on the entire table without promoting headers',
    ],
    correctIndex: 0,
    explanation:
      '"Unpivot Other Columns" normalizes wide crosstab months into vertical `[Month, Amount]` rows so new months added later ingest automatically.',
  },
  {
    id: 'pl300-8',
    domain: 'Manage and Secure Power BI',
    prompt:
      'A dataset connects to an on-premises SQL Server database inside the company’s Johannesburg datacenter. How does Power BI Service execute scheduled daily refreshes safely?',
    options: [
      'Install and register an On-premises data gateway (Standard mode) and bind the semantic model data source',
      'Open TCP port 1433 directly to the entire internet',
      'Email `.pbix` backups to Power BI Support daily',
      'Enable DirectLake on local SQL Server 2016',
    ],
    correctIndex: 0,
    explanation:
      'The On-premises data gateway creates an outbound Azure Service Bus encrypted tunnel so Power BI Service refreshes local databases without exposing inbound firewall ports.',
  },
  {
    id: 'pl300-9',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'Report authors want clicking on a bar in an Executive Summary chart to navigate to a detailed Regional Breakdown page while preserving all clicked Region and Product filters. Which Power BI feature provides this?',
    options: [
      'Cross-report or single-report Drillthrough page configured on the destination page',
      'Manual Bookmarks only with static filters',
      'Exporting PDFs for every region separately',
      'Changing visual interaction mode to None',
    ],
    correctIndex: 0,
    explanation:
      'Adding Drillthrough fields to a destination detail page enables right-click (or button action) navigation that automatically passes the active filter context.',
  },
  {
    id: 'pl300-10',
    domain: 'Model the Data',
    prompt:
      'A semantic model has 120 million rows and high cardinality ID columns (`TransactionGUID` strings) causing the PBIX memory footprint to exceed Workspace Pro limits. What is the single highest-impact storage optimization?',
    options: [
      'Remove unused high-cardinality GUID/audit columns in Power Query and disable Auto Date/Time',
      'Change all numeric integer columns to Text strings',
      'Duplicate every fact table into Calculated Tables using DAX',
      'Disable incremental refresh across all partitions',
    ],
    correctIndex: 0,
    explanation:
      'VertiPaq dictionary encoding compresses low-cardinality columns aggressively, whereas high-cardinality GUIDs consume huge RAM. Removing unused GUIDs + disabling hidden Auto Date/Time tables slashes model size dramatically.',
  },
  {
    id: 'pl300-11',
    domain: 'Prepare the Data',
    prompt:
      'Which Power Query Data Profiling setting helps you immediately detect hidden trailing whitespace, nulls, and value distribution outliers across ALL 100,000 rows instead of only the top 1,000 preview rows?',
    options: [
      'Enable Column Distribution & Column Profile and switch the bottom-left status bar from "Top 1000 rows" to "Entire data set"',
      'Run `DAX Studio` inside Power Query',
      'Convert the file to `.csv` and re-import',
      'Enable View -> Monospaced only',
    ],
    correctIndex: 0,
    explanation:
      'By default Power Query profiles only the first 1,000 rows; switching profiling scope to "Entire data set" exposes true distinct counts, min/max, and error rates.',
  },
  {
    id: 'pl300-12',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'When accessibility compliance (WCAG) is required for a public-sector Power BI dashboard in the UK or EU, which design practice ensures screen-reader and keyboard compatibility?',
    options: [
      'Set explicit Tab Order in the Selection pane, provide descriptive Alt Text per visual, and avoid color-only KPI encoding',
      'Rely exclusively on red/green circles without text labels',
      'Combine 18 charts onto a single 800x600 canvas',
      'Disable keyboard focus indicators in theme JSON',
    ],
    correctIndex: 0,
    explanation:
      'Setting logical Tab Order, meaningful Alt Text, clear high-contrast titles, and icon+text KPI indicators satisfies WCAG 2.1 standards in Power BI.',
  },
  {
    id: 'pl300-13',
    domain: 'Model the Data',
    prompt:
      'A `FactOrders` table has both `OrderDate` and `ShipDate` linked to `DimDate[Date]`. Only `OrderDate` is active (`solid line`). How do you write a measure calculating `Shipped Sales` using the inactive `ShipDate` relationship?',
    options: [
      'Shipped Sales = CALCULATE([Total Sales], USERELATIONSHIP(FactOrders[ShipDate], DimDate[Date]))',
      'Shipped Sales = RELATED(FactOrders[ShipDate])',
      'Shipped Sales = SUMX(FactOrders, [Total Sales])',
      'Activate both relationships simultaneously in Model View',
    ],
    correctIndex: 0,
    explanation:
      'Power BI allows only one active path between two tables. `USERELATIONSHIP` temporarily activates an inactive role-playing relationship inside a `CALCULATE` evaluation.',
  },
  {
    id: 'pl300-14',
    domain: 'Manage and Secure Power BI',
    prompt:
      'Your enterprise creates 18 regional reports across teams using the same audited Finance Semantic Model. What is the cleanest governance architecture to avoid duplicate datasets?',
    options: [
      'Publish a single Gold/Certified Shared Semantic Model into a central Data Workspace and connect thin reports via Live Connection',
      'Email copies of the `.pbix` with embedded CSVs to every analyst',
      'Turn every report into Import Mode reading local Excel spreadsheets',
      'Give every consumer Build permission on all personal workspaces',
    ],
    correctIndex: 0,
    explanation:
      'Separating the Certified Shared Semantic Model from thin live-connected `.pbix` reports enforces a single source of truth for DAX KPIs and centralizes refresh & RLS.',
  },
  {
    id: 'pl300-15',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'You want a conditional formatting rule that highlights Margin % below 15% on a table matrix without creating a manual numeric threshold rule per column. Which Conditional Formatting option gives cleanest dynamic control?',
    options: [
      'Field value formatting driven by a DAX measure returning hex/theme color codes based on business thresholds',
      'Manually coloring cells in Excel before uploading',
      'Setting the background transparency to 100%',
      'Turning off Row Headers on the Matrix visual',
    ],
    correctIndex: 0,
    explanation:
      'Measure-driven `Format style: Field value` centralizes complex multi-condition formatting logic inside reusable DAX measures.',
  },
  ...POWER_BI_PL_300_QUESTIONS_EXT,
];

export const NETWORK_PLUS_N10_009_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'n10-1',
    domain: 'Networking Concepts',
    prompt:
      'A network engineer needs to carve `192.168.40.0/24` into equal subnets supporting at least 28 usable host IP addresses per branch VLAN while maximizing the total number of subnets. Which CIDR prefix length fits best?',
    options: [
      '/26 (62 usable hosts per subnet, 4 subnets)',
      '/27 (30 usable hosts per subnet, 8 subnets)',
      '/28 (14 usable hosts per subnet, 16 subnets)',
      '/25 (126 usable hosts per subnet, 2 subnets)',
    ],
    correctIndex: 1,
    explanation:
      '`/27` leaves 5 host bits: 2^5 - 2 = 30 usable host addresses per subnet (meeting >=28) and yields 8 equal subnets from a `/24`.',
  },
  {
    id: 'n10-2',
    domain: 'Network Troubleshooting',
    prompt:
      'Workstations on VLAN 20 cannot reach a file server on VLAN 30, though devices within VLAN 20 ping each other normally. The core Layer-3 switch SVI for VLAN 20 is `10.20.0.1/24`, but clients show default gateway `10.20.0.254` via DHCP. What is the root cause?',
    options: [
      'DHCP Option 003 (Router / Default Gateway) is misconfigured for VLAN 20 clients',
      'STP Root Bridge election failed on VLAN 10',
      'Patch cables are wired with T568A instead of T568B',
      'MTU jumbo frames are disabled on the printer port',
    ],
    correctIndex: 0,
    explanation:
      'Local VLAN pings work without a router, whereas inter-VLAN traffic requires the valid L3 default gateway (`10.20.0.1`) distributed accurately by DHCP Option 003.',
  },
  {
    id: 'n10-3',
    domain: 'Network Security',
    prompt:
      'Which Layer-2 switch security feature drops DHCP Offer/Ack packets arriving on untrusted access ports where end-user laptops plug in, stopping rogue DHCP servers?',
    options: [
      'DHCP Snooping with trusted uplink trunk ports only',
      'Port Mirroring (SPAN)',
      'LLDP-MED voice VLAN tagging',
      'Split-horizon DNS views',
    ],
    correctIndex: 0,
    explanation:
      'DHCP Snooping classifies access ports as untrusted and permits server DHCP Offer/ACK messages exclusively on designated trusted uplink/server ports.',
  },
  {
    id: 'n10-4',
    domain: 'Network Operations',
    prompt:
      'An administrator wants real-time telemetry alerts and historical interface bandwidth utilization charts from core switches with encrypted SNMPv3 traffic. Which SNMPv3 security level provides BOTH authentication and payload encryption?',
    options: [
      'noAuthNoPriv',
      'authNoPriv',
      'authPriv (e.g., SHA-256 + AES-128)',
      'SNMPv2c read-write community string',
    ],
    correctIndex: 2,
    explanation:
      'SNMPv3 `authPriv` enforces cryptographic message authentication (HMAC-SHA) and encryption (AES) of SNMP PDUs and credentials.',
  },
  {
    id: 'n10-5',
    domain: 'Network Implementation',
    prompt:
      'A warehouse deploys 802.11ax (Wi-Fi 6) Access Points operating in both 2.4 GHz and 5 GHz bands. To minimize co-channel interference between adjacent 2.4 GHz APs, which non-overlapping channel plan should be configured?',
    options: [
      'Channels 1, 6, and 11',
      'Channels 1, 2, and 3',
      'Channels 3, 7, and 10',
      'Only Channel 14 worldwide',
    ],
    correctIndex: 0,
    explanation:
      'In the 2.4 GHz ISM band (20/22 MHz wide channels), Channels 1, 6, and 11 are the standard non-overlapping channel set avoiding adjacent-channel interference.',
  },
  {
    id: 'n10-6',
    domain: 'Networking Concepts',
    prompt:
      'Which TCP/UDP well-known port pair must be opened through an internal firewall so Windows endpoints can resolve hostnames via encrypted LDAPS and manage Active Directory time synchronization via NTP?',
    options: [
      'TCP 636 (LDAPS) and UDP 123 (NTP)',
      'TCP 389 (LDAP) and TCP 22 (SSH)',
      'TCP 445 (SMB) and UDP 161 (SNMP)',
      'TCP 3389 (RDP) and UDP 53 (DNS)',
    ],
    correctIndex: 0,
    explanation:
      'LDAPS uses TCP 636 for TLS-secured directory queries, while NTP synchronizes clocks over UDP 123 (critical for Kerberos ticket skew limits).',
  },
  {
    id: 'n10-7',
    domain: 'Network Troubleshooting',
    prompt:
      'After replacing an SFP+ fiber transceiver between two datacenter switches 450 meters apart, the link fails to come up despite matching VLAN trunks. Both sides show `no light / RX power low` using 10GBASE-SR multimode optics over single-mode OS2 yellow fiber. What is the issue?',
    options: [
      'Transceiver mismatch: 10GBASE-SR (850nm MMF) optics cannot operate reliably over single-mode OS2 cabling; 10GBASE-LR (1310nm SMF) optics are required',
      'STP BPDU Guard disabled both uplinks automatically',
      'OSPF Area 0 needs a lower hello timer',
      'Crossover Ethernet wiring was omitted',
    ],
    correctIndex: 0,
    explanation:
      'Yellow single-mode fiber (OS2) requires 1310nm single-mode optics (10GBASE-LR), whereas 850nm SR optics are engineered for aqua OM3/OM4 multimode cables.',
  },
  {
    id: 'n10-8',
    domain: 'Network Implementation',
    prompt:
      'Two distribution switches are connected by four 10GbE fiber cables bundled into a single logical interface carrying 40 Gbps aggregate throughput with active/standby link failure tolerance. Which standards-based protocol negotiates this bundle?',
    options: [
      'LACP (IEEE 802.3ad / 802.1AX)',
      'VRRP (Virtual Router Redundancy Protocol)',
      'BGP (Border Gateway Protocol)',
      'RIPv2',
    ],
    correctIndex: 0,
    explanation:
      'LACP (Link Aggregation Control Protocol) dynamically negotiates multi-link EtherChannel bundles across vendor switches for bandwidth aggregation and failover.',
  },
  {
    id: 'n10-9',
    domain: 'Networking Concepts',
    prompt:
      'A company connects two branch offices across a dedicated ISP MPLS WAN. Applications require sub-25ms voice packet prioritization over bulk file backups. Which OSI Layer and mechanism govern DSCP traffic marking?',
    options: [
      'Layer 3 IP header QoS (Differentiated Services Code Point / DSCP EF 46 for voice)',
      'Layer 1 RJ-45 gold pin plating',
      'Layer 7 SMTP relay headers',
      'Layer 2 MAC OUI table aging',
    ],
    correctIndex: 0,
    explanation:
      'DSCP fields reside inside the Layer 3 IPv4/IPv6 header (EF / DSCP 46 for VoIP media) enabling routers to prioritize latency-sensitive queues.',
  },
  {
    id: 'n10-10',
    domain: 'Network Troubleshooting',
    prompt:
      'A technician tests a newly crimped Cat6a horizontal run with a cable certifier and sees a wiremap failure: `Pins 1-2 Short` and `High NEXT (Near-End Crosstalk)` at the wall jack. What caused this?',
    options: [
      'Too much jacket untwist at the keystone punchdown and stray copper strand touching adjacent IDC blades',
      'DNS suffix search list is missing on DHCP clients',
      'VLAN 100 was not added to the core trunk',
      'The server NIC runs half-duplex 10GbE',
    ],
    correctIndex: 0,
    explanation:
      'Untwisting pairs beyond 0.5 inches (13mm) degrades Cat6/6a Near-End Crosstalk (NEXT) resistance, and loose strands cause wiremap shorts.',
  },
  {
    id: 'n10-11',
    domain: 'Network Security',
    prompt:
      'Which protocol authenticates corporate laptops plugging into conference room Ethernet jacks using RADIUS and EAP-TLS machine certificates before granting full VLAN access?',
    options: [
      'IEEE 802.1X Port-Based Network Access Control (NAC)',
      'TACACS+ for switch CLI authorization only',
      'IGMP Snooping',
      'Wake-on-LAN magic packets',
    ],
    correctIndex: 0,
    explanation:
      '802.1X uses Supplicant -> Authenticator (Switch) -> Authentication Server (RADIUS) via EAP-TLS to enforce port-level NAC.',
  },
  {
    id: 'n10-12',
    domain: 'Network Operations',
    prompt:
      'During a planned failover drill, Core-Router-A goes offline, yet hosts lose connectivity for 120 seconds because ARP tables still point to Core-Router-A’s physical MAC instead of a shared virtual router IP/MAC. Which FHRP protocol prevents this?',
    options: [
      'VRRP or HSRP providing a floating Virtual IP and Virtual MAC',
      'OSPF Stub Area',
      'DNS Round-Robin with 24-hour TTL',
      'MPLS LDP',
    ],
    correctIndex: 0,
    explanation:
      'First-Hop Redundancy Protocols (HSRP/VRRP) share a virtual gateway IP and virtual MAC so standby routers assume ownership instantaneously with zero host ARP timeout.',
  },
  {
    id: 'n10-13',
    domain: 'Networking Concepts',
    prompt:
      'A branch uses an IPsec site-to-site VPN tunnel over broadband. Remote users report large SMB file copies stall midway, while small SSH commands succeed immediately. Adjusting which parameter resolves fragmented VPN packet blackholing?',
    options: [
      'Lower TCP MSS clamping (e.g., 1360 bytes) / PMTUD across the IPsec tunnel interface',
      'Change DNS from UDP to TCP only',
      'Disable AES-GCM encryption on IKEv2',
      'Increase DHCP lease duration to 30 days',
    ],
    correctIndex: 0,
    explanation:
      'IPsec encapsulation headers add ~50–80 bytes overhead; clamping TCP MSS ensures inner packets fit inside 1500-byte WAN links without silent Path MTU drops.',
  },
  {
    id: 'n10-14',
    domain: 'Network Implementation',
    prompt:
      'An administrator runs `tracert 8.8.8.8` from Windows vs `traceroute 8.8.8.8` from Linux. Why do firewalls sometimes permit Windows `tracert` while blocking default Linux `traceroute`?',
    options: [
      'Windows `tracert` sends ICMP Echo Requests, whereas standard Linux `traceroute` sends high-numbered UDP datagrams (33434+) by default',
      'Linux uses IPX/SPX packets instead of IPv4',
      'Windows bypasses local subnet masks',
      'Linux requires TCP port 445 for traceroute',
    ],
    correctIndex: 0,
    explanation:
      'Windows `tracert` relies on ICMP Echo Requests with incrementing TTLs; traditional Unix `traceroute` defaults to UDP ports 33434+ unless `-I` (ICMP) is specified.',
  },
  {
    id: 'n10-15',
    domain: 'Network Troubleshooting',
    prompt:
      'Users report intermittent drops only during the afternoon. Checking `show interfaces` on a Cisco/Aruba access switch reveals rapidly climbing `CRC / FCS errors` and `Input Errors` on `Gi1/0/14`. Where should you troubleshoot first?',
    options: [
      'Inspect and replace the Layer-1 patch cable, wall jack, or SFP optic connected to `Gi1/0/14` (and check duplex match)',
      'Flush the BGP routing table across the internet gateway',
      'Upgrade Microsoft 365 licenses',
      'Change the NTP primary pool',
    ],
    correctIndex: 0,
    explanation:
      'FCS/CRC errors indicate corrupted Ethernet frames almost always caused by failing physical cabling, EMI interference, bad optics, or duplex mismatches.',
  },
  ...NETWORK_PLUS_N10_009_QUESTIONS_EXT,
];

export const AZURE_AI_102_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'ai102-1',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'You are building an enterprise RAG (Retrieval-Augmented Generation) assistant in Azure AI Foundry for an insurance company. The chatbot must ONLY answer from approved policy PDFs and return clickable source page citations without hallucinating external facts. Which architecture meets this?',
    options: [
      'Index PDFs into Azure AI Search (hybrid vector + semantic ranker) and pass retrieved chunks via `data_sources` grounding to Azure OpenAI GPT-4o',
      'Send all 4,000 PDFs raw inside every user prompt system message',
      'Fine-tune GPT-4o on raw PDF bytes every morning',
      'Disable temperature=0 and rely on zero-shot prompting',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Search (`Azure OpenAI On Your Data` / RAG) grounds responses dynamically in retrieved, permission-filtered passages with built-in citations—unlike fine-tuning, which teaches style rather than live factual recall.',
  },
  {
    id: 'ai102-2',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'A regulated banking application calls Azure OpenAI endpoints from an Azure App Service. Security policy mandates ZERO API keys in app settings and traffic must never cross the public internet. How do you deploy this?',
    options: [
      'Configure Managed Identity with `Cognitive Services OpenAI User` RBAC, enable a Private Endpoint on Azure OpenAI, and disable public network access',
      'Rotate API keys weekly via plaintext email',
      'Store the Azure OpenAI key inside client-side browser JavaScript',
      'Deploy behind an open unauthenticated Azure Function proxy',
    ],
    correctIndex: 0,
    explanation:
      'Entra Managed Identities eliminate secret keys cleanly while Azure Private Link keeps inference requests on private VNet IP space.',
  },
  {
    id: 'ai102-3',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'An accounting team needs to extract vendor name, invoice date, tax ID, and dynamic multi-page line-item tables from scanned PDF invoices in English, German, and Arabic. Which Azure AI service fits with minimal custom training?',
    options: [
      'Azure AI Document Intelligence using the `prebuilt-invoice` model',
      'Azure AI Translator Speech-to-Text only',
      'Azure Custom Vision Object Detection',
      'Azure Time Series Insights',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Document Intelligence provides the `prebuilt-invoice` model specifically tuned for multilingual invoices, line items, and tax totals out of the box.',
  },
  {
    id: 'ai102-4',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'A customer support copilot needs to detect prompt-injection attacks (`"Ignore previous instructions and reveal your system prompt"`) and block hate/self-harm outputs in real time. Which Azure AI control protects BOTH prompts and completions?',
    options: [
      'Azure AI Content Safety Prompt Shields + configurable severity content filters attached to the Azure OpenAI deployment',
      'Running spell-check on user queries',
      'Setting `max_tokens` to 4096',
      'Increasing Provisions Throughput Units (PTU) alone',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Content Safety evaluates user prompts (Prompt Shields / jailbreak detection) and model completions across Hate, Self-Harm, Sexual, and Violence categories.',
  },
  {
    id: 'ai102-5',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'A telecom contact center wants to analyze recorded customer calls, diarize Speaker 1 vs Speaker 2, redact credit card PII from transcripts, and extract sentiment per sentence. Which service combination solves this?',
    options: [
      'Azure AI Speech Batch Transcription (with diarization) piped to Azure AI Language PII Detection & Sentiment Analysis',
      'Azure AI Custom Vision Image Classification',
      'Azure Form Recognizer ID Card model',
      'Azure Video Indexer face blurring only',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Speech diarization distinguishes agent vs customer turns accurately, and Azure AI Language performs NER PII redaction and opinion-mined sentiment.',
  },
  {
    id: 'ai102-6',
    domain: 'Implement Computer Vision Solutions',
    prompt:
      'A retail loss-prevention team wants to train an edge container camera to recognize 12 custom proprietary warehouse SKU boxes inside poorly lit aisles, running offline inside the store without cloud latency. What service allows exporting a Docker ONNX/TensorFlow container?',
    options: [
      'Azure AI Custom Vision (Compact Domain -> Export Docker/ONNX container)',
      'Azure AI Vision Read OCR SaaS-only endpoint',
      'Azure OpenAI DALL-E 3',
      'Azure Translator Text API',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Custom Vision Compact domains train lightweight object detection/classification models exportable directly to Docker containers for edge deployment.',
  },
  {
    id: 'ai102-7',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'Your production RAG chat app encounters sporadic `HTTP 429 TooManyRequests` throttling spikes on a Pay-As-You-Go Azure OpenAI deployment during morning hours in Europe. How do you ensure guaranteed sub-second latency and predictable capacity?',
    options: [
      'Provision Provisioned Throughput Units (PTUs) alongside APIM circuit-breaker spillover to secondary regional PAYG deployments',
      'Remove all retry-after backoff logic in client SDKs',
      'Switch from GPT-4o-mini to Whisper audio model',
      'Increase client browser timeout to 10 minutes',
    ],
    correctIndex: 0,
    explanation:
      'Provisioned Throughput (PTU) reserves dedicated token-per-minute capacity with predictable latency, and Azure API Management enables smart regional failover during unexpected bursts.',
  },
  {
    id: 'ai102-8',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'When indexing scanned PDFs alongside Word documents into Azure AI Search, some scanned architecture blueprints contain embedded diagram labels that standard text parsers miss. How can an Azure AI Search indexer capture text inside images automatically?',
    options: [
      'Attach an AI Enrichment Skillset containing the built-in OCR Skill + Text Merge Skill before projection into the search index',
      'Convert all PDFs manually in Notepad',
      'Disable chunking on the indexer',
      'Replace Azure AI Search with Blob Static Website hosting',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Search Skillsets run OCR and cognitive enrichments on normalized images extracted during document cracking and merge the recognized text into searchable fields.',
  },
  {
    id: 'ai102-9',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'You want an Azure OpenAI chat agent to check live warehouse inventory in your ERP SQL database and return deterministic JSON adhering strictly to a schema before triggering an order confirmation. Which API features accomplish this?',
    options: [
      'Function Calling (Tools) + Structured Outputs (`response_format: json_schema` with `strict: true`)',
      'Prompting "Please respond in JSON if convenient" with temperature 1.4',
      'Fine-tuning the base embedding model',
      'Using Embeddings endpoint `/embeddings` for chat',
    ],
    correctIndex: 0,
    explanation:
      'Tool/Function Calling empowers the model to request real-time backend lookups safely, while `strict: true` Structured Outputs guarantee 100% schema conformance.',
  },
  {
    id: 'ai102-10',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'An enterprise IT helpdesk wants users to type natural phrases like `"Book a seat for John in Dubai AZ-104 next Tuesday"` and extract structured intents (`BookTraining`) and entities (`Course=AZ-104`, `City=Dubai`, `Date=next Tuesday`). Which Azure AI Language capability does this?',
    options: [
      'Conversational Language Understanding (CLU)',
      'Custom Question Answering only',
      'Language Detection single-call API',
      'Azure AI Immersive Reader',
    ],
    correctIndex: 0,
    explanation:
      'Conversational Language Understanding (CLU) maps natural user utterances to custom intents and extracted entities (replacing legacy LUIS).',
  },
  {
    id: 'ai102-11',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'In a multi-department Azure AI deployment, Finance wants isolated cost chargebacks and monitoring across 5 apps sharing Azure AI Services. Which pattern provides clean per-app token telemetry and quotas?',
    options: [
      'Front Azure OpenAI deployments with Azure API Management (APIM) issuing per-department subscription keys and logging token consumption metrics to Log Analytics',
      'Give every developer the single subscription Contributor key',
      'Disable diagnostic settings on Cognitive Services',
      'Share one anonymous endpoint with zero logging',
    ],
    correctIndex: 0,
    explanation:
      'API Management AI Gateway policies track prompt/completion token usage per consumer subscription and enforce per-team rate/token quotas.',
  },
  {
    id: 'ai102-12',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'In an Azure AI Search RAG pipeline, simple cosine vector search misses exact compliance error codes like `ERR-4091-NIS2`, whereas keyword search alone misses conceptual synonyms like `"data breach reporting deadline"`. Which query mode solves both simultaneously?',
    options: [
      'Hybrid Search (Keyword BM25 + Vector Similarity) combined with Semantic Ranking (L2 reranker)',
      'Pure wildcard regex scan only',
      'Filtering exclusively by file size',
      'Vector search with dimensions reduced to 2',
    ],
    correctIndex: 0,
    explanation:
      'Hybrid search merges exact BM25 lexical matching (ideal for error codes and acronyms) with dense vector embeddings using Reciprocal Rank Fusion and Semantic Ranking.',
  },
  {
    id: 'ai102-13',
    domain: 'Implement Computer Vision Solutions',
    prompt:
      'An automated identity onboarding flow captures passport photos and live user selfies to verify identity and prevent spoofed printed photos or screen replays. Which Azure AI Vision Face API feature enforces anti-spoofing?',
    options: [
      'Face Liveness Detection (`DetectLiveness` session flow)',
      'Image Tagging general category API',
      'Background Removal API',
      'Color histogram thresholding',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Face Liveness Detection verifies real physical presence against printed masks, photos, and deepfake screen spoofing attacks.',
  },
  {
    id: 'ai102-14',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'Which evaluation metric in Azure AI Foundry specifically checks whether a RAG assistant’s answer stays faithful to the retrieved source passages without fabricating external claims?',
    options: [
      'Groundedness (plus Relevance and Coherence AI-assisted evaluators)',
      'BLEU character count only',
      'HTTP payload compression ratio',
      'Token cost per megabyte',
    ],
    correctIndex: 0,
    explanation:
      'Groundedness evaluates alignment strictly between generated claims and retrieved context chunks, identifying RAG hallucinations before production release.',
  },
  {
    id: 'ai102-15',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'An organization needs to deploy OpenAI Whisper or Speech-to-Text in an air-gapped industrial environment with zero outbound internet audio uploads while still metering usage via periodic sync. Which deployment option applies?',
    options: [
      'Azure AI Disconnected Containers (with commitment-tier license agreement)',
      'Standard public multi-tenant REST URL',
      'Browser Web Speech API only',
      'Azure Static Web Apps',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Containers support disconnected/on-premises runtime for Speech, Language, and Document Intelligence in strict air-gapped environments.',
  },
  ...AZURE_AI_102_QUESTIONS_EXT,
];
