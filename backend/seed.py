import hashlib
from database import Base, engine, SessionLocal
import models

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Clear existing demo data cleanly
    db.query(models.PriceHistory).delete()
    db.query(models.Buyer).delete()
    db.query(models.Market).delete()
    db.query(models.CropInput).delete()
    db.query(models.Farmer).delete()
    db.commit()

    # 1. Seed Demo Farmer (9999999999 / demo123)
    hashed_pwd = hash_password("demo123")
    demo_farmer = models.Farmer(
        name="Demo Farmer",
        mobile="9999999999",
        location="Nashik",
        password_hash=hashed_pwd
    )
    db.add(demo_farmer)

    # 2. Seed Markets
    markets_data = [
        # Onion (Lasalgaon recommended for Demo Scenario)
        models.Market(crop="Onion", market_name="Lasalgaon", location="Nashik", price_per_quintal=2400.0, distance_km=65.0, transport_cost=250.0, handling_cost=50.0, storage_cost=0.0, expected_loss=80.0, demand_score=90.0, buyer_reliability=92.0, payment_score=90.0),
        models.Market(crop="Onion", market_name="Mumbai APMC (Vashi)", location="Navi Mumbai", price_per_quintal=2500.0, distance_km=180.0, transport_cost=420.0, handling_cost=60.0, storage_cost=0.0, expected_loss=60.0, demand_score=85.0, buyer_reliability=80.0, payment_score=75.0),
        models.Market(crop="Onion", market_name="Pune (Gultekdi)", location="Pune", price_per_quintal=2350.0, distance_km=210.0, transport_cost=380.0, handling_cost=50.0, storage_cost=0.0, expected_loss=40.0, demand_score=75.0, buyer_reliability=85.0, payment_score=80.0),
        models.Market(crop="Onion", market_name="Ahmednagar APMC", location="Ahmednagar", price_per_quintal=2280.0, distance_km=140.0, transport_cost=300.0, handling_cost=45.0, storage_cost=0.0, expected_loss=50.0, demand_score=70.0, buyer_reliability=78.0, payment_score=75.0),

        # Tomato
        models.Market(crop="Tomato", market_name="Pimpalgaon APMC", location="Nashik", price_per_quintal=2400.0, distance_km=30.0, transport_cost=150.0, handling_cost=40.0, storage_cost=0.0, expected_loss=50.0, demand_score=88.0, buyer_reliability=90.0, payment_score=85.0),
        models.Market(crop="Tomato", market_name="Pune (Gultekdi)", location="Pune", price_per_quintal=2250.0, distance_km=210.0, transport_cost=350.0, handling_cost=50.0, storage_cost=0.0, expected_loss=60.0, demand_score=80.0, buyer_reliability=82.0, payment_score=80.0),
        models.Market(crop="Tomato", market_name="Mumbai APMC (Vashi)", location="Navi Mumbai", price_per_quintal=2550.0, distance_km=180.0, transport_cost=400.0, handling_cost=60.0, storage_cost=0.0, expected_loss=70.0, demand_score=85.0, buyer_reliability=85.0, payment_score=78.0),

        # Potato
        models.Market(crop="Potato", market_name="Nashik Market Yard", location="Nashik", price_per_quintal=1800.0, distance_km=15.0, transport_cost=100.0, handling_cost=30.0, storage_cost=0.0, expected_loss=30.0, demand_score=75.0, buyer_reliability=88.0, payment_score=90.0),
        models.Market(crop="Potato", market_name="Pune (Gultekdi)", location="Pune", price_per_quintal=1900.0, distance_km=210.0, transport_cost=320.0, handling_cost=40.0, storage_cost=0.0, expected_loss=40.0, demand_score=78.0, buyer_reliability=80.0, payment_score=82.0),
        models.Market(crop="Potato", market_name="Mumbai APMC (Vashi)", location="Navi Mumbai", price_per_quintal=1950.0, distance_km=180.0, transport_cost=350.0, handling_cost=50.0, storage_cost=0.0, expected_loss=45.0, demand_score=82.0, buyer_reliability=85.0, payment_score=80.0),

        # Wheat
        models.Market(crop="Wheat", market_name="Ahmednagar APMC", location="Ahmednagar", price_per_quintal=2200.0, distance_km=140.0, transport_cost=220.0, handling_cost=35.0, storage_cost=0.0, expected_loss=20.0, demand_score=80.0, buyer_reliability=85.0, payment_score=85.0),
        models.Market(crop="Wheat", market_name="Pune (Gultekdi)", location="Pune", price_per_quintal=2300.0, distance_km=210.0, transport_cost=300.0, handling_cost=40.0, storage_cost=0.0, expected_loss=25.0, demand_score=82.0, buyer_reliability=88.0, payment_score=88.0),
        models.Market(crop="Wheat", market_name="Nagpur APMC", location="Nagpur", price_per_quintal=2350.0, distance_km=600.0, transport_cost=700.0, handling_cost=50.0, storage_cost=0.0, expected_loss=40.0, demand_score=85.0, buyer_reliability=90.0, payment_score=90.0),

        # Rice
        models.Market(crop="Rice", market_name="Kolhapur APMC", location="Kolhapur", price_per_quintal=3200.0, distance_km=400.0, transport_cost=500.0, handling_cost=60.0, storage_cost=0.0, expected_loss=30.0, demand_score=85.0, buyer_reliability=90.0, payment_score=90.0),
        models.Market(crop="Rice", market_name="Nagpur APMC", location="Nagpur", price_per_quintal=3450.0, distance_km=600.0, transport_cost=650.0, handling_cost=65.0, storage_cost=0.0, expected_loss=35.0, demand_score=88.0, buyer_reliability=92.0, payment_score=92.0),
        models.Market(crop="Rice", market_name="Pune (Gultekdi)", location="Pune", price_per_quintal=3300.0, distance_km=210.0, transport_cost=350.0, handling_cost=55.0, storage_cost=0.0, expected_loss=25.0, demand_score=82.0, buyer_reliability=86.0, payment_score=85.0)
    ]
    for m in markets_data:
        db.add(m)

    # 3. Seed Buyers (FreshMart as top recommended buyer)
    buyers_data = [
        models.Buyer(name="FreshMart", crop="Onion", market="Lasalgaon", price_per_kg=25.0, distance_km=18.0, minimum_quantity_kg=100.0, payment_days=1, reliability_score=94.0, verified=True),
        models.Buyer(name="Raj Agro Traders", crop="Onion", market="Lasalgaon", price_per_kg=24.5, distance_km=22.0, minimum_quantity_kg=200.0, payment_days=2, reliability_score=90.0, verified=True),
        models.Buyer(name="Sahyadri Farmers Co-op", crop="Onion", market="Pimpalgaon", price_per_kg=24.0, distance_km=35.0, minimum_quantity_kg=500.0, payment_days=1, reliability_score=92.0, verified=True),
        models.Buyer(name="Mumbai Wholesale Direct", crop="Onion", market="Mumbai APMC", price_per_kg=25.5, distance_km=180.0, minimum_quantity_kg=1000.0, payment_days=3, reliability_score=86.0, verified=True),
        
        models.Buyer(name="MahaFarm Fresh", crop="Tomato", market="Pimpalgaon", price_per_kg=24.5, distance_km=25.0, minimum_quantity_kg=200.0, payment_days=1, reliability_score=91.0, verified=True),
        models.Buyer(name="Vashi Supply Corp", crop="Tomato", market="Mumbai APMC", price_per_kg=26.0, distance_km=180.0, minimum_quantity_kg=500.0, payment_days=2, reliability_score=88.0, verified=True),
        
        models.Buyer(name="Godavari Grains Traders", crop="Wheat", market="Ahmednagar", price_per_kg=22.5, distance_km=140.0, minimum_quantity_kg=500.0, payment_days=1, reliability_score=89.0, verified=True),
        models.Buyer(name="Deccan Rice Exporters", crop="Rice", market="Kolhapur", price_per_kg=32.5, distance_km=400.0, minimum_quantity_kg=1000.0, payment_days=2, reliability_score=93.0, verified=True),
        models.Buyer(name="Vidarbha Agro Hub", crop="Rice", market="Nagpur", price_per_kg=35.0, distance_km=600.0, minimum_quantity_kg=1000.0, payment_days=1, reliability_score=95.0, verified=True),
        models.Buyer(name="Pune Harvest Market", crop="Potato", market="Nashik", price_per_kg=18.5, distance_km=18.0, minimum_quantity_kg=200.0, payment_days=1, reliability_score=90.0, verified=True)
    ]
    for b in buyers_data:
        db.add(b)

    # 4. Seed Historical Price Data
    dates = ["2026-08-20", "2026-08-22", "2026-08-24", "2026-08-26", "2026-08-28", "2026-08-30"]
    price_trends = {
        ("Onion", "Lasalgaon"): [2250, 2300, 2320, 2360, 2400, 2430],
        ("Onion", "Mumbai APMC (Vashi)"): [2380, 2410, 2450, 2480, 2500, 2520],
        ("Onion", "Pune (Gultekdi)"): [2200, 2240, 2280, 2310, 2350, 2380],
        ("Tomato", "Pimpalgaon APMC"): [2100, 2180, 2250, 2320, 2400, 2450],
        ("Potato", "Nashik Market Yard"): [1650, 1700, 1720, 1760, 1800, 1820],
        ("Wheat", "Ahmednagar APMC"): [2100, 2120, 2150, 2180, 2200, 2230],
        ("Rice", "Kolhapur APMC"): [3050, 3100, 3140, 3180, 3200, 3240]
    }

    for (c_name, m_name), prices in price_trends.items():
        for d_str, p_val in zip(dates, prices):
            ph = models.PriceHistory(crop=c_name, market=m_name, date=d_str, price_per_quintal=p_val)
            db.add(ph)

    db.commit()
    print("[SUCCESS] Database successfully seeded with SIH demo scenario (Demo Farmer 9999999999 / demo123 & Lasalgaon Mandi data)!")

    db.close()

if __name__ == "__main__":
    seed_database()
