import React from "react";
import "./ForgetPassword.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import { useNavigate } from 'react-router-dom';
import MetaData from "../Layout/MetaData";

const ForgetPassWord = () => {
  const navigate=useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(baseUrl + "/auth/forgot", data)
      .then((res) => {
        if (res?.data?.status === "success") {
          alert(res?.data?.message);
          navigate("/login")
        }
      });
  };
  return (
    <>
    <MetaData title="Recover-Password - BPPShop" />
      <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
        <h2 className="h3 mb-4">Forgot your password?</h2>
        <p className="font-size-md">
          Change your password in three easy steps. This helps to keep your new
          password secure .
        </p>
        <ol>
          <li>Fill in your phone number below.</li>
          <li>We will send you a OTP.</li>
          <li>Use the OTP to reset your password on our secure website.</li>
        </ol>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="recover_pass_card">
            <div className="recover_pass_card_body needs-validation">
              <label htmlFor="recover-email">Enter your phone number</label>
              <input
               {...register("phone")}
                className="recover_pass_input"
                type="text"
                name="phone"
                required
              />
              <button className="recover_pass_btn" type="submit">
                Get new password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ForgetPassWord;
