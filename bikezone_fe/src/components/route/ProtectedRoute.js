import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate()
  const { isLoading, isSuccess, user } = useSelector((state) => state.user);

  return (
    <>
      {isLoading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isSuccess === false) {
              navigate("/login")
              return null
            }
            // if (user.role !== "admin") {
            //   return <Redirect to="/login" />;
            // }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;