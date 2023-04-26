/** @format */

import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import AppNavigation from "../../navigation/AppNavigation";
import ScreenLoading from "../../components/ScreenLoading";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const { auth, authenticateUser, token, loading } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, []);

  if (loading) return <ScreenLoading />;

  return (
    <>
      {loading ? (
        <ScreenLoading />
      ) : (
        <SafeAreaView
          className='flex-1'
          style={{ backgroundColor: themeColors.bg }}>
          <View className='flex-1  justify-around mt-5 mb-20 '>
            <Text className='text-gray-300 font-bold text-5xl text-center'>
              Bienvenido
            </Text>

            <Text className='text-gray-200 font-bold text-3xl text-center'>
              restorante app
            </Text>
            <View className='flex-row justify-center'>
              <Image
                className='rounded-full'
                source={require("../../../assets/icons/home.png")}
                style={{ width: 350, height: 350 }}
              />
            </View>
            <View className='space-y-4'>
              <TouchableOpacity
                onPress={() => navigation.navigate("register")}
                className='py-3  mx-7 rounded-xl mb-10'
                style={{ backgroundColor: themeColors.primary }}>
                <Text className='text-xl font-bold text-center text-yellow-50'>
                  Registrarte
                </Text>
              </TouchableOpacity>
              <View className='flex-row justify-center'>
                <Text
                  className='text-white font-bold mr-1'
                  style={{ fontSize: 15 }}>
                  ¿Ya tienes una cuenta?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
                  <Text
                    className='font-bold'
                    style={{ fontSize: 15, color: themeColors.primary }}>
                    {" "}
                    Inicia Sesión
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
