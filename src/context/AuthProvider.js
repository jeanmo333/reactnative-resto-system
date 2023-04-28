/** @format */

import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";
import { getTokenStorage, removeTokenStorage } from "../utils/token";
import axios from "axios";
import mime from "mime";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(null);

  (async () => {
    const token = await getTokenStorage();
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  })();

  // console.log("token  " + token);

  const configWithToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const configWithOutToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
    },
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    if (token === null) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await clientAxios.get("/users/profile", configWithToken);
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
    let dataForm = new FormData();
    dataForm.append("archive", {
      uri: user.image,
      name: user.image.split("/").pop(),
      type: mime.getType(user.image),
    });
    const { image, ...rest } = user;
    dataForm.append("user", JSON.stringify(rest));
    try {
      setLoading(true);
      const { data } = await clientAxios.post(
        "/users",
        dataForm,
        configWithOutToken
      );
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

  //cerrar secion
  const logout = async () => {
    await removeTokenStorage();
    setAuth(null);
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
        logout,
        authenticateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
