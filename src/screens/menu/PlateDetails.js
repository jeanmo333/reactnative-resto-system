/** @format */

import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import BannerSlider from "../../components/menu/BannerSlider";
import currencyFormatter from "../../utils/currencyFormatter";
import { themeColors } from "../../theme";
import { useOders } from "../../hooks/useOders";
import Quantity from "../../components/plateDetail/Quantity";
import Toast from "react-native-root-toast";
import { Image } from "react-native";
import { windowWidth } from "../../utils/constants";

const PlateDetails = ({ route, navigation }) => {
  const plate = route.params;
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(plate.sale_price);

  // console.log(plate);
  const { addItemToOrderDetail } = useOders();

  const item = {
    ...plate,
    quantity,
  };

  useEffect(() => {
    calculateSubTotal();
  }, [quantity]);

  const calculateSubTotal = () => {
    const subtotal = plate.sale_price * quantity;
    setSubtotal(subtotal);
  };

  return (
    <View>
      <Image
        style={{ width: windowWidth, height: 350 }}
        source={{
          uri: `${plate.image}`,
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.nombre}>{plate.name}</Text>

        <Text style={styles.descripcion} numberOfLines={3} ellipsizeMode='tail'>
          {plate.description}
        </Text>

        <View style={styles.conatinerSubtotal}>
          <Text style={styles.dataText}>Subtotal:</Text>
          <Text style={styles.dataValue}>{currencyFormatter(subtotal)}</Text>
        </View>

        <Quantity quantity={quantity} setQuantity={setQuantity} />

        {plate.stock === 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            className='py-3 mt-8 mb-3 rounded-xl flex items-center'
            style={{ backgroundColor: themeColors.danger }}>
            <Text className={"text-xl font-bold text-center text-white"}>
              No disponible
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className='py-3 mt-8 mb-3 rounded-xl flex items-center'
            style={{ backgroundColor: themeColors.bg }}
            onPress={() => {
              if (plate.stock < quantity) {
                Toast.show("Stock insuficiente", {
                  position: Toast.positions.CENTER,
                });
                return;
              }

              addItemToOrderDetail(item);
              navigation.navigate("cart");
            }}>
            <Text className={"text-xl font-bold text-center text-white"}>
              Agregar al pedido
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <IconButton
        icon='arrow-left'
        size={30}
        color={themeColors.blue}
        onPress={() => navigation.navigate("menu-stack")}
        style={{ position: "absolute", top: 5, left: 10 }}
      />
    </View>
  );
};

export default PlateDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 25,
  },
  descripcion: {
    textAlign: "justify",
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  conatinerSubtotal: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dataText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  dataValue: {
    fontSize: 20,
    paddingLeft: 10,
    color: themeColors.bg,
    fontWeight: "bold",
  },
});
