import React from "react";
import "./CategoryAfterScroll.css";
import Sidebar from "../Sidebar/Sidebar";

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
                <i class="bi bi-chevron-down"></i>
              </span>
            </button>
            <button
              className="categoryCloseHandler"
              onClick={categoryCloseHandler}
              type=""
            >
              <span>Categories</span>{" "}
              <span>
                <i class="bi bi-chevron-up"></i>
              </span>
            </button>
            <div className="category_view_container">
              <Sidebar />
            </div>
          </div>
          <ul className="after_scroll_category_nav">
            <li>New Arrival</li>
            <li>Top Rated</li>
            <li>Discount Product</li>
            <li>Best Selling</li>
            <li>Store</li>
            <li>Brands</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryAfterScroll;
