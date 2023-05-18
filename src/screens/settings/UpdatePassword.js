/** @format */
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { themeColors } from "../../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "react-native-root-toast";
import LoadingButton from "../../components/LoadingButton";
import usePreferences from "../../hooks/usePreferences";

export function UpdatePassword(props) {
  const { updatePassword, authenticateUser, token, loading } = useAuth();
  const { theme } = usePreferences();
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
        style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
        secureTextEntry
        mode='outlined'
        className='mb-4 mt-1'
        label='Tu password actual'
        onChangeText={(text) => formik.setFieldValue("pwd_now", text)}
        value={formik.values.pwd_now}
        error={formik.errors.pwd_now}
      />

      <TextInput
        secureTextEntry
        style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
        mode='outlined'
        className='mb-4 mt-1'
        label='Tu nuevo password'
        onChangeText={(text) => formik.setFieldValue("pwd_new", text)}
        value={formik.values.pwd_new}
        error={formik.errors.pwd_new}
      />

      <TouchableOpacity
        className='py-3 mb-3 mt-10 rounded-xl flex items-center'
        style={{ backgroundColor: themeColors.bg }}
        onPress={formik.handleSubmit}>
        <Text className='text-lg font-bold text-center text-white'>
          {loading ? <LoadingButton /> : "Editar password"}
        </Text>
      </TouchableOpacity>
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
