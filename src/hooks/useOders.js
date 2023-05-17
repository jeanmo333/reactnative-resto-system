/** @format */

import { useContext } from "react";
import OrderContext from "../context/OrdersProvider";

export const useOders = () => {
  return useContext(OrderContext);
};
