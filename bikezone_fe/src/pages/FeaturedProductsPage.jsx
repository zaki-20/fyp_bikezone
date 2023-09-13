import React, { useEffect, useState } from 'react'
import ProductCard from '../components/cards/ProductCard'
// import { motorbikeProducts } from '../Utils/productData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/product.thunk'
import Loader from './shared/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom"
import { reset } from '../features/product/product.slice'
import Pagination from "react-js-pagination"


const FeaturedProductsPage = () => {

  // const {param1} = useParams()


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getAllProducts(keyword))
  }, [])

  const { isError, isLoading, message, products, resultPerPage } = useSelector((state) => state.product)
  
  // Function to show an error toast
  const showErrorToast = () => {
    toast.error(message);
    dispatch(reset())
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(getAllProducts(keyword))
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols3 xl:grid-cols-4 gap-5">

                  {products &&
                    products?.map((product, index) => {
                      return (
                        <ProductCard key={index} product={product} />
                      )
                    })
                  }
                </div>
                <div className="my-8  flex justify-center">
                  <nav aria-label="Page navigation example">
                    <ul class="inline-flex -space-x-px text-sm">
                      <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                      </li>
                      <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                      </li>
                      <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                      </li>
                      <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                      </li>
                      <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                      </li>
                      <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                      </li>
                      <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <ToastContainer position='top-center' /> {/* Add ToastContainer at the end of your component */}

              </>
            )
          }

        </div>

      </div>
    </>

  )
}

export default FeaturedProductsPage