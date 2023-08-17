import { REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../Constants/UserConstants";

export const signUpResReducer = (state = { signupRes: {} }, action) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          signupRes: action.payload,
        };
  
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          signupRes: action.payload,
        };
  
      default:
        return state;
    }
  };