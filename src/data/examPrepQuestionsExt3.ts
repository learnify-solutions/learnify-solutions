import { PracticeQuestion } from '../types';

export const AZURE_AZ_900_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'az900-16',
    domain: 'Describe cloud concepts',
    prompt:
      'An e-commerce application experiences 10x traffic spikes during holiday sales and drops back to baseline immediately afterward. Which cloud characteristic allows Azure to automatically add and remove compute capacity to match demand?',
    options: [
      'Geo-redundancy',
      'Elasticity',
      'Predictability',
      'Sovereignty',
    ],
    correctIndex: 1,
    explanation:
      'Elasticity is the ability to dynamically scale compute and memory resources up/out during demand spikes and scale back down/in automatically to minimize cost.',
  },
  {
    id: 'az900-17',
    domain: 'Describe cloud concepts',
    prompt:
      'A European bank keeps sensitive core ledger databases in its own on-premises datacenter for strict physical control while bursting customer-facing web workloads into Microsoft Azure. Which cloud deployment model is this?',
    options: [
      'Public cloud',
      'Multi-cloud',
      'Hybrid cloud',
      'Community cloud',
    ],
    correctIndex: 2,
    explanation:
      'A hybrid cloud combines an organization’s private on-premises datacenter with public cloud services, allowing workloads and data to operate across both environments.',
  },
  {
    id: 'az900-18',
    domain: 'Describe cloud concepts',
    prompt:
      'A team deploys a managed PostgreSQL database on Azure instead of installing PostgreSQL manually on a virtual machine. Which responsibility shifts from the customer to Microsoft under PaaS?',
    options: [
      'Configuring table schemas and user permissions',
      'Patching the underlying operating system and database engine',
      'Classifying sensitive PII stored in tables',
      'Managing application-level SQL queries',
    ],
    correctIndex: 1,
    explanation:
      'Under Platform as a Service (PaaS), Microsoft manages the physical hardware, virtualization layer, operating system patching, and runtime updates, while customers manage their data and access configuration.',
  },
  {
    id: 'az900-19',
    domain: 'Describe cloud concepts',
    prompt:
      'Which Azure cloud computing model provides the highest level of administrative control over the operating system while still eliminating hardware maintenance?',
    options: [
      'Software as a Service (SaaS)',
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Serverless Functions',
    ],
    correctIndex: 1,
    explanation:
      'IaaS (e.g., Azure Virtual Machines) grants customers full control over the guest OS, installed middleware, and runtime configuration while Microsoft maintains the physical datacenter.',
  },
  {
    id: 'az900-20',
    domain: 'Describe cloud concepts',
    prompt:
      'An application depends on two independent Azure services: Service A carries a 99.9% SLA and Service B carries a 99.95% SLA. If both services must be available simultaneously for the app to function, what happens to the composite SLA?',
    options: [
      'It equals the higher SLA (99.95%)',
      'It increases above 99.95% through redundancy',
      'It equals the product of both SLAs (approx. 99.85%), lower than either individual SLA',
      'It equals the average of the two SLAs (99.925%)',
    ],
    correctIndex: 2,
    explanation:
      'Composite SLAs for dependent serial components multiply together (0.999 × 0.9995 = 0.9985005, or ~99.85%), meaning each serial dependency lowers overall reliability.',
  },
  {
    id: 'az900-21',
    domain: 'Describe cloud concepts',
    prompt:
      'What is the key architectural difference between vertical scaling (scaling up) and horizontal scaling (scaling out) in Azure?',
    options: [
      'Vertical scaling adds more VM instances behind a load balancer; horizontal scaling increases RAM and vCPU on a single VM',
      'Vertical scaling increases CPU/RAM on an existing instance; horizontal scaling adds more identical instances',
      'Vertical scaling only applies to serverless containers',
      'Horizontal scaling requires switching from PaaS to IaaS',
    ],
    correctIndex: 1,
    explanation:
      'Scaling up (vertical) upgrades the size/capacity of one resource (e.g., D2s to D8s VM), whereas scaling out (horizontal) adds more parallel instances to distribute load.',
  },
  {
    id: 'az900-22',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A company needs to run stateless HTTP microservices in containers without provisioning, patching, or managing any underlying Kubernetes control plane or VMs. Which Azure service fits best?',
    options: [
      'Azure Container Instances (ACI)',
      'Azure Dedicated Host',
      'Azure Virtual Machine Scale Sets',
      'Azure Stack Hub',
    ],
    correctIndex: 0,
    explanation:
      'Azure Container Instances (ACI) offers serverless container execution in seconds with zero VM management, billed per second of vCPU and memory consumption.',
  },
  {
    id: 'az900-23',
    domain: 'Describe Azure architecture and services',
    prompt:
      'Why does Microsoft organize most Azure regions into regional pairs separated by at least 300 miles within the same geography?',
    options: [
      'To reduce egress charges between different continents',
      'To ensure planned OS/platform updates roll out sequentially and enable data residency compliance during disasters',
      'To allow a single VNet subnet to span both regions natively without gateways',
      'To eliminate the need for Availability Zones inside each region',
    ],
    correctIndex: 1,
    explanation:
      'Azure region pairs provide sequential maintenance isolation (only one region in a pair is updated at a time) and geographically isolated failover within the same data residency boundary.',
  },
  {
    id: 'az900-24',
    domain: 'Describe Azure architecture and services',
    prompt:
      'An organization wants a managed cluster platform to orchestrate hundreds of Docker containers with automated self-healing, rolling deployments, and Helm chart support. Which Azure service should it choose?',
    options: [
      'Azure Logic Apps',
      'Azure Kubernetes Service (AKS)',
      'Azure Event Grid',
      'Azure App Configuration',
    ],
    correctIndex: 1,
    explanation:
      'Azure Kubernetes Service (AKS) provides a managed Kubernetes control plane for container orchestration, autoscaling, rolling updates, and workload scheduling.',
  },
  {
    id: 'az900-25',
    domain: 'Describe Azure architecture and services',
    prompt:
      'Which Azure compute offering lets developers deploy ASP.NET, Node.js, or Python web apps directly from Git with built-in deployment slots, TLS certificates, and autoscale without managing servers?',
    options: [
      'Azure App Service',
      'Azure Batch',
      'Azure Virtual Desktop',
      'Azure Service Fabric',
    ],
    correctIndex: 0,
    explanation:
      'Azure App Service is a fully managed PaaS platform for hosting web apps, REST APIs, and mobile backends with staging slots and CI/CD integration.',
  },
  {
    id: 'az900-26',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A Windows desktop application needs to be published remotely to 400 seasonal contractors with centralized profile management via FSLogix, without buying corporate laptops. Which Azure service delivers this?',
    options: [
      'Azure Virtual Desktop (AVD)',
      'Azure Bastion',
      'Azure Container Apps',
      'Azure Automation',
    ],
    correctIndex: 0,
    explanation:
      'Azure Virtual Desktop is a cloud VDI service providing multi-session Windows 11/10 desktops and RemoteApp streaming securely from any browser or client.',
  },
  {
    id: 'az900-27',
    domain: 'Describe Azure architecture and services',
    prompt:
      'Two Azure Virtual Networks (VNet-Hub and VNet-Spoke) in the same region need low-latency, private backbone communication using RFC 1918 IPs without transiting the public internet or deploying VPN gateways. What should you configure?',
    options: [
      'Azure Front Door',
      'VNet Peering',
      'Azure Content Delivery Network (CDN)',
      'Network Watcher Connection Monitor',
    ],
    correctIndex: 1,
    explanation:
      'Virtual Network Peering directly connects two VNets over Microsoft’s private fiber backbone with low latency and high bandwidth.',
  },
  {
    id: 'az900-28',
    domain: 'Describe Azure architecture and services',
    prompt:
      'How does an Azure Network Security Group (NSG) filter traffic inside an Azure Virtual Network?',
    options: [
      'By inspecting Layer-7 HTTP SQL injection payloads',
      'By evaluating prioritized 5-tuple (source/destination IP, port, protocol) stateful allow/deny rules on subnets or NICs',
      'By encrypting traffic between regions using IPsec tunnels',
      'By translating private IPs into public DNS records',
    ],
    correctIndex: 1,
    explanation:
      'NSGs act as stateful Layer 3/Layer 4 filters using priority-ordered inbound and outbound security rules applied to subnets or VM network interfaces.',
  },
  {
    id: 'az900-29',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A financial application requires durable SMB 3.0 shared file mounts accessible simultaneously by multiple Linux and Windows Azure VMs across an internal corporate network. Which Azure Storage service should be used?',
    options: [
      'Azure Queue Storage',
      'Azure Files',
      'Azure Table Storage',
      'Azure Page Blobs',
    ],
    correctIndex: 1,
    explanation:
      'Azure Files delivers fully managed cloud file shares accessible via SMB and NFS protocols that multiple VMs and on-premises servers can mount concurrently.',
  },
  {
    id: 'az900-30',
    domain: 'Describe Azure architecture and services',
    prompt:
      'Which Azure Storage redundancy option replicates data synchronously across three physically separate Availability Zones within the primary region AND asynchronously to a secondary paired region?',
    options: [
      'Locally Redundant Storage (LRS)',
      'Zone-Redundant Storage (ZRS)',
      'Geo-Zone-Redundant Storage (GZRS)',
      'Read-Access Locally Redundant Storage (RA-LRS)',
    ],
    correctIndex: 2,
    explanation:
      'GZRS combines ZRS (3 Availability Zones in the primary region) with asynchronous replication to the paired secondary region for maximum durability (16 nines).',
  },
  {
    id: 'az900-31',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A globally distributed gaming leaderboard needs single-digit millisecond reads and writes across North America, Europe, and Asia with multi-region write capability and NoSQL document APIs. Which database fits?',
    options: [
      'Azure SQL Database Single Instance',
      'Azure Cosmos DB',
      'Azure Database for MySQL',
      'Azure Synapse Analytics',
    ],
    correctIndex: 1,
    explanation:
      'Azure Cosmos DB is Microsoft’s globally distributed, multi-model NoSQL database offering turnkey multi-region writes and SLA-backed <10 ms latency.',
  },
  {
    id: 'az900-32',
    domain: 'Describe Azure architecture and services',
    prompt:
      'A company needs to migrate thousands of terabytes of archival video footage from an isolated datacenter with slow 50 Mbps internet to Azure Blob Storage. Which offline physical transport device family solves this?',
    options: [
      'Azure Data Box',
      'Azure File Sync',
      'Azure ExpressRoute Direct',
      'AzCopy over HTTPS',
    ],
    correctIndex: 0,
    explanation:
      'Azure Data Box provides ruggedized, encrypted physical storage appliances shipped between customer datacenters and Azure datacenters for offline petabyte transfers.',
  },
  {
    id: 'az900-33',
    domain: 'Describe Azure architecture and services',
    prompt:
      'Which Azure service provides a visual drag-and-drop workflow designer with over 400 SaaS connectors (such as Outlook, Salesforce, and Teams) to automate business processes with little or no code?',
    options: [
      'Azure Logic Apps',
      'Azure Resource Graph',
      'Azure Load Balancer',
      'Azure Key Vault',
    ],
    correctIndex: 0,
    explanation:
      'Azure Logic Apps enables low-code integration workflows connecting cloud apps, B2B systems, and on-premises APIs via managed connectors.',
  },
  {
    id: 'az900-34',
    domain: 'Describe Azure architecture and services',
    prompt:
      'What happens when you move an Azure resource between two different Resource Groups, or delete a Resource Group itself?',
    options: [
      'Deleting a Resource Group deletes every resource contained inside that Resource Group',
      'Resources cannot be placed in a different region than their parent Resource Group',
      'Each resource can belong to multiple Resource Groups simultaneously',
      'Deleting a Resource Group preserves all VMs inside it as orphan objects',
    ],
    correctIndex: 0,
    explanation:
      'A Resource Group acts as a lifecycle container—deleting it deletes all resources within it. Resources inside one group can reside in different Azure regions.',
  },
  {
    id: 'az900-35',
    domain: 'Describe Azure management and governance',
    prompt:
      'Which Microsoft Entra ID feature enables users to sign in once with their corporate credentials and seamlessly access thousands of integrated cloud SaaS applications without re-entering passwords?',
    options: [
      'Just-In-Time VM Access',
      'Single Sign-On (SSO)',
      'Azure DDoS Protection',
      'Network Security Perimeters',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Entra Single Sign-On (SSO) uses federated protocols (SAML 2.0, OIDC, OAuth 2.0) so users authenticate once to access all authorized SaaS and custom apps.',
  },
  {
    id: 'az900-36',
    domain: 'Describe Azure management and governance',
    prompt:
      'An operations lead needs to assign an engineer the built-in "Contributor" role ONLY for a specific application Resource Group, without granting access to billing or other subscriptions. Which mechanism enforces this?',
    options: [
      'Azure Role-Based Access Control (RBAC)',
      'Azure Application Gateway WAF',
      'Azure Traffic Manager',
      'Private Link Endpoints',
    ],
    correctIndex: 0,
    explanation:
      'Azure RBAC allows fine-grained authorization scoped to Management Groups, Subscriptions, Resource Groups, or individual resources.',
  },
  {
    id: 'az900-37',
    domain: 'Describe Azure management and governance',
    prompt:
      'Which Zero Trust guiding principle requires always validating user identity, device health, location, and workload risk regardless of whether the request originates inside the corporate office network?',
    options: [
      'Trust the internal LAN implicitly',
      'Verify explicitly',
      'Rely exclusively on perimeter firewalls',
      'Grant permanent Owner roles to reduce tickets',
    ],
    correctIndex: 1,
    explanation:
      'Zero Trust stands on three core principles: Verify explicitly, Use least privilege access, and Assume breach.',
  },
  {
    id: 'az900-38',
    domain: 'Describe Azure management and governance',
    prompt:
      'A DevOps team commits to running predictable Linux workloads in West Europe continuously for 3 years. Which Azure purchasing option delivers up to ~72% discount compared to Pay-As-You-Go?',
    options: [
      'Azure Spot Virtual Machines only',
      'Azure Reserved Virtual Machine Instances (1-year or 3-year reservations)',
      'Azure Dev/Test Free Credits',
      'Pay-As-You-Go with Autoscaling disabled',
    ],
    correctIndex: 1,
    explanation:
      'Azure Reservations (1-year or 3-year commitments) substantially lower compute costs versus Pay-As-You-Go and can combine with Azure Hybrid Benefit.',
  },
  {
    id: 'az900-39',
    domain: 'Describe Azure management and governance',
    prompt:
      'A company already owns active Windows Server and SQL Server licenses with Software Assurance on-premises. Which program allows applying those existing licenses to reduce Azure VM and Azure SQL compute bills?',
    options: [
      'Azure Reservations Exchange',
      'Azure Hybrid Benefit',
      'Azure Savings Plan for Compute',
      'Microsoft Customer Agreement Credits',
    ],
    correctIndex: 1,
    explanation:
      'Azure Hybrid Benefit lets eligible Software Assurance or subscription license holders transfer on-premises Windows Server/SQL Server licenses to Azure at significantly reduced rates.',
  },
  {
    id: 'az900-40',
    domain: 'Describe Azure management and governance',
    prompt:
      'Which tool in Microsoft Cost Management notifies finance managers via email or triggers an automated webhook runbook when monthly Azure spending reaches 80% of a forecast threshold?',
    options: [
      'Azure Budgets and Cost Alerts',
      'Azure Pricing Calculator',
      'Azure TCO Calculator',
      'Azure Advisor Security Score',
    ],
    correctIndex: 0,
    explanation:
      'Azure Budgets track actual and forecasted cloud spending against limits and fire action groups or email alerts at configurable percentage thresholds.',
  },
  {
    id: 'az900-41',
    domain: 'Describe Azure management and governance',
    prompt:
      'An administrator wants a centralized view showing why an Azure VM in East US became unreachable, including personalized impact notices for Microsoft platform incidents and planned maintenance windows. Which tool should they check?',
    options: [
      'Azure Service Health',
      'Azure Pricing Calculator',
      'Microsoft Purview Compliance Portal',
      'Azure App Insights Profiler',
    ],
    correctIndex: 0,
    explanation:
      'Azure Service Health provides personalized alerts, RCA reports, and notifications for service issues and planned maintenance affecting your specific subscriptions and regions.',
  },
  {
    id: 'az900-42',
    domain: 'Describe Azure management and governance',
    prompt:
      'Which monitoring solution collects host metrics, activity logs, application telemetry (Application Insights), and Log Analytics KQL queries across both Azure and on-premises workloads?',
    options: [
      'Azure Monitor',
      'Azure Policy',
      'Azure Bastion',
      'Azure Migrate',
    ],
    correctIndex: 0,
    explanation:
      'Azure Monitor is the unified observability platform encompassing Metrics, Logs (KQL via Log Analytics), Application Insights, VM Insights, and Alert Rules.',
  },
  {
    id: 'az900-43',
    domain: 'Describe Azure management and governance',
    prompt:
      'What is the purpose of Azure Bicep compared to standard JSON ARM Templates?',
    options: [
      'Bicep is a concise domain-specific language (DSL) that transpiles cleanly into ARM JSON for Infrastructure-as-Code deployments',
      'Bicep replaces Azure Active Directory authentication',
      'Bicep runs inside Kubernetes pods as a monitoring agent',
      'Bicep exclusively manages AWS and GCP accounts without Azure support',
    ],
    correctIndex: 0,
    explanation:
      'Azure Bicep offers cleaner, modular IaC syntax with strong type checking and automatic dependency detection, compiling directly into ARM templates on deployment.',
  },
  {
    id: 'az900-44',
    domain: 'Describe Azure management and governance',
    prompt:
      'A retail chain runs legacy Linux servers across 50 stores plus AWS EKS clusters, and wants to apply unified Azure Policy governance, RBAC, and Defender monitoring from one Azure control plane. Which service bridges non-Azure servers?',
    options: [
      'Azure Arc',
      'Azure ExpressRoute',
      'Azure Front Door',
      'Azure Availability Sets',
    ],
    correctIndex: 0,
    explanation:
      'Azure Arc projects on-premises servers, edge Kubernetes clusters, and multi-cloud infrastructure into Azure Resource Manager for unified governance and policy enforcement.',
  },
  {
    id: 'az900-45',
    domain: 'Describe Azure management and governance',
    prompt:
      'Where can engineers run authenticated Bash (Azure CLI) or PowerShell commands directly inside the Azure Portal browser without installing SDKs locally?',
    options: [
      'Azure Cloud Shell',
      'Azure Resource Explorer',
      'Azure Serial Console only',
      'Azure Service Bus Explorer',
    ],
    correctIndex: 0,
    explanation:
      'Azure Cloud Shell provides an interactive, pre-authenticated browser-based shell supporting both Bash (Azure CLI) and PowerShell backed by persistent Azure Files storage.',
  },
];

export const AWS_CLF_C02_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'clf-16',
    domain: 'Cloud Concepts',
    prompt:
      'A streaming company wants to cache static media assets physically close to end users across 400+ global cities while offloading origin S3 traffic. Which AWS global infrastructure component serves these cached assets?',
    options: [
      'AWS Availability Zones',
      'AWS Edge Locations',
      'AWS Direct Connect Routers',
      'AWS Transit Gateways',
    ],
    correctIndex: 1,
    explanation:
      'AWS Edge Locations host Amazon CloudFront points of presence and Route 53 DNS caching close to users worldwide to minimize latency.',
  },
  {
    id: 'clf-17',
    domain: 'Cloud Concepts',
    prompt:
      'A hospital needs ultra-low latency compute inside its own building for MRI image processing before uploading summaries to an AWS Region, managed with native AWS APIs. Which offering provides AWS hardware on customer premises?',
    options: [
      'AWS Outposts',
      'AWS Local Zones only',
      'Amazon Lightsail',
      'AWS Fargate',
    ],
    correctIndex: 0,
    explanation:
      'AWS Outposts delivers fully managed AWS-designed racks physically installed on-premises for true hybrid low-latency and local data processing workloads.',
  },
  {
    id: 'clf-18',
    domain: 'Cloud Concepts',
    prompt:
      'What does the "Trade Fixed Expense for Variable Expense" advantage of AWS Cloud Economics specifically mean?',
    options: [
      'Eliminating all engineering salaries upon cloud migration',
      'Paying only for consumed IT resources rather than investing heavily upfront in physical datacenters before knowing demand',
      'Locking into mandatory 10-year hardware lease contracts',
      'Moving operating expenses entirely into capital depreciation',
    ],
    correctIndex: 1,
    explanation:
      'Cloud shifts IT spending from large upfront capital investments (CapEx) for peak capacity to pay-as-you-go variable operational spending (OpEx) based on actual usage.',
  },
  {
    id: 'clf-19',
    domain: 'Cloud Concepts',
    prompt:
      'Which AWS Well-Architected Framework pillar focuses on running workloads as code, performing frequent small reversible changes, and refining operational runbooks through game days?',
    options: [
      'Operational Excellence',
      'Sustainability',
      'Performance Efficiency',
      'Reliability',
    ],
    correctIndex: 0,
    explanation:
      'The Operational Excellence pillar emphasizes operations-as-code, automated CI/CD, small reversible updates, observability, and continuous learning from failures.',
  },
  {
    id: 'clf-20',
    domain: 'Cloud Concepts',
    prompt:
      'Under the AWS Well-Architected Framework, selecting ARM-based AWS Graviton processors to reduce energy consumption per workload unit directly aligns with which pillar?',
    options: [
      'Security',
      'Sustainability',
      'Operational Excellence',
      'Identity Federation',
    ],
    correctIndex: 1,
    explanation:
      'The Sustainability pillar encourages maximizing utilization, using efficient hardware like AWS Graviton, and right-sizing resources to minimize environmental impact.',
  },
  {
    id: 'clf-21',
    domain: 'Cloud Concepts',
    prompt:
      'Under the AWS Cloud Adoption Framework (CAF), which perspective focuses on aligning cloud investments with business value, portfolio management, and IT financial governance?',
    options: [
      'Business Perspective',
      'Platform Perspective',
      'Security Perspective',
      'Operations Perspective',
    ],
    correctIndex: 0,
    explanation:
      'The AWS CAF Business Perspective ensures IT cloud strategy accelerates strategic business outcomes, ROI measurement, and product management.',
  },
  {
    id: 'clf-22',
    domain: 'Security and Compliance',
    prompt:
      'When configuring a newly created AWS account, which three immediate security actions follow AWS best practices for the Root User?',
    options: [
      'Share the root password across the SRE team for redundancy',
      'Enable MFA on the root user, delete or avoid creating root access keys, and create an IAM admin user/Identity Center role for daily work',
      'Disable CloudTrail logging on root actions to save S3 space',
      'Store root access keys inside a public GitHub repository',
    ],
    correctIndex: 1,
    explanation:
      'AWS best practice is to secure the root user with MFA, never use root access keys, and delegate administrative tasks via AWS IAM Identity Center or scoped IAM roles.',
  },
  {
    id: 'clf-23',
    domain: 'Security and Compliance',
    prompt:
      'An EC2 instance needs permission to read objects from an Amazon S3 bucket without hardcoding static access keys inside application configuration files. What should you attach to the EC2 instance?',
    options: [
      'An IAM User password',
      'An IAM Role (Instance Profile) with least-privilege S3 permissions',
      'An AWS Organizations SCP',
      'A Security Group inbound rule on port 443',
    ],
    correctIndex: 1,
    explanation:
      'IAM Roles provide temporary, automatically rotated credentials via the EC2 metadata service, avoiding long-lived static credentials on compute instances.',
  },
  {
    id: 'clf-24',
    domain: 'Security and Compliance',
    prompt:
      'Which AWS service automatically discovers and classifies sensitive PII, financial data, and AWS credentials stored inside Amazon S3 buckets using machine learning?',
    options: [
      'Amazon Macie',
      'Amazon Inspector',
      'AWS Config',
      'AWS Shield Standard',
    ],
    correctIndex: 0,
    explanation:
      'Amazon Macie inspects S3 buckets to detect sensitive data (SSN, credit cards, API keys) and monitors bucket policy exposure risks.',
  },
  {
    id: 'clf-25',
    domain: 'Security and Compliance',
    prompt:
      'A security team wants automated, continuous vulnerability scanning of EC2 instances (OS packages) and ECR container images for known CVEs. Which AWS service performs this?',
    options: [
      'Amazon Inspector',
      'AWS CloudTrail',
      'Amazon Cognito',
      'AWS Secrets Manager',
    ],
    correctIndex: 0,
    explanation:
      'Amazon Inspector continuously scans EC2 instances, Lambda functions, and ECR container repositories for software vulnerabilities and unintended network reachability.',
  },
  {
    id: 'clf-26',
    domain: 'Security and Compliance',
    prompt:
      'Who deleted an S3 bucket at 02:14 UTC yesterday? Which AWS service records every IAM API call across Management Console, CLI, and SDKs for auditing?',
    options: [
      'AWS CloudTrail',
      'Amazon CloudWatch Metrics',
      'AWS Trusted Advisor',
      'Amazon GuardDuty only',
    ],
    correctIndex: 0,
    explanation:
      'AWS CloudTrail logs governance, compliance, and operational API call histories (who, what, when, source IP) across your AWS account.',
  },
  {
    id: 'clf-27',
    domain: 'Security and Compliance',
    prompt:
      'Which AWS service stores database passwords and third-party API tokens with built-in automatic credential rotation schedules for Amazon RDS?',
    options: [
      'AWS Secrets Manager',
      'AWS KMS Asymmetric Keys only',
      'AWS Certificate Manager (ACM)',
      'Amazon Cognito User Pools',
    ],
    correctIndex: 0,
    explanation:
      'AWS Secrets Manager securely encrypts secrets and natively rotates RDS, Redshift, and DocumentDB database credentials on configurable schedules.',
  },
  {
    id: 'clf-28',
    domain: 'Security and Compliance',
    prompt:
      'An enterprise manages 40 AWS accounts under AWS Organizations and wants to strictly block ANY member account—including account admins—from disabling CloudTrail or launching GPUs. What enforces this organization-wide guardrail?',
    options: [
      'Service Control Policies (SCPs)',
      'VPC Network ACLs',
      'IAM Groups',
      'S3 Bucket Lifecycle Rules',
    ],
    correctIndex: 0,
    explanation:
      'Service Control Policies (SCPs) in AWS Organizations set the maximum permission boundaries across member accounts and OUs, restricting even local Admins.',
  },
  {
    id: 'clf-29',
    domain: 'Security and Compliance',
    prompt:
      'Which AWS service provides automated provisioning, renewal, and deployment of free public SSL/TLS certificates for CloudFront distributions and Application Load Balancers?',
    options: [
      'AWS Certificate Manager (ACM)',
      'AWS IAM Identity Center',
      'AWS Security Hub',
      'Amazon Detective',
    ],
    correctIndex: 0,
    explanation:
      'AWS Certificate Manager (ACM) issues, renews, and attaches public TLS/SSL certificates to integrated AWS edge services at zero extra cost for public certs.',
  },
  {
    id: 'clf-30',
    domain: 'Cloud Technology and Services',
    prompt:
      'A company wants to store compliance audit logs in Amazon S3 for 7 years. Logs are rarely accessed, yet if an auditor requests a file, retrieval can safely wait 12 hours to minimize monthly storage cost. Which S3 class is lowest cost?',
    options: [
      'S3 Standard',
      'S3 Standard-Infrequent Access (S3 Standard-IA)',
      'S3 Glacier Deep Archive',
      'S3 Express One Zone',
    ],
    correctIndex: 2,
    explanation:
      'S3 Glacier Deep Archive is Amazon S3’s lowest-cost storage class designed for long-term retention (7–10+ years) with retrieval in 12–48 hours.',
  },
  {
    id: 'clf-31',
    domain: 'Cloud Technology and Services',
    prompt:
      'Data access patterns for an analytics lake are unpredictable—some objects are hot for weeks then cold for months. Which S3 storage class automatically optimizes costs across access tiers with no retrieval fees?',
    options: [
      'S3 Intelligent-Tiering',
      'S3 Glacier Flexible Retrieval',
      'S3 Reduced Redundancy',
      'Amazon EBS gp3',
    ],
    correctIndex: 0,
    explanation:
      'S3 Intelligent-Tiering monitors object access patterns and automatically moves objects between Frequent, Infrequent, and Archive Instant Access tiers without operational overhead.',
  },
  {
    id: 'clf-32',
    domain: 'Cloud Technology and Services',
    prompt:
      'How do Amazon EBS and Amazon EFS differ when attaching storage to Amazon EC2 instances?',
    options: [
      'EBS provides block storage attached to EC2 within a single Availability Zone; EFS provides a managed elastic NFS file system mountable concurrently across multiple AZs',
      'EBS is object storage accessed only via HTTP; EFS is block storage for boot drives',
      'EFS works exclusively on Windows Server via SMB',
      'EBS replicates automatically across all AWS Regions globally by default',
    ],
    correctIndex: 0,
    explanation:
      'Amazon EBS supplies high-performance AZ-scoped block volumes (e.g., OS boot disks/DBs), while Amazon EFS provides serverless shared POSIX/NFS file storage across multiple AZs.',
  },
  {
    id: 'clf-33',
    domain: 'Cloud Technology and Services',
    prompt:
      'A startup wants to run containerized microservices on AWS Elastic Container Service (ECS) WITHOUT provisioning, scaling, or patching EC2 worker nodes. Which launch type should they select?',
    options: [
      'AWS Fargate',
      'Amazon EC2 Dedicated Hosts',
      'AWS Batch Bare Metal',
      'Amazon Lightsail VPS',
    ],
    correctIndex: 0,
    explanation:
      'AWS Fargate is a serverless compute engine for ECS and EKS that eliminates EC2 host management and bills strictly per task vCPU and memory.',
  },
  {
    id: 'clf-34',
    domain: 'Cloud Technology and Services',
    prompt:
      'Developers upload Python Flask code and want AWS to automatically provision load balancing, auto-scaling, health monitoring, and deployment environments while still letting them SSH into underlying EC2 instances if needed. Which PaaS tool fits?',
    options: [
      'AWS Elastic Beanstalk',
      'AWS Lambda',
      'Amazon S3 Static Hosting',
      'AWS CodeArtifact',
    ],
    correctIndex: 0,
    explanation:
      'AWS Elastic Beanstalk orchestrates EC2, ALBs, Auto Scaling Groups, and health checks automatically for deployed code while retaining full access to underlying AWS resources.',
  },
  {
    id: 'clf-35',
    domain: 'Cloud Technology and Services',
    prompt:
      'A company needs a high-throughput petabyte-scale cloud data warehouse optimized for complex BI OLAP aggregations across historical sales tables. Which AWS database fits?',
    options: [
      'Amazon Redshift',
      'Amazon ElastiCache for Redis',
      'Amazon RDS for PostgreSQL',
      'Amazon Quantum Ledger Database',
    ],
    correctIndex: 0,
    explanation:
      'Amazon Redshift is AWS’s managed columnar data warehouse engineered for large-scale OLAP analytics and BI reporting.',
  },
  {
    id: 'clf-36',
    domain: 'Cloud Technology and Services',
    prompt:
      'A microservices system must decouple order intake from payment fulfillment so spikes never overwhelm downstream workers, guaranteeing each order message is processed independently by a single worker. Which messaging service is ideal?',
    options: [
      'Amazon Simple Queue Service (SQS)',
      'Amazon Route 53',
      'AWS Step Functions only',
      'Amazon EventBridge Scheduler',
    ],
    correctIndex: 0,
    explanation:
      'Amazon SQS provides managed distributed message queuing that buffers workloads between producers and consumers for asynchronous decoupling.',
  },
  {
    id: 'clf-37',
    domain: 'Cloud Technology and Services',
    prompt:
      'An enterprise requires a dedicated, private 10 Gbps physical fiber connection bypassing the public internet between its corporate colocation facility and AWS VPCs for consistent throughput. Which service provides this?',
    options: [
      'AWS Direct Connect',
      'AWS Site-to-Site VPN over Public ISP',
      'VPC Peering',
      'Internet Gateway (IGW)',
    ],
    correctIndex: 0,
    explanation:
      'AWS Direct Connect establishes a dedicated private physical network link from an on-premises datacenter or colocation partner directly to AWS.',
  },
  {
    id: 'clf-38',
    domain: 'Cloud Technology and Services',
    prompt:
      'What is the key behavioral difference between a VPC Security Group and a Network ACL (NACL)?',
    options: [
      'Security Groups are stateful and support only Allow rules at the ENI/instance level; NACLs are stateless and support both Allow and Deny rules at the subnet level',
      'NACLs are stateful and apply directly inside EC2 OS firewalls',
      'Security Groups inspect DNS domain names automatically',
      'NACLs evaluate rules randomly without rule numbers',
    ],
    correctIndex: 0,
    explanation:
      'Security Groups automatically allow return traffic (stateful) and use allow-only rules on instances, whereas NACLs require explicit inbound and outbound rules (stateless) ordered by number on subnets.',
  },
  {
    id: 'clf-39',
    domain: 'Cloud Technology and Services',
    prompt:
      'A developer needs to run short event-driven Python code in response to image uploads into S3, billed strictly per millisecond of execution and request count with zero idle cost. Which service fits?',
    options: [
      'AWS Lambda',
      'Amazon EC2 t3.micro',
      'AWS App2Container',
      'Amazon WorkSpaces',
    ],
    correctIndex: 0,
    explanation:
      'AWS Lambda is a serverless Function-as-a-Service (FaaS) compute platform that automatically executes event triggers and scales from zero to thousands concurrently.',
  },
  {
    id: 'clf-40',
    domain: 'Cloud Technology and Services',
    prompt:
      'Which AWS managed caching service provides sub-millisecond in-memory key-value storage using Redis or Memcached engines to accelerate database read workloads?',
    options: [
      'Amazon ElastiCache',
      'Amazon DynamoDB Accelerator only for S3',
      'Amazon EFS',
      'AWS Glue',
    ],
    correctIndex: 0,
    explanation:
      'Amazon ElastiCache deploys managed in-memory caching clusters compatible with Redis/Valkey and Memcached to offload read-heavy RDS queries.',
  },
  {
    id: 'clf-41',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'A corporate parent links 15 subsidiary AWS accounts via AWS Organizations Consolidated Billing. What financial advantage occurs automatically without extra configuration?',
    options: [
      'Every subsidiary gets unlimited free EC2 compute',
      'Usage across all linked accounts is aggregated to unlock volume-tier pricing discounts faster and share unutilized Reserved Instances/Savings Plans',
      'Data transfer out to the internet becomes completely free',
      'Enterprise Support fees are waived permanently',
    ],
    correctIndex: 1,
    explanation:
      'Consolidated billing combines usage across member accounts into one bill, qualifying the organization sooner for tiered volume discounts (e.g., S3/data transfer) and sharing RI/Savings Plan discounts.',
  },
  {
    id: 'clf-42',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'Which AWS Cost Management tool lets you visualize historical spending trends over the past 12 months, filter by cost allocation tags, and view a machine-learning forecast for the next 12 months?',
    options: [
      'AWS Cost Explorer',
      'AWS Pricing Calculator',
      'AWS Marketplace',
      'AWS License Manager',
    ],
    correctIndex: 0,
    explanation:
      'AWS Cost Explorer enables interactive visualization, tag filtering, RI/Savings Plan utilization analysis, and 12-month spend forecasting.',
  },
  {
    id: 'clf-43',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'Which AWS Support Plan is the MINIMUM tier that grants 24/7 phone, email, and chat access to Cloud Support Engineers AND unlocks the full set of AWS Trusted Advisor checks and Infrastructure Event Management?',
    options: [
      'Basic Support',
      'Developer Support',
      'Business Support',
      'AWS Free Tier',
    ],
    correctIndex: 2,
    explanation:
      'AWS Business Support unlocks 24/7 phone/chat/email support, <1-hour urgent production system response, and full Trusted Advisor best-practice checks.',
  },
  {
    id: 'clf-44',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'An architect wants to estimate the monthly bill of a proposed new AWS deployment (3 EC2 instances, 1 RDS Multi-AZ database, and 5 TB S3 storage) BEFORE creating any AWS account resources. Which public web tool provides this?',
    options: [
      'AWS Pricing Calculator',
      'AWS Budgets',
      'AWS Cost and Usage Report (CUR)',
      'AWS Compute Optimizer',
    ],
    correctIndex: 0,
    explanation:
      'AWS Pricing Calculator allows pre-deployment architectural cost modeling and shareable bill estimates without requiring an active AWS workload.',
  },
  {
    id: 'clf-45',
    domain: 'Billing, Pricing, and Support',
    prompt:
      'Which AWS data transfer scenario incurs ZERO data transfer charges?',
    options: [
      'Outbound data transfer from EC2 to the public internet',
      'Inbound data transfer FROM the internet INTO AWS services like S3 or EC2',
      'Cross-region replication transfer out of US-East-1 to EU-West-1',
      'NAT Gateway per-GB data processing',
    ],
    correctIndex: 1,
    explanation:
      'AWS charges $0.00/GB for inbound data transfer into AWS from the internet, as well as transfers to CloudFront from AWS origins (with caveats), whereas internet egress generally incurs per-GB fees.',
  },
];

export const CISCO_CCNA_200_301_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'ccna-16',
    domain: 'Network Fundamentals',
    prompt:
      'A point-to-point WAN link between two enterprise routers requires the smallest IPv4 subnet mask providing exactly 2 usable host IP addresses. Which CIDR prefix should be assigned?',
    options: [
      '/29',
      '/30',
      '/28',
      '/32',
    ],
    correctIndex: 1,
    explanation:
      'A /30 subnet mask (255.255.255.252) contains 4 total addresses: 1 network ID, 2 usable host IPs, and 1 broadcast address.',
  },
  {
    id: 'ccna-17',
    domain: 'Network Fundamentals',
    prompt:
      'Given the IPv4 address 172.16.45.78/28, what are the subnet network ID and directed broadcast address?',
    options: [
      'Network: 172.16.45.64, Broadcast: 172.16.45.79',
      'Network: 172.16.45.64, Broadcast: 172.16.45.95',
      'Network: 172.16.45.72, Broadcast: 172.16.45.79',
      'Network: 172.16.45.0, Broadcast: 172.16.45.255',
    ],
    correctIndex: 0,
    explanation:
      'A /28 mask has a block size of 16 in the fourth octet (0, 16, 32, 48, 64, 80...). 78 falls in 64–79, making 172.16.45.64 the network and .79 the broadcast.',
  },
  {
    id: 'ccna-18',
    domain: 'Network Fundamentals',
    prompt:
      'Two campus buildings separated by 8 kilometers require a 10 Gbps optical fiber link. Which fiber type and core size supports multi-kilometer distances using laser optics?',
    options: [
      'Multimode fiber (OM3 50 µm) using LED light',
      'Single-mode fiber (OS2 ~9 µm core) using laser transceivers (e.g., 10GBASE-LR)',
      'Cat6A unshielded twisted pair with PoE++',
      'OM1 62.5 µm multimode fiber',
    ],
    correctIndex: 1,
    explanation:
      'Single-mode fiber (~9 µm core) propagates a single light mode with minimal modal dispersion, easily spanning 10+ km using 1310 nm laser optics.',
  },
  {
    id: 'ccna-19',
    domain: 'Network Fundamentals',
    prompt:
      'Which IEEE Power over Ethernet standard supplies up to 30W (PoE+) at the PSE to power enterprise Wi-Fi 6 access points and pan-tilt-zoom IP cameras?',
    options: [
      'IEEE 802.3af',
      'IEEE 802.3at',
      'IEEE 802.1Q',
      'IEEE 802.3ad',
    ],
    correctIndex: 1,
    explanation:
      'IEEE 802.3af (PoE) provides up to 15.4W PSE, IEEE 802.3at (PoE+) delivers up to 30W PSE, and IEEE 802.3bt (PoE++/UPOE) delivers 60W–90W.',
  },
  {
    id: 'ccna-20',
    domain: 'Network Fundamentals',
    prompt:
      'A network engineer connects an IP phone from another vendor to a Cisco Catalyst switch and wants standardized Layer 2 neighbor discovery for VLAN assignment. Which vendor-neutral protocol should be enabled?',
    options: [
      'CDP (Cisco Discovery Protocol)',
      'LLDP (Link Layer Discovery Protocol — IEEE 802.1AB)',
      'ARP Proxy',
      'ICMP Redirect',
    ],
    correctIndex: 1,
    explanation:
      'LLDP (IEEE 802.1AB) is the open vendor-neutral Layer 2 discovery protocol, unlike CDP which is Cisco proprietary.',
  },
  {
    id: 'ccna-21',
    domain: 'Network Fundamentals',
    prompt:
      'How do TCP and UDP fundamentally handle segment delivery and flow control at Transport Layer 4?',
    options: [
      'TCP uses a 3-way handshake, sequence/ACK numbers, and sliding window flow control; UDP is connectionless best-effort with minimal 8-byte headers',
      'UDP guarantees ordered delivery using sequence numbers; TCP drops packets silently without retransmissions',
      'TCP operates exclusively at Layer 3 using IP headers',
      'Both TCP and UDP establish a 3-way handshake before sending DNS queries',
    ],
    correctIndex: 0,
    explanation:
      'TCP provides reliable, ordered, connection-oriented streams with flow/congestion control, whereas UDP favors low latency for DNS, VoIP, DHCP, and SNMP.',
  },
  {
    id: 'ccna-22',
    domain: 'Network Access',
    prompt:
      'An engineer wants to prevent unwanted automatic trunk formation via Dynamic Trunking Protocol (DTP) on access ports connected to user workstations. Which switchport commands harden the port?',
    options: [
      'switchport mode dynamic desirable',
      'switchport mode access AND switchport nonegotiate',
      'switchport mode trunk AND switchport access vlan 1',
      'spanning-tree guard root only',
    ],
    correctIndex: 1,
    explanation:
      'Explicitly setting `switchport mode access` disables trunking, and `switchport nonegotiate` stops DTP frames from negotiating trunk links with rogue devices.',
  },
  {
    id: 'ccna-23',
    domain: 'Network Access',
    prompt:
      'On a trunk interface currently carrying VLANs 10, 20, and 30, a junior admin executes `switchport trunk allowed vlan 40` instead of using the `add` keyword. What is the immediate impact?',
    options: [
      'VLAN 40 is added alongside VLANs 10, 20, and 30',
      'VLANs 10, 20, and 30 are immediately removed from the trunk, leaving ONLY VLAN 40 permitted',
      'The native VLAN automatically switches to VLAN 40',
      'The switch enters err-disabled state immediately',
    ],
    correctIndex: 1,
    explanation:
      'Running `switchport trunk allowed vlan 40` overwrites the allowed list completely; `switchport trunk allowed vlan add 40` is required to append without dropping existing VLANs.',
  },
  {
    id: 'ccna-24',
    domain: 'Network Access',
    prompt:
      'Two Layer 3 core switches use Switched Virtual Interfaces (SVIs) `interface Vlan10` and `interface Vlan20` with `ip routing` enabled. Why does an engineer choose SVIs over Router-on-a-Stick?',
    options: [
      'SVIs route inter-VLAN traffic in hardware ASICs at wire speed without a single physical router trunk bottleneck',
      'SVIs eliminate the need for IP addresses on client endpoints',
      'Router-on-a-Stick supports faster ASIC switching than Layer 3 switches',
      'SVIs automatically encrypt all inter-VLAN frames with AES-256',
    ],
    correctIndex: 0,
    explanation:
      'Multilayer switch SVIs perform hardware CEF switching/routing internally across VLANs at multi-gigabit line rate without sharing one external subinterfaced link.',
  },
  {
    id: 'ccna-25',
    domain: 'Network Access',
    prompt:
      'In Rapid Spanning Tree Protocol (RSTP / 802.1w), what happens on a switch edge access port configured with `spanning-tree portfast` and `bpduguard enable` if an employee plugs a consumer switch sending BPDUs into it?',
    options: [
      'The consumer switch becomes the new Root Bridge automatically',
      'BPDU Guard immediately puts the access port into err-disabled state to protect STP topology',
      'PortFast bridges both switches as an EtherChannel automatically',
      'The switch converts the port into an Alternate Port quietly',
    ],
    correctIndex: 1,
    explanation:
      'BPDU Guard shuts down (`err-disabled`) any PortFast-enabled edge port the instant an unexpected BPDU arrives, preventing rogue switches from causing loops or Root Bridge hijacking.',
  },
  {
    id: 'ccna-26',
    domain: 'Network Access',
    prompt:
      'An administrator notices an EtherChannel bundle fails to come up between Switch A (`channel-group 1 mode active`) and Switch B (`channel-group 1 mode desirable`). Why do the two switches fail to form a bundle?',
    options: [
      'Switch A runs LACP (`active`) while Switch B runs Cisco PAgP (`desirable`); both sides must use the same protocol',
      'LACP requires `passive` on both ends to form an EtherChannel',
      'PAgP requires native VLAN 99 on both sides',
      'EtherChannel only supports 3 physical links maximum',
    ],
    correctIndex: 0,
    explanation:
      'LACP modes (`active`/`passive`) are incompatible with PAgP modes (`desirable`/`auto`); both switches must use matching protocols (or static `on`/`on`).',
  },
  {
    id: 'ccna-27',
    domain: 'Network Access',
    prompt:
      'Which Cisco wireless architecture places a central Wireless LAN Controller (WLC) in the datacenter managing lightweight APs across remote branches over a WAN using FlexConnect local switching?',
    options: [
      'Autonomous AP mesh mode',
      'CAPWAP centralized/FlexConnect architecture where client data stays local at the branch while control traffic tunnels to the WLC',
      'Ad-hoc IBSS peering',
      'Static WEP pre-shared mode',
    ],
    correctIndex: 1,
    explanation:
      'FlexConnect allows lightweight APs managed by a centralized WLC over CAPWAP to switch local SSID traffic directly at the branch and keep operating if the WAN drops.',
  },
  {
    id: 'ccna-28',
    domain: 'IP Connectivity',
    prompt:
      'Order the following Cisco default Administrative Distances from MOST preferred (lowest) to LEAST preferred (highest): Static route, OSPF, eBGP, Connected interface, EIGRP internal.',
    options: [
      'Connected (0) -> Static (1) -> eBGP (20) -> EIGRP internal (90) -> OSPF (110)',
      'Static (1) -> Connected (0) -> OSPF (110) -> EIGRP (90) -> eBGP (20)',
      'OSPF (110) -> EIGRP (90) -> Static (1) -> Connected (0) -> eBGP (20)',
      'Connected (0) -> OSPF (110) -> Static (1) -> EIGRP (90) -> eBGP (20)',
    ],
    correctIndex: 0,
    explanation:
      'Cisco AD defaults: Connected = 0, Static = 1, eBGP = 20, Internal EIGRP = 90, OSPF = 110, IS-IS = 115, RIP = 120.',
  },
  {
    id: 'ccna-29',
    domain: 'IP Connectivity',
    prompt:
      'A company wants a backup static route to `10.50.0.0/16` via a cellular LTE backup router ONLY when OSPF loses its primary learned route. Which command configures this floating static route?',
    options: [
      '`ip route 10.50.0.0 255.255.0.0 192.168.99.2 1`',
      '`ip route 10.50.0.0 255.255.0.0 192.168.99.2 120`',
      '`ip route 10.50.0.0 255.255.0.0 192.168.99.2 90`',
      '`ip route 0.0.0.0 0.0.0.0 Null0`',
    ],
    correctIndex: 1,
    explanation:
      'Since OSPF has AD 110, assigning a static route AD 120 (> 110) keeps it inactive while OSPF succeeds and installs it automatically if OSPF drops.',
  },
  {
    id: 'ccna-30',
    domain: 'IP Connectivity',
    prompt:
      'Two routers directly connected via GigabitEthernet0/0 fail to reach OSPF `FULL` adjacency, remaining stuck in `INIT` or `EXSTART/EXCHANGE`. Which two parameter mismatches prevent OSPF neighbor formation vs LSA exchange?',
    options: [
      'Mismatched Hello/Dead timers or Area ID prevent neighbor formation; mismatched Interface MTU causes EXSTART/EXCHANGE stalls',
      'Mismatched Router IDs allow two routers to merge databases cleanly',
      'Mismatched OSPF reference bandwidth stops neighbor hello packets',
      'OSPF Area 0 must have different subnet masks on each end of a point-to-point link',
    ],
    correctIndex: 0,
    explanation:
      'OSPF Hello/Dead intervals, Area ID, subnet mask (on broadcast links), and authentication must match to become neighbors; differing MTUs stall DBD exchange in EXSTART.',
  },
  {
    id: 'ccna-31',
    domain: 'IP Connectivity',
    prompt:
      'By default, Cisco OSPF uses a 100 Mbps reference bandwidth (`10^8 / interface bandwidth`), assigning an equal cost of 1 to FastEthernet (100M), GigabitEthernet (1G), and 10G links. Which OSPF router command fixes metric differentiation on 10G networks?',
    options: [
      '`auto-cost reference-bandwidth 10000` (configured consistently on all OSPF routers)',
      '`ip ospf priority 255` on access ports',
      '`passive-interface default`',
      '`default-information originate always`',
    ],
    correctIndex: 0,
    explanation:
      'Setting `auto-cost reference-bandwidth 10000` (in Mbps = 10 Gbps) across all OSPF routers differentiates 10G (cost 1), 1G (cost 10), and 100M (cost 100) links.',
  },
  {
    id: 'ccna-32',
    domain: 'IP Connectivity',
    prompt:
      'Which IPv6 address types correspond to `2001:DB8::/32`, `FC00::/7`, and `::1/128` respectively?',
    options: [
      'Documentation/Global Unicast range, Unique Local Address (ULA), Loopback',
      'Multicast, Anycast, Unspecified',
      'Link-Local, Solicited-Node Multicast, Default Route',
      'Teredo Tunnel, Broadcast, Global Unicast',
    ],
    correctIndex: 0,
    explanation:
      '`2001:DB8::/32` is reserved for documentation (inside `2000::/3` Global Unicast), `FC00::/7` (`FD00::/8`) is private Unique Local Addressing, and `::1/128` is Loopback.',
  },
  {
    id: 'ccna-33',
    domain: 'IP Services',
    prompt:
      'Two distribution routers run HSRP Group 12 (`standby 12 ip 10.10.10.1`) for default-gateway redundancy. Which virtual MAC address do hosts resolve via ARP for `10.10.10.1`?',
    options: [
      '0000.0c07.ac0c',
      '0000.5e00.010c',
      'ffff.ffff.ffff',
      '0100.5e00.0005',
    ],
    correctIndex: 0,
    explanation:
      'HSRPv1 uses `0000.0c07.acXX` where `XX` is the hex group number (12 decimal = `0c` hex -> `0000.0c07.ac0c`). VRRP uses `0000.5e00.01XX`.',
  },
  {
    id: 'ccna-34',
    domain: 'IP Services',
    prompt:
      'In Syslog severity levels (0 through 7), which numeric level corresponds to `Warnings`, and why do admins typically configure `logging trap debugging` sparingly?',
    options: [
      'Level 4 is Warnings; `debugging` (Level 7) floods Syslog servers and router CPU with every informational and debug event',
      'Level 0 is Warnings; Level 7 records only emergencies',
      'Level 6 is Warnings; Level 4 disables console logging',
      'Syslog severity levels only measure CPU utilization percentage',
    ],
    correctIndex: 0,
    explanation:
      'Syslog severity: 0 Emergencies, 1 Alerts, 2 Critical, 3 Errors, 4 Warnings, 5 Notifications, 6 Informational, 7 Debugging (mnemonic: Every Awesome Cisco Engineer Will Need Icecream Daily).',
  },
  {
    id: 'ccna-35',
    domain: 'IP Services',
    prompt:
      'Why does an enterprise deploy SNMPv3 instead of SNMPv2c across core routers and switches?',
    options: [
      'SNMPv3 replaces plaintext community strings with `authPriv` SHA/HMAC message authentication and AES encryption',
      'SNMPv3 operates exclusively over ICMP echo packets',
      'SNMPv2c cannot send SNMP Traps to an NMS',
      'SNMPv3 removes all MIB OIDs from switches',
    ],
    correctIndex: 0,
    explanation:
      'SNMPv1/v2c transmit read/write community strings in cleartext, whereas SNMPv3 adds user-based authentication (`authNoPriv`) and AES encryption (`authPriv`).',
  },
  {
    id: 'ccna-36',
    domain: 'IP Services',
    prompt:
      'Which NTP configuration ensures branch routers synchronize within milliseconds of an authoritative datacenter clock source and stamp incident logs accurately?',
    options: [
      'Configuring `ntp server <core-ntp-ip>` on branch routers plus `service timestamps log datetime msec`',
      'Enabling `cdp run` on WAN interfaces',
      'Setting `clock timezone UTC` without NTP synchronization',
      'Using TFTP instead of UDP port 123',
    ],
    correctIndex: 0,
    explanation:
      'NTP (UDP port 123) synchronizes stratum clocks across infrastructure, and `service timestamps log datetime msec` ensures millisecond log accuracy.',
  },
  {
    id: 'ccna-37',
    domain: 'Security Fundamentals',
    prompt:
      'With DHCP Snooping enabled and building a valid binding table, an attacker still sends spoofed gratuitous ARP replies claiming to own the default gateway IP (`10.1.1.1`) using their own MAC address. Which Layer 2 feature blocks this MITM attack?',
    options: [
      'Dynamic ARP Inspection (DAI)',
      'PortFast',
      'Storm Control',
      'Unicast Reverse Path Forwarding (uRPF)',
    ],
    correctIndex: 0,
    explanation:
      'Dynamic ARP Inspection (DAI) intercepts ARP packets on untrusted switchports and drops any ARP whose IP-to-MAC mapping fails validation against the DHCP Snooping binding database.',
  },
  {
    id: 'ccna-38',
    domain: 'Security Fundamentals',
    prompt:
      'Compare TACACS+ and RADIUS for enterprise network device administration AAA.',
    options: [
      'TACACS+ uses TCP port 49, encrypts the entire packet body, and separates Authentication, Authorization, and Accounting per CLI command; RADIUS uses UDP (1812/1813), encrypts only the password, and combines auth/authz',
      'RADIUS uses TCP port 49 and encrypts full CLI command authorization packets',
      'TACACS+ is UDP-based and intended mainly for guest Wi-Fi accounting',
      'Neither protocol supports Active Directory integration',
    ],
    correctIndex: 0,
    explanation:
      'TACACS+ (TCP 49) encrypts the full payload and supports granular per-command CLI authorization, making it standard for router/switch device admin; RADIUS (UDP 1812/1813) excels at network access/802.1X.',
  },
  {
    id: 'ccna-39',
    domain: 'Security Fundamentals',
    prompt:
      'Which two VTY line commands ensure encrypted remote management via SSH only and prevent unencrypted Telnet logins on a Cisco IOS router?',
    options: [
      '`transport input ssh` and `login local` (after generating RSA keys and setting `ip domain name`)',
      '`transport input all` and `no password`',
      '`transport output telnet` and `enable secret`',
      '`ip http server` and `transport input telnet`',
    ],
    correctIndex: 0,
    explanation:
      '`transport input ssh` restricts VTY lines exclusively to SSH connections, blocking plaintext Telnet sessions.',
  },
  {
    id: 'ccna-40',
    domain: 'Security Fundamentals',
    prompt:
      'A company deploys 802.1X enterprise wireless authentication using a RADIUS server (Cisco ISE) plus protected management frames. Which security mode is configured on the WLAN?',
    options: [
      'WPA2-Personal / PSK',
      'WPA2/WPA3-Enterprise (802.1X / EAP)',
      'Open Authentication with Captive Portal only',
      'Static WEP 128-bit',
    ],
    correctIndex: 1,
    explanation:
      'WPA2/WPA3-Enterprise integrates IEEE 802.1X / EAP with a central RADIUS/ISE server for per-user credentials or client certificates rather than a shared passphrase.',
  },
  {
    id: 'ccna-41',
    domain: 'Security Fundamentals',
    prompt:
      'An ACL contains `access-list 101 deny tcp 10.1.2.0 0.0.0.255 any eq 23` followed by NO additional lines, applied inbound on Gi0/0. Why does ALL traffic (including HTTPS and ping) suddenly stop?',
    options: [
      'Every Cisco ACL ends with an invisible implicit `deny ip any any`; an explicit `permit` statement is required for allowed traffic',
      'TCP port 23 blocks all UDP packets by default',
      'Extended ACLs only apply to outbound traffic',
      'The wildcard mask `0.0.0.255` matches the entire Internet',
    ],
    correctIndex: 0,
    explanation:
      'Every ACL terminates with an implicit `deny any`. Without at least one `permit` rule (such as `permit ip any any`), all remaining packets are dropped.',
  },
  {
    id: 'ccna-42',
    domain: 'Automation and Programmability',
    prompt:
      'A NetOps engineer compares Ansible, Puppet, and Chef for automating 300 Cisco IOS-XE switches. Which statement accurately characterizes Ansible?',
    options: [
      'Ansible is agentless (pushes over SSH/NETCONF), uses human-readable YAML playbooks, and requires no daemon installed on switches',
      'Ansible requires a Ruby agent installed on every Cisco switch pulling configs over TCP 8140',
      'Puppet is agentless and exclusively uses XML playbooks over Telnet',
      'Chef runs without cookbooks or workstations using SNMP traps only',
    ],
    correctIndex: 0,
    explanation:
      'Ansible uses a push-based agentless architecture driven by YAML playbooks over SSH/NETCONF/RESTCONF, whereas Puppet and Chef rely on pull-based agents and Ruby DSLs.',
  },
  {
    id: 'ccna-43',
    domain: 'Automation and Programmability',
    prompt:
      'Inspect the following API response snippet: `{"interfaces": [{"name": "Gi0/1", "up": true, "mtu": 1500}]}`. Which data serialization format and types are shown?',
    options: [
      'JSON containing an object with an `"interfaces"` array holding an object with string, boolean, and number values',
      'XML schema using tag attributes',
      'YAML block sequence separated by hyphens',
      'CSV tabular encoding',
    ],
    correctIndex: 0,
    explanation:
      'JSON represents key-value objects in `{}` braces, ordered arrays in `[]` brackets, unquoted booleans (`true`), and numeric integers (`1500`).',
  },
  {
    id: 'ccna-44',
    domain: 'Automation and Programmability',
    prompt:
      'In a Software-Defined Networking (SDN) architecture like Cisco Catalyst Center (DNA Center), which two planes are decoupled onto a centralized controller vs remaining on network switches?',
    options: [
      'Control Plane logic and policy orchestration centralize on the controller; the Data Plane remains distributed on switch/router hardware ASICs',
      'Data Plane packet forwarding moves to the cloud controller while Control Plane stays isolated on each switch',
      'Management Plane is removed entirely from enterprise networks',
      'Physical Layer transceivers operate inside Python virtual machines',
    ],
    correctIndex: 0,
    explanation:
      'SDN separates centralized Control/Management Plane intelligence (southbound NETCONF/OpenFlow/CLI/SNMP, northbound REST APIs) from fast local hardware Data Plane forwarding.',
  },
  {
    id: 'ccna-45',
    domain: 'Automation and Programmability',
    prompt:
      'When sending a RESTCONF request to update ONLY the description field of a single existing router interface without replacing the entire interface configuration resource, which HTTP verb is appropriate?',
    options: [
      'GET',
      'PATCH',
      'DELETE',
      'HEAD',
    ],
    correctIndex: 1,
    explanation:
      'In REST / RESTCONF APIs, `GET` retrieves state, `POST` creates resources, `PUT` replaces an entire resource, `PATCH` performs partial field updates, and `DELETE` removes resources.',
  },
];
