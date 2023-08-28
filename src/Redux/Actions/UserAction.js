import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../Constants/UserConstants.js";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import {
  addItemsToCartAfterLogin,
  addItemsToCartWithLogin,
  getCartData,
} from "./CartAction.js";

// Login
export const userLogin = (loginData, addToCartAfterLoginRes) => async (dispatch, getState) => {
 
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${baseUrl}/auth/login`,
      loginData,
      config
    );
    if (data.status == "success") {
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "loginRes",
        JSON.stringify(getState().loginRes.loginRes)
      );
      
      // add to cart after login response......
      const addToCartAfterLoginRes = () => {
        const cartItemBeforeLogin = getState().cartItemBeforeLogin.cartItem;
        let quantity = 1;
        let colors = [];
        const choice_options = cartItemBeforeLogin[0]?.product?.choice_options;
        const choice_options_name = choice_options?.map(
          (option) => option.name
        );
        const choice_options_defaultValue = choice_options?.map(
          (option) => option?.options[0]
        );
        const defaultChoices = choice_options_name?.map((name, index) => ({
          name,
          options: choice_options_defaultValue[index],
        }));

        let color = colors?.map((color) => color?.code);

        const addItemsToCartDataWithColor = {
          id: `${cartItemBeforeLogin[0]?.product?.id}`,
          color: `${color[0]}`,
          quantity: `${quantity}`,
        };

        const addItemsToCartDataWithoutColor = {
          id: `${cartItemBeforeLogin[0]?.product?.id}`,
          quantity: `${quantity}`,
        };

        defaultChoices?.forEach((element) => {
          addItemsToCartDataWithColor[element.name] =
            `${element.options}`.trim();
        });

        defaultChoices?.forEach((element) => {
          addItemsToCartDataWithoutColor[element.name] =
            `${element.options}`.trim();
        });

        // if (loginRes?.status == "success" || signupRes?.status == "success") {
        cartItemBeforeLogin[0]?.product?.colors?.length > 0
          ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
          : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));

        // addToCartOverlyLoading();
        // }
      };
      const modalLogin = localStorage.getItem("modalLogin");
      const productCartLoginAddItem = localStorage.getItem("productCartLoginAddItem");
      // const productCartLoginAddItem = localStorage.getItem("productDetailsPageLoginSignupAddItem");

      if(modalLogin == "true" && productCartLoginAddItem){
        addToCartAfterLoginRes()
      }
      dispatch(getCartData());
    } else {
      dispatch({ type: LOGIN_FAIL, payload: data });
    }

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
      // dispatch(addItemsToCartAfterLogin());
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.message });
  }
};

// Register
export const userRegister = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${baseUrl}/auth/register`,
      userData,
      config
    );
    if (data.status == "success") {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "signupRes",
        JSON.stringify(getState().signupRes.signupRes)
      );

      // add to cart after login response......
      const addToCartAfterLoginRes = () => {
        const cartItemBeforeLogin = getState().cartItemBeforeLogin.cartItem;
        let quantity = 1;
        let colors = [];
        const choice_options = cartItemBeforeLogin[0]?.product?.choice_options;
        const choice_options_name = choice_options?.map(
          (option) => option.name
        );
        const choice_options_defaultValue = choice_options?.map(
          (option) => option?.options[0]
        );
        const defaultChoices = choice_options_name?.map((name, index) => ({
          name,
          options: choice_options_defaultValue[index],
        }));

        let color = colors?.map((color) => color?.code);

        const addItemsToCartDataWithColor = {
          id: `${cartItemBeforeLogin[0]?.product?.id}`,
          color: `${color[0]}`,
          quantity: `${quantity}`,
        };

        const addItemsToCartDataWithoutColor = {
          id: `${cartItemBeforeLogin[0]?.product?.id}`,
          quantity: `${quantity}`,
        };

        defaultChoices?.forEach((element) => {
          addItemsToCartDataWithColor[element.name] =
            `${element.options}`.trim();
        });

        defaultChoices?.forEach((element) => {
          addItemsToCartDataWithoutColor[element.name] =
            `${element.options}`.trim();
        });

        // if (loginRes?.status == "success" || signupRes?.status == "success") {
        cartItemBeforeLogin[0]?.product?.colors?.length > 0
          ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
          : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));

        // addToCartOverlyLoading();
        // }
      };

      const modalSignup = localStorage.getItem("modalSignup");
      if(modalSignup == "true"){
        addToCartAfterLoginRes()
      }
      dispatch(getCartData());
    } else {
      dispatch({ type: REGISTER_USER_FAIL, payload: data });
    }

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
      // dispatch(addItemsToCartWithLogin());
    }
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${baseUrl}/customer/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.status == "success") {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const token = localStorage.getItem("token");
    const data = await axios.get(`${baseUrl}/customer/logout`, token);
    // console.log(data);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// // Update Profile
// export const updateProfile = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PROFILE_REQUEST });

//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.put(`${baseUrl}`, userData, config);

//     dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PROFILE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Forgot Password
// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: FORGOT_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(`${baseUrl}`, email, config);

//     dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: FORGOT_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
