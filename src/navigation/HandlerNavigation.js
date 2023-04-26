/** @format */

import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import ScreenLoading from "../components/ScreenLoading";

export function HandlerNavigation() {
  const { auth, authenticateUser, token, loading } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, []);

  if (loading) return <ScreenLoading />;

  return token || auth?.id ? <AppNavigation /> : <AuthNavigation />;
}
