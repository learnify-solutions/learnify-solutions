import React, { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, KeyRound, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { LearnifyLogo } from './LearnifyLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUsername, password: cleanPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg('Authentication verified. Loading Admin Control Panel...');
        localStorage.setItem('learnify_admin_token', data.token || 'auth_token_learnify_2026');
        localStorage.setItem('learnify_admin_authenticated', 'true');
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess();
        }, 600);
      } else {
        setIsLoading(false);
        setErrorMsg(data.error || 'Invalid administrator username or password');
      }
    } catch {
      setIsLoading(false);
      setErrorMsg('Network error. Unable to verify credentials at this time.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#15344f] to-[#1b5a88] px-6 py-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-xs font-semibold"
          >
            Exit to Website
          </button>
          
          <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center mb-3 text-[#ea6d24]">
            <Shield className="w-6 h-6 text-orange-400" />
          </div>
          
          <h2 className="text-xl font-black tracking-tight text-white">Learnify Admin Portal</h2>
          <p className="text-xs text-slate-300 mt-1">Authorized Management & CMS Access</p>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-800 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username or email"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-[#ea6d24] focus:ring-2 focus:ring-orange-200 outline-hidden transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full px-3.5 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-[#ea6d24] focus:ring-2 focus:ring-orange-200 outline-hidden transition-all text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#ea6d24] hover:bg-[#d85e19] active:bg-[#c25114] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Authenticate & Access CMS</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="border-t border-slate-100 pt-4 text-center">
            <p className="text-[11px] text-slate-400">
              🔒 Confidential & Secure. Direct route: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">/admin</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
