/** @format */

import React from "react";
import { Badge, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../screens/Menu";
import { themeColors } from "../theme";

const Stack = createStackNavigator();

export default function MenuStack(props) {
  const { navigation } = props;

  // console.log("app  " + JSON.stringify(auth));

  const buttonLeft = (screen) => {
    switch (screen) {
      case "search":
      case "movie":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.goBack()}
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
          onPress={() => console.log("navigate to cart")}
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
    </Stack.Navigator>
  );
}
