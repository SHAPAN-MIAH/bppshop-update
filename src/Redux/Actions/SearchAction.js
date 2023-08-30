import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";

// Search Products
export const searchProduct = (searchData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "SEARCH_PRODUCT_REQUEST" });
    const url = baseUrl + "/products/search";
    const { data } = await axios.post(url, searchData);

    dispatch({ type: "SEARCH_PRODUCT_SUCCESS", payload: data });
      // localStorage.setItem("searchProduct", JSON.stringify(getState().searchProduct));
  } catch (error) {
    dispatch({ type: "SEARCH_PRODUCT_FAIL", payload: error });
  }
};


// Search Products by category
export const searchProductByCategory =
  (suggestionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: "SEARCH_PRODUCT_REQUEST" });
      const productUrl = `${baseUrl}/categories/products/${suggestionId}`;

      const { data } = await axios.get(productUrl);

      dispatch({ type: "SEARCH_PRODUCT_SUCCESS", payload: data });
      //   localStorage.setItem("searchProduct", JSON.stringify(getState().searchProduct));
    } catch (error) {
      dispatch({ type: "SEARCH_PRODUCT_FAIL", payload: error });
    }
  };
