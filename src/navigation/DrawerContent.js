/** @format */
import React, { useEffect } from "react";
import { Alert, Image, Switch, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, IconButton, Divider } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import useAuth from "../hooks/useAuth";
import usePreferences from "../hooks/usePreferences";
import { themeColors } from "../theme";
import { useCategories } from "../hooks/useCategories";
import { useAddresses } from "../hooks/useAddresses";
import { usePlates } from "../hooks/usePlates";

export default function DrawerContent(props) {
  const { theme, toggleTheme } = usePreferences();
  const { logout, auth } = useAuth();
  const { setCategories } = useCategories();
  const { setAddresses } = useAddresses();
  const { setPlates } = usePlates();

  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estas seguro de que quieres salir de tu cuenta?",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => {
            logout();
            setCategories([]);
            setAddresses([]);
            setPlates([]);
          },
        },
      ],
      { cancelable: false }
    );
  };

  // async () => {
  //   await deleteCategory(id);
  //   setReloadCategories(true);
  //   setLoading(false);
  // },
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 5,
          alignItems: "center",
        }}>
        {auth?.image ? (
          <Image
            source={{
              uri: `${auth.image}`,
            }}
            style={{
              borderColor: themeColors.bg,
              borderWidth: 2,
              height: 80,
              width: 80,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/user-profile.jpg")}
            style={{
              borderColor: themeColors.bg,
              borderWidth: 2,
              height: 80,
              width: 80,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
        )}

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
          }}>
          Bienvenido
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginBottom: 5,
            color: "gray",
            fontWeight: "bold",
          }}>
          {auth?.email}
        </Text>
      </View>

      <Divider
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          alignItems: "center",
        }}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Divider
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          alignItems: "center",
        }}
      />

      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          padding: 4,
        }}>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />

        <TouchableWithoutFeedback
          onPress={logoutAccount}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <IconButton icon='logout' color='#C70039' size={25} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
