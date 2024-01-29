import {
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAIL
} from "../Constants/BannerConstants"; 
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";

export const getBanners = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BANNER_REQUEST });
    const { data } = await axios.get(`${baseUrl}/banners/web-banner`);

    dispatch({
      type: GET_BANNER_SUCCESS,
      payload: data,
    });
    
    localStorage.setItem(
      "banners",
      JSON.stringify(getState().banners.banners)
    );
    
  } catch (error) {
    dispatch({
      type: GET_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

