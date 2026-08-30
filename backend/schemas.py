from pydantic import BaseModel, Field
from typing import List, Optional

# Auth Schemas
class SignupRequest(BaseModel):
    name: str
    mobile: str
    location: str
    password: str

class LoginRequest(BaseModel):
    mobile: str
    password: str

class AuthResponse(BaseModel):
    status: str
    message: str
    farmer_id: int
    name: str
    mobile: str
    token: str

# Crop Analysis Schemas
class CropAnalysisRequest(BaseModel):
    farmer_id: Optional[int] = 1
    crop: str
    quantity_kg: float = Field(..., gt=0, description="Quantity in kg must be greater than 0")
    location: str
    quality: str
    urgency: str

class BreakdownItem(BaseModel):
    selling_price_per_q: float
    transport_per_q: float
    handling_per_q: float
    storage_per_q: float
    expected_loss_per_q: float
    net_realisation_per_q: float
    quantity_kg: float
    quantity_quintals: float
    expected_income: float

class MarketComparisonItem(BaseModel):
    market_name: str
    location: str
    price_per_quintal: float
    distance_km: float
    demand: str
    net_realisation_per_q: float
    expected_income: float
    ai_score: int
    is_recommended: bool

class RecommendedBuyerItem(BaseModel):
    name: str
    price_per_kg: float
    distance_km: float
    payment_days: str
    reliability_score: float
    verified: bool

class CropAnalysisResponse(BaseModel):
    recommendation: str
    recommended_market: str
    market_price_per_q: float
    net_realisation_per_q: float
    expected_income: float
    crop: str
    quantity_kg: float
    quality: str
    location: str
    breakdown: BreakdownItem
    markets_comparison: List[MarketComparisonItem]
    ai_reasons: List[str]
    recommended_buyer: RecommendedBuyerItem

# What-If Schemas
class WhatIfRequest(BaseModel):
    farmer_id: Optional[int] = 1
    crop: str
    quantity_kg: float
    location: str
    quality: str
    urgency: str
    selected_market: str

class WhatIfOption(BaseModel):
    key: str
    title: str
    current_price_per_q: float
    forecast_price_per_q: float
    net_realisation_per_q: float
    expected_income: float
    diff_income: float
    ai_decision: str
    explanation: str

class WhatIfResponse(BaseModel):
    crop: str
    quantity_kg: float
    baseline_income: float
    sell_now: WhatIfOption
    wait_3_days: WhatIfOption
    join_fpo: WhatIfOption
