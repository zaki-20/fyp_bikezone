import React, { useEffect, useState } from 'react'
import { MdEventAvailable } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRentBikes } from '../../features/rentbike/rentbike.thunk';
import { Link } from 'react-router-dom';


const GetAllRentBikes = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, message, rentBikes } = useSelector((state) => state.rentBike)

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedDateOrder, setSelectedDateOrder] = useState(''); // 'asc' or 'desc'


  useEffect(() => {
    dispatch(getAllRentBikes())
  }, [])

  const filteredRentBikes = rentBikes
    .filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCity === '' || item.city.toLowerCase() === selectedCity.toLowerCase()) &&
      (selectedCondition === '' || item.condition.toLowerCase() === selectedCondition.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedDateOrder === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (selectedDateOrder === 'desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleConditionChange = (e) => {
    setSelectedCondition(e.target.value);
  };
  const handleDateOrderChange = (e) => {
    setSelectedDateOrder(e.target.value);
  };

  return (
    <div className='min-h-screen bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600 '>

      <h1 className='text-3xl font-semibold text-black text-center pt-5'>Explore your desired bike</h1>
      <div className='border-b border-black py-8 px-5'>
        <div className='md:flex items-center mx-10 md:mx-0'>
          <div class="relative md:w-1/2 mx-auto ">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="appearance-none bg-gray-200 border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Search by Title..."
            />
            <div class="absolute right-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div class="absolute left-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='md:flex items-center mx-10 md:mx-0'>
          <div className="relative md:w-1/4 mx-auto py-5">
            <span className='text-black'>Select Condition</span>

            <select
              value={selectedCondition}
              onChange={handleConditionChange}
              className="appearance-none bg-gray-200 border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            >
              <option value="">Default Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className="relative md:w-1/4 mx-auto py-5">
            <span className='text-black'>Select Date Order</span>

            <select
              value={selectedDateOrder}
              onChange={handleDateOrderChange}
              className="appearance-none bg-gray-200 border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            >
              <option value="">Default Date</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="relative md:w-1/4 mx-auto py-5">
            <span className='text-black'>Select City</span>

            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="appearance-none bg-gray-200 border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            >
              <option value="">Default City</option>
              {/* Add options dynamically based on available cities */}
              {
                rentBikes?.map(item => item?.city).filter((value, index, self) => self.indexOf(value) === index).map(city => <option key={city} value={city}>{city}</option>)
              }
            </select>
          </div>

        </div>
      </div>

      <div className='px-4 py-3'>
        <span className=''>{filteredRentBikes && filteredRentBikes.length} Results</span>
      </div>

      <div className="flex justify-center items-center py-5 mx-10">
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 space-y-4 md:space-y-0 ">

          {
            filteredRentBikes && filteredRentBikes.map((item, index) => (
              <>
                <div key={index} className="w-72 bg-[#e7e7e7ea] shadow-[inset_2px_0px_41px_8px_#00000008] px-6 pt-6 py-2 rounded-xl shadow-gray-400  transform hover:scale-105 hover:border hover:border-black transition duration-500">
                  <h3 className="mb-3 text-lg font-bold text-[#122222]">{item?.title}</h3>
                  <div className="relative">
                    <img className="w-full h-[180px] bg-center object-cover rounded-xl" src={item?.images[0]} alt="bike" />
                    <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">{item?.city}</p>
                  </div>
                  <h1 className="mt-2 text-gray-800 text-lg font-bold cursor-pointer">{item?.model}</h1>
                  <div className="my-2">
                    <div className="flex space-x-1 items-center text-sm ">

                      {
                        item.isAvailable ? (
                          <>
                            <div className='flex justify-between items-center w-full'>
                              <div className='flex items-center space-x-1'>
                                <span>
                                  <MdEventAvailable size={23} className='text-light-green-800' />
                                </span>
                                <p>Available</p>
                              </div>
                              <div>
                                <p>PKR {item?.rent} per-day</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className='flex justify-between items-center w-full'>
                              <div className='flex items-center space-x-1'>
                                <span>
                                  <CgUnavailable size={23} className='text-red-600' />
                                </span>
                                <p>Not Available</p>
                              </div>
                              <div>
                                <p>Rent {item?.rent}</p>
                              </div>
                            </div>
                          </>)
                      }

                    </div>

                    <div className="flex space-x-1 items-center text-sm mt-2">
                      <span>
                        <MdOutlineDoubleArrow size={23} className='' />
                      </span>
                      <p>{item?.condition} Condition</p>
                    </div>

                    <Link to={item?._id}>
                      <button className="mt-4 text-md w-full text-yellow-400 bg-[#122222] py-2 rounded-md shadow-lg">View Details</button>
                    </Link>

                  </div>
                </div >
              </>
            ))
          }


        </div>
      </div>

    </div >

  )
}

export default GetAllRentBikes