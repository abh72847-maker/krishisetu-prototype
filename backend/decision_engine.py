from typing import List, Dict, Any

def calculate_net_realisation(market: Any, quality: str = "Grade A") -> Dict[str, float]:
    """
    Net Realisation = Selling Price - Transport - Handling - Storage - Expected Loss
    Apply quality grade factor (Grade A: 100%, Grade B: 90%, Grade C: 80%)
    """
    quality_factor = 1.0 if quality == "Grade A" else 0.90 if quality == "Grade B" else 0.80
    adjusted_price = market.price_per_quintal * quality_factor
    
    net_realisation = adjusted_price - market.transport_cost - market.handling_cost - market.storage_cost - market.expected_loss
    return {
        "adjusted_price": adjusted_price,
        "net_realisation": round(net_realisation, 2)
    }

def calculate_market_score(market: Any, net_realisation: float, max_net_realisation: float, urgency: str) -> int:
    """
    Market Score = 40% Net Realisation + 25% Demand + 15% Reliability + 10% Distance + 10% Payment
    Adjusted by farmer urgency requirement.
    """
    # Normalized Net Realisation Score (0-100)
    net_score = (net_realisation / max_net_realisation * 100) if max_net_realisation > 0 else 50
    
    # Distance Score (Inverse: closer distance = higher score)
    dist_score = max(0, 100 - (market.distance_km / 300.0 * 100))
    
    base_score = (
        0.40 * net_score +
        0.25 * market.demand_score +
        0.15 * market.buyer_reliability +
        0.10 * dist_score +
        0.10 * market.payment_score
    )

    # Urgency Adjustment
    if urgency == "Need money today":
        # Weight payment speed and proximity higher
        score = base_score * 0.80 + (market.payment_score * 0.10) + (dist_score * 0.10)
    elif urgency == "Need money within 3 days":
        score = base_score
    elif urgency in ["Can wait 7 days", "Can wait 15 days"]:
        # Weight net realisation higher
        score = base_score * 0.85 + (net_score * 0.15)
    else:
        score = base_score

    return min(99, max(50, int(round(score))))

def generate_ai_reasons(market: Any, net_realisation: float, is_top: bool) -> List[str]:
    reasons = []
    if is_top:
        reasons.append("✓ Highest expected net earning after transport & logistics costs")
    if market.demand_score >= 80:
        reasons.append("✓ Strong buyer market demand and high volume absorption")
    else:
        reasons.append("✓ Moderate steady market demand")

    if market.transport_cost <= 300:
        reasons.append("✓ Lower logistics & freight overheads")
    else:
        reasons.append("✓ Direct highway transport connectivity")

    if market.buyer_reliability >= 85:
        reasons.append("✓ Highly reliable APMC verified buyers")

    if market.payment_score >= 85:
        reasons.append("✓ Fast 24-48 hour payment settlement window")

    return reasons
