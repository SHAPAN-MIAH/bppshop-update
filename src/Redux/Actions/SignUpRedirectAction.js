export const SignupRedirectAction  = (isTrue) => async(dispatch, getState) => {
  try{
    dispatch({type: "SIGNUP_REDIRECT", payload: isTrue});
    localStorage.setItem("SignupRedirect", isTrue);
  }catch(error){
    dispatch({ type: 'SIGNUP_REDIRECT_FAIL', payload: error.response.message });
  }
}

export const SignupRedirectClear = ()=> async(dispatch)=>{
  dispatch({
    type: "CLEAR_SIGNUP_REDIRECT",
  });
  localStorage.removeItem("SignupRedirect");
}