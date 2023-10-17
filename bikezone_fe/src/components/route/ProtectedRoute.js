import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../pages/shared/Loader"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { reset } from "../../features/auth/auth.slice";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch()

  const { user, message, isLoading, isError } = useSelector((state) => state.auth)

  const { Component } = props

  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const savedToken = cookies.token;
    if (!savedToken) {
      navigate('/login')
    }
  }, [cookies]);

  //   useEffect(() => {
  //     if (isError) {
  //         toast.error(message);
  //         dispatch(reset())
  //     }


  // }, [isError])

  return (

    <>
      {
        isLoading ? (<Loader />) : (<Component />)
      }
    </>
  );
};

export default ProtectedRoute;