/** @format */

import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, Text } from "react-native-paper";
import currencyFormatter from "../../utils/currencyFormatter";
import { themeColors } from "../../theme";
import { DateFormatter } from "../../utils/DateFormatter";

export function OrderDetail({ route, navigation }) {
  const order = route.params;
  // console.log(JSON.stringify(myOrder));

  return (
    <>
      <ScrollView className='mt-5 flex-1'>
        {order.details.map((item) => (
          <View key={item.id} style={styles.container}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: `${item.plate.images[0]}`,
                }}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
                {item.plate.name}
              </Text>

              <View style={styles.conatinerInfo}>
                <Text style={styles.dataText}>Cantidad : </Text>
                <Text style={styles.dataValue}>{item.quantity}</Text>
              </View>

              <View style={styles.conatinerInfo}>
                <Text style={styles.dataText}>Subtotal : </Text>
                <Text style={styles.dataValue}>
                  {currencyFormatter(item.subtotal)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className='bg-slate-700 py-3 rounded-t-lg pb-6'>
        <View className='flex-row justify-between mx-4 items-center'>
          <View className='mb-4'>
            <Text className='text-lg font-bold text-white'>
              Fecha del pedido
            </Text>
            <Text className='font-bold text-slate-400'>
              {DateFormatter(order.createdAt)}
            </Text>
          </View>

          <Image
            source={require("../../../assets/icons/reloj.png")}
            className='h-8 w-8'
          />
        </View>

        <View className='flex-row justify-between mx-4 items-center'>
          <View className='mb-4'>
            <Text className='text-lg font-bold text-white'>
              Cliente y telefono
            </Text>
            <Text className='font-bold text-slate-400'>
              {order.address.firstname} {order.address.lastname} -{"  "}
              {order.address.phone}
            </Text>
          </View>

          <Image
            source={require("../../../assets/icons/user.png")}
            className='h-8 w-8'
          />
        </View>

        <View className='flex-row justify-between mx-4 items-center'>
          <View className='mb-4'>
            <Text className='text-lg font-bold text-white'>
              Direccion de entrega
            </Text>
            <Text className='font-bold text-slate-400'>
              {order.address.street} {order.address.number} -{"  "}
              {order.address.commune}
            </Text>
          </View>

          <Image
            source={require("../../../assets/icons/home-address.png")}
            className='h-8 w-8'
          />
        </View>

        <Divider className='p-1 my-1 mx-3 mb-2' />

        <View className='flex-row justify-between mx-4 items-center'>
          <Text className='text-xl font-bold text-white'>Total pagado : </Text>

          <Text className='font-bold text-lg text-[#0098d3]'>
            {currencyFormatter(order.total)}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
    height: 102,
    marginHorizontal: 20,
  },
  containerImage: {
    width: "35%",
    height: 100,
    paddingRight: 20,
  },
  image: {
    height: 100,
    borderRadius: 10,
  },
  info: {
    width: "65%",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 3,
  },

  conatinerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  dataText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  dataValue: {
    fontSize: 16,
    paddingLeft: 10,
    color: themeColors.blue,
    fontWeight: "bold",
  },
});
