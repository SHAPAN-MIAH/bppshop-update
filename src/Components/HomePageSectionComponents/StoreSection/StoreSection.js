import React from "react";
import adBanner from "../../../Assets/Images/8487798 2 (1).png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import defaultImg from "../../../Assets/Images/noImg-default.png";
import "./StoreSection.css";
import coverImg from "../../../Assets/Images/pexels-evie-shaffer-2512282.jpg";

const StoreSection = () => {
  const [allSellerStore, setAllSellerStore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${baseUrl}/seller/all?limit=${12}&offset=${1}`)
      .then((response) => {
        response && setLoading(false);
        setAllSellerStore(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const SellerNameSave = (sellerName) => {
    localStorage.setItem("sellerName", sellerName);
  };

  return (
    <div className="store_section ">
      <div className="brand_section_container">
        <div className="brand_section_ad_banner">
          <img src={adBanner} alt="" />
        </div>
        <br />

        <div className="brand_section_content_container_header">
          <h3>Store</h3>
          <Link to="/sellers-store">
            <button className="brand_section_content_view_more_btn" type="">
              View More
            </button>
          </Link>
        </div>
        <div className="store_section_content_container mt-2">
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
              allSellerStore &&
              allSellerStore?.map((sellerStore) => (
                <Link
                  key={sellerStore?.id}
                  to={`/sellers-store/${sellerStore?.seller_id}`}
                  onClick={(e) => {
                    SellerNameSave(sellerStore?.name);
                  }}
                >
                  <div className="seller_store_section_content">
                    {sellerStore?.banner == "def.png" ? (
                      <img src={coverImg} alt="" />
                    ) : (
                      <img
                        src={`https://backend.bppshop.com.bd/storage/shop/banner/${sellerStore?.banner}`}
                        alt=""
                      />
                    )}
                    <div className="seller_store_profile">
                      <img
                        src={`https://backend.bppshop.com.bd/storage/shop/${sellerStore?.image}`}
                        alt=""
                      />
                      <p className="seller_store_profile_name">
                        {sellerStore?.name}
                      </p>
                    </div>
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

export default StoreSection;
