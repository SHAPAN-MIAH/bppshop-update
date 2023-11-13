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
  };

  return (
    <>
      <div className="header_showcase_section">
        <div className="header_showcase_section_container">
          <div className="row">
            <div className="col-md-3">
              {/* <div className="header_showcase_section_sidebar"></div> */}
              <div className="sidebar_container">
                <Sidebar />
              </div>
            </div>
            <div className="col-md-9">
              <div className="header_showcase_section_banner">
                <Slider {...settings}>
                  <img height={450} src={banner1} alt="" />
                  <img height={450} src={banner2} alt="" />
                  <img height={450} src={banner3} alt="" />
                  <img height={450} src={banner4} alt="" />
                  <img height={450} src={banner5} alt="" />
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderShowcaseSection;
