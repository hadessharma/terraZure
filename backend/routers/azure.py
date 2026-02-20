from fastapi import APIRouter
from services.azure_service import list_azure_resources

router = APIRouter()

@router.get("/resources")
async def get_azure_resources():
    resources = list_azure_resources()
    return {"resources": resources, "count": len(resources)}
