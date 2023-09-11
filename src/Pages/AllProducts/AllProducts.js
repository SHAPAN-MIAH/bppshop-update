import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRef } from "react";
import AllProductsCard from "./AllProductsCard";

const AllProducts = () => {
    const [newArrivalProduct, setNewArrivalProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    let limit = 15;
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/products/latest?limit=${limit}&offset=${currPage}`
      );
      // console.log(response);
      response && setLoading(false);
      if (!response.data.products.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setNewArrivalProduct([...newArrivalProduct, ...response.data.products]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, newArrivalProduct]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight == scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <>
      <div className="newArrival_container">
        <h4>All Products:</h4>
        <div
          onScroll={onScroll}
          ref={listInnerRef}
          style={{ height: "100vh", overflowY: "auto" }}
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
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
              </>
            ) : (
              newArrivalProduct?.map((product) => (
                <AllProductsCard key={product?.id} product={product} />
              ))
            )}
          </SkeletonTheme>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
