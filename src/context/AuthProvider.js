/** @format */

import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";
import { getTokenStorage } from "../utils/token";
import { TOKEN } from "../utils/constants";

import axios from "axios";
import mime from "mime";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [auth, setAuth] = useState(null);
  const [tokenAuth, setTokenAuth] = useState(null);
  const [error, setError] = useState(true);

  const configWithToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
      Authorization: `Bearer ${tokenAuth}`,
    },
  };

  const configWithOutToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAuth}`,
    },
  };

  useEffect(() => {
    authenticateUser();

    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setTokenAuth(token);
      } else {
        setTokenAuth(null);
      }
    })();
  }, [tokenAuth, error]);

  const authenticateUser = async () => {
    try {
      if (!tokenAuth) {
        setLoadingAuth(false);
        return;
      }
      const { data } = await clientAxios.get("/users/profile", config);
      setAuth(data);
      setError(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await AsyncStorage.removeItem(TOKEN);
        setError(true);
        setTokenAuth(null);
        setAuth(null);
        Toast.show("Su session ha expirada", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const register = async (archive, user) => {
    let dataForm = new FormData();
    dataForm.append("archive", {
      uri: archive,
      name: archive.split("/").pop(),
      type: mime.getType(archive),
    });
    dataForm.append("user", JSON.stringify(user));
    try {
      setLoadingAuth(true);
      const { data } = await clientAxios.post(
        "/users",
        dataForm,
        configWithOutToken
      );
      setLoadingAuth(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingAuth(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const login = async (user) => {
    try {
      setLoadingAuth(true);
      const { data } = await clientAxios.post("/users/login", user);
      setError(false);
      setLoadingAuth(false);
      return {
        data,
        error: false,
      };
    } catch (error) {
      setLoadingAuth(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const updateProfileWithImage = async (archive, user) => {
    let dataForm = new FormData();
    dataForm.append("archive", {
      uri: archive,
      name: archive.split("/").pop(),
      type: mime.getType(archive),
    });
    dataForm.append("user", JSON.stringify(user));
    try {
      setLoadingAuth(true);
      const { data } = await clientAxios.put(
        "/users/update-profile-with-image",
        dataForm,
        configWithToken
      );
      setAuth(data.userUpdate);
      setLoadingAuth(false);
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

  const updateProfileWithoutImage = async (user) => {
    try {
      setLoadingAuth(true);
      const { data } = await clientAxios.put(
        "/users/update-profile-without-image",
        user,
        config
      );
      setAuth(data.userUpdate);
      setLoadingAuth(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingAuth(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const updatePassword = async (dataPassword) => {
    try {
      setLoadingAuth(true);
      const { data } = await clientAxios.put(
        "/users/update-password",
        dataPassword,
        config
      );
      setLoadingAuth(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingAuth(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  //cerrar secion
  const logout = async () => {
    if (auth) {
      await AsyncStorage.removeItem(TOKEN);
      setTokenAuth(null);
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        tokenAuth,
        error,
        setLoadingAuth,
        setAuth,
        setTokenAuth,
        loadingAuth,
        register,
        login,
        logout,
        updateProfileWithImage,
        updateProfileWithoutImage,
        authenticateUser,
        updatePassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
