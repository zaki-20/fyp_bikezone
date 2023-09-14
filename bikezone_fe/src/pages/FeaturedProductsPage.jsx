import React, { useEffect, useState } from 'react'
import ProductCard from '../components/cards/ProductCard'
// import { motorbikeProducts } from '../Utils/productData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/product.thunk'
import Loader from './shared/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reset } from '../features/product/product.slice'
import Pagination from "react-js-pagination"


const FeaturedProductsPage = () => {


  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { isError, isLoading, message, products, productsCount, resultPerPage } = useSelector((state) => state.product)
  console.log("jksjdsnknc", productsCount)

  useEffect(() => {
    dispatch(getAllProducts({ keyword, currentPage }))
  }, [dispatch, productsCount, resultPerPage, currentPage, keyword])


  // Function to show an error toast
  const showErrorToast = () => {
    toast.error(message);
    dispatch(reset())

  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim() === '') {
      // If the input is empty, fetch all products
      dispatch(getAllProducts({ keyword, currentPage }));
    } else {
      // If the input is not empty, fetch products based on the keyword
      dispatch(getAllProducts({ keyword, currentPage }));
    }
  }

  return (
    <>

      <div className='bg-[#def5f596]'>
        <div className="container mx-auto px-4 py-8 ">
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
                {isError && showErrorToast()} {/* Show error toast when isError is true */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                  {products &&
                    products?.map((product, index) => {
                      return (
                        <ProductCard key={index} product={product} />
                      )
                    })
                  }
                </div>
                <ToastContainer position='top-center' /> {/* Add ToastContainer at the end of your component */}

              </>
            )
          }

        </div>

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

      </div>
    </>

  )
}

export default FeaturedProductsPage