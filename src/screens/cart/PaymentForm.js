/** @format */

/** @format */
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput, Button, Divider, Text } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { themeColors } from "../../theme";
import usePreferences from "../../hooks/usePreferences";
import { useOders } from "../../hooks/useOders";
import currencyFormatter from "../../utils/currencyFormatter";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constants";
import LoadingButton from "../../components/LoadingButton";
const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY);

export function PaymentForm({ navigation }) {
  const { theme } = usePreferences();
  const {
    total,
    idAddressSelected,
    orderDetail,
    createMyOrder,
    loadingOrder,
    emptyCart,
    numberOfItems,
  } = useOders();

  let details = [];
  orderDetail.map((item) => {
    details.push({
      idProduct: item.id,
      quantity: item.quantity,
    });
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (dataPayment) => {
      const result = await stripe.createToken({ card: dataPayment });

      const body = {
        idClientStripe: result.id,
        idAddress: idAddressSelected,
        details,
      };

      if (result?.error) {
        Toast.show(result.error.message, {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
        return;
      } else {
        if (idAddressSelected === "") {
          Toast.show("Debe seleccionar una direccion", {
            position: Toast.positions.CENTER,
          });
          setLoading(false);
          return;
        }

        const { error, message } = await createMyOrder(body);

        if (!error) {
          Toast.show(message, {
            position: Toast.positions.CENTER,
          });
          navigation.navigate("my-orders");
          emptyCart();
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
    <View style={styles.continer}>
      <TextInput
        mode='outlined'
        label='Nombre de la tarjeta'
        style={{
          backgroundColor: theme === "dark" ? "#192734" : "#fff",
        }}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        mode='outlined'
        label='Numero de tarjeta'
        style={{
          backgroundColor: theme === "dark" ? "#192734" : "#fff",
          marginTop: 20,
        }}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
        keyboardType='numeric'
      />
      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYearInputs}>
          <TextInput
            className='flex-1 mr-2'
            mode='outlined'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            label='Mes'
            keyboardType='numeric'
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            className='flex-1 mr-2'
            mode='outlined'
            label='Año'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            keyboardType='numeric'
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />

          <TextInput
            mode='outlined'
            className='flex-1'
            style={{ backgroundColor: theme === "dark" ? "#192734" : "#fff" }}
            keyboardType='numeric'
            label='CVV/CVC'
            onChangeText={(text) => formik.setFieldValue("cvc", text)}
            value={formik.values.cvc}
            error={formik.errors.cvc}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className='py-3 mb-3 mt-5 rounded-xl flex items-center'
        style={{ backgroundColor: themeColors.bg }}
        onPress={formik.handleSubmit}>
        {loadingOrder ? (
          <LoadingButton />
        ) : (
          <Text className={"text-xl font-bold text-center text-white"}>
            Pagar :{" "}
            <Text
              className={
                "text-lg font-bold text-center text-[#192734] flex items-center"
              }>
              {currencyFormatter(total)}
            </Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().min(16).max(16).required(true),
    exp_month: Yup.string().min(2).max(2).required(true),
    exp_year: Yup.string().min(2).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(6).required(true),
  };
}

const styles = StyleSheet.create({
  continer: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 12,
  },
  containerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerInputs: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  inputCvc: {
    width: "40%",
  },
  containerMonthYearInputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  btnContent: {
    paddingVertical: 4,
    backgroundColor: themeColors.blue,
  },
  btnText: {
    fontSize: 15,
  },
  divider: {
    padding: 5,
    marginBottom: 10,
  },
});
