/** @format */

import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import ScreenLoading from "../components/ScreenLoading";

export function HandlerNavigation() {
  const { auth, authenticateUser, token, error } = useAuth();

  //console.log(error);

  useEffect(() => {
    authenticateUser();
  }, [token, error]);

  // console.log("handle  " + JSON.stringify(auth));

  // console.log("token  " + token);

  // if (auth === undefined) return null;

  return (
    <>
      {auth?.id && !error ? (
        <AppNavigation auth={auth} />
      ) : (
        <AuthNavigation auth={auth} />
      )}
    </>
  );
}
