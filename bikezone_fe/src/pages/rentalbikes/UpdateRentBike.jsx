import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailRentBike, updateMyRentBike } from '../../features/rentbike/rentbike.thunk';
import { reset } from '../../features/rentbike/rentbike.slice';
import axios from 'axios';
import Input from 'react-phone-number-input/input'



const schema = yup.object({
    title: yup.string().required('Title is required'),
    email: yup.string().email('Invalid email format').required('Owner Email is required'),
    description: yup.string().required('Description is required'),
    rent: yup.number().required('rent is required').positive('rent must be a positive number'),
    model: yup.string().required('Model is required'),
    condition: yup.string().required('Condition is required'),
    address: yup.string().required('address is required'),
    city: yup.string().required('city is required'),
    contact: yup.string()
        .required('Contact is required')
        .test('is-pakistan-number', 'Invalid contact number', function (value) {
            // Use a regular expression to validate the Pakistan contact number format
            const pakistanNumberRegex = /^(\+92|92|0)?[3]\d{9}$/;
            return pakistanNumberRegex.test(value);
        }),
    availableFromDate: yup.date().required('Available from date is required')
        .test('is-future-date', 'Available from date must be today or later', function (value) {
            const selectedDate = new Date(value);
            const currentDate = new Date();

            // Set hours, minutes, seconds, and milliseconds to 0 for both dates
            currentDate.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            // Check if the selected date is today or later
            return selectedDate >= currentDate;
        }),
    isAvailable: yup.boolean().required('Availability is required'),
    images: yup.array().min(1, 'At least one image is required').required('Image(s) is required'),

});


const UpdateRentBike = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isError, isSuccess, message, isLoading, rentBike } = useSelector((state) => state.rentBike)

    useEffect(() => {
        dispatch(getDetailRentBike(id));
        console.log(rentBike)
    }, [dispatch, id]);


    const initialValues = {
        title: rentBike?.title || ``,
        email: rentBike?.email || '',
        description: rentBike?.description || '',
        model: rentBike?.model || '',
        condition: rentBike?.condition || '',
        address: rentBike?.address || '',
        contact: rentBike?.contact || '',
        city: rentBike?.city || '',
        rent: rentBike?.rent || '',
        availableFromDate: rentBike?.availableFromDate || '',
        isAvailable: rentBike?.isAvailable || '',
        images: rentBike?.images || '',
    }



    const [previewImages, setPreviewImages] = useState([]);
    const handleImageChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);

        // Update form values
        setFieldValue('images', fileArray);

        // Update preview images for display
        setPreviewImages(fileArray.map(file => URL.createObjectURL(file)));
    };


    useEffect(() => {
        if (isError) {
            // toast.error(message)
            dispatch(reset())
        }
    }, [isError])

    useEffect(() => {
        // Set initial preview images when rentBike changes
        if (rentBike && rentBike.images) {
            const initialImages = rentBike.images.map(image => {
                // Check if the item is a Blob or File
                if (image instanceof Blob || image instanceof File) {
                    return URL.createObjectURL(image);
                }
                // If it's not a Blob or File, handle accordingly (e.g., it might be a string URL)
                // Adjust this part based on the actual structure of your rentBike.images array
                return image;
            });
            setPreviewImages(initialImages);
        }
    }, [rentBike]);

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
                            formData.append('upload_preset', 'preset_images');
                            const cloudinaryResponse = await axios.post(
                                'https://api.cloudinary.com/v1_1/dqe7trput/image/upload',
                                formData
                            );
                            return cloudinaryResponse.data.secure_url;
                        })
                    );

                    // Add the Cloudinary image URLs to the form data
                    values.images = imageUrls;

                    await dispatch(updateMyRentBike({ values, id }))
                    if (isSuccess) {
                        navigate(`/rental-bikes/${id}`)
                    }
                } catch (error) {
                    console.log(error)

                }
            },
        });


    const options = [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
    ]
    const options2 = [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
    ];

    const handleSelectChange = (selectedOption) => {
        // Set the value in Formik state
        setFieldValue('condition', selectedOption.value);
    };

    const handleSelectChangeAvalability = (selectedOption) => {
        // Set the value in Formik state
        setFieldValue('isAvailable', selectedOption.value);
    };

    const date = new Date(values.availableFromDate);
    const formattedDate = date.toISOString().split('T')[0];

    return (
        <>
            <section className="py-1 bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600">

                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t text-yellow-400 bg-[#122222] mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="py-1 text-xl font-bold">
                                    Post Your Ad for Bike Rent
                                </h6>
                               
                            </div>
                        </div>
                        <div className="flex-auto px-4 bg-[#e6e6e6] lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSubmit}>

                                <div className="flex flex-wrap py-5">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Bike Title
                                            </label>
                                            <input
                                                id='title'
                                                name='title'
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                placeholder='enter your workshop name' className="border-0 border-b border-black px-3 py-3  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.title && touched.title ? (
                                                <p className="text-red-600 animate-pulse">{errors.title}</p>
                                            ) : null}
                                        </div>

                                    </div>

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                                                Owner's Email
                                            </label>
                                            <input
                                                id='email'
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="email"
                                                placeholder='enter your email' className="border-0 px-3 py-3 border-b border-black  placeholder-blueGray-300 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.email && touched.email ? (
                                                <p className="text-red-600 animate-pulse">{errors.email}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Model
                                            </label>
                                            <input
                                                id='model'
                                                name='model'
                                                value={values.model}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                placeholder='enter your model name' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.model && touched.model ? (
                                                <p className="text-red-600 animate-pulse">{errors.model}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full items-center gap-x-2 flex lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase  text-xs font-bold mb-2" htmlFor="grid-password">
                                                Upload photo
                                            </label>
                                            <input
                                                type="file"
                                                id="file-upload"
                                                name="file-upload"
                                                onChange={handleImageChange}
                                                multiple  // Allow multiple files to be selected
                                                className="border-0 px-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.images && touched.images ? (
                                                <p className="text-red-600 animate-pulse">{errors.images}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='w-full items-center gap-x-2 flex lg:w-6/12 px-4'>

                                        {/* Display preview images */}
                                        {previewImages.map((url, index) => (
                                            <img key={index} src={url} alt={`Preview ${index + 1}`} className="w-8 h-8 object-cover rounded-md mr-2 mt-2" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Address
                                            </label>
                                            <input
                                                id='address'
                                                name='address'
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text" placeholder='enter address' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.address && touched.address ? (
                                                <p className="text-red-600 animate-pulse">{errors.address}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                                                City
                                            </label>
                                            <input
                                                id='city'
                                                name='city'
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur} type="text" placeholder='enter workshop city' className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                            {errors.city && touched.city ? (
                                                <p className="text-red-600 animate-pulse">{errors.city}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Phone #
                                            </label>
                                          

                                            <Input
                                                country="PK"
                                                international
                                                withCountryCallingCode
                                                id='contact'
                                                name='contact'
                                                value={String(values.contact)}
                                                onChange={(value) => setFieldValue('contact', value)}
                                                onBlur={handleBlur}
                                                className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                            {errors.contact && touched.contact ? (
                                                <p className="text-red-600 animate-pulse">{errors.contact}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Rent per-day
                                            </label>
                                            <input
                                                type='number'
                                                id='rent'
                                                name='rent'
                                                value={values.rent}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                            {errors.rent && touched.rent ? (
                                                <p className="text-red-600 animate-pulse">{errors.rent}</p>
                                            ) : null}
                                        </div>
                                    </div>



                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Available From Date
                                            </label>
                                            <input
                                                type="date"
                                                id="availableFromDate"
                                                name="availableFromDate"
                                                defaultValue={formattedDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="border-0 px-3 py-3 border-b border-black bg-gray-100  rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                            {errors.availableFromDate && touched.availableFromDate ? (
                                                <p className="text-red-600 animate-pulse">{errors.availableFromDate}</p>
                                            ) : null}
                                        </div>
                                    </div>


                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Condition
                                            </label>
                                            <Select
                                                className="border-0 border-b border-black rounded text-sm shadow focus:outline-none focus:ring  w-full ease-linear transition-all duration-150"
                                                options={options}
                                                value={options.find((option) => option.value === values.condition)}
                                                onChange={handleSelectChange}
                                                onBlur={handleBlur}
                                                name="condition"
                                            />
                                            {errors.condition && touched.condition ? (
                                                <p className="text-red-600 animate-pulse">{errors.condition}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Available
                                            </label>
                                            <Select
                                                className="border-0 border-b border-black rounded text-sm shadow focus:outline-none focus:ring  w-full ease-linear transition-all duration-150"
                                                options={options2}
                                                value={options2.find((option) => option.value === values.isAvailable)}
                                                onChange={handleSelectChangeAvalability}
                                                onBlur={handleBlur}
                                                name="isAvailable"
                                            />
                                            {errors.isAvailable && touched.isAvailable ? (
                                                <p className="text-red-600 animate-pulse">{errors.isAvailable}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>



                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase  text-xs font-bold mb-2" htmlFor="grid-password">
                                                Description
                                            </label>
                                            <textarea
                                                id='description'
                                                name='description'
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='enter detailed description about workshop..' type="text" className="border-0 px-3 py-3 border-b border-black  bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows={4} />
                                            {errors.description && touched.description ? (
                                                <p className="text-red-600 animate-pulse">{errors.description}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                  

                                    <div className="flex justify-end w-full mt-4">
                                        <div className="w-1/2 px-3 mb-3">
                                            <button
                                                type="submit"
                                                className="flex relative items-center justify-center w-full hover:text-yellow-400 bg-[#122222] text-white rounded-lg h-12 font-semibold "
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <div role="status" className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className=''>UPDATE BIKE AD </span>
                                                    </>
                                                )
                                                }

                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default UpdateRentBike