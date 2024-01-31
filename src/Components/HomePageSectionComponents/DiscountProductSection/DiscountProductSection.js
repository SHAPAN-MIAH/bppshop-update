import axios from "axios";
import React, { useEffect, useState } from "react";
import { bannerBaseUrl, baseUrl } from "../../../BaseUrl/BaseUrl";
import "../NewArrivalSection/NewArrivalSection.css";
import Slider from "react-slick";
import discountBanner from "../../../Assets/Images/bppshop_banner/discountProduct (1).jpg";
import discountBanner2 from "../../../Assets/Images/bppshop_banner/discountProduct (2).jpg";
import { Link } from "react-router-dom";
import TopRatedProductCard from "../../Cards/TopRatedProductCard/TopRatedProductCard";
import NewArrivalSectionProductCard from "../NewArrivalSection/NewArrivalSectionProductCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DiscountProductCard from "../../Cards/DiscountProductCard/DiscountProductCard";
import DiscountSectionProductCard from "./DiscountSectionProductCard";
import { useSelector } from "react-redux";

const DiscountProductSection = () => {
  const [newArrivalProduct, setNewArrivalProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const discountSectionBannerImg = useSelector((state)=>state?.banners?.banners?.banners?.find(
    (item) => item?.type === "discount_product"
  ))
  const discountSectionBannerPhoneImg = useSelector((state)=>state?.banners?.banners?.banners?.find(
    (item) => item?.type === "discount_product_mobile_res"
  ))
  useEffect(() => {
    axios
      .get(`${baseUrl}/products/discounted-product?limit=${16}&offset=${1}`)
      .then((response) => {
        response && setLoading(false);
        setNewArrivalProduct(response.data.products);
      });
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    rows: 2,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          rows: 2,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          rows: 1,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          rows: 1,
          slidesPerRow: 2,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#e77025",
          width: "22px",
          height: "25px",
          borderRadius: "50px",
          marginRight: "-5px",
        }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#e77025",
          width: "22px",
          height: "25px",
          borderRadius: "50px",
          marginLeft: "-12px",
        }}
        onClick={onClick}
      />
    );
  }
  return (
    <>
      <div className="new_arrival_section">
        <div className="new_arrival_section_container">
          <SkeletonTheme
            baseColor="rgb(220, 220, 220)"
            highlightColor="#e3e3e3"
          >
            {loading ? (
              <div className=" d-flex">
                <Skeleton
                  height="430px"
                  width="300px"
                  borderRadius="10px"
                  count={1}
                />
                <div style={{ marginLeft: "24px" }}>
                  <div className="d-flex justify-content-between">
                    <Skeleton
                      height="40px"
                      width="410px"
                      borderRadius="5px"
                      count={1}
                    />
                    <Skeleton
                      height="40px"
                      width="120px"
                      borderRadius="5px"
                      count={1}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Skeleton
                        height="180px"
                        width="490px"
                        style={{ marginTop: "15px" }}
                        borderRadius="10px"
                        count={1}
                      />
                      <Skeleton
                        height="180px"
                        width="490px"
                        style={{ marginTop: "15px" }}
                        borderRadius="10px"
                        count={1}
                      />
                    </div>
                    <div>
                      <Skeleton
                        height="180px"
                        width="490px"
                        style={{ marginTop: "15px", marginLeft: "15px" }}
                        borderRadius="10px"
                        count={1}
                      />
                      <Skeleton
                        height="180px"
                        width="490px"
                        style={{ marginTop: "15px", marginLeft: "15px" }}
                        borderRadius="10px"
                        count={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-3">
                <Link to="/discount-products">
                  <div className="new_arrival_banner">
                    <img className="img1" src={`${bannerBaseUrl}/${discountSectionBannerImg?.value}`} alt="" />
                    <img className="img2" src={`${bannerBaseUrl}/${discountSectionBannerPhoneImg?.value}`} alt="" />
                  </div>
                  </Link>
                </div>
                <div className="col-md-9">
                  <div>
                    <div className="new_arrival_section_product_content_header">
                      <h4>Discount Product</h4>
                      <Link to="/discount-products">
                        <button
                          className="new_arrival_section_product_view_more_btn"
                          type=""
                        >
                          View More
                        </button>
                      </Link>
                    </div>
                    <div className="horizontal_slider_container">
                      <Slider
                        {...settings}
                        className="new_arrival_section_product_slider"
                      >
                        {newArrivalProduct?.map((product) => (
                          <div className="new_arrival_section_product_content px-1">
                            <DiscountSectionProductCard
                              key={product?.id}
                              product={product}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SkeletonTheme>
        </div>
      </div>
    </>
  );
};

export default DiscountProductSection;
