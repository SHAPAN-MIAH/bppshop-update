import React from "react";
import "./Home.css";
import Category from "./../CategoryPage/Category/Category";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import DealOfTheDay from "./DealOfTheDaySection/DealOfTheDay";
import NewArrivalSection from "./NewArrivalSection/NewArrivalSection";

const Home = () => {
  const allCategories = useSelector((state) => state.allCategories.categories.data);
  const loading = useSelector((state) => state.allCategories.loading);

  return (
    <>
      <div className="home_container">
        <MetaData title="BPPShop" description=""/>
        <DealOfTheDay/>
        <Category allCategory={allCategories} loading={loading}/>
        <NewArrivalSection/>
      </div>
    </>
  );
};

export default Home;
