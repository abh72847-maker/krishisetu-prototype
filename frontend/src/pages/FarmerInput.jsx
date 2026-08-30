import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cropService } from '../services/api';
import { Sprout, Scale, MapPin, Award, Clock, ArrowRight, Loader2 } from 'lucide-react';

const FarmerInput = () => {
  const navigate = useNavigate();
  const { farmer } = useAuth();

  const [crop, setCrop] = useState('Onion');
  const [quantityKg, setQuantityKg] = useState(500);
  const [location, setLocation] = useState(farmer?.location || 'Nashik');
  const [quality, setQuality] = useState('Grade A');
  const [urgency, setUrgency] = useState('Need money within 3 days');

  const [validationError, setValidationError] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!quantityKg || quantityKg <= 0) {
      setValidationError('Quantity must be greater than 0 kg.');
      return;
    }

    const payload = {
      farmer_id: farmer?.id || 1,
      crop,
      quantity_kg: parseFloat(quantityKg),
      location,
      quality,
      urgency,
    };

    setLoadingStep(1);
    let currentStep = 1;
    const interval = setInterval(async () => {
      currentStep++;
      if (currentStep <= 4) {
        setLoadingStep(currentStep);
      } else {
        clearInterval(interval);
        try {
          const result = await cropService.analyzeCrop(payload);
          sessionStorage.setItem('krishisetu_analysis', JSON.stringify(result));
          sessionStorage.setItem('krishisetu_input', JSON.stringify(payload));
          navigate('/decision');
        } catch (err) {
          setLoadingStep(0);
          setValidationError(err.response?.data?.detail || 'Analysis failed. Please try again.');
        }
      }
    }, 600);
  };

  return (
    <div class="min-h flex flex-col justify-between">
      {/* Main Content Form */}
      <main class="max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div class="sih-card p-8 sm:p-10 relative overflow-hidden bg-white border-2 border-emerald-200">
          <div class="mb-8 border-b border-emerald-100 pb-6">
            <span class="sih-tag">
              Screen 2 • Sale Input
            </span>
            <h2 class="text-3xl font-black text-slate-900 mt-2">Let's find the best way to sell your crop</h2>
            <p class="text-sm font-bold text-slate-600 mt-1">
              Tell us about your crop and we'll compare markets, logistics and buyers.
            </p>
          </div>

          {validationError && (
            <div class="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-bold rounded-2xl">
              ⚠️ {validationError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleFormSubmit} class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Crop Dropdown */}
              <div>
                <label class="block text-xs font-black text-slate-800 uppercase mb-2 flex items-center gap-1.5">
                  <Sprout class="w-4 h-4 text-emerald-700" /> Crop
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  class="w-full px-4 py-3.5 bg-slate-50 border-2 border-emerald-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-emerald-700"
                >
                  <option value="Onion">🧅 Onion</option>
                  <option value="Tomato">🍅 Tomato</option>
                  <option value="Potato">🥔 Potato</option>
                  <option value="Wheat">🌾 Wheat</option>
                  <option value="Rice">🍚 Rice</option>
                </select>
              </div>

              {/* Quantity Input */}
              <div>
                <label class="block text-xs font-black text-slate-800 uppercase mb-2 flex items-center gap-1.5">
                  <Scale class="w-4 h-4 text-emerald-700" /> Quantity (kg)
                </label>
                <div class="relative">
                  <input
                    type="number"
                    min="10"
                    step="10"
                    required
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(e.target.value)}
                    class="w-full px-4 py-3.5 bg-slate-50 border-2 border-emerald-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-emerald-700"
                  />
                  <span class="absolute right-4 top-3.5 text-xs font-black text-slate-700 uppercase bg-slate-200 px-2.5 py-1 rounded-lg">
                    kg
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Location Dropdown */}
              <div>
                <label class="block text-xs font-black text-slate-800 uppercase mb-2 flex items-center gap-1.5">
                  <MapPin class="w-4 h-4 text-emerald-700" /> Farm Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  class="w-full px-4 py-3.5 bg-slate-50 border-2 border-emerald-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-emerald-700"
                >
                  <option value="Nashik">Nashik</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmednagar">Ahmednagar</option>
                  <option value="Kolhapur">Kolhapur</option>
                  <option value="Nagpur">Nagpur</option>
                </select>
              </div>

              {/* Quality Dropdown */}
              <div>
                <label class="block text-xs font-black text-slate-800 uppercase mb-2 flex items-center gap-1.5">
                  <Award class="w-4 h-4 text-emerald-700" /> Quality Grade
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  class="w-full px-4 py-3.5 bg-slate-50 border-2 border-emerald-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-emerald-700"
                >
                  <option value="Grade A">Grade A (Premium)</option>
                  <option value="Grade B">Grade B (Standard)</option>
                  <option value="Grade C">Grade C (Commercial)</option>
                </select>
              </div>

              {/* Urgency Dropdown */}
              <div>
                <label class="block text-xs font-black text-slate-800 uppercase mb-2 flex items-center gap-1.5">
                  <Clock class="w-4 h-4 text-emerald-700" /> Urgency
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  class="w-full px-4 py-3.5 bg-slate-50 border-2 border-emerald-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-emerald-700"
                >
                  <option value="Need money today">Need money today</option>
                  <option value="Need money within 3 days">Need money within 3 days</option>
                  <option value="Can wait 7 days">Can wait 7 days</option>
                  <option value="Can wait 15 days">Can wait 15 days</option>
                </select>
              </div>
            </div>

            {/* Submission Button */}
            <div class="pt-4">
              <button
                type="submit"
                disabled={loadingStep > 0}
                class="sih-btn-primary w-full py-4 text-lg font-black flex items-center justify-center gap-3"
              >
                <span>GET BEST SELLING DECISION</span>
                <ArrowRight class="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* 4-Step Animated Loading Overlay */}
      {loadingStep > 0 && (
        <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="sih-card p-8 max-w-md w-full text-center space-y-6 border-4 border-emerald-600 bg-white">
            <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 animate-spin">
              <Loader2 class="w-10 h-10" />
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-black text-slate-900">AI Decision Engine at Work</h3>
              <p class="text-sm font-black text-emerald-800">
                {loadingStep === 1 && 'Analyzing market prices...'}
                {loadingStep === 2 && 'Calculating logistics...'}
                {loadingStep === 3 && 'Comparing buyers...'}
                {loadingStep === 4 && 'Finding the best selling decision...'}
              </p>
            </div>

            <div class="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                class="bg-emerald-700 h-full transition-all duration-500"
                style={{ width: `${(loadingStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer class="bg-white border-t border-emerald-200 py-4 text-center text-xs text-slate-600 font-bold">
        KrishiSetu AI • Smart India Hackathon Internal Prototype
      </footer>
    </div>
  );
};

export default FarmerInput;
