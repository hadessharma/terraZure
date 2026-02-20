from fastapi import APIRouter
from services.aws_service import get_all_aws_resources

router = APIRouter()

@router.get("/resources")
async def get_aws_resources():
    resources = get_all_aws_resources()
    return {"resources": resources, "count": len(resources)}
