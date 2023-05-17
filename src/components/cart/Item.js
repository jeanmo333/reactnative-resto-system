/** @format */

import { View, StyleSheet, Image, TextInput } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { themeColors } from "../../theme";
import currencyFormatter from "../../utils/currencyFormatter";
import { useOders } from "../../hooks/useOders";

export default function Item({ item }) {
  const { icreaseOrderItemQuantity } = useOders();

  const increaseItemDetail = async () => {
    const response = await icreaseOrderItemQuantity(item);
  };

  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${item.images[0]}`,
          }}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
          {item.name}
        </Text>

        <View className='flex-row items-center'>
          <View style={styles.containerBuy}>
            <IconButton
              className='mr-6'
              icon='minus'
              size={25}
              style={styles.btnQuantity}
              iconColor={themeColors.bgLight}
              // onPress={() => decreaseOne()}
            />

            <TextInput
              style={styles.textInput}
              value={item.quantity.toString()}
            />

            <IconButton
              icon='plus'
              className='ml-5'
              size={25}
              iconColor={themeColors.bgLight}
              style={styles.btnQuantity}
              onPress={increaseItemDetail}
            />
          </View>

          <IconButton
            color={themeColors.danger}
            icon='delete'
            size={40}
            style={styles.btnDelete}
            onPress={() => console.log("detete")}
          />
        </View>

        <View style={styles.conatinerSubtotal}>
          <Text style={styles.dataText}>Subtotal:</Text>
          <Text style={styles.dataValue}>
            {currencyFormatter(item.sale_price * item.quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: themeColors.bg,
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 10,
    height: 150,
  },
  containerImage: {
    width: "35%",
    height: 120,
    paddingRight: 10,
  },
  image: {
    height: 148,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    width: "65%",
    justifyContent: "center",
    paddingRight: 15,
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  conatinerSubtotal: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  dataText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dataValue: {
    fontSize: 18,
    paddingLeft: 10,
    color: themeColors.blue,
    fontWeight: "bold",
  },

  containerBuy: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  btnQuantity: {
    backgroundColor: themeColors.bg,
    borderRadius: 5,
  },
  textInput: {
    fontSize: 20,
    color: "gray",
  },
});
