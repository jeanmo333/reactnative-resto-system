/** @format */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { themeColors } from "../../theme";

export default function User({ user, setReloadUsers }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      key={user.id}
      className='border  border-cyan-800 p-2 mb-3 rounded-lg flex-row'>
      <View className='mr-3'>
        <Image
          source={{ uri: `${user.image}` }}
          className='h-32 w-32 rounded-lg'
        />
      </View>
      <View>
        <Text
          className='text-lg font-bold'
          numberOfLines={1}
          ellipsizeMode='tail'>
          {user.name} {user.lastname ? user.lastname : "..."}
        </Text>

        <Text
          className='font-bold text-slate-400 mb-1'
          numberOfLines={1}
          ellipsizeMode='tail'>
          {user.email}
        </Text>

        <Text
          className='font-bold text-slate-400 mb-2'
          numberOfLines={1}
          ellipsizeMode='tail'>
          Telefono: {user.phone ? user.phone : "..."}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-2 rounded-xl  bg-[#877dfa] px-10'
          onPress={() => navigation.navigate("edit-user", { ...user })}>
          <Text className={"text-xl font-bold text-center"}>
            Editar usuario
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
