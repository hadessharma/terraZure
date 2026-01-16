terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.5"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "demo-subscription-id"
  tenant_id       = "demo-tenant-id"
  client_id       = "demo-client-id"
  client_secret   = "demo-client-secret"
}

data "azurerm_client_config" "current" {}