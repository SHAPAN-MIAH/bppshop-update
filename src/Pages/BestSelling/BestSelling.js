import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRef } from "react";
import BestSellingProductCard from "./BestSellingProductCard";

const BestSelling = () => {
  const [bestSellingProduct, setBestSellingProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    let limit = 100;
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/products/best-sellings?limit=${limit}&offset=${currPage}`
      );
      response && setLoading(false);
      if (!response.data.products.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setBestSellingProduct([...bestSellingProduct, ...response.data.products]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, bestSellingProduct]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <>
      <div className="best_selling_container">
        <h4>Best Selling Products:</h4>
        <div
          onScroll={onScroll}
          ref={listInnerRef}
          style={{ height: "70vh", overflowY: "auto" }}
          className="product-container mt-4"
        >
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
              bestSellingProduct?.map((product) => (
                <BestSellingProductCard key={product?.id} product={product} />
              ))
            )}
          </SkeletonTheme>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default BestSelling;
