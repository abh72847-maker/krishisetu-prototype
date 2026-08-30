import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Award, ShieldCheck, Droplets, Sun } from 'lucide-react';

const Schemes = () => {
  const { t } = useLanguage();

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div class="text-center space-y-2">
        <span class="sih-tag">📜 Financial Support & Subsidies</span>
        <h2 class="text-3xl font-black text-slate-900">{t('schemesTitle')}</h2>
        <p class="text-sm font-semibold text-slate-600">{t('schemesSubtitle')}</p>
      </div>

      {/* Grid of Government Schemes */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PM-KISAN */}
        <div class="sih-card p-6 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 text-2xl font-bold">
              🌾
            </div>
            <h3 class="text-xl font-black text-slate-900">{t('pmKisanTitle')}</h3>
            <p class="text-sm font-semibold text-slate-600 leading-relaxed">{t('pmKisanDesc')}</p>
            <span class="inline-block text-xs font-extrabold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              Eligibility: Registered Landholding Farmers
            </span>
          </div>

          <a
            href="https://pmkisan.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            class="sih-btn-primary py-3 text-center text-xs font-black flex items-center justify-center gap-2"
          >
            <span>Official PM-KISAN Portal</span>
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>

        {/* PM Fasal Bima Yojana */}
        <div class="sih-card p-6 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800 text-2xl font-bold">
              🛡️
            </div>
            <h3 class="text-xl font-black text-slate-900">{t('pmfbyTitle')}</h3>
            <p class="text-sm font-semibold text-slate-600 leading-relaxed">{t('pmfbyDesc')}</p>
            <span class="inline-block text-xs font-extrabold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
              Eligibility: Insured Crop Growers
            </span>
          </div>

          <a
            href="https://pmfby.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            class="sih-btn-primary py-3 text-center text-xs font-black flex items-center justify-center gap-2"
          >
            <span>Official PMFBY Portal</span>
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>

        {/* PM Krishi Sinchai Yojana */}
        <div class="sih-card p-6 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-800 text-2xl font-bold">
              💧
            </div>
            <h3 class="text-xl font-black text-slate-900">{t('pmksyTitle')}</h3>
            <p class="text-sm font-semibold text-slate-600 leading-relaxed">{t('pmksyDesc')}</p>
            <span class="inline-block text-xs font-extrabold bg-cyan-50 text-cyan-800 px-3 py-1 rounded-full border border-cyan-200">
              Eligibility: Micro-Irrigation Farmers
            </span>
          </div>

          <a
            href="https://pmksy.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            class="sih-btn-primary py-3 text-center text-xs font-black flex items-center justify-center gap-2"
          >
            <span>Official PMKSY Portal</span>
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>

        {/* Solar Pump Scheme */}
        <div class="sih-card p-6 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 text-2xl font-bold">
              ☀️
            </div>
            <h3 class="text-xl font-black text-slate-900">{t('solarTitle')}</h3>
            <p class="text-sm font-semibold text-slate-600 leading-relaxed">{t('solarDesc')}</p>
            <span class="inline-block text-xs font-extrabold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              Eligibility: Maharashtra Farmers (Off-Grid)
            </span>
          </div>

          <a
            href="https://kms.mahadiscom.in/"
            target="_blank"
            rel="noopener noreferrer"
            class="sih-btn-primary py-3 text-center text-xs font-black flex items-center justify-center gap-2"
          >
            <span>Mahadiscom Solar Portal</span>
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Schemes;
