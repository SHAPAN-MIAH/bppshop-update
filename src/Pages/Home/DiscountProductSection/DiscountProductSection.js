




import React, { useEffect, useState } from "react";
import img from "../../../Assets/Images/dealoftheday.png";
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
      .get(`${baseUrl}/products/discounted-product?limit=${15}&offset=${1}`)
      .then((response) => {
        response && setLoading(false);
        setDealOfDayProduct(response.data.products);
      });
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          width: "27px",
          height: "27px",
          borderRadius: "50px",
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
          background: "gray",
          width: "27px",
          height: "27px",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <div className="deal_of_the_day_container">
        <div className="row">
          <div className="col-md-2">
            <div className="deal_of_the_day_banner">
              <img src={img} alt="" />
            </div>
          </div>
          <div className="col-md-10">
            <div className="deal_of_the_day_product_content">
              <div className="deal_of_the_day_product_content_header">
                <h4>Discount Product</h4>
                <button className="deal_of_the_day_product_view_more_btn" type="">View More</button>
              </div>
              <Slider {...settings}>
                {dealOfDayProduct?.map((product) => (
                  <div className="p-2">
                    <AllProductsCard key={product?.id} product={product} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountProductSection;
