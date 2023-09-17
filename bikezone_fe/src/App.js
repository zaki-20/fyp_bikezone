import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import FeaturedProductsPage from "./pages/FeaturedProductsPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import LoginForm from "./pages/LoginForm";
import ErrorPage from "./pages/shared/ErrorPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import 'react-toastify/dist/ReactToastify.css';

function App() {



  const [show, setShow] = useState(true);

  // Get the current location using useLocation
  // const location = useLocation();

  // Conditionally render Header and Footer based on the route path
  // const renderHeaderAndFooter = !location.pathname.startsWith("/register")
  //   && !location.pathname.startsWith("/login");

  return (
    <>

      {/* {renderHeaderAndFooter && <Header />} */}
      <Header />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<HomePage />} />
          <Route path="featuredproducts" element={<FeaturedProductsPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />

      {/* {renderHeaderAndFooter && <Footer />} */}



    </>
  );
}

export default App;
