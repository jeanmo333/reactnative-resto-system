/** @format */

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { themeColors } from "../../theme";
import Toast from "react-native-root-toast";
import LoadingButton from "../../components/LoadingButton";
import { useAddresses } from "../../hooks/useAddresses";
import usePreferences from "../../hooks/usePreferences";

export function CreateAddress({ route, navigation }) {
  const [idAddress, setIdAddress] = useState("");
  const [newAddress, setNewAddress] = useState(true);
  const { theme } = usePreferences();
  const address = route.params;

  const { loading, addAddress, updateAddress } = useAddresses();
  useEffect(() => {
    if (address?.id) {
      formik.setFieldValue("id", address?.id);
      formik.setFieldValue("title", address.title);
      formik.setFieldValue("firstname", address?.firstname);
      formik.setFieldValue("lastname", address?.lastname);
      formik.setFieldValue("number", address?.number);
      formik.setFieldValue("city", address?.city);
      formik.setFieldValue("phone", address?.phone);
      formik.setFieldValue("commune", address?.commune);
      formik.setFieldValue("country", address?.country);
      formik.setFieldValue("street", address?.street);
      setIdAddress(address.id);
      setNewAddress(false);
    }
  }, [address]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (addressForm) => {
      if (newAddress) {
        const { error, message } = await addAddress(addressForm);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("addresses-stack");
          formik.resetForm();
        } else {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          return;
        }
      } else {
        const { error, message } = await updateAddress(idAddress, addressForm);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("addresses-stack");
          formik.resetForm();
        } else {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          return;
        }
      }
    },
  });

  return (
    <>
      <Text className='text-3xl text-center font-bold mt-3'>
        {newAddress ? "Creando direccion" : "Editando direccion"}
      </Text>

      <Divider className='mb-3 pb-2 mx-3' />

      <ScrollView>
        <View className='mx-3'>
          <TextInput
            mode='outlined'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            className='mb-2 mt-1'
            label='Titulo'
            placeholder=' Ejemplo tu casa'
            onChangeText={(text) => formik.setFieldValue("title", text)}
            value={formik.values.title}
            error={formik.errors.title}
          />

          <TextInput
            mode='outlined'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            className='mb-2 mt-1'
            label='Tu nombre'
            onChangeText={(text) => formik.setFieldValue("firstname", text)}
            value={formik.values.firstname}
            error={formik.errors.firstname}
          />

          <TextInput
            mode='outlined'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            className='mb-2 mt-1'
            label='Tu apellido'
            onChangeText={(text) => formik.setFieldValue("lastname", text)}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />

          <View className='flex-row items-center'>
            <TextInput
              mode='outlined'
              style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
              className='mb-2 mt-1 flex-1 mr-1'
              label='Calle'
              onChangeText={(text) => formik.setFieldValue("street", text)}
              value={formik.values.street}
              error={formik.errors.street}
            />

            <TextInput
              mode='outlined'
              style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
              className='mb-2 mt-1 flex-1 ml-1'
              label='Numero'
              onChangeText={(text) => formik.setFieldValue("number", text)}
              value={formik.values.number}
              error={formik.errors.number}
            />
          </View>

          <View className='flex-row items-center'>
            <TextInput
              mode='outlined'
              style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
              className='mb-2 mt-1 flex-1 mr-1'
              label='Ciudad'
              onChangeText={(text) => formik.setFieldValue("city", text)}
              value={formik.values.city}
              error={formik.errors.city}
            />

            <TextInput
              mode='outlined'
              style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
              className='mb-2 mt-1 flex-1 ml-1'
              label='Telefono'
              onChangeText={(text) => formik.setFieldValue("phone", text)}
              value={formik.values.phone}
              error={formik.errors.phone}
            />
          </View>

          <View className='flex-row items-center'>
            <TextInput
              mode='outlined'
              style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
              className='mb-2 mt-1 flex-1 mr-1'
              label='Comuna'
              onChangeText={(text) => formik.setFieldValue("commune", text)}
              value={formik.values.commune}
              error={formik.errors.commune}
            />

            <TextInput
              mode='outlined'
              style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
              className='mb-2 mt-1 flex-1 ml-1'
              label='Pais'
              onChangeText={(text) => formik.setFieldValue("country", text)}
              value={formik.values.country}
              error={formik.errors.country}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className='py-3  mb-3  mt-5 rounded-xl flex items-center'
            style={{ backgroundColor: themeColors.bg }}
            onPress={formik.handleSubmit}>
            <Text className={"text-xl font-bold text-center text-white"}>
              {loading ? (
                <LoadingButton />
              ) : newAddress ? (
                "Crear direccion"
              ) : (
                "Editar direccion"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

function initialValues() {
  return {
    title: "",
    street: "",
    number: "",
    city: "",
    phone: "",
    commune: "",
    country: "",
    firstname: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    title: yup.string().required(true),
    street: yup.string().required(true),
    number: yup.string().required(true),
    city: yup.string().required(true),
    phone: yup.string().required(true),
    commune: yup.string().required(true),
    country: yup.string().required(true),
    firstname: yup.string().required(true),
    lastname: yup.string().required(true),
  };
}
