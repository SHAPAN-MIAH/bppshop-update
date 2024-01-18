import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../SellerStore.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import downArrow from "../../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif";
import coverImg from "../../../Assets/Images/pexels-evie-shaffer-2512282.jpg";

const AllSellerStore = () => {
  const [allSellerStore, setAllSellerStore] = useState([]);
  const [loading, setLoading] = useState(true);
  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

  // useEffect(() => {
  //   let limit = 30;
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/seller/all?limit=${limit}&offset=${currPage}`
  //     );
  //     response && setLoading(false);
  //     if (!response?.data?.data?.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setAllSellerStore([...allSellerStore, ...response?.data?.data]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [currPage, lastList, prevPage, allSellerStore]);

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
      .get(`${baseUrl}/seller/all?limit=${30}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setAllSellerStore([...allSellerStore, ...response?.data?.data]);
        setHasMore(response?.data?.data.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const SellerNameSave = (sellerName) => {
    localStorage.setItem("sellerName", sellerName);
  };

  return (
    <>
      <h3 className="my-3">All Seller Store:</h3>
      {/* <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
        className="all-seller-store-container mt-4 pb-5"
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
            </>
          ) : (
            allSellerStore &&
            allSellerStore?.map((sellerStore) => (
              <Link
                key={sellerStore?.id}
                to={`/sellers-store/${sellerStore?.seller_id}`}
                onClick={(e) => {SellerNameSave(sellerStore?.name)}}
              >
                <div className="seller-store-content">
                  <div className="seller-store-banner">
                    <img
                      src={`https://backend.bppshop.com.bd/storage/shop/banner/${sellerStore?.banner}`}
                      alt=""
                    />

                    <div className="seller-store-profile-container">
                      <div className="seller-profile-image">
                        <img
                          src={`https://backend.bppshop.com.bd/storage/shop/${sellerStore?.image}`}
                          alt=""
                        />
                      </div>
                      <p className="sellerName">{sellerStore?.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </SkeletonTheme>
      </div> */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            Seller Store
          </li>
        </ol>
      </nav>
      <InfiniteScroll
        dataLength={allSellerStore?.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <h4 style={{ textAlign: "center", padding: "10px 0px" }}>
            <img width={60} src={downArrow} alt="" />
          </h4>
        }
      >
        <div className="all-seller-store-container mt-2 ">
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
              allSellerStore &&
              allSellerStore?.map((sellerStore) => (
                <Link
                  key={sellerStore?.id}
                  to={`/sellers-store/${sellerStore?.seller_id}`}
                  onClick={(e) => {
                    SellerNameSave(sellerStore?.name);
                  }}
                >
                  <div className="seller_store_content">
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
      </InfiniteScroll>
    </>
  );
};

export default AllSellerStore;
