/** @format */

import { createContext, useEffect, useState } from "react";
import { getOrderDetailStorage, setOrderDetailStorage } from "../utils/orders";

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(orderDetail);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ordersDetailAS = (await getOrderDetailStorage()) || [];
        setLoading(false);
        setOrderDetail(ordersDetailAS);
      } catch (error) {
        setOrderDetail([]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await setOrderDetailStorage(orderDetail);
    })();
  }, [orderDetail]);

  const addItemToOrderDetail = (item) => {
    const itemInCart = orderDetail.some(
      (itemState) => itemState.id === item.id
    );

    if (!itemInCart) return setOrderDetail([...orderDetail, item]);

    const updatedItems = orderDetail.map((itemState) => {
      if (itemState.id !== item.id) return itemState;
      // Actualizar la cantidad
      itemState.quantity += 1;
      return itemState;
    });

    setOrderDetail(updatedItems);
  };

  const icreaseOrderItemQuantity = async (item) => {
    const updatedOrderItem = orderDetail.map((itemState) => {
      if (itemState.id !== item.id) return itemState;

      // Actualizar la cantidad
      itemState.quantity += 1;
      return itemState;
    });

    setOrderDetail(updatedOrderItem);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        setLoading,
        orderDetail,
        setOrderDetail,
        addItemToOrderDetail,
        icreaseOrderItemQuantity,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider };

export default OrderContext;
