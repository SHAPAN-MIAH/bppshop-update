
const ItemQtyUpdateResReducer = (state = { ItemQtyUpdateRes: [] }, action) => {
  switch (action.type) {
    case "UPDATE_CART_FAILED_RES":{
        return {
          ...state,
          ItemQtyUpdateRes: [ action.payload],
        };
      
    }

    case "CLEAR_CART_ITEM": {
      return {
        ItemQtyUpdateRes: [],
      };
    }

    default:
      return state;
  }
};

export default ItemQtyUpdateResReducer;