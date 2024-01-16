import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/SharedComponents/Sidebar/Sidebar";
import Slider from "react-slick";
import "./HeaderShowcaseSection.css";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";

const HeaderShowcaseSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  function NextArrow(props) {
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
          right: "18px",
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
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
          zIndex: "1",
        }}
        onClick={onClick}
      />
    );
  }

  const [sliderBanners, setSliderBanners] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/banners?type=sliders_for_web`).then((response) => {
      setSliderBanners(response.data.sliders);
    });
  }, []);

  return (
    <>
      <div className="header_showcase_section">
        <div className="header_showcase_section_container">
          <div className="sidebar_container">
            <Sidebar />
          </div>
          <div className="header_showcase_section_banner">
            <Slider {...settings} className="slider">
              {sliderBanners?.map((banner) => (
                <img
                  src={`https://backend.bppshop.com.bd/storage/slider/${banner}`}
                  alt="slider"
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderShowcaseSection;
