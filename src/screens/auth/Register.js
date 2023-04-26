/** @format */

import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as yup from "yup";
import { themeColors } from "../../theme";
import Toast from "react-native-root-toast";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register, loading } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (user) => {
      const { error, message } = await register(user);

      if (!error) {
        Toast.show(message, {
          position: Toast.positions.CENTER,
        });
        navigation.navigate("login");
        formik.resetForm();
      } else {
        Toast.show(message, {
          position: Toast.positions.CENTER,
        });
        return;
      }
    },
  });

  return (
    <View
      className='rounded-b-full h-72'
      style={{ backgroundColor: themeColors.bg }}>
      <View className='bg-white px-5 mx-4 pt-5  mb-5 rounded-3xl mt-4'>
        <Text
          style={{ color: themeColors.bg }}
          className='font-bold text-3xl text-center mb-3'>
          Crear Cuenta
        </Text>

        <TouchableOpacity
          className='py-3  mb-3 rounded-xl flex-row justify-center items-center'
          style={{ backgroundColor: themeColors.bg }}>
          <Image
            source={require("../../../assets/icons/upload.png")}
            className='w-8 h-8 mr-3'
          />
          <Text className='text-xl font-bold text-center text-white'>
            Subir foto perfil
          </Text>
        </TouchableOpacity>

        <TextInput
          className='mb-2 mt-1'
          style={{ backgroundColor: themeColors.primary }}
          label='Nombre'
          onChangeText={(text) => formik.setFieldValue("name", text)}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <TextInput
          className='mb-2 mt-1'
          label='Email'
          style={{ backgroundColor: themeColors.primary }}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <TextInput
          className='mb-1 mt-1'
          style={{ backgroundColor: themeColors.primary }}
          label='Contraseña'
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <TouchableOpacity className='flex items-end'>
          <Text className='text-gray-700 my-4 font-bold'>
            Olvide mi contraseña
          </Text>
        </TouchableOpacity>

        <Button
          color={themeColors.bg}
          className='rounded-xl py-1'
          mode='contained'
          onPress={formik.handleSubmit}
          loading={loading}>
          <Text className='text-lg font-bold text-center text-white'>
            {!loading && "Registrar"}
          </Text>
        </Button>

        <View className='flex-row justify-center space-x-12 mt-5'>
          <TouchableOpacity className='p-2 bg-gray-100 rounded-2xl'>
            <Image
              source={require("../../../assets/icons/google.png")}
              className='w-8 h-8'
            />
          </TouchableOpacity>
          <TouchableOpacity className='p-2 bg-gray-100 rounded-2xl'>
            <Image
              source={require("../../../assets/icons/apple.png")}
              className='w-8 h-8'
            />
          </TouchableOpacity>
          <TouchableOpacity className='p-2 bg-gray-100 rounded-2xl'>
            <Image
              source={require("../../../assets/icons/facebook.png")}
              className='w-8 h-8'
            />
          </TouchableOpacity>
        </View>

        <View className='flex-row justify-center mt-5 pb-16'>
          <Text
            className='text-gray-500 font-semibold'
            style={{ fontSize: 15 }}>
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text
              className='font-semibold'
              style={{ fontSize: 15, color: themeColors.bg }}>
              {" "}
              Inicia Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function initialValues() {
  return {
    name: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: yup.string().required(true),
    email: yup.string().email(true).required(true),
    password: yup.string().required(true),
  };
}
