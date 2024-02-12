import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import HotDealsProductCard from "../../Cards/HotDealsProductCard/HotDealsProductCard";
import Timer from "../../SharedComponents/Timer/Timer";
import moment from "moment";

const HotDealsSection = () => {
  const [hotDeals, SetHotDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeoutMsgVisible, setTimeoutMsgVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/flash-deals/products?limit=${6}&offset=${1}`)
      .then((response) => {
        setLoading(false);
        SetHotDeals(response?.data);
      });
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

  // const startTime = "2024-01-20T24:00:00.000000Z";
  // const end = "2024-02-24T20:00:00.000000Z";

  const now = moment();
  const end = moment(hotDeals?.hot_deals?.end_date);
  const duration = moment.duration(end.diff(now));

  // console.log(duration._data.seconds);
  // console.log(hotDeals?.hot_deals?.end_date);
  // console.log(timeoutMsgVisible);

  return (
    <>
      {!timeoutMsgVisible && (
        <div className="deal_of_the_day_container">
          {/* <SkeletonTheme
            baseColor="rgb(220, 220, 220)"
            highlightColor="#e3e3e3"
          >
            {loading ? (
              <div className=" d-flex">
                <Skeleton
                  height="335px"
                  width="250px"
                  borderRadius="10px"
                  count={1}
                />
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
                  <div className="d-flex justify-content-between">
                    <Skeleton
                      height="280px"
                      width="200px"
                      style={{ marginTop: "15px" }}
                      borderRadius="10px"
                      count={1}
                    />
                    <Skeleton
                      height="280px"
                      width="200px"
                      style={{ marginTop: "15px", marginLeft: "12px" }}
                      borderRadius="10px"
                      count={1}
                    />
                    <Skeleton
                      height="280px"
                      width="200px"
                      style={{ marginTop: "15px", marginLeft: "12px" }}
                      borderRadius="10px"
                      count={1}
                    />
                    <Skeleton
                      height="280px"
                      width="200px"
                      style={{ marginTop: "15px", marginLeft: "12px" }}
                      borderRadius="10px"
                      count={1}
                    />
                    <Skeleton
                      height="280px"
                      width="200px"
                      style={{ marginTop: "15px", marginLeft: "12px" }}
                      borderRadius="10px"
                      count={1}
                    />
                  </div>
                </div>
              </div>
            ) : ( */}
              <div className="deal_of_the_day_content_container">
                <Link to="/hot-deals">
                  <div className="deal_of_the_day_banner">
                    {
                      <img
                        className="img1"
                        src={`https://backend.bppshop.com.bd/storage/deal/${hotDeals?.hot_deals?.banner}`}
                        alt=""
                      />
                    }
                  </div>
                </Link>
                <div className="deal_of_the_day_product_content">
                  <div className="deal_of_the_day_product_content_header">
                    <h4>Hot Deals</h4>
                    <div className="d-flex">
                      <Timer
                        endTime={end}
                        setTimeoutMsgVisible={setTimeoutMsgVisible}
                      />
                      <Link to="/hot-deals">
                        <button
                          className="deal_of_the_day_product_view_more_btn"
                          type=""
                        >
                          View More
                        </button>
                      </Link>
                    </div>
                  </div>
                  <Slider {...settings}>
                    {hotDeals?.products?.map((product) => (
                      <div className="p-1">
                        <HotDealsProductCard
                          key={product?.id}
                          product={product}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            {/* )} */}
          {/* </SkeletonTheme> */}
        </div>
      )}
    </>
  );
};

export default HotDealsSection;
