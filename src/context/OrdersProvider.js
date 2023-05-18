/** @format */

import { createContext, useEffect, useState } from "react";
import { getOrderDetailStorage, setOrderDetailStorage } from "../utils/orders";

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [total, setTotal] = useState(0);
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

  useEffect(() => {
    const numberOfItems = orderDetail.reduce(
      (prev, item) => item.quantity + prev,
      0
    );

    const total = orderDetail.reduce(
      (prev, item) => item.sale_price * item.quantity + prev,
      0
    );

    setNumberOfItems(numberOfItems);
    setTotal(total);
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

  const decreaseOrderItemQuantity = async (item) => {
    const updatedOrderItem = orderDetail.map((itemState) => {
      if (itemState.quantity === 1) return itemState;

      if (itemState.id !== item.id) return itemState;

      // Actualizar la cantidad
      itemState.quantity -= 1;
      return itemState;
    });

    setOrderDetail(updatedOrderItem);
  };

  const deleteOrderItem = (id) => {
    const orderDetailUpdate = orderDetail.filter((item) => item.id !== id);
    return setOrderDetail(orderDetailUpdate);
  };

  const emptyCart = () => {
    setOrderDetail([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        total,
        numberOfItems,
        setLoading,
        orderDetail,
        setOrderDetail,
        addItemToOrderDetail,
        icreaseOrderItemQuantity,
        decreaseOrderItemQuantity,
        emptyCart,
        deleteOrderItem,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider };

export default OrderContext;
