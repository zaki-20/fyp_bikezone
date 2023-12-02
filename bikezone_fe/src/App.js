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
import AddProduct from "./admin/pages/AddProduct";
import Cart from "./pages/products/Cart";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie"

import { loadUser } from "./features/auth/auth.thunk";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/route/ProtectedRoute";
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
import MyWorkshopAppointments from "./pages/workshop/MyWorkshopAppointments";
import MyWorkshops from "./pages/workshop/MyWorkshops";
import UpdateWorkshop from "./pages/workshop/UpdateWorkshop";
import Brands from "./pages/brand/Brands";
import Dashboard from "./admin/pages/Dashboard";
import ProductList from "./admin/pages/ProductList";
import UpdateProduct from "./admin/pages/UpdateProduct";
import OrderList from "./admin/pages/OrderList";
import ProcessOrder from "./admin/pages/ProcessOrder";
import UserList from "./admin/pages/UserList";
import UserDetail from "./admin/pages/UserDetail";
import ReviewList from "./admin/pages/ReviewList";
import CreateRentalBike from "./pages/rentalbikes/CreateRentalBike";



function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  // socket.on("connection", (message) => {
  //   console.log(message)
  // })

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
        <Route exact path="/brands" element={<Brands />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/success" element={<PaymentSuccess />} />
        <Route exact path="/blogs" element={<Blogs />} />

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

        {/* Payment */}
        <Route exact path="/process/payment" element={
          stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute Component={Payment} />
            </Elements>
          )}
        />


        {/* Workshops */}

        <Route exact path="/workshops" element={<Workshops />} />
        <Route exact path="/workshops/me" element={<ProtectedRoute Component={MyWorkshops} />} />
        <Route exact path="/create-workshop" element={<ProtectedRoute Component={CreateWorkshop} />} />
        <Route exact path="/workshop/:id" element={<ProtectedRoute Component={WorkshopDetail} />} />
        <Route exact path="/workshop/update/:id" element={<ProtectedRoute Component={UpdateWorkshop} />} />
        <Route exact path="/workshop/appointments" element={<ProtectedRoute Component={MyWorkshopAppointments} />} />

        {/*Rental-Bikes*/}
        <Route exact path="/create-rental-bike" element={<ProtectedRoute Component={CreateRentalBike} />} />



        {/* admin routes */}
        <Route exact isAdmin={true} path="/admin/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
        <Route exact isAdmin={true} path="/admin/products" element={<ProtectedRoute Component={ProductList} />} />
        <Route exact isAdmin={true} path="/admin/product/new" element={<ProtectedRoute Component={AddProduct} />} />
        <Route exact isAdmin={true} path="/admin/product/:id" element={<ProtectedRoute Component={UpdateProduct} />} />
        <Route exact isAdmin={true} path="/admin/orders" element={<ProtectedRoute Component={OrderList} />} />
        <Route exact isAdmin={true} path="/admin/order/:id" element={<ProtectedRoute Component={ProcessOrder} />} />
        <Route exact isAdmin={true} path="/admin/users" element={<ProtectedRoute Component={UserList} />} />
        <Route exact isAdmin={true} path="/admin/user/:id" element={<ProtectedRoute Component={UserDetail} />} />
        <Route exact isAdmin={true} path="/admin/reviews" element={<ProtectedRoute Component={ReviewList} />} />

        {/* error page */}
        <Route path="/*" element={<ErrorPage />} />

      </Routes>
      <Footer />


      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
