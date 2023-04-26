/** @format */

import React from "react";
import { Switch, TouchableRipple, Text, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import usePreferences from "../hooks/usePreferences";

const Stack = createStackNavigator();

export default function HomeStackNavigation(props) {
  const { navigation } = props;
  const { theme, toggleTheme } = usePreferences();

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
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
            size={27}
          />
        );
    }
  };

  const buttonRight = () => {
    return (
      <TouchableRipple>
        <Image
          source={require("../../assets/images/user-profile.jpg")}
          style={{
            borderColor: "#8200d6",
            borderWidth: 2,
            height: 35,
            width: 35,
            borderRadius: 50,
            marginRight: 20,
          }}
        />
      </TouchableRipple>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={Home}
        options={{
          title: "Home",
          headerLeft: () => buttonLeft("home"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
