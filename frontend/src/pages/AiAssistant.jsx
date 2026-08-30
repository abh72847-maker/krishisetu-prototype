import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bot, Send, User, Sparkles } from 'lucide-react';

const presetQuestions = [
  {
    en: "🧅 What is today's Onion rate in Lasalgaon Mandi?",
    mr: "🧅 आज लासलगाव बाजारात कांद्याला काय भाव आहे?",
    hi: "🧅 आज लासलगांव मंडी में प्याज का क्या भाव है?",
    ansEn: "🧅 Today's Onion rate in Lasalgaon APMC Mandi is ₹2,400/quintal (Rising +₹40). Net Realisation after transport freight to Lasalgaon is ₹2,020/q.",
    ansMr: "🧅 आज लासलगाव बाजार समितीत कांद्याचा दर ₹२,४००/क्विंटल आहे (वाढ +₹४०). वाहतूक व तोटा वजा करून निव्वळ उत्पन्न ₹२,०२०/क्विंटल आहे.",
    ansHi: "🧅 आज लासलगांव मंडी में प्याज का भाव ₹2,400/क्विंटल है। परिवहन और नुकसान काटकर शुद्ध आय ₹2,020/क्विंटल होगी।"
  },
  {
    en: "📜 How can I apply for PM-KISAN ₹6,000 scheme?",
    mr: "📜 पीएम-किसान ६,००० रु योजनेसाठी कसा अर्ज करावा?",
    hi: "📜 पीएम-किसान ₹6,000 योजना के लिए आवेदन कैसे करें?",
    ansEn: "📜 PM-KISAN provides ₹6,000/year direct cash transfer in 3 installments of ₹2,000. You can apply directly on the official portal pmkisan.gov.in with your Aadhaar and 7/12 land records.",
    ansMr: "📜 पीएम-किसान योजनेद्वारे दरवर्षी ₹६,००० थेट बँक खात्यात मिळतात. तुम्ही pmkisan.gov.in या अधिकृत संकेतस्थळावर आधार आणि ७/१२ दाखला वापरून अर्ज करू शकता.",
    ansHi: "📜 पीएम-किसान योजना के तहत ₹6,000 प्रति वर्ष 3 किस्तों में मिलते हैं। आप आधार कार्ड और जमीन के कागजात के साथ pmkisan.gov.in पर आवेदन कर सकते हैं।"
  },
  {
    en: "🚚 How much does farm transport cost per km?",
    mr: "🚚 शेत माल वाहतुकीचे दर प्रति किमी किती आहेत?",
    hi: "🚚 कृषि माल परिवहन का किराया प्रति किमी कितना है?",
    ansEn: "🚚 KrishiSetu Farm Transport rates: Mahindra PickUp (1.5T) @ ₹15/km, Tractor Trolley (3T) @ ₹22/km, Eicher Truck (8T) @ ₹35/km. Booking includes driver dispatch & transit crop insurance.",
    ansMr: "🚚 शेत माल वाहतूक दर: महिंद्रा पिकअप (१.५ टन) ₹१५/किमी, ट्रॅक्टर ट्रॉली (३ टन) ₹२२/किमी, आणि आयशर ट्रक (८ टन) ₹३५/किमी. बुकिंगमध्ये विमा समाविष्ट आहे.",
    ansHi: "🚚 कृषि परिवहन दरें: महिंद्रा पिकअप (1.5 टन) ₹15/किमी, ट्रैक्टर ट्रॉली (3 टन) ₹22/किमी, और आयशर ट्रक ₹35/किमी। बुकिंग में ड्राइवर और बीमा शामिल है।"
  },
  {
    en: "☀️ How to get 90% subsidy for Solar Agricultural Pump?",
    mr: "☀️ मागेल त्याला सौर कृषी पंप ९०% अनुदान कसे मिळवावे?",
    hi: "☀️ सोलर पंप योजना पर 90% सब्सिडी कैसे प्राप्त करें?",
    ansEn: "☀️ Under Maharashtra State 'Magel Tyala Solar Pump' scheme, farmers get 90-95% subsidy for off-grid solar pumps. Apply online on Mahadiscom portal (kms.mahadiscom.in).",
    ansMr: "☀️ महाराष्ट्र सरकारच्या 'मागेल त्याला सौर कृषी पंप' योजनेअंतर्गत ९०-९५% अनुदान मिळते. महावितरणच्या kms.mahadiscom.in पोर्टलवर ऑनलाइन अर्ज करा.",
    ansHi: "☀️ महाराष्ट्र सरकार की 'मागेल त्याला सोलर पंप' योजना के तहत किसानों को 90-95% सब्सिडी मिलती है। महावितरण पोर्टल kms.mahadiscom.in पर आवेदन करें।"
  },
  {
    en: "🍅 What is the 3-day AI forecast price for Tomato?",
    mr: "🍅 टोमॅटोसाठी पुढील ३ दिवसांचा AI किंमत अंदाज काय आहे?",
    hi: "🍅 टमाटर के लिए 3-दिवसीय AI मूल्य पूर्वानुमान क्या है?",
    ansEn: "🍅 AI Scikit-Learn Regression model predicts Tomato price in Pimpalgaon Mandi to rise from ₹2,400/q to ₹2,550/q (+₹150 gain) over the next 3 days.",
    ansMr: "🍅 AI मॉडेलनुसार पिंपळगाव बाजारात टोमॅटोचे दर ₹२,४०० वरून ₹२,५५०/क्विंटलपर्यंत (+₹१५० वाढ) जाण्याचा अंदाज आहे.",
    ansHi: "🍅 AI पूर्वानुमान के अनुसार पिंपलगांव मंडी में टमाटर का भाव ₹2,400 से बढ़कर ₹2,550/क्विंटल (+₹150 बढ़त) होने का अनुमान है।"
  }
];

const AiAssistant = () => {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'mr' ? 'नमस्कार! 🌾 मी तुमचा कृषीसेतू किसान AI सहाय्यक आहे. खालील प्रश्नांवर क्लिक करा किंवा तुमचा प्रश्न विचारा:' : lang === 'hi' ? 'नमस्ते! 🌾 मैं आपका कृषिसेतु किसान AI सहायक हूँ। नीचे दिए गए प्रश्नों पर क्लिक करें या अपना प्रश्न पूछें:' : 'Hello! 👋 I am your KrishiSetu Kisan AI Assistant. Click any preset question below or type your query:'
    }
  ]);
  const [input, setInput] = useState('');

  const sendQuery = (questionText, answerText) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: questionText },
      { sender: 'bot', text: answerText }
    ]);
  };

  const handlePresetClick = (qObj) => {
    const qText = qObj[lang] || qObj.en;
    const aText = lang === 'mr' ? qObj.ansMr : lang === 'hi' ? qObj.ansHi : qObj.ansEn;
    sendQuery(qText, aText);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    
    // Check if input matches preset or provide smart fallback
    let botReply = lang === 'mr' ? "पिकांच्या अचूक निव्वळ उत्पन्नासाठी 'विक्री व AI निर्णय' पानावर जावून गणना करा!" : "For exact Mandi price predictions and net realisation, use the KrishiSetu AI Decision Engine on the Sell page!";
    if (userText.toLowerCase().includes("onion") || userText.includes("कांदा") || userText.includes("प्याज")) {
      botReply = lang === 'mr' ? "🧅 लासलगाव बाजारात कांद्याला ₹२,४००/क्विंटल दर मिळण्याची शक्यता आहे. निव्वळ नफा साधण्यासाठी कृषीसेतू AI निर्णय इंजिन वापरा!" : "🧅 Lasalgaon Mandi onion rate is trending around ₹2,400/quintal. Net Realisation is ₹2,020/q.";
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'bot', text: botReply }
    ]);
  };

  return (
    <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div class="text-center space-y-2">
        <span class="sih-tag">🤖 Trilingual AI Farming Assistant</span>
        <h2 class="text-3xl font-black text-slate-900">{t('aiTitle')}</h2>
        <p class="text-sm font-bold text-slate-600">{t('aiSubtitle')}</p>
      </div>

      {/* Preset Questions Chips for Quick Prototype Demo */}
      <div class="sih-card p-4 space-y-2 bg-emerald-50 border-2 border-emerald-300">
        <p class="text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5">
          <Sparkles class="w-4 h-4 text-emerald-700" />
          <span>Quick Prototype Questions (1-Tap Demo):</span>
        </p>
        <div class="flex flex-wrap gap-2">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(q)}
              class="px-3.5 py-2 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-extrabold text-slate-800 transition shadow-sm text-left hover:border-emerald-500"
            >
              {q[lang] || q.en}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window Box */}
      <div class="sih-card p-6 bg-white border-2 border-emerald-200 flex flex-col h-[480px]">
        <div class="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              class={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div class={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow ${m.sender === 'user' ? 'bg-amber-500' : 'bg-emerald-700'}`}>
                {m.sender === 'user' ? <User class="w-5 h-5" /> : <Bot class="w-5 h-5" />}
              </div>
              <div class={`p-4 rounded-2xl max-w-md text-sm font-bold leading-relaxed ${
                m.sender === 'user' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-900 border border-slate-300'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} class="pt-4 border-t border-emerald-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatPlaceholder')}
            class="flex-1 px-4 py-3 bg-slate-50 border-2 border-emerald-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-emerald-700"
          />
          <button
            type="submit"
            class="sih-btn-primary px-6 py-3 font-black text-sm flex items-center gap-2"
          >
            <span>{t('sendBtn')}</span>
            <Send class="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiAssistant;
