import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductDetailsPage.css";
import { useParams } from "react-router-dom";
import {
  baseUrl,
  imgBaseUrl,
  imgThumbnailBaseUrl,
} from "./../../BaseUrl/BaseUrl";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
  updateItemsToCart,
} from "./../../Redux/Actions/CartAction";
import { getPriceVariant } from "./../../Redux/Actions/PriceVariantAction";
import ProductReview from "./../../Components/ProductReview/ProductReview";
import ReactImageMagnify from "react-image-magnify";
import toast from "react-hot-toast";
import defaultProImg from "../../Assets/Images/defaultImg.jpg";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

// import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineYoutube, AiFillPlayCircle } from "react-icons/ai";
import MetaData from "../Layout/MetaData";
// import { BiLoaderAlt } from "react-icons/bi";

const ProductDetailsPage = () => {
  const { slug, subSlug, subSubSlug, id } = useParams();

  // console.log(slug, subSlug, subSubSlug)
  let newId = parseInt(id);
  const [productDetail, setProductDetail] = useState([]);
  const [quantityCount, setQuantityCount] = useState(1);
  // const [loading, setLoading] = useState(true);
  const [variantRes, setVariantRes] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = localStorage.getItem("token");
  const sellerId = localStorage.getItem("sellerId");

  // Product Details............................
  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${id}`).then((res) => {
      // setLoading(false);
      setProductDetail(res.data.data);
    });
  }, [id]);

  // console.log(productDetail);

  // Customer Audit log.........................
  const auditLog = {
    product_id: id,
  };
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // useEffect(() => {
  //   token && axios.post(`${baseUrl}/customer/audit-log`, auditLog, config);
  // }, []);

  const cartItemsId = cartItems.map((i) => i?.product?.id);
  const addedItemId = cartItemsId.find((i) => i === newId);
  const isItemExist = cartItems.find((i) => i?.product?.id === addedItemId);
  const paramId = subSubSlug;
  const productDetailsPathId = productDetail?.id?.toString();
  const productDetailsPath = productDetailsPathId === paramId;
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
    if (defaultChoices.findIndex((f) => f.name === newName.name) === -1) {
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
      product_id: `${id}`,
      color: `${colors[0]}`,
      quantity: `${newVarientQty ? newVarientQty : quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        priceVariantDefaultOptionData[element.name] = `${element.options}`;
      });

    const priceVariantDataWithSelectedOption = {
      product_id: `${id}`,
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
      product_id: `${id}`,
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
  const increaseQuantity = (id, quantity, stock, defaultChoices) => {
    // console.log(defaultChoices);

    const newQty = quantity + 1;
    if (stock <= quantity) {
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
      return;
    }
    dispatch(addItemsToCart(id, newQty, defaultChoices));
    dispatch(updateItemsToCart(id, newQty, defaultChoices));
  };

  const decreaseQuantity = (id, quantity, defaultChoices) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, defaultChoices));
    dispatch(updateItemsToCart(id, newQty, defaultChoices));
  };

  // add to cart with price variant options..........................................
  const addToCartHandler = (productDetail, quantityCount) => {
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
        ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor)) &&
          dispatch(addItemsToCart(productDetail, quantityCount, defaultChoices))
        : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor)) &&
          dispatch(
            addItemsToCart(productDetail, quantityCount, defaultChoices)
          );
    } else {
      dispatch(addItemsToCart(productDetail, quantityCount, defaultChoices));
    }

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
  };

  const [isOpen, setOpen] = useState(false);

  // const [modal, setModal] = useState(false);
  // const [videoLoading, setVideoLoading] = useState(true);

  // const openModal = () => {
  //   setModal(!modal);
  // };

  // const spinner = () => {
  //   setVideoLoading(!videoLoading);
  // };

  // youtube video embed code split function............

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
    localStorage.setItem("sellerName", sellerName)
  };


  return (
    <>
      <MetaData
        title={productDetail.meta_title}
        description={productDetail.meta_description}
      />
      {/* <div className="row">
        <div className="col-md-9"> */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}`}>{slug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}/${subSlug}`}>{subSlug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}/${subSlug}/${subSubSlug}`}>{subSubSlug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {productDetail?.name}
          </li>
        </ol>
      </nav>
      <br />
      {/* {productDetailsPath === true && ( */}
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

                      {/* {productDetail.video_url && <div className="video_modal_btn">
                          <button onClick={openModal} >
                            <AiFillPlayCircle className="videoPlayerIcon"/>
                            {modal ? (
                              <section className="modal__bg">
                                <div className="modal__align">
                                  <div className="modal__content" modal={modal}>
                                    <IoCloseOutline
                                      className="modal__close"
                                      arial-label="Close modal"
                                      onClick={setModal}
                                    />
                                    <div className="modal__video-align">
                                      {videoLoading ? (
                                        <div className="modal__spinner">
                                          <BiLoaderAlt
                                            className="modal__spinner-style"
                                            fadeIn="none"
                                          />
                                        </div>
                                      ) : null}
                                      <iframe
                                        className="modal__video-style"
                                        onLoad={spinner}
                                        loading="lazy"
                                        width="800"
                                        height="500"
                                        src={`https://www.youtube.com/embed/${embed_video_url}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                      ></iframe>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            ) : null}
                          </button>
                        </div>} */}
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
                          className={i === 0 ? "img_wrap active" : "img_wrap"}
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
                <h2>{productDetail?.name}</h2>
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
                                : activeColor === index
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
                            productDetail,
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
                            productDetail,
                            isItemExist?.quantity,
                            productDetail?.current_stock,
                            defaultChoices
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
                            productDetail?.current_stock > quantityCount
                              ? quantityCount + 1
                              : quantityCount
                          );
                          priceVariantHandlerByChoiceOption(
                            productDetail?.current_stock >= quantityCount + 1
                              ? quantityCount + 1
                              : quantityCount
                          );
                        }}
                        className="plus"
                      >
                        <i className="bi bi-plus-lg"></i>
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
                  {addedItemId ? (
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
                      <i class="bi bi-cart-x"></i> Stock Out
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
                  <div className="seller-store-content">
                    <Link to={`/sellers-store/${productDetail?.seller?.id}`}
                    onClick={(e) => {SellerNameSave(productDetail?.seller?.shop_name)}}
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
                  </div>

                  <h4 className="seller-product-view-title mt-3">
                    Seller Products
                  </h4>
                  <div className="seller-product-view-container ">
                    {productDetail?.seller?.product?.map((item) => (
                      <Link to={`/${slug}/${subSlug}/${subSubSlug}/${item.id}`}>
                        <div className="seller_product_item">
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
      {/* </div>
        
      </div> */}

      <ProductReview productDetail={productDetail} />
    </>
  );
};
export default ProductDetailsPage;
