/** @format */

import React, { useCallback, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import { useFocusEffect } from "@react-navigation/native";

export function HandlerNavigation() {
  const { auth, authenticateUser, token } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, []);

  // console.log("handle  " + JSON.stringify(auth));

  // console.log("token  " + token);

  return token || auth?.id ? (
    <AppNavigation auth={auth} />
  ) : (
    <AuthNavigation auth={auth} />
  );
}
