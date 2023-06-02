/** @format */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, ActivityIndicator } from "react-native-paper";
import { themeColors } from "../../theme";
import { usePlates } from "../../hooks/usePlates";
import { DateFormatter } from "../../utils/DateFormatter";
import currencyFormatter from "../../utils/currencyFormatter";
import useAuth from "../../hooks/useAuth";

export default function Plate({ plate, setReloadPlates }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { deletePlate } = usePlates();
  const { auth } = useAuth();

  const alertDeletePlate = (id) => {
    Alert.alert(
      "Eliminar platillo",
      "¿Estas seguro?, Esta accion no puede dehacer!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: async () => {
            setLoading(true);
            await deletePlate(id);
            setReloadPlates(true);
            setLoading(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View key={plate.id} style={styles.plate} className='mb-3'>
      <View style={styles.containerImage}>
        <Text className='mr-10 text-[#0098d3] text-lg font-bold'>
          Imagen :{" "}
        </Text>
        <View>
          <Image
            source={{
              uri: `${plate.image}`,
            }}
            style={styles.image}
          />
        </View>
      </View>

      <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
        Nombre : {""} <Text style={styles.value}>{plate.name}</Text>
      </Text>

      <Text style={styles.key} numberOfLines={2} ellipsizeMode='tail'>
        Descripcion : <Text style={styles.value}>{plate.description}</Text>
      </Text>

      <Text style={styles.key}>
        Categoria : <Text style={styles.value}>{plate.category.name}</Text>
      </Text>

      <Text style={styles.key}>
        Precio preparacion :{" "}
        <Text style={styles.value}>
          {currencyFormatter(plate.prepared_price)}
        </Text>
      </Text>

      <Text style={styles.key}>
        Fecha creacion :{" "}
        <Text style={styles.value}>{DateFormatter(plate.createdAt)}</Text>
      </Text>

      <Text style={styles.key}>
        Precio venta :{" "}
        <Text style={styles.value}>{currencyFormatter(plate.sale_price)}</Text>
      </Text>

      <Text style={styles.key}>
        Stock : <Text style={styles.value}>{plate.stock}</Text>
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate("create-plate", { ...plate });
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
          onPress={() => alertDeletePlate(plate.id)}
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
    alignItems: "center",
  },
  key: {
    fontWeight: "bold",
    fontSize: 18,
    color: themeColors.blue,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "justify",
  },
  image: {
    height: 50,
    width: 50,
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
    width: 350,
    height: 415,
    margin: 0,
    borderRadius: 5,
    justifyContent: "center",
  },
});
