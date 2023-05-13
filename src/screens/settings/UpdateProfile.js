/** @format */
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { ModalPickImage } from "../../components/ModalPickImage";
import { pickImage, takePhoto } from "../../utils/images";
import { themeColors } from "../../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";

export function UpdateProfile(props) {
  const [archive, setArchive] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const {
    auth,
    authenticateUser,
    token,
    loading,
    updateProfileWithImage,
    updateProfileWithoutImage,
  } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    authenticateUser();
    formik.setFieldValue("name", auth.name);
    formik.setFieldValue("lastname", auth.lastname);
    formik.setFieldValue("phone", auth.phone);
  }, [token]);

  // console.log(archive);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (user) => {
      if (archive === "") {
        const { error, message } = await updateProfileWithoutImage(user);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("settings");
          formik.resetForm();
        } else {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          return;
        }
      } else {
        const { error, message } = await updateProfileWithImage(archive, user);
        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("settings");
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

  const onPickImage = async () => {
    const result = await pickImage();
    if (result === undefined) return;
    setArchive(result);
  };

  const onTakePhoto = async () => {
    const result = await takePhoto();
    if (result === undefined) return;
    setArchive(result);
  };

  return (
    <>
      <ScrollView>
        <TouchableOpacity
          className='py-4  mb-3 mt-5 rounded-xl flex-row justify-center items-center mx-6'
          style={{ backgroundColor: themeColors.bg }}
          onPress={() => setModalVisible(true)}>
          {archive === "" ? (
            <Image
              source={{ uri: `${auth.image}` }}
              className='w-10 h-10 mr-5 rounded-full'
            />
          ) : (
            <Image
              source={{ uri: `${archive}` }}
              className='w-10 h-10 mr-5 rounded-full'
            />
          )}

          <Text className={"text-xl font-bold text-center text-white"}>
            Cambiar foto
          </Text>
        </TouchableOpacity>

        <View className='mx-6'>
          <TextInput
            mode='outlined'
            className='mb-4 mt-1 bg-[#192734]'
            label='Tu nombre'
            onChangeText={(text) => formik.setFieldValue("name", text)}
            value={formik.values.name}
            error={formik.errors.name}
          />

          <TextInput
            mode='outlined'
            className='mb-4 mt-1 bg-[#192734]'
            label='Tu apellido'
            onChangeText={(text) => formik.setFieldValue("lastname", text)}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />

          <TextInput
            mode='outlined'
            className='mb-4 mt-1 bg-[#192734]'
            label='Tu telefono'
            onChangeText={(text) => formik.setFieldValue("phone", text)}
            value={formik.values.phone}
            error={formik.errors.phone}
          />

          <Button
            color={themeColors.bg}
            className='rounded-xl py-1 mt-4'
            mode='contained'
            onPress={formik.handleSubmit}
            loading={loading}>
            {!loading && (
              <Text className='text-lg font-bold text-center text-white'>
                Editar perfil
              </Text>
            )}
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

export default UpdateProfile;

function initialValues() {
  return {
    name: "",
    phone: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    name: yup.string().required(true),
    phone: yup.string().required(true),
    lastname: yup.string().required(true),
  };
}
