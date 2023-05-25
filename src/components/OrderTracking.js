/** @format */
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import StepIndicator from "react-native-step-indicator";

const OrderTracking = ({ order }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const labels = [
    "Pagado",
    "Recibido",
    "Preparando",
    " En camino",
    "Entegrado",
  ];

  useEffect(() => {
    switch (order.status) {
      case "PAGADO":
        setCurrentPosition(0);
        break;
      case "RECIBIDO":
        setCurrentPosition(1);
        break;
      case "PREPARANDO":
        setCurrentPosition(2);
        break;
      case "EN CAMINO":
        setCurrentPosition(3);
        break;
      case "ENTEGRADO":
        setCurrentPosition(4);
        break;

      default:
        setCurrentPosition(0);
        break;
    }
  }, [order.status]);

  return (
    <View className='mb-2'>
      <StepIndicator
        customStyles={styles.customStyles}
        currentPosition={currentPosition}
        labels={labels}
        direction='horizontal'
        stepCount={5}
      />
    </View>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  customStyles: {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#0098d3",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#0098d3",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#0098d3",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#0098d3",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#0098d3",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 11,
    currentStepLabelColor: "#0098d3",
  },
});
