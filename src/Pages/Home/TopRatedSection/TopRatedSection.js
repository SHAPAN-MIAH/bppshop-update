import React, { useEffect, useState } from "react";
import img from "../../../Assets/Images/bppshop_banner/discountProduct (1).jpg";
import img2 from "../../../Assets/Images/bppshop_banner/discountProduct (2).jpg";
// import "./DealOfTheDay.css";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import AllProductsCard from "../../AllProducts/AllProductsCard";
import Slider from "react-slick";

const DiscountProductSection = () => {
  const [dealOfDayProduct, setDealOfDayProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/top-rated?limit=${16}&offset=${1}`)
      .then((response) => {
        response && setLoading(false);
        setDealOfDayProduct(response.data.products);
      });
  }, []);

  const settings = {
    // dots: true,
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
      }
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
          width: "20px",
          height: "25px",
          borderRadius: "50px",
          left: "15px",
          zIndex: "1",
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
          ) : (
            <div className="deal_of_the_day_content_container">
              {/* <div className="col-md-2"> */}
              <div className="deal_of_the_day_banner">
                <img src={img} alt="" />
              </div>
              {/* </div> */}
              {/* <div className="col-md-10"> */}
              <div className="deal_of_the_day_product_content">
                <div className="deal_of_the_day_product_content_header">
                  <h4> Top Rated</h4>
                  <button
                    className="deal_of_the_day_product_view_more_btn"
                    type=""
                  >
                    View More
                  </button>
                </div>
                <Slider {...settings}>
                  {dealOfDayProduct?.map((product) => (
                    <div className="p-1">
                      <AllProductsCard key={product?.id} product={product} />
                    </div>
                  ))}
                </Slider>
              </div>
              {/* </div> */}
            </div>
          )}
        </SkeletonTheme>
      </div>
    </>
  );
};

export default DiscountProductSection;
