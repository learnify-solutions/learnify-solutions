import { PracticeQuestion } from '../types';

export const POWER_BI_PL_300_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'pl300-16',
    domain: 'Prepare the Data',
    prompt:
      'You import a folder of 36 monthly CSV sales files inside Power Query and notice one file has extra trailing summary footer rows at the bottom. Which Power Query transformation removes unwanted bottom rows cleanly across all files?',
    options: [
      'Filter out null/summary rows using the Transform Sample File query before `Combine Files` completes',
      'Delete lines manually in Excel every month',
      'Enable Bidirectional cross-filtering in Model view',
      'Wrap every DAX measure in `IGNORE()`',
    ],
    correctIndex: 0,
    explanation:
      'Applying cleanup steps inside the Power Query helper `Transform Sample File` query ensures every current and future CSV in the folder receives identical ETL hygiene.',
  },
  {
    id: 'pl300-17',
    domain: 'Model the Data',
    prompt:
      'A `DimCustomer` table and `FactSales` table have a One-to-Many relationship. Why should analysts avoid setting Cross-filter direction to `Both` everywhere in a Star Schema?',
    options: [
      'Bidirectional filtering degrades query engine speed and introduces ambiguous filter paths across shared dimensions',
      'Bidirectional relationships forbid DAX `SUM` functions',
      'Power BI Desktop limits models to one One-to-Many relationship total',
      'It converts Import tables automatically into DirectQuery',
    ],
    correctIndex: 0,
    explanation:
      'Single-direction filtering (`One -> Many`) prevents ambiguous paths and keeps VertiPaq scans fast; use `CROSSFILTER` inside specific DAX measures instead of global bidirectional links.',
  },
  {
    id: 'pl300-18',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'An executive dashboard must display actual revenue vs target revenue plus qualitative Poor/Fair/Good color bands inside minimal screen height. Which visual fits best?',
    options: [
      'KPI visual or Bullet chart / Gauge with conditional target comparison',
      '3D Pie chart with 15 slices',
      'Scatter plot without axes',
      'Multi-row unformatted plain card',
    ],
    correctIndex: 0,
    explanation:
      'KPI cards and Bullet charts communicate progress against targets and qualitative status thresholds cleanly in compact executive layouts.',
  },
  {
    id: 'pl300-19',
    domain: 'Manage and Secure Power BI',
    prompt:
      'An enterprise builds a workspace (`Finance Production`) housing a gold semantic model and wants internal department analysts in another workspace (`Regional Sales`) to build custom reports without duplicating data imports. Which capability supports this?',
    options: [
      'Shared / Cross-workspace certified semantic model with `Build` permission assigned to analysts',
      'Exporting the PBIX file via email weekly',
      'Granting everyone Workspace Admin on Finance Production',
      'Copying SQL queries into Excel files',
    ],
    correctIndex: 0,
    explanation:
      'Granting `Build` permission on a Certified/Promoted semantic model allows analysts to create live thin reports in separate workspaces backed by one governed source of truth.',
  },
  {
    id: 'pl300-20',
    domain: 'Model the Data',
    prompt:
      'A measure `Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))` returns blank values even though data spans 2024–2026. Which modeling check resolves most Time Intelligence failures?',
    options: [
      'Verify `DimDate` contains contiguous dates covering full years with no gaps and is marked as a Date Table',
      'Convert the `Date` column to Text format',
      'Delete the relationship between `DimDate` and `FactSales`',
      'Replace `CALCULATE` with a calculated column',
    ],
    correctIndex: 0,
    explanation:
      'DAX Time Intelligence functions require a contiguous date table containing every calendar day across all modeled years, marked via "Mark as date table".',
  },
  {
    id: 'pl300-21',
    domain: 'Prepare the Data',
    prompt:
      'During Power Query profiling, a column of customer zip codes (`00421`, `08812`) loses leading zeros after an automatic `Changed Type` step turns it into Whole Number. What should you do?',
    options: [
      'Modify or replace the `Changed Type` step to cast zip codes as `Text` instead of Whole Number',
      'Multiply all zip codes by 1000 in DAX',
      'Apply currency formatting in Model view',
      'Hide the column completely',
    ],
    correctIndex: 0,
    explanation:
      'Postal codes, phone numbers, and padded identifiers must always stay typed as `Text` in Power Query so leading zeros are preserved.',
  },
  {
    id: 'pl300-22',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'Users want to right-click any product row on a Summary Matrix and jump straight to a hidden detail report page showing only that selected product’s supplier orders. Which Power BI feature enables this?',
    options: [
      'Drillthrough page configured with `Product[ProductName]` in the Drillthrough filter well',
      'Tooltip auto-resize only',
      'Power Query Merge Queries',
      'Row-Level Security DAX roles',
    ],
    correctIndex: 0,
    explanation:
      'Adding a field to a target page’s Drillthrough well lets users right-click or click a drillthrough button to jump directly with filter context preserved.',
  },
  {
    id: 'pl300-23',
    domain: 'Model the Data',
    prompt:
      'Compare `SUM(FactSales[Qty] * FactSales[UnitPrice])` inside a Calculated Column vs `SUMX(FactSales, FactSales[Qty] * FactSales[UnitPrice])` inside a Measure. Why is `SUMX` in a Measure usually preferred?',
    options: [
      'The Measure evaluates dynamically at query time without inflating model RAM footprint with an extra stored column',
      'Calculated Columns cannot multiply two numeric fields',
      '`SUMX` automatically compresses string columns into integers',
      'Measures bypass Row-Level Security filters',
    ],
    correctIndex: 0,
    explanation:
      'Calculated columns consume memory inside the VertiPaq dataset and recompute only on refresh, whereas iterator measures (`SUMX`) compute dynamically over active filter contexts.',
  },
  {
    id: 'pl300-24',
    domain: 'Manage and Secure Power BI',
    prompt:
      'A regional sales manager needs scheduled daily snapshots of a Power BI report page emailed as a PDF at 07:00 AM every Monday. Which feature automates delivery inside the Power BI Service?',
    options: [
      'Report Subscriptions configured in the Power BI Service',
      'Power BI Desktop Performance Analyzer export',
      'Enabling Auto Date/Time in Desktop options',
      'Publishing to web (public anonymous link)',
    ],
    correctIndex: 0,
    explanation:
      'Subscriptions inside the Power BI Service send scheduled email snapshots/PDF/PPTX attachments to authorized licensed recipients.',
  },
  {
    id: 'pl300-25',
    domain: 'Prepare the Data',
    prompt:
      'When connecting to an on-premises SQL Server behind a corporate firewall so scheduled cloud refreshes succeed overnight in the Power BI Service, what component must be installed internally?',
    options: [
      'On-premises Data Gateway (Standard Mode)',
      'Power BI Mobile App on an iPad',
      'DAX Studio locally on a laptop that sleeps at 6 PM',
      'Publicly exposing SQL port 1433 to `0.0.0.0/0`',
    ],
    correctIndex: 0,
    explanation:
      'An On-premises Data Gateway (Standard mode) running on a continuously online domain server securely relays encrypted cloud refresh queries to internal SQL Server.',
  },
  {
    id: 'pl300-26',
    domain: 'Model the Data',
    prompt:
      'You need a measure computing `% of All Regions Sales` that retains active Year and Category slicers while clearing ONLY filters on `DimRegion[RegionName]`. Which DAX pattern accomplishes this cleanly?',
    options: [
      '`DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(DimRegion[RegionName])))`',
      '`CALCULATE([Total Sales], ALL())`',
      '`SUM(FactSales[Amount]) / COUNT(FactSales[Amount])`',
      '`SELECTEDVALUE(DimRegion[RegionName])`',
    ],
    correctIndex: 0,
    explanation:
      '`REMOVEFILTERS(DimRegion[RegionName])` inside `CALCULATE` clears only the region filter so `% share` respects Year and Product slicers.',
  },
  {
    id: 'pl300-27',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'Which built-in AI visual lets non-technical business executives explore root causes behind a sudden drop in Profit Margin by breaking a metric down interactively across arbitrary dimension levels?',
    options: [
      'Decomposition Tree visual',
      'Stacked Area Chart',
      'Classic Pie Chart',
      'Slicer dropdown',
    ],
    correctIndex: 0,
    explanation:
      'The Decomposition Tree enables ad-hoc multi-dimension breakdown and "High Value / Low Value" AI splits without pre-building rigid drill hierarchies.',
  },
  {
    id: 'pl300-28',
    domain: 'Manage and Secure Power BI',
    prompt:
      'A semantic model combines huge historical sales (10 billion rows via DirectQuery) with small fast-changing budget tables (Import) and hourly aggregated sales tables. What storage design optimizes dashboard interactivity?',
    options: [
      'Composite Model using Dual storage mode on shared Dimension tables + User-defined Aggregations',
      'Converting the 10-billion-row table into CSV email imports',
      'Setting every table to Import mode inside a 1 GB Pro workspace limit',
      'Turning off relationships completely',
    ],
    correctIndex: 0,
    explanation:
      'Composite models with `Dual` dimension tables and in-memory Aggregation tables answer common summary visuals instantaneously from RAM while hitting DirectQuery only for leaf-level drilldowns.',
  },
  {
    id: 'pl300-29',
    domain: 'Prepare the Data',
    prompt:
      'Your Power Query table contains columns `Q1_2025`, `Q2_2025`, `Q3_2025`, `Q4_2025` across columns instead of rows. Which transformation normalizes this wide report into tall, Star-Schema-friendly Attribute/Value rows?',
    options: [
      'Unpivot Columns (specifically Unpivot Other Columns)',
      'Pivot Column',
      'Transpose Table blindly',
      'Split Column by Delimiter',
    ],
    correctIndex: 0,
    explanation:
      'Unpivoting converts wide period/attribute columns into clean `Quarter` and `Sales` rows suitable for DAX measures and slicers.',
  },
  {
    id: 'pl300-30',
    domain: 'Model the Data',
    prompt:
      'Why does Best Practice recommend disabling "Auto date/time" in Power BI Desktop options when modeling enterprise datasets?',
    options: [
      'It stops Power BI from generating hidden local date tables per date column, saving memory and enforcing one shared `DimDate`',
      'It deletes all timestamp columns from SQL queries',
      'It enables real-time DirectQuery streaming',
      'It unlocks Power BI Free workspace publishing',
    ],
    correctIndex: 0,
    explanation:
      'Auto date/time spawns hidden internal tables for every date field in the model, bloating RAM and complicating cross-table time comparisons compared to a single `DimDate`.',
  },
  {
    id: 'pl300-31',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'A report author places 18 independent cards, 6 slicers, and 8 charts onto one canvas, causing slow visual rendering. What built-in Desktop pane pinpoints whether the bottleneck is DAX Query execution vs Visual Display?',
    options: [
      'Performance Analyzer',
      'Power Query Column Quality',
      'Tabular Editor Role Manager',
      'Gateways Cluster Monitor',
    ],
    correctIndex: 0,
    explanation:
      'Performance Analyzer logs millisecond breakdowns per visual across `DAX query`, `Visual display`, and `Other` wait times so you can optimize slow measures or reduce visual count.',
  },
  {
    id: 'pl300-32',
    domain: 'Manage and Secure Power BI',
    prompt:
      'You need to apply Row-Level Security so users see only sales from countries mapped to their corporate email inside a security table `UserRegionSecurity[Email]`. Which DAX function resolves the signed-in user inside Power BI Service?',
    options: [
      '`USERPRINCIPALNAME()`',
      '`TODAY()`',
      '`SELECTEDVALUE()`',
      '`USERNAME()` inside SQL Server Authentication only',
    ],
    correctIndex: 0,
    explanation:
      '`USERPRINCIPALNAME()` returns the logged-in user’s UPN (`name@company.com`) reliably inside the Power BI Service for Dynamic RLS rules.',
  },
  {
    id: 'pl300-33',
    domain: 'Model the Data',
    prompt:
      'When two separate Fact tables (`FactBudget` at Month grain and `FactSales` at Daily grain) must filter cleanly by Calendar Month on the same report, what is the standard Kimball / Power BI pattern?',
    options: [
      'Connect both Fact tables via a shared `DimDate` dimension (or `DimMonth`), keeping `FactSales` -> `FactBudget` disconnected directly',
      'Join `FactBudget` directly to `FactSales` in a Many-to-Many relationship',
      'Merge both tables into one giant flat table repeating monthly budgets on every invoice line',
      'Disable all relationships and copy visuals twice',
    ],
    correctIndex: 0,
    explanation:
      'Conformed shared dimensions (`DimDate`) slice multiple fact tables consistently at their respective granularities without Many-to-Many ambiguity.',
  },
  {
    id: 'pl300-34',
    domain: 'Prepare the Data',
    prompt:
      'A SQL source view contains `FirstName` and `LastName` plus an `Email` column. Which Power Query operation preserves Query Folding best when combining `FirstName` and `LastName`?',
    options: [
      'Using built-in UI `Merge Columns` / simple concatenation step verified via "View Native Query"',
      'Invoking a custom `Web.Contents()` Python script per row',
      'Adding a recursive M function referencing `Table.Buffer` early',
      'Appending three local Excel files before merging',
    ],
    correctIndex: 0,
    explanation:
      'Simple built-in transformations push SQL `CONCAT` directly back to the relational engine ("View Native Query" remains clickable), whereas custom scripts break folding.',
  },
  {
    id: 'pl300-35',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'Analysts want clicking a specific category bar in Visual A to completely filter Visual B rather than leaving dimmed ghost bars (`Highlight`). Where do you configure this behavior?',
    options: [
      'Format -> Edit Interactions -> select the `Filter` icon on Visual B while Visual A is active',
      'Model view -> Relationship Cardinality',
      'Power Query -> Merge Queries',
      'Options -> Preview Features',
    ],
    correctIndex: 0,
    explanation:
      '`Edit Interactions` controls per-visual cross-behavior (`Filter`, `Highlight`, or `None`) whenever another visual selects data points.',
  },
  {
    id: 'pl300-36',
    domain: 'Model the Data',
    prompt:
      'What happens if a Power BI semantic model has a Many-to-One relationship from `FactSales[ProductID]` to `DimProduct[ProductID]`, and one `ProductID` in `FactSales` does not exist in `DimProduct`?',
    options: [
      'VertiPaq displays a virtual `(Blank)` row in slicers/visuals for unmatched fact keys (referential integrity violation)',
      'Power BI deletes the unmatched `FactSales` rows silently',
      'The entire PBIX file refuses to open',
      'Power BI automatically invents fake product names',
    ],
    correctIndex: 0,
    explanation:
      'Unmatched foreign keys trigger a `(Blank)` row inside dimension visuals so Fact totals never disappear silently.',
  },
  {
    id: 'pl300-37',
    domain: 'Manage and Secure Power BI',
    prompt:
      'How do you distribute a curated suite of 8 executive reports and 3 dashboards to 400 business consumers while ensuring they never see raw workspace clutter or accidentally edit reports?',
    options: [
      'Publish a Power BI App with custom navigation and Audience groups',
      'Add all 400 users as Workspace Members',
      'Email PBIX files to a shared SharePoint folder',
      'Use Publish to Web on confidential internal revenue',
    ],
    correctIndex: 0,
    explanation:
      'Power BI Apps package read-only reports/dashboards with role-based Audiences, clean navigation, and isolated editing inside the underlying workspace.',
  },
  {
    id: 'pl300-38',
    domain: 'Prepare the Data',
    prompt:
      'You have a 900 MB semantic model that takes 45 minutes to refresh every hour even though only the last 3 days of `FactOrders` change. Which feature reduces refresh runtimes to under 2 minutes?',
    options: [
      'Incremental Refresh configured via `RangeStart` and `RangeEnd` DateTime Power Query parameters',
      'Enabling Auto Date/Time',
      'Switching all columns to Text',
      'Refreshing manually from Power BI Desktop daily',
    ],
    correctIndex: 0,
    explanation:
      'Incremental Refresh partitions historical data (`Store rows`) separately from recent `Refresh rows`, pushing `RangeStart`/`RangeEnd` filters to SQL.',
  },
  {
    id: 'pl300-39',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'You build a dynamic report title card that updates automatically to read `"2026 Sales Overview — EMEA"` whenever a user selects `EMEA` in the Region slicer. How do you configure this cleanly?',
    options: [
      'Create a DAX text measure using `SELECTEDVALUE(DimRegion[RegionName], "All Regions")` and bind it to the Title conditional formatting (`fx`)',
      'Create 10 hidden overlapping bookmarks per region',
      'Hardcode static PNG header images',
      'Use a Power Query parameter inside visuals directly',
    ],
    correctIndex: 0,
    explanation:
      'Binding a DAX measure (`"2026 Sales — " & SELECTEDVALUE(...)`) via the visual Title `fx` button yields dynamic context-aware titles with zero duplicate pages.',
  },
  {
    id: 'pl300-40',
    domain: 'Model the Data',
    prompt:
      'Why does `DIVIDE([Profit], [Sales], 0)` outperform `[Profit] / [Sales]` inside production DAX measures?',
    options: [
      '`DIVIDE()` safely handles zero or blank denominators without returning `Infinity`/`NaN` errors across visuals',
      '`DIVIDE()` converts currencies automatically',
      'The `/` operator is deprecated in Power BI 2026',
      '`DIVIDE()` forces DirectQuery caching',
    ],
    correctIndex: 0,
    explanation:
      '`DIVIDE(num, denom, alt)` prevents division-by-zero errors cleanly and returns `BLANK()` or an explicit fallback cleanly.',
  },
  {
    id: 'pl300-41',
    domain: 'Prepare the Data',
    prompt:
      'In Power Query, when you want to filter a massive `Customer` table against a list of 1,500 active VIP IDs from an Excel sheet while keeping performance optimal, which Join Kind keeps only matching VIP customer rows?',
    options: [
      'Inner Join (or Left Semi Join)',
      'Full Outer Join',
      'Right Anti Join',
      'Cross Join',
    ],
    correctIndex: 0,
    explanation:
      'An Inner Join or Left Semi Join returns exclusively customer rows present in the VIP list without expanding unmatched rows.',
  },
  {
    id: 'pl300-42',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'When sorting a bar chart showing Month Names (`April, August, December, February...`) alphabetically instead of chronologically, how do you fix the sort order permanently across all visuals?',
    options: [
      'Select `DimDate[MonthName]` in Data/Model view -> "Sort by column" -> choose `DimDate[MonthNumber]`',
      'Prefix every month string with emojis',
      'Recreate the chart as a Pie chart',
      'Sort descending by Total Sales',
    ],
    correctIndex: 0,
    explanation:
      'Configuring `Sort by column` on `MonthName` using an integer `MonthNumber` (1–12) enforces chronological sorting across every slicer and chart automatically.',
  },
  {
    id: 'pl300-43',
    domain: 'Manage and Secure Power BI',
    prompt:
      'What is the critical difference between Workspace `Contributor` vs Workspace `Viewer` roles regarding Row-Level Security (RLS)?',
    options: [
      'RLS rules restrict `Viewer` users only; `Admin`, `Member`, and `Contributor` users have write workspace rights and bypass RLS',
      '`Viewer` users bypass RLS while `Contributors` are filtered',
      'Only `Admin` bypasses RLS',
      'RLS blocks all four workspace roles equally',
    ],
    correctIndex: 0,
    explanation:
      'RLS is designed strictly for read-only consumers assigned the Workspace `Viewer` role (or App access); elevated workspace roles can edit models and therefore see all data.',
  },
  {
    id: 'pl300-44',
    domain: 'Model the Data',
    prompt:
      'A `DimProduct` table should never display surrogate integer keys (`ProductKey`) or internal helper columns (`IsCurrentRow`) inside the Report view field pane for self-service users. What simple action cleans the UX?',
    options: [
      'Mark surrogate keys and helper columns as **Hidden** in Model view (they still power relationships silently)',
      'Delete the `ProductKey` column completely from the model',
      'Rename all columns to underscores',
      'Disable Report view completely',
    ],
    correctIndex: 0,
    explanation:
      'Hiding foreign/surrogate keys keeps the relationship engine functional while presenting a clean, business-friendly field list to report creators.',
  },
  {
    id: 'pl300-45',
    domain: 'Visualize and Analyze the Data',
    prompt:
      'You configure a Power BI Dashboard tile alert when Daily Defect Rate exceeds `2.5%` and want Power Automate to create a Microsoft Teams incident message immediately. Which Power BI object supports native Data Alerts?',
    options: [
      'KPI, Gauge, or Card tiles pinned onto a Power BI Service Dashboard',
      'Multi-page Power BI Desktop tables directly',
      'Unpinned Slicer visuals inside PBIX',
      'Power Query diagnostic logs',
    ],
    correctIndex: 0,
    explanation:
      'Native Power BI threshold Alerts (triggering email or Power Automate flows) attach exclusively to numeric Gauge, KPI, and Card tiles pinned to a Service Dashboard.',
  },
];

export const NETWORK_PLUS_N10_009_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'n10-16',
    domain: 'Networking Concepts',
    prompt:
      'Which OSI Layer translates application data encryption (TLS), compression, and character encoding schemas before passing sessions down toward Transport?',
    options: [
      'Layer 3 (Network)',
      'Layer 6 (Presentation)',
      'Layer 2 (Data Link)',
      'Layer 4 (Transport)',
    ],
    correctIndex: 1,
    explanation:
      'OSI Layer 6 (Presentation) handles formatting, serialization, compression, and encryption standards.',
  },
  {
    id: 'n10-17',
    domain: 'Network Implementation',
    prompt:
      'A branch office VoIP phone shares a single wall Ethernet drop with a desktop PC behind it. Which switchport feature assigns voice frames to VLAN 20 dynamically while untagged PC traffic stays on VLAN 10?',
    options: [
      'Voice VLAN (`switchport voice vlan 20`) + LLDP-MED advertisement',
      'PortFast disabled with BPDU Guard off',
      'Splitting Cat6 into two 4-wire pairs manually',
      'Putting both devices on a Hub',
    ],
    correctIndex: 0,
    explanation:
      'Voice VLAN uses LLDP-MED/CDP so the IP phone tags voice packets onto VLAN 20 while forwarding PC traffic untagged onto the access VLAN.',
  },
  {
    id: 'n10-18',
    domain: 'Network Operations',
    prompt:
      'An administrator wants real-time link utilization, CPU temperature, and interface CRC error graphs across 40 core switches without logging into each CLI manually. Which protocol polls these counters from an NMS?',
    options: [
      'SNMPv3 (polling MIB OIDs over UDP 161)',
      'TFTP over UDP 69',
      'ARP broadcast sweeps',
      'Telnet TCP 23 scraping',
    ],
    correctIndex: 0,
    explanation:
      'SNMPv3 securely polls structured Management Information Base (MIB) OIDs on managed network hardware over UDP 161.',
  },
  {
    id: 'n10-19',
    domain: 'Network Security',
    prompt:
      'Employees report their wired Ethernet laptops work only after entering AD/certificate credentials via an 802.1X supplicant against a RADIUS server. What role does the Ethernet switch perform in 802.1X?',
    options: [
      'Authenticator (relaying EAP over LAN frames to RADIUS)',
      'Certificate Authority root issuer',
      'External DNS resolver',
      'VPN concentrator',
    ],
    correctIndex: 0,
    explanation:
      'In IEEE 802.1X, the workstation is the Supplicant, the switch/AP acts as the Authenticator, and RADIUS serves as the Authentication Server.',
  },
  {
    id: 'n10-20',
    domain: 'Network Troubleshooting',
    prompt:
      'A technician tests a freshly terminated horizontal Cat6 run and observes "Split Pair" on a wire-map cable tester. What symptom occurs if left deployed?',
    options: [
      'Severe Near-End Crosstalk (NEXT) causing packet drops and link speed degradation even though pin-to-pin continuity reads 1-to-1',
      'PoE switches explode immediately',
      'IPv6 automatically takes over from IPv4',
      'No impact on 1000BASE-T Gigabit speeds',
    ],
    correctIndex: 0,
    explanation:
      'Split pairs match pin numbers end-to-end (passing simple continuity tests) but put transmit/receive signals across mismatched twisted pairs, creating severe crosstalk.',
  },
  {
    id: 'n10-21',
    domain: 'Networking Concepts',
    prompt:
      'How many usable host IPv4 addresses are available inside subnet `172.24.16.0/26` on a traditional corporate LAN?',
    options: [
      '62 usable hosts (`64 total - 2`)',
      '30 usable hosts',
      '126 usable hosts',
      '254 usable hosts',
    ],
    correctIndex: 0,
    explanation:
      'A `/26` subnet (`255.255.255.192`) leaves 6 host bits -> `2^6 = 64` total IPs -> `62` usable hosts (excluding network `.0` and broadcast `.63`).',
  },
  {
    id: 'n10-22',
    domain: 'Network Implementation',
    prompt:
      'Compare 2.4 GHz Wi-Fi non-overlapping channels in North America (`1, 6, 11`) vs 5 GHz (`UNII-1/2/3`). Why do high-density enterprise offices standardize critical laptops on 5 GHz / 6 GHz (`Wi-Fi 6E`)?',
    options: [
      'Far more non-overlapping channels and 20/40/80 MHz spectrum capacity with minimal adjacent Bluetooth/microwave co-channel interference',
      '5 GHz penetrates concrete walls twice as far as 2.4 GHz',
      '2.4 GHz supports WPA3 whereas 5 GHz only runs WEP',
      '5 GHz disables DHCP leases automatically',
    ],
    correctIndex: 0,
    explanation:
      '2.4 GHz offers only 3 non-overlapping 20 MHz channels (`1, 6, 11`), whereas 5 GHz and 6 GHz unlock dozens of clean non-overlapping channels for high client density.',
  },
  {
    id: 'n10-23',
    domain: 'Network Operations',
    prompt:
      'Why must Active Directory Domain Controllers and firewall clusters synchronize clocks within milliseconds using NTP (`UDP 123`)?',
    options: [
      'Kerberos authentication tickets reject sign-ins with >5 minutes clock skew, and SIEM log correlation breaks without accurate timestamps',
      'NTP increases Ethernet MTU to 9000 bytes',
      'DNS port 53 refuses queries without NTP Stratum-0',
      'VLAN trunking disables STP without NTP',
    ],
    correctIndex: 0,
    explanation:
      'Kerberos enforces a strict 5-minute default clock skew tolerance against replay attacks, and accurate incident forensics depend on synchronized NTP timestamps.',
  },
  {
    id: 'n10-24',
    domain: 'Network Security',
    prompt:
      'A wireless network transitions from WPA2-PSK to WPA3-Personal (`SAE`). What password attack against captured 4-way handshakes does SAE (`Simultaneous Authentication of Equals`) neutralize?',
    options: [
      'Offline dictionary cracking of captured PMKID / 4-way handshake frames',
      'Physical unplugging of the AP ceiling Ethernet cable',
      'MAC address spoofing completely',
      'ARP poisoning on wired VLANs',
    ],
    correctIndex: 0,
    explanation:
      'WPA3 SAE (Dragonfly handshake) eliminates offline dictionary cracking by deriving unique ephemeral session keys with forward secrecy.',
  },
  {
    id: 'n10-25',
    domain: 'Network Troubleshooting',
    prompt:
      'A user can `ping 8.8.8.8` successfully with 14ms latency, yet `ping portal.learnify-solutions.com` returns `Ping request could not find host`. Which command diagnoses DNS resolution failure cleanly?',
    options: [
      '`nslookup` or `dig` to inspect which DNS server answered or timed out',
      '`arp -a` on the switch',
      '`tracert -d 127.0.0.1`',
      '`netstat -s`',
    ],
    correctIndex: 0,
    explanation:
      'Successful IP pings with failed hostname lookups isolate the issue to DNS (Layer 7), verified directly with `nslookup` or `dig`.',
  },
  {
    id: 'n10-26',
    domain: 'Networking Concepts',
    prompt:
      'What happens when an Ethernet frame enters a managed switch whose destination MAC address is NOT yet present in the switch’s MAC address table?',
    options: [
      'The switch floods the unknown unicast frame out all ports within that same VLAN except the ingress port',
      'The switch silently drops the frame immediately',
      'The switch broadcasts an ICMP Destination Unreachable packet',
      'The switch sends the frame out the default gateway router port only',
    ],
    correctIndex: 0,
    explanation:
      'Unknown unicasts (along with broadcasts and multicasts) are flooded out all active switchports inside the same broadcast domain/VLAN except the incoming port.',
  },
  {
    id: 'n10-27',
    domain: 'Network Implementation',
    prompt:
      'Which PoE standard delivers up to `30W` (`PoE+`) per Ethernet port—sufficient for dual-radio enterprise Wi-Fi 6 access points and PTZ security cameras?',
    options: [
      'IEEE 802.3at (PoE+)',
      'IEEE 802.3af (15.4W max)',
      'IEEE 802.1Q VLAN tagging',
      'IEEE 802.3ae (10Gb Fiber)',
    ],
    correctIndex: 0,
    explanation:
      '802.3af delivers up to 15.4W, 802.3at (PoE+) delivers up to 30W, and 802.3bt (PoE++) delivers 60W–90W.',
  },
  {
    id: 'n10-28',
    domain: 'Network Operations',
    prompt:
      'An organization maintains redundant internet uplinks across two separate ISPs using BGP and monitors latency/jitter dynamically across MPLS and broadband links to steer VoIP calls over the best path. What modern WAN technology does this describe?',
    options: [
      'Software-Defined WAN (SD-WAN)',
      'Token Ring multi-station access unit',
      'Dial-up ISDN bonding',
      'Hub-and-spoke RIPv1',
    ],
    correctIndex: 0,
    explanation:
      'SD-WAN abstracts physical broadband, LTE/5G, and MPLS circuits behind application-aware SLA path steering and centralized orchestration.',
  },
  {
    id: 'n10-29',
    domain: 'Network Security',
    prompt:
      'During a routine port scan audit, a switchport configured with `BPDU Guard` receives a Spanning Tree BPDU from a classroom wall jack where a student plugged in a cheap desktop switch. What happens immediately?',
    options: [
      'The port transitions immediately to `err-disabled` state to protect the Spanning Tree topology',
      'The student switch becomes the enterprise Root Bridge',
      'BPDU Guard forwards broadcasts across all VLANs',
      'Nothing happens because BPDU Guard is passive',
    ],
    correctIndex: 0,
    explanation:
      'BPDU Guard prevents unauthorized switches connected to edge access ports from altering STP topology by shutting the port into `err-disabled`.',
  },
  {
    id: 'n10-30',
    domain: 'Network Troubleshooting',
    prompt:
      'Users on VLAN 10 suddenly receive `169.254.14.88` IP addresses instead of `10.10.10.x` after a router replacement, even though the central Windows DHCP server (`10.10.99.5`) is online. What router setting was forgotten?',
    options: [
      '`ip helper-address 10.10.99.5` (DHCP Relay Agent) on the VLAN 10 SVI/subinterface',
      'Setting subnet mask to `/32` on workstations',
      'Enabling NAT Overload inside VLAN 10',
      'Disabling ARP replies on switches',
    ],
    correctIndex: 0,
    explanation:
      'DHCP Discover packets are Layer 2/3 broadcasts blocked by routers; a DHCP Relay (`ip helper-address`) is mandatory to forward requests across subnets.',
  },
  {
    id: 'n10-31',
    domain: 'Networking Concepts',
    prompt:
      'Compare TCP vs UDP for real-time live video conferencing and online multiplayer telemetry. Why is UDP chosen despite having zero built-in retransmission?',
    options: [
      'UDP eliminates head-of-line blocking, handshake overhead, and late packet retransmission stalls that corrupt real-time audio/video sync',
      'UDP guarantees 100% in-order arrival across every hop',
      'UDP encrypts packets automatically at Layer 4',
      'TCP cannot carry payloads larger than 64 bytes',
    ],
    correctIndex: 0,
    explanation:
      'Stale retransmitted voice/video packets arrive too late to play smoothly; low-overhead UDP prioritizes timely delivery while application codecs handle packet loss concealment.',
  },
  {
    id: 'n10-32',
    domain: 'Network Implementation',
    prompt:
      'A datacenter racks 400G fiber uplinks between leaf and spine switches (`150 meters` apart) using OM4 multi-mode fiber. Which connector type commonly pairs with high-density 40G/100G parallel multi-mode transceivers?',
    options: [
      'MPO / MTP multi-fiber push-on connector (or LC duplex for 10G/25G SFP28)',
      'RG-6 Coaxial F-connector',
      'RJ-11 phone jack',
      'BNC bayonet connector',
    ],
    correctIndex: 0,
    explanation:
      'High-density parallel QSFP+/QSFP28 SR4 optics use 8- or 12-fiber MPO/MTP connectors, while standard 10G/25G links use LC duplex.',
  },
  {
    id: 'n10-33',
    domain: 'Network Operations',
    prompt:
      'In a spine-leaf data center fabric, why does traffic between any two servers ALWAYS traverse the exact same predictable hop count (`leaf -> spine -> leaf`) regardless of rack location?',
    options: [
      'Every leaf switch uplinks to every spine switch (no leaf-to-leaf cross-links), yielding deterministic east-west latency',
      'Spine switches use Token Passing tokens',
      'Leaf switches connect in a flat 10-switch daisy chain',
      'STP blocks 90% of leaf ports',
    ],
    correctIndex: 0,
    explanation:
      'Clos spine-leaf fabrics connect each leaf switch to every spine using Layer 3 ECMP/VXLAN, eliminating STP blocked links and guaranteeing uniform east-west latency.',
  },
  {
    id: 'n10-34',
    domain: 'Network Security',
    prompt:
      'A security architect deploys Dynamic ARP Inspection (`DAI`) across access switches. Which underlying switch table must be populated FIRST so DAI knows which IP-to-MAC bindings are authentic?',
    options: [
      'DHCP Snooping Binding Database',
      'BGP Autonomous System path table',
      'LLDP neighboring switch firmware list',
      'DNS reverse lookup PTR cache',
    ],
    correctIndex: 0,
    explanation:
      'DAI validates incoming ARP replies against the trusted IP-to-MAC-to-Port bindings learned passively via DHCP Snooping (plus static ARP ACLs).',
  },
  {
    id: 'n10-35',
    domain: 'Network Troubleshooting',
    prompt:
      'You run `ping -f -l 1472 10.50.1.10` across a newly built GRE/IPsec VPN tunnel and receive `Packet needs to be fragmented but DF set`. Reducing the payload `-l 1380` succeeds. What root cause occurred?',
    options: [
      'Path MTU mismatch caused by IPSec/GRE encapsulation headers shrinking effective inner payload MTU below 1500 bytes (fix via MSS clamping/PMTUD)',
      'A damaged RJ-45 patch cable on Switch1',
      'Expired TLS website SSL certificate',
      'ICMP is completely blocked by the destination host',
    ],
    correctIndex: 0,
    explanation:
      'VPN encapsulation adds ~50–90 bytes of outer header; clamping TCP MSS (e.g. `1360`–`1400`) and permitting ICMP Type 3 Code 4 prevents PMTUD black-holing.',
  },
  {
    id: 'n10-36',
    domain: 'Networking Concepts',
    prompt:
      'Which special IPv4 address block (`127.0.0.0/8`) tests whether the local workstation TCP/IP software stack operates properly without sending frames onto the Ethernet wire?',
    options: [
      'Loopback range (`127.0.0.1`)',
      'APIPA range (`169.254.0.0/16`)',
      'RFC 1918 Private Class A (`10.0.0.0/8`)',
      'CGNAT range (`100.64.0.0/10`)',
    ],
    correctIndex: 0,
    explanation:
      'Loopback `127.0.0.1` (and IPv6 `::1`) routes internally inside the OS kernel TCP/IP stack without touching physical NIC hardware.',
  },
  {
    id: 'n10-37',
    domain: 'Network Implementation',
    prompt:
      'An administrator wants a clean way to identify physical cable patch panels matching wall-jack labels across a 6-floor office building. Which documentation artifact captures horizontal drop IDs, patch panel ports, and switch ports?',
    options: [
      'Layer 1 Cable & MDF/IDF Patch Panel Map / Rack Elevation Diagram',
      'RFC 1918 NAT translation table',
      'Firewall stateful session table',
      'BGP route reflector topology',
    ],
    correctIndex: 0,
    explanation:
      'Maintaining MDF/IDF rack elevations, cable termination logs, and logical diagrams dramatically shrinks Layer 1–3 troubleshooting MTTR.',
  },
  {
    id: 'n10-38',
    domain: 'Network Operations',
    prompt:
      'When sending switch audit logs to a centralized SIEM over unreliable UDP (`514`) vs encrypted TCP (`6514`), which protocol ensures tamper-resistant, guaranteed log delivery?',
    options: [
      'Syslog over TLS (`TCP 6514`)',
      'Legacy Syslog over UDP `514` without authentication',
      'FTP port `21` uploads',
      'SNMPv1 plaintext traps',
    ],
    correctIndex: 0,
    explanation:
      'Syslog over TLS (RFC 5425, port 6514) encrypts log streams in transit and guarantees ordered TCP transport delivery.',
  },
  {
    id: 'n10-39',
    domain: 'Network Security',
    prompt:
      'An engineer discovers an employee brought a personal Wi-Fi router from home and plugged its LAN port into an office wall jack, handing out `192.168.1.x` IPs to nearby desks. Which switch security feature blocks unauthorized DHCP Offer packets?',
    options: [
      'DHCP Snooping (marking only uplink ports to legitimate DHCP servers as `trusted`)',
      'Enabling PortFast on uplinks',
      'Turning on Telnet management',
      'Removing VLAN 1',
    ],
    correctIndex: 0,
    explanation:
      'DHCP Snooping drops DHCP Server Offers/ACKs received on untrusted access ports, stopping rogue home routers cold.',
  },
  {
    id: 'n10-40',
    domain: 'Network Troubleshooting',
    prompt:
      'Users report extremely slow file downloads over a 1 Gbps switchport, and `show interfaces` reveals thousands of `Late Collisions` and `Runts` on one server link. What configuration mismatch typically causes this?',
    options: [
      'Duplex mismatch (one side hardcoded to Full Duplex while the peer fell back to Half Duplex via autonegotiation)',
      'Wrong DNS suffix search order',
      'Expired NTP stratum 2 server',
      'Missing default gateway on a Layer 2 switch',
    ],
    correctIndex: 0,
    explanation:
      'Hardcoding full duplex on one end forces the autonegotiating peer to default to half duplex, producing late collisions and heavy CRC/runt drops.',
  },
  {
    id: 'n10-41',
    domain: 'Networking Concepts',
    prompt:
      'In BGP inter-domain routing across the internet, which metric attribute do autonomous systems exchange and inspect when selecting loop-free paths between ISPs?',
    options: [
      'AS_PATH vector alongside Local Preference and MED',
      'Hop count capped at 15 routers (RIP)',
      'Interface bandwidth cost inverse (`10^8 / BW`)',
      'STP Bridge Priority',
    ],
    correctIndex: 0,
    explanation:
      'BGP is a Path-Vector protocol relying on `AS_PATH` (loop prevention + AS hop length) alongside policy attributes like Local Preference and MED.',
  },
  {
    id: 'n10-42',
    domain: 'Network Implementation',
    prompt:
      'A warehouse deploys barcode scanners running in an automated 2.4/5 GHz environment. You measure Received Signal Strength Indicator (`RSSI`) at `-84 dBm` in a far corner, causing constant disconnects. What target RSSI should an enterprise Wi-Fi survey achieve for reliable data/VoIP?',
    options: [
      '`-65 dBm` to `-67 dBm` or stronger (closer to `-50 dBm`)',
      '`-95 dBm`',
      '`-110 dBm`',
      '`0 dBm` exclusively',
    ],
    correctIndex: 0,
    explanation:
      'Remember negative dBm scales: `-65 dBm` is much stronger than `-84 dBm`; voice/enterprise roaming requires roughly `-67 dBm` or better with >=25 dB SNR.',
  },
  {
    id: 'n10-43',
    domain: 'Network Operations',
    prompt:
      'Which flow telemetry format exports NetFlow/IPFIX session records (source/dest IP, ports, byte volume, protocols) without storing full multi-terabyte packet payloads?',
    options: [
      'NetFlow / sFlow / IPFIX telemetry exported to a collector',
      'Full `tcpdump` raw `.pcap` dumps on every WAN port permanently',
      'LLDP topology neighbor tables',
      'TFTP startup-config backups',
    ],
    correctIndex: 0,
    explanation:
      'NetFlow/IPFIX/sFlow capture lightweight L3/L4 session metadata ("who talked to whom, on what port, and how much data") ideal for capacity planning and anomaly hunting.',
  },
  {
    id: 'n10-44',
    domain: 'Network Security',
    prompt:
      'Compare a standard Network Intrusion Detection System (IDS) vs an Intrusion Prevention System (IPS). Where does an IPS sit architecturally?',
    options: [
      'Inline in the live packet forwarding path so it can actively drop malicious flows in real time',
      'Passively connected to a mirrored SPAN/TAP port only',
      'Mounted exclusively inside a workstation browser extension',
      'Hosted off-site as an email spam archive',
    ],
    correctIndex: 0,
    explanation:
      'An IPS operates inline so it can block/reset malicious sessions immediately, whereas a passive IDS analyzes mirrored SPAN/TAP copies out-of-band.',
  },
  {
    id: 'n10-45',
    domain: 'Network Troubleshooting',
    prompt:
      'A Linux web server listens locally on `127.0.0.1:8080` instead of `0.0.0.0:8080`. External clients connecting to `http://10.0.5.20:8080` receive `Connection Refused` even with the firewall disabled. What diagnostic tool immediately exposes this binding error?',
    options: [
      '`ss -tulnp` showing the process bound solely to loopback `127.0.0.1:8080`',
      '`nslookup` against Google DNS',
      '`ethtool` cable link speed',
      '`ping -c 4 10.0.5.20`',
    ],
    correctIndex: 0,
    explanation:
      '`ss -tulnp` inspects active kernel listening sockets, revealing instantly when an app binds exclusively to `127.0.0.1` instead of `0.0.0.0` or the NIC IP.',
  },
];

export const AZURE_AI_102_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'ai102-16',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'When tuning an Azure OpenAI GPT deployment for deterministic JSON schema extraction from invoices, which inference parameters minimize creative hallucination?',
    options: [
      'Set `temperature` close to `0.0` and enforce `response_format: { type: "json_schema" }` (Structured Outputs)',
      'Set `temperature` to `1.8` and `top_p` to `1.0`',
      'Increase `presence_penalty` to `2.0`',
      'Disable system instructions completely',
    ],
    correctIndex: 0,
    explanation:
      'Low temperature (`0`–`0.2`) paired with Structured Outputs (`json_schema`) yields consistent, schema-valid deterministic extraction.',
  },
  {
    id: 'ai102-17',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'Your healthcare enterprise calls Azure OpenAI from an AKS backend in `eastus2` and mandates zero API keys stored in code plus zero public internet traversal. Which security architecture satisfies both rules?',
    options: [
      'Authenticate AKS pods using Entra Workload Identity (Managed Identity token) over an Azure Private Endpoint inside the VNet',
      'Pass the primary subscription key in query string `?api-key=...`',
      'Disable RBAC and allow `All Networks` on the Azure AI resource',
      'Use an unauthenticated Azure Function proxy',
    ],
    correctIndex: 0,
    explanation:
      'Entra Managed Identity / Workload Identity eliminates API keys (`Cognitive Services OpenAI User`), while Private Endpoints keep inference traffic strictly on the private VNet.',
  },
  {
    id: 'ai102-18',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'An Azure AI Search index must ingest scanned PDFs, extract embedded tables via OCR, compute `text-embedding-3-large` vectors, and index chunks into searchable fields automatically on blob upload. Which pipeline component orchestrates this?',
    options: [
      'Azure AI Search Indexer paired with a custom/built-in Skillset (OCR + Text Split + Azure OpenAI Embedding Skill)',
      'Manual CSV upload via Azure Storage Explorer',
      'Azure Logic App deleting PDFs after 10 minutes',
      'Azure Content Moderator text list alone',
    ],
    correctIndex: 0,
    explanation:
      'AI Search Indexers execute multi-stage AI enrichment Skillsets—combining OCR cracking, chunking, and integrated vectorization automatically.',
  },
  {
    id: 'ai102-19',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'A customer support bot receives complex multi-sentence requests combining FAQs ("How do I reset my PIN?") and transactional intents ("Cancel order #8821"). Which Azure AI Language service unifies custom intent/entity classification with static Q&A pairs cleanly?',
    options: [
      'Orchestration Workflow in Azure AI Language Studio bridging Conversational Language Understanding (CLU) and Custom Question Answering',
      'Azure AI Vision Image Analysis `4.0`',
      'Azure OpenAI Whisper speech transcription only',
      'Azure Anomaly Detector',
    ],
    correctIndex: 0,
    explanation:
      'Language Studio Orchestration Workflows route incoming user utterances intelligently between CLU intent models and Custom Question Answering knowledge bases.',
  },
  {
    id: 'ai102-20',
    domain: 'Implement Computer Vision Solutions',
    prompt:
      'A factory quality camera captures PCB circuit boards and needs bounding-box pixel coordinates locating missing capacitors (`Object Detection`) rather than one whole-image pass/fail tag. Which Azure AI Vision / Custom Vision project type is required?',
    options: [
      'Object Detection project returning class labels plus normalized `(left, top, width, height)` bounding boxes',
      'Single-label Image Classification project',
      'Azure AI Translator document mode',
      'Speech-to-Text batch API',
    ],
    correctIndex: 0,
    explanation:
      'Image Classification assigns tags to the entire image, whereas Object Detection locates multiple items and outputs exact bounding-box coordinates.',
  },
  {
    id: 'ai102-21',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'During RAG retrieval evaluation, your chatbot occasionally omits verifiable citations or fabricates figures not present in retrieved chunks. Which Azure AI Foundry / Content Safety check scores whether claims trace strictly to retrieved context?',
    options: [
      'Groundedness evaluation & Azure AI Content Safety Groundedness Detection',
      'Increasing `max_tokens` to `16000`',
      'Speech Recognition Word Error Rate (WER)',
      'Image Captioning confidence',
    ],
    correctIndex: 0,
    explanation:
      'Groundedness metrics evaluate whether model responses are factually anchored inside the supplied retrieval documents rather than hallucinated.',
  },
  {
    id: 'ai102-22',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'A multi-tenant SaaS app hits `HTTP 429 Too Many Requests` bursts on one regional Azure OpenAI `Standard` deployment during European business hours. How do you maximize reliability and throughput with minimal code rewrite?',
    options: [
      'Front multiple regional OpenAI deployments with Azure API Management (APIM) load-balancing / failover on 429 or reserve Provisioned Throughput Units (PTUs)',
      'Put `sleep(60)` loops directly in browser JavaScript',
      'Delete system prompts from every API call',
      'Create 100 identical keys on the exact same single deployment',
    ],
    correctIndex: 0,
    explanation:
      'APIM circuit-breaking across multi-region Azure OpenAI endpoints or Provisioned Throughput Units (PTUs) absorbs spikes gracefully without 429 failures.',
  },
  {
    id: 'ai102-23',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'A global accounting team needs structured line items, vendor tax IDs, and totals extracted from thousands of varied international supplier invoices without manually labeling 500 templates. Which Document Intelligence model works out of the box?',
    options: [
      'Prebuilt Invoice model (`prebuilt-invoice`) in Azure AI Document Intelligence',
      'Custom Neural model trained from scratch with zero prebuilt weights',
      'Azure AI Face verification API',
      'Text Analytics Sentiment v3',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Document Intelligence includes a production-trained `prebuilt-invoice` model extracting merchant info, tax IDs, totals, and line items immediately.',
  },
  {
    id: 'ai102-24',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'Before archiving customer chat transcripts for analytics in an EU region, an application must automatically mask personal credit card numbers, IBANs, and phone numbers (`***`). Which Azure AI Language feature handles this?',
    options: [
      'Personally Identifiable Information (PII) detection and redaction (`RecognizePiiEntities`)',
      'Key Phrase Extraction only',
      'Semantic Vector Search',
      'Speech SSML `<prosody>` tags',
    ],
    correctIndex: 0,
    explanation:
      '`RecognizePiiEntities` identifies sensitive categories (IBAN, SSN, phone, credit card) and returns redacted text strings alongside entity offsets.',
  },
  {
    id: 'ai102-25',
    domain: 'Implement Computer Vision Solutions',
    prompt:
      'You need to blur all employee faces automatically inside recorded warehouse safety footage for GDPR privacy compliance using Azure AI Vision / Video Indexer. Which capability detects faces for anonymization?',
    options: [
      'Face Detection returning face rectangles (without requiring Sensitive Face Identification/Recognition approval)',
      'Azure OpenAI DALL-E image generation',
      'Custom Translator glossary',
      'Read OCR printed text API',
    ],
    correctIndex: 0,
    explanation:
      'Basic face rectangle detection locates face coordinates for privacy blurring without invoking restricted biometric identification/verification features.',
  },
  {
    id: 'ai102-26',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'You must enforce corporate security against indirect prompt injections embedded inside untrusted scraped webpages or uploaded user PDFs fed into an LLM RAG prompt. Which Azure AI Content Safety guard detects these attacks?',
    options: [
      'Prompt Shields (evaluating both User Prompt and Indirect Document/Tool inputs)',
      'Increasing temperature above `0.9`',
      'Azure Storage Soft Delete',
      'Enabling Azure Advisor alerts',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Content Safety Prompt Shields inspect both direct user jailbreaks and indirect injections hidden inside retrieved RAG documents.',
  },
  {
    id: 'ai102-27',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'Under Azure Monitor diagnostics for Azure OpenAI, which telemetry metric helps FinOps teams forecast token billing and detect abnormally long RAG prompts across deployments?',
    options: [
      '`ProcessedPromptTokens` and `GeneratedCompletionTokens` metrics in Azure Monitor',
      'Disk Queue Length on OS disks',
      'NSG Dropped Packet Count',
      'BGP ASN route count',
    ],
    correctIndex: 0,
    explanation:
      'Azure OpenAI emits granular prompt vs completion token metrics, latency, and RPM/TPM utilization directly to Azure Monitor.',
  },
  {
    id: 'ai102-28',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'In Azure AI Search, why does combining BM25 keyword search + Vector similarity (`Hybrid Search`) with Semantic Ranking outperform pure vector search on technical enterprise manuals?',
    options: [
      'Keyword BM25 preserves exact error codes/SKUs (`AZ-104`, `ERR_4092`) while vector embeddings capture conceptual intent and Semantic Ranking re-orders top hits via cross-encoder',
      'Vector search ignores English punctuation completely',
      'BM25 cannot index numbers',
      'Semantic Ranking deletes half of your document chunks randomly',
    ],
    correctIndex: 0,
    explanation:
      'Hybrid search (Vector + BM25 via RRF) plus L2 Semantic Ranking combines exact term recall (`SKUs`, codes) with deep contextual relevance.',
  },
  {
    id: 'ai102-29',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'A call-center transcription pipeline converts multi-speaker support recordings into text and needs to distinguish `"Agent:"` vs `"Customer:"` turns accurately alongside domain jargon (`Learnify`, `Kubernetes`). Which two Azure AI Speech features apply?',
    options: [
      'Conversation Transcription / Speaker Diarization + Custom Speech Phrase List / Acoustic adaptation',
      'Text-to-Speech SSML only',
      'Document Intelligence Layout model',
      'Azure AI Translator Document Batch API',
    ],
    correctIndex: 0,
    explanation:
      'Diarization attributes utterances per speaker (`Guest-1`, `Guest-2`), while Phrase Lists or Custom Speech boost recognition accuracy for proprietary product names.',
  },
  {
    id: 'ai102-30',
    domain: 'Implement Computer Vision Solutions',
    prompt:
      'Compare `Read` OCR inside Azure AI Vision 4.0 vs Azure AI Document Intelligence `Layout` model. When should an architect pick Document Intelligence `Layout` instead of basic Vision Read OCR?',
    options: [
      'When preserving structured tables, rows/columns, selection checkboxes, section headings, and Markdown hierarchy for downstream RAG chunking',
      'When classifying dog breeds in JPEGs',
      'When streaming real-time 60fps drone video',
      'When translating audio streams',
    ],
    correctIndex: 0,
    explanation:
      'Document Intelligence `Layout` returns structural markdown, row/column table grids, key-value pairs, and selection marks ideal for enterprise documents and RAG.',
  },
  {
    id: 'ai102-31',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'An AI agent needs to query a live SQL inventory API rather than guessing stock numbers. How does Azure OpenAI Tool / Function Calling work safely?',
    options: [
      'The model emits structured JSON specifying the tool name & validated arguments; your application executes the authorized API and returns the result for final synthesis',
      'The model opens direct root SSH sockets to SQL servers itself',
      'The model compiles C# binaries inside the browser',
      'Tool calling replaces HTTPS TLS encryption',
    ],
    correctIndex: 0,
    explanation:
      'Function/Tool calling never lets the LLM execute code directly—it returns structured tool invocation JSON executed strictly under your application’s RBAC checks.',
  },
  {
    id: 'ai102-32',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'You train a Custom Document Intelligence model for proprietary 5-page shipping manifests that exhibit shifting table positions across suppliers. Which model template achieves higher layout generalization?',
    options: [
      'Custom Neural model (`neural` build mode)',
      'Prebuilt Business Card model',
      'Custom Template (`template` fixed-coordinates only) across wildly varying layouts',
      'Sentiment Analysis v3',
    ],
    correctIndex: 0,
    explanation:
      'Custom Neural models use deep-learning layout transformers to generalize across semi-structured documents with shifting tables and diverse templates.',
  },
  {
    id: 'ai102-33',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'A defense contractor requires running OCR and Text Sentiment models inside an air-gapped on-premises factory datacenter with zero internet API transmission of payload data. What deployment model enables Azure AI Services offline?',
    options: [
      'Disconnected Azure AI Docker Containers (billed periodically via usage metering export or disconnected commitment)',
      'Calling public `cognitiveservices.azure.com` URLs without internet',
      'Deploying static HTML files to Azure Blob Storage',
      'Increasing Azure Firewall MTU',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Docker Containers run Vision/Language/Speech/Document containers locally on your own hardware, keeping sensitive data on-premises.',
  },
  {
    id: 'ai102-34',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'Your international training portal uses Azure AI Translator to localize English IT syllabi into German (`de`) and Dutch (`nl`), but product names like `"AZ-104"` and `"Learnify Solutions"` keep getting mistranslated. How do you protect exact terminology?',
    options: [
      'Supply a Custom Translator phrase/sentence dictionary or wrap protected spans in `<span class="notranslate">` tags (`textType=html`)',
      'Set `from=de` and `to=en` backwards',
      'Run Speech Synthesis before translating',
      'Strip all proper nouns before sending text',
    ],
    correctIndex: 0,
    explanation:
      'Dynamic Dictionary lookup, Custom Translator glossaries, or `class="notranslate"` HTML attributes lock brand terms and exam codes cleanly.',
  },
  {
    id: 'ai102-35',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'Why is `Chunk Overlap` (e.g., 10–15% sliding token overlap) recommended when splitting 40-page policy PDFs before indexing embeddings into Azure AI Search?',
    options: [
      'Overlap preserves sentences and contextual boundaries split across adjacent chunk borders so relevant facts aren’t truncated in half',
      'Overlap compresses vector dimensions from 1536 down to 12',
      'Overlap removes duplicates automatically from SQL Server',
      'Overlap disables cosine similarity scoring',
    ],
    correctIndex: 0,
    explanation:
      'Without chunk overlap, headings or sentences landing at chunk boundaries lose semantic context and fail top-k vector retrieval.',
  },
  {
    id: 'ai102-36',
    domain: 'Implement Computer Vision Solutions',
    prompt:
      'You deploy an Image Search prototype letting retailers find visually similar furniture products by embedding product photos into vectors. Which Azure AI Vision 4.0 feature computes unified image-and-text vectors?',
    options: [
      'Multimodal Embeddings (`vectorizeImage` and `vectorizeText` in unified vector space)',
      'Optical Character Recognition (`Read`)',
      'Speech-to-Text Phoneme matching',
      'Anomaly Detection univariate API',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Vision Multimodal Embeddings project both images and text descriptions into a shared vector space for cross-modal image retrieval.',
  },
  {
    id: 'ai102-37',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'During Azure AI Foundry model benchmarking across 200 golden Q&A pairs, which automated RAG metrics evaluate retrieval relevance and answer helpfulness together?',
    options: [
      'Groundedness, Relevance, Coherence, Fluency, and Retrieval Score (`azure-ai-evaluation`)',
      'CPU Kernel context-switch latency only',
      'TCP window scaling factor',
      'Blob soft-delete retention days',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Foundry’s `azure-ai-evaluation` suite scores RAG pipelines quantitatively on Groundedness, Relevance, Coherence, Fluency, and F1/Similarity.',
  },
  {
    id: 'ai102-38',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'A voice assistant needs realistic custom pronunciation pauses, emphasis, and spelled-out exam acronyms (`S-Y-0-7-0-1`) when speaking via Azure AI Text-to-Speech. Which XML standard customizes synthesis output?',
    options: [
      'Speech Synthesis Markup Language (`SSML`) using `<break>`, `<say-as interpret-as="characters">`, and `<prosody>`',
      'GraphQL schema mutations',
      'YAML Kubernetes pod specs',
      'JSON Web Encryption (`JWE`)',
    ],
    correctIndex: 0,
    explanation:
      'SSML gives fine-grained programmatic control over Azure neural voice pauses, phoneme pronunciation, acronyms (`say-as`), and speaking rate.',
  },
  {
    id: 'ai102-39',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'An Azure AI Search index grows large and users notice slow results when filtering strictly by `Department eq \'Cybersecurity\'` and `Year ge 2025`. Which field attribute MUST be enabled on those schema fields?',
    options: [
      '`filterable: true` in the AI Search index field definition',
      '`searchable: false` and `retrievable: false` exclusively',
      '`analyzer: standard.lucene` on integer columns',
      '`hidden: true` across the entire index',
    ],
    correctIndex: 0,
    explanation:
      'Fields referenced in OData `$filter` clauses must explicitly declare `filterable: true` inside the AI Search index schema (while `facetable` enables sidebar counts).',
  },
  {
    id: 'ai102-40',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'What architectural benefit does Fine-Tuning an Azure OpenAI base model deliver OVER standard Prompt Engineering / RAG, and when is RAG usually better?',
    options: [
      'Fine-tuning teaches consistent response style/formatting/domain tone; RAG injects fresh factual knowledge and real-time enterprise citations cleanly',
      'Fine-tuning updates real-time stock prices automatically every second without external APIs',
      'Fine-tuning costs zero compute and skips evaluation datasets',
      'RAG disables system prompts permanently',
    ],
    correctIndex: 0,
    explanation:
      'Use RAG for dynamic factual knowledge and verifiable citations; reserve fine-tuning for strict formatting, tone, or shrinking massive few-shot system prompts.',
  },
  {
    id: 'ai102-41',
    domain: 'Plan and Manage an Azure AI Solution',
    prompt:
      'When enabling Microsoft’s Responsible AI safeguards on Azure OpenAI deployments, which four core harm categories can you tune with Low/Medium/High severity thresholds in Content Filters?',
    options: [
      'Hate, Sexual, Violence, and Self-Harm (plus Protected Material & Prompt Shields)',
      'CPU, RAM, Disk, and Network IOPS',
      'GDPR, HIPAA, SOX, and PCI-DSS schemas',
      'Latency, Jitter, Throughput, and Packet Loss',
    ],
    correctIndex: 0,
    explanation:
      'Azure AI Content Safety filters prompt and completion streams across Hate, Sexual, Violence, and Self-Harm severity levels (`0–7`), plus Protected Material and Prompt Shields.',
  },
  {
    id: 'ai102-42',
    domain: 'Implement Knowledge Mining and Document Intelligence',
    prompt:
      'You run an Azure AI Search Indexer against 50,000 JSON documents in Azure Blob Storage and want incremental runs to detect deleted blobs cleanly without re-indexing all 50,000 blobs nightly. Which Indexer policy tracks deletions?',
    options: [
      'Soft-Delete Column / Native Blob Soft Delete Deletion Detection Policy (`NativeBlobSoftDeleteDeletionDetectionPolicy`)',
      'Hard-deleting the entire Search Service daily',
      'Enabling CORS `*` on the Search endpoint',
      'Disabling Indexer schedules permanently',
    ],
    correctIndex: 0,
    explanation:
      'Configuring a Data Deletion Detection Policy (such as native blob soft-delete detection) lets Indexers remove stale search documents incrementally.',
  },
  {
    id: 'ai102-43',
    domain: 'Implement Computer Vision Solutions',
    prompt:
      'During Custom Vision training on 30 photos of damaged vs intact shipping crates, validation accuracy looks high on training images but fails on bright outdoor warehouse photos. What improvement helps most?',
    options: [
      'Expand and balance training images across varied lighting, camera angles, and cluttered backgrounds (data diversity)',
      'Shrink the dataset down to 3 identical images',
      'Disable tagging completely',
      'Convert all JPEGs into 10x10 pixel black-and-white bitmaps',
    ],
    correctIndex: 0,
    explanation:
      'Computer Vision models overfit rapidly to narrow studio backdrops; matching real deployment lighting, occlusions, and angles is critical for generalization.',
  },
  {
    id: 'ai102-44',
    domain: 'Implement Natural Language Processing Solutions',
    prompt:
      'A multinational customer service workflow must detect key entities (`Organization`, `DateTime`, `Quantity`) plus customer frustration scores (`Positive/Neutral/Negative`) across 10,000 daily support emails. Which Azure AI Language endpoints fulfill this cleanly?',
    options: [
      'Named Entity Recognition (`NER`) + Sentiment Analysis with Opinion Mining',
      'Azure AI Speech Synthesis alone',
      'Custom Vision Image Tagging',
      'Bing Spell Check v7 only',
    ],
    correctIndex: 0,
    explanation:
      'NER extracts structured entities while Sentiment Analysis + Opinion Mining scores document and aspect-level customer sentiment.',
  },
  {
    id: 'ai102-45',
    domain: 'Implement Generative AI Solutions',
    prompt:
      'Your RAG copilot indexes HR policy PDFs belonging to UK, Germany, and UAE subsidiaries into ONE shared Azure AI Search index. How do you guarantee a UK employee’s chat query NEVER retrieves Germany-only compensation documents?',
    options: [
      'Store security/region metadata (`group_ids` / `country`) on each indexed chunk and enforce mandatory server-side `$filter` clauses derived from the authenticated user’s Entra ID claims before passing chunks to the LLM',
      'Ask the LLM politely inside the system prompt not to mention German data',
      'Disable Azure AI Search authentication',
      'Store security filters only inside client-side browser cookies',
    ],
    correctIndex: 0,
    explanation:
      'Document-level security trimming in RAG must enforce deterministic server-side `$filter` constraints on the search query—never rely on LLM prompt instructions for access control.',
  },
];
