


const RemoveItemResReducer = (state = { RemoveItemRes: [] }, action) => {
  switch (action.type) {
    case "REMOVE_ITEM_FROM_CART_RES":{
        return {
          ...state,
          RemoveItemRes: [ action.payload],
        };
      
    }

    // case "CLEAR_CART_ITEM": {
    //   return {
    //     cartItem: [],
    //   };
    // }

    default:
      return state;
  }
};

export default RemoveItemResReducer;