/** @format */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getTokenStorage } from "../utils/token";
import Toast from "react-native-root-toast";
import mime from "mime";
import clientAxios from "../config/axios";

const CategoryContext = createContext();
const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [searchCategoriesResult, setSearchCategoriesResult] = useState([]);
  const [numberOfCategories, setNumberOfCategories] = useState(0);

  const [tokenCategory, setTokenCategory] = useState(null);

  useEffect(() => {
    getCategories();

    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setTokenCategory(token);
      } else {
        setTokenCategory(null);
      }
    })();
  }, [tokenCategory]);

  const configWithToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
      Authorization: `Bearer ${tokenCategory}`,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenCategory}`,
    },
  };

  const getCategories = async () => {
    try {
      if (!tokenCategory) {
        setLoadingCategory(false);
        return;
      }

      setLoadingCategory(true);
      const { data } = await clientAxios.get("/categories", config);
      setCategories(data.categories);
      setSearchCategoriesResult(data.categories);
      setNumberOfCategories(data.numberOfCategories);
      setLoadingCategory(false);
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
      setLoadingCategory(true);
      const { data } = await clientAxios.get(`/categories/${id}`, config);
      setLoadingCategory(false);

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

  const addCategory = async (category) => {
    try {
      setLoadingCategory(true);
      const { data } = await clientAxios.post("/categories", category, config);
      const { newCategory } = data;
      setCategories([...categories, newCategory]);
      setLoadingCategory(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingCategory(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const updateCategory = async (idCategory, category) => {
    try {
      setLoadingCategory(true);
      const { data } = await clientAxios.patch(
        `/categories/${idCategory}`,
        category,
        config
      );
      const { categoryUpdate } = data;
      const categoriesEdit = categories.map((categoryState) =>
        categoryState.id === categoryUpdate.id ? categoryUpdate : categoryState
      );
      setCategories(categoriesEdit);
      setLoadingCategory(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingCategory(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const deleteCategory = async (id) => {
    if (!tokenCategory) {
      setLoadingCategory(false);
      return;
    }

    try {
      const { data } = await clientAxios.delete(`/categories/${id}`, config);
      const categoriesUpdate = categories.filter(
        (categoriesState) => categoriesState.id !== id
      );
      setCategories(categoriesUpdate);

      Toast.show(data.message, {
        position: Toast.positions.CENTER,
      });
      return;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setLoading(false);
        Toast.show(error.response.data.message, {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loadingCategory,
        searchCategoriesResult,
        numberOfCategories,
        setCategories,
        setSearchCategoriesResult,
        getCategories,
        setLoadingCategory,
        addCategory,
        setTokenCategory,
        getCategory,
        tokenCategory,
        updateCategory,
        deleteCategory,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider };

export default CategoryContext;
