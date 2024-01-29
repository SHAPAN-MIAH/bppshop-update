import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./ProductDetailsPage.css";
import { useParams } from "react-router-dom";
import {
  baseUrl,
  imgBaseUrl,
  imgThumbnailBaseUrl,
} from "../../../BaseUrl/BaseUrl";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ClearAddToCartRes,
  addItemsToCart,
  addItemsToCartAfterLogin,
  updateItemsToCart,
} from "../../../Redux/Actions/CartAction";
import { getPriceVariant } from "../../../Redux/Actions/PriceVariantAction";
import ProductReview from "../../../Components/ProductReview/ProductReview";
import ReactImageMagnify from "react-image-magnify";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillPlayCircle, AiOutlineYoutube } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import coverImg from "../../../Assets/Images/pexels-evie-shaffer-2512282.jpg";
import Modal from "react-modal";
import LoginModal from "../../User/Login/LoginModal";
import SignUpModal from "../../User/SignUp/SignUpModal";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import RelatedProduct from "../../../Components/RelatedProduct/RelatedProduct";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    paddingBottom: "20px",
  },
};

const BrandProductDetails = () => {
  const { brandId, id } = useParams();
  const location = useLocation();
  const newLocation = location.pathname.split("/");
  // const brandName = newLocation[2];
  const brandName = localStorage.getItem("brandName");

  // let newId = parseInt(id);

  // console.log(id);

  const [productDetail, setProductDetail] = useState([]);
  const [quantityCount, setQuantityCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [variantRes, setVariantRes] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems?.[0]?.data);
  const AddToCartResponse = useSelector(
    (state) => state.AddToCartResponse.AddToCartResponse
  );
  const token = localStorage.getItem("token");
  const sellerId = localStorage.getItem("sellerId");
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loginRes } = useSelector((state) => state.loginRes);
  const { signupRes } = useSelector((state) => state.signupRes);

  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${id}`).then((res) => {
      setProductDetail(res.data.data);
      // setLoading(false);
    });
  }, [id]);

  // Customer Audit log.........................
  // const auditLog = {
  //   product_id: id,
  // };
  // const config = { headers: { Authorization: `Bearer ${token}` } };

  // useEffect(() => {
  //   token && axios.post(`${baseUrl}/customer/audit-log`, auditLog, config);
  // }, []);

  let productDetailId = parseInt(productDetail?.id);
  const cartItemsId = cartItems?.map((i) => i?.product_id);
  const addeditemid = cartItemsId?.find((i) => i == productDetailId);
  const isItemExist = cartItems?.find((i) => i?.product_id == addeditemid);
  // const paramId = subSubSlug;
  // const productDetailsPathId = productDetail?.id?.toString();
  // const productDetailsPath = productDetailsPathId == paramId;
  const choiceOptions = productDetail?.choice_options?.map(
    (list) => list?.options
  );
  const colors = productDetail?.colors?.map((color) => color?.code);

  //default choice option..............................
  const defaultOptionName = productDetail?.choice_options?.map(
    (list) => list?.name
  );
  const defaultOption = choiceOptions?.map((option) => option[0]);
  const choices = defaultOptionName?.map((name, index) => ({
    name,
    options: defaultOption[index],
  }));

  let defaultChoices = choices;

  //Function For Select choice option .........................................
  const [selectedOption, setSelectedOption] = useState([]);

  if (selectedOption.length > 0) {
    defaultChoices = selectedOption;
  }

  const OptionSelectHandler = (e) => {
    const selectOption = e.target.value.split("@");
    const newName = {
      name: selectOption[0],
      options: selectOption[1].trim(),
    };
    defaultChoices.push(newName);
    if (defaultChoices.findIndex((f) => f.name == newName.name) == -1) {
      setSelectedOption((element) => [...defaultChoices, newName]);
    } else {
      const newSelectedOption = [...defaultChoices];
      const filterArray = newSelectedOption.filter(
        (f) => f.name !== newName.name
      );
      setSelectedOption((element) => [...filterArray, newName]);
    }

    priceVariantHandlerByChoiceOption();
  };

  // Get Price variant function.............................................
  const priceVariantHandlerByChoiceOption = (newVarientQty) => {
    if (productDetail.current_stock <= newVarientQty) {
      toast.error("Stock Limited.", {
        duration: 3000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
    }
    const priceVariantDefaultOptionData = {
      product_id: `${productDetail?.id}`,
      color: `${colors[0]}`,
      quantity: `${newVarientQty ? newVarientQty : quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        priceVariantDefaultOptionData[element.name] = `${element.options}`;
      });

    const priceVariantDataWithSelectedOption = {
      product_id: `${productDetail?.id}`,
      quantity: `${newVarientQty ? newVarientQty : quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        priceVariantDataWithSelectedOption[element.name] = `${element.options}`;
      });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (colors?.length > 0) {
      defaultChoices &&
        axios
          .post(
            `${baseUrl}/products/variant_price`,
            priceVariantDefaultOptionData,
            config
          )
          .then((res) => setVariantRes(res.data.data));
    } else {
      defaultChoices &&
        axios
          .post(
            `${baseUrl}/products/variant_price`,
            priceVariantDataWithSelectedOption,
            config
          )
          .then((res) => setVariantRes(res.data.data));
    }
  };

  //Function for Get Price variant by color .............................................
  const [selectedColor, setSelectedColor] = useState([]);
  const [activeColor, setActiveColor] = useState(0);

  const priceVariantHandlerByColor = (selectedColor, index) => {
    setSelectedColor(selectedColor);
    setActiveColor(index);

    const priceVariantDefaultColorData = {
      product_id: `${productDetail?.id}`,
      color: `${selectedColor ? selectedColor : colors[0]}`,
      quantity: `${quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        priceVariantDefaultColorData[element.name] = `${element.options}`;
      });
    dispatch(getPriceVariant(priceVariantDefaultColorData));
  };

  // Product Images Zoom Slider Functions...................................
  const newData = productDetail?.images?.map((img) => ({
    image: imgBaseUrl + `/` + img,
  }));

  const [img, setImg] = useState();

  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("imgActive");
    for (var j = 0; j < productDetail?.images?.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("imgActive");
      }
    }
  };

  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // 404 function...................................
  // useEffect(() => {
  //   if ( !productDetailsPath) {
  //     navigate("/404", { replace: true });
  //   }
  // }, [productDetailsPath, navigate]);

  // cart item increase decrease function..............................
  const increaseQuantityBeforeAddToCart = (quantity, stock, maxOrderQty) => {
    if (stock <= quantity) {
      toast.error("Sorry, Stock is limited!", {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
      return ;
    }
    if (maxOrderQty > 1 && maxOrderQty <= quantity) {
      toast.error("Sorry! Stock limited!", {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
      return ;
    }
  };

  const increaseQuantity = (id, quantity, stock, maxOrderQty) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      toast.error("Sorry, Stock is limited!", {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
      return;
    }
    if (maxOrderQty > 1 && maxOrderQty <= quantity) {
      toast.error("Sorry! Stock is limited!", {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
      return ;
    }
    // dispatch(addItemsToCart(id, newQty, defaultChoices));
    dispatch(updateItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity, defaultChoices) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    // dispatch(addItemsToCart(id, newQty, defaultChoices));
    dispatch(updateItemsToCart(id, newQty, defaultChoices));
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const modalLogin = localStorage.getItem("modalLogin");
  const cartItemBeforeLogin = useSelector(
    (state) => state.cartItemBeforeLogin.cartItem[0]
  );
  const modalSignup = localStorage.getItem("modalSignup");

  // add to cart after login res............
  useEffect(() => {
    if (isAuthenticated == true && token) {
      (loginRes?.status == "success") | (signupRes?.status == "success") &&
        closeModal();
      if (modalLogin == "true" || modalSignup == "true") {
        addTocartAfterLoginSignupResInDetailsPage();
      }
    }
  }, [loginRes, signupRes, isAuthenticated, token]);

  // Add to cart after login and signup response..
  const addTocartAfterLoginSignupResInDetailsPage = () => {
    let color = productDetail?.colors?.map((color) => color?.code);
    const addItemsToCartDataWithColor = {
      id: `${productDetail?.id}`,
      color: `${selectedColor ? selectedColor : color[0]}`,
      quantity: `${quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        addItemsToCartDataWithColor[element.name] = `${element.options}`.trim();
      });

    const addItemsToCartDataWithoutColor = {
      id: `${productDetail.id}`,
      quantity: `${quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        addItemsToCartDataWithoutColor[element.name] =
          `${element.options}`.trim();
      });

    if (token) {
      productDetail?.colors?.length > 0
        ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
        : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));
      addToCartOverlyLoading();
    }
  };

  // add to cart with price variant options..........................................
  const addToCartHandler = (productDetail, quantityCount) => {
    if (!token) {
      // dispatch(addItemsToCart(productDetail, quantityCount));
      openModal();
    }

    if (isAuthenticated == true && token) {
      let color = productDetail?.colors?.map((color) => color?.code);
      const addItemsToCartDataWithColor = {
        id: `${productDetail?.id}`,
        color: `${selectedColor ? selectedColor : color[0]}`,
        quantity: `${quantityCount}`,
      };

      defaultChoices &&
        defaultChoices.forEach((element) => {
          addItemsToCartDataWithColor[element.name] =
            `${element.options}`.trim();
        });

      const addItemsToCartDataWithoutColor = {
        id: `${productDetail.id}`,
        quantity: `${quantityCount}`,
      };

      defaultChoices &&
        defaultChoices.forEach((element) => {
          addItemsToCartDataWithoutColor[element.name] =
            `${element.options}`.trim();
        });

      if (token) {
        productDetail?.colors?.length > 0
          ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
          : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));

        addToCartOverlyLoading();
      }
      // if(AddToCartResponse?.map(i => i.status == "success")){
      //   // toaster
      //   toast.success(`Product added to cart successfully`, {
      //     duration: 3000,
      //     style: {
      //       width: "100%",
      //       height: "80px",
      //       padding: "0px 20px",
      //       background: "#86bc19",
      //       color: "#fff",
      //     },
      //   });

      // }
      dispatch(ClearAddToCartRes());
    }
  };

  const addToCartOverlyLoading = () => {
    const addToCartLoaderOverlay = document.querySelector(
      ".addToCart_loader_overlay"
    );

    addToCartLoaderOverlay.style.display = "block";
  };

  const addToCartOverlyLoadingCloseHandler = () => {
    const addToCartLoaderOverlay = document.querySelector(
      ".addToCart_loader_overlay"
    );
    addToCartLoaderOverlay.style.display = "none";
  };

  if (AddToCartResponse[0]?.status == "success") {
    addToCartOverlyLoadingCloseHandler();
  }

  useEffect(() => {
    if (AddToCartResponse[0]?.status == "failed") {
      addToCartOverlyLoadingCloseHandler();
      toast.error(`${AddToCartResponse[0]?.message}`, {
        duration: 2000,
        style: {
          width: "100%",
          height: "80px",
          padding: "0px 20px",
          background: "#86bc19",
          color: "#fff",
        },
      });
    }
  });

  // youtube video embed code split function............
  const [isOpen, setOpen] = useState(false);
  let embed_video_url;

  const youtube_url = () => {
    var video_url = productDetail.video_url;

    if (video_url.includes("shorts")) {
      var split_shorts_video_url = video_url.split("/");
      embed_video_url = split_shorts_video_url[4];
    }
    if (video_url.includes("watch")) {
      var split_video_url = video_url.split("=");
      embed_video_url = split_video_url[1];
    }
  };

  if (productDetail.video_url) {
    youtube_url();
  }

  const SellerNameSave = (sellerName) => {
    localStorage.setItem("sellerName", sellerName);
  };

  const pageMount = () => {
    setQuantityCount(1);
    setVariantRes("");
    setImg("");
  };

  return (
    <>
      <h4>Brand Products:</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/brands">Brands</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to={`/brands/${brandId}`}>{brandName}</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {productDetail?.name}
          </li>
        </ol>
      </nav>
      <br />
      {/* {productDetailsPath == true && ( */}
      <div className="product_details_page_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="product_details_page_img_container">
                {newData?.length && (
                  <div className="imgZoomContainer">
                    <div className="left_2">
                      {productDetail?.images?.length && (
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: "Wristwatch by Ted Baker London",
                              isFluidWidth: true,
                              sizes:
                                "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                              src: img
                                ? `https://backend.bppshop.com.bd/storage/product/${img}`
                                : newData[0].image,
                            },
                            largeImage: {
                              src: img
                                ? `https://backend.bppshop.com.bd/storage/product/${img}`
                                : newData[0].image,
                              width: 1526,
                              height: 2000,
                            },
                            enlargedImageContainerDimensions: {
                              width: "100%",
                              height: "100%",
                            },
                          }}
                        />
                      )}
                    </div>

                    <div className="left_1" id="productImgGallery">
                      <ModalVideo
                        channel="youtube"
                        autoplay
                        allowFullScreen="true"
                        isOpen={isOpen}
                        videoId={`${embed_video_url}`}
                        onClose={() => setOpen(false)}
                      />

                      {productDetail.video_url && (
                        <button
                          onClick={() => setOpen(true)}
                          className="video_player_btn"
                        >
                          <img
                            src={`https://backend.bppshop.com.bd/storage/product/thumbnail/${productDetail.thumbnail}`}
                            alt=""
                          />
                          <AiFillPlayCircle className="videoPlayerIcon" />
                        </button>
                      )}

                      {productDetail?.images?.map((image, i) => (
                        <div
                          className={i == 0 ? "img_wrap active" : "img_wrap"}
                          key={i}
                          onClick={() => hoverHandler(image, i)}
                          ref={addRefs}
                        >
                          <img
                            src={`https://backend.bppshop.com.bd/storage/product/${image}`}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-5">
              <div className="product_details_page_content">
                <h1>{productDetail?.name}</h1>
                <p>
                  <span>
                    Product Code: <strong>{productDetail?.code}</strong>
                  </span>
                  <span>
                    {" "}
                    Stock:{" "}
                    {productDetail?.current_stock > 0 ? (
                      <strong>Available</strong>
                    ) : (
                      <strong>Not Available</strong>
                    )}
                  </span>
                </p>
                <div className="product_details_page_price">
                  {productDetail?.discount ? (
                    <h5 className="prices">
                      &#2547;{" "}
                      {productDetail?.unit_price - productDetail?.discount}{" "}
                      <del className="text-danger">
                        &#2547; {productDetail?.unit_price}
                      </del>
                    </h5>
                  ) : (
                    <h5 className="prices">
                      &#2547; {productDetail?.unit_price}
                    </h5>
                  )}
                </div>
                <div className="product_details_page_pc_size_color">
                  <div
                    className={
                      productDetail?.choice_options?.length < 1
                        ? "d-none"
                        : "choiceOptionListContainer size"
                    }
                  >
                    {productDetail?.choice_options?.map((list, index) => (
                      <div key={list?.id} className="choiceOptionList">
                        <h5>{list?.title}:</h5>
                        <div className="choiceOptionSelection">
                          <select
                            name="options"
                            onChange={(e) => OptionSelectHandler(e)}
                          >
                            {list?.options?.map((option, indx) => (
                              <option
                                value={list?.name + "@" + option}
                                key={indx}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={
                      productDetail?.colors?.length < 1
                        ? "d-none"
                        : " mt-2 color"
                    }
                  >
                    <h5>Select Color: </h5>
                    <div className="d-flex">
                      {productDetail?.colors?.map((color, index) => (
                        <>
                          <div
                            onClick={() =>
                              priceVariantHandlerByColor(color?.code, index)
                            }
                            style={{
                              background: `${color?.code}`,
                              margin: "0px 2px",
                              cursor: "pointer",
                            }}
                            className="colorBox"
                            id={
                              index[0]
                                ? "activatedColor"
                                : activeColor == index
                                ? "activatedColor"
                                : ""
                            }
                          ></div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="product_details_page_quantity_content ">
                  <h5>Quantity: </h5>
                  <div className="quantity">
                    {isItemExist?.quantity ? (
                      <span
                        onClick={() =>
                          decreaseQuantity(
                            isItemExist.id,
                            isItemExist?.quantity,
                            defaultChoices
                            // productDetail?.choice_options
                          )
                        }
                        className="detailsViewMinusBtn"
                      >
                        <i className="bi bi-dash-lg"></i>
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          setQuantityCount(
                            quantityCount > 1
                              ? quantityCount - 1
                              : quantityCount
                          );
                          priceVariantHandlerByChoiceOption(quantityCount - 1);
                        }}
                        className="minus"
                      >
                        <i className="bi bi-dash-lg"></i>
                      </span>
                    )}
                    <span className="count-number">
                      {isItemExist?.quantity
                        ? isItemExist?.quantity
                        : quantityCount}
                    </span>
                    {isItemExist?.quantity ? (
                      <span
                        onClick={() =>
                          increaseQuantity(
                            isItemExist.id,
                            isItemExist?.quantity,
                            productDetail?.current_stock,
                            productDetail?.max_order_qty
                            // defaultChoices
                            // productDetail?.choice_options
                          )
                        }
                        className="detailsViewPlusBtn"
                      >
                        <i className="bi bi-plus-lg"></i>
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          setQuantityCount(
                            productDetail?.max_order_qty ? (productDetail?.max_order_qty >= quantityCount + 1
                              ? quantityCount + 1
                              : quantityCount ) :
                              ( productDetail?.current_stock >= quantityCount + 1
                              ? quantityCount + 1
                              : quantityCount)
                          );
                          priceVariantHandlerByChoiceOption(
                            productDetail?.current_stock >= quantityCount + 1
                              ? quantityCount + 1
                              : quantityCount
                          );
                        }}
                        className="plus"
                      >
                        <i
                          className="bi bi-plus-lg"
                          onClick={() =>
                            increaseQuantityBeforeAddToCart(
                              quantityCount,
                              productDetail?.current_stock,
                              productDetail?.max_order_qty
                            )
                          }
                        ></i>
                      </span>
                    )}
                  </div>
                  <div className="totalPrice">
                    {isItemExist?.quantity ? (
                      <h5>
                        {productDetail?.discount > 0 ? (
                          <span className="mx-2 text-end">
                            &#2547;{" "}
                            {isItemExist?.quantity *
                              (productDetail?.unit_price -
                                productDetail?.discount)}
                          </span>
                        ) : (
                          <span className="mx-2 text-end">
                            &#2547;{" "}
                            {isItemExist?.quantity * productDetail?.unit_price}
                          </span>
                        )}
                      </h5>
                    ) : (
                      <h5>
                        Total Price: &#2547;{" "}
                        {variantRes?.price
                          ? variantRes?.price
                          : quantityCount *
                            (productDetail?.unit_price -
                              productDetail?.discount)}
                      </h5>
                    )}
                  </div>
                </div>
                <div className="product_details_page_btn_container">
                  {addeditemid ? (
                    <button disabled className="btn_after_added_cart">
                      <i className="bi bi-cart-plus"></i> Added to Cart
                    </button>
                  ) : productDetail?.current_stock > 0 ? (
                    <button
                      className="btn_before_add_cart"
                      onClick={() =>
                        addToCartHandler(productDetail, quantityCount)
                      }
                    >
                      <i className="bi bi-cart-plus"></i> Add To Cart
                    </button>
                  ) : (
                    <button className="btn_before_add_cart_stockOut">
                      <i className="bi bi-cart-x"></i> Stock Out
                    </button>
                  )}
                  <button className="addWishListBtn">
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
                <div className="product_details_page_product_description">
                  <h5>Description :</h5>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: productDetail?.details,
                    }}
                  ></span>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              {productDetail?.seller && (
                <div className="seller-product-suggestion-container">
                  {/* <div className="seller-store-content">
                    <Link
                      to={`/sellers-store/${productDetail?.seller?.id}`}
                      onClick={(e) => {
                        SellerNameSave(productDetail?.seller?.shop_name);
                      }}
                    >
                      <div className="seller-store-banner">
                        <img
                          src={`https://backend.bppshop.com.bd/storage/shop/banner/${productDetail?.seller?.banner}`}
                          alt=""
                        />

                        <div className="seller-store-profile-container">
                          <div className="seller-profile-image">
                            <img
                              src={`https://backend.bppshop.com.bd/storage/shop/${productDetail?.seller?.image}`}
                              alt=""
                            />
                          </div>
                          <p className="sellerName">
                            {productDetail?.seller?.shop_name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div> */}
<Link
                    to={`/sellers-store/${productDetail?.seller?.id}`}
                    onClick={(e) => {
                      SellerNameSave(productDetail?.seller?.shop_name);
                    }}
                  >
                    <div
                      className="seller_store_section_content"
                      style={{ height: "160px" }}
                    >
                      {productDetail?.seller?.banner == "def.png" ? (
                        <img src={coverImg} alt="" />
                      ) : (
                        <img
                          src={`https://backend.bppshop.com.bd/storage/shop/banner/${productDetail?.seller?.banner}`}
                          alt=""
                        />
                      )}
                      <div className="seller_store_profile">
                        <img
                          src={`https://backend.bppshop.com.bd/storage/shop/${productDetail?.seller?.image}`}
                          alt=""
                        />
                        <p className="seller_store_profile_name">
                          {productDetail?.seller?.shop_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <h4 className="seller-product-view-title mt-3">
                    Seller Products
                  </h4>
                  <div className="seller-product-view-container ">
                    {productDetail?.seller?.product?.map((item) => (
                      <Link to={`/brand/${brandId}/${item.id}`}>
                        <div
                          className="seller_product_item"
                          onClick={() => pageMount()}
                        >
                          <div>
                            {item.thumbnail ? (
                              <img
                                src={imgThumbnailBaseUrl + `/${item.thumbnail}`}
                                className="card-img-top"
                                alt=""
                              />
                            ) : (
                              <img src={defaultProImg} alt="" />
                            )}
                          </div>
                          <div>
                            <small>
                              {item?.name?.toString().substring(0, 35)}...
                            </small>
                            <br />
                            <small className="seller_product_unit_price">
                              &#2547; {item?.unit_price}
                            </small>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
      <ProductReview productDetail={productDetail} key={productDetail?.name} />
      {productDetail?.id && (
        <RelatedProduct
          productId={productDetail?.id}
          key={productDetail?.id}
          setImg={setImg}
        />
      )}

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
export default BrandProductDetails;
