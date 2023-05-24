/** @format */

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import useAuth from "../../hooks/useAuth";
import { usePlates } from "../../hooks/usePlates";
import { useCategories } from "../../hooks/useCategories";
import { themeColors } from "../../theme";
import Search from "../../components/Search";
import { Image } from "react-native";
import currencyFormatter from "../../utils/currencyFormatter";
import { useNavigation } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import { size } from "lodash";

export default function Menu(props) {
  const { plates, setSearchPlatesResult, searchPlatesResult, loadingPlate } =
    usePlates();
  const { categories, loadingCategory } = useCategories();
  const [activeCategory, setActiveCategory] = useState("");
  const navigation = useNavigation();

  const categoriesNames = categories.map((category) => category.name);

  useEffect(() => {
    setActiveCategory(categoriesNames[0]);
  }, []);

  if (loadingPlate) return <ScreenLoading />;

  return (
    <>
      {size(plates) === 0 ? (
        <Text className='font-bold text-lg text-center mb-3'>
          Aun no tiene Platos agregado
        </Text>
      ) : (
        <View>
          <Search
            placeholder='¿Que te gustaria comer?'
            data={plates}
            setData={setSearchPlatesResult}
          />

          <View className='py-2 pb-1 mt-2 mx-3'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoriesNames.map((category, index) => {
                let isActive = category == activeCategory;
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setActiveCategory(category);
                    }}
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
              activeOpacity={0.7}
              key={plate.id}
              onPress={() => {
                navigation.navigate("plate-details", { ...plate });
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
                  <Text
                    style={styles.name}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
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
      )}
    </>
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
