/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { map } from "lodash";
import MyOrder from "./MyOrder";

export const MyOrderList = ({ myOrders, setReloadMyOrders }) => {
  return (
    <ScrollView className='mx-3 mb-4' showsVerticalScrollIndicator={false}>
      {map(myOrders, (myOrder) => (
        <MyOrder
          key={myOrder.id}
          myOrder={myOrder}
          setReloadMyOrders={setReloadMyOrders}
        />
      ))}
    </ScrollView>
  );
};
