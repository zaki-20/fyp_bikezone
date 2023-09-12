import React, { useEffect } from 'react'
import ProductCard from '../components/cards/ProductCard'
// import { motorbikeProducts } from '../Utils/productData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/product.thunk'
import Loader from './shared/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeaturedProductsPage = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const { isError, isLoading, isSuccess, message, length, products } = useSelector((state) => state.product)
  // Function to show an error toast
  const showErrorToast = () => {
    toast.error(message);
  };

  return (
    <>

      <div className='bg-[#def5f596]'>
        <div className="container mx-auto px-4 py-8 ">
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