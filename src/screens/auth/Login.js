/** @format */

import React, { useEffect } from "react";
import { TextInput, Text, Button } from "react-native-paper";
import { TouchableOpacity, Image, View } from "react-native";
import * as yup from "yup";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";
import { setTokenStorage } from "../../utils/token";
import LoadingButton from "../../components/LoadingButton";
import { useCategories } from "../../hooks/useCategories";
import { usePlates } from "../../hooks/usePlates";
import { useAddresses } from "../../hooks/useAddresses";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { loadingAuth, login, setAuth, setTokenAuth } = useAuth();
  const { setTokenCategory } = useCategories();
  const { setTokenPlate } = usePlates();
  const { setTokenAddress } = useAddresses();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (user) => {
      const result = await login(user);
      if (!result.error) {
        setAuth(result.data.user);
        setTokenAuth(result.data.token);
        setTokenCategory(result.data.token);
        setTokenPlate(result.data.token);
        setTokenAddress(result.data.token);
        await setTokenStorage(result.data.token);
        Toast.show("Login Exito", {
          position: Toast.positions.CENTER,
        });
        formik.resetForm();
        return;
      } else {
        Toast.show(result.message, {
          position: Toast.positions.CENTER,
        });
        return;
      }
    },
  });

  // console.log("token  " + token);
  // console.log("app  " + JSON.stringify(auth));

  return (
    <View
      className='rounded-b-full h-72'
      style={{ backgroundColor: themeColors.bg }}>
      <View className='bg-white px-5 mx-4 pt-5  mb-8 rounded-3xl mt-5'>
        <Text
          style={{ color: themeColors.bg }}
          className='font-bold text-3xl text-center mb-4'>
          Iniciar Sesión
        </Text>

        <TextInput
          keyboardType='email-address'
          className='mb-4 mt-1'
          label='Email'
          style={{ backgroundColor: themeColors.dark }}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <TextInput
          className='mb-1 mt-1'
          style={{ backgroundColor: themeColors.dark }}
          label='Contraseña'
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <TouchableOpacity className='flex items-end' activeOpacity={0.7}>
          <Text className='text-gray-700 mb-8 mt-4 font-bold'>
            Olvide mi contraseña
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-3  mb-3 rounded-xl flex items-center'
          style={{ backgroundColor: themeColors.bg }}
          onPress={formik.handleSubmit}>
          <Text className={"text-xl font-bold text-center text-white"}>
            {loadingAuth ? <LoadingButton /> : "Ingresar"}
          </Text>
        </TouchableOpacity>

        <View className='flex-row justify-center space-x-12 mt-16 mb-3'>
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
        <View className='flex-row justify-center mt-7'>
          <Text
            className='text-gray-500 font-semibold mr-1'
            style={{ fontSize: 15 }}>
            ¿No tienes una cuenta?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className='mb-8'
            onPress={() => navigation.navigate("register")}>
            <Text
              className='font-semibold'
              style={{ fontSize: 15, color: themeColors.bg }}>
              Regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: yup.string().email(true).required(true),
    password: yup.string().required(true),
  };
}
