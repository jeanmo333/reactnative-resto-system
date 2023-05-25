/** @format */

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const SelectStatus = ({ status, setStatus }) => {
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "PREPARANDO", value: "PREPARANDO" },
    { label: "EN CAMINO", value: "EN CAMINO" },
    { label: "ENTEGRADO", value: "ENTEGRADO" },
  ];

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "gray" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField='label'
      valueField='value'
      placeholder={!isFocus ? "Cambiar estado" : "..."}
      searchPlaceholder='Buscar...'
      value={status}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setStatus(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default SelectStatus;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 1,
  },
  label: {
    position: "absolute",
    backgroundColor: "gray",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
