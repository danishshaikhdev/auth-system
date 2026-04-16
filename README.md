# 🔐 Production-Ready Authentication System

A scalable authentication system built using Node.js, Express, and MongoDB, implementing industry-standard security practices including JWT authentication, refresh token rotation, and protected route handling.

Designed using clean architecture (Controller → Service → Model) to ensure maintainability and scalability.

---

## 🚀 Live Demo

🔗 Backend API: https://auth-system-imze.onrender.com/
🔗 Frontend: to be deployed

---

## ⚡ Features

- Secure User Registration & Login
- Password Hashing using bcrypt
- JWT Access & Refresh Token Strategy
- HTTP-only Cookie Authentication
- Protected Routes with Middleware
- Token Refresh Mechanism
- Logout with Token Invalidation
- Modular Architecture (MVC + Services)

---

## 🧠 Architecture

Client → Routes → Middleware → Controller → Service → DB

![alt text](<System Architecture.png>)

---

## 🛠️ Tech Stack

Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, cookie-parser

---

## 📦 API Endpoints

POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/me  
POST /api/auth/refresh-token  
POST /api/auth/logout

---

## 🔐 Security Practices

- Password hashing (bcrypt)
- JWT expiration strategy
- Refresh token stored in DB
- HTTP-only cookies
- Input validation

---

## ⚙️ Setup

```bash
git clone https://github.com/danishshaikhdev/auth-system.git
cd server
npm install
npm run dev
```

## 🧪 Sample API Usage

### POST /api/auth/register

Request:

```json
curl -X POST https://auth-system-imze.onrender.com/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "123456",
  "confirm_password": "123456"
}'
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "69e0d417ba7250b4fa6bd350",
    "name": "John Doe",
    "email": "johndoe@gmail.com"
  }
}
```

### POST /api/auth/login

Request:

```json
curl -X POST https://auth-system-imze.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@gmail.com",
  "password": "123456"
}'
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "refreshToken": "eyJhbGciOiJIU.....",
    "accessToken": "eyJhbGciOiJIUzI.....",
    "user": {
      "id": "69e0d417ba7250b4fa6bd350",
      "name": "John Doe",
      "email": "johndoe@gmail.com"
    }
  }
}
```

### GET /api/auth/me

Request:

```json
curl -X GET https://auth-system-imze.onrender.com/api/auth/me \
-H "Authorization: Bearer <accessToken_here>"
```

Response:

```json
{
  "success": true,
  "data": {
    "_id": "69e0d417ba7250b4fa6bd350",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "role": "user",
    "createdAt": "2026-04-16T12:20:39.108Z",
    "updatedAt": "2026-04-16T12:24:15.504Z",
    "__v": 0,
    "refreshToken": "eyJhbGciOiJIU....."
  }
}
```

### POST /api/auth/refresh-token

Request:

```json
curl -X POST https://auth-system-imze.onrender.com/api/auth/refresh-token \
--cookie "refreshToken=<refreshToken_here>"
```

Response:

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJI....."
  }
}
```

### POST /api/auth/logout

Request:

```json
curl -X POST https://auth-system-imze.onrender.com/api/auth/logout 
-H "Authorization: Bearer <accessToken_here>"
```

Response:

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
