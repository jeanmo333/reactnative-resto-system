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
import { themeColors } from "../../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import ScreenLoading from "../../components/ScreenLoading";
import { pickImage, takePhoto } from "../../utils/images";
import { ModalPickImage } from "../../components/ModalPickImage";
import { usePlates } from "../../hooks/usePlates";
import DropdownComponent from "../../components/DropdownComponent";

export function CreatePlates(props) {
  const [id, setId] = useState("");
  const [archives, setArchives] = useState([]);
  const [loadingSreen, setLoadingSreen] = useState(false);
  const [newPlate, setNewPlate] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const { params } = useRoute();

  const { loading, addPlate, updatePlate, getPlate } = usePlates();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (params?.idPlate) {
        setLoadingSreen(true);
        const { plate } = await getPlate(params?.idPlate);
        setLoadingSreen(false);
        formik.setFieldValue("id", plate.id);
        formik.setFieldValue("name", plate.name);
        formik.setFieldValue("description", plate.description);
        formik.setFieldValue("prepared_price", plate.prepared_price.toString());
        formik.setFieldValue("sale_price", plate.sale_price.toString());
        formik.setFieldValue("stock", plate.stock.toString());
        setIdCategory(plate.id.toString());
        setId(plate.id);
        setNewPlate(false);
      }
    })();
  }, [params]);

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
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (data) => {
      if (newPlate) {
        const plate = {
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

        const { error, message } = await addPlate(archives, plate);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("plates");
          formik.resetForm();
        } else {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          return;
        }
      } else {
        const { error, message } = await updatePlate(id, data);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("plates");
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
      <Text className='text-3xl text-center font-bold mt-2'>
        {newPlate ? " Creando platillo" : "Editando platillo"}
      </Text>

      <Divider className='mb-3 pb-2 mx-6' />

      <ScrollView>
        {archives.length < 3 && newPlate && (
          <TouchableOpacity
            className='py-3  mb-1 rounded-xl flex-row justify-center items-center mx-6'
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

        <View className='flex-row justify-between mx-7 mt-2 mb-2'>
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

        <View className='mx-6'>
          <TextInput
            mode='outlined'
            className='mb-3 mt-1 bg-[#192734]'
            label='Nombre platillo'
            onChangeText={(text) => formik.setFieldValue("name", text)}
            value={formik.values.name}
            error={formik.errors.name}
          />

          <TextInput
            mode='outlined'
            className='mb-3  bg-[#192734]'
            label='Descripcion'
            onChangeText={(text) => formik.setFieldValue("description", text)}
            value={formik.values.description}
            error={formik.errors.description}
          />
          {newPlate && (
            <DropdownComponent
              idCategory={idCategory}
              setIdCategory={setIdCategory}
            />
          )}

          <TextInput
            keyboardType='numeric'
            mode='outlined'
            className='mb-3  bg-[#192734]'
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
            className='mb-3  bg-[#192734]'
            label='Precio venta'
            onChangeText={(text) => formik.setFieldValue("sale_price", text)}
            value={formik.values.sale_price}
            error={formik.errors.sale_price}
          />

          <TextInput
            keyboardType='numeric'
            mode='outlined'
            className='mb-3  bg-[#192734]'
            label='Stock'
            onChangeText={(text) => formik.setFieldValue("stock", text)}
            value={formik.values.stock}
            error={formik.errors.stock}
          />

          <Button
            color={themeColors.bg}
            className='rounded-xl py-1 mt-2'
            mode='contained'
            onPress={formik.handleSubmit}
            loading={loading}>
            <Text className='text-lg font-bold text-center text-white'>
              {!loading && newPlate
                ? "Crear plato"
                : !loading && !newPlate && "Editar plato"}
            </Text>
          </Button>

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

function validationSchema() {
  return {
    name: yup.string().required(true),
    description: yup.string().required(true),
    prepared_price: yup.number().required(true),
    sale_price: yup.number().required(true),
    stock: yup.number().required(true),
  };
}
