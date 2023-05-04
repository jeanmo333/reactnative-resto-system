/** @format */

import React, { useCallback, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { size } from "lodash";
import { useCategories } from "../../hooks/useCategories";
import { CategoryList } from "../../components/categories";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/Search";

export function Categories(props) {
  const [reloadCategories, setReloadCategories] = useState(false);
  const navigation = useNavigation();

  const {
    getCategories,
    categories,
    loading,
    token,
    setSearchCategoriesResult,
    searchCategoriesResult,
  } = useCategories();
  const { authenticateUser } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getCategories();
        // setCategories([]);
        authenticateUser();
        setReloadCategories(false);
      })();
    }, [token, reloadCategories])
  );
  //console.log(categories);

  return (
    <>
      {loading ? (
        <ScreenLoading />
      ) : size(categories) === 0 ? (
        <>
          <View className='flex-row justify-between items-center mx-6 mb-4 mt-3'>
            <View className='py-1 px-3 rounded-lg  bg-[#0098d3] flex-row items-center'>
              <Text className='text-white font-bold text-xl pr-5'>
                Total :{" "}
              </Text>
              <View
                size={30}
                style={{
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Text className='font-bold text-white'>10</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("create-category")}>
              <Image
                source={require("../../../assets/icons/add.png")}
                style={{
                  height: 47,
                  width: 47,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text className='font-bold text-lg text-center mb-3'>
            Aun no tiene categorias agregada
          </Text>

          <Text className='font-semibold text-sm text-center'>
            Dale click al boton de mas(+) para agregada una
          </Text>
        </>
      ) : (
        <>
          <Text className='font-bold text-center text-2xl mt-2'>
            Listado de categorias
          </Text>

          <Search data={categories} setData={setSearchCategoriesResult} />

          <View className='flex-row justify-between items-center mx-6 mb-4 mt-3'>
            <View className='py-1 px-3 rounded-lg  bg-[#0098d3] flex-row items-center'>
              <Text className='text-white font-bold text-xl pr-5'>
                Total :{" "}
              </Text>
              <View
                size={30}
                style={{
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Text className='font-bold text-white'>10</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("create-category")}>
              <Image
                source={require("../../../assets/icons/add.png")}
                style={{
                  height: 47,
                  width: 47,
                }}
              />
            </TouchableOpacity>
          </View>

          <CategoryList
            categories={searchCategoriesResult}
            setReloadCategories={setReloadCategories}
          />
        </>
      )}
    </>
  );
}

// const styles = StyleSheet.create({
//   formInput: {
//     borderWidth: 1,
//     marginTop: 10,
//     borderColor: "gray",
//     borderRadius: 10,
//   },
//   formTextInput: {
//     padding: 12,
//     borderRadius: 10,
//     fontSize: 18,
//     color: "gray",
//   },
// });
