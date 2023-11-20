import React from "react";
import appImg from "../../../Assets/Images/image 57.png";
import playstoreIcon from "../../../Assets/Images/images-1.webp";
import appleIcon from "../../../Assets/Images/Apple-logo-1A9B9F20EA-seeklogo.com.png";
import "./AppBrandingSection.css";

const AppBrandingSection = () => {
  return (
    <div className="app_branding_section">
      <div className="app_branding_section_container">
        <div className="app_branding_content app_branding_content_one">
          <img src={appImg} alt="" />
        </div>
        <div className="app_branding_content">
          <div>
            <h1>Download Our Mobile App</h1>
            <p>10000+ people use this app for their daily needs</p>
          </div>
        </div>
        <div className="app_branding_content">
          <div className="downloadApp_content">
            <div>
              <a href="https://apps.apple.com/us/app/bppshop-shopping-app/id6469695759">
                <button type="">
                  <img
                    className="appleIcon"
                    width={25}
                    src={appleIcon}
                    alt=""
                  />
                  <div>
                    <small>Download on the</small>
                    <h6>App Store</h6>
                  </div>
                </button>
              </a>
              <br />
              <a href="https://play.google.com/store/apps/details?id=com.excelitai.bppshopapp">
                <button type="">
                  <img width={25} src={playstoreIcon} alt="" />
                  <div>
                    <small>Get it on</small>
                    <h6>Google Play</h6>
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="app_branding_content app_branding_content_last">
          <div className="">
            <h4>Helpline</h4>
            <p>
              {" "}
              <i className="bi bi-telephone-fill"></i> 8809610970706
            </p>
            <br />
            <h6>Join us on...</h6>
            <div className="app_branding_content_social_content">
              <a href="https://www.facebook.com/bppshopofficial">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@bppshopofficial">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://www.youtube.com/@bppshopofficial">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@bppshopofficial">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBrandingSection;
