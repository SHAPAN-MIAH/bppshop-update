import React, { useEffect, useState } from "react";
import axios from "axios";
import { bannerBaseUrl, baseUrl } from "../../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import TopRatedProductCard from "../../Cards/TopRatedProductCard/TopRatedProductCard";
import { useSelector } from "react-redux";

const TopRatedSection = () => {
  const [dealOfDayProduct, setDealOfDayProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const topRatedBannerImg = useSelector((state)=>state?.banners?.banners?.banners?.find(
    (item) => item?.type === "top_rated"
  ))

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

   //onclick place order go to top of the page
   const nextPageScrollOnTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };


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
            <div className="top_rated_product_container deal_of_the_day_content_container">
              <Link to="/top-rated">
                <div className="top_rated_banner deal_of_the_day_banner" onClick={nextPageScrollOnTop}>
                  <img  src={`${bannerBaseUrl}/${topRatedBannerImg?.value}`} alt="" />
                </div>
              </Link>
              <div className="top_rated_product_content deal_of_the_day_product_content">
                <div className="top_rated_product_content_header deal_of_the_day_product_content_header">
                  <h1> Top Rated</h1>
                  <Link to="/top-rated">
                    <button
                      className="deal_of_the_day_product_view_more_btn"
                      type=""
                      onClick={nextPageScrollOnTop}
                    >
                      View More
                    </button>
                  </Link>
                </div>
                <Slider {...settings}>
                  {dealOfDayProduct?.map((product) => (
                    <div className="p-1">
                      <TopRatedProductCard
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

export default TopRatedSection;
