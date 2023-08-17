import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { AgentLogin } from "../../Redux/Actions/AgentAction";

const AgentLand = () => {
  const { agentToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agentInfo = useSelector((state) => state.agentInfo.agentInfo);


  useEffect(() => {
    dispatch(AgentLogin(agentToken));

    if(agentInfo?.status === "success"){
      navigate("/");
    }

    // axios.get(`${baseUrl}/auth/agent-login/?token=` + agentToken)
    //   .then((res) => {
    //     dispatch(AgentInfo(res));
    //     navigate("/");
    //   });
  }, [agentToken, navigate, dispatch, agentInfo]);

  return <div></div>;
};

export default AgentLand;
