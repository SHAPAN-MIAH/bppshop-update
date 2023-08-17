import {
  PRICE_VARIANT_REQUEST,
  PRICE_VARIANT_SUCCESS,
  PRICE_VARIANT_FAIL,
  CLEAR_PRICE_VARIANT_ERROR,
} from "../Constants/PriceVariantConstants";


const PriceVariantReducers = (state = { priceVariant: {} }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case PRICE_VARIANT_REQUEST:
      return {
        loading: true,
        priceVariant: {},
      };
    case PRICE_VARIANT_SUCCESS:
      return {
        ...state,
        loading: false,
        priceVariant: action.payload,
      };
    case PRICE_VARIANT_FAIL:
      return {
        loading: false,
        priceVariant: null,
        error: action.payload,
      };
    case CLEAR_PRICE_VARIANT_ERROR:
      return {
        ...state,
        error: null,
      };

      default:
      return  state
  }
};
export default PriceVariantReducers;