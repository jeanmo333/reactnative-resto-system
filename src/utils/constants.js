/** @format */
import { Dimensions } from "react-native";
import { API_URL_DEV, API_URL_PRODUCTION, STRIPE_PUBLIC_KEY } from "@env";

export const STRIPE_PUBLISHABLE_KEY = STRIPE_PUBLIC_KEY;
export const TOKEN = "token";
export const ORDER_DETAIL = "order_detail";
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
