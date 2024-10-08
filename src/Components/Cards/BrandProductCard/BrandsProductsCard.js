import React, { useEffect, useState } from "react";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "../../../Redux/Actions/CartAction";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RatingStar } from "rating-star";
import LoginModal from "../../../Pages/User/Login/LoginModal";
import SignUpModal from "../../../Pages/User/SignUp/SignUpModal";
import Modal from "react-modal";

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

const BrandsProductsCard = ({ product, setImg }) => {
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
  const token = localStorage.getItem("token");
  const { brandName, brandId } = useParams();

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
  const cartItems = useSelector((state) => state.cart.cartItems?.[0]?.data);
  const cartItemsId = cartItems?.map((i) => i?.product_id);
  const addeditemid = cartItemsId?.find((i) => i == id);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { loginRes } = useSelector((state) => state.loginRes);
  const { signupRes } = useSelector((state) => state.signupRes);
  const modalLogin = localStorage.getItem("modalLogin");
  const cartItemBeforeLogin = useSelector(
    (state) => state.cartItemBeforeLogin.cartItem
  );

  useEffect(() => {
    if (isAuthenticated == true) {
      closeModal();
    }
  }, [isAuthenticated, modalLogin]);

  // add to cart after login response......
  // const addToCartAfterLoginRes = () => {
  //   const choice_options = cartItemBeforeLogin[0]?.product?.choice_options;
  //   const choice_options_name = choice_options?.map((option) => option.name);
  //   const choice_options_defaultValue = choice_options?.map(
  //     (option) => option?.options[0]
  //   );
  //   const defaultChoices = choice_options_name?.map((name, index) => ({
  //     name,
  //     options: choice_options_defaultValue[index],
  //   }));

  //   let color = colors?.map((color) => color?.code);

  //   const addItemsToCartDataWithColor = {
  //     id: `${cartItemBeforeLogin[0]?.product?.id}`,
  //     color: `${color[0]}`,
  //     quantity: `${quantity}`,
  //   };

  //   const addItemsToCartDataWithoutColor = {
  //     id: `${cartItemBeforeLogin[0]?.product?.id}`,
  //     quantity: `${quantity}`,
  //   };

  //   defaultChoices?.forEach((element) => {
  //     addItemsToCartDataWithColor[element.name] = `${element.options}`.trim();
  //   });

  //   defaultChoices?.forEach((element) => {
  //     addItemsToCartDataWithoutColor[element.name] =
  //       `${element.options}`.trim();
  //   });

  //   // if (loginRes?.status == "success" || signupRes?.status == "success") {
  //   cartItemBeforeLogin[0]?.product?.colors?.length > 0
  //     ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
  //     : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));

  //   addToCartOverlyLoading();
  //   // }
  // };

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


      addToCartOverlyLoading()
    }
    
  };

  const addToCartOverlyLoading = () => {
    
    const addToCartLoaderOverlay = document.querySelector(
      ".addToCart_loader_overlay"
    );

    addToCartLoaderOverlay.style.display = "block";
  };

  if (addeditemid) {
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
                <small>{name.toString().substring(0, 23)}...</small>
                <br />
                <div className="product-card-body-content-unit-price">
                <small>
                  {newChoiceOption && (
                    <span className="unitPrice_view">
                      {newChoiceOption?.options[0]} : {newChoiceOption?.title}
                    </span>
                  )}
                </small>
                {newChoiceOption?.options[0] && newChoiceOption?.title ? (
                    <span>-</span>
                  ) : (
                    ""
                  )}
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
                  size={14}
                />{" "}
                <small>({reviews_count})</small>
              </div>

              {/* <Link to={`/brand/${brandId}/${id}`} addeditemid={addeditemid}> */}
              <Link to={`/brand/${brandId}/${product.slug}`} addeditemid={addeditemid}>
                {current_stock > 0 ? (
                  <div
                    className="quickView_AddToCart_overlay"
                    onClick={scrollTop}
                  >
                    <div className="overlayViewCartBtn">
                      <span>
                        <i className="bi bi-eye-fill"></i> <br /> View Details
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
              {addeditemid ? (
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
                    >
                      <i className="bi bi-cart-plus"></i> Add To Cart
                    </button>
                  ) : (
                    <button className="btn_before_add_cart_stockOut">
                      <i className="bi bi-cart-x"></i> Stock Out
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
          {/* <div>
              <div className="product-card-body">
                <img
                  src={imgThumbnailBaseUrl + `/${thumbnail}`}
                  className="card-img-top"
                  alt=""
                />
                <div className="product-card-body-content">
                  <small>{name?.toString().substring(0, 20)}...</small>
                  <br />
                  <div className="product-card-body-content-unit-price">
                    {newChoiceOption && (
                      <span>
                        {newChoiceOption?.title} : {newChoiceOption?.options[0]}
                      </span>
                    )}
                    <br />
                    <strong> &#2547; {unit_price}</strong>
                  </div>
                </div>
              </div>
              <div className="card-footer product-card-footer">
                <button className="btn_before_add_cart">
                  <i className="bi bi-cart-plus"></i> Stock Out
                </button>
              </div>
              <div className="product_stock_out_overlay d-flex justify-content-center align-items-center">
                <h3 className="text-center">
                  Stock <br /> Out
                </h3>
              </div>
            </div> */}
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
          <LoginModal />
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
export default BrandsProductsCard;
