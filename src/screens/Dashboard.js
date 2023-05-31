/** @format */

import React, { useCallback, useState } from "react";
import { Text } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import clientAxios from "../config/axios";
import axios from "axios";
import Toast from "react-native-root-toast";
import ScreenLoading from "../components/ScreenLoading";
import currencyFormatter from "../utils/currencyFormatter";
import DashboardCard from "../components/DashboardCard";
import { useFocusEffect } from "@react-navigation/native";
import { useOders } from "../hooks/useOders";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import OrderTracking from "../components/OrderTracking";
import { themeColors } from "../theme";
import { DateFormatter } from "../utils/DateFormatter";
import { TouchableOpacity } from "react-native";

export default function Dashboard({ navigation }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const { tokenAuth, config } = useAuth();

  const { orders, searchOrdersResult, getOrders } = useOders();

  // console.log(orders);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getOrders();
        try {
          if (!tokenAuth) {
            setLoading(false);
            return;
          }

          setLoading(true);
          const { data } = await clientAxios.get("/dashboard", config);
          setDashboard(data);
          setLoading(false);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            Toast.show("Hubo un error", {
              position: Toast.positions.CENTER,
            });
          }
        }
      })();
    }, [])
  );

  if (loading || dashboard === null || !orders) return <ScreenLoading />;

  const { platesWithNoInventory, plateslowInventory, totalProfit } = dashboard;

  return (
    <>
      <View className='mt-2'>
        <DashboardCard
          icon={require("../../assets/icons/profits-day.png")}
          text='Ganancia del dia'
          data={currencyFormatter(totalProfit)}
        />

        <DashboardCard
          icon={require("../../assets/icons/profit-month.png")}
          text='Ganancia del mes'
          data={currencyFormatter(3600000)}
        />

        <DashboardCard
          icon={require("../../assets/icons/less-inventory.png")}
          text='Platos bajo inventario'
          data={plateslowInventory}
        />

        <DashboardCard
          icon={require("../../assets/icons/no-inventory.png")}
          text='Platos sin existencia'
          data={platesWithNoInventory}
        />
      </View>

      <Text className='font-bold text-xl bg-[#0098d3] text-center mb-3 mx-3 py-2 rounded-lg'>
        Ordenes mas reciente
      </Text>

      <ScrollView>
        {orders.map((order) => (
          <View key={order.id} style={styles.order} className='mb-3 mx-3'>
            <OrderTracking order={order} />

            <View className='mx-4'>
              <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
                Total pagado :{" "}
                <Text style={styles.value}>
                  {currencyFormatter(order.total)}
                </Text>
              </Text>

              <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
                Fecha :{" "}
                <Text style={styles.value}>
                  {DateFormatter(order.createdAt)}
                </Text>
              </Text>

              {/* <TouchableOpacity
                activeOpacity={0.7}
                className='py-3 mt-1 rounded-xl flex items-center w-full'
                style={{ backgroundColor: themeColors.bg }}
                onPress={() =>
                 // navigation.navigate("order-detail", { ...order })
                  navigation.navigate("orders-stack", { screen: "order-detail", ...order  })
                }>
                <Text className={"text-xl font-bold text-center text-white"}>
                  Ver detalles
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  order: {
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
