import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 HOME (courses are rendered on Home) */}
        <Route path="/" element={<Home />} />

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🎓 STUDENT DASHBOARD */}
        <Route
          path="/Home/home"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🛠 ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
