/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { map } from "lodash";
import Order from "./Order";

export const OrderList = ({ orders, setReloadOrders }) => {
  return (
    <ScrollView className='mx-3 mb-4' showsVerticalScrollIndicator={false}>
      {map(orders, (order) => (
        <Order key={order.id} order={order} setReloadOrders={setReloadOrders} />
      ))}
    </ScrollView>
  );
};
