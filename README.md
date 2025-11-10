# SDUI React + Go

This project demonstrates a **Server-Driven UI** architecture using **Go** as the backend and **React (with Material UI)** as the frontend.

The backend dynamically serves **UI schemas in JSON format**, and the frontend renders them using React components — no hardcoded screens

---

## 🚀 Features

- **Server-Driven Rendering** — UI comes from backend JSON.
- **Material UI Components** — Dynamic rendering using Typography, Button, Card, Grid, etc.
- **Dynamic Actions** — Backend-defined actions trigger client-side behavior.
- **Offline Support** — Caches schemas in IndexedDB with SWR.
- **Go Backend** — Simple, modular handler structure with reusable UI builders.
- **CORS-Enabled API** — Ready to connect to any frontend host.

## 🧰 Requirements

- [Go 1.21+](https://go.dev/dl/)
- [Node.js 20+](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [pnpm](https://yarnpkg.com/)

## Backend Setup

### Navigate to backend folder

```bash
cd backend
```

### Run the API

```bash
go run main.go
```

### Output

You should see: ✅ API running on http://localhost:8080

### Test the endpoints

You can test them in your browser or curl:

```bash
curl http://localhost:8080/api/ui/home
```

## Frontend Setup

### Navigate to frontend folder

```
cd frontend
```

### Install dependencies

```
npm install
# or
pnpm install
```

### Run the app

```
npm run dev
# or
pnpm dev
```

### Output

You should see something like:

```
VITE v5.0  ready in 500ms
Local:   http://localhost:5173/
```
