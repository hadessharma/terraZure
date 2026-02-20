from azure.identity import ClientSecretCredential
from azure.mgmt.resource import ResourceManagementClient
from sqlalchemy.orm import Session
from models.subscription import Subscription

def get_azure_credentials(sub: Subscription):
    if not all([sub.azure_tenant_id, sub.azure_client_id, sub.azure_client_secret]):
        return None
    return ClientSecretCredential(
        tenant_id=sub.azure_tenant_id,
        client_id=sub.azure_client_id,
        client_secret=sub.azure_client_secret
    )

def list_azure_resources(db: Session):
    azure_subs = db.query(Subscription).filter(Subscription.provider == "Azure", Subscription.is_active == True).all()
    all_resources = []
    
    for sub in azure_subs:
        try:
            credential = get_azure_credentials(sub)
            if not credential or not sub.azure_subscription_id:
                continue
            
            resource_client = ResourceManagementClient(credential, sub.azure_subscription_id)
            
            # list() returns an iterator of GenericResource
            for resource in resource_client.resources.list():
                # Simplify resource type from "Microsoft.Compute/virtualMachines" -> "Virtual Machine"
                type_parts = resource.type.split('/')
                simple_type = type_parts[-1] if type_parts else resource.type
                
                all_resources.append({
                    "id": resource.id,
                    "name": resource.name,
                    "type": simple_type,
                    "state": "active", 
                    "location": resource.location,
                    "provider": "Azure",
                    "account_name": sub.name,
                    "resource_type": resource.type,
                    "region": resource.location
                })
        except Exception as e:
            print(f"Error fetching Azure resources for sub {sub.name}: {e}")
            
    return all_resources
