/** @format */

import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import currencyFormatter from "../utils/currencyFormatter";

export default function DashboardCard(props) {
  const { data, text, icon } = props;

  return (
    <View className='border border-cyan-800 p-2 mb-3 rounded-lg flex-row items-center mx-3'>
      <View className='mr-6'>
        <Image source={icon} className='h-14 w-14 rounded-lg' />
      </View>

      <View>
        <Text
          className='text-xl font-bold'
          numberOfLines={1}
          ellipsizeMode='tail'>
          {data}
        </Text>

        <Text
          className='font-bold text-slate-400 mb-1'
          numberOfLines={1}
          ellipsizeMode='tail'>
          {text}
        </Text>
      </View>
    </View>
  );
}
