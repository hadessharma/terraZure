resource "azurerm_storage_account" "@@resourceName@@" {
  name                     = "@@resourceName@@"
  location                 = "@@location@@"
  resource_group_name      = "@@rgName@@"
  account_tier             = "@@saTier@@"
  account_replication_type = "@@saRepli@@"
}
