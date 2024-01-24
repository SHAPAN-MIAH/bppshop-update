



import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import downArrow from "../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif";
// import DealOfTheDayProductCard from "./DealOfTheDayProductCard";
import { Link } from "react-router-dom";
import DealOfTheDayProductCard from "../DealOfTheDay/DealOfTheDayProductCard";
import HotDealsProductCard from "./HotDealsProductCard";

const HotDeals = () => {
  const [dealOfDayProduct, setDealOfDayProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${baseUrl}/flash-deals/products?limit=${5}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setDealOfDayProduct([...dealOfDayProduct, ...response?.data?.products]);
        setHasMore(response?.data?.products.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="deal_of_the_day_page_container">
        <div className="discountProduct_container">
          <h1>Hot Deals:</h1>
          <div className="discountProduct_container_header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                Hot Deals
                </li>
              </ol>
            </nav>

            <select>
              <option value="none" selected disabled hidden>
                Filter
              </option>
              <option value="">Lowest Price</option>
              <option value="">Highest Price</option>
            </select>
          </div>
          <InfiniteScroll
            dataLength={dealOfDayProduct?.length}
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
                  dealOfDayProduct?.map((product) => (
                    <HotDealsProductCard
                      key={product?.id}
                      product={product}
                    />
                  ))
                )}
              </SkeletonTheme>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default HotDeals;
