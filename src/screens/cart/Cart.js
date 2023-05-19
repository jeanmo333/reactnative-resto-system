/** @format */

import React from "react";
import { Text } from "react-native-paper";
import { useOders } from "../../hooks/useOders";
import ScreenLoading from "../../components/ScreenLoading";
import { size } from "lodash";
import { CartList } from "../../components/cart/CartList";
import { Alert, TouchableOpacity, View } from "react-native";
import { themeColors } from "../../theme";
import currencyFormatter from "../../utils/currencyFormatter";

export function Cart({ navigation }) {
  const { orderDetail, loading, emptyCart, total } = useOders();
  let goToAddress;
  const alertEmptyCart = () => {
    Alert.alert(
      "Vaciar carrito",
      "¿Estas seguro?, Esta accion no puede dehacer!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: emptyCart,
        },
      ],
      { cancelable: false }
    );
  };

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
        <>
          <TouchableOpacity
            className='py-2 mx-3 mt-1 rounded-xl flex items-center'
            style={{ backgroundColor: themeColors.danger }}
            onPress={alertEmptyCart}>
            <Text className={"text-xl font-bold text-center text-white"}>
              Vaciar carrito
            </Text>
          </TouchableOpacity>

          <CartList orderDetail={orderDetail} />

          <View className='flex-row items-center justify-between mx-3 mb-8'>
            <Text className='text-xl font-bold'>
              Total :{" "}
              <Text className='text-[#0098d3] text-lg font-bold'>
                {currencyFormatter(total)}
              </Text>
            </Text>

            <TouchableOpacity
              className='py-2 px-10 mt-1 rounded-xl flex items-center'
              style={{ backgroundColor: themeColors.bg }}
              onPress={() => navigation.navigate("addresses", { goToAddress })}>
              <Text className={"text-xl font-bold text-center text-white"}>
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}
