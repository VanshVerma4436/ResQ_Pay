import type { Policy, TrustedContact, EmergencyService, Transaction, AgentStatus, AgentLog, EmergencySimulateResponse } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = {
  async getAgentStatus(): Promise<AgentStatus> {
    const res = await fetch(`${API_BASE_URL}/agent/status`);
    if (!res.ok) throw new Error('Failed to fetch agent status');
    return res.json();
  },

  async getAgentLogs(): Promise<AgentLog[]> {
    const res = await fetch(`${API_BASE_URL}/agent/logs`);
    if (!res.ok) throw new Error('Failed to fetch agent logs');
    return res.json();
  },

  async getPolicy(): Promise<Policy> {
    const res = await fetch(`${API_BASE_URL}/policies`);
    if (!res.ok) throw new Error('Failed to fetch policy');
    return res.json();
  },

  async updatePolicy(data: Partial<Policy>): Promise<{ status: string; message: string }> {
    const res = await fetch(`${API_BASE_URL}/policies`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update policy');
    return res.json();
  },

  async getContacts(): Promise<TrustedContact[]> {
    const res = await fetch(`${API_BASE_URL}/contacts`);
    if (!res.ok) throw new Error('Failed to fetch trusted contacts');
    return res.json();
  },

  async addContact(contact: Partial<TrustedContact>): Promise<{ status: string; message: string }> {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error('Failed to add contact');
    return res.json();
  },

  async getServices(): Promise<EmergencyService[]> {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  async getTransactions(category?: string): Promise<Transaction[]> {
    const url = category && category !== 'all' 
      ? `${API_BASE_URL}/transactions?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/transactions`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
  },

  async getTransactionDetail(id: string): Promise<Transaction> {
    const res = await fetch(`${API_BASE_URL}/transactions/${id}`);
    if (!res.ok) throw new Error('Failed to fetch transaction detail');
    return res.json();
  },

  async simulateEmergency(data: {
    location?: string;
    situation?: string;
    patient_status?: string;
    service_category?: string;
    estimated_cost?: number;
  }): Promise<EmergencySimulateResponse> {
    const res = await fetch(`${API_BASE_URL}/emergency/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: data.location || 'Mathura, Uttar Pradesh',
        situation: data.situation || 'Road accident',
        patient_status: data.patient_status || 'Unable to manually initiate payment',
        service_category: data.service_category || 'Ambulance',
        estimated_cost: data.estimated_cost || 2800.0,
      }),
    });
    if (!res.ok) throw new Error('Emergency simulation request failed');
    return res.json();
  },

  async resetDemo(): Promise<{ status: string; message: string }> {
    const res = await fetch(`${API_BASE_URL}/demo/reset`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to reset demo');
    return res.json();
  }
};
