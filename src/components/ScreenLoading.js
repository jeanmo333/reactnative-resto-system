/** @format */

import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function ScreenLoading(props) {
  return (
    <SafeAreaView style={styles.containerLoading}>
      <ActivityIndicator size='large' />
      <Text style={styles.title}>Cargando...</Text>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginTop: 10,
  },
});
