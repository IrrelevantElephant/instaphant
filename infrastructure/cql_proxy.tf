resource "google_cloud_run_v2_service" "cql_proxy" {
  name     = "cql-proxy"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"
  project  = var.project_id

  template {
    containers {
      image = "datastax/cql-proxy:v0.1.5"

      startup_probe {
        http_get {
          path = "/readiness"
        }
      }

      env {
        name  = "HTTP_BIND"
        value = "8080"
      }

      env {
        name  = "HEALTH_CHECK"
        value = "true"
      }

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
