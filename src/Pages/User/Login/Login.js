import React, { useEffect } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "./../../../Redux/Actions/UserAction";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import MetaData from "../../Layout/MetaData";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { loginRes } = useSelector((state) => state.loginRes);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (isAuthenticated === true && token) {
      loginRes?.status === "success" &&
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

      let from = location?.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [loginRes, isAuthenticated, token, location, navigate]);

  return (
    <>
      <MetaData title="Login - BPPShop" />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="login_card">
            <div className="card-body">
              <h4 className="mb-4">Sign in</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-2">
                  <label>Mobile</label>
                  <input
                    {...register("phone", { required: true })}
                    required
                    className="login_input_form"
                    type="text"
                    name="phone"
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    {...register("password", { required: true })}
                    required
                    className="login_input_form"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
                {loginRes?.status === "failed" && (
                  <small className="text-danger">{loginRes?.message}</small>
                )}
                <div className="form-group d-flex flex-wrap justify-content-between py-2">
                  <div className="form-group">
                    <input
                      type="checkbox"
                      className="mr-1"
                      name="remember"
                      id="remember"
                    />

                    <label className="ms-1" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <div className="forget_pass">
                    <Link to="/recover-password">Forgot password?</Link>
                  </div>
                </div>
                <button className="signin_btn" type="submit">
                  Sign in
                </button>
              </form>
            </div>
            <div className="login_card_footer">
              <div className="needAccountToggleBtn">
                <h6>Need an account?</h6>
                <Link to="/signup">
                  <i className="fa fa-user-circle"></i> Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
