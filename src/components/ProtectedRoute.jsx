import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // No token at all → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode token
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check expiry (exp is in seconds)
    if (payload.exp * 1000 < Date.now()) {
      // Token expired → clear token + redirect
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    // Invalid token → logout anyway
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Token valid → continue
  return children;
};

export default ProtectedRoute;
