from fastapi import APIRouter, HTTPException
from database import get_db_connection
from models.schemas import PolicyUpdateSchema
import json

router = APIRouter(prefix="/api/policies", tags=["Policies"])

@router.get("")
def get_policy():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM policies WHERE id = 1")
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Policy not found")

    d = dict(row)
    if isinstance(d["approved_categories"], str):
        try:
            d["approved_categories"] = json.loads(d["approved_categories"])
        except:
            d["approved_categories"] = ["Ambulance", "Emergency Transportation", "Pharmacy", "Hospital Essentials"]
    
    d["provider_verification_required"] = bool(d["provider_verification_required"])
    d["ai_permission_auto"] = bool(d["ai_permission_auto"])
    d["active"] = bool(d["active"])
    return d

@router.put("")
def update_policy(update: PolicyUpdateSchema):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM policies WHERE id = 1")
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Policy not found")

    current = dict(row)

    spending_limit = update.spending_limit if update.spending_limit is not None else current["spending_limit"]
    max_single_tx = update.max_single_tx if update.max_single_tx is not None else current["max_single_tx"]
    
    if update.approved_categories is not None:
        cats_json = json.dumps(update.approved_categories)
    else:
        cats_json = current["approved_categories"]

    provider_verif = 1 if (update.provider_verification_required if update.provider_verification_required is not None else current["provider_verification_required"]) else 0
    tc_above = update.trusted_contact_approval_above if update.trusted_contact_approval_above is not None else current["trusted_contact_approval_above"]
    ai_perm = 1 if (update.ai_permission_auto if update.ai_permission_auto is not None else current["ai_permission_auto"]) else 0

    cursor.execute('''
        UPDATE policies 
        SET spending_limit = ?, max_single_tx = ?, approved_categories = ?, provider_verification_required = ?, trusted_contact_approval_above = ?, ai_permission_auto = ?
        WHERE id = 1
    ''', (spending_limit, max_single_tx, cats_json, provider_verif, tc_above, ai_perm))

    conn.commit()
    conn.close()

    return {"status": "SUCCESS", "message": "Emergency payment policy updated successfully"}
