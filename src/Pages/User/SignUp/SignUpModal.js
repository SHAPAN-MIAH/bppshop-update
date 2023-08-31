import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../Redux/Actions/UserAction";
import { useSelector } from "react-redux";
import MetaData from "../../Layout/MetaData";
import { toast } from "react-hot-toast";

const SignUpModal = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { signupRes } = useSelector((state) => state.signupRes);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const SignupRedirect = localStorage.getItem("SignupRedirect");
  const { isAuthenticated } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(userRegister(data));
    localStorage.setItem("modalSignup", "true");
  };

  useEffect(() => {
    if (isAuthenticated == true && token) {
      signupRes?.status == "success" &&
        toast.success(`${signupRes?.message}`, {
          duration: 5000,
          style: {
            width: "100%",
            height: "80px",
            padding: "0px 20px",
            background: "#86bc19",
            color: "#fff",
          },
        });

      // if(!cartItems[0]?.data?.length){
      //   navigate("/");
      // toast.error(`Your Cart Is Empty. Please add product in cart first.`, {
      //   duration: 7000,
      //   style: {
      //     width: "100%",
      //     height: "80px",
      //     padding: "0px 20px",
      //     background: "#ff4a32",
      //     color: "#fff",
      //   },
      // });
      // }

      if (SignupRedirect && cartItems[0]?.data?.length > 0) {
        navigate("/shipping-address");
        localStorage.removeItem("SignupRedirect");
      }
    }
  }, [token, isAuthenticated, SignupRedirect, navigate, signupRes, cartItems]);

  const loginSignupToggle = () => {
    document.querySelector(".LoginModal_container").style.display = "block";
    document.querySelector(".SignUpModal_container").style.display = "none";
  };

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <>
      <MetaData title="Sign-Up - BPPShop" />
      <div className="row justify-content-center">
        <div className="modal_signup_card_container">
          <div className="signup_card">
            <div className="signup_card_body">
              <h4 className=" mb-4">Create Account</h4>
              {/* <p className="font-size-sm text-muted mb-4">
            Register control your order .
          </p> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className=" col-md-6">
                    <div className="my-1">
                      <label>Your name</label>
                      <input
                        {...register("name", { required: true })}
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <div className=" col-md-6">
                    <div className="my-1">
                      <label>
                        Mobile
                        <small className="text-dark">
                          (Country code is must)
                        </small>
                      </label>
                      <input
                        {...register("phone", { required: true })}
                        className="form-control"
                        type="text"
                        name="phone"
                        placeholder="+880"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" col-md-6">
                    <div className="my-1">
                      <label>Password</label>
                      <div className="d-flex">
                        <input
                          {...register("password", { required: true })}
                          className="form-control"
                          type={passwordType}
                          name="password"
                          placeholder="Minimum 8 characters long"
                          required
                        />
                        <span
                          className="passwordToggleBtn"
                          onClick={togglePassword}
                        >
                          {passwordType === "password" ? (
                            <i className="bi bi-eye-slash"></i>
                          ) : (
                            <i className="bi bi-eye"></i>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-6">
                    <div className="my-1">
                      <label>Confirm password</label>
                      <div className="d-flex">
                        <input
                          {...register("con_password", { required: true })}
                          className="form-control"
                          type={passwordType}
                          name="con_password"
                          placeholder="Minimum 8 characters long"
                          required
                        />
                        <span
                          className="passwordToggleBtn"
                          onClick={togglePassword}
                        >
                          {passwordType === "password" ? (
                            <i className="bi bi-eye-slash"></i>
                          ) : (
                            <i className="bi bi-eye"></i>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {signupRes?.status == "failed" && (
                  <small className="text-danger">{signupRes?.message}</small>
                )}
                <div className="form-group d-flex flex-wrap justify-content-between">
                  <div className="form-group my-3">
                    <strong>
                      <input
                        type="checkbox"
                        className="mr-1"
                        name="remember"
                        id="inputCheckd"
                      />
                    </strong>
                    <label className="ms-1" htmlFor="remember">
                      I agree to Your Terms and condition
                    </label>
                  </div>
                  {/* <div id="invalid-feedback">{signUpError}</div> */}
                </div>

                <div className="sign_up_btn mt-2">
                  <button type="submit">Sign-up</button>
                </div>
                {/* </div> */}
              </form>
            </div>
            <div className="row">
              <div className="signup_card_footer login_card_footer">
                <div className="sign_in_path">
                  Already have account?{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "600",
                      color: "#ef8341",
                    }}
                    onClick={loginSignupToggle}
                  >
                    {" "}
                    Sign in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
