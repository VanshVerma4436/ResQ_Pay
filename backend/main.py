from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes import emergency, agent, services, policies, contacts, payment, transactions, notifications, demo

app = FastAPI(
    title="ResQ Pay API",
    description="Backend API for ResQ Pay - AI Emergency Payment Agent Prototype",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(emergency.router)
app.include_router(agent.router)
app.include_router(services.router)
app.include_router(policies.router)
app.include_router(contacts.router)
app.include_router(payment.router)
app.include_router(transactions.router)
app.include_router(notifications.router)
app.include_router(demo.router)

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def read_root():
    return {
        "name": "ResQ Pay API",
        "tagline": "Your trusted AI payment agent for emergencies.",
        "status": "ONLINE",
        "demo_mode": True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
