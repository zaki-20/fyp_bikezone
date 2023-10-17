import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../features/product/product.thunk'
import Loader from '../shared/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reset } from '../../features/product/product.slice'
import Pagination from "react-js-pagination"
import { Slider, Typography } from '@mui/material';
import MetaData from '../../components/MetaData'


const categories = [
  "bikeparts",
  "gears",
  "brakes",
  "engine",
  "lights",
  "tyres",
];

const FeaturedProductsPage = () => {


  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 2500])
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);


  const { isError, isLoading, message, products, productsCount, resultPerPage } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getAllProducts({ keyword, currentPage, price, category, ratings }))
  }, [])


  useEffect(() => {
    if (isError) {
      console.log(message, "featured products page")
      toast.error(message);
      dispatch(reset())
    }

  }, [isError, message, dispatch])

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


      <div className='flex md:mx-0 md:justify-start min-h-screen justify-center bg-[#def5f596] '>

        <div className=' md:w-3/4 '>
          <div className="  px-2 py-8 ">

            <form onSubmit={searchSubmitHandler} className="mb-4">
              <input
                value={keyword}
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />

              <button type="submit" className='px-3 py-2 border m-2'>Submit</button>

            </form>

            {
              isLoading ? (<Loader />) : (
                <>
                  <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
                  {/* Show error toast when isError is true */}

                  <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                    {products &&
                      products?.map((product) => {
                        return (
                          <ProductCard key={product._id} product={product} />
                        )
                      })
                    }
                  </div>
                </>
              )
            }

          </div>

          <div className='md:w-1/5 border-2 md:absolute static right-0 px-2 mx-4 top-64 '>
            <div className=' border-black my-2 '>
              <h1 className="font-semibold text-black"> Price</h1>
              <Slider
                getAriaLabel={() => ''}
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                disableSwap
                min={0}
                max={25000}
              />
            </div>
            <div className=' border my-2'>
              <h1 className="font-semibold text-black"> Categories</h1>
              <ul className="categoryBox">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="category-link"
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
                  activeClass="bg-blue-500 text-white" // Apply styles for the active page
                  itemClassPrev="border rounded  hover:bg-blue-500 hover:text-white" // Apply styles for previous page
                  itemClassNext="border rounded  hover:bg-blue-500 hover:text-white" // Apply styles for next page
                  itemClassFirst="border rounded  hover:bg-blue-500 hover:text-white" // Apply styles for first page
                  itemClassLast="border rounded  hover:bg-blue-500 hover:text-white" // Apply styles for last page
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