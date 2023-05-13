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
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function CategoriesStack(props) {
  const { navigation } = props;
  const navigationHook = useNavigation();

  const { authenticateUser, auth, token } = useAuth();
  const { getCategories, categories } = useCategories();

  useEffect(() => {
    getCategories();
    authenticateUser();
  }, [token]);

  // console.log("app  " + JSON.stringify(auth));
  // console.log(categories);
  const buttonLeft = (screen) => {
    switch (screen) {
      case "search":
      case "create-category":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("categories")}
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
        name='categories'
        component={Categories}
        options={{
          title: "Listado categorias",
          headerLeft: () => buttonLeft("categories"),
          headerRight: () => buttonRight(),
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
