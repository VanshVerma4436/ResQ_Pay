from fastapi import APIRouter
from database import seed_db

router = APIRouter(prefix="/api/demo", tags=["Demo"])

@router.post("/reset")
def reset_demo_state():
    """
    Resets transactions, agent logs, emergency state, notifications, and spending counters to clean initial demo state.
    """
    seed_db()
    return {
        "status": "SUCCESS",
        "message": "Demo state reset successfully. Transactions, policy counters, and logs restored."
    }
