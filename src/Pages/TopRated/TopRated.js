import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRef } from "react";
import TopRatedProductCard from "../../Components/Cards/TopRatedProductCard/TopRatedProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import downArrow from "../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif";
import './TopRated.css'
import { Link } from "react-router-dom";

const TopRated = () => {
  const [topRatedProduct, setTopRatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

  // useEffect(() => {
  //   let limit = 15;
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/products/top-rated?limit=${limit}&offset=${currPage}`
  //     );
  //     // console.log(response);
  //     response && setLoading(false);
  //     if (!response.data.products.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setTopRatedProduct([...topRatedProduct, ...response.data.products]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [currPage, lastList, prevPage, topRatedProduct]);

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
      .get(`${baseUrl}/products/top-rated?limit=${25}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setTopRatedProduct([...topRatedProduct, ...response?.data?.products]);
        setHasMore(response?.data?.products.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="top_rated_container">
          <h1>Top Rated Products:</h1>
        <div className="top_rated_container_header">
          <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Top Rated Products
            </li>
          </ol>
        </nav>
          <select>
            <option value="none" selected disabled hidden>
              Filter
            </option>
            <option value="">Lowest Price</option>
            <option value="">Highest Price</option>
            {/* <option value=""> Price</option> */}
          </select>
        </div>

        <InfiniteScroll
          dataLength={topRatedProduct?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <h4 style={{ textAlign: "center", padding: "10px 0px" }}>
              <img width={60} src={downArrow} alt="" />
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
                topRatedProduct?.map((product) => (
                  <TopRatedProductCard key={product?.id} product={product} />
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
              topRatedProduct?.map((product) => (
                <TopRatedProductCard key={product?.id} product={product} />
              ))
            )}
          </SkeletonTheme>
        </div> */}
      </div>
    </>
  );
};

export default TopRated;
