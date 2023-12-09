import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../pages/shared/Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reset } from "../../features/auth/auth.slice";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();

  const { user, message, isLoading, isError } = useSelector((state) => state.auth);

  const { Component, isAdmin } = props;

  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  
  useEffect(() => {
    const checkUserPermissions = () => {
      if (!user && !isLoading) {
        // Redirect to login page if not logged in
        navigate('/login');
      } else if (user && user.role !== 'admin' && isAdmin === true) {
        // Redirect to login page if not an admin (optional, adjust as needed)
        navigate('/login');
      } else {
        setIsUserLoaded(true);
      }
    };

    checkUserPermissions();

    // If user is not loaded, wait for user to load before checking permissions
    if (isLoading) {
      setIsUserLoaded(false);
    }

  }, [user, isLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
      // Redirect to login page if there is an error (optional, adjust as needed)
      navigate('/login');
    }
  }, [isError, message, dispatch, navigate]);

  return (
    <>
      {isLoading || !isUserLoaded ? (<Loader />) : (<Component />)}
    </>
  );
};

export default ProtectedRoute;
