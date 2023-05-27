/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { map } from "lodash";
import Category from "./User";
import User from "./User";

export const UserList = ({ users, setReloadUsers }) => {
  return (
    <ScrollView className='mx-3 mb-4' showsVerticalScrollIndicator={false}>
      {map(users, (user) => (
        <User key={user.id} user={user} setReloadUsers={setReloadUsers} />
      ))}
    </ScrollView>
  );
};
