/** @format */

import { View, Text, Image } from "react-native";
import React from "react";
import { windowWidth } from "../../utils/constants";

const BannerSlider = ({ item, index }) => {
  return (
    <View style={{ marginRight: index === 3 ? 0 : 10 }}>
      <Image
        source={{ uri: `${item}` }}
        style={{ height: 150, width: windowWidth - 100, borderRadius: 10 }}
      />
    </View>
  );
};

export default BannerSlider;
