/** @format */

import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { themeColors } from "../theme";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import LoadingButton from "./LoadingButton";

// interface Props {
//   openGallery: () => void;
//   openCamera: () => void;
//   modalUseState: boolean;
//   setModalUseState: React.Dispatch<React.SetStateAction<boolean>>;
// }

export const ModalPickImage = ({
  openGallery,
  openCamera,
  setModalUseState,
  modalUseState,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalUseState}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalUseState(!modalUseState);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className='text-lg'>Selecciona una opcion</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                className='py-3  mb-3 rounded-xl flex items-center'
                style={{ backgroundColor: themeColors.bg }}
                onPress={() => {
                  openGallery();
                  setModalUseState(false);
                }}>
                <Text className={"text-xl font-bold text-center text-white"}>
                  Galeria
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                className='py-3  mb-3 rounded-xl flex items-center'
                style={{ backgroundColor: themeColors.bg }}
                onPress={() => {
                  openCamera();
                  setModalUseState(false);
                }}>
                <Text className={"text-xl font-bold text-center text-white"}>
                  Camera
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                className='py-3  mb-3 rounded-xl flex items-center'
                style={{ backgroundColor: themeColors.danger }}
                onPress={() => {
                  setModalUseState(false);
                }}>
                <Text className={"text-xl font-bold text-center text-white"}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  modalView: {
    width: 250,
    height: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,

    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
  },
});
