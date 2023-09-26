import React, { useRef } from "react";
import "./SellerStoreProduct.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SellerStoreProductsCard from "../SellerStoreProductsCard";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import InfiniteScroll from "react-infinite-scroll-component";

const SellerStoreProduct = () => {
  const { sellerId } = useParams();
  const sellerName = localStorage.getItem("sellerName");
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

  // useEffect(() => {
  //   let limit = 15;
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/seller/${sellerId}/products?limit=${limit}&offset=${currPage}`
  //     );
  //     response && setLoading(false);
  //     if (!response?.data?.products?.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setSellerProducts([...sellerProducts, ...response?.data?.products]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [currPage, lastList, prevPage, sellerId, sellerProducts]);

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
      .get(`${baseUrl}/seller/${sellerId}/products?limit=${15}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setSellerProducts([...sellerProducts, ...response?.data?.products]);
        setHasMore(response?.data?.products.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <h4>{sellerName} Products :</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/sellers-store">Seller Store </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {sellerName}
          </li>
        </ol>
      </nav>

      
      {/* <div
        className="product-container mt-4"
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
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
            sellerProducts?.map((product) => (
              <SellerStoreProductsCard key={product?.id} product={product} />
            ))
          )}
        </SkeletonTheme>
      </div> */}
      <InfiniteScroll
        dataLength={sellerProducts?.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="product-container">
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
              sellerProducts?.map((product) => (
                <SellerStoreProductsCard key={product?.id} product={product} />
              ))
            )}
          </SkeletonTheme>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default SellerStoreProduct;
