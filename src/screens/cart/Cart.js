/** @format */

import React from "react";
import { Divider, Text } from "react-native-paper";
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
            activeOpacity={0.7}
            className='py-2 mx-3 mt-1 rounded-xl flex items-center'
            style={{ backgroundColor: themeColors.danger }}
            onPress={alertEmptyCart}>
            <Text className={"text-xl font-bold text-center text-white"}>
              Vaciar carrito
            </Text>
          </TouchableOpacity>

          <CartList orderDetail={orderDetail} />

          <View className='bg-slate-700 py-3 rounded-t-lg'>
            <View className='flex-row justify-between mx-4 items-center'>
              <Text className='text-lg font-bold text-slate-400'>
                Subtotal :{" "}
              </Text>

              <Text className='font-bold'>{currencyFormatter(total)}</Text>
            </View>

            <View className='flex-row justify-between mx-4 items-center'>
              <Text className='text-lg font-bold text-slate-400'>
                Costo de envio :{" "}
              </Text>

              <Text className='font-bold'>{currencyFormatter(0)}</Text>
            </View>

            <Divider className='p-1 my-1 mx-3' />

            <View className='flex-row justify-between mx-4 items-center'>
              <Text className='text-xl font-bold text-slate-400'>
                Total a pagar :{" "}
              </Text>

              <Text className='font-bold text-lg'>
                {currencyFormatter(total)}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className='py-3 mx-3 mt-5 rounded-xl flex items-center'
              style={{ backgroundColor: themeColors.bg }}
              onPress={() => navigation.navigate("addresses")}>
              <Text className={"text-xl font-bold text-center text-white"}>
                Confirmar orden
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}
