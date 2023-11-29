import React from "react";
import "./Cart.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });

  const CartDetailsViewHandler = () => {
    const cartDetailsViewContainer = document.querySelector(
      ".cartDetailsView-container"
    );

    const cartDetailsViewSectionOverlay = document.querySelector(
      ".cartDetailsView_section_overlay"
    );

    cartDetailsViewContainer.style.display = "block";
    cartDetailsViewSectionOverlay.style.display = "block";

    cartDetailsViewContainer.classList.toggle(
      "cartDetailsView-container-toggle"
    );
  };

  return (
    <>
      <div className="cart">
        <button className="start-shopping-btn ">Start Shopping</button>
        <div onClick={CartDetailsViewHandler}>
          {/* <div className="cartIcon"> */}
            <i class="bi bi-cart3"></i>

            <span className="itemsForFullScreen">
              {cartItems?.[0]?.data?.length ? cartItems?.[0]?.data?.length : 0}{" "}
              Items
            </span>
            <span className="itemsForResScreen">
              {" "}
              {cartItems?.[0]?.data?.length ? cartItems?.[0]?.data?.length : 0}
            </span>
          {/* </div> */}

          <div className="cartTotalPrice">
            <small>
              &#2547;{" "}
              {cartItems?.[0]?.data?.length
                ? `${cartItems?.[0]?.data?.reduce(
                    (acc, item) =>
                      acc + item?.quantity * (item?.price - item?.discount),
                    0
                  )}`
                : "0"}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
