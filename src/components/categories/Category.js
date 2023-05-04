/** @format */
import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { themeColors } from "../../theme";
import { useCategories } from "../../hooks/useCategories";

export default function Category({ category, setReloadCategories }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { deleteCategory } = useCategories();

  const alertDeleteCategory = (id) => {
    Alert.alert(
      "Eliminar Categoria",
      "¿Estas seguro?, Esta accion no puede dehacer!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: async () => {
            setLoading(true);
            await deleteCategory(id);
            setReloadCategories(true);
            setLoading(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View key={category.id} style={styles.category} className='mb-3'>
      <View style={styles.containerImage}>
        <Text style={styles.static}>Imagen : </Text>
        <Image
          source={{
            uri: `${category.image}`,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.static} numberOfLines={1} ellipsizeMode='tail'>
        Nombre : {""} <Text style={styles.value}>{category.name}</Text>
      </Text>

      <Text style={styles.static} numberOfLines={2} ellipsizeMode='tail'>
        Descripcion : <Text style={styles.value}>{category.description}</Text>
      </Text>

      <View style={styles.actionsAndImage}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("create-category", {
              idCategory: category.id,
            })
          }>
          <Image
            source={require("../../../assets/icons/edit.png")}
            style={{
              height: 47,
              width: 47,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alertDeleteCategory(category.id)}>
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
  category: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 20,
    position: "relative",
  },
  containerImage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  static: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeColors.blue,
    textAlign: "justify",
  },
  image: {
    height: 40,
    width: 40,
    marginLeft: 40,
    borderRadius: 50,
  },
  actionsAndImage: {
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
