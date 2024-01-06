import React from 'react';
import {
  FaTwitter,
  FaFacebook,
  FaGoogle
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
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
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Mattis tellus laoreet urna
            nunc, nec et. Et sit erat arcu amet morbi
            cursus eget odio elit.
          </p>
          <div className='flex text-yellow-400 md:w-[75%] my-4'>
            <FaGithub size={20} className='ml-4' />
            <FaFacebook size={20} className='ml-4' />
            <IoLogoFirebase size={20} className='ml-4' />
          </div>
        </div>
        <div className='lg:col-span-2 mt-6 flex justify-between px-16'>
          <div>
            <h6 className='font-medium text-yellow-400'>Company</h6>
            <ul>
              <li className='py-2 text-sm'>About Us</li>
              <li className='py-2 text-sm'>News & Blogs</li>
              <li className='py-2 text-sm'>Contact Us</li>
              <li className='py-2 text-sm'>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-yellow-400'>Quick Links</h6>
            <ul>
              <li className='py-2 text-sm'>Products</li>
              <li className='py-2 text-sm'>Workshops</li>
              <li className='py-2 text-sm'>Rental-Bikes</li>
              <li className='py-2 text-sm'>Used-Bikes</li>
              <li className='py-2 text-sm'>Login/SignUp</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-yellow-400'>Support</h6>
            <ul>
              <li className='py-2 text-sm'>Get Help</li>
              <li className='py-2 text-sm'>FAQ's</li>
              <li className='py-2 text-sm'>Find a Store</li>
            </ul>
          </div>

        </div>
      </div>
      <div className='mt-[-40px]'>
        <p className="text-center mt-4 text-gray-400 text-sm mb-0">
          &copy; {new Date().getFullYear()} BikeZone, all rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
