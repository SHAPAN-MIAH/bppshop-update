import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";

// add to cart with login..........................................................
// export const addItemsToCartWithLogin = () => async (dispatch, getState) => {
//   const cartItemList = getState().cart.cartItems;

//   let bulkItems = [];

//   cartItemList.forEach((element) => {
//     let product = {};
//     let choiceOption = element.defaultChoices;

//     product.id = element.product.id;
//     product.quantity = element.quantity;
//     choiceOption.forEach((element) => {
//       product[element.name] = `${element.options}`.trim();
//     });

//     bulkItems.push(product);
//   });

//   try {
//     dispatch({ type: "ADD_TO_CART_WITH_LOGIN_REQUEST" });
//     const token = localStorage.getItem("token");
//     const config = { headers: { Authorization: `Bearer ${token}` } };

//     const { data } = await axios.post(
//       `${baseUrl}/cart/add-bulk`,
//       bulkItems,
//       config
//     );
//     data.cart.forEach((element) => {
//       dispatch({ type: "ADD_TO_CART_WITH_LOGIN_SUCCESS", payload: element });
//     });

//     localStorage.setItem(
//       "cartGroupItems",
//       JSON.stringify(getState().cartGroup.cartGroupItems)
//     );
//   } catch (error) {
//     dispatch({
//       type: "ADD_TO_CART_WITH_LOGIN_FAIL",
//       payload: error.response.data.message,
//     });
//   }
// };



// add to cart after login....................................................
export const addItemsToCartAfterLogin = (addItemToCartAfterLoginData) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_TO_CART_AFTER_LOGIN_REQUEST" });
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/add`,
        addItemToCartAfterLoginData,
        config
      );

      if (data.status === "success") {
        dispatch({ type: "ADD_TO_CART_AFTER_LOGIN_SUCCESS", payload: data });
        localStorage.setItem(
          "cartGroupItems",
          JSON.stringify(getState().cartGroup.cartGroupItems)
        );

        dispatch(getCartData());
      } else {
        dispatch({ type: "ADD_TO_CART_AFTER_LOGIN_FAIL" });
      }
    } catch (error) {
      dispatch({
        type: "ADD_TO_CART_AFTER_LOGIN_FAIL",
        payload: error.response.data.message,
      });
    }
};


// ADD TO CART without login......................................................
export const addItemsToCart =
  (product, quantity, defaultChoices) => async (dispatch, getState) => {
    const productId = product.id;
    const cartGroupItems = getState().cartGroup.cartGroupItems;
    const isItemExist = cartGroupItems?.find(
      (i) => i.product_id || i.data.product_id === productId
    );
    const token = localStorage.getItem("token");

    if (token) {
      const cartUpdateInfo = {
        key: `${isItemExist?.data?.id}`,
        quantity: `${quantity}`,
      };

      if (isItemExist) {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        dispatch({
          type: "ADD_TO_CART",
          payload: {
            product,
            quantity,
            defaultChoices,
          },
        });
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().cart.cartItems)
        );

        const { data } = await axios.post(
          `${baseUrl}/cart/update`,
          cartUpdateInfo,
          config
        );

        dispatch({
          type: "UPDATE_CART",
          payload: data,
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            product,
            quantity,
            defaultChoices,
          },
        });
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().cart.cartItems)
        );
      }
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          product,
          quantity,
          defaultChoices,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    }

    // const cartUpdateInfo = {
    //   key: `${isItemExist?.data?.id}`,
    //   quantity: `${quantity}`,
    // };

    // if (isItemExist) {
    //   const token = localStorage.getItem("token");
    //   const config = { headers: { Authorization: `Bearer ${token}` } };

    //   dispatch({
    //     type: "ADD_TO_CART",
    //     payload: {
    //       product,
    //       quantity,
    //       defaultChoices,
    //     },
    //   });
    //   localStorage.setItem(
    //     "cartItems",
    //     JSON.stringify(getState().cart.cartItems)
    //   );

    //   const { data } = await axios.post(
    //     `${baseUrl}/cart/update`,
    //     cartUpdateInfo,
    //     config
    //   );

    //   dispatch({
    //     type: "UPDATE_CART",
    //     payload: data,
    //   });
    // }
};

// Update Cart without login....................................................
export const updateItemsToCart = (id, newQty) => async (dispatch, getState) => {

    const cartItems = getState().cart.cartItems;
    const isItemExist = cartItems[0]?.data?.find(
      (i) => i.id === id
    );

    const cartUpdateInfo = {
      key: `${isItemExist?.id}`,
      quantity: `${newQty}`,
    };

    if (isItemExist) {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/update`,
        cartUpdateInfo,
        config
      );
    
      if(data.status === "success"){
        dispatch(getCartData());
      }


      dispatch({
        type: "UPDATE_CART",
        payload: data,
      });
    }
};

// get cart data.......................................................................
export const getCartData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_CART_REQUEST" });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(`${baseUrl}/cart`, config);

    dispatch({ type: "GET_CART_SUCCESS", payload: data });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({ type: "GET_CART_FAIL", payload: error.response.data.message });
  }
};

// REMOVE FROM CART...............................................................
export const removeItemsFromCart = (productId) => async (dispatch, getState) => {
    const cartItems = getState().cart.cartItems;
    const isItemExist = cartItems?.[0].data.find((i) => i.id === productId);
    const cartId = { key: `${isItemExist?.id}` };

    if (isItemExist) {
      dispatch({ type: "REMOVE_ITEM_FROM_CART_REQUEST" });
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/remove`,
        cartId,
        config
      );

      dispatch({
        type: "REMOVE_ITEM_FROM_CART_SUCCESS",
        payload: productId,
      });

      localStorage.setItem(
        "cartGroupItems",
        JSON.stringify(getState().cartGroup.cartGroupItems)
      );
    }

    dispatch(getCartData());
};

// CLEAR CART........................................................
export const ClearCart = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART",
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const ClearCartGroupItems = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART_GROUP_ITEMS",
  });

  localStorage.setItem(
    "cartGroupItems",
    JSON.stringify(getState().cartGroup.cartGroupItems)
  );
};
