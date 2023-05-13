/** @format */

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { Text } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import { usePlates } from "../hooks/usePlates";
import { useCategories } from "../hooks/useCategories";
import { themeColors } from "../theme";

export default function Menu(props) {
  const { authenticateUser, auth, token } = useAuth();
  const { plates, getPlates } = usePlates();
  const { categories, getCategories } = useCategories();
  const categoriesNames = categories.map((category) => category.name);
  const [activeCategory, setActiveCategory] = useState(categoriesNames[0]);

  useEffect(() => {
    getPlates();
    authenticateUser();
    //  getCategories();
  }, [token]);

  // console.log(categories);

  return (
    <View className='py-2 pb-3 mt-2'>
      <ScrollView
        className='px-4'
        horizontal
        showsHorizontalScrollIndicator={false}>
        {categoriesNames.map((category, index) => {
          let isActive = category == activeCategory;
          let textClass = isActive && "white";
          return (
            <TouchableOpacity
              onPress={() => setActiveCategory(category)}
              key={index}
              style={{
                backgroundColor: isActive
                  ? themeColors.blue
                  : "rgba(255,255,255,0.1)",
              }}
              className='rounded-md p-1 px-3 mr-2 '>
              <Text className={`${textClass} font-bold`}>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
