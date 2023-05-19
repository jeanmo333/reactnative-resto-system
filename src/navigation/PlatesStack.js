/** @format */

import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Plates } from "../screens/plates";
import useAuth from "../hooks/useAuth";
import { Image } from "react-native";
import { themeColors } from "../theme";
import { CreatePlates } from "../screens/plates/CreatePlates";
import { SearchPlateByCategory } from "../screens/plates/SearchPlateByCategory";

const Stack = createStackNavigator();

export default function PlatesStack(props) {
  const { navigation } = props;
  const { authenticateUser, auth } = useAuth();

  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  // console.log("app  " + JSON.stringify(auth));

  const buttonLeft = (screen) => {
    switch (screen) {
      case "create-plate":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("plates-stack")}
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
        name='plates-stack'
        component={Plates}
        options={{
          title: "Listado platillos",
          headerLeft: () => buttonLeft("plates"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='create-plate'
        component={CreatePlates}
        options={{
          title: "",
          headerLeft: () => buttonLeft("create-plate"),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name='searchplate-category'
        component={SearchPlateByCategory}
        options={{
          title: "",
          headerLeft: () => buttonLeft("searchplate-category"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
