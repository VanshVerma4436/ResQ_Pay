# 🚑 ResQ Pay

**When you can't make the payment, your trusted agent can.**

ResQ Pay is an AI-powered emergency payment agent prototype built for the Agentic Payments track of **Bitmela Launchpad: Ideathon 01**.

The idea is simple: during an emergency, a person may be injured, unconscious, panicked, or unable to access their phone. ResQ Pay demonstrates how a trusted AI agent could help coordinate and authorize an emergency payment within strict, user-defined safety limits.

> ⚠️ **Prototype / Demo Only:** ResQ Pay does not process real-money transactions. All payments shown in the prototype are simulated.

---

## 🎯 Problem

Digital payment systems generally assume that the user is available to manually initiate and authorize a transaction.

But emergencies can break that assumption. For example:

- A person needs an ambulance but cannot access their phone.
- Emergency transportation needs to be paid for immediately.
- Medicines or hospital essentials are required urgently.
- Family members may not be physically available to make the payment.

In these situations, access to payment can become another barrier to receiving help.

---

## 💡 Solution

ResQ Pay combines an AI agent with a controlled payment authorization layer.

### Before an emergency, the user configures:

- Emergency spending limits
- Maximum single-transaction limits
- Approved emergency categories
- Verified service requirements
- Trusted contacts
- AI authorization rules

### During an emergency, the prototype demonstrates this flow:

```
Emergency Signal
       ↓
AI Agent
       ↓
Context Analysis
       ↓
Service Verification
       ↓
Policy & Risk Engine
       ↓
Payment Authorization
       ↓
Simulated Payment
       ↓
Trusted Contact Notification
```

The AI handles reasoning and orchestration, while deterministic policies and risk controls handle financial authorization.

---

## 🚨 Example Scenario

A user is involved in a road accident and cannot manually make a payment.

**ResQ Pay:**

1. Detects/simulates the emergency.
2. Understands that an ambulance is required.
3. Finds a verified emergency provider.
4. Estimates the required payment.
5. Checks the user's emergency payment policy.
6. Runs a risk check.
7. Authorizes the transaction if all rules pass.
8. Simulates the payment.
9. Records the transaction.
10. Notifies a trusted contact.

**Example:**

```
Emergency: Road Accident
Location: Mathura, Uttar Pradesh
Service: Ambulance
Amount: ₹2,800

Emergency Limit: ₹10,000
Single Transaction Limit: ₹5,000
Risk Score: 12/100
Risk Level: LOW

Decision: APPROVED
Payment: SIMULATED SUCCESS
```

---

## 🔐 Safety by Design

A core principle of ResQ Pay is:

> **AI does not get unrestricted access to the user's money.**

The architecture separates AI reasoning from financial authorization.

```
                 ┌───────────────┐
                 │    AI Agent   │
                 └───────┬───────┘
                         ↓
                 Context Analysis
                         ↓
                 Service Verification
                         ↓
                 ┌───────────────┐
                 │ Policy Engine │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │  Risk Engine  │
                 └───────┬───────┘
                         ↓
                 Payment Authorization
                         ↓
                 Simulated Payment
```

**Safety controls include:**

- Spending limits
- Single-transaction limits
- Verified service providers
- Emergency category restrictions
- Risk scoring
- Trusted contacts
- Audit logs
- Human override
- Demo-only payment execution

---

## ✨ What Makes ResQ Pay Different?

Traditional payment applications typically follow:

```
User
 ↓
Open Payment App
 ↓
Select Service
 ↓
Enter Amount
 ↓
Confirm
 ↓
Pay
```

ResQ Pay is designed for a different situation:

```
Emergency
 ↓
AI understands context
 ↓
Find & verify service
 ↓
Apply payment policy
 ↓
Run risk checks
 ↓
Authorize within limits
 ↓
Execute payment
 ↓
Notify trusted contact
```

### The key innovation

ResQ Pay is not simply:

> AI + Payments

It is:

> **Context-aware autonomous financial action + strict authorization boundaries + emergency assistance.**

The system is designed for situations where the user may not be capable of manually initiating a payment.

---

## 🧠 AI Agent

The prototype uses an AI-agent abstraction for emergency reasoning and orchestration.

**The agent is responsible for:**

- Understanding emergency context
- Identifying the required service
- Selecting an appropriate verified provider
- Preparing the payment action
- Explaining the authorization decision
- Triggering notifications

The financial policy layer remains responsible for determining whether the transaction is actually permitted.

### Example agent decision

> An emergency event was detected and an ambulance was requested. The selected provider is verified. The transaction amount of ₹2,800 is below the configured ₹5,000 single-transaction limit and ₹10,000 emergency limit. Risk checks passed. The transaction qualifies for automatic authorization.

---

## 🛡️ Risk Engine

The prototype includes a simple risk-scoring model.

| Score | Risk | Action |
|-------|------|--------|
| 0–30 | LOW | Can be automatically approved |
| 31–70 | MEDIUM | Review / additional verification |
| 71–100 | HIGH | Reject or escalate |

**Example:**

```
Transaction Amount: ₹2,800
Provider: Verified
Category: Ambulance
Emergency Policy: Valid
Risk Score: 12/100

Result: LOW RISK
Decision: APPROVED
```

---

## 🖥️ Prototype Features

**Dashboard**
- Emergency protection status
- Spending limits
- Remaining emergency budget
- Trusted contacts
- Verified services
- Emergency simulation

**Emergency Agent**
- Live agent activity
- Emergency analysis
- Service discovery
- Verification
- Policy checks
- Risk evaluation
- Payment authorization

**Payment Policies**
- Emergency spending limit
- Single transaction limit
- Approved categories
- Provider verification
- Trusted contact rules
- AI authorization settings

**Trusted Contacts**
- Add contacts
- Verification status
- Emergency notifications

**Transactions**
- Transaction history
- Payment status
- Risk score
- Authorization policy
- Audit trail
- Transaction details

**Emergency Services**
- Verified providers
- Service categories
- Estimated cost
- ETA
- Risk status

**Demo Mode**
- All payments are simulated so the complete workflow can be demonstrated safely.

---

## 🏗️ Proposed Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Recharts

**Backend**
- Python
- FastAPI
- Pydantic

**Database**
- SQLite for the prototype
- Designed to be extensible to PostgreSQL/MongoDB

**AI**
- AI-agent abstraction
- Optional LLM integration
- Deterministic fallback agent for reliable demos

---

## 📁 Suggested Project Structure

```
resq-pay/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── agent/
│   ├── database/
│   ├── models/
│   ├── policies/
│   ├── risk/
│   ├── routes/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

## 🔌 API Endpoints

The prototype can expose APIs such as:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/emergency/simulate` | Simulate an emergency |
| POST | `/api/agent/analyze` | Analyze emergency context |
| GET | `/api/agent/status` | Get agent status |
| GET | `/api/services` | Get verified services |
| GET | `/api/policies` | Get payment policies |
| PUT | `/api/policies` | Update payment policies |
| GET | `/api/contacts` | Get trusted contacts |
| POST | `/api/contacts` | Add trusted contact |
| POST | `/api/payment/simulate` | Execute simulated payment |
| GET | `/api/transactions` | Get transactions |
| GET | `/api/transactions/{id}` | Get transaction details |
| POST | `/api/notifications` | Create notification |
| POST | `/api/demo/reset` | Reset demo state |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd resq-pay
```

### 2. Start the backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI
uvicorn main:app --reload
```

Backend will normally run at: `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite.

---

## 🎬 How to Demo ResQ Pay

For an ideathon presentation, use this flow:

**Step 1** — Open the ResQ Pay dashboard.

**Step 2** — Show: `Emergency Protection: ACTIVE`

**Step 3** — Click: `Simulate Emergency`

**Step 4** — Show the agent workflow:

```
Emergency Detected
       ↓
AI Analyzing
       ↓
Service Identified
       ↓
Provider Verified
       ↓
Policy Check
       ↓
Risk Check
       ↓
Payment Authorized
       ↓
Payment Simulated
       ↓
Contact Notified
```

**Step 5** — Show the transaction:

```
₹2,800
Ambulance
LOW RISK
APPROVED
SIMULATED SUCCESS
```

**Step 6** — Open the transaction details and show the audit trail.

**Step 7** — Open the Policy page and explain that the AI cannot bypass the configured financial limits.

---

## 🔮 Future Roadmap

The prototype can eventually evolve into a production-grade system with:

- UPI payment integration
- Bitcoin/Lightning payment support
- Real-time emergency detection
- Verified healthcare and emergency-service networks
- Advanced fraud detection
- Multi-factor authorization
- Bank/payment-provider integrations
- Real-time location intelligence
- Human-in-the-loop escalation
- Stronger identity verification
- Hardware/device emergency signals
- Cross-border emergency payments

These integrations would require appropriate financial, privacy, security, and regulatory controls before production deployment.

---

## 🎯 Vision

Emergencies are unpredictable, but financial preparation can be proactive.

ResQ Pay aims to create a trusted financial safety net for moments when a person cannot act for themselves.

**When you can't make the payment, your trusted agent can.**

---

## ⚠️ Disclaimer

ResQ Pay is an ideathon prototype and demonstration concept.

It does not provide financial, medical, or emergency services and does not execute real-money transactions.

Any future implementation involving real payments would require appropriate authentication, authorization, fraud prevention, financial compliance, privacy protection, security controls, and integration with regulated payment providers.

---

## 👨‍💻 Project

**ResQ Pay**

**Track:** Agentic Payments
**Event:** Bitmela Launchpad — Ideathon 01

Built as a prototype exploring the intersection of:

**AI Agents × Emergency Assistance × Secure Payments**
