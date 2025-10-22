import LandingPage from "./components/LandingPage";
import { Route, Routes } from "react-router-dom";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import TopicDetail from "./components/TopicDetails";
import LoginPage from "./components/Login";
import Bookmarks from "./components/Bookmarks";
import Register from "./components/register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/get-topic/:topicName"
          element={
            <ProtectedRoute>
              <TopicDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />

        {/* Admin-only route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
