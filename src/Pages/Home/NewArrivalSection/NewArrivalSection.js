import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import NewArrivalSectionProductCard from "./NewArrivalSectionProductCard";
import "./NewArrivalSection.css";
import Slider from "react-slick";
import newArrivalBanner from "../../../Assets/Images/newArrivalBanner.jpg";
import { Link } from "react-router-dom";

const NewArrivalSection = () => {
  const [newArrivalProduct, setNewArrivalProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/latest?limit=${15}&offset=${1}`)
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
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <div className="new_arrival_section">
        <div className="new_arrival_section_container">
          <div className="row">
            <div className="col-md-3">
              <div className="new_arrival_banner">
                <img src={newArrivalBanner} alt="" />
              </div>
            </div>
            <div className="col-md-9">
              <div>
                <div className="new_arrival_section_product_content_header">
                  <h4>New Arrival</h4>
                  <Link to="/new-arrival">
                    <button
                      className="new_arrival_section_product_view_more_btn"
                      type=""
                    >
                      View More
                    </button>
                  </Link>
                </div>
                <Slider {...settings}>
                  {newArrivalProduct?.map((product) => (
                    <div className="new_arrival_section_product_content p-2">
                      <NewArrivalSectionProductCard
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
      </div>
    </>
  );
};

export default NewArrivalSection;
