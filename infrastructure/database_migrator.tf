resource "google_cloud_run_v2_job" "database_migrator" {
  name     = "databasemigrator"
  location = var.region

  template {
    template {
      containers {
        image = var.database_migrator_image

        env {
          name  = "HEALTH_CHECK"
          value = "true"
        }

        env {
          name = "ASTRA_TOKEN"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.astra_token.secret_id
              version = "latest"
            }
          }
        }

        env {
          name  = "ASTRA_DATABASE_ID"
          value = astra_database.instaphant_database.id
        }

        env {
          name  = "CQLPROXY"
          value = true
        }

        env {
          name  = "CQLSH_HOST"
          value = "0.0.0.0"
        }

        env {
          name  = "CQLVERSION"
          value = "3.4.5"
        }
      }
    }
  }
}