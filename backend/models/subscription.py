from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from core.database import Base

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String, index=True) # "AWS" or "Azure"
    name = Column(String) # A friendly name like "Production AWS Account"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # AWS Specific Credentials
    aws_access_key_id = Column(String, nullable=True)
    aws_secret_access_key = Column(String, nullable=True)
    aws_default_region = Column(String, nullable=True)
    
    # Azure Specific Credentials
    azure_tenant_id = Column(String, nullable=True)
    azure_client_id = Column(String, nullable=True)
    azure_client_secret = Column(String, nullable=True)
    azure_subscription_id = Column(String, nullable=True)
