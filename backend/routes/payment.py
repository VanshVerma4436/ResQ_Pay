from fastapi import APIRouter
from services.agent_engine import AgentEngine

router = APIRouter(prefix="/api/payment", tags=["Payment"])

@router.post("/simulate")
def simulate_manual_payment(payload: dict):
    amount = float(payload.get("amount", 2800.0))
    service = payload.get("service", "RapidCare Ambulance")
    category = payload.get("category", "Ambulance")

    res = AgentEngine.run_simulation(
        location=payload.get("location", "Mathura, Uttar Pradesh"),
        situation=payload.get("situation", "Manual Emergency Demo Trigger"),
        patient_status="User Triggered Simulation",
        service_category=category,
        estimated_cost=amount
    )
    return res
