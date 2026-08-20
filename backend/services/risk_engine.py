from typing import Dict, Any, Tuple

class RiskEngine:
    @staticmethod
    def calculate_risk(amount: float, max_single_limit: float, provider_verified: bool, category: str, location: str) -> Tuple[int, str, Dict[str, Any]]:
        """
        Calculates risk score (0-100) and risk level (LOW, MEDIUM, HIGH)
        """
        score = 10  # Baseline emergency context score
        factors = []

        if not provider_verified:
            score += 45
            factors.append("Unverified service provider (+45)")
        else:
            factors.append("Verified provider (-0)")

        # Amount ratio check
        ratio = amount / max_single_limit if max_single_limit > 0 else 1.0
        if ratio > 0.8:
            score += 25
            factors.append("Amount close to single transaction limit (>80%) (+25)")
        elif ratio > 0.5:
            score += 12
            factors.append("Amount > 50% of single limit (+12)")

        # Category check
        standard_emergency_cats = ["ambulance", "emergency transportation", "pharmacy", "hospital essentials", "hospital"]
        if not any(c in category.lower() for c in standard_emergency_cats):
            score += 30
            factors.append("Non-standard emergency category (+30)")

        # Location factor
        if "out of region" in location.lower():
            score += 15
            factors.append("Unusual geographic telemetry (+15)")

        score = min(100, max(0, score))

        if score <= 30:
            level = "LOW"
        elif score <= 70:
            level = "MEDIUM"
        else:
            level = "HIGH"

        breakdown = {
            "base_score": 10,
            "total_score": score,
            "risk_level": level,
            "risk_factors": factors
        }

        return score, level, breakdown
