import { PracticeQuestion } from '../types';

export const KUBERNETES_CKA_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'cka-1',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'You are asked to upgrade a Kubernetes control plane node from `v1.28.2` to `v1.29.0` using `kubeadm`. What is the correct sequence of commands to execute on the control plane node?',
    options: [
      '1. `apt-get upgrade kubeadm=1.29.0-0` \n2. `kubeadm upgrade plan` \n3. `kubeadm upgrade apply v1.29.0` \n4. `apt-get upgrade kubectl=1.29.0-0 kubelet=1.29.0-0` \n5. `systemctl restart kubelet`',
      '1. `kubectl drain controlplane` \n2. `apt-get upgrade kubelet`',
      '1. `etcdctl snapshot restore` \n2. `kubeadm reset`',
      '1. `systemctl stop kube-apiserver` \n2. `apt-get install kubernetes-dashboard`',
    ],
    correctIndex: 0,
    explanation:
      'The standard kubeadm upgrade workflow for control plane nodes is: 1) Upgrade kubeadm package, 2) Run `kubeadm upgrade plan`, 3) Run `kubeadm upgrade apply`, 4) Unhold/upgrade kubectl and kubelet packages on the local node, and 5) Restart kubelet.',
  },
  {
    id: 'cka-2',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'An etcd cluster hosted on three control plane nodes requires an immediate out-of-band snapshot backup before performing certificate rotation. Which etcdctl command creates a compressed binary snapshot at `/opt/etcd-snapshot.db`?',
    options: [
      'ETCDCTL_API=3 etcdctl snapshot save /opt/etcd-snapshot.db --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key',
      'etcdctl backup --data-dir=/var/lib/etcd /opt/snapshot.db',
      'kubectl create etcdsnapshot /opt/snapshot.db',
      'kubeadm backup etcd --file=/opt/snapshot.db',
    ],
    correctIndex: 0,
    explanation:
      'ETCDCTL v3 requires explicit environment variable `ETCDCTL_API=3`, the snapshot save subcommand, and mTLS client certificates pointing to the local apiserver/etcd CA bundle.',
  },
  {
    id: 'cka-3',
    domain: 'Workloads & Scheduling',
    prompt:
      'A development team wants to deploy a stateless web pod that MUST run specifically on a worker node labeled `disk=ssd`. Which Pod specification field enforces this node affinity requirement?',
    options: [
      '`spec.nodeSelector: {"disk": "ssd"}` or `spec.affinity.nodeAffinity`',
      '`spec.tolerations` with `operator: Exists`',
      '`spec.priorityClassName: high-ssd`',
      '`spec.securityContext.runAsUser: 0`',
    ],
    correctIndex: 0,
    explanation:
      'Node selectors and node affinity rules match pod schedules against node labels (e.g., `disk=ssd`), ensuring pods land exclusively on matching worker nodes.',
  },
  {
    id: 'cka-4',
    domain: 'Workloads & Scheduling',
    prompt:
      'A worker node is marked with taint `app=database:NoSchedule`. A new backend pod is created without any matching toleration. What happens to the pod during scheduling?',
    options: [
      'The pod remains in `Pending` state because it cannot tolerate the node taint',
      'The pod is scheduled onto the tainted node and forces existing pods to evict',
      'The pod runs as a DaemonSet across all control plane nodes',
      'Kubernetes automatically removes the taint to let the pod schedule',
    ],
    correctIndex: 0,
    explanation:
      'Taints repel pods unless the pod explicitly defines a matching `toleration`. Without a toleration, `NoSchedule` prevents placement on that node.',
  },
  {
    id: 'cka-5',
    domain: 'Services & Networking',
    prompt:
      'An engineer needs to expose an internal deployment on port 80 to external traffic via a NodePort service, ensuring external clients hit port `30080`. Which Kubernetes Service configuration snippet achieves this?',
    options: [
      '```yaml\nspec:\n  type: NodePort\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080\n```',
      '```yaml\nspec:\n  type: ClusterIP\n  externalIPs: [30080]\n```',
      '```yaml\nspec:\n  type: ExternalName\n  clusterIP: 30080\n```',
      '```yaml\nspec:\n  type: LoadBalancer\n  port: 30080\n```',
    ],
    correctIndex: 0,
    explanation:
      'A NodePort service type binds an optional static `nodePort` (valid range 30000–32767) on all worker node IPs, forwarding traffic to service `port` -> container `targetPort`.',
  },
  {
    id: 'cka-6',
    domain: 'Storage',
    prompt:
      'A StatefulSet `redis-cluster` requires persistent storage. How does a PersistentVolumeClaim (PVC) template inside a StatefulSet behave compared to a standard Deployment?',
    options: [
      'The StatefulSet controller creates a unique, dedicated PVC for each replica pod (e.g., `data-redis-cluster-0`, `data-redis-cluster-1`) that persists across pod rescheduling',
      'All replicas share a single ReadWriteMany PVC simultaneously without locking',
      'StatefulSets cannot use PersistentVolumeClaims',
      'PVC templates are deleted automatically every time a pod restarts',
    ],
    correctIndex: 0,
    explanation:
      'StatefulSet `volumeClaimTemplates` dynamically provisions a unique PVC for each ordinal replica pod, preserving state when pods scale down and back up.',
  },
  {
    id: 'cka-7',
    domain: 'Troubleshooting',
    prompt:
      'A pod is stuck in `CrashLoopBackOff`. How do you inspect the standard error logs of the previously crashed container instance before it restarted?',
    options: [
      '`kubectl logs <pod-name> --previous`',
      '`kubectl describe pod <pod-name> --tail=all`',
      '`kubectl get events --sort-by=.metadata.creationTimestamp`',
      '`journalctl -u kubelet -e`',
    ],
    correctIndex: 0,
    explanation:
      'The `--previous` flag on `kubectl logs` retrieves log output from the container instance that ran immediately before the current crashed state.',
  },
  {
    id: 'cka-8',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'You need to verify whether service account `pipeline-bot` in namespace `ci-cd` has permissions to create deployments cluster-wide. Which command tests this authorization quickly?',
    options: [
      '`kubectl auth can-i create deployments --as=system:serviceaccount:ci-cd:pipeline-bot`',
      '`kubectl get clusterrolebindings pipeline-bot -o yaml`',
      '`kubectl describe sa pipeline-bot -n ci-cd`',
      '`kubectl check-auth create deployment --user=pipeline-bot`',
    ],
    correctIndex: 0,
    explanation:
      '`kubectl auth can-i` tests whether the current user or simulated identity (`--as`) possesses specific RBAC verb permissions against Kubernetes API resources.',
  },
  {
    id: 'cka-9',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'A Kubernetes cluster administrator needs to safely drain worker node `worker-01` before performing a hardware memory upgrade, ensuring local emptyDir volumes are deleted and DaemonSet pods are skipped. Which command is correct?',
    options: [
      '`kubectl drain worker-01 --ignore-daemonsets --delete-emptydir-data`',
      '`kubectl cordon worker-01 && kubectl delete node worker-01`',
      '`kubectl stop worker-01 --force`',
      '`kubeadm node evacuate worker-01`',
    ],
    correctIndex: 0,
    explanation:
      '`kubectl drain` cordons the node to prevent new schedules and evicts running pods gracefully. `--ignore-daemonsets` prevents errors when evicting system daemonsets, and `--delete-emptydir-data` permits evicting pods using local emptyDir volumes.',
  },
  {
    id: 'cka-10',
    domain: 'Services & Networking',
    prompt:
      'An Ingress resource routing HTTP traffic to backend service `shop-api` fails with 503 Service Unavailable. Which component verifies that Ingress controller pods can reach the backend endpoints?',
    options: [
      '`kubectl get endpoints shop-api` (verifying whether backing pod IPs are listed)',
      '`kubectl get persistentvolumeclaims`',
      '`kubectl describe storageclass`',
      '`kubectl get csr`',
    ],
    correctIndex: 0,
    explanation:
      'An Ingress routes to a Service, which in turn routes to Endpoints. If `kubectl get endpoints` shows 0 endpoints, the service selector matches no running pod labels, causing Ingress 503 errors.',
  },
  {
    id: 'cka-11',
    domain: 'Security',
    prompt:
      'You are asked to create a restrictive NetworkPolicy in namespace `finance` that denies all inbound TCP traffic to pod label `tier=database` except from pods in namespace `frontend` with label `app=checkout`. How do you structure the ingress rule?',
    options: [
      'Use `ingress` rules specifying `from` with both `namespaceSelector` (matching `finance` or frontend NS) and `podSelector` (matching `app=checkout`)',
      'Set `spec.podSelector` to match all IP addresses globally',
      'Disable kube-proxy across all nodes',
      'Create an AWS Security Group inside the pod manifest',
    ],
    correctIndex: 0,
    explanation:
      'Kubernetes NetworkPolicies support fine-grained `ingress` and `egress` rules filtering by `namespaceSelector` and `podSelector` pairs.',
  },
  {
    id: 'cka-12',
    domain: 'Workloads & Scheduling',
    prompt:
      'How does a Kubernetes Liveness probe differ in behavior from a Readiness probe?',
    options: [
      'Liveness probe detects when to restart a failed/dead container; Readiness probe detects when a container is ready to accept incoming network traffic (removing unready pods from Service endpoints)',
      'Liveness probe checks database disk size; Readiness probe checks cluster DNS uptime',
      'Readiness probe runs only once during image pull; Liveness runs every year',
      'There is no functional difference between liveness and readiness probes',
    ],
    correctIndex: 0,
    explanation:
      'Liveness probes restart unresponsive containers; readiness probes control whether traffic routing reaches the pod via Services and Ingress.',
  },
  {
    id: 'cka-13',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'Where does `kubeadm` store static pod manifest files (such as etcd, kube-apiserver, kube-controller-manager, and kube-scheduler) on a control plane node?',
    options: [
      '`/etc/kubernetes/manifests/`',
      '`/var/lib/kubelet/config.json`',
      '`/usr/share/kubernetes/pods/`',
      '`/root/.kube/config`',
    ],
    correctIndex: 0,
    explanation:
      'Kubelet watches `/etc/kubernetes/manifests/` on control plane nodes, automatically starting and supervising control plane components as static pods.',
  },
  {
    id: 'cka-14',
    domain: 'Storage',
    prompt:
      'An administrator deletes a PersistentVolumeClaim (PVC), but the underlying PersistentVolume (PV) with `persistentVolumeReclaimPolicy: Retain` remains in `Released` status. What does `Released` mean?',
    options: [
      'The claim is gone, but the volume data still exists on storage and cannot yet be reclaimed automatically until the administrator manually recycles or deletes the PV',
      'The volume was permanently shredded and wiped clean',
      'The volume is attached to 10 pods simultaneously',
      'The storage provider rejected the disk mount',
    ],
    correctIndex: 0,
    explanation:
      'Under `Retain`, deleting the PVC leaves the PV in `Released` (data preserved, not bound to a new PVC). To reuse it, the PV must be deleted and recreated or manually cleaned.',
  },
  {
    id: 'cka-15',
    domain: 'Troubleshooting',
    prompt:
      'Node `worker-03` reports `NotReady` status. Executing `kubectl describe node worker-03` shows `KubeletNotReady: container runtime is not running`. Which systemd command diagnoses the runtime?',
    options: [
      '`systemctl status containerd` or `systemctl status docker`',
      '`systemctl restart kube-apiserver`',
      '`kubectl uncordon worker-03`',
      '`kubeadm token create`',
    ],
    correctIndex: 0,
    explanation:
      'When worker nodes become NotReady due to container runtime failure, checking `systemctl status containerd` or `crio` reveals why the local runtime daemon stopped.',
  },
  {
    id: 'cka-16',
    domain: 'Workloads & Scheduling',
    prompt:
      'A Deployment needs to guarantee zero downtime during rolling updates, ensuring that during deployment updates, 100% of desired replicas remain available plus extra surge capacity. Which strategy settings achieve this?',
    options: [
      '`strategy.type: RollingUpdate`, `maxSurge: 25%`, `maxUnavailable: 0`',
      '`strategy.type: Recreate`',
      '`maxSurge: 0`, `maxUnavailable: 100%`',
      '`strategy.type: Immediate`',
    ],
    correctIndex: 0,
    explanation:
      '`maxUnavailable: 0` guarantees no existing pods are terminated before new pods pass readiness checks, while `maxSurge` permits temporary extra pods above desired replica count.',
  },
  {
    id: 'cka-17',
    domain: 'Services & Networking',
    prompt:
      'What is the function of CoreDNS inside a Kubernetes cluster?',
    options: [
      'It provides internal cluster DNS resolution so pods can resolve other service names (e.g., `my-service.default.svc.cluster.local`) into cluster IPs',
      'It load balances external HTTPS traffic across public cloud load balancers',
      'It encrypts persistent volumes using AES-256',
      'It stores etcd snapshot backups on S3',
    ],
    correctIndex: 0,
    explanation:
      'CoreDNS runs as a cluster-scoped deployment answering DNS queries for internal services, headless services, and external forwarders.',
  },
  {
    id: 'cka-18',
    domain: 'Security',
    prompt:
      'An administrator creates a Role in namespace `marketing` granting `get`, `list`, `watch` on Pods. How do you bind this Role to user `alice` using a RoleBinding?',
    options: [
      'Create a RoleBinding referencing `roleRef: Role` named "pod-reader" and `subjects: [{kind: User, name: alice}]` in namespace `marketing`',
      'Create a ClusterRoleBinding spanning all namespaces',
      'Edit `/etc/passwd` on every control plane node',
      'Assign an AWS IAM root user password to alice',
    ],
    correctIndex: 0,
    explanation:
      'A RoleBinding maps a namespaced Role to a subject (User, Group, or ServiceAccount) strictly within that same namespace.',
  },
  {
    id: 'cka-19',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'How do you generate a new bootstrap token on an existing cluster control plane node to let a new worker node join via `kubeadm join`?',
    options: [
      '`kubeadm token create --print-join-command`',
      '`kubectl generate token worker`',
      '`etcdctl create-token`',
      '`openssl genrsa -out token.key 2048`',
    ],
    correctIndex: 0,
    explanation:
      '`kubeadm token create --print-join-command` generates a valid bootstrap token and outputs the exact `kubeadm join` command needed for worker nodes.',
  },
  {
    id: 'cka-20',
    domain: 'Troubleshooting',
    prompt:
      'A pod cannot mount a Secret because of error `Secret "db-credentials" not found`. However, you verified the secret exists in namespace `default`. What is the most likely cause?',
    options: [
      'The pod and the secret are in different namespaces (Kubernetes secrets are namespaced resources)',
      'The secret name has uppercase letters',
      'Secrets cannot be mounted into pods as environment variables',
      'The node ran out of RAM',
    ],
    correctIndex: 0,
    explanation:
      'Namespaces isolate Secrets. A pod in namespace `dev` cannot reference a secret in namespace `default` unless using cross-namespace controller tools or recreating the secret locally.',
  },
  {
    id: 'cka-21',
    domain: 'Workloads & Scheduling',
    prompt:
      'A Job is configured with `completions: 5` and `parallelism: 2`. How does the Job controller execute the pods?',
    options: [
      'It runs up to 2 pods concurrently until a total of 5 successful pod completions are achieved',
      'It runs 5 pods simultaneously exactly once',
      'It runs 10 pods in a continuous infinite loop',
      'It runs pods sequentially one at a time until 10 completions',
    ],
    correctIndex: 0,
    explanation:
      '`parallelism` limits concurrent pods running at once, while `completions` specifies the total number of successful pod completions required to finish the Job.',
  },
  {
    id: 'cka-22',
    domain: 'Services & Networking',
    prompt:
      'Which Kubernetes object allows defining external domain names (e.g., `db.external.com`) as internal cluster service endpoints so pods can talk to external databases via standard DNS names?',
    options: [
      'ExternalName Service (`type: ExternalName`)',
      'DaemonSet',
      'StorageClass',
      'PodDisruptionBudget',
    ],
    correctIndex: 0,
    explanation:
      'An `ExternalName` service maps a service to a DNS name without proxying, returning a CNAME record for internal queries.',
  },
  {
    id: 'cka-23',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'What is the purpose of a PodDisruptionBudget (PDB) during voluntary node disruptions like `kubectl drain` or cluster upgrades?',
    options: [
      'It specifies the minimum number or percentage of replicas that must remain available during voluntary disruptions, protecting application availability',
      'It limits CPU consumption per container',
      'It restricts cluster node autoscaling to max 10 nodes',
      'It enforces TLS 1.3 encryption on internal cluster traffic',
    ],
    correctIndex: 0,
    explanation:
      'PDBs prevent node drains from evicting too many pods simultaneously, ensuring applications maintain minimum required replica availability during maintenance.',
  },
  {
    id: 'cka-24',
    domain: 'Storage',
    prompt:
      'How does a StorageClass provision dynamic PersistentVolumes (PVs) when a PersistentVolumeClaim (PVC) is submitted?',
    options: [
      'The StorageClass specifies a provisioner plugin (e.g., `ebs.csi.aws.com` or `pd.csi.storage.gke.io`) that automatically calls cloud APIs to create underlying cloud disks on demand',
      'It formats physical floppy disks on control plane nodes',
      'It copies local container logs into RAM',
      'It mounts NFS shares manually via bash scripts',
    ],
    correctIndex: 0,
    explanation:
      'StorageClasses act as templates with CSI provisioners that dynamically provision storage backend volumes when matched with a PVC.',
  },
  {
    id: 'cka-25',
    domain: 'Troubleshooting',
    prompt:
      'You suspect a network policy is blocking traffic between two namespaces. How can you quickly test TCP connectivity from pod `source-pod` to `target-svc.production.svc.cluster.local:80`?',
    options: [
      '`kubectl exec -it source-pod -- nc -zv target-svc.production 80` or `curl`',
      '`kubectl ping target-svc`',
      '`kubectl trace-route`',
      '`systemctl restart networking`',
    ],
    correctIndex: 0,
    explanation:
      'Using `kubectl exec` to run `nc`, `curl`, or `telnet` from inside the source pod validates actual network policy reachability.',
  },
  {
    id: 'cka-26',
    domain: 'Workloads & Scheduling',
    prompt:
      'What is the key difference between a Deployment and a DaemonSet?',
    options: [
      'A Deployment runs a specified number of replica pods across any available cluster nodes; a DaemonSet guarantees that exactly one copy of a pod runs on ALL (or selected) cluster worker nodes',
      'DaemonSets cannot run container images',
      'Deployments only run on control plane nodes',
      'DaemonSets are stateless while Deployments are stateful',
    ],
    correctIndex: 0,
    explanation:
      'DaemonSets ensure background node agents (logging, networking, monitoring) run on every worker node automatically as new nodes join.',
  },
  {
    id: 'cka-27',
    domain: 'Services & Networking',
    prompt:
      'What does a ClusterIP service type do by default?',
    options: [
      'Exposes the service on a cluster-internal IP address accessible only from within the cluster (not reachable from external clients)',
      'Exposes the service on every node’s public IP address',
      'Routes external traffic via BGP routing',
      'Deletes pods when traffic spikes',
    ],
    correctIndex: 0,
    explanation:
      'ClusterIP is the default internal-only service type, providing load-balanced internal pod communication.',
  },
  {
    id: 'cka-28',
    domain: 'Security',
    prompt:
      'An auditor wants to ensure no pods run with root privileges (`runAsUser: 0`) or privileged containers across the entire cluster. Which built-in Kubernetes admission mechanism enforces this?',
    options: [
      'ValidatingAdmissionPolicy or Pod Security Standards (Restricted / Baseline profiles)',
      'Changing root passwords in `/etc/shadow`',
      'Disabling ServiceAccounts',
      'Using HTTP instead of HTTPS for kubelet',
    ],
    correctIndex: 0,
    explanation:
      'Pod Security Standards (Enforce/Audit/Warn namespaces with Privileged, Baseline, or Restricted profiles) and ValidatingAdmissionPolicies enforce container security policies natively.',
  },
  {
    id: 'cka-29',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'How do you check the health status of all core control plane components (`etcd`, `kube-scheduler`, `kube-controller-manager`) using `kubectl`?',
    options: [
      '`kubectl get componentstatuses` (or checking static pod health / apiserver healthz endpoints)',
      '`kubectl get nodes --health`',
      '`kubectl cluster-info check`',
      '`kubeadm health`',
    ],
    correctIndex: 0,
    explanation:
      '`kubectl get componentstatuses` (or `kubectl get cs`) queries control plane component health endpoints, though inspecting static pods in `/etc/kubernetes/manifests` is also standard.',
  },
  {
    id: 'cka-30',
    domain: 'Troubleshooting',
    prompt:
      'A pod fails to start with error `Multi-Attach error for volume "pvc-xxx" Volume is already exclusively attached to node worker-01 and is not available for node worker-02`. What is the fix?',
    options: [
      'The previous pod on worker-01 is stuck terminating (e.g., node not responding); force delete or fix worker-01 so the volume unmounts before attaching to worker-02',
      'Increase the replica count to 10',
      'Delete the StorageClass',
      'Reboot etcd',
    ],
    correctIndex: 0,
    explanation:
      'Cloud block storage (like AWS EBS or Azure Managed Disks) can typically attach to only one node at a time (ReadWriteOnce). If a pod is forcefully rescheduled to worker-02 while worker-01 still holds the lock, a Multi-Attach error occurs until the old node detaches.',
  },
  {
    id: 'cka-31',
    domain: 'Workloads & Scheduling',
    prompt:
      'What is the purpose of an InitContainer in a Pod specification?',
    options: [
      'To run initialization tasks (like database migrations or pulling config files) that must complete successfully BEFORE any app containers in the pod start',
      'To monitor CPU temperature and fan speeds',
      'To handle zero-downtime rolling upgrades',
      'To provide persistent storage mounts',
    ],
    correctIndex: 0,
    explanation:
      'InitContainers run sequentially to completion before app containers start. If an init container fails, Kubernetes restarts it until it succeeds (unless `restartPolicy: Never`).',
  },
  {
    id: 'cka-32',
    domain: 'Services & Networking',
    prompt:
      'How do Ingress controllers process incoming external traffic compared to NodePort or LoadBalancer services?',
    options: [
      'An Ingress acts as an intelligent Layer 7 HTTP/HTTPS reverse proxy and load balancer, routing multiple domain names and URL paths to internal services through a single public IP',
      'An Ingress opens raw Layer 4 TCP ports 1 through 65535 on every node',
      'An Ingress replaces internal DNS CoreDNS entirely',
      'An Ingress only works with IPv6 addresses',
    ],
    correctIndex: 0,
    explanation:
      'Ingress controllers (like NGINX, Traefik, or HAProxy) consolidate HTTP/HTTPS routing, TLS termination, and path-based routing rules.',
  },
  {
    id: 'cka-33',
    domain: 'Security',
    prompt:
      'What is the purpose of a Kubernetes ServiceAccount compared to a regular User Account?',
    options: [
      'ServiceAccounts provide digital identities for processes running inside pods to authenticate securely to the Kubernetes API server, whereas User Accounts are managed externally',
      'ServiceAccounts manage corporate email logins',
      'ServiceAccounts replace Linux SSH passwords',
      'ServiceAccounts are used exclusively by etcd',
    ],
    correctIndex: 0,
    explanation:
      'ServiceAccounts are managed by Kubernetes for in-cluster workloads/pods to interact securely with the API server using projected tokens.',
  },
  {
    id: 'cka-34',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'When troubleshooting a worker node that failed to join the cluster via `kubeadm join`, where are the primary kubelet startup and runtime error logs recorded?',
    options: [
      '`journalctl -u kubelet -e`',
      '`/var/log/apiserver.log`',
      '`kubectl get kubelet-logs`',
      '`/etc/kubernetes/kubelet.err`',
    ],
    correctIndex: 0,
    explanation:
      'Kubelet runs as a native systemd service on Linux nodes, so its operational logs are captured via `journalctl -u kubelet`.',
  },
  {
    id: 'cka-35',
    domain: 'Storage',
    prompt:
      'What does the `volumeMode: Block` setting in a PersistentVolumeClaim specify?',
    options: [
      'It provisions a raw block device (raw disk block) rather than a formatted filesystem mount, suitable for databases requiring raw block access',
      'It blocks all users from reading the disk',
      'It compresses the volume using gzip',
      'It mounts the disk as a read-only ISO image',
    ],
    correctIndex: 0,
    explanation:
      'Volume mode can be `Filesystem` (default, formatted with ext4/xfs) or `Block` (raw unformatted block device exposed to the pod).',
  },
  {
    id: 'cka-36',
    domain: 'Troubleshooting',
    prompt:
      'A pod is crashing because it exceeds its container memory limit (`OOMKilled`). Which command and fields confirm this diagnosis?',
    options: [
      '`kubectl describe pod <pod-name>` showing `OOMKilled: true` and Exit Code `137`',
      '`kubectl get memory --surplus`',
      '`systemctl status oom-killer`',
      '`etcdctl check memory`',
    ],
    correctIndex: 0,
    explanation:
      'Exit code 137 indicates a process was terminated by the Linux kernel Out-Of-Memory (OOM) killer because container memory usage exceeded its `resources.limits.memory`.',
  },
  {
    id: 'cka-37',
    domain: 'Workloads & Scheduling',
    prompt:
      'How does a Horizontal Pod Autoscaler (HPA) scale a Deployment?',
    options: [
      'It queries metrics (CPU/Memory utilization or custom metrics from Metrics Server) and automatically adjusts the Deployment `replicas` count between `minReplicas` and `maxReplicas`',
      'It adds physical RAM sticks to worker nodes automatically',
      'It increases node CPU count without restarting pods',
      'It scales down pods during high traffic spikes',
    ],
    correctIndex: 0,
    explanation:
      'HPA continuously monitors metrics via Metrics Server and scales replica counts up or down to maintain target utilization thresholds.',
  },
  {
    id: 'cka-38',
    domain: 'Services & Networking',
    prompt:
      'What is a headless service (`clusterIP: None`) used for in Kubernetes?',
    options: [
      'It does not allocate a cluster IP; instead, DNS returns the individual IP addresses of all backing pods directly, enabling clients to connect to specific pods (commonly used with StatefulSets)',
      'It disables all networking to secure the cluster against hackers',
      'It routes traffic exclusively over Bluetooth',
      'It prevents pods from resolving DNS names',
    ],
    correctIndex: 0,
    explanation:
      'Headless services omit a cluster IP, returning A records directly pointing to individual pod IPs for direct peer discovery in StatefulSets.',
  },
  {
    id: 'cka-39',
    domain: 'Security',
    prompt:
      'What is the function of a Kubernetes MutatingWebhookConfiguration?',
    options: [
      'It intercepts API requests to modify or enrich object specifications (e.g., automatically injecting sidecar containers or default labels) BEFORE they are stored in etcd',
      'It validates user passwords during SSH login',
      'It blocks all HTTP POST requests globally',
      'It encrypts cluster databases at rest',
    ],
    correctIndex: 0,
    explanation:
      'Admission webhooks include Mutating (which can modify incoming manifests) and Validating (which accept or reject manifests based on policy rules).',
  },
  {
    id: 'cka-40',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'How do you check the exact Kubernetes version of the API server and client tools?',
    options: [
      '`kubectl version` (or querying `/version` endpoint)',
      '`kubeadm version-check`',
      '`cat /etc/kubernetes/version.txt`',
      '`uname -r`',
    ],
    correctIndex: 0,
    explanation:
      '`kubectl version` displays both client-side kubectl version and server-side Kubernetes control plane version.',
  },
  {
    id: 'cka-41',
    domain: 'Troubleshooting',
    prompt:
      'A pod cannot pull its container image from a private container registry, failing with `ErrImagePull` or `ImagePullBackOff`. What object must be created and referenced in the pod spec?',
    options: [
      'A `kubernetes.io/dockerconfigjson` Secret containing registry credentials, referenced via `imagePullSecrets`',
      'A ClusterRoleBinding',
      'A PersistentVolume',
      'An Ingress TLS certificate',
    ],
    correctIndex: 0,
    explanation:
      'Private registries require image pull secrets (`imagePullSecrets`) supplying valid username/token credentials for authenticated image downloads.',
  },
  {
    id: 'cka-42',
    domain: 'Workloads & Scheduling',
    prompt:
      'What is a CronJob used for in Kubernetes?',
    options: [
      'Running Job objects on a time-based schedule expressed in standard cron format (e.g., `0 2 * * *` for nightly backups)',
      'Running web servers that listen on port 443 permanently',
      'Synchronizing time across cluster nodes via NTP',
      'Updating SSL certificates automatically',
    ],
    correctIndex: 0,
    explanation:
      'CronJobs manage time-based scheduling, creating Job instances according to a cron schedule.',
  },
  {
    id: 'cka-43',
    domain: 'Services & Networking',
    prompt:
      'Which component in a standard Kubernetes cluster translates Service and Ingress rules into actual packet forwarding rules on each worker node (using iptables or IPVS)?',
    options: [
      '`kube-proxy`',
      '`kubelet`',
      '`etcd`',
      '`coredns`',
    ],
    correctIndex: 0,
    explanation:
      '`kube-proxy` runs on every worker node maintaining network rules (`iptables` or `IPVS`) that enable TCP/UDP connection forwarding to pod endpoints.',
  },
  {
    id: 'cka-44',
    domain: 'Security',
    prompt:
      'What is the purpose of TLS bootstrapping in `kubeadm`?',
    options: [
      'It allows new worker nodes joining the cluster to securely request and receive their own TLS client certificates signed by the cluster CA automatically',
      'It encrypts user browser cookies with RSA-4096',
      'It generates SSH keys for admin root logins',
      'It replaces the need for DNS resolution',
    ],
    correctIndex: 0,
    explanation:
      'TLS bootstrapping automates secure certificate issuance for worker node kubelets joining the cluster using temporary bootstrap tokens.',
  },
  {
    id: 'cka-45',
    domain: 'Cluster Architecture, Installation & Configuration',
    prompt:
      'You need to backup all Kubernetes resource definitions (Deployments, Services, ConfigMaps) across all namespaces for disaster recovery. Which native or community tool is standard for cluster-wide state backup?',
    options: [
      'Heptio/VMware Velero (or script looping `kubectl get all -A -o yaml`)',
      'etcdctl snapshot save only',
      'tar -czvf /backup.tar.gz /etc/kubernetes',
      'mysqldump cluster_db',
    ],
    correctIndex: 0,
    explanation:
      'While etcd snapshots capture raw database state, tools like Velero snapshot Kubernetes API objects and persistent volumes into object storage for robust namespace/cluster restoration.',
  },
];

export const TERRAFORM_ASSOC_QUESTIONS_EXT: PracticeQuestion[] = [
  {
    id: 'tf-1',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'What is the primary role of the Terraform State file (`terraform.tfstate`), and why should it be stored remotely with state locking enabled?',
    options: [
      'It maps real-world cloud resources to your HCL configuration; remote storage with DynamoDB/GCS locking prevents concurrent apply races and state corruption by multiple engineers',
      'It compiles HCL code directly into raw machine bytecode binaries for AWS EC2 execution',
      'It stores plaintext root passwords and AWS secret access keys for public download',
      'It replaces git version control entirely for application source code',
    ],
    correctIndex: 0,
    explanation:
      'Terraform state maintains metadata mapping between HCL configurations and provisioned cloud infrastructure. Remote backends (S3 + DynamoDB) prevent simultaneous write collisions via state locking.',
  },
  {
    id: 'tf-2',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'An engineer runs `terraform apply` and notices a resource attribute is marked for destruction and recreation (`-/+`) even though the HCL code was unchanged. What command reveals why Terraform calculated this change?',
    options: [
      '`terraform plan`',
      '`terraform validate`',
      '`terraform fmt`',
      '`terraform graph`',
    ],
    correctIndex: 0,
    explanation:
      '`terraform plan` compares current state against HCL configuration and real-world provider APIs, detailing whether changes will be in-place (`~`), created (`+`), or destroyed/recreated (`-/+`).',
  },
  {
    id: 'tf-3',
    domain: 'Configuration Language & Variables',
    prompt:
      'How do Terraform Input Variables (`variable`), Local Values (`local`), and Output Values (`output`) differ in scope and usage?',
    options: [
      'Variables accept parameterized inputs from users/TFRUNS; Locals simplify complex expressions or expressions reused internally within a module; Outputs expose values for root module consumption or remote state data sources',
      'Variables can only store boolean flags; Locals store database passwords',
      'Outputs are mandatory before any resource can be provisioned',
      'There is no functional difference between variables and locals',
    ],
    correctIndex: 0,
    explanation:
      'Input variables customize module execution, locals encapsulate repeating intermediate calculations, and outputs return attributes for dependent modules or parent stacks.',
  },
  {
    id: 'tf-4',
    domain: 'Modules & Code Reusability',
    prompt:
      'When calling a child module from a git repository URL (`source = "git::https://github.com/org/terraform-aws-vpc.git?ref=v2.0.0"`), which command must run before `terraform plan` or `terraform apply`?',
    options: [
      '`terraform init`',
      '`terraform refresh`',
      '`terraform import`',
      '`terraform workspace new`',
    ],
    correctIndex: 0,
    explanation:
      '`terraform init` downloads provider plugins, initializes backend storage, and clones remote module sources specified in HCL into the local `.terraform/modules` directory.',
  },
  {
    id: 'tf-5',
    domain: 'State Management & Importing',
    prompt:
      'An existing AWS S3 bucket was created manually in the console and needs to be managed by Terraform without destroying or recreating it. Which workflow accomplishes this?',
    options: [
      '1. Write the matching `aws_s3_bucket` resource block in HCL \n2. Run `terraform import aws_s3_bucket.my_bucket existing-bucket-name` \n3. Run `terraform plan` to reconcile any drift',
      'Delete the manual S3 bucket and run `terraform apply`',
      'Run `terraform destroy` followed by `terraform apply`',
      'Set `prevent_destroy = false` inside provider block',
    ],
    correctIndex: 0,
    explanation:
      '`terraform import` binds pre-existing cloud resources into Terraform state matching an existing HCL resource address.',
  },
  {
    id: 'tf-6',
    domain: 'Terraform Cloud & Enterprise',
    prompt:
      'What is the difference between `count` and `for_each` meta-arguments when provisioning multiple cloud resources in Terraform?',
    options: [
      '`count` indexes resources as a list (`[0], [1]`), meaning removing an item from the middle shifts all subsequent indices; `for_each` indexes resources by unique strings or map keys, preventing accidental destruction when items are removed',
      '`count` is deprecated and syntax errors in Terraform 1.6+',
      '`for_each` only works with AWS EC2 instances',
      'There is no state tracking difference between count and for_each',
    ],
    correctIndex: 0,
    explanation:
      '`for_each` maps resources by key/name strings, ensuring stable state addresses when list elements change, whereas `count` relies on integer indices.',
  },
  {
    id: 'tf-7',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'What is the purpose of the `required_version` constraint inside the `terraform` settings block?',
    options: [
      'It enforces a specific Terraform CLI binary version range (e.g., `>= 1.5.0, < 2.0.0`) to prevent syntax incompatibility across team members',
      'It restricts AWS provider version releases',
      'It forces Terraform to run exclusively on Linux servers',
      'It automatically upgrades operating system kernels',
    ],
    correctIndex: 0,
    explanation:
      '`required_version` ensures that anyone executing the configuration uses a compatible Terraform CLI version.',
  },
  {
    id: 'tf-8',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'An engineer wants to test infrastructure changes without modifying production state or cloud resources. Which command generates an execution plan saved to a file for review?',
    options: [
      '`terraform plan -out=tfplan`',
      '`terraform validate --dry-run`',
      '`terraform apply --offline`',
      '`terraform check`',
    ],
    correctIndex: 0,
    explanation:
      '`terraform plan -out=tfplan` saves a binary execution plan that can later be passed directly to `terraform apply tfplan` to guarantee exact execution consistency.',
  },
  {
    id: 'tf-9',
    domain: 'Configuration Language & Variables',
    prompt:
      'How do you pass input variables into a Terraform execution non-interactively in CI/CD pipelines without typing them manually?',
    options: [
      'Using `-var="key=value"` flags, `*.auto.tfvars` files, or environment variables prefixed with `TF_VAR_` (e.g., `TF_VAR_db_password=Secret`)',
      'Writing credentials directly inside plaintext `.tf` files committed to public GitHub',
      'Hardcoding variables inside provider metadata blocks',
      'Prompting via interactive popup dialogs only',
    ],
    correctIndex: 0,
    explanation:
      'Automation pipelines pass variables securely via `-var`, tfvars files, or `TF_VAR_` environment variables.',
  },
  {
    id: 'tf-10',
    domain: 'Modules & Code Reusability',
    prompt:
      'What is the function of the `outputs` block defined inside a Terraform child module?',
    options: [
      'It explicitly exposes child module resource attributes so root modules or parent callers can reference them (e.g., `module.vpc.subnet_ids`)',
      'It prints logs to the system console during resource destruction',
      'It disables cloud billing alerts',
      'It creates S3 backup buckets automatically',
    ],
    correctIndex: 0,
    explanation:
      'Child module outputs pass data outward to the calling module or root configuration.',
  },
  {
    id: 'tf-11',
    domain: 'State Management & Importing',
    prompt:
      'What happens if two engineers run `terraform apply` simultaneously on the same local state file without backend locking?',
    options: [
      'State corruption occurs as concurrent writes overwrite each other, causing resource tracking divergence and orphaned cloud resources',
      'Terraform automatically merges both engineers’ edits using Git conflict resolution',
      'The second apply waits politely in a queue for 30 days',
      'AWS blocks the API calls automatically',
    ],
    correctIndex: 0,
    explanation:
      'Without distributed state locking (e.g., S3 + DynamoDB), concurrent applies corrupt the state file JSON structure.',
  },
  {
    id: 'tf-12',
    domain: 'Terraform Cloud & Enterprise',
    prompt:
      'How does Terraform handle resource dependency ordering automatically during `terraform apply`?',
    options: [
      'Terraform parses expression references (implicit dependencies, e.g., `aws_subnet.main.id` referencing `aws_vpc.main.id`) and builds a Directed Acyclic Graph (DAG) to execute tasks in correct order',
      'Resources are created strictly in alphabetical order of resource names',
      'Engineers must manually script bash sleep timers between resource creations',
      'All resources deploy simultaneously in random threads',
    ],
    correctIndex: 0,
    explanation:
      'Terraform builds a Directed Acyclic Graph (DAG) evaluating implicit dependencies and explicit `depends_on` relationships to determine execution order.',
  },
  {
    id: 'tf-13',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'What is the purpose of the `terraform fmt` command?',
    options: [
      'It automatically formats HCL configuration files to canonical formatting style guidelines',
      'It formats cloud hard drives into ext4 filesystems',
      'It converts JSON logs into CSV spreadsheets',
      'It deletes unused Terraform state files',
    ],
    correctIndex: 0,
    explanation:
      '`terraform fmt` rewrites HCL files to canonical spacing, indentation, and alignment standards.',
  },
  {
    id: 'tf-14',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'When should you use the explicit `depends_on` meta-argument in Terraform?',
    options: [
      'When there is a hidden or implicit runtime dependency between resources that Terraform cannot automatically infer through expression references',
      'To make every resource deploy slower for debugging',
      'To disable state locking in production',
      'To force Terraform to use AWS instead of Azure',
    ],
    correctIndex: 0,
    explanation:
      'Explicit `depends_on` handles situations where one resource relies on another’s operational completion without directly referencing its attributes.',
  },
  {
    id: 'tf-15',
    domain: 'Configuration Language & Variables',
    prompt:
      'What is a Terraform Dynamic Block used for?',
    options: [
      'It dynamically constructs repeatable nested configuration blocks (such as ingress rules in security groups or IAM policy statements) based on lists or maps',
      'It dynamically generates new AWS accounts overnight',
      'It compiles TypeScript code into HCL',
      'It bypasses Terraform provider validation rules',
    ],
    correctIndex: 0,
    explanation:
      'Dynamic blocks construct repeating nested blocks within resource definitions cleanly from collection variables.',
  },
  {
    id: 'tf-16',
    domain: 'Modules & Code Reusability',
    prompt:
      'Where are third-party Terraform modules published publicly for community reuse?',
    options: [
      'The Terraform Registry (`registry.terraform.io`)',
      'The Docker Hub Container Registry',
      'The Python PyPI Package Index',
      'The Microsoft NuGet Gallery',
    ],
    correctIndex: 0,
    explanation:
      'The Terraform Registry hosts verified and community modules for AWS, Azure, GCP, Kubernetes, and more.',
  },
  {
    id: 'tf-17',
    domain: 'State Management & Importing',
    prompt:
      'What command moves a resource from one address to another in state without modifying cloud infrastructure (e.g., refactoring resource blocks)?',
    options: [
      '`terraform state mv`',
      '`terraform rename`',
      '`terraform refresh`',
      '`terraform taint`',
    ],
    correctIndex: 0,
    explanation:
      '`terraform state mv` updates resource addresses inside `terraform.tfstate` during refactoring without destroying real cloud resources.',
  },
  {
    id: 'tf-18',
    domain: 'Terraform Cloud & Enterprise',
    prompt:
      'What is the purpose of Terraform Workspaces in open-source Terraform?',
    options: [
      'They maintain multiple independent state files sharing a single configuration directory (commonly used to manage dev, staging, and prod environments)',
      'They allow multiple engineers to edit the exact same state file simultaneously without locking',
      'They compile HCL code into iOS and Android mobile apps',
      'They provide free GPU cluster training for LLMs',
    ],
    correctIndex: 0,
    explanation:
      'Workspaces isolate state files within the same working directory configuration, though for strict environment separation, dedicated backend folders or directory layouts are often preferred.',
  },
  {
    id: 'tf-19',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'What is a Terraform Provider?',
    options: [
      'A plugin responsible for understanding API interactions and translating HCL resource declarations into actual cloud API calls (e.g., `registry.terraform.io/hashicorp/aws`)',
      'A financial lending institution funding cloud bills',
      'An IAM user account with AdministratorAccess',
      'A local caching proxy server for apt-get packages',
    ],
    correctIndex: 0,
    explanation:
      'Providers are plugins that interface Terraform core with cloud platforms, SaaS tools, and API endpoints.',
  },
  {
    id: 'tf-20',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'What happens during `terraform destroy`?',
    options: [
      'Terraform calculates a plan to delete all managed cloud resources defined in the configuration in reverse dependency order',
      'It formats the local hard drive and deletes git history',
      'It upgrades Terraform CLI to the latest major version',
      'It deletes the Terraform Registry website',
    ],
    correctIndex: 0,
    explanation:
      '`terraform destroy` tears down all resources managed by the state in reverse DAG order.',
  },
  {
    id: 'tf-21',
    domain: 'Configuration Language & Variables',
    prompt:
      'How do you define a sensitive input variable in Terraform so its value is redacted in CLI plan and apply output logs?',
    options: [
      'Setting `sensitive = true` inside the `variable "db_password"` block',
      'Writing the password in uppercase letters',
      'Storing the password in `README.md`',
      'Disabling terraform logging entirely',
    ],
    correctIndex: 0,
    explanation:
      '`sensitive = true` masks variable values in CLI output logs to prevent accidental credential disclosure.',
  },
  {
    id: 'tf-22',
    domain: 'Modules & Code Reusability',
    prompt:
      'When writing a reusable module, why should you avoid hardcoding region names or AWS account IDs inside resource definitions?',
    options: [
      'It violates module encapsulation and reusability; variables should parameterize region, environment, and naming prefixes',
      'Hardcoding region names causes Terraform CLI syntax errors',
      'AWS blocks non-hardcoded regions automatically',
      'It reduces S3 storage bucket durability',
    ],
    correctIndex: 0,
    explanation:
      'Modules should be parameterized with input variables so the same module code deploys across multiple regions and environments.',
  },
  {
    id: 'tf-23',
    domain: 'State Management & Importing',
    prompt:
      'What does `terraform state pull` do?',
    options: [
      'It downloads and outputs the remote state file from the backend storage to standard output (CLI)',
      'It pulls code updates from GitHub',
      'It refreshes local IP routing tables',
      'It downloads new provider plugins',
    ],
    correctIndex: 0,
    explanation:
      '`terraform state pull` retrieves and displays the active remote state JSON file.',
  },
  {
    id: 'tf-24',
    domain: 'Terraform Cloud & Enterprise',
    prompt:
      'What is the advantage of sentinel or run tasks in Terraform Cloud / Enterprise?',
    options: [
      'They enforce policy-as-code guardrails (e.g., blocking plans that attempt to create unencrypted S3 buckets or disallowed VM sizes) before apply execution',
      'They speed up AWS EC2 boot times by 500%',
      'They automatically pay your monthly cloud invoice',
      'They replace Terraform state files with spreadsheets',
    ],
    correctIndex: 0,
    explanation:
      'Policy-as-code enforces security and compliance governance checks automatically during the plan phase.',
  },
  {
    id: 'tf-25',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'Which file extension is universally used for Terraform configuration source files written in HashiCorp Configuration Language (HCL)?',
    options: [
      '`.tf` (and `.tfvars` for variable values)',
      '`.py`',
      '`.js`',
      '`.json` exclusively',
    ],
    correctIndex: 0,
    explanation:
      'Terraform reads all files ending in `.tf` and `.tf.json` in the working directory.',
  },
  {
    id: 'tf-26',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'What is the purpose of the `terraform validate` command?',
    options: [
      'It checks HCL configuration files for syntactical correctness and internal consistency without contacting cloud provider APIs',
      'It tests network latency to AWS datacenters',
      'It validates employee security clearance badges',
      'It runs unit tests on Python backend code',
    ],
    correctIndex: 0,
    explanation:
      '`terraform validate` verifies syntax and module structure locally without API calls.',
  },
  {
    id: 'tf-27',
    domain: 'Configuration Language & Variables',
    prompt:
      'What is a Terraform `data source` used for?',
    options: [
      'It allows Terraform to query and fetch information from outside its state file (such as querying existing AWS VPC IDs or AMI IDs created outside current configuration)',
      'It acts as a primary database for user web traffic',
      'It stores permanent backups of Terraform state',
      'It replaces S3 object storage buckets',
    ],
    correctIndex: 0,
    explanation:
      'Data sources let Terraform read external resource attributes without managing their lifecycle.',
  },
  {
    id: 'tf-28',
    domain: 'Modules & Code Reusability',
    prompt:
      'Can a Terraform module call another child module (nested modules)?',
    options: [
      'Yes, Terraform supports multi-tier nested module architectures',
      'No, nesting modules causes infinite recursion crashes',
      'Only if written in Python or Go',
      'Only when using local file storage backends',
    ],
    correctIndex: 0,
    explanation:
      'Terraform fully supports composing complex architectures through nested module hierarchies.',
  },
  {
    id: 'tf-29',
    domain: 'State Management & Importing',
    prompt:
      'How does `terraform refresh` update the state file?',
    options: [
      'It queries real-world cloud provider APIs to update local state metadata with any out-of-band changes, without modifying actual infrastructure',
      'It destroys and recreates all cloud resources',
      'It reboots local computer networking',
      'It deletes the state file entirely',
    ],
    correctIndex: 0,
    explanation:
      '`terraform refresh` reconciles local state with real-world infrastructure metadata (though automatic refresh is built into plan/apply in recent Terraform versions).',
  },
  {
    id: 'tf-30',
    domain: 'Terraform Cloud & Enterprise',
    prompt:
      'What is the purpose of the `.terraform.lock.hcl` file?',
    options: [
      'It locks provider versions and checksums to guarantee consistent, secure provider plugin installations across team members and CI/CD pipelines',
      'It locks user access to AWS consoles',
      'It encrypts Terraform state files with RSA keys',
      'It prevents git commits containing passwords',
    ],
    correctIndex: 0,
    explanation:
      'Dependency lock files ensure exact provider binary versions and cryptographic checksums are used across environments.',
  },
  {
    id: 'tf-31',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'What is HCL (HashiCorp Configuration Language)?',
    options: [
      'A declarative configuration language designed to be human-readable and machine-friendly for defining cloud infrastructure',
      'An imperative programming language like C++',
      'A database query language for PostgreSQL',
      'A CSS framework for frontend web design',
    ],
    correctIndex: 0,
    explanation:
      'HCL is HashiCorp’s declarative configuration language used across Terraform, Vault, Consul, and Nomad.',
  },
  {
    id: 'tf-32',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'What does `terraform apply -auto-approve` do?',
    options: [
      'It applies the execution plan immediately without pausing for interactive `yes` confirmation in the CLI',
      'It automatically approves AWS billing invoices',
      'It bypasses all IAM security permissions',
      'It deletes all state files automatically',
    ],
    correctIndex: 0,
    explanation:
      '`-auto-approve` skips the interactive prompt, making it useful for CI/CD pipeline automation.',
  },
  {
    id: 'tf-33',
    domain: 'Configuration Language & Variables',
    prompt:
      'How do you define a default value for a Terraform input variable?',
    options: [
      'Using the `default = "value"` argument inside the `variable` block',
      'Using `fallback = "value"`',
      'Writing it inside `outputs.tf`',
      'Default values are not permitted in Terraform',
    ],
    correctIndex: 0,
    explanation:
      'Input variables accept an optional `default` attribute used if no explicit override is provided.',
  },
  {
    id: 'tf-34',
    domain: 'Modules & Code Reusability',
    prompt:
      'What is the benefit of publishing modules to a private module registry?',
    options: [
      'It allows internal enterprise teams to reuse standardized, security-reviewed infrastructure templates across projects without copy-pasting code',
      'It hides code so no one can ever run `terraform plan`',
      'It converts Terraform code into Java bytecode',
      'It eliminates cloud provider costs entirely',
    ],
    correctIndex: 0,
    explanation:
      'Private registries standardize approved cloud architectures and compliance guardrails across internal engineering teams.',
  },
  {
    id: 'tf-35',
    domain: 'State Management & Importing',
    prompt:
      'What is `terraform state rm` used for?',
    options: [
      'It removes a resource from Terraform state management without deleting the actual cloud resource in the real world',
      'It permanently deletes the cloud resource and state file together',
      'It deletes local git repositories',
      'It formats state JSON into PDF reports',
    ],
    correctIndex: 0,
    explanation:
      '`terraform state rm` unbinds a resource from state tracking, leaving the physical cloud infrastructure untouched.',
  },
  {
    id: 'tf-36',
    domain: 'Terraform Cloud & Enterprise',
    prompt:
      'What is the function of Terraform Cloud Variable Sets?',
    options: [
      'They allow defining environment variables or Terraform variables once at the organization or workspace level and sharing them across multiple workspaces automatically',
      'They generate random passwords for every user',
      'They replace git branching strategies',
      'They convert AWS resources into Azure resources',
    ],
    correctIndex: 0,
    explanation:
      'Variable sets centralize reusable credentials and configuration variables across workspaces.',
  },
  {
    id: 'tf-37',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'What is Declarative vs Imperative provisioning in Infrastructure as Code?',
    options: [
      'Declarative (Terraform) defines the desired end state and lets the tool figure out how to get there; Imperative (Bash scripts) lists explicit step-by-step commands to execute',
      'Declarative means writing code in Python; Imperative means writing code in HTML',
      'Declarative requires manual server clicking in the AWS console',
      'There is no operational difference between declarative and imperative tools',
    ],
    correctIndex: 0,
    explanation:
      'Declarative IaC specifies what infrastructure should look like, whereas imperative scripting specifies procedural commands to execute.',
  },
  {
    id: 'tf-38',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'What should you do if `terraform apply` fails halfway through resource creation due to a transient API timeout?',
    options: [
      'Inspect the error, fix any configuration issues, and re-run `terraform apply`; Terraform will resume and reconcile remaining uncreated resources safely',
      'Format the computer hard drive and delete state',
      'Run `terraform destroy` immediately without checking state',
      'Manually delete all cloud resources via console',
    ],
    correctIndex: 0,
    explanation:
      'Terraform handles partial failures gracefully; re-running apply reconciles the remaining delta against state.',
  },
  {
    id: 'tf-39',
    domain: 'Configuration Language & Variables',
    prompt:
      'How does Terraform evaluate conditional expressions (`condition ? true_val : false_val`)?',
    options: [
      'It evaluates the boolean condition; if true, it returns the first expression result, otherwise the second expression result',
      'It halts execution with a syntax error',
      'It loops infinitely until timeout',
      'It deletes all resources in state',
    ],
    correctIndex: 0,
    explanation:
      'Ternary conditional syntax (`condition ? true_val : false_val`) provides inline conditional logic in HCL.',
  },
  {
    id: 'tf-40',
    domain: 'Modules & Code Reusability',
    prompt:
      'How do you pin a specific version of a Terraform module sourced from the registry?',
    options: [
      'Using the `version = "1.2.5"` attribute inside the `module` block',
      'Using `pin_version = "latest"`',
      'Modifying operating system environment variables',
      'Deleting `.terraform` folder',
    ],
    correctIndex: 0,
    explanation:
      'Module blocks accept a `version` constraint to guarantee reproducible module releases.',
  },
  {
    id: 'tf-41',
    domain: 'State Management & Importing',
    prompt:
      'Why is it dangerous to manually edit `terraform.tfstate` JSON files using a text editor?',
    options: [
      'Manual JSON edits risk breaking state formatting, corrupting resource IDs, or causing state mismatch that desyncs real cloud resources from Terraform tracking',
      'Text editors cannot open JSON files larger than 1 byte',
      'Terraform automatically encrypts state files with quantum keys',
      'State files are stored exclusively in read-only hardware ROM',
    ],
    correctIndex: 0,
    explanation:
      'Manual state edits easily introduce JSON syntax errors or ID mismatches; `terraform state` CLI commands should always be used instead.',
  },
  {
    id: 'tf-42',
    domain: 'Terraform Cloud & Enterprise',
    prompt:
      'What is the purpose of Terraform Cloud Cost Estimation during `terraform plan`?',
    options: [
      'It calculates and displays projected hourly and monthly cloud cost deltas before resources are provisioned, preventing surprise cloud bills',
      'It pays your AWS invoice automatically via credit card',
      'It audits employee salaries',
      'It deletes expensive instances automatically',
    ],
    correctIndex: 0,
    explanation:
      'Cost estimation integrates pricing APIs into the plan phase to show financial impacts before changes apply.',
  },
  {
    id: 'tf-43',
    domain: 'Terraform Basics & Infrastructure as Code',
    prompt:
      'What is the core function of Terraform Core vs Terraform Providers?',
    options: [
      'Terraform Core reads HCL, manages the dependency graph, and tracks state; Terraform Providers interact with specific cloud and SaaS APIs',
      'Terraform Core writes Python code; Providers write HTML',
      'Terraform Core runs exclusively on AWS; Providers run on local laptops',
      'There is no architectural separation between core and providers',
    ],
    correctIndex: 0,
    explanation:
      'Terraform Core manages state and execution logic, while pluggable Providers handle cloud API translation.',
  },
  {
    id: 'tf-44',
    domain: 'Terraform Lifecycle & Execution',
    prompt:
      'What does `terraform taint` (or `-replace` flag in modern Terraform) accomplish?',
    options: [
      'It marks a resource so that the next `terraform apply` forces its destruction and recreation',
      'It permanently bans the resource from ever being deployed again',
      'It cleans up local cache folders',
      'It encrypts resource attributes with AES-256',
    ],
    correctIndex: 0,
    explanation:
      'The `-replace` flag (formerly `taint`) forces a resource to be destroyed and recreated on the next apply.',
  },
  {
    id: 'tf-45',
    domain: 'Configuration Language & Variables',
    prompt:
      'What are Terraform validation rules (`validation { condition = ... error_message = ... }`) used for inside input variable blocks?',
    options: [
      'They enforce custom input validation constraints (e.g., ensuring an environment name is strictly "dev", "staging", or "prod") with clear error messages',
      'They validate user credit card numbers against banking APIs',
      'They check whether an AWS account has zero balance',
      'They format HCL code into canonical style',
    ],
    correctIndex: 0,
    explanation:
      'Variable validation blocks enforce custom business logic and formatting rules on user inputs during `terraform plan`.',
  },
];
