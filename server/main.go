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

func Screen(title string, children ...*Node) *Node {
	return &Node{Type: "Screen", Title: title, Children: children}
}

func Text(value string) *Node {
	return &Node{Type: "Text", Value: value}
}

func Button(label string, action string) *Node {
	return &Node{Type: "Button", Label: label, Action: action}
} 

func TextField(label, value string) *Node {
	return &Node{Type: "TextField", Label: label, Value: value}
}

func writeJSON(w http.ResponseWriter, data any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func homePage() *Node {
	return Screen("Welcome",
		Text("Welcome to the Go-powered SDUI!"),
		Button("Continue", "navigate:dashboard"),
	)
}

func dashboardPage() *Node {
	return Screen("Dashboard",
		Text("Welcome, User!"),
		TextField("Search", ""),
		Button("Search", "search"),
	)
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next(w, r)
	}
}

func uiHandler(page func() *Node) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, page())
	}
}

func main() {
	routes := map[string]func() *Node {
		"/api/ui/home": homePage,
		"/api/ui/dashboard": dashboardPage,
	}

	for path, pageFunc := range routes {
		http.HandleFunc(path, corsMiddleware(uiHandler(pageFunc)))
	}

	println("✅ api is running on http://localhost:8080")

	http.ListenAndServe(":8080", nil)
}
