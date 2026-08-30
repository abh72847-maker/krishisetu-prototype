import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cropService } from '../services/api';
import { Sprout, TrendingUp, Users, Calendar, DollarSign, ArrowLeft } from 'lucide-react';

const WhatIfSimulator = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [whatIfData, setWhatIfData] = useState(null);
  
  const [activeChoice, setActiveChoice] = useState('sell_now');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = sessionStorage.getItem('krishisetu_analysis');
    const savedInput = sessionStorage.getItem('krishisetu_input');
    if (!savedData) {
      navigate('/input');
      return;
    }

    const aData = JSON.parse(savedData);
    const iData = JSON.parse(savedInput);

    setAnalysisData(aData);
    setInputData(iData);

    const fetchWhatIf = async () => {
      try {
        const payload = {
          farmer_id: iData.farmer_id || 1,
          crop: iData.crop,
          quantity_kg: parseFloat(iData.quantity_kg),
          location: iData.location,
          quality: iData.quality,
          urgency: iData.urgency,
          selected_market: aData.recommended_market,
        };
        const res = await cropService.getWhatIf(payload);
        setWhatIfData(res);
      } catch (err) {
        console.error('What-if API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhatIf();
  }, [navigate]);

  if (loading || !analysisData || !whatIfData) {
    return (
      <div class="min-h-screen bg-slate-50 flex items-center justify-center">
        <div class="text-center space-y-3">
          <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 animate-spin">
            <Sprout class="w-6 h-6" />
          </div>
          <p class="text-sm font-bold text-slate-700">Calculating What-If Financial Scenarios...</p>
        </div>
      </div>
    );
  }

  const selectedOpt = whatIfData[activeChoice];

  return (
    <div class="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header class="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-30">
        <div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate('/decision')}
            class="flex items-center gap-2 text-xs font-extrabold text-slate-700 hover:text-emerald-700 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200"
          >
            <ArrowLeft class="w-4 h-4" /> Back to AI Decision
          </button>

          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-black text-lg">
              🌾
            </div>
            <h1 class="text-lg font-black text-slate-900 tracking-tight">KrishiSetu AI</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="max-w-4xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        
        {/* Page Header */}
        <div class="text-center space-y-2">
          <span class="sih-tag">
            Screen 4 • What-If Financial Simulator
          </span>
          <h2 class="text-3xl font-black text-slate-900">What-If Simulator</h2>
          <p class="text-sm font-semibold text-slate-600">
            See how different selling choices could affect your income.
          </p>
        </div>

        {/* Baseline Income Header Card */}
        <div class="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">CURRENT DECISION</span>
            <h3 class="text-2xl font-black text-white mt-0.5">🟢 SELL NOW ({analysisData.recommended_market})</h3>
            <p class="text-xs text-emerald-100 font-semibold">{analysisData.quantity_kg} kg • {analysisData.quality} {analysisData.crop}</p>
          </div>

          <div class="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-center">
            <p class="text-xs text-emerald-200 font-bold uppercase">Expected Baseline Income</p>
            <p class="text-3xl font-black text-amber-400">₹{analysisData.expected_income.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* THREE INTERACTIVE STRATEGY BUTTONS */}
        <div class="grid grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => setActiveChoice('sell_now')}
            class={`p-4 sm:p-5 rounded-2xl font-extrabold text-sm sm:text-base border-2 transition flex flex-col items-center justify-center gap-2 ${
              activeChoice === 'sell_now'
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-lg shadow-emerald-700/30 scale-102'
                : 'bg-white text-slate-700 border-emerald-200 hover:border-emerald-500'
            }`}
          >
            <DollarSign class="w-6 h-6" />
            <span>[ SELL NOW ]</span>
          </button>

          <button
            onClick={() => setActiveChoice('wait_3_days')}
            class={`p-4 sm:p-5 rounded-2xl font-extrabold text-sm sm:text-base border-2 transition flex flex-col items-center justify-center gap-2 ${
              activeChoice === 'wait_3_days'
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-lg shadow-emerald-700/30 scale-102'
                : 'bg-white text-slate-700 border-emerald-200 hover:border-emerald-500'
            }`}
          >
            <Calendar class="w-6 h-6" />
            <span>[ WAIT 3 DAYS ]</span>
          </button>

          <button
            onClick={() => setActiveChoice('join_fpo')}
            class={`p-4 sm:p-5 rounded-2xl font-extrabold text-sm sm:text-base border-2 transition flex flex-col items-center justify-center gap-2 ${
              activeChoice === 'join_fpo'
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-lg shadow-emerald-700/30 scale-102'
                : 'bg-white text-slate-700 border-emerald-200 hover:border-emerald-500'
            }`}
          >
            <Users class="w-6 h-6" />
            <span>[ JOIN FPO ]</span>
          </button>
        </div>

        {/* DYNAMIC SCENARIO RESULT DISPLAY CARD */}
        <div class="sih-card p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div>
              <span class="text-xs font-black uppercase tracking-wider text-emerald-700">Simulated Strategy</span>
              <h3 class="text-3xl font-black text-slate-900 mt-1">{selectedOpt.title}</h3>
            </div>
            <span class="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-3 py-1.5 rounded-full">
              {selectedOpt.ai_decision}
            </span>
          </div>

          {/* CHOICE 1: SELL NOW DISPLAY */}
          {activeChoice === 'sell_now' && (
            <div class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p class="text-xs text-slate-500 font-bold uppercase">Current Price</p>
                  <p class="text-xl font-black text-slate-900">₹{selectedOpt.current_price_per_q.toLocaleString('en-IN')}/q</p>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p class="text-xs text-slate-500 font-bold uppercase">Net Realisation</p>
                  <p class="text-xl font-black text-emerald-700">₹{selectedOpt.net_realisation_per_q.toLocaleString('en-IN')}/q</p>
                </div>
                <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-300">
                  <p class="text-xs text-emerald-800 font-bold uppercase">Expected Income</p>
                  <p class="text-2xl font-black text-emerald-800">₹{selectedOpt.expected_income.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div class="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-emerald-950 font-bold text-sm">
                <p class="text-emerald-800 font-black mb-1">🟢 AI DECISION: SELL NOW</p>
                <p class="text-slate-700 font-semibold">{selectedOpt.explanation}</p>
              </div>
            </div>
          )}

          {/* CHOICE 2: WAIT 3 DAYS DISPLAY */}
          {activeChoice === 'wait_3_days' && (
            <div class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p class="text-xs text-slate-500 font-bold uppercase">Current Price</p>
                  <p class="text-xl font-black text-slate-900">₹{selectedOpt.current_price_per_q.toLocaleString('en-IN')}/q</p>
                </div>
                <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-300">
                  <p class="text-xs text-emerald-800 font-bold uppercase">AI Forecast (3 Days)</p>
                  <p class="text-xl font-black text-emerald-800">₹{selectedOpt.forecast_price_per_q.toLocaleString('en-IN')}/q</p>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p class="text-xs text-slate-500 font-bold uppercase">Expected Income</p>
                  <p class="text-xl font-black text-slate-900">₹{selectedOpt.expected_income.toLocaleString('en-IN')}</p>
                </div>
                <div class="bg-amber-50 p-4 rounded-2xl border border-amber-300">
                  <p class="text-xs text-amber-900 font-bold uppercase">Potential Gain</p>
                  <p class="text-2xl font-black text-amber-700">+{selectedOpt.diff_income >= 0 ? `₹${selectedOpt.diff_income.toLocaleString('en-IN')}` : `₹${selectedOpt.diff_income}`}</p>
                </div>
              </div>

              <div class="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-amber-950 font-bold text-sm">
                <p class="text-amber-900 font-black mb-1">🟡 AI DECISION: {selectedOpt.ai_decision}</p>
                <p class="text-slate-700 font-semibold">{selectedOpt.explanation}</p>
                <p class="text-xs text-slate-500 font-medium mt-2">AI Forecast Model: Trained using Scikit-Learn RandomForest / LinearRegression on historical Mandi prices.</p>
              </div>
            </div>
          )}

          {/* CHOICE 3: JOIN FPO DISPLAY */}
          {activeChoice === 'join_fpo' && (
            <div class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-sm font-bold text-slate-800">
                  <p class="text-xs text-slate-500 uppercase font-black">Individual Sale</p>
                  <div class="flex justify-between"><span>Quantity:</span><span>{analysisData.quantity_kg} kg</span></div>
                  <div class="flex justify-between"><span>Individual Offer:</span><span>₹{selectedOpt.current_price_per_q / 100}/kg</span></div>
                  <div class="flex justify-between border-t border-slate-200 pt-2 text-slate-900 font-black">
                    <span>Individual Income:</span><span>₹{analysisData.expected_income.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 space-y-2 text-sm font-bold text-emerald-950">
                  <p class="text-xs text-emerald-800 uppercase font-black">FPO Bulk Group Negotiation</p>
                  <div class="flex justify-between"><span>Combined Quantity:</span><span>2,000 kg (Bulk)</span></div>
                  <div class="flex justify-between"><span>Negotiated Offer:</span><span>₹{selectedOpt.forecast_price_per_q / 100}/kg</span></div>
                  <div class="flex justify-between border-t border-emerald-200 pt-2 text-emerald-900 font-black">
                    <span>FPO Income:</span><span>₹{selectedOpt.expected_income.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Profit Gain Highlight */}
              <div class="bg-amber-500 text-slate-950 rounded-2xl p-6 text-center shadow-lg border border-amber-400">
                <p class="text-xs font-black uppercase tracking-wider text-slate-900">ADDITIONAL POTENTIAL INCOME</p>
                <p class="text-4xl font-black text-slate-950 mt-1">+₹{selectedOpt.diff_income.toLocaleString('en-IN')}</p>
                <p class="text-xs font-bold text-slate-800 mt-1">⭐ Recommended Strategy for Maximum Financial Impact</p>
              </div>

              <div class="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-emerald-950 font-bold text-sm">
                <p class="text-emerald-800 font-black mb-1">🟢 AI DECISION: JOIN FPO ⭐</p>
                <p class="text-slate-700 font-semibold">{selectedOpt.explanation}</p>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM RESET / ACTION */}
        <div class="flex justify-between items-center pt-4">
          <button
            onClick={() => navigate('/input')}
            class="sih-btn-secondary px-6 py-3 font-bold text-xs"
          >
            ← Test New Crop Input
          </button>
          <button
            onClick={() => navigate('/decision')}
            class="sih-btn-primary px-6 py-3 font-bold text-xs"
          >
            View Decision Details →
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-emerald-100 py-4 text-center text-xs text-slate-500 font-semibold">
        KrishiSetu AI • Smart India Hackathon Internal Prototype
      </footer>
    </div>
  );
};

export default WhatIfSimulator;
