/** @format */

import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { IconButton } from "react-native-paper";
import HomeStack from "./HomeStack";
import MovieStack from "./MovieStack";
import NewsStack from "./NewsStack";
import usePreferences from "../hooks/usePreferences";

const Drawer = createDrawerNavigator();

export default function AppNavigation(props) {
  const { theme } = usePreferences();
  const [user, setUser] = useState("moril");

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeBackgroundColor: "#aa18ea",
        activeTintColor: "#fff",
        labelStyle: { fontSize: 17, fontWeight: "bold" },
      }}>
      <Drawer.Screen
        name='home'
        component={HomeStack}
        options={{
          drawerIcon: () => (
            <IconButton
              size={28}
              color={theme === "dark" ? "#fff" : "#000"}
              icon='home-outline'
              style={{ marginRight: -20, marginVertical: -25 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name='movie'
        component={MovieStack}
        options={{
          drawerIcon: () => (
            <IconButton
              color={theme === "dark" ? "#fff" : "#000"}
              icon='camera-outline'
              style={{ marginRight: -20, marginVertical: -25 }}
            />
          ),
        }}
      />

      {user === "moril" && (
        <Drawer.Screen
          name='news'
          component={NewsStack}
          options={{
            drawerIcon: () => (
              <IconButton
                color={theme === "dark" ? "#fff" : "#000"}
                icon='movie-outline'
                style={{ marginRight: -20, marginVertical: -25 }}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
