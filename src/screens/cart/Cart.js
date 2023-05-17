/** @format */

import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { themeColors } from "../../theme";
import { Image } from "react-native";
import currencyFormatter from "../../utils/currencyFormatter";
import { useOders } from "../../hooks/useOders";
import ScreenLoading from "../../components/ScreenLoading";
import { map, size } from "lodash";
import { CartList } from "../../components/cart/CartList";
import { removeOrderDetailStorage } from "../../utils/orders";

export function Cart({ navigation }) {
  const { orderDetail, loading } = useOders();

  // useEffect(() => {
  //   (async () => {
  //     await removeOrderDetailStorage();
  //   })();
  // }, []);

  // console.log(orderDetail);

  return (
    <>
      {loading ? (
        <ScreenLoading />
      ) : size(orderDetail) === 0 ? (
        <>
          <Text className='font-bold text-3xl mt-10 text-center mb-3'>
            Tu carrito esta vacio
          </Text>

          <Text className='font-bold  text-center mt-5'>
            Dale click a la flecha izquierda para agregar productos
          </Text>
        </>
      ) : (
        <CartList orderDetail={orderDetail} />
      )}
    </>
  );
}
