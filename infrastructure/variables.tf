variable "api_image" {
  type = string
}

variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "europe-west2"
}

variable "astra_org_id" {
  type = string
  # TODO: delete
  default = "bc43b279-f9c3-432f-b4f2-f1dac2afa693"
}