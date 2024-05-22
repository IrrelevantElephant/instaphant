resource "google_cloud_run_v2_service" "api" {
  name     = "api"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"
  project  = var.project_id

  template {
    containers {
      image = var.api_image
      env {
        name  = "UIORIGIN"
        value = "https://instaphant.irrelevantelephant.co.uk"
      }
      env {
        name  = "DATABASE_HOST"
        value = "localhost"
      }
    }

    containers {
      image = "datastax/cql-proxy:v0.1.5"

      startup_probe {
        http_get {
          path = "/readiness"
          port = "8000"
        }
      }

      env {
        name  = "HEALTH_CHECK"
        value = "true"
      }

      env {
        name = "ASTRA_TOKEN"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.astra_token
            version = "1"
          }
        }
      }

      env {
        name  = "ASTRA_DATABASE_ID"
        value = astra_database.instaphant_database.id
      }
    }
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_v2_service.api.location
  project  = google_cloud_run_v2_service.api.project
  service  = google_cloud_run_v2_service.api.name

  policy_data = data.google_iam_policy.noauth.policy_data
}