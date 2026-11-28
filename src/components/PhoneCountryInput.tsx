import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface CountryDialOption {
  iso: string;
  dial: string;
  label: string;
  placeholder: string;
}

export const COUNTRY_DIAL_OPTIONS: CountryDialOption[] = [
  { iso: 'US', dial: '+1', label: 'United States / Canada (+1)', placeholder: '571 346 0704' },
  { iso: 'GB', dial: '+44', label: 'United Kingdom (+44)', placeholder: '7700 900123' },
  { iso: 'AE', dial: '+971', label: 'UAE (+971)', placeholder: '50 123 4567' },
  { iso: 'ZA', dial: '+27', label: 'South Africa (+27)', placeholder: '82 123 4567' },
  { iso: 'IN', dial: '+91', label: 'India (+91)', placeholder: '98765 43210' },
  { iso: 'DE', dial: '+49', label: 'Germany (+49)', placeholder: '151 23456789' },
  { iso: 'NL', dial: '+31', label: 'Netherlands (+31)', placeholder: '6 12345678' },
  { iso: 'FR', dial: '+33', label: 'France (+33)', placeholder: '6 12 34 56 78' },
  { iso: 'AU', dial: '+61', label: 'Australia (+61)', placeholder: '412 345 678' },
  { iso: 'SG', dial: '+65', label: 'Singapore (+65)', placeholder: '8123 4567' },
  { iso: 'SA', dial: '+966', label: 'Saudi Arabia (+966)', placeholder: '50 123 4567' },
  { iso: 'QA', dial: '+974', label: 'Qatar (+974)', placeholder: '3312 3456' },
  { iso: 'BH', dial: '+973', label: 'Bahrain (+973)', placeholder: '3312 3456' },
  { iso: 'OM', dial: '+968', label: 'Oman (+968)', placeholder: '9123 4567' },
  { iso: 'KW', dial: '+965', label: 'Kuwait (+965)', placeholder: '5123 4567' },
  { iso: 'TN', dial: '+216', label: 'Tunisia (+216)', placeholder: '94 479 918' },
  { iso: 'EG', dial: '+20', label: 'Egypt (+20)', placeholder: '10 1234 5678' },
  { iso: 'NG', dial: '+234', label: 'Nigeria (+234)', placeholder: '802 123 4567' },
  { iso: 'AO', dial: '+244', label: 'Angola (+244)', placeholder: '923 123 456' },
  { iso: 'KE', dial: '+254', label: 'Kenya (+254)', placeholder: '712 345678' },
  { iso: 'PK', dial: '+92', label: 'Pakistan (+92)', placeholder: '300 1234567' },
  { iso: 'MY', dial: '+60', label: 'Malaysia (+60)', placeholder: '12 345 6789' },
  { iso: 'ID', dial: '+62', label: 'Indonesia (+62)', placeholder: '812 3456 7890' },
  { iso: 'PH', dial: '+63', label: 'Philippines (+63)', placeholder: '917 123 4567' },
  { iso: 'CH', dial: ' +41'.trim(), label: 'Switzerland (+41)', placeholder: '79 123 45 67' },
  { iso: 'IE', dial: '+353', label: 'Ireland (+353)', placeholder: '85 123 4567' },
  { iso: 'ES', dial: '+34', label: 'Spain (+34)', placeholder: '612 34 56 78' },
  { iso: 'IT', dial: '+39', label: 'Italy (+39)', placeholder: '312 345 6789' },
  { iso: 'SE', dial: '+46', label: 'Sweden (+46)', placeholder: '70 123 45 67' },
  { iso: 'BR', dial: '+55', label: 'Brazil (+55)', placeholder: '11 91234 5678' },
  { iso: 'MX', dial: '+52', label: 'Mexico (+52)', placeholder: '55 1234 5678' },
  { iso: 'NZ', dial: '+64', label: 'New Zealand (+64)', placeholder: '21 123 4567' },
];

const REGION_TO_DIAL: Record<string, string> = {
  ae: '+971',
  sa: '+966',
  za: '+27',
  ao: '+244',
  ng: '+234',
  uk: '+44',
  gb: '+44',
  de: '+49',
  nl: '+31',
  eu: '+49',
  sg: '+65',
  us: '+1',
  in: '+91',
};

function detectBrowserDialCode(): string {
  if (typeof Intl === 'undefined') return '+1';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Dubai') || tz.includes('Abu_Dhabi')) return '+971';
    if (tz.includes('Johannesburg')) return '+27';
    if (tz.includes('Luanda')) return '+244';
    if (tz.includes('London')) return '+44';
    if (tz.includes('Kolkata') || tz.includes('Calcutta')) return '+91';
    if (tz.includes('Berlin') || tz.includes('Munich')) return '+49';
    if (tz.includes('Amsterdam')) return '+31';
    if (tz.includes('Paris')) return '+33';
    if (tz.includes('Riyadh')) return '+966';
    if (tz.includes('Qatar')) return '+974';
    if (tz.includes('Bahrain')) return '+973';
    if (tz.includes('Muscat')) return '+968';
    if (tz.includes('Kuwait')) return '+965';
    if (tz.includes('Tunis')) return '+216';
    if (tz.includes('Cairo')) return '+20';
    if (tz.includes('Lagos')) return '+234';
    if (tz.includes('Nairobi')) return '+254';
    if (tz.includes('Karachi')) return '+92';
    if (tz.includes('Singapore')) return '+65';
    if (tz.includes('Kuala_Lumpur')) return '+60';
    if (tz.includes('Jakarta')) return '+62';
    if (tz.includes('Manila')) return '+63';
    if (tz.includes('Sydney') || tz.includes('Melbourne')) return '+61';
    if (tz.includes('Auckland')) return '+64';
    if (tz.startsWith('America/')) return '+1';
    if (tz.startsWith('Europe/')) return '+44';
  } catch {
    // ignore Intl fallback errors
  }
  return '+1';
}

function splitDialAndLocal(rawValue: string, fallbackDial: string): { dial: string; local: string } {
  const trimmed = (rawValue || '').trim();
  if (!trimmed) return { dial: fallbackDial, local: '' };

  if (trimmed.startsWith('+') || trimmed.startsWith('00')) {
    const normalized = trimmed.startsWith('00') ? `+${trimmed.slice(2)}` : trimmed;
    const sorted = [...COUNTRY_DIAL_OPTIONS].sort((a, b) => b.dial.length - a.dial.length);
    for (const opt of sorted) {
      if (normalized.startsWith(opt.dial)) {
        const rest = normalized.slice(opt.dial.length).replace(/^[\s-]+/, '');
        return { dial: opt.dial, local: rest };
      }
    }
    const spaceMatch = normalized.match(/^(\+\d{1,4})\s*(.*)$/);
    if (spaceMatch) {
      return { dial: spaceMatch[1], local: spaceMatch[2] };
    }
  }

  return { dial: fallbackDial, local: trimmed };
}

interface PhoneCountryInputProps {
  id?: string;
  value: string;
  onChange: (fullValue: string) => void;
  defaultRegion?: string;
  required?: boolean;
  placeholder?: string;
  variant?: 'light' | 'dark' | 'soft';
  size?: 'sm' | 'md';
}

export const PhoneCountryInput: React.FC<PhoneCountryInputProps> = ({
  id,
  value,
  onChange,
  defaultRegion,
  required = false,
  placeholder,
  variant = 'light',
  size = 'md',
}) => {
  const resolvedDefault =
    (defaultRegion && REGION_TO_DIAL[defaultRegion.toLowerCase()]) || detectBrowserDialCode();

  const [dialCode, setDialCode] = useState<string>(() => splitDialAndLocal(value, resolvedDefault).dial);
  const [localNumber, setLocalNumber] = useState<string>(() => splitDialAndLocal(value, resolvedDefault).local);

  useEffect(() => {
    if (!value) {
      setLocalNumber('');
      return;
    }
    const parsed = splitDialAndLocal(value, dialCode);
    if (parsed.dial !== dialCode && value.startsWith('+')) {
      setDialCode(parsed.dial);
    }
    if (parsed.local !== localNumber) {
      setLocalNumber(parsed.local);
    }
  }, [value]);

  const activeOption =
    COUNTRY_DIAL_OPTIONS.find((o) => o.dial === dialCode) || COUNTRY_DIAL_OPTIONS[0];

  const emitCombined = (nextDial: string, nextLocal: string) => {
    const cleaned = nextLocal.trim();
    if (!cleaned) {
      onChange('');
      return;
    }
    if (cleaned.startsWith('+') || cleaned.startsWith('00')) {
      const parsed = splitDialAndLocal(cleaned, nextDial);
      setDialCode(parsed.dial);
      setLocalNumber(parsed.local);
      onChange(parsed.local ? `${parsed.dial} ${parsed.local}` : '');
      return;
    }
    const digitsOnly = cleaned.replace(/[^\d\s()-]/g, '');
    const dialDigits = nextDial.replace('+', '');
    const strippedDigits = digitsOnly.replace(/\D/g, '');
    if (
      dialDigits === '1' &&
      strippedDigits.length === 11 &&
      strippedDigits.startsWith('1')
    ) {
      const national = strippedDigits.slice(1);
      setLocalNumber(national);
      onChange(`+1 ${national}`);
      return;
    }
    onChange(`${nextDial} ${digitsOnly}`);
  };

  const handleDialChange = (nextDial: string) => {
    setDialCode(nextDial);
    if (localNumber.trim()) {
      emitCombined(nextDial, localNumber);
    }
  };

  const handleNumberChange = (nextLocal: string) => {
    setLocalNumber(nextLocal);
    emitCombined(dialCode, nextLocal);
  };

  const isDark = variant === 'dark';
  const isSm = size === 'sm';

  const wrapperCls = isDark
    ? 'bg-slate-800/90 border-slate-700 text-white focus-within:ring-2 focus-within:ring-[#ea6d24] focus-within:border-[#ea6d24]'
    : variant === 'soft'
    ? 'bg-slate-50 border-slate-300 text-[#152e4d] focus-within:bg-white focus-within:border-[#ea6d24] focus-within:ring-1 focus-within:ring-[#ea6d24]'
    : 'bg-white border-slate-300 text-[#152e4d] focus-within:border-[#ea6d24] focus-within:ring-2 focus-within:ring-[#ea6d24]/30';

  const selectorTriggerCls = isDark
    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700/70'
    : 'border-slate-200 bg-slate-100/80 text-[#152e4d] hover:bg-slate-200/70';

  const heightCls = isSm ? 'h-9 text-xs' : 'min-h-[42px] text-sm';

  return (
    <div
      className={`flex items-stretch w-full rounded-lg border overflow-hidden transition-all ${heightCls} ${wrapperCls}`}
    >
      {/* Compact Unified Country Selector (~68-74px wide) */}
      <div
        className={`relative flex items-center justify-center gap-1 px-2 border-r shrink-0 select-none transition-colors ${selectorTriggerCls}`}
        title={activeOption.label}
      >
        <span className="font-bold text-xs whitespace-nowrap tracking-tight">
          {activeOption.iso} {activeOption.dial}
        </span>
        <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
        <select
          aria-label="Country dial code"
          value={dialCode}
          onChange={(e) => handleDialChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        >
          {COUNTRY_DIAL_OPTIONS.map((opt) => (
            <option key={`${opt.iso}-${opt.dial}`} value={opt.dial} className="text-slate-900 bg-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Spacious Phone Number Input */}
      <input
        id={id}
        type="tel"
        required={required}
        value={localNumber}
        onChange={(e) => handleNumberChange(e.target.value)}
        placeholder={placeholder || activeOption.placeholder}
        autoComplete="tel-national"
        className={`flex-1 min-w-0 bg-transparent px-3 focus:outline-hidden ${
          isDark ? 'text-white placeholder-slate-500' : 'text-[#152e4d] placeholder-slate-400'
        } ${isSm ? 'text-xs' : 'text-sm'}`}
      />
    </div>
  );
};
