import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./protectedroutes/ProtectedRoute";
import ForgotPassword from './api/ForgetPassword';
import LandingPage from "./landingpage/LandingPage";
import SignUp from "./pages/SignUp";
import ApprovedBusinesses from './admin/Approved';
import Dashboard from "./admin/Dashboard";
import UserBusinesses from "./pages/UserBusinesses";
import Unauthorized from "./api/Unauthorized";
import CategoryBusinesses from "./landingpage/CategoryBusinesses";
import BusinessUser from "./pages/BusinessUser";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/approvedbusinesses" element={<ApprovedBusinesses />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/category/:name" element={<CategoryBusinesses />} />
        <Route
          path="/businessuser"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <BusinessUser/>
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
      </Routes>
    </Router>
  );
}

export default App;