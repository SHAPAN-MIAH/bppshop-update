import {
  PRICE_VARIANT_REQUEST,
  PRICE_VARIANT_SUCCESS,
  PRICE_VARIANT_FAIL,
  CLEAR_PRICE_VARIANT_ERROR,
} from "../Constants/PriceVariantConstants";
import axios  from 'axios';
import { baseUrl } from "../../BaseUrl/BaseUrl";


export const getPriceVariant = (priceVariantData) => async(dispatch) => {
  try {
    dispatch({type: PRICE_VARIANT_REQUEST} )
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(
      `${baseUrl}/products/variant_price`,
      priceVariantData,
      config
    );

    dispatch({
      type : PRICE_VARIANT_SUCCESS,
      payload: data

    })
  }
  catch(error){
    dispatch({
      type : PRICE_VARIANT_FAIL,
      payload: error.response.data.message
    })
  }
};

export const clearPriceVariantErrors = () => async (dispatch) => {
  dispatch({type: CLEAR_PRICE_VARIANT_ERROR});
}