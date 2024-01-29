import {
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAIL
} from "../Constants/BannerConstants"; 


const BannerReducers = (state = { banners: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_BANNER_REQUEST:
      return {
        loading: true,
        banners: [],
      };
    case GET_BANNER_SUCCESS:
      return {
        loading: false,
        banners: action.payload,
      };
    case GET_BANNER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

      default:
      return  state
  }
};
export default BannerReducers;
