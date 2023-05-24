/** @format */

import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { size } from "lodash";
import { useOders } from "../../hooks/useOders";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/Search";
import { OrderList } from "../../components/orders";

export function Orders(props) {
  const [reloadOrders, setReloadOrders] = useState(false);

  const {
    orders,
    loadingOrder,
    setSearchOrdersResult,
    searchOrdersResult,
    getOrders,
  } = useOders();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getOrders();
        setReloadOrders(false);
      })();
    }, [reloadOrders])
  );

  return (
    <>
      {loadingOrder ? (
        <ScreenLoading />
      ) : size(orders) === 0 ? (
        <>
          <Text className='font-bold text-lg text-center my-3'>
            Aun no has hecho ningun orden
          </Text>
        </>
      ) : (
        <>
          <Search
            data={orders}
            setData={setSearchOrdersResult}
            placeholder='Buscar ordenes'
          />

          <View className='py-1 px-3 mx-3 mb-4 mt-3 rounded-lg bg-[#0098d3] flex-row justify-center items-center'>
            <Text className='text-white font-bold text-xl pr-5'>
              Total ordenes :{" "}
            </Text>
            <View
              style={{
                backgroundColor: "#000",
                padding: 10,
                borderRadius: 50,
              }}>
              <Text className='font-bold text-white'>10</Text>
            </View>
          </View>

          <OrderList
            orders={searchOrdersResult}
            setReloadOrders={setReloadOrders}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
