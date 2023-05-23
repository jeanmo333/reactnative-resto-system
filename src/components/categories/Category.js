/** @format */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { themeColors } from "../../theme";
import { useCategories } from "../../hooks/useCategories";
import { DateFormatter } from "../../utils/DateFormatter";
import useAuth from "../../hooks/useAuth";

export default function Category({ category, setReloadCategories }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { auth } = useAuth();
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
      <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
        Nombre : {""} <Text style={styles.value}>{category.name}</Text>
      </Text>

      <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
        Descripcion : <Text style={styles.value}>{category.description}</Text>
      </Text>

      <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
        Fecha creacion :{" "}
        <Text style={styles.value}>{DateFormatter(category.createdAt)}</Text>
      </Text>

      {auth?.roles.includes("admin") && (
        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate("create-category", { ...category });
            }}>
            <Image
              source={require("../../../assets/icons/edit.png")}
              style={{
                height: 47,
                width: 47,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alertDeleteCategory(category.id)}
            activeOpacity={0.6}>
            {loading ? (
              <ActivityIndicator size='small' color={themeColors.blue} />
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
      )}

      {/* {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            style={{ marginRight: 70, marginBottom: 10 }}
            size='large'
            color='#fff'
          />
        </View>
      )} */}
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
    height: 40,
    width: 40,
    marginLeft: 40,
    borderRadius: 50,
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
    width: 400,
    height: 170,
    borderRadius: 5,
    justifyContent: "center",
  },
});
