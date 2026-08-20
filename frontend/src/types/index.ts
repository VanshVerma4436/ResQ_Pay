export interface Policy {
  id?: number;
  spending_limit: number;
  used_this_month: number;
  max_single_tx: number;
  approved_categories: string[];
  provider_verification_required: boolean;
  trusted_contact_approval_above: number;
  ai_permission_auto: boolean;
  active?: boolean;
}

export interface TrustedContact {
  id?: number;
  name: string;
  relationship: string;
  phone: string;
  status: string;
  is_primary: boolean;
}

export interface EmergencyService {
  id: number;
  name: string;
  category: string;
  verified: boolean;
  eta_minutes: number;
  estimated_cost: number;
  risk_level: string;
  supported_payment: string;
  phone: string;
  location: string;
}

export interface Transaction {
  id: string;
  date: string;
  service: string;
  category: string;
  amount: number;
  risk_level: string;
  risk_score: number;
  authorization: string;
  status: string;
  simulated: boolean;
  ai_decision: string;
  location: string;
  patient_status: string;
  audit_log: string[];
}

export interface AgentStatus {
  status: string;
  mode: string;
  emergency_limit: number;
  used_amount: number;
  remaining_amount: number;
  trusted_contacts_count: number;
  verified_services_count: number;
  capabilities: string[];
}

export interface AgentLog {
  id: number;
  timestamp: string;
  level: string;
  message: string;
}

export interface SimulationStep {
  step: number;
  title: string;
  status: 'Completed' | 'Processing' | 'Pending' | 'Failed';
  details: string;
  timestamp: string;
  extra_data?: Record<string, any>;
}

export interface EmergencySimulateResponse {
  simulation_id: string;
  status: 'SUCCESS' | 'REVIEW_REQUIRED' | 'REJECTED';
  transaction_id?: string;
  service_name: string;
  amount: number;
  risk_score: number;
  risk_level: string;
  policy_id: string;
  decision_reasoning: string;
  steps: SimulationStep[];
  notified_contact?: string;
}
