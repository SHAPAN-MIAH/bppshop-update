import React from "react";
import { Link } from "react-router-dom";

const TermsConditionEng = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
      <h2>Terms and Conditions</h2>
        <div>
          <Link to="/terms-condition-bangla">
            <button id="banglaTransBtn" type="">
              বাংলা 
            </button>
          </Link>
        </div>
      </div>
      <br/>
      

      <p>
        By accessing or using the BPP Shop platform ("bppshop.com.bd"), you
        agree to be bound by these Terms and Conditions, as well as our Privacy
        Policy. If you disagree with any aspect of these terms, we kindly
        request that you refrain from using our services.
        <br />
        <br />
        To access certain features of our Platform, you may be required to
        create an account. You are responsible for safeguarding your account
        information and ensuring that the information you provide is accurate.{" "}
        <br />
        <br /> You must be at least 18 years of age or the legal age in your
        jurisdiction to create an account. <br />
        <br />
        BPP Shop is a multivendor marketplace where various vendors offer
        products and services. We do not endorse or guarantee the quality,
        accuracy, or legality of items listed by vendors.
        <br />
        <br /> Each vendor may have its own terms and conditions. It is your
        responsibility to review and accept these terms when engaging with
        vendors. <br />
        <br />
        You are required to use the Platform while adhering to all relevant laws
        and regulations.
        <br />
        <br /> You may not use the Platform for any unlawful or prohibited
        purpose, including but not limited to fraud, harassment, or the
        transmission of harmful or illegal content.
        <br />
        <br /> The content, logos, trademarks, and other intellectual property
        on our Platform are owned by BPP Shop or its affiliates. You may not
        use, modify, or distribute this content without our express consent.{" "}
        <br />
        <br />
        Your use of the Platform is also governed by our Privacy Policy, which
        explains how we collect, use, and protect your personal information.{" "}
        <br />
        <br />
        Transactions on our Platform are conducted directly between you and
        vendors. We are not responsible for the quality, safety, or legality of
        the items or services offered. <br />
        <br />
        Payment processing is facilitated through third-party services. By
        making a purchase, you agree to the terms of these services.
        <br />
        <br /> Any disputes with vendors must be addressed directly with the
        vendor. We may provide dispute resolution mechanisms, but we are not
        obligated to mediate or resolve disputes. <br />
        <br />
        We reserve the right to terminate or suspend your account at our
        discretion, without notice, if you violate these Terms and Conditions or
        engage in activities harmful to the Platform or other users. <br />
        <br />
        BPP Shop is not liable for any direct, indirect, incidental, special, or
        consequential damages resulting from your use of the Platform, including
        but not limited to loss of data, profits, or business interruption.
        <br />
        <br /> We reserve the right to update or modify these Terms and
        Conditions at any time. It is your responsibility to review these terms
        regularly. <br />
        <br />
        If you have questions or concerns about these Terms and Conditions,
        please contact us at +8809610970706.
      </p>
      <br/>
        
    </div>
  );
};

export default TermsConditionEng;
