/** @format */

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const SelectEstatusUser = ({ isActive, setIsActive }) => {
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "Inactivo", value: false },
    { label: "Activo", value: true },
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
      placeholder={!isFocus ? "Seleccione una opcion" : "..."}
      searchPlaceholder='Buscar...'
      value={isActive}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setIsActive(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default SelectEstatusUser;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
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
