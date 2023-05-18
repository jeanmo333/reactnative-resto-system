/** @format */

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { themeColors } from "../../theme";
import { useCategories } from "../../hooks/useCategories";
import Toast from "react-native-root-toast";
import LoadingButton from "../../components/LoadingButton";

export function CreateCategory({ route, navigation }) {
  const [idCategory, setIdCategory] = useState("");
  const [newCategory, setNewCategory] = useState(true);

  const category = route.params;
  // console.log(category);
  const { loading, addCategory, updateCategory } = useCategories();

  useEffect(() => {
    if (category?.id) {
      formik.setFieldValue("id", category?.id);
      formik.setFieldValue("name", category?.name);
      formik.setFieldValue("description", category?.description);
      setIdCategory(category.id);
      setNewCategory(false);
    }
  }, [category]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (category) => {
      if (newCategory) {
        const { error, message } = await addCategory(category);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("categories-stack");
          formik.resetForm();
        } else {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          return;
        }
      } else {
        const { error, message } = await updateCategory(idCategory, category);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("categories");
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
        {newCategory ? "Creando categoria" : "Editando categoria"}
      </Text>

      <Divider className='mb-6 pb-2 mx-3' />

      <ScrollView>
        <View className='mx-3'>
          <TextInput
            mode='outlined'
            className='mb-4 mt-1 bg-[#192734]'
            label='Nombre categoria'
            onChangeText={(text) => formik.setFieldValue("name", text)}
            value={formik.values.name}
            error={formik.errors.name}
          />

          <TextInput
            mode='outlined'
            className='mb-4  bg-[#192734]'
            label='Descripcion'
            onChangeText={(text) => formik.setFieldValue("description", text)}
            value={formik.values.description}
            error={formik.errors.description}
          />

          <TouchableOpacity
            className='py-3  mb-3 rounded-xl flex items-center'
            style={{ backgroundColor: themeColors.bg }}
            onPress={formik.handleSubmit}>
            <Text className={"text-xl font-bold text-center text-white"}>
              {loading ? (
                <LoadingButton />
              ) : newCategory ? (
                "Crear categoria"
              ) : (
                "Editar Categoria"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});

function initialValues() {
  return {
    name: "",
    description: "",
  };
}

function validationSchema() {
  return {
    name: yup.string().required(true),
    description: yup.string().required(true),
  };
}
