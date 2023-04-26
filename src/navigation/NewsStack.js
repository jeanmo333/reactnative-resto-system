/** @format */

import React from "react";
import { Switch, TouchableRipple, Text, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import News from "../screens/News";
import usePreferences from "../hooks/usePreferences";

const Stack = createStackNavigator();

export default function NewsStack(props) {
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
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          style={{ marginRight: 25 }}
        />
      </TouchableRipple>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='news'
        component={News}
        options={{
          title: "Nuevas Películas",
          headerLeft: () => buttonLeft("news"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
