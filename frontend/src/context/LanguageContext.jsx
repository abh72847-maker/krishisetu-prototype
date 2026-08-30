import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const dictionary = {
  en: {
    brandName: "KrishiSetu AI",
    tagline: "Sell Smarter. Earn Better.",
    navHome: "Home",
    navSell: "Sell & AI Decision",
    navTransport: "Farm Transport",
    navRates: "Rates & Weather",
    navSchemes: "Government Schemes",
    navAI: "Kisan AI",
    loginBtn: "Farmer Profile",
    chooseLang: "Select Language / भाषा निवडा:",
    tryDemoBtn: "TRY DEMO",
    heroTitle: "Smart Selling Decision Engine for Indian Farmers",
    heroSubtitle: "Compare Mandi rates, calculate net realisation after freight & losses, book farm transport, and check 36-district weather.",
    
    // Transport Page
    transportTitle: "🚚 Farm Transport & Logistics Booking",
    transportSubtitle: "Book reliable pickup trucks & tractors for direct Mandi delivery:",
    vehicleType: "Select Vehicle Type",
    pickup15t: "Mahindra PickUp 1.5T (Cap: 1500 kg)",
    tractor3t: "Tractor Trolley 3T (Cap: 3000 kg)",
    eicher8t: "Eicher Truck 8T (Cap: 8000 kg)",
    distanceKm: "Distance to Mandi (km)",
    estFreight: "Estimated Freight Cost",
    bookDriverBtn: "Dispatch Transport Driver Now →",
    bookingSuccess: "✅ Transport booked successfully! Driver Ramesh (MH-15-AG-4921) dispatched.",

    // Weather & Rates Page
    weatherTitle: "🌦️ 36-District Maharashtra Weather & Mandi Rates",
    weatherSubtitle: "Real-time weather forecast & APMC Mandi price trends:",
    selectDistrict: "Select Maharashtra District:",
    tempLabel: "Temperature",
    humidityLabel: "Humidity",
    rainAdvisory: "Rain Advisory",
    mandiPriceTrends: "📈 APMC Mandi Price Trends & Demand",

    // Schemes Page
    schemesTitle: "📜 Government Schemes & Subsidies",
    schemesSubtitle: "Direct financial support, crop insurance & solar pump subsidies:",
    pmKisanTitle: "PM-KISAN Scheme",
    pmKisanDesc: "Direct income support of ₹6,000/year to eligible landholding farmer families.",
    pmfbyTitle: "PM Fasal Bima Yojana",
    pmfbyDesc: "Comprehensive crop insurance covering yield losses due to natural calamities.",
    pmksyTitle: "PM Krishi Sinchai Yojana",
    pmksyDesc: "Subsidies up to 55% for drip and sprinkler micro-irrigation systems.",
    solarTitle: "Magel Tyala Solar Pump",
    solarDesc: "Maharashtra state scheme providing 90-95% subsidy for solar agricultural pumps.",
    officialPortalBtn: "Official Portal →",

    // AI Assistant
    aiTitle: "🤖 Kisan AI Assistant",
    aiSubtitle: "Ask questions about Mandi prices, crop health, or schemes in Marathi, Hindi, or English:",
    chatPlaceholder: "Ask in Marathi, Hindi, or English...",
    sendBtn: "Send"
  },
  mr: {
    brandName: "कृषिसेतू AI",
    tagline: "हुशारीने विका. जास्त कमवा.",
    navHome: "मुख्य पृष्ठ",
    navSell: "विक्री व AI निर्णय",
    navTransport: "शेत वाहतूक",
    navRates: "दर व हवामान",
    navSchemes: "शासकीय योजना",
    navAI: "किसान AI",
    loginBtn: "शेतकरी प्रोफाईल",
    chooseLang: "भाषा निवडा / Select Language:",
    tryDemoBtn: "डेमो पहा",
    heroTitle: "भारतीय शेतकऱ्यांसाठी स्मार्ट कृषी विक्री निर्णय इंजिन",
    heroSubtitle: "बाजारभाव तपासा, वाहतूक खर्च व तोटा वजा करून निव्वळ उत्पन्न मोजा, गाडी बुक करा आणि ३६ जिल्ह्यांचे हवामान पहा.",
    
    // Transport Page
    transportTitle: "🚚 शेत माल वाहतूक व वाहन बुकिंग",
    transportSubtitle: "बाजारात माल पोहोचवण्यासाठी पिकअप, ट्रॅक्टर आणि ट्रक बुक करा:",
    vehicleType: "वाहनाचा प्रकार निवडा",
    pickup15t: "महिंद्रा पिकअप १.५ टन (क्षमता: १५०० किलो)",
    tractor3t: "ट्रॅक्टर ट्रॉली ३ टन (क्षमता: ३००० किलो)",
    eicher8t: "आयशर ट्रक ८ टन (क्षमता: ८००० किलो)",
    distanceKm: "बाजार समितीचे अंतर (किमी)",
    estFreight: "अंदाजे वाहतूक भाडे",
    bookDriverBtn: "वाहतूक ड्रायव्हर आताच पाठवा →",
    bookingSuccess: "✅ वाहतूक यशस्वीरित्या बुक झाली! ड्रायव्हर रमेश (MH-15-AG-4921) रवाना झाला आहे.",

    // Weather & Rates Page
    weatherTitle: "🌦️ महाराष्ट्रातील ३६ जिल्हे हवामान व बाजारभाव",
    weatherSubtitle: "थेट हवामान अंदाज आणि बाजार समिती भाव:",
    selectDistrict: "महाराष्ट्रातील जिल्हा निवडा:",
    tempLabel: "तापमान",
    humidityLabel: "आर्द्रता",
    rainAdvisory: "पाऊस सल्ला",
    mandiPriceTrends: "📈 बाजार समिती दर व मागणी",

    // Schemes Page
    schemesTitle: "📜 शेतकऱ्यांसाठी शासकीय योजना व अनुदाने",
    schemesSubtitle: "थेट आर्थिक मदत, पीक विमा आणि सौर पंप अनुदान योजना:",
    pmKisanTitle: "पीएम-किसान योजना",
    pmKisanDesc: "पात्र शेतकरी कुटुंबांना दरवर्षी ₹६,००० थेट बँक खात्यात आर्थिक मदत.",
    pmfbyTitle: "पंतप्रधान पीक विमा योजना",
    pmfbyDesc: "नैसर्गिक आपत्तीमुळे होणाऱ्या पीक नुकसानीपासून संपूर्ण विमा संरक्षण.",
    pmksyTitle: "पीएम कृषी सिंचाई योजना",
    pmksyDesc: "ठिबक आणि तुषार सिंचन संचावर ५५% पर्यंत शासकीय अनुदान.",
    solarTitle: "मागेल त्याला सौर कृषी पंप",
    solarDesc: "महाराष्ट्र शासनातर्फे सौर कृषी पंपासाठी ९०-९५% पर्यंत अनुदान.",
    officialPortalBtn: "अधिकृत पोर्टलवर जा →",

    // AI Assistant
    aiTitle: "🤖 किसान AI सहाय्यक",
    aiSubtitle: "बाजारभाव, पिके किंवा योजनांबद्दल मराठी, हिंदी किंवा इंग्रजीत प्रश्न विचारा:",
    chatPlaceholder: "मराठी, हिंदी किंवा इंग्रजीत प्रश्न विचारा...",
    sendBtn: "पाठवा"
  },
  hi: {
    brandName: "कृषिसेतु AI",
    tagline: "स्मार्ट बेचें। बेहतर कमाएं।",
    navHome: "मुख्य पृष्ठ",
    navSell: "बिक्री व AI निर्णय",
    navTransport: "कृषि परिवहन",
    navRates: "मंडी भाव व मौसम",
    navSchemes: "सरकारी योजनाएं",
    navAI: "किसान AI",
    loginBtn: "किसान प्रोफाइल",
    chooseLang: "भाषा चुनें / Select Language:",
    tryDemoBtn: "डेमो देखें",
    heroTitle: "भारतीय किसानों के लिए स्मार्ट कृषि बिक्री निर्णय इंजन",
    heroSubtitle: "मंडी भावों की तुलना करें, परिवहन और नुकसान काटकर शुद्ध आय की गणना करें, गाड़ी बुक करें और 36 जिलों का मौसम देखें।",
    
    // Transport Page
    transportTitle: "🚚 कृषि परिवहन व वाहन बुकिंग",
    transportSubtitle: "मंडी तक उपज पहुंचाने के लिए पिकअप और ट्रैक्टर बुक करें:",
    vehicleType: "वाहन का प्रकार चुनें",
    pickup15t: "महिंद्रा पिकअप 1.5 टन (क्षमता: 1500 किग्रा)",
    tractor3t: "ट्रैक्टर ट्रॉली 3 टन (क्षमता: 3000 किग्रा)",
    eicher8t: "आयशर ट्रक 8 टन (क्षमता: 8000 किग्रा)",
    distanceKm: "मंडी की दूरी (किमी)",
    estFreight: "अनुमानित परिवहन भाड़ा",
    bookDriverBtn: "परिवहन ड्राइवर अभी भेजें →",
    bookingSuccess: "✅ परिवहन सफलतापूर्वक बुक हो गया! ड्राइवर रमेश (MH-15-AG-4921) रवाना हो चुका है।",

    // Weather & Rates Page
    weatherTitle: "🌦️ महाराष्ट्र 36 जिले मौसम व मंडी भाव",
    weatherSubtitle: "लाइव मौसम पूर्वानुमान एवं मंडी मूल्य दरें:",
    selectDistrict: "महाराष्ट्र का जिला चुनें:",
    tempLabel: "तापमान",
    humidityLabel: "आर्द्रता",
    rainAdvisory: "बारिश की सलाह",
    mandiPriceTrends: "📈 मंडी भाव एवं मांग ट्रेंड",

    // Schemes Page
    schemesTitle: "📜 किसानों के लिए सरकारी योजनाएं एवं सब्सिडी",
    schemesSubtitle: "प्रत्यक्ष वित्तीय सहायता, फसल बीमा और सोलर पंप सब्सिडी:",
    pmKisanTitle: "पीएम-किसान योजना",
    pmKisanDesc: "पात्र किसान परिवारों को प्रति वर्ष ₹6,000 की सीधी आर्थिक सहायता।",
    pmfbyTitle: "प्रधानमंत्री फसल बीमा योजना",
    pmfbyDesc: "प्राकृतिक आपदाओं से फसल नुकसान पर व्यापक बीमा कवर।",
    pmksyTitle: "पीएम कृषि सिंचाई योजना",
    pmksyDesc: "ड्रिप और स्प्रिंकलर सिंचाई प्रणालियों पर 55% तक सब्सिडी।",
    solarTitle: "मागेल त्याला सोलर पंप योजना",
    solarDesc: "महाराष्ट्र सरकार द्वारा कृषि सोलर पंपों के लिए 90-95% सब्सिडी।",
    officialPortalBtn: "आधिकारिक पोर्टल पर जाएं →",

    // AI Assistant
    aiTitle: "🤖 किसान AI सहायक",
    aiSubtitle: "मंडी भाव, फसल या योजनाओं के बारे में मराठी, हिंदी या अंग्रेजी में पूछें:",
    chatPlaceholder: "मराठी, हिंदी या अंग्रेजी में पूछें...",
    sendBtn: "भेजें"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('krishisetu_lang') || 'mr';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('krishisetu_lang', newLang);
  };

  const t = (key) => {
    return dictionary[lang]?.[key] || dictionary.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
