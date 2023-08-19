const CartItemReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":{
        return {
          ...state,
          cartItem: [ action.payload],
        };
      
    }

    case "CLEAR_CART_ITEM": {
      return {
        cartItem: [],
      };
    }

    default:
      return state;
  }
};

export default CartItemReducer;
