/** @format */

import { useContext } from "react";
import CategoryContext from "../context/CategoriesProvider";

export const useCategories = () => {
  return useContext(CategoryContext);
};
