package graph

import (
	"log"
	"os"

	"github.com/gocql/gocql"
)

func createConnection() (*gocql.Session, error) {
	database, exists := os.LookupEnv("DATABASE_HOST")

	if !exists {
		log.Fatal("Couldn't find DATABASE_HOST")
	}

	cluster := gocql.NewCluster(database)
	cluster.Keyspace = "instaphant"
	session, err := cluster.CreateSession()
	return session, err
}
