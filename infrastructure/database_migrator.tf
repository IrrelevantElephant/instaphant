resource "google_cloud_run_v2_job" "database_migrator" {
  name     = "databasemigrator"
  location = var.region

  template {
    template {
      containers {
        image = var.database_migrator_image

        env {
          name  = "CQLSH_HOST"
          value = "localhost"
        }

        env {
          name  = "CQLSH_PORT"
          value = 9042
        }

        env {
          name  = "CQLSH_VERSION"
          value = "3.4.6"
        }
      }

      containers {
        image = "datastax/cql-proxy:v0.1.5"

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
}