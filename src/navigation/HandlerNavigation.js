/** @format */

import React from "react";
import useAuth from "../hooks/useAuth";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";

export function HandlerNavigation() {
  const { auth, error } = useAuth();

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
