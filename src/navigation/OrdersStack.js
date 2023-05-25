/** @format */

import React from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Orders } from "../screens/orders";
import useAuth from "../hooks/useAuth";
import { Image } from "react-native";
import { themeColors } from "../theme";
import { OrderDetail } from "../screens/orders/OrderDetail";

const Stack = createStackNavigator();

export default function OrdersStack(props) {
  const { navigation } = props;
  const { auth } = useAuth();

  const buttonLeft = (screen) => {
    switch (screen) {
      case "order-detail":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("orders-stack")}
            style={{ marginLeft: 15 }}
          />
        );
      default:
        return (
          <IconButton
            icon='menu'
            color={themeColors.bg}
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
            size={32}
          />
        );
    }
  };

  const buttonRight = () => {
    return (
      <>
        {auth?.image ? (
          <Image
            source={{
              uri: `${auth.image}`,
            }}
            style={{
              borderColor: themeColors.bg,
              borderWidth: 2,
              height: 35,
              width: 35,
              borderRadius: 50,
              marginRight: 20,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/user-profile.jpg")}
            style={{
              borderColor: themeColors.bg,
              borderWidth: 2,
              height: 35,
              width: 35,
              borderRadius: 50,
              marginRight: 20,
            }}
          />
        )}
      </>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='orders-stack'
        component={Orders}
        options={{
          title: "Todos los ordenes",
          headerLeft: () => buttonLeft("orders-stack"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='order-detail'
        component={OrderDetail}
        options={{
          title: "Detalle orden",
          headerLeft: () => buttonLeft("order-detail"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
