import { PracticeQuestion } from '../types';

export const COMPTIA_ITF_PLUS_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'itf-1',
    domain: 'IT Concepts and Terminology',
    prompt:
      'A junior technician converts a decimal IPv4 octet value of 192 into binary to verify a subnet mask calculation. What is the correct 8-bit binary representation of 192?',
    options: ['11000000', '10100000', '11100000', '10010000'],
    correctIndex: 0,
    explanation:
      'In 8-bit binary positional notation (128 + 64 + 32 + 16 + 8 + 4 + 2 + 1), turning on the 128 and 64 bits yields 128 + 64 = 192, which is written as 11000000.',
  },
  {
    id: 'itf-2',
    domain: 'IT Concepts and Terminology',
    prompt:
      'Which data type should a software developer assign when storing a postal ZIP code like "07030" so leading zeros are never stripped during database insertion?',
    options: ['Integer', 'Boolean', 'String / Char', 'Float'],
    correctIndex: 2,
    explanation:
      'Storing identifiers like ZIP codes or phone numbers as String/Char preserves leading zeros and formatting characters, whereas numeric types (Integer/Float) strip leading zeros.',
  },
  {
    id: 'itf-3',
    domain: 'IT Concepts and Terminology',
    prompt:
      'During an onboarding briefing, a helpdesk lead describes the four core computing stages in sequence: receiving keyboard strokes, calculating payroll totals, saving results to NVMe SSD, and rendering a PDF paystub. Which stage describes calculating totals?',
    options: ['Input', 'Processing', 'Storage', 'Output'],
    correctIndex: 1,
    explanation:
      'The four fundamental computing operations are Input (keyboard), Processing (CPU calculations), Storage (NVMe save), and Output (PDF display/print).',
  },
  {
    id: 'itf-4',
    domain: 'IT Concepts and Terminology',
    prompt:
      'Which storage throughput measurement represents approximately 1 billion bits transferred per second across a modern Gigabit Ethernet link?',
    options: ['1 MBps', '1 Gbps', '1 MiB', '1 TBps'],
    correctIndex: 1,
    explanation:
      'Network speeds are measured in bits per second using SI prefixes: 1 Gbps equals 1,000,000,000 bits per second (whereas uppercase B denotes bytes).',
  },
  {
    id: 'itf-5',
    domain: 'IT Concepts and Terminology',
    prompt:
      'A user complains that a desktop workstation takes 4 minutes to respond whenever multiple browser tabs are open, and disk LED activity stays at 100%. After checking Task Manager, what should the technician investigate first under CompTIA troubleshooting methodology?',
    options: [
      'Immediately replace the motherboard without testing',
      'Identify the problem and establish a theory of probable cause (e.g., low RAM causing heavy page-file swapping)',
      'Reinstall the entire operating system',
      'Ask the user to stop browsing',
    ],
    correctIndex: 1,
    explanation:
      'Step 1 of CompTIA troubleshooting is identifying symptoms and questioning the user; Step 2 is establishing a theory of probable cause such as insufficient RAM forcing swap/pagefile usage.',
  },
  {
    id: 'itf-6',
    domain: 'Infrastructure',
    prompt:
      'Which motherboard slot provides the highest dedicated bandwidth for installing a modern discrete graphics card (GPU) in an engineering CAD workstation?',
    options: ['PCIe x16', 'DDR5 DIMM', 'SATA III', 'PS/2'],
    correctIndex: 0,
    explanation:
      'PCI Express x16 (PCIe x16) provides 16 high-speed serial lanes directly wired for high-bandwidth expansion cards such as GPUs.',
  },
  {
    id: 'itf-7',
    domain: 'Infrastructure',
    prompt:
      'An administrator connects a high-resolution 4K 120Hz monitor that also carries uncompressed digital audio over a single locking cable without requiring royalty licensing fees on GPUs. Which interface is being used?',
    options: ['VGA (DE-15)', 'DisplayPort', 'DVI-D', 'RCA Composite'],
    correctIndex: 1,
    explanation:
      'DisplayPort carries high-refresh 4K/8K video plus multi-channel digital audio over one cable with an optional mechanical latch and royalty-free VESA standard.',
  },
  {
    id: 'itf-8',
    domain: 'Infrastructure',
    prompt:
      'Which volatile memory type loses all stored session data immediately when workstation AC power is disconnected?',
    options: ['NVMe M.2 SSD', 'EEPROM BIOS chip', 'DDR4 RAM', 'Optical Blu-ray disc'],
    correctIndex: 2,
    explanation:
      'RAM (Random Access Memory) is volatile memory used for active OS/application workspace and clears completely when power is removed.',
  },
  {
    id: 'itf-9',
    domain: 'Infrastructure',
    prompt:
      'A small clinic wants all wireless tablets to automatically receive IP addresses, subnet masks, default gateways, and DNS server addresses upon joining the office Wi-Fi. Which network service handles this?',
    options: ['DHCP', 'SNMP', 'SMTP', 'RDP'],
    correctIndex: 0,
    explanation:
      'Dynamic Host Configuration Protocol (DHCP) dynamically leases IPv4/IPv6 network configuration parameters to client endpoints via DORA.',
  },
  {
    id: 'itf-10',
    domain: 'Infrastructure',
    prompt:
      'Which short-range wireless technology operates in the 2.4 GHz band primarily for pairing keyboards, headsets, and mobile peripherals within roughly 10 meters?',
    options: ['NFC', 'Bluetooth', '5G mmWave', 'Satellite Ka-band'],
    correctIndex: 1,
    explanation:
      'Bluetooth establishes low-power Personal Area Networks (PANs) in the 2.4 GHz ISM band for peripherals within ~10 meters.',
  },
  {
    id: 'itf-11',
    domain: 'Infrastructure',
    prompt:
      'Which device acts as the central boundary separating a branch office LAN from the ISP WAN link while selecting optimal packet forwarding paths across networks?',
    options: ['Unmanaged Layer-2 Switch', 'Router', 'USB Hub', 'Patch Panel'],
    correctIndex: 1,
    explanation:
      'A router connects distinct IP networks (such as LAN to WAN/Internet), inspects Layer-3 IP addresses, and performs NAT/packet forwarding.',
  },
  {
    id: 'itf-12',
    domain: 'Applications and Software',
    prompt:
      'An operations manager needs an operating system designed to host multi-user file shares, Active Directory authentication, and virtual machines across 300 employees. Which OS category fits best?',
    options: [
      'Embedded RTOS',
      'Server Operating System (e.g., Windows Server or Ubuntu Server)',
      'Mobile OS',
      'Firmware bootloader',
    ],
    correctIndex: 1,
    explanation:
      'Server operating systems optimize background service concurrency, directory services, and remote administration rather than interactive desktop multimedia.',
  },
  {
    id: 'itf-13',
    domain: 'Applications and Software',
    prompt:
      'Which Windows utility allows a helpdesk engineer to force-terminate a frozen background process and inspect live CPU/RAM utilization per application?',
    options: ['Disk Defragmenter', 'Task Manager', 'Device Manager', 'Credential Manager'],
    correctIndex: 1,
    explanation:
      'Windows Task Manager provides real-time process CPU, memory, disk, and GPU usage telemetry and allows ending unresponsive tasks.',
  },
  {
    id: 'itf-14',
    domain: 'Applications and Software',
    prompt:
      'A company deploys an ERP application directly inside a web browser where all compute, patching, and backups are managed by the cloud vendor on a monthly per-user subscription. What deployment model is this?',
    options: ['Local desktop single-tier install', 'Software as a Service (SaaS)', 'Bare-metal hypervisor', 'Air-gapped intranet'],
    correctIndex: 1,
    explanation:
      'SaaS delivers ready-to-use applications over HTTPS with vendor-managed hosting, scaling, and maintenance.',
  },
  {
    id: 'itf-15',
    domain: 'Applications and Software',
    prompt:
      'What is the core function of a Type-1 (bare-metal) hypervisor installed directly onto enterprise server hardware?',
    options: [
      'Translating domain names into IPv4 addresses',
      'Abstracting physical CPU, RAM, and NIC resources to run multiple isolated Guest VMs concurrently',
      'Encrypting outbound browser cookies',
      'Scanning attachments for ransomware signatures',
    ],
    correctIndex: 1,
    explanation:
      'A Type-1 hypervisor (like ESXi, Hyper-V, or KVM) sits directly on physical hardware to allocate compute/memory/storage slices across multiple virtual machines.',
  },
  {
    id: 'itf-16',
    domain: 'Applications and Software',
    prompt:
      'During troubleshooting, a technician checks why an employee cannot open `.xlsx` spreadsheets even though Microsoft 365 is installed. Checking file type bindings in Windows Settings fixes what operating system mechanism?',
    options: ['Registry hive compression', 'File Associations / Default Apps', 'NTFS permissions', 'Pagefile sizing'],
    correctIndex: 1,
    explanation:
      'File extension associations instruct the OS shell which installed application binary should launch when a user opens a `.xlsx`, `.pdf`, or `.docx` file.',
  },
  {
    id: 'itf-17',
    domain: 'Software Development Concepts',
    prompt:
      'Why do modern teams compile high-level languages like C++ into native machine code before distributing desktop software, whereas Python scripts use an interpreter at runtime?',
    options: [
      'Compiled binaries run directly on the target CPU architecture with faster execution, while interpreted code runs line-by-line via a runtime',
      'Interpreted code does not require RAM',
      'Compiled languages cannot declare variables',
      'Python scripts bypass operating system security controls',
    ],
    correctIndex: 0,
    explanation:
      'Compilers translate full source code into CPU-specific machine instructions beforehand for speed; interpreters read and execute source/bytecode dynamically at runtime for portability.',
  },
  {
    id: 'itf-18',
    domain: 'Software Development Concepts',
    prompt:
      'A programmer writes a loop inside an automation script that must repeatedly poll a queue until a variable `isFinished` switches from `false` to `true`. What programming construct matches this behavior?',
    options: ['Constant declaration', 'While loop (branching + iteration)', 'Static array index', 'Comment block'],
    correctIndex: 1,
    explanation:
      'A while loop evaluates a boolean condition repeatedly and continues executing its code block until the condition becomes false.',
  },
  {
    id: 'itf-19',
    domain: 'Software Development Concepts',
    prompt:
      'Which programming structure stores a fixed ordered collection of multiple temperature readings under one variable name accessed via zero-based index numbers?',
    options: ['Boolean', 'Array / List', 'Character literal', 'Stored procedure'],
    correctIndex: 1,
    explanation:
      'An array stores multiple ordered values under a single variable identifier, retrieved by numeric index (starting at 0 in most modern languages).',
  },
  {
    id: 'itf-20',
    domain: 'Software Development Concepts',
    prompt:
      'What is the key difference between a Variable and a Constant in application source code?',
    options: [
      'Variables can only hold letters while constants hold decimals',
      'A variable value can change during execution, whereas a constant remains fixed after initialization',
      'Constants delete themselves after 5 seconds',
      'Variables cannot be used inside functions',
    ],
    correctIndex: 1,
    explanation:
      'Variables represent mutable memory values updated throughout execution; constants lock fixed values (such as tax rates or mathematical Pi) against accidental mutation.',
  },
  {
    id: 'itf-21',
    domain: 'Database Fundamentals',
    prompt:
      'A retail database maintains a `Customers` table and an `Orders` table linked together so every order references a valid `CustomerID`. What type of database is this, and what role does `CustomerID` serve in the `Orders` table?',
    options: [
      'Flat-file CSV; Primary Key',
      'Relational Database (RDBMS); Foreign Key',
      'Key-value cache; Checksum',
      'Unstructured Document store; Index Blob',
    ],
    correctIndex: 1,
    explanation:
      'Relational databases link structured tables through keys: `CustomerID` is the Primary Key in `Customers` and acts as a Foreign Key inside `Orders` to enforce referential integrity.',
  },
  {
    id: 'itf-22',
    domain: 'Database Fundamentals',
    prompt:
      'An analyst needs to retrieve ONLY customers located in "Dubai" from a SQL table named `Clients`. Which SQL clause filters rows matching that condition?',
    options: ['CREATE TABLE', 'WHERE City = \'Dubai\'', 'DROP COLUMN', 'TRUNCATE'],
    correctIndex: 1,
    explanation:
      'In SQL (DQL), the `WHERE` clause filters returned rows based on explicit logical criteria.',
  },
  {
    id: 'itf-23',
    domain: 'Database Fundamentals',
    prompt:
      'Which database backup strategy captures only rows and data pages modified since the most recent Full backup, resetting the archive bit?',
    options: ['Incremental backup', 'Differential backup', 'Unindexed export', 'Cold snapshot'],
    correctIndex: 0,
    explanation:
      'Incremental backups capture only changes made since the last backup of any kind and reset the archive flag, whereas Differential backups capture all cumulative changes since the last Full backup.',
  },
  {
    id: 'itf-24',
    domain: 'Database Fundamentals',
    prompt:
      'When storing millions of customer JSON documents with varying schema fields per record (like product reviews or IoT logs), which non-relational database category fits best?',
    options: ['Fixed relational spreadsheet', 'NoSQL Document Database', 'Hierarchical tape archive', 'BIOS flash table'],
    correctIndex: 1,
    explanation:
      'NoSQL document databases store flexible semi-structured records (JSON/BSON) without requiring rigid uniform columns across every item.',
  },
  {
    id: 'itf-25',
    domain: 'Security',
    prompt:
      'In the CIA security triad, encrypting sensitive HR payroll spreadsheets both in transit (TLS) and at rest (AES-256) directly enforces which pillar?',
    options: ['Availability', 'Confidentiality', 'Integrity', 'Non-repudiation'],
    correctIndex: 1,
    explanation:
      'Confidentiality ensures unauthorized parties cannot read sensitive information—achieved via strong encryption and strict access control.',
  },
  {
    id: 'itf-26',
    domain: 'Security',
    prompt:
      'A finance employee receives an urgent email claiming to be from the CEO asking them to click a lookalike domain and wire funds immediately. Which security threat is occurring?',
    options: ['Buffer overflow', 'Phishing / Social Engineering (BEC)', 'ARP poisoning', 'RAID parity degradation'],
    correctIndex: 1,
    explanation:
      'Phishing and Business Email Compromise (BEC) exploit urgency and spoofed identities to trick employees into bypassing controls or revealing credentials.',
  },
  {
    id: 'itf-27',
    domain: 'Security',
    prompt:
      'Requiring an employee to enter both their corporate password ("something you know") and approve a push prompt on their registered smartphone ("something you have") implements what control?',
    options: ['Single sign-off', 'Multi-Factor Authentication (MFA)', 'Plaintext authentication', 'Guest Wi-Fi isolation'],
    correctIndex: 1,
    explanation:
      'MFA combines credentials from at least two distinct authentication categories (knowledge + possession/inherence) to block password-only account takeovers.',
  },
  {
    id: 'itf-28',
    domain: 'Security',
    prompt:
      'Before verifying a downloaded Linux ISO file, an administrator computes its SHA-256 checksum and compares it to the vendor website. Which CIA triad pillar does hash verification validate?',
    options: ['Integrity', 'Availability', 'Confidentiality', 'Redundancy'],
    correctIndex: 0,
    explanation:
      'Cryptographic hashes detect even a 1-bit modification during download or tampering, validating data Integrity.',
  },
  {
    id: 'itf-29',
    domain: 'Security',
    prompt:
      'Under the Principle of Least Privilege, how should permissions be assigned to an accounting intern accessing shared network folders?',
    options: [
      'Add the intern to Domain Admins for convenience',
      'Grant read/write access strictly to the specific Accounts Payable folder required for their daily duties',
      'Disable NTFS permissions globally',
      'Share a single shared administrator login among all interns',
    ],
    correctIndex: 1,
    explanation:
      'Least privilege restricts every account strictly to the minimum permissions needed for its job role, minimizing blast radius if compromised.',
  },
  {
    id: 'itf-30',
    domain: 'Security',
    prompt:
      'When configuring a home or small-office wireless router in 2026 to stop attackers from sniffing Wi-Fi frames or cracking weak legacy keys, which encryption standard should be selected?',
    options: ['WEP 64-bit', 'WPA3-Personal / WPA2-AES', 'Open / No encryption', 'TKIP only'],
    correctIndex: 1,
    explanation:
      'WEP and legacy TKIP have severe cryptographic flaws; WPA3 (or WPA2 with AES-CCMP) provides modern encrypted wireless authentication and traffic protection.',
  },
];

export const AZURE_DP_900_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'dp900-1',
    domain: 'Describe core data concepts',
    prompt:
      'A healthcare analytics platform ingests patient EHR tables with strict schemas, clinical PDFs with varying JSON metadata, and free-text radiology audio notes. How are relational EHR tables classified?',
    options: ['Unstructured data', 'Structured data', 'Semi-structured key-value telemetry', 'Streaming binary blobs'],
    correctIndex: 1,
    explanation:
      'Structured data adheres strictly to tabular schemas of fixed columns and data types typical of relational databases (SQL).',
  },
  {
    id: 'dp900-2',
    domain: 'Describe core data concepts',
    prompt:
      'A retail chain processes point-of-sale checkout transactions sub-second across thousands of registers with strict ACID compliance. Which workload classification describes this system?',
    options: [
      'OLAP (Online Analytical Processing)',
      'OLTP (Online Transactional Processing)',
      'Cold archival batch ETL',
      'Semantic BI aggregation',
    ],
    correctIndex: 1,
    explanation:
      'OLTP workloads handle high-concurrency, low-latency inserts/updates/deletes with normalized schemas and strict ACID transactional integrity.',
  },
  {
    id: 'dp900-3',
    domain: 'Describe core data concepts',
    prompt:
      'Which Azure role is primarily responsible for designing Azure Data Factory pipelines, orchestrating Apache Spark ETL jobs in Synapse/Databricks, and cleaning raw lakehouse zones?',
    options: ['Database Administrator (DBA)', 'Data Engineer', 'Data Analyst', 'Helpdesk Tier-1 Specialist'],
    correctIndex: 1,
    explanation:
      'Data Engineers build ingestion pipelines, transformations, data lakes, and cleansing workflows; DBAs manage uptime/security/backups, and Data Analysts build Power BI visuals.',
  },
  {
    id: 'dp900-4',
    domain: 'Describe core data concepts',
    prompt:
      'An IoT logistics fleet publishes GPS coordinates every 2 seconds into Azure Event Hubs for real-time route anomaly alerting. What ingestion pattern is this?',
    options: ['Monthly batch processing', 'Stream processing', 'Manual CSV upload', 'Static OLAP cube refresh'],
    correctIndex: 1,
    explanation:
      'Stream processing evaluates unbounded events continuously in real time with minimal latency as messages arrive.',
  },
  {
    id: 'dp900-5',
    domain: 'Describe core data concepts',
    prompt:
      'In modern cloud pipelines, teams load raw files into Azure Data Lake Storage first and execute Spark/SQL transformations inside the target warehouse engine. What pattern is this?',
    options: ['ETL (Extract, Transform, Load)', 'ELT (Extract, Load, Transform)', 'FTP mirror sync', 'Direct JDBC replication'],
    correctIndex: 1,
    explanation:
      'ELT loads raw datasets quickly into scalable cloud storage/compute and uses distributed warehouse engines (Synapse/Fabric) to transform data on demand.',
  },
  {
    id: 'dp900-6',
    domain: 'Describe relational data on Azure',
    prompt:
      'In a relational SQL table storing employee records, which constraint guarantees every row is uniquely identifiable and cannot hold NULL values?',
    options: ['Foreign Key', 'Primary Key', 'Non-clustered Index', 'Default Constraint'],
    correctIndex: 1,
    explanation:
      'A Primary Key uniquely identifies each record in a relational table and enforces uniqueness plus NOT NULL constraints.',
  },
  {
    id: 'dp900-7',
    domain: 'Describe relational data on Azure',
    prompt:
      'A company wants to migrate an existing on-premises SQL Server instance to Azure with near-100% database engine compatibility—including SQL Server Agent jobs, CLR, and cross-database queries—without managing the underlying OS hardware. Which service fits best?',
    options: [
      'Azure SQL Managed Instance',
      'Azure Table Storage',
      'Azure Cosmos DB for NoSQL',
      'Azure Queue Storage',
    ],
    correctIndex: 0,
    explanation:
      'Azure SQL Managed Instance offers PaaS convenience with nearly complete SQL Server Enterprise surface compatibility (SQL Agent, Service Broker, cross-DB queries).',
  },
  {
    id: 'dp900-8',
    domain: 'Describe relational data on Azure',
    prompt:
      'Which Azure relational PaaS option is ideal for a brand-new cloud-native SaaS microservice needing serverless auto-pause compute and single-database isolation?',
    options: [
      'SQL Server on Azure VM (IaaS)',
      'Azure SQL Database (Single Database / Serverless tier)',
      'Azure Data Box Heavy',
      'Azure File Sync',
    ],
    correctIndex: 1,
    explanation:
      'Azure SQL Database is a fully managed PaaS offering supporting single-database Serverless tiers that auto-scale vCores and pause billing during idle intervals.',
  },
  {
    id: 'dp900-9',
    domain: 'Describe relational data on Azure',
    prompt:
      'Which open-source relational PaaS database service on Azure supports the Flexible Server architecture with custom maintenance windows and zone-redundant high availability?',
    options: [
      'Azure Database for PostgreSQL Flexible Server',
      'Azure Blob Cool Tier',
      'Azure Cosmos DB Cassandra API',
      'Azure Cache for Redis',
    ],
    correctIndex: 0,
    explanation:
      'Azure Database for PostgreSQL Flexible Server (and MySQL Flexible Server) provide managed open-source RDBMS deployments with zone-redundant HA and burstable/general SKUs.',
  },
  {
    id: 'dp900-10',
    domain: 'Describe relational data on Azure',
    prompt:
      'Which SQL query statement adds a new customer record into an existing `Sales.Customers` relational table?',
    options: ['SELECT', 'INSERT INTO', 'ALTER TABLE', 'CREATE VIEW'],
    correctIndex: 1,
    explanation:
      '`INSERT INTO` is the SQL DML statement that inserts new rows into a table; `SELECT` reads data and `CREATE`/`ALTER` are DDL statements modifying schema.',
  },
  {
    id: 'dp900-11',
    domain: 'Describe non-relational data on Azure',
    prompt:
      'Which Azure Storage service unlocks a true hierarchical directory namespace (folders, POSIX ACLs, atomic file renames) purpose-built for petabyte-scale big-data analytics?',
    options: [
      'Azure Queue Storage',
      'Azure Data Lake Storage Gen2 (ADLS Gen2)',
      'Azure Managed Disks',
      'Azure Backup Vault',
    ],
    correctIndex: 1,
    explanation:
      'ADLS Gen2 layers a hierarchical namespace directly atop Azure Blob Storage, delivering atomic directory operations and Hadoop/Spark-compatible ABFS performance.',
  },
  {
    id: 'dp900-12',
    domain: 'Describe non-relational data on Azure',
    prompt:
      'An organization needs to archive legal compliance PDFs in Azure Blob Storage for 7 years with rare emergency access, minimizing monthly GB storage cost. Which Blob access tier fits best?',
    options: ['Hot tier', 'Cool tier', 'Archive tier', 'Premium SSD Page Blob'],
    correctIndex: 2,
    explanation:
      'The Archive access tier provides the lowest offline storage cost for long-term retention (minimum 180 days), requiring rehydration before reading.',
  },
  {
    id: 'dp900-13',
    domain: 'Describe non-relational data on Azure',
    prompt:
      'A multinational gaming studio requires single-digit millisecond reads and multi-region active-active writes for player JSON profiles globally. Which Azure service fits best?',
    options: [
      'Azure Cosmos DB',
      'Azure Files SMB Share',
      'Azure SQL Single DB Basic Tier',
      'Azure Analysis Services',
    ],
    correctIndex: 0,
    explanation:
      'Azure Cosmos DB provides turnkey global distribution, multi-region writes, elastic RU/s throughput, and <10 ms SLA latency across NoSQL, MongoDB, Cassandra, Gremlin, and Table APIs.',
  },
  {
    id: 'dp900-14',
    domain: 'Describe non-relational data on Azure',
    prompt:
      'Which Azure Cosmos DB API stores entities as interconnected Vertices (nodes) and Edges (relationships) for social fraud-ring detection?',
    options: ['API for NoSQL', 'API for Apache Gremlin', 'API for Table', 'API for PostgreSQL'],
    correctIndex: 1,
    explanation:
      'Azure Cosmos DB for Apache Gremlin is a graph database engine optimized for traversing complex many-to-many entity relationships.',
  },
  {
    id: 'dp900-15',
    domain: 'Describe non-relational data on Azure',
    prompt:
      'A lift-and-shift Windows engineering app requires mounting a shared SMB 3.0 network drive (`\\\\account.file.core.windows.net\\share`) across 20 Azure VMs concurrently. Which storage service provides this?',
    options: ['Azure Files', 'Azure Blob Append Blobs', 'Azure Queue Storage', 'Azure Cosmos DB'],
    correctIndex: 0,
    explanation:
      'Azure Files delivers fully managed cloud file shares accessible via industry-standard SMB and NFS protocols.',
  },
  {
    id: 'dp900-16',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'In a star schema data warehouse, what is the role of the central `FactSales` table compared to surrounding `DimDate` and `DimProduct` tables?',
    options: [
      'The Fact table holds numeric business metrics (revenue, quantity) and foreign keys; Dimension tables hold descriptive filter attributes',
      'Fact tables hold only text descriptions',
      'Dimension tables never link to Fact tables',
      'Fact tables replace primary keys globally',
    ],
    correctIndex: 0,
    explanation:
      'In dimensional modeling (star schema), Fact tables capture measurable quantitative events while Dimension tables describe the who/what/where/when slicing context.',
  },
  {
    id: 'dp900-17',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'Which unified analytics architecture combines low-cost object storage (Delta/Parquet open formats) with ACID transactions and SQL warehouse performance in Microsoft Fabric / Azure Databricks?',
    options: ['Data Lakehouse', 'Legacy flat file share', 'Network-Attached Print Server', 'Symmetric Encryption Vault'],
    correctIndex: 0,
    explanation:
      'A Data Lakehouse blends the low-cost openness of a Data Lake with the ACID transactional governance and fast BI querying of a traditional Data Warehouse.',
  },
  {
    id: 'dp900-18',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'In Azure Data Factory (ADF), what defines the logical connection string and authentication credentials pointing to an external Azure SQL Database or S3 bucket?',
    options: ['Pipeline Trigger', 'Linked Service', 'Power BI Slicer', 'Spark Pool'],
    correctIndex: 1,
    explanation:
      'In ADF/Synapse Pipelines, a Linked Service acts like a connection string defining how to authenticate to a data source/sink, while a Dataset represents the specific table or file schema inside it.',
  },
  {
    id: 'dp900-19',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'Which Azure Synapse Analytics compute engine executes massively parallel processing (MPP) distributed T-SQL queries across terabytes of relational warehouse tables?',
    options: [
      'Dedicated SQL Pool',
      'Azure Table Storage',
      'Azure Bastion',
      'Azure Key Vault',
    ],
    correctIndex: 0,
    explanation:
      'Synapse Dedicated SQL Pools use MPP distributed storage and compute nodes (DWUs) to execute high-throughput petabyte-scale T-SQL warehouse analytics.',
  },
  {
    id: 'dp900-20',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'Which Power BI visualization uses horizontal or vertical rectangular slices nested hierarchically to compare revenue proportions across Regions and Categories simultaneously?',
    options: ['Treemap', 'Gauge KPI', 'Scatter plot', 'Filled Map'],
    correctIndex: 0,
    explanation:
      'A Treemap renders nested hierarchical categories as proportional shaded rectangles, showing both category totals and sub-category weight cleanly.',
  },
  {
    id: 'dp900-21',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'Before publishing an executive Power BI dashboard containing customer transactions across multiple spreadsheets, where do analysts rename columns, unpivot months, and filter nulls?',
    options: [
      'Power Query Editor',
      'Azure Portal Network Watcher',
      'SQL Server Configuration Manager',
      'Azure Cost Alerts',
    ],
    correctIndex: 0,
    explanation:
      'Power Query Editor (M language) performs interactive ETL cleansing, data-type casting, merging, and unpivoting before loading models into Power BI.',
  },
  {
    id: 'dp900-22',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'In Power BI Desktop, which semantic modeling step ensures filters applied to a `Calendar` table correctly slice rows in an `Orders` table?',
    options: [
      'Defining a 1-to-Many relationship between Calendar[Date] and Orders[OrderDate]',
      'Exporting everything to PNG images',
      'Deleting foreign keys',
      'Disabling Power Query refresh',
    ],
    correctIndex: 0,
    explanation:
      'Establishing explicit 1:Many cardinality relationships lets Power BI propagate slicer/filter context cleanly across tables.',
  },
  {
    id: 'dp900-23',
    domain: 'Describe core data concepts',
    prompt:
      'What does the "I" (Isolation) guarantee in ACID relational database transactions?',
    options: [
      'Uncommitted intermediate operations from one transaction are hidden from concurrent sessions until committed',
      'The database runs disconnected from all networks',
      'Only one user per day may log into SQL Server',
      'All indexes are automatically dropped',
    ],
    correctIndex: 0,
    explanation:
      'Isolation prevents dirty reads and race-condition anomalies by keeping in-flight transaction changes shielded from parallel sessions until commit.',
  },
  {
    id: 'dp900-24',
    domain: 'Describe relational data on Azure',
    prompt:
      'Which SQL clause groups identical attribute values together so aggregate functions like `SUM(Amount)` or `COUNT(*)` compute totals per category?',
    options: ['GROUP BY', 'ORDER BY', 'TRUNCATE', 'UNION ALL'],
    correctIndex: 0,
    explanation:
      '`GROUP BY` collapses rows sharing identical grouping column values so aggregate calculations produce one summary row per distinct group.',
  },
  {
    id: 'dp900-25',
    domain: 'Describe relational data on Azure',
    prompt:
      'What is the primary goal of applying 3rd Normal Form (3NF) database normalization inside an OLTP database?',
    options: [
      'Eliminate redundant duplicated text data and prevent insert/update/delete anomalies',
      'Merge all enterprise tables into a single wide spreadsheet',
      'Replace primary keys with random files',
      'Bypass user authentication',
    ],
    correctIndex: 0,
    explanation:
      'Normalization splits attributes into clean related entities so updating a customer address updates one row instead of causing inconsistent duplicates across millions of orders.',
  },
  {
    id: 'dp900-26',
    domain: 'Describe non-relational data on Azure',
    prompt:
      'An application writes append-only telemetry logs sequentially to Azure Blob Storage from distributed microservices. Which specialized Blob type is optimized for append-only operations?',
    options: ['Block Blob', 'Append Blob', 'Page Blob', 'Managed Snapshot'],
    correctIndex: 1,
    explanation:
      'Azure Storage supports three blob types: Block blobs (general files/media), Page blobs (random-read/write VHD disks), and Append blobs (optimized for append-only logging).',
  },
  {
    id: 'dp900-27',
    domain: 'Describe non-relational data on Azure',
    prompt:
      'In Azure Cosmos DB, how is database throughput provisioned and billed across reads, writes, and complex queries?',
    options: [
      'Request Units per second (RU/s)',
      'Number of HTML tags rendered',
      'VPN Gateway hours',
      'Active Directory group memberships',
    ],
    correctIndex: 0,
    explanation:
      'Cosmos DB abstracts CPU, memory, and IOPS into a normalized currency called Request Units (RU/s).',
  },
  {
    id: 'dp900-28',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'Which real-time analytics query language uses pipe (`|`) syntax inside Azure Data Explorer (Kusto) and Log Analytics to filter streaming telemetry rapidly?',
    options: ['T-SQL', 'Kusto Query Language (KQL)', 'DAX', 'HTML5'],
    correctIndex: 1,
    explanation:
      'KQL (Kusto Query Language) uses readable pipeline syntax (`Events | where Level == "Error" | count`) optimized for high-speed time-series log and telemetry analysis.',
  },
  {
    id: 'dp900-29',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'Which formula language is used inside Power BI semantic models to write custom dynamic measures such as Year-over-Year Revenue %?',
    options: ['PowerShell', 'DAX (Data Analysis Expressions)', 'CSS Grid', 'YAML'],
    correctIndex: 1,
    explanation:
      'DAX (Data Analysis Expressions) calculates dynamic measures, time-intelligence aggregations, and calculated columns inside Power BI and Analysis Services models.',
  },
  {
    id: 'dp900-30',
    domain: 'Describe an analytics workload on Azure',
    prompt:
      'In Microsoft Purview / enterprise data governance, what capability tracks how a column traveled from a raw ERP table through Data Factory transformations into a final Power BI KPI?',
    options: ['Data Lineage', 'RAID-0 Striping', 'Port Mirroring', 'DNS Caching'],
    correctIndex: 0,
    explanation:
      'Microsoft Purview Data Lineage maps end-to-end upstream/downstream transformation paths so teams can trust metrics and perform impact analysis before schema edits.',
  },
];

export const POWER_PLATFORM_PL_900_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pl900-1',
    domain: 'Describe the business value of Microsoft Power Platform',
    prompt:
      'An operations team wants to build mobile inspection apps, automate approval emails, visualize KPIs, and deploy a customer FAQ agent without writing full custom .NET microservices. Which Microsoft suite unifies these four pillars?',
    options: [
      'Microsoft Intune Endpoint Manager',
      'Microsoft Power Platform (Power Apps, Power Automate, Power BI, Copilot Studio)',
      'Azure Virtual Desktop',
      'Microsoft SQL Server Integration Services',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Power Platform combines low-code app creation (Power Apps), workflow automation (Power Automate), analytics (Power BI), websites (Power Pages), and conversational AI (Copilot Studio).',
  },
  {
    id: 'pl900-2',
    domain: 'Describe the business value of Microsoft Power Platform',
    prompt:
      'Which Power Platform governance feature prevents employees from building an automated flow that reads confidential Dynamics 365 invoices and posts them directly to a personal public social media connector?',
    options: [
      'Data Loss Prevention (DLP) Policies inside the Power Platform Admin Center',
      'Deleting all Microsoft 365 licenses',
      'Adding a Power BI slicer',
      'Switching browsers to InPrivate mode',
    ],
    correctIndex: 0,
    explanation:
      'Power Platform DLP policies classify connectors into Business, Non-Business, and Blocked buckets so connectors across isolated buckets cannot share data inside the same app or flow.',
  },
  {
    id: 'pl900-3',
    domain: 'Identify foundational components of Power Platform',
    prompt:
      'What centralized, secure, cloud-scale relational data platform sits natively beneath Power Apps and Dynamics 365 to store business tables, role-based security, and audit logs?',
    options: [
      'Microsoft Dataverse',
      'Azure Queue Storage',
      'Local Browser cookies',
      'Windows Registry',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Dataverse provides standardized business tables, rich metadata, column-level security, calculated columns, and direct native integration across Power Platform.',
  },
  {
    id: 'pl900-4',
    domain: 'Identify foundational components of Power Platform',
    prompt:
      'A developer needs a Power Automate flow to connect to an internal REST API hosted behind the company firewall that has no out-of-the-box Microsoft connector. What should they build?',
    options: [
      'A Custom Connector (OpenAPI/Swagger definition) paired with On-Premises Data Gateway if internal',
      'Disable SSL certificates globally',
      'Store all API data manually in Notepad',
      'Convert the REST API into a PNG screenshot',
    ],
    correctIndex: 0,
    explanation:
      'Custom Connectors wrap any REST/SOAP endpoint with an OpenAPI schema so makers can invoke internal or specialized APIs seamlessly like standard connectors.',
  },
  {
    id: 'pl900-5',
    domain: 'Identify foundational components of Power Platform',
    prompt:
      'Inside Microsoft Dataverse, what security mechanism ensures a regional sales representative in Germany can edit ONLY Account records assigned to the Germany business unit?',
    options: [
      'Dataverse Security Roles with Business Unit scope privileges',
      'Hiding columns in CSS',
      'Renaming the Power App title',
      'Exporting to Excel',
    ],
    correctIndex: 0,
    explanation:
      'Dataverse enforces server-side Role-Based Access Control (RBAC) across Organization, Parent-Child Business Unit, Business Unit, and User ownership levels.',
  },
  {
    id: 'pl900-6',
    domain: 'Describe the capabilities of Power BI',
    prompt:
      'A finance analyst needs executives to ask natural-language questions like "Show net revenue by region Q4 2026" directly on an existing Power BI dashboard and receive instant visuals. Which feature provides this?',
    options: ['Q&A visual', 'Azure Key Vault', 'Paginated RDL print driver', 'Power Automate Desktop'],
    correctIndex: 0,
    explanation:
      'The Power BI Q&A experience parses natural-language prompts over the semantic model and dynamically renders appropriate charts.',
  },
  {
    id: 'pl900-7',
    domain: 'Describe the capabilities of Power BI',
    prompt:
      'What is the architectural distinction between a Power BI Report and a Power BI Dashboard in the Power BI Service?',
    options: [
      'A Dashboard is a single-canvas executive view pinning tiles from one or multiple Reports; a Report is multi-page interactive exploration over a single semantic model',
      'Reports cannot have filters while Dashboards connect directly to Excel macros',
      'Dashboards work only in Power BI Desktop offline',
      'They are identical names for `.pbix` files',
    ],
    correctIndex: 0,
    explanation:
      'Reports live inside Power BI Desktop/Service with multiple detailed pages over one model; Dashboards exist exclusively in Power BI Service as a single high-level summary canvas pinning key tiles from many reports.',
  },
  {
    id: 'pl900-8',
    domain: 'Describe the capabilities of Power BI',
    prompt:
      'Which Power BI security feature restricts row visibility so a UK manager opening the shared global sales report sees ONLY UK rows, while a UAE manager sees ONLY UAE rows?',
    options: ['Row-Level Security (RLS)', 'Visual Header Tooltip', 'Dark Mode Theme', 'Canvas Grid Snap'],
    correctIndex: 0,
    explanation:
      'Row-Level Security (RLS) applies DAX filter predicates mapped to Entra ID user identities/groups at the semantic model layer.',
  },
  {
    id: 'pl900-9',
    domain: 'Describe the capabilities of Power BI',
    prompt:
      'Where does an analyst design reports visually offline on a Windows workstation before publishing `.pbix` artifacts to shared cloud workspaces?',
    options: ['Power BI Desktop', 'Power BI Mobile', 'Power Pages Portal', 'Azure Portal'],
    correctIndex: 0,
    explanation:
      'Power BI Desktop is the free Windows authoring tool for connecting sources, transforming with Power Query, modeling DAX, and designing multi-page reports.',
  },
  {
    id: 'pl900-10',
    domain: 'Describe the capabilities of Power Apps',
    prompt:
      'An operations lead needs a tablet app with pixel-exact branding, camera barcode scanning, and offline caching pulling from SharePoint and SQL simultaneously. Which Power Apps type fits best?',
    options: ['Canvas App', 'Model-Driven App', 'Power BI Scorecard', 'Dataverse Web Job'],
    correctIndex: 0,
    explanation:
      'Canvas Apps start from a blank visual design canvas enabling custom UX layouts, device hardware access (GPS/camera/barcode), and multi-connector mashups.',
  },
  {
    id: 'pl900-11',
    domain: 'Describe the capabilities of Power Apps',
    prompt:
      'When should an architect choose a Model-Driven App over a Canvas App?',
    options: [
      'When the solution uses complex Dataverse relational tables, multi-stage Business Process Flows, and standard responsive enterprise forms without manual UI pixel alignment',
      'When the company wants to build a game using raw Bitmaps',
      'When no Dataverse environment exists and only CSV files are available',
      'When embedding an anonymous public blog homepage',
    ],
    correctIndex: 0,
    explanation:
      'Model-Driven Apps generate sleek responsive grids, views, dashboards, and Business Process Flows directly from Dataverse schemas.',
  },
  {
    id: 'pl900-12',
    domain: 'Describe the capabilities of Power Apps',
    prompt:
      'A low-code maker wants an external vendor outside the company tenant to log into a secure web portal and submit compliance documents directly into Dataverse. Which Power Platform product enables external-facing sites?',
    options: ['Microsoft Power Pages', 'Power BI Desktop', 'Power Automate Attended RPA', 'Canvas Offline Sync'],
    correctIndex: 0,
    explanation:
      'Microsoft Power Pages builds secure external-facing enterprise websites integrated natively with Dataverse and external authentication providers.',
  },
  {
    id: 'pl900-13',
    domain: 'Describe the capabilities of Power Apps',
    prompt:
      'What formula language—modeled after familiar Microsoft Excel functions like `Filter()`, `LookUp()`, and `If()`—powers Canvas App button logic?',
    options: ['Power Fx', 'T-SQL', 'Bicep', 'Assembly'],
    correctIndex: 0,
    explanation:
      'Microsoft Power Fx is the declarative Excel-like low-code expression language used across Canvas Apps and Copilot Studio.',
  },
  {
    id: 'pl900-14',
    domain: 'Describe the capabilities of Power Automate',
    prompt:
      'An HR coordinator wants an automated workflow to start automatically the exact moment a new candidate file is uploaded to a SharePoint document library. Which Power Automate Cloud Flow type should they choose?',
    options: ['Scheduled cloud flow', 'Automated cloud flow', 'Instant (Button) cloud flow', 'Desktop UI macro'],
    correctIndex: 1,
    explanation:
      'Automated cloud flows fire continuously upon event triggers (like SharePoint item created, Teams message posted, or email arrival).',
  },
  {
    id: 'pl900-15',
    domain: 'Describe the capabilities of Power Automate',
    prompt:
      'Which Power Automate capability automates data entry into a 20-year-old legacy Windows desktop ERP application that provides zero REST APIs or connectors?',
    options: [
      'Power Automate for Desktop (Robotic Process Automation / RPA)',
      'Instant Cloud Approval',
      'Power BI Streaming Dataset',
      'Dataverse Audit Summary',
    ],
    correctIndex: 0,
    explanation:
      'Power Automate for Desktop provides attended and unattended Robotic Process Automation (RPA) by recording UI clicks, keystrokes, and screen scraping on legacy desktop/web apps.',
  },
  {
    id: 'pl900-16',
    domain: 'Describe the capabilities of Power Automate',
    prompt:
      'A manager wants a single Teams Adaptive Card where they can click "Approve" or "Reject" an expense claim from mobile without opening an ERP app. Which Power Automate feature handles this natively?',
    options: ['Approvals Connector', 'FTP Sync', 'CSV Parser', 'DNS Resolver'],
    correctIndex: 0,
    explanation:
      'The Approvals connector delivers actionable approval requests across Microsoft Teams, Outlook, and the Power Automate mobile app.',
  },
  {
    id: 'pl900-17',
    domain: 'Describe the capabilities of Power Automate',
    prompt:
      'What is the core difference between Attended RPA and Unattended RPA in Power Automate?',
    options: [
      'Attended RPA runs on a signed-in user workstation alongside the human operator; Unattended RPA runs autonomously on unlocked cloud/VM sessions on schedule or trigger',
      'Unattended RPA cannot click UI buttons',
      'Attended RPA runs only on macOS',
      'They share identical licensing with no execution difference',
    ],
    correctIndex: 0,
    explanation:
      'Attended bots assist humans interactively while logged in; Unattended bots sign into target Windows machines automatically in the background without human supervision.',
  },
  {
    id: 'pl900-18',
    domain: 'Describe capabilities of Copilot Studio & AI Builder',
    prompt:
      'Which Power Platform tool lets organizations design custom conversational AI agents grounded in SharePoint internal PDFs and hand off complex queries directly to live support agents?',
    options: ['Microsoft Copilot Studio', 'Power BI Report Server', 'Dataverse Solution Checker', 'SQL Profiler'],
    correctIndex: 0,
    explanation:
      'Microsoft Copilot Studio empowers teams to author generative AI conversational agents with topics, actions/flows, enterprise knowledge grounding, and omnichannel handoff.',
  },
  {
    id: 'pl900-19',
    domain: 'Describe capabilities of Copilot Studio & AI Builder',
    prompt:
      'An accounts payable team receives 3,000 scanned PDF vendor invoices per month and wants Power Automate to extract Invoice Number, Vendor Name, and Total automatically into Dataverse. Which capability solves this without custom Python?',
    options: [
      'AI Builder prebuilt Invoice Processing / Form Processing model',
      'Power Pages Login Theme',
      'Scheduled Windows Reboot',
      'Power BI Gauge Visual',
    ],
    correctIndex: 0,
    explanation:
      'AI Builder provides turnkey OCR/Document Processing, Invoice Processing, Sentiment Analysis, and Category Classification models embedded inside Power Automate & Power Apps.',
  },
  {
    id: 'pl900-20',
    domain: 'Describe capabilities of Copilot Studio & AI Builder',
    prompt:
      'Which component inside Copilot Studio defines an individual conversation flow path triggered by user phrases like "Reset my VPN password" or "Check PTO balance"?',
    options: ['Topic', 'Power Query Step', 'Solution Patch', 'Gateway Cluster'],
    correctIndex: 0,
    explanation:
      'Topics organize conversational dialogues inside Copilot Studio with trigger phrases, entity extraction nodes, generative answers, and Power Automate action calls.',
  },
  {
    id: 'pl900-21',
    domain: 'Identify foundational components of Power Platform',
    prompt:
      'What is the purpose of an "Environment" inside the Microsoft Power Platform Admin Center?',
    options: [
      'A container isolating apps, flows, Dataverse databases, and security roles by lifecycle stage (Dev, Test, Prod) or geographic data residency',
      'A physical router inside an office rack',
      'A browser extension for CSS debugging',
      'A personal OneDrive recycle bin',
    ],
    correctIndex: 0,
    explanation:
      'Power Platform Environments isolate ALM stages (Dev -> UAT -> Prod), regional compliance boundaries, and user access permissions.',
  },
  {
    id: 'pl900-22',
    domain: 'Identify foundational components of Power Platform',
    prompt:
      'To promote Power Apps, Dataverse tables, and Cloud Flows cleanly from a Development environment to Production without breaking references, what packaging mechanism should makers use?',
    options: ['Managed Solutions & Environment Variables (ALM)', 'Manually rebuilding screens in Production', 'Copying ZIP files over email', 'Disabling DLP'],
    correctIndex: 0,
    explanation:
      'Exporting Unmanaged Dev work as Managed Solutions (paired with Environment Variables and Connection References) ensures safe, repeatable Application Lifecycle Management (ALM) into Production.',
  },
  {
    id: 'pl900-23',
    domain: 'Identify foundational components of Power Platform',
    prompt:
      'Which Microsoft tool must be installed on an on-premises network server so Power BI Service and Power Automate cloud flows can query a private internal SQL Server securely without opening inbound firewall ports?',
    options: ['On-Premises Data Gateway', 'Public IP Nat Rule', 'Local Print Spooler', 'SSH Bastion'],
    correctIndex: 0,
    explanation:
      'The On-Premises Data Gateway initiates outbound encrypted Service Bus connections to Azure, relaying Power BI, Power Apps, and Power Automate requests safely to local data sources.',
  },
  {
    id: 'pl900-24',
    domain: 'Describe the business value of Microsoft Power Platform',
    prompt:
      'Why do organizations install the Power Platform Center of Excellence (CoE) Starter Kit?',
    options: [
      'To gain tenant-wide visibility into maker adoption, orphaned apps, connector usage, and governance compliance across all environments',
      'To replace Microsoft Entra ID',
      'To turn off Power BI dashboards',
      'To host Linux web servers',
    ],
    correctIndex: 0,
    explanation:
      'The CoE Starter Kit gives administrators telemetry dashboards, app auditing, maker nurturing workflows, and compliance governance across large Power Platform tenants.',
  },
  {
    id: 'pl900-25',
    domain: 'Describe the capabilities of Power Apps',
    prompt:
      'Inside a Canvas App formula, which function retrieves ONLY the first matching record from a Dataverse table rather than returning an entire table array?',
    options: ['LookUp()', 'Filter()', 'Collect()', 'Reset()'],
    correctIndex: 0,
    explanation:
      '`Filter()` returns a table of all matching rows, whereas `LookUp()` finds and returns only the single first record matching the condition.',
  },
  {
    id: 'pl900-26',
    domain: 'Describe the capabilities of Power Automate',
    prompt:
      'Which type of Power Automate flow runs every Monday morning at 08:00 AM GST to summarize overdue support tickets in Teams?',
    options: ['Scheduled cloud flow', 'Instant cloud flow', 'Business Process Flow', 'Canvas Event'],
    correctIndex: 0,
    explanation:
      'Scheduled cloud flows run on recurring cron/calendar intervals (hourly, daily, weekly) automatically.',
  },
  {
    id: 'pl900-27',
    domain: 'Describe the capabilities of Power Automate',
    prompt:
      'Inside a Model-Driven App, what feature renders a horizontal stage-by-stage checklist bar (Qualify -> Develop -> Propose -> Close) guiding staff consistently through compliance steps?',
    options: ['Business Process Flow (BPF)', 'Scheduled Batch Macro', 'Word Mail Merge', 'Gauge Tile'],
    correctIndex: 0,
    explanation:
      'Business Process Flows enforce standardized guided stages and required fields across Dataverse entity records.',
  },
  {
    id: 'pl900-28',
    domain: 'Identify foundational components of Power Platform',
    prompt:
      'Which connector category requires standalone Power Apps / Power Automate Premium licensing rather than being included inside standard Microsoft 365 Enterprise plans?',
    options: [
      'Premium Connectors (e.g., SQL Server, Dataverse, Salesforce, HTTP with Entra ID)',
      'Standard SharePoint & Outlook Connectors',
      'Microsoft Teams Standard notifications',
      'OneDrive for Business',
    ],
    correctIndex: 0,
    explanation:
      'Standard Microsoft 365 connectors (SharePoint, Outlook, Teams, Forms) come seeded in Microsoft 365 plans, while Premium connectors (SQL, Salesforce, Dataverse, custom REST) require Power Platform Premium plans.',
  },
  {
    id: 'pl900-29',
    domain: 'Describe the capabilities of Power BI',
    prompt:
      'When connecting Power BI to a massive 500 GB cloud warehouse where data must reflect real-time source updates instantaneously on every user filter click without importing into RAM, which storage mode is chosen?',
    options: ['DirectQuery', 'Manual CSV Import', 'Static Snapshot', 'Local Excel Copy'],
    correctIndex: 0,
    explanation:
      'DirectQuery leaves underlying tables in the remote database and translates user visuals into live SQL queries on the fly (vs Import mode caching compressed data inside memory).',
  },
  {
    id: 'pl900-30',
    domain: 'Describe capabilities of Copilot Studio & AI Builder',
    prompt:
      'How do "Entities" function inside a Copilot Studio conversational flow?',
    options: [
      'They extract structured slot values (such as dates, currencies, cities, or order IDs) directly from a user’s typed sentence to avoid repetitive questions',
      'They delete inactive Dataverse environments',
      'They generate HTML favicons',
      'They encrypt desktop hard drives',
    ],
    correctIndex: 0,
    explanation:
      'Entities perform intelligent NLU slot-extraction—for example extracting "Dubai" as a City and "Tuesday" as a Date even if the user answers both inside one sentence.',
  },
];

export const CLOUD_ESSENTIALS_CLO_002_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'clo-1',
    domain: 'Cloud Concepts',
    prompt:
      'A CIO compares replacing a $400,000 three-year server refresh cycle with monthly pay-as-you-go cloud VM subscriptions billed strictly on hourly utilization. Which financial shift is taking place?',
    options: [
      'Moving from OpEx to fixed asset depreciation',
      'Shifting from Capital Expenditure (CapEx) to Operational Expenditure (OpEx)',
      'Eliminating all network bandwidth costs',
      'Converting public SaaS into on-premises bare metal',
    ],
    correctIndex: 1,
    explanation:
      'Upfront hardware acquisitions are CapEx assets depreciated over years; consumption-based monthly cloud billing converts spending into flexible OpEx.',
  },
  {
    id: 'clo-2',
    domain: 'Cloud Concepts',
    prompt:
      'An e-commerce retailer experiences 12x traffic spikes during a 48-hour Black Friday sale before returning to normal baseline traffic Monday morning. Which cloud characteristic allows compute capacity to scale out automatically and scale back in to avoid paying for idle hardware?',
    options: ['Rapid Elasticity', 'Vendor Lock-in', 'Hardware Sovereignty', 'Cold Archiving'],
    correctIndex: 0,
    explanation:
      'Rapid elasticity dynamically provisions and decommissions compute/network resources closely aligned to real-time demand spikes.',
  },
  {
    id: 'clo-3',
    domain: 'Cloud Concepts',
    prompt:
      'A European bank stores regulated customer transaction ledgers inside its own private datacenter while bursting stateless marketing rendering jobs into AWS during seasonal campaigns. Which deployment model describes this setup?',
    options: ['Pure Public Cloud', 'Hybrid Cloud', 'Single-Tenant Community Bare Metal', 'Air-gapped LAN'],
    correctIndex: 1,
    explanation:
      'Hybrid Cloud integrates private on-premises infrastructure seamlessly with public cloud capacity across dedicated WAN/VPN links.',
  },
  {
    id: 'clo-4',
    domain: 'Cloud Concepts',
    prompt:
      'Under a Software as a Service (SaaS) contract such as Microsoft 365 or Salesforce, what does the customer business manage versus the cloud provider?',
    options: [
      'Customer manages hypervisor patching and physical fiber cabling',
      'Provider manages infrastructure, OS, and application runtime; customer manages user accounts, RBAC permissions, and uploaded data classification',
      'Customer writes custom OS kernel drivers',
      'Provider enters the customer payroll figures',
    ],
    correctIndex: 1,
    explanation:
      'Under the Shared Responsibility Model for SaaS, the vendor runs the full stack while the tenant retains identity, endpoint, and data governance responsibility.',
  },
  {
    id: 'clo-5',
    domain: 'Cloud Concepts',
    prompt:
      'Two regional hospitals share a dedicated cloud environment engineered exclusively to satisfy healthcare HIPAA/GDPR regulatory mandates shared across both institutions. What deployment model is this?',
    options: ['Community Cloud', 'Open Public SaaS', 'Consumer Freeware', 'Edge Micro-cloud'],
    correctIndex: 0,
    explanation:
      'A Community Cloud provides shared infrastructure dedicated to a specific group of organizations sharing common compliance, security, or mission objectives.',
  },
  {
    id: 'clo-6',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'Before migrating 60 legacy servers to public cloud, a finance lead calculates Total Cost of Ownership (TCO). Beyond VM hourly prices, which often-overlooked cloud fee can dramatically inflate monthly bills if chatty apps send terabytes outward to the internet?',
    options: [
      'Inbound data ingress fees',
      'Outbound data egress bandwidth charges',
      'Open-source Linux kernel licensing',
      'Browser bookmark caching',
    ],
    correctIndex: 1,
    explanation:
      'Most public clouds accept inbound ingress traffic for free while billing per-GB for outbound data egress over the internet or cross-region links.',
  },
  {
    id: 'clo-7',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'When calculating Cloud Return on Investment (ROI), an enterprise accounts for eliminating datacenter cooling electricity, physical floor lease costs, and faster feature time-to-market. What represents "soft" or agility ROI?',
    options: [
      'Exact kWh power meter readings',
      'Releasing revenue-generating products weeks faster via automated CI/CD provisioning',
      'Purchasing diesel backup generators',
      'Replacing optical transceivers',
    ],
    correctIndex: 1,
    explanation:
      'Soft/strategic ROI captures business agility, reduced opportunity cost, faster product launches, and engineering productivity gains alongside hard hardware/utility savings.',
  },
  {
    id: 'clo-8',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'What contract guarantee defines a cloud provider’s promised 99.99% monthly uptime along with service credit remedies if outages exceed allowed downtime minutes?',
    options: ['Service Level Agreement (SLA)', 'Acceptable Use Policy (AUP)', 'End-User License Agreement (EULA)', 'Non-Disclosure Agreement (NDA)'],
    correctIndex: 0,
    explanation:
      'The SLA legally establishes measurable reliability targets (such as 99.95% or 99.99% availability) and financial credit remedies upon breach.',
  },
  {
    id: 'clo-9',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'An engineering VP refuses to build critical billing logic solely on proprietary vendor-specific serverless triggers without container abstraction due to fear of future migration difficulty. Which business risk is the VP mitigating?',
    options: ['Vendor Lock-in', 'Over-virtualization', 'Cold start latency reduction', 'DNS propagation'],
    correctIndex: 0,
    explanation:
      'Vendor lock-in occurs when proprietary APIs or data egress fees make switching cloud providers prohibitively expensive or technically complex.',
  },
  {
    id: 'clo-10',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'In a Disaster Recovery Plan (DRP), leadership mandates that during a regional outage, the application must resume online within 30 minutes and lose no more than 5 minutes of latest transactions. What do 30 minutes and 5 minutes represent respectively?',
    options: [
      '30 mins = RPO; 5 mins = RTO',
      '30 mins = RTO (Recovery Time Objective); 5 mins = RPO (Recovery Point Objective)',
      'Both measure MTBF',
      'SLA bandwidth caps',
    ],
    correctIndex: 1,
    explanation:
      'RTO defines maximum tolerable downtime (how fast systems must recover); RPO defines maximum acceptable data loss window measured backward in time.',
  },
  {
    id: 'clo-11',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'Which cloud pricing tier yields up to 72% discounts compared to On-Demand compute when an enterprise commits to predictable 1-year or 3-year baseline usage?',
    options: ['Spot / Preemptible instances', 'Reserved Instances / Savings Plans', 'Pay-as-you-go Burst', 'Free Trial sandbox'],
    correctIndex: 1,
    explanation:
      'Reserved Instances and Savings Plans offer steep discounts for steady-state predictable workloads backed by 1-year or 3-year commitments.',
  },
  {
    id: 'clo-12',
    domain: 'Management and Technical Operations',
    prompt:
      'A Cloud FinOps lead cannot tell whether Engineering, Marketing, or Sales owns $18,000 in monthly uncategorized cloud VMs. Which foundational cloud hygiene control solves cost chargeback immediately?',
    options: [
      'Enforcing mandatory Resource Tagging (`CostCenter`, `Environment`, `Owner`)',
      'Turning off monitoring logs',
      'Using one shared root password',
      'Moving all VMs to Spot pricing blindly',
    ],
    correctIndex: 0,
    explanation:
      'Resource tags attach structured business metadata directly onto cloud billing exports for clean FinOps showback/chargeback and automated cleanup.',
  },
  {
    id: 'clo-13',
    domain: 'Management and Technical Operations',
    prompt:
      'An administrator uses Terraform declarative HCL templates stored in Git to spin up identical staging and production VPC networks consistently. Which DevOps operational practice is this?',
    options: ['Infrastructure as Code (IaC)', 'Manual ClickOps provisioning', 'Shadow IT', 'Break-fix patching'],
    correctIndex: 0,
    explanation:
      'Infrastructure as Code versions infrastructure topology in repeatable machine-readable files, eliminating configuration drift and manual human typos.',
  },
  {
    id: 'clo-14',
    domain: 'Management and Technical Operations',
    prompt:
      'What happens when a company leaves an unapproved department spinning up SaaS project trackers and public cloud buckets on personal corporate credit cards without IT security oversight?',
    options: ['Shadow IT', 'Zero Trust Micro-segmentation', 'Automated Right-sizing', 'Immutable deployment'],
    correctIndex: 0,
    explanation:
      'Shadow IT creates hidden compliance, financial, and data-breach risks when business units adopt unauthorized cloud tools outside IT governance.',
  },
  {
    id: 'clo-15',
    domain: 'Management and Technical Operations',
    prompt:
      'Telemetry reveals an application VM allocated with 16 vCPUs and 64 GB RAM averages just 6% CPU utilization over 90 days. What FinOps optimization action should the cloud architect execute?',
    options: ['Right-sizing down to a smaller VM SKU (e.g., 4 vCPUs / 16 GB RAM)', 'Scaling out horizontally to 4 nodes', 'Enabling multi-region replication', 'Migrating to bare-metal tape'],
    correctIndex: 0,
    explanation:
      'Right-sizing matches provisioned compute/memory/disk capacity closely to observed utilization telemetry, eliminating over-provisioning waste.',
  },
  {
    id: 'clo-16',
    domain: 'Management and Technical Operations',
    prompt:
      'Which cloud migration approach moves an application "as-is" from on-premises VMware VMs directly onto cloud IaaS virtual machines with zero code refactoring for fastest datacenter exit?',
    options: ['Rehost (Lift-and-Shift)', 'Refactor / Re-architect to Serverless', 'Retire', 'Repurchase as SaaS'],
    correctIndex: 0,
    explanation:
      'Within the Gartner/Cloud 6 Rs migration framework, Rehost (Lift-and-Shift) prioritizes speed by copying workloads directly onto IaaS VMs without rewriting application code.',
  },
  {
    id: 'clo-17',
    domain: 'Management and Technical Operations',
    prompt:
      'A web application serves users globally across North America, Europe, and UAE. Which edge service caches static web assets and video segments physically close to end users to slash latency?',
    options: ['Content Delivery Network (CDN)', 'Block Storage Snapshot', 'Internal DNS Forwarder', 'Syslog Aggregator'],
    correctIndex: 0,
    explanation:
      'CDNs cache static and dynamic edge content across globally distributed Points of Presence (PoPs), reducing round-trip latency and origin load.',
  },
  {
    id: 'clo-18',
    domain: 'Management and Technical Operations',
    prompt:
      'What is the key operational advantage of Containers (Docker/Kubernetes) over traditional Virtual Machines when deploying microservices?',
    options: [
      'Containers share the host OS kernel with lightweight isolation, starting in milliseconds with dramatically lower RAM/disk overhead',
      'Containers require zero CPU resources',
      'Each container includes a full separate 20 GB guest Windows ISO',
      'Containers eliminate TCP/IP networking',
    ],
    correctIndex: 0,
    explanation:
      'Containers package code + runtime libraries while sharing the underlying host OS kernel, enabling rapid portable scaling compared to heavy hypervisor guest VMs.',
  },
  {
    id: 'clo-19',
    domain: 'Governance, Risk, Compliance, and Security',
    prompt:
      'A German healthcare startup using an American public cloud vendor must ensure patient medical images NEVER physically reside outside Frankfurt datacenters. Which legal/compliance concept governs this requirement?',
    options: ['Data Residency / Data Sovereignty', 'Horizontal Autoscaling', 'BGP Anycast', 'Open-Source Copyleft'],
    correctIndex: 0,
    explanation:
      'Data residency/sovereignty laws (like GDPR or regional health mandates) dictate the exact physical countries/jurisdictions where citizen records may be stored and processed.',
  },
  {
    id: 'clo-20',
    domain: 'Governance, Risk, Compliance, and Security',
    prompt:
      'Before signing an annual PaaS contract with a cloud provider, a financial compliance officer requests independent third-party attestation validating the provider’s security controls over availability and confidentiality. Which audit report serves this standard?',
    options: ['SOC 2 Type II Report', 'Wireshark PCAP Capture', 'HTML Sitemap', 'SLA Invoice Credit'],
    correctIndex: 0,
    explanation:
      'SOC 2 Type II audits evaluate an organization’s Trust Services Criteria controls over a sustained operational observation window (typically 6–12 months).',
  },
  {
    id: 'clo-21',
    domain: 'Governance, Risk, Compliance, and Security',
    prompt:
      'Which cloud authentication protocol lets corporate employees sign into 40 external SaaS applications using their single existing corporate Entra ID / Okta credentials via SAML 2.0 or OIDC?',
    options: ['Single Sign-On (SSO) / Identity Federation', 'Local Anonymous FTP', 'Static telnet', 'SNMPv1'],
    correctIndex: 0,
    explanation:
      'SSO and Identity Federation centralize authentication with one enterprise IdP, eliminating password sprawl and enabling instant offboarding when staff leave.',
  },
  {
    id: 'clo-22',
    domain: 'Governance, Risk, Compliance, and Security',
    prompt:
      'Why must an organization encrypt cloud object storage buckets with Customer-Managed Keys (CMK) inside a Hardware Security Module or Key Vault rather than relying purely on unmonitored defaults?',
    options: [
      'To retain lifecycle key rotation, cryptographic revocation control, and audit trails over who decrypts sensitive compliance archives',
      'Because encryption doubles network throughput',
      'So anonymous internet users can read objects faster',
      'To avoid paying storage capacity bills',
    ],
    correctIndex: 0,
    explanation:
      'CMKs grant organizations direct authority over key rotation schedules, strict RBAC decryption access logs, and instant cryptographic erasure if needed.',
  },
  {
    id: 'clo-23',
    domain: 'Governance, Risk, Compliance, and Security',
    prompt:
      'During a cloud migration risk assessment, an auditor identifies a misconfigured public S3/Blob bucket containing unencrypted passport scans. Which tool category automatically monitors cloud configuration drift and flags public storage exposure?',
    options: ['Cloud Security Posture Management (CSPM)', 'Word Processor Spellcheck', 'DNS Registrar', 'DHCP Server'],
    correctIndex: 0,
    explanation:
      'CSPM tools continuously inspect cloud control-plane configurations against CIS/NIST/ISO benchmarks to detect exposed buckets, open security groups, and missing MFA.',
  },
  {
    id: 'clo-24',
    domain: 'Governance, Risk, Compliance, and Security',
    prompt:
      'A company decides to accept the small residual financial risk of occasional low-priority test-server downtime rather than paying 3x extra for active-active geo-replication. Which risk-management response is this?',
    options: ['Risk Acceptance', 'Risk Avoidance', 'Risk Transference', 'Shadow Mitigation'],
    correctIndex: 0,
    explanation:
      'Four formal risk responses exist: Mitigate (reduce via controls), Transfer (insurance/vendor SLA), Avoid (stop risky activity), and Accept (acknowledge minor cost-vs-impact tradeoff).',
  },
  {
    id: 'clo-25',
    domain: 'Cloud Concepts',
    prompt:
      'A development team deploys Python API code directly onto Azure App Service / AWS Elastic Beanstalk, where the provider handles OS patching, load balancing, and runtime security automatically. Which service model is this?',
    options: ['IaaS', 'PaaS (Platform as a Service)', 'SaaS', 'Colocation Hosting'],
    correctIndex: 1,
    explanation:
      'PaaS abstracts underlying servers and operating systems so engineers deploy and scale application code rapidly while the provider handles OS/middleware patching.',
  },
  {
    id: 'clo-26',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'What happens in a cloud pilot migration where a team validates performance benchmarks and rollback steps on one low-risk internal app before migrating core customer billing?',
    options: [
      'It reduces organizational migration risk and validates network/latency assumptions before full cutover',
      'It permanently deletes legacy backups',
      'It forces a 100% big-bang outage',
      'It doubles software licensing automatically',
    ],
    correctIndex: 0,
    explanation:
      'Phased pilot migrations validate cost models, IAM integration, latency, and team readiness on real workloads before committing mission-critical production systems.',
  },
  {
    id: 'clo-27',
    domain: 'Management and Technical Operations',
    prompt:
      'When deploying an updates pipeline using Blue-Green Deployment in the cloud, how is zero-downtime release achieved?',
    options: [
      'Running two identical environments (Blue live, Green new), testing Green thoroughly, then flipping router/load balancer DNS cleanly to Green with instant rollback capability',
      'Shutting down production for 4 hours every night',
      'Editing PHP files directly on live servers via FTP',
      'Deleting the database before updating code',
    ],
    correctIndex: 0,
    explanation:
      'Blue-Green maintains an active live stack while staging and verifying the new build on a parallel environment, enabling instant traffic cutover and sub-second rollback.',
  },
  {
    id: 'clo-28',
    domain: 'Governance, Risk, Compliance, and Security',
    prompt:
      'In a multi-tenant public cloud environment, how do hypervisors prevent Customer A’s compromised VM from reading Customer B’s memory pages on the same physical blade?',
    options: [
      'Hardware-enforced compute/memory hypervisor isolation and virtualized network encapsulation',
      'Asking tenants politely not to run scans',
      'Running both tenants inside one shared Windows OS user folder',
      'Disabling network cards',
    ],
    correctIndex: 0,
    explanation:
      'Cloud providers rely on CPU hardware virtualization extensions (VT-x/AMD-V), strict memory address-space isolation, and software-defined VXLAN/NVGRE network segmentation.',
  },
  {
    id: 'clo-29',
    domain: 'Business Principles of Cloud Environments',
    prompt:
      'An enterprise runs stateless AI rendering batch jobs that tolerate sudden 2-minute interruption notices in exchange for up to 90% cost savings. Which cloud instance purchase option matches?',
    options: ['Spot Instances / Preemptible VMs', 'Dedicated Physical Hosts', 'Annual Reserved Bare Metal', 'On-Demand High-Memory Tier'],
    correctIndex: 0,
    explanation:
      'Spot VMs bid on spare unused datacenter capacity at massive discounts, suited specifically for fault-tolerant, stateless, or interruptible batch jobs.',
  },
  {
    id: 'clo-30',
    domain: 'Management and Technical Operations',
    prompt:
      'Why do cloud architects favor Horizontal Scaling (Scale Out) over indefinite Vertical Scaling (Scale Up) for high-traffic web tiers?',
    options: [
      'Horizontal scaling distributes load across multiple replaceable nodes behind a load balancer, removing single-point-of-failure limits and enabling elastic auto-scaling',
      'Vertical scaling has infinite single-server CPU capacity',
      'Horizontal scaling eliminates the need for IP addresses',
      'Vertical scaling never causes reboots',
    ],
    correctIndex: 0,
    explanation:
      'Vertical scaling eventually hits hardware ceiling limits and requires downtime to resize; horizontal scaling adds resilient stateless nodes seamlessly behind load balancers.',
  },
];

export const COPILOT_MS_4018_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'ms4018-1',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'An enterprise team in Dubai builds an internal HR Assistant using Microsoft Copilot Studio that must cite current UAE leave policies stored inside a restricted SharePoint library without retraining a base LLM. Which architecture pattern solves this?',
    options: [
      'Fine-tuning GPT weights manually every week',
      'Generative Answers grounded via SharePoint Knowledge Sources using Retrieval-Augmented Generation (RAG)',
      'Hardcoding 2,000 manual static Q&A pairs',
      'Exposing SharePoint folders anonymously to the public internet',
    ],
    correctIndex: 1,
    explanation:
      'Copilot Studio Generative Answers uses RAG grounding over SharePoint, uploaded PDFs, or Dataverse while automatically honoring Microsoft Entra ID user permissions.',
  },
  {
    id: 'ms4018-2',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'When an employee queries a Copilot Studio agent grounded in SharePoint documents, what stops an entry-level intern from viewing restricted executive salary spreadsheets retrieved by RAG?',
    options: [
      'Microsoft Entra ID user authentication enforcing source-level SharePoint/Graph ACL permissions at query time',
      'Hiding the chat window scrollbar',
      'Client-side JavaScript keyword filtering',
      'Converting spreadsheets into JPEG screenshots',
    ],
    correctIndex: 0,
    explanation:
      'When configured with "Authenticate with Microsoft" (Entra ID), Copilot Studio evaluates Graph/SharePoint permissions under the signed-in user’s identity so unauthorized files are never returned.',
  },
  {
    id: 'ms4018-3',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'What changes when you enable "Generative Orchestration" inside a Copilot Studio agent compared to classic deterministic NLU topic matching?',
    options: [
      'The orchestrator dynamically selects combinations of Topics, Actions (Connectors/Flows), and Knowledge sources to answer multi-part requests and ask follow-up slots automatically',
      'All Power Automate actions are permanently disabled',
      'The agent only responds with fixed error messages',
      'Users must type exact slash-commands',
    ],
    correctIndex: 0,
    explanation:
      'Generative Orchestration enables autonomous reasoning across multiple tools, connectors, and topics—chaining APIs and synthesizing cohesive multi-step answers without brittle manual routing trees.',
  },
  {
    id: 'ms4018-4',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'A user tells an IT helpdesk agent: "Open a priority P1 ticket because the VPN gateway in London is unreachable." How can Copilot Studio populate the ServiceNow category and priority automatically without prompting again?',
    options: [
      'Slot filling via Entities bound cleanly to variables inside Generative Orchestration or Question nodes',
      'Deleting the user session and restarting',
      'Saving plain text to local browser cache',
      'Opening an Outlook draft manually',
    ],
    correctIndex: 0,
    explanation:
      'Slot filling extracts recognized entity values directly from the initial utterance and bypasses redundant prompts for variables already supplied.',
  },
  {
    id: 'ms4018-5',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'To give a Copilot Studio agent live read/write access to create purchase requisitions inside SAP or update a Dataverse case record, which extensibility mechanism should makers attach?',
    options: [
      'Actions / Connector Tools (Power Platform Connectors, Power Automate Flows, or REST OpenAPI Plugins)',
      'Static Markdown banners',
      'CSS style overrides',
      'Windows Task Scheduler',
    ],
    correctIndex: 0,
    explanation:
      'Copilot Studio Actions invoke 1,000+ Power Platform connectors, custom REST plugins, or Power Automate flows to execute real enterprise system transactions.',
  },
  {
    id: 'ms4018-6',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'When writing clear instructions ("Descriptions") for a custom Connector Action in Generative Orchestration, why does phrasing quality matter heavily?',
    options: [
      'The LLM orchestrator relies directly on Action and Input Parameter descriptions to decide WHEN to invoke the tool and WHAT payload values to pass',
      'Descriptions only appear in billing invoices',
      'Descriptions bypass Entra ID MFA',
      'Descriptions compress uploaded images',
    ],
    correctIndex: 0,
    explanation:
      'In generative orchestration, crisp action & parameter descriptions act as the tool contract guiding the LLM on exact invocation conditions and input schemas.',
  },
  {
    id: 'ms4018-7',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'Which built-in System Topic automatically activates whenever a user request fails to match any custom topic and generative knowledge returns zero grounded results?',
    options: ['Fallback system topic', 'Greeting topic', 'Thank you topic', 'Start Over topic'],
    correctIndex: 0,
    explanation:
      'The Fallback system topic handles unrecognized intents, triggers Generative Answers retries, or escalates cleanly to a live support queue.',
  },
  {
    id: 'ms4018-8',
    domain: 'Security, DLP & Enterprise Governance (MS-4018)',
    prompt:
      'A financial compliance director wants to ensure makers cannot build a Copilot Studio agent that accepts anonymous unauthenticated public queries while reading internal Finance Dataverse tables. Which Power Platform control enforces this globally?',
    options: [
      'Power Platform Data Loss Prevention (DLP) policies plus Managed Environment authentication guardrails',
      'Turning off Teams dark mode',
      'Renaming the bot environment to "Test"',
      'Removing custom CSS',
    ],
    correctIndex: 0,
    explanation:
      'Admin Center DLP policies allow blocking specific Copilot Studio channels, disabling anonymous access, or segregating HTTP/external connectors away from Business data.',
  },
  {
    id: 'ms4018-9',
    domain: 'Security, DLP & Enterprise Governance (MS-4018)',
    prompt:
      'When deploying a Copilot Studio agent natively as a declarative extension inside Microsoft 365 Copilot chat, how does it protect enterprise prompt data?',
    options: [
      'User prompts, grounded retrieval chunks, and LLM completions remain strictly inside the Microsoft 365 tenant compliance boundary and are never used to train foundation models',
      'Data is published publicly to Bing search',
      'Prompts are emailed to external contractors',
      'Tenant permissions are stripped prior to retrieval',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft 365 Copilot and Copilot Studio honor strict enterprise commercial data protection—zero training on tenant data, encrypted transit/storage, and Purview audit logging.',
  },
  {
    id: 'ms4018-10',
    domain: 'Publish, Channels & Autonomous Agents',
    prompt:
      'An operations team wants an agent to wake up automatically—with zero human chat prompt—the exact second a high-priority supplier invoice arrives in an Outlook shared mailbox, validate amounts against Dataverse POs, and post an exception summary in Teams. What Copilot Studio capability enables this?',
    options: [
      'Autonomous Agent Triggers (Event-driven triggers powered by Power Automate events)',
      'Manual Demo Website Test Pane',
      'Static QR code widget',
      'Power BI Slicer sync',
    ],
    correctIndex: 0,
    explanation:
      'Event Triggers turn Copilot Studio agents into autonomous background agents that react automatically to emails, Dataverse changes, or webhook events without requiring an interactive user chat.',
  },
  {
    id: 'ms4018-11',
    domain: 'Publish, Channels & Autonomous Agents',
    prompt:
      'After building and testing an employee onboarding agent in a Sandbox environment, which channel lets 5,000 staff access it directly inside their daily collaboration sidebar?',
    options: [
      'Publishing to the Microsoft Teams + Microsoft 365 Copilot channel',
      'Exporting raw YAML to local USB sticks',
      'Embedding an FTP link',
      'Running localhost port 3000 on developer laptops',
    ],
    correctIndex: 0,
    explanation:
      'One-click publishing to Microsoft Teams and Microsoft 365 Copilot deploys agents directly into organizational chat apps with Entra ID SSO enabled.',
  },
  {
    id: 'ms4018-12',
    domain: 'Publish, Channels & Autonomous Agents',
    prompt:
      'Where do makers inspect session abandonment rates, CSAT scores, generative answer citation rates, and escalation metrics after deploying a Copilot Studio agent?',
    options: [
      'Copilot Studio Analytics dashboard (backed by telemetry inside the environment)',
      'Windows Event Viewer on employee PCs',
      'Browser DevTools Network tab only',
      'Azure DNS Zone records',
    ],
    correctIndex: 0,
    explanation:
      'The Analytics tab in Copilot Studio tracks engagement, resolution rate, escalation rate, abandoned sessions, billed message consumption, and topic effectiveness.',
  },
  {
    id: 'ms4018-13',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'What happens when you adjust the "Content Moderation" level for Generative Answers inside Copilot Studio from High to Low?',
    options: [
      'Low moderation allows broader, more creative/flexible generation (higher risk of less strict answers); High moderation enforces stricter conservative grounding',
      'Low moderation turns off all SharePoint connections',
      'High moderation increases monthly message cost 10x',
      'Moderation controls font sizes',
    ],
    correctIndex: 0,
    explanation:
      'Content moderation levels (High/Medium/Low) calibrate the balance between strict deterministic precision vs expansive generative recall.',
  },
  {
    id: 'ms4018-14',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'A travel-booking agent uses Power Fx inside a Message node to greet users dynamically by first name and calculate total per-diem allowance (`Topic.Days * 150`). How are variables scoped across multiple topics in one conversation?',
    options: [
      'Global variables persist across all topics in the session, whereas Topic variables live only inside the active topic unless passed as Inputs/Outputs',
      'All variables erase after every single message',
      'Only integer variables work in Teams',
      'Variables require manual SQL stored procedures',
    ],
    correctIndex: 0,
    explanation:
      'Copilot Studio separates Topic-scoped variables (local or input/output mapped), Global variables (shared across the user conversation), and System variables (`System.User.DisplayName`).',
  },
  {
    id: 'ms4018-15',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'Can a Copilot Studio agent enforce strict zero-hallucination behavior on a regulated compliance topic so it answers ONLY from an approved internal PDF and never uses general internet knowledge?',
    options: [
      'Yes—disable "Allow the AI to use its own general knowledge" on the agent/Generative Answers node and restrict Knowledge strictly to the approved uploaded documents/SharePoint path',
      'No—LLMs always invent public facts even when restricted',
      'Only if HTML tags are removed',
      'Only by turning off Entra ID login',
    ],
    correctIndex: 0,
    explanation:
      'Disabling general LLM knowledge forces Generative Answers to synthesize responses exclusively from explicitly attached knowledge sources, refusing ungrounded queries cleanly.',
  },
  {
    id: 'ms4018-16',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'A banking support agent must transfer a frustrated caller—along with the prior chat transcript variables—directly to a human live agent inside Dynamics 365 Customer Service. Which node accomplishes this?',
    options: ['Transfer conversation node (Omnichannel handoff)', 'End all topics loop', 'Delete variable node', 'Static URL redirect'],
    correctIndex: 0,
    explanation:
      'The `Transfer conversation` node routes the active chat and context metadata cleanly to live support queues in Dynamics 365 Contact Center / Omnichannel or third-party engagement hubs.',
  },
  {
    id: 'ms4018-17',
    domain: 'Security, DLP & Enterprise Governance (MS-4018)',
    prompt:
      'Under Microsoft Purview governance for M365 Copilot & Copilot Studio, what prevents an AI agent from pulling content labeled "Strictly Confidential - Board Only" into broad employee summaries?',
    options: [
      'Microsoft Purview Sensitivity Labels paired with RBAC permissions and Microsoft Syntex/SharePoint Advanced Management restrictions',
      'Adding "Confidential" inside the bot greeting text',
      'Reducing browser zoom to 80%',
      'Renaming the SharePoint site URL',
    ],
    correctIndex: 0,
    explanation:
      'Microsoft Purview sensitivity labels and SharePoint Restricted Content Discovery / Entra permissions govern what M365 Copilot and grounded agents can access or output.',
  },
  {
    id: 'ms4018-18',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'What is the advantage of publishing an "Agent" directly inside Microsoft 365 Copilot (Copilot Studio Lite / Declarative Agent) versus a standalone custom web bot when targeting internal Microsoft 365 users?',
    options: [
      'Users can `@mention` the specialized agent directly inside Word, Teams, or BizChat without switching portals while inheriting M365 licensing and enterprise compliance',
      'It removes all SharePoint security permissions',
      'It requires deploying an AWS EC2 cluster',
      'It works without internet connectivity',
    ],
    correctIndex: 0,
    explanation:
      'Declarative agents embed tailored instructions, knowledge sources, and API actions straight inside the native Microsoft 365 Copilot `@mention` workspace.',
  },
  {
    id: 'ms4018-19',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'During testing inside the Copilot Studio canvas, an engineer sees a specific Action failed because the user forgot to provide an integer Order ID. Which visual debugging panel exposes every step, variable state, and orchestration plan taken by the agent?',
    options: ['Activity Map / Test Copilot Tracking panel', 'Windows Taskbar', 'SharePoint Recycle Bin', 'CSS Inspector'],
    correctIndex: 0,
    explanation:
      'The Activity Map visualizes real-time orchestration reasoning, triggered topics, tool input/output payloads, and knowledge citations step-by-step.',
  },
  {
    id: 'ms4018-20',
    domain: 'Publish, Channels & Autonomous Agents',
    prompt:
      'How should organizations deploy updates to an enterprise Copilot Studio agent from Dev to Test to Production environments safely?',
    options: [
      'Package the agent inside a Power Platform Managed Solution with Environment Variables & Connection References and deploy via Power Platform Pipelines',
      'Manually copy-paste prompt text directly in Production during peak hours',
      'Share creator logins across developers',
      'Delete and recreate the Production bot weekly',
    ],
    correctIndex: 0,
    explanation:
      'Power Platform Solutions + Pipelines provide automated ALM governance, separating Dev changes cleanly from live Production channels.',
  },
  {
    id: 'ms4018-21',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'When uploading technical PDF manuals directly into Copilot Studio Knowledge, how do chunking and semantic indexing operate behind the scenes?',
    options: [
      'Documents are indexed inside Dataverse vector storage so semantic search retrieves only relevant excerpts matching user meaning rather than exact keyword overlap alone',
      'Every full 500-page PDF is pasted verbatim into every prompt',
      'PDFs are converted into audio MP3 files',
      'Images are stripped without OCR',
    ],
    correctIndex: 0,
    explanation:
      'Copilot Studio indexes uploaded files into Dataverse semantic/vector search indexes, retrieving top-ranked passages efficiently per query.',
  },
  {
    id: 'ms4018-22',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'Which Adaptive Card capability inside Copilot Studio Message nodes dramatically reduces user typing errors when collecting structured PTO dates or expense categories in Teams?',
    options: [
      'Rendering interactive JSON Adaptive Card dropdowns, date pickers, and Submit action buttons inline inside chat',
      'Requiring users to upload raw XML syntax',
      'Asking users to write PowerShell queries',
      'Disabling text input',
    ],
    correctIndex: 0,
    explanation:
      'Adaptive Cards embed native interactive form controls (dropdowns, calendars, toggles) straight inside chat bubbles, returning clean structured JSON back to topic variables.',
  },
  {
    id: 'ms4018-23',
    domain: 'Security, DLP & Enterprise Governance (MS-4018)',
    prompt:
      'Why might an administrator configure "End-user authentication" vs "Maker/Author authentication" on an Action/Connector inside Copilot Studio?',
    options: [
      'End-user authentication executes external API calls using the signed-in employee’s own delegated permissions (preventing privilege escalation); Maker auth shares a fixed service connection',
      'Maker auth deletes Entra ID accounts',
      'End-user auth works only on public websites with zero login',
      'Both execute anonymously without credentials',
    ],
    correctIndex: 0,
    explanation:
      'Delegated end-user credentials ensure an HR or ERP connector never lets a regular employee read/modify records beyond their own RBAC privileges.',
  },
  {
    id: 'ms4018-24',
    domain: 'Publish, Channels & Autonomous Agents',
    prompt:
      'A multinational team needs one Copilot Studio agent to support English, Arabic, and German customers using shared logic. How does Copilot Studio support multi-language agents cleanly?',
    options: [
      'Adding secondary language localizations (JSON/ResX translation packs) inside a single agent configuration rather than cloning separate agents per country',
      'Requiring all non-English users to translate manually',
      'Creating 3 disconnected Power Platform tenants',
      'Disabling Unicode UTF-8 characters',
    ],
    correctIndex: 0,
    explanation:
      'Copilot Studio supports multi-language localization directly within a single agent via downloadable localization files and automatic language detection/switching.',
  },
  {
    id: 'ms4018-25',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'What happens when you configure a Prompt Builder custom AI prompt (Azure OpenAI GPT-4o / GPT-4o mini) inside Copilot Studio with explicit grounding from a Dataverse table?',
    options: [
      'The agent runs repeatable structured prompts—returning strict JSON/formatted summaries over live enterprise Dataverse rows',
      'It permanently deletes Dataverse columns',
      'It converts Dataverse tables into static PowerPoint slides only',
      'It disables HTTPS',
    ],
    correctIndex: 0,
    explanation:
      'Custom AI Builder / Prompt Builder prompts combine custom system instructions, temperature control, Dataverse data grounding, and strict structured JSON output schemas.',
  },
  {
    id: 'ms4018-26',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'Which HTTP/REST capability lets a Copilot Studio agent fetch real-time warehouse stock levels from a proprietary ERP API that does not exist in Microsoft’s built-in connector gallery?',
    options: [
      'Creating a Custom Connector (from OpenAPI/Swagger) or invoking an HTTP Request action inside an integrated Power Automate flow',
      'Uploading screenshots of the ERP hourly',
      'Running client-side `eval()` inside browser cookies',
      'Modifying DNS MX records',
    ],
    correctIndex: 0,
    explanation:
      'Custom Connectors or Power Automate HTTP actions bridge any authenticated internal/external REST endpoint cleanly into Copilot Studio workflows.',
  },
  {
    id: 'ms4018-27',
    domain: 'Security, DLP & Enterprise Governance (MS-4018)',
    prompt:
      'In Power Platform Managed Environments, how can IT prevent runaway Copilot Studio AI message billing across dozens of departmental pilot projects?',
    options: [
      'Allocating prepaid Copilot Studio Message Capacity packs / Pay-As-You-Go Azure billing limits per Environment with automated admin consumption alerts',
      'Blocking Teams access company-wide',
      'Uninstalling Microsoft Edge',
      'Turning off Entra ID MFA',
    ],
    correctIndex: 0,
    explanation:
      'Power Platform Admin Center Capacity Management allocates message quotas by environment and monitors generative action/classic message burn rates proactively.',
  },
  {
    id: 'ms4018-28',
    domain: 'Publish, Channels & Autonomous Agents',
    prompt:
      'To maximize public-website customer deflection on a B2B company homepage without forcing visitors to sign into Entra ID, which authentication & channel setup is used?',
    options: [
      'Custom Website channel with "No authentication" (or external B2C auth) grounded strictly in public website URLs and curated non-sensitive PDFs',
      'Microsoft Teams internal channel with mandatory Admin role',
      'Direct SharePoint Payroll folder grounding',
      'Windows Local Admin Login',
    ],
    correctIndex: 0,
    explanation:
      'External public website agents embed cleanly via the Custom Website iframe/Direct Line script using curated public knowledge bases—completely isolated from internal private data.',
  },
  {
    id: 'ms4018-29',
    domain: 'Design Copilot Studio Architecture & Knowledge Grounding',
    prompt:
      'Why is writing clear, concise "Agent Instructions" (system prompt guardrails) essential even when you already attached SharePoint Knowledge sources?',
    options: [
      'System instructions enforce tone, formatting rules, escalation thresholds, out-of-scope refusals, and tool-selection priorities across every response',
      'System instructions bypass DLP policies',
      'They replace DNS routing tables',
      'They auto-purchase Microsoft 365 licenses',
    ],
    correctIndex: 0,
    explanation:
      'Well-structured agent instructions govern persona, citation style, safety boundaries, and decision rules consistently before any tool or knowledge retrieval runs.',
  },
  {
    id: 'ms4018-30',
    domain: 'Configure Topics, Generative Orchestration & Actions',
    prompt:
      'In Microsoft 365 Copilot adoption (MS-4018), what key best practice maximizes accuracy before building custom Copilot Studio agents for Teams/SharePoint?',
    options: [
      'Auditing and cleaning up overshared SharePoint sites, stale duplicate PDFs, and broken RBAC permissions ("oversharing hygiene") first',
      'Making every corporate folder readable by "Everyone except external users"',
      'Deleting all Word documents',
      'Disabling Microsoft Search',
    ],
    correctIndex: 0,
    explanation:
      'Copilot inherits your exact Microsoft 365 permission graph—cleaning up SharePoint oversharing and outdated archive folders prevents noisy or unauthorized retrieval results.',
  },
];
