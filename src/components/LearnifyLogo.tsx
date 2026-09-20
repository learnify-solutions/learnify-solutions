import React from 'react';

interface LearnifyLogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'dark-bg';
  showTagline?: boolean;
  iconOnly?: boolean;
}

export const LearnifyLogo: React.FC<LearnifyLogoProps> = ({
  className = 'h-10 sm:h-12 w-auto',
  variant = 'color',
  iconOnly = false,
}) => {
  const isDarkBg = variant === 'white' || variant === 'dark-bg';

  if (iconOnly) {
    return (
      <img
        src="/learnify-icon.png"
        alt="Learnify Icon"
        width={457}
        height={464}
        decoding="async"
        className={`${className} object-contain select-none`}
        referrerPolicy="no-referrer"
      />
    );
  }

  if (isDarkBg) {
    return (
      <div className="bg-white px-3.5 py-2 rounded-xl inline-flex items-center shadow-xs border border-white/40 hover:bg-white/95 transition-all">
        <img
          src="/logo300.png"
          alt="Learnify - Pathway to Excellence"
          width={2385}
          height={464}
          decoding="async"
          className={`${className} object-contain select-none`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <img
      src="/logo300.png"
      alt="Learnify - Pathway to Excellence"
      width={2385}
      height={464}
      decoding="async"
      className={`${className} object-contain select-none`}
      referrerPolicy="no-referrer"
    />
  );
};

