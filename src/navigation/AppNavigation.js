/** @format */

import React, { useEffect } from "react";
import { Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import OrdersStack from "./OrdersStack";
import SettingsStack from "./SettingsStack";
import useAuth from "../hooks/useAuth";
import { themeColors } from "../theme";
import CategoriesStack from "./CategoriesStack";
import DashboardStack from "./DashboardStack";
import MenuStack from "./MenuStack";
import PlatesStack from "./PlatesStack";
import { useCategories } from "../hooks/useCategories";
import AddressesStack from "./AddressesStack";
import MyOrdersStack from "./MyOrdersStack";
import UsersStack from "./UsersStack";

const Drawer = createDrawerNavigator();

export default function AppNavigation(props) {
  const { auth } = props;
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeBackgroundColor: themeColors.bg,
        activeTintColor: "#fff",
        labelStyle: { fontSize: 17, fontWeight: "bold" },
      }}>
      <Drawer.Screen
        name='menu'
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
        name='my-orders'
        component={MyOrdersStack}
        options={{
          title: "Mis ordenes",
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
        name='settings'
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

      <Drawer.Screen
        name='addresses'
        component={AddressesStack}
        options={{
          title: "Direcciones",
          drawerIcon: () => (
            <Image
              source={require("../../assets/icons/home-address.png")}
              style={{
                height: 30,
                width: 30,
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
            name='dashboard'
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
            name='orders'
            component={OrdersStack}
            options={{
              title: "Ordenes",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/orders.png")}
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
            name='plates'
            component={PlatesStack}
            options={{
              title: "Platos",
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
            name='categories'
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

          <Drawer.Screen
            name='users'
            component={UsersStack}
            options={{
              title: "Usuarios",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/user.png")}
                  style={{
                    height: 30,
                    width: 30,
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
