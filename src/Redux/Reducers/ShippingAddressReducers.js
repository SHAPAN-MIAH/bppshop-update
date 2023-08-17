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

