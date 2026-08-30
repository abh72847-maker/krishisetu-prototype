import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, ShieldCheck, Phone, CheckCircle, Search, MapPin, Scale } from 'lucide-react';

const mockFarmerListings = [
  { id: 1, farmer: "Ramesh Patil", location: "Nashik", crop: "Onion 🧅", quantity: "500 kg", quality: "Grade A (Premium)", pricePerKg: "₹25/kg", expectedPrice: "₹12,500", urgency: "Within 3 Days", phone: "+919876543210" },
  { id: 2, farmer: "Sanjay Deshmukh", location: "Pimpalgaon", crop: "Tomato 🍅", quantity: "800 kg", quality: "Grade A", pricePerKg: "₹24/kg", expectedPrice: "₹19,200", urgency: "Immediate / Today", phone: "+919822334455" },
  { id: 3, farmer: "Vitthal Pawar", location: "Ahmednagar", crop: "Wheat 🌾", quantity: "1,500 kg", quality: "Grade B", pricePerKg: "₹22/kg", expectedPrice: "₹33,000", urgency: "7 Days", phone: "+919765432109" },
];

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState({});
  const [placedBidId, setPlacedBidId] = useState(null);

  const handleBidSubmit = (id) => {
    setPlacedBidId(id);
    setTimeout(() => {
      setPlacedBidId(null);
    }, 4000);
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div class="bg-emerald-950 text-white rounded-3xl p-8 shadow-xl border-4 border-emerald-800 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-black uppercase text-amber-400 bg-emerald-900 px-3.5 py-1 rounded-full border border-emerald-700">
            🤝 Mandi Buyer & Institutional Procurement Portal
          </span>
          <span class="text-xs font-bold bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
            ⭐ Verified APMC Trader
          </span>
        </div>
        <h2 class="text-3xl font-black text-white">{user?.name || 'FreshMart Procurement Hub'}</h2>
        <p class="text-sm font-bold text-emerald-200">
          Discover verified farmer produce listings, submit direct buying offers, and arrange farm-gate pickup.
        </p>
      </div>

      {/* Active Listings Grid */}
      <div class="space-y-4">
        <h3 class="text-2xl font-black text-slate-900 flex items-center gap-2">
          <span>🌾 Direct Farmer Produce Listings for Bidding</span>
        </h3>

        {placedBidId && (
          <div class="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-950 font-black text-sm flex items-center gap-2">
            <CheckCircle class="w-5 h-5 text-emerald-700" />
            <span>Buying offer submitted! The farmer will receive an instant notification to confirm your deal.</span>
          </div>
        )}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockFarmerListings.map((item) => (
            <div key={item.id} class="sih-card p-6 bg-white border-2 border-emerald-200 rounded-3xl space-y-4 shadow-lg flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-2xl font-black text-slate-950">{item.crop}</h4>
                    <p class="text-xs font-bold text-slate-600">Farmer: {item.farmer}</p>
                  </div>
                  <span class="text-xs font-black bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg">
                    📍 {item.location}
                  </span>
                </div>

                <div class="space-y-1 text-xs font-bold text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div class="flex justify-between"><span>Quantity:</span><span class="font-black text-slate-950">{item.quantity}</span></div>
                  <div class="flex justify-between"><span>Quality Grade:</span><span class="font-black text-slate-950">{item.quality}</span></div>
                  <div class="flex justify-between"><span>Urgency:</span><span class="font-black text-emerald-800">{item.urgency}</span></div>
                  <div class="flex justify-between border-t border-slate-200 pt-1 text-slate-950 font-black text-sm">
                    <span>Expected Total:</span><span class="text-amber-700">{item.expectedPrice}</span>
                  </div>
                </div>
              </div>

              {/* Action Bidding & Direct Call */}
              <div class="space-y-2 pt-2">
                <div class="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter offer ₹/kg"
                    value={bids[item.id] || ''}
                    onChange={(e) => setBids({ ...bids, [item.id]: e.target.value })}
                    class="w-full px-3 py-2 text-xs border border-emerald-300 rounded-xl font-bold focus:outline-none"
                  />
                  <button
                    onClick={() => handleBidSubmit(item.id)}
                    class="sih-btn-primary px-4 py-2 text-xs font-black shrink-0"
                  >
                    Submit Offer
                  </button>
                </div>

                <a
                  href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.farmer)},%20I%20am%20a%20Verified%20Buyer%20interested%20in%20buying%20your%20${encodeURIComponent(item.crop)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Phone class="w-3.5 h-3.5" />
                  <span>1-Tap WhatsApp Bargain</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
