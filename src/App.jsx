import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./protectedroutes/ProtectedRoute";
import ForgotPassword from './api/ForgetPassword';
import LandingPage from "./landingpage/LandingPage";
import SignUp from "./pages/SignUp";
import ApprovedBusinesses from './admin/Approved';
import Dashboard from "./admin/Dashboard";
import Unauthorized from "./api/Unauthorized";
import CategoryBusinesses from "./landingpage/CategoryBusinesses";
import BusinessUser from "./pages/BusinessUser";
import Navbar from "./components/Navbar";
import { useState } from "react";
import UserBusinesses from "./pages/BusinessesDetails";
import CategoriesPage from "./landingpage/CategoriesPage";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token ;

  const [searchTerm, setSearchTerm] = useState("");
  const hideNavbarRoutes = ["/login", "/signup", "/forgot-password", "/businessuser", "/user", "/unauthorized","/admin"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <Navbar
          isLoggedIn={isLoggedIn}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      <Routes>
        <Route path='/' element={<LandingPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/approvedbusinesses" element={<ApprovedBusinesses />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/category/:name" element={<CategoryBusinesses />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute allowedRoles={["businessuser"]}>
              <BusinessUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserBusinesses />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </>
  );
}

export default AppWrapper;
