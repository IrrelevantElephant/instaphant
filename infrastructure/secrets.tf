resource "google_secret_manager_secret" "astra_token" {
  secret_id = "astra_token"

  replication {
    auto {}
  }
}


resource "google_secret_manager_secret_version" "astra_token_version" {
  secret = google_secret_manager_secret.astra_token.id

  secret_data = astra_token.instaphant_database_token.token
}