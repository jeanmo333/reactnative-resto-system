/** @format */

import React, { useEffect } from "react";
import { Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import OrdersStack from "./OrdersStack";
import SettingsStack from "./SettingsStack";
import useAuth from "../hooks/useAuth";
import ProductsStack from "./ProductsStack";
import { themeColors } from "../theme";
import CategoriesStack from "./CategoriesStack";
import DashboardStack from "./DashboardStack";
import MenuStack from "./MenuStack";

const Drawer = createDrawerNavigator();

export default function AppNavigation(props) {
  const { authenticateUser } = useAuth();
  const { auth } = props;
  useEffect(() => {
    authenticateUser();
  }, []);

  //console.log("app  " + JSON.stringify(auth));
  // console.log(token);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeBackgroundColor: themeColors.bg,
        activeTintColor: "#fff",
        labelStyle: { fontSize: 17, fontWeight: "bold" },
      }}>
      <Drawer.Screen
        name='menu-stack'
        component={MenuStack}
        options={{
          title: "Menu",
          drawerIcon: () => (
            <Image
              source={require("../../assets/icons/menu.png")}
              style={{
                height: 29,
                width: 29,
                marginHorizontal: 10,
                marginRight: -20,
                marginVertical: -25,
              }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name='orders-stack'
        component={OrdersStack}
        options={{
          title: "Ordenes",
          drawerIcon: () => (
            <Image
              source={require("../../assets/icons/orders.png")}
              style={{
                height: 27,
                width: 27,
                marginHorizontal: 10,
                marginRight: -20,
                marginVertical: -25,
              }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name='setting-stack'
        component={SettingsStack}
        options={{
          title: "Ajustes",
          drawerIcon: () => (
            <Image
              source={require("../../assets/icons/settings.png")}
              style={{
                height: 27,
                width: 27,
                marginHorizontal: 10,
                marginRight: -20,
                marginVertical: -25,
              }}
            />
          ),
        }}
      />

      {auth?.roles.includes("admin") && (
        <>
          <Drawer.Screen
            name='dashboad-stack'
            component={DashboardStack}
            options={{
              title: "Dashboard",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/dashboard.png")}
                  style={{
                    height: 25,
                    width: 25,
                    marginHorizontal: 10,
                    marginRight: -20,
                    marginVertical: -25,
                  }}
                />
              ),
            }}
          />

          <Drawer.Screen
            name='products-stack'
            component={ProductsStack}
            options={{
              title: "Productos",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/new-product.png")}
                  style={{
                    height: 27,
                    width: 27,
                    marginHorizontal: 10,
                    marginRight: -20,
                    marginVertical: -25,
                  }}
                />
              ),
            }}
          />

          <Drawer.Screen
            name='categories-stack'
            component={CategoriesStack}
            options={{
              title: "Categorias",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/categories.png")}
                  style={{
                    height: 27,
                    width: 27,
                    marginHorizontal: 10,
                    marginRight: -20,
                    marginVertical: -25,
                  }}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
