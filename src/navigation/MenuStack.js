/** @format */

import React from "react";
import { Badge, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { themeColors } from "../theme";
import Menu from "../screens/menu/Menu";
import PlateDetails from "../screens/menu/PlateDetails";
import { Cart, PaymentForm } from "../screens/cart";
import { useOders } from "../hooks/useOders";
import { SearchPlateByCategory } from "../screens/menu/SearchPlateByCategory";

const Stack = createStackNavigator();

export default function MenuStack(props) {
  const { navigation } = props;
  const { numberOfItems } = useOders();

  const buttonLeft = (screen) => {
    switch (screen) {
      case "plate-details":
      case "cart":
      case "payment-form":
      case "searchplate-category":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("menu-stack")}
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
        {numberOfItems >= 1 && (
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
                top: 10,
                right: 20,
                fontSize: 13,
                backgroundColor: themeColors.blue,
                color: "#fff",
              }}>
              {numberOfItems < 10 ? numberOfItems : "9+"}
            </Badge>
          </>
        )}
      </>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='menu-stack'
        component={Menu}
        options={{
          title: "Nuestro menu",
          headerLeft: () => buttonLeft("menu"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='plate-details'
        component={PlateDetails}
        options={{
          headerShown: false,
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

      <Stack.Screen
        name='payment-form'
        component={PaymentForm}
        options={{
          title: "Formulario de pago",
          headerLeft: () => buttonLeft("payment-form"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='searchplate-category'
        component={SearchPlateByCategory}
        options={{
          title: "",
          headerLeft: () => buttonLeft("searchplate-category"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
