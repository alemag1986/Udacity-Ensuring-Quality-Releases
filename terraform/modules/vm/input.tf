# Resource Group/Location
variable "location" {
    type          = string
}
variable "resource_group" {
    type          = string
}

# Resource Virtual Machine
variable "application_type" {
    type          = string
}
variable "resource_type" {
    type          = string
}
variable "public_ip_address_id" {
    type          = string
}
variable "public_subnet_id" {
    type          = string
}
variable "admin_username" {
    type          = string
}