import React from "react";
import Nav from "./../../Components/SharedComponents/Nav/Nav";
import Footer from "./../../Components/SharedComponents/Footer/Footer";
import "./Layout.css";
import Cart from "../../Components/Cart/Cart";
import CartDetailsView from "./../../Components/Cart/CartDetailsView/CartDetailsView";
import { Toaster } from "react-hot-toast";
import preloader from "../../Assets/Images/loading.gif";
import Sidebar from "../../Components/SharedComponents/Sidebar/Sidebar";
import CategoryAfterScroll from "../../Components/SharedComponents/CategoryAfterScroll/CategoryAfterScroll";

const Layout = ({ children }) => {
  const suggestedItemContainer = document.querySelector(
    ".suggested_item_container"
  );
  const mediaQueryDesktop = window.matchMedia("(max-width: 1540px)");

  const searchSuggestionCloseHandler = () => {
    suggestedItemContainer.style.display = "none";
  };

  const CartDetailsCloseHandler = () => {
    const cartDetailsViewContainer = document.querySelector(
      ".cartDetailsView-container"
    );

    const cartDetailsViewSectionOverlay = document.querySelector(
      ".cartDetailsView_section_overlay"
    );
    const suggestedItemContainer = document.querySelector(
      ".suggested_item_container"
    );

    cartDetailsViewSectionOverlay.style.display = "none";
    suggestedItemContainer.style.display = "none";
    cartDetailsViewContainer.classList.toggle(
      "cartDetailsView-container-toggle"
    );
  };

  const sidebarCloseHandler = () => {
    const mediaQuery = window.matchMedia("(max-width: 1550px)");
    const sidebarMenu = document.querySelector("#sidebarMenu");
    const openSidebarIconToggle = document.querySelector(
      ".openSidebarIconToggle"
    );
    const closeSidebarIconToggle = document.querySelector(
      ".closeSidebarIconToggle"
    );
    if (mediaQuery.matches) {
      sidebarMenu.style.transform = "translateX(-300px)";
      closeSidebarIconToggle.style.display = "none";
      openSidebarIconToggle.style.display = "block";
    }
  };

  

  return (
    <div>
      <Nav />
      <div onClick={searchSuggestionCloseHandler}>
        <div onClick={sidebarCloseHandler}>
          <CategoryAfterScroll/>
          <main className="layout_container">{children}</main>
          <CartDetailsView />
          <Cart />
          <Footer />
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        <div
          onClick={CartDetailsCloseHandler}
          className="cartDetailsView_section_overlay"
        ></div>
        <div className="addToCart_loader_overlay">
          <div className="w-100 h-100 d-flex justify-content-center align-items-center text-center text-white">
            <div>
              <img width={150} src={preloader} alt="" />
              <br />
              <h4>Product Adding In Cart...</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
