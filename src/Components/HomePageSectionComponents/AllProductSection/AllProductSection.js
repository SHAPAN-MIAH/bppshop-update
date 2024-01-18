import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import AllProductsCard from "../../../Pages/AllProducts/AllProductsCard";
import "./AllProductSection.css";

const AllProductSection = () => {
  const [updateAllProduct, setUpdateAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = () => {
    axios
      .get(`${baseUrl}/products/top?limit=${24}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setUpdateAllProduct([...updateAllProduct, ...response.data.products]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handelViewMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <div className="all_product_section mt-4">
      <h4>Recommend for You</h4>

      <div className="product-container mt-3">
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
            updateAllProduct?.map((product) => (
              <AllProductsCard key={product?.id} product={product} />
            ))
          )}
        </SkeletonTheme>
      </div>
      <div className="all_product_section_viewMore_btn">
        <button onClick={(e) => handelViewMoreClick()} type="">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          View More Product
        </button>
      </div>
    </div>
  );
};

export default AllProductSection;
