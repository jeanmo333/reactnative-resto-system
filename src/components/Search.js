/** @format */

import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = [
  "name",
  "description",
  "status",
  "email",
  "lastname",
  "stock",
];

export default function Search(props) {
  const { data, setData, placeholder } = props;

  const onSearch = (text) => {
    const resultSearch = data.filter(createFilter(text, KEYS_TO_FILTERS));
    setData(resultSearch);
  };

  return (
    <View style={styles.formInput} className='mx-3'>
      <TextInput
        placeholderTextColor={"gray"}
        style={styles.formTextInput}
        placeholder={placeholder}
        onChangeText={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formInput: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: "gray",
    borderRadius: 10,
  },
  formTextInput: {
    padding: 12,
    borderRadius: 10,
    fontSize: 18,
    color: "gray",
  },
});
