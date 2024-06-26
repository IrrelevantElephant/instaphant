variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "europe-west2"
}

variable "astra_org_id" {
  type = string
}

# Docker images

variable "api_image" {
  type = string
}

variable "database_migrator_image" {
  type = string
}
