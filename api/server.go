package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/IrrelevantElephant/instaphant/api/graph"
	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
)

type appConfig struct {
	port     string
	uiOrigin string
}

func main() {
	config := getConfig()
	router := chi.NewRouter()

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins: []string{config.uiOrigin},
	})

	router.Use(corsMiddleware.Handler)

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", config.port)
	log.Fatal(http.ListenAndServe(":"+config.port, router))
}

func getConfig() appConfig {
	port := os.Getenv("PORT")
	uiOrigin := os.Getenv("UIORIGIN")

	if len(strings.TrimSpace(port)) == 0 {
		port = "8080"
	}

	config := appConfig{
		port:     port,
		uiOrigin: uiOrigin,
	}

	return config
}
