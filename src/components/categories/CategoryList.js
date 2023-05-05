/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { map } from "lodash";
import Category from "./Category";

export const CategoryList = ({ categories, setReloadCategories }) => {
  return (
    <ScrollView className='mx-6 mb-4' showsVerticalScrollIndicator={false}>
      {map(categories, (category) => (
        <Category
          key={category.id}
          category={category}
          setReloadCategories={setReloadCategories}
        />
      ))}
    </ScrollView>
  );
};
