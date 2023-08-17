import React, { useState } from "react";
import "./CheckoutPayment.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import {
  ClearCart,
  ClearCartGroupItems,
} from "../../../Redux/Actions/CartAction";
import MetaData from "../../../Pages/Layout/MetaData";
import cashOnDeliveryImg from "../../../Assets/Images/bankLogo/cash-on-delivery.jpg";
import codDoneImg from "../../../Assets/Images/bankLogo/done.jpg";
import OptionImg from "../../../Assets/Images/bankLogo/visa-logo-800x450.jpg";
import OptionImg1 from "../../../Assets/Images/bankLogo/Bkash-logo.png";
import OptionImg2 from "../../../Assets/Images/bankLogo/Nagad-Logo.wine.png";
import OptionImg3 from "../../../Assets/Images/bankLogo/rocket (1).png";
import OptionImg22 from "../../../Assets/Images/bankLogo/download (1).png";
import proccedordergif from "../../../Assets/Images/udorderloader.gif";

const CheckoutPayment = () => {
  const { shippingAddressInfo } = useSelector((state) => state?.shippingInfo);
  const token = localStorage.getItem("token");
  const agentId = localStorage.getItem("agentId");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckoutConfirm = (id) => {
    const proccedordergifContainer = document.querySelector(
      ".proccedordergif-container"
    );
    const paymentMethodContainer = document.querySelector(
      ".payment_method_container"
    );
    paymentMethodContainer.style.display = "none";
    proccedordergifContainer.style.display = "block";

    const agent_checkout = {
      address_id: id,
      agent_id: agentId,
    };

    if (agentId) {
      axios
        .post(`${baseUrl}/cart/checkout`, agent_checkout, config)
        .then((res) => {
          if (res.data.status === "success") {
            dispatch(ClearCart());
            // dispatch(clearShippingAddress());
            dispatch(ClearCartGroupItems());
            navigate("/checkout-complete");
            proccedordergifContainer.style.display = "none";
          }
        });
    } else {
      axios
        .post(`${baseUrl}/cart/checkout`, { address_id: id }, config)
        .then((res) => {
          if (res.data.status === "success") {
            dispatch(ClearCart());
            // dispatch(clearShippingAddress());
            dispatch(ClearCartGroupItems());
            navigate("/checkout-complete");
            proccedordergifContainer.style.display = "none";
          }
        });
    }
  };

  // {
  //     "agent_id": "saljfreowiufsdajflkjsaldjflsdajfljasd",
  //     "address_id": 145585
  // }

  const [paymentType, setPaymentType] = useState("");
  const isRadioSelected = (value) => paymentType === value;
  const handleRadioClick = (event) => setPaymentType(event.target.value);

  // let cashOnDeliveryPayment = false;

  const [cashOnDeliveryPayment, setCashOnDeliveryPayment] = useState(0);

  const cashOnDeliveryHandler = () => {
    const codBtn = document.querySelector(".cashOnDelivery_content");
    const cODelivery = document.querySelector("#cashOnDelivery").checked;

    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );

    codBtn.style.display = "block";
    paymentOptionWayContent.style.display = "none";
    bankPaymentOptionWay.style.display = "none";
    // cashOnDeliveryNextBtn.style.display = "block";
    document.querySelector(".paymentErrorMessage").innerHTML = "";

    setCashOnDeliveryPayment(1);
  };

  const MobilePaymentOptionHandler = () => {
    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );
    const mobilePayment = document.querySelector("#mobilePayment").checked;
    const codBtn = document.querySelector(".cashOnDelivery_content");
    paymentOptionWayContent.style.display = "block";
    codBtn.style.display = "none";
    bankPaymentOptionWay.style.display = "none";
    cashOnDeliveryNextBtn.style.display = "none";
    document.querySelector(".paymentErrorMessage").innerHTML = "";

    setCashOnDeliveryPayment(0);
  };

  const BankPaymentOptionHandler = () => {
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const codBtn = document.querySelector(".cashOnDelivery_content");
    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );
    const bankPayment = document.querySelector("#bankPayment").checked;
    bankPaymentOptionWay.style.display = "block";
    codBtn.style.display = "none";
    paymentOptionWayContent.style.display = "none";
    cashOnDeliveryNextBtn.style.display = "none";
    document.querySelector(".paymentErrorMessage").innerHTML = "";
    setCashOnDeliveryPayment(0);
  };

  const AgentWalletPaymentHandler = () => {
    const bankPaymentOptionWay = document.querySelector(
      ".bankPayment-option-way"
    );
    const codBtn = document.querySelector(".cashOnDelivery_content");
    const paymentOptionWayContent = document.querySelector(
      ".payment-option-way"
    );
    const cashOnDeliveryNextBtn = document.querySelector(
      "#cashOnDeliveryNextBtn"
    );
    const agentWalletPayment = document.querySelector(
      "#agentWalletPayment"
    ).checked;

    bankPaymentOptionWay.style.display = "none";
    codBtn.style.display = "none";
    paymentOptionWayContent.style.display = "none";
    // cashOnDeliveryNextBtn.style.display = "none";
    setCashOnDeliveryPayment(0);

    if (agentId) {
      NavigateAgentWallet();
    } else {
      document.querySelector(".paymentErrorMessage").innerHTML =
        "You are not eligible for agent wallet payment.";
    }
  };

  const NavigateAgentWallet = () => {
    navigate("/shipping-details/agent-payment");
  };

  return (
    <>
      <MetaData title="Payment-Method - BPPShop" />

      <div className="payment_method_container">
        <h3 className="mb-2">Choose Payment Method:</h3>
        <hr />

        <div className="payment-way-container">
          {/* <h4>Payment by : </h4> */}
          {/* <h4>Choose Payment Method: </h4> */}

          <div className="payment-way">
            <div className="cashOnDeliVery">
              <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="cashOnDelivery"
                  checked={isRadioSelected("cashOnDelivery")}
                  onChange={handleRadioClick}
                  onClick={cashOnDeliveryHandler}
                  id="cashOnDelivery"
                />
                <label onClick={cashOnDeliveryHandler} htmlFor="cashOnDelivery">
                  Cash On Delivery
                </label>
              </div>

              <div className="cashOnDelivery_content">
                <div className="d-flex">
                  <div className="COD_Btn">
                    <img alt="" src={cashOnDeliveryImg} />
                  </div>
                  <div className="m-2 px-2">
                    <img width={40} alt="" src={codDoneImg} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile_payment">
              {/* <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="mobilePayment"
                  checked={isRadioSelected("mobilePayment")}
                  onChange={handleRadioClick}
                  onClick={MobilePaymentOptionHandler}
                  id="mobilePayment"
                />
                <label onClick={MobilePaymentOptionHandler} htmlFor="mobilePayment">Mobile Payment</label>
              </div> */}
              <div className="payment-option-way">
                <div className="payment-option">
                  <div>
                    <img width={100} src={OptionImg1} alt="" />
                  </div>
                  <div>
                    <img width={100} src={OptionImg2} alt="" />
                  </div>
                  <div>
                    <img width={119} src={OptionImg3} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bank_payment">
              {/* <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="bankPayment"
                  checked={isRadioSelected("bankPayment")}
                  onChange={handleRadioClick}
                  onClick={BankPaymentOptionHandler}
                  id="bankPayment"
                />
                <label onClick={BankPaymentOptionHandler} htmlFor="bankPayment">Bank Payment</label>
              </div> */}
              <div className="bankPayment-option-way">
                <div className="bankPayment-option">
                  <div>
                    <img width={109} src={OptionImg} alt="" />
                  </div>
                  <div>
                    <img width={102} src={OptionImg22} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="agent_Wallet_payment">
              <div>
                <input
                  type="radio"
                  name="selectedRadioBtn"
                  value="agentWalletPayment"
                  checked={isRadioSelected("agentWalletPayment")}
                  onChange={handleRadioClick}
                  onClick={AgentWalletPaymentHandler}
                  id="agentWalletPayment"
                />
                <label
                  onClick={AgentWalletPaymentHandler}
                  htmlFor="agentWalletPayment"
                >
                  Agent Wallet
                </label>
              </div>
              <p className="paymentErrorMessage"></p>
              <div className="payment-option-way"></div>
            </div>
          </div>
        </div>

        <div className="payment_bottom_Btn">
          {/* <div className="d-flex flex-wrap"> */}
          <Link to="/shipping-address">
            <button className="back_to_shipping">Back to Shipping</button>
          </Link>

          {cashOnDeliveryPayment == 0 ? (
            ""
          ) : (
            <button
              onClick={() =>
                handleCheckoutConfirm(shippingAddressInfo?.data?.id)
              }
              type="button"
              id="cashOnDeliveryNextBtn"
            >
              {/* Next */}
              {/* {paymentType === "cashOnDelivery" ? "Confirm": "Next"} */}
              {paymentType === "mobilePayment" ||
              paymentType === "bankPayment" ||
              paymentType === "agentWalletPayment"
                ? "Next"
                : "Confirm Order"}
            </button>
          )}
          {/* </div> */}
        </div>
      </div>
      <div className="proccedordergif-container ">
        <div className="d-flex justify-content-center mt-5">
          <img src={proccedordergif} alt="" />
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;
