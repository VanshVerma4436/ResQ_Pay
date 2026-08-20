from fastapi import APIRouter
from services.notification_service import NotificationService

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

@router.post("")
def trigger_notification(payload: dict):
    contact = payload.get("contact_name", "Priya Verma")
    phone = payload.get("phone", "+91 98765 43210")
    service = payload.get("service_name", "RapidCare Ambulance")
    amount = float(payload.get("amount", 2800.0))
    location = payload.get("location", "Mathura, Uttar Pradesh")

    res = NotificationService.send_emergency_alert(
        contact_name=contact,
        phone=phone,
        service_name=service,
        amount=amount,
        location=location
    )
    return res
