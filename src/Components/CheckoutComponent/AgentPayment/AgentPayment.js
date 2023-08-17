import React from "react";
import "./AgentPayment.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AgentPayment = () => {
  const agentId = localStorage.getItem("agentId");
  const agentInfo = {
    agent_id: agentId,
  };
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [agentWalletInfo, setAgentWalletInfo] = useState({});

  useEffect(() => {
    axios
      .post("https://backend.bppshop.com.bd/api/v1/agent/balance", agentInfo, config)
      .then((res) => {
        setAgentWalletInfo(res?.data?.data);
      });
  }, []);



  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const { deliveryCharge } = useSelector((state) => state?.deliveryCharge);
  const deliveryCost = parseInt(deliveryCharge?.delivery_charge);

  const totalDiscount = parseInt(
    `${cartItems?.reduce(
      (acc, item) => acc + item?.quantity * item?.product?.discount,
      0
    )}`
  );
  const totalPrice = parseInt(
    `${cartItems?.reduce(
      (acc, item) => acc + item?.quantity * item?.product?.unit_price,
      0
    )}`
  );

  let grandTotalPrice = totalPrice - totalDiscount;
  if (deliveryCost > 0) {
    grandTotalPrice = totalPrice + deliveryCost - totalDiscount;
  }

  const ConfirmAgentWalletPayment = () => {
    if(agentWalletInfo.wallet_balance < grandTotalPrice) {
      document.querySelector('.agentPaymentErrorMessage').innerHTML="Balance Low! You are not eligible for agent wallet payment."
    }
  }

  return (
    <>
      <div className="agent_payment_container">
        <h3>Confirm Payment By Agent Wallet</h3>
        <hr />
        <div className="agent_wallet_info_content">
          <div className="agent_wallet_info">
            <h5>Agent Name: {agentWalletInfo.name}</h5>
            <hr className="mb-3"/>
            <small >
              <strong>Email:</strong> {agentWalletInfo.email}
            </small>
            <br />
            <small>
              <strong>Phone: </strong> {agentWalletInfo.phone}
            </small>
            <br />
            <small>
              <strong>Address:</strong> {agentWalletInfo.address}
            </small>
          </div>
          <div className="agent_wallet_balance">
            <div>
              <h3>Agent Wallet Balance</h3>
              <h2>{agentWalletInfo.wallet_balance}</h2>
            </div>
          </div>
        </div>

        <div className="payment_bottom_Btn">
        <p className="agentPaymentErrorMessage"></p>
          <div className="d-flex">
            <Link to="/shipping-details/checkout-payment">
              <button className="back_to_shipping">Back</button>
            </Link>

            <button onClick={ConfirmAgentWalletPayment} className="ConfirmBtn" type="">Confirm Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentPayment;
