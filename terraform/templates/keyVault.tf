resource "azurerm_key_vault" "@@resourceName@@" {
  name                        = "@@resourceName@@"
  resource_group_name         = "@@rgName@@"
  location                    = "@@location@@"
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  enabled_for_disk_encryption = "@@diskEnc@@"
  soft_delete_retention_days  = "@@softDelete@@"
  purge_protection_enabled    = "@@purgeProtect@@"
  sku_name                    = "@@skuName@@"
  enable_rbac_authorization   = "@@rbacAuth@@"
}
