/** @format */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getTokenStorage } from "../utils/token";
import Toast from "react-native-root-toast";
import clientAxios from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../utils/constants";

const AddressContext = createContext();
const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [tokenAddress, setTokenAddress] = useState(null);

  useEffect(() => {
    getAddresses();

    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setTokenAddress(token);
      } else {
        setTokenAddress(null);
      }
    })();
  }, [tokenAddress]);

  // console.log("====================================");
  // console.log(token);
  // console.log("====================================");

  const configWithToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
      Authorization: `Bearer ${tokenAddress}`,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAddress}`,
    },
  };

  const getAddresses = async () => {
    try {
      if (!tokenAddress) {
        setLoadingAddress(false);
        return;
      }

      setLoadingAddress(true);
      const { data } = await clientAxios.get("/addresses", config);
      setAddresses(data);
      setLoadingAddress(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await AsyncStorage.removeItem(TOKEN);
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const getAddress = async (id) => {
    try {
      setLoadingAddress(true);
      const { data } = await clientAxios.get(`/addresses/${id}`, config);
      setLoadingAddress(false);

      return {
        error: false,
        message: data.message,
        address: data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const addAddress = async (address) => {
    try {
      setLoadingAddress(true);
      const { data } = await clientAxios.post("/addresses", address, config);
      const { newAddress } = data;
      setAddresses([...addresses, newAddress]);
      setLoadingAddress(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingAddress(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const updateAddress = async (idAddress, address) => {
    try {
      setLoadingAddress(true);
      const { data } = await clientAxios.patch(
        `/addresses/${idAddress}`,
        address,
        config
      );
      const { addressUpdate } = data;
      const addressesEdit = addresses.map((addressState) =>
        addressState.id === addressUpdate.id ? addressUpdate : addressState
      );
      setAddresses(addressesEdit);
      setLoadingAddress(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingAddress(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await clientAxios.delete(`/addresses/${id}`, config);
      const addressesUpdate = addresses.filter(
        (addressesState) => addressesState.id !== id
      );
      setAddresses(addressesUpdate);
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
    <AddressContext.Provider
      value={{
        addresses,
        loadingAddress,
        setTokenAddress,
        setAddresses,
        getAddresses,
        setLoadingAddress,
        addAddress,
        getAddress,
        updateAddress,
        deleteAddress,
      }}>
      {children}
    </AddressContext.Provider>
  );
};

export { AddressProvider };

export default AddressContext;
