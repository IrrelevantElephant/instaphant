terraform {
  required_providers {
    astra = {
      source  = "datastax/astra"
      version = "2.2.8"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
