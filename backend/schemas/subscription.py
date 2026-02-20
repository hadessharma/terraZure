from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SubscriptionBase(BaseModel):
    provider: str
    name: str
    is_active: Optional[bool] = True

class AWSSubscriptionCreate(SubscriptionBase):
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_default_region: str

class AzureSubscriptionCreate(SubscriptionBase):
    azure_tenant_id: str
    azure_client_id: str
    azure_client_secret: str
    azure_subscription_id: str

class SubscriptionResponse(SubscriptionBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
