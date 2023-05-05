/** @format */

import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";
import useAuth from "../hooks/useAuth";
import WelcomeScreen from "../screens/auth/Welcome";
import AppNavigation from "./AppNavigation";

const Stack = createStackNavigator();

export default function AuthNavigation(props) {
  // const { auth } = props;
  const { authenticateUser, token, auth } = useAuth();

  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  // console.log("auth  " + JSON.stringify(auth));
  // console.log(token);
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
