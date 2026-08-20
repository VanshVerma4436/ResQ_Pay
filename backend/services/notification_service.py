from typing import Dict, Any, List

class NotificationService:
    @staticmethod
    def send_emergency_alert(contact_name: str, phone: str, service_name: str, amount: float, location: str) -> Dict[str, Any]:
        """
        Simulates real-time dispatch of emergency SMS and WhatsApp notifications.
        """
        message = (
            f"🚨 ResQ Pay Alert for {contact_name}: Emergency payment of ₹{amount:,.2f} "
            f"was automatically dispatched for '{service_name}' at {location}. "
            f"Status: SIMULATED SUCCESS. Contact user or responder if needed."
        )
        return {
            "status": "DELIVERED",
            "contact_name": contact_name,
            "phone": phone,
            "channel": "SMS & WhatsApp Direct Push",
            "message": message,
            "timestamp": "Just now"
        }
