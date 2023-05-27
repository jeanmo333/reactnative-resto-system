/** @format */

import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Categories } from "../screens/categories";
import useAuth from "../hooks/useAuth";
import { Image, TouchableOpacity } from "react-native";
import { themeColors } from "../theme";
import { CreateCategory } from "../screens/categories/CreateCategory";
import { useAddresses } from "../hooks/useAddresses";
import { Addresses } from "../screens/addresses/Addresses";
import { CreateAddress } from "../screens/addresses/CreateAddress";
import { size } from "lodash";
const Stack = createStackNavigator();

export default function AddressesStack(props) {
  const { navigation } = props;
  const { auth } = useAuth();
  const { addresses } = useAddresses();

  const buttonLeft = (screen) => {
    switch (screen) {
      case "create-address":
        return (
          <IconButton
            icon='arrow-left'
            onPress={() => navigation.navigate("addresses-stack")}
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
      case "create-address":
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
      default:
        return (
          <>
            {size(addresses) < 3 ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("create-address")}>
                <Image
                  source={require("../../assets/icons/add.png")}
                  style={{
                    height: 40,
                    width: 40,
                    marginRight: 15,
                  }}
                />
              </TouchableOpacity>
            ) : (
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
            )}
          </>
        );
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='addresses-stack'
        component={Addresses}
        options={{
          title: "Listado direcciones",
          headerLeft: () => buttonLeft("addresses-stack"),
          headerRight: () => buttonRight(""),
        }}
      />

      <Stack.Screen
        name='create-address'
        component={CreateAddress}
        options={{
          title: "",
          headerLeft: () => buttonLeft("create-address"),
          headerRight: () => buttonRight("create-address"),
        }}
      />
    </Stack.Navigator>
  );
}
