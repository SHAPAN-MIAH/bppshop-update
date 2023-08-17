import {
    DELIVERY_CHARGE_REQUEST,
    DELIVERY_CHARGE_SUCCESS,
    DELIVERY_CHARGE_FAIL,
  } from "../Constants/DeliveryChargeConstants";
  
  
  const deliveryChargeReducers = (state = { deliveryCharge: {} }, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case DELIVERY_CHARGE_REQUEST:
        return {
          loading: true,
          deliveryCharge: {},
        };
      case DELIVERY_CHARGE_SUCCESS:
        return {
          ...state,
          loading: false,
          deliveryCharge: action.payload,
        };
      case DELIVERY_CHARGE_FAIL:
        return {
          loading: false,
          deliveryCharge: null,
          error: action.payload,
        };
        case "CLEAR_DELIVERY_CHARGE": {
          return {
            deliveryCharge: [],
          };
        }
        default:
        return  state
    }
  };
  export default deliveryChargeReducers;