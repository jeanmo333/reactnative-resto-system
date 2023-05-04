/** @format */

import { createContext, useState } from "react";
import axios from "axios";
import { getTokenStorage } from "../utils/token";
import Toast from "react-native-root-toast";
import mime from "mime";
import clientAxios from "../config/axios";

const CategoryContext = createContext();
const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCategoriesResult, setSearchCategoriesResult] = useState([]);

  // console.log(categories);
  const [token, setToken] = useState(null);

  (async () => {
    const token = await getTokenStorage();
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  })();

  const configWithToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getCategories = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data } = await clientAxios.get("/categories", config);
      setCategories(data);
      setSearchCategoriesResult(data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const getCategory = async (id) => {
    try {
      setLoading(true);
      const { data } = await clientAxios.get(
        `/categories/${id}`,
        configWithToken
      );
      setLoading(false);

      return {
        error: false,
        message: data.message,
        category: data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const addCategory = async (archive, category) => {
    let dataForm = new FormData();
    dataForm.append("archive", {
      uri: archive,
      name: archive.split("/").pop(),
      type: mime.getType(archive),
    });
    dataForm.append("category", JSON.stringify(category));
    try {
      setLoading(true);
      const { data } = await clientAxios.post(
        "/categories",
        dataForm,
        configWithToken
      );
      const { newCategory } = data;
      setCategories([...categories, newCategory]);
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

  const updateCategory = async (id, archive, category) => {
    let dataForm = new FormData();
    dataForm.append("archive", {
      uri: archive,
      name: archive.split("/").pop(),
      type: mime.getType(archive),
    });
    dataForm.append("category", JSON.stringify(category));
    try {
      setLoading(true);
      const { data } = await clientAxios.patch(
        `/categories/${id}`,
        dataForm,
        configWithToken
      );
      const { categoryUpdate } = data;
      const categoriesEdit = categories.map((categoryState) =>
        categoryState.id === categoryUpdate.id ? categoryUpdate : categoryState
      );
      setCategories(categoriesEdit);
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

  const deleteCategory = async (id) => {
    try {
      await clientAxios.delete(`/categories/${id}`, config);
      const categoriesUpdate = categories.filter(
        (categoriesState) => categoriesState.id !== id
      );
      setCategories(categoriesUpdate);

      Toast.show("Eliminado con exito", {
        position: Toast.positions.CENTER,
      });
      return;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setLoading(false);
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        searchCategoriesResult,
        setCategories,
        setSearchCategoriesResult,
        getCategories,
        setLoading,
        addCategory,
        getCategory,
        updateCategory,
        deleteCategory,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider };

export default CategoryContext;
