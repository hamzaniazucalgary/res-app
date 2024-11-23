// src/contexts/OrderContext.js

import React, { createContext, useReducer } from "react";

export const OrderContext = createContext();

const initialState = {
  orders: [],
};

function orderReducer(state, action) {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    default:
      return state;
  }
}

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addOrder = (order) => {
    dispatch({ type: "ADD_ORDER", payload: order });
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderId, status },
    });
  };

  const getOrderById = (orderId) => {
    return state.orders.find((order) => order.orderId === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        addOrder,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
