import { PracticeQuestion } from '../types';

export const AZURE_DP_100_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'dp100-1',
    domain: 'Design and prepare a machine learning solution',
    prompt:
      'An Azure Machine Learning team needs strict network isolation so Compute Clusters, Storage Accounts, and Key Vault never accept public internet endpoints while training sensitive patient risk models. Which workspace architecture satisfies this requirement?',
    options: [
      'Provision the Azure ML workspace with Managed Virtual Network isolation and Private Endpoints for Storage, Key Vault, and ACR',
      'Use public blob URLs with SAS tokens shared in email',
      'Disable Microsoft Entra ID authentication on the subscription',
      'Run training on local developer laptops using public Wi-Fi',
    ],
    correctIndex: 0,
    explanation:
      'Managed Virtual Network isolation inside Azure Machine Learning wraps compute targets and linked dependencies (Storage, Key Vault, Container Registry) behind Private Endpoints with zero public ingress.',
  },
  {
    id: 'dp100-2',
    domain: 'Design and prepare a machine learning solution',
    prompt:
      'A data scientist runs exploratory pandas/scikit-learn notebooks interactively for 4 hours a day and needs the VM to shut down automatically after 30 minutes of inactivity to stop overnight billing. Which Azure ML compute target fits best?',
    options: ['Azure ML Compute Instance with auto-shutdown schedule enabled', 'Static Standard_NC96ads Compute Cluster', 'Azure Kubernetes Service (AKS) Production Endpoint', 'Azure Functions Consumption Plan'],
    correctIndex: 0,
    explanation:
      'Compute Instances act as managed cloud data-science workstations with built-in idle shutdown timers; Compute Clusters auto-scale 0-to-N nodes specifically for batch training jobs.',
  },
  {
    id: 'dp100-3',
    domain: 'Design and prepare a machine learning solution',
    prompt:
      'To access Parquet training datasets stored inside an Azure Data Lake Storage Gen2 container securely from an Azure ML training job without embedding storage account keys inside Python scripts, what should you configure?',
    options: [
      'An Azure ML Datastore authenticated via Identity-based access (Managed Identity / Entra ID) paired with registered Data Assets (`uri_folder` / `mltable`)',
      'Hardcode the account SAS key directly in GitHub README.md',
      'Enable anonymous public container read access',
      'Copy CSV files manually onto every worker node SSH disk',
    ],
    correctIndex: 0,
    explanation:
      'Credential-less (identity-based) Datastores paired with versioned `uri_folder` / `mltable` Data Assets ensure reproducible lineage and zero secret leakage.',
  },
  {
    id: 'dp100-4',
    domain: 'Explore data, and train models',
    prompt:
      'Which Azure ML feature trains dozens of classification algorithms and preprocessing pipelines automatically across cross-validation folds to discover the top-performing model under a fixed 2-hour timeout?',
    options: ['Automated Machine Learning (AutoML)', 'Manual Hyperdrive grid search only', 'Azure Data Factory Copy Activity', 'Power BI Q&A'],
    correctIndex: 0,
    explanation:
      'Azure AutoML automates feature scaling/imputation, algorithm selection, hyperparameter tuning, and model ranking across Classification, Regression, Forecasting, NLP, and Vision tasks.',
  },
  {
    id: 'dp100-5',
    domain: 'Explore data, and train models',
    prompt:
      'You submit a PyTorch training job using Azure ML SDK v2 and want every hyperparameter, validation AUC metric, confusion matrix chart, and saved model artifact automatically tracked across 50 team runs. Which framework integrates natively with Azure ML Studio tracking?',
    options: ['MLflow (`mlflow.autolog()` / `mlflow.log_metric()`)', 'Windows Event Viewer', 'Wireshark PCAP', 'Excel Macro Recorder'],
    correctIndex: 0,
    explanation:
      'Azure Machine Learning workspaces are natively MLflow-compatible (`MLFLOW_TRACKING_URI` pre-configured on compute targets), recording metrics, parameters, tags, and artifacts centrally.',
  },
  {
    id: 'dp100-6',
    domain: 'Explore data, and train models',
    prompt:
      'While running an Azure ML Sweep Job (hyperparameter tuning) over 100 trials, you notice many poor trials converge below 0.55 accuracy within the first 5 epochs. How can you terminate failing runs early to save GPU compute budget?',
    options: [
      'Attach an Early Termination Policy (`BanditPolicy`, `MedianStoppingPolicy`, or `TruncationSelectionPolicy`) to the sweep configuration',
      'Switch from GPU clusters to DNS servers',
      'Increase `max_total_trials` to 10,000',
      'Disable validation logging completely',
    ],
    correctIndex: 0,
    explanation:
      'Early termination policies evaluate primary logged metrics at defined intervals and cancel underperforming trials early instead of wasting GPU hours.',
  },
  {
    id: 'dp100-7',
    domain: 'Explore data, and train models',
    prompt:
      'When deploying a training script inside a reproducible Docker image backed by pinned Python packages (`scikit-learn==1.5.0`, `xgboost`), which Azure ML asset packages the runtime dependencies across Dev and Prod clusters?',
    options: ['Azure ML Environment (`Environment` YAML / Curated or Custom Docker)', 'Linked Service', 'Workspace Quota', 'Virtual Network Peering'],
    correctIndex: 0,
    explanation:
      'Azure ML Environments encapsulate Docker base images and Conda/pip dependency specs so identical code runs reliably across local workstations, clusters, and inference endpoints.',
  },
  {
    id: 'dp100-8',
    domain: 'Prepare a model for deployment',
    prompt:
      'A churn prediction model achieves 94% training accuracy and 61% test accuracy on unseen holdout customers. What issue occurred and how do you mitigate it?',
    options: [
      'Overfitting—mitigate via L1/L2 regularization, simpler features, dropout/pruning, or collecting more diverse training rows',
      'Underfitting—remove all regularization and add polynomial degree 20',
      'Class balance optimization—delete all negative rows',
      'Compute instance auto-shutdown',
    ],
    correctIndex: 0,
    explanation:
      'High variance (memorizing training noise while failing generalization on holdout sets) is classic overfitting, addressed with regularization, cross-validation, early stopping, or feature reduction.',
  },
  {
    id: 'dp100-9',
    domain: 'Prepare a model for deployment',
    prompt:
      'In a fraud detection dataset where 99.6% of transactions are legitimate and only 0.4% are fraudulent, why is raw Accuracy misleading—and which metrics should evaluate model quality instead?',
    options: [
      'Accuracy hits 99.6% by predicting "non-fraud" always; evaluate Precision, Recall, F1-Score, or Precision-Recall AUC (PR-AUC)',
      'Mean Squared Error (MSE)',
      'R-Squared ($R^2$)',
      'Training wall-clock minutes',
    ],
    correctIndex: 0,
    explanation:
      'Severe class imbalance renders plain Accuracy useless; Precision, Recall, F1, and PR-AUC directly measure how effectively rare positive fraud cases are captured without drowning operations in false alerts.',
  },
  {
    id: 'dp100-10',
    domain: 'Prepare a model for deployment',
    prompt:
      'An operations engineer wants a multi-step workflow (Step 1: Prep Spark data -> Step 2: Train XGBoost -> Step 3: Evaluate & Register Model conditionally) runnable cleanly on schedule via Azure DevOps or GitHub Actions. Which Azure ML construct orchestrates this?',
    options: ['Azure ML Pipeline (`@dsl.pipeline` YAML / SDK v2 components)', 'Single interactive Jupyter cell run manually', 'Power BI Report Server', 'Azure Bastion'],
    correctIndex: 0,
    explanation:
      'Azure ML Pipelines compose reusable modular Components with explicit input/output lineage, step caching, and CI/CD scheduling.',
  },
  {
    id: 'dp100-11',
    domain: 'Deploy and retrain a model',
    prompt:
      'A real-time loan underwriting API must score incoming single JSON applications in under 80 ms with automatic HTTPS hosting, blue-green traffic splitting, and zero manual Kubernetes YAML tuning. Which endpoint type fits best?',
    options: ['Managed Online Endpoint (Azure ML)', 'Batch Endpoint', 'Azure Data Box', 'Synapse Serverless SQL'],
    correctIndex: 0,
    explanation:
      'Managed Online Endpoints provide turnkey container scaling, Blue-Green traffic routing (e.g., 90%/10% canary rollout), Key/AMLToken auth, and SLA monitoring for synchronous REST inference.',
  },
  {
    id: 'dp100-12',
    domain: 'Deploy and retrain a model',
    prompt:
      'A marketing team wants to score 15 million customer records overnight inside Parquet files stored in Azure Blob Storage, writing prediction CSV/Parquet outputs back to storage cost-effectively. Which deployment endpoint fits best?',
    options: ['Batch Endpoint', 'Real-time GPU Managed Online Endpoint with 50 replicas', 'Azure Load Balancer', 'Local Python Flask server'],
    correctIndex: 0,
    explanation:
      'Batch Endpoints spin up elastic Compute Clusters asynchronously across large file batches and automatically shut nodes down to zero once scoring completes.',
  },
  {
    id: 'dp100-13',
    domain: 'Deploy and retrain a model',
    prompt:
      'Six months after deploying a credit-scoring model, economic shifts alter applicant income distributions in live production inference traffic compared to training baseline data. What MLOps signal detects this shift before accuracy collapses?',
    options: ['Data Drift Monitoring (Azure ML Model Data Collector + Monitoring)', 'Deleting model registry versions', 'Disabling SSL TLS 1.3', 'Increasing batch size'],
    correctIndex: 0,
    explanation:
      'Data Drift monitoring tracks statistical shifts (PSI/Wasserstein/Jensen-Shannon divergence) between incoming inference features and training reference datasets to trigger automated retraining.',
  },
  {
    id: 'dp100-14',
    domain: 'Design and prepare a machine learning solution',
    prompt:
      'Why does logging an MLflow Model Signature (`infer_signature(X_test, preds)`) and registering the model in the Azure ML Model Registry improve production MLOps safety?',
    options: [
      'It versions immutable artifact binaries alongside strict input/output column schemas so incompatible payload calls fail cleanly and rollbacks take one click',
      'It disables HTTPS authentication',
      'It compresses 10 GB datasets into 1 KB text files',
      'It converts Python into SQL Server stored procedures',
    ],
    correctIndex: 0,
    explanation:
      'Model Registry versioning + MLflow signatures formalize schema contracts and lineage across CI/CD promotions from Staging to Production.',
  },
  {
    id: 'dp100-15',
    domain: 'Explore data, and train models',
    prompt:
      'When tuning continuous vs discrete hyperparameter search spaces in Azure ML Sweep Jobs, which sampling strategy draws random uniform/log-uniform combinations efficiently without exhausting high-dimensional grids?',
    options: ['Random Sampling (`RandomSampling`) or Bayesian Sampling', 'Exhaustive 100-parameter Grid Sampling on CPU', 'Static manual constants', 'Zero-epoch termination'],
    correctIndex: 0,
    explanation:
      'Grid Sampling scales exponentially and forbids continuous distributions (`uniform`, `loguniform`); Random Sampling and Bayesian Sampling search high-dimensional spaces far more efficiently.',
  },
  {
    id: 'dp100-16',
    domain: 'Prepare a model for deployment',
    prompt:
      'Under Responsible AI (RAI) Dashboard tooling in Azure ML, which component explains why a specific loan applicant was rejected by showing individual positive/negative SHAP feature contributions?',
    options: ['Error Analysis + Interpretability / Feature Importance (SHAP / Mimic Explainer)', 'Hyperdrive Sweep', 'Compute Cluster Autoscaler', 'Azure Traffic Manager'],
    correctIndex: 0,
    explanation:
      'Azure ML Responsible AI integrates Shapley additive explanations (SHAP) and Counterfactual "what-if" analysis to audit global and per-prediction fairness and explainability.',
  },
  {
    id: 'dp100-17',
    domain: 'Explore data, and train models',
    prompt:
      'When preprocessing categorical columns (such as `City` = ["London", "Dubai", "Berlin"]) for Linear Regression or Logistic Regression without introducing fake numerical ordering ("Berlin" > "London"), which encoding should be applied?',
    options: ['One-Hot Encoding (`OneHotEncoder`)', 'Plain alphabetical integer assignment (0, 1, 2)', 'MinMax Scaling directly on raw strings', 'Dropping all categorical features blindly'],
    correctIndex: 0,
    explanation:
      'One-Hot Encoding creates orthogonal binary indicator columns without imposing false ordinal magnitude between nominal categories.',
  },
  {
    id: 'dp100-18',
    domain: 'Explore data, and train models',
    prompt:
      'Why must `StandardScaler.fit()` run ONLY on the training split (`X_train`) before calling `.transform()` on `X_test` rather than fitting across the combined dataset first?',
    options: [
      'To prevent Data Leakage—test set mean/variance statistics must never leak into training preprocessing prior to evaluation',
      'Because `X_test` cannot contain floating-point numbers',
      'Because `fit()` deletes negative values',
      'To speed up Blob Storage DNS lookups',
    ],
    correctIndex: 0,
    explanation:
      'Computing normalization statistics across test data leaks distribution knowledge into training, artificially inflating validation metrics.',
  },
  {
    id: 'dp100-19',
    domain: 'Deploy and retrain a model',
    prompt:
      'You deploy a new v2 Blue-Green model onto an existing Managed Online Endpoint currently serving 100% live traffic on `blue`. How do you canary-test `green` with minimal customer blast radius?',
    options: [
      'Run `az ml online-endpoint update --traffic "blue=90 green=10"`, monitor latency & HTTP 5xx in Application Insights, then shift 100% to `green` once verified',
      'Delete `blue` immediately before building `green`',
      'Hardcode `green` IP inside mobile clients',
      'Disable endpoint health probes',
    ],
    correctIndex: 0,
    explanation:
      'Managed Online Endpoints separate the Endpoint URL from underlying Deployment versions (`blue`/`green`), enabling zero-downtime percentage traffic shifting.',
  },
  {
    id: 'dp100-20',
    domain: 'Design and prepare a machine learning solution',
    prompt:
      'How can a team deploy fine-tuned open-source Hugging Face / Llama models directly inside Azure ML without manually writing FastAPI web servers and Dockerfile boilerplate?',
    options: [
      'Deploy curated Foundation Models from the Azure ML Model Catalog directly to Managed Online Endpoints or Serverless API Pay-As-You-Go endpoints',
      'Upload `.safetensors` weights into Excel',
      'Use Azure Table Storage',
      'Convert PyTorch weights to PNG images',
    ],
    correctIndex: 0,
    explanation:
      'The Azure ML Model Catalog provides pre-packaged Hugging Face, Mistral, Phi, and Llama foundation models with optimized vLLM/TensorRT serving containers ready for 1-click endpoint deployment.',
  },
  {
    id: 'dp100-21',
    domain: 'Explore data, and train models',
    prompt:
      'In prompt engineering & LLM evaluation inside Azure AI Foundry / Azure ML Prompt Flow, which automated evaluation metric checks whether an assistant’s generated answer introduces fabricated claims unsupported by the retrieved RAG context?',
    options: ['Groundedness evaluator', 'BLEU hardware score', 'Gradient Norm clipping', 'CUDA memory swap'],
    correctIndex: 0,
    explanation:
      'Prompt Flow built-in evaluators assess Groundedness (alignment strictly to retrieved sources), Relevance, Coherence, Fluency, and Retrieval recall automatically across test sets.',
  },
  {
    id: 'dp100-22',
    domain: 'Prepare a model for deployment',
    prompt:
      'Which cross-validation technique divides data into $k$ subsets preserving identical minority/majority class proportions across every fold on imbalanced binary classification tasks?',
    options: ['Stratified K-Fold Cross-Validation (`StratifiedKFold`)', 'Unshuffled sequential slice', 'Single 10% holdout', 'Bootstrap deduplication'],
    correctIndex: 0,
    explanation:
      'Stratified K-Fold guarantees every train/validation fold preserves the exact target class ratio of the full dataset.',
  },
  {
    id: 'dp100-23',
    domain: 'Deploy and retrain a model',
    prompt:
      'When using "No-Code" MLflow model deployment inside Azure ML Managed Online Endpoints, what file MUST exist inside the registered model folder so Azure automatically builds the REST scoring runtime?',
    options: ['The `MLmodel` descriptor + `conda.yaml`/`requirements.txt` generated automatically by `mlflow.<flavor>.log_model()`', 'A manual ASP.NET `web.config`', 'An `.xlsx` lookup table', 'A PowerShell `.ps1` printer script'],
    correctIndex: 0,
    explanation:
      'MLflow models store standardized `MLmodel` metadata and environment specs, letting Azure ML deploy them without custom `score.py` entry scripts.',
  },
  {
    id: 'dp100-24',
    domain: 'Design and prepare a machine learning solution',
    prompt:
      'A distributed deep-learning training job spans 8 multi-GPU Azure compute nodes concurrently using PyTorch DistributedDataParallel (DDP). Which Azure ML job property enables multi-node MPI/PyTorch ring communication cleanly?',
    options: [
      'Setting `distribution={"type": "pytorch", "process_count_per_instance": ...}` and `instance_count > 1` inside the `command()` job spec',
      'Running 8 disconnected single-node manual loops',
      'Lowering VM SKU to B1s CPU',
      'Disabling InfiniBand RDMA',
    ],
    correctIndex: 0,
    explanation:
      'Azure ML `distribution` (`pytorch`, `tensorflow`, `mpi`) configures `RANK`, `WORLD_SIZE`, `MASTER_ADDR`, and RDMA/NCCL networking automatically across multi-node clusters.',
  },
  {
    id: 'dp100-25',
    domain: 'Deploy and retrain a model',
    prompt:
      'Which GitHub Actions / Azure DevOps MLOps pattern guarantees production pipelines retrain models ONLY via audited PR reviews rather than ad-hoc clicks inside Studio UI?',
    options: [
      'GitOps / Code-first MLOps storing YAML job specs, `conda.yml`, and evaluation thresholds in Git triggered automatically on release branches via Service Principal / OIDC',
      'Sharing one personal Admin password across contractors',
      'Training directly on Production inference VMs',
      'Disabling Model Registry',
    ],
    correctIndex: 0,
    explanation:
      'Code-first MLOps using Azure CLI v2 YAML definitions + workload identity federation (OIDC) enforces reproducible automated CI/CD gates from dev workspace to production endpoints.',
  },
];

export const COMPTIA_A_PLUS_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'aplus-1',
    domain: 'Mobile Devices & Hardware',
    prompt:
      'A field technician opens a thin ultrabook whose trackpad is pushed upward from inside the palmrest and fails to click cleanly. Upon removing the bottom cover, the technician sees a swollen lithium-ion battery pack. What is the safest immediate action?',
    options: [
      'Power down, disconnect AC, carefully remove and store/dispose of the swollen battery in a fire-resistant container—never puncture or charge it',
      'Pierce the battery casing slightly with a pin to vent gas',
      'Plug in a higher-wattage USB-C fast charger to flatten the cell',
      'Press the palmrest down firmly with heavy screws',
    ],
    correctIndex: 0,
    explanation:
      'Swollen Li-ion batteries present severe thermal runaway and fire hazards; power off, avoid flexing/puncturing, isolate, and recycle at an authorized hazmat facility.',
  },
  {
    id: 'aplus-2',
    domain: 'Mobile Devices & Hardware',
    prompt:
      'Which laptop display panel technology offers wide viewing angles and the highest color accuracy for graphic designers, while TN panels trade off viewing angles for fast sub-1ms pixel response?',
    options: ['IPS (In-Plane Switching)', 'CRT Monochrome', 'Passive STN', 'DLP Projector'],
    correctIndex: 0,
    explanation:
      'IPS LCD panels deliver rich sRGB/DCI-P3 color fidelity and ~178-degree viewing angles, whereas Twisted Nematic (TN) sacrifices color/angle for lowest gaming cost/response.',
  },
  {
    id: 'aplus-3',
    domain: 'Networking',
    prompt:
      'A user connects a Windows laptop to an office wall jack and `ipconfig` reports IPv4 address `169.254.88.14` with subnet mask `255.255.0.0` and NO default gateway. What caused this?',
    options: [
      'The laptop failed to receive a lease from the DHCP server and self-assigned an APIPA address (`169.254.0.0/16`)',
      'The DNS cache is full',
      'The ISP assigned a public fiber IP',
      'IPv6 Teredo tunneling overrode static IP',
    ],
    correctIndex: 0,
    explanation:
      'Automatic Private IP Addressing (`169.254.x.x`) occurs when DHCP DISCOVER broadcasts go unanswered—pointing directly to unplugged/dead VLAN switch ports, full DHCP scopes, or disabled NIC link.',
  },
  {
    id: 'aplus-4',
    domain: 'Networking',
    prompt:
      'Which TCP port number handles encrypted Secure Shell remote terminal management and SFTP file transfers, replacing unencrypted Telnet on port 23?',
    options: ['TCP 22', 'TCP 80', 'UDP 69', 'TCP 445'],
    correctIndex: 0,
    explanation:
      'SSH and SFTP operate encrypted over TCP port 22.',
  },
  {
    id: 'aplus-5',
    domain: 'Hardware',
    prompt:
      'Which RAID level mirrors two physical NVMe drives identically so the workstation survives the complete failure of one drive with zero downtime, providing 50% usable capacity?',
    options: ['RAID 0 (Striping)', 'RAID 1 (Mirroring)', 'RAID 5 (Striping with Parity)', 'JBOD'],
    correctIndex: 1,
    explanation:
      'RAID 1 mirrors 100% of blocks across two disks (`N/2` usable space) for simple, instant fault tolerance without parity rebuild overhead.',
  },
  {
    id: 'aplus-6',
    domain: 'Hardware',
    prompt:
      'A technician needs to install an ultra-fast PCIe 4.0 x4 M.2 NVMe SSD into a modern desktop motherboard. How does NVMe differ from legacy 2.5-inch SATA III SSDs?',
    options: [
      'NVMe communicates directly over PCIe lanes using up to 64K queues/commands per queue, eliminating the 600 MB/s SATA AHCI bottleneck',
      'NVMe uses spinning magnetic platters',
      'NVMe requires parallel IDE 40-pin ribbon cables',
      'NVMe runs slower than USB 2.0',
    ],
    correctIndex: 0,
    explanation:
      'NVMe connects straight into the PCIe bus with parallelized queue depth delivering 3,500–7,500+ MB/s compared to SATA III’s ~550–600 MB/s ceiling.',
  },
  {
    id: 'aplus-7',
    domain: 'Hardware Troubleshooting',
    prompt:
      'Upon pressing the power button on a newly built PC, fans spin up briefly and stop—emitting 3 short POST beeps with NO display output on screen. Checking what hardware component FIRST usually resolves POST memory errors?',
    options: [
      'Reseating DDR4/DDR5 RAM DIMMs firmly into the correct primary motherboard slots (e.g., A2/B2) and testing one stick at a time',
      'Reinstalling Windows from USB',
      'Replacing the Ethernet patch cable',
      'Updating Chrome extensions',
    ],
    correctIndex: 0,
    explanation:
      'Continuous or 3-beep POST codes prior to BIOS splash typically indicate unseated or mismatched RAM modules or missing GPU auxiliary PCIe power.',
  },
  {
    id: 'aplus-8',
    domain: 'Virtualization & Cloud',
    prompt:
      'A developer needs 4 vCPUs and 16 GB RAM virtualized smoothly inside VMware Workstation or VirtualBox on Windows 11, yet hypervisor creation fails saying hardware virtualization is disabled. Where must the technician enable Intel VT-x / AMD-V?',
    options: [
      'Inside the motherboard UEFI/BIOS firmware Security / CPU Configuration menu',
      'Inside Windows Disk Cleanup',
      'Inside Device Manager Sound settings',
      'Inside router port forwarding',
    ],
    correctIndex: 0,
    explanation:
      'Hardware-assisted CPU virtualization (`VT-x` / `AMD-V` / `SVM`) must be toggled ON inside system UEFI/BIOS firmware before Type-1 or Type-2 64-bit VMs can execute.',
  },
  {
    id: 'aplus-9',
    domain: 'Operating Systems (Core 2)',
    prompt:
      'Which Windows command-line tool scans and repairs corrupted protected Windows system DLL/OS files cleanly from the WinSxS component store?',
    options: ['`sfc /scannow` (after `DISM /Online /Cleanup-Image /RestoreHealth`)', '`ipconfig /flushdns`', '`tracert -d`', '`chkdsk /f` only'],
    correctIndex: 0,
    explanation:
      'System File Checker (`sfc /scannow`) verifies protected system binary integrity; running DISM RestoreHealth beforehand repairs the local servicing component store if corrupted.',
  },
  {
    id: 'aplus-10',
    domain: 'Operating Systems (Core 2)',
    prompt:
      'Which Windows 11 Enterprise/Pro security feature binds full-disk AES-128/256 volume encryption directly to the motherboard’s Trusted Platform Module (TPM 2.0) chip?',
    options: ['BitLocker Drive Encryption', 'Windows Defender Firewall', 'Disk Defragmenter', 'ReadyBoost'],
    correctIndex: 0,
    explanation:
      'BitLocker encrypts full OS and fixed volumes, sealing decryption keys inside TPM 2.0 hardware to stop offline cold-boot/stolen-SSD data extraction.',
  },
  {
    id: 'aplus-11',
    domain: 'Operating Systems (Core 2)',
    prompt:
      'A Linux support analyst needs to inspect running processes continuously sorted by real-time CPU usage inside an SSH terminal session on Ubuntu. Which command displays live interactive resource telemetry?',
    options: ['`top` or `htop`', '`chmod 777`', '`mkdir -p`', '`cat /etc/hosts`'],
    correctIndex: 0,
    explanation:
      '`top` / `htop` provide dynamic real-time CPU, memory, load average, and PID monitoring inside Linux terminals.',
  },
  {
    id: 'aplus-12',
    domain: 'Security (Core 2)',
    prompt:
      'An employee calls helpdesk saying a red skull banner just locked every file on their corporate laptop with `.locked` extensions demanding Bitcoin within 48 hours. What is Step 1 of Malware Remediation?',
    options: [
      'Immediately isolate/disconnect the infected workstation from wired Ethernet and Wi-Fi to halt lateral SMB spread—do NOT reboot blindly before capturing evidence',
      'Pay the Bitcoin ransom immediately',
      'Copy infected shared drives to personal USB sticks',
      'Run CCleaner and reconnect to corporate VPN',
    ],
    correctIndex: 0,
    explanation:
      'CompTIA Malware Removal Best Practice Steps 1 & 2: Identify symptoms and IMMEDIATELY Quarantine/Isolate the system from networks so ransomware cannot encrypt mapped network shares.',
  },
  {
    id: 'aplus-13',
    domain: 'Security (Core 2)',
    prompt:
      'What happens when you change Wi-Fi encryption from WPA2-PSK to WPA3-Personal (SAE — Simultaneous Authentication of Equals)?',
    options: [
      'WPA3 resists offline dictionary brute-force attacks against weak passphrases and provides Forward Secrecy even if the password is later compromised',
      'WPA3 disables all password authentication',
      'WPA3 restricts throughput to 11 Mbps',
      'WPA3 replaces DNS with WINS',
    ],
    correctIndex: 0,
    explanation:
      'WPA3 replaces WPA2’s 4-way handshake with SAE (Dragonfly), preventing attackers from capturing handshakes for offline GPU cracking and enforcing Protected Management Frames (PMF).',
  },
  {
    id: 'aplus-14',
    domain: 'Security (Core 2)',
    prompt:
      'A bank disposes of 40 retired spinning SATA HDDs containing historical customer records. Why is running quick `Format` in Windows Explorer insufficient—and what method destroys data properly?',
    options: [
      'Quick Format only deletes filesystem pointers; perform certified physical Destruction (shredding/crushing) or NIST SP 800-88 cryptographic wipe / multi-pass Purge',
      'Dragging files into Recycle Bin',
      'Renaming folders to `Delete`',
      'Running `ipconfig /release`',
    ],
    correctIndex: 0,
    explanation:
      'Standard Quick Formats leave raw sector data intact for trivial recovery tools; regulated sanitization requires physical shredding, degaussing (magnetic drives), or NIST cryptographic purge.',
  },
  {
    id: 'aplus-15',
    domain: 'Operational Procedures',
    prompt:
      'Before deploying a major firewall firmware upgrade across 12 branch offices Friday night, a network lead submits documentation detailing scope, rollback steps, maintenance window, and risk analysis to leadership. Which ITIL/operational governance process is this?',
    options: ['Change Management (CAB review & Backout Plan)', 'Ad-hoc Shadow IT', 'Unplanned Break-Fix', 'Ticket Closure'],
    correctIndex: 0,
    explanation:
      'Formal Change Management requires risk assessment, stakeholder approval, scheduled maintenance windows, and verified Rollback procedures before modifying production infrastructure.',
  },
  {
    id: 'aplus-16',
    domain: 'Mobile Devices & Hardware',
    prompt:
      'Modern Android and iPhone handsets communicate within 4 centimeters of contactless payment terminals (`Tap to Pay`) or metro gates using which short-range inductive standard?',
    options: ['NFC (Near Field Communication)', '802.11ax Wi-Fi 6E', 'Starlink Ku-band', 'RS-232 Serial'],
    correctIndex: 0,
    explanation:
      'NFC operates at 13.56 MHz over distances <4 cm for mobile payments, transit cards, and badge pairing.',
  },
  {
    id: 'aplus-17',
    domain: 'Hardware',
    prompt:
      'A thermal printer in a warehouse prints faded vertical white streaks down every shipping barcode label. What preventive maintenance fixes this most often?',
    options: [
      'Gently clean residue/adhesive off the thermal printhead element with an isopropyl alcohol pen/swab (after cooling) or replace worn printhead',
      'Refill cyan/magenta liquid ink cartridges',
      'Replace laser fuser roller oil',
      'De-gauss the CRT monitor',
    ],
    correctIndex: 0,
    explanation:
      'Direct thermal printers heat coated paper directly without ink/toner; vertical blank lines indicate stuck debris or burnt heating elements on the thermal printhead.',
  },
  {
    id: 'aplus-18',
    domain: 'Operating Systems (Core 2)',
    prompt:
      'Which Linux command modifies file ownership recursively so user `nginx` and group `www-data` own `/var/www/html`?',
    options: ['`sudo chown -R nginx:www-data /var/www/html`', '`sudo chmod +x /var/www/html`', '`sudo df -h`', '`sudo apt purge`'],
    correctIndex: 0,
    explanation:
      '`chown -R user:group path` updates user and group ownership recursively; `chmod` modifies read/write/execute permission bits.',
  },
  {
    id: 'aplus-19',
    domain: 'Networking',
    prompt:
      'An administrator needs to verify whether packet loss between a London desktop and `10.50.0.10` occurs on the local office gateway or inside the ISP hop 4. Which Windows diagnostic command prints round-trip latency at every intermediate router hop?',
    options: ['`tracert 10.50.0.10` (or `traceroute` on Linux/macOS)', '`nbtstat -c`', '`net use`', '`whoami /groups`'],
    correctIndex: 0,
    explanation:
      '`tracert` increments IP TTL values to reveal each Layer-3 router hop along the path along with hop-by-hop latency.',
  },
  {
    id: 'aplus-20',
    domain: 'Security (Core 2)',
    prompt:
      'Under Windows 11/10 NTFS permissions, what happens when a user shares a folder over SMB allowing `Full Control` Share Permissions while setting `Read-only` NTFS Security Permissions?',
    options: [
      'The most restrictive permission wins when combining Network Share + NTFS permissions—so remote users get Read-only effective access',
      'Full Control overrides NTFS over the network',
      'All files delete automatically',
      'FAT32 converts automatically',
    ],
    correctIndex: 0,
    explanation:
      'When accessing SMB network shares on NTFS volumes, Windows calculates the union within Share and within NTFS separately, then applies the MOST RESTRICTIVE intersection between Share and NTFS.',
  },
  {
    id: 'aplus-21',
    domain: 'Hardware',
    prompt:
      'Under CompTIA A+ V15 (`220-1201`) objectives, what hardware component inside modern "AI PCs" offloads local LLM, background blur, and speech inference efficiently without draining CPU/battery?',
    options: ['Neural Processing Unit (NPU)', 'Legacy Southbridge Northbridge IDE', 'Optical DVD-RW laser', 'PS/2 Mouse IRQ'],
    correctIndex: 0,
    explanation:
      'Modern AI PC processors integrate dedicated Neural Processing Units (NPUs) delivering high TOPS/watt efficiency for continuous local AI inference.',
  },
  {
    id: 'aplus-22',
    domain: 'Operating Systems (Core 2)',
    prompt:
      'A Windows user downloads a script cleanly but wants a clean way to isolate untrusted executables inside a disposable hypervisor desktop instance that wipes completely upon close. Which native Windows 11 Pro/Enterprise tool provides this?',
    options: ['Windows Sandbox', 'Notepad++', 'Registry Editor', 'Event Viewer'],
    correctIndex: 0,
    explanation:
      'Windows Sandbox launches an isolated lightweight temporary desktop environment whose state is discarded permanently when closed.',
  },
  {
    id: 'aplus-23',
    domain: 'Operational Procedures',
    prompt:
      'During ESD (Electrostatic Discharge) protection while replacing a motherboard, why should a technician attach an ESD wrist strap ONLY to unpainted chassis metal—NEVER inside a powered-on CRT monitor or high-voltage PSU interior?',
    options: [
      'To safely equalize electrical potential between technician and chassis without creating a hazardous shock path near high-voltage capacitors',
      'Because chassis metal increases wireless signal strength',
      'To charge laptop batteries faster',
      'Because copper straps double CPU clock speed',
    ],
    correctIndex: 0,
    explanation:
      'ESD straps contain a 1-megaohm safety resistor to drain static gently to unpainted chassis ground while preventing lethal fault currents on live high-voltage components.',
  },
  {
    id: 'aplus-24',
    domain: 'Networking',
    prompt:
      'Which twisted-pair Ethernet cable category is minimally rated to deliver reliable 10 Gbps Ethernet (`10GBASE-T`) across full 100-meter horizontal building runs?',
    options: ['Cat 6A (Augmented Category 6)', 'Cat 5', 'RG-59 Coax', 'USB 2.0'],
    correctIndex: 0,
    explanation:
      'Cat 6 supports 10 Gbps only up to ~55m under alien-crosstalk limits, whereas Cat 6A (500 MHz) guarantees full 100-meter 10GBASE-T compliance.',
  },
  {
    id: 'aplus-25',
    domain: 'Operational Procedures',
    prompt:
      'After resolving a tough BSOD driver crash ticket for an executive, what is the FINAL step of CompTIA’s 6-Step Troubleshooting Methodology?',
    options: [
      'Document findings, root cause, actions taken, and preventive outcomes cleanly in the ticketing/knowledge base',
      'Verify full system functionality',
      'Establish a theory of probable cause',
      'Reboot 3 times without logging',
    ],
    correctIndex: 0,
    explanation:
      'Step 6 closes the loop by documenting symptoms, root cause, verified resolution, and lessons learned inside IT service management logs.',
  },
];

export const COMPTIA_SERVER_PLUS_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'svr-1',
    domain: 'Server Hardware Installation and Management',
    prompt:
      'An administrator is provisioning a 2U rackmount virtualization host in a colocation cage where cold air flows from the front aisle and hot exhaust exits the rear. Why must unused open `U` slots in the rack cabinet be sealed with blanking panels?',
    options: [
      'To prevent hot rear exhaust air from recirculating back into the front cold-aisle server intakes and degrading thermal efficiency',
      'To increase PDU amperage capacity',
      'To amplify Wi-Fi signals inside the cage',
      'To eliminate BGP routing loops',
    ],
    correctIndex: 0,
    explanation:
      'Hot-aisle / cold-aisle containment uses blanking panels so chilled intake air travels strictly through active server chassis rather than mixing with hot exhaust.',
  },
  {
    id: 'svr-2',
    domain: 'Server Hardware Installation and Management',
    prompt:
      'Before racking a new server inside an enterprise datacenter, an engineer must log into the BMC remotely to mount a Linux OS ISO and watch early UEFI POST output even when the host OS is completely down. Which out-of-band interface handles this?',
    options: ['IPMI / iDRAC / iLO Out-of-Band Management Controller', 'Guest OS Remote Desktop (RDP)', 'HTTP Reverse Proxy', 'SMB File Share'],
    correctIndex: 0,
    explanation:
      'Lights-Out / Out-of-Band controllers (Dell iDRAC, HPE iLO, Lenovo XClarity, IPMI) give dedicated console redirection, virtual ISO media, thermal telemetry, and remote power cycling independent of OS state.',
  },
  {
    id: 'svr-3',
    domain: 'Server Hardware Installation and Management',
    prompt:
      'A mission-critical database server requires surviving up to TWO simultaneous hard drive failures inside an array without losing data or interrupting I/O. Which single RAID configuration satisfies two-drive simultaneous parity protection?',
    options: ['RAID 0', 'RAID 5', 'RAID 6 (Dual Distributed Parity)', 'RAID 10 across 2 drives'],
    correctIndex: 2,
    explanation:
      'RAID 6 computes two independent distributed parity blocks (P+Q), tolerating any two simultaneous disk failures cleanly (requiring a minimum of 4 drives).',
  },
  {
    id: 'svr-4',
    domain: 'Server Administration',
    prompt:
      'An enterprise deploys 6 identical stateless web-application servers behind an active load balancer and adds an N+1 redundant PSU pair on every host wired to separate A+B PDU feeds. What failure mode does dual A/B PDU wiring mitigate?',
    options: [
      'Loss of an entire upstream rack PDU / UPS power bus without taking servers offline',
      'SQL Injection vulnerabilities',
      'Expired TLS certificates',
      'Split-brain DNS zones',
    ],
    correctIndex: 0,
    explanation:
      'Dual redundant server PSUs plugged into independent A and B power feeds connected to distinct PDUs/UPS circuits survive a complete single power-feed outage seamlessly.',
  },
  {
    id: 'svr-5',
    domain: 'Server Administration',
    prompt:
      'In storage networking, what differentiates iSCSI SAN block storage from NAS (NFS/SMB) storage?',
    options: [
      'iSCSI presents raw SCSI block LUNs over TCP/IP Ethernet (port 3260) formatted by the server OS; NAS serves shared file hierarchies via NFS/SMB',
      'NAS requires Fibre Channel HBAs exclusively',
      'iSCSI cannot support clustering',
      'NAS operates strictly at Layer 1 physical repeaters',
    ],
    correctIndex: 0,
    explanation:
      'SANs (Fibre Channel / iSCSI) expose raw block devices (`LUNs`) formatted with local filesystems (NTFS/VMFS/ext4), whereas NAS handles filesystem locking/permissions remotely via SMB or NFS.',
  },
  {
    id: 'svr-6',
    domain: 'Server Administration',
    prompt:
      'Two Hyper-V/ESXi cluster hosts lose private heartbeat communication while both stay powered on and attempt to write concurrently to the same shared LUN—risking catastrophic volume corruption. What cluster issue is occurring, and what prevents it?',
    options: [
      'Split-Brain syndrome—mitigated via Quorum Witness / Majority Node Set / STONITH fencing',
      'DHCP starvation—mitigated by changing MTU',
      'ARP storm—mitigated by NTP sync',
      'RAID parity scrubbing',
    ],
    correctIndex: 0,
    explanation:
      'Quorum witness arbitration and STONITH fencing ensure only the partitioned cluster majority retaining quorum stays online during heartbeat splits.',
  },
  {
    id: 'svr-7',
    domain: 'Security and Disaster Recovery',
    prompt:
      'To comply with NIST/ransomware resilience standards (3-2-1-1-0 rule), why should at least ONE backup tier remain air-gapped or configured with Object Lock immutability?',
    options: [
      'To guarantee ransomware operators who compromise Domain Admin credentials cannot encrypt, overwrite, or delete backup snapshots before retention expires',
      'So anyone on the office LAN can delete backups cleanly',
      'To skip verifying restore tests',
      'To disable RAID striping',
    ],
    correctIndex: 0,
    explanation:
      'Immutable (WORM) or offline air-gapped copies defeat credentialed ransomware deletion targeting online backup repositories.',
  },
  {
    id: 'svr-8',
    domain: 'Security and Disaster Recovery',
    prompt:
      'A company signs a Disaster Recovery contract reserving an empty raised-floor datacenter suite equipped with UPS power, cooling HVAC, and fiber circuits—requiring IT staff to ship and rack servers upon crisis declaration. What DR site type is this?',
    options: ['Hot Site', 'Warm Site', 'Cold Site', 'Cloud Active-Active Mirror'],
    correctIndex: 2,
    explanation:
      'Cold sites provide facility infrastructure (power, cooling, floor space) without pre-staged servers/data—lowest ongoing cost with slowest RTO (days/weeks).',
  },
  {
    id: 'svr-9',
    domain: 'Security and Disaster Recovery',
    prompt:
      'While hardening a newly deployed Linux web server inside a DMZ, an admin inspects `ss -tulnp` and finds TCP ports 21 (FTP), 23 (Telnet), and 111 (rpcbind) listening publicly. What server hardening control should follow immediately?',
    options: [
      'Disable unnecessary services/daemons (`systemctl disable --now`), remove unused packages, and restrict ingress via host firewall (`nftables`/`ufw`) + DMZ ACL',
      'Leave all services open and disable SSH password timeouts',
      'Turn off SELinux / AppArmor permanently',
      'Forward all DMZ ports straight into Active Directory DCs',
    ],
    correctIndex: 0,
    explanation:
      'Attack surface reduction stops unused listening daemons and enforces host-based firewall allowlisting (default deny inbound).',
  },
  {
    id: 'svr-10',
    domain: 'Troubleshooting',
    prompt:
      'A Linux application server suddenly fails to write new log files (`No space left on device`), yet running `df -h` shows only 42% disk capacity used on `/var`. What command reveals the exhausted filesystem resource?',
    options: ['`df -i` (100% Inode exhaustion caused by millions of tiny session/temp files)', '`free -m`', '`lsusb`', '`arp -a`'],
    correctIndex: 0,
    explanation:
      'Even with gigabytes of free blocks left, exhausting all filesystem inodes (`df -i` = 100%) prevents creating any new files until millions of orphaned tiny files are purged.',
  },
  {
    id: 'svr-11',
    domain: 'Troubleshooting',
    prompt:
      'Users report intermittent slow SMB file server transfers and fragmented jumbo packets after an engineer set `MTU 9000` ONLY on the server NIC without updating the connected Top-of-Rack switch or client VLANs. What caused the stalls?',
    options: [
      'End-to-end Jumbo Frame MTU mismatch causing packet drops/ICMP Fragmentation Needed blackholes when Path MTU Discovery breaks',
      'ECC RAM correction',
      'NVMe TRIM exhaustion',
      'NTP drift under 10 milliseconds',
    ],
    correctIndex: 0,
    explanation:
      'Jumbo frames (`MTU 9000`) require consistent MTU configuration across EVERY hop (NIC, virtual switch, physical ToR switch, and storage target) along the Layer-2/3 path.',
  },
  {
    id: 'svr-12',
    domain: 'Server Administration',
    prompt:
      'Which Linux kernel security module applies Mandatory Access Control (MAC) contexts confining what directories/ports Apache or PostgreSQL processes may access—even if compromised by a zero-day exploit?',
    options: ['SELinux (Red Hat/RHEL) or AppArmor (Ubuntu)', 'Cron scheduler', 'GRUB2 bootloader', 'NTP daemon'],
    correctIndex: 0,
    explanation:
      'Mandatory Access Control frameworks (SELinux/AppArmor) enforce kernel-level confinement boundaries beyond traditional Discretionary Access Control (DAC) UNIX permissions.',
  },
  {
    id: 'svr-13',
    domain: 'Server Hardware Installation and Management',
    prompt:
      'Why do enterprise servers mandate ECC (Error-Correcting Code) RDIMM memory rather than cheaper consumer non-ECC desktop RAM?',
    options: [
      'ECC detects and automatically corrects single-bit memory flips (and halts gracefully on multi-bit errors), preventing silent kernel panics or database corruption',
      'ECC bypasses BIOS POST completely',
      'ECC replaces local NVMe storage',
      'ECC increases Ethernet fiber link distance to 50 km',
    ],
    correctIndex: 0,
    explanation:
      'Server workloads running 24/7 across 128 GB–2 TB+ RAM experience cosmic-ray/voltage bit flips; ECC preserves runtime stability and database data integrity.',
  },
  {
    id: 'svr-14',
    domain: 'Server Administration',
    prompt:
      'An administrator implements NIC Teaming (LACP IEEE `802.3ad`) across two 25GbE SFP28 uplinks connecting a server to an MLAG/vPC switch pair. What two operational benefits are gained?',
    options: [
      'Link-level high availability (surviving a single transceiver/cable failure) plus aggregated multi-flow throughput across active links',
      'Automated public SSL renewal',
      'Zero-day kernel patching without reboots',
      'Cross-region Azure replication',
    ],
    correctIndex: 0,
    explanation:
      'LACP bonding provides seamless failover if one physical port/cable drops and balances multi-stream sessions across bonded interfaces.',
  },
  {
    id: 'svr-15',
    domain: 'Security and Disaster Recovery',
    prompt:
      'After patching a Windows Server Failover Cluster in production, one node fails to rejoin Active Directory claiming "The trust relationship between this workstation and the primary domain failed." What is a common cause on restored VM snapshots?',
    options: [
      'Restoring an old VM snapshot rolled back the computer machine account password (`krbtgt`/AD machine secret) out of sync with Domain Controllers (or severe >5 min NTP clock skew)',
      'Switching to static IPv4 DNS',
      'Mounting an ISO read-only',
      'Enabling BitLocker on C:',
    ],
    correctIndex: 0,
    explanation:
      'Domain computer accounts rotate machine passwords automatically every 30 days; reverting old VM snapshots creates a secret mismatch resolved via `Test-ComputerSecureChannel -Repair` or rejoining the domain.',
  },
  {
    id: 'svr-16',
    domain: 'Server Administration',
    prompt:
      'In Fibre Channel SAN topologies connecting ESXi hosts to dual storage controllers, what software/driver feature ensures traffic switches smoothly from Path A to Path B if a SAN switch reboots?',
    options: ['MPIO (Multipath I/O)', 'SNMPv1 Trap', 'DHCP Relay Agent', 'Static ARP'],
    correctIndex: 0,
    explanation:
      'MPIO manages redundant HBA/initiator paths to shared storage LUNs for both automatic path failover and active-active I/O load balancing.',
  },
  {
    id: 'svr-17',
    domain: 'Troubleshooting',
    prompt:
      'A high-traffic PostgreSQL database server exhibits sluggish query response despite CPU sitting at only 18%, while `iostat -xz` reports disk `%util` pinned at 99% and high `await` latencies. Where is the hardware bottleneck?',
    options: ['Storage I/O subsystem saturation (IOPS/latency bottleneck on disk array)', 'Insufficient GPU VRAM', 'DNS TTL expiration', 'VLAN ID tag mismatch'],
    correctIndex: 0,
    explanation:
      'Low CPU utilization paired with near-100% storage queue saturation and high I/O wait indicates the CPU is blocked waiting on slow storage IOPS.',
  },
  {
    id: 'svr-18',
    domain: 'Server Hardware Installation and Management',
    prompt:
      'What power metric measures how efficiently a datacenter converts incoming utility grid wattage into actual IT server rack compute vs cooling/UPS overhead (`Total Facility Energy / IT Equipment Energy`)?',
    options: ['PUE (Power Usage Effectiveness)', 'MTBF (Mean Time Between Failures)', 'TDP (Thermal Design Power)', 'IOPS'],
    correctIndex: 0,
    explanation:
      'PUE approaches 1.0 as cooling/electrical losses drop; hyperscale modern datacenters target 1.1–1.2 PUE.',
  },
  {
    id: 'svr-19',
    domain: 'Security and Disaster Recovery',
    prompt:
      'Which physical security control inside high-security server rooms forces visitors to enter one badge/biometric door and wait for it to shut completely before the interior server-floor door unlocks—stopping tailgating?',
    options: ['Mantrap / Access Control Vestibule', 'Cable Management Arm', 'Acoustic Foam Panel', 'RJ45 Dust Boot'],
    correctIndex: 0,
    explanation:
      'Access control vestibules (mantraps) interlock two doors sequentially to eliminate piggybacking and enforce per-person authentication.',
  },
  {
    id: 'svr-20',
    domain: 'Server Administration',
    prompt:
      'Why should production databases run on dedicated bare-metal or thick-provisioned VMDK volumes rather than thin-provisioned disks shared alongside unmonitored test VMs?',
    options: [
      'Unmonitored datastore overcommitment on thin disks can exhaust physical SAN pool space suddenly—freezing all hosted VMs—and pre-allocated blocks reduce fragmentation latency',
      'Thin provisioning deletes NTFS ACLs',
      'Thick disks disable backups',
      'Thin disks double TCP ports',
    ],
    correctIndex: 0,
    explanation:
      'While thin provisioning saves space, over-allocating storage risks catastrophic out-of-space pauses across every VM on the LUN unless strictly monitored.',
  },
  {
    id: 'svr-21',
    domain: 'Troubleshooting',
    prompt:
      'After replacing a failed disk in a 6-drive RAID 5 array, how does the array controller protect data during the 8-hour rebuild—and what happens if a SECOND drive fails mid-rebuild?',
    options: [
      'Data reads reconstruct sectors on the fly via XOR parity (`performance degraded`), and a second disk failure before rebuild finishes causes complete array data loss',
      'RAID 5 silently upgrades itself to RAID 6',
      'Second failure increases write speed',
      'Controller pauses until a 3rd disk drops',
    ],
    correctIndex: 0,
    explanation:
      'RAID 5 tolerates only ONE drive loss; losing a second drive during heavy URE-prone rebuilds breaks parity recovery completely—which is why large multi-TB arrays favor RAID 6 or RAID 10.',
  },
  {
    id: 'svr-22',
    domain: 'Server Administration',
    prompt:
      'Which automation configuration-management tools enforce idempotent desired server state across 200 Linux/Windows nodes without manual SSH edits?',
    options: ['Ansible, Chef, Puppet, or PowerShell DSC', 'Windows Paint & Notepad', 'Manual FTP uploads', 'Wireshark filters'],
    correctIndex: 0,
    explanation:
      'Idempotent configuration management tools apply identical repeatable playbooks/manifests cleanly across fleets regardless of prior drift.',
  },
  {
    id: 'svr-23',
    domain: 'Security and Disaster Recovery',
    prompt:
      'Inside a datacenter fire-suppression zone housing powered live servers, why are clean-agent gas systems (FM-200 / Novec 1230 / Inergen) preferred over standard wet-pipe water sprinklers?',
    options: [
      'Clean-agent gases extinguish fires rapidly without leaving conductive liquid or corrosive residue that ruins energized server boards',
      'Gas systems cool servers below -20°C',
      'Water sprinklers cannot trigger smoke detectors',
      'Gas systems double UPS battery capacity',
    ],
    correctIndex: 0,
    explanation:
      'Clean-agent suppression removes heat/oxygen combustion chemistry safely without flooding live power racks.',
  },
  {
    id: 'svr-24',
    domain: 'Server Hardware Installation and Management',
    prompt:
      'What does a dual-conversion Online UPS (Uninterruptible Power Supply) offer compared to a cheap Standby UPS for sensitive enterprise server racks?',
    options: [
      'Zero transfer-time millisecond gap and continuous power conditioning isolating servers completely from utility sags, spikes, and frequency noise',
      'Infinite runtime without batteries',
      'Built-in Gigabit switching',
      'Automatic HVAC cooling',
    ],
    correctIndex: 0,
    explanation:
      'Online double-conversion UPS units feed inverters continuously from DC bus power, ensuring zero-millisecond cutover and pure sine-wave voltage regulation.',
  },
  {
    id: 'svr-25',
    domain: 'Troubleshooting',
    prompt:
      'Before physically decommissioning an old branch-office Active Directory Domain Controller, what critical cleanup step prevents replication errors ("tombstone/lingering objects") across the remaining enterprise forest?',
    options: [
      'Gracefully demote the Domain Controller (`Uninstall-ADDSDomainController`), transfer any FSMO roles it holds, and confirm clean AD metadata/DNS SRV cleanup before powering off',
      'Unplug its power cord suddenly and shred disks right away',
      'Delete `System32` manually',
      'Change its IP without demoting',
    ],
    correctIndex: 0,
    explanation:
      'Proper DC demotion transfers FSMO roles cleanly, replicates metadata removal out of AD Sites & Services, and removes stale DNS SRV records across the forest.',
  },
];
