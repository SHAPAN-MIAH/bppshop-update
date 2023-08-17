import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_CATEGORY_ERROR,
} from "../Constants/CategoryConstants";


const CategoryReducers = (state = { categories: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case ALL_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ALL_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_CATEGORY_ERROR:
      return {
        ...state,
        error: null,
      };

      default:
      return  state
  }
};
export default CategoryReducers;
