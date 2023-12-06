import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import Select from 'react-select'
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createRentBike, getDetailRentBike, updateMyRentBike } from '../../features/rentbike/rentbike.thunk';
import { reset } from '../../features/rentbike/rentbike.slice';
import axios from 'axios';


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
            const pakistanNumberRegex = /^(\+92|92|0)?[3456789]\d{9}$/;
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
    console.log(rentBike)

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

                    console.log(values)
                    await dispatch(updateMyRentBike({ values, id }))

                } catch (error) {
                    console.log(error)

                }
            },
        });


    const options = [
        { value: 'new', label: 'New' },
        { value: 'used', label: 'Used' },
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
                                <button className=" text-yellow-400 active:bg-yellow-400  border border-b-2 border-yellow-400 hover:border font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                    Settings
                                </button>
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
                                            <input
                                                type='text'
                                                id='contact'
                                                name='contact'
                                                value={values.contact}
                                                onChange={handleChange}
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
                                                value={values.availableFromDate}
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
                                            {errors.condition && touched.condition ? (
                                                <p className="text-red-600 animate-pulse">{errors.condition}</p>
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
                                    <div className='flex justify-center w-full'>
                                        <button
                                            type="submit"
                                            className="flex justify-center bg-gray-400 uppercase tracking-wider hover:tracking-[6px] font-bold rounded-md px-4 py-2 border-2 border-b-4 border-black  transition-all  hover:bg-[#122222] w-1/3 hover:w-1/2 hover:text-yellow-400 duration-500"
                                        >
                                            SUBMIT
                                        </button>
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