import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../../features/product/product.slice';
import { createProduct } from '../../../features/product/product.thunk';
import axios from 'axios';

const schema = yup.object({
    name: yup.string().required('Product name is required'),
    price: yup
        .number().min(50)
        .typeError('price must be a number')
        .required('price is required'),
    category: yup
        .string()
        .required('category is required'),
    brand: yup.string().required('brand is required'),
    Stock: yup
        .number().min(0)
        .typeError('stock must be a number')
        .required('stock is required'),
    description: yup.string().min(30).required('Description is required'),
    images: yup.array().min(1, 'At least one image is required').required('Image(s) is required'),

});

function AddProduct() {

    const dispatch = useDispatch()


    const { isError, isSuccess, message } = useSelector((state) => state.product)


    useEffect(() => {
        if (isError) {
            // toast.error(message)
            dispatch(reset())
        }
    }, [isError])

    const initialValues = {
        name: "",
        price: "",
        category: "",
        brand: "",
        Stock: "",
        description: "",
        images: [], // Use an array to store multiple images

    };

    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);

        // Update form values
        setFieldValue('images', fileArray);

        // Update preview images for display
        setPreviewImages(fileArray.map(file => URL.createObjectURL(file)));
    };

    const { values, handleBlur, handleChange, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                try {
                    const imageUrls = await Promise.all(
                        values.images.map(async (image) => {
                            const formData = new FormData();
                            formData.append('file', image);
                            formData.append('upload_preset', 'preset_images'); // Replace with your Cloudinary upload preset
                            const cloudinaryResponse = await axios.post(
                                'https://api.cloudinary.com/v1_1/dqe7trput/image/upload',
                                formData
                            );
                            return cloudinaryResponse.data.secure_url;
                        })
                    );

                    // Add the Cloudinary image URLs to the form data
                    values.images = imageUrls;


                    console.log(values)
                    await dispatch(createProduct(values))
                } catch (error) {
                    console.log(error)
                }
            },
        });

    return (
        <>
            <div className='flex w-[100%] '>

                <SideBar />

                <div className=" shadow-md rounded w-full px-8 pt-2 pb-8 bg-gray-100">
                    <div className="max-w-4xl p-6 mx-auto bg-gray-200 rounded-md shadow-md dark:bg-gray-800 mt-10">
                        <h1 className="text-xl mb-4 font-bold text-black capitalize dark:text-white">Post Your Product</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt- sm:grid-cols-2">
                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="username">Product Name</label>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        id="name" type="text" placeholder='Enter your product name' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                    {errors.name && touched.name ? (
                                        <p className="text-red-600 animate-pulse">{errors.name}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="emailApriceddress">Price (Rs)</label>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        id="price" type="number" placeholder='Enter price e.g. 500' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                    {errors.price && touched.price ? (
                                        <p className="text-red-600 animate-pulse">{errors.price}</p>
                                    ) : null}
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Category</label>
                                    <select
                                        name='category'
                                        id='category'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.category}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    >
                                        <option value="" disabled hidden>Select Category</option>
                                        <option value={'Motorbike Parts'}>Motorbike Parts</option>
                                        <option value={'Motorbike Accessories'}>Motorbike Accessories</option>
                                        <option value={'Maintenance and Care'}>Maintenance and Care</option>
                                        <option value={'Riding Apparel'}>Riding Apparel</option>
                                        <option value={'Performance Upgrades'}>Performance Upgrades</option>
                                        <option value={'OEM Parts'}>OEM (Original Equipment Manufacturer) Parts</option>
                                        <option value={'Specialty and Customization'}>Specialty and Customization</option>
                                    </select>
                                    {errors.category && touched.category ? (
                                        <p className="text-red-600 animate-pulse">{errors.category}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Brand</label>
                                    <select
                                        name='brand'
                                        id='brand'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.brand}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    >
                                        <option value="" disabled hidden>Select Brand</option>
                                        <option value={'Honda'}>Honda</option>
                                        <option value={'Suzuki'}>Suzuki</option>
                                        <option value={'Road Prince'}>Road Prince</option>
                                        <option value={'United'}>United</option>
                                        <option value={'Yamaha'}>Yamaha</option>
                                        <option value={'Super Star'}>Super Star</option>
                                        <option value={'Super Power'}>Super Power</option>
                                        <option value={'Crown'}>Crown</option>
                                        <option value={'Eagle'}>Eagle</option>
                                    </select>
                                    {errors.brand && touched.brand ? (
                                        <p className="text-red-600 animate-pulse">{errors.brand}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="emailApriceddress">Stock</label>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.Stock}
                                        id="Stock" type="number" name='Stock' placeholder='Enter stock e.g. 20' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                                    {errors.Stock && touched.Stock ? (
                                        <p className="text-red-600 animate-pulse">{errors.Stock}</p>
                                    ) : null}
                                </div>

                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="">Upload Image</label>

                                    <input
                                        type="file"
                                        id="file-upload"
                                        name="file-upload"
                                        onChange={handleImageChange}
                                        className="block w-full px-4  mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        multiple  // Allow multiple files to be selected
                                    />

                                    <div className='flex gap-x-2'>
                                        {/* Display preview images */}
                                        {previewImages.map((url, index) => (
                                            <img key={index} src={url} alt={`Preview ${index + 1}`} className="w-8 h-8 object-cover rounded-md mr-2 mt-2" />
                                        ))}
                                    </div>
                                </div>


                                <div>
                                    <label className="text-black dark:text-gray-200" htmlFor="passwordConfirmation">Description</label>
                                    <textarea
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        id="description" name='description' rows={6} placeholder='Enter product description' type="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
                                    {errors.description && touched.description ? (
                                        <p className="text-red-600 animate-pulse">{errors.description}</p>
                                    ) : null}
                                </div>
                                {/* ===================== */}



                            </div>
                            <div className="flex justify-end mt-6">
                                <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#122222] rounded-md  focus:outline-none focus:bg-gray-600">Upload</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    );
}

export default AddProduct;
