from fastapi import APIRouter, HTTPException
from database import get_db_connection
import json

router = APIRouter(prefix="/api/agent", tags=["Agent"])

@router.get("/status")
def get_agent_status():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM policies WHERE id = 1")
    policy = dict(cursor.fetchone() or {})
    
    cursor.execute("SELECT COUNT(*) FROM trusted_contacts")
    tc_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM services WHERE verified = 1")
    vs_count = cursor.fetchone()[0]

    conn.close()

    spending_limit = policy.get("spending_limit", 10000.0)
    used_amount = policy.get("used_this_month", 2450.0)
    remaining = max(0.0, spending_limit - used_amount)
    is_active = bool(policy.get("ai_permission_auto", 1))

    capabilities = [
        "Detect emergency requests telemetrically",
        "Understand context & medical necessity",
        "Search & verify registered emergency services",
        "Evaluate pre-approved payment eligibility",
        "Apply spending ceiling & risk policies",
        "Perform real-time fraud & risk scoring",
        "Execute automated simulated payment token",
        "Notify trusted contacts via SMS & Push",
        "Maintain immutable transaction audit logs"
    ]

    return {
        "status": "ACTIVE" if is_active else "PAUSED",
        "mode": "Emergency Protection",
        "emergency_limit": spending_limit,
        "used_amount": used_amount,
        "remaining_amount": remaining,
        "trusted_contacts_count": tc_count,
        "verified_services_count": vs_count,
        "capabilities": capabilities
    }

@router.get("/logs")
def get_agent_logs():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM agent_logs ORDER BY id DESC LIMIT 50")
    logs = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return logs

@router.post("/analyze")
def analyze_intent(payload: dict):
    return {
        "intent": "EMERGENCY_SERVICE_REQUEST",
        "confidence": 0.98,
        "category": payload.get("category", "Ambulance"),
        "urgency": "HIGH",
        "recommended_action": "EXECUTE_EMERGENCY_PAYMENT"
    }
