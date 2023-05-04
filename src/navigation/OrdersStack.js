/** @format */

import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Orders } from "../screens/orders";
import useAuth from "../hooks/useAuth";
import { Image } from "react-native";
import { themeColors } from "../theme";

const Stack = createStackNavigator();

export default function OrdersStack(props) {
  const { navigation } = props;
  const { authenticateUser, auth } = useAuth();

  // useEffect(() => {
  //   authenticateUser();
  // }, []);

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
        name='orders'
        component={Orders}
        options={{
          title: "Ordenes",
          headerLeft: () => buttonLeft("orders"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
