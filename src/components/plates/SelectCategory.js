/** @format */

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useCategories } from "../../hooks/useCategories";

const SelectCategory = ({ idCategory, setIdCategory }) => {
  const [isFocus, setIsFocus] = useState(false);
  const { categories, getCategories } = useCategories();
  let data = [];

  categories.map((category) => {
    data.push({
      label: category.name,
      value: category.id,
    });
  });

  useEffect(() => {
    getCategories();
  }, []);

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
      placeholder={!isFocus ? "Selecionar categoria" : "..."}
      searchPlaceholder='Buscar...'
      value={idCategory}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setIdCategory(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 3,
    paddingHorizontal: 12,
    marginBottom: 5,
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
