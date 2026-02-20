from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from services.azure_service import list_azure_resources

router = APIRouter()

@router.get("/resources")
async def get_azure_resources(db: Session = Depends(get_db)):
    resources = list_azure_resources(db)
    return {"resources": resources, "count": len(resources)}
