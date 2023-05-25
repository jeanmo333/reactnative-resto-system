/** @format */
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#877dfa",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#877dfa",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#877dfa",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#877dfa",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#877dfa",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#877dfa",
};

const { height, width } = Dimensions.get("window");

const OrderTracking = ({ route }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const status = route.params;
  console.log(status);

  const nextStep = () => {
    setCurrentPosition(currentPosition + 1);
  };

  const labels = [
    "Cart",
    "Delivery Address",
    "Order Summary",
    "Payment Method",
    "Track",
  ];

  const data = [
    {
      label: "Recibido",
      status: "Tu orden ha sido recibido",
      datetime: "lun, 3 de avril 2020",
    },
    {
      label: "Recibido",
      status: "Tu orden ha sido recibido",
      datetime: "lun, 3 de avril 2020",
    },
    {
      label: "Recibido",
      status: "Tu orden ha sido recibido",
      datetime: "lun, 3 de avril 2020",
    },
    {
      label: "Recibido",
      status: "Tu orden ha sido recibido",
      datetime: "lun, 3 de avril 2020",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Resumen de la orden</Text>
      </View>

      <View style={styles.indicatorContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          direction='vertical'
          renderLabel={({ position, stepStatus, label, crntPosition }) => {
            return (
              <View style={styles.lblContainer}>
                <Text style={styles.lblText}>{data[0].label}</Text>
                <Text style={[styles.status, { marginTop: 5 }]}>
                  {data[0].status}
                </Text>
                <Text style={styles.status}>{data[0].datetime}</Text>
              </View>
            );
          }}
        />

        <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    padding: 10,
    width: "100%",
    backgroundColor: "#000",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#ff3232",
    fontSize: 22,
    fontWeight: "bold",
  },
  indicatorContainer: {
    height: height - 170,
    width: width - 30,
    padding: 20,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: "#000",
  },
  lblContainer: {
    marginTop: 30,
    paddingLeft: 5,
    padding: 10,
    width: width - 100,
  },
  lblText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },
  status: {
    fontSize: 15,
    color: "gray",
  },
  nextBtn: {
    alignSelf: "flex-end",
  },
  text: {
    color: "#ff3232",
    fontSize: 18,
  },
});
