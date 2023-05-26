/** @format */

import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { usePlates } from "../../hooks/usePlates";
import ScreenLoading from "../../components/ScreenLoading";
import { size } from "lodash";
import { themeColors } from "../../theme";
import { Image } from "react-native";
import currencyFormatter from "../../utils/currencyFormatter";

export function SearchPlateByCategory({ route, navigation }) {
  const [reloadPlates, setReloadPlates] = useState(false);
  const [platesCategory, setPlatesCategory] = useState([]);

  const category = route.params;
  const { getPlateByCategory, loadingPlate } = usePlates();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const result = await getPlateByCategory(category);
        setPlatesCategory(result.plates);
        //setReloadPlates(false);
      })();
    }, [])
  );

  // console.log(platesCategory);
  return (
    <>
      {loadingPlate ? (
        <ScreenLoading />
      ) : size(platesCategory) === 0 ? (
        <Text className='text-center text-xl font-bold mt-3'>
          No hay Platos de categoria{" "}
          <Text className='text-[#0098d3] text-xl font-bold capitalize'>
            "{category}"
          </Text>
        </Text>
      ) : (
        <>
          <Text className='text-center text-xl font-bold'>
            Platos de categoria{" "}
            <Text className='text-[#0098d3] text-xl font-bold capitalize'>
              "{category}"
            </Text>
          </Text>

          <Divider className='p-1 mx-3 mb-2' />

          {platesCategory.map((plate) => (
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
        </>
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
