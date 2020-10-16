# Resource Group/Location
variable "location" {
    type          = string
}
variable "resource_group" {
    type          = string
}

# Resource Network Security Group
variable "application_type" {
    type          = string
}
variable "resource_type" {
    type          = string
}
variable "subnet_id" {
    type          = string
}
variable "address_prefix_test" {
    type          = string
}
