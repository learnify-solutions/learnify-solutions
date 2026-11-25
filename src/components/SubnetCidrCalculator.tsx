import React, { useMemo, useState } from 'react';
import { Check, Copy, Network, RotateCcw, ShieldAlert } from 'lucide-react';

interface SubnetCalculation {
  valid: boolean;
  error?: string;
  ipNormalized: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsable: string;
  lastUsable: string;
  totalIps: number;
  usableHosts: number;
  reservedNote: string;
  ipScope: string;
  binaryMask: string;
  binaryNetwork: string;
}

const PRESET_CIDRS = [16, 20, 22, 24, 25, 26, 27, 28, 29, 30, 32] as const;

function parseIpv4ToUint32(ip: string): number | null {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return null;
  let result = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const num = Number(part);
    if (num < 0 || num > 255) return null;
    result = ((result << 8) | num) >>> 0;
  }
  return result >>> 0;
}

function uint32ToIpv4(val: number): string {
  return [
    (val >>> 24) & 255,
    (val >>> 16) & 255,
    (val >>> 8) & 255,
    val & 255,
  ].join('.');
}

function uint32ToBinaryDotted(val: number): string {
  return [24, 16, 8, 0]
    .map((shift) => ((val >>> shift) & 255).toString(2).padStart(8, '0'))
    .join('.');
}

function classifyIpv4Scope(val: number): string {
  const first = (val >>> 24) & 255;
  const second = (val >>> 16) & 255;
  if (first === 10) return 'RFC 1918 Private (Class A Range)';
  if (first === 172 && second >= 16 && second <= 31) return 'RFC 1918 Private (Class B Range)';
  if (first === 192 && second === 168) return 'RFC 1918 Private (Class C Range)';
  if (first === 100 && second >= 64 && second <= 127) return 'RFC 6598 CGNAT Shared Space';
  if (first === 169 && second === 254) return 'Link-Local / Cloud IMDS (169.254.0.0/16)';
  if (first === 127) return 'Loopback Range (127.0.0.0/8)';
  if (first >= 224 && first <= 239) return 'Multicast (Class D)';
  return 'Public Routable IPv4';
}

function calculateSubnet(
  ipInput: string,
  cidr: number,
  mode: 'rfc' | 'cloud'
): SubnetCalculation {
  const ipInt = parseIpv4ToUint32(ipInput);
  if (ipInt === null) {
    return {
      valid: false,
      error: 'Enter a valid IPv4 address such as 10.20.4.0 or 192.168.10.55.',
      ipNormalized: ipInput,
      cidr,
      subnetMask: '-',
      wildcardMask: '-',
      networkAddress: '-',
      broadcastAddress: '-',
      firstUsable: '-',
      lastUsable: '-',
      totalIps: 0,
      usableHosts: 0,
      reservedNote: '',
      ipScope: '-',
      binaryMask: '-',
      binaryNetwork: '-',
    };
  }

  const clampedCidr = Math.min(32, Math.max(8, Math.round(cidr)));
  const hostBits = 32 - clampedCidr;
  const maskInt = clampedCidr === 0 ? 0 : (~((1 << hostBits) - 1)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  const totalIps = Math.pow(2, hostBits);

  let usableHosts = 0;
  let firstUsableInt = networkInt;
  let lastUsableInt = broadcastInt;
  let reservedNote = '';

  if (clampedCidr === 32) {
    usableHosts = 1;
    firstUsableInt = networkInt;
    lastUsableInt = networkInt;
    reservedNote = 'Host route (/32) identifies a single endpoint or loopback interface.';
  } else if (clampedCidr === 31) {
    usableHosts = mode === 'cloud' ? 0 : 2;
    firstUsableInt = networkInt;
    lastUsableInt = broadcastInt;
    reservedNote =
      mode === 'cloud'
        ? 'AWS VPC & Azure VNet do not permit /31 subnets (minimum supported prefix is /28 or /29).'
        : 'RFC 3021 Point-to-Point router link (both IPs usable, no broadcast needed).';
  } else if (mode === 'cloud') {
    usableHosts = Math.max(0, totalIps - 5);
    firstUsableInt = (networkInt + 4) >>> 0;
    lastUsableInt = (broadcastInt - 1) >>> 0;
    reservedNote =
      'Cloud mode reserves 5 IPs: .0 Network, .1 VPC/VNet Router, .2 DNS, .3 Future, and Last IP Broadcast.';
  } else {
    usableHosts = Math.max(0, totalIps - 2);
    firstUsableInt = (networkInt + 1) >>> 0;
    lastUsableInt = (broadcastInt - 1) >>> 0;
    reservedNote =
      'Standard RFC mode reserves 2 IPs: the Network ID (.0) and Subnet Broadcast IP.';
  }

  return {
    valid: true,
    ipNormalized: uint32ToIpv4(ipInt),
    cidr: clampedCidr,
    subnetMask: uint32ToIpv4(maskInt),
    wildcardMask: uint32ToIpv4(wildcardInt),
    networkAddress: uint32ToIpv4(networkInt),
    broadcastAddress: uint32ToIpv4(broadcastInt),
    firstUsable: usableHosts > 0 ? uint32ToIpv4(firstUsableInt) : 'None available',
    lastUsable: usableHosts > 0 ? uint32ToIpv4(lastUsableInt) : 'None available',
    totalIps,
    usableHosts,
    reservedNote,
    ipScope: classifyIpv4Scope(networkInt),
    binaryMask: uint32ToBinaryDotted(maskInt),
    binaryNetwork: uint32ToBinaryDotted(networkInt),
  };
}

export const SubnetCidrCalculator: React.FC = () => {
  const [ipInput, setIpInput] = useState('10.20.4.0');
  const [cidr, setCidr] = useState<number>(24);
  const [mode, setMode] = useState<'rfc' | 'cloud'>('cloud');
  const [copied, setCopied] = useState(false);

  const calc = useMemo(() => calculateSubnet(ipInput, cidr, mode), [ipInput, cidr, mode]);

  const handleCopySummary = () => {
    if (!calc.valid) return;
    const summary = [
      `CIDR Block: ${calc.networkAddress}/${calc.cidr} (${mode === 'cloud' ? 'AWS/Azure VPC' : 'Standard RFC'})`,
      `Subnet Mask: ${calc.subnetMask} | Wildcard: ${calc.wildcardMask}`,
      `Usable Range: ${calc.firstUsable} - ${calc.lastUsable}`,
      `Broadcast: ${calc.broadcastAddress} | Usable Hosts: ${calc.usableHosts.toLocaleString()} (${calc.totalIps.toLocaleString()} total)`,
    ].join('\n');

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(summary).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[#152e4d] flex items-center gap-2">
            <Network className="w-5 h-5 text-[#ea6d24]" />
            <span>Interactive IPv4 Subnet &amp; CIDR Calculator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Test any IPv4 address &amp; prefix (`/8`–`/32`), toggle AWS/Azure 5-reserved-IP VPC math vs
            Cisco/CompTIA RFC math, and inspect binary bit boundaries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIpInput('10.20.4.0');
            setCidr(24);
            setMode('cloud');
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-[#f8fafc] hover:bg-slate-100 text-xs font-semibold text-[#152e4d] cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Inputs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
        <div className="lg:col-span-4 space-y-1.5">
          <label htmlFor="subnet-ipv4-input" className="block text-xs font-bold uppercase tracking-wide text-slate-500">
            IPv4 Address
          </label>
          <input
            id="subnet-ipv4-input"
            type="text"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            placeholder="e.g. 10.20.4.0"
            className="w-full px-3.5 py-2.5 text-sm font-mono font-bold rounded-xl border border-slate-300 bg-[#f8fafc] text-[#152e4d] focus:outline-none focus:bg-white focus:border-[#ea6d24]"
          />
        </div>

        <div className="lg:col-span-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-500">
            <label htmlFor="subnet-cidr-slider">CIDR Prefix Length</label>
            <span className="font-mono text-sm font-extrabold text-[#ea6d24] tabular-nums">
              /{cidr}
            </span>
          </div>
          <input
            id="subnet-cidr-slider"
            type="range"
            min={8}
            max={32}
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="w-full accent-[#ea6d24] cursor-pointer h-2.5"
          />
        </div>

        <div className="lg:col-span-4 space-y-1.5">
          <span className="block text-xs font-bold uppercase tracking-wide text-slate-500">
            Host Calculation Mode
          </span>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#f8fafc] border border-slate-200 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('cloud')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mode === 'cloud'
                  ? 'bg-[#152e4d] text-white'
                  : 'text-slate-600 hover:text-[#152e4d]'
              }`}
            >
              AWS / Azure (-5)
            </button>
            <button
              type="button"
              onClick={() => setMode('rfc')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mode === 'rfc'
                  ? 'bg-[#152e4d] text-white'
                  : 'text-slate-600 hover:text-[#152e4d]'
              }`}
            >
              Cisco / RFC (-2)
            </button>
          </div>
        </div>
      </div>

      {/* Quick Prefix Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-slate-500 mr-1">Common Exam Masks:</span>
        {PRESET_CIDRS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setCidr(preset)}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border transition-colors cursor-pointer ${
              cidr === preset
                ? 'bg-[#ea6d24] border-[#ea6d24] text-white'
                : 'bg-white border-slate-200 text-[#152e4d] hover:border-[#ea6d24]'
            }`}
          >
            /{preset}
          </button>
        ))}
      </div>

      {/* Validation Error or Calculated Results */}
      {!calc.valid ? (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{calc.error}</span>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Primary Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#152e4d] text-white space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#f7944d]">
                Usable Host IPs
              </p>
              <p className="text-2xl font-extrabold font-mono tabular-nums">
                {calc.usableHosts.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-300 font-mono tabular-nums">
                Out of {calc.totalIps.toLocaleString()} total IPs
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Network / CIDR Block
              </p>
              <p className="text-lg font-extrabold font-mono text-[#152e4d] tabular-nums">
                {calc.networkAddress}/{calc.cidr}
              </p>
              <p className="text-[11px] text-slate-600 truncate">{calc.ipScope}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Subnet &amp; Wildcard Mask
              </p>
              <p className="text-base font-extrabold font-mono text-[#152e4d] tabular-nums">
                {calc.subnetMask}
              </p>
              <p className="text-[11px] font-mono text-slate-600 tabular-nums">
                Wildcard: {calc.wildcardMask}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Usable Host Range
              </p>
              <p className="text-sm font-extrabold font-mono text-[#152e4d] tabular-nums">
                {calc.firstUsable}
              </p>
              <p className="text-[11px] font-mono text-slate-600 tabular-nums">
                to {calc.lastUsable} (Bcast {calc.broadcastAddress})
              </p>
            </div>
          </div>

          {/* Binary Breakdown + Mode Note + Copy */}
          <div className="p-4 rounded-xl bg-[#fcfdfe] border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 text-xs">
              <p className="text-slate-700 font-medium">{calc.reservedNote}</p>
              <p className="font-mono text-[11px] text-slate-500 tabular-nums">
                <strong className="text-[#152e4d]">Mask Binary:</strong> {calc.binaryMask}{' '}
                <span className="mx-1.5">|</span>
                <strong className="text-[#152e4d]">Net Binary:</strong> {calc.binaryNetwork}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopySummary}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-300 text-[#152e4d] hover:border-[#ea6d24] hover:text-[#ea6d24]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Subnet Spec</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
