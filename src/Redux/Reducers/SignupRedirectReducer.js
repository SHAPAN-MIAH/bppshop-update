export const SignupRedirectReducer = (state = { signupRedirect: {} }, action) => {
  switch (action.type) {
    case "SIGNUP_REDIRECT":
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    default:
      return state;
  }
};