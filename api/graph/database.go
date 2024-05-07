package graph

import (
	"github.com/gocql/gocql"
)

func createConnection() (*gocql.Session, error) {
	// database, exists := os.LookupEnv("DATABASE_HOST")

	// if !exists {
	// 	log.Fatal("Couldn't find DATABASE_HOST")
	// }

	database := "https://ebd953c8-078e-4bac-abcb-d700e3cf0f05-us-east1.apps.astra.datastax.com"

	cluster := gocql.NewCluster(database)

	cluster.Authenticator = gocql.PasswordAuthenticator{
		Username: "AstraCS",
		Password: "OOIaejDdykKrfUdMwrEvfONl:05b0773b44c4e34aef41229d61f35925b781e9c5ff4b67c79d0b115ce81a3907",
	}

	cluster.Keyspace = "instaphant"
	session, err := cluster.CreateSession()
	return session, err
}
