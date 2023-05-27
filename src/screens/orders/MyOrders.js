/** @format */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { size } from "lodash";
import { useOders } from "../../hooks/useOders";
import { MyOrderList } from "../../components/my-orders/MyOrderList";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/Search";

export function MyOrders({ navigation }) {
  const [reloadMyOrders, setReloadMyOrders] = useState(false);

  const {
    myOrders,
    loadingOrder,
    setSearchMyOrdersResult,
    searchMyOrdersResult,
    getMyOrders,
    numberOfMyOrders,
  } = useOders();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getMyOrders();
        setReloadMyOrders(false);
      })();
    }, [reloadMyOrders])
  );
  // console.log(categories);

  return (
    <>
      {loadingOrder ? (
        <ScreenLoading />
      ) : size(myOrders) === 0 ? (
        <>
          <Text className='font-bold text-lg text-center my-3'>
            Aun no has hecho ningun orden
          </Text>

          <Text className='font-semibold text-sm text-center'>
            Navega al menu para agregada una
          </Text>
        </>
      ) : (
        <>
          <Search
            data={myOrders}
            setData={setSearchMyOrdersResult}
            placeholder='Buscar por estado'
          />

          <View className='py-3 px-3 mx-3 mb-4 mt-3 rounded-lg bg-[#0098d3] flex-row justify-center items-center'>
            <Text className='text-white font-bold text-xl pr-1'>
              Total ordenes :{" "}
            </Text>

            <Text className='font-bold text-[#000] text-xl'>
              {numberOfMyOrders}
            </Text>
          </View>

          <MyOrderList
            myOrders={searchMyOrdersResult}
            setReloadMyOrders={setReloadMyOrders}
          />
        </>
      )}
    </>
  );
}
