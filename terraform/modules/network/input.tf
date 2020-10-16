# Resource Group
variable "location" {
    type          = string
}
variable "resource_group" {
    type          = string
}

# Resource VNetwork
variable "application_type" {
    type          = string
}
variable "resource_type" {
    type          = string
}
variable "virtual_network_name" {}
variable "address_space" {}
variable "address_prefix_test" {}

