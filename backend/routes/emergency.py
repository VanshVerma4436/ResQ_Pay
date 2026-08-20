from fastapi import APIRouter, HTTPException
from models.schemas import EmergencySimulateRequest, EmergencySimulateResponse
from services.agent_engine import AgentEngine

router = APIRouter(prefix="/api/emergency", tags=["Emergency"])

@router.post("/simulate", response_model=EmergencySimulateResponse)
def simulate_emergency(req: EmergencySimulateRequest):
    """
    Triggers complete ResQ Pay emergency payment agent workflow simulation.
    """
    try:
        result = AgentEngine.run_simulation(
            location=req.location,
            situation=req.situation,
            patient_status=req.patient_status,
            service_category=req.service_category,
            estimated_cost=req.estimated_cost
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
