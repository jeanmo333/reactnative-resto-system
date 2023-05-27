/** @format */

import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { themeColors } from "../../theme";
import Toast from "react-native-root-toast";
import { pickImage, takePhoto } from "../../utils/images";
import { ModalPickImage } from "../../components/ModalPickImage";
import { usePlates } from "../../hooks/usePlates";
import LoadingButton from "../../components/LoadingButton";
import usePreferences from "../../hooks/usePreferences";
import SelectCategory from "../../components/plates/SelectCategory";

export function CreatePlates({ route, navigation }) {
  const [archives, setArchives] = useState([]);
  const [newPlate, setNewPlate] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [idPlate, setIdPlate] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const plate = route.params;

  // console.log(plate);
  const { theme } = usePreferences();
  const { loadingPlate, addPlate, updatePlate } = usePlates();

  useEffect(() => {
    if (plate?.id) {
      formik.setFieldValue("id", plate?.id);
      formik.setFieldValue("name", plate?.name);
      formik.setFieldValue("description", plate?.description);
      formik.setFieldValue("prepared_price", plate?.prepared_price.toString());
      formik.setFieldValue("sale_price", plate?.sale_price.toString());
      formik.setFieldValue("stock", plate?.stock.toString());
      setIdCategory(plate?.category.id);
      setIdPlate(plate?.id);
      setNewPlate(false);
    }
  }, [plate]);

  const onPickImage = async () => {
    const result = await pickImage();
    if (result === undefined) return;
    setArchives([...archives, result]);
  };

  const onTakePhoto = async () => {
    const result = await takePhoto();
    if (result === undefined) return;
    setArchives([...archives, result]);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    // validationSchema: yup.object(validationSchema()),
    onSubmit: async (data) => {
      if (
        [
          formik.values.name,
          formik.values.description,
          formik.values.prepared_price,
          formik.values.sale_price,
          formik.values.stock,
        ].includes("")
      ) {
        Toast.show("Por favor ingrese todos los campos", {
          position: Toast.positions.CENTER,
        });
        return;
      }

      if (newPlate) {
        const plateData = {
          ...data,
          idCategory,
        };
        if (idCategory === "") {
          Toast.show("Selecciona una categoria", {
            position: Toast.positions.CENTER,
          });
          return;
        }

        if (archives.length < 3) {
          Toast.show("minimo 3 imagenes", {
            position: Toast.positions.CENTER,
          });
          return;
        }

        const { error, message } = await addPlate(archives, plateData);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("plates-stack");
          formik.resetForm();
        } else {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          return;
        }
      } else {
        const { error, message } = await updatePlate(idPlate, data);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("plates-stack");
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
      <Text className='text-3xl text-center font-bold mt-2'>
        {newPlate ? " Creando platillo" : "Editando platillo"}
      </Text>

      <Divider className='mb-3 pb-2 mx-3' />

      <ScrollView>
        {archives.length < 3 && newPlate && (
          <TouchableOpacity
            activeOpacity={0.7}
            className='py-3  mb-1 rounded-xl flex-row justify-center items-center mx-3'
            style={{ backgroundColor: themeColors.bg }}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require("../../../assets/icons/upload.png")}
              className='w-8 h-8 mr-3'
            />

            <Text className={"text-xl font-bold text-center text-white"}>
              Subir imagen platillo
            </Text>
          </TouchableOpacity>
        )}

        <View className='flex-row justify-between mx-4 mt-2 mb-2'>
          {archives.length > 0 &&
            archives.map((archive, index) => (
              <View key={index}>
                <Image
                  source={{ uri: archive }}
                  className='w-12 h-12  rounded-lg'
                  style={{ borderColor: themeColors.dark, borderWidth: 1 }}
                />
              </View>
            ))}
        </View>

        <View className='mx-3'>
          <TextInput
            mode='outlined'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            className='mb-3 mt-1'
            label='Nombre platillo'
            onChangeText={(text) => formik.setFieldValue("name", text)}
            value={formik.values.name}
            error={formik.errors.name}
          />

          <TextInput
            mode='outlined'
            className='mb-3'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            label='Descripcion'
            onChangeText={(text) => formik.setFieldValue("description", text)}
            value={formik.values.description}
            error={formik.errors.description}
          />
          {newPlate && (
            <SelectCategory
              idCategory={idCategory}
              setIdCategory={setIdCategory}
            />
          )}

          <TextInput
            keyboardType='numeric'
            mode='outlined'
            className='mb-3'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            label='Precio preparacion'
            onChangeText={(text) =>
              formik.setFieldValue("prepared_price", text)
            }
            value={formik.values.prepared_price}
            error={formik.errors.prepared_price}
          />

          <TextInput
            keyboardType='numeric'
            mode='outlined'
            className='mb-3'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            label='Precio venta'
            onChangeText={(text) => formik.setFieldValue("sale_price", text)}
            value={formik.values.sale_price}
            error={formik.errors.sale_price}
          />

          <TextInput
            keyboardType='numeric'
            mode='outlined'
            className='mb-3'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            label='Stock'
            onChangeText={(text) => formik.setFieldValue("stock", text)}
            value={formik.values.stock}
            error={formik.errors.stock}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            className='py-3  mb-3 rounded-xl flex items-center'
            style={{ backgroundColor: themeColors.bg }}
            onPress={formik.handleSubmit}>
            <Text className={"text-xl font-bold text-center text-white"}>
              {loadingPlate ? (
                <LoadingButton />
              ) : newPlate ? (
                "Crear platillo"
              ) : (
                "Editar platillo"
              )}
            </Text>
          </TouchableOpacity>

          <ModalPickImage
            openGallery={onPickImage}
            openCamera={onTakePhoto}
            modalUseState={modalVisible}
            setModalUseState={setModalVisible}
          />
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
    prepared_price: "",
    sale_price: "",
    stock: "",
  };
}

// function validationSchema() {
//   return {
//     name: yup.string().required(true),
//     description: yup.string().required(true),
//     prepared_price: yup.number().required(true),
//     sale_price: yup.number().required(true),
//     stock: yup.number().required(true),
//   };
// }
