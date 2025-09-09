import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./protectedroutes/ProtectedRoute";
import NearbyBusinesses from "./pages/NearbyBusinesses";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute>
              <NearbyBusinesses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
