/** @format */

import { View, Text, Image } from "react-native";
import React from "react";
import { windowWidth } from "../../utils/constants";

const BannerSlider = ({ item, index }) => {
  return (
    <View style={{ marginRight: 12 }}>
      <Image
        source={{ uri: `${item}` }}
        style={{ height: 210, width: windowWidth - 100, borderRadius: 10 }}
      />
    </View>
  );
};

export default BannerSlider;
