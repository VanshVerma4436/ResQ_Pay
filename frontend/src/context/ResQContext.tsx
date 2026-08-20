import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Policy, TrustedContact, EmergencyService, Transaction, AgentStatus, AgentLog, EmergencySimulateResponse, SimulationStep } from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export type TabType = 'landing' | 'overview' | 'agent' | 'safety' | 'policy' | 'contacts' | 'transactions' | 'services';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface ResQContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  agentStatus: AgentStatus | null;
  policy: Policy | null;
  contacts: TrustedContact[];
  services: EmergencyService[];
  transactions: Transaction[];
  agentLogs: AgentLog[];
  loading: boolean;
  toasts: Toast[];
  addToast: (type: Toast['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Simulation State
  isSimulating: boolean;
  simulationModalOpen: boolean;
  setSimulationModalOpen: (open: boolean) => void;
  currentSimStep: number;
  simSteps: SimulationStep[];
  simResponse: EmergencySimulateResponse | null;
  triggerEmergencySimulation: (overrides?: {
    location?: string;
    situation?: string;
    patient_status?: string;
    service_category?: string;
    estimated_cost?: number;
  }) => Promise<void>;

  // Transaction Detail Modal
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (tx: Transaction | null) => void;

  // Actions
  refreshAllData: () => Promise<void>;
  resetDemoData: () => Promise<void>;
  updatePolicyData: (updated: Partial<Policy>) => Promise<void>;
  addTrustedContact: (contact: Partial<TrustedContact>) => Promise<void>;
}

const ResQContext = createContext<ResQContextType | undefined>(undefined);

export const ResQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [agentStatus, setAgentStatus] = useState<AgentStatus | null>(null);
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Simulation Modal State
  const [simulationModalOpen, setSimulationModalOpen] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentSimStep, setCurrentSimStep] = useState<number>(0);
  const [simSteps, setSimSteps] = useState<SimulationStep[]>([]);
  const [simResponse, setSimResponse] = useState<EmergencySimulateResponse | null>(null);

  // Selected Transaction Modal State
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const addToast = useCallback((type: Toast['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const refreshAllData = useCallback(async () => {
    try {
      const [statusRes, policyRes, contactsRes, servicesRes, txsRes, logsRes] = await Promise.all([
        api.getAgentStatus(),
        api.getPolicy(),
        api.getContacts(),
        api.getServices(),
        api.getTransactions(),
        api.getAgentLogs(),
      ]);

      setAgentStatus(statusRes);
      setPolicy(policyRes);
      setContacts(contactsRes);
      setServices(servicesRes);
      setTransactions(txsRes);
      setAgentLogs(logsRes);
    } catch (err) {
      console.error('Error refreshing ResQ Pay data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  const triggerEmergencySimulation = async (overrides?: {
    location?: string;
    situation?: string;
    patient_status?: string;
    service_category?: string;
    estimated_cost?: number;
  }) => {
    setSimulationModalOpen(true);
    setIsSimulating(true);
    setCurrentSimStep(1);
    setSimResponse(null);

    const initialSteps: SimulationStep[] = [
      { step: 1, title: '🚨 Emergency Signal Received', status: 'Processing', details: 'Signal received from telemetric alert system...', timestamp: 'Just now' },
      { step: 2, title: '🤖 AI Agent Analyzing Situation', status: 'Pending', details: 'Understanding emergency context...', timestamp: 'Pending' },
      { step: 3, title: '🏥 Finding Emergency Service', status: 'Pending', details: 'Searching verified service registry...', timestamp: 'Pending' },
      { step: 4, title: '🔐 Verifying Provider', status: 'Pending', details: 'Verifying emergency credentials...', timestamp: 'Pending' },
      { step: 5, title: '🛡 Policy & Risk Check', status: 'Pending', details: 'Checking emergency limits & risk score...', timestamp: 'Pending' },
      { step: 6, title: '💳 Payment Authorization', status: 'Pending', details: 'Generating emergency payment authorization...', timestamp: 'Pending' },
      { step: 7, title: '⚡ Payment Executed', status: 'Pending', details: 'Executing simulated payment transaction...', timestamp: 'Pending' },
      { step: 8, title: '📱 Trusted Contact Notified', status: 'Pending', details: 'Dispatching notification to trusted emergency contact...', timestamp: 'Pending' },
    ];
    setSimSteps(initialSteps);

    try {
      const result = await api.simulateEmergency(overrides || {});
      setSimResponse(result);

      for (let i = 1; i <= 8; i++) {
        setCurrentSimStep(i);
        setSimSteps((prev) =>
          prev.map((s) => {
            if (s.step < i) return { ...result.steps[s.step - 1], status: 'Completed' };
            if (s.step === i) return { ...result.steps[s.step - 1], status: 'Processing' };
            return s;
          })
        );
        await new Promise((resolve) => setTimeout(resolve, 450));
      }

      setSimSteps(result.steps);
      setCurrentSimStep(9);
      setIsSimulating(false);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#EF4444', '#F59E0B']
      });

      addToast(
        'success',
        'Emergency Payment Completed',
        `Simulated payment of ₹${(overrides?.estimated_cost || 2800).toLocaleString('en-IN')} authorized & executed!`
      );

      await refreshAllData();
    } catch (err: any) {
      setIsSimulating(false);
      addToast('error', 'Simulation Error', err.message || 'Failed to complete emergency simulation.');
    }
  };

  const updatePolicyData = async (updated: Partial<Policy>) => {
    try {
      const res = await api.updatePolicy(updated);
      addToast('success', 'Policy Saved', res.message);
      await refreshAllData();
    } catch (err: any) {
      addToast('error', 'Policy Error', err.message);
    }
  };

  const addTrustedContact = async (contact: Partial<TrustedContact>) => {
    try {
      const res = await api.addContact(contact);
      addToast('success', 'Contact Added', res.message);
      await refreshAllData();
    } catch (err: any) {
      addToast('error', 'Contact Error', err.message);
    }
  };

  const resetDemoData = async () => {
    try {
      setLoading(true);
      const res = await api.resetDemo();
      await refreshAllData();
      addToast('info', 'Demo Reset', res.message);
    } catch (err: any) {
      addToast('error', 'Reset Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResQContext.Provider
      value={{
        activeTab,
        setActiveTab,
        agentStatus,
        policy,
        contacts,
        services,
        transactions,
        agentLogs,
        loading,
        toasts,
        addToast,
        removeToast,
        isSimulating,
        simulationModalOpen,
        setSimulationModalOpen,
        currentSimStep,
        simSteps,
        simResponse,
        triggerEmergencySimulation,
        selectedTransaction,
        setSelectedTransaction,
        refreshAllData,
        resetDemoData,
        updatePolicyData,
        addTrustedContact,
      }}
    >
      {children}
    </ResQContext.Provider>
  );
};

export const useResQ = () => {
  const context = useContext(ResQContext);
  if (!context) {
    throw new Error('useResQ must be used within a ResQProvider');
  }
  return context;
};
