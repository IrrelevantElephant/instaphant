resource "astra_database" "instaphant_database" {
  name           = "instaphant_database"
  keyspace       = "instaphant"
  cloud_provider = "gcp"
  regions        = ["us-east1"]
}

resource "astra_role" "instaphant_database_administrator" {
  description = "Admin role for the instaphant database"
  role_name   = "instaphant_database_administrator"
  effect      = "allow"
  policy = [
    "org-db-view",
    "db-cql", "db-table-alter", "db-table-create", "db-table-describe", "db-table-modify", "db-table-select",
    "db-keyspace-alter", "db-keyspace-describe", "db-keyspace-modify", "db-keyspace-authorize", "db-keyspace-drop", "db-keyspace-create", "db-keyspace-grant",
  ]
  resources = ["drn:astra:org:${var.astra_org_id}:db:${astra_database.instaphant_database.id}:keyspace:*"]
}

resource "astra_token" "instaphant_database_token" {
  roles = [astra_role.instaphant_database_administrator.id]
}
