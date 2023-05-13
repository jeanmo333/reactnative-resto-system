/** @format */

import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import useAuth from "../../hooks/useAuth";
import { DateFormatter } from "../../utils/DateFormatter";
import { useNavigation } from "@react-navigation/native";

export function Settings(props) {
  const { auth, authenticateUser, token } = useAuth();
  const navigation = useNavigation();
  //console.log(error);

  useEffect(() => {
    authenticateUser();
  }, [token]);

  return (
    <ScrollView className='mx-8 my-3' showsVerticalScrollIndicator={false}>
      <Text className='text-3xl text-center font-bold mb-5 ml-3 text-slate-400'>
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

      <Button
        onPress={() => navigation.navigate("update-profile")}
        className='p-2 mt-5 rounded-lg bg-[#877dfa]'
        mode='contained'>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Editar Perfil</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate("update-password")}
        className='p-2 mt-8 rounded-lg bg-[#F4991A]'
        mode='contained'>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Cambiar Password
        </Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
