import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../../BaseUrl/BaseUrl";
import "./Brands.css";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRef } from "react";

const Brands = () => {
  // const [brands, setBrands] = useState([]);
  // const [loading, setLoading] = useState(true);
  // console.log(brands);

  // useEffect(() => {
  //   axios.get(`${baseUrl}/brands?limit=50&offset=1`)
  //   .then((res) => setBrands(res?.data?.data?.data));
  //   setLoading(false)

  // }, []);

  //onscrool paginations
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    let limit = 100;
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/brands?limit=${limit}&offset=${currPage}`
      );
      // console.log(response.data.data.data);
      response && setLoading(false);
      if (!response?.data?.data?.data?.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setBrands([...brands, ...response?.data?.data?.data]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, brands]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  const brandNameSave = (brandName) => {
    localStorage.setItem("brandName", brandName)
  };

  return (
    <>
      <h4>Brands:</h4>
      <div
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
      </div>
    </>
  );
};

export default Brands;
