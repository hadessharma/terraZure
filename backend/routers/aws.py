from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from services.aws_service import get_all_aws_resources

router = APIRouter()

@router.get("/resources")
async def get_aws_resources(db: Session = Depends(get_db)):
    resources = get_all_aws_resources(db)
    return {"resources": resources, "count": len(resources)}
