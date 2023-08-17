const searchProductReducer = (state = { searchProducts: [] }, action) => {
  switch (action.type) {
    case "SEARCH_PRODUCT_REQUEST":
      return {
        loading: true,
        searchProducts: []
      };
    case "SEARCH_PRODUCT_SUCCESS":
      return {
        ...state,
        searchProducts: action.payload,
        loading: false,
      };
    case "SEARCH_PRODUCT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        searchProducts: []
      };
    default:
      return state;
  }
};

export default searchProductReducer;
