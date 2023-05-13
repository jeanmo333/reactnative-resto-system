/** @format */
import { useEffect } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { themeColors } from "../../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";

export function UpdatePassword(props) {
  const { updatePassword, authenticateUser, token, loading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    authenticateUser();
  }, [token]);

  // console.log(archive);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (dataPassword) => {
      const { error, message } = await updatePassword(dataPassword);
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
    },
  });

  return (
    <View className='mx-8 my-8'>
      <TextInput
        secureTextEntry
        mode='outlined'
        className='mb-4 mt-1 bg-[#192734]'
        label='Tu password actual'
        onChangeText={(text) => formik.setFieldValue("pwd_now", text)}
        value={formik.values.pwd_now}
        error={formik.errors.pwd_now}
      />

      <TextInput
        secureTextEntry
        mode='outlined'
        className='mb-4 mt-1 bg-[#192734]'
        label='Tu nuevo password'
        onChangeText={(text) => formik.setFieldValue("pwd_new", text)}
        value={formik.values.pwd_new}
        error={formik.errors.pwd_new}
      />

      <Button
        color={themeColors.bg}
        className='rounded-xl py-1 mt-4'
        mode='contained'
        onPress={formik.handleSubmit}
        loading={loading}>
        {!loading && (
          <Text className='text-lg font-bold text-center text-white'>
            Editar password
          </Text>
        )}
      </Button>
    </View>
  );
}

export default UpdatePassword;

function initialValues() {
  return {
    pwd_now: "",
    pwd_new: "",
  };
}

function validationSchema() {
  return {
    pwd_now: yup.string().required(true),
    pwd_new: yup.string().required(true),
  };
}
