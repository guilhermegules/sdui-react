package main

import (
	"encoding/json"
	"net/http"
)

type Node struct {
	Type     string  `json:"type"`
	Title    string  `json:"title,omitempty"`
	Value    string  `json:"value,omitempty"`
	Label    string  `json:"label,omitempty"`
	Action   string  `json:"action,omitempty"`
	Children []*Node `json:"children,omitempty"`
	Style    any     `json:"style,omitempty"`
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	ui := &Node{
		Type:  "Screen",
		Title: "Welcome",
		Children: []*Node{
			{Type: "Text", Value: "Welcome to the Go-powered SDUI!"},
			{Type: "Button", Label: "Continue", Action: "navigate:dashboard"},
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ui)
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	ui := &Node{
		Type:  "Screen",
		Title: "Dashboard",
		Children: []*Node{
			{Type: "Text", Value: "Welcome, User!"},
			{
				Type:  "TextField",
				Label: "Search",
				Value: "",
			},
			{
				Type:   "Button",
				Label:  "Search",
				Action: "search",
			},
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ui)
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next(w, r)
	}
}

func main() {
	http.HandleFunc("/api/ui/home", corsMiddleware(homeHandler))
	http.HandleFunc("/api/ui/dashboard", corsMiddleware(dashboardHandler))

	println("✅ api is running on http://localhost:8080")

	http.ListenAndServe(":8080", nil)
}
