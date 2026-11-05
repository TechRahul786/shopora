import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import AdminLogin from "./features/auth/AdminLogin";
import AdminLayout from "./admin/layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/common/NotFound";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Products from "./admin/pages/Products";
import AddProduct from "./admin/pages/AddProduct";
import Category from "./admin/pages/Category";
import Dashboard from "./admin/pages/Dashboard";
import AuthLayout from "./components/layout/AuthLayout";
import Home from "./pages/Home";



function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Customer-only pages */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Home/>}/>
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

          {/* Admin login page */}
        <Route path="/admin/login" element={<AdminLogin />} />

           {/* Admin-only pages */}
          <Route element={<ProtectedRoute allowRoles={['admin']}/>}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="add-product" element={<AddProduct/>}/>
                <Route path="categories" element={<Category/>}/>
              </Route>
          </Route>
        
         {/* 404 page */}
          <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
