import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Truck, Scale, MapPin, CheckCircle, ShieldCheck, DollarSign } from 'lucide-react';

const Transport = () => {
  const { t } = useLanguage();
  const [vehicle, setVehicle] = useState('pickup15t');
  const [distanceKm, setDistanceKm] = useState(65);
  const [payer, setPayer] = useState('farmer'); // 'farmer' | 'buyer'
  const [booked, setBooked] = useState(false);

  const ratePerKm = vehicle === 'pickup15t' ? 15 : vehicle === 'tractor3t' ? 22 : 35;
  const rawFreight = distanceKm * ratePerKm;
  const totalFreight = payer === 'buyer' ? 0 : rawFreight;

  const handleBook = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div class="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div class="text-center space-y-2">
        <span class="sih-tag">🚚 Logistics & Transport Engine</span>
        <h2 class="text-3xl font-black text-slate-900">{t('transportTitle')}</h2>
        <p class="text-sm font-extrabold text-slate-700">{t('transportSubtitle')}</p>
      </div>

      {/* Booking Form Card */}
      <div class="sih-card-white p-8 space-y-6">
        <form onSubmit={handleBook} class="space-y-6">
          
          {/* Freight Cost Payer Toggle (Who Pays Transport?) */}
          <div>
            <label class="block text-xs font-black uppercase text-slate-900 mb-2">
              💳 Transport Payment Model (Who Pays Freight?)
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPayer('farmer')}
                class={`p-4 rounded-2xl border-2 text-left font-black text-xs transition flex flex-col justify-between ${
                  payer === 'farmer' ? 'bg-emerald-100 border-emerald-700 text-emerald-950 shadow' : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-black text-slate-950">👨‍🌾 Farmer Self-Paid Freight</span>
                  {payer === 'farmer' && <span class="text-emerald-800 font-black">✓ Active</span>}
                </div>
                <p class="text-[11px] text-slate-700 mt-2 font-bold">Standard APMC Mandi transport paid by farmer.</p>
              </button>

              <button
                type="button"
                onClick={() => setPayer('buyer')}
                class={`p-4 rounded-2xl border-2 text-left font-black text-xs transition flex flex-col justify-between ${
                  payer === 'buyer' ? 'bg-amber-100 border-amber-600 text-slate-950 shadow' : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-black text-slate-950">🤝 Buyer Farm-Gate Pickup</span>
                  {payer === 'buyer' && <span class="text-amber-800 font-black">⭐ Buyer Pays</span>}
                </div>
                <p class="text-[11px] text-slate-700 mt-2 font-bold">Verified institutional buyer absorbs 100% transport cost!</p>
              </button>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label class="block text-xs font-black uppercase text-slate-900 mb-3">{t('vehicleType')}</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setVehicle('pickup15t')}
                class={`p-4 rounded-2xl border-2 text-left font-extrabold transition flex flex-col justify-between h-32 ${
                  vehicle === 'pickup15t' ? 'bg-emerald-100 border-emerald-700 text-emerald-950' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <div>
                  <span class="text-2xl">🛻</span>
                  <p class="text-sm font-black mt-1 text-slate-950">Mahindra PickUp 1.5T</p>
                </div>
                <p class="text-xs text-slate-700 font-extrabold">₹15 / km • Cap: 1500 kg</p>
              </button>

              <button
                type="button"
                onClick={() => setVehicle('tractor3t')}
                class={`p-4 rounded-2xl border-2 text-left font-extrabold transition flex flex-col justify-between h-32 ${
                  vehicle === 'tractor3t' ? 'bg-emerald-100 border-emerald-700 text-emerald-950' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <div>
                  <span class="text-2xl">🚜</span>
                  <p class="text-sm font-black mt-1 text-slate-950">Tractor Trolley 3T</p>
                </div>
                <p class="text-xs text-slate-700 font-extrabold">₹22 / km • Cap: 3000 kg</p>
              </button>

              <button
                type="button"
                onClick={() => setVehicle('eicher8t')}
                class={`p-4 rounded-2xl border-2 text-left font-extrabold transition flex flex-col justify-between h-32 ${
                  vehicle === 'eicher8t' ? 'bg-emerald-100 border-emerald-700 text-emerald-950' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <div>
                  <span class="text-2xl">🚛</span>
                  <p class="text-sm font-black mt-1 text-slate-950">Eicher Truck 8T</p>
                </div>
                <p class="text-xs text-slate-700 font-extrabold">₹35 / km • Cap: 8000 kg</p>
              </button>
            </div>
          </div>

          {/* Distance Slider */}
          <div>
            <div class="flex justify-between items-center mb-2 text-sm font-black text-slate-900">
              <span>{t('distanceKm')}</span>
              <span class="text-emerald-900 text-lg font-black">{distanceKm} km</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseInt(e.target.value))}
              class="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>

          {/* Live Cost Calculation Card */}
          <div class="sih-card-dark p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="text-xs text-amber-400 font-black uppercase tracking-wider">
                {payer === 'buyer' ? 'FARMER TRANSPORT COST (BUYER PAID)' : t('estFreight')}
              </p>
              <div class="flex items-baseline gap-2">
                <p class="text-4xl font-black text-amber-400">
                  {payer === 'buyer' ? '₹0' : `₹${totalFreight.toLocaleString('en-IN')}`}
                </p>
                {payer === 'buyer' && (
                  <span class="text-xs text-emerald-200 font-black line-through">
                    ₹{rawFreight.toLocaleString('en-IN')} (Saved by Farmer!)
                  </span>
                )}
              </div>
              <p class="text-xs text-emerald-100 font-extrabold mt-1">
                {payer === 'buyer' ? '🤝 Verified buyer absorbs full transit cost' : 'Includes Loading & Unloading Assistance'}
              </p>
            </div>

            <button
              type="submit"
              class="sih-btn-primary px-6 py-3.5 text-sm font-black shrink-0"
            >
              {payer === 'buyer' ? 'CONFIRM FARM-GATE PICKUP' : t('bookDriverBtn')}
            </button>
          </div>

        </form>

        {/* Dispatch Confirmation Card */}
        {booked && (
          <div class="p-6 bg-emerald-100 border-2 border-emerald-400 rounded-2xl space-y-3 text-emerald-950">
            <div class="flex items-center gap-2 font-black text-lg">
              <CheckCircle class="w-6 h-6 text-emerald-700" />
              <span>{payer === 'buyer' ? 'Buyer Farmgate Transport Dispatched!' : t('bookingSuccess')}</span>
            </div>
            <div class="text-xs font-black text-slate-900 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-300">
              <div>👨‍✈️ Driver: Ramesh Patil</div>
              <div>📞 Phone: 98234-11029</div>
              <div>🚚 Vehicle: MH-15-AG-4921</div>
              <div>💳 Freight: {payer === 'buyer' ? 'Paid by FreshMart' : `₹${totalFreight}`}</div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Guarantee */}
      <div class="sih-card-white p-6 flex items-center gap-4 text-xs font-extrabold text-slate-900">
        <ShieldCheck class="w-8 h-8 text-emerald-700 shrink-0" />
        <p>All drivers are verified by KrishiSetu. Transit crop insurance up to ₹1,00,000 included in every booking.</p>
      </div>
    </div>
  );
};

export default Transport;
