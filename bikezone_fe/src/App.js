import Header from "./components/Header";
import FeaturedProductsPage from "./pages/products/FeaturedProductsPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ErrorPage from "./pages/shared/ErrorPage";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/user/Register";
import AboutUs from "./pages/AboutUs";
import LoginForm from "./pages/user/LoginForm";
import ProductDetail from "./pages/products/ProductDetail";
import UserProfile from "./pages/user/UserProfile";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/products/Cart";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import ResetPassword from "./pages/user/ResetPassword";
import Shipping from "./pages/products/Shipping";
import ConfirmOrder from "./pages/products/ConfirmOrder";
import axios from "axios";
import Payment from "./pages/payment/Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import MyOrders from "./pages/products/MyOrders";
import OrderDetails from "./pages/products/OrderDetails";
import CreateBlogPost from "./pages/blog/CreateBlogPost";
import MyBlogs from "./pages/blog/MyBlogs";
import GetSingleBlog from "./pages/blog/GetSingleBlog";
import Blogs from "./pages/blog/Blogs";
import Workshops from "./pages/workshop/Workshops";
import CreateWorkshop from "./pages/workshop/CreateWorkshop";
import WorkshopDetail from "./pages/workshop/WorkshopDetail";


function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:4000/api/v1/stripeapikey", { withCredentials: true });
    setStripeApiKey(data.stripeApiKey);
  }


  const { user } = useSelector((state) => state.auth)

  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedToken = cookies.token;

    if (savedToken && !user) {
      dispatch(loadUser());
      console.log(savedToken, "console token on render");
      getStripeApiKey()
    }
  }, [cookies, dispatch, user]);

  // useEffect(() => {
  //   getStripeApiKey()
  // }, [])

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
        <Route exact path="/success" element={<PaymentSuccess />} />
        <Route exact path="/blogs" element={<Blogs />} />

        {/* Workshops */}

        <Route exact path="/workshops" element={<Workshops />} />
        <Route exact path="/create-workshop" element={<ProtectedRoute Component={CreateWorkshop} />} />  
        <Route exact path="/workshop/:id" element={<ProtectedRoute Component={WorkshopDetail} />} />  


        {/* admin routes */}
        <Route exact path="/dashboard" element={<Dashboard />} />



        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        {/* protected routes */}
        <Route exact path="/account" element={<ProtectedRoute Component={UserProfile} />} />
        <Route exact path="/me/update" element={<ProtectedRoute Component={EditProfile} />} />
        <Route exact path="/update/password" element={<ProtectedRoute Component={UpdatePassword} />} />
        <Route exact path="/shipping" element={<ProtectedRoute Component={Shipping} />} />
        <Route exact path="/order/confirm" element={<ProtectedRoute Component={ConfirmOrder} />} />
        <Route exact path="/orders" element={<ProtectedRoute Component={MyOrders} />} />
        <Route exact path="/order/:id" element={<ProtectedRoute Component={OrderDetails} />} />

        {/* Blog routes */}
        <Route exact path="/blog/new" element={<ProtectedRoute Component={CreateBlogPost} />} />
        <Route exact path="/blog/me" element={<ProtectedRoute Component={MyBlogs} />} />
        <Route exact path="/blog/:id" element={<ProtectedRoute Component={GetSingleBlog} />} />

        <Route exact path="/process/payment" element={
          stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute Component={Payment} />
            </Elements>
          )}
        />

        {/* error page */}
        <Route path="/*" element={<ErrorPage />} />

      </Routes>
      <Footer />


      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
