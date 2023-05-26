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
  const [loadingPlate, setLoadingPlate] = useState(false);
  const [searchPlatesResult, setSearchPlatesResult] = useState([]);
  const [numberOfPlates, setNumberOfPlates] = useState(0);
  const [tokenPlate, setTokenPlate] = useState(null);

  // console.log("====================================");
  // console.log(plates);
  // console.log("====================================");
  useEffect(() => {
    getPlates();
    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setTokenPlate(token);
      } else {
        setTokenPlate(null);
      }
    })();
  }, [tokenPlate]);

  const configWithToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
      Authorization: `Bearer ${tokenPlate}`,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenPlate}`,
    },
  };

  const getPlates = async () => {
    try {
      if (!tokenPlate) {
        setLoadingPlate(false);
        return;
      }

      setLoadingPlate(true);
      const { data } = await clientAxios.get("/plates", config);
      setPlates(data.plates);
      setSearchPlatesResult(data.plates);
      setNumberOfPlates(data.numberOfPlates);
      setLoadingPlate(false);
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
      setLoadingPlate(true);
      const { data } = await clientAxios.get(`/plates/${id}`, config);
      setLoadingPlate(false);

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

  const getPlateByCategory = async (category) => {
    try {
      setLoadingPlate(true);
      const { data } = await clientAxios.get(
        `/plates/findall-bycategory/${category}`,
        config
      );
      setLoadingPlate(false);

      return {
        error: false,
        message: data.message,
        plates: data,
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
      setLoadingPlate(true);
      const { data } = await clientAxios.post(
        "/plates",
        dataForm,
        configWithToken
      );
      const { plateSave } = data;
      setPlates([...plates, plateSave]);
      setLoadingPlate(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingPlate(false);
      if (axios.isAxiosError(error)) {
        setLoadingPlate(false);

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
      setLoadingPlate(true);
      const { data } = await clientAxios.patch(`/plates/${id}`, plate, config);
      const { plateUpdate } = data;
      const platesEdit = plates.map((plateState) =>
        plateState.id === plateUpdate.id ? plateUpdate : plateState
      );
      setPlates(platesEdit);
      setLoadingPlate(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingPlate(false);
      if (axios.isAxiosError(error)) {
        setLoadingPlate(false);

        return {
          message: error.response.data.message,
          error: true,
        };
      }
    }
  };

  const deletePlate = async (id) => {
    try {
      const { data } = await clientAxios.delete(`/plates/${id}`, config);
      const platesUpdate = plates.filter(
        (platesState) => platesState.id !== id
      );
      setPlates(platesUpdate);

      Toast.show(data.message, {
        position: Toast.positions.CENTER,
      });
      return;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setLoadingPlate(false);
        Toast.show(error.response.data.message, {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  return (
    <PlateContext.Provider
      value={{
        plates,
        loadingPlate,
        searchPlatesResult,
        numberOfPlates,
        setPlates,
        setTokenPlate,
        setSearchPlatesResult,
        getPlates,
        setLoadingPlate,
        addPlate,
        getPlate,
        updatePlate,
        deletePlate,
        getPlateByCategory,
      }}>
      {children}
    </PlateContext.Provider>
  );
};

export { PlateProvider };

export default PlateContext;
