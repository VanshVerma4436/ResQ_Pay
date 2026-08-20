from fastapi import APIRouter
from database import get_db_connection

router = APIRouter(prefix="/api/services", tags=["Services"])

@router.get("")
def get_services():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM services")
    rows = cursor.fetchall()
    conn.close()

    result = []
    for r in rows:
        d = dict(r)
        d["verified"] = bool(d["verified"])
        result.append(d)

    return result
