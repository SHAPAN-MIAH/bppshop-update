import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import { loadUser } from './UserAction';

// Agent Login
export const AgentLogin = (agentToken) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'AGENT_LOGIN_REQUEST' });
    const { data } = await axios.get(
      `${baseUrl}/auth/agent-login/?token=`+agentToken
    );

    // console.log(data)

    if (data.status === "success") {
      dispatch(AgentInfo(data));
      dispatch({ type: 'AGENT_LOGIN_SUCCESS', payload: data });
      localStorage.setItem("token", data.token);
    }else{
      dispatch({ type: 'AGENT_LOGIN_FAIL', payload: data });
    }

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
    }
  } catch (error) {
    dispatch({ type: 'AGENT_LOGIN_FAIL', payload: error.response.message });
  }
};

// Store agent info.
export const AgentInfo = (agentInfo) => async (dispatch, getstate) => {
  // console.log(agentInfo.data.agent_id);

  try{
    dispatch({type: 'STORE_AGENT_INFO', payload: agentInfo})
    localStorage.setItem("agentId", agentInfo.data.agent_id);
  }catch(error){

  }
} 