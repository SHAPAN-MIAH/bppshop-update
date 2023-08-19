import React, { useState, useEffect } from "react";
import Nav from "./../../Components/SharedComponents/Nav/Nav";
import HomeFilterBtnHeader from "./../../Components/HomeFilterBtnHeader/HomeFilterBtnHeader";
import Footer from "./../../Components/SharedComponents/Footer/Footer";
import "./Layout.css";
import Cart from "../../Components/Cart/Cart";
import CartDetailsView from "./../../Components/Cart/CartDetailsView/CartDetailsView";
import { Toaster } from "react-hot-toast";
import preloader from "../../Assets/Images/loading.gif"

// const notify = () => toast('Here is your toast.');

const searchSuggestionCloseHandler = () => {
  const suggestedItemContainer = document.querySelector(
    ".suggested_item_container"
  );

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
  cartDetailsViewContainer.classList.toggle("cartDetailsView-container-toggle");
};

// const sidebarCloseGlobalHandler = () => {
//   const sidebarToggleSection = document.querySelector("#sidebarMenu");
//   sidebarToggleSection.classList.toggle(
//     "sidebar-toggle-section-toggle"
//   );
// }

// $(document).ready(function(){
//   $('#addtocart').on('click',function(){

//     var button = $(this);
//     var cart = $('#cart');
//     var cartTotal = cart.attr('data-totalitems');
//     var newCartTotal = parseInt(cartTotal) + 1;

//     button.addClass('sendtocart');
//     setTimeout(function(){
//       button.removeClass('sendtocart');
//       cart.addClass('shake').attr('data-totalitems', newCartTotal);
//       setTimeout(function(){
//         cart.removeClass('shake');
//       },500)
//     },1000)
//   })
// })

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div onClick={searchSuggestionCloseHandler}>
        <HomeFilterBtnHeader />
        {/* <main className="layout_container" onClick={sidebarCloseGlobalHandler}>{children}</main> */}
        <main className="layout_container ">{children}</main>
        <CartDetailsView />
        <Cart />
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
        <div
          onClick={CartDetailsCloseHandler}
          className="cartDetailsView_section_overlay"
        ></div>
        <div className="addToCart_loader_overlay">
          <div className="w-100 h-100 d-flex justify-content-center align-items-center text-center text-white">
            <div>
            <img width={150} src={preloader} alt=""/>
            <br/>
            <h4>Product Adding In Cart...</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
