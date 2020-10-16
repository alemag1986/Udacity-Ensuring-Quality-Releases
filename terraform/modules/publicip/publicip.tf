resource "azurerm_public_ip" "test" {
  name                = "${var.resource_type}-${var.application_type}"
  location            = var.location
  resource_group_name = var.resource_group
  allocation_method   = "Dynamic"

}