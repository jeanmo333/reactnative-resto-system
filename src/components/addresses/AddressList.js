/** @format */

import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { map } from "lodash";
import Address from "./Address";
import { useOders } from "../../hooks/useOders";

export const AddressList = ({ addresses, setReloadAddresses }) => {
  const { idAddressSelected, setIdAddressSelected } = useOders();
  // console.log(idAddressSelected);

  useEffect(() => {
    addresses && setIdAddressSelected(addresses[0].id);
  }, []);

  return (
    <ScrollView className='mx-3 mb-4' showsVerticalScrollIndicator={false}>
      {map(addresses, (address) => (
        <Address
          key={address.id}
          idAddressSelected={idAddressSelected}
          address={address}
          setIdAddressSelected={setIdAddressSelected}
          setReloadAddresses={setReloadAddresses}
        />
      ))}
    </ScrollView>
  );
};
