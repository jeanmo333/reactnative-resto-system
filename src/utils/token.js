/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../utils/constants";

export async function setTokenStorage(token) {
  try {
    await AsyncStorage.setItem(TOKEN, token);
    return true;
  } catch (error) {
    return null;
  }
}

export async function getTokenStorage() {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    return token || null;
  } catch (error) {
    return null;
  }
}

export async function removeTokenStorage() {
  try {
    await AsyncStorage.removeItem(TOKEN);
    return true;
  } catch (error) {
    return null;
  }
}
