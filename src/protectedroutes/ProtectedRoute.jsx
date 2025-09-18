import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshTokenMutation } from "../api/AuthAPI";
import { logout } from "../api/TokenSlice";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();
  const { access, refresh, role } = useSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();

useEffect(() => {
  const checkToken = async () => {
   if (access) {
  const { exp } = jwtDecode(access);
  if (exp * 1000 < Date.now()) {
    if (refresh) {
      refreshToken(refresh);
    } else {
      dispatch(logout());
    }
  }
}

  };

  checkToken();
}, [access, refresh, refreshToken, dispatch]);

  if (!access) {
    return <Navigate to="/login" />;
  }
if (allowedRoles && !allowedRoles.includes(role)) {
  return <Navigate to="/unauthorized" replace />;
}
  return children;
};
export default ProtectedRoute;