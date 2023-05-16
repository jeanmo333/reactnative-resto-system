/** @format */

import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import BannerSlider from "../components/menu/BannerSlider";
import { usePlates } from "../hooks/usePlates";
import { useCategories } from "../hooks/useCategories";
import { themeColors } from "../theme";
import Search from "../components/Search";
import { windowWidth } from "../utils/constants";
import { Image } from "react-native";
import currencyFormatter from "../utils/currencyFormatter";

const SPACING = 10;
const ITEM_WIDTH = windowWidth / 2 - SPACING * 3;

export default function Menu(props) {
  const { authenticateUser, token } = useAuth();
  const { plates, getPlates, setSearchPlatesResult, searchPlatesResult } =
    usePlates();
  const { categories, getCategories } = useCategories();
  const [activeCategory, setActiveCategory] = useState("");

  const categoriesNames = categories.map((category) => category.name);

  useEffect(() => {
    getPlates();
    setActiveCategory(categoriesNames[0]);
    authenticateUser();
    getCategories();
  }, [token]);

  //  console.log(plates);

  return (
    <View>
      <Search
        placeholder='¿Que te gustaria comer?'
        data={plates}
        setData={setSearchPlatesResult}
      />

      {/* <FlatList
        className='mx-6 mt-4'
        data={plates[0].images}
        renderItem={({ item, index }) => (
          <BannerSlider index={index} item={item} />
        )}
        horizontal
      /> */}

      <View className='py-2 pb-3 mt-2 mx-3'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoriesNames.map((category, index) => {
            let isActive = category == activeCategory;
            return (
              <TouchableOpacity
                onPress={() => setActiveCategory(category)}
                key={index}
                className='p-1 pb-2 px-3 mr-2 '
                style={{
                  backgroundColor: isActive ? themeColors.bg : "gray",
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                  }}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {searchPlatesResult.map((plate) => (
        <TouchableOpacity
          key={plate.id}
          onPress={() => {
            // Eliminar algunas propiedades del platillo
            // const { existencia, ...platilloNuevo } = platillo;
            // seleccionarPlatillo(platilloNuevo);
            // navigation.navigate("DetallePlatillo");
          }}>
          <View style={styles.container}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: `${plate.images[0]}`,
                }}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
                {plate.name}
              </Text>
              <Text
                style={styles.description}
                numberOfLines={2}
                ellipsizeMode='tail'>
                {plate.description}
              </Text>

              <Text style={styles.price}>
                {currencyFormatter(plate.sale_price)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: themeColors.bg,
    marginHorizontal: 10,
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 10,
    height: 127,
  },
  containerImage: {
    width: "35%",
    height: 120,
    paddingRight: 10,
  },
  image: {
    height: 125,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    width: "65%",
    justifyContent: "center",
    paddingRight: 15,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: themeColors.bg,
  },
  description: {
    textAlign: "justify",
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
    marginBottom: 5,
  },
});
