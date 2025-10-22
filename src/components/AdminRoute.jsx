import { Navigate } from "react-router-dom";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
}

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const decoded = parseJwt(token);
  if (!decoded || decoded.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
