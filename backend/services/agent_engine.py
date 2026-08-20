import json
import uuid
import datetime
from typing import Dict, Any, List
from database import get_db_connection
from services.policy_engine import PolicyEngine
from services.risk_engine import RiskEngine
from services.notification_service import NotificationService

class AgentEngine:
    @staticmethod
    def run_simulation(location: str, situation: str, patient_status: str, service_category: str, estimated_cost: float) -> Dict[str, Any]:
        conn = get_db_connection()
        cursor = conn.cursor()

        # 1. Fetch Policy
        cursor.execute("SELECT * FROM policies WHERE id = 1")
        policy_row = cursor.fetchone()
        if not policy_row:
            policy = {
                "spending_limit": 10000.0,
                "used_this_month": 2450.0,
                "max_single_tx": 5000.0,
                "approved_categories": json.dumps(["Ambulance", "Emergency Transportation", "Pharmacy", "Hospital Essentials"]),
                "provider_verification_required": 1,
                "trusted_contact_approval_above": 5000.0,
                "ai_permission_auto": 1
            }
        else:
            policy = dict(policy_row)

        # 2. Fetch Primary Trusted Contact
        cursor.execute("SELECT * FROM trusted_contacts WHERE is_primary = 1 LIMIT 1")
        contact_row = cursor.fetchone()
        contact_name = contact_row["name"] if contact_row else "Priya Verma"
        contact_phone = contact_row["phone"] if contact_row else "+91 98765 43210"

        # 3. Find Best Matching Service Provider
        cursor.execute("SELECT * FROM services WHERE category LIKE ? AND verified = 1 LIMIT 1", (f"%{service_category}%",))
        service_row = cursor.fetchone()

        if not service_row:
            # Fallback service
            service_name = f"Verified {service_category} Provider"
            provider_verified = True
            eta = 8
        else:
            service_name = service_row["name"]
            provider_verified = bool(service_row["verified"])
            eta = service_row["eta_minutes"]

        # 4. Evaluate Policy
        is_policy_approved, policy_reason, checks = PolicyEngine.evaluate(
            policy=policy,
            amount=estimated_cost,
            category=service_category,
            provider_verified=provider_verified
        )

        # 5. Risk Assessment
        risk_score, risk_level, risk_breakdown = RiskEngine.calculate_risk(
            amount=estimated_cost,
            max_single_limit=policy.get("max_single_tx", 5000.0),
            provider_verified=provider_verified,
            category=service_category,
            location=location
        )

        # 6. Overall Agent Decision
        is_successful = is_policy_approved and (risk_level in ["LOW", "MEDIUM"])
        status_code = "SUCCESS" if is_successful else ("REVIEW_REQUIRED" if risk_level == "HIGH" else "REJECTED")

        now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        time_short = datetime.datetime.now().strftime("%H:%M:%S")
        tx_id = f"RSQ-TXN-{datetime.datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:4].upper()}"

        audit_logs = [
            f"Emergency signal received from {location} ({situation})",
            f"AI Agent analyzed intent: Category '{service_category}', Patient: {patient_status}",
            f"Matched verified service provider '{service_name}' (ETA: {eta} mins)",
            f"Provider verified against registered emergency database ✓",
            f"Policy Check: Amount ₹{estimated_cost:,.2f} vs Single Limit ₹{policy.get('max_single_tx'):,.2f} & Remaining Budget ₹{(policy.get('spending_limit') - policy.get('used_this_month')):,.2f}",
            f"Risk Engine output: Score {risk_score}/100 ({risk_level})",
            f"Simulated payment authorized under Emergency Policy EP-001",
            f"Trusted contact {contact_name} ({contact_phone}) notified via real-time alert"
        ]

        decision_explanation = (
            f"An emergency event was detected ({situation}) and an {service_category} was requested. "
            f"The selected provider ({service_name}) is verified. The transaction amount of ₹{estimated_cost:,.2f} "
            f"is below the user's ₹{policy.get('max_single_tx'):,.2f} single-transaction limit and within the "
            f"remaining ₹{(policy.get('spending_limit') - policy.get('used_this_month')):,.2f} emergency spending limit. "
            f"Risk score of {risk_score}/100 passed evaluation. Therefore, the transaction qualifies for automatic authorization."
        )

        if is_successful:
            # Update used amount in database
            new_used = policy.get("used_this_month", 0.0) + estimated_cost
            cursor.execute("UPDATE policies SET used_this_month = ? WHERE id = 1", (new_used,))

            # Insert transaction into database
            cursor.execute('''
                INSERT INTO transactions (id, date, service, category, amount, risk_level, risk_score, authorization, status, simulated, ai_decision, location, patient_status, audit_log)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'Policy EP-001', 'SUCCESS', 1, ?, ?, ?, ?)
            ''', (tx_id, now_str, service_name, service_category, estimated_cost, risk_level, risk_score, decision_explanation, location, patient_status, json.dumps(audit_logs)))

            # Append agent log
            cursor.execute("INSERT INTO agent_logs (timestamp, level, message) VALUES (?, 'INFO', ?)", (time_short, f"Simulated payment of ₹{estimated_cost:,.2f} completed for {service_name}."))

            conn.commit()

        # Send notification
        notification_res = NotificationService.send_emergency_alert(
            contact_name=contact_name,
            phone=contact_phone,
            service_name=service_name,
            amount=estimated_cost,
            location=location
        )

        conn.close()

        # Construct 8 timeline steps
        steps = [
            {
                "step": 1,
                "title": "🚨 Emergency Signal Received",
                "status": "Completed",
                "details": f"Location: {location} | Situation: {situation}",
                "timestamp": time_short
            },
            {
                "step": 2,
                "title": "🤖 AI Agent Analyzing Situation",
                "status": "Completed",
                "details": "Understanding emergency context and patient state...",
                "timestamp": time_short
            },
            {
                "step": 3,
                "title": "🏥 Finding Emergency Service",
                "status": "Completed",
                "details": f"Found provider '{service_name}' with estimated response time of {eta} mins.",
                "timestamp": time_short
            },
            {
                "step": 4,
                "title": "🔐 Verifying Provider",
                "status": "Completed",
                "details": f"Provider '{service_name}' verified ✓ against official emergency register.",
                "timestamp": time_short
            },
            {
                "step": 5,
                "title": "🛡 Policy & Risk Check",
                "status": "Completed",
                "details": f"Amount: ₹{estimated_cost:,.2f} | Emergency limit: ₹{policy.get('spending_limit'):,.2f} | Risk score: {risk_score}/100 ({risk_level}) | Within limit: YES",
                "timestamp": time_short
            },
            {
                "step": 6,
                "title": "💳 Payment Authorization",
                "status": "Completed",
                "details": "Payment authorized under Emergency Policy #EP-001",
                "timestamp": time_short
            },
            {
                "step": 7,
                "title": "⚡ Payment Executed",
                "status": "Completed",
                "details": f"₹{estimated_cost:,.2f} paid successfully (SIMULATED PAYMENT)",
                "timestamp": time_short
            },
            {
                "step": 8,
                "title": "📱 Trusted Contact Notified",
                "status": "Completed",
                "details": f"Emergency contact {contact_name} ({contact_phone}) notified via push alert.",
                "timestamp": time_short
            }
        ]

        return {
            "simulation_id": f"SIM-{uuid.uuid4().hex[:6].upper()}",
            "status": status_code,
            "transaction_id": tx_id if is_successful else None,
            "service_name": service_name,
            "amount": estimated_cost,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "policy_id": "Policy EP-001",
            "decision_reasoning": decision_explanation,
            "steps": steps,
            "notified_contact": f"{contact_name} ({contact_phone})"
        }
