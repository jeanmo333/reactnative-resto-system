/** @format */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";

const Stack = createStackNavigator();

export default function AuthNavigation(props) {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
            name='welcome'
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          /> */}

      <Stack.Screen
        name='login'
        component={Login}
        options={{
          headerShown: false,
          title: "Login",
        }}
      />

      <Stack.Screen
        name='register'
        component={RegisterScreen}
        options={{
          headerShown: false,
          title: "Nueva cuenta",
        }}
      />
    </Stack.Navigator>
  );
}
