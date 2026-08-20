import json
from typing import Dict, Any, Tuple

class PolicyEngine:
    @staticmethod
    def evaluate(policy: Dict[str, Any], amount: float, category: str, provider_verified: bool) -> Tuple[bool, str, Dict[str, Any]]:
        """
        Evaluates an emergency transaction against active policy constraints.
        Returns: (is_approved, decision_reason, details_dict)
        """
        spending_limit = policy.get("spending_limit", 10000.0)
        used_this_month = policy.get("used_this_month", 0.0)
        max_single_tx = policy.get("max_single_tx", 5000.0)
        
        approved_cats = policy.get("approved_categories", [])
        if isinstance(approved_cats, str):
            try:
                approved_cats = json.loads(approved_cats)
            except:
                approved_cats = ["Ambulance", "Emergency Transportation", "Pharmacy", "Hospital Essentials"]

        provider_req = bool(policy.get("provider_verification_required", True))
        tc_threshold = policy.get("trusted_contact_approval_above", 5000.0)
        ai_permission = bool(policy.get("ai_permission_auto", True))

        remaining_limit = max(0.0, spending_limit - used_this_month)

        cat_lower = category.lower()
        approved_cats_lower = [ac.lower() for ac in approved_cats]
        is_cat_approved = any(cat_lower in ac or ac in cat_lower for ac in approved_cats_lower)

        checks = {
            "ai_permission_active": ai_permission,
            "category_approved": is_cat_approved,
            "within_single_tx_limit": amount <= max_single_tx,
            "within_monthly_limit": amount <= remaining_limit,
            "provider_verified_ok": (not provider_req) or provider_verified,
            "requires_contact_approval": amount > tc_threshold
        }

        # Check failures
        if not ai_permission:
            return False, "Autonomous AI agent execution is currently disabled in Policy Settings.", checks

        if not checks["category_approved"]:
            return False, f"Category '{category}' is not in pre-approved emergency categories list.", checks

        if not checks["within_single_tx_limit"]:
            return False, f"Amount ₹{amount:,.2f} exceeds max single transaction ceiling of ₹{max_single_tx:,.2f}.", checks

        if not checks["within_monthly_limit"]:
            return False, f"Amount ₹{amount:,.2f} exceeds remaining monthly emergency budget of ₹{remaining_limit:,.2f}.", checks

        if not checks["provider_verified_ok"]:
            return False, "Provider is not verified and policy requires strict provider verification.", checks

        reasoning = f"Emergency service '{category}' pre-approved. Transaction amount ₹{amount:,.2f} is within single limit (₹{max_single_tx:,.2f}) and remaining limit (₹{remaining_limit:,.2f}). Provider verification verified."
        
        return True, reasoning, checks
