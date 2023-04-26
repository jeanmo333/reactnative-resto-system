/** @format */

import React, { useEffect } from "react";
import { Switch, TouchableRipple, Text, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import usePreferences from "../hooks/usePreferences";
import Login from "../screens/auth/Login";
import WelcomeScreen from "../screens/auth/Welcome";
import RegisterScreen from "../screens/auth/Register";
import AppNavigation from "./AppNavigation";
import useAuth from "../hooks/useAuth";
import ScreenLoading from "../components/ScreenLoading";

const Stack = createStackNavigator();

export default function AuthNavigation(props) {
  const { auth, authenticateUser, token, loading } = useAuth();
  const { navigation } = props;
  const { theme, toggleTheme } = usePreferences();

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <Stack.Navigator>
      {/* {loading ? (
        <ScreenLoading />
      ) : (
        <Stack.Screen
          name='welcome'
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
      )} */}

      <Stack.Screen
        name='login'
        component={Login}
        options={{
          headerShown: true,
          title: "Login",
        }}
      />

      <Stack.Screen
        name='register'
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: "Nueva cuenta",
        }}
      />
    </Stack.Navigator>
  );
}
