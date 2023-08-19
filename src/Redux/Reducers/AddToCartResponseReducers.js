
const AddToCartResponseReducer = (state = { AddToCartResponse: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART_AFTER_LOGIN_SUCCESS":{
        return {
          ...state,
          AddToCartResponse: [ action.payload],
        };
      
    }

    case "CLEAR_ADD_TO_CART_RES": {
      return {
        AddToCartResponse: [],
      };
    }

    default:
      return state;
  }
};

export default AddToCartResponseReducer;