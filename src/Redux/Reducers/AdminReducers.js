export const AdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case "ADMIN_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "ADMIN_LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const AdminInfoReducer = (state = { adminInfo: {} }, action) => {
  switch (action.type) {
    case "STORE_ADMIN_INFO":
      return {
        ...state,
        adminInfo: action.payload,
      };

    default:
      return state;
  }
};
