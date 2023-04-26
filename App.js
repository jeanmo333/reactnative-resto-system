/** @format */

import React, { useState, useMemo } from "react";
import { StatusBar } from "react-native";
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from "@react-navigation/native";
import AppNavigation from "./src/navigation/AppNavigation";
import PreferencesContext from "./src/context/PreferencesContext";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { AuthProvider } from "./src/context/AuthProvider";
import useAuth from "./src/hooks/useAuth";
import { HandlerNavigation } from "./src/navigation/HandlerNavigation";

export default function App() {
  // const { auth } = useAuth();
  const [theme, setTheme] = useState("dark");
  //const [user, setUser] = useState(false);
  //console.log(auth);

  DefaultThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.accent = "#1ae1f2";

  DarkThemeNavigation.colors.background = "#192734";
  DarkThemeNavigation.colors.card = "#15212b";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  return (
    <AuthProvider>
      <PreferencesContext.Provider value={preference}>
        <PaperProvider
          theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />
          <NavigationContainer
            theme={
              theme === "dark" ? DarkThemeNavigation : DefaultThemeNavigation
            }>
            <HandlerNavigation />
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </AuthProvider>
  );
}
