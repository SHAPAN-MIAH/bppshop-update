import React from "react";
import "./privacyPolicy.css";
import { Link } from "react-router-dom";

const PrivacyPolicyEng = () => {
  return (
    <div className="privacy_policy_container">
      <div className="d-flex justify-content-between">
        <h2>Privacy Policy:</h2>
        <div>
          <Link to="/privacy-policy-bangla">
            <button id="banglaTransBtn" type="">
              বাংলা অনুবাদ
              {/* Bengla translation */}
            </button>
          </Link>
        </div>
      </div>
      <br />
      <p>
        At BPP Shop, we take your privacy seriously and are dedicated to
        safeguarding the personal information of our valued customers and users.
        This Privacy Policy explains how we handle your data when you use our
        platform, bppshop.com.bd.
      </p>

      <br />
      <h4>Information We Collect</h4>
      <p>
        When you use our platform, we collect various types of information,
        including:
        <br />
        <br />
        <b>Contact Information:</b> Contact information covers the essentials
        like your name, email address, postal address, and phone number.
        <br />
        <b> Account Information:</b> Your username and password fall into this
        category.
        <br />
        <b>Profile Information:</b> This encompasses your profile picture and
        any extra details you choose to provide.
        <br />
        <b>Transaction Information:</b> Our platform collects specifics about
        your purchases and sales.
        <br /> <b>User-Generated Content:</b> Information you post on our
        platform, like reviews and comments.
        <br />
        <b>Automatically Collected Information:</b> Data related to your use of
        our platform, such as your IP address, device details, browser type, and
        usage data. We gather this information through cookies and similar
        technologies.
        <br />
        <b>Information from Third Parties:</b> Occasionally, we might obtain
        information from third-party sources to enhance the quality of our
        services, such as identity verification and fraud prevention services.
      </p>
      <br />
      <h4>How We Use Your Information</h4>
      <p>
        We utilize your information for several purposes:
        <br />
        <br />
        <b>Platform Functionality:</b> To maintain, enhance, and ensure the
        smooth operation of our platform.
        <br/> <b>Communication:</b> Keeping you informed
        about your account, orders, and service updates. 
        <br/><b>Marketing and Promotions:</b> Providing information about our products, services,
        promotions, and offers unless you choose to opt out. 
        <br/>
        <b>Analytics:</b> To
        comprehend how our platform is used and make improvements accordingly.
        <br />
        <br />
        Sharing Your Information We might share your information with the
        following parties:
        <br />
        <br />
        <b>Vendors:</b> Sharing information with vendors on our platform to
        facilitate transactions and deliveries.
        <br/> <b>Legal Compliance:</b> Sharing
        information to comply with legal requirements, enforce our policies, and
        protect our rights. <br/><b>Publicly Shared Information:</b> Information you post on
        our platform may be visible to other users.
      </p>
      <br />
      <h4>Your Choices</h4>
      <p>
        <b>You have control over your information:</b> You can access and update
        your account details through your profile settings. You have the freedom
        to unsubscribe from marketing communications whenever you wish. If you
        wish to have your information removed from our records, please reach out
        to us at support@bppshop.com.bd.
      </p>
      <br />
      <h4>Policy Updates</h4>
      <p>
        We may revise this Privacy Policy to align with changes in our
        procedures or for legal and operational considerations.
      </p>
      <br />
      <h4>Contact Us</h4>
      <p>
        If you have any questions or concerns regarding this Privacy Policy or
        handling your personal information, please don't hesitate to contact us.
        <br/>
        You can reach us at +8809610970706 or via email at
        support@bppshop.com.bd.
      </p>
    </div>
  );
};

export default PrivacyPolicyEng;
