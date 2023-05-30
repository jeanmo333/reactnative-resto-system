/** @format */

import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import { Text } from "react-native-paper";
import useAuth from "../hooks/useAuth";

export default function Dashboard(props) {
  const { auth, authenticateUser } = useAuth();

  //console.log(auth);
  return <Text className='font-bold text-2xl mt-2 text-center'>Dashboard</Text>;
}

const styles = StyleSheet.create({});
