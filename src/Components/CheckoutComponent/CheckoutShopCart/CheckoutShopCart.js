import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import MetaData from "../../../Pages/Layout/MetaData";
import {
  addItemsToCart,
  removeItemsFromCart,
  updateItemsToCart,
} from "../../../Redux/Actions/CartAction";
import "./CheckoutShopCart.css";

const CheckoutShopCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    return state.cart.cartItems[0]?.data;
  });

  // console.log(cartItems);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    // dispatch(addItemsToCart(id, newQty));

    dispatch(updateItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    // dispatch(addItemsToCart(id, newQty));

    dispatch(updateItemsToCart(id, newQty));
  };

  const CartEmptyAlert = () => {
    document.querySelector(".shopCartEmptyAlert").innerHTML =
      "Your cart is empty. Please add product in cart first.";
  };

  return (
    <>
      <MetaData title="Checkout-Shoping-Cart - BPPShop" />
      <div className="shop_cart_section">
        <h3 className="shop_cart_title">SHOPPING CART</h3>
        <div className="shop_cart_container">
          <i>Shop name : BPP Shop</i>

          {cartItems?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table my-3">
                <thead className="">
                  <tr className="">
                    <th className="font-weight-bold">SL#</th>
                    <th className="font-weight-bold">Product</th>
                    <th className="font-weight-bold">Product Name</th>
                    {/* <th className="font-weight-bold">Unit</th> */}
                    <th className="font-weight-bold">Unit price</th>
                    <th className="font-weight-bold">Qty</th>
                    <th className="font-weight-bold">Price</th>
                    {/* <th className="font-weight-bold">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            style={{ width: "40px" }}
                            src={imgThumbnailBaseUrl + `/${item?.thumbnail}`}
                            alt=""
                          />
                        </td>
                        <td>
                          {" "}
                          <small>
                            {item?.name?.toString().substring(0, 16)}
                            ..
                          </small>
                        </td>
                        {/* <td>
                          {" "}
                          <small>
                            <small>
                              {item?.choices?.map(
                                (option) => option.options[0]
                              )}
                            </small>
                            {item?.choices?.map(
                              (option) => option.title
                            )}
                          </small>
                        </td> */}
                        <td>
                          {" "}
                          {item?.discount > 0 ? (
                            <div>
                              {" "}
                              <small className="m-1">
                                &#2547;{" "}
                                {item?.price - item?.discount}
                              </small>
                              <small className="m-1">
                                <del>&#2547; {item?.price}</del>
                              </small>
                            </div>
                          ) : (
                            <small>&#2547; {item?.price}</small>
                          )}
                        </td>
                        <td>
                          {" "}
                          <div className="quantity-set">
                            <small
                              onClick={() =>
                                decreaseQuantity(
                                  item?.id,
                                  item?.quantity,
                                  item?.choice_options
                                )
                              }
                              className="shopCartMinusBtn"
                            >
                              -
                            </small>
                            <small className="qtyCount-number">
                              {item?.quantity}
                            </small>
                            <small
                              onClick={() =>
                                increaseQuantity(
                                  item?.id,
                                  item?.quantity,
                                  item?.current_stock
                                  // item?.choice_options
                                )
                              }
                              className="shopCartPlusBtn"
                            >
                              +
                            </small>
                          </div>
                        </td>
                        <td>
                          {item?.discount > 0 ? (
                            <small className="mx-2">
                              Total : &#2547;
                              {item?.quantity * (item?.price - item?.discount)}
                            </small>
                          ) : (
                            <small className="mx-2">
                              Total : &#2547; {item?.quantity * item?.price}
                            </small>
                          )}
                        </td>
                        <td>
                          <span
                            onClick={() =>
                              dispatch(removeItemsFromCart(item?.id))
                            }
                            className="cartItemDeleteBtn"
                          >
                            <i className="bi bi-trash3"></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="my-2 text-center fs-4">
              You have no items in your cart!
            </p>
          )}
        </div>
        {/* <div className="my-3">
          <b>Shipping method</b> : Cash on Delivery
        </div> */}
        <div className="my-2">
          {/* <div className="row">
            <div>
              <label className="ms-1">Order note (Optional)</label>
              <textarea
                className="shipping_delivary_form_input"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="col-md-6">
              <label className="ms-1">Preferred delivery date</label>
              <input
                className="shipping_delivary_form_input"
                type="date"
                name=""
                id=""
              />
            </div>
            <div className="col-md-6">
              <label className="ms-1">Preferred delivery time</label>
              <input
                className="shipping_delivary_form_input"
                type="time"
                name=""
                id=""
              />
            </div>
          </div> */}

          <p className="shopCartEmptyAlert"></p>
          <div className="shop_payment_btn_content">
            <div className="shop_payment_btn">
              <Link to="/">
                <div className="shop_cart_btn">
                  <i className="bi bi-chevron-left"></i> Continue shopping
                </div>
              </Link>

              {cartItems?.length < 1 ? (
                <button
                  onClick={CartEmptyAlert}
                  className="proceed_payment_btn"
                >
                  Checkout <i className="bi bi-chevron-right"></i>
                </button>
              ) : (
                <Link to="/shipping-address">
                  <button className="proceed_payment_btn">
                    Checkout <i className="bi bi-chevron-right"></i>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutShopCart;
