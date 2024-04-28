package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/IrrelevantElephant/instaphant/api/graph"
)

const defaultPort = "8080"

type appConfig struct {
	port string
}

func main() {
	config := getConfig()

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", config.port)
	log.Fatal(http.ListenAndServe(":"+config.port, nil))
}

func getConfig() appConfig {
	port := os.Getenv("PORT")

	if len(strings.TrimSpace(port)) == 0 {
		port = "8080"
	}

	config := appConfig{
		port: port,
	}

	return config
}
