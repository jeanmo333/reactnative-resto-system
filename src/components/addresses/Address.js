/** @format */
import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  ActivityIndicator,
  Divider,
  RadioButton,
} from "react-native-paper";
import { themeColors } from "../../theme";
import { DateFormatter } from "../../utils/DateFormatter";
import { useAddresses } from "../../hooks/useAddresses";

export default function Address({
  address,
  setReloadAddresses,
  setIdAddressSelected,
  idAddressSelected,
}) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { deleteAddress } = useAddresses();

  const alertDeleteAddress = (id) => {
    Alert.alert(
      "Eliminar dirreccion",
      "¿Estas seguro?, Esta accion no puede dehacer!",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: async () => {
            setLoading(true);
            await deleteAddress(id);
            setReloadAddresses(true);
            setLoading(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View key={address.id} style={styles.address} className='mb-3'>
      <RadioButton
        value={address.id}
        status={idAddressSelected === address.id ? "checked" : "unchecked"}
        onPress={() => setIdAddressSelected(address.id)}
      />

      <View className='ml-4'>
        <Text className='text-center font-bold text-3xl text-[#877dfa] mb-1 mt-1'>
          {address.title}
        </Text>

        <Divider className='mb-2 pb-2 mx-1' />

        <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
          Tu nombre :{" "}
          <Text style={styles.value}>
            {address.firstname} {address.lastname}
          </Text>
        </Text>

        <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
          Calle :{" "}
          <Text style={styles.value}>
            {address.street} {address.number}
          </Text>
        </Text>

        <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
          Comuna : <Text style={styles.value}>{address.commune}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
          Ciudad : <Text style={styles.value}>{address.city}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
          Pais : <Text style={styles.value}>{address.country}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
          Telefono : <Text style={styles.value}>{address.phone}</Text>
        </Text>

        <Text style={styles.key} numberOfLines={1} ellipsizeMode='tail'>
          Fecha creacion :{" "}
          <Text style={styles.value}>{DateFormatter(address.createdAt)}</Text>
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate("create-address", { ...address });
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
            onPress={() => alertDeleteAddress(address.id)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  address: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    paddingHorizontal: 10,
    paddingBottom: 18,
    marginTop: 10,
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
});
