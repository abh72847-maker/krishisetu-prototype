import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, ShieldCheck, ArrowRight, Play, UserCheck, Building2 } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { tryDemo, loading } = useAuth();
  const { t } = useLanguage();

  const handleFarmerDemo = async () => {
    const res = await tryDemo('farmer');
    if (res.success) {
      navigate('/input');
    }
  };

  const handleBuyerDemo = async () => {
    const res = await tryDemo('buyer');
    if (res.success) {
      navigate('/buyer-dashboard');
    }
  };

  return (
    <div class="min-h flex flex-col justify-between">
      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        
        {/* Live Agriculture Updates Marquee */}
        <div class="marquee-wrap">
          <div class="marquee-track">
            <span>🧅 Lasalgaon Onion Mandi rates updated</span>
            <span>🚜 Direct Farmer to Mandi Net Realisation calculator live</span>
            <span>💧 Rain advisory for Nashik & Pune districts</span>
            <span>🤝 Verified institutional buyers active this week</span>
            <span>📦 Shared freight & FPO volume aggregation options ready</span>
            <span>🧅 Lasalgaon Onion Mandi rates updated</span>
            <span>🚜 Direct Farmer to Mandi Net Realisation calculator live</span>
            <span>💧 Rain advisory for Nashik & Pune districts</span>
          </div>
        </div>

        {/* Hero Section */}
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text Panel */}
          <div class="lg:col-span-7 sih-hero-panel p-8 sm:p-12 space-y-6">
            <span class="sih-tag">
              <TrendingUp class="w-4 h-4 mr-1 text-emerald-800" /> Smart India Hackathon Prototype
            </span>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              Sell Smarter. <br />
              <span class="text-emerald-800 underline decoration-amber-400 decoration-4">Earn Better.</span>
            </h1>

            <p class="text-base sm:text-lg text-slate-800 font-extrabold max-w-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* SEPARATE FARMER & BUYER DEMO ACTION BUTTONS */}
            <div class="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleFarmerDemo}
                disabled={loading}
                class="sih-btn-primary px-7 py-4 text-base font-black flex items-center gap-2.5 shadow-lg"
              >
                <Play class="w-5 h-5 fill-current" />
                <span>👨‍🌾 FARMER DEMO</span>
                <ArrowRight class="w-5 h-5" />
              </button>

              <button
                onClick={handleBuyerDemo}
                disabled={loading}
                class="px-7 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base rounded-2xl transition shadow-lg flex items-center gap-2.5 border-2 border-amber-500"
              >
                <Building2 class="w-5 h-5" />
                <span>🤝 BUYER DEMO</span>
              </button>
            </div>

            {/* Separate Demo Credentials Hint Box */}
            <div class="p-5 bg-white border-2 border-emerald-300 rounded-2xl text-left shadow-sm space-y-2">
              <div class="flex items-center gap-2 text-emerald-950 font-black text-xs">
                <UserCheck class="w-4 h-4 text-emerald-700" />
                <span>SIH Judge Demo Login Profiles:</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-900 font-extrabold">
                <div class="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <p class="text-emerald-900">👨‍🌾 Farmer Login:</p>
                  <p class="font-mono text-slate-950">Mobile: 9999999999</p>
                  <p class="font-mono text-slate-950">Password: demo123</p>
                </div>
                <div class="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <p class="text-amber-900">🤝 Mandi Buyer Login:</p>
                  <p class="font-mono text-slate-950">Mobile: 8888888888</p>
                  <p class="font-mono text-slate-950">Password: buyer123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero High-Contrast Visual Card */}
          <div class="lg:col-span-5">
            <div class="sih-card p-8 bg-emerald-950 text-white space-y-6 relative overflow-hidden border-4 border-emerald-700 shadow-2xl">
              <div class="flex items-center justify-between border-b border-emerald-800 pb-4">
                <span class="text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                  Net Realisation Engine
                </span>
                <span class="text-xs text-amber-300 font-bold font-mono">Lasalgaon APMC</span>
              </div>

              <div class="space-y-2">
                <p class="text-xs text-amber-400 uppercase font-black tracking-widest">TOP RECOMMENDATION</p>
                <div class="text-3xl font-black text-white flex items-center gap-2">
                  <span>🟢 SELL NOW</span>
                </div>
                <p class="text-base font-bold text-emerald-100">
                  Recommended Market: <strong class="text-amber-300 font-black">Lasalgaon (Nashik)</strong>
                </p>
              </div>

              <div class="bg-emerald-900/90 rounded-2xl p-5 border-2 border-emerald-700 flex justify-between items-center shadow-inner">
                <div>
                  <p class="text-xs text-amber-300 font-black uppercase tracking-wider">EXPECTED NET INCOME</p>
                  <p class="text-4xl font-black text-amber-400">₹10,100</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-emerald-100 font-extrabold uppercase">Net Realisation</p>
                  <p class="text-lg font-black text-white">₹2,020 / q</p>
                </div>
              </div>

              <div class="flex items-center justify-between text-xs text-emerald-100 font-extrabold pt-2 border-t border-emerald-800">
                <span class="flex items-center gap-1.5"><ShieldCheck class="w-4 h-4 text-amber-400" /> Verified Buyers</span>
                <span>Calculates Logistics Overheads</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-emerald-200 py-6 text-center text-xs text-slate-700 font-black">
        <p>Prototype demonstration using simulated market data. Production version can integrate verified market data sources such as Agmarknet / data.gov.in.</p>
      </footer>
    </div>
  );
};

export default Landing;
