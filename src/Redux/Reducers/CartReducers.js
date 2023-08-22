const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // case "ADD_TO_CART":
    case "GET_CART_SUCCESS": {
      const item = action.payload;

      const isItemExist = state.cartItems?.find(
        (i) => i.id == item.id
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id == isItemExist.id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "CLEAR_CART": {
      return {
        cartItems: [],
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
