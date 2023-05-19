/** @format */

import { useContext } from "react";
import AddressContext from "../context/AddressesProvider";

export const useAddresses = () => {
  return useContext(AddressContext);
};
