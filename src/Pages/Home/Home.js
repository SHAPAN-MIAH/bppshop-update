import React from "react";
import "./Home.css";
import Category from "./../CategoryPage/Category/Category";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import DealOfTheDay from "./DealOfTheDaySection/DealOfTheDay";
import NewArrivalSection from "./NewArrivalSection/NewArrivalSection";
import HeaderShowcaseSection from "./HeaderShowcaseSection/HeaderShowcaseSection";
import BestSellingSection from "./BestSellingSection/BestSellingSection";
import DiscountProductSection from "./DiscountProductSection/DiscountProductSection";
import TopRatedSection from "./TopRatedSection/TopRatedSection";

const Home = () => {
  const allCategories = useSelector((state) => state.allCategories.categories.data);
  const loading = useSelector((state) => state.allCategories.loading);

  return (
    <>
      <div className="home_container">
        <MetaData title="BPPShop" description=""/>
        <HeaderShowcaseSection/>
        <DealOfTheDay/>
        <Category allCategory={allCategories} loading={loading}/>
        <NewArrivalSection/>
        <BestSellingSection/>
        <TopRatedSection/>
        <DiscountProductSection/>
      </div>
    </>
  );
};

export default Home;
