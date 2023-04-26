/** @format */
import React from "react";
import { Image, Switch, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, IconButton, Divider } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import usePreferences from "../hooks/usePreferences";

export default function DrawerContent(props) {
  const { theme, toggleTheme } = usePreferences();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 5,
          alignItems: "center",
        }}>
        <Image
          source={require("../../assets/images/user-profile.jpg")}
          style={{
            borderColor: "#8200d6",
            borderWidth: 2,
            height: 80,
            width: 80,
            borderRadius: 50,
            marginBottom: 10,
          }}
        />

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
            color: "#8200d6",
            fontWeight: "bold",
          }}>
          Moril jean francois
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

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          style={{ marginRight: 25 }}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            console.log("salir");
          }}
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#8200d6" }}>
            Salir
          </Text>
          <IconButton icon='logout' color='#8200d6' size={23} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
