import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import "./CheckoutComplete.css";
import successImg from "../../Assets/Images/bankLogo/done.jpg";
import { useSelector } from "react-redux";

const CheckoutComplete = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title="Checkout-Complete - BPPShop" />
      <div className="checkout_success_container">
        <div className="row">
          <div className="successImg">
            <img width={100} src={successImg} alt="" />
          </div>
          <h4>Hey, {user.name}</h4>
          <h5>Your order has been placed successfully!</h5>

          <div className="checkout_success_btn_container">
            <Link to="/">
              <button className="go_to_shopping_btn">Go to shopping</button>
            </Link>
            <Link to="/profile/orders">
              <button className="got_to_check_order_btn">Check orders</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutComplete;
