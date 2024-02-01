import React from "react";
import adBanner from "../../../Assets/Images/brandBanner.png";
import "./BrandSection.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { bannerBaseUrl, baseUrl } from "../../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import defaultImg from "../../../Assets/Images/noImg-default.png";
import { useSelector } from "react-redux";

const BrandSection = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const { banners } = useSelector((state) => state?.banners);

  // console.log(banners.sliders);
  const homeBannerOneImg = banners?.banners?.find(
    (item) => item?.type === "home_banner_one"
  );
  // console.log(homeBannerOneImg);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${baseUrl}/brands?limit=${12}&offset=${1}`)
      .then((response) => {
        response && setLoading(false);
        setBrands(response?.data?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const brandNameSave = (brandName) => {
    localStorage.setItem("brandName", brandName);
  };

  return (
    <div className="brand_section">
      <div className="brand_section_container">
        <Link to="/brands">
          <div className="brand_section_ad_banner ">
            <img src={`${bannerBaseUrl}/${homeBannerOneImg?.value}`} alt="" />
          </div>
        </Link>
        <br />

        <div className="brand_section_content_container_header">
          <h1>Brands</h1>
          <Link to="/brands">
            <button className="brand_section_content_view_more_btn" type="">
              View More
            </button>
          </Link>
        </div>
        <div className="brand_section_content_container mt-2">
          <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
            {loading ? (
              <>
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
                <Skeleton height="150px" borderRadius="10px" count={1} />
              </>
            ) : (
              brands &&
              brands?.map((brand, index) => (
                <Link
                  key={brand?.id}
                  to={`/brands/${brand?.slug}`}
                  onClick={(e) => {
                    brandNameSave(brand.name);
                  }}
                >
                  <div className="brand_section_content pt-3">
                    {brand.image == "def.png" ? (
                      <img src={defaultImg} alt="" />
                    ) : (
                      <img
                        src={`https://backend.bppshop.com.bd/storage/brand/${brand?.image}`}
                        alt=""
                      />
                    )}
                    <p>{brand?.name}</p>
                  </div>
                </Link>
              ))
            )}
          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
