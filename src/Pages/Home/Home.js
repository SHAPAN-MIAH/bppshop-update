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
import BrandSection from "./BrandSection/BrandSection";
import StoreSection from "./StoreSection/StoreSection";
import OfferBrandingSection from "./OfferBrandingSection/OfferBrandingSection";
import AppBrandingSection from "./AppBrandingSection/AppBrandingSection";
import AllProductSection from "./AllProductSection/AllProductSection";

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
        <BrandSection/>
        <BestSellingSection/>
        <StoreSection/>
        <TopRatedSection/>
        <OfferBrandingSection/>
        <DiscountProductSection/>
        <AppBrandingSection/>
        <AllProductSection/>
      </div>
    </>
  );
};

export default Home;
