import {
  DELIVERY_CHARGE_REQUEST,
  DELIVERY_CHARGE_SUCCESS,
  DELIVERY_CHARGE_FAIL,
} from "../Constants/DeliveryChargeConstants";
  import axios  from 'axios';
  import { baseUrl } from "../../BaseUrl/BaseUrl";
  
  
  export const getDeliveryCharge = (district_id) => async(dispatch, getState) => {
    const districtId={
        "district_id":`${district_id}`,
    }
    try {
      dispatch({type: DELIVERY_CHARGE_REQUEST} )
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
        
      const { data } = await axios.post(
        `${baseUrl}/cart/delivery-charge`,
        districtId,
        config
      );
  
      dispatch({
        type : DELIVERY_CHARGE_SUCCESS,
        payload: data  
      })
      localStorage.setItem("deliveryCharge", JSON.stringify(getState().deliveryCharge.deliveryCharge));
    }
    catch(error){
      dispatch({
        type : DELIVERY_CHARGE_FAIL,
        payload: error.response.data.message
      })
    }
  };

  // CLEAR DELIVERY CHARGE
export const ClearDeliveryCharge = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_DELIVERY_CHARGE",
  });

  localStorage.setItem("deliveryCharge", JSON.stringify(getState().deliveryCharge.deliveryCharge));
};