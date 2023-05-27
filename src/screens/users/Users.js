/** @format */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { size } from "lodash";
import { CategoryList } from "../../components/categories";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenLoading from "../../components/ScreenLoading";
import Search from "../../components/Search";
import useAuth from "../../hooks/useAuth";
import { UserList } from "../../components/users";

export function Users(props) {
  const [reloadUsers, setReloadUsers] = useState(false);
  const navigation = useNavigation();

  const {
    users,
    loadingAuth,
    setSearchUsersResult,
    searchUsersResult,
    getUserByAdmin,
    numberOfUsers,
  } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        getUserByAdmin();
        setReloadUsers(false);
      })();
    }, [reloadUsers])
  );
  // console.log(categories);
  //let categories = [];
  return (
    <>
      {loadingAuth ? (
        <ScreenLoading />
      ) : size(users) === 0 ? (
        <>
          <Text className='font-bold text-lg text-center mb-3 mt-5'>
            Aun no tiene usuarios registrado
          </Text>

          <Text className='font-semibold text-sm text-center'>
            Dale click al boton de mas(+) para agregada una
          </Text>
        </>
      ) : (
        <>
          <Search
            data={users}
            setData={setSearchUsersResult}
            placeholder='Buscar por Nombre, Apellido, Email'
          />

          <View className='py-3 px-3 mx-3 mb-4 mt-3 rounded-lg bg-[#0098d3] flex-row justify-center items-center'>
            <Text className='text-white font-bold text-xl pr-1'>
              Total usuarios :{" "}
            </Text>

            <Text className='font-bold text-[#000] text-xl'>
              {numberOfUsers}
            </Text>
          </View>

          <UserList users={searchUsersResult} setReloadUsers={setReloadUsers} />
        </>
      )}
    </>
  );
}
