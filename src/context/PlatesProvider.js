/** @format */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getTokenStorage } from "../utils/token";
import Toast from "react-native-root-toast";
import mime from "mime";
import clientAxios from "../config/axios";

const PlateContext = createContext();
const PlateProvider = ({ children }) => {
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPlatesResult, setSearchPlatesResult] = useState([]);

  // console.log(categories);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getPlates();
    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setToken(token);
      } else {
        setToken(null);
      }
    })();
  }, [token]);

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

  const getPlates = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data } = await clientAxios.get("/plates", config);
      setPlates(data);
      setSearchPlatesResult(data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const getPlate = async (id) => {
    try {
      setLoading(true);
      const { data } = await clientAxios.get(`/plates/${id}`, config);
      setLoading(false);

      return {
        error: false,
        message: data.message,
        plate: data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const addPlate = async (archives, plate) => {
    let dataForm = new FormData();

    archives.forEach((archive) => {
      dataForm.append("archives", {
        uri: archive,
        name: archive.split("/").pop(),
        type: mime.getType(archive),
      });
    });
    dataForm.append("plate", JSON.stringify(plate));
    try {
      setLoading(true);
      const { data } = await clientAxios.post(
        "/plates",
        dataForm,
        configWithToken
      );
      const { plateSave } = data;
      setPlates([...plates, plateSave]);
      setLoading(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setLoading(false);

        return {
          message: error.response.data.message,
          error: true,
        };
      }
    }
  };

  const updatePlate = async (id, plate) => {
    // let dataForm = new FormData();
    // dataForm.append("archive", {
    //   uri: archive,
    //   name: archive.split("/").pop(),
    //   type: mime.getType(archive),
    // });
    // dataForm.append("plate", JSON.stringify(plate));
    try {
      setLoading(true);
      const { data } = await clientAxios.patch(`/plates/${id}`, plate, config);
      const { plateUpdate } = data;
      const platesEdit = plates.map((plateState) =>
        plateState.id === plateUpdate.id ? plateUpdate : plateState
      );
      setPlates(platesEdit);
      setLoading(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setLoading(false);

        return {
          message: error.response.data.message,
          error: true,
        };
      }
    }
  };

  const deletePlate = async (id) => {
    try {
      await clientAxios.delete(`/plates/${id}`, config);
      const platesUpdate = plates.filter(
        (platesState) => platesState.id !== id
      );
      setPlates(platesUpdate);

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
    <PlateContext.Provider
      value={{
        plates,
        loading,
        searchPlatesResult,
        setPlates,
        setSearchPlatesResult,
        getPlates,
        setLoading,
        addPlate,
        getPlate,
        updatePlate,
        deletePlate,
      }}>
      {children}
    </PlateContext.Provider>
  );
};

export { PlateProvider };

export default PlateContext;
