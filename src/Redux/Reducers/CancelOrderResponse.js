import {
  LOAD_USER_ORDERS_CANCEL_FAIL,
  LOAD_USER_ORDERS_CANCEL_REQUEST,
  LOAD_USER_ORDERS_CANCEL_SUCCESS,
} from "../Constants/UserConstants";

//user orders cancel reducer
export const cancelOrderResponseReducer = (
  state = { cancelOrdersResponse: {} },
  action
) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_CANCEL_REQUEST:
      return {
        loading: true,
      };
    case LOAD_USER_ORDERS_CANCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        // userOrders: state.userOrders.filter((item) => item.id !== action.payload),
        cancelOrdersResponse: action.payload,
      };
    case LOAD_USER_ORDERS_CANCEL_FAIL:
      return {
        loading: false,
        cancelOrdersResponse: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
