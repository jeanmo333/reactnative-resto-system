/** @format */

import { useContext } from "react";
import PlateContext from "../context/PlatesProvider";

export const usePlates = () => {
  return useContext(PlateContext);
};
