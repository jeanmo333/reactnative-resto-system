/** @format */

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { Text } from "react-native-paper";
import useAuth from "../hooks/useAuth";

export default function Menu(props) {
  const { authenticateUser } = useAuth();

  useEffect(() => {
    authenticateUser();
  }, []);

  //console.log(auth);
  return <Text>Menu</Text>;
}

const styles = StyleSheet.create({});
