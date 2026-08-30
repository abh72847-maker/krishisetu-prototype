import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, CheckCircle2, TrendingUp, DollarSign, ShieldCheck, ArrowRight, Sparkles, Truck } from 'lucide-react';

const MarketDecision = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [inputData, setInputData] = useState(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem('krishisetu_analysis');
    const savedInput = sessionStorage.getItem('krishisetu_input');
    if (!savedData) {
      navigate('/input');
      return;
    }
    setData(JSON.parse(savedData));
    setInputData(JSON.parse(savedInput));
  }, [navigate]);

  if (!data) return null;

  return (
    <div class="min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-1 space-y-8">
        
        {/* Top Summary Header Banner */}
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 sih-card-dark p-6">
          <div>
            <span class="text-xs font-black text-amber-400 uppercase tracking-widest bg-emerald-900 px-3.5 py-1 rounded-full border border-emerald-700">
              AI Market Decision Engine
            </span>
            <h2 class="text-3xl font-black text-white mt-2">AI SELLING DECISION</h2>
            <p class="text-sm text-emerald-100 font-bold mt-1">
              {data.quantity_kg} kg • {data.quality} {data.crop} • {data.location}
            </p>
          </div>

          <button
            onClick={() => navigate('/what-if')}
            class="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl transition shadow-lg flex items-center justify-center gap-2 border-2 border-amber-500 text-sm"
          >
            <span>EXPLORE WHAT-IF SIMULATOR</span>
            <ArrowRight class="w-5 h-5" />
          </button>
        </div>

        {/* Core Value Message Banner */}
        <div class="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 text-center text-emerald-950 font-black text-sm shadow-sm">
          💡 "We don't just tell farmers where the price is highest. We tell them where they can earn the most after costs."
        </div>

        {/* 1. MAIN RECOMMENDATION CARD */}
        <div class="sih-card-dark p-8 sm:p-10 space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Recommended Market Info */}
            <div class="space-y-3">
              <span class="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-black text-sm px-4 py-1.5 rounded-full uppercase tracking-wider shadow">
                🟢 {data.recommendation}
              </span>
              <p class="text-xs font-black text-amber-400 uppercase tracking-widest">RECOMMENDED MARKET</p>
              <h3 class="text-4xl sm:text-5xl font-black text-white drop-shadow-md">{data.recommended_market}</h3>
              <p class="text-xl font-black text-amber-300">₹{data.market_price_per_q.toLocaleString('en-IN')} / quintal</p>
            </div>

            {/* Net Realisation Highlight Box */}
            <div class="bg-emerald-900/90 rounded-2xl p-6 border-2 border-emerald-600 text-center space-y-2 shadow-inner">
              <p class="text-xs text-amber-400 font-black uppercase tracking-widest">EXPECTED NET REALISATION</p>
              <p class="text-3xl sm:text-4xl font-black text-white">
                ₹{data.net_realisation_per_q.toLocaleString('en-IN')} <span class="text-base font-bold text-amber-300">/ quintal</span>
              </p>
              <p class="text-xs text-emerald-100 font-extrabold">After transport, handling & losses</p>
            </div>

            {/* EXPECTED FARMER INCOME */}
            <div class="bg-amber-400 text-slate-950 rounded-2xl p-6 text-center shadow-2xl border-4 border-amber-500">
              <p class="text-xs font-black uppercase text-slate-900 tracking-widest">EXPECTED FARMER INCOME</p>
              <p class="text-4xl sm:text-5xl font-black tracking-tight mt-1 text-slate-950">
                ₹{data.expected_income.toLocaleString('en-IN')}
              </p>
              <p class="text-xs font-black text-slate-900 mt-1">({data.quantity_kg} kg @ ₹{data.net_realisation_per_q}/q net)</p>
            </div>

          </div>
        </div>

        {/* 2. NET REALISATION BREAKDOWN CARD */}
        <div class="sih-card-white p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 class="text-2xl font-black text-slate-950">Net Realisation Breakdown</h3>
              <p class="text-xs font-extrabold text-slate-700">Net Realisation = Selling Price − Transport − Handling − Storage − Expected Loss</p>
            </div>
            <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-900 font-bold border border-emerald-300">
              <DollarSign class="w-6 h-6 text-emerald-800" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Calculation Table */}
            <div class="space-y-3 font-extrabold text-slate-900 text-sm">
              <div class="flex justify-between py-2 border-b border-slate-200">
                <span class="text-slate-700">Selling Price</span>
                <span class="font-black text-slate-950">₹{data.breakdown.selling_price_per_q.toLocaleString('en-IN')}/q</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200 text-red-700">
                <span>Transport</span>
                <span class="font-black">− ₹{data.breakdown.transport_per_q.toLocaleString('en-IN')}/q</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200 text-red-700">
                <span>Handling</span>
                <span class="font-black">− ₹{data.breakdown.handling_per_q.toLocaleString('en-IN')}/q</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200 text-red-700">
                <span>Storage</span>
                <span class="font-black">− ₹{data.breakdown.storage_per_q.toLocaleString('en-IN')}/q</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200 text-red-700">
                <span>Expected Loss</span>
                <span class="font-black">− ₹{data.breakdown.expected_loss_per_q.toLocaleString('en-IN')}/q</span>
              </div>

              <div class="flex justify-between py-3.5 bg-emerald-100 px-4 rounded-xl border-2 border-emerald-400 text-emerald-950 font-black text-base">
                <span>NET REALISATION</span>
                <span class="text-emerald-950">₹{data.breakdown.net_realisation_per_q.toLocaleString('en-IN')}/q</span>
              </div>
            </div>

            {/* Income Result Box */}
            <div class="sih-card-dark p-6 text-center space-y-3 shadow-xl">
              <span class="text-xs font-black text-amber-400 uppercase tracking-widest">QUANTITY: {data.breakdown.quantity_kg} kg ({data.breakdown.quantity_quintals} quintals)</span>
              <p class="text-xs text-emerald-100 font-bold">Net Realisation × Quantity</p>
              <p class="text-4xl font-black text-amber-400">₹{data.breakdown.expected_income.toLocaleString('en-IN')}</p>
              <p class="text-xs text-emerald-200 font-semibold">Direct Expected Farmer Cash Income</p>
            </div>
          </div>
        </div>

        {/* 3. MARKET COMPARISON TABLE */}
        <div class="sih-card-white p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 class="text-2xl font-black text-slate-950">Market Comparison</h3>
              <p class="text-xs font-extrabold text-slate-700">AI Scoring formula: 40% Net Realisation + 25% Demand + 15% Reliability + 10% Distance + 10% Payment</p>
            </div>
            <TrendingUp class="w-6 h-6 text-emerald-700" />
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
              <thead>
                <tr class="bg-emerald-900 text-white uppercase text-xs font-black border-b border-emerald-950">
                  <th class="p-3.5">Market</th>
                  <th class="p-3.5">Price</th>
                  <th class="p-3.5">Distance</th>
                  <th class="p-3.5">Demand</th>
                  <th class="p-3.5">Net Realisation</th>
                  <th class="p-3.5">Expected Income</th>
                  <th class="p-3.5 text-center">AI Score</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 font-extrabold text-slate-950">
                {data.markets_comparison.map((m, idx) => (
                  <tr
                    key={idx}
                    class={m.is_recommended ? 'bg-emerald-100/90 border-l-4 border-l-emerald-800' : 'hover:bg-slate-50'}
                  >
                    <td class="p-3.5">
                      <div class="flex items-center gap-2">
                        <span class="font-black text-slate-950">{m.market_name}</span>
                        {m.is_recommended && (
                          <span class="text-xs bg-emerald-900 text-amber-300 px-2.5 py-0.5 rounded-full font-black shadow-sm">
                            ⭐ Recommended
                          </span>
                        )}
                      </div>
                      <span class="text-xs text-slate-700 font-extrabold">{m.location}</span>
                    </td>
                    <td class="p-3.5 text-slate-950">₹{m.price_per_quintal.toLocaleString('en-IN')}/q</td>
                    <td class="p-3.5 text-slate-800">{m.distance_km} km</td>
                    <td class="p-3.5">
                      <span class={`text-xs px-2.5 py-1 rounded-full font-black ${m.demand.includes('High') ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-900'}`}>
                        {m.demand}
                      </span>
                    </td>
                    <td class="p-3.5 text-emerald-950 font-black">₹{m.net_realisation_per_q.toLocaleString('en-IN')}/q</td>
                    <td class="p-3.5 text-amber-800 font-black">₹{m.expected_income.toLocaleString('en-IN')}</td>
                    <td class="p-3.5 text-center">
                      <span class={`inline-block px-3 py-1 rounded-xl text-xs font-black ${m.is_recommended ? 'bg-emerald-900 text-amber-300' : 'bg-slate-200 text-slate-900'}`}>
                        {m.ai_score}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. AI EXPLANATION & RECOMMENDED BUYER */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AI Reasons */}
          <div class="sih-card-white p-8 space-y-4">
            <h3 class="text-xl font-black text-slate-950 flex items-center gap-2">
              <Sparkles class="w-5 h-5 text-emerald-700" />
              <span>Why KrishiSetu recommends {data.recommended_market}</span>
            </h3>
            
            <div class="space-y-3 pt-2">
              {data.ai_reasons.map((reason, idx) => (
                <div key={idx} class="flex items-start gap-3 bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-300 text-emerald-950 font-black text-sm">
                  <CheckCircle2 class="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Buyer Card (FreshMart) */}
          <div class="sih-card-white p-8 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 class="text-xl font-black text-slate-950">Recommended Verified Buyer</h3>
              <ShieldCheck class="w-6 h-6 text-emerald-700" />
            </div>

            <div class="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-2xl font-black text-slate-950">{data.recommended_buyer.name}</h4>
                  <span class="inline-block mt-1 text-xs bg-emerald-900 text-amber-300 px-2.5 py-0.5 rounded-full font-black">
                    ⭐ {data.recommended_buyer.verified ? 'Verified Buyer' : 'Registered Partner'}
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-2xl font-black text-emerald-950">₹{data.recommended_buyer.price_per_kg}/kg</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-xs font-black text-slate-900 pt-2 border-t border-emerald-200">
                <div>📍 {data.recommended_buyer.distance_km} km away</div>
                <div>⏱️ {data.recommended_buyer.payment_days}</div>
                <div>⭐ {data.recommended_buyer.reliability_score}% Reliability Score</div>
                <div class="text-emerald-900 flex items-center gap-1 font-extrabold">
                  <Truck class="w-4 h-4 text-emerald-700" /> Direct Farmgate Pickup
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div class="text-center pt-4">
          <button
            onClick={() => navigate('/what-if')}
            class="sih-btn-primary px-10 py-5 text-xl font-black inline-flex items-center gap-3 shadow-xl"
          >
            <span>EXPLORE WHAT-IF SIMULATOR →</span>
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-emerald-200 py-4 text-center text-xs text-slate-700 font-extrabold mt-8">
        KrishiSetu AI • Smart India Hackathon Internal Prototype
      </footer>
    </div>
  );
};

export default MarketDecision;
