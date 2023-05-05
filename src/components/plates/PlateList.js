/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { map } from "lodash";
import Plate from "./Plate";

export const PlateList = ({ plates, setReloadPlates }) => {
  return (
    <ScrollView className='mx-6 mb-4' showsVerticalScrollIndicator={false}>
      {map(plates, (plate) => (
        <Plate key={plate.id} plate={plate} setReloadPlates={setReloadPlates} />
      ))}
    </ScrollView>
  );
};
