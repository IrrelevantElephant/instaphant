resource "google_cloud_run_v2_service" "cql_proxy" {
  name     = "api"
  location = var.region
  project  = var.project_id

  template {
    containers {
      image = "datastax/cql-proxy:v0.1.5"

      env {
        name  = "ASTRA_TOKEN"
        value = astra_token.instaphant_database_token.token
      }

      env {
        name  = "ASTRA_DATABASE_ID"
        value = astra_database.instaphant_database.id
      }
    }
  }
}
