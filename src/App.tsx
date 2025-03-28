import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./styles/global.scss"
import LoginPage from "./pages/LoginPage"
import DashboardLayout from "./layouts/DashboardLayout"
import UsersPage from "./pages/UsersPage"
import UserDetailsPage from "./pages/UserDetailsPage"

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage /> }
        />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

