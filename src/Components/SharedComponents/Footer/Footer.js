import React from "react";
import "./Footer.css";
import logo from "../../../Assets/Images/Orenge logo.png";
import playstoreIcon from "../../../Assets/Images/images-1.webp";
import appleIcon from "../../../Assets/Images/Apple-logo-1A9B9F20EA-seeklogo.com.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer_container_section">
        <div className="footer-content">
          <div className="brand_address_container">
            <div className="address">
              <h5>Address</h5>
              <p className="address_footer">
                House 56, Road 1, Block A, Jahurul Islam City, Aftabnagar,
                Dhaka, Bangladesh
              </p>
            </div>

            <div className="get_in_touch_container">
              <h5>Helpline</h5>
              <div className="contact_content">
                <p>
                  <i className="bi bi-headset"></i> +8809610970706
                </p>
                <p>
                  <i className="bi bi-envelope-fill"></i> support@bppshop.com.bd
                </p>
              </div>
            </div>

            <div className="social_content">
                <h5>Join us on</h5>
                <a href="https://www.facebook.com/bppshopofficial">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.youtube.com/@bppshopofficial">
                  <i className="bi bi-youtube"></i>
                </a>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-twitter"></i>
              </div>
          </div>
          <div className="special_container">
            <h5>Special Links</h5>
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

                <Link to="/">
                  <li>Daily Deals</li>
                </Link>

                <Link to="/">
                  <li>Hot Deals</li>
                </Link>
                {/* <Link to="/">
                  <li>Brands</li>
                </Link>
                <Link to="/">
                  <li>Store</li>
                </Link> */}
              </ul>
            </div>
          </div>
          <div className="useful_link_container">
            <h5>Useful Links</h5>
            <div className="useful_link_list">
              <ul>
                <li>About BppShop</li>
                <Link to="/terms-condition-english">
                  <li>Terms & Conditions</li>
                </Link>
                <Link to="/privacy-policy-english">
                  <li>Privacy Policy</li>
                </Link>
                <li>Return & Refund Policy</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>

          <div className="downloadApp_newsletter_container">
            <h5>Download App</h5>
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
              <small>Subscribe to our new channel to get latest updates.</small>
              <div className="d-flex mt-3">
                <input type="email" name="" placeholder="Enter Your Email" />
                <button type="">Subscribe</button>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      <div className="bottom_footer_container_section">
        <div className="bottom_footer_content">
          <div className="footer_logo">
            <img src={logo} alt="" />
          </div>
          <div className="bottom_footer_left">© All Right Reserved BPPSHOP</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
