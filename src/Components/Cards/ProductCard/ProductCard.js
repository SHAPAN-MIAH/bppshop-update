import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "./../../../Redux/Actions/CartAction";
import { imgThumbnailBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RatingStar } from "rating-star";
import Modal from "react-modal";
import LoginModal from "../../../Pages/User/Login/LoginModal";
import SignUpModal from "../../../Pages/User/SignUp/SignUpModal";

Modal.setAppElement("#root");

let customStyles = {
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0px",
    paddingBottom: "20px",
  },
};

const ProductCard = ({ product, setImg, allCategoryProductCard, allSubCategoryProductCard }) => {
  if (window.matchMedia("(max-width: 460px)").matches) {
    customStyles = {
      content: {
        width: "360px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "0px",
        paddingBottom: "20px",
      },
    };
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const { slug, subSlug, subSubSlug } = useParams();
  const token = localStorage.getItem("token");
  const modalLogin = localStorage.getItem("modalLogin");
  const location = useLocation();

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

  const newChoiceOption = product?.choice_options?.find((option) => option);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartItemBeforeLogin = useSelector(
    (state) => state.cartItemBeforeLogin.cartItem
  );

  // console.log(cartItemBeforeLogin)
  const cartItems = useSelector((state) => state.cart.cartItems?.[0]?.data);
  const cartGroupItems = useSelector((state) => state.cartGroup.cartGroupItems);
  const cartItemsId = cartItems?.map((i) => i?.product_id);
  const addedItemId = cartItemsId?.find((i) => i == id);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { loginRes } = useSelector((state) => state.loginRes);
  const { signupRes } = useSelector((state) => state.signupRes);

  useEffect(() => {
    if (isAuthenticated == true) {
      closeModal();
    }
  }, [isAuthenticated]);



  // Add to cart functionality.............................
  const addToCartHandler = (product, quantity) => {
    if (!token) {
      dispatch(addItemsToCart(product, quantity));
      localStorage.setItem("productCartLoginAddItem", "true")
      openModal();
    }

    if (isAuthenticated == true && token) {
      //default choice option.....
      const choice_options = product.choice_options;
      const choice_options_name = choice_options.map((option) => option.name);
      const choice_options_defaultValue = choice_options.map(
        (option) => option.options[0]
      );
      const defaultChoices = choice_options_name.map((name, index) => ({
        name,
        options: choice_options_defaultValue[index],
      }));

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

      if (isAuthenticated == true && token) {
        product?.colors?.length > 0
          ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
          : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));
      }

      addToCartOverlyLoading();
    }
  };

  const addToCartOverlyLoading = () => {
    const addToCartLoaderOverlay = document.querySelector(
      ".addToCart_loader_overlay"
    );

    addToCartLoaderOverlay.style.display = "block";
  };


  if (addedItemId) {
    const addToCartLoaderOverlay = document.querySelector(
      ".addToCart_loader_overlay"
    );
    addToCartLoaderOverlay.style.display = "none";
  }

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const imgReset = () => {
    setImg("")
  }
  return (
    <>
      <div className="product_card_content" onClick={imgReset}>
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
                <small>({reviews_count? reviews_count : 0})</small>
              </div>

              <Link
                // to={allCategoryProductCard == true? `/${slug}/all/${id}`: allSubCategoryProductCard == true? `/${slug}/${subSlug}/all/${id}` : `/${slug}/${subSlug}/${subSubSlug}/${id}`}
                to={allCategoryProductCard == true? `/${slug}/all/${product?.slug}`: allSubCategoryProductCard == true? `/${slug}/${subSlug}/all/${product?.slug}` : `/${slug}/${subSlug}/${subSubSlug}/${product?.slug}`}
                // to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span onClick={closeModal} className="modalCloseBtn">
          <i className="bi bi-x-lg"></i>
        </span>
        <br />
        <div className="LoginModal_container">
          <LoginModal/>
        </div>
        <div className="SignUpModal_container">
          <SignUpModal />
        </div>
        <br />
        <br />
      </Modal>
    </>
  );
};
export default ProductCard;
