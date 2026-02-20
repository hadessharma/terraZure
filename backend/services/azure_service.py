from azure.identity import ClientSecretCredential
from azure.mgmt.resource import ResourceManagementClient
from core.config import settings

def get_azure_credentials():
    if not all([settings.AZURE_TENANT_ID, settings.AZURE_CLIENT_ID, settings.AZURE_CLIENT_SECRET]):
        return None
    return ClientSecretCredential(
        tenant_id=settings.AZURE_TENANT_ID,
        client_id=settings.AZURE_CLIENT_ID,
        client_secret=settings.AZURE_CLIENT_SECRET
    )

def list_azure_resources():
    try:
        credential = get_azure_credentials()
        if not credential or not settings.AZURE_SUBSCRIPTION_ID:
            return []
        
        resource_client = ResourceManagementClient(credential, settings.AZURE_SUBSCRIPTION_ID)
        
        resources = []
        # list() returns an iterator of GenericResource
        for resource in resource_client.resources.list():
            # Simplify resource type from "Microsoft.Compute/virtualMachines" -> "Virtual Machine"
            type_parts = resource.type.split('/')
            simple_type = type_parts[-1] if type_parts else resource.type
            
            resources.append({
                "id": resource.id,
                "name": resource.name,
                "type": simple_type,
                "state": "active", # Azure RM generic list doesn't always provide state easily
                "location": resource.location,
                "provider": "Azure",
                "resource_type": resource.type,
                "region": resource.location
            })
        return resources
    except Exception as e:
        print(f"Error fetching Azure resources: {e}")
        return []
