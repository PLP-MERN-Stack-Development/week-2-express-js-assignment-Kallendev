# 🚂 Product API – Week 2 Express.js Assignment

This is a RESTful API built using **Express.js**. It supports standard **CRUD operations**, custom **middleware**, **error handling**, and **advanced features** like filtering, pagination, and search – all done using **in-memory data (no database)**.

---

## 📦 Setup Instructions

### 🔧 Prerequisites

- Node.js (v18 or higher)

### 💾 Install dependencies

```bash
npm install
```

### 🚀 Run the server

```bash
node server.js
```

Server will start at:
`http://localhost:3000`

---

## 🔐 API Key Required

All API requests must include the following header:

```
x-api-key: my-secret-key
```

---

## 🧪 Sample Data

The app uses an in-memory array with sample products like laptops, smartphones, and kitchen items.

---

## 📂 API Endpoints

### 📘 Products

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/products`     | List all products    |
| GET    | `/api/products/:id` | Get product by ID    |
| POST   | `/api/products`     | Create a new product |
| PUT    | `/api/products/:id` | Update a product     |
| DELETE | `/api/products/:id` | Delete a product     |

---

### 🔎 Advanced Features

| Feature            | Endpoint                             | Example |
| ------------------ | ------------------------------------ | ------- |
| Filter by category | `/api/products?category=electronics` |         |
| Pagination         | `/api/products?page=1&limit=2`       |         |
| Search by name     | `/api/search?name=coffee`            |         |
| Stats by category  | `/api/products/stats`                |         |

---

## 🧪 Example POST Request

**Endpoint:** `POST /api/products`
**Headers:**

```
Content-Type: application/json
x-api-key: my-secret-key
```

**Body:**

```json
{
  "name": "Washing Machine",
  "description": "Automatic front load",
  "price": 400,
  "category": "home",
  "inStock": true
}
```

---

## ⚠️ Errors & Status Codes

| Error            | Status | Description                |
| ---------------- | ------ | -------------------------- |
| Not Found        | 404    | Product not found          |
| Validation Error | 400    | Missing fields             |
| Unauthorized     | 401    | Missing or invalid API key |
| Server Error     | 500    | Something went wrong       |

---

## 📁 Files in this Repo

| File           | Description                                   |
| -------------- | --------------------------------------------- |
| `server.js`    | Main API server                               |
| `README.md`    | This file                                     |
| `.env.example` | Example environment variables (API key, port) |

---

## 👩‍💻 Author

\*\*Kallen – Web Developer

---

Happy Coding! ✨

````

---

### ✅ BONUS: Add `.env.example`

Create a file called `.env.example` and add this:

```env
PORT=3000
API_KEY=my-secret-key
````

---
