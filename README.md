🎓 Student Course Enrollment Management System

A full-stack web application that allows students to browse and enroll in courses while providing administrators with full control over course management and enrollment tracking.

Built using NestJS + MongoDB on the backend and React (Vite) on the frontend.

🚀 Features
👨‍🎓 Student

View all available courses on the home page

Sign up / log in securely

Enroll in a course (only once per course)

View enrolled courses from dashboard

JWT-based authentication

🛠 Admin

Secure admin login

Create, update, and delete courses

View all courses in structured tables

View all student enrollments

View enrollment statistics per course

Role-based access control (ADMIN / STUDENT)

🧱 Tech Stack
Frontend

React (Vite)

React Router

Axios

Inline & modular CSS

JWT authentication

Backend

NestJS

MongoDB + Mongoose

JWT Authentication

Role-based Guards

REST APIs

📁 Project Structure
STUDENT/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── courses/
│   │   ├── enrollments/
│   │   ├── admin/
│   │   ├── common/
│   │   └── main.ts
│   ├── package.json
│   └── .env
│
├── student-frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js

⚙️ Prerequisites

Make sure you have installed:

Node.js (v18 or later)

MongoDB (local or Atlas)

npm or yarn

🔧 Backend Setup (NestJS)
1️⃣ Navigate to backend
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
MONGO_URI=mongodb://127.0.0.1:27017/student_course_db
JWT_SECRET=student_course_secret_key
JWT_EXPIRES_IN=1d

4️⃣ Run backend server
npm run start:dev


✅ Backend runs at:

http://localhost:3000

🎨 Frontend Setup (React)
1️⃣ Navigate to frontend
cd student-frontend

2️⃣ Install dependencies
npm install

3️⃣ Run frontend
npm run dev


✅ Frontend runs at:

http://localhost:5173

🔐 Authentication & Roles
Roles Supported

STUDENT

ADMIN

Create Admin Account

Use signup API or frontend signup with:

{
  "role": "ADMIN"
}


JWT token is stored in localStorage and automatically attached to all API requests via Axios interceptor.

📡 Important API Endpoints
Auth

POST /auth/signup

POST /auth/login

Courses

GET /courses (public)

POST /courses (ADMIN)

PUT /courses/:id (ADMIN)

DELETE /courses/:id (ADMIN)

Enrollments

POST /enrollments (STUDENT)

GET /enrollments/my (STUDENT)

Admin

GET /admin/stats

GET /admin/enrollment-stats

GET /admin/enrollments

🧪 Testing the Application

Start backend and frontend

Visit http://localhost:5173

Browse courses

Sign up as STUDENT → enroll in courses

Sign up as ADMIN → manage courses & view enrollments

🛡 Security Highlights

JWT authentication

Role-based access guards

Protected admin routes

Duplicate enrollment prevention

Input validation using DTOs

📌 Future Enhancements

Course capacity limits

Pagination & search

Admin analytics dashboard

Student profile page

Deployment (Docker / AWS / Vercel)

👨‍💻 Author

Sambhav Shastri
Full-Stack Developer
Built with ❤️ using NestJS & React
