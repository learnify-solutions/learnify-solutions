import { PracticeQuestion } from '../types';

export const CISCO_ENCOR_350_401_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'encor-1',
    domain: 'Architecture & Dual Stack',
    prompt:
      'In a Cisco SD-Access campus fabric, which control-plane component tracks Endpoint ID (EID) to Routing Locator (RLOC) bindings so switches know which edge node hosts a roaming endpoint?',
    options: [
      'LISP Map-Server / Map-Resolver running on the Control Plane Node',
      'VXLAN Flood-and-Learn multicast group on the Border Node',
      'OSPF Type-5 External LSA flooding across Fabric Underlay',
      'Spanning Tree Root Guard on the Fabric Edge Switch',
    ],
    correctIndex: 0,
    explanation:
      'Cisco SD-Access uses LISP (Locator/ID Separation Protocol) on Control Plane Nodes acting as Map-Server/Map-Resolver to map endpoint IP/MAC IDs (EIDs) to VTEP/edge switch RLOC loopbacks.',
  },
  {
    id: 'encor-2',
    domain: 'Virtualization & Routing',
    prompt:
      'An enterprise runs VRF-Lite on a campus distribution router. Two isolated VRFs (CORP and GUEST) sit on the same router. What happens if you run ping 10.20.5.10 without specifying a VRF keyword?',
    options: [
      'The router queries all VRF routing tables sequentially until a match is found',
      'The router performs the lookup strictly inside the Global Routing Table (default VRF)',
      'The router forwards the ICMP packet out of the lowest-numbered active VLAN SVI',
      'The router drops the packet immediately unless BGP VPNv4 is enabled',
    ],
    correctIndex: 1,
    explanation:
      'By default, IOS/IOS-XE ping and traceroute check only the Global Routing Table unless `ping vrf <VRF-NAME> <IP>` is specified.',
  },
  {
    id: 'encor-3',
    domain: 'Infrastructure Routing (OSPF/BGP)',
    prompt:
      'Two routers form an OSPF adjacency over a 10 Gbps metro Ethernet circuit, yet OSPF treats both 1 Gbps and 10 Gbps links identically with a cost of 1. Which global OSPF router command fixes bandwidth-based path selection cleanly across 10 Gbps and 100 Gbps trunks?',
    options: [
      'auto-cost reference-bandwidth 100000',
      'ip ospf network point-to-multipoint',
      'maximum-paths 8',
      'timers throttle spf 10 100 1000',
    ],
    correctIndex: 0,
    explanation:
      'OSPF’s default reference bandwidth is 100 Mbps, clamping every link >= 100 Mbps to cost 1. Setting `auto-cost reference-bandwidth 100000` (100 Gbps in Mbps) differentiates 1G (cost 100), 10G (cost 10), and 100G (cost 1) links consistently—and must match on all OSPF routers.',
  },
  {
    id: 'encor-4',
    domain: 'Infrastructure Routing (BGP)',
    prompt:
      'An enterprise is dual-homed to two ISPs via eBGP and wants ALL internal routers in AS 65100 to prefer ISP-A for outbound internet traffic for every prefix. Which BGP path attribute should be raised on routes learned from ISP-A?',
    options: [
      'MED (Multi-Exit Discriminator) set to 500 inbound',
      'AS-Path prepending inbound from ISP-A',
      'Local Preference set to 200 inbound on the ISP-A border router',
      'Origin code overridden from i to ?',
    ],
    correctIndex: 2,
    explanation:
      'After Weight (Cisco-proprietary, local to one router), Local Preference is the highest BGP path selection attribute propagated across iBGP peers within the entire AS—higher Local Preference (default 100 -> 200) steers outbound traffic AS-wide.',
  },
  {
    id: 'encor-5',
    domain: 'Network Assurance & Automation',
    prompt:
      'Which HTTP method is used in RESTCONF when updating an existing YANG configuration resource idempotently (or creating it at that exact URI), while returning JSON or XML?',
    options: ['GET', 'PUT', 'OPTIONS', 'HEAD'],
    correctIndex: 1,
    explanation:
      'RESTCONF maps CRUD operations to HTTP verbs: GET retrieves data, POST creates resources, PUT replaces/creates a target resource idempotently, PATCH merges partial updates, and DELETE removes resources.',
  },
  {
    id: 'encor-6',
    domain: 'Layer 2 Switching & STP',
    prompt:
      'A switch access port connects to an end-user workstation and uses PortFast for instant link-up. What happens if another switch is accidentally plugged into that port and BPDU Guard is enabled?',
    options: [
      'The port stays forwarding and silently strips BPDUs',
      'The port transitions to err-disabled state upon receiving any BPDU',
      'The port elects itself Spanning Tree Root Bridge for that VLAN',
      'The port converts dynamically into an 802.1Q trunk port',
    ],
    correctIndex: 1,
    explanation:
      'BPDU Guard protects PortFast-enabled access ports from unexpected switch loops by immediately placing the interface into `err-disabled` if any BPDU frame arrives.',
  },
  {
    id: 'encor-7',
    domain: 'FHRP & High Availability',
    prompt:
      'You configure HSRP Version 2 (HSRPv2) on two distribution switches with virtual IP 10.10.1.1 for VLAN 10. Which virtual MAC address pattern does HSRPv2 advertise in ARP replies?',
    options: [
      '0000.0c07.ac0a',
      '0000.0c9f.f00a',
      '0000.5e00.010a',
      '0007.b400.0a01',
    ],
    correctIndex: 1,
    explanation:
      'HSRPv1 uses `0000.0c07.acXX`, VRRP uses `0000.5e00.01XX`, GLBP uses `0007.b400.XXXX`, and HSRPv2 uses `0000.0c9f.fXXX` (expanding group numbers from 0–255 to 0–4095; VLAN 10 = `00a`).',
  },
  {
    id: 'encor-8',
    domain: 'Wireless Architecture',
    prompt:
      'In a Cisco Catalyst 9800 / FlexConnect branch deployment, WAN connectivity to the central WLC drops temporarily. What happens to already-authenticated wireless clients on a FlexConnect AP configured for Local Switching?',
    options: [
      'All clients disconnect immediately until CAPWAP control resumes',
      'Local-switched SSIDs continue forwarding branch traffic via the local switch while CAPWAP reconnects in standalone mode',
      'The AP switches all SSIDs to central authentication automatically',
      'Clients remain connected only if IPv6 SLAAC is active',
    ],
    correctIndex: 1,
    explanation:
      'FlexConnect APs in Standalone Mode continue switching local-switched WLAN traffic directly to the branch VLAN when the WAN CAPWAP tunnel to the central controller goes down.',
  },
  {
    id: 'encor-9',
    domain: 'Multicast Routing',
    prompt:
      'Which PIM (Protocol Independent Multicast) mode requires a Rendezvous Point (RP) initially to build a shared tree `(*, G)` before optionally switching to a shortest-path source tree `(S, G)`?',
    options: ['PIM Dense Mode', 'PIM Sparse Mode (PIM-SM)', 'IGMPv1 Snooping', 'DVMRP'],
    correctIndex: 1,
    explanation:
      'PIM Sparse Mode builds a shared distribution tree `(*, G)` rooted at the Rendezvous Point (RP) and switches over to the optimal `(S, G)` Shortest-Path Tree once traffic thresholds are exceeded.',
  },
  {
    id: 'encor-10',
    domain: 'QoS & Traffic Shaping',
    prompt:
      'Which DSCP Per-Hop Behavior (PHB) decimal/name value is the enterprise standard for marking latency-sensitive VoIP RTP voice packets so they enter the Low-Latency Queue (LLQ)?',
    options: [
      'CS0 (DSCP 0) — Best Effort',
      'AF11 (DSCP 10) — Bulk Data',
      'EF (DSCP 46) — Expedited Forwarding',
      'CS6 (DSCP 48) — Network Control',
    ],
    correctIndex: 2,
    explanation:
      'Expedited Forwarding (`EF`, DSCP 46) is reserved for low-loss, low-jitter real-time voice payload traffic placed inside priority strict LLQ queues.',
  },
  {
    id: 'encor-11',
    domain: 'SD-WAN Control Plane',
    prompt:
      'Which protocol runs inside encrypted DTLS/TLS control tunnels between Cisco SD-WAN WAN Edge routers and vSmart controllers to advertise reachability, TLOCs, and VPN labels?',
    options: ['BGP EVPN', 'OMP (Overlay Management Protocol)', 'LISP', 'OSPFv3'],
    correctIndex: 1,
    explanation:
      'OMP (Overlay Management Protocol) is the control-plane routing protocol inside Cisco SD-WAN between WAN Edge devices and vSmart controllers, exchanging OMP routes, TLOC routes, and Service routes.',
  },
  {
    id: 'encor-12',
    domain: 'Virtualization & Overlays',
    prompt:
      'Why does VXLAN encapsulation add 50 bytes of outer UDP/IP/VXLAN overhead to original Ethernet frames, requiring higher underlay MTU?',
    options: [
      'It wraps the original L2 Ethernet frame inside an outer MAC + IP + UDP (port 4789) + 8-byte VXLAN header containing a 24-bit VNI',
      'It encrypts the payload using 256-bit AES-GCM headers per hop',
      'It strips 802.1Q tags and replaces them with three MPLS labels',
      'It forces TCP segmentation on every Layer 2 broadcast packet',
    ],
    correctIndex: 0,
    explanation:
      'VXLAN encapsulates Layer 2 frames inside MAC-in-UDP (port 4789) with a 24-bit VNI supporting up to 16 million segments—adding ~50 bytes (54 if 802.1Q is carried), so underlay MTU should be >= 1550 (typically 9000/9100).',
  },
  {
    id: 'encor-13',
    domain: 'Security & Infrastructure Protection',
    prompt:
      'Which IOS-XE plane-protection mechanism rate-limits excessive ARP, ICMP, or malformed BGP packets destined specifically for the router CPU without affecting hardware-switched transit data?',
    options: [
      'uRPF Loose Mode',
      'CoPP (Control Plane Policing)',
      'DHCP Snooping',
      'Dynamic ARP Inspection',
    ],
    correctIndex: 1,
    explanation:
      'Control Plane Policing (CoPP) applies MQC policy-maps directly to the `control-plane` interface, protecting the Route Processor CPU from DoS floods while forwarding transit packets normally.',
  },
  {
    id: 'encor-14',
    domain: 'Infrastructure Services (NTP/NAT)',
    prompt:
      'You notice router timestamps lag by 4 hours compared to syslog servers. Which NTP stratum number represents an atomic clock or GPS receiver directly attached as the authoritative time source?',
    options: ['Stratum 0', 'Stratum 1', 'Stratum 15', 'Stratum 16'],
    correctIndex: 0,
    explanation:
      'Stratum 0 refers to high-precision hardware clocks (atomic/GPS); a server directly attached to a Stratum 0 source operates at Stratum 1. Stratum 16 indicates unsynchronized.',
  },
  {
    id: 'encor-15',
    domain: 'Network Assurance & Telemetry',
    prompt:
      'An engineer replaces legacy SNMPv2c polling every 5 minutes with Streaming Model-Driven Telemetry (MDT) using gRPC/gNMI. What is the primary operational benefit?',
    options: [
      'Switches UDP port 161 polling to unencrypted Telnet sessions',
      'Continuously pushes structured YANG telemetry on-change or sub-second cadence without CPU polling spikes',
      'Eliminates the need for IP addresses on management interfaces',
      'Converts all CLI output into flat unstructured syslog lines',
    ],
    correctIndex: 1,
    explanation:
      'Model-Driven Telemetry subscribes to YANG paths and pushes structured cadence/on-change telemetry over gRPC/NETCONF, eliminating SNMP polling bottlenecks.',
  },
  {
    id: 'encor-16',
    domain: 'Network Automation (Python / JSON)',
    prompt:
      'In a Python automation script parsing a RESTCONF response stored in variable `resp`, you run `data = resp.json()`. What Python data type corresponds to a JSON object `{ "hostname": "core-sw1", "vlans": [10, 20] }`?',
    options: ['tuple', 'dict (Python dictionary)', 'set', 'string'],
    correctIndex: 1,
    explanation:
      'A JSON object `{ key: value }` deserializes into a Python `dict`, while a JSON array `[...]` deserializes into a Python `list`.',
  },
  {
    id: 'encor-17',
    domain: 'Wireless & Roaming',
    prompt:
      'Which IEEE 802.11 amendment enables Fast BSS Transition (FT) so wireless voice/video devices pre-authenticate keys and roam between APs in under 50 ms?',
    options: ['802.11r', '802.11ax', '802.1X', '802.3at'],
    correctIndex: 0,
    explanation:
      'IEEE 802.11r (Fast BSS Transition) minimizes 802.1X/RSN key handshake latency when mobile devices roam across AP cells, preventing VoWiFi audio drops.',
  },
  {
    id: 'encor-18',
    domain: 'Infrastructure Routing (OSPF)',
    prompt:
      'Which OSPF area type blocks Type-5 External LSAs AND Type-3 Summary LSAs from entering, injecting only a single default route `0.0.0.0/0` (Type-3) from the ABR?',
    options: [
      'Standard Stub Area',
      'Totally Stubby Area (`area 10 stub no-summary`)',
      'NSSA (Not-So-Stubby Area)',
      'Backbone Area 0',
    ],
    correctIndex: 1,
    explanation:
      'A Totally Stubby Area (configured with `area <id> stub no-summary` on the ABR) blocks both Type-5 external and Type-3 inter-area summary LSAs, minimizing branch router LSDB size.',
  },
  {
    id: 'encor-19',
    domain: 'Automation Tools (EEM)',
    prompt:
      'You need an IOS-XE router to automatically execute a CLI remediation sequence whenever a specific syslog pattern indicates a BGP peer drops, without external controllers. Which onboard feature enables this?',
    options: [
      'SPAN / RSPAN',
      'Embedded Event Manager (EEM) applet',
      'NetFlow v9 Exporter',
      'IP SLA Responder',
    ],
    correctIndex: 1,
    explanation:
      'Cisco Embedded Event Manager (EEM) monitors internal events (syslog regex, timer cron, interface counters, IP SLA state) and triggers automated CLI actions directly on the device.',
  },
  {
    id: 'encor-20',
    domain: 'Security & TrustSec',
    prompt:
      'How does Cisco TrustSec enforce segmentation independently of IP subnets and VLAN ACL sprawl across campus switches?',
    options: [
      'By assigning Security Group Tags (SGTs) inline at ingress via ISE and enforcing SGACLs at egress',
      'By running GRE tunnels from every access port to the firewall',
      'By translating all private IPv4 addresses into IPv6 links',
      'By disabling ARP inspection across trunk links',
    ],
    correctIndex: 0,
    explanation:
      'TrustSec assigns a 16-bit Security Group Tag (SGT) inside the Cisco MetaData (CMD) header upon authentication and enforces Security Group ACLs (SGACLs) based on role-to-role matrices rather than brittle IP lists.',
  },
  {
    id: 'encor-21',
    domain: 'Layer 2 EtherChannel',
    prompt:
      'Which EtherChannel load-balancing method prevents a single high-throughput server-to-server TCP stream from pinning onto one physical 10G member link unevenly when multiple source/destination ports are used?',
    options: [
      'src-mac only',
      'src-dst-ip or src-dst-mixed-ip-port',
      'Broadcast round-robin per packet',
      'Passive STP fallback',
    ],
    correctIndex: 1,
    explanation:
      'Using `src-dst-ip` or `src-dst-mixed-ip-port` hashing distributes flows across Port-Channel members based on Layer 3/4 tuples while keeping per-flow packet ordering intact.',
  },
  {
    id: 'encor-22',
    domain: 'Architecture & Gre / IPsec',
    prompt:
      'Why do engineers wrap GRE inside an IPsec transport tunnel (GRE over IPsec) instead of using pure policy-based IPsec crypto maps?',
    options: [
      'Pure IPsec tunnels drop OSPF/EIGRP multicast hellos; GRE supports multicast and dynamic routing protocols inside the encrypted tunnel',
      'GRE natively provides 256-bit AES encryption',
      'GRE eliminates MTU fragmentation permanently',
      'Pure IPsec cannot carry TCP port 443 HTTPS traffic',
    ],
    correctIndex: 0,
    explanation:
      'Classic IPsec tunnel mode does not forward multicast routing packets; GRE encapsulates multicast/broadcast protocols cleanly while IPsec encrypts the outer GRE packet.',
  },
  {
    id: 'encor-23',
    domain: 'BGP Neighbor States',
    prompt:
      'An eBGP session to an ISP peer sits permanently in `Active` state in `show ip bgp summary`. What does the `Active` state actually mean?',
    options: [
      'The BGP session is up and actively exchanging prefixes',
      'The local router is actively attempting TCP port 179 connection retries that have not yet succeeded',
      'All BGP prefixes have passed RPKI origin validation',
      'The peer has intentionally shut down the interface using Graceful Shutdown',
    ],
    correctIndex: 1,
    explanation:
      'In BGP FSM, `Active` is NOT a healthy established state—it means the router is repeatedly trying to initiate a TCP port 179 session to the neighbor IP (check routing reachability, ACLs blocking TCP 179, wrong AS, or missing `ebgp-multihop`).',
  },
  {
    id: 'encor-24',
    domain: 'Virtualization & Hypervisors',
    prompt:
      'What distinguishes a Type-1 (bare-metal) hypervisor such as ESXi/KVM from a Type-2 hosted hypervisor in enterprise network virtualization?',
    options: [
      'Type-1 runs directly on physical server hardware without a general-purpose host OS; Type-2 runs as an application atop Windows/macOS/Linux',
      'Type-2 hypervisors support PCIe SR-IOV while Type-1 does not',
      'Type-1 requires Docker Hub connectivity on boot',
      'Type-2 hypervisors bypass CPU VT-x/AMD-V instructions entirely',
    ],
    correctIndex: 0,
    explanation:
      'Type-1 bare-metal hypervisors install directly on hardware for predictable latency and enterprise NFV/VNF workloads, whereas Type-2 hypervisors depend on a host OS.',
  },
  {
    id: 'encor-25',
    domain: 'Spanning Tree Optimization',
    prompt:
      'How does Rapid Spanning Tree Protocol (RSTP / 802.1w) reduce convergence time from 30–50 seconds down to sub-second failover on point-to-point switch links?',
    options: [
      'Using explicit Proposal/Agreement synchronization handshakes between adjacent switches instead of waiting for MaxAge/ForwardDelay timers',
      'Running OSPF hello timers inside Layer 2 frames',
      'Disabling MAC address table aging entirely',
      'Promoting every edge port to Root Port simultaneously',
    ],
    correctIndex: 0,
    explanation:
      'RSTP replaces passive 802.1D timer listening/learning delays with active Proposal/Agreement handshakes across point-to-point full-duplex links, converging in milliseconds.',
  },
  {
    id: 'encor-26',
    domain: 'Automation & YANG / NETCONF',
    prompt:
      'Which TCP port does NETCONF run over by default when wrapped inside an encrypted SSH transport session?',
    options: ['TCP 22', 'TCP 443', 'TCP 830', 'UDP 161'],
    correctIndex: 2,
    explanation:
      'NETCONF over SSH uses IANA-assigned port **TCP 830** (`netconf-ssh`), whereas RESTCONF runs over HTTPS **TCP 443**.',
  },
  {
    id: 'encor-27',
    domain: 'Security & AAA (TACACS+ vs RADIUS)',
    prompt:
      'Why do network operations teams standardize on TACACS+ rather than RADIUS for switch/router administrative CLI access?',
    options: [
      'TACACS+ encrypts the full TCP payload and supports granular per-command authorization and accounting',
      'TACACS+ runs faster over connectionless UDP port 1812',
      'RADIUS cannot validate username/password pairs against Active Directory',
      'TACACS+ handles 802.1X wireless EAP-TLS certificates natively',
    ],
    correctIndex: 0,
    explanation:
      'TACACS+ runs over TCP port 49, encrypts the entire packet body (not just the password attribute), and decouples Authentication, Authorization (per-command), and Accounting cleanly.',
  },
  {
    id: 'encor-28',
    domain: 'Monitoring (IP SLA & Object Tracking)',
    prompt:
      'An administrator configures a floating static default route with AD 254 alongside a primary static default route tracked via IP SLA ICMP echo. When the primary ISP stops responding to pings upstream, what happens?',
    options: [
      'The tracked primary static route is automatically removed from the RIB, allowing the AD 254 backup route to install',
      'Both routes remain active simultaneously in equal-cost multipath',
      'The router reboots the WAN interface until BGP establishes',
      'The floating static route disappears permanently until manually retyped',
    ],
    correctIndex: 0,
    explanation:
      'Combining IP SLA probes with `track` on a primary static route removes the dead primary route from the routing table whenever upstream connectivity fails even while the local Ethernet link remains Up/Up.',
  },
  {
    id: 'encor-29',
    domain: 'SD-Access Underlay',
    prompt:
      'Which routing protocol does Cisco Catalyst Center (DNA Center) LAN Automation deploy by default for the SD-Access fabric underlay?',
    options: ['RIPng', 'IS-IS', 'EIGRP Named Mode', 'Static Host Routes only'],
    correctIndex: 1,
    explanation:
      'Cisco SD-Access LAN Automation deploys IS-IS automatically across loopbacks and fabric links because IS-IS runs natively over Layer 2 CLNS without needing IP dependencies first.',
  },
  {
    id: 'encor-30',
    domain: 'Container & Edge Compute',
    prompt:
      'On Cisco Catalyst 9300 switches, what allows engineers to host lightweight Python telemetry agents, Wireshark/tcpdump, or iPerf directly inside the switch OS without impacting ASIC packet forwarding?',
    options: [
      'Application Hosting (IOx / Docker container framework on dedicated x86/SSD resources)',
      'Spanning Tree Root Guard',
      'VTP Version 3 Server mode',
      'MPLS Label Distribution Protocol',
    ],
    correctIndex: 0,
    explanation:
      'Cisco IOx Application Hosting runs isolated Docker/OVA workloads on Catalyst 9300/ISR platforms for localized packet capture or telemetry collection safely separate from the IOS-XE forwarding ASIC.',
  },
];

export const CISCO_ENARSI_SDWAN_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'enarsi-1',
    domain: 'Advanced Routing & Redistribution',
    prompt:
      'During two-way route redistribution between EIGRP (internal AD 90, external AD 170) and OSPF (AD 110) on two redundant ASBR routers, suboptimal routing loops occur. Why do OSPF external routes re-learned back into EIGRP pose a loop risk?',
    options: [
      'Because OSPF external routes carry AD 110, which beats EIGRP external AD 170 when advertised across the secondary ASBR',
      'Because EIGRP drops routes whose metric exceeds 255 hops',
      'Because OSPF disables split horizon across Type-5 LSAs',
      'Because BGP overwrites both AD values automatically',
    ],
    correctIndex: 0,
    explanation:
      'Routes originated in EIGRP (AD 90) redistributed into OSPF become OSPF Type-5 External (AD 110). When the second ASBR sees that prefix via EIGRP external (AD 170) AND via OSPF (AD 110), AD 110 wins—creating a domain-feedback routing loop unless prevented using route-map tags!',
  },
  {
    id: 'enarsi-2',
    domain: 'SD-WAN Overlay (ENSDWI 300-415)',
    prompt:
      'In a Cisco SD-WAN deployment, each WAN Edge router connects to two transports (`biz-internet` and `mpls`). Which attribute identifies the combination of System IP, Transport Color, and Encapsulation Type used as the SD-WAN overlay next-hop?',
    options: [
      'TLOC (Transport Locator)',
      'Service-Side VPN 10 Loopback',
      'OMP Preference Tag',
      'vBond Orchestrator Token',
    ],
    correctIndex: 0,
    explanation:
      'A TLOC (Transport Locator) uniquely identifies a WAN transport attachment point by its 3-tuple: `(System-IP, Color, Encapsulation)`. OMP routes resolve recursively to TLOCs.',
  },
  {
    id: 'enarsi-3',
    domain: 'BGP Policy & Route Filtering',
    prompt:
      'Which Cisco IOS command forces BGP to apply an updated outbound `route-map` policy smoothly without tearing down the TCP 179 session, provided Route Refresh capability was negotiated?',
    options: [
      'clear ip bgp *',
      'clear ip bgp <neighbor-ip> soft out',
      'no neighbor <neighbor-ip> activate',
      'reset bgp hard all',
    ],
    correctIndex: 1,
    explanation:
      '`clear ip bgp <ip> soft out` re-advertises outbound BGP updates using the revised policy without resetting the TCP session or dropping transit traffic (`soft in` triggers a Route Refresh request).',
  },
  {
    id: 'enarsi-4',
    domain: 'SD-WAN Application-Aware Routing',
    prompt:
      'An organization configures an SD-WAN Application-Aware Routing (AAR) policy for Microsoft Teams voice requiring Loss <= 1% and Latency <= 150 ms. When MPLS exceeds 220 ms latency, what mechanism measures live tunnel SLA metrics between TLOC pairs?',
    options: [
      'ICMP Ping scripts triggered manually by vManage',
      'BFD (Bidirectional Forwarding Detection) liveness & SLA probes inside IPsec data tunnels',
      'SNMPv3 trap polling every 60 seconds',
      'CDP neighbor discovery across ISP routers',
    ],
    correctIndex: 1,
    explanation:
      'Cisco SD-WAN continuously runs BFD inside every data-plane IPsec tunnel between TLOC pairs to measure packet loss, latency, and jitter every second—enabling instant SLA-driven path failover.',
  },
  {
    id: 'enarsi-5',
    domain: 'MPLS Layer 3 VPN',
    prompt:
      'In an MPLS Layer 3 VPN backbone, why are Route Distinguishers (RDs) configured per VRF on PE routers even when two different customers both use overlapping `10.10.0.0/16` IPv4 subnets?',
    options: [
      'To turn overlapping 32-bit IPv4 prefixes into globally unique 96-bit VPNv4 prefixes inside MP-BGP',
      'To control which VRFs export and import prefixes across PE routers (Route Targets do that instead)',
      'To replace MPLS transport LDP labels between P routers',
      'To encrypt customer payloads between CE and PE',
    ],
    correctIndex: 0,
    explanation:
      'The Route Distinguisher (RD) prepends an 8-byte identifier to make overlapping IPv4 subnets unique 96-bit VPNv4 NLRI prefixes in MP-BGP; **Route Targets (RT)** control import/export membership policy.',
  },
  {
    id: 'enarsi-6',
    domain: 'DMVPN Architecture',
    prompt:
      'What key advantage does DMVPN Phase 3 introduce over DMVPN Phase 2 for large hub-and-spoke branch networks?',
    options: [
      'Supports NHRP Redirect and NHRP Shortcut messages so spokes build direct spoke-to-spoke tunnels even when the hub summarizes branch routes',
      'Replaces NHRP entirely with Spanning Tree over mGRE',
      'Forces all spoke-to-spoke traffic permanently through the hub router',
      'Requires manual static IPsec crypto maps for every spoke IP',
    ],
    correctIndex: 0,
    explanation:
      'DMVPN Phase 3 introduces `ip nhrp redirect` on the hub and `ip nhrp shortcut` on spokes, enabling hub route summarization while still allowing dynamic direct spoke-to-spoke IPsec tunnels.',
  },
  {
    id: 'enarsi-7',
    domain: 'IPv6 First Hop Security & OSPFv3',
    prompt:
      'When configuring OSPFv3 for dual-stack IPv6/IPv4 routing, what address family feature lets one OSPFv3 process advertise both IPv4 and IPv6 unicast routes simultaneously?',
    options: [
      'OSPFv3 Address Families (RFC 5838: `address-family ipv4 unicast` & `address-family ipv6 unicast`)',
      'RIPng redistribution',
      '6to4 automatic tunneling',
      'DHCPv6 Prefix Delegation only',
    ],
    correctIndex: 0,
    explanation:
      'Modern OSPFv3 Address Family (AF) configuration supports both `ipv4 unicast` and `ipv6 unicast` adjacencies over IPv6 link-local transport.',
  },
  {
    id: 'enarsi-8',
    domain: 'SD-WAN Zero-Touch & vBond',
    prompt:
      'During Cisco SD-WAN Zero-Touch Provisioning (ZTP), which controller acts as the initial orchestration broker authenticating WAN Edge serial numbers and distributing vManage and vSmart IP addresses?',
    options: ['vBond', 'vSmart', 'vAnalytics', 'Edge DHCP Relay'],
    correctIndex: 0,
    explanation:
      'vBond runs at the public edge to authenticate WAN Edge hardware/software certificates and supply each router with the IP/port details of vManage and vSmart.',
  },
  {
    id: 'enarsi-9',
    domain: 'BGP Communities',
    prompt:
      'An enterprise receives a route tagged with the well-known BGP community `no-export`. What should the receiving AS border router do?',
    options: [
      'Advertise the prefix to iBGP peers inside the local AS, but do NOT advertise it to any external eBGP peers',
      'Drop the prefix immediately without installing it in BGP table',
      'Advertise the prefix only to eBGP transit ISPs',
      'Remove the AS-Path attribute automatically',
    ],
    correctIndex: 0,
    explanation:
      'The `no-export` well-known community permits internal iBGP distribution within the local AS (or confederation) while blocking advertisement beyond eBGP AS boundaries.',
  },
  {
    id: 'enarsi-10',
    domain: 'OSPF Path Control & Filtering',
    prompt:
      'Why does applying `distribute-list ... in` on an internal OSPF router hide a prefix from the local IP Routing Table WITHOUT removing the LSA from the OSPF Link-State Database?',
    options: [
      'Because OSPF requires identical LSDBs across every router inside an area—blocking LSA flooding breaks SPF synchronization',
      'Because OSPF ignores distribute-lists completely on Type-1 LSAs',
      'Because OSPF stores routes in BGP RIB tables instead',
      'Because distribute-list only works on passive interfaces',
    ],
    correctIndex: 0,
    explanation:
      'Every router in an OSPF area MUST maintain an identical LSDB; therefore `distribute-list in` only filters the local SPF-to-RIB installation, whereas true LSA filtering happens on ABRs (`area X filter-list`) or ASBRs (`summary-address ... not-advertise`).',
  },
  {
    id: 'enarsi-11',
    domain: 'SD-WAN Control Policy & Topologies',
    prompt:
      'Where are Centralized Control Policies applied in a Cisco SD-WAN fabric to build Hub-and-Spoke or Regional Mesh topologies?',
    options: [
      'On vSmart controllers inbound/outbound toward WAN Edge site-lists (without changing underlay device configs)',
      'Directly as local OSPF area commands on every branch switch',
      'Inside vBond interface ACLs only',
      'Via Spanning Tree Root Bridge priorities on branch WAN Edges',
    ],
    correctIndex: 0,
    explanation:
      'vSmart enforces Centralized Control Policies centrally by altering OMP route/TLOC advertisements sent to target Site-Lists—transforming full-mesh into Hub-and-Spoke in seconds.',
  },
  {
    id: 'enarsi-12',
    domain: 'VRF & Route Leaking / PFR',
    prompt:
      'An administrator implements Policy-Based Routing (PBR) using `route-map WEB-TRAFFIC` to steer port 80/443 from Subnet A toward a secondary firewall hop. Where must `ip policy route-map WEB-TRAFFIC` be applied?',
    options: [
      'Inbound on the router interface receiving packets from Subnet A',
      'Outbound on the WAN interface leaving toward the ISP',
      'Globally inside `router bgp` configuration mode',
      'On the VLAN database configuration mode',
    ],
    correctIndex: 0,
    explanation:
      'Policy-Based Routing (PBR) intercepts packets **inbound** on the ingress interface before normal destination-based RIB lookup occurs (for router-generated packets, `ip local policy route-map` is used).',
  },
  {
    id: 'enarsi-13',
    domain: 'SD-WAN VPN Segmentation',
    prompt:
      'In Cisco SD-WAN terminology, what are the reserved roles of **VPN 0** and **VPN 512** on every WAN Edge router?',
    options: [
      'VPN 0 is the Transport/Underlay VPN (WAN interfaces & controllers); VPN 512 is the out-of-band Management VPN',
      'VPN 0 carries corporate guest Wi-Fi; VPN 512 carries Voice RTP only',
      'VPN 0 and VPN 512 are merged automatically into default service VRF 1',
      'VPN 512 handles all BGP MPLS L3VPN traffic',
    ],
    correctIndex: 0,
    explanation:
      'VPN 0 isolates transport underlay connections (internet/MPLS/control tunnels), VPN 512 isolates out-of-band management traffic, and VPNs 1–511 / 513–65530 represent segmented service-side VRFs.',
  },
  {
    id: 'enarsi-14',
    domain: 'Infrastructure Security (uRPF)',
    prompt:
      'Why should **uRPF Strict Mode** (`ip verify unicast source reachable-via rx`) NOT be deployed on asymmetric multi-homed internet edge links?',
    options: [
      'Strict Mode drops valid packets whenever a client’s return path goes out a different interface than the ingress interface receiving the packet',
      'Strict Mode drops all TCP SYN-ACK packets regardless of routing table',
      'Strict Mode disables BGP Route Reflectors automatically',
      'Strict Mode only validates IPv6 link-local addresses',
    ],
    correctIndex: 0,
    explanation:
      'Strict uRPF checks that the source IP is reachable strictly via the exact ingress interface (`rx`)—breaking asymmetric multi-ISP links; **Loose Mode** (`any`) verifies only that the source prefix exists in the RIB (not via Null0).',
  },
  {
    id: 'enarsi-15',
    domain: 'BGP Scalability (Route Reflectors)',
    prompt:
      'When an iBGP Route Reflector (RR) receives a prefix from an **RR Client**, to which peers will the Route Reflector re-advertise that prefix?',
    options: [
      'Strictly to non-clients only',
      'To ALL peers: other RR Clients, Non-Clients, and eBGP peers',
      'Only back to the originating RR Client',
      'Only to eBGP peers outside the AS',
    ],
    correctIndex: 1,
    explanation:
      'Remember the BGP Route Reflector rule: routes learned from a **Client** reflect to Clients + Non-Clients + eBGP; routes from a **Non-Client** reflect only to Clients + eBGP (never non-client to non-client).',
  },
  {
    id: 'enarsi-16',
    domain: 'SD-WAN TLOC Extension',
    prompt:
      'At a high-availability dual-router SD-WAN branch, Edge-1 terminates the MPLS circuit and Edge-2 terminates Broadband Internet. How can Edge-1 also use Edge-2’s Broadband Internet as a second overlay transport without buying another ISP handoff?',
    options: [
      'Configure **TLOC Extension** across a dedicated Layer 3 point-to-point transport link between Edge-1 and Edge-2',
      'Bridge both WAN interfaces using an unmanaged L2 hub inside VPN 1',
      'Enable VRRP on VPN 0 transport interfaces',
      'Disable DTLS tunnels on Edge-2 completely',
    ],
    correctIndex: 0,
    explanation:
      'TLOC Extension lets dual WAN Edge routers at a site share each other’s physical WAN circuits across a direct transport link (`tloc-extension <interface>`), giving both routers dual-color redundancy.',
  },
  {
    id: 'enarsi-17',
    domain: 'EIGRP Feasible Successor',
    prompt:
      'In EIGRP topology tables, what satisfies the Feasibility Condition so a backup route qualifies instantly as a loop-free Feasible Successor?',
    options: [
      'Reported Distance (RD) of the backup neighbor MUST be strictly LESS than the current Successor’s Feasible Distance (FD)',
      'Feasible Distance must equal zero',
      'Reported Distance must be greater than the active link delay',
      'Hop count must be below 2',
    ],
    correctIndex: 0,
    explanation:
      'The EIGRP Feasibility Condition (`RD < FD_successor`) mathematically guarantees a neighbor is strictly closer to the destination than our current best path—enabling instant sub-millisecond failover with zero SIA queries.',
  },
  {
    id: 'enarsi-18',
    domain: 'SD-WAN TLOC Restrict / Colors',
    prompt:
      'In Cisco SD-WAN, you want MPLS-attached interfaces (`color mpls`) at branches to form IPsec tunnels ONLY with other `mpls` TLOCs—never wasting bandwidth attempting IPsec over `public-internet` TLOCs across firewalls. Which keyword sets this behavior?',
    options: ['restrict', 'carrier private', 'nat-pool', 'allow-service bgp'],
    correctIndex: 0,
    explanation:
      'Appending `restrict` under the color configuration restricts WAN Edge routers to forming IPsec data tunnels strictly between TLOCs sharing the exact same color.',
  },
  {
    id: 'enarsi-19',
    domain: 'MPLS LDP Troubleshooting',
    prompt:
      'Two core P/PE routers reach each other via OSPF, yet MPLS LDP adjacency fails to come up because router-ID loopbacks were advertised with `/32` vs `/24` mismatch or missing TCP 646. Which protocol & port establish LDP neighbor sessions after UDP 646 discovery?',
    options: [
      'TCP port 646 between the advertised LDP Transport Addresses (typically `/32` Loopback0)',
      'TCP port 179 using multicast hello messages',
      'UDP port 4789 encapsulated in GRE',
      'TCP port 830 over management VRF only',
    ],
    correctIndex: 0,
    explanation:
      'MPLS LDP discovers peers via UDP multicast `224.0.0.2` port 646, then builds the LDP session over **TCP port 646**—requiring routing reachability to both routers’ advertised Transport Loopback `/32` addresses.',
  },
  {
    id: 'enarsi-20',
    domain: 'Prefix-List Precision',
    prompt:
      'Which IPv4 prefix-list entry matches ONLY subnets inside `172.16.0.0/16` that have a mask length between `/24` and `/28` inclusive?',
    options: [
      'ip prefix-list BRANCH permit 172.16.0.0/16 ge 24 le 28',
      'ip prefix-list BRANCH permit 172.16.0.0/24 le 28',
      'ip prefix-list BRANCH permit 172.16.0.0/16 ge 28',
      'ip prefix-list BRANCH permit 172.16.0.0/28 ge 24',
    ],
    correctIndex: 0,
    explanation:
      'Syntax order rule: `base_mask < ge <= le <= 32`. `172.16.0.0/16 ge 24 le 28` checks the first 16 bits (`172.16.x.x`) and filters mask lengths `/24` through `/28`.',
  },
  {
    id: 'enarsi-21',
    domain: 'SD-WAN Direct Internet Access (DIA)',
    prompt:
      'How do SD-WAN branches route trusted Microsoft 365 / SaaS traffic directly out local ISP links instead of backhauling it to a regional data center?',
    options: [
      'Configure a Localized or Centralized Data Policy with NAT (`vpn 0` DIA action) for SaaS/Cloud prefixes inside service VPN 1',
      'Remove the default route from vSmart completely',
      'Disable Zone-Based Firewall on the local branch router',
      'Put Microsoft 365 public IPs inside VPN 512',
    ],
    correctIndex: 0,
    explanation:
      'SD-WAN Data Policies match traffic from Service VPNs (e.g., VPN 1) and apply `nat vpn 0` Direct Internet Access (DIA) locally—reducing latency for cloud SaaS while backhauling internal ERP traffic over IPsec.',
  },
  {
    id: 'enarsi-22',
    domain: 'SNMPv3 Security',
    prompt:
      'Which SNMPv3 security level provides BOTH HMAC-SHA authentication AND AES-128/256 payload encryption for enterprise NMS monitoring?',
    options: ['noAuthNoPriv', 'authNoPriv', 'authPriv', 'community-ro'],
    correctIndex: 2,
    explanation:
      '`authPriv` enables both cryptographic message integrity/authentication (SHA) and payload privacy encryption (AES) in SNMPv3.',
  },
  {
    id: 'enarsi-23',
    domain: 'IPv6 Neighbor Discovery & Security',
    prompt:
      'On an IPv6 dual-stack campus LAN, which security feature prevents rogue endpoints from spoofing Router Advertisement (RA) messages and hijacking default gateways?',
    options: ['RA Guard (`ipv6 nd raguard`)', 'DHCPv4 Snooping', 'PortFast', 'uRPF Strict Mode'],
    correctIndex: 0,
    explanation:
      'IPv6 RA Guard blocks unauthorized ICMPv6 Router Advertisement frames on access switchports while permitting RAs strictly on trusted uplink router ports.',
  },
  {
    id: 'enarsi-24',
    domain: 'SD-WAN Certificates & Control Trust',
    prompt:
      'Why does Cisco SD-WAN refuse to allow a WAN Edge router to form control tunnels with vSmart even when IP connectivity in VPN 0 works perfectly if the router’s NTP clock is stuck in 2015?',
    options: [
      'DTLS/TLS mutual X.509 certificate verification fails because controller certificates appear "not yet valid" outside the 2015 clock window',
      'OMP drops packets whenever year < 2020',
      'vBond refuses non-UTC timestamps',
      'IPsec AES encryption breaks before 2020',
    ],
    correctIndex: 0,
    explanation:
      'Every SD-WAN control plane handshake relies on mutual TLS/DTLS X.509 certificates; an incorrect system clock invalidates certificate validity dates instantly.',
  },
  {
    id: 'enarsi-25',
    domain: 'BGP AS-Path Loop Prevention vs Override',
    prompt:
      'Two branch sites share the SAME private BGP AS 65200 connected across an MPLS ISP AS 65000. Normally BGP drops incoming updates containing its own AS 65200. Which PE or CE feature resolves this safely?',
    options: [
      '`as-override` on the ISP PE routers or `allowas-in` on the CE branch routers',
      '`next-hop-self` on the branch switch',
      '`auto-summary` inside BGP ipv4 unicast',
      'Changing OSPF router-id to match the ISP loopback',
    ],
    correctIndex: 0,
    explanation:
      'When multiple customer sites share one ASN over an MPLS carrier, `as-override` on the PE replaces the customer ASN in AS-Path with the ISP ASN, or `allowas-in` on CE lets the branch accept its own ASN carefully.',
  },
  {
    id: 'enarsi-26',
    domain: 'AAA Debugging & TACACS+ Fallback',
    prompt:
      'You configure AAA method lists for SSH VTY logins: `aaa authentication login VTY-ACCESS group ISE-TACACS local`. When does the router actually fall back to checking the local user database?',
    options: [
      'Only when ALL servers in `ISE-TACACS` are unreachable/timed out—NOT when a user mistypes a wrong password',
      'Every time a user enters an incorrect password',
      'Alternating 50/50 between TACACS+ and local accounts',
      'Only during console port logins',
    ],
    correctIndex: 0,
    explanation:
      'In IOS AAA method lists, fallback to `local` occurs ONLY when the TACACS+/RADIUS server group fails to respond (`ERROR` / unreachable)—if ISE responds with `REJECT` for a bad password, login fails immediately as designed.',
  },
  {
    id: 'enarsi-27',
    domain: 'DHCPv4 Relay Troubleshooting',
    prompt:
      'Branch clients on VLAN 20 cannot get IPs from a central DHCP server at `10.50.1.25`. You configure `ip helper-address 10.50.1.25` on the branch SVI. What source IP does the router place in the relayed unicast UDP packet?',
    options: [
      'The IP address of the client-facing SVI VLAN 20 interface (so the DHCP server knows which scope/pool to pick)',
      'The router’s highest physical WAN loopback IP',
      '255.255.255.255 broadcast address',
      '0.0.0.0 unspecified source address',
    ],
    correctIndex: 0,
    explanation:
      'DHCP Relay sets the `giaddr` field (and typically source IP) to the receiving VLAN SVI gateway address (`10.x.20.1`) so the centralized DHCP server matches the exact remote subnet scope.',
  },
  {
    id: 'enarsi-28',
    domain: 'SD-WAN Cloud OnRamp',
    prompt:
      'How does Cisco SD-WAN Cloud OnRamp for IaaS connect branch SD-WAN fabrics seamlessly into AWS VPC Transit Gateways or Microsoft Azure Virtual WAN?',
    options: [
      'vManage automates spinning up virtual Catalyst 8000V/CSR routers inside cloud transit VPCs/VNets and builds OMP/IPsec tunnels automatically',
      'It bridges Layer 2 VLAN trunks over ExpressRoute directly into branch switches',
      'It uses browser WebRTC tunnels per workstation',
      'It exposes Azure Storage accounts over unencrypted GRE',
    ],
    correctIndex: 0,
    explanation:
      'Cloud OnRamp for Multi-Cloud orchestrates virtual SD-WAN routers inside AWS Transit Gateway / Azure vWAN hubs via API, extending end-to-end OMP segmentation and SLA telemetry straight into cloud workloads.',
  },
  {
    id: 'enarsi-29',
    domain: 'Route-Map Match vs Set Logic',
    prompt:
      'Inside a multi-sequence `route-map FILTER`, Sequence 10 matches ACL `1` with NO `match` failure (`deny 10`). Sequence 20 permits everything else. If `acl 1` has `permit 10.1.0.0 0.0.255.255`, what happens to `10.1.5.0/24`?',
    options: [
      'Sequence 10 matches `10.1.5.0/24` via ACL permit and **denies** the prefix at Sequence 10 because the route-map clause action is `deny`',
      'It is permitted because ACL 1 used `permit`',
      'It skips Sequence 10 and matches Sequence 20',
      'It hangs until a third sequence is added',
    ],
    correctIndex: 0,
    explanation:
      'In a `route-map <name> deny 10`, the ACL `permit` merely identifies WHICH prefixes match that clause; the route-map clause action (`deny`) then rejects those matched prefixes.',
  },
  {
    id: 'enarsi-30',
    domain: 'BFD Sub-Second Failure Detection',
    prompt:
      'Why do production BGP and OSPF peering links enable BFD (Bidirectional Forwarding Detection) across dark-fiber/MPLS switches?',
    options: [
      'Optical transceivers/media converters may keep Ethernet Link Up even when an intermediate fiber path breaks; BFD detects packet loss in ~150 ms instead of waiting 30–180 seconds for IGP/BGP hold timers',
      'BFD replaces BGP TCP connections with UDP multicast',
      'BFD increases maximum BGP prefix capacity from 10k to 10M',
      'BFD acts as a stateful deep-packet firewall',
    ],
    correctIndex: 0,
    explanation:
      'BFD runs lightweight sub-second echo/control packets decoupled from routing CPUs, triggering immediate BGP/OSPF adjacency teardown in tens of milliseconds when intermediate L2 transport breaks silently.',
  },
];

export const CISCO_SCOR_ISE_CYBEROPS_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'scor-1',
    domain: 'ISE 802.1X & NAC (SISE 300-715)',
    prompt:
      'When deploying 802.1X with Cisco ISE across a live corporate campus without disrupting unauthenticated printers or legacy phones on day one, which switchport authentication mode should you deploy FIRST?',
    options: [
      'Closed Mode (`authentication closed`) immediately on every floor',
      'Monitor Mode (Open Access: tracks authentication logs and profiling in ISE without blocking traffic)',
      'Port Security max-mac 1 with static shutdown',
      'Private VLAN Isolated mode across all ports',
    ],
    correctIndex: 1,
    explanation:
      'Phased ISE 802.1X rollout starts in **Monitor Mode** (using open authentication + ACLs permitting traffic while logging all authentications), graduates to **Low-Impact Mode**, and enforces strict **Closed Mode** only after visibility is 100% verified.',
  },
  {
    id: 'scor-2',
    domain: 'CyberOps SOC Triage (CBROPS 200-201)',
    prompt:
      'A Tier-1 SOC analyst inspects an alert showing high-frequency DNS TXT queries to random 48-character hex subdomains (`9f2a4c...bad-c2.example`) from a single finance workstation. What attack technique is most likely occurring?',
    options: [
      'Standard Windows NTP clock sync',
      'DNS Tunneling for stealthy Command-and-Control (C2) or data exfiltration',
      'DHCP lease renewal flood',
      'Legitimate mDNS printer discovery',
    ],
    correctIndex: 1,
    explanation:
      'Unusually long, high-entropy random subdomain labels paired with elevated DNS TXT/NULL query frequency is a classic signature of DNS C2 tunneling bypassing HTTP/HTTPS firewalls.',
  },
  {
    id: 'scor-3',
    domain: 'SCOR 350-701 Network Security',
    prompt:
      'Which Cisco ISE / TrustSec mechanism dynamically notifies an already-connected user’s switchport to apply a quarantine dACL the instant an EDR sensor detects malware on that endpoint?',
    options: [
      'RADIUS Change of Authorization (CoA) triggered over UDP 1700/3799 via pxGrid telemetry',
      'Waiting 8 hours for the workstation DHCP lease to expire',
      'Rebuilding the switch VLAN database manually',
      'Flushing the core router OSPF neighbor table',
    ],
    correctIndex: 0,
    explanation:
      'Via Cisco **pxGrid** adaptive network control (ANC), security platforms trigger ISE to fire a real-time **RADIUS CoA (UDP 1700/3799)** packet to the NAD switch—re-authorizing or quarantining the port immediately.',
  },
  {
    id: 'scor-4',
    domain: 'NGFW / Firepower (SNCF 300-710)',
    prompt:
      'On Cisco Secure Firewall (FTD / Firepower Management Center), what is the key difference between a **Prefilter Policy (Fastpath)** rule and an **Access Control Policy (ACP) Allow** rule?',
    options: [
      'Prefilter Fastpath bypasses deep Snort L7 application & IPS inspection completely (ideal for trusted high-volume encrypted backup/SAN flows), whereas ACP Allow can still enforce Snort IPS/File inspection',
      'Prefilter rules only inspect UDP port 53 DNS packets',
      'ACP Allow drops all TLS 1.3 encrypted sessions automatically',
      'Prefilter Fastpath decrypts SSL traffic more deeply than Snort',
    ],
    correctIndex: 0,
    explanation:
      'Prefilter evaluates L3/L4 headers at the data-plane engine BEFORE L7 Snort inspection: `Fastpath` skips Snort completely for trusted high-throughput traffic, saving firewall CPU.',
  },
  {
    id: 'scor-5',
    domain: 'VPN Architecture (SVPN 300-730)',
    prompt:
      'Comparing IKEv1 vs IKEv2 in modern enterprise Site-to-Site and Remote Access VPNs, which statement accurately describes IKEv2?',
    options: [
      'IKEv2 simplifies key exchange to 4 packets (IKE_SA_INIT + IKE_AUTH), supports built-in NAT-T, asymmetric authentication, and MOBIKE mobility',
      'IKEv2 requires 9 Aggressive Mode messages before building Phase 1',
      'IKEv2 runs exclusively over TCP port 443 and disables AES-GCM',
      'IKEv2 removes ESP encryption in favor of cleartext AH',
    ],
    correctIndex: 0,
    explanation:
      'IKEv2 (RFC 7296) establishes tunnels in 4 messages cleanly, natively handles EAP/PKI asymmetric auth, includes MOBIKE for cellular/Wi-Fi roaming, and supports modern AES-GCM AEAD suites.',
  },
  {
    id: 'scor-6',
    domain: 'SCOR Cryptography & PKI',
    prompt:
      'In a TLS 1.3 / IKEv2 connection using **ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)**, what critical security property protects previously captured ciphertext even if the server’s long-term RSA private key is stolen a year later?',
    options: [
      'Perfect Forward Secrecy (PFS)',
      'Split-Horizon DNSSEC',
      'Symmetric Key Wrap (AES-KW)',
      'MD5 Salted Hashing',
    ],
    correctIndex: 0,
    explanation:
      'Ephemeral Diffie-Hellman (ECDHE) generates unique per-session symmetric keys discarded immediately after the session ends—providing Perfect Forward Secrecy (PFS).',
  },
  {
    id: 'scor-7',
    domain: 'ISE Profiling & MAB',
    prompt:
      'An IP security camera cannot run an 802.1X supplicant. Which fallback authentication method inspects the camera’s MAC address via ISE, profiles it via CDP/LLDP/DHCP/OUI probes, and places it into the CCTV VLAN?',
    options: [
      'MAB (MAC Authentication Bypass) paired with ISE Endpoint Profiling',
      'EAP-TLS with hardware TPM certificates',
      'SSH Key forwarding',
      'BGP Flowspec redirection',
    ],
    correctIndex: 0,
    explanation:
      'Headless IoT devices (printers, cameras, medical gear) fail dot1x timeout and fall back to **MAB**, allowing ISE Profiling probes (OUI, DHCP options, LLDP/CDP, HTTP User-Agent) to identify and segment them cleanly.',
  },
  {
    id: 'scor-8',
    domain: 'CyberOps Forensics & PCAP',
    prompt:
      'While investigating a suspected credential-harvesting phishing incident inside Wireshark, which display filter isolates ONLY HTTP POST requests containing submitted form data?',
    options: [
      'http.request.method == "POST"',
      'tcp.port == 80 && !tls',
      'ip.dst == 8.8.8.8',
      'dns.qry.type == 1',
    ],
    correctIndex: 0,
    explanation:
      'Wireshark filter `http.request.method == "POST"` pinpoints cleartext HTTP form submissions immediately so analysts can inspect credentials or C2 beacons.',
  },
  {
    id: 'scor-9',
    domain: 'Cloud & Email Security (SCOR)',
    prompt:
      'How do **SPF, DKIM, and DMARC** work together on a Secure Email Gateway to block executive CEO impersonation spoofing?',
    options: [
      'SPF validates authorized sending IPs; DKIM adds a cryptographic header signature; DMARC enforces alignment and tells receivers to quarantine/reject failures',
      'DKIM encrypts all attachment PDFs automatically using PGP',
      'SPF replaces TLS on SMTP port 25 completely',
      'DMARC scans executables inside a cloud malware sandbox',
    ],
    correctIndex: 0,
    explanation:
      'SPF checks sending server IPs against DNS TXT records, DKIM cryptographically signs the domain header/body, and DMARC enforces domain alignment + reject/quarantine policies with aggregate reporting.',
  },
  {
    id: 'scor-10',
    domain: 'NGFW Threat Defense & Snort',
    prompt:
      'On Cisco Secure Firewall (FTD), what happens when an HTTP download triggers Security Intelligence (SI) IP/URL blocklists before deep Snort inspection even finishes?',
    options: [
      'The connection is blocked early using high-speed reputation feeds, conserving Snort IPS inspection cycles',
      'The connection is automatically downgraded to Monitor-Only log mode',
      'Firepower transfers the file into ISE Profiling DB',
      'The packet bypasses Access Control Policy logging completely',
    ],
    correctIndex: 0,
    explanation:
      'Security Intelligence (IP/DNS/URL reputation blocklists) runs right after Prefilter and BEFORE full Access Control & Snort IPS evaluation—dropping known C2/malware IPs immediately with minimal latency.',
  },
  {
    id: 'scor-11',
    domain: 'ISE Posture & BYOD',
    prompt:
      'In an ISE 802.1X Wireless BYOD flow, a contractor’s laptop authenticates initially with Active Directory credentials (`PEAP-MSCHAPv2`) and gets redirected to an ISE onboarding portal. What does the laptop receive so subsequent logins bypass passwords with stronger security?',
    options: [
      'A device-specific client X.509 certificate provisioned via SCEP for **EAP-TLS** authentication',
      'A plain-text static WEP key',
      'Local Administrator domain credentials',
      'An unfiltered Guest VLAN exemption',
    ],
    correctIndex: 0,
    explanation:
      'ISE BYOD onboarding uses SCEP (Simple Certificate Enrollment Protocol) to provision a trusted user/device X.509 certificate—upgrading future logins automatically from PEAP to cryptographic **EAP-TLS**.',
  },
  {
    id: 'scor-12',
    domain: 'CyberOps Windows Endpoint Artifacts',
    prompt:
      'During incident response (CBRFIR 300-215 / CBROPS), an attacker used `PsExec` and PowerShell across multiple hosts. Which Windows Event ID specifically records a new service installed on a target endpoint (commonly generated when PsExec executes remotely)?',
    options: ['Event ID 7045 (System Log)', 'Event ID 4624 Type 2', 'Event ID 1102 only', 'Event ID 4720'],
    correctIndex: 0,
    explanation:
      'Windows System **Event ID 7045** logs new service installations (like `PSEXESVC`), while **4624** logs logons (`Logon Type 3` = Network logon), and **1102** warns that the Security audit log was cleared.',
  },
  {
    id: 'scor-13',
    domain: 'IPsec VPN & NAT-Traversal',
    prompt:
      'Why does IPsec NAT-Traversal (NAT-T) encapsulate ESP packets inside **UDP port 4500** whenever a NAT router sits between two VPN peers?',
    options: [
      'Raw IP Protocol 50 (ESP) lacks TCP/UDP port numbers needed for PAT translation and would have its inner IP checksums corrupted by NAT unless wrapped in UDP 4500',
      'Because UDP 4500 doubles encryption key length from 128 to 256 bits',
      'Because ISPs drop all TCP 443 traffic across MPLS links',
      'Because ESP is unencrypted without UDP 4500',
    ],
    correctIndex: 0,
    explanation:
      'NAT/PAT devices require transport-layer ports to map multiple internal sessions; wrapping ESP (Protocol 50) inside **UDP 4500** lets NAT translate traffic safely without breaking ESP integrity checks.',
  },
  {
    id: 'scor-14',
    domain: 'CyberOps Kill Chain & Diamond Model',
    prompt:
      'According to the Cyber Kill Chain, at which stage does a threat actor exploit a vulnerable software flaw on a target system RIGHT BEFORE installing persistent malware?',
    options: [
      'Exploitation (Phase 4, between Delivery and Installation)',
      'Reconnaissance (Phase 1)',
      'Weaponization (Phase 2)',
      'Actions on Objectives (Phase 7)',
    ],
    correctIndex: 0,
    explanation:
      'The 7 Kill Chain phases run sequentially: Reconnaissance -> Weaponization -> Delivery -> **Exploitation** -> Installation -> Command & Control (C2) -> Actions on Objectives.',
  },
  {
    id: 'scor-15',
    domain: 'Cisco DNA / Secure Access Umbrella DNS',
    prompt:
      'How does **Cisco Umbrella / DNS-layer Security** block ransomware C2 callbacks even when remote employees are off-VPN at a coffee shop or home office?',
    options: [
      'By intercepting recursive DNS resolution globally via anycast resolvers (`208.67.222.222` / roaming agent) and returning sinkhole/block responses for malicious domains before any TCP handshake starts',
      'By inspecting every layer-2 Ethernet frame on the home ISP modem',
      'By forcing all coffee-shop traffic back through a campus MPLS router',
      'By replacing local host files manually every morning',
    ],
    correctIndex: 0,
    explanation:
      'DNS-layer security stops malicious connections at the very first DNS query step—whether on-network (virtual appliances) or off-VPN (roaming client)—blocking C2, phishing, and cryptomining before packets even leave the device.',
  },
  {
    id: 'scor-16',
    domain: 'Security Automation (SAUTO 300-735)',
    prompt:
      'In a Cisco SecureX / SOAR playbook triggered by a high-severity phishing alert, what API workflow automatically isolates the compromised endpoint, blocks the sender domain, and creates a SOC ticket?',
    options: [
      'Orchestrated REST API calls across Secure Endpoint (isolation), Secure Email (domain block), and ITSM webhooks',
      'Manual SSH access into every campus access switch sequentially',
      'Enabling Spanning Tree Loop Guard globally',
      'Re-imaging the ISE Policy Service Node',
    ],
    correctIndex: 0,
    explanation:
      'Security Automation (SAUTO) connects EDR/Firewall/ISE pxGrid/ITSM APIs into deterministic SOAR playbooks—shrinking Mean Time to Contain (MTTC) from hours to seconds.',
  },
  {
    id: 'scor-17',
    domain: 'ISE Deployment Personas',
    prompt:
      'In a distributed multi-node Cisco ISE cluster serving 25,000 endpoints across EMEA, which ISE **Persona** actually processes live RADIUS/TACACS+ authentications from network switches and WLCs?',
    options: [
      'PSN (Policy Service Node)',
      'PAN (Policy Administration Node)',
      'MnT (Monitoring and Troubleshooting Node)',
      'Primary Standalone syslog archival disk only',
    ],
    correctIndex: 0,
    explanation:
      'PAN handles central admin & policy configuration, MnT handles logging/reporting/CoA correlation, and **PSN (Policy Service Node)** processes live RADIUS/TACACS+/pxGrid/guest traffic.',
  },
  {
    id: 'scor-18',
    domain: 'NGFW Decryption & TLS 1.3',
    prompt:
      'Why do organizations deploy an **SSL/TLS Decryption Policy** with legal/healthcare/banking exclusions on their Next-Gen Firewall?',
    options: [
      'Because 85%+ of enterprise malware payloads and C2 sessions now hide inside HTTPS/TLS tunnels that inline Snort IPS and Malware Defense cannot inspect while encrypted',
      'To convert HTTPS traffic permanently into cleartext HTTP port 80 externally',
      'To strip all DNSSEC signatures from root servers',
      'To disable firewall stateful inspection tables',
    ],
    correctIndex: 0,
    explanation:
      'Without outbound TLS decryption (`Decrypt - Resign`), NGFW IPS/AMP engines see only encrypted payloads (`SNI` only). Regulatory categories like Healthcare and Financial Banking are cleanly excluded (`Do Not Decrypt`) for privacy compliance.',
  },
  {
    id: 'scor-19',
    domain: 'Switch Port Security vs DAI vs DHCP Snooping',
    prompt:
      'Why MUST **DHCP Snooping** be enabled and functioning before turning on **Dynamic ARP Inspection (DAI)** on enterprise access switches?',
    options: [
      'DAI checks every incoming ARP packet against the **DHCP Snooping Binding Table** (MAC-to-IP-to-VLAN-to-Port) to drop ARP spoofing attacks',
      'DAI needs DHCP Snooping to assign VLAN IDs to trunk ports',
      'DHCP Snooping encrypts all ARP broadcasts using AES',
      'DAI turns off spanning tree unless DHCP Snooping is configured',
    ],
    correctIndex: 0,
    explanation:
      'Dynamic ARP Inspection (DAI) relies directly on the dynamic DHCP Snooping Binding Database (plus manual ARP ACLs for static servers) to verify IP-MAC bindings and defeat Man-in-the-Middle ARP poisoning.',
  },
  {
    id: 'scor-20',
    domain: 'CyberOps Memory & Evidence Preservation',
    prompt:
      'According to RFC 3227 Order of Volatility during cybersecurity forensic collection, which artifact on a compromised Linux/Windows server MUST be captured FIRST before rebooting?',
    options: [
      'CPU registers/cache and volatile **RAM memory dump** (holding unencrypted malware, active processes, and network sockets)',
      'Offline magnetic tape backup archives',
      'Router running-config stored in NVRAM',
      'Printed system rack inventory sheets',
    ],
    correctIndex: 0,
    explanation:
      'Order of Volatility captures the most ephemeral data first: CPU cache -> **RAM** -> swap/active network connections -> disk images -> offline archival media.',
  },
  {
    id: 'scor-21',
    domain: 'AnyConnect / Secure Client SAML SSO',
    prompt:
      'How can remote workers authenticate to Cisco Secure Client (AnyConnect) VPN using their corporate Microsoft Entra ID / Okta MFA prompt instead of legacy static AD passwords?',
    options: [
      'Configure SAML 2.0 Identity Provider (IdP) SSO integration on the VPN headend (ASA/FTD)',
      'Enable IKEv1 Aggressive Mode with a shared static group password',
      'Turn off CRL/OCSP certificate validation completely',
      'Map every remote user directly to TACACS+ level 15',
    ],
    correctIndex: 0,
    explanation:
      'SAML 2.0 SSO delegates VPN authentication to cloud IdPs (Entra ID, Okta, Duo SSO), enforcing phishing-resistant MFA and conditional device posture before issuing the AnyConnect session.',
  },
  {
    id: 'scor-22',
    domain: 'SCOR Security Governance & Zero Trust',
    prompt:
      'Which core principle defines Zero Trust Network Access (ZTNA) across campus, remote VPN, and multi-cloud workloads?',
    options: [
      'Never trust, always verify: authenticate and authorize every user, device posture, and session explicitly regardless of network location',
      'Trust all traffic arriving from internal corporate RFC 1918 subnets automatically',
      'Replace all firewall policies with flat Layer 2 bridges',
      'Allow permanent domain admin rights to reduce helpdesk tickets',
    ],
    correctIndex: 0,
    explanation:
      'Zero Trust replaces implicit perimeter trust ("inside LAN = safe") with continuous verification of user identity, endpoint posture, least privilege, and micro-segmentation.',
  },
  {
    id: 'scor-23',
    domain: 'Cisco Firepower High Availability',
    prompt:
      'When deploying two Cisco Secure Firewall Threat Defense (FTD) appliances in Active/Standby High Availability, which interfaces keep standby state synchronized so active TCP sessions do not drop during failover?',
    options: [
      'The dedicated **HA Control Link** (config/hello sync) and **State Link** (connection state table replication)',
      'Strictly the shared out-of-band FMC Management interface',
      'Public ISP BGP transit ports via Spanning Tree',
      'Only console serial cables',
    ],
    correctIndex: 0,
    explanation:
      'FTD Active/Standby HA replicates configuration changes over the HA Control Link and continuously mirrors live NAT/TCP session state tables over the State Link.',
  },
  {
    id: 'scor-24',
    domain: 'CyberOps Regular Expressions & Logs',
    prompt:
      'In a SIEM / Snort rule log search, why do analysts monitor `HTTP 200 OK` anomalies paired with rare user-agents (`curl/`, `python-requests/`, `powershell`) going outbound to raw IP URLs?',
    options: [
      'Raw IP HTTP requests with non-browser User-Agents indicate automated malware payload staging or scripted C2 beacons',
      'Chrome and Edge default to sending `python-requests/` headers on TLS 1.3',
      'Internal Active Directory GPO updates use raw public IP HTTP GETs',
      'All healthy SaaS apps disable DNS names completely',
    ],
    correctIndex: 0,
    explanation:
      'Corporate browsers resolve DNS hostnames and advertise standard browser User-Agents; scripted C2/droppers frequently call raw external IPs directly with anomalous User-Agents.',
  },
  {
    id: 'scor-25',
    domain: 'Cisco ISE Wired/Wireless AAA Order',
    prompt:
      'In an ISE Policy Set, how does **Authentication Policy** differ functionally from **Authorization Policy**?',
    options: [
      'Authentication verifies WHO/WHAT the identity is (Identity Source: AD/Certs); Authorization decides WHAT network access they receive (VLAN, dACL, SGT)',
      'Authorization runs first before checking credentials',
      'Authentication pushes VLAN IDs while Authorization validates passwords',
      'Both policies perform identical firewall NAT actions',
    ],
    correctIndex: 0,
    explanation:
      'Authentication confirms identity validity (e.g., against Active Directory or Certificate Store); Authorization evaluates identity + device profile + posture conditions to return enforcement profiles (VLAN, dACL, SGT).',
  },
  {
    id: 'scor-26',
    domain: 'SCOR API & Threat Intelligence (STIX/TAXII)',
    prompt:
      'Which open standards pair together across SIEMs and Threat Intelligence Platforms (TIPs) to structure Indicators of Compromise (IoCs) and transport them automatically?',
    options: [
      'STIX (structured JSON schema for IoCs/TTPs) + TAXII (HTTPS transport protocol)',
      'SAML + OAuth 2.0',
      'SNMPv3 + NetFlow',
      'BGP EVPN + VXLAN',
    ],
    correctIndex: 0,
    explanation:
      'STIX defines standardized machine-readable cyber threat intelligence representations, while TAXII handles automated server/client exchange over HTTPS.',
  },
  {
    id: 'scor-27',
    domain: 'Firewall DoS & TCP SYN Floods',
    prompt:
      'When an external botnet floods a DMZ web server with millions of incomplete TCP SYN packets exhausting firewall state tables, which mitigation technique responds to clients first before allocating server state?',
    options: [
      'TCP SYN Cookies / SYN Proxy (`syn-cookie` / Threat Defense embryonic connection limits)',
      'Disabling HTTP Keep-Alive on the load balancer only',
      'Switching firewall interfaces to passive Promiscuous span mode',
      'Removing inbound ACL port limits completely',
    ],
    correctIndex: 0,
    explanation:
      'SYN Proxy / SYN Cookies intercept half-open TCP SYN requests at the firewall/load-balancer edge and forward connections to backend servers ONLY after the client completes the 3-way ACK.',
  },
  {
    id: 'scor-28',
    domain: 'CyberOps MITRE ATT&CK Mapping',
    prompt:
      'An attacker executes `whoami`, `net group "Domain Admins" /domain`, and `nltest /dclist` immediately after gaining a foothold. Which MITRE ATT&CK tactic describes these commands?',
    options: ['Discovery', 'Initial Access', 'Impact (Ransomware)', 'Exfiltration'],
    correctIndex: 0,
    explanation:
      'Enumerating local privileges, domain controllers, and Active Directory groups maps directly to the **Discovery** tactic in MITRE ATT&CK.',
  },
  {
    id: 'scor-29',
    domain: 'ISE FlexVPN / PKI Revocation',
    prompt:
      'Why should enterprise VPN & 802.1X EAP-TLS deployments enforce **OCSP or CRL checking** during certificate authentication?',
    options: [
      'So stolen laptops or terminated employee certificates can be revoked and blocked immediately before the certificate’s multi-year expiration date',
      'To double the SSL encryption throughput on firewall ASICs',
      'To allow self-signed browser certificates without warnings',
      'To bypass Active Directory group lookups completely',
    ],
    correctIndex: 0,
    explanation:
      'Without CRL or real-time OCSP revocation checks, any valid unexpired X.509 certificate on a stolen device keeps granting VPN/802.1X access until expiry.',
  },
  {
    id: 'scor-30',
    domain: 'Cross-Domain Security (SCOR -> SIEM)',
    prompt:
      'Why is **NetFlow / IPFIX** telemetry combined with firewall syslog events inside a modern NDR/SIEM platform?',
    options: [
      'Firewalls only log perimeter crossings, whereas NetFlow/IPFIX captures internal east-west lateral flow volume, ports, and talkers across campus switches',
      'NetFlow automatically decrypts TLS 1.3 web traffic',
      'Syslog replaces switch MAC address learning completely',
      'IPFIX acts as an active packet-blocking IPS engine',
    ],
    correctIndex: 0,
    explanation:
      'NetFlow/IPFIX exposes east-west lateral movement (SMB/RDP/SSH scans between internal VLANs) that never hits perimeter firewalls, complementing syslog and EDR alerts.',
  },
];
