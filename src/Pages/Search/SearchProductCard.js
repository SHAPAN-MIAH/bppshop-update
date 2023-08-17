
import React, { useState } from "react";
import defaultProImg from "../../Assets/Images/defaultImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "../../Redux/Actions/CartAction";
import { imgThumbnailBaseUrl } from "../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RatingStar } from "rating-star";


const SearchProductCard = ({ product }) => {
  const token = localStorage.getItem("token");

  const {
    id,
    name,
    unit_price,
    colors,
    discount,
    current_stock,
    thumbnail,
    reviews_count,
    rating,
  } = product;
  // const [pid, setPid] = useState(null);
  // const productDetailsView = (pid) => {
  //   setPid(pid);
  // };

  const newChoiceOption = product?.choice_options?.find((option) => option);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsId = cartItems.map((i) => i.product.id);
  const addedItemId = cartItemsId.find((i) => i === id);

  const addToCartHandler = (product, quantity) => {
    //default choise option
    const choice_options = product.choice_options;
    const choice_options_name = choice_options.map((option) => option.name);

    const choice_options_defaultValue = choice_options.map(
      (option) => option.options[0]
    );

    const defaultChoices = choice_options_name.map((name, index) => ({
      name,
      options: choice_options_defaultValue[index],
    }));

    dispatch(addItemsToCart(product, quantity, defaultChoices));

    // toaster
    toast.success(`Product added to cart successfully`, {
      duration: 5000,

      style: {
        width: "100%",
        height: "80px",
        padding: "0px 20px",
        background: "#86bc19",
        color: "#fff",
      },
    });

    let color = colors?.map((color) => color?.code);

    const addItemsToCartDataWithColor = {
      id: `${product.id}`,
      color: `${color[0]}`,
      quantity: `${quantity}`,
    };

    const addItemsToCartDataWithoutColor = {
      id: `${product.id}`,
      quantity: `${quantity}`,
    };

    defaultChoices.forEach((element) => {
      addItemsToCartDataWithColor[element.name] = `${element.options}`.trim();
    });

    defaultChoices.forEach((element) => {
      addItemsToCartDataWithoutColor[element.name] =
        `${element.options}`.trim();
    });

    if (token) {
      product?.colors?.length > 0
        ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
        : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));
    }

    // Animate the product image to the cart container
    const productImage = document.querySelector(".product-card-body img");

    const productImageClone = productImage.cloneNode(true);
    document.body.appendChild(productImageClone);

    // const cart = document.querySelector(".cart");
    // const cartRect = cart.getBoundingClientRect();
    // const productImageRect = productImage.getBoundingClientRect();

    const animation = productImageClone.animate(
      // [
      //   {
      //     transform: `translate(${productImageRect.left}px, ${productImageRect.top}px)`,
      //   },
      //   { transform: `translate(${cartRect.top}px, ${cartRect.top}px)` },
      // ],
      {
        duration: 100,
        easing: "ease-in-out",
      }
    );

    animation.onfinish = () => {
      productImageClone.remove();
    };
  };

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
       <div className="product_card_content">
        <div className="product-card">
          <>
            <div className=" product-card-body">
              <div className="productImg_container">
                {thumbnail ? (
                  <img
                    src={imgThumbnailBaseUrl + `/${thumbnail}`}
                    className="card-img-top"
                    alt=""
                  />
                ) : (
                  <img src={defaultProImg} alt="" />
                )}
              </div>
              <div className="product-card-body-content">
                <small>{name.toString().substring(0, 26)}...</small>
                <br />
                <small>
                  {newChoiceOption && (
                    <span className="unitPrice_view">
                      {newChoiceOption?.options[0]} : {newChoiceOption?.title}
                    </span>
                  )}
                </small>
                <div className="product-card-body-content-unit-price">
                  {discount ? (
                    <span>
                      <b> &#2547; {unit_price - discount} </b>
                      <del>
                        <b className="text-danger ms-2">
                          {" "}
                          &#2547; {unit_price}
                        </b>
                      </del>
                    </span>
                  ) : (
                    <b> &#2547; {unit_price}</b>
                  )}
                </div>
                <RatingStar
                  id={id}
                  rating={rating?.map((r) => r?.average)}
                  size={11}
                  className="RatingStar"
                />{" "}
                <small>({reviews_count})</small>
              </div>

              <Link
                to={`/search/${id}`}
                // to={`/${slug}/${subSlug}/${subSubSlug}/${product.slug}`}
                // to={`/products/${product.slug}`}
                addedItemId={addedItemId}
              >
                {current_stock > 0 ? (
                  <div
                    className="quickView_AddToCart_overlay"
                    onClick={scrollTop}
                  >
                    <div className="overlayViewCartBtn">
                      <span>
                        <i class="bi bi-eye-fill"></i> <br /> View Details
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="product_stock_out_overlay d-flex justify-content-center align-items-center">
                    <h3 className="text-center">
                      Stock <br /> Out
                    </h3>
                  </div>
                )}
              </Link>
            </div>
            <div className="card-footer product-card-footer">
              {addedItemId ? (
                <div className="cardFooterBtn">
                  <button disabled className="btn_after_added_cart">
                    <i className="bi bi-cart-plus"></i> Product in Cart
                  </button>
                </div>
              ) : (
                <div className="cardFooterBtn">
                  {current_stock > 0 ? (
                    <button
                      className="btn_before_add_cart"
                      onClick={() => addToCartHandler(product, quantity)}
                      id="addToCartBtn"
                    >
                      <i className="bi bi-cart-plus"></i> Add To Cart
                    </button>
                  ) : (
                    <button className="btn_before_add_cart_stockOut">
                      <i class="bi bi-cart-x"></i> Stock Out
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        </div>
      </div>
      
    </>
  );
};
export default SearchProductCard;