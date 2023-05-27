/** @format */
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";

//const

const { height, width } = Dimensions.get("window");

const OrderTracking = ({ route }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  // const status = route.params;
  // console.log(status);

  const nextStep = () => {
    setCurrentPosition(currentPosition + 1);
  };

  const labels = ["Pagado", "Recibido", "Preparando", "En camino", "Entegrado"];

  const data = [
    {
      label: "Recibido",
      stepStatus: "lun, 3 de avril 2020",
    },
    {
      label: "Preparando",
      stepStatus: "lun, 3 de avril 2020",
    },
    {
      label: "En camino",
      stepStatus: "lun, 3 de avril 2020",
    },
    {
      label: "Entegrado",
      stepStatus: "lun, 3 de avril 2020",
    },
  ];
  return (
    <>
      <Text style={styles.headerText}>Resumen de la orden</Text>

      <View style={styles.indicatorContainer}>
        <StepIndicator
          customStyles={styles.customStyles}
          currentPosition={currentPosition}
          labels={labels}
          direction='vertical'
          stepCount={5}
          renderLabel={(item) => {
            return (
              <View style={styles.lblContainer}>
                <Text style={styles.lblText}>{item.label}</Text>
                {/* <Text style={styles.datetime}>{item.position}</Text> */}
              </View>
            );
          }}
        />

        {/* <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    marginTop: 10,
    textAlign: "center",
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
    marginTop: -20,
    paddingLeft: 5,
    padding: 10,
    width: width - 100,
  },
  lblText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },
  datetime: {
    fontSize: 15,
    color: "gray",
  },
  customStyles: {
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
  },
  // nextBtn: {
  //   alignSelf: "flex-end",
  // },
  // text: {
  //   color: "#ff3232",
  //   fontSize: 18,
  // },
});
