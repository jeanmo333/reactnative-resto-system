/** @format */

// import React from "react";
// import { Text } from "react-native-paper";

// export function Plates(props) {
//   return <Text>Products</Text>;
// }

/** @format */

import React, { useCallback, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { size } from "lodash";
import { CategoryList } from "../../components/categories";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/Search";
import { usePlates } from "../../hooks/usePlates";
import { PlateList } from "../../components/plates";

export function Plates(props) {
  const [reloadPlates, setReloadPlates] = useState(false);
  const navigation = useNavigation();

  const {
    plates,
    loadingPlate,
    setSearchPlatesResult,
    searchPlatesResult,
    getPlates,
    numberOfPlates,
  } = usePlates();
  //let plates = [];
  useFocusEffect(
    useCallback(() => {
      (async () => {
        getPlates();
        setReloadPlates(false);
      })();
    }, [reloadPlates])
  );
  //console.log(plates);

  return (
    <>
      {loadingPlate ? (
        <ScreenLoading />
      ) : size(plates) === 0 ? (
        <>
          <Text className='font-bold text-lg text-center mb-3 mt-4'>
            Aun no tiene Platos agregado
          </Text>

          <Text className='font-semibold text-sm text-center'>
            Dale click al boton de mas(+) para agregada uno
          </Text>
        </>
      ) : (
        <>
          <Search
            data={plates}
            setData={setSearchPlatesResult}
            placeholder='Buscar platos'
          />

          <View className='py-3 px-3 mx-3 mb-4 mt-3 rounded-lg bg-[#0098d3] flex-row justify-center items-center'>
            <Text className='text-white font-bold text-xl pr-1'>
              Total platos :{" "}
            </Text>

            <Text className='font-bold text-[#000] text-xl'>
              {numberOfPlates}
            </Text>
          </View>

          <PlateList
            plates={searchPlatesResult}
            setReloadPlates={setReloadPlates}
          />
        </>
      )}
    </>
  );
}
