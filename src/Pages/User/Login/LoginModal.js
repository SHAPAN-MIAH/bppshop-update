import React, { useEffect, useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLogin } from "./../../../Redux/Actions/UserAction";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import MetaData from "../../Layout/MetaData";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import OtpInput from "react-otp-input";

const LoginModal = ({ navLoginOpen }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { loginRes } = useSelector((state) => state.loginRes);
  const { isAuthenticated } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  
  const [otpRequestData, setOtpRequestData] = useState({
    phone: "",
  });
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [otpSuccessStatus, setOtpSuccessStatus] = useState(false);
  const [otp, setOtp] = useState("");


  const handleChange = ({ currentTarget: input }) => {
    setOtpRequestData({ ...otpRequestData, [input.name]: input.value });
  };

  
  const numberSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/auth/send`, otpRequestData).then((res) => {
        if (res.data.status == "success") {
          setOtpSuccessStatus(true);

          const loginWithNumberFormContainer = document.querySelector(
            ".login-with-number-form-container"
          );
          const otp_box = document.querySelector(".otp_box");

          loginWithNumberFormContainer.style.display = "none";
          otp_box.style.display = "block";
        }
      });
    } catch (error) {
    }
  };

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const LoginWithEmailToggleHandler = () => {
    const loginWithNumberContainer = document.querySelector(
      ".login-with-number-container"
    );
    const loginWithEmailContainer = document.querySelector(
      ".login-with-email-container"
    );
    const LoginWithEmailToggleBtn = document.querySelector(
      "#LoginWithEmailToggleBtn"
    );
    const LoginWithPhoneNoToggleBtn = document.querySelector(
      "#LoginWithPhoneNoToggleBtn"
    );

    loginWithNumberContainer.style.display = "none";
    loginWithEmailContainer.style.display = "block";
    LoginWithPhoneNoToggleBtn.style.display = "block";
    LoginWithEmailToggleBtn.style.display = "none";
  };
  const LoginWithPhoneNoToggleHandler = () => {
    const loginWithNumberContainer = document.querySelector(
      ".login-with-number-container"
    );
    const loginWithEmailContainer = document.querySelector(
      ".login-with-email-container"
    );
    const LoginWithEmailToggleBtn = document.querySelector(
      "#LoginWithEmailToggleBtn"
    );
    const LoginWithPhoneNoToggleBtn = document.querySelector(
      "#LoginWithPhoneNoToggleBtn"
    );

    loginWithNumberContainer.style.display = "block";
    loginWithEmailContainer.style.display = "none";
    LoginWithPhoneNoToggleBtn.style.display = "none";
    LoginWithEmailToggleBtn.style.display = "block";
  };

  useEffect(() => {
    if (otpSuccessStatus === true) {
      const interval = setTimeout(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [otpSuccessStatus, seconds, minutes]);

  const resendOtpData = {
    phone: otpRequestData.phone,
    resend: 0,
  };

  const resendOTP = () => {
    setMinutes(3);
    setSeconds(0);
    axios.post(`${baseUrl}/auth/send`, resendOtpData).then((res) => {
    });
  };

  const otpSubmitData = {
    phone: `${otpRequestData.phone}`,
    pin: `${otp}`,
  };

  const otpSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(otpSubmitData));

    if (!navLoginOpen == true) {
      localStorage.setItem("modalLogin", "true");
    }
  };

  // user login action dispatch.........
  const onSubmit = (data) => {
    dispatch(userLogin(data));

    if (!navLoginOpen == true) {
      localStorage.setItem("modalLogin", "true");
    }
  };

  useEffect(() => {
    if (isAuthenticated == true && token) {
      loginRes?.status == "success" &&
        toast.success(`${loginRes?.message}`, {
          duration: 5000,
          style: {
            width: "100%",
            height: "80px",
            padding: "0px 20px",
            background: "#86bc19",
            color: "#fff",
          },
        });
    }
  }, [loginRes, isAuthenticated, token]);

  return (
    <>
      <MetaData title="Login - BPPShop" />
      <div className="modal_login_card">
        <h4 className="mb-4">Login</h4>

        <button
          type=""
          id="LoginWithEmailToggleBtn"
          onClick={LoginWithEmailToggleHandler}
        >
          <i className="bi bi-envelope-fill"></i> Login With Email
        </button>
        <button
          type=""
          id="LoginWithPhoneNoToggleBtn"
          onClick={LoginWithPhoneNoToggleHandler}
        >
          <i className="bi bi-phone"></i> Login With Phone Number
        </button>

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <span
            style={{ width: "50%", borderBottom: "1px solid gainsboro" }}
          ></span>{" "}
          <span style={{ marginBottom: "-9px" }}>or</span>{" "}
          <span
            style={{ width: "50%", borderBottom: "1px solid gainsboro" }}
          ></span>
        </div>

        <div className="login-with-number-container mt-5">
          <form
            className="login-with-number-form-container"
            onSubmit={numberSubmit}
          >
            <input
              type="text"
              name="phone"
              required
              placeholder="Enter your mobile number"
              className="numberLoginInput"
              onChange={handleChange}
            />
            <br />
            <button className="signin_btn" type="submit">
              Login / Sign up
            </button>
          </form>

          <div className="otp_box">
            <strong>We've sent a 4-digit OTP in your phone</strong>
            <br />
            <br />
            <span>Please enter 4 digit OTP to verify your identity</span>
            <div className="d-flex justify-content-center">
              <div>
                <div className="d-flex justify-content-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: "40px",
                      borderRadius: "0px",
                      padding: "5px 10px",
                      outline: "none",
                      border: "1px solid gray",
                      fontSize: "18px",
                      marginTop: "10px",
                    }}
                  />
                </div>

                <div className="resendTimer">
                  <div className="countdown-text">
                    {seconds > 0 || minutes > 0 ? (
                      <p>
                        Request OTP Again:{" "}
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>Didn't receive the code?</p>
                    )}

                    {seconds > 0 || minutes > 0 ? null : (
                      <span onClick={resendOTP} className="resendOtpBtn">
                        Resend OTP
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={otpSubmit} type="submit" id="otpSubmitBtn">
              {" "}
              Enter
            </button>
            <br />
          </div>
        </div>

        <div className="login-with-email-container mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group my-2">
              <input
                {...register("email", { required: true })}
                required
                className="login_input_form"
                type="text"
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <div className="d-flex">
                <input
                  {...register("password", { required: true })}
                  required
                  className="login_input_form"
                  name="password"
                  type={passwordType}
                  placeholder="Password"
                />
                <span className="passwordToggleBtn" onClick={togglePassword}>
                  {passwordType === "password" ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
            </div>
            {loginRes?.status == "failed" && (
              <small className="text-danger">{loginRes?.message}</small>
            )}

            <button className="signin_btn" type="submit">
              Login / Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
