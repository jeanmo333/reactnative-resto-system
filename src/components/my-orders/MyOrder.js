/** @format */
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider, Text } from "react-native-paper";
import { themeColors } from "../../theme";
import { DateFormatter } from "../../utils/DateFormatter";
import currencyFormatter from "../../utils/currencyFormatter";
import OrderTracking from "../OrderTracking";

export default function MyOrder({ myOrder }) {
  const navigation = useNavigation();
  return (
    <View key={myOrder.id} style={styles.myOrder} className='mb-3'>
      <OrderTracking order={myOrder} />
      <View className='mx-4'>
        <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
          Estado : {""} <Text style={styles.value}>{myOrder.status}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
          Total pagado :{" "}
          <Text style={styles.value}>{currencyFormatter(myOrder.total)}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
          Fecha :{" "}
          <Text style={styles.value}>{DateFormatter(myOrder.createdAt)}</Text>
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-2 mt-2 rounded-xl flex items-center w-full'
          style={{ backgroundColor: themeColors.bg }}
          onPress={() =>
            navigation.navigate("my-orders-detail", { ...myOrder })
          }>
          <Text className={"text-xl font-bold text-center text-white"}>
            Ver detalles
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myOrder: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    paddingTop: 10,
    paddingBottom: 20,
  },
  key: {
    fontWeight: "bold",
    fontSize: 18,
    color: themeColors.blue,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "justify",
  },
});
