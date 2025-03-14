from fastapi import APIRouter

router = APIRouter()

@router.get("/data")
def get_analytics_data():
    return {"data": "Analytics data"}