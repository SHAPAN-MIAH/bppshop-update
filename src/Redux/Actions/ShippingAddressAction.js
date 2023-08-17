import axios from "axios";
import {
  ADD_SHIPPING_ADDRESS_REQUEST,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  ADD_SHIPPING_ADDRESS_FAIL,
  LOAD_SHIPPING_ADDRESS_REQUEST,
  LOAD_SHIPPING_ADDRESS_SUCCESS,
  LOAD_SHIPPING_ADDRESS_FAIL,
  SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
  SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
  SET_DEFAULT_SHIPPING_ADDRESS_FAIL,
} from "../Constants/ShippingAddressConstants.js"
import { baseUrl } from './../../BaseUrl/BaseUrl';


// Add shipping address action
export const addShippingAddress = (shippingData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_SHIPPING_ADDRESS_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(
      `${baseUrl}/shipping-address/add`,
      shippingData,
      config
    );

    dispatch({ type: ADD_SHIPPING_ADDRESS_SUCCESS, payload: data });

    localStorage.setItem("shippingAddressInfo", JSON.stringify(getState().shippingInfo.shippingAddressInfo));
  } catch (error) {
    dispatch({ type: ADD_SHIPPING_ADDRESS_FAIL, payload: error.response.data.message });
  }
};

// Load shipping address action
export const loadAllShippingAddress = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_SHIPPING_ADDRESS_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(
      `${baseUrl}/shipping-address`,
      config
    );

    dispatch({ type: LOAD_SHIPPING_ADDRESS_SUCCESS, payload: data });

    localStorage.setItem("allShippingAddressInfo", JSON.stringify(getState().allShippingInfo.allShippingAddressInfo));
  } catch (error) {
    dispatch({ type: LOAD_SHIPPING_ADDRESS_FAIL, payload: error.response.data.message });
  }
};

// Set default shipping address action
export const setDefaultShippingAddress = (addressId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_DEFAULT_SHIPPING_ADDRESS_REQUEST });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(
      `${baseUrl}/shipping-address/set-default`,
      addressId,
      config
    );

    dispatch({ type: SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS, payload: data });

    localStorage.setItem("shippingAddressInfo", JSON.stringify(getState().shippingInfo.shippingAddressInfo));
  } catch (error) {
    dispatch({ type: SET_DEFAULT_SHIPPING_ADDRESS_FAIL, payload: error.response.data.message });
  }
};


// Clear shipping address
export const clearShippingAddress = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_SHIPPING_ADDRESS"
  });

  localStorage.setItem("shippingAddressInfo", JSON.stringify(getState().shippingInfo.shippingAddressInfo));
};

// Clear All shipping address
export const clearAllShippingAddress = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_ALL_SHIPPING_ADDRESS"
  });

  localStorage.setItem("allShippingAddressInfo", JSON.stringify(getState().allShippingInfo.allShippingAddressInfo));
};