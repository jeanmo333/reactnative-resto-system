/** @format */

import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import useAuth from "../../hooks/useAuth";
import { DateFormatter } from "../../utils/DateFormatter";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";

export function Settings(props) {
  const { auth, authenticateUser, token } = useAuth();
  const navigation = useNavigation();
  //console.log(error);

  useEffect(() => {
    authenticateUser();
  }, [token]);

  return (
    <ScrollView className='mx-8 my-3' showsVerticalScrollIndicator={false}>
      <Text className='text-3xl font-bold mb-5 ml-3 text-slate-400'>
        Datos personales
      </Text>

      <View className='flex-row items-center mb-4'>
        <Image
          source={require("../../../assets/icons/user.png")}
          className='h-8 w-8 mr-5'
        />

        <View>
          <Text className='text-lg font-bold'>
            {auth.name} {auth.lastname === "" ? "..." : auth.lastname}
          </Text>
          <Text className='font-bold text-slate-400'>Nombre del usuario</Text>
        </View>
      </View>

      <View className='flex-row items-center mb-4'>
        <Image
          source={require("../../../assets/icons/email.png")}
          className='h-8 w-8 mr-5'
        />
        <View>
          <Text className='text-lg font-bold'>{auth.email} </Text>
          <Text className='font-bold text-slate-400'>Correo electronico</Text>
        </View>
      </View>

      <View className='flex-row items-center mb-4'>
        <Image
          source={require("../../../assets/icons/reloj.png")}
          className='h-8 w-8 mr-5'
        />
        <View>
          <Text className='text-lg font-bold'>
            {DateFormatter(auth.createdAt)}
          </Text>
          <Text className='font-bold text-slate-400'>Fecha de registro</Text>
        </View>
      </View>

      <View className='flex-row items-center mb-4'>
        <Image
          source={require("../../../assets/icons/phone.png")}
          className='h-8 w-8 mr-5'
        />
        <View>
          <Text className='text-lg font-bold'>
            {auth.phone === "" ? "..." : auth.phone}
          </Text>
          <Text className='font-bold text-slate-400'>Telefono del usuario</Text>
        </View>
      </View>

      <TouchableOpacity
        className='py-3 mb-3 mt-5 rounded-xl flex items-center'
        style={{ backgroundColor: themeColors.bg }}
        onPress={() => navigation.navigate("update-profile")}>
        <Text className={"text-xl font-bold text-center text-white"}>
          Editar Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className='py-3 mb-3 mt-8 rounded-xl flex items-center'
        style={{ backgroundColor: themeColors.orange }}
        onPress={() => navigation.navigate("update-password")}>
        <Text className={"text-xl font-bold text-center text-white"}>
          Cambiar Password
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
