import React from "react";
import banner1 from "../../../Assets/Images/Group 1000005278.png";
import banner2 from "../../../Assets/Images/Group 1000005279.png";
import "./OfferBrandingSection.css";
import { useSelector } from "react-redux";
import { bannerBaseUrl } from "../../../BaseUrl/BaseUrl";

const OfferBrandingSection = () => {
  const OfferBrandingBannerImgThree = useSelector((state)=>state?.banners?.banners?.banners?.find(
    (item) => item?.type === "home_banner_three"
  ))
  
  const OfferBrandingBannerImgFour = useSelector((state)=>state?.banners?.banners?.banners?.find(
    (item) => item?.type === "home_banner_four"
  ))
  return (
    <div className="offer_branding_section">
      <div>
        <img src={`${bannerBaseUrl}/${OfferBrandingBannerImgThree?.value}`} alt="" />
      </div>
      <div>
        <img src={`${bannerBaseUrl}/${OfferBrandingBannerImgFour?.value}`} alt="" />
      </div>
    </div>
  );
};

export default OfferBrandingSection;
