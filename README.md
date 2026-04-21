# 🔐 Production-Ready Full-Stack Authentication System

A scalable, full-stack authentication system implementing industry-standard security practices. Features a robust Node.js backend and a modern React frontend with a polished UI.

Designed using **Clean Architecture** (Controller → Service → Model) on the backend and a **Modular Component-based** approach on the frontend to ensure maintainability and scalability.

---

## 🚀 Live Demo

🔗 **Backend API**: [https://auth-system-imze.onrender.com/](https://auth-system-imze.onrender.com/)  
🔗 **Frontend**: *To be deployed*

---

## ⚡ Features

### 🛡️ Backend (Node.js & Express)
- **Secure Authentication**: Password hashing with `bcrypt` and JWT-based session management.
- **Token Strategy**: Implementation of Access & Refresh Token rotation for enhanced security.
- **Cookie Security**: Refresh tokens stored in `HTTP-only` cookies to prevent XSS attacks.
- **Protected Routes**: Robust middleware for verifying authentication and authorization.
- **Clean Architecture**: Separation of concerns using Controllers, Services, and Models.
- **Error Handling**: Centralized and graceful error reporting.

### 💻 Frontend (React & TypeScript)
- **Modern UI/UX**: Built with **Vite**, **Tailwind CSS**, and **Lucide React** for a beautiful, responsive interface.
- **Global State**: Minimalist and efficient state management using **React Context API**.
- **Secure Routing**: Protected routes to prevent unauthorized access to the dashboard.
- **Form Handling**: Integrated login and registration forms with real-time error feedback.
- **Persistent Sessions**: Access tokens stored securely with automatic attachment to API requests via Axios interceptors.
- **Dashboard**: A feature-rich user dashboard with a personalized navbar, hero section, and account details.

---

## 🧠 Architecture

**Full-Stack Flow**:  
`React Frontend (Vite) <--> Axios Interceptors <--> Express API (Node.js) <--> MongoDB (Mongoose)`

**Backend Internal**:  
`Client → Routes → Middleware → Controller → Service → Model → DB`

![alt text](<System Architecture.png>)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, bcrypt, cookie-parser
- **Development**: Nodemon, Dotenv

---

## 📂 Project Structure

```text
auth-system/
├── client/                # React TypeScript Frontend
│   ├── src/
│   │   ├── api/           # Axios API services
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth Context & State
│   │   ├── pages/         # Dashboard, Login, Register
│   │   └── types/         # TypeScript definitions
├── server/                # Node.js Express Backend
│   ├── src/
│   │   ├── config/        # DB & App config
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Auth & Error middlewares
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   └── utils/         # Token & Helper functions
```

---

## 📦 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive tokens |
| `GET` | `/api/auth/me` | Get current user profile (Protected) |
| `POST` | `/api/auth/refresh-token` | Rotate access tokens using cookies |
| `POST` | `/api/auth/logout` | Invalidate session and clear cookies |

---

## 🔐 Security Practices

- **Bcrypt**: Salted password hashing.
- **JWT Strategy**: Short-lived Access Tokens + Long-lived Refresh Tokens.
- **Refresh Token Rotation**: New refresh token issued on every refresh request.
- **XSS Protection**: Sensitive tokens stored in HTTP-only, Secure cookies.
- **CSRF Mitigation**: Proper CORS configuration.
- **Input Validation**: Server-side checks for all user-provided data.

---

## ⚙️ Setup

### Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)

### 1. Clone & Install
```bash
git clone https://github.com/danishshaikhdev/auth-system.git
cd auth-system
```

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file with: PORT, MONGO_URI, JWT_SECRET, REFRESH_TOKEN_SECRET
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
# Create a .env file with: VITE_API_URL=http://localhost:5000
npm run dev
```
