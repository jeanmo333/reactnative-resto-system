/** @format */

import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";
import { themeColors } from "../../theme";

export default function Quantity(props) {
  const { quantity, setQuantity } = props;
  // console.log(quantity);

  // Decrementa en uno
  const decreaseOne = () => {
    if (quantity > 1) {
      const newQuantity = parseInt(quantity) - 1;
      setQuantity(newQuantity);
    }
  };

  // incrementa en uno la cantidad
  const increaseOne = () => {
    const newQuantity = parseInt(quantity) + 1;
    setQuantity(newQuantity);
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon='minus'
        size={25}
        style={styles.btnQuantity}
        iconColor={themeColors.bgLight}
        onPress={() => decreaseOne()}
      />

      <TextInput
        style={styles.textInput}
        value={quantity.toString()}
        onChangeText={(quantity) => setQuantity(quantity)}
      />

      <IconButton
        icon='plus'
        size={25}
        iconColor={themeColors.bgLight}
        style={styles.btnQuantity}
        onPress={() => increaseOne()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  btnQuantity: {
    backgroundColor: themeColors.bg,
    borderRadius: 5,
    margin: 0,
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 20,
    color: "gray",
  },
});
