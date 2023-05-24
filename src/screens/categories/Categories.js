/** @format */

import React, { useCallback, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { size } from "lodash";
import { useCategories } from "../../hooks/useCategories";
import { CategoryList } from "../../components/categories";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/Search";

export function Categories(props) {
  const [reloadCategories, setReloadCategories] = useState(false);
  const navigation = useNavigation();

  const {
    categories,
    loadingCategory,
    setSearchCategoriesResult,
    searchCategoriesResult,
    getCategories,
  } = useCategories();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getCategories();
        setReloadCategories(false);
      })();
    }, [reloadCategories])
  );
  // console.log(categories);
  //let categories = [];
  return (
    <>
      {loadingCategory ? (
        <ScreenLoading />
      ) : size(categories) === 0 ? (
        <>
          <Text className='font-bold text-lg text-center mb-3 mt-5'>
            Aun no tiene categorias agregada
          </Text>

          <Text className='font-semibold text-sm text-center'>
            Dale click al boton de mas(+) para agregada una
          </Text>
        </>
      ) : (
        <>
          <Search
            data={categories}
            setData={setSearchCategoriesResult}
            placeholder='Buscar categorias'
          />

          <View className='py-1 px-3 mx-3 mb-4 mt-3 rounded-lg bg-[#0098d3] flex-row justify-center items-center'>
            <Text className='text-white font-bold text-xl pr-5'>
              Total categorias :{" "}
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

          <CategoryList
            categories={searchCategoriesResult}
            setReloadCategories={setReloadCategories}
          />
        </>
      )}
    </>
  );
}
