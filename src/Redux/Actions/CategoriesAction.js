import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_CATEGORY,
} from "../Constants/CategoryConstants";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";

export const getCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });
    const { data } = await axios.get(`${baseUrl}/categories`);

    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: data,
    });
    
    localStorage.setItem(
      "categories",
      JSON.stringify(getState().allCategories.categories)
    );
    
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearCategories = () => async (dispatch) => {
  dispatch({ type: CLEAR_CATEGORY });
};
