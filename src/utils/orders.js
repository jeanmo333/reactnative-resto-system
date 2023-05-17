/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ORDER_DETAIL, TOKEN } from "./constants";

export async function setOrderDetailStorage(orderDetail) {
  try {
    await AsyncStorage.setItem(ORDER_DETAIL, JSON.stringify(orderDetail));
    return true;
  } catch (error) {
    return null;
  }
}

export async function getOrderDetailStorage() {
  try {
    const orderDetail = await AsyncStorage.getItem(ORDER_DETAIL);
    return JSON.parse(orderDetail || []);
  } catch (error) {
    return null;
  }
}

export async function removeOrderDetailStorage() {
  try {
    await AsyncStorage.removeItem(ORDER_DETAIL);
    return true;
  } catch (error) {
    return null;
  }
}
