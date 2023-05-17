/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { map } from "lodash";
import Item from "./Item";

export const CartList = ({ orderDetail }) => {
  return (
    <ScrollView className='mx-3 mb-4' showsVerticalScrollIndicator={false}>
      {map(orderDetail, (item) => (
        <Item key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};
