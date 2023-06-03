/** @format */
import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import SelectEstatusUser from "./SelectEstatusUser";
import SelectRole from "./SelectRole";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";
import LoadingButton from "../LoadingButton";

export default function User({ user, setReloadUsers }) {
  const [loadingChangeRole, setLoadingChangeRole] = useState(false);
  const [loadingChangeStatus, setLoadingChangeStatus] = useState(false);
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.isActive);
  const { changeUserStatus, changeUserRole } = useAuth();

  const onChangeUserStatus = async () => {
    setLoadingChangeStatus(true);
    const { error, message } = await changeUserStatus(user.id, isActive);
    setReloadUsers(true);
    setLoadingChangeStatus(false);
    if (!error) {
      Toast.show(message, {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show(message, {
        position: Toast.positions.CENTER,
      });
      return;
    }
  };

  const onChangeUserRole = async () => {
    setLoadingChangeRole(true);
    const { error, message } = await changeUserRole(user.id, role);
    setReloadUsers(true);
    setLoadingChangeRole(false);
    if (!error) {
      Toast.show(message, {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show(message, {
        position: Toast.positions.CENTER,
      });
      return;
    }
  };

  return (
    <View
      key={user.id}
      className='border  border-cyan-800 p-2 mb-3 rounded-lg flex-row items-center justify-between'>
      <View className='mr-1'>
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
          className='font-bold text-slate-400 mb-1'
          numberOfLines={1}
          ellipsizeMode='tail'>
          Telefono : {user.phone ? user.phone : "..."}
        </Text>

        <SelectEstatusUser isActive={isActive} setIsActive={setIsActive} />

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-3 rounded-xl  bg-[#877dfa] px-8 mb-1'
          onPress={onChangeUserStatus}>
          {loadingChangeStatus ? (
            <LoadingButton />
          ) : (
            <Text className={"text-xl font-bold text-center text-white"}>
              Cambiar estado
            </Text>
          )}
        </TouchableOpacity>

        <SelectRole role={role} setRole={setRole} />

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-3 rounded-xl  bg-[#877dfa]'
          onPress={onChangeUserRole}>
          {loadingChangeRole ? (
            <LoadingButton />
          ) : (
            <Text className={"text-xl font-bold text-center text-white"}>
              Cambiar rol
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
