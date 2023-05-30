/** @format */

import React from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "../hooks/useAuth";
import { Image } from "react-native";
import { themeColors } from "../theme";
import { TouchableOpacity } from "react-native";
import { Users } from "../screens/users/Users";
const Stack = createStackNavigator();

export default function UsersStack(props) {
  const { navigation } = props;

  const { auth } = useAuth();

  const buttonLeft = (screen) => {
    switch (screen) {
      case "nada-aun":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("users-stack")}
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
      case "search":
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("users")}>
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
        name='users-stack'
        component={Users}
        options={{
          title: "Listado usuarios",
          headerLeft: () => buttonLeft(""),
          headerRight: () => buttonRight(""),
        }}
      />
    </Stack.Navigator>
  );
}
