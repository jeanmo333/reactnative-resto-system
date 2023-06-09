/** @format */

import React, { useCallback, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { size } from "lodash";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import { useAddresses } from "../../hooks/useAddresses";
import { AddressList } from "../../components/addresses/AddressList";
import { themeColors } from "../../theme";
import { useOders } from "../../hooks/useOders";

export function Addresses({ route }) {
  const [reloadAddresses, setReloadAddresses] = useState(false);
  const navigation = useNavigation();
  const { addresses, loadingAddress, getAddresses } = useAddresses();
  const { numberOfItems } = useOders();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getAddresses();
        setReloadAddresses(false);
      })();
    }, [reloadAddresses])
  );
  // console.log(addresses);

  return (
    <>
      {loadingAddress ? (
        <ScreenLoading />
      ) : size(addresses) === 0 ? (
        <>
          <Text className='font-bold text-lg text-center mt-5 mb-3'>
            Aun no tiene direccion agregada
          </Text>

          <Text className='font-semibold text-sm text-center'>
            Dale click al boton de mas(+) para agregada una
          </Text>
        </>
      ) : (
        <>
          {size(addresses) >= 3 && (
            <Text className='text-xl ml-4 text-center font-bold mt-1 text-[#FF5733]'>
              Maximo 3 direcciones
            </Text>
          )}

          {numberOfItems >= 1 && (
            <TouchableOpacity
              activeOpacity={0.7}
              className='py-3 mb-3 mx-3 mt-3 px-5 rounded-xl'
              style={{ backgroundColor: themeColors.bg }}
              onPress={() => navigation.navigate("payment-form")}>
              <Text className='text-xl font-bold text-center text-white'>
                Procesar pago
              </Text>
            </TouchableOpacity>
          )}

          <AddressList
            addresses={addresses}
            setReloadAddresses={setReloadAddresses}
          />
        </>
      )}
    </>
  );
}
