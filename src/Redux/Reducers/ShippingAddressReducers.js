import {
  ADD_SHIPPING_ADDRESS_REQUEST,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  ADD_SHIPPING_ADDRESS_FAIL,
  SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
  SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
  SET_DEFAULT_SHIPPING_ADDRESS_FAIL,
} from "../Constants/ShippingAddressConstants.js";

// Add shipping address & Set default shipping address reducers
export const addShippingAddressReducers = (
  state = { shippingAddressInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_SHIPPING_ADDRESS_REQUEST:
    case SET_DEFAULT_SHIPPING_ADDRESS_REQUEST:
      return {
        loading: true,
      };
    case ADD_SHIPPING_ADDRESS_SUCCESS:
    case SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingAddressInfo: action.payload,
      };
    case ADD_SHIPPING_ADDRESS_FAIL:
    case SET_DEFAULT_SHIPPING_ADDRESS_FAIL:
      return {
        loading: false,
        shippingAddressInfo: null,
        error: action.payload,
      };
    case "CLEAR_SHIPPING_ADDRESS":
      return {
        shippingAddressInfo: {},
      };

    default:
      return state;
  }
};



