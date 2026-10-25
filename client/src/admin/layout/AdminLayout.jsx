import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import api from "../../services/api";
import { clearState } from "../../features/store/slice/authSclice";

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearState);
      navigate("/admin/login", { replace: true });
    }
  };
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar + Main Content /}
<div className="flex min-h-screen">
{/ Sidebar */}
      <AdminSidebar />

      {/* Main Section */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <AdminHeader user={user} onLogout={handleLogout} />

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 py-4 text-center text-sm text-gray-500 sm:px-6">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
