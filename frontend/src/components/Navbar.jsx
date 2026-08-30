import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Sprout, Truck, TrendingUp, FileText, Bot, UserCheck, Play, Lock, Phone, MapPin, User, Building2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, changeLanguage, t } = useLanguage();
  const { user, login, signup, tryDemo, logout, loading } = useAuth();

  const [activeModal, setActiveModal] = useState(null); // 'login' | 'signup' | null
  const [selectedRole, setSelectedRole] = useState('farmer'); // 'farmer' | 'buyer'
  const [errorMsg, setErrorMsg] = useState('');

  // Login form states
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form states
  const [signupName, setSignupName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupLocation, setSignupLocation] = useState('Nashik');
  const [signupPassword, setSignupPassword] = useState('');

  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-emerald-700 text-white font-black shadow-sm'
      : 'text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 font-bold';
  };

  const handleTryDemoClick = async (role = 'farmer') => {
    const res = await tryDemo(role);
    if (res.success) {
      if (role === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/input');
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(loginMobile, loginPassword, selectedRole);
    if (res.success) {
      setActiveModal(null);
      if (selectedRole === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/input');
      }
    } else {
      setErrorMsg(res.error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await signup(signupName, signupMobile, signupLocation, signupPassword, selectedRole);
    if (res.success) {
      setActiveModal(null);
      if (selectedRole === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/input');
      }
    } else {
      setErrorMsg(res.error);
    }
  };

  return (
    <header class="bg-white border-b-2 border-emerald-200 sticky top-0 z-40 shadow-sm text-slate-900">
      
      {/* Language Switcher Top Banner */}
      <div class="bg-emerald-900 text-white py-1.5 px-4 text-xs font-bold border-b border-emerald-800">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <span class="flex items-center gap-1.5 text-emerald-100 font-extrabold">
            🗣️ {t('chooseLang')}
          </span>
          <div class="flex items-center gap-1.5">
            <button
              onClick={() => changeLanguage('mr')}
              class={`px-3 py-1 rounded-lg text-xs font-black transition ${lang === 'mr' ? 'bg-amber-400 text-slate-950 shadow' : 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'}`}
            >
              मराठी
            </button>
            <button
              onClick={() => changeLanguage('hi')}
              class={`px-3 py-1 rounded-lg text-xs font-black transition ${lang === 'hi' ? 'bg-amber-400 text-slate-950 shadow' : 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => changeLanguage('en')}
              class={`px-3 py-1 rounded-lg text-xs font-black transition ${lang === 'en' ? 'bg-amber-400 text-slate-950 shadow' : 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Main Single Navbar Header */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <Link to="/" class="flex items-center gap-2.5 shrink-0">
          <div class="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-black text-xl shadow">
            🌾
          </div>
          <div>
            <h1 class="text-xl font-black text-slate-900 tracking-tight leading-tight">{t('brandName')}</h1>
            <p class="text-[10px] font-extrabold text-emerald-700">{t('tagline')}</p>
          </div>
        </Link>

        {/* Center Links */}
        <nav class="hidden lg:flex items-center gap-1 text-xs">
          <Link to="/" class={`px-3 py-2 rounded-xl transition ${isActive('/')}`}>
            {t('navHome')}
          </Link>
          <Link to="/input" class={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${isActive('/input') || isActive('/decision') || isActive('/what-if')}`}>
            <Sprout class="w-4 h-4 text-emerald-700" />
            <span>{t('navSell')}</span>
          </Link>
          <Link to="/transport" class={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${isActive('/transport')}`}>
            <Truck class="w-4 h-4 text-emerald-700" />
            <span>{t('navTransport')}</span>
          </Link>
          <Link to="/rates" class={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${isActive('/rates')}`}>
            <TrendingUp class="w-4 h-4 text-emerald-700" />
            <span>{t('navRates')}</span>
          </Link>
          <Link to="/schemes" class={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${isActive('/schemes')}`}>
            <FileText class="w-4 h-4 text-emerald-700" />
            <span>{t('navSchemes')}</span>
          </Link>
          <Link to="/ai-assistant" class={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${isActive('/ai-assistant')}`}>
            <Bot class="w-4 h-4 text-emerald-700" />
            <span>{t('navAI')}</span>
          </Link>
          {user?.role === 'buyer' && (
            <Link to="/buyer-dashboard" class={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${isActive('/buyer-dashboard')}`}>
              <Building2 class="w-4 h-4 text-amber-600" />
              <span class="text-amber-800 font-black">Buyer Portal</span>
            </Link>
          )}
        </nav>

        {/* Right Separate Login Buttons for Farmer & Buyer */}
        <div class="flex items-center gap-2">
          {!user ? (
            <>
              <button
                onClick={() => handleTryDemoClick('farmer')}
                disabled={loading}
                class="px-3.5 py-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition shadow flex items-center gap-1 border border-amber-500"
              >
                <Play class="w-3.5 h-3.5 fill-current" />
                <span>👨‍🌾 Farmer Demo</span>
              </button>

              <button
                onClick={() => handleTryDemoClick('buyer')}
                disabled={loading}
                class="px-3 py-2 text-xs font-black text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition shadow"
              >
                🤝 Buyer Demo
              </button>

              <button
                onClick={() => { setErrorMsg(''); setSelectedRole('farmer'); setActiveModal('login'); }}
                class="px-3 py-2 text-xs font-extrabold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition"
              >
                LOGIN
              </button>
            </>
          ) : (
            <div class="flex items-center gap-2">
              <div class="text-xs font-black text-emerald-950 bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-300 flex items-center gap-1.5">
                <UserCheck class="w-4 h-4 text-emerald-700" />
                <span>{user.name} ({user.role === 'buyer' ? 'Mandi Buyer' : 'Farmer'})</span>
              </div>
              <button
                onClick={logout}
                class="px-2.5 py-1.5 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>

      {/* LOGIN MODAL WITH SEPARATE FARMER / BUYER ROLE TOGGLE */}
      {activeModal === 'login' && (
        <div class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-slate-900">
          <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-emerald-300 relative">
            <button
              onClick={() => setActiveModal(null)}
              class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold"
            >
              ×
            </button>

            <h3 class="text-2xl font-black text-slate-900 mb-1">User Login</h3>
            <p class="text-xs font-bold text-slate-600 mb-4">Select your login profile type:</p>

            {/* SEPARATE ROLE SELECTOR TABS */}
            <div class="grid grid-cols-2 gap-2 mb-6">
              <button
                type="button"
                onClick={() => { setSelectedRole('farmer'); setLoginMobile('9999999999'); setLoginPassword('demo123'); }}
                class={`py-2.5 px-3 rounded-xl font-black text-xs border-2 transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'farmer' ? 'bg-emerald-700 text-white border-emerald-800 shadow' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                👨‍🌾 Farmer Login
              </button>

              <button
                type="button"
                onClick={() => { setSelectedRole('buyer'); setLoginMobile('8888888888'); setLoginPassword('buyer123'); }}
                class={`py-2.5 px-3 rounded-xl font-black text-xs border-2 transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'buyer' ? 'bg-emerald-700 text-white border-emerald-800 shadow' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                🤝 Mandi Buyer Login
              </button>
            </div>

            {errorMsg && (
              <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <div class="relative">
                  <Phone class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value)}
                    placeholder={selectedRole === 'buyer' ? '8888888888' : '9999999999'}
                    class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div class="relative">
                  <Lock class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                class="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl transition shadow-md text-sm uppercase"
              >
                {loading ? 'Authenticating...' : `LOGIN AS ${selectedRole === 'buyer' ? 'BUYER' : 'FARMER'} →`}
              </button>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
