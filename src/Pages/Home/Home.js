import React from "react";
import "./Home.css";
import Category from "./../CategoryPage/Category/Category";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";

const Home = () => {
  const allCategories = useSelector((state) => state.allCategories.categories.data);
  const loading = useSelector((state) => state.allCategories.loading);

  return (
    <>
      <div className="home_container">
        <MetaData title="BPPShop" description=""/>
        <Category allCategory={allCategories} loading={loading}/>
      </div>
    </>
  );
};

export default Home;
