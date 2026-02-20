import boto3
from core.config import settings

def get_aws_client(service_name: str):
    if not settings.AWS_ACCESS_KEY_ID or not settings.AWS_SECRET_ACCESS_KEY:
        return None
        
    return boto3.client(
        service_name,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_DEFAULT_REGION
    )

def list_ec2_instances():
    try:
        ec2 = get_aws_client('ec2')
        if not ec2: return []
        
        response = ec2.describe_instances()
        instances = []
        for reservation in response.get('Reservations', []):
            for inst in reservation.get('Instances', []):
                
                # Try to find the name tag
                name = inst.get("InstanceId")
                tags = inst.get("Tags", [])
                for tag in tags:
                    if tag.get("Key") == "Name":
                        name = tag.get("Value")
                        break
                        
                instances.append({
                    "id": inst.get("InstanceId"),
                    "name": name,
                    "type": inst.get("InstanceType"),
                    "state": inst.get("State", {}).get("Name"),
                    "provider": "AWS",
                    "resource_type": "EC2 Instance",
                    "region": settings.AWS_DEFAULT_REGION
                })
        return instances
    except Exception as e:
        print(f"Error fetching EC2: {e}")
        return []

def list_s3_buckets():
    try:
        s3 = get_aws_client('s3')
        if not s3: return []
        
        response = s3.list_buckets()
        buckets = []
        for bucket in response.get('Buckets', []):
            buckets.append({
                "id": bucket.get("Name"),
                "name": bucket.get("Name"),
                "state": "available",
                "provider": "AWS",
                "resource_type": "S3 Bucket",
                "region": "global"
            })
        return buckets
    except Exception as e:
        print(f"Error fetching S3: {e}")
        return []

def get_all_aws_resources():
    return list_ec2_instances() + list_s3_buckets()
