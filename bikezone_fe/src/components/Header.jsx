import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/auth.thunk';
import { reset } from '../features/auth/auth.slice';
import 'react-toastify/dist/ReactToastify.css';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { resetCart } from '../features/product/product.slice';


const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation();
  // Define routes where you want to hide the header content
  const hideHeaderRoutes = ['/login', '/register', '/dashboard', '/forgot-password', '/me/update', '/update/password'];

  const isResetPasswordPage = location.pathname.startsWith('/password/reset/');
  const adminPage = location.pathname.startsWith('/admin');

  // Check if the current route is in the hideHeaderRoutes array
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  const { user, message, logoutSuccess } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.product)



  const logoutHandle = () => {
    dispatch(logout())
    dispatch(resetCart())
  }

  useEffect(() => {
    if (logoutSuccess) {
      dispatch(reset())
      navigate('/')
    }
  }, [logoutSuccess])

  return (
    <>
      <nav className={shouldHideHeader || isResetPasswordPage || adminPage ? `hidden` : `bg-[#122222]  border-gray-200 dark:bg-gray-900  z-50 `}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <Link to="/" className="flex items-center">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
            <span className="self-center text-2xl font-medium tracking-widest whitespace-nowrap text-yellow-400">BIKEZONE</span>
          </Link>

          <div className="flex items-center md:order-2">
            <li className="font-sans flex justify-center items-center gap-x-4  lg:mt-0  text-yellow-400 duration-200">

              <Link to="/cart" role="button" className="relative flex ">
                <svg className="flex-1 w-8 h-8 fill-current hover:scale-110 duration-200" viewBox="0 0 24 24">
                  <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                </svg>
                {
                  cartItems.length > 0 ? (
                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cartItems.length}
                    </span>
                  ) : ("")
                }
              </Link>

              <div className='mr-0'>
                <Dropdown
                  className='bg-[#122222] z-50'
                  arrowIcon={false}
                  inline
                  label={
                    user?.imageURL ? (
                      <Avatar alt="User" img={user?.imageURL} rounded />
                    ) : (
                      <Avatar alt="User" rounded >
                      </Avatar>
                    )
                  }
                >
                  {
                    user ? (
                      <>
                        <Dropdown.Header className=' text-white '>
                          <span className="block text-sm">{`${user.firstname} ${user.lastname}`}</span>
                          <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header>
                        {
                          user?.role === 'admin' && (
                            <Link to={'/admin/dashboard'}>
                              <Dropdown.Item
                                style={{
                                  backgroundColor: 'transparent',
                                  transition: 'background-color 0.3s',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#facc15'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                className='text-white  duration-200 hover:text-[#122222]'>Dashboard</Dropdown.Item>
                            </Link>
                          )
                        }
                        <Link to={'/account'} className=''>
                          <Dropdown.Item
                            style={{
                              backgroundColor: 'transparent',
                              transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#facc15'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            className='text-white  hover:text-[#122222]'>Account</Dropdown.Item>
                        </Link>
                        <Dropdown.Item
                          style={{
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s',
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#facc15'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          className='text-white hover:text-[#122222]'>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item

                          onClick={logoutHandle} className='text-white bg-red-600 hover:text-red-600 duration-200 font-semibold'>Sign out</Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <Link to={'/login'}>
                          <Dropdown.Item
                            style={{
                              backgroundColor: 'transparent',
                              transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#facc15'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            className='text-white hover:text-[#122222]'>Please Login</Dropdown.Item>
                        </Link>

                      </>
                    )
                  }

                </Dropdown>
              </div>

            </li>


            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>

          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col  items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#122222] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block  py-2 pl-3 pr-2 rounded hover:text-yellow-400 hover:bg-[#122222] md:text-white md:p-0 md:hover:bg-transparent md:dark:text-blue-500 hover:scale-105" aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/about" className=" block py-2 pl-3 pr-2 text-gray-900 rounded hover:text-yellow-400 hover:bg-[#122222] md:hover:bg-transparent md:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105">About</Link>
              </li>

              <li>
                <Menu>
                  <MenuHandler>
                    <button
                      className=" block py-2 pl-3 pr-2 text-gray-900 hover:bg-[#122222]  hover:text-yellow-400  md:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 middle none center   transition-all  active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 hover:scale-105">
                      Services
                    </button>
                  </MenuHandler>
                  <MenuList className='bg-[#122222] text-yellow-400'>
                    <Link to={'/featuredproducts'}>
                      <MenuItem>Bike Parts</MenuItem>
                    </Link>
                    <MenuItem className='text-light-green-700'>Coming Soon</MenuItem>


                    <Menu placement="right-start" offset={15}>
                      <MenuHandler>
                        <MenuItem>Workshops</MenuItem>
                      </MenuHandler>
                      <MenuList className='bg-[#122222] text-yellow-400'>

                        <Link to={'/create-workshop'}>
                          <MenuItem>Create Workshop</MenuItem>
                        </Link>

                        <Link to={'/workshops/me'}>
                          <MenuItem>My Workshop</MenuItem>
                        </Link>

                        <Link to={'/workshops'}>
                          <MenuItem>Explore Workshop</MenuItem>
                        </Link>

                      </MenuList>
                    </Menu>



                    <Menu placement="right-start" offset={15}>
                      <MenuHandler>
                        <MenuItem>Blog</MenuItem>
                      </MenuHandler>
                      <MenuList className='bg-[#122222] text-yellow-400'>

                        <Link to={'blog/new'}>
                          <MenuItem>Create Blog Post</MenuItem>
                        </Link>

                        <Link to={'blog/me'}>
                          <MenuItem>My Blog</MenuItem>
                        </Link>

                        <Link to={'blogs'}>
                          <MenuItem>Blogs</MenuItem>
                        </Link>

                      </MenuList>
                    </Menu>

                    <Menu placement="right-start" offset={15}>
                      <MenuHandler>
                        <MenuItem>Rental Bikes</MenuItem>
                      </MenuHandler>
                      <MenuList className='bg-[#122222] text-yellow-400'>

                        <Link to={'/create-rental-bike'}>
                          <MenuItem>Create rental ad</MenuItem>
                        </Link>

                        <Link to={'/rental-bikes/me'}>
                          <MenuItem>My ads</MenuItem>
                        </Link>

                        <Link to={'/rental-bikes'}>
                          <MenuItem>Explore rental bikes</MenuItem>
                        </Link>

                      </MenuList>
                    </Menu>


                  </MenuList>
                </Menu>
              </li>

              <li>
                <Link to="/brands" className="block py-2 pl-3 pr-2 hover:bg-[#122222] text-gray-900 rounded hover:text-yellow-400 md:hover:bg-transparent md:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105">Brands</Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 pl-3 pr-2 hover:bg-[#122222] text-gray-900 rounded hover:text-yellow-400 md:hover:bg-transparent md:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>

  );
}

export default Header;




