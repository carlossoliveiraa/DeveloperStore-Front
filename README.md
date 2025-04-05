# Developer Store - Sales Frontend

A frontend application built with **React.js** for managing sales records, consuming the Developer Store Sales API.

---

## ✨ Features

- User authentication with JWT
- Sales listing with pagination
- Sale detail with item breakdown
- Sale creation form
- Integration with .NET 8 Sales API

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- The [Sales API backend](https://github.com/seuusuario/DeveloperStore) running locally on port `http://localhost:8080`

---

### 🔧 Installation

1. **Clone the repository**:

```bash
git clone https://github.com/seuusuario/developer-store-frontend.git
cd developer-store-frontend
```

2. **Install dependencies**:

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

---

### ▶️ Running the Application

Start the frontend application in development mode:

```bash
npm run dev
```

Or with Yarn:

```bash
yarn dev
```

The application will be available at:

```
http://localhost:3000
```

Make sure the **Sales API** is running at `http://localhost:8080`.

---

## 🔐 Authentication

To access the system, use the following credentials:

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

1. On the login page, enter the email and password.
2. After login, a valid JWT token will be stored and used to authorize requests to the API.

---

## 🔄 API Integration

This frontend is integrated with the Sales API built in .NET 8.  
Ensure the backend is running before interacting with the app.

API base URL:  
```
http://localhost:8080
```