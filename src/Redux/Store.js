import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import CartReducers from "./Reducers/CartReducers";
import { userReducer } from './Reducers/UserReducers';
import { userOrderDetailReducers, userOrderReducers } from './Reducers/UserOrderReducers';
import { addShippingAddressReducers, loadAllShippingAddressReducers, } from "./Reducers/ShippingAddressReducers";
import PriceVariantReducers from './Reducers/PriceVariantReducers';
import { productDetailsReducers } from "./Reducers/ProductReducers";
import CartGroupReducers from "./Reducers/CartGroupReducers";
import deliveryChargeReducers from "./Reducers/DeliveryChargeReducer";
import { loginResReducer } from './Reducers/loginResponse';
import { cancelOrderResponseReducer } from "./Reducers/CancelOrderResponse";
import searchProductReducer from "./Reducers/SearchReducers";
import { signUpResReducer } from "./Reducers/SignUpResponse";
import { AgentInfoReducer } from "./Reducers/AgentReducers";
import { SignupRedirectReducer } from "./Reducers/SignupRedirectReducer";
import CategoryReducers from "./Reducers/CategoryReducers";
import { AdminInfoReducer } from "./Reducers/AdminReducers";


const rootReducer = combineReducers({
  allCategories: CategoryReducers,
  searchProducts:searchProductReducer,
  cart: CartReducers,
  cartGroup: CartGroupReducers,
  user: userReducer,
  loginRes: loginResReducer,
  signupRes: signUpResReducer,
  userOrders: userOrderReducers,
  userOrderDetails:userOrderDetailReducers,
  cancelOrdersResponse:cancelOrderResponseReducer,
  shippingInfo: addShippingAddressReducers,
  allShippingInfo: loadAllShippingAddressReducers,
  priceVariant: PriceVariantReducers,
  productDetails: productDetailsReducers,
  deliveryCharge:deliveryChargeReducers,
  agentInfo: AgentInfoReducer,
  adminInfo: AdminInfoReducer,
  signupRedirect: SignupRedirectReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },

  shippingInfo: {
    shippingAddressInfo: localStorage.getItem("shippingAddressInfo")
      ? JSON.parse(localStorage.getItem("shippingAddressInfo"))
      : {},
  },
  cartGroup : {
    cartGroupItems : localStorage.getItem("cartGroupItems") 
    ? JSON.parse(localStorage.getItem("cartGroupItems"))
    : []
  },
  deliveryCharge : {
    deliveryCharge : localStorage.getItem("deliveryCharge") 
    ? JSON.parse(localStorage.getItem("deliveryCharge"))
    : {}
  },
  userOrders : {
    userOrders : localStorage.getItem("userOrders") 
    ? JSON.parse(localStorage.getItem("userOrders"))
    : []
  }
};
const middleware = [thunk];


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
