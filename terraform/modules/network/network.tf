resource "azurerm_virtual_network" "test" {
  name                 = "${var.resource_type}-${var.application_type}"
  address_space        = var.address_space
  location             = var.location
  resource_group_name  = var.resource_group
}
resource "azurerm_subnet" "test" {
  name                 = "${var.resource_type}SUB-${var.application_type}"
  resource_group_name  = var.resource_group
  virtual_network_name = azurerm_virtual_network.test.name
  address_prefixes     = [ var.address_prefix_test ]
}
