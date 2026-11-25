import React from 'react';

export const LoadingFallback: React.FC = () => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-3 border-orange-200 border-t-[#ea6d24] animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-[#152e4d] opacity-80 animate-pulse" />
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-widest animate-pulse">
        Loading Learnify...
      </p>
    </div>
  );
};
