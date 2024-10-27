resource "azurerm_subnet" "@@resourceName@@" {
  name                 = "@@resourceName@@"
  resource_group_name  = "@@rgName@@"
  virtual_network_name = "@@vmName@@"
  address_prefixes     = ["@@addPrefixes@@"]
}


//The subnet's address range -> It must be contained by the address space of the virtual network.
//Delegations - Designate a subnet to be used by a dedicated service.
