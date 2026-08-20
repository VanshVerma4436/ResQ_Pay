from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# Policy Schemas
class EmergencyPolicySchema(BaseModel):
    id: Optional[int] = 1
    spending_limit: float = 10000.0
    used_this_month: float = 2450.0
    max_single_tx: float = 5000.0
    approved_categories: List[str] = ["Ambulance", "Emergency Transportation", "Pharmacy", "Hospital Essentials"]
    provider_verification_required: bool = True
    trusted_contact_approval_above: float = 5000.0
    ai_permission_auto: bool = True
    active: bool = True

class PolicyUpdateSchema(BaseModel):
    spending_limit: Optional[float] = None
    max_single_tx: Optional[float] = None
    approved_categories: Optional[List[str]] = None
    provider_verification_required: Optional[bool] = None
    trusted_contact_approval_above: Optional[float] = None
    ai_permission_auto: Optional[bool] = None

# Trusted Contact Schemas
class TrustedContactSchema(BaseModel):
    id: Optional[int] = None
    name: str
    relationship: str
    phone: str
    status: str = "Verified"
    is_primary: bool = False

# Service Schemas
class ServiceSchema(BaseModel):
    id: int
    name: str
    category: str
    verified: bool
    eta_minutes: int
    estimated_cost: float
    risk_level: str
    supported_payment: str
    phone: str
    location: str

# Emergency Simulation Schemas
class EmergencySimulateRequest(BaseModel):
    location: str = "Mathura, Uttar Pradesh"
    situation: str = "Road accident"
    patient_status: str = "Unable to manually initiate payment"
    service_category: str = "Ambulance"
    estimated_cost: float = 2800.0
    custom_notes: Optional[str] = None

class EmergencyStepResult(BaseModel):
    step: int
    title: str
    status: str  # Completed, Processing, Pending, Failed
    details: str
    timestamp: str
    extra_data: Optional[Dict[str, Any]] = None

class EmergencySimulateResponse(BaseModel):
    simulation_id: str
    status: str  # SUCCESS, REVIEW_REQUIRED, REJECTED
    transaction_id: Optional[str] = None
    service_name: str
    amount: float
    risk_score: int
    risk_level: str
    policy_id: str
    decision_reasoning: str
    steps: List[EmergencyStepResult]
    notified_contact: Optional[str] = None

# Transaction Schemas
class TransactionSchema(BaseModel):
    id: str
    date: str
    service: str
    category: str
    amount: float
    risk_level: str
    risk_score: int
    authorization: str
    status: str
    simulated: bool = True
    ai_decision: str
    location: str
    patient_status: str
    audit_log: List[str]

# Agent Status Schema
class AgentStatusSchema(BaseModel):
    status: str  # ACTIVE, IDLE, PROCESSING
    mode: str
    emergency_limit: float
    used_amount: float
    remaining_amount: float
    trusted_contacts_count: int
    verified_services_count: int
    capabilities: List[str]

class AgentLogSchema(BaseModel):
    id: int
    timestamp: str
    level: str
    message: str
