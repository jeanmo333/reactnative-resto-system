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
import PreferencesContext from "./src/context/PreferencesContext";
import { AuthProvider } from "./src/context/AuthProvider";
import { HandlerNavigation } from "./src/navigation/HandlerNavigation";

import { LogBox } from "react-native";
import { CategoryProvider } from "./src/context/CategoriesProvider";
import { PlateProvider } from "./src/context/PlatesProvider";
import { OrderProvider } from "./src/context/OrdersProvider";
LogBox.ignoreLogs(["_reactNative.Dimensions.removeEventListener"]);

export default function App() {
  const [theme, setTheme] = useState("dark");

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
      <CategoryProvider>
        <OrderProvider>
          <PlateProvider>
            <PreferencesContext.Provider value={preference}>
              <PaperProvider
                theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
                <StatusBar
                  barStyle={theme === "dark" ? "light-content" : "dark-content"}
                />
                <NavigationContainer
                  theme={
                    theme === "dark"
                      ? DarkThemeNavigation
                      : DefaultThemeNavigation
                  }>
                  <HandlerNavigation />
                </NavigationContainer>
              </PaperProvider>
            </PreferencesContext.Provider>
          </PlateProvider>
        </OrderProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}
