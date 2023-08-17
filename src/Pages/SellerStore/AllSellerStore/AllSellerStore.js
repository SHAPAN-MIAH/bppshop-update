import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../SellerStore.css";
import { Link } from "react-router-dom";

const AllSellerStore = () => {
  const [allSellerStore, setAllSellerStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    let limit = 30;
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/seller/all?limit=${limit}&offset=${currPage}`
      );
      // console.log(response.data.data);
      response && setLoading(false);
      if (!response?.data?.data?.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setAllSellerStore([...allSellerStore, ...response?.data?.data]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, allSellerStore]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  const SellerNameSave = (sellerName) => {
    localStorage.setItem("sellerName", sellerName)
  };

  return (
    <>
      <h4>All Seller Store:</h4>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "70vh", overflowY: "auto" }}
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
            </>
          ) : (
            allSellerStore &&
            allSellerStore.map((sellerStore) => (
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
      </div>
    </>
  );
};

export default AllSellerStore;
