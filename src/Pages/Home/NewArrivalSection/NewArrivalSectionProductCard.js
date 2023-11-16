import React, { useEffect, useState } from "react";
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
import LoginModal from "../../User/Login/LoginModal";
import SignUpModal from "../../User/SignUp/SignUpModal";
import "./NewArrivalSection.css";

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

const NewArrivalSectionProductCard = ({ product, setImg }) => {
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
  const addeditemid = cartItemsId?.find((i) => i == id);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { loginRes } = useSelector((state) => state.loginRes);
  const { signupRes } = useSelector((state) => state.signupRes);

  useEffect(() => {
    if (isAuthenticated == true) {
      closeModal();

      // if (modalLogin == "true") {
      //   addToCartAfterLoginRes();
      // }
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
      localStorage.setItem("productCartLoginAddItem", "true");
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

  if (addeditemid) {
    const addToCartLoaderOverlay = document.querySelector(
      ".addToCart_loader_overlay"
    );

    addToCartLoaderOverlay.style.display = "none";

    // toaster
    // toast.success(`Product added to cart successfully`, {
    //   duration: 2000,

    //   style: {
    //     width: "100%",
    //     height: "80px",
    //     padding: "0px 20px",
    //     background: "#86bc19",
    //     color: "#fff",
    //   },
    // });
  }

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const imgReset = () => {
    setImg("");
  };

  return (
    <>
      <div className="product_card_content" onClick={imgReset}>
        <div className="product-card">
          <>
            <div className=" new_arrival_section_product-card-body">
              <div className="new_arrival_section_productImg_container">
                {thumbnail ? (
                  <img
                    src={imgThumbnailBaseUrl + `/${thumbnail}`}
                    className="card-img-top"
                    alt=""
                  />
                ) : (
                  <img src={defaultProImg} alt="" />
                )}

                <Link
                  to={`/new-arrival/${product?.slug}`}
                  addeditemid={addeditemid}
                >
                  {current_stock > 0 ? (
                    <div
                      className="new_arrival_section_quickView_AddToCart_overlay"
                      onClick={scrollTop}
                    >
                      <div className="new_arrival_section_overlayViewCartBtn">
                        <span>
                          <i className="bi bi-eye-fill"></i> <br /> View Details
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="new_arrival_section_product_stock_out_overlay d-flex justify-content-center align-items-center">
                      <span className="text-center">Stock Out</span>
                    </div>
                  )}
                </Link>
              </div>

              <div className="new_arrival_section_product-card-body-content">
                <h6>{name.toString().substring(0, 20)}...</h6>
                <small className="">
                  {newChoiceOption && (
                    <span className="new_arrival_section_unitPrice_view">
                      {newChoiceOption?.options[0]} : {newChoiceOption?.title}
                    </span>
                  )}
                </small>
                <div className="product-card-body-content-unit-price mt-2">
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
                <div className="mt-3">
                  {addeditemid ? (
                    <div className="newArrivalSectionCardFooterBtn">
                      <button disabled className="new_arrival_section_btn_after_added_cart">
                        <i className="bi bi-cart-plus"></i> Product in Cart
                      </button>
                    </div>
                  ) : (
                    <div className="newArrivalSectionCardFooterBtn">
                      {current_stock > 0 ? (
                        <button
                          className="new_arrival_section_btn_before_add_cart"
                          onClick={() => addToCartHandler(product, quantity)}
                        >
                          <i className="bi bi-cart-plus"></i> Add To Cart
                        </button>
                      ) : (
                        <button className="new_arrival_section_btn_before_add_cart_stockOut">
                          <i className="bi bi-cart-x"></i> Stock Out
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* <Link to={`/new-arrival/${id}`} addeditemid={addeditemid}> */}
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
export default NewArrivalSectionProductCard;
