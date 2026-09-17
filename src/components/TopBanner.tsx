import React from 'react';
import { Mail, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

interface TopBannerProps {
  text?: string;
  linkText?: string;
  href?: string;
  enabled?: boolean;
  phoneNumber?: string;
  email?: string;
  onAction?: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({
  text,
  linkText = 'REGISTER NOW',
  href = '#register',
  enabled = true,
  phoneNumber = '+91 881 025 5422 (Chat Only)',
  email = 'info@learnify-solutions.com',
  onAction,
}) => {
  if (!enabled) return null;

  const sanitizedPhone = (phoneNumber || '').replace(/[^0-9+]/g, '');

  return (
    <aside
      id="top-contact-banner"
      aria-label="Direct Contact Details"
      className="w-full bg-[#ea6d24] text-white py-2.5 px-4 text-sm sm:text-base font-semibold tracking-wide transition-colors select-none"
    >
      <div className={`max-w-[1400px] mx-auto flex items-center ${text ? 'justify-between' : 'justify-center'} gap-8 sm:gap-16 md:gap-20 flex-wrap`}>
        {/* Left: Announcement / Summit Text (if provided) */}
        {text ? (
          <div className="flex items-center gap-2 text-xs font-bold flex-wrap">
            <span className="inline-flex items-center gap-1 bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-white fill-white/40" aria-hidden="true" />
              Announcement
            </span>
            <span className="font-semibold text-white/95 tracking-normal">
              {text}
            </span>
            {linkText && (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center gap-1 text-[11px] underline underline-offset-2 hover:text-orange-100 font-bold ml-1 cursor-pointer transition-colors focus:outline-hidden focus:ring-1 focus:ring-white rounded-xs"
              >
                <span>{linkText}</span>
                <ArrowRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              </button>
            )}
          </div>
        ) : null}

        {/* Contact Details */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap shrink-0">
          {phoneNumber && (
            <a
              id="top-bar-phone-link"
              href={`https://wa.me/${sanitizedPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat with our enterprise learning advisors on WhatsApp"
              className="inline-flex items-center gap-1.5 hover:text-orange-100 transition-colors focus:outline-hidden focus:ring-1 focus:ring-white rounded-xs px-1"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-[18px] h-[18px] text-white shrink-0" 
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span className="font-medium tracking-normal">{phoneNumber}</span>
            </a>
          )}

          {phoneNumber && email && (
            <span className="text-orange-200/50 hidden sm:inline select-none" aria-hidden="true">
              |
            </span>
          )}

          {email && (
            <a
              id="top-bar-email-link"
              href={`mailto:${email}`}
              title="Send inquiry email to Learnify Solutions"
              className="inline-flex items-center gap-1.5 hover:text-orange-100 transition-colors focus:outline-hidden focus:ring-1 focus:ring-white rounded-xs px-1"
            >
              <Mail className="w-[18px] h-[18px] text-white shrink-0" aria-hidden="true" />
              <span className="font-medium tracking-normal">{email}</span>
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};




