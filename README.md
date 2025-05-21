# 🧭 User Access Management System

A full-stack web application for managing user authentication, software access requests, and role-based permissions.

Built with **Node.js**, **Express**, **React**, **PostgreSQL**, **TypeORM**, and styled with **Tailwind CSS** using a modern glassmorphism UI.

---

## 🚀 Features

✅ User Signup & Login  
✅ JWT-based Authentication  
✅ Role-Based Access (Employee, Manager, Admin)  
✅ Software Creation (Admin Only)  
✅ Access Request Submission (Employee Only)  
✅ Access Request Review/Approval (Manager Only)  
✅ Responsive UI for all devices  
✅ Secure Passwords with Bcrypt  
✅ Beautiful Glassmorphism Dashboard UI ✨  

---

## 🧰 Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React + Vite + Tailwind CSS    |
| Backend     | Node.js + Express.js           |
| Database    | PostgreSQL                     |
| ORM         | TypeORM                        |
| Auth        | JWT + bcrypt                   |
| Styling     | Tailwind CSS + Responsive Design |

---

## 🧑‍💻 User Roles

| Role     | Capabilities                                      |
|----------|---------------------------------------------------|
| Employee | Request software access                           |
| Manager  | View/Approve/Reject access requests               |
| Admin    | Add software, full system access                  |

---

## 🔐 API Endpoints

### Auth
- `POST /api/auth/signup` — Register (Employee by default)
- `POST /api/auth/login` — Login & receive JWT

### Software
- `GET /api/software` — List all software
- `POST /api/software` — Create software (Admin only)

### Requests
- `POST /api/requests` — Submit request (Employee)
- `GET /api/requests` — View pending requests (Manager)
- `PATCH /api/requests/:id` — Approve/Reject (Manager)

---

## 🖼️ Screenshots

<details>
<summary>🖥️ Login / Signup</summary>
Glassy cards with gradient backgrounds.
</details>

<details>
<summary>🧑‍💻 Admin View</summary>
Create software with multi-access levels.
</details>

<details>
<summary>📩 Employee View</summary>
Request software with reason + access type.
</details>

<details>
<summary>🧾 Manager View</summary>
Approve or reject requests from a responsive table.
</details>

---

## 🛠️ Setup Instructions

### Backend (Node.js + Express)

1. Clone the repo  
2. Navigate to `/backend` folder  
3. Install dependencies:  
   ```bash
   npm install

## 🧑‍🔬 Author
Made with ❤️ by UDAYKUMAR N
