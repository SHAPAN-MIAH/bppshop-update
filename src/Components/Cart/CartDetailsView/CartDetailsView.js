import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartDetailsView.css";
import { Link } from "react-router-dom";
import {
  updateItemsToCart,
  removeItemsFromCart,
} from "./../../../Redux/Actions/CartAction";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import toast from "react-hot-toast";
import { SignupRedirectAction } from "../../../Redux/Actions/SignUpRedirectAction";
import { useEffect } from "react";

const CartDetailsView = () => {
  const [quantityCount, setQuantityCount] = useState(1);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });
  const itemRemoveRes = useSelector((state) => {
    return state.RemoveItemRes.RemoveItemRes;
  });

  const ItemQtyUpdateRes = useSelector(
    (state) => state.ItemQtyUpdateRes.ItemQtyUpdateRes
  );

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      toast.error("Stock Limited.", {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
      return;
    }

    if (ItemQtyUpdateRes[0]?.status == "failed") {
      toast.success(`${ItemQtyUpdateRes[0]?.message}`, {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
    }

    // dispatch(addItemsToCart(id, newQty, defaultChoices));
    dispatch(updateItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity, defaultChoices) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    // dispatch(addItemsToCart(id, newQty, defaultChoices));
    dispatch(updateItemsToCart(id, newQty, defaultChoices));
  };

  //cart item remove functionality
  const handleRemoveItemFormCart = (id) => {
    dispatch(removeItemsFromCart(id));    
  };


  useEffect(() => {
    if (itemRemoveRes[0]?.status == "success") {
      // toaster
      toast.success(`Item removed from cart successfully`, {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
    }
  }, [itemRemoveRes])

  const CartDetailsCloseHandler = () => {
    const cartDetailsViewContainer = document.querySelector(
      ".cartDetailsView-container"
    );
    const cartDetailsViewSectionOverlay = document.querySelector(
      ".cartDetailsView_section_overlay"
    );
    cartDetailsViewSectionOverlay.style.display = "none";
    cartDetailsViewContainer.classList.toggle(
      "cartDetailsView-container-toggle"
    );
  };

  const CartDetailsCloseHandlerAfterPlaceOrder = () => {
    const cartDetailsViewSectionOverlay = document.querySelector(
      ".cartDetailsView_section_overlay"
    );
    const cartDetailsViewContainer = document.querySelector(
      ".cartDetailsView-container"
    );

    cartDetailsViewSectionOverlay.style.display = "none";
    cartDetailsViewContainer.classList.toggle(
      "cartDetailsView-container-toggle"
    );

    //onclick place order go to top of the page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    dispatch(SignupRedirectAction(true));
  };

  const CartEmptyAlert = () => {
    document.querySelector(".cartEmptyAlert").innerHTML =
      "Please add product in cart first.";
    document.querySelector(".cartEmptyAlert").style.color = "red";
  };

 

  return (
    <>
      <div className="cartDetailsView-container">
        <div className="cartDetailsView-header">
          <span>My Shopping Cart</span>
          <span onClick={CartDetailsCloseHandler}>
            <i className="bi bi-x-lg"></i>
          </span>
        </div>
        <div className="cartDetailsView-content">
          {!cartItems?.[0]?.data?.length ? (
            <h4 className=" text-center cartEmptyAlert">
              You have no items in your cart!
            </h4>
          ) : (
            cartItems?.[0]?.data?.map((item) => (
              <div key={item?.id} className="cartDetails">
                <img src={imgThumbnailBaseUrl + `/${item?.thumbnail}`} alt="" />
                <div className="cart-content-qty-container">
                  <div className="d-flex justify-content-between">
                    <small>
                      {item?.name?.toString().substring(0, 17)}...
                      <span>
                        {item?.choice_options?.map(
                          (option) => option.options[0]
                        )}
                        {item?.choice_options?.map((option) => option.title)}
                      </span>
                    </small>
                    <span
                      onClick={() => handleRemoveItemFormCart(item?.id)}
                      className="cartItemDeleteBtn"
                    >
                      <i className="bi bi-trash3"></i>
                    </span>
                  </div>
                  <div className="cart-content">
                    {item?.discount > 0 ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <span> &#2547; {item?.price - item?.discount}</span>{" "}
                        <del className="text-danger ms-1">
                          &#2547; {item?.price}
                        </del>
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <span>&#2547; {item?.price}</span>
                      </div>
                    )}

                    <div className="cartTitleQty">
                      <div className="quantity-set">
                        <span
                          onClick={() =>
                            decreaseQuantity(
                              item?.id,
                              item?.quantity,
                              item?.choice_options
                            )
                          }
                          className="cartMinusBtn"
                        >
                          <i className="bi bi-dash-square-fill"></i>
                        </span>
                        <span className="qtyCount-number">
                          {item?.quantity}
                        </span>
                        <span
                          onClick={() =>
                            increaseQuantity(
                              item?.id,
                              item?.quantity,
                              item?.current_stock,
                              item?.choice_options
                            )
                          }
                          className="cartPlusBtn"
                        >
                          <i className="bi bi-plus-square-fill"></i>
                        </span>
                      </div>
                      {item?.discount > 0 ? (
                        <span className="mx-2 text-end">
                          &#2547;
                          {item?.quantity * (item?.price - item?.discount)}
                        </span>
                      ) : (
                        <span className="mx-2 text-end">
                          &#2547; {item?.quantity * item?.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total-container">
          <div className="d-flex justify-content-between">
            <h6>Grand Total: </h6>
            <h6>
              = &#2547;{" "}
              {cartItems?.[0]?.data?.length
                ? `${cartItems?.[0]?.data?.reduce(
                    (acc, item) =>
                      acc +
                      item?.quantity *
                        (item?.price - item?.discount) *
                        quantityCount,
                    0
                  )}`
                : "0.00"}
            </h6>
          </div>
          {!cartItems[0]?.data?.length ? (
            <button onClick={CartEmptyAlert} type="">
              Place Order
            </button>
          ) : (
            <Link to="/shipping-address">
              <button onClick={CartDetailsCloseHandlerAfterPlaceOrder} type="">
                Place Order
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDetailsView;
