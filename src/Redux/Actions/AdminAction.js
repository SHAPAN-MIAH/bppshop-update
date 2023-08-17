import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import { loadUser } from './UserAction';

// Login
export const AdminLogin = (adminToken) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ADMIN_LOGIN_REQUEST' });
    const { data } = await axios.get(
      `${baseUrl}/auth/admin-login/?token=`+adminToken
    );
    // console.log(data)

    if (data.status === "success") {
      dispatch(AdminInfo(data))
      dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: data });
      localStorage.setItem("token", data.token);
    }else{
      dispatch({ type: 'ADMIN_LOGIN_FAIL', payload: data });
    }

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
    }
  } catch (error) {
    dispatch({ type: 'ADMIN_LOGIN_FAIL', payload: error.response.message });
  }
};

// Store agent info.
export const AdminInfo = (adminInfo) => async (dispatch, getState) => {
  // console.log(agentInfo.data.agent_id);

  try{
    dispatch({type: 'STORE_ADMIN_INFO', payload: adminInfo})
    localStorage.setItem("adminId", adminInfo.data.id);
  }catch(error){

  }
} 