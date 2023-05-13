/** @format */

import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";
import { getTokenStorage, removeTokenStorage } from "../utils/token";
import { TOKEN } from "../utils/constants";

import axios from "axios";
import mime from "mime";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(true);

  // const navigation = useNavigation();

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

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    authenticateUser();

    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setToken(token);
      } else {
        setToken(null);
      }
    })();
  }, [token, error]);

  const authenticateUser = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await clientAxios.get("/users/profile", config);
      setAuth(data);
      setError(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await AsyncStorage.removeItem(TOKEN);
        setError(true);
        setToken(null);
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
      setError(false);
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

  const updateProfileWithImage = async (archive, user) => {
    let dataForm = new FormData();
    dataForm.append("archive", {
      uri: archive,
      name: archive.split("/").pop(),
      type: mime.getType(archive),
    });
    dataForm.append("user", JSON.stringify(user));
    try {
      setLoading(true);
      const { data } = await clientAxios.put(
        "/users/update-profile-with-image",
        dataForm,
        configWithToken
      );
      setAuth(data.userUpdate);
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

  const updateProfileWithoutImage = async (user) => {
    try {
      setLoading(true);
      const { data } = await clientAxios.put(
        "/users/update-profile-without-image",
        user,
        config
      );
      setAuth(data.userUpdate);
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

  const updatePassword = async (dataPassword) => {
    try {
      setLoading(true);
      const { data } = await clientAxios.put(
        "/users/update-password",
        dataPassword,
        config
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

  //cerrar secion
  const logout = async () => {
    if (auth) {
      await AsyncStorage.removeItem(TOKEN);
      setToken(null);
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        token,
        error,
        setLoading,
        setAuth,
        loading,
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
