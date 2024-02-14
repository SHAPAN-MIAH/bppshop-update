import React from "react";
import "./CategoryAfterScroll.css";
import Sidebar from "../Sidebar/Sidebar";
import { Link, NavLink } from "react-router-dom";

const CategoryAfterScroll = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
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


   //onclick place order go to top of the page
   const nextPageScrollOnTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
            {/* <Link to="/new-arrival">
              <li>New Arrival Product</li>
            </Link> */}
            <NavLink
              to="/new-arrival"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              onClick={nextPageScrollOnTop}
            >
              <li>New Arrival Product</li>
            </NavLink>
            <NavLink
              to="/best-selling"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              onClick={nextPageScrollOnTop}
            >
              <li>Best Selling Product</li>
            </NavLink>
            <NavLink
              to="/discount-products"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              onClick={nextPageScrollOnTop}
            >
              <li>Discount Product</li>
            </NavLink>
            <NavLink
              to="/top-rated"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              onClick={nextPageScrollOnTop}
            >
              <li>Top Rated Product</li>
            </NavLink>
            <NavLink
              to="/brands"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              onClick={nextPageScrollOnTop}
            >
              <li>Brands</li>
            </NavLink>
            <NavLink
              to="/sellers-store"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              onClick={nextPageScrollOnTop}
            >
              <li>Store</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryAfterScroll;
