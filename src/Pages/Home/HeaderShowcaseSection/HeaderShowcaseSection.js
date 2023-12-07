import React from "react";
import Sidebar from "../../../Components/SharedComponents/Sidebar/Sidebar";
import Slider from "react-slick";
import banner1 from "../../../Assets/Images/online-shopping-banner-1.jpg";
import banner2 from "../../../Assets/Images/online-shopping-banner2.jpg";
import banner3 from "../../../Assets/Images/horizontal-sale-banner3.jpg";
import banner4 from "../../../Assets/Images/gradient-social-media-sale banner4.jpg";
import banner5 from "../../../Assets/Images/horizontal-sale-banner5.jpg";
import "./HeaderShowcaseSection.css";

const HeaderShowcaseSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
          right: "18px"
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
          zIndex: "1"
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <div className="header_showcase_section">
        <div className="header_showcase_section_container">
              <div className="sidebar_container">
                <Sidebar />
              </div>
              <div className="header_showcase_section_banner">
                <Slider {...settings}>
                  <img height={400} src={banner1} alt="" />
                  <img height={400} src={banner2} alt="" />
                  <img height={400} src={banner3} alt="" />
                  <img height={400} src={banner4} alt="" />
                  <img height={400} src={banner5} alt="" />
                </Slider>
              </div>
        </div>
      </div>
    </>
  );
};

export default HeaderShowcaseSection;
