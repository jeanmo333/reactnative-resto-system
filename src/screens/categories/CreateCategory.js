/** @format */

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { themeColors } from "../../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCategories } from "../../hooks/useCategories";
import Toast from "react-native-root-toast";
import ScreenLoading from "../../components/ScreenLoading";

export function CreateCategory(props) {
  const [id, setId] = useState("");
  const [loadingSreen, setLoadingSreen] = useState(false);
  const [newCategory, setNewCategory] = useState(true);
  const { params } = useRoute();

  const { loading, addCategory, getCategory, updateCategory } = useCategories();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (params?.idCategory) {
        setLoadingSreen(true);
        const { category } = await getCategory(params.idCategory);
        setLoadingSreen(false);
        formik.setFieldValue("id", category.id);
        formik.setFieldValue("name", category.name);
        formik.setFieldValue("description", category.description);
        setId(category.id);
        setNewCategory(false);
      }
    })();
  }, [params]);

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
          navigation.navigate("categories");
          formik.resetForm();
        } else {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          return;
        }
      } else {
        const { error, message } = await updateCategory(id, category);
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

  if (loadingSreen) return <ScreenLoading />;

  return (
    <>
      <Text className='text-3xl text-center font-bold mt-3'>
        {newCategory ? "Creando categoria" : "Editando categoria"}
      </Text>

      <Divider className='mb-6 pb-2 mx-6' />

      <ScrollView>
        <View className='mx-6'>
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

          <Button
            color={themeColors.bg}
            className='rounded-xl py-1 mt-5'
            mode='contained'
            onPress={formik.handleSubmit}
            loading={loading}>
            <Text className='text-lg font-bold text-center text-white'>
              {!loading && newCategory
                ? "Crear categoria"
                : !loading && !newCategory && "Editar Categoria"}
            </Text>
          </Button>
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
