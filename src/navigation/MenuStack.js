/** @format */

import React, { useEffect } from "react";
import { Badge, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { themeColors } from "../theme";
import useAuth from "../hooks/useAuth";
import Menu from "../screens/menu/Menu";
import PlateDetails from "../screens/menu/PlateDetails";
import { Cart } from "../screens/cart";

const Stack = createStackNavigator();

export default function MenuStack(props) {
  const { navigation } = props;
  const { authenticateUser } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, []);

  // console.log("app  " + JSON.stringify(auth));

  const buttonLeft = (screen) => {
    switch (screen) {
      case "plate-details":
      case "cart":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("menu")}
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
        <IconButton
          icon='cart'
          color={themeColors.bg}
          onPress={() => navigation.navigate("cart")}
          style={{ marginRight: 20 }}
          size={32}
        />
        <Badge
          size={20}
          style={{
            position: "absolute",
            top: 7,
            right: 20,
            fontSize: 13,
            backgroundColor: "#98D8AA",
            color: "#000",
          }}>
          +9
        </Badge>
      </>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='menu'
        component={Menu}
        options={{
          title: "Menu",
          headerLeft: () => buttonLeft("menu"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='plate-details'
        component={PlateDetails}
        options={{
          title: "Detalle platillo",
          headerLeft: () => buttonLeft("plate-details"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='cart'
        component={Cart}
        options={{
          title: "Carrito de compra",
          headerLeft: () => buttonLeft("cart"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
