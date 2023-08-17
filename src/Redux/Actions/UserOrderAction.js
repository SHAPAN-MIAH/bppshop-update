import {
  LOAD_USER_ORDERS_REQUEST,
  LOAD_USER_ORDERS_SUCCESS,
  LOAD_USER_ORDERS_FAIL,
  LOAD_USER_ORDERS_DETAILS_REQUEST,
  LOAD_USER_ORDERS_DETAILS_SUCCESS,
  LOAD_USER_ORDERS_DETAILS_FAIL,
  LOAD_USER_ORDERS_CANCEL_REQUEST,
  LOAD_USER_ORDERS_CANCEL_SUCCESS,
  LOAD_USER_ORDERS_CANCEL_FAIL,
} from "../Constants/UserConstants.js";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";

// Load User Orders
export const loadUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_USER_ORDERS_REQUEST });

    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${baseUrl}/customer/order/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: LOAD_USER_ORDERS_SUCCESS, payload: data.data });
    localStorage.setItem("userOrders", JSON.stringify(getState().userOrders.userOrders));
  } catch (error) {
    dispatch({
      type: LOAD_USER_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear User Orders
export const clearUserOrders = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_USER_ORDERS"
  });

  localStorage.setItem("userOrders", JSON.stringify(getState().userOrders.userOrders));
};


// Load user order details
export const loadUserOrderDetails = (id) => async (dispatch) => {
  
  try {
    dispatch({ type: LOAD_USER_ORDERS_DETAILS_REQUEST });
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${baseUrl}/customer/order/details/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    dispatch({ type: LOAD_USER_ORDERS_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: LOAD_USER_ORDERS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user order cancel request
export const loadUserOrderCancelRequest = (id) => async (dispatch) => {
  const order_id = {
    order_id: `${id}`,
  };
  try {
    dispatch({ type: LOAD_USER_ORDERS_CANCEL_REQUEST });

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(
      `${baseUrl}/customer/order/cancel-order`,
      order_id,
      config
    );
    // console.log(data);

    dispatch({ type: LOAD_USER_ORDERS_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_USER_ORDERS_CANCEL_FAIL,
      payload: error.response.data.message,
    });
  }
};
