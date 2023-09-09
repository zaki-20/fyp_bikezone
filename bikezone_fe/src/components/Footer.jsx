import React from 'react';
import {
    FaTwitter,
    FaFacebook,
    FaGoogle
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <div className='w-full py-16 px-4 grid lg:grid-cols-3 gap-6 text-white bg-[#122222]'>
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
            <FaTwitter size={20} className='ml-4' />
            <FaFacebook size={20} className='ml-4'/>
            <FaGoogle size={20} className='ml-4'/>  
      </div>
    </div>
    <div className='lg:col-span-2 mt-6 flex justify-between'>
    <div>
        <h6 className='font-medium text-white'>Company</h6>
        <ul>
            <li className='py-2 text-sm'>About Us</li>
            <li className='py-2 text-sm'>News & Blogs</li>
            <li className='py-2 text-sm'>Contact Us</li>
            <li className='py-2 text-sm'>Privacy Policy</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-white'>Quick Links</h6>
        <ul>
            <li className='py-2 text-sm'>Brands</li>
            <li className='py-2 text-sm'>Categories</li>
            <li className='py-2 text-sm'>Deals</li>
            <li className='py-2 text-sm'>Login/SignUp</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-white'>Support</h6>
        <ul>
            <li className='py-2 text-sm'>Get Help</li>
            <li className='py-2 text-sm'>FAQ's</li>
            <li className='py-2 text-sm'>Find a Store</li>
            <li className='py-2 text-sm'>Chat With Us</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-white'>Download Our App</h6>
        <ul>
            <li className='py-2 text-sm'>Claims</li>
            <li className='py-2 text-sm'>Policy</li>
            <li className='py-2 text-sm'>Terms</li>
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
