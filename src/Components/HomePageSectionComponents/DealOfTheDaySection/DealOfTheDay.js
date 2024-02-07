import React, { useEffect, useState } from "react";
import "./DealOfTheDay.css";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import AllProductsCard from "../../Cards/AllProductCard/AllProductsCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import DealOfTheDayProductCard from "../../Cards/DealOfTheDayProductCard/DealOfTheDayProductCard";

const DealOfTheDay = () => {
  const [dealOfDayProduct, setDealOfDayProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const [screenSize, setScreenSize] = useState({ width: window.innerWidth });
  const handleResize = () => {
    setScreenSize({ width: window.innerWidth });
  };

  console.log(screenSize);
  
  useEffect(() => {
    axios
      .get(`${baseUrl}/dealsoftheday/deal-of-the-day?limit=${16}&offset=${1}`)
      .then((response) => {
        response && setLoading(false);
        setDealOfDayProduct(response?.data);
      });
  }, []);

  useEffect(() => {
    // Add event listener to update screen size on resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
          width: "25px",
          height: "25px",
          borderRadius: "50px",
          textAlign: "center",
          right: "20px",
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
          width: "25px",
          height: "25px",
          borderRadius: "50px",
          left: "15px",
          zIndex: "9",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <div className="deal_of_the_day_container">
        <SkeletonTheme baseColor="rgb(220, 220, 220)" highlightColor="#e3e3e3">
          {loading ? (
            <div className=" d-flex">
              {screenSize.width > 768 ? (
                <Skeleton
                  height="335px"
                  width="250px"
                  borderRadius="10px"
                  count={1}
                />
              ) : (
                ""
              )}
              <div style={{ marginLeft: "22px" }}>
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
                 <div className="deals_product_skeleton d-flex justify-content-between">
                  <Skeleton
                    height="280px"
                    width={screenSize.width > 768 ? `200px` : "250px"}
                    style={{ marginTop: "15px" }}
                    borderRadius="10px"
                    count={1}
                  />
                  <Skeleton
                    height="280px"
                    width={screenSize.width > 768 ? `200px` : "250px"}
                    style={{ marginTop: "15px", marginLeft: "12px" }}
                    borderRadius="10px"
                    count={1}
                  />
                  <Skeleton
                    height="280px"
                    width={screenSize.width > 768 ? `200px` : "250px"  }
                    style={{ marginTop: "15px", marginLeft: "12px" }}
                    borderRadius="10px"
                    count={1}
                  />
                  <Skeleton
                    height="280px"
                    width={screenSize.width > 576 ? `200px` : "0px"}
                    style={{ marginTop: "15px", marginLeft: "12px" }}
                    borderRadius="10px"
                    count={1}
                  />
                  <Skeleton
                    height="280px"
                    width={screenSize.width > 576 ? `200px` : "0px"}
                    style={{ marginTop: "15px", marginLeft: "12px" }}
                    borderRadius="10px"
                    count={1}
                  />
                </div> 
               
              </div>
            </div>
          ) : (
            <div className="deal_of_the_day_content_container">
              <Link to="/deals-of-the-day">
                <div className="deal_of_the_day_banner">
                  {
                    <img
                      className="img1"
                      src={`https://backend.bppshop.com.bd/storage/banner/${dealOfDayProduct.banner}`}
                      alt=""
                    />
                  }
                </div>
              </Link>
              <div className="deal_of_the_day_product_content">
                <div className="deal_of_the_day_product_content_header">
                  <h1>Deals Of the Day</h1>
                  <Link to="/deals-of-the-day">
                    <button
                      className="deal_of_the_day_product_view_more_btn"
                      type=""
                    >
                      View More
                    </button>
                  </Link>
                </div>
                <Slider {...settings}>
                  {dealOfDayProduct?.products?.map((product) => (
                    <div className="p-1">
                      <DealOfTheDayProductCard
                        key={product?.id}
                        product={product}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </SkeletonTheme>
      </div>
    </>
  );
};

export default DealOfTheDay;
