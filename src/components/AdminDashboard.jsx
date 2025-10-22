import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  Eye,
  X,
  BarChart3,
  Users,
  Award,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const modalRef = useRef();

  // Redirect if no token
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch all users progress
  useEffect(() => {
    const fetchUsersProgress = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/admin/allUsersProgress",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users progress:", err);
        alert("Unable to fetch users. Please check server or token.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersProgress();
  }, [token]);

  // Fetch single user topic progress
  const viewUserProgress = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/admin/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch user progress");

      const data = await res.json();
      setSelectedUser(data);
      setUserProgress(data.topicProgress || []);
    } catch (err) {
      console.error("Error fetching user progress:", err);
      alert("Unable to fetch user progress.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close modal on click outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSelectedUser(null);
    }
  };

  // Dashboard summary stats
  const totalUsers = users.length;
  const avgProgress =
    totalUsers > 0
      ? Math.round(users.reduce((acc, u) => acc + u.progress, 0) / totalUsers)
      : 0;
  const topPerformer = users.length
    ? users.reduce((a, b) => (a.progress > b.progress ? a : b))
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Super Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-sm border rounded-2xl p-6 flex items-center gap-4"
        >
          <Users className="w-10 h-10 text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-2xl font-semibold">{totalUsers}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-sm border rounded-2xl p-6 flex items-center gap-4"
        >
          <BarChart3 className="w-10 h-10 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Average Progress</p>
            <p className="text-2xl font-semibold">{avgProgress}%</p>
          </div>
        </motion.div>

        {topPerformer && (
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-sm border rounded-2xl p-6 flex items-center gap-4"
          >
            <Award className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-gray-500 text-sm">Top Performer</p>
              <p className="text-lg font-semibold">{topPerformer.name}</p>
              <p className="text-sm text-gray-600">{topPerformer.progress}%</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Users Progress Overview
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No users found.</p>
        ) : (
          <table className="w-full text-left border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Progress</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <motion.tr
                  key={user._id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="border-b border-gray-200 transition"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3 flex items-center gap-2">
                    <UserCircle className="w-5 h-5 text-gray-500" />
                    {user.name}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    {user.progress}%
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => viewUserProgress(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 mx-auto"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            onClick={handleOutsideClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center bg-black/50 backdrop-blur-sm overflow-y-auto"
          >
            <div className="w-full flex justify-center items-start py-10 px-4">
              <motion.div
                ref={modalRef}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Sticky Header */}
                <div className=" top-0 pb-3 z-10 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {selectedUser.name}
                  </h2>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>

                {/* Scrollable Table */}
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <th className="p-3">Topic</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Completed</th>
                        <th className="p-3">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userProgress.length > 0 ? (
                        userProgress.map((topic) => (
                          <tr
                            key={topic.topicId}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="p-3">{topic.topicName}</td>
                            <td className="p-3">{topic.totalQuestions}</td>
                            <td className="p-3">{topic.completed}</td>
                            <td className="p-3 text-blue-600 font-semibold">
                              {topic.percent}%
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center text-gray-500 py-6"
                          >
                            No progress data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
