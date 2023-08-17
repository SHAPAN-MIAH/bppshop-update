import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl, imgThumbnailBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { Link, useParams } from "react-router-dom";
import "./BrandsProducts.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import BrandsProductsCard from "../BrandsProductsCard";

const BrandsProducts = () => {
  const { brandId } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const brandName =  localStorage.getItem("brandName")

  useEffect(() => {
    axios
      .get(`${baseUrl}/brands/products/${brandId}`)
      .then((res) => setBrandProducts(res?.data.data));
    setLoading(false);
  }, [brandId]);

  return (
    <>
      <h4>{brandName} Products :</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/brands">Brands </Link>
          </li>
         
          <li className="breadcrumb-item active" aria-current="page">
          {brandName}
          </li>
        </ol>
      </nav>
      <div className="product-container mt-4">
        {/* <div className="product-content"> */}
        <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
          {loading ? (
            <>
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
            </>
          ) : (
            brandProducts.map((product) => (
              <BrandsProductsCard key={product?.id} product={product}/>
            ))
          )}
        </SkeletonTheme>
        {/* </div> */}
      </div>
    </>
  );
};

export default BrandsProducts;
