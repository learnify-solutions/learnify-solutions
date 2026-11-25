import { PracticeQuestion } from '../types';

export const GCP_ACE_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'gcp-1',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'An enterprise creates a new Google Cloud organization and needs to structure resource hierarchy so that billing, IAM policies, and VPC service controls apply uniformly to all projects within the Production business unit. Which resource hierarchy level should house Production projects?',
    options: [
      'Folders (e.g., "Production Folder" under the Organization root)',
      'Placing all projects directly inside the root billing account',
      'Global Compute Engine regions',
      'Google Workspace shared mailboxes',
    ],
    correctIndex: 0,
    explanation:
      'Folders sit between the Organization node and Projects, enabling granular IAM inheritance and policy delegation for specific business units like Production or Staging.',
  },
  {
    id: 'gcp-2',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'An auditor requires that service account keys in a GCP project cannot have a lifespan exceeding 90 days and must be rotated automatically. Which Google Cloud security feature enforces this organization-wide?',
    options: [
      'Organization Policy Constraint (`constraints/iam.disableServiceAccountKeyCreation` or `constraints/iam.serviceAccountKeyExpiryHours`)',
      'Disabling Compute Engine SSH keys',
      'Configuring VPC Firewall Rules on port 22',
      'Setting Cloud Storage bucket lifecycle rules',
    ],
    correctIndex: 0,
    explanation:
      'GCP Organization Policies enforce programmatic guardrails (like disabling service account key creation or enforcing key age limits) across all child folders and projects.',
  },
  {
    id: 'gcp-3',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'A data analytics team needs to estimate the monthly storage cost of 50 TB of Coldline Cloud Storage in us-central1 with 5 TB of monthly data retrieval. Which Google Cloud tool provides this pre-deployment cost model?',
    options: [
      'Google Cloud Pricing Calculator (cloud.google.com/products/calculator)',
      'Google Cloud Monitoring Dashboards',
      'Billing export to BigQuery',
      'Cloud Audit Logs',
    ],
    correctIndex: 0,
    explanation:
      'The Google Cloud Pricing Calculator models storage tiers, egress bandwidth, and retrieval fees before provisioning cloud resources.',
  },
  {
    id: 'gcp-4',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'A web application runs on Managed Instance Groups (MIG) behind an external HTTP(S) Load Balancer. Users experience slow response times during traffic surges because instances take 3 minutes to boot and configure. Which GCP feature accelerates MIG scaling response?',
    options: [
      'Instance Templates with pre-configured Container Images or custom disk snapshots / Google Cloud Deploy baked images',
      'Disabling HTTP/2 on the Load Balancer',
      'Switching from Regional to Zonal managed instance groups',
      'Increasing CPU limits on Cloud SQL',
    ],
    correctIndex: 0,
    explanation:
      'Using pre-baked disk snapshots or container images in Instance Templates drastically reduces MIG instance startup and health check readiness times during autoscaling events.',
  },
  {
    id: 'gcp-5',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'An engineer needs to inspect who deleted a Cloud Storage bucket last Tuesday across a GCP project. Which service logs this administrative event?',
    options: [
      'Cloud Audit Logs (Admin Activity logs retained for 400 days by default)',
      'VPC Flow Logs',
      'Cloud Trace profiler',
      'Compute Engine serial console output',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Audit Logs records administrative activities, data access, and system events, retaining Admin Activity logs for 400 days by default.',
  },
  {
    id: 'gcp-6',
    domain: 'Configuring access and security',
    prompt:
      'An external contractor needs read-only access to view Cloud Storage billing export buckets. Following Google security best practices, how should access be granted?',
    options: [
      'Assign the IAM role `roles/storage.objectViewer` specifically on the target bucket or project scope, avoiding primitive Owner/Editor roles',
      'Share the project owner Google account password via email',
      'Expose the storage bucket publicly via `allUsers`',
      'Configure a PPTP VPN tunnel',
    ],
    correctIndex: 0,
    explanation:
      'Principle of least privilege requires assigning pre-built or custom IAM roles (e.g., `roles/storage.objectViewer`) rather than overly broad primitive roles.',
  },
  {
    id: 'gcp-7',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'Two VPC networks (`vpc-app` and `vpc-db`) in different GCP projects require secure, low-latency private connectivity without traversing public IP addresses. What should you configure?',
    options: [
      'VPC Network Peering',
      'External HTTP(S) Load Balancer with Cloud Armor',
      'Cloud VPN over public internet',
      'Identity-Aware Proxy (IAP) TCP forwarding',
    ],
    correctIndex: 0,
    explanation:
      'VPC Network Peering connects two VPC networks internally across Google’s private backbone with low latency and no public IP traversal.',
  },
  {
    id: 'gcp-8',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'A backend service running on GKE crashes intermittently due to memory leaks. Where should the SRE team query aggregated container log streams across all pods?',
    options: [
      'Cloud Logging (Log Explorer) querying resource type `k8s_container`',
      'Local text files inside `/var/log` on the host VM',
      'Cloud SQL query console',
      'Firebase Realtime Database',
    ],
    correctIndex: 0,
    explanation:
      'GKE automatically integrates container stdout/stderr streams into Cloud Logging for centralized search, filtering, and metric alerts.',
  },
  {
    id: 'gcp-9',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'What is the function of Google Cloud Billing Budgets and Alerts?',
    options: [
      'They monitor actual and forecasted cloud spending against configured budget thresholds, sending email notifications or Pub/Sub triggers to Cloud Functions',
      'They automatically delete all GCP resources when credit card expires',
      'They convert AWS bills into GCP format',
      'They limit incoming SQL traffic on port 3306',
    ],
    correctIndex: 0,
    explanation:
      'Billing Budgets track monthly expenditure and trigger alerts or programmatic Pub/Sub automated responses when thresholds (e.g., 50%, 90%, 100%) are reached.',
  },
  {
    id: 'gcp-10',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'An engineering team needs to choose a fully managed NoSQL document database in GCP supporting ACID transactions, high availability, and global horizontal scaling with SQL-like querying. Which database fits best?',
    options: [
      'Cloud Firestore (in Datastore mode or Native mode)',
      'Compute Engine running MySQL on persistent disk',
      'Cloud Memorystore for Memcached',
      'BigQuery analytical warehouse',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Firestore is GCP’s serverless NoSQL document database providing automatic multi-region replication, strong consistency, and ACID transactions.',
  },
  {
    id: 'gcp-11',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'You need to deploy a Python Flask application on a fully managed serverless platform in GCP that scales automatically from zero to thousands of containers based on HTTP traffic requests. Which GCP service is ideal?',
    options: [
      'Cloud Run',
      'Compute Engine Managed Instance Groups',
      'Google Kubernetes Service (GKE) Standard',
      'Bare Metal Solution',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Run is a fully managed serverless container platform that scales containers up and down (including to zero) based on incoming HTTP requests, billing strictly per request duration.',
  },
  {
    id: 'gcp-12',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'How does Cloud Monitoring uptime check function with alerting policies?',
    options: [
      'It pings public URLs or TCP ports from multiple global locations at regular intervals and triggers alert notifications if endpoints fail health checks',
      'It monitors internal RAM usage inside confidential VM memory chips',
      'It backs up MySQL databases every 5 minutes',
      'It blocks unauthorized SSH attempts on port 22',
    ],
    correctIndex: 0,
    explanation:
      'Uptime checks test public HTTP/HTTPS, TCP, or SSL endpoints globally and fire Cloud Monitoring alerts when sites become unreachable.',
  },
  {
    id: 'gcp-13',
    domain: 'Configuring access and security',
    prompt:
      'An administrator wants to allow developers to connect via SSH to Compute Engine instances inside private subnets that have NO public IP addresses, without configuring bastion hosts. Which service enables this securely?',
    options: [
      'Identity-Aware Proxy (IAP) TCP forwarding (`gcloud compute ssh`)',
      'PPTP VPN gateway',
      'Exposing port 22 on VPC firewall rules publicly',
      'Using HTTP proxy servers',
    ],
    correctIndex: 0,
    explanation:
      'Identity-Aware Proxy (IAP) tunnels TCP traffic (like SSH and RDP) over HTTPS through Google’s edge, allowing secure access to private VMs without public IPs.',
  },
  {
    id: 'gcp-14',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'A company needs to ingest 100,000 real-time IoT telemetry events per second globally and stream them into Dataflow and BigQuery for live analytics. Which GCP messaging service acts as the global ingestion buffer?',
    options: [
      'Pub/Sub',
      'Cloud SQL',
      'Cloud Storage Standard',
      'Bigtable',
    ],
    correctIndex: 0,
    explanation:
      'Google Cloud Pub/Sub is a fully managed real-time messaging service that decouples senders and receivers for global event ingestion.',
  },
  {
    id: 'gcp-15',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'What is the purpose of Terraform or Google Cloud Deployment Manager when provisioning GCP infrastructure?',
    options: [
      'Infrastructure as Code (IaC) tools that define and provision cloud resources declaratively with version control and state management',
      'Antivirus software protecting Compute Engine disks',
      'Graphical web browsers for viewing Cloud Console',
      'Database migration tools for Oracle to PostgreSQL',
    ],
    correctIndex: 0,
    explanation:
      'IaC tools automate repeatable cloud deployments declaratively, ensuring consistency across environments.',
  },
  {
    id: 'gcp-16',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'How do GCP Shared VPC and VPC Network Peering differ?',
    options: [
      'Shared VPC allows a host project to share subnets with service projects within the same organization under centralized admin control; VPC Network Peering connects two separate VPC networks across projects without sharing subnets',
      'Shared VPC is only used for billing reports',
      'VPC Network Peering requires physical fiber cables',
      'There is no functional difference between Shared VPC and Peering',
    ],
    correctIndex: 0,
    explanation:
      'Shared VPC centralizes network administration across projects via shared subnets, whereas VPC Network Peering links separate VPC networks peer-to-peer.',
  },
  {
    id: 'gcp-17',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'An analytics query in BigQuery scans 10 TB of unpartitioned CSV files in Cloud Storage, costing $50 per query. How can you optimize the table and query structure to reduce scan costs?',
    options: [
      'Convert CSV files into columnar compressed Parquet/ORC format, partition tables by date, and cluster columns',
      'Increase the BigQuery slot reservation limit to maximum',
      'Run queries only during weekends',
      'Delete Cloud Logging audit logs',
    ],
    correctIndex: 0,
    explanation:
      'BigQuery charges based on bytes scanned. Partitioning by date, clustering, and using columnar formats (Parquet) drastically reduces scanned data volume.',
  },
  {
    id: 'gcp-18',
    domain: 'Configuring access and security',
    prompt:
      'What is the purpose of Google Cloud Secret Manager?',
    options: [
      'It securely stores API keys, passwords, and TLS certificates with versioning, IAM access control, and audit logging',
      'It stores operating system ISO installation files',
      'It manages firewall rule priority numbers',
      'It calculates employee monthly salaries',
    ],
    correctIndex: 0,
    explanation:
      'Secret Manager is GCP’s dedicated service for secure storage and rotation of sensitive application secrets.',
  },
  {
    id: 'gcp-19',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'An application requires a relational PostgreSQL database with automatic failover across zones, managed backups, and scaling up to 64 TB of storage without manual sharding. Which GCP service fits?',
    options: [
      'Cloud SQL for PostgreSQL (or Cloud Spanner for petabyte scale)',
      'Compute Engine single VM running PostgreSQL',
      'Bigtable columnar store',
      'Cloud Memorystore for Redis',
    ],
    correctIndex: 0,
    explanation:
      'Cloud SQL provides managed relational databases (PostgreSQL, MySQL, SQL Server) with high availability and automated backups.',
  },
  {
    id: 'gcp-20',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'How do preemptible VMs (or Spot VMs) on Compute Engine save up to 90% on compute costs?',
    options: [
      'They offer heavily discounted compute instances that Google can terminate with a 30-second warning whenever compute capacity is needed elsewhere',
      'They run without CPU cores or RAM',
      'They operate exclusively without internet connection',
      'They require 10-year upfront commitments',
    ],
    correctIndex: 0,
    explanation:
      'Spot VMs / Preemptible VMs provide low-cost compute for batch and fault-tolerant workloads subject to termination when capacity is reclaimed.',
  },
  {
    id: 'gcp-21',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'What is the role of the Google Cloud CLI (`gcloud`) tool?',
    options: [
      'It provides a command-line interface to create, configure, and manage GCP resources across Compute Engine, GKE, IAM, and Cloud Storage',
      'It compiles Java source code into Android APKs',
      'It acts as an antivirus scanner for local laptops',
      'It replaces git for version control',
    ],
    correctIndex: 0,
    explanation:
      '`gcloud` is the primary CLI tool for interacting with Google Cloud APIs and managing infrastructure resources.',
  },
  {
    id: 'gcp-22',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'An SRE team wants to receive a PagerDuty alert whenever 5xx HTTP error rates on an external HTTP(S) Load Balancer exceed 2% over a 5-minute window. Which GCP service creates this rule?',
    options: [
      'Cloud Monitoring Alerting Policies with Muting Channels and Notification Channels',
      'Cloud Billing Reports',
      'Compute Engine Serial Console',
      'VPC Flow Logs analyzer',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Monitoring alerting policies evaluate metric time-series data and dispatch notifications to Webhooks, PagerDuty, Slack, or Email channels.',
  },
  {
    id: 'gcp-23',
    domain: 'Configuring access and security',
    prompt:
      'What is the difference between a Google Cloud Service Account and a User Account?',
    options: [
      'Service Accounts represent non-human applications, workloads, or CI/CD pipelines that authenticate programmatically to GCP APIs, whereas User Accounts represent individual people',
      'Service Accounts cannot access Cloud Storage buckets',
      'User Accounts require JSON private key files instead of passwords',
      'Service Accounts are billed at double the rate of user accounts',
    ],
    correctIndex: 0,
    explanation:
      'Service accounts provide programmatic identity for applications and VMs to authenticate securely to GCP services.',
  },
  {
    id: 'gcp-24',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'A legacy enterprise application requires a shared POSIX-compliant Network File System (NFS) mount accessible simultaneously by multiple Compute Engine instances across different zones. Which GCP service provides this?',
    options: [
      'Filestore',
      'Cloud Storage Standard Bucket',
      'Persistent Disk Standard',
      'Cloud Memorystore',
    ],
    correctIndex: 0,
    explanation:
      'Google Cloud Filestore provides fully managed enterprise NFS file shares mountable concurrently across multiple VMs.',
  },
  {
    id: 'gcp-25',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'How do you deploy container images securely in Google Cloud without managing Kubernetes worker nodes or VM clusters?',
    options: [
      'Google Cloud Run (or Cloud Functions for serverless functions)',
      'Compute Engine standard VM with Docker installed manually',
      'BigQuery ML models',
      'Cloud SQL database instances',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Run offers serverless container execution with automatic scaling and zero infrastructure management.',
  },
  {
    id: 'gcp-26',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'What is the purpose of Google Cloud IAM (Identity and Access Management)?',
    options: [
      'It centralizes authorization management, controlling who (identity) has what access (role) to which resources',
      'It encrypts hard drives using BitLocker',
      'It routes BGP packets across global datacenters',
      'It compresses log files into zip archives',
    ],
    correctIndex: 0,
    explanation:
      'IAM implements "Who can do What on Which Resource" authorization across GCP projects and organizations.',
  },
  {
    id: 'gcp-27',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'You need to examine packet traffic drop rates and source/destination IP flows traversing a VPC subnet. Which GCP logging feature captures this network telemetry?',
    options: [
      'VPC Flow Logs',
      'Cloud Audit Admin Activity Logs',
      'Cloud Trace profiler',
      'GKE container stderr logs',
    ],
    correctIndex: 0,
    explanation:
      'VPC Flow Logs sample network traffic sent and received by VM instances, useful for network monitoring, forensics, and security audits.',
  },
  {
    id: 'gcp-28',
    domain: 'Configuring access and security',
    prompt:
      'What is VPC Service Controls in Google Cloud?',
    options: [
      'A security perimeter around GCP services (like Cloud Storage and BigQuery) that prevents data exfiltration to unauthorized external networks or public endpoints',
      'A firewall rule blocking TCP port 80',
      'A mechanism to speed up SSH key generation',
      'A billing quota limit on Compute Engine CPUs',
    ],
    correctIndex: 0,
    explanation:
      'VPC Service Controls establishes security perimeters around managed GCP services, preventing unauthorized data transfer outside the perimeter.',
  },
  {
    id: 'gcp-29',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'A global news website with millions of visitors requires sub-second content delivery and static caching at edge locations worldwide, backed by Cloud Storage or HTTP origin servers. Which GCP service meets this?',
    options: [
      'Cloud CDN (Content Delivery Network) integrated with HTTP(S) Load Balancing',
      'Compute Engine single zonal VM',
      'Cloud SQL replica in us-central1',
      'Cloud Pub/Sub topic subscription',
    ],
    correctIndex: 0,
    explanation:
      'Cloud CDN leverages Google’s global edge network to cache and deliver HTTP(S) content close to users with low latency.',
  },
  {
    id: 'gcp-30',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'How do you update a Google Kubernetes Engine (GKE) cluster control plane version safely?',
    options: [
      'Initiate a control plane upgrade via Google Cloud Console or `gcloud container clusters update --master-version`',
      'Reinstall Linux operating system on master nodes manually',
      'Delete the entire project and recreate it',
      'Edit `/etc/kubernetes/config` on worker nodes',
    ],
    correctIndex: 0,
    explanation:
      'GKE is a managed service where Google handles master node upgrades when initiated by the administrator via gcloud or console.',
  },
  {
    id: 'gcp-31',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'What is the purpose of Google Cloud Interconnect (Dedicated Interconnect / Partner Interconnect)?',
    options: [
      'It provides a high-speed, enterprise-grade direct physical connection between an on-premises datacenter and Google’s network, bypassing the public internet',
      'It connects two mobile phones via Bluetooth',
      'It speeds up web browsing on Chrome',
      'It links Google Workspace to Microsoft 365',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Interconnect establishes dedicated enterprise links between on-premises facilities and Google VPCs for high throughput and security.',
  },
  {
    id: 'gcp-32',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'You need to trace microservice latency bottlenecks across a distributed system in GCP. Which service records latency spans and request call trees?',
    options: [
      'Cloud Trace',
      'Cloud Logging',
      'Cloud Monitoring Uptime Checks',
      'Cloud Billing Export',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Trace collects latency data from distributed applications to help developers debug performance bottlenecks.',
  },
  {
    id: 'gcp-33',
    domain: 'Configuring access and security',
    prompt:
      'What is the function of Google Cloud Armor?',
    options: [
      'A network security service providing DDoS defense, Web Application Firewall (WAF) rule filtering, and rate limiting for HTTP(S) Load Balancers',
      'An antivirus scanner for Compute Engine boot disks',
      'A tool for generating SSH public keys',
      'A password manager for Google Workspace users',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Armor protects web applications and load balancers against L3/L4/L7 DDoS attacks and SQLi/XSS OWASP threats.',
  },
  {
    id: 'gcp-34',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'A media company needs durable, low-cost archival storage for digital tapes accessed less than once a year. Which Cloud Storage storage class is most cost-effective?',
    options: [
      'Archive Storage',
      'Standard Storage',
      'Nearline Storage',
      'Coldline Storage',
    ],
    correctIndex: 0,
    explanation:
      'Archive Storage is Google’s lowest-cost storage class designed for data retention of 365+ days with rare access requirements.',
  },
  {
    id: 'gcp-35',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'How do you manage container clusters and worker nodes in Google Kubernetes Engine (GKE) Autopilot mode compared to Standard mode?',
    options: [
      'In Autopilot mode, Google provisions, manages, and scales worker node infrastructure automatically; in Standard mode, administrators manage worker node pools directly',
      'Autopilot mode requires manual kernel compilation',
      'Standard mode runs entirely without containers',
      'There is no architectural difference between Autopilot and Standard',
    ],
    correctIndex: 0,
    explanation:
      'GKE Autopilot is a hands-off managed Kubernetes mode where Google manages nodes, whereas Standard gives full cluster admin control over node VMs.',
  },
  {
    id: 'gcp-36',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'What is the purpose of Google Cloud Resource Manager API?',
    options: [
      'It allows programmatically querying and managing resource hierarchy (organizations, folders, projects) and IAM policies',
      'It manages compute engine CPU core quotas',
      'It calculates monthly storage billing reports',
      'It translates domain names via Cloud DNS',
    ],
    correctIndex: 0,
    explanation:
      'Resource Manager APIs enable programmatic creation and management of GCP organizational hierarchy.',
  },
  {
    id: 'gcp-37',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'An engineer needs to inspect kernel boot messages and startup diagnostics of an unresponsive Compute Engine Linux VM. Where can this be viewed without logging into the OS?',
    options: [
      'Compute Engine Serial Console output (Port 1)',
      'Cloud SQL query console',
      'Cloud Storage browser',
      'BigQuery console',
    ],
    correctIndex: 0,
    explanation:
      'The Compute Engine serial console captures text output directly from the VM’s virtual serial port for low-level boot troubleshooting.',
  },
  {
    id: 'gcp-38',
    domain: 'Configuring access and security',
    prompt:
      'How does Google Cloud handle data encryption at rest by default for Cloud Storage and Persistent Disks?',
    options: [
      'Google encrypts all customer data at rest by default using strong AES-256 keys managed by Google (CSEK/CMEK options also available)',
      'Data is stored in plaintext unless explicitly encrypted by customer code',
      'Encryption requires purchasing an external hardware HSM module',
      'Only backups are encrypted; active data is unencrypted',
    ],
    correctIndex: 0,
    explanation:
      'Google encrypts data at rest automatically by default using Google-managed encryption keys, with support for customer-managed keys (CMEK) via Cloud KMS.',
  },
  {
    id: 'gcp-39',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'An enterprise wants to migrate an on-premises Oracle database to GCP with minimal downtime using change data capture (CDC). Which Google Cloud service manages this migration?',
    options: [
      'Database Migration Service (DMS)',
      'BigQuery Data Transfer Service',
      'Cloud Storage Transfer Service',
      'Cloud Deployment Manager',
    ],
    correctIndex: 0,
    explanation:
      'Database Migration Service (DMS) provides serverless, secure, and minimal-downtime migrations for PostgreSQL, MySQL, and Oracle to Cloud SQL.',
  },
  {
    id: 'gcp-40',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'What is the purpose of Google Cloud Storage Object Lifecycle Management rules?',
    options: [
      'They automate data management (e.g., automatically deleting old temporary files or transitioning objects from Standard to Nearline/Coldline/Archive after X days)',
      'They encrypt files using customer passwords',
      'They share bucket access with public internet users',
      'They backup Cloud SQL databases to BigQuery',
    ],
    correctIndex: 0,
    explanation:
      'Lifecycle rules automate object deletion or storage class transitions based on age, number of newer versions, or storage tier.',
  },
  {
    id: 'gcp-41',
    domain: 'Setting up a cloud solution environment',
    prompt:
      'What is the function of Google Cloud IAM Conditions?',
    options: [
      'They allow adding attribute-based access control (ABAC) rules to IAM bindings so roles apply conditionally based on resource attributes, time, or expiration',
      'They check whether a user has a valid passport',
      'They limit VPC firewall rules to port 443',
      'They disable billing alerts when budgets are exceeded',
    ],
    correctIndex: 0,
    explanation:
      'IAM Conditions enable time-based or resource-attribute-based security bindings for finer-grained access control.',
  },
  {
    id: 'gcp-42',
    domain: 'Ensuring successful operation of a cloud solution',
    prompt:
      'An application running in GKE experiences intermittent CPU throttling during traffic spikes. Which tool helps visualize container CPU limits vs actual usage over time?',
    options: [
      'Cloud Monitoring Dashboards & Metrics Explorer (`k8s_container/cpu/core_usage_time`)',
      'Cloud Storage bucket browser',
      'BigQuery query editor',
      'Cloud IAM permissions page',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Monitoring collects GKE container metrics, allowing SREs to graph CPU requests, limits, and throttling percentages.',
  },
  {
    id: 'gcp-43',
    domain: 'Configuring access and security',
    prompt:
      'What is the purpose of Google Cloud Key Management Service (Cloud KMS)?',
    options: [
      'A cloud-hosted cryptographic key management service enabling customers to generate, use, rotate, and destroy encryption keys (CMEK)',
      'A password manager for Google accounts',
      'A tool for generating SSH public/private keys for VM login',
      'An SSL certificate issuer for public websites',
    ],
    correctIndex: 0,
    explanation:
      'Cloud KMS lets organizations manage cryptographic keys centrally to protect sensitive data across GCP services.',
  },
  {
    id: 'gcp-44',
    domain: 'Planning and configuring a cloud solution',
    prompt:
      'What is the role of Google Cloud Armor adaptive protection?',
    options: [
      'It uses machine learning to detect and automatically mitigate layer 7 DDoS attacks and application-layer anomalies in real time',
      'It optimizes database index performance in Cloud SQL',
      'It scales Kubernetes pods based on memory usage',
      'It reduces Cloud Storage egress bandwidth costs',
    ],
    correctIndex: 0,
    explanation:
      'Cloud Armor Adaptive Protection uses ML to analyze traffic patterns and alert/defend against volumetric L7 DDoS and application attacks.',
  },
  {
    id: 'gcp-45',
    domain: 'Deploying and implementing a cloud solution',
    prompt:
      'How do you establish secure, encrypted site-to-site connectivity between an on-premises Cisco ASA firewall and a Google Cloud VPC over the public internet?',
    options: [
      'Cloud VPN (Classic VPN or HA VPN using IPsec tunnels)',
      'Google Cloud Interconnect Dedicated',
      'VPC Network Peering',
      'Identity-Aware Proxy TCP forwarding',
    ],
    correctIndex: 0,
    explanation:
      'Cloud VPN connects peer networks to Google Cloud VPC through an IPsec VPN connection over the public internet with high availability options.',
  },
];

export const LINUX_PLUS_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'linux-1',
    domain: 'System Architecture & Processes',
    prompt:
      'A background service daemon on an enterprise Linux server consumes 100% CPU and becomes unresponsive. Which command sequence identifies the process PID and terminates it gracefully (`SIGTERM`) vs forcefully (`SIGKILL`)?',
    options: [
      '1. `pgrep -u nginx` or `top`/`htop` \n2. `kill <PID>` (SIGTERM 15) \n3. If stuck, `kill -9 <PID>` (SIGKILL 9)',
      '`rm -rf /`',
      '`systemctl reboot` immediately without checking PIDs',
      '`shutdown -h now`',
    ],
    correctIndex: 0,
    explanation:
      'Finding the PID via `pgrep`/`ps` and issuing a polite `kill` (SIGTERM) allows clean process shutdown; SIGKILL (9) forces immediate kernel termination.',
  },
  {
    id: 'linux-2',
    domain: 'Storage & File Management',
    prompt:
      'An administrator runs `df -h` and sees `/var` is at 100% disk usage, yet `du -sh /var/*` does not account for all missing Gigabytes. What is the most likely cause?',
    options: [
      'Deleted open files: processes (like loggers) still hold file handles open to deleted log files, continuing to consume disk space until the holding process restarts',
      'The ext4 filesystem is corrupted and needs defragmentation',
      'Inodes were deleted while blocks remain active',
      'Swap memory filled up physical RAM',
    ],
    correctIndex: 0,
    explanation:
      'When a file is unlinked (`rm`) while a process still has it open, the ext4 inode blocks remain allocated until the holding process closes the file descriptor or restarts. `lsof +L1` detects these.',
  },
  {
    id: 'linux-3',
    domain: 'Networking & Security',
    prompt:
      'Which `ss` or `netstat` command flags display all listening TCP and UDP ports along with their corresponding process names and PIDs?',
    options: [
      '`ss -tulpn` (or `netstat -tulpn` on legacy systems)',
      '`ss -s`',
      '`ping -c 4 127.0.0.1`',
      '`ip route show`',
    ],
    correctIndex: 0,
    explanation:
      '`ss -tulpn` lists TCP (`-t`) and UDP (`-u`) listening (`-l`) sockets with numeric ports (`-n`) and process/PID (`-p`) mapping.',
  },
  {
    id: 'linux-4',
    domain: 'Services & Automation',
    prompt:
      'A systemd service unit `/etc/systemd/system/myapp.service` was modified. Which command must run so systemd reloads the updated unit file configuration before restarting the service?',
    options: [
      '`systemctl daemon-reload` followed by `systemctl restart myapp`',
      '`systemctl refresh-units`',
      '`service myapp reload-all`',
      '`systemctl enable --now myapp`',
    ],
    correctIndex: 0,
    explanation:
      '`systemctl daemon-reload` tells systemd to rescan modified unit files on disk before starting or restarting services.',
  },
  {
    id: 'linux-5',
    domain: 'Security & Permissions',
    prompt:
      'An executable script `/usr/local/bin/deploy.sh` owned by root must be runnable by standard users, but whenever they execute it, it must run with root user privileges (SetUID). Which permission mode sets this?',
    options: [
      '`chmod 4755 /usr/local/bin/deploy.sh` (or `chmod u+s`)',
      '`chmod 0700 /usr/local/bin/deploy.sh`',
      '`chown user:user /usr/local/bin/deploy.sh`',
      '`chmod +x` without owner bits',
    ],
    correctIndex: 0,
    explanation:
      'The SetUID bit (`4000` octal or `u+s`) causes an executable file to run with the permissions of the file owner (root) rather than the executing user.',
  },
  {
    id: 'linux-6',
    domain: 'Troubleshooting & Performance',
    prompt:
      'An engineer investigates intermittent network packet loss on a Linux router. Which tool captures raw packets passing through network interface `eth0` for Wireshark analysis?',
    options: [
      '`tcpdump -i eth0 -w capture.pcap`',
      '`cat /proc/net/arp`',
      '`uptime`',
      '`free -m`',
    ],
    correctIndex: 0,
    explanation:
      '`tcpdump` captures network packet traffic on specified interfaces for forensic inspection and debugging.',
  },
  {
    id: 'linux-7',
    domain: 'System Architecture & Processes',
    prompt:
      'What is the function of the Linux kernel Out-Of-Memory (OOM) killer?',
    options: [
      'When physical RAM and swap are exhausted, the kernel selects and terminates a memory-heavy process to prevent total system kernel panic and lockup',
      'It cleans up orphaned temp files in `/tmp` every midnight',
      'It formats unmounted hard drives automatically',
      'It terminates idle SSH sessions after 15 minutes',
    ],
    correctIndex: 0,
    explanation:
      'The Linux OOM killer is a kernel safety mechanism that sacrifices a scored process when memory resources are depleted.',
  },
  {
    id: 'linux-8',
    domain: 'Storage & File Management',
    prompt:
      'How do you create a symbolic link (symlink) named `/app/current` pointing to directory `/var/www/releases/v2`?',
    options: [
      '`ln -s /var/www/releases/v2 /app/current`',
      '`ln /var/www/releases/v2 /app/current`',
      '`cp -s /var/www/releases/v2 /app/current`',
      '`mount --bind /var/www/releases/v2 /app/current`',
    ],
    correctIndex: 0,
    explanation:
      '`ln -s <target> <symlink_name>` creates a symbolic link referencing a file or directory path.',
  },
  {
    id: 'linux-9',
    domain: 'System Architecture & Processes',
    prompt:
      'Which systemd command enables a web server service so that it starts automatically upon system boot?',
    options: [
      '`systemctl enable nginx`',
      '`systemctl start nginx`',
      '`systemctl daemon-reload nginx`',
      '`systemctl status nginx`',
    ],
    correctIndex: 0,
    explanation:
      '`systemctl enable` creates symbolic links from systemd unit files into multi-user target directories to ensure automatic boot startup.',
  },
  {
    id: 'linux-10',
    domain: 'Storage & File Management',
    prompt:
      'How do you check available inode counts across mounted filesystems to ensure applications are not failing due to running out of inodes while disk blocks have spare space?',
    options: [
      '`df -i`',
      '`df -h`',
      '`du -sh /*`',
      '`free -m`',
    ],
    correctIndex: 0,
    explanation:
      '`df -i` displays inode usage, total inodes, and free inodes per filesystem, essential when many small files fill up a partition.',
  },
  {
    id: 'linux-11',
    domain: 'Networking & Security',
    prompt:
      'What is the purpose of the `/etc/resolv.conf` configuration file in Linux networking?',
    options: [
      'It specifies IP addresses of DNS name servers that the system queries to resolve domain names',
      'It defines static IP routing tables',
      'It stores SSH authorized public keys',
      'It lists blocked TCP firewall ports',
    ],
    correctIndex: 0,
    explanation:
      '`/etc/resolv.conf` holds nameserver entries (`nameserver 8.8.8.8`) used by the resolver library.',
  },
  {
    id: 'linux-12',
    domain: 'Services & Automation',
    prompt:
      'An administrator needs to schedule a database backup script `/opt/backup.sh` to run every day at 02:30 AM. Which crontab entry correctly configures this?',
    options: [
      '`30 2 * * * /opt/backup.sh`',
      '`* * * * * /opt/backup.sh`',
      '`0 0 2 3 * /opt/backup.sh`',
      '`2 3 * * * /opt/backup.sh`',
    ],
    correctIndex: 0,
    explanation:
      'Crontab syntax: `minute hour day-of-month month day-of-week`. `30 2 * * *` executes at minute 30, hour 2 (02:30 AM) daily.',
  },
  {
    id: 'linux-13',
    domain: 'Security & Permissions',
    prompt:
      'What is the purpose of the `/etc/sudoers` file, and which command should be used to edit it safely?',
    options: [
      'It configures which users or groups can execute commands with root privileges; it should always be edited using `visudo` to prevent syntax errors that lock out admins',
      'It stores user login passwords in plaintext',
      'It configures Apache virtual hosts',
      'It controls Linux kernel module loading',
    ],
    correctIndex: 0,
    explanation:
      '`visudo` locks `/etc/sudoers` and syntax-checks changes upon save, preventing accidental lockouts caused by typo errors.',
  },
  {
    id: 'linux-14',
    domain: 'Troubleshooting & Performance',
    prompt:
      'Which file in the Linux virtual filesystem contains real-time kernel and system performance metrics including CPU load averages and memory stats?',
    options: [
      '`/proc/` (e.g., `/proc/meminfo`, `/proc/cpuinfo`, `/proc/loadavg`)',
      '`/var/log/syslog`',
      '`/etc/fstab`',
      '`/bin/bash`',
    ],
    correctIndex: 0,
    explanation:
      'The `/proc` pseudo-filesystem exposes live kernel and process runtime statistics as readable text files.',
  },
  {
    id: 'linux-15',
    domain: 'System Architecture & Processes',
    prompt:
      'What is LVM (Logical Volume Management) in Linux?',
    options: [
      'A device mapper framework that provides flexible storage abstraction, enabling volume resizing, striping, and snapshots across physical hard drives',
      'A network protocol for remote file mounting',
      'A firewall utility replacing iptables',
      'A bootloader manager replacing GRUB',
    ],
    correctIndex: 0,
    explanation:
      'LVM abstracts physical disks into Volume Groups (VGs) and Logical Volumes (LVs), allowing dynamic resizing without downtime.',
  },
  {
    id: 'linux-16',
    domain: 'Storage & File Management',
    prompt:
      'How do you permanently mount an NTFS or ext4 partition at boot by editing `/etc/fstab`?',
    options: [
      'Add an entry specifying device UUID or mount point, filesystem type, mount options (`defaults`), dump (`0`), and fsck pass order (`2`)',
      'Run `fdisk /dev/sda` every reboot',
      'Create a bash script in `/tmp`',
      'Set `systemctl enable fstab`',
    ],
    correctIndex: 0,
    explanation:
      '`/etc/fstab` defines persistent filesystem mounts applied at system startup.',
  },
  {
    id: 'linux-17',
    domain: 'Networking & Security',
    prompt:
      'What is the function of the `iptables` or `nftables` packet filtering framework in Linux?',
    options: [
      'It inspects network packets and applies stateful firewall rules to allow, drop, or reject traffic based on IP, port, and protocol',
      'It translates domain names into IP addresses',
      'It synchronizes system time via NTP',
      'It compresses log files daily',
    ],
    correctIndex: 0,
    explanation:
      'Netfilter/iptables/nftables provides kernel-level packet filtering and NAT capabilities for Linux firewalls.',
  },
  {
    id: 'linux-18',
    domain: 'Services & Automation',
    prompt:
      'How do you check logs for a specific systemd service (e.g., `ssh`) in real time, showing only recent entries?',
    options: [
      '`journalctl -u ssh -f`',
      '`tail -f /var/log/messages`',
      '`cat /var/log/ssh.log`',
      '`systemctl logs ssh`',
    ],
    correctIndex: 0,
    explanation:
      '`journalctl -u <service> -f` follows (`-f`) the systemd journal log stream specifically for the named service unit.',
  },
  {
    id: 'linux-19',
    domain: 'Security & Permissions',
    prompt:
      'What does `chown -R www-data:www-data /var/www/html` accomplish?',
    options: [
      'It recursively (`-R`) changes the user owner and group owner of all files and directories inside `/var/www/html` to `www-data`',
      'It deletes all files in `/var/www/html` securely',
      'It sets read-only file permissions to 444',
      'It creates a symbolic link to www-data',
    ],
    correctIndex: 0,
    explanation:
      '`chown -R` recursively updates file ownership (user:group) across directory trees.',
  },
  {
    id: 'linux-20',
    domain: 'Troubleshooting & Performance',
    prompt:
      'An administrator suspects hardware disk failure. Which utility queries S.M.A.R.T. health status and error logs of physical NVMe/SATA drives?',
    options: [
      '`smartctl` (from `smartmontools`)',
      '`ping`',
      '`ifconfig`',
      '`top`',
    ],
    correctIndex: 0,
    explanation:
      '`smartctl` communicates with drive controller firmware to inspect S.M.A.R.T. health metrics and predict impending hardware failures.',
  },
  {
    id: 'linux-21',
    domain: 'System Architecture & Processes',
    prompt:
      'What is the difference between hard links and symbolic links in Linux?',
    options: [
      'A hard link points directly to the file inode (sharing exact data blocks, cannot cross filesystems); a symbolic link points to a file pathname (can cross filesystems and point to directories)',
      'Hard links only work on Windows partitions',
      'Symbolic links cannot be deleted',
      'There is no difference between hard and soft links',
    ],
    correctIndex: 0,
    explanation:
      'Hard links share the same inode number; symbolic links store file path text strings.',
  },
  {
    id: 'linux-22',
    domain: 'Storage & File Management',
    prompt:
      'How do you search for files larger than 100 MB across the entire filesystem starting from root `/`?',
    options: [
      '`find / -type f -size +100M 2>/dev/null`',
      '`ls -la / | grep 100M`',
      '`du -sh /`',
      '`search --size 100M`',
    ],
    correctIndex: 0,
    explanation:
      '`find / -size +100M` searches for files exceeding 100 Megabytes, redirecting permission denied errors to `/dev/null`.',
  },
  {
    id: 'linux-23',
    domain: 'Networking & Security',
    prompt:
      'What is the role of SELinux (Security-Enhanced Linux) or AppArmor in Linux security?',
    options: [
      'They enforce Mandatory Access Control (MAC) security policies restricting what actions processes and daemons can perform beyond standard DAC file permissions',
      'They act as antivirus scanners for email attachments',
      'They manage Wi-Fi SSID passwords',
      'They speed up DNS query lookups',
    ],
    correctIndex: 0,
    explanation:
      'SELinux and AppArmor provide Mandatory Access Control (MAC), preventing compromised services from accessing unauthorized system files even if running as root.',
  },
  {
    id: 'linux-24',
    domain: 'Services & Automation',
    prompt:
      'What is the purpose of the `rsync` command compared to `cp`?',
    options: [
      '`rsync` efficiently transfers and synchronizes files locally or across network SSH by copying only delta byte differences, supporting resume and bandwidth throttling',
      '`cp` supports remote SSH delta transfers',
      '`rsync` only works on Windows servers',
      'There is no difference between cp and rsync',
    ],
    correctIndex: 0,
    explanation:
      '`rsync` uses delta-transfer algorithms to minimize network bandwidth when copying files across servers.',
  },
  {
    id: 'linux-25',
    domain: 'Security & Permissions',
    prompt:
      'How do you check the SHA-256 cryptographic checksum of a downloaded Linux ISO file to verify file integrity?',
    options: [
      '`sha256sum filename.iso` (and compare against official release hash)',
      '`md5sum`',
      '`cat filename.iso | grep sum`',
      '`verify-iso filename.iso`',
    ],
    correctIndex: 0,
    explanation:
      '`sha256sum` computes cryptographic hashes to verify downloads haven’t been tampered with.',
  },
  {
    id: 'linux-26',
    domain: 'Troubleshooting & Performance',
    prompt:
      'Which command displays virtual memory statistics, CPU utilization, swap activity, and I/O block blocks per second dynamically in real time?',
    options: [
      '`vmstat 2` (reports every 2 seconds)',
      '`passwd`',
      '`hostname`',
      '`uname -a`',
    ],
    correctIndex: 0,
    explanation:
      '`vmstat` reports information about processes, memory, paging, block IO, traps, and CPU activity.',
  },
  {
    id: 'linux-27',
    domain: 'System Architecture & Processes',
    prompt:
      'What is the purpose of the `/etc/passwd` and `/etc/shadow` files?',
    options: [
      '`/etc/passwd` lists user account details (UID, GID, shell) publicly readable; `/etc/shadow` stores encrypted password hashes readable only by root',
      '`/etc/passwd` stores plaintext passwords for all users',
      '`/etc/shadow` controls network firewall ports',
      'Both files are identical',
    ],
    correctIndex: 0,
    explanation:
      'Linux separates user account metadata (`/etc/passwd`) from secure encrypted password hashes (`/etc/shadow`).',
  },
  {
    id: 'linux-28',
    domain: 'Storage & File Management',
    prompt:
      'How do you extract a compressed tarball archive named `archive.tar.gz`?',
    options: [
      '`tar -xzvf archive.tar.gz`',
      '`tar -cvf archive.tar.gz`',
      '`unzip archive.tar.gz`',
      '`gzip -d archive.tar.gz`',
    ],
    correctIndex: 0,
    explanation:
      '`tar -xzvf`: `-x` extract, `-z` gzip filter, `-v` verbose, `-f` filename.',
  },
  {
    id: 'linux-29',
    domain: 'Networking & Security',
    prompt:
      'What is the purpose of `firewalld` or `UFW` (Uncomplicated Firewall)?',
    options: [
      'They provide user-friendly frontend interfaces to manage underlying nftables/iptables firewall rules and zones easily',
      'They act as web browsers for Linux',
      'They compile C++ source code',
      'They manage LVM partition resizes',
    ],
    correctIndex: 0,
    explanation:
      'UFW (Ubuntu) and firewalld (RHEL/CentOS) simplify firewall rule administration.',
  },
  {
    id: 'linux-30',
    domain: 'Services & Automation',
    prompt:
      'What is the purpose of Ansible when managing fleet Linux servers?',
    options: [
      'An agentless automation tool using SSH/YAML playbooks to configure servers, deploy apps, and enforce state across hundreds of nodes simultaneously',
      'A virus scanner for Linux kernels',
      'A graphical desktop environment',
      'A relational database engine',
    ],
    correctIndex: 0,
    explanation:
      'Ansible automates server configuration management agentlessly over SSH.',
  },
  {
    id: 'linux-31',
    domain: 'Security & Permissions',
    prompt:
      'What does permission mode `755` (`rwxr-xr-x`) mean on a script file?',
    options: [
      'Owner has read/write/execute (7); Group has read/execute (5); Others have read/execute (5)',
      'Everyone has full delete access',
      'No one can execute the file',
      'Only root can read the file',
    ],
    correctIndex: 0,
    explanation:
      'Octal permissions: 4=read, 2=write, 1=execute. 7=rwx, 5=r-x.',
  },
  {
    id: 'linux-32',
    domain: 'Troubleshooting & Performance',
    prompt:
      'How do you check current disk I/O throughput and IOPS utilization across block storage devices in Linux?',
    options: [
      '`iostat -xz 2` (from `sysstat` package)',
      '`top`',
      '`free -h`',
      '`netstat -i`',
    ],
    correctIndex: 0,
    explanation:
      '`iostat` reports CPU statistics and input/output statistics for devices and partitions.',
  },
  {
    id: 'linux-33',
    domain: 'System Architecture & Processes',
    prompt:
      'What is a Linux kernel module (`.ko`), and how do you load or unload modules?',
    options: [
      'Object code loaded into kernel space on demand (drivers, filesystems); loaded via `modprobe` / `insmod` and unloaded via `rmmod`',
      'A user-space Python script',
      'An encrypted password hash',
      'A systemd service unit file',
    ],
    correctIndex: 0,
    explanation:
      'Kernel modules extend kernel capabilities dynamically without recompiling the entire kernel.',
  },
  {
    id: 'linux-34',
    domain: 'Storage & File Management',
    prompt:
      'What does the `tar -cvf backup.tar /var/log` command do?',
    options: [
      'Creates (`-c`) a verbose (`-v`) uncompressed tar archive file named `backup.tar` containing `/var/log` directory contents',
      'Extracts `backup.tar` into `/var/log`',
      'Deletes log files permanently',
      'Encrypts logs with AES-256',
    ],
    correctIndex: 0,
    explanation:
      '`tar -cvf` archives files into a single uncompressed tarball.',
  },
  {
    id: 'linux-35',
    domain: 'Networking & Security',
    prompt:
      'What is the difference between TCP and UDP networking protocols in Linux?',
    options: [
      'TCP is connection-oriented with guaranteed reliable ordered delivery and flow control; UDP is connectionless best-effort datagram delivery with zero handshake overhead',
      'UDP guarantees delivery while TCP drops packets',
      'TCP only works on local loopback interface',
      'UDP requires SSH authentication',
    ],
    correctIndex: 0,
    explanation:
      'TCP ensures reliability and sequencing; UDP provides fast connectionless datagram delivery.',
  },
  {
    id: 'linux-36',
    domain: 'Services & Automation',
    prompt:
      'What is the purpose of the `tmux` or `screen` terminal multiplexer utility?',
    options: [
      'It allows running persistent terminal sessions inside detached virtual windows that survive SSH disconnections and network drops',
      'It compiles C++ code into binary executables',
      'It monitors disk I/O throughput',
      'It generates SSL certificates',
    ],
    correctIndex: 0,
    explanation:
      'Multiplexers like `tmux` keep long-running admin tasks alive even if SSH drops.',
  },
  {
    id: 'linux-37',
    domain: 'Security & Permissions',
    prompt:
      'What is the function of File Access Control Lists (ACLs) in Linux?',
    options: [
      'They extend standard owner/group/other POSIX permissions to grant specific permissions to individual users or groups beyond the primary owner/group',
      'They manage firewall network port rules',
      'They store kernel panic crash dumps',
      'They configure system time zones',
    ],
    correctIndex: 0,
    explanation:
      'ACLs (`getfacl`, `setfacl`) provide finer-grained discretionary access control than standard 3-class POSIX bits.',
  },
  {
    id: 'linux-38',
    domain: 'Troubleshooting & Performance',
    prompt:
      'How do you check available system memory and swap usage in human-readable format?',
    options: [
      '`free -h`',
      '`df -h`',
      '`top -m`',
      '`uptime`',
    ],
    correctIndex: 0,
    explanation:
      '`free -h` displays total, used, and free RAM and swap in human-readable units (MB/GB).',
  },
  {
    id: 'linux-39',
    domain: 'System Architecture & Processes',
    prompt:
      'What is the root user UID in Linux systems?',
    options: [
      'UID 0',
      'UID 1000',
      'UID 999',
      'UID 65535',
    ],
    correctIndex: 0,
    explanation:
      'The superuser (root) always holds User ID 0 in Unix and Linux operating systems.',
  },
  {
    id: 'linux-40',
    domain: 'Storage & File Management',
    prompt:
      'What command creates a new ext4 filesystem on partition `/dev/sdb1`?',
    options: [
      '`mkfs.ext4 /dev/sdb1`',
      '`fdisk /dev/sdb1`',
      '`mount /dev/sdb1`',
      '`fsck /dev/sdb1`',
    ],
    correctIndex: 0,
    explanation:
      '`mkfs.ext4` builds an ext4 filesystem structure on a storage partition.',
  },
  {
    id: 'linux-41',
    domain: 'Networking & Security',
    prompt:
      'What does `dig google.com` or `nslookup google.com` accomplish?',
    options: [
      'It queries DNS nameservers to resolve domain names into IP addresses and inspect DNS records',
      'It pings the server via ICMP echo',
      'It traces network router hops',
      'It tests HTTP web server status',
    ],
    correctIndex: 0,
    explanation:
      '`dig` and `nslookup` are standard DNS diagnostic lookup tools.',
  },
  {
    id: 'linux-42',
    domain: 'Services & Automation',
    prompt:
      'What is a shell script shebang line (`#!/bin/bash`)?',
    options: [
      'The first line of an executable script specifying the interpreter binary (`/bin/bash`) used to execute the script commands',
      'A comment marking script copyright',
      'A command to reboot the kernel',
      'An encryption key header',
    ],
    correctIndex: 0,
    explanation:
      'The shebang (`#!`) tells the OS kernel which interpreter program to run the script text with.',
  },
  {
    id: 'linux-43',
    domain: 'Security & Permissions',
    prompt:
      'How do you generate an SSH public/private key pair (`rsa` or `ed25519`) for secure authentication?',
    options: [
      '`ssh-keygen -t ed25519 -b 4096` (or `rsa`)',
      '`ssh-keyscan`',
      '`passwd -g`',
      '`openssl passwd`',
    ],
    correctIndex: 0,
    explanation:
      '`ssh-keygen` creates cryptographic key pairs used for passwordless SSH authentication.',
  },
  {
    id: 'linux-44',
    domain: 'Troubleshooting & Performance',
    prompt:
      'What does `journalctl -p err -b` display?',
    options: [
      'All system log messages with priority level `err` (Error) or higher from the current boot (`-b`)',
      'All successful login audit records from 1999',
      'Network packet captures on eth0',
      'Kernel source code files',
    ],
    correctIndex: 0,
    explanation:
      '`journalctl -p err -b` filters systemd journal logs to show errors and critical issues occurring since system boot.',
  },
  {
    id: 'linux-45',
    domain: 'System Architecture & Processes',
    prompt:
      'What is the purpose of the `uname -r` command?',
    options: [
      'It prints the currently running Linux kernel release version',
      'It displays CPU architecture model name',
      'It shows system uptime in days',
      'It lists mounted disk partitions',
    ],
    correctIndex: 0,
    explanation:
      '`uname -r` outputs the active Linux kernel release string (e.g., `5.15.0-88-generic`).',
  },
];
