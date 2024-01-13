import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getNewArrivalProducts } from '../../features/product/product.thunk'
import Loader from '../shared/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reset } from '../../features/product/product.slice'
import Pagination from "react-js-pagination"
import { Slider, Typography } from '@mui/material';
import MetaData from '../../components/MetaData'


const categories = [
  "Motorbike Parts",
  "Motorbike Accessories",
  "Maintenance and Care",
  "Performance Upgrades",
  "Riding Apparel",
  "OEM Parts",
  "Specialty and Customization"
];

const FeaturedProductsPage = () => {


  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 2500])
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    dispatch(getNewArrivalProducts())
  }, [])

  const { isError, isLoading, message, products, productsCount, resultPerPage } = useSelector((state) => state.product)
  const { newArrival, isLoading: loading } = useSelector((state) => state.product)



  useEffect(() => {
    dispatch(getAllProducts({ keyword, currentPage, price, category, ratings }))
  }, [keyword, currentPage, price, category, ratings])


  useEffect(() => {
    if (isError) {
      toast.error();
      dispatch(reset())
    }

  }, [message])

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim() === '') {
      // If the input is empty, fetch all products
      dispatch(getAllProducts({ keyword, currentPage, price, category, ratings }));
    } else {
      // If the input is not empty, fetch products based on the keyword
      dispatch(getAllProducts({ keyword, currentPage, price, category, ratings }));
    }

  }

  return (
    <>
      <MetaData title={"PRODUCTS -- BIKEZONE"} />


      <div className='flex md:mx-0 px-20 md:justify-start min-h-screen justify-center bg-[#d0d1d1] '>

        <div className='  '>

          <div className="  px-2 py-8 ">

            <form onSubmit={searchSubmitHandler} className="mb-4 flex items-center gap-x-2">
              <input
                value={keyword}
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 rounded-md border-2 bg-[#ececec] border-black focus:outline-none "
              />

              <button type="submit" className='px-3 py-2 border-[#122222] border border-b-2 my-2 hover:text-yellow-400 hover:bg-[#122222] hover:rounded-md duration-200'>Submit</button>

            </form>

            {
              isLoading ? (<Loader />) : (
                <>
                  <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
                  {/* Show error toast when isError is true */}

                  <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-5">
                    {products &&
                      products?.map((product) => {

                        const newArrive = newArrival?.some((newArrivalItem) => newArrivalItem._id === product._id);
                        console.log(newArrive)
                        // Check if the product is a new arrival

                        return (
                          <ProductCard key={product._id} product={product} newArrive={newArrive ? "newArrive" : null} />
                        )
                      })
                    }
                  </div>
                </>
              )
            }

          </div>

          <div className='md:w-1/5 border-2 border-black  md:absolute static right-0 p-3 mx-4 top-64 '>
            <div className='  my-2 '>
              <h1 className="font-semibold text-black"> Price</h1>
              <Slider
                // className='text-yellow-400 bg-yellow-400'
                color='warning'
                getAriaLabel={() => ''}
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                disableSwap
                min={0}
                max={50000}
              />
            </div>
            <div className=' border border-black p-2 my-2'>
              <h1 className="font-semibold border-b border-black  text-black"> Categories</h1>
              <ul className="categoryBox">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="category-link cursor-pointer hover:bg-[#122222] hover:text-yellow-400 hover:p-1 hover:tracking-wide duration-200"
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
                color='warning'
              />
            </fieldset>
          </div>

          {
            resultPerPage < productsCount && (

              <div className='flex justify-center py-4'>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item px-4 py-2"
                  linkClass="page-link"
                  innerClass="flex" // Apply Tailwind styles for the parent container
                  activeClass="bg-[#122222] text-yellow-400" // Apply styles for the active page
                  itemClassPrev="border border-black rounded  hover:bg-[#122222] hover:text-yellow-400" // Apply styles for previous page
                  itemClassNext="border border-black rounded  hover:bg-[#122222] hover:text-yellow-400" // Apply styles for next page
                  itemClassFirst="border border-black rounded  hover:bg-[#122222] hover:text-yellow-400" // Apply styles for first page
                  itemClassLast="border border-black rounded  hover:bg-[#122222] hover:text-yellow-400" // Apply styles for last page
                />

              </div>
            )
          }

        </div>
      </div>
    </>

  )
}

export default FeaturedProductsPage