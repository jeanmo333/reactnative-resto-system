/** @format */
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Checkbox, Divider, Text } from "react-native-paper";
import SelectRole from "../../components/users/SelectRole";
import { themeColors } from "../../theme";
import SelectEstatusUser from "../../components/users/SelectEstatusUser";

const EditUser = ({ route }) => {
  const user = route.params;
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false);

  console.log(isActive);
  console.log(role);

  return (
    <View className='mx-3 mt-3'>
      <View className='mb-10'>
        <Text className='ml-1 text-lg font-bold text-slate-400'>
          Cambiar role
        </Text>
        <SelectRole role={role} setRole={setRole} />

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-3 mt-4 rounded-xl flex items-center w-full'
          style={{ backgroundColor: themeColors.orange }}
          //onPress={onChangeOrderStatus}
        >
          {/* {loading ? (
            <LoadingButton />
          ) : ( */}
          <Text className={"text-xl font-bold text-center text-white"}>
            Guardar
          </Text>
          {/* )} */}
        </TouchableOpacity>
      </View>

      <Divider className='p-1 my-1 mb-8' />

      <View>
        <Text className='ml-1 text-lg font-bold text-slate-400'>
          Bloquear o Desbloquear usuario
        </Text>
        <SelectEstatusUser isActive={isActive} setIsActive={setIsActive} />

        <TouchableOpacity
          activeOpacity={0.7}
          className='py-3 mt-4 mb-4 rounded-xl flex items-center w-full'
          style={{ backgroundColor: themeColors.bg }}
          //onPress={onChangeOrderStatus}
        >
          {/* {loading ? (
            <LoadingButton />
          ) : ( */}
          <Text className={"text-xl font-bold text-center text-white"}>
            Guardar
          </Text>
          {/* )} */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditUser;
