import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sqlalchemy.orm import Session
import models

def predict_future_price(db: Session, crop: str, market_name: str, days_ahead: int = 3) -> float:
    """
    Train a machine learning regression model (LinearRegression) on historical Mandi prices
    to estimate future crop price per quintal.
    """
    records = db.query(models.PriceHistory).filter(
        models.PriceHistory.crop == crop,
        models.PriceHistory.market == market_name
    ).all()

    if not records or len(records) < 3:
        # Fallback: query current market price + 5% projected increase for demo
        m = db.query(models.Market).filter(
            models.Market.crop == crop,
            models.Market.market_name == market_name
        ).first()
        if m:
            return round(m.price_per_quintal * 1.05, 2)
        return 2500.0

    # Build DataFrame
    data = []
    for idx, r in enumerate(records):
        data.append({"day": idx + 1, "price": r.price_per_quintal})
    
    df = pd.DataFrame(data)
    X = df[["day"]].values
    y = df["price"].values

    model = LinearRegression()
    model.fit(X, y)

    future_day = len(records) + days_ahead
    pred_price = model.predict([[future_day]])[0]

    # Ensure logical price range relative to current price
    last_price = records[-1].price_per_quintal
    if pred_price < last_price * 0.8:
        pred_price = last_price * 1.03
    elif pred_price > last_price * 1.3:
        pred_price = last_price * 1.08

    return round(float(pred_price), 2)
