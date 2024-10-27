resource "azurerm_key_vault" "test-kv-terraZure" {
  name                        = "test-kv-terraZure"
  resource_group_name         = "test-rg-terraZure"
  location                    = "westus2"
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  enabled_for_disk_encryption = "true"
  soft_delete_retention_days  = "7"
  purge_protection_enabled    = "false"
  sku_name                    = "standard"
  enable_rbac_authorization   = "true"
}
