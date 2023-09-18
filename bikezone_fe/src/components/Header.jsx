import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/auth.thunk';
import { reset } from '../features/auth/auth.slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()

  // Define routes where you want to hide the header content
  const hideHeaderRoutes = ['/login', '/register'];

  // Check if the current route is in the hideHeaderRoutes array
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  const { user, isLoading, isError, isSuccess, message,logoutSuccess } = useSelector((state) => state.auth)


  const logoutHandle = () => {
    dispatch(logout())
  }

  useEffect(()=>{
   if(logoutSuccess){
    toast.success(message);
    dispatch(reset())
   }
    navigate('/')
  },[message,logoutSuccess])

  return (
    <nav className={shouldHideHeader ? `hidden` : `bg-[#122222] border-gray-200 dark:bg-gray-900`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <Link to="/" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-medium tracking-widest whitespace-nowrap text-yellow-400">BIKEZONE</span>
        </Link>


        <div className="flex items-center md:order-2">
          <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span className="sr-only"></span>
            <img className="w-8 h-8 rounded-full" src="favicon.ico" alt="user-piLink" />
          </button>
          {/* Dropdown menu */}
          <div className="z-50 hidden my-4 min-w-[200px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            {

              user ? (
                <>
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{`${user.firstname} ${user.lastname}`}</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>

                  <ul className="py-2" aria-labelledby="user-menu-button">
                    {
                      user?.role === 'admin' && (
                        <li>
                          <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#122222] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                        </li>
                      )
                    }
                    <li>
                      <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#122222] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Account</Link>
                    </li>
                    <li>
                      <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#122222] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Orders</Link>
                    </li>
                    <li>
                      <div onClick={logoutHandle} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#122222] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</div>
                    </li>
                  </ul>
                </>
              ) : (
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{`please login`}</span>
                </div>
              )
            }


          </div>
          <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#122222] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 pl-3 pr-4 rounded hover:bg-[#122222] hover:text-white md:text-white md:p-0 md:hover:bg-transparent md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-[#122222] hover:text-white md:hover:bg-transparent md:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
            </li>
            <li>
              <Link to="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-[#122222] hover:text-white md:hover:bg-transparent md:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
            </li>
           
            <li>
              <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-[#122222] hover:text-white md:hover:bg-transparent md:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">login</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-[#122222] hover:text-white md:hover:bg-transparent md:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer position='top-center' /> {/* Add ToastContainer at the end of your component */}

    </nav>


  );
}

export default Header;