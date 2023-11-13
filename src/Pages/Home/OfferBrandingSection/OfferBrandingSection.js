import React from "react";
import banner1 from "../../../Assets/Images/Group 1000005278.png";
import banner2 from "../../../Assets/Images/Group 1000005279.png";
import "./OfferBrandingSection.css";

const OfferBrandingSection = () => {
  return (
    <div className="offer_branding_section">
      <div>
        <img src={banner1} alt="" />
      </div>
      <div>
        <img src={banner2} alt="" />
      </div>
    </div>
  );
};

export default OfferBrandingSection;
