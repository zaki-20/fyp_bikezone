import React from 'react';
import {
  FaTwitter,
  FaFacebook,
  FaGoogle
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";


const Footer = () => {

  const location = useLocation();
  // Define routes where you want to hide the header content
  const hideFooterRoutes = ['/login', '/register', '/dashboard', '/forgot-password', '/me/update', '/update/password', '/admin/dashboard', '/admin/products'];

  const isResetPasswordPage = location.pathname.startsWith('/password/reset/');

  // Check if the current route is in the hideHeaderRoutes array
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div>
      <div className={shouldHideFooter || isResetPasswordPage ? 'hidden' : `w-full py-16 px-4 grid lg:grid-cols-3 gap-6 text-white bg-[#122222]`}>
        <div>
          <h1 className='w-full text-3xl font-bold text-yellow-400'>
            BikeZone
          </h1>
          <p className='py-4'>
            Welcome to your one-stop biking destination! Explore bikes, accessories,
            rentals, and workshops on our user-friendly platform. Join our vibrant
            biking community and stay informed with our engaging blog.
            Your ultimate biking experience starts here! 🚴‍♂️✨
          </p>
          <div className='flex text-yellow-400 md:w-[75%] my-4'>
            <Link to="https://github.com/zaki-20/fyp_bikezone/tree/zaki">
              <FaGithub size={23} className=' hover:scale-105 duration-200' />
            </Link>
            <Link to="/">
              <FaFacebook size={23} className='ml-4 hover:scale-105 duration-200' />
            </Link>
            <Link to="https://bikezone-29f01.firebaseapp.com/">
              <IoLogoFirebase size={23} className='ml-4 hover:scale-105 duration-200' />
            </Link>
          </div>
        </div>

        <div className='lg:col-span-2 mt-12 flex justify-between px-12 '>
          <div className='flex   flex-col'>
            <h6 className='font-medium text-yellow-400'>Company</h6>
            <ul>
              <Link to="/about">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>About Us</li>
              </Link>

              <Link to="/blogs">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>News & Blogs</li>
              </Link>

              <Link to="/contact">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Contact Us</li>
              </Link>

              <Link to="/privacy-policy">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Privacy Policy</li>
              </Link>
            </ul>
          </div>

          <div className='flex  flex-col'>
            <h6 className='font-medium text-yellow-400'>Quick Links</h6>
            <ul>
              <Link to="/featuredproducts">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Products</li>
              </Link>

              <Link to="/workshops">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Workshops</li>
              </Link>

              <Link to="/rental-bikes">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Rental-Bikes</li>
              </Link>

              <Link to="/usedbikes">
                <li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Used-Bikes</li>
              </Link>


            </ul>
          </div>


          <div className='flex  flex-col '>
            <h6 className='font-medium text-yellow-400'>Stay Updated</h6>
            <ul>
              <Link to=""><li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Blogs</li> </Link>
              <Link to=""><li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Brands</li> </Link>
            </ul>
          </div>


          <div className='flex  flex-col '>
            <h6 className='font-medium text-yellow-400'>Join Us Now</h6>
            <ul>
              <Link to="/login"><li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Sign-in</li> </Link>
              <Link to="/register"><li className='py-2 text-sm cursor-pointer hover:text-yellow-400 duration-300'>Sing-up</li> </Link>
            </ul>
          </div>

        </div>
      </div>
      <div className='mt-[-40px] cursor-not-allowed'>
        <p className="text-center mt-4 text-gray-400 text-sm mb-0">
          &copy; {new Date().getFullYear()} BikeZone, all rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
