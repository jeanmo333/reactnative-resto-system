/** @format */

import React from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Settings, UpdatePassword, UpdateProfile } from "../screens/settings";
import useAuth from "../hooks/useAuth";
import { Image } from "react-native";
import { themeColors } from "../theme";

const Stack = createStackNavigator();

export default function SettingsStack(props) {
  const { navigation } = props;
  const { auth } = useAuth();

  const buttonLeft = (screen) => {
    switch (screen) {
      case "update-profile":
      case "update-password":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("settings-stack")}
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
        name='settings-stack'
        component={Settings}
        options={{
          title: "Ajustes",
          headerLeft: () => buttonLeft("settings"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='update-profile'
        component={UpdateProfile}
        options={{
          title: "Editar perfil",
          headerLeft: () => buttonLeft("update-profile"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='update-password'
        component={UpdatePassword}
        options={{
          title: "Editar password",
          headerLeft: () => buttonLeft("update-password"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
