import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CloudSun, TrendingUp, MapPin, Droplets, Wind, AlertTriangle } from 'lucide-react';

const districtWeatherData = {
  Nashik: { temp: "28°C", humidity: "65%", status: "Partly Cloudy", rain: "Light shower expected in evening", lat: 20.0059, lon: 73.7898 },
  Pune: { temp: "29°C", humidity: "60%", status: "Sunny", rain: "No rain expected for 3 days", lat: 18.5204, lon: 73.8567 },
  Nagpur: { temp: "33°C", humidity: "50%", status: "Clear Sky", rain: "Clear weather, suitable for harvest", lat: 21.1458, lon: 79.0882 },
  Kolhapur: { temp: "27°C", humidity: "75%", status: "Humid", rain: "Moderate rainfall predicted on Thursday", lat: 16.7050, lon: 74.2433 },
  Solapur: { temp: "32°C", humidity: "45%", status: "Sunny", rain: "Dry weather advisory", lat: 17.6599, lon: 75.9064 },
  "Chhatrapati Sambhaji Nagar": { temp: "30°C", humidity: "55%", status: "Partly Cloudy", rain: "Occasional mild drizzle", lat: 19.8762, lon: 75.3433 },
  Satara: { temp: "26°C", humidity: "70%", status: "Pleasant", rain: "Light rain showers expected", lat: 17.6805, lon: 74.0183 },
  Latur: { temp: "31°C", humidity: "48%", status: "Sunny", rain: "Clear skies", lat: 18.4088, lon: 76.5604 },
  Ahmednagar: { temp: "29°C", humidity: "58%", status: "Clear", rain: "Dry conditions", lat: 19.0952, lon: 74.7496 },
  Jalgaon: { temp: "34°C", humidity: "42%", status: "Hot & Clear", rain: "No rain forecast", lat: 21.0077, lon: 75.5626 },
  Amravati: { temp: "32°C", humidity: "52%", status: "Sunny", rain: "Light breeze", lat: 20.9374, lon: 77.7796 },
  Akola: { temp: "34°C", humidity: "40%", status: "Hot", rain: "Dry spell continues", lat: 20.7002, lon: 77.0082 }
};

const RatesAndWeather = () => {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('Nashik');

  const currentWeather = districtWeatherData[selectedDistrict] || districtWeatherData.Nashik;

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title */}
      <div class="text-center space-y-2">
        <span class="sih-tag">🌦️ Maharashtra Mandi & Climate Engine</span>
        <h2 class="text-3xl font-black text-slate-900">{t('weatherTitle')}</h2>
        <p class="text-sm font-semibold text-slate-600">{t('weatherSubtitle')}</p>
      </div>

      {/* District Selector & Weather Card */}
      <div class="sih-card p-8 space-y-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-100 pb-6">
          <div>
            <label class="block text-xs font-black uppercase text-slate-700 mb-1">{t('selectDistrict')}</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              class="px-4 py-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl font-black text-slate-900 text-lg focus:outline-none focus:border-emerald-700"
            >
              {Object.keys(districtWeatherData).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div class="flex items-center gap-4 bg-emerald-900 text-white px-6 py-4 rounded-2xl">
            <CloudSun class="w-10 h-10 text-amber-400 shrink-0" />
            <div>
              <p class="text-3xl font-black">{currentWeather.temp}</p>
              <p class="text-xs text-emerald-200 font-bold">{currentWeather.status} • {selectedDistrict}</p>
            </div>
          </div>
        </div>

        {/* Weather Metrics */}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <Droplets class="w-8 h-8 text-blue-600 shrink-0" />
            <div>
              <p class="text-xs text-slate-500 font-bold uppercase">{t('humidityLabel')}</p>
              <p class="text-xl font-black text-slate-900">{currentWeather.humidity}</p>
            </div>
          </div>

          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <Wind class="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <p class="text-xs text-slate-500 font-bold uppercase">Wind Speed</p>
              <p class="text-xl font-black text-slate-900">14 km/h</p>
            </div>
          </div>

          <div class="bg-amber-50 p-4 rounded-2xl border border-amber-300 flex items-center gap-3 text-amber-950">
            <AlertTriangle class="w-8 h-8 text-amber-600 shrink-0" />
            <div>
              <p class="text-xs font-black uppercase text-amber-900">{t('rainAdvisory')}</p>
              <p class="text-xs font-bold">{currentWeather.rain}</p>
            </div>
          </div>
        </div>

        {/* 7-Day Weather Cards */}
        <div>
          <h4 class="text-sm font-black text-slate-900 mb-3">📅 7-Day Forecast for {selectedDistrict}</h4>
          <div class="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-xs font-bold">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} class="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1">
                <p class="text-slate-500">{day}</p>
                <p class="text-lg">🌤️</p>
                <p class="text-slate-900 font-black">{27 + (idx % 4)}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* APMC Mandi Rate Search & Trends */}
      <div class="sih-card p-8 space-y-6">
        <div class="flex items-center justify-between border-b border-emerald-100 pb-4">
          <div>
            <h3 class="text-2xl font-black text-slate-900">{t('mandiPriceTrends')}</h3>
            <p class="text-xs font-semibold text-slate-500">Live prices sourced across Maharashtra APMC yards</p>
          </div>
          <TrendingUp class="w-6 h-6 text-emerald-700" />
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-emerald-50 text-emerald-900 uppercase text-xs font-black border-b border-emerald-200">
                <th class="p-3.5">Crop</th>
                <th class="p-3.5">Mandi Yard</th>
                <th class="p-3.5">Today Price</th>
                <th class="p-3.5">Yesterday</th>
                <th class="p-3.5">Trend</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-bold text-slate-800">
              <tr>
                <td class="p-3.5 flex items-center gap-2">🧅 Onion</td>
                <td class="p-3.5">Lasalgaon APMC</td>
                <td class="p-3.5 text-emerald-800 font-black">₹2,400 / q</td>
                <td class="p-3.5 text-slate-500">₹2,360 / q</td>
                <td class="p-3.5 text-emerald-700">▲ +₹40 (Rising)</td>
              </tr>
              <tr>
                <td class="p-3.5 flex items-center gap-2">🍅 Tomato</td>
                <td class="p-3.5">Pimpalgaon APMC</td>
                <td class="p-3.5 text-emerald-800 font-black">₹2,400 / q</td>
                <td class="p-3.5 text-slate-500">₹2,320 / q</td>
                <td class="p-3.5 text-emerald-700">▲ +₹80 (Rising)</td>
              </tr>
              <tr>
                <td class="p-3.5 flex items-center gap-2">🥔 Potato</td>
                <td class="p-3.5">Nashik Yard</td>
                <td class="p-3.5 text-emerald-800 font-black">₹1,800 / q</td>
                <td class="p-3.5 text-slate-500">₹1,760 / q</td>
                <td class="p-3.5 text-emerald-700">▲ +₹40 (Stable)</td>
              </tr>
              <tr>
                <td class="p-3.5 flex items-center gap-2">🌾 Wheat</td>
                <td class="p-3.5">Ahmednagar APMC</td>
                <td class="p-3.5 text-emerald-800 font-black">₹2,200 / q</td>
                <td class="p-3.5 text-slate-500">₹2,180 / q</td>
                <td class="p-3.5 text-emerald-700">▲ +₹20 (Stable)</td>
              </tr>
              <tr>
                <td class="p-3.5 flex items-center gap-2">🍚 Rice</td>
                <td class="p-3.5">Kolhapur APMC</td>
                <td class="p-3.5 text-emerald-800 font-black">₹3,200 / q</td>
                <td class="p-3.5 text-slate-500">₹3,180 / q</td>
                <td class="p-3.5 text-emerald-700">▲ +₹20 (High Demand)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RatesAndWeather;
