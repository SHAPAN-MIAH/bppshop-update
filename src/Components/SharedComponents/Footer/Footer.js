import React from "react";
import "./Footer.css";
import logo from "../../../Assets/Images/bpp shop logo fainal.png";
import playstoreIcon from "../../../Assets/Images/images-1.webp";
import appleIcon from "../../../Assets/Images/Apple-logo-1A9B9F20EA-seeklogo.com.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer_container_section">
        <div className="footer-content">
          <div className="brand_address_container">
            <div className="footer_logo">
              <img src={logo} alt="" />
            </div>
            <div className="address">
              <br />
              <h5>Address</h5>
              <p className="address_footer">
                17 (9th Floor), Alhaz Shamsuddin Mansion, New Eskaton Road,
                Dhaka 1217
              </p>
            </div>

            <div className="get_in_touch_container">
              <h5>Start a Conversation__</h5>
              <div className="contact_content">
                <p>
                  <i className="bi bi-telephone-fill"></i> +8809610970706
                </p>
                <p>
                  <i className="bi bi-envelope-fill"></i> support@bppshop.com.bd
                </p>
                <p>
                  <i className="bi bi-headset"></i> Support Ticket
                </p>
              </div>
            </div>
          </div>
          <div className="special_container">
            <h5>SPECIAL</h5>
            <div className="special_content_list">
              <ul>
              <Link to="/new-arrival">
                  <li>New Arrival Products</li>
                </Link>
                <Link to="/best-selling">
                  <li>Best Selling Products</li>
                </Link>
                <Link to="/top-rated">
                  <li>Top Rated Products</li>
                </Link>
                <Link to="/discount-products">
                  <li>Discount Products</li>
                </Link>
                <Link to="/flash-sale">
                  <li>Flash Sale Products</li>
                </Link>
                
              </ul>
            </div>
          </div>
          <div className="account_shipping_info_container">
            <h5>ACCOUNT & SHIPPING INFO</h5>
            <div className="account_shipping_info_list">
              <ul>
                <Link to="/profile">
                <li>Profile Info</li>
                </Link>
                <Link to="/profile/orders">
                <li>Order Info</li>
                </Link>
                <li>Track order</li>
              </ul>
            </div>
          </div>
          <div className="downloadApp_newsletter_container">
            <h5>DOWNLOAD OUR APP</h5>
            <div className="downloadApp_content">
              <button type="">
                <img className="appleIcon" width={25} src={appleIcon} alt="" />

                <div>
                  <small>Download on the</small>
                  <h6>App Store</h6>
                </div>
              </button>
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
            <div className="newsletter_container">
              <h6>NEWSLETTER</h6>
              <small>
                Subscribe to our new channel to get latest updates.
              </small>
              <div className="d-flex mt-3">
                <input type="email" name="" placeholder="Enter Your Email" />
                <button type="">Subscribe</button>
              </div>

              <div className="social_content">
                <a href="https://www.facebook.com/bppshopofficial">
                <i className="bi bi-facebook"></i>
                </a>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-twitter"></i>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="get_in_touch_container">
          
          <h5>--Start a Conversation--</h5>
          <div className="contact_content">
            <p>
              <i className="bi bi-telephone-fill"></i> 01911655303
            </p>
            <p>
              <i className="bi bi-envelope-fill"></i> support@bppshop.com.bd
            </p>
            <p>
              <i className="bi bi-headset"></i> Support Ticket
            </p>
          </div>
        </div> */}
      </div>

      {/* </div> */}
      <div className="bottom_footer_container_section">
        <div className="bottom_footer_content">
          <div className="bottom_footer_left">© All Right Reserved BPPSHOP</div>
          <div className="bottom_footer_right">
            <div className="bottom_term_text">Terms & conditions</div>
            <div className="bottom_privacy_text">Privacy Policy</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
