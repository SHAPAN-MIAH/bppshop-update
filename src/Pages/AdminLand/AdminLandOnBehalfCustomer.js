import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import { AdminLogin } from "../../Redux/Actions/AdminAction";

const AdminLandOnBehalfCustomer = () => {
  const { adminToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.adminInfo.adminInfo);


  useEffect(() => {
    dispatch(AdminLogin(adminToken));
    if (adminInfo?.status === "success") {
      navigate("/");
    }
    
    // axios.get( `${baseUrl}/auth/admin-login/?token=` + adminToken)
    // .then((res) => {
    //   dispatch(AdminInfo(res))
    //   navigate('/')
    // });
  }, [adminToken, navigate, dispatch, adminInfo]);

  return <div></div>;
};

export default AdminLandOnBehalfCustomer;
