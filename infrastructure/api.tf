resource "google_cloud_run_v2_service" "api" {
  name     = "cloudrun-service"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"
  project = var.project_id

  template {
    containers {
      image = var.api_image
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