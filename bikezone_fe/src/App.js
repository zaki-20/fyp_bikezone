import Header from "./components/Header";
import FeaturedProductsPage from "./pages/FeaturedProductsPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ErrorPage from "./pages/shared/ErrorPage";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/user/Register";
import AboutUs from "./pages/AboutUs";
import LoginForm from "./pages/user/LoginForm";
import ProductDetail from "./pages/ProductDetail";
import UserProfile from "./pages/user/UserProfile";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie"

import { loadUser } from "./features/auth/auth.thunk";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/route/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import EditProfile from "./pages/user/EditProfile";
import UpdatePassword from "./pages/user/UpdatePassword";
import ForgotPassword from "./pages/user/ForgotPassword";

function App() {

  const { user } = useSelector((state) => state.auth)

  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedToken = cookies.token;

    if (savedToken && !user) {
      dispatch(loadUser());
      console.log(savedToken, "console token on render");
    }
  }, [cookies, dispatch, user]);



  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/featuredproducts" element={<FeaturedProductsPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/dashboard" element={<Dashboard />} />


        <Route exact path="/forgot-password" element={<ForgotPassword />} />

        {/* protected routes */}
        <Route exact path="/profile" element={<ProtectedRoute Component={UserProfile} />} />
        <Route exact path="/me/update" element={<ProtectedRoute Component={EditProfile} />} />
        <Route exact path="/update/password" element={<ProtectedRoute Component={UpdatePassword} />} />

        <Route path="/*" element={<ErrorPage />} />


      </Routes>
      <Footer />


      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
