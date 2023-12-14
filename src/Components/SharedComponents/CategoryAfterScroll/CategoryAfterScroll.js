import React from "react";
import "./CategoryAfterScroll.css";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";

const CategoryAfterScroll = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      document.querySelector(".category_after_scroll_section").style.top =
        "80px";
    } else {
      document.querySelector(".category_after_scroll_section").style.top =
        "-80px";
      document.querySelector(".category_view_container").style.display = "none";
      document.querySelector(".categoryCloseHandler").style.display = "none";
      document.querySelector(".categoryOpenHandler").style.display = "block";
    }
  };

  const categoryOpenHandler = () => {
    document.querySelector(".category_view_container").style.display = "block";
    document.querySelector(".categoryOpenHandler").style.display = "none";
    document.querySelector(".categoryCloseHandler").style.display = "block";
  };
  const categoryCloseHandler = () => {
    document.querySelector(".category_view_container").style.display = "none";
    document.querySelector(".categoryOpenHandler").style.display = "block";
    document.querySelector(".categoryCloseHandler").style.display = "none";
  };

  return (
    <>
      <div className="category_after_scroll_section">
        <div className="category_after_scroll_section_container">
          <div>
            <button
              className="categoryOpenHandler"
              onClick={categoryOpenHandler}
              type=""
            >
              <span>Categories</span>{" "}
              <span>
                <i className="bi bi-chevron-down"></i>
              </span>
            </button>
            <button
              className="categoryCloseHandler"
              onClick={categoryCloseHandler}
              type=""
            >
              <span>Categories</span>{" "}
              <span>
                <i className="bi bi-chevron-up"></i>
              </span>
            </button>
            <div className="category_view_container">
              <Sidebar />
            </div>
          </div>
          <ul className="after_scroll_category_nav">
            <Link to="/new-arrival">
              <li>New Arrival Product</li>
            </Link>
            <Link to="/top-rated">
              <li>Top Rated Product</li>
            </Link>
            <Link to="/discount-products">
              <li>Discount Product</li>
            </Link>
            <Link to="/best-selling">
              <li>Best Selling Product</li>
            </Link>
            <Link to="/sellers-store">
              <li>Store</li>
            </Link>
            <Link to="/brands">
              <li>Brands</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryAfterScroll;
