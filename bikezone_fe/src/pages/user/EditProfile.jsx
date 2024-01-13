import * as yup from "yup";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../shared/Loader"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateProfile } from "../../features/auth/auth.thunk";
import { loadUser } from "../../features/auth/auth.thunk";
import { useEffect, useState } from "react";
import { reset } from "../../features/auth/auth.slice";
import MetaData from "../../components/MetaData";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object({
    firstname: yup.string().required('firstname is required'),
    lastname: yup.string().required('lastname is required'),
    email: yup.string().email('Invalid email').required('email is required'),
});


const EditProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, message, isUpdate, isSuccess } = useSelector((state) => state.auth)

    const initialValues = {
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
    };

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: schema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                try {
                    const formData = new FormData();
                    formData.append('file', image);
                    formData.append('upload_preset', 'preset_images');
                    const cloudinaryResponse = await axios.post(
                        'https://api.cloudinary.com/v1_1/dqe7trput/image/upload',
                        formData
                    );
                    const imageUrl = cloudinaryResponse.data.secure_url;
                    values.imageURL = imageUrl;
                    await dispatch(updateProfile(values))
                    if (isUpdate) {
                        dispatch(loadUser())
                    }
                    action.resetForm();
                } catch (error) {
                    toast.error('Image upload failed.');
                }
            },

        });


    useEffect(() => {
        if (isError) {
            toast.error(message);
            console.log(message)
            dispatch(reset())
        }
        if (isUpdate) {
            toast.success(message);
            dispatch(reset())
            navigate('/account')
        }

    }, [isError, isUpdate])


    if (isLoading) {
        return (
            <>
                <Loader />
            </>
        )
    }



    return (
        <>
            <MetaData title={"update profile"} />

            <div className="min-h-screen bg-[#d0d1d1] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Edit Profile
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-[#b6b6b6]  py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id='firstname'
                                        name='firstname'
                                        value={values.firstname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md bg-gray-100"
                                    />
                                    {errors.firstname && touched.firstname ? (
                                        <p className="text-red-600 animate-pulse">{errors.firstname}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id='lastname'
                                        name='lastname'
                                        value={values.lastname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md bg-gray-100"
                                    />
                                    {errors.lastname && touched.lastname ? (
                                        <p className="text-red-600 animate-pulse">{errors.lastname}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        name='email'
                                        type="email"
                                        id='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  rounded-md bg-gray-100"
                                    />
                                    {errors.email && touched.email ? (
                                        <p className="text-red-600 animate-pulse">{errors.email}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Upload Image
                                </label>
                                <div className="mt-1">
                                    <input
                                        type='file'
                                        id='avatar'
                                        name='avatar'
                                        onChange={handleImageChange}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  rounded-md bg-gray-100"
                                    />
                                    {image && (
                                        <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(image)} alt="Rounded avatar" />
                                    )}
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex hover:text-yellow-400 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#122222]"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Link to={`/account`}>
                    <button className="bg-[#122222] m-4 text-white hover:text-yellow-400 px-4 py-2 rounded-md mt-4">
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
};

export default EditProfile;
