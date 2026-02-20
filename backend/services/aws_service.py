import boto3
from sqlalchemy.orm import Session
from models.subscription import Subscription

def get_aws_client(service_name: str, sub: Subscription):
    if not sub.aws_access_key_id or not sub.aws_secret_access_key:
        return None
        
    return boto3.client(
        service_name,
        aws_access_key_id=sub.aws_access_key_id,
        aws_secret_access_key=sub.aws_secret_access_key,
        region_name=sub.aws_default_region or "us-east-1"
    )

def list_ec2_instances(db: Session):
    aws_subs = db.query(Subscription).filter(Subscription.provider == "AWS", Subscription.is_active == True).all()
    all_instances = []
    
    for sub in aws_subs:
        try:
            ec2 = get_aws_client('ec2', sub)
            if not ec2: continue
            
            response = ec2.describe_instances()
            for reservation in response.get('Reservations', []):
                for inst in reservation.get('Instances', []):
                    # Try to find the name tag
                    name = inst.get("InstanceId")
                    tags = inst.get("Tags", [])
                    for tag in tags:
                        if tag.get("Key") == "Name":
                            name = tag.get("Value")
                            break
                            
                    all_instances.append({
                        "id": inst.get("InstanceId"),
                        "name": name,
                        "type": inst.get("InstanceType"),
                        "state": inst.get("State", {}).get("Name"),
                        "provider": "AWS",
                        "account_name": sub.name,
                        "resource_type": "EC2 Instance",
                        "region": sub.aws_default_region
                    })
        except Exception as e:
            print(f"Error fetching EC2 for sub {sub.name}: {e}")
            
    return all_instances

def list_s3_buckets(db: Session):
    aws_subs = db.query(Subscription).filter(Subscription.provider == "AWS", Subscription.is_active == True).all()
    all_buckets = []
    
    for sub in aws_subs:
        try:
            s3 = get_aws_client('s3', sub)
            if not s3: continue
            
            response = s3.list_buckets()
            for bucket in response.get('Buckets', []):
                all_buckets.append({
                    "id": bucket.get("Name"),
                    "name": bucket.get("Name"),
                    "state": "available",
                    "provider": "AWS",
                    "account_name": sub.name,
                    "resource_type": "S3 Bucket",
                    "region": "global"
                })
        except Exception as e:
            print(f"Error fetching S3 for sub {sub.name}: {e}")
            
    return all_buckets

def get_all_aws_resources(db: Session):
    return list_ec2_instances(db) + list_s3_buckets(db)
