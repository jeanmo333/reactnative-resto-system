/** @format */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getTokenStorage } from "../utils/token";
import Toast from "react-native-root-toast";
import clientAxios from "../config/axios";

const AddressContext = createContext();
const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(categories);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getAddresses();

    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setToken(token);
      } else {
        setToken(null);
      }
    })();
  }, [token]);

  // console.log("====================================");
  // console.log(token);
  // console.log("====================================");

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

  const getAddresses = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data } = await clientAxios.get("/addresses", config);
      setAddresses(data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const getAddress = async (id) => {
    try {
      setLoading(true);
      const { data } = await clientAxios.get(`/addresses/${id}`, config);
      setLoading(false);

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
      setLoading(true);
      const { data } = await clientAxios.post("/addresses", address, config);
      const { newAddress } = data;
      setAddresses([...addresses, newAddress]);
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

  const updateAddress = async (idAddress, address) => {
    try {
      setLoading(true);
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
        loading,
        setAddresses,
        getAddresses,
        setLoading,
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
