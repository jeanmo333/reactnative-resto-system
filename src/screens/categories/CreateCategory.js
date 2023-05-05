/** @format */

import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { themeColors } from "../../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ModalPickImage } from "../../components/ModalPickImage";
import { useCategories } from "../../hooks/useCategories";
import Toast from "react-native-root-toast";
import ScreenLoading from "../../components/ScreenLoading";

export function CreateCategory(props) {
  const [archive, setArchive] = useState("");
  const [id, setId] = useState("");
  const [loadingSreen, setLoadingSreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState(true);
  const { params } = useRoute();
  //console.log(category);
  // console.log(params.idCategory);
  const { loading, addCategory, getCategory, updateCategory } = useCategories();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (params?.idCategory) {
        setLoadingSreen(true);
        const { category } = await getCategory(params.idCategory);
        // console.log(category);
        setLoadingSreen(false);
        formik.setFieldValue("id", category.id);
        formik.setFieldValue("name", category.name);
        formik.setFieldValue("description", category.description);
        setArchive(category.image);
        setId(category.id);
        setNewCategory(false);
      }
    })();
  }, [params]);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     //onChange(result.assets[0].uri);
  //     setArchive(result.assets[0].uri);
  //   }
  // };

  // const takePhoto = async () => {
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     // onChange(result.assets[0].uri);
  //     setArchive(result.assets[0].uri);
  //   }
  // };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (category) => {
      // if (archive === "") {
      //   Toast.show("Hay seleccionar un imagen", {
      //     position: Toast.positions.CENTER,
      //   });
      //   return;
      // }

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
          {/* <TouchableOpacity
            className='py-3  mb-3 rounded-xl flex-row justify-center items-center'
            style={{ backgroundColor: themeColors.bg }}
            onPress={() => setModalVisible(true)}>
            {archive === "" ? (
              <Image
                source={require("../../../assets/icons/upload.png")}
                className='w-8 h-8 mr-3'
              />
            ) : (
              <Image
                source={{ uri: archive }}
                className='w-8 h-8 mr-3 rounded-full'
                style={{ borderColor: themeColors.dark, borderWidth: 1 }}
              />
            )}
            <Text className={"text-xl font-bold text-center text-white"}>
              {newCategory ? "Subir imagen" : "Cambiar imagen"}
            </Text>
          </TouchableOpacity> */}

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

      {/* <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      /> */}
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
