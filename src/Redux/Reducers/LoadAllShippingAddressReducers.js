import {
  LOAD_SHIPPING_ADDRESS_REQUEST,
  LOAD_SHIPPING_ADDRESS_SUCCESS,
  LOAD_SHIPPING_ADDRESS_FAIL,
} from "../Constants/ShippingAddressConstants.js";
// Load all shipping address reducers
export const loadAllShippingAddressReducers = (
  state = { allShippingAddressInfo: {} },
  action
) => {
  switch (action.type) {
    case LOAD_SHIPPING_ADDRESS_REQUEST:
      return {
        loading: true,
      };
    case LOAD_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        allShippingAddressInfo: action.payload,
      };
    case LOAD_SHIPPING_ADDRESS_FAIL:
      return {
        loading: false,
        allShippingAddressInfo: null,
        error: action.payload,
      };
    case "CLEAR_ALL_SHIPPING_ADDRESS":
      return {
        allShippingAddressInfo: {},
      };
    default:
      return state;
  }
};
