import sqlite3
import json
import os
from typing import Dict, Any, List

DB_PATH = os.path.join(os.path.dirname(__file__), "resqpay.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Emergency Policy table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS policies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            spending_limit REAL DEFAULT 10000.0,
            used_this_month REAL DEFAULT 2450.0,
            max_single_tx REAL DEFAULT 5000.0,
            approved_categories TEXT,
            provider_verification_required INTEGER DEFAULT 1,
            trusted_contact_approval_above REAL DEFAULT 5000.0,
            ai_permission_auto INTEGER DEFAULT 1,
            active INTEGER DEFAULT 1
        )
    ''')

    # Trusted Contacts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS trusted_contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            relationship TEXT NOT NULL,
            phone TEXT NOT NULL,
            status TEXT DEFAULT 'Verified',
            is_primary INTEGER DEFAULT 0
        )
    ''')

    # Emergency Services table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            verified INTEGER DEFAULT 1,
            eta_minutes INTEGER,
            estimated_cost REAL,
            risk_level TEXT DEFAULT 'Low',
            supported_payment TEXT DEFAULT 'Simulated Card / UPI',
            phone TEXT,
            location TEXT
        )
    ''')

    # Transactions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            service TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            risk_level TEXT NOT NULL,
            risk_score INTEGER NOT NULL,
            authorization TEXT NOT NULL,
            status TEXT NOT NULL,
            simulated INTEGER DEFAULT 1,
            ai_decision TEXT NOT NULL,
            location TEXT,
            patient_status TEXT,
            audit_log TEXT NOT NULL
        )
    ''')

    # Agent Logs table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS agent_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            level TEXT NOT NULL,
            message TEXT NOT NULL
        )
    ''')

    # Check if policy exists, if not seed
    cursor.execute("SELECT COUNT(*) FROM policies")
    if cursor.fetchone()[0] == 0:
        seed_db(conn)

    conn.commit()
    conn.close()

def seed_db(conn=None):
    close_conn = False
    if conn is None:
        conn = get_db_connection()
        close_conn = True
    
    cursor = conn.cursor()

    # Clear existing demo data
    cursor.execute("DELETE FROM policies")
    cursor.execute("DELETE FROM trusted_contacts")
    cursor.execute("DELETE FROM services")
    cursor.execute("DELETE FROM transactions")
    cursor.execute("DELETE FROM agent_logs")

    # 1. Default Policy
    categories = json.dumps(["Ambulance", "Emergency Transportation", "Pharmacy", "Hospital Essentials"])
    cursor.execute('''
        INSERT INTO policies (id, spending_limit, used_this_month, max_single_tx, approved_categories, provider_verification_required, trusted_contact_approval_above, ai_permission_auto, active)
        VALUES (1, 10000.0, 2450.0, 5000.0, ?, 1, 5000.0, 1, 1)
    ''', (categories,))

    # 2. Trusted Contacts
    cursor.execute('''
        INSERT INTO trusted_contacts (name, relationship, phone, status, is_primary)
        VALUES 
        ('Priya Verma', 'Family (Sister)', '+91 98765 43210', 'Verified', 1),
        ('Rahul Sharma', 'Friend', '+91 98765 12345', 'Verified', 0)
    ''')

    # 3. Emergency Services
    services_data = [
        ('RapidCare Ambulance', 'Ambulance', 1, 8, 2800.0, 'Low', 'Simulated UPI / Card', '+91 91100 22334', 'Mathura, UP'),
        ('City Care Pharmacy 24/7', 'Pharmacy', 1, 12, 1250.0, 'Low', 'Simulated Card', '+91 91100 55667', 'Mathura, UP'),
        ('Apex Trauma Hospital', 'Hospital', 1, 15, 4500.0, 'Low', 'Simulated Direct Transfer', '+91 91100 88990', 'Mathura, UP'),
        ('MedRide Express', 'Emergency Transportation', 1, 6, 3200.0, 'Low', 'Simulated UPI', '+91 91100 11223', 'Mathura, UP'),
        ('Lifeline Oxygen Services', 'Hospital Essentials', 1, 20, 1800.0, 'Low', 'Simulated Card', '+91 91100 44556', 'Mathura, UP'),
        ('Apollo Pharmacy Express', 'Pharmacy', 1, 10, 850.0, 'Low', 'Simulated UPI', '+91 91100 77889', 'Mathura, UP'),
        ('Max Medevac Air/Road', 'Emergency Transportation', 1, 25, 12000.0, 'High', 'Simulated Bank Transfer', '+91 91100 99001', 'Delhi-NCR'),
        ('QuickRescue First Response', 'Ambulance', 1, 5, 2500.0, 'Low', 'Simulated Card', '+91 91100 33445', 'Mathura, UP')
    ]
    cursor.executemany('''
        INSERT INTO services (name, category, verified, eta_minutes, estimated_cost, risk_level, supported_payment, phone, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', services_data)

    # 4. Initial Transactions History
    tx_audit_1 = json.dumps([
        "Emergency signal received from user location",
        "AI Agent parsed request for City Care Pharmacy",
        "Provider verified against official emergency register",
        "Amount ₹1,250 within single tx limit (₹5,000)",
        "Risk Engine calculated score: 8/100 (LOW)",
        "Simulated payment executed under Policy EP-001",
        "Trusted contact Priya Verma notified via SMS"
    ])

    tx_audit_2 = json.dumps([
        "Emergency signal received: roadside breakdown assistance",
        "AI Agent parsed request for MedRide Express",
        "Provider verified ✓",
        "Amount ₹1,200 within limits",
        "Risk score: 10/100 (LOW)",
        "Simulated payment authorized & executed",
        "Trusted contact Rahul Sharma notified"
    ])

    cursor.execute('''
        INSERT INTO transactions (id, date, service, category, amount, risk_level, risk_score, authorization, status, simulated, ai_decision, location, patient_status, audit_log)
        VALUES 
        ('RSQ-TXN-20260818-001', '2026-08-18 14:22', 'City Care Pharmacy 24/7', 'Pharmacy', 1250.0, 'LOW', 8, 'Policy EP-001', 'SUCCESS', 1, 'Emergency medicine purchase authorized. Provider verified and amount within pre-approved limits.', 'Mathura, UP', 'Acute Asthma Episode', ?),
        ('RSQ-TXN-20260810-002', '2026-08-10 09:15', 'MedRide Express', 'Emergency Transportation', 1200.0, 'LOW', 10, 'Policy EP-001', 'SUCCESS', 1, 'Emergency vehicle transport authorized during flash rainstorm.', 'Highway NH-19, UP', 'Vehicle Failure in Storm', ?)
    ''', (tx_audit_1, tx_audit_2))

    # 5. Agent Logs
    logs = [
        ('15:42:03', 'INFO', 'Emergency protection agent initialized and monitoring telemetry.'),
        ('15:42:04', 'INFO', 'Policy #EP-001 loaded with emergency ceiling ₹10,000.'),
        ('15:42:05', 'INFO', '2 trusted contacts synced and ready for emergency alerts.'),
        ('15:42:06', 'INFO', '8 local emergency service providers verified.')
    ]
    cursor.executemany('''
        INSERT INTO agent_logs (timestamp, level, message) VALUES (?, ?, ?)
    ''', logs)

    conn.commit()
    if close_conn:
        conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized & seeded successfully.")
