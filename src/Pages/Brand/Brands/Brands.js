import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../../BaseUrl/BaseUrl";
import "./Brands.css";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import downArrow from "../../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif";
import defaultImg from "../../../Assets/Images/noImg-default.png";

const Brands = () => {
  //onscrool paginations
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

  // useEffect(() => {
  //   let limit = 15;
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/brands?limit=${limit}&offset=${currPage}`
  //     );
  //     response && setLoading(false);
  //     if (!response?.data?.data?.data?.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setBrands([...brands, ...response?.data?.data?.data]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [currPage, lastList, prevPage, brands]);

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
      .get(`${baseUrl}/brands?limit=${30}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setBrands([...brands, ...response?.data?.data?.data]);
        setHasMore(response?.data?.data?.data?.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const brandNameSave = (brandName) => {
    localStorage.setItem("brandName", brandName);
  };

  return (
    <>
      <h4>Brands:</h4>
      <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Brands
              </li>
            </ol>
          </nav>
      <InfiniteScroll
        dataLength={brands?.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <h4 style={{ textAlign: "center", padding: "10px 0px" }}>
            <img width={60} src={downArrow} alt="" />
          </h4>
        }
      >
        <div className="brand_container mt-3">
          <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
            {loading ? (
              <>
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
                <Skeleton height="250px" borderRadius="10px" count={1} />
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
                  <div className="brand_content">
                    {brand.image == "def.png" ? (
                      <img width={260} src={defaultImg} alt="" />
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
      </InfiniteScroll>
      {/* <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "70vh", overflowY: "auto" }}
        className="brand_container mt-4 pb-5"
      >
        <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
          {loading ? (
            <>
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
              <Skeleton height="250px" borderRadius="10px" count={1} />
            </>
          ) : (
            brands &&
            brands?.map((brand, index) => (
              <Link key={brand?.id} to={`/brands/${brand?.id}`}
              onClick={(e) => {brandNameSave(brand.name)}}
              >
                <div className="brand_content">
                  <img
                    src={`https://backend.bppshop.com.bd/storage/brand/${brand?.image}`}
                    alt=""
                  />
                  <p>{brand?.name}</p>
                </div>
              </Link>
            ))
          )}
        </SkeletonTheme>
      </div> */}
    </>
  );
};

export default Brands;
