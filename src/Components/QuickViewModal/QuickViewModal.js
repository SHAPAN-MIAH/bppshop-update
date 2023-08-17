import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./QuickViewModal.css";
import { baseUrl, imgBaseUrl } from "../../BaseUrl/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "./../../Redux/Actions/CartAction";
import { getPriceVariant } from "./../../Redux/Actions/PriceVariantAction";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReactImageMagnify from "react-image-magnify";

const QuickViewModal = ({ pid }) => {
  const token = localStorage.getItem("token");
  const { slug, subSlug, subSubSlug } = useParams();
  const [quantityCount, setQuantityCount] = useState(1);
  const [productDetail, setProductDetail] = useState([]);
  const [variantRes, setVariantRes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsId = cartItems.map((i) => i.product.id);
  const addedItemId = cartItemsId.find((i) => i === pid);
  const isItemExist = cartItems.find((i) => i?.product?.id === addedItemId);

  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${pid}`).then((res) => {
      setProductDetail(res?.data?.data);
    });
  }, [pid]);

  const choiceOptions = productDetail?.choice_options?.map(
    (list) => list?.options
  );

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

  //default choice colors..............................
  const colors = productDetail?.colors?.map((color) => color?.code);

  const increaseQuantity = (id, quantity, stock) => {
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
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

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
      product_id: `${pid}`,
      color: `${colors[0]}`,
      quantity: `${newVarientQty ? newVarientQty : quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        priceVariantDefaultOptionData[element.name] =
          `${element.options}`.trim();
      });

    const priceVariantData = {
      product_id: `${pid}`,
      color: `${selectedColor}`,
      quantity: `${newVarientQty ? newVarientQty : quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        priceVariantData[element.name] = `${element.options}`.trim();
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
          .post(`${baseUrl}/products/variant_price`, priceVariantData, config)
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
      product_id: `${pid}`,
      color: `${selectedColor ? selectedColor : colors[0]}`,
      quantity: `${quantityCount}`,
    };

    defaultChoices &&
      defaultChoices.forEach((element) => {
        priceVariantDefaultColorData[element.name] = `${element.options}`;
      });
    dispatch(getPriceVariant(priceVariantDefaultColorData));
  };

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

  //Function for add to cart .......................
  const addToCartHandler = (productDetail, quantityCount) => {
    let color = productDetail?.colors?.map((color) => color?.code);

    const addItemsToCartDataWithColor = {
      id: `${productDetail?.id}`,
      color: selectedColor.length ? `${selectedColor}` : `${color[0]}`,
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

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <div className="modal-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-5">
              <div className="imageView">
                {newData?.length > 0 && (
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
                              width: "120%",
                              height: "100%",
                            },
                          }}
                        />
                      )}
                    </div>
                    <div className="left_1">
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
            <div className="col-sm-7">
              <div className="detail-content-view">
                <div className="productName_wishlist">
                  <h4 className="productName">{productDetail.name}</h4>
                  <span>
                    <i className="bi bi-heart"></i>
                  </span>
                </div>
                <div className="price_Stock_Code">
                  {productDetail.discount ? (
                    <h5 className="prices">
                      ৳{productDetail.unit_price - productDetail.discount}{" "}
                      <del className="text-danger">
                        {" "}
                        ৳{productDetail.unit_price}
                      </del>
                    </h5>
                  ) : (
                    <h5 className="prices">৳{productDetail.unit_price}</h5>
                  )}

                  <p>
                    Product Code: <strong>{productDetail.code}</strong>
                    <span>
                      {" "}
                      Stock:{" "}
                      {productDetail.current_stock > 0 ? (
                        <strong>Available</strong>
                      ) : (
                        <strong>Not Available</strong>
                      )}
                    </span>
                  </p>
                </div>
                <div className="pc-size-color">
                  <div
                    className={
                      productDetail?.choice_options?.length < 1
                        ? "d-none"
                        : "choiceOptionListContainer size"
                    }
                  >
                    {productDetail?.choice_options?.map((list) => (
                      <div key={list.id} className="choiceOptionList">
                        <h5>{list?.title}: </h5>

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
                        : "mt-1 color"
                    }
                  >
                    <h5>Selected Color: </h5>
                    <div className="d-flex">
                      {productDetail.colors?.map((color, index) => (
                        <>
                          <div
                            onClick={() =>
                              priceVariantHandlerByColor(color.code, index)
                            }
                            style={{
                              background: `${color.code}`,
                              margin: "0px 2px",
                              cursor: "pointer",
                            }}
                            className="color1"
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
                <div className="quantity-content">
                  <div className="d-flex">
                    <h4>Quantity: </h4>
                    <div className="quantity">
                      {isItemExist?.quantity ? (
                        <span
                          onClick={() =>
                            decreaseQuantity(
                              productDetail,
                              isItemExist?.quantity
                            )
                          }
                          className="quickViewMinusBtn"
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
                            priceVariantHandlerByChoiceOption(
                              quantityCount - 1
                            );
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
                              productDetail.current_stock
                            )
                          }
                          className="quickViewPlusBtn"
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
                  </div>
                  <div className="totalPrice">
                    {isItemExist?.quantity ? (
                      <h5>
                        {productDetail?.discount > 0 ? (
                          <span className="mx-2 text-end">
                            ৳
                            {isItemExist?.quantity *
                              (productDetail?.unit_price -
                                productDetail?.discount)}
                          </span>
                        ) : (
                          <span className="mx-2 text-end">
                            ৳{isItemExist?.quantity * productDetail?.unit_price}
                          </span>
                        )}
                      </h5>
                    ) : (
                      <h5>
                        Total Price: ৳
                        {variantRes?.price
                          ? variantRes?.price
                          : quantityCount *
                            (productDetail?.unit_price -
                              productDetail?.discount)}
                      </h5>
                    )}
                  </div>
                </div>
                <div className="product_description">
                  <h5>Description :</h5>
                  <span
                    dangerouslySetInnerHTML={{ __html: productDetail.details }}
                  ></span>
                </div>
              </div>

              <div className="col-md-8">
                <div className="my-4">
                  {addedItemId ? (
                    <button disabled className="btn_after_added_cart">
                      <i className="bi bi-cart-plus"></i> Added to Cart
                    </button>
                  ) : (
                    <button
                      className="btn_before_add_cart"
                      onClick={() =>
                        addToCartHandler(productDetail, quantityCount)
                      }
                    >
                      <i className="bi bi-cart-plus"></i> Add To Cart
                    </button>
                  )}

                  <Link to={`/${slug}/${subSlug}/${subSubSlug}/${pid}`}>
                    <button
                      onClick={scrollTop}
                      className="btn_before_add_cart ms-3"
                    >
                      <i className="bi bi-eye-fill"></i> View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
