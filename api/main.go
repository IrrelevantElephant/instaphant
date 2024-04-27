package main

import (
	"fmt"
	"html"
	"log"
	"net/http"
	"os"
	"strings"
)

type appConfig struct {
	listenUrl string
}

func main() {
	config := getConfig()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello %q", html.EscapeString(r.URL.Path))
	})

	log.Fatal(http.ListenAndServe(config.listenUrl, nil))
}

func getConfig() appConfig {
	listenUrl := os.Getenv("LISTENURL")

	if len(strings.TrimSpace(listenUrl)) == 0 {
		listenUrl = "0.0.0.0:8080"
	}

	config := appConfig{
		listenUrl: listenUrl,
	}

	return config
}
