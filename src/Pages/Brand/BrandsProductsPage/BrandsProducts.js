import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl, imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import { Link, useParams } from "react-router-dom";
import "./BrandsProducts.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import BrandsProductsCard from "../../../Components/Cards/BrandProductCard/BrandsProductsCard";
import InfiniteScroll from "react-infinite-scroll-component";
import downArrow from "../../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif"

const BrandsProducts = () => {
  const { brandId } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const brandName = localStorage.getItem("brandName");
  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

  // useEffect(() => {
  //   let limit = 15;
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/brands/products/${brandId}?limit=${limit}&offset=${currPage}`
  //     );
  //     response && setLoading(false);
  //     if (!response.data.data.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setBrandProducts([...brandProducts, ...response.data.data]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [brandId, currPage, lastList, prevPage, brandProducts]);

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
      .get(`${baseUrl}/brands/products/${brandId}?limit=${15}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setBrandProducts([...brandProducts, ...response?.data?.data]);
        setHasMore(response?.data?.data.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  
  return (
    <>
      <h4>{brandName} Products :</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/">Home </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/brands">Brands </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {brandName}
          </li>
        </ol>
      </nav>
      <InfiniteScroll
        dataLength={brandProducts?.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <h4 style={{ textAlign: "center", padding: "10px 0px" }}>
            <img width={60} src={downArrow} alt=""/>
          </h4>
        }
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
              brandProducts?.map((product) => (
                <BrandsProductsCard key={product?.id} product={product} />
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
            brandProducts?.map((product) => (
              <BrandsProductsCard key={product?.id} product={product} />
            ))
          )}
        </SkeletonTheme>
      </div> */}
    </>
  );
};

export default BrandsProducts;
