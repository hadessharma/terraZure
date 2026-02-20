from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from models.subscription import Subscription
from schemas.subscription import AWSSubscriptionCreate, AzureSubscriptionCreate, SubscriptionResponse

router = APIRouter()

@router.post("/aws", response_model=SubscriptionResponse)
def create_aws_subscription(sub: AWSSubscriptionCreate, db: Session = Depends(get_db)):
    db_sub = Subscription(**sub.model_dump())
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub

@router.post("/azure", response_model=SubscriptionResponse)
def create_azure_subscription(sub: AzureSubscriptionCreate, db: Session = Depends(get_db)):
    db_sub = Subscription(**sub.model_dump())
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub

@router.get("/", response_model=list[SubscriptionResponse])
def get_all_subscriptions(db: Session = Depends(get_db)):
    return db.query(Subscription).filter(Subscription.is_active == True).all()

@router.delete("/{sub_id}")
def delete_subscription(sub_id: int, db: Session = Depends(get_db)):
    db_sub = db.query(Subscription).filter(Subscription.id == sub_id).first()
    if not db_sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    
    db.delete(db_sub)
    db.commit()
    return {"message": "Subscription deleted"}
