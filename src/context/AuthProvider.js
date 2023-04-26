/** @format */

import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";
import { getTokenStorage } from "../utils/token";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState(null);

  (async () => {
    const token = await getTokenStorage();
    setToken(token);
  })();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await clientAxios.get("/users/profile", config);
      setLoading(false);
      setAuth(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
      }

      setAuth(undefined);
    }
  };

  const register = async (user) => {
    try {
      setLoading(true);
      const { data } = await clientAxios.post("/users", user);
      setLoading(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoading(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const login = async (user) => {
    try {
      setLoading(true);
      const { data } = await clientAxios.post("/users/login", user);
      setLoading(false);
      return {
        data,
        error: false,
      };
    } catch (error) {
      setLoading(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        token,
        setAuth,
        loading,
        register,
        login,
        authenticateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
