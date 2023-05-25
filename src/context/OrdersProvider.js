/** @format */

import { createContext, useEffect, useState } from "react";
import { getOrderDetailStorage, setOrderDetailStorage } from "../utils/orders";
import { getTokenStorage } from "../utils/token";
import axios from "axios";
import clientAxios from "../config/axios";
import Toast from "react-native-root-toast";

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [total, setTotal] = useState(0);
  const [idAddressSelected, setIdAddressSelected] = useState("");
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [tokenOrder, setTokenOrder] = useState(null);

  const [orders, setOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [searchMyOrdersResult, setSearchMyOrdersResult] = useState([]);
  const [searchOrdersResult, setSearchOrdersResult] = useState([]);

  // console.log(myOrders);
  useEffect(() => {
    getMyOrders();

    (async () => {
      const token = await getTokenStorage();
      if (token) {
        setTokenOrder(token);
      } else {
        setTokenOrder(null);
      }
    })();
  }, [tokenOrder]);

  // console.log("====================================");
  // console.log(token);
  // console.log("====================================");

  const configWithToken = {
    headers: {
      "Content-type": "multipart/form-data",
      accept: "application/json",
      Authorization: `Bearer ${tokenOrder}`,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenOrder}`,
    },
  };

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

  /**************************orders*********************************************************** */
  const getMyOrders = async () => {
    try {
      if (!tokenOrder) {
        setLoadingOrder(false);
        return;
      }

      setLoadingOrder(true);
      const { data } = await clientAxios.get("/orders/my-orders", config);
      setMyOrders(data);
      setSearchMyOrdersResult(data);
      setLoadingOrder(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const getOrders = async () => {
    try {
      if (!tokenOrder) {
        setLoadingOrder(false);
        return;
      }

      setLoadingOrder(true);
      const { data } = await clientAxios.get("/orders", config);
      setOrders(data);
      setSearchOrdersResult(data);
      setLoadingOrder(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show("Hubo un error", {
          position: Toast.positions.CENTER,
        });
      }
    }
  };

  const createMyOrder = async (order) => {
    try {
      setLoadingOrder(true);
      const { data } = await clientAxios.post("/orders", order, config);
      const { savedOrder } = data;
      setMyOrders([...myOrders, savedOrder]);
      setLoadingOrder(false);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingOrder(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  const changeOrderStatus = async (idOrder, status) => {
    try {
      const { data } = await clientAxios.patch(
        `/orders/update-status/${idOrder}`,
        { status },
        config
      );
      const { orderUpdate } = data;
      const ordersEdit = orders.map((orderState) =>
        orderState.id === orderUpdate.id ? orderUpdate : orderState
      );
      setOrders(ordersEdit);
      return {
        message: data.message,
        error: false,
      };
    } catch (error) {
      setLoadingOrder(false);
      return {
        message: error.response.data.message,
        error: true,
      };
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loadingOrder,
        total,
        myOrders,
        setTokenOrder,
        getOrders,
        createMyOrder,
        numberOfItems,
        setLoadingOrder,
        changeOrderStatus,
        searchMyOrdersResult,
        setSearchMyOrdersResult,
        searchOrdersResult,
        setSearchOrdersResult,
        orderDetail,
        idAddressSelected,
        setOrderDetail,
        getMyOrders,
        addItemToOrderDetail,
        icreaseOrderItemQuantity,
        decreaseOrderItemQuantity,
        emptyCart,
        deleteOrderItem,
        setIdAddressSelected,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider };

export default OrderContext;
