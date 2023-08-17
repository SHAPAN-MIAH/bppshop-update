import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { baseUrl, imgBaseUrl } from "./../../BaseUrl/BaseUrl";
import { useState } from "react";
import flashSaleBanner from "../../Assets/Images/240_F_342685784_OHinE4QiI2utIQYlzT8p8Bzv1jL4D1dS.jpg";
import { useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import FlashSaleProductCard from "./FlashSaleProductCard";
import './FlashSale.css'

const FlashSale = () => {
  const [flashDealsData, setFlashDealsData] = useState({});
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const listInnerRef = useRef();
  const [loading, setLoading] = useState(true);

  // console.log(flashDealsData);
  // console.log(flashProducts);

  useEffect(() => {
    axios
      .get(`${baseUrl}/flash-deals`)
      .then((res) => setFlashDealsData(res.data));
    axios
      .get(`${baseUrl}/flash-deals/products/${flashDealsData.id}`)
      .then((res) => {
        setFlashSaleProducts(res.data);
        setLoading(false);
      });
  }, [flashDealsData.id]);

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       setCurrPage(currPage + 1);
  //     }
  //   }
  // };
  // const [timerDays, setTimerDays] = useState("00");
  // const [timerHours, setTimerHours] = useState("00");
  // const [timerMinutes, setTimerMinutes] = useState("00");
  // const [timerSeconds, setTimerSeconds] = useState("00");

  // let interval = useRef();

  // const startTimer = () => {
  //   const countdowndate = new Date("May 30, 2020 00:00:00").getTime();
  //   interval = setInterval(() => {
  //     const now = new Date().getTime();
  //     const distance = countdowndate - now;
  //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     if (distance < 0) {
  //       clearInterval(interval.current);
  //     } else {
  //       setTimerDays(days);
  //       setTimerHours(hours);
  //       setTimerMinutes(minutes);
  //       setTimerSeconds(seconds);
  //     }
  //   }, 1000);
  // };

  // const cleareInt = interval.current;

  // useEffect(() => {
  //   startTimer();
  //   return () => {
  //     clearInterval(interval.current);
  //   };
  // }, []);

  // console.log(flashDealsData.banner)
  return (
    <div className="flash_sale_container">
      <h4>Flash Sale Products:</h4>
      <br/>
      {/* <h4>Flash sale coming soon...............</h4> */}

      <img src={flashSaleBanner} alt="" />
      {/* <img src={imgBaseUrl + `/${flashDealsData.banner}`} alt="" /> */}
      {/* <div className="">
        <span className="mx-2">Days:{timerDays}</span>
        <span className="mx-2">Hours:{timerHours}</span>
        <span className="mx-2">Minutes:{timerMinutes}</span>
        <span className="mx-2">Seconds:{timerSeconds}</span>
      </div> */}

      <div
        // onScroll={onScroll}
        // ref={listInnerRef}
        // style={{ height: "100vh", overflowY: "auto" }}
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
            </>
          ) : (
            flashSaleProducts.map((product) => (
              <FlashSaleProductCard key={product?.id} product={product} />
            ))
          )}
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default FlashSale;
