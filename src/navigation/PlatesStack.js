/** @format */

import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Plates } from "../screens/plates";
import useAuth from "../hooks/useAuth";
import { Image, TouchableOpacity } from "react-native";
import { themeColors } from "../theme";
import { CreatePlates } from "../screens/plates/CreatePlates";

const Stack = createStackNavigator();

export default function PlatesStack(props) {
  const { navigation } = props;
  const { auth } = useAuth();

  const buttonLeft = (screen) => {
    switch (screen) {
      case "create-plate":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("plates-stack")}
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

  const buttonRight = (screen) => {
    switch (screen) {
      case "plates-stack":
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("create-plate")}>
            <Image
              source={require("../../assets/icons/add.png")}
              style={{
                height: 40,
                width: 40,
                marginRight: 15,
              }}
            />
          </TouchableOpacity>
        );
      default:
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
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='plates-stack'
        component={Plates}
        options={{
          title: "Listado platillos",
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight("plates-stack"),
        }}
      />

      <Stack.Screen
        name='create-plate'
        component={CreatePlates}
        options={{
          title: "",
          headerLeft: () => buttonLeft("create-plate"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
