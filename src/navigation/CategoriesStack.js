/** @format */

import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Categories } from "../screens/categories";
import useAuth from "../hooks/useAuth";
import { Image } from "react-native";
import { themeColors } from "../theme";
import { useCategories } from "../hooks/useCategories";
import { CreateCategory } from "../screens/categories/CreateCategory";
import { TouchableOpacity } from "react-native";
const Stack = createStackNavigator();

export default function CategoriesStack(props) {
  const { navigation } = props;

  const { auth } = useAuth();

  const buttonLeft = (screen) => {
    switch (screen) {
      case "create-category":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("categories-stack")}
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

  const buttonRight = (screen) => {
    switch (screen) {
      case "categories-stack":
        return (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("create-category")}>
            <Image
              source={require("../../assets/icons/add.png")}
              style={{
                height: 40,
                width: 40,
                marginRight: 15,
              }}
            />
          </TouchableOpacity>
        );
      default:
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
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='categories-stack'
        component={Categories}
        options={{
          title: "Listado categorias",
          headerLeft: () => buttonLeft("categories-stack"),
          headerRight: () => buttonRight("categories-stack"),
        }}
      />

      <Stack.Screen
        name='create-category'
        component={CreateCategory}
        options={{
          title: "",
          headerLeft: () => buttonLeft("create-category"),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
