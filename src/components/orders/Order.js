/** @format */
import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useOders } from "../../hooks/useOders";
import { themeColors } from "../../theme";
import { DateFormatter } from "../../utils/DateFormatter";
import currencyFormatter from "../../utils/currencyFormatter";
import SelectStatus from "./SelectStatus";
import LoadingButton from "../LoadingButton";

export default function Order({ order, setReloadOrders }) {
  const navigation = useNavigation();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { changeOrderStatus } = useOders();
  // console.log(status);

  const onChangeOrderStatus = async () => {
    if (status === "") {
      Toast.show("Debe seleccionar un estado", {
        position: Toast.positions.CENTER,
      });
      return;
    }
    setLoading(true);
    const { error, message } = await changeOrderStatus(order.id, status);
    setReloadOrders(true);
    setLoading(false);
    if (!error) {
      Toast.show(message, {
        position: Toast.positions.CENTER,
      });
      setStatus("");
    } else {
      Toast.show(message, {
        position: Toast.positions.CENTER,
      });
      return;
    }
  };

  return (
    <View key={order.id} style={styles.order} className='mb-3'>
      <View>
        <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
          Estado : {""} <Text style={styles.value}>{order.status}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
          Total pagado :{" "}
          <Text style={styles.value}>{currencyFormatter(order.total)}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
          Fecha :{" "}
          <Text style={styles.value}>{DateFormatter(order.createdAt)}</Text>
        </Text>

        <SelectStatus status={status} setStatus={setStatus} />

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-3 mt-2 mb-4 rounded-xl flex items-center w-full'
          style={{ backgroundColor: themeColors.orange }}
          onPress={onChangeOrderStatus}>
          {loading ? (
            <LoadingButton />
          ) : (
            <Text className={"text-xl font-bold text-center text-white"}>
              Cambiar Estado
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-3 mt-1 rounded-xl flex items-center w-full'
          style={{ backgroundColor: themeColors.bg }}
          onPress={() => navigation.navigate("order-detail", { ...order })}>
          <Text className={"text-xl font-bold text-center text-white"}>
            Ver detalles
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  order: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    paddingHorizontal: 20,
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
