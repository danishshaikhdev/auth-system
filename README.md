# 🔐 Auth System

A full-stack authentication system built while learning backend development.
This project demonstrates how a client interacts with a server to handle user authentication.
Users can register and log in, and the server securely processes credentials using hashing and token-based authentication.
The system follows a structured architecture with routes, controllers, and services to keep the code clean and scalable.
It also uses environment variables for configuration and follows basic security practices.

---

## 🚀 Features

* User Signup & Login
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes (coming soon)
* Environment variable management
* Structured backend architecture

---

## 🛠️ Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv
* bcrypt
* JSON Web Token (JWT)

### Frontend:

* React (planned / in progress)

---

## 📁 Project Structure

```id="ybc4xm"
auth-system/
 ├── client/          # Frontend (React)
 ├── server/          # Backend (Node + Express)
 │    ├── src/
 │    │    ├── config/
 │    │    ├── controllers/
 │    │    ├── services/
 │    │    ├── models/
 │    │    ├── routes/
 │    │    ├── middleware/
 │    │    └── utils/
 │    └── server.js
 ├── .env
 ├── .gitignore
 └── README.md
```

---

## ▶️ How to Run

### Backend

```bash id="e0bmdd"
cd server
npm install
npm run dev
```

---

### Frontend

```bash id="hw7w6f"
cd client
npm install
npm start
```

---

## 📌 Notes

* This is a learning project and is still in progress
* More features like refresh tokens, role-based access, and OAuth will be added later

---

## 🎯 Future Improvements

* Refresh Tokens
* Role-Based Authorization
* Email Verification
* Password Reset System
* OAuth (Google, GitHub)