import {
  LOAD_USER_ORDERS_REQUEST,
  LOAD_USER_ORDERS_SUCCESS,
  LOAD_USER_ORDERS_FAIL,
  LOAD_USER_ORDERS_DETAILS_REQUEST,
  LOAD_USER_ORDERS_DETAILS_SUCCESS,
  LOAD_USER_ORDERS_DETAILS_FAIL,
} from "../Constants/UserConstants.js";

//user orders reducer
export const userOrderReducers = (state = { userOrders: [] }, action) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case LOAD_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: action.payload,
      };
    case LOAD_USER_ORDERS_FAIL:
      return {
        loading: false,
        userOrders: null,
        error: action.payload,
      };

      case "CLEAR_USER_ORDERS":
        return {
          userOrders: [],
        };

    default:
      return state;
  }
};


//user orders details reducer
export const userOrderDetailReducers = (state = { userOrderDetails: [] }, action) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case LOAD_USER_ORDERS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrderDetails: action.payload,
      };
    case LOAD_USER_ORDERS_DETAILS_FAIL:
      return {
        loading: false,
        userOrderDetails: null,
        error: action.payload,
      };

    default:
      return state;
  }
};


//user orders cancel reducer
export const loadUserOrderCancelReducer = (state = { userOrders: [] }, action) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case LOAD_USER_ORDERS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        // userOrders: state.userOrders.filter((item) => item.id !== action.payload),
        userOrders:action.payload,
        
      };
    case LOAD_USER_ORDERS_DETAILS_FAIL:
      return {
        loading: false,
        userOrders: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
