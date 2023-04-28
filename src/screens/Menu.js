/** @format */

import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import { Text } from "react-native-paper";
import useAuth from "../hooks/useAuth";

export default function Menu(props) {
  const { auth, authenticateUser } = useAuth();

  //console.log(auth);
  return <Text>Menu</Text>;
}

const styles = StyleSheet.create({});
