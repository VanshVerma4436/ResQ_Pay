from fastapi import APIRouter
from database import get_db_connection
from models.schemas import TrustedContactSchema

router = APIRouter(prefix="/api/contacts", tags=["Trusted Contacts"])

@router.get("")
def get_contacts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM trusted_contacts")
    rows = cursor.fetchall()
    conn.close()

    res = []
    for r in rows:
        d = dict(r)
        d["is_primary"] = bool(d["is_primary"])
        res.append(d)
    return res

@router.post("")
def add_contact(contact: TrustedContactSchema):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    is_primary = 1 if contact.is_primary else 0
    if is_primary:
        cursor.execute("UPDATE trusted_contacts SET is_primary = 0")

    cursor.execute('''
        INSERT INTO trusted_contacts (name, relationship, phone, status, is_primary)
        VALUES (?, ?, ?, 'Verified', ?)
    ''', (contact.name, contact.relationship, contact.phone, is_primary))

    conn.commit()
    conn.close()
    return {"status": "SUCCESS", "message": f"Trusted contact {contact.name} added successfully."}
