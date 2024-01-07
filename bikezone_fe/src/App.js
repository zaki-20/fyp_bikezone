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
import Cart from "./pages/products/Cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import ProductList from "./admin/pages/products/ProductList";
import AddProduct from "./admin/pages/products/AddProduct";
import UpdateProduct from "./admin/pages/products/UpdateProduct";
import OrderList from "./admin/pages/products/OrderList";
import ProcessOrder from "./admin/pages/products/ProcessOrder";
import UserList from "./admin/pages/users/UserList";
import UserDetail from "./admin/pages/users/UserDetail";
import ReviewList from "./admin/pages/products/ReviewList";
import CreateRentalBike from "./pages/rentalbikes/CreateRentalBike";
import GetAllRentBikes from "./pages/rentalbikes/GetAllRentBikes";
import RentBikeDetail from "./pages/rentalbikes/RentBikeDetail";
import MyRentBikes from "./pages/rentalbikes/MyRentBikes";
import UpdateRentBike from "./pages/rentalbikes/UpdateRentBike";
import OtpVerification from "./pages/user/OtpVerification";
import WorkshopList from "./admin/pages/workshops/WorkshopList";
import RentalBikesList from "./admin/pages/rentalbikes/RentalBikesList";
import CreateUsedBike from "./pages/usedbike/CreateUsedBike";
import MyUsedBikesAd from "./pages/usedbike/MyUsedBikesAd";
import GetAllUsedBikeAds from "./pages/usedbike/GetAllUsedBikeAds";
import GetUsedBikeDetail from "./pages/usedbike/GetUsedBikeDetails";
import UpdateUsedBike from "./pages/usedbike/UpdateUsedBike";
import UsedBikesList from "./admin/pages/usedbike/UsedBikesList";
import GetSingleAppointment from "./pages/workshop/GetSingleAppointment";
import WorkshopDetails from "./admin/pages/workshops/WorkshopDetails";
import UsedBikeDetail from "./admin/pages/usedbike/UsedBikeDetail";
import RentalBikeDetail from "./admin/pages/rentalbikes/RentalBikeDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";


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

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/featuredproducts" element={<FeaturedProductsPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/otp-verification" element={<OtpVerification />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
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
        <Route exact path="/workshop/appointment/:id" element={<ProtectedRoute Component={GetSingleAppointment} />} />

        {/*Rental-Bikes*/}
        <Route exact path="/rental-bikes" element={<GetAllRentBikes />} />
        <Route exact path="/create-rental-bike" element={<ProtectedRoute Component={CreateRentalBike} />} />
        <Route exact path="/rental-bikes/me" element={<ProtectedRoute Component={MyRentBikes} />} />
        <Route exact path="/rental-bikes/:id" element={<ProtectedRoute Component={RentBikeDetail} />} />
        <Route exact path="/rental-bike/update/:id" element={<ProtectedRoute Component={UpdateRentBike} />} />

        {/* Used Bikes */}
        <Route exact path="/usedbikes" element={<GetAllUsedBikeAds />} />
        <Route exact path="/create-usedbike" element={<ProtectedRoute Component={CreateUsedBike} />} />
        <Route exact path="/usedbikes/me" element={<ProtectedRoute Component={MyUsedBikesAd} />} />
        <Route exact path="/usedbike/:id" element={<ProtectedRoute Component={GetUsedBikeDetail} />} />
        <Route exact path="/usedbike/update/:id" element={<ProtectedRoute Component={UpdateUsedBike} />} />

        {/* admin product routes */}
        <Route exact isAdmin={true} path="/admin/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
        <Route exact isAdmin={true} path="/admin/products" element={<ProtectedRoute Component={ProductList} />} />
        <Route exact isAdmin={true} path="/admin/product/new" element={<ProtectedRoute Component={AddProduct} />} />
        <Route exact isAdmin={true} path="/admin/product/:id" element={<ProtectedRoute Component={UpdateProduct} />} />

        {/* admin order routes */}
        <Route exact isAdmin={true} path="/admin/orders" element={<ProtectedRoute Component={OrderList} />} />
        <Route exact isAdmin={true} path="/admin/order/:id" element={<ProtectedRoute Component={ProcessOrder} />} />

        {/* admin users routes */}
        <Route exact isAdmin={true} path="/admin/users" element={<ProtectedRoute Component={UserList} />} />
        <Route exact isAdmin={true} path="/admin/user/:id" element={<ProtectedRoute Component={UserDetail} />} />
        <Route exact isAdmin={true} path="/admin/reviews" element={<ProtectedRoute Component={ReviewList} />} />

        {/* admin workshop routes */}
        <Route exact isAdmin={true} path="/admin/workshops" element={<ProtectedRoute Component={WorkshopList} />} />
        <Route exact isAdmin={true} path="/admin/workshops/:id" element={<ProtectedRoute Component={WorkshopDetails} />} />

        {/* admin rental bike routes */}
        <Route exact isAdmin={true} path="/admin/rental-bikes" element={<ProtectedRoute Component={RentalBikesList} />} />
        <Route exact isAdmin={true} path="/admin/rentalbikes/:id" element={<ProtectedRoute Component={RentalBikeDetail} />} />

        {/* admin used bike routes */}
        <Route exact isAdmin={true} path="/admin/usedbikes" element={<ProtectedRoute Component={UsedBikesList} />} />
        <Route exact isAdmin={true} path="/admin/usedbikes/:id" element={<ProtectedRoute Component={UsedBikeDetail} />} />

        {/* error page */}
        <Route path="/*" element={<ErrorPage />} />

      </Routes>
      <Footer />

      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
