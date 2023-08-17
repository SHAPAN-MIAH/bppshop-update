import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRef } from "react";
import TopRatedProductCard from "./TopRatedProductCard";

const TopRated = () => {
  const [topRatedProduct, setTopRatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    let limit = 100;
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/products/top-rated?limit=${limit}&offset=${currPage}`
      );
      // console.log(response);
      response && setLoading(false);
      if (!response.data.products.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setTopRatedProduct([...topRatedProduct, ...response.data.products]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, topRatedProduct]);

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
      <div className="newArrival_container">
        <h4>Top Rated Products:</h4>
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
              topRatedProduct?.map((product) => (
                <TopRatedProductCard key={product?.id} product={product} />
              ))
            )}
          </SkeletonTheme>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default TopRated;
