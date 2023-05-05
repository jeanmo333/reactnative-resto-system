/** @format */
import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { themeColors } from "../../theme";
import { useCategories } from "../../hooks/useCategories";

export default function Plate({ plate, setReloadPlates }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // const { deleteCategory } = useCategories();

  // const alertDeleteCategory = (id) => {
  //   Alert.alert(
  //     "Eliminar Categoria",
  //     "¿Estas seguro?, Esta accion no puede dehacer!",
  //     [
  //       {
  //         text: "NO",
  //       },
  //       {
  //         text: "SI",
  //         onPress: async () => {
  //           setLoading(true);
  //           await deleteCategory(id);
  //           setReloadCategories(true);
  //           setLoading(false);
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  return (
    <View key={plate.id} style={styles.plate} className='mb-3'>
      <View style={styles.containerImage}>
        {plate.images.map((image, index) => (
          <View key={index}>
            <Image
              source={{
                uri: `${image}`,
              }}
              style={styles.image}
            />
          </View>
        ))}
      </View>
      <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
        Nombre : {""} <Text style={styles.value}>{plate.name}</Text>
      </Text>

      <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
        Descripcion : <Text style={styles.value}>{plate.description}</Text>
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate("create-category", {
        //     idCategory: category.id,
        //   })
        // }
        >
          <Image
            source={require("../../../assets/icons/edit.png")}
            style={{
              height: 47,
              width: 47,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
        // onPress={() => alertDeleteCategory(category.id)}
        >
          {loading ? (
            <ActivityIndicator size='large' className='mr-1' />
          ) : (
            <Image
              source={require("../../../assets/icons/delete.png")}
              style={{
                height: 47,
                width: 47,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      )}  */}
    </View>
  );
}

const styles = StyleSheet.create({
  plate: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 20,
    position: "relative",
  },
  containerImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  key: {
    fontWeight: "bold",
    fontSize: 18,
    color: themeColors.blue,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "justify",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  loading: {
    backgroundColor: themeColors.bg,
    opacity: 0.4,
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: 0,
    borderRadius: 5,
    justifyContent: "center",
  },
});
