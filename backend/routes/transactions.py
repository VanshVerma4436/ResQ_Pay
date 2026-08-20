from fastapi import APIRouter, HTTPException
from database import get_db_connection
import json

router = APIRouter(prefix="/api/transactions", tags=["Transactions"])

@router.get("")
def get_transactions(category: str = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if category and category.lower() != "all":
        cursor.execute("SELECT * FROM transactions WHERE category LIKE ? ORDER BY date DESC", (f"%{category}%",))
    else:
        cursor.execute("SELECT * FROM transactions ORDER BY date DESC")

    rows = cursor.fetchall()
    conn.close()

    result = []
    for r in rows:
        d = dict(r)
        d["simulated"] = bool(d["simulated"])
        if isinstance(d["audit_log"], str):
            try:
                d["audit_log"] = json.loads(d["audit_log"])
            except:
                d["audit_log"] = []
        result.append(d)

    return result

@router.get("/{id}")
def get_transaction_detail(id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM transactions WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Transaction not found")

    d = dict(row)
    d["simulated"] = bool(d["simulated"])
    if isinstance(d["audit_log"], str):
        try:
            d["audit_log"] = json.loads(d["audit_log"])
        except:
            d["audit_log"] = []
    return d
