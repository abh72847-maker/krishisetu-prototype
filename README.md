# KrishiSetu AI — Sell Smarter. Earn Better.

> **Smart India Hackathon (SIH) Internal Prototype**  
> *"We don't just tell farmers where the price is highest. We tell them where they can earn the most after costs."*

---

## 🌾 Overview & Core Value Proposition

Small and marginal farmers in India frequently suffer income losses not because APMC market prices are unavailable, but because they choose markets based solely on gross price—ignoring logistics overheads, transport freight, handling fees, storage degradation, and buyer reliability.

**KrishiSetu AI** solves this problem by delivering a **4-screen decision workflow**:
$$\text{Net Realisation} = \text{Selling Price} - \text{Transport} - \text{Handling} - \text{Storage} - \text{Expected Loss}$$

---

## 📱 4-Screen SIH Workflow

```text
SCREEN 1: Landing + Login / Signup
  └─ [ TRY DEMO ] (1-tap judge authentication for 9999999999 / demo123)
        ↓
SCREEN 2: Farmer Crop & Sale Input
  └─ Crop, Quantity kg, Location, Quality Grade (A/B/C), Urgency
        ↓
SCREEN 3: AI Market Decision
  └─ Net Realisation Breakdown, Recommended Market (Lasalgaon ₹10,100), AI Score, Verified Buyer (FreshMart)
        ↓
SCREEN 4: What-If Simulator
  └─ Interactive financial comparison: [ SELL NOW ] vs [ WAIT 3 DAYS (ML Forecast) ] vs [ JOIN FPO (+₹1,500) ]
```

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Framework**: Python FastAPI
- **Server**: Uvicorn
- **ORM**: SQLAlchemy
- **ML Engine**: Scikit-Learn (Linear Regression / Random Forest forecasting) + Pandas

### Database
- **Production**: PostgreSQL
- **Development**: SQLite fallback (`sqlite:///./krishisetu.db`)
- **Config**: `DATABASE_URL` environment variable

---

## 📁 Project Structure

```text
krishisetu-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Landing.jsx          # Screen 1
│   │   │   ├── FarmerInput.jsx      # Screen 2
│   │   │   ├── MarketDecision.jsx   # Screen 3
│   │   │   └── WhatIfSimulator.jsx  # Screen 4
│   │   ├── services/api.js
│   │   ├── context/AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/
│   ├── main.py                     # FastAPI routes & CORS
│   ├── database.py                 # SQLAlchemy engine & session
│   ├── models.py                   # Farmers, CropInputs, Markets, Buyers, PriceHistory
│   ├── schemas.py                  # Pydantic models
│   ├── seed.py                     # Seeder script
│   ├── decision_engine.py          # Net Realisation & AI Scoring engine
│   ├── price_prediction.py         # Scikit-Learn price forecast
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## 🔑 Demo Credentials

For rapid SIH demonstration, click **`[ TRY DEMO ]`** on Screen 1, or log in using:
- **Mobile**: `9999999999`
- **Password**: `demo123`

---

## 🚀 Local Quickstart Instructions

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
# Activate on Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed the database with demo scenario data (Lasalgaon, Pune, Mumbai, FreshMart)
python seed.py

# Start FastAPI Uvicorn Server on Port 8000
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will run at: `http://localhost:8000` (API Docs at `http://localhost:8000/docs`).

### 2. Frontend Setup (React + Vite)

```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite Development Server
npm run dev
```

Frontend will run at: `http://localhost:5173`.

---

## 🌐 Production Deployment Guide

```text
               VERCEL (React Frontend)
                        │
                        ▼ HTTPS
               RENDER (FastAPI Backend)
                        │
                        ▼
             SUPABASE (PostgreSQL DB)
```

1. **Frontend (Vercel)**: Set `VITE_API_URL=https://your-backend-render-app.onrender.com`.
2. **Backend (Render)**: Set `DATABASE_URL=postgresql://user:pass@host:5432/dbname` and `FRONTEND_URL=https://your-frontend.vercel.app`. Start command:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

---

## 📊 Prototype Data Disclaimer

*Prototype demonstration using simulated market data. Production version can integrate verified market data sources such as Agmarknet / data.gov.in.*
