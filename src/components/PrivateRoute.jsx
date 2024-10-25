import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return userLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}