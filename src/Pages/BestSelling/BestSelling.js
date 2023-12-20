import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRef } from "react";
import BestSellingProductCard from "./BestSellingProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import downArrow from "../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif"

const BestSelling = () => {
  const [bestSellingProduct, setBestSellingProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

  // useEffect(() => {
  //   let limit = 15;
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/products/best-sellings?limit=${limit}&offset=${currPage}`
  //     );
  //     response && setLoading(false);
  //     if (!response.data.products.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setBestSellingProduct([...bestSellingProduct, ...response.data.products]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [currPage, lastList, prevPage, bestSellingProduct]);

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight == scrollHeight) {
  //       setCurrPage(currPage + 1);
  //     }
  //   }
  // };

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${baseUrl}/products/best-sellings?limit=${25}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setBestSellingProduct([
          ...bestSellingProduct,
          ...response?.data?.products,
        ]);
        setHasMore(response?.data?.products.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="best_selling_container">
        <h4>Best Selling Products:</h4>
        <InfiniteScroll
          dataLength={bestSellingProduct?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <h4 style={{ textAlign: "center", padding: "10px 0px" }}>
              <img width={60} src={downArrow} alt=""/>
            </h4>
          }
        >
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
                </>
              ) : (
                bestSellingProduct?.map((product) => (
                  <BestSellingProductCard key={product?.id} product={product} />
                ))
              )}
            </SkeletonTheme>
          </div>
        </InfiniteScroll>
        {/* <div
          onScroll={onScroll}
          ref={listInnerRef}
          style={{ height: "100vh", overflowY: "auto" }}
          className="product-container mt-4"
        >
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
              </>
            ) : (
              bestSellingProduct?.map((product) => (
                <BestSellingProductCard key={product?.id} product={product} />
              ))
            )}
          </SkeletonTheme>
        </div> */}
      </div>
    </>
  );
};

export default BestSelling;
