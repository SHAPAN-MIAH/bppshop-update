import React from "react";
import "./Home.css";
import Category from "./../CategoryPage/Category/Category";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
// import DealOfTheDay from "./DealOfTheDaySection/DealOfTheDay";
// import NewArrivalSection from "./NewArrivalSection/NewArrivalSection";
// import HeaderShowcaseSection from "./HeaderShowcaseSection/HeaderShowcaseSection";
// import BestSellingSection from "./BestSellingSection/BestSellingSection";
// import DiscountProductSection from "./DiscountProductSection/DiscountProductSection";
// import TopRatedSection from "./TopRatedSection/TopRatedSection";
// import BrandSection from "./BrandSection/BrandSection";
// import StoreSection from "./StoreSection/StoreSection";
// import OfferBrandingSection from "./OfferBrandingSection/OfferBrandingSection";
// import AppBrandingSection from "./AppBrandingSection/AppBrandingSection";
// import AllProductSection from "./AllProductSection/AllProductSection";
// import LowestPriceProduct from "./LowestPriceProduct/LowestPriceProduct";
import HeaderShowcaseSection from "../../Components/HomePageSectionComponents/HeaderShowcaseSection/HeaderShowcaseSection";
import DealOfTheDay from "../../Components/HomePageSectionComponents/DealOfTheDaySection/DealOfTheDay";
import NewArrivalSectionProductCard from "../../Components/HomePageSectionComponents/NewArrivalSection/NewArrivalSectionProductCard";
import BrandSection from "../../Components/HomePageSectionComponents/BrandSection/BrandSection";
import BestSellingSection from "../../Components/HomePageSectionComponents/BestSellingSection/BestSellingSection";
import StoreSection from "../../Components/HomePageSectionComponents/StoreSection/StoreSection";
import DiscountProductSection from "../../Components/HomePageSectionComponents/TopRatedSection/TopRatedSection";
import OfferBrandingSection from "../../Components/HomePageSectionComponents/OfferBrandingSection/OfferBrandingSection";
import TopRatedSection from "../../Components/HomePageSectionComponents/DiscountProductSection/DiscountProductSection";
import AppBrandingSection from "../../Components/HomePageSectionComponents/AppBrandingSection/AppBrandingSection";
import AllProductSection from "../../Components/HomePageSectionComponents/AllProductSection/AllProductSection";
import NewArrivalSection from "../../Components/HomePageSectionComponents/NewArrivalSection/NewArrivalSection";
import HotDealsSection from "../../Components/HomePageSectionComponents/HotDealsSection/HotDealsSection";

const Home = () => {
  const allCategories = useSelector((state) => state.allCategories.categories.data);
  const loading = useSelector((state) => state.allCategories.loading);

  return (
    <>
      <div className="home_container">
        <MetaData title="BPPShop" description=""/>
        <HeaderShowcaseSection/>
        <HotDealsSection/>
        <Category allCategory={allCategories} loading={loading}/>
        <DealOfTheDay/>
        <NewArrivalSection/>
        <BrandSection/>
        <BestSellingSection/>
        <StoreSection/>
        <DiscountProductSection/>
        <OfferBrandingSection/>
        <TopRatedSection/>
        <AppBrandingSection/>
        <AllProductSection/>
        {/* <LowestPriceProduct/> */}
      </div>
    </>
  );
};

export default Home;
