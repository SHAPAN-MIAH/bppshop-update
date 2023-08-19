export const SignupRedirectReducer = (state = { signupRedirect: {} }, action) => {
  switch (action.type) {
    case "SIGNUP_REDIRECT":
      return {
        ...state,
        signupRedirect: action.payload,
      };

      case "CLEAR_SIGNUP_REDIRECT" : 
      {
        return {
          signupRedirect: {},
        };
      }
    default:
      return state;
  }
};