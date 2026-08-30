import os
import hashlib
import jwt
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
import models
import schemas
from decision_engine import calculate_net_realisation, calculate_market_score, generate_ai_reasons
from price_prediction import predict_future_price
from seed import seed_database

# Initialize Database tables
Base.metadata.create_all(bind=engine)

# Auto-seed database if empty
db_check = next(get_db())
if not db_check.query(models.Farmer).filter_by(mobile="9999999999").first():
    seed_database()

app = FastAPI(
    title="KrishiSetu AI API",
    description="SIH Smart Mandi Decision Engine API",
    version="1.0.0"
)

# CORS Setup
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if FRONTEND_URL == "*" else [FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = os.getenv("SECRET_KEY", "sih_secret_key_krishisetu_2026")
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.get("/")
def root():
    return {"message": "KrishiSetu AI Backend API is running", "docs": "/docs", "health": "/api/health"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}


# 1. AUTHENTICATION ENDPOINTS
@app.post("/api/auth/signup", response_model=schemas.AuthResponse)
def signup(req: schemas.SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(models.Farmer).filter(models.Farmer.mobile == req.mobile).first()
    if existing:
        raise HTTPException(status_code=400, detail="Mobile number already registered. Please login.")

    hashed_pwd = hash_password(req.password)
    farmer = models.Farmer(
        name=req.name,
        mobile=req.mobile,
        location=req.location,
        password_hash=hashed_pwd
    )
    db.add(farmer)
    db.commit()
    db.refresh(farmer)

    token = create_access_token({"sub": str(farmer.id), "mobile": farmer.mobile})
    return {
        "status": "success",
        "message": "Account created successfully",
        "farmer_id": farmer.id,
        "name": farmer.name,
        "mobile": farmer.mobile,
        "token": token
    }

@app.post("/api/auth/login", response_model=schemas.AuthResponse)
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    farmer = db.query(models.Farmer).filter(models.Farmer.mobile == req.mobile).first()
    if not farmer or farmer.password_hash != hash_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid mobile number or password")

    token = create_access_token({"sub": str(farmer.id), "mobile": farmer.mobile})
    return {
        "status": "success",
        "message": "Login successful",
        "farmer_id": farmer.id,
        "name": farmer.name,
        "mobile": farmer.mobile,
        "token": token
    }

# 2. CROP ANALYSIS ENDPOINT (Screen 2 -> Screen 3)
@app.post("/api/crop-analysis", response_model=schemas.CropAnalysisResponse)
def analyze_crop(req: schemas.CropAnalysisRequest, db: Session = Depends(get_db)):
    if req.quantity_kg <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0 kg")

    # Store crop input record in DB
    crop_input = models.CropInput(
        farmer_id=req.farmer_id or 1,
        crop=req.crop,
        quantity_kg=req.quantity_kg,
        location=req.location,
        quality=req.quality,
        urgency=req.urgency
    )
    db.add(crop_input)
    db.commit()

    # Query candidate markets
    markets = db.query(models.Market).filter(models.Market.crop == req.crop).all()
    if not markets:
        markets = db.query(models.Market).filter(models.Market.crop == "Onion").all()

    quantity_quintals = req.quantity_kg / 100.0

    evaluated_markets = []
    max_net_realisation = 0.0

    for m in markets:
        res = calculate_net_realisation(m, req.quality)
        net_r = res["net_realisation"]
        if net_r > max_net_realisation:
            max_net_realisation = net_r
        
        evaluated_markets.append({
            "market": m,
            "adjusted_price": res["adjusted_price"],
            "net_realisation": net_r,
            "expected_income": round(net_r * quantity_quintals, 2)
        })

    for item in evaluated_markets:
        item["score"] = calculate_market_score(
            item["market"],
            item["net_realisation"],
            max_net_realisation,
            req.urgency
        )

    evaluated_markets.sort(key=lambda x: x["score"], reverse=True)
    top_item = evaluated_markets[0]
    top_market = top_item["market"]

    comparison_list = []
    for item in evaluated_markets:
        m = item["market"]
        demand_text = "High demand" if m.demand_score >= 80 else "Medium demand"
        comparison_list.append(schemas.MarketComparisonItem(
            market_name=m.market_name,
            location=m.location,
            price_per_quintal=m.price_per_quintal,
            distance_km=m.distance_km,
            demand=demand_text,
            net_realisation_per_q=item["net_realisation"],
            expected_income=item["expected_income"],
            ai_score=item["score"],
            is_recommended=(m.id == top_market.id)
        ))

    recommended_buyer = db.query(models.Buyer).filter(
        models.Buyer.crop == req.crop,
        models.Buyer.market == top_market.market_name
    ).first()

    if not recommended_buyer:
        recommended_buyer = db.query(models.Buyer).filter(models.Buyer.crop == req.crop).first()

    if not recommended_buyer:
        buyer_resp = schemas.RecommendedBuyerItem(
            name="FreshMart",
            price_per_kg=top_market.price_per_quintal / 100.0,
            distance_km=18.0,
            payment_days="24-hour payment",
            reliability_score=94.0,
            verified=True
        )
    else:
        buyer_resp = schemas.RecommendedBuyerItem(
            name=recommended_buyer.name,
            price_per_kg=recommended_buyer.price_per_kg,
            distance_km=recommended_buyer.distance_km,
            payment_days=f"{recommended_buyer.payment_days * 24}-hour payment" if recommended_buyer.payment_days == 1 else f"{recommended_buyer.payment_days} days payment",
            reliability_score=recommended_buyer.reliability_score,
            verified=recommended_buyer.verified
        )

    breakdown_obj = schemas.BreakdownItem(
        selling_price_per_q=top_market.price_per_quintal,
        transport_per_q=top_market.transport_cost,
        handling_per_q=top_market.handling_cost,
        storage_per_q=top_market.storage_cost,
        expected_loss_per_q=top_market.expected_loss,
        net_realisation_per_q=top_item["net_realisation"],
        quantity_kg=req.quantity_kg,
        quantity_quintals=quantity_quintals,
        expected_income=top_item["expected_income"]
    )

    reasons = generate_ai_reasons(top_market, top_item["net_realisation"], True)

    return schemas.CropAnalysisResponse(
        recommendation="SELL NOW",
        recommended_market=top_market.market_name,
        market_price_per_q=top_market.price_per_quintal,
        net_realisation_per_q=top_item["net_realisation"],
        expected_income=top_item["expected_income"],
        crop=req.crop,
        quantity_kg=req.quantity_kg,
        quality=req.quality,
        location=req.location,
        breakdown=breakdown_obj,
        markets_comparison=comparison_list,
        ai_reasons=reasons,
        recommended_buyer=buyer_resp
    )

# 3. WHAT-IF SIMULATOR ENDPOINT (Screen 4)
@app.post("/api/what-if", response_model=schemas.WhatIfResponse)
def simulate_what_if(req: schemas.WhatIfRequest, db: Session = Depends(get_db)):
    market = db.query(models.Market).filter(
        models.Market.crop == req.crop,
        models.Market.market_name == req.selected_market
    ).first()

    if not market:
        market = db.query(models.Market).filter(models.Market.crop == req.crop).first()

    current_price = market.price_per_quintal if market else 2400.0
    transport = market.transport_cost if market else 250.0
    handling = market.handling_cost if market else 50.0
    storage = market.storage_cost if market else 0.0
    loss = market.expected_loss if market else 80.0

    q_quintals = req.quantity_kg / 100.0
    baseline_net_r = current_price - transport - handling - storage - loss
    baseline_income = round(baseline_net_r * q_quintals, 2)

    sell_now_opt = schemas.WhatIfOption(
        key="sell_now",
        title="SELL NOW",
        current_price_per_q=current_price,
        forecast_price_per_q=current_price,
        net_realisation_per_q=round(baseline_net_r, 2),
        expected_income=baseline_income,
        diff_income=0.0,
        ai_decision="SELL NOW",
        explanation="Best current net realisation with strong market demand and manageable logistics overheads."
    )

    forecast_price = predict_future_price(db, req.crop, market.market_name if market else "Lasalgaon", 3)
    wait_net_r = forecast_price - transport - handling - (storage + 20.0) - (loss + 10.0)
    wait_income = round(wait_net_r * q_quintals, 2)
    wait_diff = round(wait_income - baseline_income, 2)

    if req.urgency == "Need money today":
        wait_decision = "SELL NOW PREFERRED (URGENT CASH NEED)"
        wait_exp = "Price is forecasted higher, but selling now is recommended due to your immediate cash requirement."
    else:
        wait_decision = "WAIT 3 DAYS"
        wait_exp = f"AI forecast projects price rise from ₹{current_price}/q to ₹{forecast_price}/q."

    wait_3_days_opt = schemas.WhatIfOption(
        key="wait_3_days",
        title="WAIT 3 DAYS",
        current_price_per_q=current_price,
        forecast_price_per_q=forecast_price,
        net_realisation_per_q=round(wait_net_r, 2),
        expected_income=wait_income,
        diff_income=wait_diff,
        ai_decision=wait_decision,
        explanation=wait_exp
    )

    fpo_price = round(current_price * 1.125, 2)
    fpo_transport = round(transport * 0.80, 2)
    fpo_net_r = fpo_price - fpo_transport - handling - storage - loss
    fpo_income = round(fpo_net_r * q_quintals, 2)
    fpo_diff = round(fpo_income - baseline_income, 2)

    join_fpo_opt = schemas.WhatIfOption(
        key="join_fpo",
        title="JOIN FPO",
        current_price_per_q=current_price,
        forecast_price_per_q=fpo_price,
        net_realisation_per_q=round(fpo_net_r, 2),
        expected_income=fpo_income,
        diff_income=fpo_diff,
        ai_decision="JOIN FPO ⭐",
        explanation="Combining bulk quantity with local FPO yields higher institutional buyer prices and shared freight savings."
    )

    return schemas.WhatIfResponse(
        crop=req.crop,
        quantity_kg=req.quantity_kg,
        baseline_income=baseline_income,
        sell_now=sell_now_opt,
        wait_3_days=wait_3_days_opt,
        join_fpo=join_fpo_opt
    )

@app.get("/api/markets/{crop}")
def get_crop_markets(crop: str, db: Session = Depends(get_db)):
    markets = db.query(models.Market).filter(models.Market.crop == crop).all()
    return markets

@app.get("/api/buyers/{crop}")
def get_crop_buyers(crop: str, db: Session = Depends(get_db)):
    buyers = db.query(models.Buyer).filter(models.Buyer.crop == crop).all()
    return buyers
