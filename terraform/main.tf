provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    storage_account_name = ""
    container_name       = ""
    key                  = ""
    access_key           = ""
  }
}

module "resource_group" {
  source               = ".//modules/resource_group"
  resource_group       = var.resource_group
  location             = var.location
}

module "network" {
  source               = ".//modules/network"
  address_space        = var.address_space
  location             = var.location
  virtual_network_name = var.virtual_network_name
  application_type     = var.application_type
  resource_type        = "VNET"
  resource_group       = module.resource_group.resource_group_name
  address_prefix_test  = var.address_prefix_test
}

module "nsg-test" {
  source              = ".//modules/networksecuritygroup"
  location            = var.location
  application_type    = var.application_type
  resource_type       = "NSG"
  resource_group      = module.resource_group.resource_group_name
  subnet_id           = module.network.subnet_id_test
  address_prefix_test = var.address_prefix_test
}

module "appservice" {
  source           = ".//modules/appservice"
  location         = var.location
  application_type = var.application_type
  resource_type    = "WAS"
  resource_group   = module.resource_group.resource_group_name
}

module "public_ip" {
  source           = ".//modules/publicip"
  location         = var.location
  application_type = var.application_type
  resource_type    = "PIP"
  resource_group   = module.resource_group.resource_group_name
}

module "virtual_machine" {
  source               = ".//modules/vm"
  location             = var.location
  resource_group       = module.resource_group.resource_group_name
  application_type     = var.application_type
  resource_type        = "VM"

  public_ip_address_id = module.public_ip.public_ip_address_id
  public_subnet_id     = module.network.subnet_id_test
  admin_username       = "adminuser"
}
