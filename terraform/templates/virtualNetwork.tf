resource "azurerm_virtual_network" "@@resourceName@@" {
  name                = "@@resourceName@@"
  location            = "@@location@@"
  resource_group_name = "@@rgName@@"
  address_space       = ["@@addSpace@@"]
  dns_servers         = ["@@dnsServers@@"]
}

